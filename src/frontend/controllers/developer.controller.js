const db = require("../module/database.js");

exports.findDeveloperGames = (req, res) => {
    const developerId = req.params.id;
    
    const query = `
        SELECT GameInfo.QueryID, GameInfo.QueryName, GameInfo.ReleaseDate, 
               GameInfo.RecommendationCount, GameInfo.PriceCurrency, 
               GameInfo.PriceFinal, GameInfo.DetailedDescrip, GameInfo.HeaderImage
        FROM Develop
        JOIN GameInfo ON Develop.QueryID = GameInfo.QueryID
        WHERE Develop.DeveloperID = ?
        LIMIT 4`;

    db.query(query, [developerId], (error, results) => {
        if (error) {
            res.status(500).send({ message: "Error retrieving games for developer with id " + developerId });
        } else {
            res.send(results);
        }
    });
};
