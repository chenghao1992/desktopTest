!function(){function AddCheckDocReplyFtory($http,$modal){function openModel(replyData,callBack){replyData||(replyData={});var modalInstance=$modal.open({animation:!0,templateUrl:function(){var isChack=window.location.href.indexOf("/check/");return isChack!=-1?"../src/tpl/care/carePlan/addCheckDocReply.html":"src/tpl/care/carePlan/addCheckDocReply.html"}(),controller:"AddCheckDocReplyCtrl",size:"md",resolve:{replyData:function(){return replyData}}});modalInstance.result.then(function(replyData){callBack&&callBack(replyData)})}return{open:openModel}}function AddCheckDocReplyCtrl($scope,$http,$modal,$modalInstance,toaster,replyData){function submitReplyData(data){$http.post(app.urlRoot+"designer/saveDoctorReply",{access_token:app.url.access_token,careItemId:$scope.replyData.careItemId,doctorReply:$scope.replyData.doctorReply}).then(function(rpn){rpn=rpn.data,rpn&&1==rpn.resultCode?(toaster.pop("success",null,"设置成功"),$modalInstance.close(rpn.data)):rpn&&rpn.resultMsg?toaster.pop("error",null,rpn.resultMsg):(toaster.pop("error",null,"获取计划数据出错"),console.error(rpn))})}$scope.replyData=replyData,$scope.cancel=function(){$modalInstance.dismiss("cancel")},$scope.ok=function(){return $scope.replyData.doctorReply?void submitReplyData($scope.replyData):toaster.pop("error",null,"请输入回复内容")}}angular.module("app").factory("AddCheckDocReplyFtory",AddCheckDocReplyFtory),AddCheckDocReplyFtory.$inject=["$http","$modal"],angular.module("app").controller("AddCheckDocReplyCtrl",AddCheckDocReplyCtrl)}();