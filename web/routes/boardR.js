/**
 * Created by mayajuni-home on 2015-10-29.
 */
var express = require("express");
var boardBiz = require("../../biz/routes/boardBiz");
var boardVO = require("../vos/boardVO");

var router = express.Router();

/**
 * 리스트
 */
router.get("/:category", boardVO.set, function(req, res) {
    boardBiz.getList(req.params.category, boardVO.get, function(data) {
        res.send(data);
    })
});

/**
 *  상세 가져오기
 */
router.get("/:category/:_id", function(req, res) {
    boardBiz.getDetail(req.params._id, function(data) {
        res.send(data);
    })
});

/**
 *  등록
 */
router.post("/:category", boardVO.set, function(req, res) {
    boardBiz.save(req.admin._id, req.admin.name, boardVO.get, function() {
        res.send('');
    })
});

/**
 *  삭제
 */
router.delete("/:category/:_id", function(req, res) {
    boardBiz.remove(req.admin._id, req.params._id, function() {
        res.send('');
    })
});

/**
 * 게시판 수정
 */
router.put("/:category", boardVO.set, function(req, res) {
    boardBiz.update(req.admin._id, boardVO.get, function() {
        res.send('');
    })
});

module.exports = router;