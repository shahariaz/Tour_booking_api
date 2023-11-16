const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const usersRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const globalErrorHandler = require('./controllers/errorController');
const app = express();
app.use(morgan('dev'));
app.use(express.json());

//user routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tours', tourRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!!!`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
