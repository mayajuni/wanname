/**
 * Created by mayaj on 2015-09-01.
 */
var property = require('../../property');
var fs = require("fs");
var administratorBiz = require("./administratorBiz");

/* mongo 연결 */
var mongo = require('../config/mongoConfig');
var User = mongo.model.user;
var AdminMenu = mongo.model.adminMenu;
var Admin = mongo.model.admin;
var ObjectId = mongo.mongoose.Types.ObjectId;

/**
 * 메뉴별 권한 체크
 *
 * @param id
 * @param callback
 */
exports.checkAdminUserMenu = function(userId, url, callback){
    administratorBiz.getAdministratorInfo(userId, function(user){
        exports.getAdminMenuList(function(data) {
            for(var i=0; i < data.length;i++) {
                if(user.step1[data[i]._id]) {
                    if(url.indexOf(data[i].api) == 0) {
                        return callback(true);
                    }
                    if(data[i].subMenuList && data[i].subMenuList.length > 0) {
                        for(var j=0; j<data[i].subMenuList.length;j++){
                            if(user.step2[data[i].subMenuList[j]._id]) {
                                if(url.indexOf(data[i].subMenuList[j].api) == 0) {
                                    return callback(true);
                                }
                            }
                        }
                    }
                }
            }
            callback(false);
        });
    });
};

/**
 * 메뉴를 가지고 온다.
 *
 * @param callback
 */
exports.getAdminMenuList = function(callback) {
    AdminMenu.find({}, null, {sort: { rank: 1 }}, function(error, data) {
        if(error) {
            throw error;
        }

        callback(data);
    })
};

/**
 * 메뉴 등록
 *
 * @param userId
 * @param menuVO
 * @param callback
 */
exports.saveAdminMenu = function(menuVO, callback) {
    /* _id로 메뉴 step1인지 아닌지를 선택한다. */
    if(!menuVO.parentId) {
        var menu = new AdminMenu(menuVO);

        menu.save(function(error) {
            if(error){
                throw error;
            }

            callback();
        })
    } else {
        var _id = menuVO.parentId;
        delete menuVO.parentId;
        AdminMenu.update(
            {_id: ObjectId(_id)},
            {
                $push: {subMenuList: menuVO}
            },
            function(error){
                if(error){
                    throw error;
                }

                callback();
            }
        );
    }
};

/**
 * 메뉴 수정
 *
 * @param userId
 * @param menuVO
 * @param callback
 */
exports.editAdminMenu = function(menuVO, callback) {
    if(menuVO.step == 1) {
        AdminMenu.update(
            {_id: ObjectId(menuVO._id)},
            {$set: {name: menuVO.name, nickName: menuVO.nickName, url: menuVO.url, api: menuVO.api}},
            function(error) {
                if(error) {
                    throw error;
                }

                callback();
            }
        )
    } else {
        AdminMenu.update(
            {'subMenuList' : {$elemMatch: {_id: ObjectId(menuVO._id)}}},
            {$set: {'subMenuList.$.name': menuVO.name, 'subMenuList.$.nickName': menuVO.nickName, 'subMenuList.$.url': menuVO.url, 'subMenuList.$.api': menuVO.api}},
            function(error) {
                if(error) {
                    throw error;
                }

                callback();
            }
        )
    }
};

/**
 * 메뉴 삭제
 *
 * @param userId
 * @param menuVO
 * @param callback
 */
exports.deleteAdminMenu = function(_id, step, callback) {
     if(step == 1) {
        AdminMenu.remove({_id: ObjectId(_id)}, function(error) {
            if(error) {
                throw error;
            }

            removeAdminsMenu(_id, step, callback);
        });
    }else {
        AdminMenu.update(
            {'subMenuList' : {$elemMatch: {_id: ObjectId(_id)}}},
            {$pull: {'subMenuList': {_id: ObjectId(_id)}}},
            function(error) {
                if(error) {
                    throw error;
                }

                removeAdminsMenu(_id, step, callback);
            }
        )
    }
};

/**
 * 메뉴를 삭제 했을시 admin의 메뉴들도 삭제해줘야된다.
 *
 * @param _id
 * @param step
 * @param callback
 */
function removeAdminsMenu(_id, step, callback) {
    var qeury = {};
    var key = 'step'+step+'.' + _id;
    qeury[key] = true;
    /* admin에 추가된 메뉴들을 삭제한다. */
    Admin.update(qeury, {$unset: qeury}, {multi: true}, function(error) {
        if(error) {
            throw error;
        }
        callback();
    });
}

/**
 * 순서 변경
 *
 * @param menus
 * @param callback
 */
exports.editRank = function(menus, callback) {
    AdminMenu.remove({}, function(error) {
        if(error) {
            throw error;
        }

        AdminMenu.create(menus, function(error) {
            if(error) {
                throw error;
            }

            callback()
        });
    });
};

/**
 * 관리자별 메뉴를 가지고 온다.
 *
 * @param userId
 * @param callback
 */
exports.getAdministratorMenu = function(userId, callback) {
    administratorBiz.getAdministratorInfo(userId, function(user){
        exports.getAdminMenuList(function(data) {
            var myMenuList = new Array();
            if(data){
                for(var i=0; i < data.length;i++) {
                    var menu = {
                        _id : data[i]._id,
                        name : data[i].name,
                        nickName : data[i].nickName,
                        url : data[i].url,
                        api: data[i].api,
                        rank: data[i].rank,
                        subMenuList: new Array()
                    };
                    if(user.step1[data[i]._id]) {
                        if(data[i].subMenuList && data[i].subMenuList.length > 0) {
                            for(var j=0; j<data[i].subMenuList.length;j++){
                                if(user.step2[data[i].subMenuList[j]._id]) {
                                    menu.subMenuList.push(data[i].subMenuList[j]);
                                }
                            }
                        }
                        myMenuList.push(menu);
                    }
                }
            }
            callback(myMenuList);
        });
    });
};