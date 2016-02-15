/**
 * Created by 동준 on 2015-09-21.
 */
/* 체크 */
var loginAuth = require("../util/loginAuth");
var captcha = require("../util/captcha");

/* 라우트 파일들 선언 */
var loginR = require("../routes/loginR");
var joinR = require("../routes/joinR");
var blogR = require("../routes/blogR");
var programR = require("../routes/programR");
var qnaR = require("../routes/qnaR");
var noticeR = require("../routes/noticeR");
var faqR = require("../routes/faqR");
var profileR = require("../routes/profileR");

/**
 * 라우터 설정!
 *
 * @param app : Object [express 객체]
 */
exports.app = function(app, dirName){
    /* 한탑 */
    app.get("/", function(req, res){
        res.sendFile(dirName+"/public/dist/html/index.min.html");
    });

    /* 로그인 */
    app.use("/api/login", loginR);
    /* 회원가입 */
    app.use("/api/join", joinR);
    /* 블로그 */
    app.use("/api/blog", blogR);
    /* 프로그램 */
    app.use("/api/program", programR);
    /* notice */
    app.use("/api/notice", noticeR);
    /* faq */
    app.use("/api/faq", faqR);

    /**
     * 순차적으로 진행이 되기떄문에 모든 위에서 연결한 라우트를 제외하고
     * 모든 라우트는 아래와 같이 로그인 체크를 하게 설정했다.
     * 이해가 편하게 간단하게 코딩
     */
    app.all("/api/*", loginAuth.check);

    /* qna */
    app.use("/api/qna", qnaR);
    /* profile */
    app.use("/api/profile", profileR);

    /**
     * angular의 html5 모드때문에 이렇게 한다
     */
    app.all('/*', function(req, res) {
        res.sendFile(dirName+"/public/dist/html/index.min.html");
    });
};