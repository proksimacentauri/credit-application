const mongoose = require('mongoose');
const User = mongoose.model('users');
const Loan = mongoose.model('loans');

module.exports = app => {
  app.post('/user', (req, res) => {
    // console.log(req.body);
    const user = new User(req.body).save();
    res.send(req.body);
  });

  app.get('/user/:personal_number', (req, res) => {
    const id = req.params.personal_number.toString();
    User.findOne({ personal_number: id }, (err, result) => {
      res.send(result);
    });
  });

  app.get('/user/:personal_number/loans', (req, res) => {
    const id = req.params.personal_number.toString();
    User.findOne({ personal_number: id }, (err, result) => {
      Loan.find({ personal_number: id }, (err, loans) => {
        //  console.log(loans);
        res.send(loans);
      });
    });
  });
};
