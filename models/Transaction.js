mongoose = require('mongoose');
const { Schema } = mongoose;

const numberSchema = new Schema({
  amount: Number
});

module.exports = numberSchema;
