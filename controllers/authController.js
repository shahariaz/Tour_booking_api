const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  if (!req.body) {
    return next(new AppError('Invalid request body', 400));
  }

  const userEmail = req.body.email;
  const exitingUser = await User.findOne({ email: userEmail });

  if (exitingUser) {
    return next(new AppError('User already exists', 409));
  }

  const createdUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    data: {
      createdUser,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {});
exports.update = catchAsync(async (req, res, next) => {});
