/**
 * Created by mayaj on 2015-12-20.
 */
/**
 * Created by 동준 on 2015-10-11.
 */
app.factory('blogS', ['$q', 'property', '$http',
    function($q, property, $http){
        var service = {
            list: function(params){
                var asy = $q.defer();
                $http.get(property.api.blog, {}).success(function (){
                    loginS.doLogin(params);
                    asy.resolve();
                }).error(function(data){asy.reject(data);});
                return asy.promise;
            },
            detail: function(email){
                var asy = $q.defer();
                $http.get(property.api.join + "checkEmail/", {params: {_id: email}}).success(function (data){
                    asy.resolve(data);
                }).error(function(data){asy.reject(data);});
                return asy.promise;
            }
        };

        return service;
    }]);