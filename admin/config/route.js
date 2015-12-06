/**
 * Created by mayaj on 2015-09-21.
 */
/* 체크 */
var loginAuth = require("../util/loginAuth");
var captcha = require("../util/captcha");

/* 라우트 파일들 선언 */
var loginR = require("../routes/aLoginR");
var memberR = require("../routes/aMemberR");
var sideMenuR = require("../routes/aSideMenuR");
var menuR = require("../routes/aMenuR");
var administratorR = require("../routes/aAdministratorR");
var boardR = require("../routes/aBoardR");
var fileR = require("../routes/aFileR");
var teaserR = require("../routes/aTeaserR");

/**
 * 라우터 설정!
 *
 * @param app : Object [express 객체]
 */
exports.app = function(app, dirName){
    var rootApi = "/adminApi/";

    /* 관리자 */
    app.get("/", function(req, res){
        res.sendFile(dirName+"/public/dist/html/adminIndex.min.html");
    });

    /* 캡차 이미지 */
    app.get("/captcha.png", function(req, res){
        captcha.captcha(req, res);
    });

    /** 로그인 */
    app.use(rootApi + "login", loginR);

     /**
     * 관리자 로그인 체크한다.
     */
    app.all(rootApi + "*", loginAuth.adminLoginCheck);

    app.use(rootApi + 'sideMenu', sideMenuR);
    app.use(rootApi + 'file', fileR);

     /**
     * 메뉴 권한을 체크한다.
     */
    app.all(rootApi + "*", loginAuth.adminAuthCheck);

    app.use(rootApi + 'teaser', teaserR);
    app.use(rootApi + 'menu', menuR);
    app.use(rootApi + 'member', memberR);
    app.use(rootApi + 'administrator', administratorR);
    app.use(rootApi + 'board', boardR);

    /**
     * angular의 html5 모드때문에 이렇게 한다
     */
    app.all("/*", function(req, res) {
        res.sendFile(dirName+"/public/dist/html/adminIndex.min.html");
    });
};