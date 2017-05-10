"use strict";app.controller("DiseaseSettingCtrl",function($rootScope,$scope,$state,$http,$compile,utils,modal,toaster){function makeList(data){console.log(data),$scope.dataDom=data,$scope.$apply($scope.dataDom)}function pickData(){new DataBox("data_res",{hasCheck:!0,allCheck:!0,leafCheck:!0,multiple:!0,allHaveArr:!1,self:!1,cover:!1,leafDepth:2,selectView:!0,search:{url:"",param:{},dataKey:{name:"name",id:"id",union:"parentId",dataSet:"data.data"},unwind:!1},arrType:[1,1,0],data:{url:app.yiliao+"base/getDiseaseTree"},titles:{main:"选择病种",searchKey:"搜索病种...",label:"已选择病种数"},icons:{arrow:"fa fa-caret-right/fa fa-caret-down",check:"fa fa-check/fa fa-square",root:"fa fa-hospital-o cfblue",branch:"fa fa-h-square cfblue",leaf:"fa fa-stethoscope dcolor",head:"headPicFileName"},fixdata:$scope.dataDom,response:makeList,datakey:{id:"id",name:"name",sub:"children"},info:{name:"name",id:"id",leaf:"leaf"}})}function setEditor(){$scope.addData=function(){pickData()},$scope.saveData=function(){var ids=[];$scope.dataDom.forEach(function(item,index,array){ids.push(item.id)}),$http.post(app.yiliao+"group/settings/setSpecialty",{access_token:localStorage.getItem("access_token"),docGroupId:localStorage.getItem("curGroupId"),specialtyIds:ids}).success(function(data){1===data.resultCode?(console.log(data),$scope.result=!0,toaster.pop("success",null,"保存成功！")):($scope.result=!1,console.log(data),toaster.pop("error",null,"保存失败！"))}).error(function(data){console.log(data)})},$scope.removeItem=function(item){var index=$scope.dataDom.indexOf(item);$scope.dataDom.splice(index,1),console.log($scope.dataDom)}}var cnt_list=$("#cnt_list");cnt_list.find(".list-group-item"),utils.localData("curGroupId");$scope.dataDom=null,$scope.loading=!0,$http.post(app.url.yiliao.getDiseaseLabel,{access_token:localStorage.getItem("access_token"),docGroupId:localStorage.getItem("curGroupId")}).success(function(data){data.data.length>0?($scope.loading=!1,data.data.map(function(e){return e.id=e.diseasesId,e.name=e.diseasesName,delete e.diseasesId,delete e.diseasesName,e}),console.log(data.data),$scope.dataDom=data.data):($scope.loading=!1,console.log(data)),setEditor()}).error(function(data){console.log(data)})});