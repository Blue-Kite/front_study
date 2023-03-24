const express = require("./config/express");
const { logger } = require("./config/winston"); //프로세스를 실행하면서 log를 찍음 

const port = 3000;
express().listen(port);// express를 실행 

logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);