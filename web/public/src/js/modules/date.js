/**
 * Created by mayaj on 2015-12-08.
 */
app
    .directive('inputDateEach', function(){
        return {
            restrict: 'AE',
            scope: {
                dateData: '=',
                isDisabled: "@"
            },
            template: '<div class="form-inline">' +
            '<div class="form-group">' +
            '<select class="form-control" ng-model="year" ng-options="year for year in years" ng-change="result()" ng-disabled="{{isDisabled}}">' +
            '<option value="" disabled>Year</option>' +
            '</select>' +
            '</div>' +
            '<div class="form-group">' +
            '<select class="form-control" ng-model="month" ng-options="month for month in months" ng-change="result()" ng-disabled="{{isDisabled}}">' +
            '<option value="" disabled>Month</option>' +
            '</select>' +
            '</div>' +
            '<div class="form-group">' +
            '<select class="form-control" ng-model="day" ng-options="day for day in days" ng-change="result()" ng-disabled="{{isDisabled}}">' +
            '<option value="" disabled>Day</option>' +
            '</select>' +
            '</div>' +
            '</div>',
            link: function(scope) {
                var date = new Date();
                scope.years = new Array();
                scope.months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
                scope.days = new Array();
                var indexYear = date.getFullYear() - 10;
                for(var i=0; i < 80; i++) {
                    scope.years.push(indexYear--);
                }
                for(var i=0; i < 31; i++) {
                    scope.days.push((i+1) < 10 ? '0' + (i+1) : i+1);
                }

                if(scope.dateData) {
                    var dateData = new Date(scope.dateData);
                    scope.year = dateData.getFullYear();
                    scope.month = (dateData.getMonth()*1 + 1).toString.length < 2 ? '0'+(dateData.getMonth()*1+1) : (dateData.getMonth()*1+1);
                    scope.day = dateData.getDay().toString.length < 2 ? '0'+dateData.getDay() : dateData.getDay();
                    scope.dateData = nullToStr(scope.year) + "-" + nullToStr(scope.month) + "-" + nullToStr(scope.day);
                }

                scope.result = function() {
                    scope.dateData = nullToStr(scope.year) + "-" + nullToStr(scope.month) + "-" + nullToStr(scope.day);
                };

                function nullToStr(data, str){
                    if(data){
                        return data
                    }else{
                        return str ? str : '';
                    }
                }
            }
        }
    });