/**
 * Created by mayaj on 2015-09-25.
 */
app.factory('memberS', ['$q', 'property', '$http', '$uibModal',
    function($q, property, $http, $uibModal){
        var service = {
            getMemberList : function(search){
                var asy = $q.defer();
                $http.get(property.api.member, {params: search}).success(function(data){
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
                    var datas = {
                        realDates: data
                    };

                    if(data) {
                        datas.chartDatas = new Array()
                        for(var i=0;i<data.length;i++) {
                            datas.chartDatas.push({label: data[i]._id, data: data[i].count});
                        }
                    }

                    asy.resolve(datas);
                });
                return asy.promise;
            },
            changeIdentification: function(_id, identification, reasone) {
                var asy = $q.defer();
                $http.post(property.api.member+"changeIdentification", {_id: _id, identification: identification, failIdentificationReason: reasone}).success(function(){
                    asy.resolve();
                });
                return asy.promise;
            },
            openDetailModal: function(scope) {
                return $uibModal.open({scope: scope, templateUrl: 'view/member/memberDetail.md.tpl.html', show: true, controller: 'memberDetailC', size: 'lg'});
            }
        };

        return service;
    }]);