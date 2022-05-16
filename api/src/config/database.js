const mongoose = require('mongoose');
const environment = require('./environment');

mongoose.connect(environment.DB_URL);

module.exports = mongoose;
