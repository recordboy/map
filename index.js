const express = require('express');
const path = require('path');
const fetch = require("node-fetch");
const app = express();

// 크로스 설정
const cors = require("cors");
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// 테스트 더미
// const fs = require("fs");
// const dataBuffer = fs.readFileSync('./data.json');
// const dataJSON = dataBuffer.toString();

// Put all API endpoints under '/api'
app.get('/api/data', (req, res) => {
  
  // 테스트 더미
  // res.json(dataJSON);

  // 장소 id
  const id = req.param('id');

  fetch(`https://place.map.kakao.com/m/main/v/${id}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      const data = JSON.parse(JSON.stringify(myJson));
      res.json(data);
    });
  
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Getting place data ${port}`);
