(()=>{

	stromsy.app = angular.module('StromsyApp', ["ngRoute"]);

    stromsy.app.config(($routeProvider)=>{
        $routeProvider
            .when('/', {templateUrl: 'partials/home-template.html', controller: 'homeCtrl'})
            .when('/about', {templateUrl: 'partials/about-template.html'})
            .when('/links', {templateUrl: 'partials/links-template.html'})
            .when('/projects', {templateUrl: 'partials/projects-template.html'})
            .when('/login', {templateUrl: 'partials/login-template.html'})
            .otherwise({redirectTo: '/'});
    });

    
})();
