const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Loan');

mongoose.connect(keys.mongoURI);

const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT);

require('./routes/userRoutes')(app);

require('./routes/loanRoutes')(app);


module.exports = app;