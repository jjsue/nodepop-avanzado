var express = require('express');
var router = express.Router();
const Ad = require('./../models/anuncio');
const Tag = require('./../models/tag');
const { check, validationResult } = require('express-validator');
const tagValidator = require('./../lib/tagValidator');
router.get('/', async (req, res, next) => {
    try {
        const filtro = {};
        var sort = '_id';
        var skip = 0;
        var limit = 100;
        const fields = 'name sell price image tags';

        if (req.query.name !== undefined) {
            filtro.name = new RegExp(req.query.name, "gi");
        }
        if (req.query.sell !== undefined) {
            filtro.sell = req.query.sell;
        }
        if (req.query.pricemax !== undefined || req.query.pricemin !== undefined) {
            if (req.query.pricemax !== undefined && req.query.pricemin) {
                filtro.price = { $gte: parseInt(req.query.pricemin), $lte: parseInt(req.query.pricemax) }
            }
        }
        if (req.query.tag !== undefined) {
            console.log(req.query.tag);
            filtro.tags = { "$in": req.query.tag };
        }
        if (req.query.orderby !== undefined && (req.query.orderby === 'name' || req.query.orderby === 'price')) {
            sort = req.query.orderby;
        }
        if (req.query.skip !== undefined) {
            skip = parseInt(req.query.skip);
        }
        if (req.query.limit !== undefined) {
            limit = parseInt(req.query.limit);
        }
        const response = await Ad.lista(filtro, sort, skip, limit, fields);
        const docs = response;
        res.json(docs);
    }
    catch (err) {
        next(err);
    }
});

router.post('/',
    [
        check('name').isString(),
        check('sell').isBoolean(),
        check('price').isNumeric(),
        check('image').isURL(),
        check('tags').isArray(),
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const filtro = {};
            const sort = 'tag';
            const skip = 0;
            const limit = 10000;
            const fields = 'tag';
            const tagList = await Tag.lista(filtro, sort, skip, limit, fields);
            let databaseTagList = [];
            for (i = 0; i < tagList.length; i++) {
                databaseTagList[i] = tagList[i].tag;
            }
            if (!tagValidator(req.body.tags, databaseTagList)) {
                return res.status(422).json({ errors: 'Error, tags are not corresponding with the expected ones' });
            }
            const postData = req.body;
            const postDataToSave = new Ad(postData);
            const postDataSaved = await postDataToSave.save()
            res.status(201).json({ result: postDataSaved });

        }
        catch (err) {
            next(err);
        }
    });

module.exports = router;
