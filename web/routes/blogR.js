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
    blogVO.view = 12;
    blogBiz.getList(blogVO.get, function(data) {
        res.send(data);
    })
});

/**
 * 베스트
 */
router.get("/best", function(req, res) {
    blogBiz.getBestList(function(data) {
        res.send(data);
    })
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
 * 댓글 등록
 */
router.post("/comment", blogVO.set, function(req, res) {
    blogBiz.commentSave(req.session.user._id, blogVO.get._id, blogVO.get.name, blogVO.get.content, function() {
        res.send('');
    })
});

/**
 * 댓글 수정
 */
router.put("/comment/:commentId", blogVO.set, function(req, res) {
    blogBiz.commentEdit(req.session.user._id, blogVO, function() {
        res.send('');
    })
});

/**
 * 댓글 삭제
 */
router.delete("/comment/:_id/:commentId", function(req, res) {
    blogBiz.commentRemove(req.session.user._id, req.params._id, req.params.commentId, function() {
        res.send('');
    })
});

/**
 * 2step 댓글 등록
 */
router.post("/subComment", blogVO.set, function(req, res) {
    blogBiz.subCommentSave(req.session.user._id, blogVO.get._id, blogVO.get.commentId, req.session.user.name, blogVO.get.content, function() {
        res.send('');
    })
});

/**
 * 2step 댓글 수정
 */
router.put("/subComment/:subCommentId", blogVO.set, function(req, res) {
    blogBiz.subCommentEdit(req.session.user._id, blogVO.get._id, blogVO.get.commentId, req.params.subCommentId, blogVO.get.content, function() {
        res.send('');
    })
});

/**
 * 2step 댓글 삭제
 */
router.delete("/subComment/:_id/:commentId/:subCommentId", function(req, res) {
    blogBiz.subCommentRemove(req.session.user._id, req.params._id, req.params.commentId, req.params.subCommentId, function() {
        res.send('');
    })
});

module.exports = router;