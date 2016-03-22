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
                .state('about', {
                    url: '/about',
                    templateUrl: 'view/about/about.tpl.html',
                })
                .state('program', {
                    abstract: true,
                    url: '/program',
                    template: '<div ui-view></div>'
                })
                .state('program.list', {
                    url: '/',
                    templateUrl: 'view/program/programList.tpl.html',
                    controller: 'programC'
                })
                .state('program.detail', {
                    url: ':_id',
                    templateUrl: 'view/program/programDetail.tpl.html',
                    controller: 'programDetailC',
                    resolve: {
                        detail: ['programS', '$stateParams', function(programS, $stateParams) {
                            return programS.getProgramDetail($stateParams._id).then(function(data) {
                                return data
                            })
                        }]
                    }
                })
                .state('blog', {
                    abstract: true,
                    url: '/blog',
                    template: '<div ui-view></div>'
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
                .state('center', {
                    url: '/center',
                    abstract: true,
                    template: '<div ui-view></div>'
                })
                .state('center.main', {
                    url: '',
                    templateUrl: 'view/center/center.tpl.html'
                })
                .state('center.notice', {
                    url: '/notice',
                    template: '<div class="menu-detail">' +
                    '<div class="main-title margin-bottom-10">공지사항' +
                    '<div class="small">워너미의 다양한 소식을 함께 하세요.</div>' +
                    '</div>' +
                    '<article id="notice"><notice-list></notice-list></article>' +
                    '</div>'
                })
                .state('center.noticeDetail', {
                    url: '/notice/:_id',
                    templateUrl: 'view/center/notice/noticeDetail.tpl.html',
                    controller: 'noticeDetailC',
                    resolve: {
                        notice: ['noticeS', '$stateParams', function(noticeS, $stateParams) {
                            return noticeS.getNoticeDetail($stateParams._id).then(function(data) {
                                return data;
                            })
                        }]
                    }
                })
                .state('center.faq', {
                    url: '/faq',
                    template: '<div class="menu-detail">' +
                    '<div class="main-title margin-bottom-10">FAQ' +
                    '<div class="small">자주찾는 질문은 여기에서.</div>' +
                    '</div>' +
                    '<article id="faq"><faq></faq></article>' +
                    '</div>'
                })
                .state('myPage', {
                    url: '/myPage',
                    templateUrl: 'view/myPage/myPage.tpl.html',
                    controller: 'myPageC'
                })
            ;

            $urlRouterProvider.otherwise('/');
        }]);