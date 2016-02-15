/**
 * Created by mayaj on 2016-02-15.
 */
app
    .controller('profileC', ['$rootScope', '$scope', 'profileS',
        function($rootScope, $scope, profileS) {
            $scope.openEditProfile = function() {
                profileS.openEditProfile();
            }
        }])
    .controller('profileEditC', ['$rootScope', '$scope', 'profileS', '$uibModalInstance', 'loginS',
        function($rootScope, $scope, profileS, $uibModalInstance, loginS) {
            $scope.user = $rootScope.user;
            $scope.passwordErr = '';
            $scope.password = {};
            $scope.closePasswordBox = true;

            $scope.close = function() {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.togglePasswordBox = function() {
                $scope.closePasswordBox = !$scope.closePasswordBox;
                $scope.password = {};
            };

            $scope.checkPassword = function() {
                delete $scope.passwordErr;

                if(! /^.*(?=.{8,9999})(?=.*[0-9])(?=.*[a-zA-Z]).*$/.test($scope.password.newPassword)) {
                    $scope.passwordErr = '비밀번호는 영문, 숫자를 혼합하여 최소 8자 이상이어야 합니다.';
                }
                else if(/(\w)\1\1\1/.test($scope.password.newPassword)) {
                    $scope.passwordErr = '비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.';
                }
            };

            $scope.doChangePassword = function() {
                if(!confirm('비밀번호를 변경하시겠습니까?')) {
                    return;
                }

                profileS.changePassword($scope.password).then(function() {
                    alert('변경되었습니다.');
                    $scope.togglePasswordBox();
                })
            };

            $scope.submit = function() {
                if(!confirm('수정하시겠습니까??')) {
                    return;
                }

                profileS.profileEdit($scope.user).then(function() {
                    loginS.getLoginInfo().then(function() {
                        alert('수정되었습니다.');
                        $scope.close();
                    })
                });
            }
        }])
;