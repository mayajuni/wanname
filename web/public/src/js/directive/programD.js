/**
 * Created by mayaj on 2015-10-19.
 */
app.directive('programList', function(){
    return {
        restrict: 'AE',
        scope: {
            category: '@'
        },
        templateUrl: 'program/programList.dtv.tpl.html',
        controller: ['$scope', function($scope){
            $scope.programList = [];

            $scope.test1 = function() {
                console.log(1)
            };
            $scope.test2 = function() {
                console.log(2)
            };

            for (var i=0; i<9; i++) {
                var newWidth = 803 + 1;
                $scope.programList.push({
                    title: "커피위로 정희수 바리스타",
                    content: "일인 커피 전문점 창업 로스팅부터 에스프레소까지 커피에 대한 모든 것",
                    image: '//placekitten.com/' + newWidth + "/500"
                })
            }
        }]
    }
});