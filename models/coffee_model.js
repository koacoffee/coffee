const mongoose = require('mongoose');

var coffeeSchema = new mongoose.Schema({
  name: String,
  flavor: String,
  body: String,
  fairTrade: Boolean,
  cupPreference: {type: String, default: 'coffee cup'}
});

module.exports = exports = mongoose.model('Coffee', coffeeSchema);
