const { query } = require('express');
const APIFeatures = require('../utils/apiFeatures');
const Tours = require('../models/tour.model');
exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json({
      status: '404 Not Found',
      message: 'Could not find any tour',
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tours.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      statusbar: 'error',
      message: 'Could not found tour',
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const createdTour = await Tours.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Tour created successfully',
      data: {
        tour: createdTour,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    updatedTour = await Tours.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
  } catch (error) {}
  res.status(200).json({
    status: 'success',
    data: {
      tour: updateTour,
    },
  });
};

exports.deleteTour = async (req, res) => {
  try {
    const id = req.params.id;
    await Tours.findByIdAndDelete(id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      staus: 'failed',
      message: error,
    });
  }
};
