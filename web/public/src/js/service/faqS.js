/**
 * Created by mayaj on 2016-01-22.
 */
app.factory('faqS', ['$q', 'property', '$http',
    function($q, property, $http){
        var service = {
            getFaq: function(param) {
                var asy = $q.defer();
                $http.get(property.api.faq, {params: param}).success(function (data){
                    asy.resolve(data);
                });
                return asy.promise;
            }
        };

        return service;
    }]);