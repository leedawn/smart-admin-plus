import express from "express";
import childProcess from "child_process";
import { renderToString } from "react-dom/server";
import path from "path";
import router from "../router";
import { StaticRouter } from "react-router-dom/server";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";

// const bodyParser = require("body-parser");
// console.log("🚀 ~ file: index.tsx:11 ~ bodyParser", bodyParser);

const app = express();

app.use(express.static(path.resolve(process.cwd(), "client_build")));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/getDemoData", (req, res) => {
  res.send({
    data: req.body,
    status_code: 0,
  });
});

app.get("*", (req, res) => {
  const content = renderToString(
    <StaticRouter location={req.path}>
      <Routes>
        {router.map((item, index) => {
          return <Route {...item} key={index}></Route>;
        })}
      </Routes>
    </StaticRouter>
  );

  const helmet = Helmet.renderStatic();
  res.send(`
    <html>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
    </head>
      <body>
        <div id="root">${content}</div>
        <script src="/index.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("ssr-server listen on 3000");
});

childProcess.exec("start http://127.0.0.1:3000");
