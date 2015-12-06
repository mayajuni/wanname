/**
 * Created by 동준 on 2015-09-30.
 */
var express = require("express");
var loginVO = require("../vos/loginVO");
var memberBiz = require("../../biz/routes/memberBiz");

var router = express.Router();

/**
 * 로그인
 */
router.post("/", loginVO.set, function(req, res){
    memberBiz.login(loginVO.get._id, loginVO.get.password, function(data){
        req.session.user = data;
        res.send(data);
    });
});

/**
 * 토큰 로그인
 */
router.post("/token", loginVO.set, function(req, res){
    memberBiz.tokenLogin(loginVO.get.token, function(data){
        req.session.user = data;
        res.send(data);
    });
});

/**
 * 로그인 정보를 가지고 온다.
 */
router.post("/get", function(req, res){
    res.send(req.session.user)
});

/**
 * 로그아웃
 */
router.get("/logout", function(req, res){
    delete req.session.user;
    delete req.user;
    res.send();
});

/**
 * 비밀번호 찾기
 */
router.post("/findPassword", loginVO.set, function(req, res){
    memberBiz.findPassword(loginVO.get._id, loginVO.get.name, function(){
        res.send();
    })
});

module.exports = router;