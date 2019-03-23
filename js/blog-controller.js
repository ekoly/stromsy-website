(()=>{


    stromsy.app.controller('blogCtrl', function($scope, $http, $sce, $compile) {

        
        let post_counter = 0;
        $scope.posts = [];

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

                    for (post in data.posts) {
                        $scope.posts.push(post);
                    }
                    post_counter += 10;

                })
                .catch((err) => {
                    console.log(err);
                });

        };


        $scope.clearAndPopulatePosts = function() {
            
            $scope.posts = [];
            $scope.populatePosts();
            
        };

        $scope.clearAndPopulatePosts();

    });

})();
