/**
 * Created by mayaj on 2015-10-20.
 */
app
    .controller('boardC', ['$scope', 'boardS', '$stateParams',
        function($scope, boardS, $stateParams) {
            $scope.search = {};

            $scope.getBoardList = function() {
                boardS.getBoardList($stateParams.category, $scope.search).then(function(data) {
                    $scope.count = data.count;
                    $scope.boardList = data.list;
                });
            };

            $scope.openCreateModal = function() {
                var scope = $scope.$new();
                scope.category = $stateParams.category;
                boardS.openCreateModal(scope).result.then(function() {
                    $scope.getBoardList();
                });
            };

            $scope.openEditModal = function(_id) {
                boardS.openEditModal($stateParams.category, _id).result.then(function() {
                    $scope.getBoardList();
                });
            };

            $scope.$watch("search.page", function(){
                $scope.getBoardList();
            });
        }])

    .controller('boardEditC', ['$scope', 'boardS', 'detail', '$uibModalInstance',
        function($scope, boardS, detail, $uibModalInstance){
            $scope.board = detail;
            $scope.isEdit = false;

            $scope.notFileUpload = function() {
                alert('파일을 업로드 할 수 없습니다.');
            };

            $scope.close = function() {
                $uibModalInstance.close();
            };

            $scope.removeBoard = function () {
                if(!confirm("삭제 하시겠습니까?")){
                    return;
                }
                boardS.removeBoard($scope.board.category, $scope.board._id).then(function() {
                    alert('삭제되었습니다.');
                    $uibModalInstance.close();
                })
            };

            $scope.editBoard = function() {
                if(!confirm("수정 하시겠습니까?")){
                    return;
                }
                $scope.board.isAnswer = true;
                boardS.editBoard($scope.board).then(function() {
                    alert('수정되었습니다.');
                    $uibModalInstance.close();
                })
            };
        }])

    .controller('boardCreateC', ['$scope', 'boardS', '$rootScope', '$uibModalInstance',
        function($scope, boardS, $rootScope, $uibModalInstance){
            $scope.board = {
                category: $scope.category
            };
            var editor = $.summernote.eventHandler.getModule();

            $scope.uploadFile = function(file) {
                $rootScope.$emit('uploadFile', file, editor, $scope.editable);
            };

            $scope.addBoard = function() {
                boardS.addBoard($scope.board).then(function() {
                    alert('등록되었습니다.');
                    $uibModalInstance.close();
                });
            };

            $scope.close = function() {
                $uibModalInstance.close();
            };

            $rootScope.$on('inputImage', function(el, url){
                editor.insertImage($scope.editable, url);
            });
        }]);