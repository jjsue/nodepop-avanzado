const jimp = require('jimp');

async function resize() {
    try {
        const img = await jimp.read('public/images/test-image-01.jpg');

        await img.resize(100, 100);

        await img.writeAsync('public/images/test-image-01-jimp.jpg');
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = resize;