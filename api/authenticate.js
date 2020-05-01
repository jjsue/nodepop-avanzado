var express = require('express');
var router = express.Router();
const User = require('./../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res, next) => {
    try {
        const user = req.body.user;
        const password = req.body.password;
        const userFound = await User.findOne({ userName: user });
        if (userFound === null || !await bcrypt.compare(password, userFound.password)) {
            return res.status(401).json({ errors: 'Username or password wrong' });
        } else {
            res.send("Usuario encontrado");
        }
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;