const { pool } = require("../../config/database");
const { logger } = require("../../config/winston");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");

const indexDao = require("../dao/indexDao");

//생성함수 -> 데이터를 넣어주어야함 
exports.createres = async function (req, res) {
  const { idres, nameres, address, category, createat, urlres} = req.body;

  //들어오는 작업에 대한 검증이 필요함 

  //nameres, address, category, createat, urlres : 문자열
  if( typeof nameres !== "string" || typeof address !== "string" || typeof category !== "string" || typeof urlres !== "string"){
    return res.send({
      isSuccess: false,
      code: 400,
      message: "정확한 값을 입력해주세요"
    });
  }

  //createat: YYYY-MM-DD 형식 검사 
  var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
  if ( createat && !regex.test(createat)) {
    return res.send({
      isSuccess: false,
      code: 400, // 요청 실패시 400번대 코드
      message: "날짜 형식을 확인해주세요.",
    });
  }

 //console.log(idres, nameres, address, category, createat, urlres);
  
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.insertRes(connection, idres, nameres, address, category, createat, urlres); //js 비구조할당 문법이라고함 

      return res.send({
        isSuccess: true,
        code: 200, // 요청 성공시 200번대, 요청 실패시 400번대 코드
        message: "레스토랑 생성 요청 성공",
      });
    } catch (err) {
      logger.error(`create restaurant Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`create restaurant DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }

};

//카데고리별 레스토랑 조회, 쿼리스트링 방식으로 구현 
exports.readres = async function(req, res){
  const { category } = req.query;
  
  // 카테고리 값이 넘어 왔다면, 유효한 값인지 체크
  if (category) {
    const validCategory = [
      "한식",
      "중식",
      "일식",
      "양식",
      "분식",
      "베이커리",
      "카페",
      "기타",
    ];

  if (!validCategory.includes(category)) {
      return res.send({
        isSuccess: false,
        code: 400, // 요청 실패시 400번대 코드
        message: "유효한 카테고리가 아닙니다.",
      });
    }
  }

  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.selectRes(connection, category); //js 비구조할당 문법이라고함 

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 성공시 200번대, 요청 실패시 400번대 코드
        message: "요청 성공",
      });
    } catch (err) {
      logger.error(`레스토링 조회 Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`레스토랑 조회 DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};

//레스토랑 테이블 업데이트 
exports.updateres = async function (req, res) {
  const { nameres, address, category, createat, urlres} = req.body;
  const { idres } = req.params;

  //값이 있어야 업데이트를 함, 값있고 string 타입일때 
  if (nameres && typeof nameres !== "string"){
    return res.send({
      isSuccess: false,
      code: 400,
      message: "2정확한 값을 입력해주세요"
    });
  }
  if (address && typeof address !== "string"){
    return res.send({
      isSuccess: false,
      code: 400,
      message: "3정확한 값을 입력해주세요"
    });
  }
  if (category && typeof category !== "string"){
    return res.send({
      isSuccess: false,
      code: 400,
      message: "4정확한 값을 입력해주세요"
    });
  }

  
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      
      //실제로 db에 있는 유효한 인덱스인지 확인이 필요 
      const isValidIdx = await indexDao.isValidIdx(connection, idres);
      if (!isValidIdx){
        return res.send({
          isSuccess: false,
          code: 400,
          message: "레스토랑 ID 정확한 값을 입력해주세요"
        });
      }

      const [rows] = await indexDao.updateRes(connection, idres, nameres, address, category, createat, urlres); //js 비구조할당 문법이라고함 
      console.log("error", [rows]);
      return res.send({
        isSuccess: true,
        code: 200, // 요청 성공시 200번대, 요청 실패시 400번대 코드
        message: "수정 요청 성공",
      });
    } catch (err) {
      logger.error(`update restaurant Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error( `update restaurant DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
  
};

//레스토랑 삭제 => 테이블의 row를 삭제하는 것이 아닌 status를 D로 바꾸기만 함 
exports.deleteres = async function (req, res) {
  const { idres } = req.params;
   
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      //studentIdx가 실제로 db에 있는 유효한 인덱스인지 확인이 필요 
      const isValidIdx = await indexDao.isValidIdx(connection, idres);
      if (!isValidIdx){
        return res.send({
          isSuccess: false,
          code: 400,
          message: "레스토랑 id 정확한 값을 입력해주세요"
        });
      }

      const [rows] = await indexDao.deleteRes(connection, idres); //js 비구조할당 문법이라고함 

      return res.send({
        result: rows,
        isSuccess: true,
        code: 200, // 요청 성공시 200번대, 요청 실패시 400번대 코드
        message: "삭제 요청 성공",
      });
    } catch (err) {
      logger.error(`Query error\n: ${JSON.stringify(err)}`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    logger.error(`DB Connection error\n: ${JSON.stringify(err)}`);
    return false;
  }
};


// 예시 코드
exports.example = async function (req, res) {
  
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await indexDao.exampleDao(connection); //js 비구조할당 문법이라고함 

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
