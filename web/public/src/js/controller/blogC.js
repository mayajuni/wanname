/**
 * Created by mayaj on 2015-12-20.
 */
app.controller('blogC', ['$scope', 'blogS', 'blog', 'bestBlog',
    function($scope, blogS, blog, bestBlog){
        $scope.bestList = bestBlog;
        $scope.count = blog.count;
        $scope.blogList = blog.list;
    }]);