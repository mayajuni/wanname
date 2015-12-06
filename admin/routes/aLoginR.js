/**
 * Created by mayaj on 2015-09-18.
 */
var express = require("express");
var jwt = require("johayo-jwt");
var property = require('../../property');
var loginVO = require("../vos/loginVO");
var adminBiz = require("../../biz/routes/administratorBiz");
var router = express.Router();

/**
 * 로그인
 */
router.post("/", loginVO.set, function(req, res){
    adminBiz.login(loginVO.get._id, loginVO.get.password, loginVO.get.captcha, req.session.captcha, function(data){
        req.session.admin = data;
        res.send(data);
    });
});

/**
 * 토큰 로그인
 */
router.post("/token", loginVO.set, function(req, res){
    adminBiz.tokenLogin(loginVO.get.token, function(data){
        req.session.admin = data;
        res.send(data);
    });
});

/**
 * 로그인 정보를 가지고 온다.
 */
router.get("/get", function(req, res){
    res.send(req.session.admin)
});

/**
 * 로그아웃
 */
router.get("/logout", function(req, res){
    delete req.session.admin;
    delete req.admin;
    res.send();
});

module.exports = router;