/**
 * Created by mayaj on 2015-12-06.
 */
var config = require('../../config');
var fs = require("fs");
var fileBiz = require('./fileBiz');

/* mongo 연결 */
var mongo = require('../config/mongoConfig');
var Blog = mongo.model.blog;

/* mongo objectId type */
var ObjectId = mongo.mongoose.Types.ObjectId;

/**
 * 게시판
 *
 * @param division
 * @param callback
 */
exports.getList = function(search, callback) {
    var where  = {};
    if(!!search.category) {
        where.category = category;
    }
    if(!!search.title){
        where.title = {$regex : search.title};
    }
    if(!!search.content){
        where.content = {$regex : search.content};
    }

    Blog.count(where, function(error, count){
        if(error){
            throw error;
        }

        var blog = {};
        var page = !search.page ? 1 : search.page;
        var view = !search.view ? 20 : search.view;
        blog.count = count;
        blog.page = page;

        Blog.find(where, null, {sort : {"regDt" : -1}, skip : view * (page- 1), limit: view }, function(error, data){
            if(error){
                throw error;
            }

            blog.list = data;
            callback(blog);
        });
    });
};

/**
 * 게시판 상세를 가지고 온다.
 *
 * @param _id
 * @param callback
 */
exports.getDetail = function(_id, callback) {
    Blog.findOne({_id: new ObjectId(_id)}, function(error, data) {
        if(error) {
            throw error;
        }

        callback(data);
    })
};

/**
 * 게시판 등록
 *
 * @param userId
 * @param name
 * @param blogVO: Object
 * @param callback
 */
exports.save = function(userId, name, blogVO, callback) {
    var blog = new Blog(blogVO);
    blog.userId = userId;
    blog.name = name;

    blog.save(function(error, result) {
        if(error) {
            throw error;
        }

        if(!!blogVO.fileList) {
            fileBiz.addDivisionId(blogVO.fileList, config.file.doc.blog, result._id, callback);
        }else {
            callback();
        }
    })
};

/**
 * 게시판 수정
 *
 * @param blogVO
 * @param callback
 */
exports.update = function(userId, blogVO, callback) {
    var _id = blogVO._id;
    delete blogVO._id;
    blogVO.modiDt = Date.now;

    Blog.update(
        {_id: new ObjectId(_id), userId: userId},
        {$set: blogVO},
        function(error) {
            if(error) {
                throw error;
            }

            if(!!blogVO.fileList) {
                fileBiz.addDivisionId(blogVO.fileList, config.file.doc.blog, _id, callback);
            }else {
                callback();
            }
        });
};

/**
 * 게시판 삭제
 *
 *
 * @param userId
 * @param _id
 * @param callback
 */
exports.remove = function(userId, _id, callback) {
    Blog.remove({_id: new ObjectId(_id), userId: userId}, function(error) {
        if(error) {
            throw error;
        }

        fileBiz.divisionIdRemove(_id, config.file.doc.blog, function() {
            callback();
        });
    })
};

/**
 * 파일을 삭제한다.
 *
 * @param _id
 * @param fileId
 */
exports.removeFile = function(_id, fileId, callback) {
    Blog.update(
        {_id: new ObjectId(_id)},
        {$pull: {fileList: {_id: new ObjectId(fileId)}}},
        function(error) {
            if(error) {
                throw error;
            }

            callback();
        });
};

/**
 * 댓글을 단다
 *
 * @param blogVO
 * @param callback
 */
exports.commentSave = function(blogVO, callback) {
    Blog.findOneAndUpdate(
        {_id: new ObjectId(blogVO._id)},
        {
            $push: {commentList : {userId: blogVO.userId, name: blogVO.name, content: content}},
        },
        {fields : {'commentList.pw': 0, 'commentList.sub.pw' : 0}, new: true},
        function (err, data){
            if(err){
                throw err;
            }

            /* 텔레그램 메세지 보내기 */
            var tgData = {
                content : '[댓글등록, '+name+'님]  http://johayo.com/#'+url ,
                division : data.division,
                ip: req.headers['x-forwarded-for'] || req.ip,
                url : url
            };

            tg.sendMsg(tgData);

            res.send(data);
        });
};