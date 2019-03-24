(()=>{

    stromsy.app.controller('loginCtrl', function($scope, $http, $sce, $compile) {

        console.log("loginCtrl()");

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
                    console.log(data);
                })
                .catch((err) => {
                    console.log(err);
                });

            }

    });

})();
