const { User } = require("../models/User");


let auth = (req, res, next) => {

    //인증 처리를 수행


    // 클라이언트 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth;
    
    // 토큰을 복호화 한후 유저를 찾는다
    User.findByToken(token, (err, user) =>{
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true})
    
        //user 와 token정보를 사용하기위해 request에 담아줌
        req.token = token;
        req.user = user;
        next();
    })

    // 유저가 있으면 인증 O

    // 유저가 없으면 인증 X
}

module.exports = {auth}