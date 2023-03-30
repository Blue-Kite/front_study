const { pool } = require("../../config/database");

//생성 
exports.insertRes = async function (connection, idres, nameres, address, category, createat, urlres) {
  const Query = `insert into restaurant(idres, nameres, address, category, createat, urlres) values(?, ?, ?, ?, ?, ?);`; //mysql 쿼리를 적어줌 
  //Params 배열에 있는 원소 순대로 쿼리의 ?에 대입됨 
  const Params = [idres, nameres, address, category, createat, urlres];

  const rows = await connection.query(Query, Params);

  return rows;
};


exports.selectRes = async function (connection, category) {
  //const Query = `SELECT *FROM student`; mysql 쿼리를 적어줌 
  const selectAllRes = `SELECT *FROM restaurant where status = 'A';`;
  const selectResbyCategory = `SELECT *FROM restaurant where category=? AND status = 'A'; `;
  const Params = [category];

  let Query;

  if (!category){
    Query = selectAllRes;
  }else{
    Query = selectResbyCategory;
  }

  const rows = await connection.query(Query, Params);
  return rows;
};


exports.updateRes = async function (connection, idres, nameres, address, category, createat, urlres) {
  //const Query = `update restaurant set nameres = ifnull(?, nameres) where idres = ?;`; //mysql 쿼리를 적어줌 
  const Query = `update restaurant set nameres = ifnull(?, nameres), address = ifnull(?, address), category = ifnull(?, category), createat = ifnull(?, createat), urlres = ifnull(?, urlres)  where idres = ?;`;
  const Params = [nameres, address, category, createat, urlres, idres];
  const rows = await connection.query(Query, Params);

  return rows;
};


exports.isValidIdx = async function (connection, idres) {
  const Query = `SELECT *FROM restaurant where idres = ?;`; //mysql 쿼리를 적어줌 
  const Params = [idres];


  const [rows] = await connection.query(Query, Params);
  console.log("isvalid", rows)

  if (rows < 1) {
    return false;
  }
  return true;
};

exports.deleteRes = async function (connection,  idres) {
  const Query = `update restaurant set status = "D" where  idres = ?;`; //mysql 쿼리를 적어줌 
  const Params = [ idres ];

  const rows = await connection.query(Query, Params);

  return rows;
};


//로그인용코드
//회원가입 
exports.insertUsers = async function (connection, userID, password, nickname) {
  const Query = `insert into users(userid, password, nickname) values (?,?,?);`;
  const Params = [userID, password, nickname];

  const rows = await connection.query(Query, Params);

  return rows;
};

//회원검증 => 해당 id와 pw를 가진 유저가 존재하는지?
exports.isValidUsers = async function (connection, userID, password) {
  const Query = `SELECT userid, nickname FROM users where userid = ? and password = ? and status = 'A';`;
  const Params = [userID, password];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.exampleDao = async function (connection) {
  const Query = `SELECT *FROM student`; //mysql 쿼리를 적어줌 
  const Params = [];

  const rows = await connection.query(Query, Params);

  return rows;
};
