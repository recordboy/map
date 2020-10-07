const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001; // 로컬 전용
// const port = process.env.PORT || 5000; // heroku 전용
const fetch = require("node-fetch");

app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`express is running on ${port}`);
});

// 테스트용, 더미 가져오기
// const fs = require("fs");
// const dataBuffer = fs.readFileSync('./data2.json');
// const dataJSON = dataBuffer.toString();

app.use("/api", (req, res) => {

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

// const puppeteer = require("puppeteer");
// const cheerio = require("cheerio");
// const axios = require("axios");

// 퍼펫티어
// const puppeteer = require('puppeteer');
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   // await page.goto('https://www.goodchoice.kr/product/search/2');
//   await page.goto('https://place.map.kakao.com/m/20615157');

//   const content = await page.content();
//   const $ = cheerio.load(content);
//   console.log($.text());
//   const lists = $(".cont_evaluation").text();
//   console.log(lists);

//   await browser.close();
// })();

// 크롤링
// async function getHTML() {
//     try {
//       return await axios.get("http://localhost:3001/static/index.html");
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   getHTML()
//     .then((html) => {
//       // console.log(html);
//       const $ = cheerio.load(html.data);
//       const bodyList = $("#data").text();
//       return bodyList;
//     })
//     .then((res) => console.log(res));
