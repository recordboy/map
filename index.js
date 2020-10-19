const express = require('express');
const path = require('path');
const fetch = require("node-fetch");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
// app.use('/api/data', (req, res) => {
app.get('/api/data', (req, res) => {

  fetch(`https://place.map.kakao.com/m/main/v/27103887`)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      const data = JSON.parse(JSON.stringify(myJson));
      res.json(data);
    });

  // const count = 5;

  // // Generate some passwords
  // const passwords = Array.from(Array(count).keys()).map(i =>
  //   generatePassword(12, false)
  // )

  // // Return them as json
  // res.json(passwords);

  // console.log(`Sent ${count} passwords`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Getting place data ${port}`);
