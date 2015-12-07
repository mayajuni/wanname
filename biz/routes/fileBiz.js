/**
 * Created by mayaj on 2015-08-27.
 */
var multiparty = require("multiparty");
var fs = require("fs");
var err = require('../util/error');
var property = require('../../property');
var config = require("../../config");

var docBiz = {
    board: require("./boardBiz"),
    blog: require("./blogBiz"),
    user: require("./memberBiz")
};

/* mongo 연결 */
var mongo = require('../config/mongoConfig');
/* mongo Model */
var File = mongo.model.file;

/* mongo objectId type */
var ObjectId = mongo.mongoose.Types.ObjectId;

/**
 * 파일 등록
 *
 * @param req
 * @param division
 * @param callback
 */
exports.save = function(req, division, callback){
    if(!fs.existsSync(config.file.path)){
        fs.mkdirSync(config.file.path);
    }
    if(!fs.existsSync(config.file.path + division)){
        fs.mkdirSync(config.file.path + division);
    }
    var form = new multiparty.Form();
    form.uploadDir = config.file.path + division;
    form.maxFilesSize   = config.file.max_size;

    form.parse(req, function(error, fields, files) {
        if(error){
            /* 에러 자동 감지를 벗어나기 위해 이렇게 넣는다. */
            err.throw(4019, error);
        }

        var fileVO = files.file[0];
        fileVO.id = req.session.admin._id || req.admin._id;
        fileVO.name = fileVO.originalFilename;
        fileVO.type = fileVO.headers['content-type'];
        fileVO.isImg = fileVO.type.toString().indexOf('image') > -1;
        fileVO.virtualName = fileVO.path.replace(/(\/([^>]+)\/)/ig,"").replace(/(\\([^>]+)\\)/ig,"").replace('upload','');
        fileVO.url = "/"+division+"/" +fileVO.virtualName;
        /* 키로 바이트로 변환 */
        fileVO.size = (fileVO.size * 0.000977).toFixed(2);

        var file = new File(fileVO);

        file.save(function(error, room){
            if(error){
                fs.unlinkSync(fileVO.path);
                err.throw(4019, error);
            }

            fileVO._id = room._id;

            callback(fileVO);
        });
    });
};

/**
 * 구분 아이디, 구분을 넣어준다. 차후 스케쥴러를 통해 관련 없는 file을 삭제 하기 위해서.
 *
 * @param _id
 * @param division
 * @param divisionId
 */
exports.addDivisionId = function(fileList, docName, docId, callback) {
    var fileIds = [];
    for(var i in fileList) {
        fileIds.push(new ObjectId(fileList[i]._id));
    }
    File.update(
        {_id:  {$in: fileIds}},
        {$set: {docName: docName, docId: docId}},
        {multi: true},
        function(error) {
            if(error){
                throw error;
            }

            callback();
        }
    )
};

/**
 * 구분 아이디를 가지고 파일을 삭제한다.
 *
 * @param divisionId
 * @param division
 */
exports.divisionIdRemove = function(docId, docName, callback) {
    File.find({docId: docId, docName: docName}, function(error, data) {
        if(error) {
            throw error;
        }

        if(!!data && data.length > 0) {
            for(var i in data) {
                fs.unlinkSync(data[i].path);
            }

            File.remove({docId: docId, docName: docName}, function(error) {
                if(error) {
                    throw error;
                }

                callback();
            });
        }else {
            callback();
        }
    });
};

/**
 * 파일 삭제
 *
 * @param _id
 * @param id
 * @param callback
 */
exports.remove = function(_id, id, callback){
    File.findOne(
        /*{_id: _id, id: id},*/
        {_id:  new ObjectId(_id)},
        function(error, data){
            if(error){
                throw error;
            }

            if(!data){
                err.throw(409, property.error.dontHaveAuth);
            }

            if(data.docName && data.docId) {
                for(var key in config.file.doc) {
                    if(data.docName == config.file.doc[key]) {
                        docBiz[key].removeFile(data.docId, data._id, function() {
                            fileRmove()
                        });
                        break;
                    }
                }
            }else {
                fileRmove()
            }

            function fileRmove() {
                File.remove({_id: new ObjectId(_id)}, function(error){
                    if(error){
                        throw error;
                    }

                    fs.unlinkSync(data.path);

                    callback();
                });
            }

        }
    )
};

/**
 * 파일 권한을 체크 한다.
 *
 * @param id
 * @param url
 * @param callback
 */
exports.checkFileAuth = function(id, url, callback){
    File.count(
        {userId: id, url: url},
        function(error, data) {
            if(error){
                throw error;
            }

            if(data < 1) {
                err.throw(409, property.error.dontHaveAuth);
            }

            callback();
        }
    )
};