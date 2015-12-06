/**
 * Created by mayaj on 2015-10-22.
 */
app
    .directive('fileBox', function(){
        return {
            restrict: 'AE',
            scope : {
                isEditor : '@',
                fileList : '=',
                division : '@'
            },
            templateUrl : 'view/file/file.drtv.tpl.html',
            controller : ['$scope', 'fileS', '$uibModal', '$rootScope',
                function($scope, fileS, $uibModal, $rootScope){
                    $scope.oldFileCount = !!$scope.fileList ? $scope.fileList.length : 0;
                    $scope.selectedFiles = new Array();
                    $scope.fileList = !$scope.fileList ? new Array() : $scope.fileList;
                    $scope.progresses = new Array();
                    for(var index in $scope.fileList) {
                        $scope.progresses[index] = 100;
                    }

                    $scope.upload = function (files, editor, welEditable) {
                        if (files && files.length) {
                            for (var i = 0; i < files.length; i++) {
                                $scope.selectedFiles.push(files[i]);
                                $scope.fileList.push(files[i]);
                                uploadFile($scope.fileList.length -1, editor, welEditable);
                            }
                        }
                    };

                    function uploadFile(count, editor, welEditable) {
                        $scope.fileList[count].progress = 0;
                        fileS.fileUpload($scope.fileList[count], $scope.division)
                            .then(function(data){
                                $scope.fileList[count] = data;
                                if(editor) {
                                     editor.insertImage(welEditable, data.url);
                                }
                            },function(err){
                                $scope.progresses[count] = 0;
                                $scope.fileList[count].error = err;
                            },function(evt){
                                $scope.progresses[count] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                            });
                    }

                    $scope.inputImage = function(url) {
                        $rootScope.$emit('inputImage', url);
                    };

                    $scope.openFileModal = function($index) {
                        var scope = $scope.$new();
                        scope.file = $scope.fileList[$index];
                        scope.error = $scope.fileList[$index].error;
                        $uibModal.open({
                            scope: scope,
                            templateUrl: 'view/file/fileInfo.md.tpl.html',
                            animation: true
                        });
                    };

                    $scope.deleteFile = function(index, _id){
                        if(index >= $scope.oldFileCount) {
                            $scope.selectedFiles.splice(index-$scope.oldFileCount, 1);
                        }else{
                            $scope.oldFileCount = $scope.oldFileCount -1;
                        }

                        $scope.fileList.splice(index, 1);

                        if(_id){
                            fileS.deleteFile(_id).then(function(){});
                        }
                    };

                    $rootScope.$on('uploadFile', function(el, files, editor, welEditable){
                        $scope.upload(files, editor, welEditable);
                    })
                }]
        }
    })
    .directive('onlyReadFileBox', function(){
        return {
            restrict: 'AE',
            scope : {
                fileList : '='
            },
            templateUrl : 'view/file/onlyReadFile.drtv.tpl.html',
            controller : ['$scope', '$uibModal',
                function($scope, $uibModal){
                    $scope.openFileModal = function($index) {
                        var scope = $scope.$new();
                        scope.file = $scope.fileList[$index];
                        $uibModal.open({
                            scope: scope,
                            templateUrl: 'view/file/fileInfo.md.tpl.html',
                            animation: true
                        });
                    };
                }]
        }
    })
    .factory('fileS', ['Upload', '$http','$sce', '$q', 'property',
        function(Upload, $http, $sce, $q, property){
            var service = {
                fileUpload : function(file, division){
                    var asy = $q.defer();
                    Upload.upload({
                        url : property.api.file+division,
                        data: {file: file}
                    }).then(function(response) {
                        asy.resolve(response.data);
                    }, function(response) {
                        asy.reject(response.data);
                    }, function(evt) {
                        asy.notify(evt)
                    });
                    return asy.promise;
                },
                deleteFile : function(_id){
                    var asy = $q.defer();
                    $http.delete(property.api.file+_id).success(function (data){
                        asy.resolve(data);
                    });
                    return asy.promise;
                }
            };

            return service;
        }]);