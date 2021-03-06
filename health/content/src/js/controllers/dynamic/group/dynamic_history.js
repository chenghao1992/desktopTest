/**
 * Created by ChenLeepyng on 2016/7/25.
 */
'use strict';
(function() {
    angular.module('app').controller('dynamicHistoryCtrl', funDynamicHistoryCtrl);

    funDynamicHistoryCtrl.$inject = ['$scope', '$http', '$state', 'toaster','$modal'];

    function funDynamicHistoryCtrl($scope, $http, $state, toaster,$modal) {
        var curGroupId = localStorage.getItem('curGroupId');
        $scope.pageSize = 10;
        //获取集团就医知识列表
        $scope.getDynamicListByGroupIdForWeb = function() {

            $http.post(app.url.dynamic.getDynamicListByGroupIdForWeb, {
                access_token: app.url.access_token,
                groupId: curGroupId,
                pageIndex: $scope.pageIndex - 1 || 0,
                pageSize: $scope.pageSize || 10,
            }).
            success(function(data) {
                if (data.resultCode == 1) {
                    $scope.historyList = data.data.pageData;
                    $scope.pageTotal = data.data.total;
                } else {
                    toaster.pop('error', null, data.resultMsg);

                }
            }).
            error(function(data) {
                toaster.pop('error', null, "服务器通讯出错");
            });
        };
        $scope.getDynamicListByGroupIdForWeb();
        //删除动态
        $scope.deleteDoctorDynamic = function(item) {
            var modalInstance = $modal.open({
                templateUrl: 'delModalContent.html',
                controller: 'deletePerContentCtrl',
                size: 'md',
                resolve: {
                    data: function() {
                        return item;
                    }
                }
            });

            modalInstance.result.then(function(result) {

                if (result) {
                    //调用删除动态接口    
                    $http.post(app.url.dynamic.deleteDoctorDynamic, {
                        access_token: app.url.access_token,
                        id: item.id
                    }).
                    success(function(data) {
                        if (data.resultCode == 1) {
                            toaster.pop('success', null, "删除动态成功！");
                            $scope.getDynamicListByGroupIdForWeb();
                        } else {
                            toaster.pop('error', null, data.resultMsg);

                        }
                    }).
                    error(function(data) {
                        toaster.pop('error', null, "服务器通讯出错");
                    });
                }


            });

        };

    }


angular.module('app').controller('deletePerContentCtrl', deletePerContentCtrl);

// 手动注入依赖
deletePerContentCtrl.$inject = ['$scope', '$modalInstance', 'data'];


function deletePerContentCtrl($scope, $modalInstance, data) {

    $scope.doctor = data;
    console.log(data);
    $scope.ok = function() {
        $modalInstance.close(true);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss(false);
    };
};
})();
