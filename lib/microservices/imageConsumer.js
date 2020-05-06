'use strict'
const cote = require('cote');
const resize = require('./../image-resizer');

const imageResponder = new cote.Responder({name: 'Image-Resizer-Microservice'});

imageResponder.on('Resize', async (req, done)=>{
    await resize(req.imgName);
    done();
});