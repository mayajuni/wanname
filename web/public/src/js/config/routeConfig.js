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
                    templateUrl: 'view/main/main.tpl.html',
                    controller: 'mainC'
                })
                .state('program', {
                    url: '/program',
                    templateUrl: 'view/program/program.tpl.html',
                    controller: 'programC'
                })
                .state('blog', {
                    abstract: true,
                    url: '/blog',
                    templateUrl: 'view/blog/blog.tpl.html'
                })
                .state('blog.list', {
                    url: '',
                    templateUrl: 'view/blog/blogList.tpl.html',
                    controller: 'blogC'
                  /*  resolve: {
                        blogList: ['blogS', function(blogS) {
                            return blogS.list().then(function(data) {
                                return data;
                            })
                        }]
                    }*/
                })
                .state('blog.detail', {
                    url: '/:_id',
                    templateUrl: 'view/blog/blogDetail.tpl.html',
                    controller: 'blogC',
                    /*resolve: {
                        blogList: ['blogS', function(blogS) {
                            return blogS.list().then(function(data) {
                                return data;
                            })
                        }]
                    }*/
                })
            ;

            $urlRouterProvider.otherwise('/');
        }]);