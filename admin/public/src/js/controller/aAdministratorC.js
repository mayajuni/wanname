/**
 * Created by mayaj on 2015-10-14.
 */
app
    .controller('administratorC', ['$scope', 'adminList', 'administratorS',
        function($scope, adminList, administratorS){
            $scope.adminList = adminList;
            $scope.search = {};

            $scope.getAdministratorList = function() {
                administratorS.getAdministratorList($scope.search).then(function(data) {
                    $scope.adminList = data;
                })
            };

            $scope.deleteAdministrator = function(userId) {
                if(!confirm('삭제하시겠습니까?')) {
                    return;
                }

                administratorS.deleteAdministrator(userId).then(function() {
                    $scope.getAdministratorList();
                    alert('삭제 되었습니다.');
                });
            };

            $scope.findPassword = function(userId) {
                if(!confirm('비밀번호가 랜덤으로 설정되어 해당 계정의 이메일로 보내집니다.\n\n비밀번호를 전송하시겠습니까?')) {
                    return;
                }

                administratorS.findPassword(userId).then(function() {
                    alert('전송 되었습니다.');
                });
            };

            $scope.openAddModal = function() {
                administratorS.openAddModal().result.then(function () {
                    $scope.getAdministratorList();
                });
            };

            $scope.openAdministratorMenuModal = function(_id) {
                console.log(_id);
                var scope = $scope.$new();
                scope._id = _id;
                administratorS.openAdministratorMenuModal(scope);
            };
        }])
    .controller('administratorAddC', ['$scope', 'administratorS', '$uibModalInstance',
        function($scope, administratorS, $uibModalInstance){
            $scope.admin = {};

            $scope.checkAdministrator = function() {
                $scope.error = null;
                if($scope.admin._id) {
                    administratorS.checkAdministrator($scope.admin._id).then(function(data) {
                        if(!data) {
                            $scope.error = '중복된 아이디 입니다.'
                        }
                    });
                }
            };

            $scope.addAdministrator = function() {
                administratorS.addAdministrator($scope.admin).then(function() {
                    alert('등록되었습니다.');
                    $uibModalInstance.close();
                });
            };

            $scope.close = function() {
                $uibModalInstance.dismiss('cancel');
            }
        }])
    .controller('administratorMenuC', ['$scope', 'administratorS', '$uibModalInstance',
        function($scope, administratorS, $uibModalInstance){
            $scope.menu = {
                _id: $scope._id
            };

            $scope.close = function() {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.editAdministratorMenu = function() {
                administratorS.editAdministratorMenu($scope.menu).then(function() {
                     alert('수정 되었습니다.');
                });
            };
        }])
;