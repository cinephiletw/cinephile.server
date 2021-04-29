var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var popularMoviesRouter = require("./routes/popularMovies"); 
var comingMoviesRouter = require("./routes/comingMovies"); 
var hotMoviesRouter = require("./routes/hotMovies"); 
var moviePagesRouter = require("./routes/moviePages")
var loginRouter = require("./routes/login")
var app = express();

// start the rest of your app here
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use("/api/v1/movies/popular", popularMoviesRouter);  
app.use("/api/v1/movies/coming", comingMoviesRouter);  
app.use("/api/v1/movies/hot", hotMoviesRouter);  
app.use("/api/v1/moviePages", moviePagesRouter);
app.use("/api/v1/login", loginRouter);

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
