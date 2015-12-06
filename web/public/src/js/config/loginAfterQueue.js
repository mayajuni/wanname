/**
 * Created by mayaj on 2015-10-19.
 */
app.factory('loginAfterQ', ['$rootScope', '$q', '$log',
    function($rootScope, $q, $log){
        var retryQueue = [];

        var service = {
            onItemAddedCallbacks: [],
            hasMore: function() {
                return retryQueue.length > 0;
            },
            push: function(retryItem) {
                retryQueue.push(retryItem);
                // Call all the onItemAdded callbacks
                angular.forEach(service.onItemAddedCallbacks, function(cb) {
                    try {
                        cb(retryItem);
                    } catch(e) {
                        $log.error('securityRetryQueue.push(retryItem): callback threw an error' + e);
                    }
                });
            },
            loginAfterRetry: function(retryFn) {
                var asy = $q.defer();
                var retryItem = {
                    retry: function() {
                        $q.when(retryFn()).then(function(value) {
                            asy.resolve(value);
                        }, function(value) {
                            asy.reject(value);
                        });
                    },
                    cancel: function() {
                        asy.reject('');
                    }
                };
                service.push(retryItem);
                return asy.promise;
            },
            cancelAll: function() {
                while(service.hasMore()) {
                    retryQueue.shift().cancel();
                }
            },
            retryAll: function() {
                while(service.hasMore()) {
                    retryQueue.shift().retry();
                }
            }
        };

        return service;
    }]);