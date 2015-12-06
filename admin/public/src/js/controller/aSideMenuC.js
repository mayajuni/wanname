/**
 * Created by mayaj on 2015-10-16.
 */
app.controller('sideMenuC', ['$scope', 'sideMenuS',
    function($scope, sideMenuS){
        /* 메뉴 닫기 */
        $scope.menuClose = function() {
            $(".collapse").collapse('hide');
        };
        /* 메뉴 가지고 오기 */
        sideMenuS.getAdministratorMenu().then(function(menuList) {
            $scope.menuList = menuList;
            sideMenuS.activeMenu($scope);

            /* 메뉴가 변경될때 이벤트 */
            sideMenuS.changeMenuEvent($scope);
        })
    }]);