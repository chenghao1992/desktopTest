"use strict";app.controller("RelationshipEdit",function($rootScope,$scope,$state,$timeout,$http,utils,modal){function check(info){if($scope.targetDoctorId==info.id)return list_wrapper.html(""),modal.toast.warn("不能选择自己！"),void contacts.setCheck(info.id);for(var dts=contacts.tree.find("dt"),curDt=null,i=0;i<dts.length;i++)if(dts.eq(i).data("info").id==$scope.targetDoctorId){curDt=dts.eq(i);break}dts=curDt.parent().children("dd").find("dt");for(var i=0;i<dts.length;i++)if(dts.eq(i).data("info").id==info.id)return list_wrapper.html(""),modal.toast.warn("不能选择自己的下级！"),contacts.setCheck(info.id),void($scope.hasSuper=!1);var target=$(contacts.getTargets());if(0===target.length)return parentId=null,void list_wrapper.html("");var span=(target.data("info"),$('<span class="label-btn btn-info"></span>')),i=$('<i class="fa fa-times"></i>');parentId=info.id,list_wrapper.html(""),list_wrapper.html(span.html(info.name).append(i)),i.click(function(){contacts.setCheck(info.id),list_wrapper.html(""),parentId=null,$scope.hasSuper=!1}),$scope.hasSuper=!0}var container=(app.url.yiliao.getRelationShip,$("#dialog_container")),html=($("#cnt_list_apportion"),$("html")),list_wrapper=$("#cnt_list_department"),groupId=utils.localData("curGroupId"),parentId=null;$scope.formData={},$scope.formData.name=$scope.targetDoctorName,$scope.hasSuper=!0,html.css("overflow","hidden"),$scope.groupProfit||0===$scope.groupProfit?$scope.formData.groupProfit=$scope.groupProfit:$scope.formData.groupProfit=0,$scope.superProfit||0===$scope.superProfit?$scope.formData.superProfit=$scope.superProfit:$scope.formData.superProfit=0,$scope.formData.superProfit||($scope.formData.superProfit=0),0==$scope.targetDoctorParentId&&($scope.hasSuper=!1,$scope.formData.superProfit=0);var contacts=new Tree("cnt_list_relationship",{hasCheck:!0,multiple:!1,arrType:[0,0],data:{url:app.url.yiliao.getProfitTree,param:{access_token:app.url.access_token,groupId:groupId}},async:!1,icons:{arrow:"fa fa-caret-right/fa fa-caret-down",check:"fa fa-check",root:"fa fa-hospital-o tomato",branch:"fa fa-user-md tomato",leaf:"fa fa-user-md tomato"},info:{name:"name",id:"id",pid:"parentId",description:"description"},datakey:{id:"id",name:"name",sub:"children"},events:{click:check},callback:function(){for(var dts=contacts.tree.find("dt"),curDt=null,i=0;i<dts.length;i++)if(dts.eq(i).data("info").id===$scope.targetDoctorParentId){curDt=dts.eq(i);break}curDt&&curDt.trigger("click")}});$scope.save=function(){if($scope.formData.groupProfit>100||$scope.formData.superProfit>100)return void modal.toast.warn("抽成比例不能大于100");$scope.formData.superProfit||($scope.formData.superProfit=0),parentId||(parentId=0,$scope.formData.superProfit=0);var param={access_token:app.url.access_token,groupId:groupId,parentId:parentId,id:$scope.targetDoctorId};$http({url:app.url.yiliao.updateProfitRelation,method:"post",data:param}).then(function(resp){1===resp.data.resultCode?(console.log("设置抽成关系成功！"),param={access_token:app.url.access_token,groupId:groupId,id:$scope.targetDoctorId,groupProfit:$scope.formData.groupProfit,parentProfit:$scope.formData.superProfit},$http({url:app.url.yiliao.updateProfit,method:"post",data:param}).then(function(resp){1===resp.data.resultCode?(console.log("修改抽成比例成功！"),$state.go("app.relationship.list",{id:$scope.curDepartmentId},{reload:!0}),html.css("overflow","auto")):modal.toast.warn("修改抽成比例失败！ ("+resp.data.resultMsg+")")},function(x){console.error(x.statusText)})):modal.toast.warn("设置抽成关系失败！ ("+resp.data.resultMsg+")")},function(x){console.error(x.statusText)})},$scope.cancel=function(){container.prev().remove(),container.remove(),window.history.back(),html.css("overflow","auto")}});