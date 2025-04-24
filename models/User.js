const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String,  enum: ['admin', 'user']},
  name: {type: String},
  address: {type: String}

});

module.exports = mongoose.model('User', userSchema);