/**
 * Created by mayaj on 2015-10-05.
 */
var path = require('path');
var express = require('express');
var loginAuth = require("../util/loginAuth");

/**
 * static 설정!
 *
 * @param app : Object [express 객체]
 */
exports.app = function(app, dirName){
    app.all("/upload/*", loginAuth.staticCheck);

    app.use(express.static(path.join(dirName, 'public')));
    app.use(express.static(path.resolve('../upload')));
};