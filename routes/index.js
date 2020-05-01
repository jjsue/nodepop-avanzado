'use strict'
var express = require('express');
var router = express.Router();
const adCall = require('./../api/calls/internalCall');


router.get('/', async function (req, res, next) {
  try {
    let queryparams = '';
    for (let i = 1; i < req.url.length; i++){
      queryparams += req.url[i];
    }
    console.log(queryparams);
    const dbData = await adCall(queryparams);
    if (dbData[0] === 'error'){
      throw(dbData[1]);
    }
    res.render('index', {
      title: 'Muestra de nodepop',
      data: dbData,
    });
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
