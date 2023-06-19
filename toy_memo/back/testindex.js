const express = require('express');
const app = express();
const path = require('path');
const test = require('./routes/test');

app.use('/test', test);

const port = 5000; //노드 서버가 사용할 포트 
app.listen(port, function () {
  console.log(`${port}`)
}); 