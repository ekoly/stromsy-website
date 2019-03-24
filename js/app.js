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
    });

    stromsy.app.component("blogArticle", {
        templateUrl: "partials/article-template.html",
        bindings: {
            post: "="
        }
    });

    
})();
