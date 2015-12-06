/**
 * Created by 동준 on 2015-10-02.
 */
app
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function($urlRouterProvider, $stateProvider, $locationProvider){
            $locationProvider.html5Mode(true);

            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'main/main.tpl.html',
                    controller: 'mainC'
                })
                .state('program', {
                    url: '/program',
                    templateUrl: 'program/programList.tpl.html',
                    controller: 'programC'
                })
                .state('program-detail', {
                    url: '/program/:_id',
                    templateUrl: 'program/programDetail.tpl.html',
                    controller: 'programDetailC'
                })
                .state('myPage', {
                    url: '/myPage',
                    templateUrl: 'myPage/myPage.tpl.html',
                    controller: 'programDetailC'
                })
            ;

            $urlRouterProvider.otherwise('/');
        }]);