"use strict";app.controller("ContactsAdd",function($rootScope,$scope,$state,$timeout,$http,utils,modal){function check(info){var target=$(contacts.getTargets());if(0===target.length)return parentId=null,void list_wrapper.html("");var span=$('<span class="label-btn btn-info"></span>'),i=$('<i class="fa fa-times"></i>');return parentId=info.id,list_wrapper.html(""),list_wrapper.html(span.html(info.name).append(i)),i.click(function(){contacts.setCheck(info.id),list_wrapper.html(""),parentId=null}),"0"!=info.pid&&info.pid&&"x"!=info.pid?(modal.toast.warn("自定义组织不能超过两级!"),void i.trigger("click")):void 0}var url=app.url.yiliao.getAllData,container=$("#dialog_container"),html=($("#cnt_list_apportion"),$("html")),list_wrapper=$("#cnt_list_department"),groupId=utils.localData("curGroupId"),parentId=null;$scope.formData={},html.css("overflow","hidden");var contacts=new Tree("cnt_list_apportion",{hasCheck:!0,allCheck:!1,multiple:!1,self:!0,arrType:[1,1,0],data:{url:url,param:{access_token:app.url.access_token,groupId:groupId}},icons:{arrow:"fa fa-caret-right/fa fa-caret-down",check:"fa fa-check",root:"fa fa-hospital-o dcolor",branch:"fa fa-h-square dcolor",leaf:"fa fa-h-square dcolor"},root:{selectable:!0,name:utils.localData("curGroupName"),id:0},datakey:{id:"id",name:"name",sub:"subList"},info:{name:"name",id:"id",pid:"parentId",description:"description"},events:{click:check},callback:function(){for(var dts=contacts.tree.find("dt"),curDt=null,i=0;i<dts.length;i++)if(dts.eq(i).data("info").id===$scope.curDepartmentId){curDt=dts.eq(i);break}curDt&&curDt.trigger("click")}});$scope.save=function(){return $scope.formData.name||"0"==$scope.formData.name?void $http({url:app.url.yiliao.saveByDepart,method:"post",data:{access_token:app.url.access_token,name:$scope.formData.name,description:$scope.formData.description,parentId:parentId,groupId:groupId}}).then(function(resp){1===resp.data.resultCode?(console.log("创建成功！"),$state.go("app.contacts.list",{},{reload:!0}),html.css("overflow","auto")):console.warn("创建失败！")},function(x){console.error(x.statusText)}):void modal.toast.warn("组织名称不可为空！")},$scope.cancel=function(){container.prev().remove(),container.remove(),window.history.back(),html.css("overflow","auto")}});