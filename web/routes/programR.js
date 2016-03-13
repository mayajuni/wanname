/**
 * Created by mayaj on 2015-12-20.
 */
var express = require("express");
var programBiz = require("../../biz/routes/programBiz");
var loginAuth = require("../util/loginAuth");

var router = express.Router();

router.get("/", function(req, res) {
    programBiz.getList(req.query ,function(data) {
        res.send(data);
    })
});

router.get("/detail/:_id", function(req, res) {
    programBiz.getDetail(req.params._id, function(data) {
        res.send(data);
    });
});

router.get("/category", function(req, res) {
    programBiz.getCategory(function(data){
        res.send(data);
    })
});

router.post("/apply/:_id", loginAuth.check, function(req, res) {
    programBiz.apply(req.user, req.params._id, function(){
        res.send();
    });
});

router.post("/like/:_id", loginAuth.check, function(req, res) {
    programBiz.like(req.user, req.params._id, function(){
        res.send();
    })
});

router.get("/getApplyList", loginAuth.check, function(req, res) {
    programBiz.getApplyList(req.user._id, function(data){
        res.send(data);
    })
});

router.get('/review/:_id', function(req, res) {
    programBiz.getReview(req.params._id, function(data) {
        res.send(data);
    })
});

module.exports = router;