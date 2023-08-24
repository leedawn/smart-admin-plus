const express = require("express");
const app = express();
app.get("/", (req, res) => {
  const { msg, callback } = req.query;
  console.log(msg,callback);
  res.end(`${callback}('server')`);
});
app.listen(7777);
