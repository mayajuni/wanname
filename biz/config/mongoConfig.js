/**
 * Created by 동준 on 2014-10-28.
 */
var config = require('../../config');
var mongo = {};
mongo.mongoose = require('mongoose');
/*mongo.mongoose.connect(config.mongodb.connectUrl);*/
var Schema = mongo.mongoose.Schema;

/* 스키마 */
mongo.schema = {};

/* 사용자 */
mongo.schema.user = new Schema({
    _id: String,
    password: String,
    token: String,
    name: String,
    birthday: Number,
    ph: Number,
    regDt: {type: Date, default: Date.now},
    modiDt: Date
});

/* 파일 */
mongo.schema.file = new Schema({
    name: String,
    userId: String,
    docName: String,
    docId: String,
    path: String,
    url: String,
    virtualName: String,
    size: String,
    isImg: Boolean,
    type: String,
    regDt: {type: Date, default: Date.now}
});

/* 프로그램 코스(프로그램 스키마를 위해 필요) */
mongo.schema.programCourses = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    /* 상세 내역은 json 형식으로 {1:내용, 2:내용} 이런식으로 간다 */
    detail: Object,
    location:  {type: String, required: true},
    term:  {type: String, required: true},
    pay:  {type: Number, required: true},
    regDt: {type:Date, default: Date.now}
});

/* 프로그램 내용(프로그램 스키마를 위해 필요) */
mongo.schema.programContent = new Schema({
    title: String,
    content: String,
    fileInfo: {type: Object, ref: mongo.schema.file},
    rank: Number
});

/* 프로그램 */
mongo.schema.program = new Schema({
    category: String,
    mainImage: {type: Object, ref: mongo.schema.file},
    title: {type: String, required: true},
    content: [mongo.schema.programContent],
    courses: [mongo.schema.programCourses],
    oldHtml: String,
    regDt: {type: Date, default: Date.now},
    regId: {type: String, required: true},
    modiDt: Date
});

/* 후기 */
mongo.schema.review = new Schema({
    parents: {type: Object, ref: mongo.schema.program},
    userId: {type: String, required: true},
    name: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: [mongo.schema.file],
    regDt: {type: Date, default: Date.now}
});

/* 게시판 */
mongo.schema.board = new Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    /* 카테고리 */
    category: String,
    title: {type: String, required: true},
    content: {type: String, required: true},
    /* Qna에서 사용 */
    isAnswer: {type:Boolean, default: false},
    /* Qna에서 사용 */
    answer: String,
    fileList: [mongo.schema.file],
    regDt: {type: Date, default: Date.now}
});

/** --관리자 시작------------------------------------------------------------------------------ */

/* 관리자 */
mongo.schema.admin = new Schema({
    _id: String,
    password: String,
    name: String,
    email: String,
    /* step1 메뉴 */
    step1: Object,
    /* step2 메뉴 */
    step2: Object,
    isDelete : {type: String, default: "N"},
    deleteDt : Date,
    deleteId : String,
    regDt : {type: Date, default: Date.now},
    modiDt : {type: Date, default: Date.now}
});

/* 관리자 sub 메뉴 */
mongo.schema.adminSubMenu = new Schema({
    name: String,
    nickName: String,
    url: String,
    api : String,
    rank: Number,
    userId : String,
    regDt : {type: Date, default: Date.now}
});

/* 관리자 메뉴 */
mongo.schema.adminMenu = new Schema({
    name: {type:String, unique: true},
    nickName: String,
    url: String,
    api : String,
    rank: Number,
    subMenuList: [mongo.schema.adminSubMenu],
    userId : String,
    regDt: {type: Date, default: Date.now}
});

/* 티져 */
mongo.schema.teaser = new Schema({
    _id: String,
    count: Number,
    regDt: {type: Date, default: Date.now}
});

/* 모델 */
mongo.model = {};
mongo.model.user =  mongo.mongoose.model('user', mongo.schema.user);
mongo.model.board =  mongo.mongoose.model('board', mongo.schema.board);
mongo.model.file =  mongo.mongoose.model('file', mongo.schema.file);
mongo.model.program =  mongo.mongoose.model('program', mongo.schema.program);
mongo.model.admin = mongo.mongoose.model('admin', mongo.schema.admin);
mongo.model.adminMenu = mongo.mongoose.model('admin_menu', mongo.schema.adminMenu);
mongo.model.teaser = mongo.mongoose.model('teaser', mongo.schema.teaser);

module.exports = mongo;