'use strict'

const jwt = require('jsonwebtoken');

module.exports = function () {
    return (req, res, next) => {
        const token = req.headers.auth
        if (token === undefined) {
            const error = new Error('Token expected but not provided. In the message headers you should add the authentication token. Refer to documentation for more info.');
            error.status = 401;
            next(error);
            return;
        } else {
            jwt.verify(token, process.env.JWT_PASS, (err, payload) => {
                if (err) {
                    next(err);
                    return;
                } else {
                    console.log(req.userId);
                    next();
                }
            });
        }
    }
}