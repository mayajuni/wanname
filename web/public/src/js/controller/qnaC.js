/**
 * Created by mayaj on 2016-01-23.
 */
app
    .controller('qnaListC', ['$rootScope', '$scope', '$state', 'qnaS',
        function($rootScope, $scope, $state, qnaS) {
            $scope.search = {};

            $scope.openDetail = function(_id) {
                qnaS.openDetailQna(_id)
            };

            function getQnaList() {
                qnaS.getQnaList($scope.search).then(function(data) {
                    $scope.qnaList = data.list;
                    $scope.qnaCount = data.count;
                })
            }

            $scope.$watch("search.page", function(){
                getQnaList();
            });
        }])
    .controller('qnaDetailC', ['$rootScope', '$scope', '$uibModalInstance', 'qna',
        function($rootScope, $scope, $uibModalInstance, qna) {
            $scope.qna = qna;

            $scope.close = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }])
    .controller('qnaCreateC', ['$rootScope', '$scope', 'qnaS', '$uibModalInstance',
        function($rootScope, $scope, qnaS, $uibModalInstance) {
            $scope.qna = {};

            if($scope.item) {
                $scope.qna.title = $scope.item.title + ' - ' + $scope.course.name + ' 코스';
                $scope.qna.itemId =  $scope.item._id;
            }
            if($scope.course) {
                $scope.qna.courseId = $scope.course._id;
            }

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