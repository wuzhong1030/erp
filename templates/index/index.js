angular.module('wz')
    .controller('indexCtrl', function($scope, $ionicPopup, Util){
        console.log('indexCtrl')
        $scope.status = "";

        $scope.showPopup = function() {
            $scope.data = {};

            $ionicPopup.show({
                template: "<input type='password' ng-model='data.wifi'>",
                title: "提示",
                subTitle: "子标题",
                scope: $scope,
                buttons: [
                    { text: "呵呵" },
                    {
                        text: "<b>呵呵</b>",
                        type: "button-positive",
                        onTap: function(e) {
                            return $scope.data.wifi;
                        }
                    }
                ]
            })
                .then(function(res) {
                    $scope.status = ["Wi-Fi",":",res].join(" ");
                });
        };

        $scope.showConfirm = function() {
            $ionicPopup.confirm({
                title: "呵呵",
                template: "呵呵",
                okText:"OK"
            })
                .then(function(res) {
                    if(res) {
                        $scope.status = "呵呵";
                    } else {
                        $scope.status = "呵呵";
                    }
                });
        };

        $scope.showAlert = function() {
            Util.alert('success', '操作成功');
            /*$ionicPopup.alert({
                title: "呵呵",
                template: "呵呵"
            }).then(function(res) {
                    $scope.status = "呵呵";
            });*/
        };



    })