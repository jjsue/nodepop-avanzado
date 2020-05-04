var fs = require("fs");

function imageHandler(imageObject) {
    //req.files.image.mv(`./images/${req.files.image.name}`);
    if(imageObject.mimetype !== 'image/png' && imageObject.mimetype !== 'image/jpeg' || imageObject.name.lastIndexOf(".peg") !== -1){ //&& imageObject.name.lastIndexOf(".peg") !== -1
        return false;
    }
    //De este bucle vamos a sacar el que no haya nombres repetidos.
    let nameToWrite = imageObject.name;
    while (true){
        if (fs.existsSync(`./public/images/${nameToWrite}`)){
            nameToWrite = Math.floor(Math.random()*1000) + nameToWrite;
        }else{
            break;
        }
    }
    //Escribimos la imagen con su nuevo nombre.
    imageObject.mv(`./public/images/${nameToWrite}`);
    //Devolvemos la ruta para usarla mas adelante:
    return `/images/${nameToWrite}`; //La ruta es la que va a usar el navegador.
} // /stylesheets/images/test-image-01.jpg

module.exports = imageHandler;