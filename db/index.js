const mongoose = require('mongoose');
const db = mongoose.connection;
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.DAtABASE);
    console.log('mongodb connection established');
  } catch (error) {
    console.log('MONGODB CONNECTION ERROR', error);
    process.exit(1);
  }
};

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: Number,
  price: {
    type: Number,
    required: [true, 'Price is must'],
  },
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = connectDB;
