"use strict";app.controller("ContactsEdit",function($rootScope,$scope,$state,$timeout,$http,utils,modal){function check(info){if($scope.targetDepartmentId===info.id)return list_wrapper.html(""),void($scope.usable||(modal.toast.warn("不能选择自己！"),$scope.usable=!0,contacts.setCheck(info.id),$scope.usable=!1));for(var dts=contacts.tree.find("dt"),curDt=null,i=0;i<dts.length;i++)if(dts.eq(i).data("info").id===$scope.targetDepartmentId){curDt=dts.eq(i);break}dts=curDt.parent().children("dd").find("dt");for(var i=0;i<dts.length;i++)if(dts.eq(i).data("info").id===info.id)return list_wrapper.html(""),void($scope.usable||(modal.toast.warn("不能选择自己的下级！"),$scope.usable=!0,contacts.setCheck(info.id),$scope.usable=!1));var target=$(contacts.getTargets());if(0===target.length)return parentId=null,void list_wrapper.html("");var span=$('<span class="label-btn btn-info"></span>'),i=$('<i class="fa fa-times"></i>');parentId=info.id,list_wrapper.html(""),list_wrapper.html(span.html(info.name).append(i)),i.click(function(){contacts.setCheck(info.id),list_wrapper.html(""),parentId=null})}var url=app.url.yiliao.getAllData,container=$("#dialog_container"),html=($("#cnt_list_apportion"),$("html")),list_wrapper=$("#cnt_list_department"),groupId=utils.localData("curGroupId"),parentId=null;$scope.formData={},html.css("overflow","hidden"),$scope.formData.name=$scope.targetDepartmentName,$scope.formData.description=$scope.targetDepartmentDescription;var contacts=new Tree("cnt_list_apportion",{hasCheck:!0,multiple:!1,self:!0,arrType:[1,1,0],data:{url:url,param:{access_token:app.url.access_token,groupId:groupId}},icons:{arrow:"fa fa-caret-right/fa fa-caret-down",check:"fa fa-check",root:"fa fa-hospital-o dcolor",branch:"fa fa-h-square dcolor",leaf:"fa fa-user-md dcolor"},root:{selectable:!0,name:utils.localData("curGroupName"),id:0},datakey:{id:"id",name:"name",sub:"subList"},info:{name:"name",id:"id",pid:"parentId",description:"description"},events:{click:check},callback:function(){for(var dts=contacts.tree.find("dt"),curDt=null,i=0;i<dts.length;i++)if(dts.eq(i).data("info").id==$scope.targetDepartmentParentId){curDt=dts.eq(i);break}curDt&&curDt.trigger("click")}});$scope.save=function(){if(!$scope.formData.name&&"0"!=$scope.formData.name)return void modal.toast.warn("组织名称不可为空！");var param={access_token:app.url.access_token,name:$scope.formData.name,description:$scope.formData.description,id:$scope.targetDepartmentId};parentId&&(param.parentId=parentId),$http({url:app.url.yiliao.updateByDepart,method:"post",data:param}).then(function(resp){1===resp.data.resultCode?(console.log("编辑成功！"),$state.go("app.contacts.list",{id:$scope.curDepartmentId},{reload:!0}),html.css("overflow","auto")):console.warn("编辑失败！")},function(x){console.error(x.statusText)})},$scope.cancel=function(){container.prev().remove(),container.remove(),window.history.back(),html.css("overflow","auto")}});