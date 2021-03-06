var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');


var indexRouter = require('./routes/index');
var adRouterApi = require('./api/anuncios');
var tagRouterApi = require('./api/tags');
var authentication = require('./api/authenticate');

var app = express();

require('./lib/connectMongoose');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(fileUpload({
  createParentPath: true,
  safeFileNames: true,
  preserveExtension: true,
}));

const i18n = require('./lib/i18nconfig')();
app.use(i18n.init);

app.use('/change-language', require('./lib/change-language'));

app.use('/auth', authentication);

const tokenValidator = require('./lib/tokenValidator');

app.use('/', indexRouter);
app.use('/anuncios', tokenValidator(), adRouterApi);
app.use('/tags', tagRouterApi);


app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
