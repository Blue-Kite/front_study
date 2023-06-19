const { pool } = require("../config/database");

//모든 카데고리 읽는것, 리프 카데고리만 읽는것 
exports.selectCategory = async function (connection) {
  const Query = `select * from category;`; //mysql 쿼리를 적어줌
  const Params = [];

  const rows = await connection.query(Query, Params);
  return rows;
};

exports.selectMemoList = async function (connection) {
  const Query = `select * from memo`;
  const Params = [];

  const rows = await connection.query(Query, Params);
  return rows;
};

exports.selectMemo = async function (connection, idmemo) {
  const Query = `select * from memo where idmemo = ?`;
  const Params = [idmemo];

  const rows = await connection.query(Query, Params);
  return rows;
};

exports.insertMemo = async function (connection, main, title, idcategory) {
  const Query = `insert into memo(main, title, idcategory) values (?,?,?);`;
  const Params = [main, title, idcategory];

  const rows = await connection.query(Query, Params);
  return rows;
};

exports.updateMemo = async function (connection, memoIdx, main, title, idcategory) {
  const Query = `update memo set main = ifnull(?, main), title = ifnull(?, title), idcategory = ifnull(?, idcategory) where idmemo = ?;`;
  const Params = [main, title, idcategory, memoIdx];

  const rows = await connection.query(Query, Params);
  return rows;
};

exports.deleteMemo = async function (connection, idmemo) {
  const Query = `delete from memo where idmemo = ?`;
  const Params = [idmemo];

  const rows = await connection.query(Query, Params);
  return rows;
};