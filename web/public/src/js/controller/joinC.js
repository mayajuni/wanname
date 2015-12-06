/**
 * Created by 동준 on 2015-10-11.
 */
app
    .controller('joinC', ['$scope', '$rootScope', 'joinS', '$modalInstance',
        function($scope, $rootScope, joinS, $modalInstance){
            $scope.join = {};
            $scope.error = {};

            $scope.submit = function() {
                joinS.join($scope.join).then(function() {
                    $scope.close();
                });
            };

            $scope.close = function() {
                $modalInstance.dismiss('cancel');
            };

            $scope.checkEmail = function() {
                delete $scope.error.email;

                if($scope.join._id) {
                    joinS.checkEmail($scope.join._id).then(function(hadEmail) {
                        if(hadEmail) {
                            $scope.error.email = '이미 가입된 이메일입니다.';
                        }else {
                            delete $scope.error.email;
                        }
                    })
                }else {
                    $scope.error.email = '이메일 형식이 잘못되었거나 입력이 안되었습니다.';
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

            $scope.checkRePassword = function() {
                delete $scope.error.rePassword;
                if($scope.join.password != $scope.join.rePassword) {
                    $scope.error.rePassword = '입력하신 비밀번호가 같지 않습니다.'
                }
            };
        }]);