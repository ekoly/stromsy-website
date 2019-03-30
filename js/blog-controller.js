(()=>{

    stromsy.app.controller('blogCtrl', function($scope, $http, $sce, $compile, $timeout, $routeParams, $rootScope) {

        let post_counter = 0;

        $scope.posts = [];
        $scope.isMoreButtonShown = false;

        $scope.populatePosts = function() {

            $scope.isMoreButtonShown = false;

            fetch("/posts?first="+post_counter)
                .then(stromsy.verifyResponse)
                .then((data) => {

                    for (ix in data.posts) {
                        let post = data.posts[ix];
                        post.is_editable = ($scope.user.username===post.post_author.user_nicename);
                        $scope.posts.push(post);
                    }
                    post_counter += 10;
                    $scope.isMoreButtonShown = true;

                    $scope.$apply();

                })
                .catch((err) => {
                    console.log(err);
                });

        };

        $scope.getSinglePost = function() {

            console.log("getSinglePost()");

            fetch("/posts/" + $routeParams.post_id)
                .then(stromsy.verifyResponse)
                .then((data) => {

                    data.post.is_editable = ($scope.user.user_id===data.post.post_author_id);
                    $scope.posts = [data.post];
                    $scope.$apply();

                })
                .catch((err) => {
                    console.log(err);
                });

        };

        $scope.clearAndPopulatePosts = function() {

            $scope.posts = [];
            $scope.populatePosts();

        };

        $scope.init = function() {

            if (isNaN($routeParams.post_id)) {
                $scope.populatePosts();
                $scope.isMoreButtonShown = false;
            } else {
                $scope.getSinglePost();
                $scope.isMoreButtonShown = false;
            }

        }

        $timeout($scope.init(), 0);

    });

})();
