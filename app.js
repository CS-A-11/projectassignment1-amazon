var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
var bodyParser=require('body-parser');
var bcrypt= require('bcrypt');
var model= require('./app-api/models/db');
var db = model.connection;

var ApiRouter = require('./app-api/routes/index');
var indexRouter = require('./app-server/routes/index');




var app = express();
app.use(session({
  secret: 'Work hard',
  resave: true,
  uninitialized: false
}));

app.use("/", function(req, res, next) {
  if (req.session.userId) {
    res.locals.user = req.session.userId;
    res.locals.userName = req.session.userName;
  }
  next();
});
app.use('/', indexRouter);
app.use('/api', ApiRouter);

// view engine setup
app.set('views', path.join(__dirname, 'app-server','views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//localhost:3000
