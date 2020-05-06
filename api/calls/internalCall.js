'use strict'

const axios = require('axios').default;

async function adCall(queryParams) {
    return axios({
        method: 'GET',
        url: `http://127.0.0.1:3000/anuncios${queryParams}`,
        headers: {
            auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIwMDYxNzRkYjA3MTNkMGNkMzRkNTEiLCJpYXQiOjE1ODg3NTc5OTMsImV4cCI6MTU4ODkzMDc5M30.pMjue5BKLGA646WoSdN5HL5glS7wa8czDzfoq9Mi0-U'
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