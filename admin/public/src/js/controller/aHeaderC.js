/**
 * Created by mayaj on 2015-09-22.
 */
app
    .controller('headerC', ['$rootScope', '$scope', '$sce', 'loginS', function($rootScope, $scope, $sce, loginS){
        $rootScope.hideMenu = false;
        $scope.toggleLeftMenu = function() {
            $rootScope.hideMenu = !$rootScope.hideMenu
        };

        $scope.newsList = [
            {profileUrl : 'http://images.gofreedownload.net/woman-28905.jpg', content : '누구누구 님이 북마크를 올렸습니다.', regDt : '2015.05.02 11:00'},
            {profileUrl : 'http://images.gofreedownload.net/woman-28905.jpg', content : '누구누구 님이 북마크를 올렸습니다.', regDt : '2015.05.02 11:00'},
            {profileUrl : 'http://images.gofreedownload.net/woman-28905.jpg', content : '누구누구 님이 북마크를 올렸습니다.', regDt : '2015.05.02 11:00'},
            {profileUrl : 'http://images.gofreedownload.net/woman-28905.jpg', content : '누구누구 님이 북마크를 올렸습니다.', regDt : '2015.05.02 11:00'},
            {profileUrl : 'http://images.gofreedownload.net/woman-28905.jpg', content : '누구누구 님이 북마크를 올렸습니다.', regDt : '2015.05.02 11:00'}
        ];

        $scope.profileMenu = [
            {click : "", url: "aa", content : $sce.trustAsHtml("<i class='fa fa-user-secret'></i> My Account")},
            {divider : true},
            {click : "logout()", content : $sce.trustAsHtml("<i class='fa fa-sign-out'></i> Logout")}
        ];

        $scope.logout = function() {
            loginS.logout();
        };

        $scope.$on("news", function(data){
            $scope.newsList.push(data);
        });
    }]);