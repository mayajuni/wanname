/**
 * Created by mayaj on 2016-01-20.
 */
app
    .controller('blogC', ['$scope', 'blogS', 'blogList',
        function($scope, blogS, blogList) {
            $scope.search = {};
            $scope.blogList = blogList.list;
            $scope.count = blogList.count;

            $scope.getBlogList = function() {
                blogS.getBlogList($scope.search).then(function(data) {
                    $scope.count = data.count;
                    $scope.blogList = data.list;
                });
            };

            $scope.openCreateModal = function() {
                blogS.openCreateModal().result.then(function() {
                    $scope.getBlogList();
                }, function() {
                    $scope.getBlogList();
                });
            };

            $scope.openEditModal = function(_id) {
                blogS.openEditModal(_id).result.then(function() {
                    $scope.getBlogList();
                }, function() {
                    $scope.getBlogList();
                });
            };

           /* $scope.$watch("search.page", function(){
                $scope.getBlogList();
            });*/
        }])
    .controller('blogCreateC', ['$rootScope', '$scope', 'blogS', '$uibModalInstance',
        function($rootScope, $scope, blogS, $uibModalInstance) {
            $scope.blog = {};

            $scope.close = function() {
                $uibModalInstance.close();
            };
            var editor = $.summernote.eventHandler.getModule();

            $scope.uploadFile = function(file) {
                $rootScope.$emit('uploadFile', file, editor, $scope.editable);
            };

            $scope.addBlog = function() {
                if(confirm('등록하시겠습니까?')) {
                    blogS.addBlog($scope.blog).then(function() {
                        alert('등록되었습니다.');
                        $uibModalInstance.close();
                    });
                }
            };

            $rootScope.$on('inputImage', function(el, url){
                editor.insertImage($scope.editable, url);
            });
        }])
    .controller('blogEditC', ['$scope', 'blogS', 'detail', '$uibModalInstance',
        function($scope, blogS, detail, $uibModalInstance){
            $scope.blog = detail.detail;
            console.log(detail);

            $scope.notFileUpload = function() {
                alert('파일을 업로드 할 수 없습니다.');
            };

            $scope.close = function() {
                $uibModalInstance.close();
            };

            $scope.removeBlog = function () {
                if(!confirm("삭제 하시겠습니까?")){
                    return;
                }
                blogS.removeBlog($scope.blog._id).then(function() {
                    alert('삭제되었습니다.');
                    $uibModalInstance.close();
                })
            };

            $scope.editBlog = function() {
                if(!confirm("수정 하시겠습니까?")){
                    return;
                }
                blogS.editBlog($scope.blog).then(function() {
                    alert('수정되었습니다.');
                    $uibModalInstance.close();
                })
            };
        }])
;