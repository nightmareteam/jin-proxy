const axios = require('axios');

const redirectRequest = ({
    originalUrl,
    headers,
    method,
    params,
    data,
}, domain) => (
    axios({
        url: `${domain}${originalUrl}`,
        params,
        method,
        data,
        headers,
    })
);

module.exports = redirectRequest;
