const db = require("../module/database.js");

const allTypes = ['SinglePlayer', 'Indie', 'Action', 'Adventure', 'Casual', 'Multiplayer', 'Strategy', 'Simulation', 'Other'];
const otherTypes = ['IncludeSrcSDK', 'IncludeLevelEditor', 'InAppPurchase', 'FreeToPlay', 'Coop', 'RPG', 'NonGame', 'Racing', 'MMO', 'MassivelyMultiplayer', 'Sports', 'EarlyAccess', 'VRSupport'];

exports.topgame = (req, res) => {
    const query = `CALL GetTopGames();`;

    db.query(query, (error, results, fields) => {
        if (error) {
            // if error, print blank results
            res.status(500).send({ message: "Error while retrieving top games" });
        } else {
            res.status(200).send(results);
        }
    });
};

exports.top = (req, res) => {
    const genre = req.query.genrel || 'SinglePlayer';

    const query = `
        SELECT gi.QueryID, gi.QueryName, gi.ReleaseDate, gi.RecommendationCount, gi.IsFree, gi.PriceCurrency, gi.PriceFinal, gi.DetailedDescrip, gi.HeaderImage 
        FROM GameInfo gi
        JOIN GameGenres gg ON gi.QueryID = gg.QueryID
        WHERE gg.GenreName = ?
        ORDER BY gi.RecommendationCount DESC 
        LIMIT 5`;

    db.query(query, [genre], (error, results, fields) => {
        if (error) {
            res.status(500).send({ message: "Error while retrieving top games of the genre: " + genre });
        } else {
            res.status(200.200).send(results);
        }
    });
}

exports.list = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const sortField = req.query.sortField || 'QueryID';
    const sortOrder = req.query.sortOrder || 'asc';
    const gameType = req.query.gameType || 'all';
    const rowsPerPage = 10;

    let whereClause = '';
    if (gameType !== 'all') {
        const types = gameType.split(',').map(type => `'${type}'`);
        if (types.includes("'Other'")) {
            const otherTypesFormatted = otherTypes.map(type => `'${type}'`);
            types.splice(types.indexOf("'Other'"), 1, ...otherTypesFormatted);
        }
        whereClause = `WHERE GenreName IN (${types.join(', ')})`;
    }

    const query = `
            SELECT 
            GameInfo.QueryID, 
            GameInfo.QueryName, 
            GameInfo.ReleaseDate, 
            GameInfo.RecommendationCount, 
            GROUP_CONCAT(GameGenres.GenreName ORDER BY GameGenres.GenreName SEPARATOR ', ') AS Genres
        FROM GameInfo
        JOIN GameGenres ON GameInfo.QueryID = GameGenres.QueryID
        ${whereClause}
        GROUP BY GameInfo.QueryID, GameInfo.QueryName, GameInfo.ReleaseDate, GameInfo.RecommendationCount
        ORDER BY ${sortField} ${sortOrder === 'desc' ? 'DESC' : 'ASC'}
        LIMIT ${(page - 1) * rowsPerPage}, ${rowsPerPage};`;

    const countQuery = `
        SELECT COUNT(DISTINCT GameInfo.QueryID) AS total
        FROM GameInfo
        JOIN GameGenres ON GameInfo.QueryID = GameGenres.QueryID
        ${whereClause};`;

    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send({ message: "Error while retrieving games results" });
        } else {
            // console.log(results);
            db.query(countQuery, (countError, countResults) => {
                if (countError) {
                    res.status(500).send({ message: "Error while counting games number" });
                } else {
                    const totalRecords = countResults[0].total;
                    const maxPage = Math.ceil(totalRecords / rowsPerPage);
                    res.status(200).send({ maxPage, data: results });
                }
            });
        }
    });
};

exports.search = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const sortField = req.query.sortField || 'QueryID';
    const sortOrder = req.query.sortOrder || 'asc';
    const gameType = req.query.gameType || 'all';
    const searchTerm = req.query.q || '';
    const rowsPerPage = 10;

    let whereClauses = [];
    let queryParams = [];

    if (gameType !== 'all') {
        const types = gameType.split(',').map(type => type);
        if (types.includes("Other")) {
            types.splice(types.indexOf("Other"), 1, ...otherTypes);
        }
        whereClauses.push(`GenreName IN (?)`);
        queryParams.push(types);
    }

    if (searchTerm) {
        whereClauses.push(`GameInfo.QueryName LIKE ?`);
        queryParams.push(`%${searchTerm}%`);
    }

    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const query = `
        SELECT 
        GameInfo.QueryID, 
        GameInfo.QueryName, 
        GameInfo.ReleaseDate, 
        GameInfo.RecommendationCount, 
        GROUP_CONCAT(GameGenres.GenreName ORDER BY GameGenres.GenreName SEPARATOR ', ') AS Genres
        FROM GameInfo
        JOIN GameGenres ON GameInfo.QueryID = GameGenres.QueryID
        ${whereClause}
        GROUP BY GameInfo.QueryID, GameInfo.QueryName, GameInfo.ReleaseDate, GameInfo.RecommendationCount
        ORDER BY ${sortField} ${sortOrder === 'desc' ? 'DESC' : 'ASC'}
        LIMIT ?, ?;`;

    queryParams.push((page - 1) * rowsPerPage, rowsPerPage);

    const countQuery = `
        SELECT COUNT(DISTINCT GameInfo.QueryID) AS total
        FROM GameInfo
        JOIN GameGenres ON GameInfo.QueryID = GameGenres.QueryID
        ${whereClause};`;

    db.query(query, queryParams, (error, results) => {
        if (error) {
            res.status(500).send({ message: "Error while retrieving games results" });
        } else {
            db.query(countQuery, queryParams.slice(0, -2), (countError, countResults) => {
                if (countError) {
                    res.status(500).send({ message: "Error while counting games number" });
                } else {
                    const totalRecords = countResults[0].total;
                    const maxPage = Math.ceil(totalRecords / rowsPerPage);
                    res.status(200).send({ maxPage, data: results });
                }
            });
        }
    });
};

exports.findById = (req, res) => {
    const gameId = req.params.id;

    const query = `SELECT * FROM GameInfo WHERE QueryID = ?`;

    db.query(query, [gameId], (error, results) => {
        if (error) {
            res.status(500).send({ message: "Error retrieving game with id " + gameId });
        } else {
            res.send(results[0]);
        }
    });
}

exports.getDLC = (req, res) => {
    const gameId = req.params.id;

    const query = `
        SELECT *
        FROM DLCInfo
        WHERE DLCInfo.QueryID = ?`;

    db.query(query, [gameId], (error, results) => {
        if (error) {
            res.status(500).send({ message: "Error retrieving DLC for game with id " + gameId });
        } else {
            res.send(results);
        }
    });
}

exports.getPlatform = (req, res) => {
    const gameId = req.params.id;

    const query = `
        SELECT GamePlatform.PlatformName, GamePlatform.MinReqsText, GamePlatform.RecReqsText
        FROM GamePlatform
        WHERE GamePlatform.QueryID = ?`;

    db.query(query, [gameId], (error, results) => {
        if (error) {
            res.status(500).send({ message: "Error retrieving platform info for game with id " + gameId });
        } else {
            res.send(results);
        }
    });
}

exports.getGenres = (req, res) => {
    const gameId = req.params.id;

    const query = `
        SELECT GameGenres.* 
        FROM GameGenres
        WHERE GameGenres.QueryID = ?`;

    db.query(query, [gameId], (error, results) => {
        if (error) {
            res.status(500).send({ message: "Error retrieving genres for game with id " + gameId });
        } else {
            res.send(results);
        }
    });
}

exports.getDevelop = (req, res) => {
    const gameId = req.params.id;

    const query = `
        SELECT DeveloperInfo.* 
        FROM Develop
        JOIN DeveloperInfo ON Develop.DeveloperID = DeveloperInfo.DeveloperID
        WHERE Develop.QueryID = ?`;

    db.query(query, [gameId], (error, results) => {
        if (error) {
            res.status(500).send({ message: "Error retrieving developer information for game with id " + gameId });
        } else {
            res.send(results[0]);
        }
    });
}
