const express = require('express');
const DOMAINS = require('./constants/DOMAINS');
const redirectRequest = require('./utils/redirectRequest')

const app = express();

app.get('/api/:service/*', (req, res) => {
    const { service } = req.params;
    const { [service]: domain } = DOMAINS;
    redirectRequest(req, domain)
        .then(({ data }) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

module.exports = app;
