/**
 * Created by mayaj on 2015-12-06.
 */
var config = require('../../config');
var fileBiz = require('./fileBiz');
var err = require('../util/error');
var property = require('../../property');

/* mongo 연결 */
var mongo = require('../config/mongoConfig');
var Blog = mongo.model.blog;

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
    Blog.findOne({_id: _id}, function(error, data) {
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
    blogVO.updateDt = Date.now();
    blogVO.updateId = userId;

    fileBiz.divisionIdEditRemove(blogVO._id, config.file.doc.blog, function() {
        Blog.update(
            {_id: _id},
            {$set: blogVO},
            function(error, result) {
                if(error) {
                    throw error;
                }

                if(result.nModified !== 1) {
                    return err.throw(409, property.error.dontHaveAuth);
                }

                if(!!blogVO.fileList) {
                    fileBiz.addDivisionId(blogVO.fileList, config.file.doc.blog, _id, callback);
                }else {
                    callback();
                }
            });
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
exports.commentSave = function(userId, _id, name, content, callback) {
    Blog.update(
        {_id: new ObjectId(_id)},
        {
            $push: {comments : {userId: userId, name: name, content: content}}
        },
        function (error){
            if(error){
                throw error;
            }

            callback();
        });
};

/**
 * 댓글 삭제
 *
 * @param userId
 * @param _id
 * @param commentId
 * @param callback
 */
exports.commentRemove = function(userId, _id, commentId, callback) {
    Blog.findOneAndUpdate(
        {_id: new ObjectId(_id)},
        {$pull: {comments : {_id: commentId, userId: userId}}},
        {new: true},
        function(error, data) {
            if(error) {
                throw error;
            }
            if(!data) {
                return err.throw(409, property.error.dontHaveAuth);
            }

            callback();
        }
    )
};

/**
 * 댓글 수정
 *
 * 댓글 삭제 후 새로 등록시켜버린다.
 *
 * @param userId
 * @param blogVO
 * @param callback
 */
exports.commentEdit = function(userId, _id, commentId, content, callback) {
    Blog.findOneAndUpdate(
        {
            _id: new ObjectId(_id),
            'comments': {
                $elemMatch: {_id: commentId, userId: userId}
            }
        },
        {
            $set: {'comments.$.content': content}
        },
        {new: true},
        function (error, data){
            if(error) {
                throw error;
            }
            if(!data) {
                return err.throw(409, property.error.dontHaveAuth);
            }

            callback();
        });
};

/**
 * 서브 댓글 등록
 *
 * @param userId
 * @param _id
 * @param commentId
 * @param name
 * @param content
 * @param callback
 */
exports.subCommentSave = function(userId, _id, commentId, name, content, callback) {
    Blog.update(
        {
            _id: new ObjectId(_id),
            'comments': {
                $elemMatch: {_id: commentId}
            }
        },
        {$push: {'comments.$.subComments': {userId: userId, name: name, content: content}}},
        function (error){
            if(error){
                throw error;
            }

            callback();
        });
};

/**
 * 서브댓글 수정
 *
 * @param userId
 * @param _id
 * @param commentId
 * @param content
 * @param callback
 */
exports.subCommentEdit = function(userId, _id, commentId, subCommentId, content, callback) {
    exports.getDetail(_id, function(blog) {
        blog.comments.forEach(function(data) {
            // the following line looks for the specific array to add jobName Andrea to.
            if (data._id == commentId) {
                data.subComments.forEach(function(subData) {
                    if(subData._id == subCommentId) {
                        subData.content = content;
                        exports.subCommentRemove(userId, _id, commentId, subCommentId, function() {
                            Blog.update(
                                {
                                    _id: new ObjectId(_id),
                                    'comments': {
                                        $elemMatch: {_id: commentId}
                                    }
                                },
                                {$push: {'comments.$.subComments': subData}},
                                function (error){
                                    if(error){
                                        throw error;
                                    }

                                    callback();
                                });
                        });
                    }
                })
            }
        })
    })
};

/**
 * 서브 댓글 삭제
 *
 * @param userId
 * @param _id
 * @param commentId
 * @param subCommentId
 * @param callback
 */
exports.subCommentRemove = function(userId, _id, commentId, subCommentId, callback) {
    Blog.update(
        {
            _id: new ObjectId(_id),
            'comments': {
                $elemMatch: {_id: commentId}
            }
        },
        {$pull: {'comments.$.subComments' : {_id: subCommentId, userId: userId}}},
        function(error) {
            if(error) {
                throw error;
            }
            callback();
        }
    )
};