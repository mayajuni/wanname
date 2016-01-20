/**
 * Created by mayaj on 2016-01-20.
 */
var express = require("express");
var blogBiz = require("../../biz/routes/blogBiz");
var blogVO = require("../vos/blogVO");
var router = express.Router();

/**
 * 리스트
 */
router.get("/", blogVO.set, function(req, res) {
    blogBiz.getList(blogVO.get, function(data) {
        res.send(data);
    });
});

/**
 *  상세 가져오기
 */
router.get("/:_id", function(req, res) {
    blogBiz.getDetail(req.params._id, function(data) {
        res.send(data);
    })
});

/**
 *  블로그 수정
 */
router.put("/", blogVO.set, function(req, res) {
    blogBiz.update(req.admin._id, blogVO.get, function(data) {
        res.send(data);
    })
});

/**
 *  등록
 */
router.post("/", blogVO.set, function(req, res) {
    blogBiz.save(req.admin._id, req.admin.name, blogVO.get, function() {
        res.send('');
    })
});

module.exports = router;