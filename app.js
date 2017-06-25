var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
//apply when db is ready
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/bgumusicroomdb');

var index = require('./routes/index');
var users = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false})); //resave:false - saves only if modified
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
var pg = require('pg');
pg.defaults.ssl = true;
var myDbUrl = "postgres://ouxkbqmnxtrhrx:23ef9a216cc43c9a3d6735fcaa267c4460df821812b787d8d5eff1b8f3d083b3@ec2-54-225-236-102.compute-1.amazonaws.com:5432/d9nfd64qpil3d2";
pg.connect(myDbUrl, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
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
