/**
 * Created by 동준 on 2015-09-30.
 */
/* express를 사용하기 위해서 express모듈을 호출해준다. */
var express = require('express');
/**
 * http모듈은 웹서버를 보다 쉽게 구동하기 위해서 있는 미들웨어.
 * https://nodejs.org/api/http.html
 */
var http = require("http");
/**
 * path은 경로에 따른 기능이 있는 미들웨어.
 * https://nodejs.org/api/path.html
 */
var path = require('path');

/**
 * 한곳에서 다 처리하기에는 너무 길고 유지보수 하기 힘들꺼 같아서
 * 분류를 지어서 나누었다.
 */
var serverC = require("./config/server");
var routeC = require("./config/route");
var errorC = require("./config/error");
var config = require("../config");

/* express 객체 선언 */
var app = express();

/**
 * 서버에 대한 필요 모듈 및 설정.
 */
serverC.app(app);

/**
 * static 소스가 들어 있는 부분을 선언.
 * path.join같은경우 __dirname(현재 경로)와 'public'을 합쳐라 라는 의미.
 *
 * ex) path.join('/foo', 'bar', 'baz/asdf');
 *     returns '/foo/bar/baz/asdf'
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * route들이 선언되어 있는 부분입니다.
 * route의 뜻이 길이라는 뜻이든 각종 api들이 선언되어 있으며,
 * 여기에서 api별로 Controller의 매칭 해주는 역활.
 * 순서 배우 중요
 */
routeC.app(app, __dirname);

/**
 * 에러처리하는 부분입니다.
 * 기본적으로 nodeJs는 try catch이 없어서 모듈을 써서 공통으로 에러 처리.
 */
errorC.app(app);

http.createServer(app).listen(config.port.web, function(){
    console.log("Express server listening on port " + config.port.web);
});

/**
 * express의 프로퍼티를 수정한 후 객체 자체를 모듈로 리턴!
 */
module.exports = app;
