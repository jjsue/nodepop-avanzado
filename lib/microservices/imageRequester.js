'use strict'
const cote = require('cote');

const imgRequester = new cote.Requester({name: 'Img-Resize-Request'});

function requester(imgName){
    imgRequester.send({
        type: 'Resize',
        imgName: imgName,
    });
    console.log(imgName);
}

module.exports = requester;