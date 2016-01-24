/**
 * Created by mayaj on 2015-12-20.
 */
/**
 * Created by 동준 on 2015-10-11.
 */
app.factory('blogS', ['$q', 'property', '$http',
    function($q, property, $http){
        var service = {
            getBlogList: function(params){
                var asy = $q.defer();
                $http.get(property.api.blog, {params: params}).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            getBestBlog: function(params){
                var asy = $q.defer();
                $http.get(property.api.blog + 'best', {params: params}).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            getBlogDetail: function(_id){
                var asy = $q.defer();
                $http.get(property.api.blog + _id).success(function (data){
                    asy.resolve(data);
                }).error(function(data){asy.reject(data);});
                return asy.promise;
            }
        };

        return service;
    }]);