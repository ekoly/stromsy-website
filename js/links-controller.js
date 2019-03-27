(()=>{

    stromsy.app.controller('linksCtrl', function($scope, $http, $sce, $compile) {

        console.log("linksCtrl()");

        $scope.post = {};
    
        fetch("/pages?name=links")
            .then(stromsy.verifyResponse)
            .then((data) => {

                $scope.post = data.page;
                $scope.$apply();

            })
            .catch((err) => {
                console.log(err);
            });

    });

})();
