/**
 * Created by mayaj on 2015-11-03.
 */

/* mongo 연결 */
var mongo = require('../config/mongoConfig');
var Teaser = mongo.model.teaser;

/**
 * 저장한다.
 *
 * @param email
 * @param callback
 */
exports.save = function(email, callback) {
    var teaser = new Teaser();
    teaser._id = email;
    teaser.save(function(error) {
        if(error) {
            throw error;
        }

        callback();
    })
};

/**
 * 카운트를 리턴한다.
 *
 * @param callback
 */
exports.getCount = function(callback) {
    Teaser.findOne({_id: 'admin'}, function(error, data) {
        if(error) {
            throw error;
        }
        var count = data.count ? data.count : 0;

        Teaser.find({}).count(function(error, data){
            if(error) {
                throw error;
            }

            callback(count*1+data);
        })
    });
};

/**
 * 카운트 올리기
 *
 * @param count
 * @param callback
 */
exports.editCount = function(count, callback) {
    Teaser.update(
        {_id: 'admin'},
        {$inc: {count: count}},
        function(error) {
            if(error) {
                throw error;
            }

            callback();
        })
};

/**
 * 등록한 사람을 본다.
 *
 * @param callback
 */
exports.getList = function(callback) {
    Teaser.find({_id: {$ne: 'admin'}}, function(error, data) {
        if(error) {
            throw error;
        }
        var info = {
            list: data
        };
        Teaser.findOne({_id: 'admin'}, function(error, admin) {
            if (error) {
                throw error;
            }
            info.count = admin.count;

            callback(info);
        });
    });
};