/**
 * Created by mayaj on 2015-11-10.
 */
var express = require("express");
var teaserBiz = require("../../biz/routes/teaserBiz");
var router = express.Router();

/**
 * 이메일 신청자를 가지고 온다
 */
router.get("/", function(req, res){
    teaserBiz.getList(function(data) {
        res.send(data);
    })
});

/**
 * 이메일 카운트를 업그레이드 한다.
 */
router.put("/:count", function(req, res) {
    teaserBiz.editCount(req.params.count, function() {
        res.send('');
    });
});

module.exports = router;