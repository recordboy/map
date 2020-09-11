# Map

프로젝트 폴더 생성

클라이언트 영역 리액트 프로젝트로 생성
```
create-react-app client --use-npm --template typescript
```

server 폴더 생성하고 npm 초기화 뒤 익스프레스 설치

```
npm init
npm add express --save
```

server 폴더에 server.js 파일 생성하고 아래처럼 입력

```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;

app.use(bodyParser.json());
app.use('/api', (req, res)=> res.json({username:'bryan'}));

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})
```

서버 실행

http://localhost:3001/api 에 {"username":"bryan"} 나오면 됨

리액트 부근에 아래처럼 데이터 받아옴

```javascript
fetch("http://localhost:3001/api")
  .then((res) => res.json())
  .then((data) => console.log(data));
```

서버쪽에 크로스 모듈 추가

npm install cors --save

서버 수정

```
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;

app.use(cors());

app.use(bodyParser.json());
app.use('/api', (req, res)=> res.json({username:'bryan'}));

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})
```

서버에 크롤링이나 퍼펫티어 모듈 추가

크롤링
```
npm i axios cheerio --save
```

퍼펫티어
```
npm i puppeteer cheerio --save
```

아래는 서버에 들어가는 전체 코드
```
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;

app.use(cors());

app.use(bodyParser.json());
app.use("/api", (req, res) => res.json({ username: "bryan" }));

app.listen(port, () => {
  console.log(`express is running on ${port}`);
});

//////////////////////////////////////////////////////////////////////
app.use("/static", express.static("public"));
//////////////////////////////////////////////////////////////////////

const axios = require("axios");
const cheerio = require('cheerio');

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

```

서버에 정적 파일 추가할거면 public 디렉토리 만들고 서버 아래 코드 추가
```
app.use("/static", express.static("public"));
```

