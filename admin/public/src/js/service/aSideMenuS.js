/**
 * Created by mayaj on 2015-10-16.
 */
app.factory('sideMenuS', ['$rootScope', '$q', '$state', 'property', '$http', '$stateParams', '$location',
    function($rootScope, $q, $state, property, $http, $stateParams, $location){
        /* html 클릭 이벤트 */
        $('html').click(function(e) {
            if(window.matchMedia("(max-width: 1020px)").matches) {
                /* 메뉴가 보일때 */
                if($rootScope.hideMenu){
                    /* section과 header를 클릭하면 닫아라 */
                    if($('aside').has(e.target).length != 1 &&  $('#leftMenuBtn').has(e.target).length != 1){
                        $rootScope.hideMenu = false;
                        $rootScope.$apply();
                    }
                }
            }
        });

        var service = {
            getAdministratorMenu: function() {
                var asy = $q.defer();
                if(!!service.administratorMenu) {
                    asy.resolve(service.administratorMenu);
                }else{
                    $http.get(property.api.sideMenu + 'getAdministratorMenu').success(function (data){
                        service.administratorMenu = data;
                        asy.resolve(data);
                    });
                }
                return asy.promise;
            },
            /**
             * 라우터가 변경될때마다 이벤트
             * 병경 될때마다 active한 메뉴를 찾는다.
             *
             * @param $scope: Object
             */
            changeMenuEvent: function($scope) {
                /* 메뉴가 변경 될때마다 이벤트 일어난다. */
                $rootScope.$on('$stateChangeSuccess', function() {
                    /* 현재 메뉴 active */
                    service.activeMenu($scope);
                });
            },
            /**
             * active한 메뉴를 찾는다.
             *
             * @param $scope: Object
             */
            activeMenu: function ($scope) {
                var path = $location.path();
                if(!!$scope.menuList) {
                    for(var i=0; i<$scope.menuList.length; i++){
                        /* 서브 메뉴가 없을경우 url이 같거나 혹은 param에 있는 category이 같을경우 같은 메뉴로 인정 */
                        if((!$scope.menuList[i].subMenuList ||$scope.menuList[i].subMenuList.length < 1)
                            && (path == $scope.menuList[i].url || $stateParams.category == $scope.menuList[i].name)){
                            $scope.menuList[i].active = true;
                            /* 지금 메뉴를 알려준다. */
                            $rootScope.activeMenu = $scope.menuList[i];
                        }else{
                            $scope.menuList[i].active = false;
                        }
                        /* 서브 메뉴가 있을시. */
                        if(!!$scope.menuList[i].subMenuList && $scope.menuList[i].subMenuList.length > 0) {
                            /* 반복문 돌려준다/ */
                            for (var j = 0; j < $scope.menuList[i].subMenuList.length; j++) {
                                $scope.menuList[i].subActive = false;
                                /* url이 같거나 혹은 param에 있는 division이 같을경우 같은 메뉴로 인정 */
                                if (path == $scope.menuList[i].subMenuList[j].url || $stateParams.category == $scope.menuList[i].subMenuList[j].name) {
                                    $scope.menuList[i].active = true;
                                    $scope.menuList[i].subMenuList[j].active = true;
                                    /* 지금 메뉴를 알려준다. */
                                    $rootScope.activeMenu = $scope.menuList[i].subMenuList[j];
                                } else {
                                    $scope.menuList[i].subMenuList[j].active = false;
                                }
                            }
                        }
                    }
                }
            },
            administratorMenu: null
        };

        return service;
    }]);