const db = require("../module/database.js");

exports.getComments = (req, res) => {
    const gameId = req.params.id;

    const query = `
        SELECT Comments.*, UserInfo.UserName 
        FROM Comments
        JOIN UserInfo ON Comments.UserID = UserInfo.UserID
        WHERE Comments.QueryID = ?
        ORDER BY Comments.CommentDate DESC
        LIMIT 10`;

    db.query(query, [gameId], (error, results) => {
        if (error) {
            res.status(500).send({ message: "Error retrieving comments for game with id " + gameId });
        } else {
            res.send(results);
        }
    });
};

exports.postComment = (req, res) => {
    const gameId = req.params.id;
    const { user, userRate, currentComment } = req.body;
    // user example : {UserID: 1, UserName: 'testcase', UserEmail: 'testcase@gmail.com'}
    // userRate example : 5
    // currentComment example : 'This game is good'

    // check if game exists
    const gameQuery = `SELECT * FROM GameInfo WHERE QueryID = ?`;
    db.query(gameQuery, [gameId], (gameError, gameResults) => {
        if (gameError || gameResults.length === 0) {
            res.status(404).send({ message: "Game not found" });
            return;
        }

        // check if user exists
        const userQuery = `SELECT * FROM UserInfo WHERE UserID = ?`;
        db.query(userQuery, [user.UserID], (userError, userResults) => {
            if (userError || userResults.length === 0) {
                res.status(404).send({ message: "User not found" });
                return;
            }

            // add comment to database
            const insertQuery = `INSERT INTO Comments (CommentText, Rating, CommentDate, UserID, QueryID) VALUES (?, ?, NOW(), ?, ?)`;
            db.query(insertQuery, [currentComment, userRate, user.UserID, gameId], (insertError, insertResults) => {
                if (insertError) {
                    res.status(500).send({ message: "Error posting comment" });
                } else {
                    // retrieve comments after posting
                    const getCommentsQuery = `
                        SELECT Comments.*, UserInfo.UserName 
                        FROM Comments
                        JOIN UserInfo ON Comments.UserID = UserInfo.UserID
                        WHERE Comments.QueryID = ?
                        ORDER BY Comments.CommentDate DESC
                        LIMIT 10`;
                    db.query(getCommentsQuery, [gameId], (getCommentsError, getCommentsResults) => {
                        if (getCommentsError) {
                            res.status(500).send({ message: "Error retrieving comments after posting" });
                        } else {
                            res.status(201).send(getCommentsResults);
                        }
                    });
                }
            });
        });
    });
};

exports.editComment = (req, res) => {
    const gameId = req.params.id;
    const userId = req.body.userId;
    const commentId = req.body.commentId;
    const newComment = req.body.newComment;

    const sql = `
        UPDATE Comments 
        SET CommentText = ?, CommentDate = NOW()
        WHERE CommentID = ? AND UserID = ? AND QueryID = ?
    `;

    db.query(sql, [newComment, commentId, userId, gameId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating comment');
        } else {
            // retrieve comments after posting
            const getCommentsQuery = `
                SELECT Comments.*, UserInfo.UserName 
                FROM Comments
                JOIN UserInfo ON Comments.UserID = UserInfo.UserID
                WHERE Comments.QueryID = ?
                ORDER BY Comments.CommentDate DESC
                LIMIT 10`;
            db.query(getCommentsQuery, [gameId], (getCommentsError, getCommentsResults) => {
                if (getCommentsError) {
                    res.status(500).send({ message: "Error retrieving comments after deletion" });
                } else {
                    res.send(getCommentsResults);
                }
            });
        }
    });
}

exports.deleteComment = (req, res) => {
    const gameId = req.params.id;
    const userId = req.body.userId;
    const commentId = req.body.commentId;
    // TODO: delete comment from database using comment id and user id(verify user)
    const deleteQuery = `DELETE FROM Comments WHERE CommentID = ? AND UserID = ? AND QueryID = ?`;
    db.query(deleteQuery, [commentId, userId, gameId], (error, results) => {
        if (error) {
            res.status(500).send({ message: "Error deleting comment" });
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: "Comment not found or user not authorized to delete this comment" });
        } else {
            // retrieve comments after posting
            const getCommentsQuery = `
                SELECT Comments.*, UserInfo.UserName 
                FROM Comments
                JOIN UserInfo ON Comments.UserID = UserInfo.UserID
                WHERE Comments.QueryID = ?
                ORDER BY Comments.CommentDate DESC
                LIMIT 10`;
            db.query(getCommentsQuery, [gameId], (getCommentsError, getCommentsResults) => {
                if (getCommentsError) {
                    res.status(500).send({ message: "Error retrieving comments after deletion" });
                } else {
                    res.send(getCommentsResults);
                }
            });
        }
    });
};
