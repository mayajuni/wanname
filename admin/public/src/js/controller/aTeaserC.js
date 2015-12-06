/**
 * Created by mayaj on 2015-11-10.
 */
/**
 * Created by mayaj on 2015-09-18.
 */
app
    .controller('teaserC', ['$scope', 'teaserS', 'teaserInfo',
        function($scope, teaserS, teaserInfo){
            console.log(teaserInfo)
            $scope.teaser = teaserInfo;
            $scope.count = 0;
            $scope.predicate = 'regDt';
            $scope.reverse = true;

            $scope.changeOrderBy = function(predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };

            $scope.editCount = function() {
                teaserS.editCount($scope.count).then(function() {
                    $scope.teaser.count = $scope.teaser.count + $scope.count*1;
                    $scope.count = 0;
                    alert('완료!');
                })
            }
        }]);