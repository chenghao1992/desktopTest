app.controller("SettingCtrl",["$scope","$modal","$log",function($scope,$modal,$log){$scope.invite=function(row){var inviteModal=$modal.open({templateUrl:"inviteDocCreateGroupModalContent.html",controller:"inviteDocCreateGroupModalCtrl"});inviteModal.result.then(function(status){"ok"==status&&console.log("invite")},function(){$log.info("inviteModal dismissed at: "+new Date)})}}]),app.controller("inviteDocCreateGroupModalCtrl",["$scope","$modalInstance","$http",function($scope,$modalInstance,$http){var access_token=localStorage.getItem("access_token"),enterprise_id=(localStorage.getItem("enterprise_id"),JSON.parse(localStorage.getItem("company")).id);$("#dialog_container");$scope.viewData={},$scope.formData={},$scope.showResult=!1,$scope.showNoneResult=!1,$scope.showMsgBox=!1,$scope.showSuccess=!1,$scope.showWarn=!1;var doIt=function(){var ttl,dpt,hsp,keys=$scope.formData.doctorInfo,type="?",dt=null;return keys?(11!==keys.length||/\D/.test(keys)||"1"!==keys.charAt(0)?(type="",dt={access_token:access_token,keyWord:keys}):(type="",dt={access_token:access_token,keyWord:keys},$scope.formData.phone=keys),void $http({url:app.url.doctor.searchs,method:"post",data:dt}).then(function(resp){console.log(resp);var dt=resp.data.data[0];dt&&dt.doctor?(console.log(dt),$scope.showNoneResult=!1,$scope.showResult=!0,ttl=dt.doctor.title||"--",dpt=dt.doctor.departments||"--",hsp=dt.doctor.hospital||"--",$scope.formData.id=dt._id,$scope.viewData.name=dt.name||"--",$scope.viewData.telephone=dt.telephone,$scope.viewData.info=ttl+" / "+dpt+" / "+hsp,$scope.viewData.imgSrc=dt.headPicFileName||"src/img/a0.jpg"):($scope.showResult=!1,$scope.showNoneResult=!0,$scope.viewData.keys=keys)},function(x){console.error(x.statusText)})):void console.warn("无效查询！")};$scope.inviteCreateGroup=function(){$http({url:app.url.yiliao.sendInviteCode,method:"post",data:{access_token:access_token,companyId:enterprise_id,doctorId:$scope.formData.id,telephone:$scope.viewData.telephone}}).then(function(resp){1===resp.data.resultCode?($scope.showResult=!1,$scope.showSuccess=!0):($scope.showResult=!1,$scope.showWarn=!0,$scope.formData.warn_text=resp.data.resultMsg,console.log("[邀请失败！] "+resp.data.resultMsg))},function(x){console.error(x.statusText)})},$scope.sendMsg=function(){$scope.showNoneResult=!1,$scope.showMsgBox=!0},$scope.doSend=function(){$http({url:app.url.yiliao.sendInviteCode,method:"post",data:{access_token:access_token,companyId:enterprise_id,telephone:$scope.formData.phone}}).then(function(resp){1===resp.data.resultCode?($scope.showResult=!1,$scope.showSuccess=!0):($scope.showResult=!1,$scope.showWarn=!0,$scope.formData.warn_text=resp.data.resultMsg,console.log("[邀请失败！] "+resp.data.resultMsg))},function(x){console.error(x.statusText)})},$scope.query=function(){$scope.showMsgBox=!1,$scope.showSuccess=!1,$scope.showWarn=!1,doIt()},$scope.close=function(){$modalInstance.dismiss("cancel")}}]);