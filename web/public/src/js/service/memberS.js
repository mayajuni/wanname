/**
 * Created by 동준 on 2015-09-25.
 */
app.factory('memberS', ['$q', 'property', '$http',
    function($q, property, $http){
        var service = {
            getMemberList : function(checkRealName){
                var asy = $q.defer();
                $http.get(property.api.member, {params: {checkRealName: checkRealName}}).success(function(data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            /**
             * 라우터가 변경될때마다 이벤트
             * 병경 될때마다 active한 메뉴를 찾는다.
             *
             * @param $scope: Object
             */
            getStats: function() {
                var asy = $q.defer();
                $http.get(property.api.member+"getStats").success(function(data){
                    asy.resolve(data);
                });
                return asy.promise;
            }
        };

        return service;
    }]);