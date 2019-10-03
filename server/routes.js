const express = require('express');
const routes = express.Router(); // eslint-disable-line new-cap

routes.get('/', (req, res) => {
    res.status(200).render('index');
});

module.exports = routes;