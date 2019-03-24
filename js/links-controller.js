(()=>{

    stromsy.app.controller('linksCtrl', function($scope, $http, $sce, $compile) {

        console.log("linksCtrl()");
        stromsy.isLoggedIn();

        $scope.page = {};

    
        fetch("/pages?name=links")
            .then((res) => {
                if (!res.ok) {
                    throw res;
                }
                return res.json();
            })
            .then((data) => {

                $scope.page = data.page;
                $scope.$apply();

            })
            .catch((err) => {
                console.log(err);
            });

    });

})();
