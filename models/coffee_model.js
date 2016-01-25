const mongoose = require('mongoose');

var coffeeSchema = new mongoose.Schema({
  name: String,
  flavor: String,
  body: String,
  fairTrade: Boolean,
  cupPreference: {type: String, default: 'coffee cup'},
  location: String
});

module.exports = exports = mongoose.model('Coffee', coffeeSchema);
