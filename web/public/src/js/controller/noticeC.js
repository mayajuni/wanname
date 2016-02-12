/**
 * Created by mayaj on 2016-01-21.
 */
app
    .controller('noticeDetailC', ['$rootScope', '$scope', 'notice',
        function($rootScope, $scope, notice) {
            $scope.notice = notice.detail;
            $scope.subList = notice.subList;
        }]);