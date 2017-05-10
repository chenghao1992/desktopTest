"use strict";app.controller("EvaluationByFinace",function($rootScope,$scope,$state,$http,utils,$modal,Doctor){function initTable(){var subs=[],index=1,start=0,length=10,idx=0,size=50,searchTimes=0,chk_val=!0,num=0,params={keyword:keyword},setTable=function(){function submit(){$scope.searching=!0,params.keyword=keyWord,dTable.fnDestroy(),setTable()}dTable=$("#evaluationByFinace").dataTable({language:app.lang.datatables.translation,ordering:!1,bAutoWidth:!1,draw:index,displayStart:start,lengthMenu:[10,15,20,30,40,50,100],pageLength:length,bServerSide:!0,sAjaxSource:app.urlRoot+"group/stat/orderMoney",fnServerData:function(sSource,aoData,fnCallback){num=1,idx=index-1,params.access_token=app.url.access_token,params.groupId=groupId,params.doctorId=null,params.showOnJob=chk_val,params.pageIndex=index-1,params.pageSize=aoData[4].value,$.ajax({type:"post",url:sSource,dataType:"json",data:params,success:function(resp){console.log(resp);var data={};data.recordsTotal=resp.data.total,data.recordsFiltered=resp.data.total,data.length=resp.data.pageSize,data.data=resp.data.pageData;for(var i=0;i<data.data.length;i++)utils.extendHash(data.data[i],["name","amount","hospital","departments","title","money"]);size=aoData[4].value,fnCallback(data)}})},aoColumns:[{orderable:!1,render:function(set,status,dt){return'<span class="text-num">'+(idx*size+num)+"</span>"},searchable:!1},{orderable:!1,render:function(set,status,dt){if(dt.headPicFileName)var path=dt.headPicFileName;else var path="src/img/a0.jpg";return'<img class="a-link" src="'+path+'"/></a>'},searchable:!1},{orderable:!1,searchable:!1,render:function(set,status,dt){return'<a class="a-link">'+dt.name+"</a>"}},{data:"hospital"},{data:"departments"},{data:"title"},{data:"amount"},{data:"money",orderable:!0},{data:null,defaultContent:"<button class='btn btn-primary'>查 询</button>"}],createdRow:function(nRow,aData,iDataIndex){var a_link=$(nRow).find(".a-link");a_link.click(function(){$scope.seeDetails(aData.id)}),$(nRow).on("click","button",function(){aData.showOnJob=chk_val,showPop(aData)}),num++}});var wrapper=$("#evaluationByFinace_filter"),_form=$("<form></form>"),_lb=$('<label class="checkbox i-checks m-r-lg"><i style="position:relative;top:0;width:20px;"></i>只显示在职医生</label>'),_lbl=wrapper.addClass("group-search").children("label").append(_i),_i=$('<i ng-show="loaded" class="fa icon-magnifier"></i>'),_ipt=_lbl.find("input").attr("placeholder","按医生姓名 / 电话搜索").attr("autocomplete","off"),_timer=0,_temp="";_chk=$('<input type="checkbox" style="width:auto" checked />'),wrapper.append(_form),_form.append(_lb),_lb.prepend(_chk),_form.append(_lbl),_lbl.html("").append(_ipt).append(_i),chk_val?(_chk.attr("checked",!0),chk_val=!0):(_chk.attr("checked",!1),chk_val=!1),_chk.click(function(){chk_val=!chk_val,dTable.fnDestroy(),setTable()}),_ipt.focus(function(){_timer=setInterval(function(){var val=$.trim(_ipt.val());val?(isSearching=!0,_i.removeClass("icon-magnifier").addClass("fa-times-circle"),keyWord=_temp=val):(isSearching=!1,_i.removeClass("fa-times-circle").addClass("icon-magnifier"),_temp&&!val&&($scope.searching=!1,keyWord=_temp="",start=length*(index-1),params.keyword=null,dTable.fnDestroy(),setTable()))},100)}),_ipt.blur(function(){clearInterval(_timer)}),_i.click(function(){isSearching=!1,keyWord=_temp="",_ipt.trigger("submit"),_ipt.val(""),_i.removeClass("fa-times-circle").addClass("icon-magnifier"),start=length*(index-1),dTable.fnDestroy(),params.keyword=null,setTable()}),_ipt.val(keyWord).trigger("focus"),utils.keyHandler(_ipt,{key13:submit}),dTable.off().on("draw.dt",function(e,settings,len){}).on("length.dt",function(e,settings,len){index=1,start=0,length=len,dTable.fnDestroy(),setTable(),utils.localData("page_length",len)}).on("page.dt",function(e,settings){subs=[],isSearching||(index=Math.floor(settings._iDisplayStart/length)+1)}).on("search.dt",function(e,settings){isSearching?(index=1,start=0):searchTimes>0&&(searchTimes=0,index=_index,start=_start,dTable.fnDestroy(),setTable())})};setTable()}function showPop(doctorData){$modal.open({animation:!0,templateUrl:"myModalContent.html",controller:"getOrdersCtrl",size:"lg",resolve:{doctorData:function(){return doctorData}}})}var groupId=localStorage.getItem("curGroupId");$scope.seeDetails=function(id){id&&($("#doctor_details").removeClass("hide"),$rootScope.winVisable=!0,Doctor.addData(id))};var dTable,keyWord,_chk,keyword,isSearching=!1;initTable()}),app.controller("getOrdersCtrl",function($scope,$modalInstance,$http,utils,doctorData,Doctor){function initTable(){var index=1,start=0,length=10,setTable=function(){var dTable=$("#ordersTable").dataTable({language:app.lang.datatables.translation,ordering:!1,searching:!1,draw:index,displayStart:start,lengthMenu:[10,15,20,30,40,50,100],pageLength:length,bServerSide:!0,sAjaxSource:app.urlRoot+"group/stat/orderMoney",fnServerData:function(sSource,aoData,fnCallback){$.ajax({type:"post",url:sSource,dataType:"json",data:{access_token:app.url.access_token,groupId:localStorage.getItem("curGroupId"),doctorId:doctorData.id,showOnJob:doctorData.showOnJob,pageIndex:index-1,pageSize:aoData[4].value},success:function(resp){for(var i=0;i<resp.data.pageData.length;i++)utils.extendHash(resp.data.pageData[i],["orderNo","name","statusName","telephone","money","time"]);var data={};data.recordsTotal=resp.data.total,data.recordsFiltered=resp.data.total,data.length=resp.data.pageSize,data.data=resp.data.pageData,console.log(resp),console.log(data);for(var i=0;i<data.data.length;i++)utils.extendHash(data.data[i],["orderNo","packName","name","telephone"]);fnCallback(data)}})},aoColumns:[{data:"orderNo",defaultContent:"",searchable:!1},{data:"packName",searchable:!1},{data:"name",orderable:!1,searchable:!1},{data:"telephone",searchable:!1},{data:"time",render:function(data){return data?utils.dateFormat(data,"yyyy年MM月dd日，hh点mm分"):""},orderable:!0,searchable:!1},{data:"money",searchable:!1}]});dTable.off().on("page.dt",function(e,settings){length=settings._iDisplayLength,index=settings._iDisplayStart/length+1,start=length*(index-1),dTable.fnDestroy(),setTable()}).on("length.dt",function(e,settings,len){index=1,start=0,length=len,dTable.fnDestroy(),setTable()})};setTable()}$scope.docName=doctorData.name,$scope.docIncome=doctorData.money,$scope.seeDetails=function(id){id&&($("#doctor_details").removeClass("hide"),$rootScope.winVisable=!0,Doctor.addData(id))},setTimeout(initTable,0),$scope.cancel=function(){$modalInstance.dismiss("cancel")}});