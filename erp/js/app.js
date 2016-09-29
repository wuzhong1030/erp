angular.module('wz', ['ionic', 'jett.ionic.filter.bar', 'onezone-datepicker'])
    .run(function ($ionicPlatform, $http, $rootScope) {
        $rootScope.platform = ionic.Platform.platform();
        $http.defaults.headers.common.token = 'wz';
        $rootScope.$on('$ionicView.beforeEnter', function() {
            $(".loading").show();
        });
        $rootScope.$on('$ionicView.afterEnter', function() {
            $(".loading").hide();
        }, false);
    })
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(0); //禁用缓存
        $urlRouterProvider.otherwise('/tab/index');
        $stateProvider
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/common/tabs.html"
            })
            .state('tab.index', {
                url: '/index',
                views: {
                    'indexView': {
                        templateUrl: "templates/index/index.tpl.html",
                        controller: 'indexCtrl'
                    }
                }
            })
            .state('tab.procure', {
                url: '/procure',
                views: {
                    'procureView': {
                        templateUrl: "templates/procure/procure.tpl.html"
                    }
                }
            })
            .state('tab.sale', {
                url: '/sale',
                views: {
                    'saleView': {
                        templateUrl: "templates/sale/sale.tpl.html"
                    }
                }
            })
            .state('tab.stock', {
                url: '/stock',
                views: {
                    'stockView': {
                        templateUrl: "templates/stock/stock.tpl.html",
                        controller: 'stockCtrl'
                    }
                }
            })
            .state('tab.buying_request', {
                url: '/procure/buying_request',
                views: {
                    'procureView': {
                        templateUrl: "templates/procure/buying_request.tpl.html",
                        controller: 'buyingRequestCtrl'
                    }
                }
            })
            .state('tab.sale_quotation', {
                url: '/sale/quotation',
                views: {
                    'saleView': {
                        templateUrl: "templates/sale/quotation.tpl.html",
                        controller: 'quotationCtrl'
                    }
                }
            })
    });
