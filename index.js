const express = require('express');
const app = express()

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));
// }

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// // 크로스 설정
// const cors = require("cors");
// app.use(cors());

// // 포트 설정
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`express is running on ${PORT}`);
// });

// const fetch = require("node-fetch");
// app.use("/api/greeting", (req, res) => {
//   fetch(`https://place.map.kakao.com/m/main/v/27103887`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (myJson) {
//       const data = JSON.parse(JSON.stringify(myJson));
//       res.json(data);
//     });
// });

// 테스트용 더미 가져오기
// const fs = require("fs");
// const dataBuffer = fs.readFileSync('./data.json');
// const dataJSON = dataBuffer.toString();

// 데이터 가져오기
// const fetch = require("node-fetch");
// app.use("/api/greeting", (req, res) => {

//   // 테스트용, 더미 가져오기
//   // res.json(dataJSON);

//   // 장소 id
//   const id = req.param('id');

//   fetch(`https://place.map.kakao.com/m/main/v/${id}`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (myJson) {
//       const data = JSON.parse(JSON.stringify(myJson));
//       res.json(data);
//     });
// });
