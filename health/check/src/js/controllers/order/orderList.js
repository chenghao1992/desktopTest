'use strict';
(function() {

//集团收费订单管理
angular.module('app').controller('OrderListCtrl', OrderListCtrl);
OrderListCtrl.$inject = ['$scope', '$state', '$http', 'toaster', '$modal'];
function OrderListCtrl($scope, $state, $http, toaster, $modal) {

    // ui-selected 必须先命名一个对象
    $scope.groupSelected = {};

    $scope.searchType = '医生';

    var globalParams={
        access_token: app.url.access_token,
        pageIndex:0,
        pageSize:15
    };

    //获取可选集团接口
    (function () {
        $http.post(app.url.group.findAllGroup, {
            access_token: app.url.access_token
        }).
            success(function (data, status, headers, config) {
                if (data.resultCode == 1) {
                    $scope.groupList = data.data;
                    $scope.groupList.unshift({groupName:'全部集团',groupId:''});
                }
                else {
                    toaster.pop('error', null, data.resultMsg);
                }
            }).
            error(function (data, status, headers, config) {
                toaster.pop('error', null, data.resultMsg);
            });
    })();

    $scope.searchByType = function () {
        $scope.packType='';
        $scope.orderStatus='';
        $scope.groupSelected = {};
        $scope.startTime=null;
        $scope.endTime=null;
        globalParams={
            access_token: app.url.access_token
        };
        if($scope.searchText){
            switch($scope.searchType){
                case '医生':
                    globalParams.doctorName=$scope.searchText;
                    break;
                case '患者':
                    globalParams.patientName=$scope.searchText;
                    break;
                case '用户':
                    globalParams.userName=$scope.searchText;
                    break;
                case '订单号':
                    globalParams.orderNo=$scope.searchText;
                    break;
                case '手机号':
                    globalParams.telephone=$scope.searchText;
                    break;
            }
        }


        queryOrderByConditions(globalParams);
    }

    $scope.packTypeChange=function(){
        if($scope.packType){
            globalParams.packType=$scope.packType;
        }
        else{
            delete globalParams.packType;
        }
        globalParams.pageIndex=0;
        queryOrderByConditions(globalParams);
    };

    $scope.orderStatusChange=function(){
        if($scope.orderStatus){
            globalParams.orderStatus=$scope.orderStatus;
        }
        else{
            delete globalParams.orderStatus;
        }
        globalParams.pageIndex=0;
        queryOrderByConditions(globalParams);
    };

    $scope.groupChange=function(){

        if($scope.groupSelected.selected.groupId){
            globalParams.groupId=$scope.groupSelected.selected.groupId;
        }
        else{
            delete globalParams.groupId;
        }
        globalParams.pageIndex=0;
        queryOrderByConditions(globalParams);
    };

    $scope.startTimeChange=function(){
        if($scope.startTime){
            globalParams.startCreateTime=(new Date($scope.startTime)).getTime();
        }
        else{
            delete globalParams.startCreateTime;
        }
        globalParams.pageIndex=0;
        queryOrderByConditions(globalParams);
    };

    $scope.endTimeChange=function(){
        if($scope.endTime){
            globalParams.endCreateTime=(new Date($scope.endTime)).getTime();
        }
        else{
            delete globalParams.endCreateTime;
        }
        globalParams.pageIndex=0;
        queryOrderByConditions(globalParams);
    };



    function queryOrderByConditions(params) {
        $http.post(app.url.order.queryOrderByConditions, params).
            success(function (data, status, headers, config) {
                if (data.resultCode == 1) {
                    $scope.page.count = data.data.pageCount;
                    // }
                    $scope.planList = data.data.pageData;
                }
                else {
                    toaster.pop('error', null, data.resultMsg);
                }
            }).
            error(function (data, status, headers, config) {
                toaster.pop('error', null, data.resultMsg);
            });
    }

    queryOrderByConditions(globalParams);

    var groupId = app.url.groupId();

    // 选项
    $scope.options = {
        type: [{
            value: 1,
            title: '咨询套餐'
        }, {
            value: 2,
            title: '报到套餐'
        }, {
            value: 3,
            title: '门诊套餐'
        }, {
            value: 4,
            title: '健康关怀套餐'
        }, {
            value: 5,
            title: '随访套餐'
        }, {
            value: 6,
            title: '直通车套餐'
        }, {
            value: 7,
            title: '会诊套餐'
        }, {
            value: 9,
            title: '预约套餐'
        }, {
            value: 10,
            title: '收费单'
        }],
        Booktype: [{
            value: 9,
            title: '预约套餐'
        }, {
            value: 10,
            title: '收费单'
        }],
        status: [{
            value: 1,
            title: '待预约'
        }, {
            value: 2,
            title: '待支付'
        }, {
            value: 3,
            title: '已支付'
        }, {
            value: 4,
            title: '已完成'
        }, {
            value: 5,
            title: '已取消'
        }, {
            value: 6,
            title: '进行中'
        }, {
            value: 7,
            title: '待完善'
        }, {
            value: 10,
            title: '预约成功'
        },]
    };

    // 类型或状态翻译
    $scope.funGetTitleByValue = function (value, arry) {
        for (var i = 0; i < arry.length; i++) {
            if (value == arry[i].value) {
                return arry[i].title;
            }
            ;
        }
        return value;
    };

    // string转long
    $scope.funTimeToLong = function (time, type) {

        if (!type || !time[type]) return;

        var _long = new Date(time[type]).getTime();

        if (type == 'endCreateTime') {
            _long = _long - 0 + (24 * 60 * 60 - 1) * 1000;
        }
        ;

        time[type] = _long;

        return _long;
    };

    // // date转long
    // $scope.funSetEndDate = function(time, type) {
    //     if (!time || !type || !angular.isDate(time[type])) return;
    //     $scope.funTimeToLong(time, type);
    // };

    // 翻页
    $scope.page = {};

    $scope.page.index =  1;
    $scope.page.size = 15;

    $scope.page.changed = function () {
        globalParams.pageIndex=$scope.page.index-1;
        queryOrderByConditions(globalParams);
    };

    $scope.pageSizeChange=function(){
        $scope.page.index =  1;
        globalParams.pageSize=$scope.page.size;
        globalParams.pageIndex=0;
        queryOrderByConditions(globalParams);
    }



    // 日历打开关闭
    $scope.open = function ($event, typeBtn) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope[typeBtn] = true;
    };


    // 搜索条件
    $scope.search = {};

    $scope.funGetOrderList = (function _funGetOrderList(page, search) {

        $scope.page.index = page.index || 1;
        $scope.page.size = page.size || 30;

        if (search == undefined) {
            search = {};
        }

        // 更新搜索条件
        $scope.search = {
            orderStatus: search.orderStatus || '',
            doctorName: search.doctorName || '',
            orderType: search.orderType || '',
            patientName: search.patientName || '',
            hostpitalName: search.hostpitalName || '',
            startCreateTime: search.startCreateTime || '',
            endCreateTime: search.endCreateTime || ''
        };

        // 更新下载地址
        $scope.downLoadUrl = app.url.order.downOrderList + '?access_token=' +
            app.url.access_token + '&groupId=' +
            groupId + '&orderStatus=' + $scope.search.orderStatus +
            '&orderType=' + $scope.search.orderType + '&doctorName=' + $scope.search.doctorName +
            '&patientName=' + $scope.search.patientName + '&hostpitalName=' +
            $scope.search.hostpitalName + '&startCreateTime=' + $scope.search.startCreateTime +
            '&endCreateTime=' + $scope.search.endCreateTime;

        // 提交
        var params = {
            access_token: app.url.access_token,
            groupId: groupId,
            pageIndex: $scope.page.index - 1,
            pageSize: $scope.page.size,
            orderStatus: $scope.search.orderStatus || '',
            //orderType: $scope.search.orderType || '',
            doctorName: $scope.search.doctorName || '',
            patientName: $scope.search.patientName || '',
            hostpitalName: $scope.search.hostpitalName || '',
            startCreateTime: $scope.search.startCreateTime || '',
            endCreateTime: $scope.search.endCreateTime || ''
        };

        if ($scope.orderType == '1' || $scope.orderType == '2') {
            params.packType = $scope.orderType;
        } else {
            params.orderType = $scope.orderType;
        }

        $http.post(app.url.order.getOrderList, params).then(function (rpn) {
            rpn = rpn.data;
            if (rpn.resultCode === 1) {
                // if(rpn.data.pageData==0){
                //     $scope.page.count = 0;
                // }else{
                $scope.page.count = rpn.data.total;
                // }
                $scope.planList = rpn.data.pageData;

            } else if (rpn.resultMsg) {
                toaster.pop('error', null, rpn.resultMsg);
            } else {
                toaster.pop('error', null, '接口出错');
            }
            ;
        });

        return _funGetOrderList;

    })($scope.page, $scope.search);
};

})();
