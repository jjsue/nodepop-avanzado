'use strict'

const axios = require('axios').default;

async function adCall(queryParams) {
    return axios({
        method: 'GET',
        url: `http://127.0.0.1:3000/anuncios${queryParams}`,
        headers: {
            auth: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWFjMTZhODRjNTQ0NTMzZWM3Yjg0ZjUiLCJpYXQiOjE1ODg1MDM5NzMsImV4cCI6MTU4ODY3Njc3M30.vofTCRqOcP79f3gVu3gqK3vD-n6XETaqIRHvaE6ce8I'
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