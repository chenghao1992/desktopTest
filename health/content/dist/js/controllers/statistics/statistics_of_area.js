"use strict";app.controller("AreaCtrl",function($rootScope,$scope,$http,$modal){function initProTable(res){res.data.forEach(function(item,index,array){void 0==item.id&&(item.name="其他")}),(setTable=function(){var provinceTable=$("#provinceTable").DataTable({language:app.lang.datatables.translation,destroy:!0,searching:!1,ordering:!1,paging:!1,data:res.data,columns:[{data:"name",render:function(data,type,row){return void 0==row.name?"":row.name}},{data:"value",render:function(data,type,row){return void 0==row.value?"":row.value}},{render:function(set,status,dt){return'<button id="showDetail" class="btn btn-xs btn-primary">查 询</button>'}}],createdRow:function(nRow,aData,iDataIndex){$(nRow).on("click","#showDetail",function(event){aData.showOnJob=showOnJob,showDetail(aData),event.stopPropagation()})}});_chk=$("#province_checkbox"),chk_val?(_chk.attr("checked",!0),chk_val=!0):(_chk.attr("checked",!1),chk_val=!1),_chk.off().click(function(){chk_val?(chk_val=!1,showOnJob=!1):(chk_val=!0,showOnJob=!0),InitChart(eChart),provinceTable.destroy(),setTable()})})()}function initCityTable(res){$("#cityTable").DataTable({destroy:!0,ordering:!1,searching:!1,paging:!1,language:app.lang.datatables.translation,bLengthChange:!1,data:res.data,columns:[{data:"name",render:function(data,type,row){return void 0==row.name?"":row.name}},{data:"value",render:function(data,type,row){return void 0==row.value?"":row.value}},{render:function(set,status,dt){return'<button id="showDetail" class="btn btn-xs btn-primary">查 询</button>'}}],createdRow:function(nRow,aData,iDataIndex){$(nRow).on("click","#showDetail",function(event){aData.showOnJob=showOnJob,showDetail(aData),event.stopPropagation()})}})}function initDisTable(res){$("#districtTable").DataTable({language:app.lang.datatables.translation,destroy:!0,ordering:!1,searching:!1,paging:!1,bLengthChange:!1,data:res.data,columns:[{data:"name",render:function(data,type,row){return void 0==row.name?"":row.name}},{data:"value",render:function(data,type,row){return void 0==row.value?"":row.value}},{render:function(set,status,dt){return'<button id="showDetail" class="btn btn-xs btn-primary">查 询</button>'}}],createdRow:function(nRow,aData,iDataIndex){$(nRow).on("click","#showDetail",function(event){aData.showOnJob=showOnJob,showDetail(aData),event.stopPropagation()})}})}function showDetail(aData){$modal.open({templateUrl:"StatisticsOfAreaModalContent.html",controller:"ofarea_docModalInstanceCtrl",windowClass:"modal-70-p",resolve:{items:function(){return aData}}})}function getPre(arr){return arr.slice(0,12)}var access_token=localStorage.getItem("access_token"),curGroupId=localStorage.getItem("curGroupId");require.config({paths:{echarts:"http://www.chinamediportal.com/static/health/echarts/dist"}});var _chk,setTable,eChart,chk_val=!0,showOnJob=!0,InitChart=function(ec){var option,myChart=ec.init(document.getElementById("main"),"macarons");$("#cityContent").css("visibility","hidden"),$("#districtContent").css("visibility","hidden"),$http.post(app.url.yiliao.doctorArea,{access_token:access_token,groupId:curGroupId,showOnJob:showOnJob,areaId:"",pageSize:100,pageIndex:0}).success(function(res){1==res.resultCode?(initProTable(res),option={tooltip:{trigger:"item",formatter:"{b} : {c} ({d}%)"},series:[{itemStyle:{normal:{label:{formatter:"{b} : {c}",show:!0},labelLine:{show:!0}}},name:"省级",type:"pie",radius:"25%",center:["50%","17%"],data:getPre(res.data)}]},myChart.setOption(option,!0)):alert(res.resultMsg)}).error(function(reponse){alert(reponse)});var ecConfig=require("echarts/config");myChart.on(ecConfig.EVENT.CLICK,function(param){if(void 0!=param.data.id){param.name;"省级"==param.seriesName?(document.getElementById("curProvince").innerHTML=param.name,$("#cityContent").css("visibility","visible"),$("#districtContent").css("visibility","hidden"),document.getElementById("curCity").innerHTML="",$http.post(app.url.yiliao.doctorArea,{access_token:access_token,groupId:curGroupId,showOnJob:showOnJob,areaId:param.data.id,pageSize:100,pageIndex:0}).success(function(res){1==res.resultCode?(initCityTable(res),option.series[1]={itemStyle:{normal:{label:{formatter:"{b} : {c}",show:!0},labelLine:{show:!0}}},name:"市级",type:"pie",radius:"25%",center:["50%","50%"],data:getPre(res.data)},option.series[2]={itemStyle:{normal:{label:{formatter:"{b} : {c}",show:!0},labelLine:{show:!0}}},name:"区级",type:"pie",radius:"25%",center:["50%","85%"],data:[]},myChart.setOption(option,!0)):alert(res.resultMsg)}).error(function(res){alert(res)})):"市级"==param.seriesName&&($("#districtContent").css("visibility","visible"),document.getElementById("curCity").innerHTML=param.name,$http.post(app.url.yiliao.doctorArea,{access_token:access_token,groupId:curGroupId,showOnJob:showOnJob,areaId:param.data.id,pageSize:100,pageIndex:0}).success(function(res){1==res.resultCode?(initDisTable(res),option.series[2]={itemStyle:{normal:{label:{formatter:"{b} : {c}",show:!0},labelLine:{show:!0}}},name:"区级",type:"pie",radius:"25%",center:["50%","85%"],data:getPre(res.data)},myChart.setOption(option,!0)):alert(res.resultMsg)}).error(function(res){alert(res)}))}})};require(["echarts","echarts/chart/pie"],function(ec){eChart=ec,InitChart(ec)})}),app.controller("ofarea_docModalInstanceCtrl",function($rootScope,$scope,$state,$http,utils,$modalInstance,items){function initDocsTable(){var index=0,length=10,start=0,size=10,setTable=function(){docsTable=$("#docsTable").DataTable({language:app.lang.datatables.translation,searching:!1,destroy:!0,lengthChange:!0,ordering:!1,draw:index,pageLength:length,lengthMenu:[5,10,20,50],autoWidth:!1,displayStart:start,bServerSide:!0,sAjaxSource:app.url.yiliao.statDoctor,fnServerData:function(sSource,aoData,fnCallback){console.log(sSource),$.ajax({type:"post",url:sSource,dataType:"json",data:params,success:function(resp){if(1==resp.resultCode){var data={};data.recordsTotal=resp.data.total,data.recordsFiltered=resp.data.total,data.length=resp.data.pageSize,data.data=resp.data.pageData,size=aoData[4].value,fnCallback(data)}else console.log(resp.resultMsg)}})},columns:[{render:function(set,status,dt){if(dt.headPicFileName)var path=dt.headPicFileName;else var path="src/img/a0.jpg";return'<img class="a-link" src="'+path+'"/></a>'}},{data:"name",defaultContent:""},{data:"doctorNum",defaultContent:""},{data:"title",defaultContent:""},{data:"telephone",defaultContent:""},{data:"remarks",defaultContent:""}]}),docsTable.off("page.dt").on("page.dt",function(e,settings){console.log("分页分页分页"),index=docsTable.page.info().page,start=length*(index-1),console.log(index),console.log(start),params.pageIndex=index}).on("length.dt",function(e,settings,len){length=len,index=0,start=0,params.pageIndex=0,params.pageSize=len})};setTable()}$scope.rowInfo=items;var docsTable,params;params=items.id?{access_token:app.url.access_token,groupId:localStorage.getItem("curGroupId"),type:3,showOnJob:$scope.rowInfo.showOnJob,typeId:items.id,pageIndex:0,pageSize:10}:{access_token:app.url.access_token,groupId:localStorage.getItem("curGroupId"),type:3,showOnJob:$scope.rowInfo.showOnJob,typeId:"",pageIndex:0,pageSize:10},setTimeout(initDocsTable,0),$scope.cancel=function(){$modalInstance.dismiss("cancel")}});