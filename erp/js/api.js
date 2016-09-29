angular.module('wz')
    .factory('ProcureService',function($http){
        return{
            getStores: function(){
                return $http.get(host + '/erp/repository/listAll');
            },
            getStoreById: function(id){
                return $http.get(host + '/erp/repository/info/' + id);
            }
        }
})