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
            ;

            $urlRouterProvider.otherwise('/');
        }]);