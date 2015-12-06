/**
 * Created by 동준 on 2015-08-31.
 */
var nodemailer = require('nodemailer');
var config = require('../../config');
var ejs = require('ejs');
var fs = require('fs');

/**
 * 메일 보내기
 *
 * @param to : 여러 사람한테 보낼때에는 , 구분첨을 준다.(콤마)
 * @param subject
 * @param text
 */
exports.sendMail = function(to, subject, html, callback){
    var smtpTransport = nodemailer.createTransport({
        host: config.email.host ,
        port: config.email.port,
        secure: true,
        auth: {
            user: config.email.id,
            pass: config.email.password
        }
    });

    smtpTransport.sendMail({
        from: config.email.form, // sender address
        to: to, // comma separated list of receivers
        subject: subject, // Subject line
        html: html // plaintext body
    }, function(error, response){
        if(error){
            console.log(error);
            if(callback){
                callback(error);
            }
        }else{
            console.log('Message sent: ' + response);
            callback(null);
        }
    });
};

/**
 * html 가지고 오기
 *
 * @param fileName
 * @param param
 * @param callback
 */
exports.getHtml = function(fileName, param, callback){
    // res.render('index', { title: 'Express' });

    // specify jade template to load
    var template = process.cwd() + '/biz/tpls/'+fileName;

    // get template from file system
    fs.readFile(template, 'utf8', function(error, file){
        if(error){
            //handle errors
            callback(error);
        }
        else {
            //compile jade template into function
            var compiledTmpl = ejs.compile(file, {filename: template});
            // get html back as a string with the context applied;
            callback(null, compiledTmpl(param));
        }
    });
};