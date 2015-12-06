/**
 * Created by mayaj on 2015-10-22.
 */
var express = require("express");
var fileBiz = require("../../biz/routes/fileBiz");

var router = express.Router();

/**
 * 파일 저장
 */
router.post("/:division", function(req, res){
    fileBiz.save(req, req.params.division, function(data){
        res.send(data);
    })
});

/**
 * 파일 삭제
 */
router.delete("/:_id", function(req, res){
    fileBiz.remove(req.params._id, '', function(){
        res.send("");
    });
});

module.exports = router;