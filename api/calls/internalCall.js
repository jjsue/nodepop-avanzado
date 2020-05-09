'use strict'

const axios = require('axios').default;

async function adCall(queryParams) {
    return axios({
        method: 'GET',
        url: `http://127.0.0.1:3000/anuncios${queryParams}`,
        headers: {
            auth: process.env.JWT_VIEW_TOKEN,
        },
    })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            const throwError = ['error', error];
            return throwError;
        })
}

module.exports = adCall;