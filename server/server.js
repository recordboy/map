const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use("/api", (req, res) => res.json({ username: "bryan" }));
app.use(cors());

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // await page.goto('https://www.goodchoice.kr/product/search/2');
  await page.goto("https://place.map.kakao.com/m/main/v/20615157");
  const content = await page.content();
  //////////////////////////////////////////////////////////////////

  console.log(content);

  //////////////////////////////////////////////////////////////////
  await browser.close();
})();

//////////////////////////////////////////////// //
app.use("/static", express.static("public"));
////////////////////////////////////////////////
