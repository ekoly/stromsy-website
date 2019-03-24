(()=>{

    stromsy.app.controller('profileCtrl', function($scope, $http, $sce, $compile) {

        console.log("loginCtrl()");

        if (!stromsy.isLoggedIn()) {
            document.location = "#!login";
        }

        $scope.user = {
            user_id: "",
            user_password: ""
        };
        
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
                .then((res) => {
                    if (!res.ok) {
                        throw res;
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log("login success");
                    stromsy.logIn(data.user);
                })
                .catch((err) => {
                    console.log(err);
                });

            }

    });

})();
