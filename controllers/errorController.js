const AppError = require('../utils/appError');
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateKeyError = (err) => {
  const duplicatedField = Object.keys(err.keyValue)[0];
  const duplicatedValue = err.keyValue[duplicatedField];

  const message = `Duplicate key error: ${duplicatedField} with value ${duplicatedValue}.`;
  return new AppError(message, 400); // You can choose an appropriate status code
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  //Operational, trusted error:send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    //Programing  or unknown error:don't leak error details to client
  } else {
    //1Log error
    console.error('ERROR', err);
    //2)Send genaric error message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    console.log(error.name);
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateKeyError(error);

    sendErrorProd(error, res);
  }
};
