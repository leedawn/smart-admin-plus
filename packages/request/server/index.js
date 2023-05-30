const express = require("express");

const app = express();

// app.use(express.json({ type: "application/json" }));
// app.use(express.urlencoded({ extends: true }));
app.use(express.text());

// app.all("*", (_, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requestd-with");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/tenant-center/account/auth/password", (req, res) => {
  console.log(req.body);
  res.send("123456789");
});

app.get("/tenant-center/tenant/member", (req, res) => {});

app.post("/log", (req, res) => {
  console.log("🚀 ~ file: index.js:25 ~ app.post ~ req:", req.body);
});

app.listen(3000, () => {
  console.log("listen 3000");
});
