/**
 * Created by mayaj on 2015-09-30.
 */
app.controller('memberC', ['$scope', 'memberS', '$location',
    function($scope, memberS, $location){
        $scope.search = $location.search();
        $scope.memberList = new Array();

        $scope.openDetail = function(detail) {
            var scope = $scope.$new();
            scope.detail = detail;
            memberS.openDetailModal(scope).result.then($scope.getMemberList, $scope.getMemberList)
        };

        /* 멤버 리스트 */
        $scope.getMemberList = function() {
            memberS.getMemberList($scope.search).then(function(data){
                $scope.memberList = data;
            });
        };

        if(Object.keys($location.search()).length > 0) {
            $scope.getMemberList()
        }
    }])
    .controller('memberDetailC', ['$scope', 'memberS',
        function($scope, memberS){
            $scope.identification = {
                code: $scope.detail.identification,
                reason: null
            };

            $scope.changeIdentification = function(){
                if(confirm("인증 변경 처리를 하면 인증관련 파일들이 삭제됩니다.\n\n진행하시겠습니까?")){
                    return;
                }

                if($scope.identification.code != '인증보류') {
                    $scope.identification.reason = null;
                }
                memberS.changeIdentification($scope.detail._id, $scope.identification.code, $scope.identification.reason).then(function(){
                    $scope.detail.identification = $scope.identification.code;
                    $scope.identification.code = null;
                })
            }

        }]);