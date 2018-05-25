angular.module('wz')
    .directive('cNo', [function(){
        return{
            restrict: 'E',
            scope:{
                output: '=',
                label: '@',
                preset: '@'
            },
            template: '<button class="button button-block button-small button-outline show-datepicker"><span style="position: absolute;left: 10px;">编号</span> <span style="float: right;">{{no}}</span> </button>',
            link: function(scope){
                scope.no = scope.output = scope.label + new Date().getTime().toString();
                if(scope.preset) scope.no = scope.preset;
            }
        }
    }])
    .directive('cModel',function($http, $ionicPopover){
        return{
            restrict: 'E',
            scope:{
                output: '=',
                preset: '=',
                presetType: '@',
                outputField: '@',
                displayField: '@',
                label: '@',
                apiSrc: '@',
                listField: '@'
            },
            template: '<button class="button button-block button-small button-outline show-datepicker" ng-click="openPopover($event)"><span style="position: absolute;left: 10px;">{{label}}</span><span ng-if="display" style="float: right;">{{display[displayField]}}</span><span style="float: right;" ng-if="!display">选择</span></button>',
            link:function(scope){
                var pop;
                function initData(){
                    var callback = function(list){
                        for(var i = 0, len = list.length; i < len; i++){
                            if(scope.presetType == "id"){
                                if(scope.preset == list[i].id){
                                    scope.display = list[i];
                                    scope.output = list[i][scope.outputField];
                                }
                            }else if(scope.presetType == "no"){
                                if(scope.preset == list[i].no){
                                    scope.display = list[i];
                                    scope.output = list[i][scope.outputField];
                                }
                            }
                        };
                    };
                    if(scope.apiSrc){
                        $http.get(host + scope.apiSrc).success(function(data){
                            scope.list = data;
                            callback(scope.list);
                        })
                    }
                }

                function initScope(){
                    scope.outputField = scope.outputField || 'id';
                    scope.displayField = scope.displayField || 'name';
                    scope.presetType = scope.presetType || "id";
                }

                function initEvent(){
                    scope.openPopover = function($event) {
                        $ionicPopover.fromTemplateUrl("/erp/directiveTpl/tpl_data_model.html", {
                            scope: scope
                        }).then(function(popover){
                            pop = popover;
                            pop.show($event);
                        });
                    };
                    scope.doSelect = function(item){
                        scope.display = item;
                        scope.output = item[scope.outputField];
                        pop.remove();
                    }
                };
                (function(){
                    initData();
                    initScope();
                    initEvent();
                })()
            }
        }
    })
    .directive('cCalendar',function($filter){
        return{
            restrict: 'E',
            scope:{
                output: '=',
                preset: '=',
                format: '@',
                label: '@'
            },
            template: '<onezone-datepicker datepicker-object="datepick"><button class="button button-block button-small button-outline show-datepicker"><span style="position: absolute;left: 10px;">{{label}}</span> <span style="float: right;">{{datepick.date | date:format}}</span> </button> </onezone-datepicker>',
            link:function(scope){
                var now = scope.preset ? new Date(scope.preset) : new Date();
                function createDatePick(date, callback){
                    return {
                        date: date,
                        mondayFirst: false,
                        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                        daysOfTheWeek: ["日", "一", "二", "三", "四", "五", "六"],
                        startDate: new Date(1989, 1, 26),
                        endDate: new Date(2024, 1, 26),
                        disablePastDays: false,
                        disableSwipe: false,
                        disableWeekend: false,
                        showDatepicker: false,
                        showTodayButton: true,
                        calendarMode: false,
                        hideCancelButton: false,
                        hideSetButton: true,
                        callback: callback
                    }
                }
                function initData(){
                    scope.datepick = createDatePick(new Date(scope.output),function(date){
                        scope.output = $filter('date')(date, 'yyyy-MM-dd');
                    })
                }

                function initScope(){
                    scope.format = scope.format || 'yyyy年MM月dd日';
                    scope.output = $filter('date')(now, 'yyyy-MM-dd');
                };
                if(scope.preset){
                    scope.$watch('preset', function(){
                        scope.output = $filter('date')(new Date(scope.preset), 'yyyy-MM-dd');
                        scope.datepick = createDatePick(new Date(scope.preset),function(date){
                            scope.output = $filter('date')(date, 'yyyy-MM-dd');
                            console.log(scope.output)
                        })
                    })
                }

                (function(){
                    initScope();
                    initData();
                })()
            }
        }
    })
    .directive('cUser', function($http, $ionicModal){
        return{
            restrict: 'E',
            scope:{
                outputField: '@',
                presetType: '@',
                output: '=',
                displayField: '@',
                preset : '=',
                default: '@'
            },
            template:'<button class="button button-block button-small button-outline show-datepicker" ng-click="openUserModal()"><span style="position: absolute;left: 10px;">人员</span><span style="float: right;" ng-if="display">{{display[displayField]}}</span><span style="float: right;" ng-if="!display">选择{{label}}</span></button>',
            link: function(scope){
                var modal,
                    limit = 8,
                    offset = 0,
                    prevItem = {},
                    currentItem = {};
                $ionicModal.fromTemplateUrl('/erp/directiveTpl/tpl_users.html', {
                    scope: scope
                }).then(function(modalObj) {
                    modal = modalObj;
                });

                function initScope(){
                    scope.outputField = scope.outputField || 'id';
                    scope.displayField = scope.displayField || 'name';
                    scope.presetType = scope.presetType || 'id';
                    scope.default = scope.default || 'true';
                }

                function initEvent(){
                    scope.openUserModal = function() {
                        modal.show();
                    };
                    scope.closeUserModal = function(){
                        modal.hide();
                    };

                    scope.loadMore = function(){
                        offset = offset + limit;
                        $http.get(host + '/oa/user/getPage?offset=' + offset + '&limit=' + limit).success(function(data) {
                            angular.forEach(data, function (item) {
                                scope.list.push(item);
                            });
                            scope.$broadcast('scroll.infiniteScrollComplete');
                        })
                    };

                    scope.getFlagInfinite = function () {
                        return scope.list&&scope.list.length<scope.size;
                    };

                    scope.doSelect = function(itme){
                        currentItem = itme;
                        prevItem.flagSelect = false;
                        currentItem.flagSelect = true;
                        prevItem = itme;
                    };

                    scope.doConfirm = function(){
                        scope.display = currentItem;
                        scope.output = currentItem[scope.outputField];
                        scope.closeUserModal();
                    };
                }

                function initData(){
                    var callback = function(list){
                        for(var i = 0, len = list.length; i < len; i++){
                            if(scope.preset == list[i].id){
                                scope.display = list[i];
                                scope.output = list[i][scope.outputField];
                            }
                        };
                    };
                    $http.get(host + '/oa/user/initList?offset=' + offset + '&limit=' + limit).success(function(data) {
                        scope.list = data.list;
                        scope.size = data.count;
                        if(scope.preset){
                            callback(scope.list);
                        }else if(scope.default == 'true'){
                            $http.get(host + '/oa/user/current').success(function (data) {
                                scope.output = data[scope.outputField];
                                scope.display = data;
                            })
                        }
                    })
                };

                (function(){
                    initScope();
                    initData();
                    initEvent();
                })();
            }
        }
    })
    .directive('cGroup', function($http, $ionicModal){
        return{
            restrict: 'E',
            scope:{
                outputField: '@',
                presetType: '@',
                output: '=',
                displayField: '@',
                preset : '=',
                default: '@'
            },
            template: '<button class="button button-block button-small button-outline show-datepicker" ng-click="openGroupModal()"><span style="position: absolute;left: 10px;">部门</span><span style="float: right;" ng-if="display">{{display[displayField]}}</span><span style="float: right;" ng-if="!display">选择{{label}}</span></button>',
            link:function(scope){
                var modal,
                    prevItem = {},
                    currentItem = {};
                $ionicModal.fromTemplateUrl('/erp/directiveTpl/tpl_groups.html', {
                    scope: scope
                }).then(function(modalObj) {
                    modal = modalObj;
                });

                function initEvent(){
                    scope.openGroupModal = function(){
                        modal.show();
                    };
                    scope.closeGroupModal = function(){
                        modal.hide();
                    };
                    scope.doSelect = function(item){
                        currentItem = item;
                        prevItem.flagSelect = false;
                        currentItem.flagSelect = true;
                        prevItem = item;
                    };
                    scope.doConfirm = function(){
                        scope.display = currentItem;
                        scope.output = currentItem[scope.outputField];
                        scope.closeGroupModal();
                    };
                }

                function initData(){
                    var callback = function(list){
                        for(var i = 0, len = list.length; i < len; i++){
                            if(scope.preset == list[i].id){
                                scope.display = list[i];
                                scope.output = list[i][scope.outputField];
                            }
                        };
                    };
                    $http.get(host + '/oa/common/groups').success(function(data) {
                        var tempMap = {};
                        var tempList = [];
                        angular.forEach(data, function (item) {
                            var parentId = item.parent_id;
                            if (parentId) {
                                tempMap[parentId] ? tempMap[parentId].push(item) : tempMap[parentId] = [item];
                            } else {
                                tempList.push(item)
                            }
                        })
                        scope.map = tempMap;
                        scope.list = tempList;
                        if(scope.preset){
                            callback(data);
                        }else if(scope.default == 'true'){
                            $http.get(host + '/oa/user/current').success(function (data) {
                                scope.output = data['groupId'];
                                scope.display = {name: data['groupName']};
                            })
                        }
                    })
                };

                function initScope(){
                    scope.outputField = scope.outputField || 'id';
                    scope.displayField = scope.displayField || 'name';
                    scope.presetType = scope.presetType || 'id';
                    scope.default = scope.default || 'true';
                };

                (function(){
                    initScope();
                    initData();
                    initEvent();
                })()
            }
        }
    })
    .directive('cDictionary', function($http, $ionicPopover){
        return{
            restrict: 'E',
            scope: {
                preset: '=',
                inputSrc: '@',
                inputField: '@',
                output: '=',
                outputField: '@',
                label: '@'
            },
            template: '<button class="button button-block button-small button-outline show-datepicker" ng-click="openDicPopover($event)"><span style="position: absolute;left: 10px;">{{label}}</span><span style="float: right;" ng-if="display">{{display[displayField]}}</span><span style="float: right;" ng-if="!display">选择</span></button>',
            link: function(scope){
                var poper;
                $ionicPopover.fromTemplateUrl("/erp/directiveTpl/tpl_dictionary.html", {
                    scope: scope
                }).then(function(popover){
                    poper = popover;
                });
                function initScope(){
                    scope.outputField = scope.outputField || 'id';
                    scope.displayField = 't_value';
                    scope.inputField = scope.inputField || 't_key';
                }
                function initData(){
                    $http.get(host+ '/oa/common/dictionary/' + scope.inputField + '/' + scope.inputSrc).success(function(data){
                        scope.list = data;
                        if (scope.preset) {
                            for (var i = 0; i < scope.list.length; i++) {
                                var item = scope.list[i];
                                if (scope.preset == item[scope.outputField]) {
                                    scope.output = item[scope.outputField];
                                    scope.display = item;
                                    break;
                                }
                            }
                        }
                    })
                }
                function initEvent(){
                    scope.openDicPopover = function(e){
                        poper.show(e);
                    };
                    scope.doSelect = function(item){
                        scope.display = item;
                        scope.output = item[scope.outputField];
                        poper.hide();
                    }
                };
                (function(){
                    initScope();
                    initData();
                    initEvent();
                })()
            }
        }
    })
    .directive('cGood', function(){
        return{
            restrict: 'E',
            template: '',
            scope: {
                output: '='
            },
            link: function(){

            }
        }
    })