const path = require('path');
const axios = require('axios');
const express = require('express');
const DOMAINS = require('./constants/DOMAINS');
const redirectRequest = require('./utils/redirectRequest')
const template = require('./utils/template');

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/:gameId', (req, res) => {
    const { gameId } = req.params;
    axios(`http://localhost:3003/recent-news/${gameId}`)
        .then(({ data }) => {
            let { rendered, updates } = data;
            let html = template(rendered, updates);
            res.send(html);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
});

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
