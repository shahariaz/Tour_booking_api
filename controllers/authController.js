const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const singToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
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
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = singToken(createdUser._id);
  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    token,
    data: {
      user: createdUser,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1)check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please enter Email and Password', 400));
  }
  //2) check if email and password  is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email or Password', 401));
  }

  //3) if everything is ok , send token to client
  const token = singToken(user._id);
  res.status(200).json({
    status: 'sucsess',
    token: token,
  });
});
exports.update = catchAsync(async (req, res, next) => {});
