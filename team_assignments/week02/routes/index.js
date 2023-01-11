const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Week 2 Team Assignment Placeholder');
});

module.exports = routes;