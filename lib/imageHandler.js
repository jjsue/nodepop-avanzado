var fs = require("fs");
const requester = require('./../lib/microservices/imageRequester');
function imageHandler(imageObject) {
    if (imageObject.mimetype !== 'image/png' && imageObject.mimetype !== 'image/jpeg' || imageObject.name.lastIndexOf(".peg") !== -1) {
        return false;
    }
    let nameToWrite = imageObject.name;
    while (true) {
        if (fs.existsSync(`./public/images/${nameToWrite}`)) {
            nameToWrite = Math.floor(Math.random() * 1000) + nameToWrite;
        } else {
            break;
        }
    }
    imageObject.mv(`./public/images/${nameToWrite}`);

    setTimeout(() => {
        requester(nameToWrite);
    }, 1000 * 20);

    return `/images/tn-${nameToWrite}`;
}

module.exports = imageHandler;