const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

// crawling
const axios = require("axios");
const cheerio = require("cheerio");

// data
let data = [];

app.use(cors());
app.use(bodyParser.json());
app.use('/api', (req, res)=> res.json({username:'bryan'}));
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})

const webdriver = require('selenium-webdriver');
const By = require('selenium-webdriver').By;

const driver = new webdriver.Builder();

console.log(driver);



// async function getHTML() {
//     try {
//     return await axios.get('https://place.map.kakao.com/26307427');
//     } catch (error) {
//     console.error(error);
//     }
// }

// getHTML()
//     .then((html) => {
//     const $ = cheerio.load(html);
//     console.log(html);
//     const bodyList = $(".tit_location").text();
//     return bodyList;
//     })
//     .then((res) => console.log(res));
