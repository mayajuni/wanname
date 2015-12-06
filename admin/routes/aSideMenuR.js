/**
 * Created by mayaj on 2015-10-16.
 */
var express = require("express");
var menuBiz = require("../../biz/routes/menuBiz");
var err = require("../util/error");
var router = express.Router();

/**
 * 관리자별 메뉴를 가지고 온다
 */
router.get("/getAdministratorMenu", function(req, res){
    menuBiz.getAdministratorMenu(req.admin._id, function(data) {
        res.send(data);
    });
});

module.exports = router;