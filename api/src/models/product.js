const mongoose = require('../config/database');

const SCHEMA = new mongoose.Schema({
  _idCategory: mongoose.Schema.Types.ObjectId,
  description: String,
  amount: Number,
  minAmount: Number,
  active: Boolean
});

module.exports = mongoose.model('Product', SCHEMA);
