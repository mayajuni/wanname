/**
 * Created by mayaj on 2016-02-15.
 */
var express = require("express");
var config = require("../../config");
var memberBiz = require("../../biz/routes/memberBiz");
var memberVO = require("../vos/memberVO");

var router = express.Router();

/**
 * 내정보 수정
 */
router.put("/", memberVO.set, function(req, res) {
    memberBiz.updateUser(req.user._id, memberVO.get, function(data) {
        req.session.user = data;
        res.send(data);
    })
});

/**
 * 비밀번호 수정
 */
router.put("/changePassword", memberVO.set, function(req, res) {
    memberBiz.changePassword(req.user._id, memberVO.get.password, memberVO.get.newPassword, function() {
        res.send();
    })
});

module.exports = router;