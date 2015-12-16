/**
 * Created by 동준 on 2015-09-30.
 */
var config = require('../../config');
var property = require('../../property');
var config = require('../../config');
var err = require('../util/error');
var crypto = require("../util/crypto");
var ramdom = require("../util/random");
var email = require("../util/email");
var date = require("../util/date");

var fileBiz = require("./fileBiz");

/* mongo 연결 */
var mongo = require('../config/mongoConfig');
var User = mongo.model.user;

/**
 * 로그인
 *
 * @param id
 * @param pw
 * @param callback
 */
exports.login = function(id, password, callback){
    User.findOne({_id : id, password : crypto.encrypt(password, config.crypto.password)}, config.filter.session,  function(error, data){
        if(error){
            throw error;
        }

        if(!data){
            err.throw(409, property.error.checkIdPw);
        }

        callback(data._doc);
    });
};

/**
 * 토큰 로그인
 *
 * @param token
 * @param callback
 */
exports.tokenLogin = function(token, callback){
    User.findOne({token: token}, config.filter.session,  function(error, data){
        if(error){
            throw error;
        }

        if(!data){
            err.throw(4019, property.error.token);
        }

        callback(data._doc);
    });
};

/**
 * 회원가입 후 자동로그인
 *
 * @param joinVO: Object [가입 정보, _id, pw, name, email]
 * @param callback
 */
exports.join = function(memberVO, callback) {
    var userVO = new User();
    memberVO.token = crypto.encrypt(memberVO._id + date.nowDate("YYYYMMDDHHmmss"));
    memberVO.password = crypto.encrypt(memberVO.password, config.crypto.password);
    userVO._doc = memberVO;

    userVO.save(function(error) {
        if(error) {
            throw error;
        }
        callback()
    });
};

/**
 * 이메일 체크
 * 값이 있으면 true
 *
 * @param email
 * @param callback
 */
exports.checkEmail = function(email, callback) {
    User.findOne({email: email}, function(error, data) {
        if(error) {
            throw error;
        }

        callback(!!data);
    })
};

/**
 * 토큰을 바꺼준다.(자동로그인 초기화)
 *
 * @param userId
 * @param callback
 */
exports.changeToken = function(userId, callback) {
    var token = crypto.encrypt(userId + date.nowDate("YYYYMMDDHHmmss"));
    User.update(
        {_id: userId},
        {$set: {
            token: token
        }},
        function(error){
            if(error){
                throw error;
            }

            callback();
        }
    );
};

/**
 * 비밀번호 변경
 *
 * @param userId
 * @param oldPassword
 * @param newPassword
 * @param callback
 */
exports.changePassword = function(userId, oldPassword, newPassword, callback) {
    User.findOneAndUpdate(
        {_id: userId, password: oldPassword},
        {$set: {password: crypto.encrypt(newPassword, config.crypto.password)}},
        {new: true},
        function(error, data){
            if(error){
                throw error;
            }

            if(data.length < 1) {
                return err.throw(409, property.error.notUser);
            }

            callback();
        }
    );
};

/**
 * 회원 정보 변경 처리
 *
 * @param memberVO
 * @param callback
 */
exports.updateUser = function(userId, memberVO, callback) {
    delete memberVO.regDt;

    User.findOneAndUpdate(
        {_id: userId},
        {$set: memberVO},
        {fields : config.filter.session, new: true},
        function(error, data){
            if(error){
                throw error;
            }

            callback(data);
        }
    );
};

/**
 * 비밀번호 찾기
 *
 * @param userId
 * @param name
 * @param email
 * @param callback
 */
exports.findPassword = function(_id, callback) {
    var password = ramdom.numLowRandom(config.maxPwLength);
    User.findOneAndUpdate(
        {_id: userId, name: name, email: email},
        {$set: {password: crypto.encrypt(password, config.crypto.password)}},
        function(error, data) {
            if(error) {
                throw error;
            }

            if(data.length < 1) {
                err.throw(409, property.error.notUser)
            }

            /* 템플릿 만들기 */
            email.getHtml(config.email.tpls.findPassword, password, function(error, data) {
                if(error){
                    throw error;
                }

                /* 이메일 보내기 */
                email.sendMail(email, config.email.title.findPassword, data, function(error){
                    if(error) {
                        throw error;
                    }

                    callback();
                });
            });
        });
};

/**
 * 회원상세
 *
 * @param userId
 * @param callback
 */
exports.getMemberInfo = function(userId, callback) {
    User.findOne({_id: userId}, {password: 0}, function(error, data) {
        if(error) {
            throw error;
        }

        callback(data);
    });
};

/**
 * 회원리스트
 *
 * @param checkRealName
 * @param callback
 */
exports.getMemberList = function(checkRealName, callback) {
    var query = {};
    if(checkRealName) {
        query.checkRealName = checkRealName;
    }

    User.find(query, {password: 0}, function(error, data) {
        if(error) {
            throw error;
        }

        callback(data, checkRealName);
    });
};
