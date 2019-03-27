(()=>{

    stromsy.app.controller('linksCtrl', function($scope, $http, $sce, $compile) {

        console.log("linksCtrl()");

        $scope.page = {
            post_content: stromsy.random.choice(stromsy.quotes),
            post_date: "",
            post_type: "error"
        };
    
        fetch("/pages?name=links")
            .then(stromsy.verifyResponse)
            .then((data) => {

                $scope.page = data.page;
                $scope.$apply();

            })
            .catch((err) => {
                console.log(err);
                $scope.$apply();
            });

    });

})();
