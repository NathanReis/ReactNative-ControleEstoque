const mongoose = require('../config/database');

const SCHEMA = new mongoose.Schema({
  description: String
});

module.exports = mongoose.model('Category', SCHEMA);
