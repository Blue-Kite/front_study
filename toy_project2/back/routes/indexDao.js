const { pool } = require("../config/database");

//모든 카데고리 읽는것, 리프 카데고리만 읽는것 
exports.selectUser= async function (connection, idUser, password) {
  const Query = `select idUser, password, nickname, userIdx from user where idUser=? and password=? ;`; //mysql 쿼리를 적어줌
  const Params = [idUser, password];

  const rows = await connection.query(Query, Params);
  return rows;
};

exports.insertUser= async function (connection, idUser, password, nickname) {
  const Query = `insert into user(idUser, password, nickname) values (?,?,?);`; //mysql 쿼리를 적어줌
  const Params = [idUser, password, nickname];

  const rows = await connection.query(Query, Params);
  return rows;
};

exports.updateUser= async function (connection, idUser, password, newpassword) {
  const Query = `update user set password = ifnull(?, password) where idUser = ? and password=? ;`; //mysql 쿼리를 적어줌
  const Params = [newpassword, idUser, password];

  const rows = await connection.query(Query, Params);
  return rows;
};

exports.selectMovies = async function (connection) {
  const Query = `select * from movie;`; //mysql 쿼리를 적어줌
  const Params = [];

  const rows = await connection.query(Query, Params);
  return rows;
};

exports.selectImg = async function (connection) {
  const Query = `select id, url, createdate from profileimg where createdate = (select max(createdate) from profileimg);`; //mysql 쿼리를 적어줌
  const Params = [];

  const rows = await connection.query(Query, Params);
  return rows;
};

exports.insertImg= async function (connection, url, createtimestamp) {
  const Query = `insert into profileimg(url, createdate) values (?, ?);`; //mysql 쿼리를 적어줌
  const Params = [url, createtimestamp];

  const rows = await connection.query(Query, Params);
  return rows;
};