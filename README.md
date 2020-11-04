
프로젝트 디렉토리 생성 및 npm 초기화
```
$ mkdir my-app
$ cd my-app 
$ npm init -y
```

익스프레스 서버 생성 및 필요 모듈 추가
```
$ npm install express nodemon cors node-fetch
```






`index.js`폴더 생성 후 아래 코드 입력
```javascript
const express = require('express');
const path = require('path');
const fetch = require("node-fetch");
const app = express();

// 크로스 설정
const cors = require("cors");
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/data', (req, res) => {

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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Getting place data ${port}`);
```

루트 `package.json`에 아래 내용 추가
```javascript
"scripts": {
  "start": "node index.js"
}
```

익스프레스 서버 구동
```
$ npm start
```

아래 주소에서 데이터 출력 확인
[http://localhost:5000/api/data](http://localhost:5000/api/data)


리액트 생성
```
$ npx create-react-app client --typescript
```

서버, 클라이언트 동시 실행 모듈은 아래 설치
```
$ npm install concurrently
```

<!-- 
루트에서 프록시 설정
npm install http-proxy-middleware

`setupProxy.js`

```javascript
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api/greeting", { target: "http://localhost:5000" }));
};
``` -->
