(()=>{

    stromsy.app.controller('profileCtrl', function($scope, $http, $sce, $compile) {

        console.log("profileCtrl()");

        $scope.user.old_password = "";
        $scope.user.new_password = "";
        
        $scope.logout = function() {

            fetch("/user/logout", {
                    method: "POST"
                })
                .then(stromsy.verifyResponse)
                .then((data) => {

                    stromsy.setCookie("username", null, -1);
                    $scope.user = {};

                    window.location.href = "#!login";

                    console.log("logout success");

                })
                .catch((err) => {
                    console.log(err);
                });
            
            stromsy.setCookie("user", undefined);

        }
        
        $scope.updatePassword = function() {

            fetch("/user/password", {
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
                .then(()=>{
                    console.log("password update success");
                })
                .catch((err) => {
                    console.log(err);
                });
            
            stromsy.setCookie("user", undefined);

        }

            

    });

})();
