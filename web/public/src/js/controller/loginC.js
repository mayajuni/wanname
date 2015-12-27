/**
 * Created by 동준 on 2015-09-18.
 */
app
    .controller('loginC', ['$scope', 'loginS', '$state', '$rootScope', 'joinS', '$uibModalInstance', '$localStorage',
        function($scope, loginS, $state, $rootScope, joinS, $uibModalInstance, $localStorage){
            loginS.logout();
            $rootScope.user = null;
            $scope.login = {};
            $scope.error = {};

            $scope.doLogin = function() {
                $scope.login.error = null;
                loginS.doLogin($scope.login).then(function(data) {
                    if($scope.login.isAuto) {
                        $localStorage.set('token', data.token);
                    }
                    $scope.close();
                }, function(err){
                    $scope.login.error = err;
                });
            };

            $scope.close = function() {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.moveJoin = function() {
                $uibModalInstance.dismiss('cancel');
                joinS.openJoinModal();
            };

            $scope.checkEmail = function() {
                delete $scope.error.email;

                if(!$scope.login._id) {
                    $scope.error.email = '아이디(이메일) 형식이 잘못되었거나 입력이 안되었습니다.';
                }
            };

            $scope.checkPassword = function() {
                delete $scope.error.password;

                if(! /^.*(?=.{8,9999})(?=.*[0-9])(?=.*[a-zA-Z]).*$/.test($scope.join.password)) {
                    $scope.error.password = '비밀번호는 영문, 숫자를 혼합하여 최소 8자 이상이어야 합니다.';
                }
                else if(/(\w)\1\1\1/.test($scope.join.password)) {
                    $scope.error.password = '비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.';
                }
            };
        }]);