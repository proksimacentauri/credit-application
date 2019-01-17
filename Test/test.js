var expect = require('chai').expect;
const chai = require('chai');
var assert = require('assert');

chai.use(require('chai-http'));

const app = require('../index'); // Our app

var Loan = require('../models/Loan');

describe('all get requests', function() {
  this.timeout(10000);
  it('all values should be correct type.', function() {
    return chai
      .request(app)
      .get('/user/199108303430/loans')
      .then(function(res) {
        for (let i = 0; i < res.body.length; i++) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body[i].personal_number).to.be.an('string');
          expect(res.body[i]._id).to.be.an('string');
          expect(res.body[i].amount).to.be.an('number');
          expect(res.body[i].description).to.be.an('string');
          expect(res.body[i].paid_off).to.be.an('boolean');
          expect(res.body[i].transactions).to.be.an('array');
          //console.log(res.body)
        }
      });
  });

  it('all values should be correct type.', function() {
    return chai
      .request(app)
      .get('/user/199108303430')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.first_name).to.be.an('string');
        expect(res.body.last_name).to.be.an('string');
        expect(res.body.personal_number).to.be.an('string');
        expect(res.body._id).to.be.an('string');
        expect(res.body.account_limit).to.be.an('number');

        // console.log(res.body, res.body.first_name);
      });
  });

  it('all values should be correct type.', function() {
    return chai
      .request(app)
      .get('/loan/5c082b10eed35b88660ffc43')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body._id).to.be.an('string');
        expect(res.body.personal_number).to.be.an('string');
        expect(res.body.amount).to.be.an('number');
        expect(res.body.description).to.be.an('string');
        expect(res.body.paid_off).to.be.an('boolean');
      });
  });

  it('all values should be correct type.', function() {
    return chai
      .request(app)
      .get('/loan/5c015d4fd819a146861ac291/transactions')
      .then(function(res) {
        // console.log(res.body);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        for (let i = 0; i < res.body.length; i++) {
          expect(res.body[i]._id).to.be.an('string');
          expect(res.body[i].amount).to.be.an('number');
        }
      });
  });

  it('should add a new user', function() {
    return chai
      .request(app)
      .post('/user')
      .send({
        first_name: 'meerkat',
        last_name: 'merkat',
        personal_number: '199811240102',
        account_limit: 30000
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.first_name).to.be.an('string');
        expect(res.body.last_name).to.be.an('string');
        expect(res.body.personal_number).to.be.an('string');
        expect(res.body.account_limit).to.be.an('number');
      });
  });

  it('should add a new loan', function() {
    return chai
      .request(app)
      .post('/loan')
      .send({
        personal_number: '199811240102',
        amount: 30000,
        description: 'example',
        paid_off: false
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.personal_number).to.be.an('string');
        expect(res.body.amount).to.be.an('number');
        expect(res.body.description).to.be.an('string');
        expect(res.body.paid_off).to.be.an('boolean');
      });
  });

  it('should add a new loan transaction', function() {
    return chai
      .request(app)
      .post('/loan/5c0162bb5883b448201031fe/transactions')
      .send({
        amount: 50
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.amount).to.be.an('number');
      });
  });

  it('should return Bad Request', function() {
    return chai
      .request(app)
      .post('/loan')
      .type('form')
      .send({
        personal_number: 199108303430,
        amount: 300000,
        description: 'This is an example loan',
        paid_off: false
      })
      .then(function(res) {
        expect(res).to.have.status(400);
      })
    
  });

  it('should return Bad Request', function() {
    return chai
      .request(app)
      .post('/loan/5c0162a55883b448201031fd/transactions')
      .type('form')
      .send({
        amount: 300000
      })
      .then(function(res) {
        expect(res).to.have.status(400);
      })
    
  });
});

/*

const donger = command => {
  if (command == 'meeerkat') {
    return 'meeerkat';
  } else if (command == 'bunbuns') {
    return 'bunbuns';
  }
  return 'sure';
};

describe('Hello World', function() {
  it('should equal 2', function() {
    assert.equal(2, 2);
  });
  it('should act like Donger', function() {
    assert.equal(donger('wanna play a game'), 'sure');
    assert.equal(donger('meeerkat'), 'meeerkat');
    assert.equal(donger('bunbuns'), 'bunbuns');
  });
});
*/
