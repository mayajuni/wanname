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
        'config',
        'utils'
    ])
    .config(["$httpProvider", function($httpProvider) {
        $httpProvider.interceptors.push("httpConfig");
    }])
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider){
            $locationProvider.html5Mode(true);

            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'view/main/main.tpl.html'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'view/login/login.tpl.html',
                    controller: 'loginC'
                })
                .state('serviceCenter', {
                    url: '/serviceCenter/:category',
                    templateUrl: function(stateParams) {
                        return 'view/serviceCenter/'+stateParams.category+'/'+stateParams.category+'List.tpl.html';
                    },
                    controller: 'boardC'
                })
                .state('management-menu', {
                    url: '/management/menu',
                    templateUrl: 'view/management/menu/menuList.tpl.html',
                    controller: 'menuListC',
                    resolve: {
                        menuList: ['menuS', function(menuS){
                            return menuS.getMenu().then(function(data){
                                return data;
                            })
                        }]
                    }
                })
                .state('management-auth', {
                    url: '/management/auth',
                    templateUrl: 'view/management/auth/auth.tpl.html'
                })
                .state('management-administrator', {
                    url: '/management/administrator',
                    templateUrl: 'view/management/administrator/administrator.tpl.html',
                    controller: 'administratorC',
                    resolve: {
                        adminList: ['administratorS', function(administratorS){
                            return administratorS.getAdministratorList().then(function(data){
                                return data;
                            })
                        }]
                    }
                })
                .state('member', {
                    url: '/member',
                    templateUrl: 'view/member/memberList.tpl.html',
                    controller: 'memberC',
                    resolve: {/*,
                        stats: ['memberS', function(memberS){
                            return memberS.getStats().then(function(data){
                                return data;
                            })
                        }]*/
                    }
                })
                .state('teaser', {
                    url: '/teaser',
                    templateUrl: 'view/teaser/teaser.tpl.html',
                    controller: 'teaserC',
                    resolve: {
                        teaserInfo: ['teaserS', function(teaserS) {
                            return teaserS.getTeaserList().then(function(data) {
                                return data;
                            })
                        }]
                    }
                })
            ;

            $urlRouterProvider.otherwise('/');
        }])
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