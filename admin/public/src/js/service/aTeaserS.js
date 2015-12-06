/**
 * Created by mayaj on 2015-11-10.
 */
app.factory('teaserS', ['$q', 'property', '$http',
    function($q, property, $http){
        var service = {
            getTeaserList: function() {
                var asy = $q.defer();
                $http.get(property.api.teaser).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            },
            editCount: function(count) {
                var asy = $q.defer();
                $http.put(property.api.teaser+count).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            }
        };

        return service;
    }]);