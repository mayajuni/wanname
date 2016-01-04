/**
 * Created by 동준 on 2015-10-02.
 */
app
    .controller('headerC', ['$rootScope', '$scope', 'loginS', 'joinS', '$location',
        function($rootScope, $scope, loginS, joinS, $location){
            $scope.login = function() {
                loginS.openLoginModal();
            };

            $scope.join = function() {
                joinS.openJoinModal();
            };

            $scope.logout = function() {
                loginS.logout();
            };
        }]);