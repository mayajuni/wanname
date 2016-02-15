/**
 * Created by mayaj on 2016-02-12.
 */
app.controller('myPageC', ['$scope',
    function($scope){
        $scope.toggle = 'profile';
        $scope.doToggle = function(id) {
            $scope.toggle = id;
        };
    }]);