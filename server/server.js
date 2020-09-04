const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', (req, res)=> res.json({username:'bryan'}));
app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})

const axios = require("axios");
const cheerio = require("cheerio");

async function getHTML() {
    try {
    return await axios.get('https://recordboy.github.io/');
    } catch (error) {
    console.error(error);
    }
}

getHTML()
    .then((html) => {
    const $ = cheerio.load(html.data);
    const bodyList = $(".link-muted").text();
    return bodyList;
    })
    .then((res) => console.log(res));
