/**
 * Created by mayaj on 2015-09-21.
 */
var config = require('../../config');
var property = require('../../property');
var err = require('../util/error');
var crypto = require("../util/crypto");
var ramdom = require("../util/random");
var email = require("../util/email");
var menuBiz = require("./menuBiz");
var date = require("../util/date");

/* mongo 연결 */
var mongo = require('../config/mongoConfig');
var Admin = mongo.model.admin;

/**
 * 관리자 로그인
 *
 * @param id
 * @param pw
 * @param callback
 */
exports.login = function(id, password, captcha, sessionCaptcha, callback) {
    if(captcha != sessionCaptcha){
        err.throw(4019, property.error.captcha);
    }

    var filter = config.filter.adminSession;

    Admin.findOne({_id : id, password : crypto.encrypt(password, config.crypto.password), isDelete: 'N'}, filter,  function(error, data){
        if(error){
            throw error;
        }

        if(!data){
            err.throw(4019, property.error.checkIdPw);
        }

        callback(data._doc);
    });
};

/**
 * 관리자 로그인
 *
 * @param id
 * @param pw
 * @param callback
 */
exports.tokenLogin = function(token, callback) {
    var filter = config.filter.adminSession;

    Admin.findOne({token : token, isDelete: 'N'}, filter,  function(error, data){
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
 * 관리자를 가지고 온다.
 *
 * @param callback
 */
exports.getAdministratorList = function(vo, callback) {
    vo.isDelete = 'N';
    Admin.find(vo, {password: 0}, {sort: {regDt: 1}},function(error, data){
        if(error) {
            throw error;
        }

        callback(data);
    });
};

/**
 * 비밀번호 변경후 이메일로 보낸다.
 *
 * @param callback
 */
exports.findPassword = function(_id, callback) {
    var password = ramdom.numLowRandom(config.maxPwLength);
    Admin.findOneAndUpdate(
        {_id: _id},
        {$set: {password: crypto.encrypt(password, config.crypto.password)}},
        function(error, user) {
            if(error) {
                throw error;
            }

            if(user.length < 1) {
                err.throw(409, property.error.notUser)
            }

            /* 템플릿 만들기 */
            email.getHtml(config.email.tpls.findPassword, {name: user.name, password: password}, function(error, data) {
                if(error){
                    throw error;
                }

                /* 이메일 보내기 */
                email.sendMail(user.email, config.email.title.adminFindPassword, data, function(error){
                    if(error) {
                        throw error;
                    }

                    callback();
                });
            });
        });
};

/**
 * 회원 탈퇴
 *
 * @param _id
 * @param callback
 */
exports.deleteAdministrator = function(userId, _id, callback) {
    var nowDate = Date.now();
    Admin.update( {_id: _id}, {$set : {isDelete: 'Y', deleteDt: nowDate, deleteId: userId}}, function(error) {
        if(error) {
            throw error;
        }

        callback();
    })
};

/**
 * 관리자 등록
 *
 * @param vo
 * @param callback
 */
exports.join = function(vo, callback) {
    var admin = new Admin(vo);
    admin.token = crypto.encrypt(vo._id + date.nowDate("YYYYMMDDHHmmss"));

    admin.save(function(error) {
        callback(error);
       /* if(error) {
            throw error;
        }

        exports.findPassword(vo._id, function() {
            callback();
        });*/
    })
};

/**
 * 관리자 상세 조회
 *
 * @param userId
 * @param callback
 */
exports.getAdministratorInfo = function(userId, callback) {
    Admin.findOne({_id: userId}, function(error, user) {
        if (error) {
            throw error;
        }

        callback(user);
    });
};

/**
 * 관리자별 메뉴를 가지고 온다.
 *
 * @param userId
 * @param callback
 */
exports.getAdministratorMenu = function(userId, callback) {
    menuBiz.getAdminMenuList(function(data) {
        var adminMenu = {
            menuList: data,
            myMenuList: new Array()
        };

         if(!userId) {
             return callback(adminMenu);
         }

        if(!data) {
            return callback(adminMenu);
        }

        exports.getAdministratorInfo(userId, function(user) {
            function Menu(data, subMenuList) {
                return {
                    _id : data._id,
                    name : data.name,
                    nickName : data.nickName,
                    url : data.url,
                    api: data.api,
                    rank: data.rank,
                    subMenuList: subMenuList
                }
            }

            if(user.step1) {
                adminMenu.menuList = new Array();
                for(var i=0; i < data.length;i++) {
                    if(user.step1[data[i]._id]) {
                        var subMenuList = [];
                        var mySubMenuList = [];
                        if(data[i].subMenuList && data[i].subMenuList.length > 0) {
                            for(var j=0; j<data[i].subMenuList.length;j++){
                                if(user.step2[data[i].subMenuList[j]._id]) {
                                    mySubMenuList.push(data[i].subMenuList[j]);
                                }else {
                                    subMenuList.push(data[i].subMenuList[j]);
                                }
                            }

                            if(subMenuList.length > 0){
                                adminMenu.menuList.push(new Menu(data[i], subMenuList));
                            }
                        }
                        adminMenu.myMenuList.push(new Menu(data[i], mySubMenuList));
                    }else{
                        adminMenu.menuList.push(data[i]);
                    }
                }
            }

            callback(adminMenu);
        });
    });
};

/**
 * 관리자 아이디 체크
 * 중복 되었으면 false 로 반환한다.
 *
 * @param userId
 * @param callback
 */
exports.checkAdministrator = function(userId, callback) {
    Admin.findOne({_id: userId}, function(error, data) {
        if(error) {
            throw error;
        }

        callback(!!data ? false: true)
    })
};

/**
 * 관리자별 메뉴를 바꺼준다.
 *
 * @param vo
 * @param callback
 */
exports.editAdministratorMenu = function(vo, callback) {
    Admin.update(
        {_id: vo._id},
        {$set: {step1: vo.step1, step2: vo.step2}},
        function(error) {
            if(error) {
                throw error;
            }

            callback();
        }
    )
};