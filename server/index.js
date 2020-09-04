const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("../server/config/key");
const { auth } = require("../server/middleware/auth");
const { User } = require("../server/models/User");

//
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("connected...."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!🎨");
});

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요~");
});

//회원 가입시 필요한 정보들을 client에서 가져오면
// 그것들을 데이터 베이스에 넣어준다.
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
  console.log(user);
});

//로그인 라우터
app.post("/api/users/login", (req, res) => {
  //요청된 이메일을 DB에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    //이메일이 없다면
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: " 제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //요청된 이메일이 DB에 존재한다면 비밀번호가 맞는지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      //  console.log('err',err)
      // console.log('isMatch',isMatch)
      //비밀번호가 같지않다면
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 일치하지 않습니다.",
        });

      //비밀번호가 맞다면 token을 생성한다.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //토큰을 어디에 저장할 것인가? 쿠키 localstorage ssesion
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// role 1 어드민 role 2특정부서 어드민
// role 0 -> 일반유저 role 0 이 아니면 관리자
// 미들웨어를 추가 엔드포인트와 콜백 퍽션 중간에 기능을 수행시킨다.
app.get("/api/users/auth", auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다는 것은 Authentication 이 true라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
