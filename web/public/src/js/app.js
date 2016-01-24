/**
 * Created by KwonDongjun on 2015-06-30.
 */
var app = angular.module("wanname", [
    'ngAnimate',
    'ui.router',
    'ui.bootstrap.modal',
    'ui.bootstrap.collapse',
    'ui.bootstrap.pagination',
    'ui.bootstrap.tpls',
    'ngFileUpload',
    'summernote',
    'templates',
    'mgcrea.ngStrap',
    'utils'
]).run(['$rootScope', 'loginS', function($rootScope, loginS) {
    if(!$rootScope.user) {
        loginS.getLoginInfo().then(function() {
            if(!$rootScope.user) {
                loginS.autoLogin();
            }
        });
    }
}]);
angular.module("templates", []);