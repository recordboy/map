초기 세팅(React, Express)

프로젝트 생성 후 해당 디렉토리로 이동
```
$ mkdir my-app
$ cd my-app
```

프로젝트 초기화, 질문 나오면 계속 엔터
```
$ npm init
```

익스프레스, 노드몬 설치
```
$ npm install express
$ npm install nodemon
```

`index.js` 파일 추가, 아래처럼 입력
```javascript
const express = require('express');
const path = require('path');
const app = express()

app.get("/api/greeting", (req,res) => {
  res.send("Hello World!");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT);
```

익스프레스 서버 가동
```
npm run server
```

[http://localhost:5000/api/greeting](http://localhost:5000/api/greeting) 로 들어가 익스프레스 서버 확인

리액트 설치(TypeScript)
```
$ create-react-app client --use-npm --template typescript
```

프록시 설정(react-scripts의 버전이 2 이상인 경우)
```
$ npm install http-proxy-middleware
```

`client/src` 경로에 `setupProxy.js`파일 생성 후 아래 입력

```javascript
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api/greeting", { target: "http://localhost:5000" }));
};
```



////////////////////////////////////////////////////////////////////////////////////////////////





클라이언트 폴더로 리액트 프로젝트로 생성
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

server 디렉토리에 `.gitignore` 추가한 뒤 아래 코드 추가
```
/node_modules
```

서버 실행

http://localhost:3001/api 에 {"username":"bryan"} 나오면 됨

리액트 부근에 아래처럼 데이터 받아옴

```javascript
fetch("http://localhost:3001/api")
  .then((res) => res.json())
  .then((data) => console.log(data));
```

서버에 크로스 모듈 추가

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

크롤링
```
npm i axios cheerio --save
```

퍼펫티어
```
npm i puppeteer cheerio --save
```
