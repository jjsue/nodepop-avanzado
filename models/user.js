'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, index: true, unique: true},
    password: String,
});

const bcrypt = require('bcrypt');
const saltRounds = 10;
//Encriptacion.
userSchema.statics.hashPass = function (passwd) {
    return bcrypt.hash(passwd, saltRounds);
}

const user = mongoose.model('user', userSchema);

module.exports = user;