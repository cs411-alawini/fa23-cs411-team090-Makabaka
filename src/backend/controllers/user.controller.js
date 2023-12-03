const db = require("../module/database.js");

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const query = `SELECT * FROM UserInfo WHERE UserEmail = ?`;

    // console.log(query);

    db.query(query, [email], (error, results) => {
        if (error) {
            res.status(500).send({ message: "Error logging in user" });
        } else {
            if (results.length > 0) {
                // check if password matches (mabe use hash later)
                if (results[0].UserPassword === password) {
                    const { UserPassword, ...userWithoutPassword } = results[0];
                    res.send(userWithoutPassword);
                } else {
                    res.status(401).send({ message: "Invalid password" });
                }
            } else {
                res.status(404).send({ message: "User not found" });
            }
        }
    });
};

exports.register = (req, res) => {
    const { name, email, password } = req.body;

    const checkEmailQuery = `SELECT * FROM UserInfo WHERE UserEmail = ?`;
    // console.log(checkEmailQuery);
    db.query(checkEmailQuery, [email], (error, results) => {
        // console.log(results);
        if (error) {
            res.status(500).send({ message: "Error checking email" });
        } else {
            if (results.length > 0) {
                res.status(400).json({ message: "Email already exists" });
            } else {
                // ADD new user to database
                const insertQuery = `INSERT INTO UserInfo (UserName, UserEmail, UserPassword) VALUES (?, ?, ?)`;
                db.query(insertQuery, [name, email, password], (insertError, insertResults) => {
                    if (insertError) {
                        res.status(500).send({ message: "Error registering user" });
                        // console.log(insertError);
                    } else {
                        res.send({ UserID: insertResults.insertId, UserName: name, UserEmail: email });
                        // console.log("User registered");
                    }
                });
            }
        }
    });
};

exports.findById = (req, res) => {
    const userId = req.params.id;

    const query = `SELECT UserID, UserName, UserEmail FROM UserInfo WHERE UserID = ?`;

    // console.log(query);

    db.query(query, [userId], (error, results) => {
        if (error) {
            res.status(500).send({ message: "Error retrieving user" });
        } else {
            if (results.length > 0) {
                res.send(results[0]);
            } else {
                res.status(404).send({ message: "User not found" });
            }
        }
    });
};

exports.findfavor = (req, res) => {
    const userId = req.params.id;
    const gameId = req.body.gameID;

    const sql = `
        SELECT EXISTS(
            SELECT 1 FROM Favorites 
            WHERE UserID = ? AND QueryID = ?
        ) AS isFavorite`;

    db.query(sql, [userId, gameId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error querying the database');
        } else {
            // result[0].isFavorite will be 1 (true) if favorite, 0 (false) if not
            res.send({ isFavorite: !!result[0].isFavorite });
        }
    });
}

exports.addfavor = (req, res) => {
    const userId = req.params.id;
    const gameId = req.body.gameID;

    const sql = `
        INSERT INTO Favorites (UserID, QueryID)
        VALUES (?, ?)`;

    db.query(sql, [userId, gameId], (err, result) => {
        if (err) {
            console.error(err);
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(409).send({ message: "Favorite already exists" });
            } else {
                res.status(500).send({ message: "Error adding favorite" });
            }
        } else {
            res.send({ message: "Favorite added successfully" });
        }
    });
}

exports.removefavor = (req, res) => {
    const userId = req.params.id;
    const gameId = req.body.gameID;

    const sql = `
        DELETE FROM Favorites
        WHERE UserID = ? AND QueryID = ?`;

    db.query(sql, [userId, gameId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: "Error removing favorite" });
        } else {
            res.send({ message: "Favorite removed successfully" });
        }
    });
};

exports.allfavor = (req, res) => {
    const userId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const sortField = req.query.sortField || 'QueryID';
    const sortOrder = req.query.sortOrder || 'asc';
    const rowsPerPage = 10;

    const whereClause = `WHERE Favorites.UserID = ${userId}`;

    const query = `
        SELECT 
            GameInfo.QueryID, 
            GameInfo.QueryName, 
            GameInfo.ReleaseDate, 
            GameInfo.RecommendationCount, 
            GameInfo.IsFree, 
            GameInfo.PriceCurrency, 
            GameInfo.PriceFinal, 
            GameInfo.DetailedDescrip, 
            GameInfo.HeaderImage 
        FROM GameInfo
        JOIN Favorites ON GameInfo.QueryID = Favorites.QueryID
        ${whereClause}
        ORDER BY ${sortField} ${sortOrder === 'desc' ? 'DESC' : 'ASC'}
        LIMIT ${(page - 1) * rowsPerPage}, ${rowsPerPage};`;

    const countQuery = `
        SELECT COUNT(*) AS total
        FROM GameInfo
        JOIN Favorites ON GameInfo.QueryID = Favorites.QueryID
        ${whereClause};`;

    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send({ message: "Error while retrieving games results" });
        } else {
            db.query(countQuery, (countError, countResults) => {
                if (countError) {
                    res.status(500).send({ message: "Error while counting games number" });
                } else {
                    const totalRecords = countResults[0].total;
                    const maxPage = Math.ceil(totalRecords / rowsPerPage);
                    res.send({ maxPage, data: results });
                }
            });
        }
    });
}
