/**
 * Created by 동준 on 2015-10-02.
 */
app.controller('mainC', ['$scope',
    function($scope){
        function checkWidth() {
            if(window.matchMedia("(max-width: 768px)").matches) {
                $scope.isShowBtn = false;
            }else{
                $scope.isShowBtn = true;
            }
        }
        $(window).resize(function () {
            checkWidth();
        });
        checkWidth();
    }]);