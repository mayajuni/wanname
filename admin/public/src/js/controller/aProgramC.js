/**
 * Created by mayaj on 2016-01-31.
 */
app
    .controller('programC', ['$scope', 'programS',
        function($scope, programS){
            $scope.search = {};

            $scope.getProgramList = function() {
                programS.getProgramList($scope.search).then(function(data) {
                    $scope.count = data.count;
                    $scope.programList = data.list;
                });
            };

            $scope.openUpdateModal = function(_id) {
                programS.openUpdateModal(_id).result.then($scope.getProgramList, $scope.getProgramList);
            };

            $scope.openCreateModal = function() {
                programS.openCreateModal().result.then($scope.getProgramList, $scope.getProgramList);
            };

            $scope.$watch("search.page", function(){
                $scope.getProgramList();
            });
        }])
    .controller('programCreateC', ['$scope', 'programS', '$uibModalInstance',
        function($scope, programS, $uibModalInstance){
            $scope.program = {
                courses: [],
                category: []
            };
            $scope.course = {};
            $scope.openCourses = null;

            $scope.toggle = function(index) {
                if($scope.openCourses == index) {
                    $scope.openCourses = null;
                }else {
                    $scope.openCourses = index
                }
            };

            $scope.inputCategory = function($event) {
                if($event.keyCode === 13 && !!$scope.category && $scope.category.length > 0) {
                    $scope.addCategory();
                }
            };

            $scope.addCategory = function() {
                if(!!$scope.category && $scope.program.category.length < 3) {
                    $scope.program.category.push($scope.category.replace(/ /g, ''));
                    $scope.category = '';
                }
            };

            $scope.removeCategory = function(index) {
                $scope.program.category.splice(index, 1);
            };

            $scope.deleteCourse = function(index) {
                $scope.program.courses.splice(index, 1);
                $scope.openCourses = null;
            };

            $scope.pushCourse = function() {
                $scope.program.courses.push($scope.course);
                $scope.isCollapsed = !$scope.isCollapsed;
                $scope.course = {};
            };

            $scope.save = function() {
                programS.save($scope.program).then(function() {
                    $scope.close();
                })
            };

            $scope.close = function() {
                $uibModalInstance.close();
            };
        }])
    .controller('programEditC', ['$scope', 'programS', '$uibModalInstance', 'program',
        function($scope, programS, $uibModalInstance, program){
            $scope.program = program;
            $scope.course = {};
            $scope.openCourses = null;

            $scope.toggle = function(index) {
                if($scope.openCourses == index) {
                    $scope.openCourses = null;
                }else {
                    $scope.openCourses = index
                }
            };

            $scope.inputCategory = function($event) {
                if($event.keyCode === 13 && !!$scope.category && $scope.category.length > 0) {
                    $scope.addCategory();
                }
            };

            $scope.addCategory = function() {
                if(!!$scope.category && $scope.program.category.length < 3) {
                    $scope.program.category.push($scope.category.replace(/ /g, ''));
                    $scope.category = '';
                }
            };

            $scope.removeCategory = function(index) {
                $scope.program.category.splice(index, 1);
            };

            $scope.deleteCourse = function(index) {
                $scope.program.courses.splice(index, 1);
                $scope.openCourses = null;
            };

            $scope.pushCourse = function() {
                $scope.program.courses.push($scope.course);
                $scope.isCollapsed = !$scope.isCollapsed;
                $scope.course = {};
            };

            $scope.update = function() {
                programS.update($scope.program).then(function() {
                    $scope.close();
                })
            };

            $scope.delete = function() {
                programS.detail($scope.program._id).then(function() {
                    $scope.close();
                })
            };

            $scope.close = function() {
                $uibModalInstance.close();
            };
        }]);