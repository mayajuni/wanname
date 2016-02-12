/**
 * Created by mayaj on 2015-10-19.
 */
app
    .controller('programC', ['$scope',
        function($scope){

        }])
    .controller('programDetailC', ['$scope', 'detail', 'programS',
        function($scope, detail, programS){
            $scope.detail = detail;

            $scope.openCourseModal = function(obj) {
                var scope = $scope.$new();
                scope.item = detail;
                scope.course = obj;
                programS.openCourseModal(scope);
            };
        }])
    .controller('programCourseC', ['$scope', 'programS', '$uibModalInstance', 'qnaS',
        function($scope, programS, $uibModalInstance, qnaS){
            $scope.close = function() {
                $uibModalInstance.close();
            };

            $scope.openQna = function() {
                var scope = $scope.$new();
                scope.item = $scope.item;
                scope.course = $scope.course;
                qnaS.openCreateQna(scope);
            }
        }]);