const mongoose = require('mongoose');
const Loan = mongoose.model('loans');
const User = mongoose.model('users');
const ObjectId = require('mongodb').ObjectId;

module.exports = app => {
  app.post('/loan', (req, res) => {
    //console.log(req.body.amount);
    const loanUser = User.findOne(
      { personal_number: req.body.personal_number },
      (err, result) => {
        if (req.body.amount <= result.account_limit) {
            res.send(req.body);
            return new Loan(req.body).save();
        } else {
            
          return res
            .status(400)
            .send('User not allowed to borrow more than their limit.');
        }
      }
    );
  });

  app.get('/loan/:id', (req, res) => {
    const loan = Loan.findOne({ _id: ObjectId(req.params.id) }, (err, result) => {
     console.log(result);
      res.send(result);
    });
  });

  app.post('/loan/:id/transactions', (req, res) => {
   // console.log(req.params.id);
    Loan.findOne({ _id: ObjectId(req.params.id) }, (err, result) => {
     // console.log(result.amount);
      if (req.body.amount > result.amount) {
        return res.status(400).send('User cannot pay back more than they owe.');
      }
      result.amount -= req.body.amount;
      result.transactions.push(req.body);
      result.save(err => {
        if (err) {
        }
      });
      // console.log(result);
      // console.log(req.body);
      res.send(req.body);
    });
  });

  app.get('/loan/:id/transactions', (req, res) => {
    Loan.findOne({ _id: ObjectId(req.params.id) }, (err, result) => {
    //  console.log(JSON.stringify(result.transactions));
      res.send(result.transactions);
    });
  });
};
