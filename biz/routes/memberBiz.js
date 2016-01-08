/**
 * Created by 동준 on 2015-09-30.
 */
var config = require('../../config');
var property = require('../../property');
var err = require('../util/error');
var crypto = require("../util/crypto");
var ramdom = require("../util/random");
var email = require("../util/email");
var date = require("../util/date");

var fileBiz = require("./fileBiz");

/* mongo 연결 */
var mongo = require('../config/mongoConfig');
var Member = mongo.model.member;

/**
 * 로그인
 *
 * @param id
 * @param pw
 * @param callback
 */
exports.login = function(id, password, callback){
    Member.findOne({_id : id, password : crypto.encrypt(password, config.crypto.password)}, config.filter.session,  function(error, data){
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
    Member.findOne({token: token}, config.filter.session,  function(error, data){
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
 * @param joinVO: Object [가입 정보, _id, pw, name]
 * @param callback
 */
exports.join = function(memberVO, callback) {
    var member = new Member(memberVO);
    member.token = crypto.encrypt(memberVO._id + date.nowDate("YYYYMMDDHHmmss"));
    member.password = crypto.encrypt(memberVO.password, config.crypto.password);

    member.save(function(error) {
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
    Member.findOne({_id: email}, function(error, data) {
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
    Member.update(
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
    Member.findOneAndUpdate(
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

    Member.findOneAndUpdate(
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
exports.findPassword = function(userId, name, callback) {
    var password = ramdom.numLowRandom(config.maxPwLength);
    Member.findOneAndUpdate(
        {_id: userId, name: name},
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
                email.sendMail(userId, config.email.title.findPassword, data, function(error){
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
    Member.findOne({_id: userId}, {password: 0}, function(error, data) {
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
exports.getMemberList = function(memberVO, callback) {
    var query = {};
    if(memberVO._id) {
        query._id = memberVO._id;
    }

    Member.find(query, {password: 0}, function(error, data) {
        if(error) {
            throw error;
        }

        callback(data);
    });
};
