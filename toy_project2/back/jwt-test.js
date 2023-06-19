const jwt = require("jsonwebtoken");

const secret = "this is my secret server key";

//jwt토큰 생성
const token = jwt.sign(
  { userIdx: 100, nickname: "홍길동" }, // payload 정의
  secret // 서버 비밀키
);

console.log(token);

//jwt 토큰 검증
const verifiedToken = jwt.verify(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4IjoxMDAsIm5pY2tuYW1lIjoi7ZmN6ri464-ZIiwiaWF0IjoxNjgzODU0NDMxfQ.rzn5Mo1wmE0ccTG8FjBOhKzPmcP08VBHFfo92VQbCLY",
  secret
);

console.log(verifiedToken);