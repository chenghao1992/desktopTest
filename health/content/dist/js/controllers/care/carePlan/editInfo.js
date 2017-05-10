!function(){function EditCareInfoFtory($http,$modal){function openModel(planData,callBack){planData||(planData={});var modalInstance=$modal.open({animation:!0,templateUrl:function(){var isChack=window.location.href.indexOf("/check/");return isChack!=-1?"../src/tpl/care/carePlan/editInfo.html":"src/tpl/care/carePlan/editInfo.html"}(),controller:"EditCareInfoCtrl",size:"lg",resolve:{planData:function(){return planData}}});modalInstance.result.then(function(planData){callBack&&callBack(planData)})}return{open:openModel}}function EditCareInfoCtrl($scope,$http,$state,$modal,$modalInstance,toaster,planData){function getPriceRange(){$http.post(app.urlRoot+"group/fee/getGroupFee",{access_token:app.url.access_token,groupId:app.url.groupId()}).then(function(rpn){1===rpn.data.resultCode&&(rpn.data.data&&rpn.data.data.carePlanMax>=0&&rpn.data.data.carePlanMin>=0?($scope.carePlanMax=rpn.data.data.carePlanMax/100,$scope.carePlanMin=rpn.data.data.carePlanMin/100):($scope.carePlanMax=0,$scope.carePlanMin=0))})}function diseaseSelected(selected){selected&&selected[0]&&$scope.$apply(function(){$scope.planData.diseaseTypeId=selected[0].id,$scope.planData.diseaseTypeName=selected[0].name})}function pushPlan(planData){var param=planData;planData.price=100*(planData.price||0),param.access_token=app.url.access_token,param.groupId=app.url.groupId(),param.price<0&&(param.price=0),$http({url:app.urlRoot+"designer/saveCarePlan",method:"post",data:param}).then(function(response){var rep=response.data;rep&&1==rep.resultCode?(toaster.pop("success",null,"保存成功"),1==rep.data.tmpType&&$state.go("app.carePlan",{planId:rep.data.id}),2==rep.data.tmpType&&$state.go("app.followUp",{planId:rep.data.id}),$modalInstance.close(rep.data)):rep&&rep.resultMsg?toaster.pop("error",null,rep.resultMsg):(toaster.pop("error",null,"保存失败"),console.error(rep))})}function checkData(){var _checkData=$scope.planData;if(!_checkData.name)return toaster.pop("error",null,"请输入计划名称"),!1;if(_checkData.name.length>40)return toaster.pop("error",null,"计划名称过长"),!1;if(!_checkData.diseaseTypeId)return toaster.pop("error",null,"请选择病种"),!1;if(1==_checkData.tmpType){if(null===_checkData.price||""===_checkData.price||void 0===_checkData.price||_checkData.price<$scope.carePlanMin||_checkData.price>$scope.carePlanMax)return toaster.pop("error",null,"请输入正确的价格"),!1;if(!_checkData.titlePic)return toaster.pop("error",null,"请上传题图"),!1;if(!_checkData.content)return toaster.pop("error",null,"请输入正文"),!1}return _checkData.executeTime?_checkData.executeTime<0?(toaster.pop("error",null,"请填写正确的执行天数"),!1):_checkData.digest?!(_checkData.digest.length>80)||(toaster.pop("error",null,"计划摘要过长"),!1):(toaster.pop("error",null,"请输入摘要"),!1):(toaster.pop("error",null,"请输入执行时长"),!1)}planData.id?$scope.planData={id:planData.id,name:planData.name,diseaseTypeName:planData.diseaseTypeName,diseaseTypeId:planData.diseaseTypeId,price:(planData.price||0)/100,executeTime:planData.executeTime,titlePic:planData.titlePic,digest:planData.digest,content:planData.content,tmpType:planData.tmpType}:$scope.planData={titlePic:"http://"+window.location.hostname+"/health/web/src/img/careDefault.jpg",tmpType:planData.tmpType,digest:"为您提供病情跟踪提醒、用药提醒、检查提醒、生活质量追踪、医生调查问题、相关提醒多种贴心健康信息服务。",content:"<p>为您提供院外的全程看顾，通过手机智能提醒，反馈康复情况，避免反复去医院复诊。 <p><p>提供的服务：</p><p>1、持续性的跟踪与专业指导，促进疾病的康复</p><p>2、就医提醒：定期提醒，防止疾病的复发或恶化</p><p>3、康复指导：贴心、全面的康复指导，促进患者的康复</p><p>4、疾病知识：通俗易懂的疾病知识普及，有利于疾病的预防</p>"},getPriceRange(),$scope.chooseType=function(){new DataBox("data_res",{hasCheck:!1,allCheck:!1,leafCheck:!0,multiple:!1,allHaveArr:!1,self:!1,cover:!1,leafDepth:3,selectView:!1,search:{dataKey:{name:"name",id:"id",union:"parentId",dataSet:"data"},unwind:!1},arrType:[0,0],data:{url:app.url.document.getDiseaseTree},titles:{main:"选择病种",searchKey:"搜索病种...",label:"已选择病种数"},fixdata:[],icons:{arrow:"fa fa-caret-right/fa fa-caret-down",check:"fa fa-check/fa fa-square",root:"fa fa-hospital-o cfblue",branch:"fa fa-h-square cfblue",leaf:"fa fa-stethoscope dcolor",head:"headPicFileName"},response:diseaseSelected,datakey:{id:"id",name:"name",sub:"children"},info:{name:"name",id:"id",leaf:"leaf",pid:"parentId"}})},$scope.removeImg=function(){$scope.planData.titlePic=""},$scope.cancel=function(){$modalInstance.dismiss("cancel")},$scope.saveDoc=function(){checkData()&&pushPlan($scope.planData)},$scope.qiniuFilters={mime_types:[{title:"Image files",extensions:"jpg,gif,png"}]},$scope.token=app.url.access_token,$scope.uploaderAdded=function(up,files){$scope.planData.titlePic=null},$scope.progressCallBack=function(up,file){$scope.imgFile=file,console.log($scope.imgFile)},$scope.uploaderSuccess=function(up,file,info){$scope.$apply(function(){$scope.planData.titlePic=file.url}),$scope.fileList=[]},$scope.uploaderError=function(up,err,errTip){toaster.pop("error",null,errTip)},$scope.config={file:{urlParams:""}}}angular.module("app").factory("EditCareInfoFtory",EditCareInfoFtory),EditCareInfoFtory.$inject=["$http","$modal"],angular.module("app").controller("EditCareInfoCtrl",EditCareInfoCtrl)}();