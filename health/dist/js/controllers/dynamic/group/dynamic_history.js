"use strict";function deletePerContentCtrl($scope,$modalInstance,data){$scope.doctor=data,console.log(data),$scope.ok=function(){$modalInstance.close(!0)},$scope.cancel=function(){$modalInstance.dismiss(!1)}}!function(){function funDynamicHistoryCtrl($scope,$http,$state,toaster,$modal){var curGroupId=localStorage.getItem("curGroupId");$scope.pageSize=10,$scope.getDynamicListByGroupIdForWeb=function(){$http.post(app.url.dynamic.getDynamicListByGroupIdForWeb,{access_token:app.url.access_token,groupId:curGroupId,pageIndex:$scope.pageIndex-1||0,pageSize:$scope.pageSize||10}).success(function(data){1==data.resultCode?($scope.historyList=data.data.pageData,$scope.pageTotal=data.data.total):toaster.pop("error",null,data.resultMsg)}).error(function(data){toaster.pop("error",null,"服务器通讯出错")})},$scope.getDynamicListByGroupIdForWeb(),$scope.deleteDoctorDynamic=function(item){var modalInstance=$modal.open({templateUrl:"delModalContent.html",controller:"deletePerContentCtrl",size:"md",resolve:{data:function(){return item}}});modalInstance.result.then(function(result){result&&$http.post(app.url.dynamic.deleteDoctorDynamic,{access_token:app.url.access_token,id:item.id}).success(function(data){1==data.resultCode?(toaster.pop("success",null,"删除动态成功！"),$scope.getDynamicListByGroupIdForWeb()):toaster.pop("error",null,data.resultMsg)}).error(function(data){toaster.pop("error",null,"服务器通讯出错")})})}}angular.module("app").controller("dynamicHistoryCtrl",funDynamicHistoryCtrl),funDynamicHistoryCtrl.$inject=["$scope","$http","$state","toaster","$modal"]}(),angular.module("app").controller("deletePerContentCtrl",deletePerContentCtrl),deletePerContentCtrl.$inject=["$scope","$modalInstance","data"];