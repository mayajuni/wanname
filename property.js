/**
 * Created by 동준 on 2015-08-31.
 */
var property = {};

/* email */
property.email = {};
/* 템플릿 */
property.email.tpls = {};
property.email.tpls.findPassword = "findPassword.ejs";
/* 제목 */
property.email.title = {};
property.email.title.findPassword = "[✔ Wanna:me] 비밀번호 찾기";
property.email.title.adminFindPassword = "[✔ Wanna:me] 관리자 비밀번호";

/* 한탑 session에 저장될 항목 보여지는건 1 안보여지는건 0 */
property.filter = {};
property.filter.session = {};
property.filter.session._id = 1;
property.filter.session.name = 1;
property.filter.session.token = 1;

/* member */
property.maxPwLength = 10;

module.exports = property;