angular.module('wz')
    .controller('quotationCtrl', function($scope, $ionicActionSheet){
        console.log('quotationCtrl')
        $scope.openSheet = function() {
            $ionicActionSheet.show({
                buttons: [
                    { text: '<b>分享</b>' },
                    { text: '分享' }
                ],
                destructiveText: '分享',
                titleText: '分享',
                cancelText: '取消',
                buttonClicked: function(index) {
                    return true;
                },
                destructiveButtonClicked: function(){
                    console.log('delete')
                }
            });

        }
    })