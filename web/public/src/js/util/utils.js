/**
 * Created by �룞以� on 2015-07-22.
 */
angular.module('utils', [])
    .filter("getFirstImg", function() {
        return function(content) {
            return $(content).find('img:first').attr('src');
        }
    })
    .filter("cutEmailId", function(){
        return function(input){
            if(input){
                var data = input.split("@");
                return data[0].substring(0,3) + "***" + "@" + data[1].substring(0,2);
            }
        }
    })
    .filter("getAttrSrc",["$sce", function($sce) {
        return function(input, type){
            if(input){
                var tag = "<div>"+input+"<div>";
                if(type=="img"){
                    return $sce.trustAsResourceUrl($(tag).find("img:first").attr("src"));
                }else{
                    return $sce.trustAsResourceUrl($(tag).find("iframe:first").attr("src"));
                }
            }
            return input;
        };
    }])
    /* 전화번호에 - 기호 넣기 */
    .filter('phonePattern', function() {
        return function(input){
            if(input){
                return input.substr(0,3) + "-" + input.substr(3,4) + "-" + input.substr(7,4);
            }

            return input;
        };
    })
    /* 자동 포커스 */
    .directive('autofocus', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link : function($scope, $element) {
                $timeout(function() {
                    $element[0].focus();
                });
            }
        }
    }])
    /* 스크롤 항상 밑을 유지시킨다. */
    .directive('schrollBottom', function () {
        return {
            scope: {
                schrollBottom: "="
            },
            link: function ($scope, $element) {
                $scope.$watchCollection('ngScrollBottom', function (newValue) {
                    if (newValue) {
                        $timeout(function(){
                            $element.scrollTop($element[0].scrollHeight);
                        }, 0);
                    }
                });
            }
        }
    })
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
    .filter('validDate', function() {
        return function(input) {
            var param = input.replace(/-/g,'');

            // 자리수가 맞지않을때
            if( isNaN(param) || param.length!=8 ) {
                return false;
            }

            var year = Number(param.substring(0, 4));
            var month = Number(param.substring(4, 6));
            var day = Number(param.substring(6, 8));

            if( month<1 || month>12 ) {
                return false;
            }

            var maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var maxDay = maxDaysInMonth[month-1];

            // 윤년 체크
            if( month==2 && ( year%4==0 && year%100!=0 || year%400==0 ) ) {
                maxDay = 29;
            }

            if( day<=0 || day>maxDay ) {
                return false;
            }

            return true;
        }
    })
    .directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUser);
            }
        };
    })
    .directive('phPattern', function () {
        return {
            scope: {
                ph: '=ngModel'
            },
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUser(text) {
                    if (text) {
                        var transformedInput = text.replace(/[^0-9]/g, '');

                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUser);

                var ele = element[0];
                element[0].addEventListener('blur',function(){
                    var value = ele.value;
                    if(value.length > 7) {
                        ele.value = value.substr(0, 3) + '-' + value.substr(3, 4) + '-' + value.substr(7, 4);
                    }
                });
            }
        };
    })
    .filter('profilePhoto', function() {
        return function(imgInfo){
            if(imgInfo && imgInfo.url){
                return imgInfo.url;
            }
            return '/imgs/common/human-login.png';
        };
    })
;