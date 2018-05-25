angular.module('wz')
    .controller('stockCtrl', function ($rootScope, $timeout, $interval, $scope) {
        var vm = $scope.vm = {
            moredata: false,
            messages: [],
            pagination: {
                perPage: 5,
                currentPage: 1
            },
            init: function () {
                /* services.getMessages({perPage: vm.pagination.perPage, page: vm.pagination.currentPage}, function (data) {
                 vm.messages = data;
                 })*/
                vm.messages = [{
                    title: '111'
                },{
                    title: '22'
                },{
                    title: '33'
                },{
                    title: '44'
                },{
                    title: '55'
                },{
                    title: '66'
                },{
                    title: '77'
                },{
                    title: '88'
                },{
                    title: '99'
                }];
            },
            show: function (message) {
                if (message.static) {
                    message.static = false;
                } else {
                    message.static = true;
                }
            },
            doRefresh: function () {
                console.log('doRefresh')
                $timeout(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                }, 1000);
            },
            loadMore: function () {
                console.log('loadMore')
                vm.pagination.currentPage += 1;
                vm.messages =  [{
                    title: '111'
                },{
                    title: '22'
                },{
                    title: '33'
                },{
                    title: '44'
                },{
                    title: '55'
                },{
                    title: '66'
                },{
                    title: '77'
                },{
                    title: '88'
                },{
                    title: '99'
                },{
                    title: '10000'
                },{
                    title: '111111'
                },{
                    title: '222222'
                }];
                vm.moredata = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                /*services.getMessages({perPage: vm.pagination.perPage, page: vm.pagination.currentPage}, function (data) {
                 vm.messages = vm.messages.concat(data);
                 if (data.length == 0) {
                 vm.moredata = true;
                 }
                 ;
                 $scope.$broadcast('scroll.infiniteScrollComplete');
                 })*/
            }
        }
        //vm.init();
    })
