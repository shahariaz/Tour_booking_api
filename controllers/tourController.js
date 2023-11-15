const Tours = require('../models/tour.model');

exports.getAllTours = async (req, res) => {
  try {
    //1A,,,,BUILD QUERY
    const queryObj = { ...req.query };
    const excludedFileds = ['page', 'sort', 'limit', 'fields'];
    excludedFileds.forEach((el) => delete queryObj[el]);
    //1b,,,,more advanced
    console.log(queryObj);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(queryStr);
    let query = Tours.find(JSON.parse(queryStr));

    //2 Sorting
    if (req.query.sort) {
      console.log(req.query.sort);
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(req.query.sort);
    } else {
      query = query.sort('-createdAt');
    }
    //3))fileds limiting
    if (req.query.fileds) {
      const fileds = req.query.fileds.split(',').join(' ');
      query = query.select('fileds');
    } else {
      query = query.select('-__v');
    }

    //4)Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 1;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numTours = await Tours.countDocuments();
      if (skip >= numTours) throw new Error('This page not dose not exits');
    }
    //5)
    //execute query

    const tours = await query;
    res.status(200).json({
      status: 'success',
      totalTours: Tours.length,
      message: {
        tours,
      },
    });
  } catch (error) {
    limitlimit;
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
