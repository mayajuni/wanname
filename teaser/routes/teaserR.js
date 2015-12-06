/**
 * Created by mayajuni-home on 2015-11-04.
 */
var express = require("express");
var teaserBiz = require("../../biz/routes/teaserBiz");

var router = express.Router();

/**
 * 저장
 */
router.post("/", function(req, res){
    if(!req.body.email) {
        var err = new Error('이메일을 입력해주세요.');
        err.status = 409;
        throw err;
    }
    teaserBiz.save(req.body.email, function() {
        res.send();
    })
});

/**
 * 카운트
 */
router.get("/", function(req, res) {
    teaserBiz.getCount(function(data) {
        res.send({count: data});
    })
});

module.exports = router;