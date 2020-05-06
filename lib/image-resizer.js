const jimp = require('jimp');

async function resize(imgName) {
    try {
        const img = await jimp.read(`public/images/${imgName}`);

        await img.resize(100, 100);

        await img.writeAsync(`public/images/tn-${imgName}`);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = resize;