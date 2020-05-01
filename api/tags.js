var express = require('express');
var router = express.Router();
const Tag = require('./../models/tag');
router.get('/', async (req, res, next) => {
    try {
        const filtro = {};
        const sort = 'tag';
        const skip = 0;
        const limit = 10000;
        const fields = 'tag';
        const response = await Tag.lista(filtro, sort, skip, limit, fields);
        const docs = response;
        res.json(docs);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;