/**
 * Created by 동준 on 2015-10-02.
 */
app
    .controller('headerC', ['$rootScope', '$scope', 'loginS', 'joinS', '$state',
        function($rootScope, $scope, loginS, joinS, $state){
            $scope.$state = $state;

            $scope.login = function() {
                loginS.openLoginModal();
            };

            $scope.join = function() {
                joinS.openJoinModal();
            };

            $scope.logout = function() {
                loginS.logout();
            };

            $scope.toggle = function() {
                menuToggle();
            };

            $rootScope.$on('$stateChangeSuccess', function() {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                closeMenu();
            });
        }]);