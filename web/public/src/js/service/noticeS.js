/**
 * Created by mayaj on 2016-01-22.
 */
app.factory('noticeS', ['$q', 'property', '$http',
    function($q, property, $http){
        var service = {
            getNoticeList: function(param) {
                var asy = $q.defer();
                $http.get(property.api.notice, {params: param}).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            getNoticeBest: function() {
                var asy = $q.defer();
                $http.get(property.api.notice+'best').success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            getNoticeDetail: function(_id) {
                var asy = $q.defer();
                $http.get(property.api.notice+_id).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            }
        };

        return service;
    }]);