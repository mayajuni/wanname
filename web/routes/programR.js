/**
 * Created by mayaj on 2015-12-20.
 */
var express = require("express");
var memberVO = require("../../vos/memberVO");
var memberBiz = require("../../../biz/routes/memberBiz");

var router = express.Router();

/**
 * 자동로그인 초기화
 */
router.post("/cleanToken", function(req, res){
    memberBiz.changeToken(req.user._id, function() {
        res.send();
    });
});

/**
 * 비밀번호 변경
 */
router.post("/changePassword", memberVO.set, function(req, res){
    memberBiz.changePassword(req.user._id, memberVO.get.password, memberVO.get.newPassword, function() {
        res.send();
    })
});

/**
 * 프로필 수정
 */
router.put("/updateUser", memberVO.set, function(req, res){
    memberBiz.updateUser(req.user._id, memberVO.get, function() {
        res.send();
    })
});

module.exports = router;