/**
 * Created by mayaj on 2016-01-31.
 */
var express = require("express");
var programBiz = require("../../biz/routes/programBiz");
var programVO = require("../vos/programVO");
var router = express.Router();

/**
 *  프로그램들을 가지고 온다.
 */
router.get("/", programVO.set, function(req, res){
    programBiz.getList(programVO.get, function(data) {
        res.send(data);
    })
});

/**
 * 프로그램 상세
 */
router.get("/:_id", function(req, res){
    programBiz.getDetail(req.params._id, function(data) {
        res.send(data);
    })
});

/**
 * 프로그램 등록
 */
router.post("/", programVO.set, function(req, res){
    programBiz.save(req.admin._id, programVO.get, function(data) {
        res.send(data);
    })
});

/**
 * 프로그램 수정
 */
router.put("/", programVO.set, function(req, res){
    programBiz.update(programVO.get, function(data) {
        res.send(data);
    })
});

/**
 * 프로그램 삭제
router.delete("/", programVO.set, function(req, res){
    programBiz.getList(programVO.get, function(data) {
        res.send(data);
    })
});

 */

module.exports = router;