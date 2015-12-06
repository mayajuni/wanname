/**
 * Created by mayaj on 2015-09-30.
 */
var express = require("express");

var memberBiz = require("../../biz/routes/memberBiz");
var memberVO = require("../vos/memberVO");

var router = express.Router();

/**
 * 유저 정보들을 가지고 온다.
 */
router.get('/', memberVO.set, function(req, res) {
    memberBiz.getMemberList(memberVO.get, function(data) {
        res.send(data);
    });
});


/**
 * 유저 정보상세를 가지고 온다.
 */
router.get('/getStats', function(req, res) {
    memberBiz.getIdentificationStats(function(data) {
        res.send(data);
    });
});

/**
 * 본인확인 변경
 */
router.post('/changeIdentification', memberVO.set, function(req, res) {
    memberBiz.changeIdentification(memberVO.get._id, memberVO.get.identification, memberVO.get.failIdentificationReason, function() {
        res.send();
    });
});

module.exports = router;