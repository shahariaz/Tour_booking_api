const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const validator = require('validator');
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'A user must provide an username'],
    uniqe: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'A user must provide an email address'],
    uniqe: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    require: [true, 'A user must provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A user must provide a password'],
  },
  photo: {
    type: String,
  },
});
const Users = model('Users', userSchema);
module.exports = Users;
