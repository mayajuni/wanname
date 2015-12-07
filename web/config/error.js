/**
 * Created by 동준 on 2015-06-30.
 */
/* log를 찍어줄때 색갈을 주는 미들웨어 */
var colors = require("colors");
/* 에러 메세지 들어있는 프로퍼티 */
var property = require("../../property");

/**
 * express 객체를 인자 값으로 받아서 진행
 *
 * @param app : Object [express 객체]
 */
exports.app = function(app){
    /**
     * 위에 route에 해당 안되는 부분은 계속 진행 되어 결국 아래와 함수를 호출하게 되어있다.
     */
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });


    /**
     * 이 부분은 node-domain-middleware 모듈을 사용하여 error를 catch 하는 부분이다.
     *  https://github.com/brianc/node-domain-middleware 참조
     */
    app.use(function errorHandler(err, req, res, next) {
        /* 에러처리 */
        err.status = !err.status ? 500 : err.status;
        console.log("error on request %s | %s | %d".red, req.method, req.url, err.status);
        console.log(err.stack);
        /* property.error.common = "Something bad happened. :(" 이다. */
        err.message = err.status == 500 ? property.error.common : err.message;
        /* 아래와 같이 에러코드와 에러 메세지를 반환한다.  */
        res.status(err.status).send(err.message);
    });
};