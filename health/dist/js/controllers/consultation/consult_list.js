app.controller("ConsultListCtrl",function($scope,utils,$http,$modal,toaster,$location,$state,$rootScope,$stateParams,Group){function getOpenStatus(){$http.post(app.url.consult.getOpenConsultation,{access_token:app.url.access_token,groupId:curGroupId}).success(function(data,status,headers,config){1==data.resultCode?1!=data.data&&$state.go("app.consultation.introduce"):console.log(data.resultMsg)}).error(function(data,status,headers,config){alert(data.resultMsg)})}function getPackList(){$http.post(app.url.consult.getPackList,{access_token:app.url.access_token,groupId:curGroupId,pageIndex:0,pageSize:1e3}).success(function(data,status,headers,config){1==data.resultCode?$scope.data=data.data.pageData:toaster.pop("error",null,data.resultMsg)}).error(function(data,status,headers,config){toaster.pop("error",null,data.resultMsg)})}var curGroupId=utils.localData("curGroupId");$scope.currentOrgInfo=Group.getCurrentOrgInfo(),getOpenStatus(),getPackList(),$scope.deletePack=function(_id){var modalInstance=$modal.open({templateUrl:"delModalContent.html",controller:"delModalInstanceCtrl",size:"sm"});modalInstance.result.then(function(status){"ok"==status&&$http.post(app.url.consult.delPack,{access_token:app.url.access_token,consultationPackId:_id}).success(function(data,status,headers,config){1==data.resultCode?(toaster.pop("success",null,"删除成功"),getPackList()):toaster.pop("error",null,data.resultMsg||"当前会诊包中有医生")}).error(function(data,status,headers,config){toaster.pop("error",null,data.resultMsg)})},function(){})}}),app.controller("delModalInstanceCtrl",function($scope,$modalInstance,toaster,$http,utils){$scope.ok=function(){$modalInstance.close("ok")},$scope.cancel=function(){$modalInstance.dismiss("cancel")}});