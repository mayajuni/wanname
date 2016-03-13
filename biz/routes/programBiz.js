/**
 * Created by mayaj on 2016-01-31.
 */
var config = require('../../config');
var fileBiz = require('./fileBiz');
var err = require('../util/error');
var property = require('../../property');

/* mongo 연결 */
var mongo = require('../config/mongoConfig');
var Program = mongo.model.program;
var Category = mongo.model.category;
var Review = mongo.model.review;

/* mongo objectId type */
var ObjectId = mongo.mongoose.Types.ObjectId;

/**
 * 프로그램
 *
 * @param search
 * @param callback
 */
exports.getList = function(search, callback) {
    var where  = {};
    if(!!search.category) {
        where.category = search.category;
    }
    if(!!search.title){
        where.title = {$regex : search.title};
    }
    if(!!search.content){
        where.content = {$regex : search.content};
    }

    Program.count(where, function(error, count){
        if(error){
            throw error;
        }

        var blog = {};
        var page = !search.page ? 1 : search.page;
        var view = !search.view ? 20 : search.view;
        blog.count = count;
        blog.page = page;

        Program.find(where, null, {sort : {"regDt" : -1}, skip : view * (page- 1), limit: view }, function(error, data){
            if(error){
                throw error;
            }

            blog.list = data;
            callback(blog);
        });
    });
};

/**
 * 프로그램 상세를 가지고 온다.
 *
 * @param _id
 * @param callback
 */
exports.getDetail = function(_id, callback) {
    Program.findOne({_id: _id}, function(error, data) {
        if(error) {
            throw error;
        }

        callback(data);
    })
};

/**
 *  카테고리를 가지고 온다.
 *
 * @param _id
 * @param callback
 */
exports.getCategory = function(callback) {
    Category.find({}, null, {sort : {"count" : -1}}, function(error, data) {
        if(error) {
            throw error;
        }

        callback(data);
    })
};

/**
 * 프로그램 등록
 *
 * @param programVO
 * @param callback
 */
exports.save = function(userId, programVO, callback) {
    var program = new Program(programVO);
    program.regId = userId;
    saveCategories(programVO.category, function() {
        program.save(function(error, result) {
            if(error) {
                throw error;
            }
            if(!!programVO.fileList) {
                fileBiz.addDivisionId(programVO.fileList, config.file.doc.program, result._id, callback);
            }else {
                callback();
            }
        });
    });

    function saveCategories(categories, callback) {
        var i=0;
        (function loop(){
            if(i<categories.length){
                Category.update(
                    {_id:  categories[i]},
                    {_id:  categories[i], $inc: {count:'1'}},
                    {upsert: true},
                    function(error) {
                        if(error) {
                            throw error;
                        }

                        i++;
                        loop();
                    });
            }else{
                callback();
            }
        })();
    }
};

/**
 * 프로그램 등록
 *
 * @param programVO
 * @param callback
 */
exports.update = function(programVO, callback) {
    fileBiz.divisionIdEditRemove(programVO._id, config.file.doc.program, function() {
        Program.update(
            {_id: programVO._id},
            {$set: programVO},
            function(error) {
                if(error) {
                    throw error;
                }

                if(!!programVO.mainImage) {
                    fileBiz.addDivisionId(programVO.mainImage, config.file.doc.program, programVO._id, callback);
                }else {
                    callback();
                }
            }
        )
    });
};

/**
 * 좋아요
 *
 * @param user
 * @param _id
 * @param callback
 */
exports.like = function(user, _id, callback) {
      Program.findOne({_id: new ObjectId(_id), likeList: {$elemMatch: {_id: user._id}}}, function(error, data) {
          if(error) {
              throw error;
          }

          if(data) {
              return err.throw(409, property.error.duplicateLike);
          }

          Program.update(
              {_id: new ObjectId(_id)},
              {$push: {likeList: {_id: user._id, name: user.name}}},
              function (error) {
                  if (error) {
                      throw error;
                  }

                  callback();
              }
          )
      })
};

/**
 * 관심
 *
 * @param user
 * @param _id
 * @param callback
 */
exports.apply = function(user, _id, callback) {
      Program.findOne({_id: new ObjectId(_id), applyList: {$elemMatch: {_id: user._id}}}, function(error, data) {
          if(error) {
              throw error;
          }

          if(data) {
              return err.throw(409, property.error.duplicateApply);
          }

          Program.update(
              {_id: new ObjectId(_id)},
              {$push: {applyList: {_id: user._id, name: user.name}}},
              function (error) {
                  if (error) {
                      throw error;
                  }

                  callback();
              }
          )
      })
};

/**
 * 관심 프로그램 가져오기
 *
 * @param userId
 * @param callback
 */
exports.getApplyList = function(userId, callback) {
    Program.find({applyList: {$elemMatch: {_id: userId}}}, function(error, data) {
        if(error) {
            throw error;
        }

        callback(data);
    });
};

/**
 * 후기 가져오기
 *
 * @param _id
 * @param callback
 */
exports.getReview = function(_id, callback) {
    Program.count({programId: _id}, function(error, count){
        if(error){
            throw error;
        }

        var blog = {};
        var page = !search.page ? 1 : search.page;
        var view = !search.view ? 20 : search.view;
        blog.count = count;
        blog.page = page;

        Program.find(where, null, {sort : {"regDt" : -1}, skip : view * (page- 1), limit: view }, function(error, data){
            if(error){
                throw error;
            }

            blog.list = data;
            callback(blog);
        });
    });
};

/**
 * 삭제
 *
 * @param _id
 * @param callback
 */
exports.delete = function(_id, callback) {
    Program.remove({_id: _id}, function(error) {
        if(error) {
            throw error;
        }

        callback();
    })
};