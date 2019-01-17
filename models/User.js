const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  personal_number: String,
  account_limit: Number
});

mongoose.model('users', userSchema);
