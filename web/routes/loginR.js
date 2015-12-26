/**
 * Created by 동준 on 2015-09-30.
 */
var express = require("express");
var memberVO = require("../vos/memberVO");
var memberBiz = require("../../biz/routes/memberBiz");

var router = express.Router();

/**
 * 로그인
 */
router.post("/", memberVO.set, function(req, res){
    memberBiz.login(memberVO.get._id, memberVO.get.password, function(data){
        req.session.user = data;
        res.send(data);
    });
});

/**
 * 토큰 로그인
 */
router.post("/token", memberVO.set, function(req, res){
    memberBiz.tokenLogin(memberVO.get.token, function(data){
        req.session.user = data;
        res.send(data);
    });
});

/**
 * 로그인 정보를 가지고 온다.
 */
router.post("/get", function(req, res){
    res.send(req.session.user);
});

/**
 * 로그아웃
 */
router.get("/logout", function(req, res){
    req.session.destroy();
    delete req.user;
    res.send();
});

/**
 * 비밀번호 찾기
 */
router.post("/findPassword/:_id", function(req, res){
    memberBiz.findPassword(req.params._id, function(){
        res.send();
    })
});

module.exports = router;