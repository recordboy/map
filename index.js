const express = require('express');
const app = express()

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// 서버 확인용
app.get("/api/greeting", (req,res) => {
  res.send("Hello World!");
})

// 크로스 설정
const cors = require("cors");
app.use(cors());

// 포트 설정
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`express is running on ${PORT}`);
});

// 테스트용 더미 가져오기
// const fs = require("fs");
// const dataBuffer = fs.readFileSync('./data.json');
// const dataJSON = dataBuffer.toString();

// 데이터 가져오기
const fetch = require("node-fetch");
app.use("/api/greeting", (req, res) => {

  // 테스트용, 더미 가져오기
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
