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
    })
    .run(function($rootScope, $location) {

        const USER_PAGES = [
                "profile"
            ],
            NONUSER_PAGES = [
                "login"
            ];

        const determinePriviledges = function(path) {

            const is_logged_in = stromsy.isTruthey($rootScope.user.username);
            const is_user_page = (USER_PAGES.indexOf(path) !== -1);
            const is_nonuser_page = (NONUSER_PAGES.indexOf(path) !== -1);

            if (!is_logged_in && is_user_page) {
                window.location.href = "#!login";
            } else if (is_logged_in && is_nonuser_page) {
                window.location.href = "#!profile";
            }

        };

        $rootScope.$on("$routeChangeStart", function(event, next, current) {

            fetch('/user/session')
                .then(stromsy.verifyResponse)
                .then((res) => {

                    if (stromsy.isFalsey(res.user) && stromsy.isTruthey($rootScope.user.username)) {

                        console.log("isLoggedIn(): invalid session");
                        $rootScope.user.username = undefined;

                        determinePriviledges(next.activetab);

                    } else if (stromsy.isTruthey(res.user) && stromsy.isFalsey($rootScope.user.username)) {

                        console.log("isLoggedIn(): setting cookies");
                        $rootScope.user.username = res.user.user_nicename;

                        determinePriviledges(next.activetab);

                    }

                })
                .catch((err) => {
                    console.log(err);
                });

            determinePriviledges(next.activetab);

        });

    });

    stromsy.app.controller("mainCtrl", function($scope, $route, $rootScope) {

        let username_el = document.getElementById("user-username");

        $rootScope.user = {
            username: username_el.innerText
        }

        username_el.parentElement.removeChild(username_el);

    });

    stromsy.app.component("blogArticle", {
        templateUrl: "partials/article-template.html",
        bindings: {
            post: "="
        }
    });


})();
