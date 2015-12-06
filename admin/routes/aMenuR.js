/**
 * Created by mayaj on 2015-10-08.
 */
var express = require("express");
var menuVO = require("../vos/menuVO");
var menuBiz = require("../../biz/routes/menuBiz");
var err = require("../util/error");
var errorP = require("../../errorP");
var router = express.Router();

/**
 * 메뉴를 가지고 온다
 */
router.get("/", function(req, res){
    menuBiz.getAdminMenuList(function(data) {
        res.send(data);
    });
});

/**
 * 메뉴 등록
 */
router.post("/", menuVO.set, function(req, res){
    menuVO.get.userId = req.admin._id;
    menuBiz.saveAdminMenu(menuVO.get, function() {
        res.send();
    });
});

/**
 * 메뉴 순서 변경
 */
router.post("/editRank", function(req, res){
    if(!req.body.menus) {
        err.throw(409, errorP.noParam)
    }
    menuBiz.editRank(req.body.menus, function() {
        res.send();
    });
});

/**
 * 메뉴 수정
 */
router.put("/", menuVO.set, function(req, res){
    menuBiz.editAdminMenu(menuVO.get, function() {
        res.send();
    });
});

/**
 * 메뉴 삭제
 */
router.delete("/", menuVO.set, function(req, res){
    menuBiz.deleteAdminMenu(menuVO.get._id, menuVO.get.step, function() {
        res.send();
    });
});

module.exports = router;