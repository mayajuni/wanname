/**
 * Created by KwonDongjun on 2015-06-30.
 */
var app = angular.module("admin", [
        'ngAnimate',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'ngFileUpload',
        'summernote',
        'dndLists',
        'templates',
        'utils'
    ])
    .run(['$rootScope', 'loginS', '$state', function($rootScope, loginS, $state) {
        loginS.autoLogin().then(function() {
            if(!$rootScope.admin){
                loginS.getLoginInfo().then(function(data) {
                    if(!data) {
                        $state.go('login');
                    }else{
                        $rootScope.admin = data;
                    }
                })
            }
        });
    }])
    ;

angular.module("templates", []);