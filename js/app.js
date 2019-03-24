(()=>{

	stromsy.app = angular.module('StromsyApp', ["ngRoute", "ngSanitize"]);

    stromsy.app.config(($routeProvider)=>{
        $routeProvider
            .when('/',
                    {
                        templateUrl: 'partials/about-template.html',
                        controller: 'blogCtrl',
                        activetab: 'about'
                    })
            .when('/blog',
                    {
                        templateUrl: 'partials/blog-template.html',
                        controller: 'blogCtrl',
                        activetab: 'blog'
                    })
            .when('/blog/page/:page_id',
                    {
                        templateUrl: 'partials/blog-template.html',
                        controller: 'blogCtrl',
                        activetab: 'blog'
                    })
            .when('/blog/posts/:post_id',
                    {
                        templateUrl: 'partials/blog-template.html',
                        controller: 'blogCtrl',
                        activetab: 'blog'
                    })
            .when('/pages/about',
                    {
                        templateUrl: 'partials/about-template.html',
                        activetab: 'about'
                    })
            .when('/pages/links',
                    {
                        templateUrl: 'partials/links-template.html',
                        controller: 'linksCtrl',
                        activetab: 'links'
                    })
            .when('/pages/projects',
                    {
                        templateUrl: 'partials/projects-template.html',
                        activetab: 'projects'

                    })
            .when('/profile',
                    {
                        templateUrl: 'partials/profile-template.html',
                        controller: 'profileCtrl',
                        activetab: 'profile'

                    })
            .when('/login',
                    {
                        templateUrl: 'partials/login-template.html',
                        controller: 'loginCtrl',
                        activetab: 'login'

                    })
            .otherwise({redirectTo: '/'});
    });

    stromsy.app.controller("mainCtrl", function($scope, $route) {

        $scope.route = $route;

        $scope.user = {
            username: stromsy.getCookie("username") || undefined,
            is_logged_in: stromsy.isTruthey(stromsy.getCookie("username"))
        }

        stromsy.logIn = function(user) {

            console.log("logged in:", user);

            stromsy.setCookie("username", user.user_nicename, 7);
            stromsy.setCookie("user_email", user.user_email, 7);

            $scope.user.is_logged_in = true;
            $scope.user.username = user.user_nicename;

            document.location = "#!profile";

        };

        stromsy.scope = $scope;

        stromsy.isLoggedIn = function() {

            fetch('/user/getsession')
                .then((res) => {
                    if (!res.ok) {
                        throw res;
                    }
                    return res.json();
                })
                .then((res) => {

                    if (stromsy.isFalsey(res.user) && stromsy.isTruthey($scope.user.username)) {

                        console.log("isLoggedIn(): invalid session");

                        $scope.$apply(()=>{
                            $scope.user.username = undefined;
                            $scope.user.is_logged_in = false;
                        });
                        
                        stromsy.setCookie("username", undefined, 0);

                        document.location.href = "#!login";

                    } else if (stromsy.isFalsey(res.user)) {

                        console.log("isLoggedIn(): setting cookies");

                        $scope.$apply(()=>{
                            $scope.user.username = res.user.user_nicename;
                            $scope.user.is_logged_in = true;
                        });

                        stromsy.setCookie("username", res.user.user_nicename, 7);

                    }

                })
                .catch((err) => {
                    console.log(err);
                });

            $scope.user.username = stromsy.getCookie("username") || undefined;
            $scope.user.is_logged_in = stromsy.isTruthey(stromsy.getCookie("username"));

            return $scope.is_logged_in;

        };

    });

    stromsy.app.component("blogArticle", {
        templateUrl: "partials/article-template.html",
        bindings: {
            post: "="
        }
    });

    
})();
