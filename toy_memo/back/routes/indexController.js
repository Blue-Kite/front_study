const { pool } = require("../config/database");
const { logger } = require("../config/winston");
const secret = require("../config/secret");
const indexDao = require("./indexDao"); //db접근 코드는 또 따로 분리, db정보를 가공하는게 indexController

exports.readCategory = async function (req, res) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.selectCategory(connection); //js 비구조할당 문법이라고함

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 성공시 200번대, 요청 실패시 400번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`example Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};

exports.createMemo = async function (req, res) {
  //idmemo는 자동증가라서
  const { main, title, idcategory } = req.body;

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.insertMemo(connection, main, title, idcategory); //js 비구조할당 문법이라고함

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 성공시 200번대, 요청 실패시 400번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`example Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};

exports.readMemoList = async function (req, res) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.selectMemoList(connection); //js 비구조할당 문법이라고함

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 성공시 200번대, 요청 실패시 400번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`example Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};

exports.readMemo = async function (req, res) {
  const { idmemo } = req.params;
  console.log('here');
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.selectMemo(connection, idmemo); //js 비구조할당 문법이라고함

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 성공시 200번대, 요청 실패시 400번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`example Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};

exports.changeMemo = async function (req, res) {
  const { main, title, idcategory } = req.body;
  const { idmemo } = req.params; //url를 통해 날라옴 

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.updateMemo(connection, idmemo, main, title, idcategory); //js 비구조할당 문법이라고함

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 성공시 200번대, 요청 실패시 400번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`example Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};

exports.removeMemo = async function (req, res) {
  const { idmemo } = req.params;

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.deleteMemo(connection, idmemo); //js 비구조할당 문법이라고함

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 성공시 200번대, 요청 실패시 400번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`example Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`example DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};
