/**
 * Created by 동준 on 2015-10-02.
 */
app
    .controller('headerC', ['$rootScope', '$scope', 'loginS', 'joinS', '$location',
        function($rootScope, $scope, loginS, joinS, $location){
            var nowMenu = '/';
            $scope.openLogin = function() {
                loginS.openLoginModal()
            };

            $scope.openJoin = function() {
                joinS.openJoinModal();
            };

            $scope.logout = function() {
                loginS.logout();
            };

            $scope.closeMenu = function() {
                $('#navbar').collapse('hide');
            };

            $scope.checkActive = function(menu) {
                return {
                    active: nowMenu.indexOf(menu) > -1
                }
            };

            $rootScope.$on('$stateChangeSuccess', function() {
                /* 현재 메뉴 active */
                nowMenu = $location.path();
                $("body").animate({scrollTop: 0}, 0);
            });

            $('html').click(function(e) {
                /* section과 header를 클릭하면 닫아라 */
                if($('#navbar').has(e.target).length < 1){
                    $('#navbar').collapse('hide')
                }
            });
        }]);