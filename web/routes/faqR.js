/**
 * Created by mayaj on 2016-01-22.
 */
var express = require("express");
var config = require("../../config");
var boardBiz = require("../../biz/routes/boardBiz");
var boardVO = require("../vos/boardVO");

var router = express.Router();

/**
 * faq 가지고 오기
 */
router.get("/", boardVO.set, function(req, res) {
    boardBiz.getNoPagingList(config.board.faq, boardVO.get, function(data) {
        res.send(data);
    })
});

module.exports = router;