// @ts-nocheck
const express = require("express");
const multer = require("multer");
const app = express();
const port = 3000;

app.use(express.static("public"));

const storage = multer.memoryStorage(); // 使用内存存储分片
const upload = multer({ storage });

const uploadedChunks = {};

app.post("/upload", upload.single("chunk"), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", '*');
  const { chunk, start, end } = req.body;
  const chunkData = { chunk, start, end };

  if (!uploadedChunks[req.file.originalname]) {
    uploadedChunks[req.file.originalname] = [];
  }

  uploadedChunks[req.file.originalname].push(chunkData);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
