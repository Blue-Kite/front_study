module.exports = function (app) {
  const index = require("../controllers/indexController"); //컨트롤러 콜백함수를 여기다가 정의해서 불러올것
  const jwtMiddleware = require("../../config/jwtMiddleware");

  // 라우터 정의
  // app.HTTP메서드(uri, 컨트롤러 콜백함수: 보통 2가지 인자를 가짐 request, respons)
  //app.get("/dummy", index.example);

  //학생테이블 조회
  //app.get("/students", index.readstudent);
  //학생 생성
  //app.post("/students", index.createstudent);
  //학생 업데이트
  //app.patch("/students/:idstudent", index.updateStudent);
  //학생 삭제
  //app.delete("/students/:idstudent", index.deleteStudent);
  app.get("/res", index.readres);
  app.post("/res", index.createres);
  app.patch("/res/:idres", index.updateres);
  app.delete("/res/:idres", index.deleteres);

  // 회원가입
  app.post("/sign-up", index.createUsers);
  // 로그인
  app.post("/sign-in", index.createJwt);
  // 로그인 유지, 토큰 검증, jwtMiddleware 에서 토큰을 뽑아냄 
  app.get("/jwt", jwtMiddleware, index.readJwt);
};
 