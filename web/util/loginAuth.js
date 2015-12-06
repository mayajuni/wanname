/**
 * Created by 동준 on 2015-04-23.
 */
var johayoJwt = require("johayo-jwt");

/**
 * 로그인 체크
 *
 * @param req
 * @param res
 * @param next
 */
exports.check = function(req, res, next){
    if(!!req.session.user) {
        req.user = req.session.user;
    }else {
        delete req.user;
        johayoJwt.verify(req, res, next);
    }
    next();
};