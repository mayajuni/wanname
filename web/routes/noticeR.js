/**
 * Created by mayaj on 2016-01-22.
 */
var express = require("express");
var config = require("../../config");
var boardBiz = require("../../biz/routes/boardBiz");
var boardVO = require("../vos/boardVO");

var router = express.Router();

/**
 * 공지사항을 가지고 온다.
 */
router.get("/", boardVO.set, function(req, res) {
    boardVO.get.category = config.board.notice;
    boardBiz.getList(boardVO.get, function(data) {
        res.send(data);
    })
});

/**
 * 공지사항을 가지고 온다.
 */
router.get("/best", boardVO.set, function(req, res) {
    boardBiz.getBestList(config.board.notice, function(data) {
        res.send(data);
    })
});

/**
 * 공지사항을 가지고 온다.
 */
router.get("/:_id", function(req, res) {
    boardBiz.getDetailAndList(config.board.notice, req.params._id, function(data) {
        res.send(data);
    })
});

module.exports = router;