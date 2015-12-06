/**
 * Created by 동준 on 2015-09-30.
 */
var express = require('express');
var http = require("http");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var domain = require("express-domain-middleware");
var path = require('path');
var mongoose = require('mongoose');

var config = require("../config");
var errorP = require("../errorP");
var teaserR = require("./routes/teaserR");

var app = express();
app.use(domain);
app.use(logger('common', {
    skip: function (req, res) { return res.statusCode < 400 }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/* 몽고디비 */
var connect = function () {
    /*var options = { server: { socketOptions: { keepAlive: 1 } } };*/
    mongoose.connect(config.mongodb.connectUrl);
};
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/teaser", teaserR);

app.get("/", function(req, res){
    res.sendFile(__dirname+"/public/dist/html/index.min.html");
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function errorHandler(err, req, res, next) {
    if(err.name == 'MongoError' && err.code === 11000) {
        err.status = 409;
        err.message = "이미 등록되어있습니다.";
    }
    /* 에러처리 */
    err.status = !err.status ? 500 : err.status;
    console.log("error on request %s | %s | %d".red, req.method, req.url, err.status);
    console.log(err.stack);
    /* errorP.common = "Something bad happened. :(" 이다. */
    err.message = err.status == 500 ? errorP.common : err.message;
    /* 아래와 같이 에러코드와 에러 메세지를 반환한다.  */
    res.status(err.status).send(err.message);
});

http.createServer(app).listen(config.port.teaser, function(){
    console.log("Express server listening on port " + config.port.teaser);
});

module.exports = app;
