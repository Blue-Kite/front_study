module.exports = function (app) {
    const index = require("./indexController"); 
  
    // 라우터 정의
    // app.HTTP메서드(uri, 컨트롤러 콜백함수: 보통 2가지 인자를 가짐 request, respons);
    // 예를들어 app.get("/dummy", function(req, res){} );
    app.get("/dummy", function(req, res){
      //res.send("get dummy 성공");
      res.send({test: "this is test"});
    });

    //컨트롤러 콜백함수를 indexController에 모음
    app.get("/category", index.readCategory);
    app.get("/memoList", index.readMemoList);
    app.get("/memo/:idmemo", index.readMemo);
    app.patch("/memo/:idmemo", index.changeMemo);
    app.post("/memo", index.createMemo);
    app.delete("/memo/:idmemo", index.removeMemo);
  };
   