/**
 * Created by mayaj on 2015-09-22.
 */
app
    .controller('menuListC', ['$scope', 'menuS', 'menuList',
        function($scope, menuS, menuList){
            $scope.menus = menuList;

            $scope.addMenuForm = function(step) {
                $scope.isAdd = 'Add';
                $scope.detail = {};
                $scope.showForm = true;
                $scope.step = step;
                if(step == 1) {
                    $scope.step1 = null;
                }else {
                    $scope.isAdd += ' - ' +  $scope.step1.nickName;
                }
            };

            $scope.saveRank = function() {
                $scope.step1 = null;
                $scope.isAdd = null;
                $scope.showForm = false;
                if(!confirm('메뉴 순서를 변경하시겠습니까?')) {
                    return;
                }
                for(var i=0;i<$scope.menus.length;i++) {
                    $scope.menus[i].rank = i;
                    if($scope.menus[i].subMenuList && $scope.menus[i].subMenuList.length > 0) {
                        for(var j=0;j<$scope.menus[i].subMenuList.length;j++){
                            $scope.menus[i].subMenuList[j].rank = j;
                        }
                    }
                }

                menuS.saveRank($scope.menus).then(function() {
                    finishService('순서변경이 완료되었습니다.');
                })
            };

            $scope.addMenu = function() {
                if(!confirm('등록하시겠습니까?')) {
                    return;
                }
                if($scope.step1) {
                    $scope.detail.parentId = $scope.step1._id;
                }
                $scope.detail.rank = 99;
                menuS.saveMenu($scope.detail).then(function() {
                    finishService('등록이 완료되었습니다.');
                })
            };

            $scope.editMenu = function() {
                if(!confirm('수정하시겠습니까?')) {
                    return;
                }

                $scope.detail.step = $scope.step;
                menuS.editMenu($scope.detail).then(function() {
                    $scope.getMenu();
                    alert('수정이 완료되었습니다.');
                })
            };

            $scope.deleteMenu = function() {
                if(!confirm('Step1의 메뉴를 삭제하면 Step2까지 삭제됩니다.\n\n 삭제하시겠습니까?')) {
                    return;
                }

                menuS.deleteMenu($scope.detail._id, $scope.step).then(function() {
                    finishService('삭제이 완료되었습니다.');
                })
            };

            $scope.getMenu = function() {
                menuS.getMenu().then(function(data){
                    $scope.menus = data;
                });
            };

            $scope.selected = function(detail, step) {
                $scope.step1 = null;
                $scope.isAdd = null;
                $scope.showForm = true;
                $scope.step = step;
                $scope.detail = {
                    _id: detail._id,
                    name: detail.name,
                    nickName: detail.nickName,
                    url: detail.url,
                    api: detail.api
                };

                if(step == 1) {
                    $scope.step1 = detail;
                    $scope.subMenuList = detail.subMenuList;
                }
            };

            $scope.moved = function(list, index) {
                $scope.step1 = null;
                $scope.step = null;
                $scope.detail = null;
                $scope.showForm = false;
                list.splice(index, 1);
            };

            function finishService(text) {
                $scope.step1 = null;
                $scope.isAdd = null;
                $scope.showForm = false;
                $scope.getMenu();
                alert(text);
            }
        }])
;