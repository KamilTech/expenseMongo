const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose'); // Node Tool for MongoDB
const config = require('./config/database'); // Mongoose Config
const publicPath = path.join(__dirname, '..', 'public');

// Database Connection
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

//app.use(express.static(publicPath));

app.get('*', (req, res) => {
  //res.sendFile(path.join(publicPath, 'index.html'));
  res.send(`<h1>WORK</h1>`);
});

app.listen(3000, () => {
  console.log('Server is up!');
});
