/**
 * Created by mayaj on 2016-01-24.
 */
app.directive('share', function() {
    return {
        restrict: 'AE',
        scope: {
            title: '=',
            content: '=',
            img: '='
        },
        template: '<ul class="share-box">' +
                        '<li class="facebook" ng-click="shareFacebook()">' +
                        '</li>' +
                        '<li class="kakao" ng-click="shareKakao()">' +
                        '</li>' +
                        '<li class="naver" ng-click="shareNaver()">' +
                        '</li>' +
                    '</ul>',
        controller: ['$scope', '$location', function ($scope, $location) {
            var url = $location.absUrl();
            $scope.shareFacebook = function() {
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url));
            };

            $scope.shareKakao = function() {
                window.open('https://story.kakao.com/share?url=' + encodeURIComponent(url));
            };

            $scope.shareNaver = function() {
                window.open('http://blog.naver.com/openapi/share?url=' + encodeURIComponent(url));
            };

            var img = $scope.img;
            if(img.indexOf('http://') < 0 && img.indexOf('https://') < 0) {
                img = 'http://www.wanname.kr' + img;
            }

            $('meta[property="og:title"]').attr('content', $scope.title);
            $('meta[property="og:description"]').attr('content', $scope.content.replace(/(<([^>]+)>)/ig,""));
            $('meta[property="og:image"]').attr('content', img);

            $('meta[name=title]').attr('content', $scope.title);
            $('meta[name=description]').attr('content', $scope.content.replace(/(<([^>]+)>)/ig,""));
        }]
    }
});