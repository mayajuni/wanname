/**
 * Created by 동준 on 2015-05-22.
 */
app
    .factory('httpConfig', ['$q', '$rootScope', '$injector', 'loginAfterQ', '$location',
        function($q, $rootScope, $injector, loginAfterQ, $location) {
            var numLoadings = 0;
            var notModalUrl = {

            };

            return {
                'request': function(config) {
                    if(!notModalUrl[config.url] && config.method != "GET" && config.url.indexOf('/api/file') < 0) {
                        numLoadings++;
                        // Show loader
                        $rootScope.$broadcast("loader_show");
                    }
                    return config || $q.when(config)
                },
                'response': function(response) {
                    if(numLoadings > 0) {
                        if ((--numLoadings) === 0) {
                            // Hide loader
                            $rootScope.$broadcast("loader_hide");
                        }
                    }

                    return response || $q.when(response);
                },
                'responseError': function(response) {
                    if(numLoadings > 0) {
                        if (!(--numLoadings)) {
                            // Hide loader
                            $rootScope.$broadcast("loader_hide");
                        }
                    }


                    if(response.status === 401) {
                        $rootScope.user = null;
                        return loginAfterQ.loginAfterRetry(function retryRequest() {
                            // We must use $injector to get the $http service to prevent circular dependency
                            return $injector.get('$http')(response.config);
                        });
                    }else if(response.status != 4019){
                        alert(response.data);
                    }


                    return $q.reject(response);
                }
            }
        }])
    .config(["$httpProvider", function($httpProvider) {
        $httpProvider.interceptors.push("httpConfig");
        $httpProvider.useApplyAsync(true);
    }])
;