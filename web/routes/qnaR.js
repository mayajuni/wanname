/**
 * Created by mayaj on 2016-01-22.
 */
var express = require("express");
var config = require("../../config");
var boardBiz = require("../../biz/routes/boardBiz");
var boardVO = require("../vos/boardVO");

var router = express.Router();

/**
 * 리스트
 */
router.get("/", boardVO.set, function(req, res) {
    boardVO.get.userId = req.user._id;
    boardVO.get.category = config.board.qna;
    boardBiz.getList(boardVO.get, function(data) {
        res.send(data);
    })
});

/**
 * 상세
 */
router.get("/:_id", function(req, res) {
    boardBiz.getMyDetail(req.user._id, req.params._id, function(data) {
        res.send(data);
    })
});

/**
 * 등록
 */
router.post("/", boardVO.set, function(req, res) {
    boardVO.get.category = config.board.qna;
    boardBiz.save(req.user._id, req.user.name, boardVO.get, function(data) {
        res.send(data);
    })
});

/**
 * 삭제
 */
router.delete("/:_id", function(req, res) {
    boardBiz.removeQna(req.user._id, req.params._id, function(data) {
        res.send(data);
    })
});

module.exports = router;