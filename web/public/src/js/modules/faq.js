/**
 * Created by mayaj on 2016-01-22.
 */
app.directive('faq', function(){
    return {
        restrict: 'AE',
        scope: {
            search: "="
        },
        templateUrl : 'view/center/faq/faq.drtv.html',
        controller : ['$scope', 'faqS', 'qnaS',
            function($scope, faqS, qnaS){
                $scope.faqIds = {};

                $scope.toggleFaq = function(id) {
                    $scope.faqIds[id] = !$scope.faqIds[id];
                    for(var key in $scope.faqIds) {
                        if(key != id) {
                            $scope.faqIds[key] = false;
                        }
                    }
                };

                $scope.openQna = function() {
                    qnaS.openCreateQna();
                };

                faqS.getFaq().then(function(data) {
                    $scope.faqList = data;
                });
            }]
    }
})