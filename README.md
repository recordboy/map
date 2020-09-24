## 프로젝트 폴더 생성

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

서버에 크롤링이나 퍼펫티어 모듈 추가

크롤링
```
npm i axios cheerio --save
```

퍼펫티어
```
npm i puppeteer cheerio --save
```

