!function(){function AddSurveyFtory($http,$modal){function openModel(surveyData,callBack){surveyData||(surveyData={});var modalInstance=$modal.open({animation:!0,templateUrl:function(){var isChack=window.location.href.indexOf("/check/");return isChack!=-1?"../src/tpl/care/carePlan/addText.html":"src/tpl/care/carePlan/addText.html"}(),controller:"AddSurveyTextCtrl",size:"lg",resolve:{surveyData:function(){return surveyData}}});modalInstance.result.then(function(surveyData){callBack&&callBack(surveyData)})}return{open:openModel}}function AddSurveyTextCtrl($scope,$http,$modal,$modalInstance,toaster,surveyData){function setTree(){var textUrl,param;1==$scope.selectItemIscheck?(textUrl=app.yiliao+"document/getHealthSienceDocumentType",param={access_token:app.url.access_token}):(textUrl=app.yiliao+"knowledge/getCategoryList",param={access_token:app.url.access_token,groupId:app.url.groupId()});var contacts=new Tree("lifeTexeLibraryTree",{hasCheck:!1,allCheck:!1,multiple:!1,allHaveArr:!1,self:!0,search:!1,arrType:[1,0],data:{url:textUrl,param:param},datakey:{id:"id",name:"name",sub:"children"},info:{name:"name",id:"id",pid:"department",leaf:"leaf",code:"code"},root:{selectable:!0,name:"全部",id:null},events:{click:treeClick},callback:function(){var dts=contacts.tree.find("dt");dts&&dts.eq(0)&&dts.eq(0).data()&&dts.eq(0).data().info&&treeClick(dts.eq(0).data().info)}})}function treeClick(iTems){$scope.search.keyword="",$scope.stItems=iTems,$scope.pageIndex=1,setTable(iTems)}function setTable(iTems,pageIndex,pageSize){if(0==$scope.selectItemIscheck){var textUrl;textUrl=iTems.id?app.yiliao+"knowledge/getKnowledgeListByCategoryId":1==$scope.ischeckDoc?app.yiliao+"knowledge/findKnowledgeListByKeys":app.yiliao+"knowledge/getGroupMedicalKnowledgeList",$http.post(textUrl,{access_token:app.url.access_token,groupId:app.url.groupId(),keywords:$scope.search.keyword||"",diseaseTypeId:iTems.id||$scope.diseaseTypeId||"",categoryId:iTems.id||$scope.diseaseTypeId||"",pageIndex:pageIndex-1||$scope.pageIndex-1||0,pageSize:pageSize||$scope.pageSize||10}).then(function(rpn){if(rpn=rpn.data,1===rpn.resultCode){if($scope.surveyList=rpn.data.pageData,$scope.page_count=rpn.data.total,0==$scope.page_count)return void toaster.pop("error",null,"未找到相关的文章")}else rpn.resultMsg?toaster.pop("error",null,rpn.resultMsg):toaster.pop("error",null,"接口出错")})}else{var textUrl=app.yiliao+"document/getHealthSicenceDocumentList";$http.get(textUrl,{params:{access_token:app.url.access_token,kw:$scope.search.keyword||"",contentType:iTems.code||$scope.stItems.code||"",pageIndex:pageIndex-1||$scope.pageIndex-1||0,pageSize:pageSize||$scope.pageSize||10}}).then(function(rpn){rpn=rpn.data,1===rpn.resultCode?rpn.data?($scope.surveyList=rpn.data.pageData,$scope.page_count=rpn.data.total):toaster.pop("error",null,"未找到相关的文章"):rpn.resultMsg?toaster.pop("error",null,rpn.resultMsg):toaster.pop("error",null,"接口出错")})}}function submitsurveyData(data){var param={};if(1==$scope.selectItemIscheck)if(data)param={access_token:app.url.access_token,sendTime:$scope.surveyData.sendTime,carePlanId:$scope.surveyData.carePlanId,schedulePlanId:$scope.surveyData.schedulePlanId,dateSeq:$scope.surveyData.dateSeq,jsonData:JSON.stringify({documentId:data.id,fromTypeId:0,title:data.title,picUrl:data.copy,url:data.url})};else{if(!$scope.surveyData.surveyItem)return toaster.pop("error",null,"请选择文章");param={access_token:app.url.access_token,sendTime:$scope.surveyData.sendTime,carePlanId:$scope.surveyData.carePlanId,schedulePlanId:$scope.surveyData.schedulePlanId,dateSeq:$scope.surveyData.dateSeq,jsonData:JSON.stringify({documentId:$scope.surveyData.surveyItem.documentId,fromTypeId:$scope.surveyData.surveyItem.fromTypeId,title:$scope.surveyData.surveyItem.title,picUrl:$scope.surveyData.surveyItem.picUrl,url:$scope.surveyData.surveyItem.url})}}else if(data)param={access_token:app.url.access_token,sendTime:$scope.surveyData.sendTime,carePlanId:$scope.surveyData.carePlanId,schedulePlanId:$scope.surveyData.schedulePlanId,dateSeq:$scope.surveyData.dateSeq,jsonData:JSON.stringify({documentId:data.id,fromTypeId:1,title:data.title,picUrl:data.copy,url:data.url})};else{if(!$scope.surveyData.surveyItem)return toaster.pop("error",null,"请选择文章");param={access_token:app.url.access_token,sendTime:$scope.surveyData.sendTime,carePlanId:$scope.surveyData.carePlanId,schedulePlanId:$scope.surveyData.schedulePlanId,dateSeq:$scope.surveyData.dateSeq,jsonData:JSON.stringify({documentId:$scope.surveyData.surveyItem.documentId,fromTypeId:$scope.surveyData.surveyItem.fromTypeId,title:$scope.surveyData.surveyItem.title,picUrl:$scope.surveyData.surveyItem.picUrl,url:$scope.surveyData.surveyItem.url})}}$scope.surveyData.id&&(param.id=$scope.surveyData.id),$http.post(app.yiliao+"designer/saveDocumentItem",param).success(function(rpn){1==rpn.resultCode?(toaster.pop("success",null,"添加成功"),$modalInstance.close(rpn.data)):toaster.pop("success",null,"请选择文章")})}if($scope.selectItemIscheck=!0,$scope.selectItemGroupID=app.url.groupId(),$scope.search={keyword:""},$scope.stItems=null,$scope.selectItem={},surveyData){if(surveyData.surveyItem){var test=surveyData.surveyItem.fromTypeId;1==test&&($scope.selectItemIscheck=!1)}$scope.selectItem=surveyData,$scope.surveyData=surveyData}$scope.funTextkepu=function(){$scope.selectItemIscheck=!0,$scope.pageIndex=1,setTree(),$scope.selectItem.lifeScaleId=null},$scope.funTextzhishi=function(){$scope.selectItemIscheck=!1,$scope.pageIndex=1,setTree(),$scope.selectItem.lifeScaleId=null},setTimeout(setTree,0),$scope.queryReportList=function(textContent){$scope.search.keyword=textContent,$scope.ischeckDoc=!0,setTable("")},$scope.cancel=function(){$modalInstance.dismiss("cancel")},$scope.diseaseTypeId="",$scope.diseaseName="",$scope.pageIndex=1,$scope.pageSize=10,$scope.ok=function(){submitsurveyData($scope.selectItem.lifeScaleId)},$scope.selectLifeQuality=function(item){$scope.selectItem={lifeScaleId:item}},$scope.setTable=setTable,$scope.surveyCheck=function(lifeScaleId){var itemType;itemType=1==$scope.selectItemIscheck?1:2;var modalInstance=$modal.open({animation:!0,templateUrl:"addTextDomeChickCtrl.html",controller:"ModalSurveyTextChickCtrl",size:"lg",resolve:{itemId:function(){return lifeScaleId},itemType:function(){return itemType}}});modalInstance.result.then(function(selectedItem){},function(){})},$scope.setTable=function(a,pageindex,pagesize){$scope.ischeckPage=!0,setTable($scope.stItems,pageindex,pagesize)},$scope.pageChanged=function(){setTable($scope.stItems)}}angular.module("app").factory("addTextDomeFtory",AddSurveyFtory),AddSurveyFtory.$inject=["$http","$modal"],angular.module("app").controller("AddSurveyTextCtrl",AddSurveyTextCtrl)}(),app.controller("ModalSurveyTextChickCtrl",function($scope,$http,$modal,$modalInstance,toaster,itemId,itemType){var textUrl;textUrl=1==itemType?app.yiliao+"document/getDocumentDetail":app.yiliao+"knowledge/getDetailById",$http.post(textUrl,{access_token:app.url.access_token,id:itemId}).success(function(rpn){1===rpn.resultCode?($scope.surveyData=rpn.data,console.log($scope.surveyData)):rpn.resultMsg?toaster.pop("error",null,rpn.resultMsg):toaster.pop("error",null,"接口出错")}),$scope.cancel=function(){$modalInstance.dismiss("cancel")}});