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
    let duplicateField;
    if (exitingUser.email === userEmail) {
      duplicateField = 'email';
    } else {
      duplicateField = 'username';
    }

    return next(
      new AppError(
        `Already User Exist On this ${duplicateField}: ${req.body[duplicateField]}`,
        409
      )
    );
  }

  const createdUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

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
