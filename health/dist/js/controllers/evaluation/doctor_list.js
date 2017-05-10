"use strict";app.controller("DoctorList",function($rootScope,$scope,$state,$http,utils,Doctor){function initTable(){var name,_index,_start,isSearch=!1,searchTimes=0,index=1*utils.localData("page_index")||1,start=1*utils.localData("page_start")||0,length=1*utils.localData("page_length")||50,setTable=function(){doctorList=$("#inviteDoctorList"),dTable=doctorList.dataTable({draw:index,displayStart:start,lengthMenu:[5,10,15,20,30,40,50,100],pageLength:length,bServerSide:!0,sAjaxSource:url,fnServerData:function(sSource,aoData,fnCallback){$.ajax({type:"post",url:sSource,dataType:"json",data:{access_token:app.url.access_token,groupId:groupId,doctorId:doctorId,pageIndex:index-1,pageSize:aoData[4].value},success:function(resp){for(var i=0;i<resp.data.pageData.length;i++)utils.extendHash(resp.data.pageData[i],["name","hospital","title","departments","telephone","time"]);resp.start=resp.data.start,resp.recordsTotal=resp.data.total,resp.recordsFiltered=resp.data.total,resp.length=resp.data.pageSize,resp.data=resp.data.pageData,fnCallback(resp),$scope.loading=!1}})},searching:!1,language:app.lang.datatables.translation,createdRow:function(nRow,aData,iDataIndex){var a_link=$(nRow).find(".a-link");a_link.click(function(e){var evt=e||window.event;evt.stopPropagation(),$scope.seeDetails(aData.id)})},columns:[{orderable:!1,render:function(set,status,dt){if(dt.headPicFileName)var path=dt.headPicFileName;else var path="src/img/a0.jpg";return'<img class="a-link" src="'+path+'"/></a>'},searchable:!1},{orderable:!1,searchable:!1,render:function(set,status,dt){return'<a class="a-link">'+dt.name+"</a>"}},{data:"title",orderable:!1,searchable:!1},{data:"departments",orderable:!1,searchable:!1},{data:"hospital",orderable:!1,searchable:!1},{data:"telephone",orderable:!1,searchable:!1},{data:"time",orderable:!1,searchable:!1}]}),dTable.off().on("init.dt",function(){html.scrollTop($rootScope.scrollTop),body.scrollTop($rootScope.scrollTop),doctorList.find("tr[data-id="+$rootScope.curRowId+"]").addClass("currentRow")}).on("length.dt",function(e,settings,len){index=1,start=0,length=len,dTable.fnDestroy(),setTable(),utils.localData("page_length",len)}).on("page.dt",function(e,settings){index=settings._iDisplayStart/length+1,start=length*(index-1),dTable.fnDestroy(),$rootScope.scrollTop=html.scrollTop()?103:152,utils.localData("page_index",index),utils.localData("page_start",start),setTable()}).on("search.dt",function(e,settings){settings.oPreviousSearch.sSearch?(isSearch=!0,searchTimes++,_index=settings._iDisplayStart/settings._iDisplayLength+1,_start=settings._iDisplayStart,name=settings.oPreviousSearch.sSearch):(isSearch=!1,name=null),isSearch?(index=1,start=0):searchTimes>0&&(searchTimes=0,index=_index,start=_start,dTable.fnDestroy(),setTable())})};setTable()}var url=app.url.yiliao.inviteDoctor,html=$("html"),body=$("body"),groupId=utils.localData("curGroupId"),doctorId=$scope.curDoctorId||"0"==$scope.curDoctorId?$scope.curDoctorId:utils.localData("curDoctorId"),curDoctorName=$scope.curDoctorName||utils.localData("curDoctorName");$scope.viewData={},$scope.viewData.curDoctorName=curDoctorName&&curDoctorName.constructor==Array?"XXX":curDoctorName,"list_pass"!==$rootScope.pageName&&(utils.localData("page_index",null),utils.localData("page_start",null),$rootScope.pageName="list_pass",$rootScope.scrollTop=0),$scope.seeDetails=function(id){id&&($("#doctor_details").removeClass("hide"),$rootScope.winVisable=!0,Doctor.addData(id))};var doctorList,dTable;initTable(),$scope["return"]=function(){$state.go("app.evaluation.by_doctor",{},{reload:!1})}});