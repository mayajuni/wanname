/**
 * Created by mayaj on 2016-01-24.
 */
app.directive('program', function() {
    return {
        restrict: 'AE',
        scope: {
            isMain: '@'
        },
        templateUrl: 'view/program/programList.drtv.html',
        controller: ['$scope', '$rootScope', '$location', 'programS', 'loginS', function ($scope, $rootScope, $location, programS, loginS) {
            $scope.openAllTag = false;
            $scope.search = {};

            if(!$scope.isMain) {
                programS.getCategory().then(function(data) {
                    $scope.category = data;
                });
            }

            function getProgramList() {
                programS.getProgramList().then(function(data) {
                    $scope.programList = data.list;
                    $scope.count = data.count;
                });
            }

            $scope.apply = function(_id) {
                if(!$rootScope.user) {
                    return loginS.openLoginModal();
                }

                programS.apply(_id).then(function() {
                    alert('완료');
                    getProgramList();
                });
            };

            $scope.like = function(_id) {
                if(!$rootScope.user) {
                    return loginS.openLoginModal();
                }

                programS.like(_id).then(function() {
                    alert('완료');
                    getProgramList();
                });
            };

            $scope.$watch("search.page", function(){
                getProgramList();
            });
        }]
    }
});