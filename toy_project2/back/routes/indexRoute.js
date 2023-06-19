module.exports = function (app) {
    const index = require("./indexController"); 
    const jwtMiddleware = require('../config/jwtMiddleware');

    // 라우터 정의
    // app.HTTP메서드(uri, 컨트롤러 콜백함수: 보통 2가지 인자를 가짐 request, respons);
    // 예를들어 app.get("/dummy", function(req, res){} );
    app.get("/dummy", function(req, res){
      //res.send("get dummy 성공");
      res.send({test: "this is test"});
    });

    //컨트롤러 콜백함수를 indexController에 모음
    app.post("/login", index.readUser);
    app.post("/createaccount", index.createAccount);
    app.patch("/changepw", index.changePw);
    app.get("/jwt", jwtMiddleware, index.readJwt);
    app.get("/movie", index.readMovie);

    //이미지
    app.get("/download", index.readImg);
    app.post("/upload", index.createImg);

  };
   