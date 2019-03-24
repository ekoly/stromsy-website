(()=>{

    stromsy.app.controller('blogCtrl', function($scope, $http, $sce, $compile, $timeout, $routeParams) {

        console.log($routeParams);

        let post_counter = 0;

        $scope.posts = [];
        $scope.isMoreButtonShown = false;

        $scope.populatePosts = function() {

            console.log("populatePosts()");

            fetch("http://localhost:5000/posts?first="+post_counter)
                .then((res) => {
                    if (!res.ok) {
                        throw res;
                    }
                    return res.json();
                })
                .then((data) => {

                    for (ix in data.posts) {
                        $scope.posts.push(data.posts[ix]);
                    }
                    post_counter += 10;

                    $scope.$apply();

                })
                .catch((err) => {
                    console.log(err);
                });

        };

        $scope.getSinglePost = function() {

            console.log("getSinglePost()");

            fetch("http://localhost:5000/posts/" + $routeParams.post_id)
                .then((res) => {
                    if (!res.ok) {
                        throw res;
                    }
                    return res.json();
                })
                .then((data) => {

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
                $scope.isMoreButtonShown = true;
            } else {
                $scope.getSinglePost();
                $scope.isMoreButtonShown = false;
            }

        }

        $timeout($scope.init(), 0);

    });

})();
