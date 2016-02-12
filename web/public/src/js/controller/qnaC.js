/**
 * Created by mayaj on 2016-01-23.
 */
app
    .controller('qnaDetailC', ['$rootScope', '$scope', '$state', 'qnaS', '$stateParams',
        function($rootScope, $scope, $state, qnaS, $stateParams) {
            $scope.removeQna = function() {
                if(confirm('삭제 하시겠습니까?')) {
                    qnaS.removeQna($scope.qna._id).then(function() {
                        alert('삭제 되었습니다.');
                        $state.go('hantop.myPage.qna');
                    })
                }
            };

            qnaS.getQnaDetail($stateParams._id).then(function(data) {
                $scope.qna = data;
            })
        }])
    .controller('qnaCreateC', ['$rootScope', '$scope', 'qnaS', '$uibModalInstance',
        function($rootScope, $scope, qnaS, $uibModalInstance) {
            $scope.qna = {
                title: $scope.item.title + ' - ' + $scope.course.name + ' 코스',
                itemId: $scope.item._id,
                courseId: $scope.course._id
            };

            $scope.addQna = function() {
                qnaS.addQna($scope.qna).then(function() {
                    alert('등록되었습니다.\n빠른 시일안에 답변드리겠습니다.');
                    $scope.close();
                });
            };

            $scope.close = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }])
;