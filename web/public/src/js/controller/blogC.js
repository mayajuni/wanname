/**
 * Created by mayaj on 2015-12-20.
 */
app
    .controller('blogC', ['$scope', 'blogS', 'blog', 'bestBlog',
        function($scope, blogS, blog, bestBlog){
            $scope.bestList = bestBlog;
            $scope.count = blog.count;
            $scope.blogList = blog.list;
        }])
    .controller('blogDetailC', ['$scope', 'blogS', 'blog',
        function($scope, blogS, blog){
            console.log(blog);
            $scope.blog = blog.detail;
            $scope.subList = blog.subList;


            $scope.img = $($scope.blog.content).find('img:first').attr('src');
        }])
;