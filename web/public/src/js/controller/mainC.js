/**
 * Created by 동준 on 2015-10-02.
 */
app.controller('mainC', ['$scope',
    function($scope){
        console.log($('.item').length);
        $('.carousel').children('.item').removeClass('active');
    }]);