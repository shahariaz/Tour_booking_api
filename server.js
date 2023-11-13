require('dotenv').config({ path: './.env' });
const app = require('./app');
const mongoose = require('mongoose');
const connectDB = require('./db');
app.listen(process.env.PORT || 3000, () => {
  console.log('listening on port', process.env.PORT);
  connectDB();
});

/*(async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE}/natours`);
    app.on('connection', (connection) => {
      console.log('Connection established');
    });
    db.once('open', () => {
      console.log('Connection established');
    });
    app.on('error', () => {
      console.log('Connection error');
    });
    app.listen(process.env.PORT || 3000, () => {
      console.log('Listening on port 3000');
    });
  } catch (errors) {
    console.log('ERROR:', errors);
    throw errors;
  }
})();*/
