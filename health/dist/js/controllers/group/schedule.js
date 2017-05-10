"use strict";app.directive("slideBar",function(){return{link:function(scope,element,attrs){function expand(){element.removeClass("sch-slide-bar-hide").addClass("sch-slide-bar-show").height("100%")}function collapse(){element.removeClass("sch-slide-bar-show").addClass("sch-slide-bar-hide").height("100%")}scope.$watch(attrs.collapse,function(shouldCollapse){shouldCollapse?collapse():expand()})}}}),app.controller("ScheduleCtrl",["$rootScope","$scope","$http","$log","utils","$state","$modal","toaster",function($rootScope,$scope,$http,$log,utils,$state,$modal,toaster){function forward(info){function checkTime(i){return i<10&&(i="0"+i),i.toString()}$scope.isCollapsed=!0;var id=info.id,name=info.name;$scope.currentDepartName=name,$scope.currentDepartId=id,$scope.$apply(),$http.post(app.url.yiliao.getDepDocs,{access_token:access_token,departmentId:id.toString()}).success(function(data,status,headers,config){if(1==data.resultCode){$scope.depDocs=[];for(var _depDocs=[],i=0;i<data.data.pageData.length;i++){var _docInfo={name:data.data.pageData[i].doctor.name,position:data.data.pageData[i].doctor.position,doctorId:data.data.pageData[i].doctor.doctorId,headPicFilePath:data.data.pageData[i].doctor.headPicFilePath||"src/img/a0.jpg"};_depDocs.push(_docInfo),$scope.depDocs=_depDocs}}else console.log(data.resultMsg)}).error(function(data,status,headers,config){console.log(data)}),$scope.getOnlineId=function(weekday,stage){if(void 0!=$scope.depData.clinicDate){var filtered=$scope.depData.clinicDate.filter(function(item,index,array){return item.week==weekday&&item.period==stage});return filtered.length>0?filtered[0].onlineId:null}},$scope.getOnlines=function(){$http.post(app.url.yiliao.getDptSchedule,{access_token:access_token,departmentId:id.toString()}).success(function(data,status,headers,config){$scope.depData=data.data,$scope.filterSchedule=function(weekday,stage){if(void 0!=$scope.depData.clinicDate){var filtered=$scope.depData.clinicDate.filter(function(item,index,array){return item.week==weekday&&item.period==stage});return filtered.length>0?filtered[0].doctors:null}}}).error(function(data,status,headers,config){alert(data)})},$scope.getOnlines(),$scope.weekdays=[1,2,3,4,5,6,7],$scope.dataStages=[1,2,3],$scope.collapse=function(){$scope.isCollapsed=!0},$scope.startTime=null,$scope.endTime=null,$scope.minTime=null,$scope.maxTime=null,$scope.tdClick=function($event,weekday,stage){if($event.currentTarget==$event.target){if(0==$scope.isCollapsed)$scope.isCollapsed=!0;else{if($log.log(weekday+stage),$scope.currentWeekday=weekday,$scope.currentStage=stage,null==$scope.depDocs)return;for(var i=0;i<$scope.depDocs.length;i++)$scope.depDocs[i].check=!1;1==stage?($scope.startTime=new Date,$scope.startTime.setHours(9),$scope.startTime.setMinutes(0),$scope.startTime.setMilliseconds(0),$scope.endTime=new Date,$scope.endTime.setHours(12),$scope.endTime.setMinutes(0),$scope.endTime.setMilliseconds(0)):2==stage?($scope.startTime=new Date,$scope.startTime.setHours(12),$scope.startTime.setMinutes(0),$scope.startTime.setMilliseconds(0),$scope.endTime=new Date,$scope.endTime.setHours(19),$scope.endTime.setMinutes(0),$scope.endTime.setMilliseconds(0)):3==stage&&($scope.startTime=new Date,$scope.startTime.setHours(19),$scope.startTime.setMinutes(0),$scope.startTime.setMilliseconds(0),$scope.endTime=new Date,$scope.endTime.setHours(24),$scope.endTime.setMinutes(0),$scope.endTime.setMilliseconds(0)),$scope.isCollapsed=!1}$event.stopPropagation()}},$scope.mytime=new Date,$scope.hstep=1,$scope.mstep=10,$scope.closeTab=function($event,weekday,stage,doctorId,doctorName){if($event.currentTarget==$event.target){var delModal=$modal.open({templateUrl:"delDocOnline.html",controller:"delDocOnlineCtrl",size:"sm",resolve:{item:function(){return doctorName}}});delModal.result.then(function(status){"ok"==status&&$http.post(app.url.yiliao.deleteOnline,{access_token:access_token,doctorId:doctorId,departmentId:$scope.currentDepartId,period:stage,week:weekday}).success(function(data,status,headers,config){1==data.resultCode&&$scope.getOnlines()}).error(function(data,status,headers,config){console.log(data)})},function(){$log.info("removeModal dismissed at: "+new Date)})}$event.stopPropagation()},app.controller("delDocOnlineCtrl",["$scope","$modalInstance","item","$http",function($scope,$modalInstance,item,$http){$scope.doctorName=item,$scope.ok=function(){$modalInstance.close("ok")},$scope.cancel=function(){$modalInstance.dismiss("cancel")}}]),$scope.translateWeekday=function(weekday){switch(weekday){case 1:return"星期一";case 2:return"星期二";case 3:return"星期三";case 4:return"星期四";case 5:return"星期五";case 6:return"星期六";case 7:return"星期天"}},$scope.translateStage=function(stage){switch(stage){case 1:return"上午";case 2:return"下午";case 3:return"晚上"}},$scope.submit=function(){for(var startTime=checkTime($scope.startTime.getHours())+checkTime($scope.startTime.getMinutes()),endTime=checkTime($scope.endTime.getHours())+checkTime($scope.endTime.getMinutes()),checkDocs=$scope.depDocs.filter(function(item,index,array){if(void 0!=item.check&&1==item.check)return item.startTime=startTime,item.endTime=endTime,item}),doctors=[],i=0;i<checkDocs.length;i++){var doctor={doctorId:checkDocs[i].doctorId,doctorName:checkDocs[i].name,startTime:checkDocs[i].startTime,endTime:checkDocs[i].endTime};doctors.push(doctor)}if(!(doctors.length>0))return void toaster.pop("warning","","没有选中医生");var data={departmentId:$scope.currentDepartId,clinicDate:[{week:$scope.currentWeekday,period:$scope.currentStage,doctors:doctors}]};$http.post(app.url.yiliao.addOnline,{data:JSON.stringify(data),access_token:access_token}).success(function(data,status,headers,config){1==data.resultCode?(toaster.pop("success","","提交成功"),$scope.isCollapsed=!0,$scope.getOnlines()):toaster.pop("error","","提交失败")}).error(function(data,status,headers,config){toaster.pop("error","","提交失败"),console.log(data)})}}$scope.isCollapsed=!0;var curGroupId=localStorage.getItem("curGroupId");$scope.depDocs=null;var access_token=(localStorage.getItem("user_id"),localStorage.getItem("access_token"));new Tree("sch_cnt_list",{hasCheck:!1,allCheck:!1,multiple:!1,allHaveArr:!1,self:!0,search:!1,arrType:[1,0],data:{url:app.url.yiliao.getAllData,param:{access_token:app.url.access_token,groupId:curGroupId}},datakey:{id:"id",name:"name",sub:"subList"},info:{name:"name",id:"id",pid:"department",description:"description"},icons:{arrow:"fa fa-caret-right/fa fa-caret-down",check:"fa fa-check",root:"fa fa-hospital-o dcolor",branch:"fa fa-h-square dcolor",leaf:"fa fa-h-square dcolor",head:"headPicFileName"},events:{click:forward},callback:function(){var cnt_list=$("#sch_cnt_list"),curDepartment=cnt_list.find(".cnt-list-warp").first();curDepartment.find("dt").first().addClass("cur-line").trigger("click")}})}]);