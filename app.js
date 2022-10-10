const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const viewRouter = require('./routes/view');
const addRouter = require('./routes/add');
const previewRouter = require('./routes/preview')
const searchRouter = require('./routes/search');
const manageRouter = require('./routes/manage');
const newHomebrewRouter = require('./routes/new');
const successRouter = require('./routes/success');
const delRouter = require('./routes/delete');
const editRouter = require('./routes/edit');
const updateRouter = require('./routes/update');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/img', express.static(__dirname + '/public/images'));
app.use('/fa', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free')); // location for fontawesome
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // location for bootstrap js
app.use('/stylesheets', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // location for bootstrap css
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // location for jquery
app.use('/stylesheets', express.static(__dirname + '/node_modules/brewdown/dist/styles')); // location for jquery

app.use('/', indexRouter);
app.use('/view', viewRouter);
app.use('/add', addRouter);
app.use('/preview', previewRouter);
app.use('/search', searchRouter);
app.use('/manage', manageRouter);
app.use('/new', newHomebrewRouter);
app.use('/success', successRouter);
app.use('/delete', delRouter);
app.use('/edit', editRouter);
app.use('/update', updateRouter);

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
