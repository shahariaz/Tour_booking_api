const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tourSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    default: 1,
  },
  dis: {
    type: String,
  },
});
// delete mongoose.connection.models['Tour'];
const Tours = model('Tours', tourSchema);
module.exports = Tours;
