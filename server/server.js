const path = require('path');
const express = require('express');
const router = express.Router(); 
const app = express();
const mongoose = require('mongoose'); // Node Tool for MongoDB
const config = require('./config/database'); // Mongoose Config
const publicPath = path.join(__dirname, '..', 'public');
const bodyParser = require('body-parser');
const cors = require('cors');

const authentication = require('./routes/authentication')(router);
const expenses = require('./routes/expenses')(router);

// Database Connection
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(config.uri, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

// Middleware
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
//app.use(express.static(publicPath));
app.use('/authentication', authentication);
app.use('/expenses', expenses);

app.get('*', (req, res) => {
  //res.sendFile(path.join(publicPath, 'index.html'));
  res.send(`<h1>WORK</h1>`);
});

app.listen(3000, () => {
  console.log('Server is up!');
});
