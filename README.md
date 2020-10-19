
npm init -y

리액트 생성
npx create-react-app client --typescript

서버 생성
npm install express nodemon cors node-fetch

루트에서 프록시 설정
npm install http-proxy-middleware

`setupProxy.js`

```javascript
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api/greeting", { target: "http://localhost:5000" }));
};
```

서버 두개 돌리기 위해 루트에 아래 설치
npm install concurrently
