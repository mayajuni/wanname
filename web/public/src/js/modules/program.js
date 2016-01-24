/**
 * Created by mayaj on 2016-01-24.
 */
app.directive('program', function() {
    return {
        restrict: 'AE',
        scope: {
            isMain: '@'
        },
        templateUrl: 'view/program/programList.drtv.html',
        controller: ['$scope', '$location', function ($scope, $location) {

        }]
    }
});