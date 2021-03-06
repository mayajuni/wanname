/**
 * Created by mayaj on 2015-09-01.
 */
var config = require('../../config');
var fs = require("fs");
var fileBiz = require('./fileBiz');

/* mongo 연결 */
var mongo = require('../config/mongoConfig');
var Board = mongo.model.board;

/* mongo objectId type */
var ObjectId = mongo.mongoose.Types.ObjectId;

/**
 * 게시판
 *
 * @param category
 * @param search
 * @param callback
 */
exports.getNoPagingList = function(category, search, callback) {
    var where  = {};
    where.category = category;
    if(!!search.name){
        where.name = search.name;
    }
    if(!!search.title){
        where.title = {$regex : search.title};
    }
    if(!!search.content){
        where.content = {$regex : search.content};
    }

    Board.find(where, null, {sort : {"regDt" : -1}}, function(error, data){
        if(error){
            throw error;
        }

        callback(data);
    });
};

/**
 * 게시판
 *
 * @param division
 * @param callback
 */
exports.getList = function(search, callback) {
    var where  = {};
    if(!!search.category) {
        where.category = search.category;
    }
    if(!!search.name){
        where.name = search.name;
    }
    if(!!search.title){
        where.title = {$regex : search.title};
    }
    if(!!search.userId){
        where.userId = search.userId;
    }
    if(!!search.content){
        where.content = {$regex : search.content};
    }
    if(search.isAnswer != null && search.isAnswer != undefined && search.isAnswer != '') {
        where.isAnswer = search.isAnswer;
    }

    Board.count(where, function(error, count){
        if(error){
            throw error;
        }

        var board = {};
        var page = !search.page ? 1 : search.page;
        var view = !search.view ? 20 : search.view;
        board.count = count;
        board.page = page;

        Board.find(where, null, {sort : {"regDt" : -1}, skip : view * (page- 1), limit: Number(view) }, function(error, data){
            if(error){
                throw error;
            }

            board.list = data;
            callback(board);
        });
    });
};

/**
 * 게시판
 *
 * @param division
 * @param callback
 */
exports.getBestList = function(category, callback) {
    Board.find({category: category, isTop: true}, null, {sort : {"regDt" : -1}}, function(error, data){
        if(error){
            throw error;
        }

        callback(data);
    });
};

/**
 * 게시판 상세를 가지고 온다.
 *
 * @param _id
 * @param callback
 */
exports.getDetail = function(_id, callback) {
    Board.findOne({_id: new ObjectId(_id)}, function(error, data) {
        if(error) {
            throw error;
        }

        callback(data);
    })
};

/**
 * 나의 게시판 상세를 가지고 온다.
 *
 * @param _id
 * @param callback
 */
exports.getMyDetail = function(userId, _id, callback) {
    Board.findOne({_id: new ObjectId(_id), userId: userId}, function(error, data) {
        if(error) {
            throw error;
        }

        callback(data);
    })
};


/**
 * 게시판 상세를 가지고 온다.
 *
 * @param _id
 * @param callback
 */
exports.getMyDetail = function(userId, _id, callback) {
    Board.findOne({_id: new ObjectId(_id), userId: userId}, function(error, data) {
        if(error) {
            throw error;
        }

        callback(data);
    })
};

/**
 * 게시판 상세와 리스트를 가지고 온다.
 *
 * @param _id
 * @param callback
 */
exports.getDetailAndList = function(category, _id, callback) {
    Board.findOne({_id: new ObjectId(_id), category: category}, function(error, data) {
        if(error) {
            throw error;
        }

        var board = {
            detail: data
        };
        Board.count({category: category, regDt: {$gt: new Date(data.regDt)}}, function(error, myCount) {
            if(error) {
                throw error;
            }

            myCount = myCount < 2 ? 0 : myCount - 2;
            Board.find({category: category}, null, {sort : {"regDt" : -1}, skip : myCount, limit: 6 }, function(error, data){
                if(error){
                    throw error;
                }

                board.subList = data;

                callback(board);
            });
        });
    })
};

/**
 * 게시판 등록
 *
 * @param userId
 * @param name
 * @param boardVO: Object
 * @param callback
 */
exports.save = function(userId, name, boardVO, callback) {
    var board = new Board(boardVO);
    board.userId = userId;
    board.name = name;

    board.save(function(error, result) {
        if(error) {
            throw error;
        }

        if(!!boardVO.fileList) {
            fileBiz.addDivisionId(boardVO.fileList, config.file.doc.board, result._id, callback);
        }else {
            callback();
        }
    })
};

/**
 * 게시판 수정
 *
 * @param boardVO
 * @param callback
 */
exports.update = function(userId, boardVO, callback) {
    var _id = boardVO._id;
    delete boardVO._id;
    boardVO.modiDt = Date.now();
    if(boardVO.isAnswer) {
        boardVO.answerDt = Date.now();
        var userId = boardVO.userId;
    }

    fileBiz.divisionIdEditRemove(_id, config.file.doc.board, function() {
        Board.update(
            {_id: new ObjectId(_id), userId: userId},
            {$set: boardVO},
            function(error) {
                if(error) {
                    throw error;
                }

                if(!!boardVO.fileList) {
                    fileBiz.addDivisionId(boardVO.fileList, config.file.doc.board, _id, callback);
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
    Board.remove({_id: new ObjectId(_id), userId: userId}, function(error) {
        if(error) {
            throw error;
        }

        fileBiz.divisionIdRemove(_id, config.file.doc.board, function() {
            callback();
        });
    })
};

/**
 * qna 삭제
 * 답변이 있는건 삭제가 안되어야한다.
 *
 * @param userId
 * @param _id
 * @param callback
 */
exports.removeQna = function(userId, _id, callback) {
    Board.remove({_id: new ObjectId(_id), category: config.board.qna, userId: userId, isAnswer: false}, function(error) {
        if(error) {
            throw error;
        }

        fileBiz.divisionIdRemove(_id, config.file.doc.board, function() {
            callback();
        });
    })
};