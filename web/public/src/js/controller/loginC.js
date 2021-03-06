/**
 * Created by 동준 on 2015-09-18.
 */
app
    .controller('loginC', ['$scope', 'loginS', '$state', '$rootScope', 'joinS', '$uibModalInstance', '$localStorage',
        function($scope, loginS, $state, $rootScope, joinS, $uibModalInstance, $localStorage){
            loginS.logout();
            $scope.find = {};
            $localStorage.remove('token');
            $rootScope.user = null;
            $scope.login = {
                _id:  $localStorage.get('email'),
                isSaveEmail: !!$localStorage.get('email')
            };
            $scope.error = {};

            $scope.openJoin = function() {
                $scope.close();
                joinS.openJoinModal();
            };

            $scope.doLogin = function() {
                $scope.login.error = null;
                loginS.doLogin($scope.login).then(function(data) {
                    if($scope.login.isAutoLogin) {
                        $localStorage.set('token', data.token);
                    }
                    if($scope.login.isSaveEmail) {
                        $localStorage.set('email', $scope.login._id);
                    }else{
                        $localStorage.remove('email');
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

            $scope.findPassword = function() {
                if($scope.find.email && $scope.find.name) {
                    if(confirm('비밀번호 찾기를 하시겠습니까?')) {
                        loginS.findPassword($scope.find).then(function() {
                            alert('이메일 주소로 임시 비밀번호가 전송되었습니다.');
                        })
                    }
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