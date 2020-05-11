const path = require('path');
const axios = require('axios');
const express = require('express');
const DOMAINS = require('./constants/DOMAINS');
const redirectRequest = require('./utils/redirectRequest')

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/:service/*', (req, res) => {
    const { service } = req.params;
    const { [service]: domain } = DOMAINS;
    redirectRequest(req, domain)
        .then(({ data }) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
});

module.exports = app;
