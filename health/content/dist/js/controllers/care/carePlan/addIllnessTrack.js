!function(){function AddIllnessTrackFtory($http,$modal){function selectBox(illnessTrackData,callBack){illnessTrackData||(illnessTrackData={});var modalInstance=$modal.open({animation:!0,templateUrl:function(){var isChack=window.location.href.indexOf("/check/");return isChack!=-1?"../src/tpl/care/carePlan/addIllnessTrack/selectBox.html":"src/tpl/care/carePlan/addIllnessTrack/selectBox.html"}(),controller:"AddIllnessTrackSelectCtrl",size:"md",resolve:{illnessTrackData:function(){return illnessTrackData},callBack:function(){return callBack||{}}}});modalInstance.result.then(function(){$modalInstance.dismiss("cancel")})}function createIllnessTrack(illnessTrackData,callBack){illnessTrackData||(illnessTrackData={});var modalInstance=$modal.open({animation:!0,templateUrl:function(){var isChack=window.location.href.indexOf("/check/");return isChack!=-1?"../src/tpl/care/carePlan/addIllnessTrack/createIllnessTrack.html":"src/tpl/care/carePlan/addIllnessTrack/createIllnessTrack.html"}(),controller:"CreateIllnessTrackCtrl",windowClass:"docModal doc",resolve:{illnessTrackData:function(){return illnessTrackData}}});modalInstance.result.then(function(illnessTrackData){callBack&&callBack(illnessTrackData)})}function illnessTrackLibrary(illnessTrackData,callBack){illnessTrackData||(illnessTrackData={});var modalInstance=$modal.open({animation:!0,templateUrl:function(){var isChack=window.location.href.indexOf("/check/");return isChack!=-1?"../src/tpl/care/carePlan/addIllnessTrack/illnessTrackLibary.html":"src/tpl/care/carePlan/addIllnessTrack/illnessTrackLibary.html"}(),controller:"AddIllnessTrackLibraryCtrl",size:"lg",resolve:{illnessTrackData:function(){return illnessTrackData}}});modalInstance.result.then(function(illnessTrackData){callBack&&callBack(illnessTrackData)})}function triggerMsg(triggerMsgData,callBack){triggerMsgData||(triggerMsgData={});var modalInstance=$modal.open({animation:!0,templateUrl:function(){var isChack=window.location.href.indexOf("/check/");return isChack!=-1?"../src/tpl/care/carePlan/addIllnessTrack/addTriggerMsg.html":"src/tpl/care/carePlan/addIllnessTrack/addTriggerMsg.html"}(),controller:"AddTriggerMsgCtrl",size:"lg",resolve:{triggerMsgData:function(){return triggerMsgData}}});modalInstance.result.then(function(triggerMsgData){callBack&&callBack(triggerMsgData)})}function repeatAsk(repeatAskData,callBack){repeatAskData||(repeatAskData={});var modalInstance=$modal.open({animation:!0,templateUrl:function(){var isChack=window.location.href.indexOf("/check/");return isChack!=-1?"../src/tpl/care/carePlan/addIllnessTrack/repeatAsk.html":"src/tpl/care/carePlan/addIllnessTrack/repeatAsk.html"}(),controller:"RepeatAskCtrl",size:"lg",resolve:{repeatAskData:function(){return repeatAskData}}});modalInstance.result.then(function(repeatAskData){callBack&&callBack(repeatAskData)})}function editTips(tipsData,callBack){tipsData||(tipsData={});var modalInstance=$modal.open({animation:!0,templateUrl:function(){var isChack=window.location.href.indexOf("/check/");return isChack!=-1?"../src/tpl/care/carePlan/addIllnessTrack/editTips.html":"src/tpl/care/carePlan/addIllnessTrack/editTips.html"}(),controller:"EditTipsCtrl",size:"md",resolve:{tipsData:function(){return tipsData}}});modalInstance.result.then(function(tipsData){callBack&&callBack(tipsData)})}function copyMsg(item){var modalInstance=$modal.open({animation:!0,templateUrl:function(){return"src/tpl/care/carePlan/addIllnessTrack/copyMsg.html"}(),controller:"copyMsgCtrl",size:"md",resolve:{item:function(){return item}}});modalInstance.result.then(function(item){callBack&&callBack(item)})}return{selectBox:selectBox,illnessTrackLibrary:illnessTrackLibrary,createIllnessTrack:createIllnessTrack,triggerMsg:triggerMsg,repeatAsk:repeatAsk,editTips:editTips,copyMsg:copyMsg}}function AddIllnessTrackSelectCtrl($scope,$http,$modal,$modalInstance,toaster,AddIllnessTrackFtory,illnessTrackData,callBack){$scope.create=function(){function _callBack(illnessTrackData){callBack()}AddIllnessTrackFtory.createIllnessTrack(illnessTrackData,_callBack),$modalInstance.dismiss("cancel")},$scope.openLibary=function(){function _callBack(illnessTrackData){callBack()}AddIllnessTrackFtory.illnessTrackLibrary(illnessTrackData,_callBack),$modalInstance.dismiss("cancel")}}function CreateIllnessTrackCtrl($scope,$http,$modal,$modalInstance,toaster,illnessTrackData,editableThemes,editableOptions,Lightbox){function updateIllnessTrackQuestion(){var json={name:$scope.illnessTrack.name,repeatAsk:$scope.illnessTrack.repeatAsk,options:$scope.illnessTrack.options,picUrls:$scope.titleImgs},param={access_token:app.url.access_token,questionId:$scope.illnessTrack.id,sendTime:$scope.illnessTrackData.sendTime,jsonData:JSON.stringify(json)};$http.post(app.urlRoot+"designer/updateIllnessTrackQuestion",param).then(function(rpn){rpn=rpn.data,rpn&&1==rpn.resultCode?(toaster.pop("success",null,"修改成功"),$modalInstance.close(rpn.data)):rpn&&rpn.resultMsg?toaster.pop("error",null,rpn.resultMsg):(toaster.pop("error",null,"获取计划数据出错"),console.error(rpn))})}function submitReplyData(){console.log("test"+$scope.illnessTrack);var json={name:$scope.illnessTrack.name,repeatAsk:$scope.illnessTrack.repeatAsk,options:$scope.illnessTrack.options,picUrls:$scope.titleImgs},param={access_token:app.url.access_token,sendTime:$scope.illnessTrackData.sendTime,carePlanId:$scope.illnessTrackData.carePlanId,schedulePlanId:$scope.illnessTrackData.schedulePlanId,dateSeq:$scope.illnessTrackData.dateSeq,jsonData:JSON.stringify(json)};$scope.illnessTrackData.id&&(param.id=$scope.illnessTrackData.id),$http.post(app.urlRoot+"designer/saveIllnessTrack",param).then(function(rpn){rpn=rpn.data,rpn&&1==rpn.resultCode?(toaster.pop("success",null,"添加成功"),console.log(rpn),$modalInstance.close(rpn.data)):rpn&&rpn.resultMsg?toaster.pop("error",null,rpn.resultMsg):(toaster.pop("error",null,"获取计划数据出错"),console.error(rpn))})}editableThemes.bs3.inputClass="input-xs",editableThemes.bs3.buttonsClass="btn-xs",editableOptions.theme="bs3",$scope.illnessTrackData=illnessTrackData,$scope.titleImgs=illnessTrackData.question?illnessTrackData.question.picUrls:[],$scope.openLightboxModal=function(index){Lightbox.openModal($scope.titleImgs,index)},$scope.openSingleLightboxModal=function(index,item){Lightbox.openModal(item,0)},$scope.qiniuFilters={mime_types:[{title:"Image files",extensions:"jpg,gif,png"}]},$scope.selectFile=function(e){$scope.titleImgs>=8||("uploadTotalPics"==e?$scope.selectPicItem="isUploadTotalPic":"isHeadTitlePic"!=e?($scope.selectPicItem=e,$scope.selectPicItem.picUrls||($scope.selectPicItem.picUrls=[])):($scope.selectPicItem="isHeadTitlePic",$scope.titleImgs=$scope.titleImgs||[]),$scope.upload())},$scope.removeItemImg=function(item){$scope.titleImgs.splice(item,1)},$scope.fileUploadProcess=function(up,file){"isUploadTotalPic"==$scope.selectPicItem?$scope.uploadTotalPicsPercent=0:"isHeadTitlePic"!=$scope.selectPicItem?$scope.selectPicItem.uploadPercent=100==file.percent?99:file.percent:$scope.titlePicUrlUlPenct=100==file.percent?99:file.percent},$scope.removeOptionImg=function(item){item.picUrls=[],item.uploadPercent=0},$scope.token=app.url.access_token,$scope.uploaderAdded=function(up,files){$scope.totalUploadFilesNum=files.length,$scope.titlePicUrlUlPenct=0,"isUploadTotalPic"==$scope.selectPicItem?$scope.uploadTotalPicsPercent=0:"isHeadTitlePic"!=$scope.selectPicItem&&($scope.selectPicItem.uploadPercent=0)},$scope.uploaderSuccess=function(up,file,info){function getImageInfo(callback){$http.get(file.url+"?imageInfo").then(function(rpn){rpn?(imageInfo=rpn.data,callback()):console.log("something happened unexpected")})}function setPicInfo(){"isUploadTotalPic"==$scope.selectPicItem?($scope.isEditNew=!1,$scope.isEditNew?($scope.illnessTrack.options=[],$scope.illnessTrack.options.push({seq:$scope.illnessTrack.options.length+1,name:"选项名称",level:"1",appendQuestions:[],picUrls:[file.url+"?xgWidth="+imageInfo.width+"&xgHeight="+imageInfo.height+"&xgFormat="+imageInfo.format+"&xgKey="+info.key]}),$scope.isEditNew=!1):$scope.illnessTrack.options.push({seq:$scope.illnessTrack.options[$scope.illnessTrack.options.length-1].seq+1,name:"选项名称",level:"1",appendQuestions:[],picUrls:[file.url+"?xgWidth="+imageInfo.width+"&xgHeight="+imageInfo.height+"&xgFormat="+imageInfo.format+"&xgKey="+info.key]})):"isHeadTitlePic"!=$scope.selectPicItem?($scope.selectPicItem.picUrls[0]=file.url+"?xgWidth="+imageInfo.width+"&xgHeight="+imageInfo.height+"&xgFormat="+imageInfo.format+"&xgKey="+info.key,$scope.selectPicItem.uploadPercent=100):($scope.titleImgs.push(file.url+"?xgWidth="+imageInfo.width+"&xgHeight="+imageInfo.height+"&xgFormat="+imageInfo.format+"&xgKey="+info.key),$scope.titlePicUrlUlPenct=100),$scope.copy_small=file.url+"?imageView2/3/w/200/h/200",toaster.pop("success",null,"题图上传成功！")}if($scope.totalUploadFilesNum--,$scope.titleImgs&&$scope.titleImgs.length>=8&&"isHeadTitlePic"==$scope.selectPicItem)return void toaster.pop("error",null,"最多上传8张题目图片");var info=JSON.parse(info),imageInfo={};getImageInfo(setPicInfo)},$scope.closeModal=function(){$modalInstance.dismiss("cancel")},$scope.uploaderError=function(up,err,errTip){toaster.pop("error",null,"题图大于2M，请重新上传"),"-600"==err.code?toaster.pop("error",null,"题图大于2M，请重新上传"):toaster.pop("error",null,errTip)},illnessTrackData.question?$scope.illnessTrack=illnessTrackData.question:($scope.illnessTrack={name:"题目名称",options:[{seq:"1",name:"选项名称",level:"1",appendQuestions:[],picUrls:[]},{seq:"2",name:"选项名称",level:"1",appendQuestions:[],picUrls:[]}],picUrls:$scope.titleImgs||[]},$scope.isEditNew=!0),$scope.addOption=function(){$scope.illnessTrack.options.push({seq:$scope.illnessTrack.options[$scope.illnessTrack.options.length-1].seq+1,name:"选项名称",level:"1",appendQuestions:[],picUrls:[]})},$scope.removeItem=function(item,arry){var index=arry.indexOf(item);arry.splice(index,1)},$scope.addAppendQuestion=function(option){option.appendQuestions||(option.appendQuestions=[]),option.appendQuestions.push({name:"追加题目名称",options:[{name:"选项名称"},{name:"选项名称"}]})},$scope.addAppendOption=function(question){question.options.push({name:"选项名称"})},$scope.copyAppendQuestion=function(question,questions){var index=questions.indexOf(question);questions.splice(index+1,0,{name:question.name,options:function(){return angular.copy(question.options)}()})},$scope.optionChange=function(option,arry){var index=arry.indexOf(option.levelName);option.level=index+1},$scope.exchangeItem=function(moveItem,replaceItem,arry){var mIndex=arry.indexOf(moveItem),rIndex=arry.indexOf(replaceItem);arry.splice(rIndex,1,moveItem),arry.splice(mIndex,1,replaceItem)},$scope.cancel=function(){$modalInstance.dismiss("cancel")},$scope.ok=function(){if($scope.totalUploadFilesNum>1)return void toaster.pop("waring",null,"图片正常上传，请稍后");var data=$scope.illnessTrack;if(!data)return toaster.pop("error",null,"数据有问题");if(!data.name)return toaster.pop("error",null,"请输入题目名称");if(!data.options||data.options.length<2)return toaster.pop("error",null,"可选项不能少于两项");for(var i=0;i<data.options.length;i++){if(!data.options[i].name)return toaster.pop("error",null,"选项名称不能为空");var questions=data.options[i].appendQuestions;if(questions&&questions.length>0)for(var j=0;j<questions.length;j++){if(!questions[j].name)return toaster.pop("error",null,"请输入题目名称");if(!questions[j].options||questions[j].options.length<2)return toaster.pop("error",null,"可选项不能少于两项");for(var k=0;k<questions[j].options.length;k++)if(!questions[j].options[k].name)return toaster.pop("error",null,"选项名称不能为空")}}illnessTrackData.question?updateIllnessTrackQuestion():submitReplyData()},$scope.collect=function(){var json={name:$scope.illnessTrack.name,options:$scope.illnessTrack.options},param={access_token:app.url.access_token,groupId:app.url.groupId(),diseaseType:illnessTrackData.diseaseTypeId,jsonData:JSON.stringify(json)};$http.post(app.urlRoot+"designer/storeQuestion",param).then(function(rpn){rpn=rpn.data,rpn&&1==rpn.resultCode?(toaster.pop("success",null,"收藏成功"),illnessTrackData.question?updateIllnessTrackQuestion():submitReplyData()):rpn&&rpn.resultMsg?toaster.pop("error",null,rpn.resultMsg):(toaster.pop("error",null,"收藏错误"),console.error(rpn))})}}function AddIllnessTrackLibraryCtrl($scope,$http,$modal,$modalInstance,toaster,illnessTrackData){function setTree(){var contacts=new Tree("lifeQualityLibraryTree",{hasCheck:!1,allCheck:!1,multiple:!1,allHaveArr:!1,self:!0,search:!1,arrType:[1,0],data:{url:app.yiliao+"designer/getDiseaseTypeTree4Q",param:{access_token:app.url.access_token,carePlanId:illnessTrackData.carePlanId}},datakey:{id:"id",name:"name",sub:"children"},info:{name:"name",id:"id",pid:"department",leaf:"leaf"},root:{selectable:!0,name:"全部",id:null},events:{click:treeClick},callback:function(){var dts=contacts.tree.find("dt");dts&&dts.eq(0)&&dts.eq(0).data()&&dts.eq(0).data().info&&treeClick(dts.eq(0).data().info)}})}function treeClick(info){$scope.diseaseName=info.name,setTable(info.id)}function setTable(diseaseTypeId,pageIndex,pageSize){$http.post(app.yiliao+"designer/getQuestionList",{access_token:app.url.access_token,carePlanId:illnessTrackData.carePlanId,diseaseTypeId:diseaseTypeId||$scope.diseaseTypeId||0}).then(function(rpn){if(rpn=rpn.data,1===rpn.resultCode){$scope.countData=rpn.data;var start=$scope.pageSize*($scope.pageIndex-1),end=$scope.pageIndex*$scope.pageSize;$scope.illnessTrack=$scope.countData.slice(start,end),$scope.page_count=rpn.data.length}else rpn.resultMsg?toaster.pop("error",null,rpn.resultMsg):toaster.pop("error",null,"接口出错")})}$scope.illnessTrackData=illnessTrackData,$scope.modelCheckIlless=function(item){var items=item;$modal.open({animation:!0,templateUrl:"illnessTrackLibaryCheck.html",controller:"ModalillnessTrackLibaryCtrl",size:"lg",resolve:{itemid:function(){return items}}})},setTimeout(setTree,0),$scope.diseaseTypeId=null,$scope.pageIndex=1,$scope.pageSize=5,$scope.setTable=setTable,$scope.pageChanged=function(){var start=$scope.pageSize*($scope.pageIndex-1),end=$scope.pageIndex*$scope.pageSize;$scope.illnessTrack=$scope.countData.slice(start,end)},$scope.selectArry=[],$scope.selectItem=function(item){var index=$scope.selectArry.indexOf(item);index===-1?$scope.selectArry.push(item):$scope.selectArry.splice(index,1)},$scope.isSelect=function(item){for(var arry=$scope.selectArry,i=0;i<arry.length;i++)if(arry[i].qId===item.qId)return!0;return!1},$scope.cancel=function(){$modalInstance.dismiss("cancel")},$scope.ok=function(){if(!$scope.selectArry||$scope.selectArry.length<1)return toaster.pop("error",null,"请选择问题");var param={access_token:app.url.access_token,sendTime:$scope.illnessTrackData.sendTime,carePlanId:$scope.illnessTrackData.carePlanId,schedulePlanId:$scope.illnessTrackData.schedulePlanId,dateSeq:$scope.illnessTrackData.dateSeq,jsonData:JSON.stringify($scope.selectArry)};$http.post(app.urlRoot+"designer/batchSaveQuestion",param).then(function(rpn){rpn=rpn.data,rpn&&1==rpn.resultCode?(toaster.pop("success",null,"添加成功"),$modalInstance.close(rpn.data)):rpn&&rpn.resultMsg?toaster.pop("error",null,rpn.resultMsg):(toaster.pop("error",null,"添加失败"),console.error(rpn))})}}function AddTriggerMsgCtrl($scope,$http,$modal,$modalInstance,toaster,triggerMsgData){$scope.triggerMsgData={careItemId:triggerMsgData.careItemId},triggerMsgData.triggerMsgs?($scope.triggerMsgData.triggerMsgs=[],$scope.triggerMsgData.triggerMsgs.push(triggerMsgData.triggerMsgs.remindDoctor1),$scope.triggerMsgData.triggerMsgs.push(triggerMsgData.triggerMsgs.remindPatient1),$scope.triggerMsgData.triggerMsgs.push(triggerMsgData.triggerMsgs.remindDoctor2),$scope.triggerMsgData.triggerMsgs.push(triggerMsgData.triggerMsgs.remindPatient2),$scope.triggerMsgData.triggerMsgs.push(triggerMsgData.triggerMsgs.remindDoctor3),$scope.triggerMsgData.triggerMsgs.push(triggerMsgData.triggerMsgs.remindPatient3)):($scope.triggerMsgData.triggerMsgs=[],$scope.triggerMsgData.triggerMsgs.length<1&&($scope.triggerMsgData.triggerMsgs.push("患者恢复的很好，请放心！"),$scope.triggerMsgData.triggerMsgs.push("您回复程度很好，请放心！"),$scope.triggerMsgData.triggerMsgs.push("患者出现异常，请及时处理！"),$scope.triggerMsgData.triggerMsgs.push("您的情况出现异常，建议咨询医生。"),$scope.triggerMsgData.triggerMsgs.push("患者出现危险项，请马上联系患者处理。"),$scope.triggerMsgData.triggerMsgs.push("您的情况出现异常，建议咨询医生。"))),$scope.cancel=function(){$modalInstance.dismiss("cancel")},$scope.ok=function(){for(var i=0;i<$scope.triggerMsgData.triggerMsgs.length;i++)if(!$scope.triggerMsgData.triggerMsgs[i])return toaster.pop("error",null,"请填完每个提醒");$http.post(app.urlRoot+"designer/saveTriggerMsg",{access_token:app.url.access_token,careItemId:$scope.triggerMsgData.careItemId,triggerMsgs:$scope.triggerMsgData.triggerMsgs}).then(function(rpn){rpn=rpn.data,rpn&&1==rpn.resultCode?(toaster.pop("success",null,"保存成功"),$modalInstance.close(rpn.data)):rpn&&rpn.resultMsg?toaster.pop("error",null,rpn.resultMsg):(toaster.pop("error",null,"保存出错"),console.error(rpn))})}}function RepeatAskCtrl($scope,$http,$modal,$modalInstance,toaster,repeatAskData){function funSetDefault(){console.log(1),$scope.repeatAskOption={repeats:[{repeatSeq:1,dateSeq:1,sendTime:function(){var splitArry=repeatAskData.sendTime.split(":");return"00"===splitArry[1]?(result=splitArry[0]+":30",result):(result=splitArry[0]-0+1+":00",result)}()}]}}$scope.thisExecuteTimeOfRepeatList=[],$scope.thisExecuteTime=repeatAskData.thisExecuteTime;for(var j=1;j<=repeatAskData.thisExecuteTime;j++)$scope.thisExecuteTimeOfRepeatList.push(j);$scope.repeatAskData=repeatAskData,$scope.repeatAskOption={},$scope.isEnd=!0,$scope.endCondition={continueDays:"1",level:"1"},function(){$http.post(app.urlRoot+"designer/getRepeatAsk",{access_token:app.url.access_token,questionId:repeatAskData.question.id}).then(function(rpn){rpn=rpn.data,rpn&&1==rpn.resultCode?rpn.data?($scope.endCondition=rpn.data.endCondition,rpn.data.repeats&&rpn.data.repeats.length>0?$scope.repeatAskOption.repeats=rpn.data.repeats:funSetDefault()):funSetDefault():rpn&&rpn.resultMsg?toaster.pop("error",null,rpn.resultMsg):(toaster.pop("error",null,"获取出错"),console.error(rpn))})}(),$scope.removeItem=function(item,arry){var index=arry.indexOf(item);arry.splice(index,1)},$scope.addReaptOption=function(filtersJson){var filters=JSON.parse(filtersJson);$scope.repeatAskOption.repeats.push({repeatSeq:1,dateSeq:function(){if($scope.repeatAskOption.repeats&&$scope.repeatAskOption.repeats.length>0){var dateSeq=$scope.repeatAskOption.repeats[$scope.repeatAskOption.repeats.length-1].dateSeq;return dateSeq}return 1}(),sendTime:function(){function nextTime(_splitArry){return _splitArry="00"===_splitArry[1]?[_splitArry[0],"30"]:[_splitArry[0]-0+1+"","00"]}if($scope.repeatAskOption.repeats&&$scope.repeatAskOption.repeats.length>0){var prevTime=$scope.repeatAskOption.repeats[$scope.repeatAskOption.repeats.length-1].sendTime,splitArry=prevTime.split(":"),result=null;for(splitArry=nextTime(splitArry),i=0;i<filters.length;i++)splitArry[0]+":"+splitArry[1]==filters[i]&&(splitArry=nextTime(filters[i].split(":")));return result=splitArry[0]+":"+splitArry[1]}return"09:00"}()})},$scope.timeFilterArry=function(exception,dateSeq){var _repeats=angular.copy($scope.repeatAskOption.repeats),_resultArry=[];1==dateSeq&&(_resultArry=[repeatAskData.sendTime]);for(var i=0;i<_repeats.length;i++)exception!=_repeats[i].sendTime&&dateSeq==_repeats[i].dateSeq&&_resultArry.push(_repeats[i].sendTime);return JSON.stringify(_resultArry)},$scope.optionChange=function(option,arry){var index=arry.indexOf(option.levelName);option.level=index+1},$scope.cancel=function(){$modalInstance.dismiss("cancel")},$scope.ok=function(){var json={repeats:$scope.repeatAskOption.repeats};$scope.isEnd&&(json.endCondition=$scope.endCondition),$http.post(app.urlRoot+"designer/saveRepeatAsk",{access_token:app.url.access_token,questionId:repeatAskData.question.id,jsonData:JSON.stringify(json)}).then(function(rpn){rpn=rpn.data,rpn&&1==rpn.resultCode?(toaster.pop("success",null,"保存成功"),$modalInstance.close(rpn.data)):rpn&&rpn.resultMsg?toaster.pop("error",null,rpn.resultMsg):(toaster.pop("error",null,"保存出错"),console.error(rpn))})}}function EditTipsCtrl($scope,$http,$modal,$modalInstance,toaster,tipsData){if($scope.options=[],$scope.tipsData=[{seq:"",name:""}],tipsData.question.id){$scope.tipsData=[];for(var i=0;i<tipsData.question.options.length;i++)$scope.options.push({seq:tipsData.question.options[i].seq,name:tipsData.question.options[i].name}),tipsData.question.options[i].tips&&$scope.tipsData.push({seq:tipsData.question.options[i].seq,tips:tipsData.question.options[i].tips})}$scope.tipsData.length<1&&$scope.tipsData.push({seq:tipsData.question.options[0].seq,tips:""}),$scope.funSelectedOption=function(seq){for(var array=$scope.options,i=0;i<array.length;i++)if(array[i].seq==seq)array[i].isSelected=!0;else{array[i].isSelected=!1;for(var j=0;j<$scope.tipsData.length;j++)array[i].seq==$scope.tipsData[j].seq&&(array[i].isSelected=!0)}console.log($scope.options,$scope.tipsData)},$scope.addTip=function(){$scope.tipsData.push({seq:"",tips:""}),$scope.funSelectedOption($scope.tipsData[$scope.tipsData.length-1]),console.log($scope.options,$scope.tipsData)},$scope.removeTip=function(index){$scope.tipsData.splice(index,1)},$scope.cancel=function(){$modalInstance.dismiss("cancel")},$scope.ok=function(){for(var i=0;i<$scope.tipsData.length;i++)if(!$scope.tipsData[i].tips)return toaster.pop("error",null,"请填写好每个选项的提示");var json={options:$scope.tipsData};$http.post(app.urlRoot+"designer/saveTips",{access_token:app.url.access_token,questionId:tipsData.question.id,jsonData:JSON.stringify(json)}).then(function(rpn){rpn=rpn.data,rpn&&1==rpn.resultCode?(toaster.pop("success",null,"保存成功"),$modalInstance.close(rpn.data)):rpn&&rpn.resultMsg?toaster.pop("error",null,rpn.resultMsg):(toaster.pop("error",null,"保存出错"),console.error(rpn))})}}function funCopyMsgCtrl($scope,$http,$modal,$modalInstance,toaster,item){$scope.ok=function(){$http.post(app.urlRoot+"designer/copyIllnessTrack",{access_token:app.url.access_token,sendTime:"",carePlanId:"",schedulePlanId:"",dateSeq:"",questionIds:""}).then(function(rpn){rpn=rpn.data,rpn&&1==rpn.resultCode?(toaster.pop("success",null,"复制成功"),$modalInstance.close(rpn.data)):rpn&&rpn.resultMsg?toaster.pop("error",null,rpn.resultMsg):toaster.pop("error",null,"复制出错")})},$scope.cancel=function(){$modalInstance.dismiss("cancel")}}angular.module("app").factory("AddIllnessTrackFtory",AddIllnessTrackFtory),AddIllnessTrackFtory.$inject=["$http","$modal"],angular.module("app").controller("AddIllnessTrackSelectCtrl",AddIllnessTrackSelectCtrl),angular.module("app").controller("CreateIllnessTrackCtrl",CreateIllnessTrackCtrl),angular.module("app").controller("AddIllnessTrackLibraryCtrl",AddIllnessTrackLibraryCtrl),angular.module("app").controller("AddTriggerMsgCtrl",AddTriggerMsgCtrl),angular.module("app").controller("RepeatAskCtrl",RepeatAskCtrl),angular.module("app").controller("EditTipsCtrl",EditTipsCtrl),app.controller("ModalillnessTrackLibaryCtrl",function($scope,$http,$modal,$modalInstance,toaster,itemid){$http.post(app.urlRoot+"designer/getQuestionFromStore",{access_token:app.url.access_token,qid:itemid}).then(function(rpn){1==rpn.data.resultCode?$scope.illnessTrack=rpn.data.data:toaster.pop("error",null,"服务器错误")}),$scope.cancel=function(){$modalInstance.dismiss("cancel")}}),angular.module("app").controller("copyMsgCtrl",funCopyMsgCtrl)}();