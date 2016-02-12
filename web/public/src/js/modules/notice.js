/**
 * Created by mayaj on 2016-01-22.
 */
app.directive('noticeList', function(){
    return {
        restrict: 'AE',
        scope : {
            noPage : '@'
        },
        templateUrl : 'view/center/notice/noticeList.drtv.html',
        controller : ['$scope', 'noticeS',
            function($scope, noticeS){
                $scope.search = {
                    view: $scope.noPage ? 5 : 10
                };

                noticeS.getNoticeBest().then(function(data) {
                    $scope.bestList = data;
                });

                function getList() {
                    noticeS.getNoticeList($scope.search).then(function(data) {
                        $scope.count = data.count;
                        $scope.noticeList = data.list;
                    });
                }

                $scope.$watch("search.page", function(){
                    getList();
                });
            }]
    }
})