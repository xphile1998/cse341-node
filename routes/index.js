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
routes.get('/thomas', (req, res) => {
    res.send('Thomas Whitefield');
});
routes.get('/robert', (req, res) => {
    res.send('Robert Whitefield');
});
routes.get('/beth', (req, res) => {
    res.send('Elisabeth Whitefield');
});
routes.get('/patrick', (req, res) => {
    res.send('Patrick Whitefield');
});

module.exports = routes;