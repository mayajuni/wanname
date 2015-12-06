/**
 * Created by mayaj on 2015-10-15.
 */
app
    .directive("administratorMenu", [function(){
        return {
            scope: {
                id: '@',
                step1: '=',
                step2: '='
            },
            templateUrl: 'view/management/administrator/administratorMenu.drtv.tpl.html',
            controller: ['$scope', 'administratorS', '$filter', function($scope, administratorS, $filter){
                administratorS.getAdministratorMenu($scope.id).then(function(data) {
                    $scope.myMenuList = data.myMenuList;
                    $scope.menuList = data.menuList;
                });

                $scope.eventStep1Menu = function(division, detail, index) {
                    var add = 'menuList';
                    var remove = 'myMenuList';
                    if(division == 'add') {
                        add = 'myMenuList';
                        remove = 'menuList';
                    }
                    var hasStep1 = false;

                    for(var i=0;i<$scope[add].length;i ++) {
                        if(detail._id == $scope[add][i]._id) {
                            $scope[add][i].subMenuList = $scope[add][i].subMenuList.concat(detail.subMenuList);
                            $scope[add][i].subMenuList = $filter('orderBy')($scope[add][i].subMenuList, 'rank');
                            hasStep1 = true;
                            break;
                        }
                    }
                    if(!hasStep1) {
                        $scope[add].push(detail);
                        $scope[add] = $filter('orderBy')($scope[add], 'rank');
                    }
                    $scope[remove].splice(index, 1);
                    setting();
                };

                $scope.eventStep2Menu = function(division, step1, detail, index) {
                    var add = 'menuList';
                    var remove = 'myMenuList';
                    if(division == 'add') {
                        add = 'myMenuList';
                        remove = 'menuList';
                    }
                    var hasStep1 = false;
                    for(var i=0; i < $scope[add].length; i++) {
                        if(step1._id == $scope[add][i]._id) {
                            $scope[add][i].subMenuList.push(detail);
                            $scope[add][i].subMenuList = $filter('orderBy')($scope[add][i].subMenuList, 'rank');
                            hasStep1 = true;
                            break;
                        }
                    }

                    for(var i=0; i < $scope[remove].length; i++) {
                        if(step1._id == $scope[remove][i]._id) {
                            $scope[remove][i].subMenuList.splice(index, 1);
                            $scope[remove][i].subMenuList = $filter('orderBy')($scope[remove][i].subMenuList, 'rank');
                            if($scope[remove][i].subMenuList.length < 1) {
                                $scope[remove].splice(i, 1);
                                $scope[remove] = $filter('orderBy')($scope[remove], 'rank');
                            }
                            break;
                        }
                    }

                    if(!hasStep1) {
                        $scope[add].push({
                            _id: step1._id,
                            api: step1.api,
                            name: step1.name,
                            nickName: step1.nickName,
                            rank: step1.rank,
                            url: step1.url,
                            regDt: step1.regDt,
                            subMenuList: [detail]
                        });
                        $scope[add] = $filter('orderBy')($scope[add], 'rank');
                    }

                    setting();
                };

                function setting() {
                    $scope.step1 = {};
                    $scope.step2 = {};
                    if($scope.myMenuList && $scope.myMenuList.length > 0){
                        for(var i=0;i<$scope.myMenuList.length;i++){
                            $scope.step1[$scope.myMenuList[i]._id] = true;
                            if($scope.myMenuList[i].subMenuList && $scope.myMenuList[i].subMenuList.length > 0){
                                for(var j=0;j<$scope.myMenuList[i].subMenuList.length; j++) {
                                    $scope.step2[$scope.myMenuList[i].subMenuList[j]._id] = true;
                                }
                            }
                        }
                    }
                }
            }]
        }
    }]);