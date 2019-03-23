(()=>{

	stromsy.app = angular.module('StromsyApp', ["ngRoute"]);

    stromsy.app.config(($routeProvider)=>{
        $routeProvider
            .when('/',
                    {
                        templateUrl: 'partials/blog-template.html',
                        controller: 'blogCtrl',
                        activetab: 'home'
                    })
            .when('/about',
                    {
                        templateUrl: 'partials/about-template.html',
                        activetab: 'about'

                    })
            .when('/links',
                    {
                        templateUrl: 'partials/links-template.html',
                        activetab: 'links'

                    })
            .when('/projects',
                    {
                        templateUrl: 'partials/projects-template.html',
                        activetab: 'projects'

                    })
            .when('/login',
                    {
                        templateUrl: 'partials/login-template.html',
                        activetab: 'login'

                    })
            .otherwise({redirectTo: '/'});
    });

    stromsy.app.controller("mainCtrl", function($scope, $route) {
        $scope.route = $route;
    });

    
})();
