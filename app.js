var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {Mongoose,gb_hDb}=require('./untils/config');
var session=require('express-session');



Mongoose.connect();
/* gb_hDb.connect(); */



keepAliveTimeout=300000;










var indexRouter = require('./routes/index');
var writerRouter =require('./routes/writer');
var guestRouter=require('./routes/guest');

var app = express();




app.use(session({
  secret: '#$#%$#$%#',
  name:'sessionId',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge:1000*60*60
  }
}));                               //session配置写在路由前，否则会报错




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api3/writer', writerRouter);
app.use('/api3/guest',guestRouter);





process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});




//允许跨域设置

/* app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
}); */          




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
