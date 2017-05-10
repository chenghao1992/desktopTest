app.controller("doctorKnowledgeInfoCtrl",function($scope,$timeout,utils,$http,$modal,toaster,$location,$state,$rootScope,$stateParams,$sce){function getArticleData(){$http.post(app.url.knowledge.getDetailById,{access_token:app.url.access_token,id:$stateParams.id}).success(function(data,status,headers,config){1==data.resultCode?$scope.article={id:data.data.id,url:$sce.trustAsResourceUrl(data.data.url+"?v="+Date.now())}:alert(data.resultMsg)}).error(function(data,status,headers,config){alert(data.resultMsg)})}$scope.showTop=!1,$scope.showQuitTop=!1,$scope.showEdit=!0,$scope.showDel=!0,$scope.isTops=$stateParams.isTop;var userId=localStorage.getItem("user_id");$scope.isPersonKnowledge="true"==$stateParams.isPersonKnowledge,$scope.isEditBeforeWidthcategoryId=$stateParams.categoryId,$scope.isSearchByAllCategory=$stateParams.isSearchByAllCategory,1==$scope.isTops?($scope.showTop=!1,$scope.showQuitTop=!0):0==$scope.isTops&&($scope.showTop=!0,$scope.showQuitTop=!1),getArticleData(),$scope.deleteArticle=function(){var modalInstance=$modal.open({templateUrl:"delModalContent.html",controller:"delModalInstanceCtrl",size:"sm"});modalInstance.result.then(function(status){"ok"==status&&$http.post(app.url.knowledge.delKnowledgeById,{access_token:app.url.access_token,id:$stateParams.id}).success(function(data,status,headers,config){1==data.resultCode?(toaster.pop("success",null,"删除就医知识成功"),$state.go("app.doctorKnowledge.list")):console.log(data.resultMsg)}).error(function(data,status,headers,config){alert(data.resultMsg)})},function(){})},$scope.topArticle=function(){$http.post(app.url.knowledge.setTop,{access_token:app.url.access_token,id:$stateParams.id||"",bizId:userId}).success(function(data,status,headers,config){1==data.resultCode?0==data.data.status?toaster.pop("error","",data.data.msg):(toaster.pop("success",null,"置顶成功"),$scope.showTop=!1,$scope.showQuitTop=!0):alert(data.resultMsg)}).error(function(data,status,headers,config){console.log(data.resultMsg)})},$scope.quitTopArticle=function(){$http.post(app.url.knowledge.cancelTop,{access_token:app.url.access_token,id:$stateParams.id||"",bizId:userId}).success(function(data,status,headers,config){1==data.resultCode?0==data.data.status?toaster.pop("error","",data.data.msg):(toaster.pop("success",null,"取消置顶成功"),$scope.showTop=!0,$scope.showQuitTop=!1):alert(data.resultMsg)}).error(function(data,status,headers,config){console.log(data.resultMsg)})},$scope.editArticle=function(){$state.go("app.doctorKnowledge.edit",{id:$stateParams.id,categoryId:$stateParams.categoryId,isPersonKnowledge:$stateParams.isPersonKnowledge})}}),app.controller("delModalInstanceCtrl",function($scope,$modalInstance,toaster,$http,utils){$scope.ok=function(){$modalInstance.close("ok")},$scope.cancel=function(){$modalInstance.dismiss("cancel")}});