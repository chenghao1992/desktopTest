"use strict";app.controller("StatisticOfReport",["$rootScope","$scope","$state","$timeout","$http","utils",function($rootScope,$scope,$state,$timeout,$http,utils){function initTable(){var index=1,start=0,length=1*utils.localData("page_length")||10,setTable=function(){table=$("#table_of_group"),dTable=table.dataTable({draw:index,displayStart:start,lengthMenu:[5,10,15,20,30,40,50,100],pageLength:length,bServerSide:!0,sAjaxSource:url,fnServerData:function(sSource,aoData,fnCallback){param.pageIndex=index-1,param.pageSize=aoData[4].value,param.access_token=app.url.access_token,$http({method:"post",url:sSource,data:param}).then(function(resp){resp=resp.data.data;for(var i=0;i<resp.pageData.length;i++)utils.extendHash(resp.pageData[i],["keyYM","totalNum","totalMoney"]);resp.start=resp.start,resp.recordsTotal=resp.total,resp.recordsFiltered=resp.total,resp.length=resp.pageSize,resp.data=resp.pageData,fnCallback(resp),$scope.loading=!1,$rootScope.loaded=!0})},searching:!1,language:app.lang.datatables.translation,createdRow:function(nRow,aData,iDataIndex){var btn=$(nRow).find("button");btn.click(function(){$scope.seeDetails(aData.month)})},columns:[{data:"month",orderable:!1,searchable:!1},{data:"totalNum",orderable:!1,searchable:!1},{data:"totalMoney",orderable:!1,searchable:!1,render:function(set,status,dt){return(set/100).toFixed(2)}},{orderable:!1,searchable:!1,render:function(set,status,dt){return'<button class="btn btn-info">查询记录</button>'}}]}),dTable.off().on("init.dt",function(){table.find("tr[data-id="+$rootScope.curRowId+"]").addClass("currentRow")}).on("length.dt",function(e,settings,len){index=1,start=0,length=len,dTable.fnDestroy(),setTable(),utils.localData("page_length",len)}).on("page.dt",function(e,settings){isSearching||(index=settings._iDisplayStart/length+1)})};setTable()}var groupId=utils.localData("curGroupId"),url=app.url.finance.gIncomeListNew,param={groupId:groupId};$scope.seeDetails=function(date){date&&$state.go("app.finance.reports",{name:"group",date:date},{reload:!1})},$scope.goBack=function(){window.history.back()};var table,dTable;initTable()}]);