(()=>{

    stromsy.app.controller('editCtrl', function($scope, $http, $sce, $compile, $timeout, $routeParams) {

        const publishPostWrapper = function(endpoint) {

            return () => {

                fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Accept": "Application/json",
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify({
                        post: $scope.post
                    })
                })
                .then(stromsy.verifyResponse)
                .then((data) => {
                    window.location.href = "#!blog";
                })
                .catch((err) => {
                    console.log(err);
                });

            };

        };

        $scope.is_editing = true;
        $scope.editPost = function() {
            $scope.is_editing = true;
        }
        $scope.previewPost = function() {
            $scope.is_editing = false;
        };

        $scope.init = function() {

            let path = window.location.href.split("!");
            if (path.length !== 2) {
                throw "Invalid url for this controller (!)";
            }
            path = path[1].split("/");
            if (path.length < 3 || path[1] !== "blog") {
                throw "Invalid url for this controller (blog)";
            }
            path = path[2];

            if (path === "update") {

                if (isNaN($routeParams.post_id)) {
                    throw "Invalid url for this controller (postId)";
                } else {
                    $scope.publishPost = publishPostWrapper("/posts/update");
                    updateMode($scope, $routeParams.post_id);
                }

            } else if (path === "new") {

                $scope.is_prev = false;
                $scope.is_next = false;
                $scope.post = {
                    post_title: "",
                    post_content: "",
                    post_date: ""
                };
                $scope.submit_text = "Create";
                $scope.header_text = "Create Post";
                $scope.publishPost = publishPostWrapper("/posts/new");

            } else {
                throw "Invalid url for this controller (unknown)";
            }

        };

        $timeout($scope.init(), 0);

    });

    const updateMode = (scope, post_id) => {

        let revisions = [];

        const __prevRevision = function() {
            console.log("__prevRevision()");
            console.log("revisions: ", revisions);
            let ix = revisions.indexOf(scope.post);
            console.log("ix: ", ix, "revisions.length: ", revisions.length);
            if (ix === 0) {
                scope.is_prev = false;
            } else {
                scope.post = revisions[ix-1];
                scope.is_next = true;
                scope.$apply();
            }
        };

        const __nextRevision = function() {
            let ix = revisions.indexOf(scope.post);
            if (ix === revisions.length-1) {
                scope.is_next = false;
            } else {
                scope.post = revisions[ix+1];
                scope.is_prev = true;
                scope.$apply();
            }
        };

        const __switchRevision = function(callback) {

            return () => {
                if (stromsy.isFalsey(revisions)) {
                    getRevisions(callback);
                } else {
                    callback();
                }
            };

        };

        const getSinglePost = function() {

            console.log("getSinglePost()");

            fetch("/posts/" + post_id)
                .then(stromsy.verifyResponse)
                .then((data) => {

                    scope.post = data.post;
                    scope.$apply();

                })
                .catch((err) => {
                    console.log(err);
                });

        };

        let is_fetching = false;
        const getRevisions = function(fn) {

            if (is_fetching) {
                return;
            }
            is_fetching = true;

            fetch("/posts/" + scope.post.post_id + "/revisions")
                .then(stromsy.verifyResponse)
                .then((data) => {
                    revisions = data.revisions;
                    revisions.push(scope.post);
                    fn();
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        scope.post = {};
        scope.is_prev = true;
        scope.is_next = false;
        scope.header_text = "Update Post";
        scope.submit_text = "Update";

        scope.prevRevision = __switchRevision(__prevRevision);
        scope.nextRevision = __switchRevision(__nextRevision);

        getSinglePost();

    };

})();
