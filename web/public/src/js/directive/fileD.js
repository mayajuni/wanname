/**
 * Created by 동준 on 2015-08-13.
 */
app.directive('fileBox', function(){
        return {
            restrict: 'AE',
            scope: {
                fileList: '='
            },
            templateUrl: 'file/file.tpl.html',
            controller: ['$scope', function($scope){
                $scope.oldFileCount = !!$scope.fileList ? $scope.fileList.length : 0;
                $scope.files = [];
                $scope.fileList = $scope.fileList || [];

                $scope.addFile = function(files) {
                    if (files.length > 0) {
                        for(var i=0; i<files.length; i++){
                            $scope.files.push(files[i]);
                            $scope.fileList.push(files[i]);
                            uploadFile($scope.fileList.length -1);
                        }
                    }
                };

                function uploadFile(index) {
                    $scope.filesC.save($scope.fileList[index]).then(function(fileObj) {
                        var fileInfo = {
                            _id: fileObj[0]._id._id,
                            name: fileObj[0]._id.original.name,
                            size: (fileObj[0]._id.original.size* 0.000977).toFixed(2),
                            type: fileObj[0]._id.original.type,
                            url: '/cfs/files/Files/'+fileObj[0]._id._id+'/'+ fileObj[0]._id.original.name
                        };
                        $scope.fileList[index] = fileInfo;
                    }, function(error){
                        /*$scope.fileList[index].error = error.message;*/
                        $scope.fileList[index].error = "Max File size";
                    });
                }

                $scope.remove = function(_id, index) {
                    if(index >= $scope.oldFileCount) {
                        $scope.files.splice(index-$scope.oldFileCount, 1);
                    }else{
                        $scope.oldFileCount = $scope.oldFileCount -1;
                    }

                    $scope.fileList.splice(index, 1);

                    if(_id){
                        $scope.filesC.remove(_id).then(function() {},
                            function(error) {
                                console.log(error);
                            });
                    }
                };
            }]
        }
    });