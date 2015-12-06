/**
 * Created by 동준 on 2015-04-28.
 */
var rootVo = require("./vo");

/**
 *  변수 설정
 *  method: 유효성 검사시 해당 메소드만 검사
 *  validate: 유효성 검사 여부
 *  default: 디폴트 값
 *  checkURL :
 *    - 배열로 넣어야됨
 *    - 체크하지 않을 url은 앞에 ! 붙인다.
 *    - url 자체에 parameter 값이 있을시 이것을 쓰면 안됨. 아직 그부분 추가 개발이 안됨.
 */
function Vo() {
    return {
        _id: {method: "POST", validate: true, checkURL: ['/api/join']},
        password: {method: "POST", validate: true, checkURL: ['/api/join', '/api/mypage/changePassword']},
        newPassword: {method: "POST", validate: true, checkURL: ['/api/mypage/changePassword']},
        name: {method: "POST", validate: true, checkURL: ['/api/join']},
        ph: String,
        homepage: String,
        introduce: String,
        identification: String,
        failIdentificationReason: String,
        regDt: {default: Date.now},
        modiDt: {default: Date.now}
    }
};

/* getter */
exports.get = {};

/* 셋팅 및 벨리데이션 체크를 한다. */
exports.set = function(req, res, next){
    exports.get = new Vo();
    rootVo.setAndValdate(req, next, exports.get);
};