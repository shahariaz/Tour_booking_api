const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');

//
router.param('id', (req, res, next, val) => {});

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getATour)
  .patch(tourController.updateAtour);
module.exports = router;
