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
                    abstract: true,
                    url: '/program',
                    templateUrl: 'view/program/program.tpl.html'
                })
                .state('program.list', {
                    url: '',
                    templateUrl: 'view/program/programList.tpl.html',
                    controller: 'programC'
                })
                .state('program.detail', {
                    url: '/:_id',
                    templateUrl: 'view/program/programDetail.tpl.html',
                    controller: 'programDetailC'
                })
                .state('blog', {
                    abstract: true,
                    url: '/blog',
                    templateUrl: 'view/blog/blog.tpl.html'
                })
                .state('blog.list', {
                    url: '',
                    templateUrl: 'view/blog/blogList.tpl.html',
                    controller: 'blogC',
                    resolve: {
                        blog: ['blogS', function(blogS) {
                            return blogS.getBlogList().then(function(data) {
                                return data;
                            })
                        }],
                        bestBlog: ['blogS', function(blogS) {
                            return blogS.getBestBlog().then(function(data) {
                                return data;
                            })
                        }]
                    }
                })
                .state('blog.detail', {
                    url: '/:_id',
                    templateUrl: 'view/blog/blogDetail.tpl.html',
                    controller: 'blogDetailC',
                    resolve: {
                        blog: ['blogS', '$stateParams', function(blogS, $stateParams) {
                            return blogS.getBlogDetail($stateParams._id).then(function(data) {
                                return data;
                            })
                        }]
                    }
                })
            ;

            $urlRouterProvider.otherwise('/');
        }]);