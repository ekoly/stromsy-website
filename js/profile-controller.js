(()=>{

    stromsy.app.controller('profileCtrl', function($scope, $http, $sce, $compile, $rootScope) {

        console.log("profileCtrl()");

        $scope.pwuser = {
            user_id: $scope.user.user_id,
            old_password: "",
            new_password: "",
            confirm_new_password: ""
        };
        
        $scope.logout = function() {

            fetch("/user/logout", {
                    method: "POST"
                })
                .then(stromsy.verifyResponse)
                .then((data) => {
                    $rootScope.user = {};
                    window.location.href = "#!login";
                    console.log("logout success");
                })
                .catch((err) => {
                    console.log(err);
                });
            
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
                .then((res)=>{
                })
                .catch((err) => {
                    console.log(err);
                });

        }

        $scope.checkNewPassword = function() {
            if ($scope.user.new_password.length < 8) {
                $scope.pwuser.has_error = true;
                $scope.pwuser.error_message = "password too short!";
            } else {
                $scope.pwuser.has_error = false;
                $scope.pwuser.error_message = "";
            }
        };

        $scope.confirmNewPassword = function() {
            if ($scope.user.confirm_new_password === $scope.user.new_password) {
                $scope.pwuser.has_error = true;
                $scope.pwuser.error_message = "passwords do not match!";
            } else {
                $scope.pwuser.has_error = false;
                $scope.pwuser.error_message = "";
            }
        };

    });

    stromsy.app.directive("checkPassword", function() {
        return {
            require: "ngModel",
            link: function(scope, element, attr, mCtrl) {
                mCtrl.$parsers.push((value)=>{
                    if (value.length < 8) {
                        mCtrl.$setValidity("Too short! Must be at least 8 characters", false);
                    } else {
                        mCtrl.$setValidity("", true);
                    }
                });
            }
        };
    });

})();

