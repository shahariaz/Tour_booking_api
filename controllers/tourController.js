const { query } = require('express');
const APIFeatures = require('../utils/apiFeatures');
const Tours = require('../models/tour.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tours.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;
  res.status(200).json({
    status: 'success',
    totalTours: tours.length,
    data: {
      tours: tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const tour = await Tours.findById(id);
  if (!tour) {
    return next(new AppError('No tour found with that id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const createdTour = await Tours.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Tour created successfully',
    data: {
      tour: createdTour,
    },
  });
});
exports.updateTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const tour = await Tours.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tour) {
    return next(new AppError('No tour found with that id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const tour = await Tours.findByIdAndDelete(id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
  if (!tour) {
    return next(new AppError('No tour found with that id', 404));
  }
});
