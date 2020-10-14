# 초기 세팅(React, Express)

## 초기화
프로젝트 생성 후 해당 디렉토리로 이동
```
$ mkdir my-app
$ cd my-app
```

프로젝트 초기화, 질문 나오면 계속 엔터
```
$ npm init
```

## 서버 설치
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

## 클라이언트 설치
리액트 설치(TypeScript)
```
$ create-react-app client --use-npm --template typescript
```

이따가 프록시 설정이 잘 되있는지 확인하기 위해 `src/App.tsx`에 아래처럼 링크 하나 추가
```tsx
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/* 이부분 추가 */}
        <a className="App-link" href="/api/greeting">
          test
        </a>
        {/* // 이부분 추가 */}

      </header>
    </div>
  );
}

export default App;
```

## 프록시 설정(react-scripts 버전 2 이상)

루트에 `http-proxy-middleware` 설치
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

서버 두개를 돌리기 위해 루트경로에 `concurrently` 설치
```
$ npm install concurrently
```

루트 `package.json`에 `script`부분 아래 내용 추가
```json
"scripts": {
  "server": "nodemon index.js",
  "client": "npm run start --prefix client",
  "dev": "concurrently \"npm run server\" \"npm run client\""
},
```

앱 구동
```
$ npm run dev
```

[http://localhost:3000/](http://localhost:3000/)가 정상으로 나오면 test 링크를 클릭해 `Hello World!`가 정상으로 나오는지 확인한다.

## Reference
[Express 서버와 React: Proxy 활용과 빌드 및 헤로쿠(Heroku) 배포](https://chaewonkong.github.io/posts/express-with-react.html)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

# 이전 버전 초기화

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
