/**
 * file: app.js
 * name: Kanav sood
 * student id: 
 * date: 25-Apr-2021
*/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')


var indexRouter = require('./routes/index');
var {addContact,deletePage,editContact,add,edit} = require('./routes/contact-list');

var app = express();
var port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ 
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get('/add', addContact);
app.get('/edit/', edit);
app.get('/delete/', deletePage);
app.post('/add', add);
app.post('/edit/', editContact);



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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});



module.exports = app;
