/**
 * Created by mayaj on 2016-02-15.
 */
app.controller('applyC', ['$scope', 'programS',
    function($scope, programS){
        programS.getApplyList().then(function(data) {
            console.log(data);
            $scope.applyList = data;
        });
    }]);