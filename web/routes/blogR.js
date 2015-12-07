/**
 * Created by mayaj on 2015-12-06.
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
    })
});

/**
 *  상세 가져오기
 */
router.get("/:category/:_id", function(req, res) {
    blogBiz.getDetail(req.params._id, function(data) {
        res.send(data);
    })
});

/**
 * 댓글 등록
 */
router.post("/comment", blogVO.set, function(req, res) {
    blogVO.userId = req.session.user.userId;
    blogBiz.commentSave(blogVO.get, function() {
        res.send('');
    })
});

/**
 * 댓글 수정
 */
router.put("/comment", blogVO.set, function(req, res) {

});

/**
 * 댓글 등록
 */
router.post("/subComment", blogVO.set, function(req, res) {

});

/**
 * 댓글 수정
 */
router.put("/subComment", blogVO.set, function(req, res) {

});

module.exports = router;