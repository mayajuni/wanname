/**
 * Created by 동준 on 2015-04-23.
 */
var johayoJwt = require("johayo-jwt");
var err = require("./error");
var errP = require("../../property");
var fileBiz = require("../../biz/routes/fileBiz");
var menuBiz = require("../../biz/routes/menuBiz");

/**
 * 관리자 로그인 체크
 *
 * @param req
 * @param res
 * @param next
 */
exports.adminLoginCheck = function(req, res, next){
    if(!!req.session.admin) {
        req.admin = req.session.admin;
    }else {
        delete req.admin;
        johayoJwt.verify(req, res, next, 'admin');
    }

    next();
};

/**
 * 관리자 메뉴 권한 체크
 *
 * @param req
 * @param res
 * @param next
 */
exports.adminAuthCheck = function(req, res, next){
    if(req.originalUrl != '/') {
        menuBiz.checkAdminUserMenu(req.admin._id, req.originalUrl, function(hasAuth) {
            if(hasAuth) {
                next();
            }else{
                err.throw(401, errP.dontHaveAuth);
            }
        });
    }
};

/**
 * static 권한 체크
 *
 * @param req
 * @param res
 * @param next
 */
exports.staticCheck = function(req, res, next){
    if(!req.session.admin ){
        err.throw(401, errP.needLogin);
    }else{
        next();
    }
};