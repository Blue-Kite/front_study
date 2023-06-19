const express = require("./config/express");  
const { logger } = require("./config/winston");

const port = 5000; //노드 서버가 사용할 포트 
express().listen(port, function () {
  console.log(`${port}`);
  logger.info(`${port}`);
}); 