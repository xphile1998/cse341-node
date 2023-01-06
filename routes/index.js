const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Annette Whitefield');
});
routes.get('/eron', (req, res) => {
    res.send('Eron Whitefield');
});
routes.get('/jack', (req, res) => {
    res.send('Jack Whitefield');
});

module.exports = routes;