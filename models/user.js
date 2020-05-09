'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: { type: String, unique: true },
    password: String,
});

const bcrypt = require('bcrypt');
const saltRounds = 10;
userSchema.statics.hashPass = function (passwd) {
    return bcrypt.hash(passwd, saltRounds);
}

const User = mongoose.model('user', userSchema);

module.exports = User;