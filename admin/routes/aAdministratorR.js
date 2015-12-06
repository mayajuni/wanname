/**
 * Created by mayaj on 2015-10-13.
 */
var express = require("express");
var administratorVO = require("../vos/administratorVO");
var administratorBiz = require("../../biz/routes/administratorBiz");
var router = express.Router();

/**
 * 관리자
 */
router.get("/", administratorVO.set,  function(req, res){
    administratorBiz.getAdministratorList(administratorVO.get, function(data) {
        res.send(data);
    })
});

/**
 * 관리자 삭제
 */
router.delete("/", administratorVO.set,  function(req, res){
    administratorBiz.deleteAdministrator(req.admin._id, administratorVO.get._id, function(data) {
        res.send(data);
    })
});

/**
 * 관리자 등록
 */
router.post("/", administratorVO.set,  function(req, res){
    administratorBiz.join(administratorVO.get, function() {
        res.send();
    });
});

/**
 * 관리자 비밀번호 전송
 */
router.post("/findPassword", administratorVO.set,  function(req, res){
    administratorBiz.findPassword(administratorVO.get._id, function(data) {
        res.send(data);
    });
});

/**
 * 관리자 메뉴
 */
router.post("/getAdministratorMenu", administratorVO.set,  function(req, res){
    administratorBiz.getAdministratorMenu(administratorVO.get._id, function(data) {
        res.send(data);
    });
});

/**
 * 관리자 아이디 체크
 */
router.post("/checkAdministrator", administratorVO.set,  function(req, res){
    administratorBiz.checkAdministrator(administratorVO.get._id, function(data) {
        res.send(data);
    });
});

/**
 * 관리자 아이디 체크
 */
router.post("/editAdministratorMenu", administratorVO.set,  function(req, res){
    administratorBiz.editAdministratorMenu(administratorVO.get, function(data) {
        res.send(data);
    });
});

module.exports = router;