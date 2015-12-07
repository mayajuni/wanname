/**
 * Created by 동준 on 2015-09-30.
 */
var express = require("express");
var memberVO = require("../vos/memberVO");
var memberBiz = require("../../biz/routes/memberBiz");

var router = express.Router();

/**
 * 회원 가입후 자동 로그인
 */
router.post("/", memberVO.set, function(req, res){
    memberBiz.join(memberVO.get, function(){
        memberBiz.login(memberVO.get._id, memberVO.get.password, function(data) {
            req.session.user = data;
        });
    });
});

/**
 * 이메일 체크
 */
router.get("/checkEmail", memberVO.set, function(req, res) {
    memberBiz.checkEmail(memberVO.get._id, function(data){
        res.send(data);
    });
});

module.exports = router;