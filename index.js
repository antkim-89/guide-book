let express = require("express");
let path = require("path");
let app = express();

// 정적 파일 서빙을 위한 미들웨어
app.use(express.static(__dirname));

app.listen(3000, function () {
  console.log("App is running on port 3000");
  console.log("Open http://localhost:3000 in your browser");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
