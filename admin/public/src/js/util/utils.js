/**
 * Created by �룞以� on 2015-07-22.
 */
angular.module('utils', [])
    /* 로딩중 */
    .directive("loader", function () {
        return function ($scope, element, attrs) {
            $scope.$on("loader_show", function () {
                return element.show();
            });
            return $scope.$on("loader_hide", function () {
                return element.hide();
            });
        };
    })
    /* html을 제외한 나머지 문자열을 자르고 ... */
    .filter('cutHtmlTagAndLimit', ['limitToFilter', function(limitToFilter) {
        return function(input, limit){
            if(input){
                var changeInput = input.replace(/(<([^>]+)>)/ig,"");

                if(changeInput.length > limit){
                    return limitToFilter(changeInput, limit-3) + '...'
                }
                return changeInput;
            }

            return input;
        };
    }])
    /* html을 넣을수 있게 변경처리 */
    .filter('changeTrustAdHtml',['$sce', function($sce) {
        return function(input){
            if(input){
                return $sce.trustAsHtml(input);
            }
            return input;
        };
    }])
    /* 해당 길이 만큼 짜르고 ... */
    .filter('limitAndJjum', ['limitToFilter', function(limitToFilter){
        return function(input, limit){
            if(input){
                if(input.length > limit){
                    return limitToFilter(input, limit-3) + '...'
                }
                return input;
            }

            return input;
        }
    }])
    /* 널이면 다른거 입력 */
    .filter('nullToStr', function(){
        return function(input, str){
            if(input){
                return input;
            }else{
                return str;
            }
        }
    })
    /* 첫번째 글짜 대문자 */
    .filter('firstCharUpper', function() {
        return function(input){
            if(input){
                return input.substring(0,1).toUpperCase()+input.substring(1,input.length);
            }
            return input;
        };
    })
;