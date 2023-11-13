const express = require('express');
const morgan = require('morgan');
const usersRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const app = express();
app.use(morgan('dev'));
app.use(express.json());

//user routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tours', tourRouter);

module.exports = app;
