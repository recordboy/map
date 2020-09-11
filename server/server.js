const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use("/api", (req, res) => {
  
  getData();
  // res.json({ username: "bryan" });
});

// cors
app.use(cors());

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});

const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const getData = (url) => {
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://place.map.kakao.com/m/main/v/20615157");
    const content = await page.content();
    //////////////////////////////////////////////////////////////////

    console.log(content);

    //////////////////////////////////////////////////////////////////
    await browser.close();
  })();
};
