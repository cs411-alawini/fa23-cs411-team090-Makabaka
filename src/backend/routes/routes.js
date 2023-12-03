module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const comments = require('../controllers/comment.controller.js');
    const games = require('../controllers/games.controllers.js');
    const developer = require('../controllers/developer.controller.js');
    const router = require('express').Router();

    // Games
    router.get('/api/games/topgame', games.topgame);
    router.get('/api/games/top', games.top);
    router.get('/api/games/list', games.list);
    router.get('/api/games/search', games.search);
    
    router.get('/api/games/:id', games.findById);
    router.get('/api/games/:id/dlc', games.getDLC);
    router.get('/api/games/:id/platform', games.getPlatform);
    router.get('/api/games/:id/genres', games.getGenres);
    router.get('/api/games/:id/developer', games.getDevelop);

    // developers
    router.get('/api/developer/:id/games', developer.findDeveloperGames);
    
    // Comments
    router.get('/api/games/:id/comments', comments.getComments);
    router.post('/api/games/:id/addcomment', comments.postComment);
    router.post('/api/games/:id/editcomment', comments.editComment);
    router.delete('/api/games/:id/deletecomment', comments.deleteComment);

    // Users
    router.post('/api/user/login', users.login);
    router.post('/api/user/register', users.register);
    router.get('/api/user/:id', users.findById);
    router.post('/api/user/:id/favor', users.findfavor);
    router.post('/api/user/:id/addfavor', users.addfavor);
    router.post('/api/user/:id/removefavor', users.removefavor);
    router.get('/api/user/:id/allfavor', users.allfavor);

    // Finish by binding the Restaurant middleware
    app.use('/', router);
};
