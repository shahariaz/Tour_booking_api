const Tours = require('../models/tour.model');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tours.find();
    res.status(200).json({
      status: 'success',
      totalTours: Tours.length,
      message: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: '404 Not Found',
      message: 'Could not find any tour',
    });
  }
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
