(()=>{

    stromsy.app.controller('loginCtrl', function($scope, $http, $sce, $compile, $rootScope) {

        console.log("loginCtrl()");

        if (stromsy.isFalsey($scope.user)) {
            $scope.user = {}
        }
        $scope.user.user_id = "";
        $scope.user.user_password = "";
        
        $scope.login = function() {

            fetch("/user/login", {
                    method: "POST",
                    headers: {
                        "Accept": "Application/json",
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify({
                        user: $scope.user
                    })
                })
                .then(stromsy.verifyResponse)
                .then((data) => {
                    $scope.user.username = data.user.user_nicename;
                    window.location.href = "#!profile";
                })
                .catch((err) => {
                    console.log(err);
                });

            }

    });

})();
