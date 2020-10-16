const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/api/greeting", { target: "https://recordboy-my-place.herokuapp.com" }));
};