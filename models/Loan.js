const mongoose = require('mongoose');
const { Schema } = mongoose;
const transactionSchema = require('./Transaction');

const loanSchema = new Schema({
  personal_number: { type: String, required: true },
  amount: Number,
  description: String,
  paid_off: Boolean,
  transactions: [transactionSchema]
});

mongoose.model('loans', loanSchema);
