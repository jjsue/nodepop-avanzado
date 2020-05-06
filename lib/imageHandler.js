var fs = require("fs");
const requester = require('./../lib/microservices/imageRequester');
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
    //Pedimos que se ponga en cola la thumbnail.
    setTimeout(() => { //Lo hacemos con setTimeOut para que no se consuma inmediatamente ya que si se hace de esa forma la imagen podría no estar escrita en disco.
        requester(nameToWrite);
    }, 1000*20); //En 20 segundos tendriamos la thumbnail
    //Devolvemos la ruta para usarla mas adelante:
    return `/images/${nameToWrite}`; //La ruta es la que va a usar el navegador.
} // /stylesheets/images/test-image-01.jpg

module.exports = imageHandler;