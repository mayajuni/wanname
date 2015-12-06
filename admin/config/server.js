/**
 * Created by 동준 on 2015-06-30.
 */
/**
 * 파비곤을 제공하기 위한 nodeJs 미들웨어
 * https://github.com/expressjs/serve-favicon
 */
var favicon = require('serve-favicon');
/**
 * 기록(logging)에 대한 기능을 제공하는 미들웨어
 * https://github.com/expressjs/morgan
 */
var logger = require('morgan');
/**
 * 쿠키를 추출하는 미들웨어
 * https://github.com/expressjs/cookie-parser
 */
var cookieParser = require('cookie-parser');
/**
 * 말그대로 body에 있는 내용을 parsing하는 미들웨어
 * POST로 넘어온 데이터를 추출할때 쓴다.
 * https://github.com/expressjs/body-parser
 */
var bodyParser = require('body-parser');
/**
 * 에러 핸들링 할때 쓰는 미들웨어이다. 자세한 부분은 밑에서.
 * https://github.com/brianc/node-domain-middleware
 */
var domain = require("express-domain-middleware");
/**
 * session을 쓰기 위한 모듈
 * https://github.com/expressjs/session
 */
var Session = require("express-session");
/**
 * connect-redis 미들웨어는 nosql인 redis를 connect 하는 미들웨어다.
 * 밑의 코드는 session storage를 redis로 사용하기 위해서 작성했다.
 * https://github.com/tj/connect-redis
 */
var RedisStore  = require ("connect-redis")(Session);
/**
 * 크로스 도메인 문제를 해결하기 위한 미들웨어.
 * https://github.com/expressjs/cors
 */
var cors = require('cors');

/**
 * jwt 미들웨어
 * https://github.com/expressjs/cors
 */
var johayoJwt = require("johayo-jwt");

/* config */
var config = require("../../config");

/**
 * express 객체를 인자 값으로 받아서 진행
 *
 * @param app : Object [express 객체]
 */
exports.app = function(app){
    /* 아직 파비콘이 없기 때문에 아래와 같이 주석 처리 */
    /*app.use(favicon(dirName + '/public/dist/imgs/favicon.ico'));*/
    /* express에서 cors 미들웨어를 사용한다고 선언 */
    app.use(cors());
    /* express에서 express-domain-middleware 미들웨어를 사용한다고 선언 */
    app.use(domain);
    /**
     * express에서 morgan 미들웨어를 사용한다고 선언.
     * dev는 응답상태에 따라 색이 다르게 출력하게 하는 것이다.
     * 문서보면 나와있다.
     */
    app.use(logger('common', {
        skip: function (req, res) { return res.statusCode < 400 }
    }));
    /* body parser한것을 json 형식으로 받겠다고 선언 */
    app.use(bodyParser.json());
    /* URL으로 인코딩된 부분을 해석하기 위한 옵션 extended <- 이 부분은 잘 모르겠다. */
    app.use(bodyParser.urlencoded({ extended: false }));
    /* 쿠키 추출 미들웨어 선언 */
    app.use(cookieParser());

    /**
     * session 선언부.
     * redis를 사용하기때문에 redis 연결 부분도 있다.
     * 자세한 부분은 위에 링크해준 url를 들어가서 보자.
     */
    app.use(Session({
        store: new RedisStore({
            port: config.redis.port,
            host: config.redis.host,
            pass: config.redis.password,
            ttl: config.redis.ttl
        }),
        name : config.session.name,
        secret: config.session.secret,
        proxy: true,
        resave : false,
        saveUninitialized : true,
        cookie: {
            secure: false
        }
    }));

    /**
     * johayo jwt 설정
     */
    app.use(johayoJwt({
        /* jwt 토큰의 데이터부분을 한번더 암호화 할때 쓰는 암호화키 */
        tokenSecret: config.crypto.common,
        /* jwt 자체 암호화 키 */
        jwtSecret: config.crypto.jwt,
        /* jwt 암호화 알고리즘(디폴트: HS256) */
        algorithm: "HS256",
        /* 만료시간 초단위 (디폴트: 3600 - 1시간) */
        expireTime: 3600,
        /* 복호화 한후 정보 저장위치(디폴트: req.user) */
        userProperty: "user"
    }))
};