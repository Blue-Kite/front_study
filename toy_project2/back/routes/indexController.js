const { pool } = require("../config/database");
const { logger } = require("../config/winston");
const secret = require("../config/secret");
const indexDao = require("./indexDao"); //db접근 코드는 또 따로 분리, db정보를 가공하는게 indexController
const jwt = require("jsonwebtoken");
const multer = require('multer');

exports.readUser = async function (req, res) {
  const { idUser, password } = req.body;

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      //DB에 유저가 있는지 
      const [rows] = await indexDao.selectUser(connection, idUser, password); 
      
      //DB정보가 해당 유저 정보가 없다면 
      if (rows.length < 1) {
        return res.send({
          isSuccess: false,
          code: 410, // 요청 실패시 400번대 코드
          message: "회원정보가 존재하지 않습니다.",
        });
      }

      const { userIdx, nickname } = rows[0];
      //console.log(userIdx, nickname);
      //JWT 생성 
      const token = jwt.sign(
        { userIdx: userIdx, nickname: nickname }, // payload 정의
        secret.jwtsecret 
      ); 

      return res.send({
        //result: rows,
        result: { jwt: token },
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

// 로그인 유지, 토큰 검증
exports.readJwt = async function (req, res) {
  //req.verifiedToken : 
  const { userIdx, nickname } = req.verifiedToken;

  return res.send({
    result: { userIdx: userIdx, nickname: nickname },
    code: 200, // 요청 실패시 400번대 코드
    message: "유효한 토큰입니다.",
  });
};

exports.createAccount = async function (req, res) {
  const { idUser, password, nickname } = req.body;

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.insertUser(connection, idUser, password, nickname); 
      
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

exports.changePw = async function (req, res) {
  const { idUser, password, newpassword } = req.body;

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.updateUser(connection, idUser, password, newpassword ); 
      
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

exports.readMovie = async function (req, res) {
  
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      //DB에 유저가 있는지 
      const [rows] = await indexDao.selectMovies(connection); 

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

exports.createImg = async function (req, res) {
  const { url, createtimestamp } = req.body;

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      //DB에 유저가 있는지 
      const [rows] = await indexDao.insertImg(connection, url, createtimestamp); 

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

//이미지 로컬에 저장 
exports.readImg = async function (req, res) {
  
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      //DB에 유저가 있는지 
      const [rows] = await indexDao.selectImg(connection); 

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