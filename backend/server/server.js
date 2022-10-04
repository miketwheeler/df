// new
import express, { json, urlencoded } from 'express';
import createError from 'http-errors';
import morgan from 'morgan';
// const express = require('express')
// const createError = require('createError')
// const morgan = require('morgan')
// import { join } from 'path';
// import cookieParser from 'cookie-parser';
// import logger from 'morgan';
// import cors from 'cors';
// import indexRouter from './routes/index';
// import usersRouter from './routes/users';
// import testAPIRouter from './routes/testroute';

// old
// const express = require("express");
const app = express();
const PORT = process.env.PORT || 3090;


// new
app.use(morgan('dev'));
// app.set('views', join(_dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(cors());
// app.use(logger('dev'));
// app.use(json());
// app.use(urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(join(__dirname, 'public')));

// app.use('/dashboard', indexRouter);
// app.use('/dashboard', usersRouter);
// app.use('/member-hall', testAPIRouter);
// app.use(static('public'))

// Old
app.use((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});
app.get('/api', (req,res) => {
    res.json({ message: "Hello from Express!"});
})
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

// view engine setup

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;