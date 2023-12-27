// https://github.com/lilins/Blog/issues/4

const express = require('express')
const path = require('path')
const app = express()
const port = 3000

var oneDay = 86400000;

const opts = {
  etag: false,
  lastModified: true,
  maxAge: 0
}
app.use('/static', express.static(path.join(__dirname, 'static'), opts))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))