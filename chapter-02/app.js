var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');

var indexRouter = require('./controller/index');
// Inject band controller
var bands = require('./controller/band');
// Inject user controller
var users = require('./controller/user');

var app = express();

// view engine setup
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set("view engine", 'html');
app.set('views', path.join(__dirname, 'views/pages'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.get('/', indexRouter.show);
// Defining route to list and post
app.get('/bands', bands.list);
// Get band by ID
app.get('/band/:id', bands.byId);
// Create band
app.post('/bands', bands.create);
// Update
app.put('/band/:id', bands.update);
// Delete by id
app.delete('/band/:id', bands.delete);
// Defining route to list and post users
app.get('/users', users.list);
app.post('/users', users.create);

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
