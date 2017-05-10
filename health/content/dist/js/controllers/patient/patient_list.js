"use strict";app.controller("PatientOfDoctor",function($rootScope,$scope,$state,$timeout,$http,utils,modal){function createRecordTable(dt,d){var dtArr=dt.data;if(dtArr){var tab=$("<table></table>"),tabHead=$("<thead></thead>"),tabBody=$("<tbody></tbody>"),tr="<tr><td>关联用户</td><td>"+($scope.curUserName||"")+"</td></tr><tr><td>成员关系</td><td>"+(d.relation||"")+"</td></tr><tr><td>年龄</td><td>"+(d.age?d.age:"0"==d.age?d.age:"")+"</td></tr><tr><td>性别</td><td>"+(d.sex||"")+"</td></tr><tr><td>联系方式</td><td>"+(d.telephone||"")+"</td></tr>";tabHead.html(tr),tr="";var len=dtArr.length;if(0===len)tr+='<tr><td colspan="2">诊疗纪录 [<span class="text-info">0/0</span>]（'+getTimeString(0)+"）</td></tr>",tabBody.html(tr);else for(var i=0;i<len;i++)tr+='<tr class="ttl-row"><td colspan="2">诊疗纪录 [<span class="text-info">'+(i+1)+"/"+len+"</span>] ("+getTimeString(dtArr[i].createTime||0)+')</td></tr><tr><td>医生</td><td class="text-info">'+(dtArr[i].name||"")+'</td></tr><tr><td>病种</td><td class="text-info">'+(dtArr[i].diseaseTypeName||"")+"</td></tr>",tabBody.html(tr);tab.append(tabHead).append(tabBody),$("#patient_record").html("").append(tab)}}function getTimeString(date){if(date){date=new Date(date);var _y=date.getFullYear(),_M=date.getMonth()+1,_d=date.getDate(),_h=date.getHours(),_m=date.getMinutes()}return date?_y+" 年 "+_M+" 月 "+_d+" 日 ，"+_h+" 点 "+_m+" 分":"--年--月--日"}function initTable(){var name,_index,_start,isSearch=!1,searchTimes=0,index=1*utils.localData("page_index")||1,start=1*utils.localData("page_start")||0,length=1*utils.localData("page_length")||50,setTable=function(){doctorList=$("#doctorListOfDisease"),dTable=doctorList.dataTable({draw:index,displayStart:start,lengthMenu:[5,10,15,20,30,40,50,100],pageLength:length,bServerSide:!0,sAjaxSource:url,fnServerData:function(sSource,aoData,fnCallback){param.keyword=name,param.pageIndex=index-1,param.pageSize=aoData[4].value,param.access_token=app.url.access_token,$.ajax({type:"post",url:sSource,dataType:"json",data:param,success:function(resp){if("1"!=resp.resultCode)return void modal.toast.warn(resp.resultMsg);for(var i=0;i<resp.data.pageData.length;i++)if(resp.data.pageData[i].doctor){var doctor=resp.data.pageData[i].doctor;utils.extendHash(resp.data.pageData[i],["name","ageStr","sex","telephone"],[doctor.name,null,null,doctor.telephone])}else utils.extendHash(resp.data.pageData[i],["name","ageStr","sex","telephone"]);resp.start=resp.data.start,resp.recordsTotal=resp.data.total,resp.recordsFiltered=resp.data.total,resp.length=resp.data.pageSize,resp.data=resp.data.pageData,fnCallback(resp),$scope.loading=!1}})},searching:!1,language:app.lang.datatables.translation,createdRow:function(nRow,aData,iDataIndex){$(nRow).data("x_id",aData.id).attr("data-id",aData.doctorId).click(aData,function(param,e){$(".currentRow").removeClass("currentRow"),$rootScope.curUserName=param.data.name,$scope.seeDetails(nRow,param.data)})},columns:[{orderable:!1,render:function(set,status,dt){if(dt.headPicFileName)var path=dt.headPicFileName;else var path="src/img/a0.jpg";return'<img src="'+path+'"/>'}},{data:"name",orderable:!1},{data:"ageStr",orderable:!1,searchable:!1},{data:"sex",orderable:!1,searchable:!1,render:function(set,status,dt){if(dt.sex)return 1==dt.sex?"男":2==dt.sex?"女":3==dt.sex?"保密":""}},{data:"telephone",orderable:!1,searchable:!1},{render:function(){return'<i class="text-lg fa fa-angle-double-down">'},searchable:!1}]}),dTable.off().on("init.dt",function(){html.scrollTop($rootScope.scrollTop),body.scrollTop($rootScope.scrollTop),doctorList.find("tr[data-id="+$rootScope.curRowId+"]").addClass("currentRow")}).on("length.dt",function(e,settings,len){index=1,start=0,length=len,dTable.fnDestroy(),setTable(),utils.localData("page_length",len)}).on("page.dt",function(e,settings){index=settings._iDisplayStart/length+1,start=length*(index-1),dTable.fnDestroy(),$rootScope.scrollTop=html.scrollTop()?103:152,utils.localData("page_index",index),utils.localData("page_start",start),setTable()}).on("search.dt",function(e,settings){settings.oPreviousSearch.sSearch?(isSearch=!0,searchTimes++,_index=settings._iDisplayStart/settings._iDisplayLength+1,_start=settings._iDisplayStart,name=settings.oPreviousSearch.sSearch):(isSearch=!1,name=null),isSearch?(index=1,start=0):searchTimes>0&&(searchTimes=0,index=_index,start=_start,dTable.fnDestroy(),setTable())})};setTable()}var url=app.url.yiliao.getDoctors,html=$("html"),body=$("body"),curId=$scope.curId||utils.localData("curId"),curType=$scope.curType||utils.localData("curType"),groupId=utils.localData("curGroupId"),curRow=null,curInfoRow=null;if($rootScope.viewData={},$rootScope.viewData.typeName=$scope.typeName,"idx_0"===$scope.curIndex||"idx_0"===curId){url=app.url.yiliao.patient;var param={groupId:groupId,type:5};curType=1}else{url=app.url.yiliao.patient;var param={groupId:groupId,type:curType,id:curId}}"list_pass"!==$rootScope.pageName&&(utils.localData("page_index",null),utils.localData("page_start",null),$rootScope.pageName="list_pass",$rootScope.scrollTop=0),$scope.seeDetails=function(row,dt){var iArr=$(row).children("td").last().children("i"),isDtRow=$(row).next().hasClass("even")||$(row).next().hasClass("odd")||"0"==$(row).next().length;if(row&&curRow!=row&&isDtRow){curInfoRow=$("<tr></tr>");var newTd=$('<td colspan="6"></td>'),newDiv=$("<div></div>");"idx_0"===curId&&(curId=dt.doctorId||dt.id),$http({url:app.url.yiliao.getMembers,method:"post",data:{access_token:app.url.access_token,groupId:groupId,id:curId,type:curType,userId:dt.doctorId||dt.id}}).then(function(resp){var dt=resp.data.data;if(dt){var tab=$('<table class="info-table"></table>'),tabHead=$("<thead><tr><td>成员关系</td><td>姓名</td><td>性别</td><td>年龄</td><td>联系方式</td></tr></thead>"),tabBody=$("<tbody></tbody>");tab.append(tabHead).append(tabBody);for(var i=0;i<dt.length;i++){var tr=$("<tr></tr>"),tdStr="<td>"+(dt[i].relation||"")+"</td><td>"+(dt[i].name||"")+"</td><td>"+(1==dt[i].sex?"男":2==dt[i].sex?"女":3==dt[i].sex?"保密":"")+"</td><td>"+(dt[i].ageStr?dt[i].ageStr:"0"==dt[i].ageStr?dt[i].ageStr:"")+"</td><td>"+(dt[i].telephone||"")+"</td>";tr.html(tdStr),tabBody.append(tr),tr.on("click",dt[i],function(e){$rootScope.curPatientName=e.data.name,$rootScope.isInView=!0,$rootScope.viewData.patientName=e.data.name;var patientId=e.data.id;if(patientId){var mask=$('<div class="mask"></div>'),container=$("#d_container");$rootScope.close=function(){mask.remove(),container.addClass("none"),html.css("overflow","auto")},$http({url:app.url.yiliao.getTreatmentRecords,method:"post",data:{access_token:app.url.access_token,groupId:groupId,patientId:patientId,type:1,id:0}}).then(function(resp){if(resp.data&&resp.data.data&&resp.data.data.length>0){var dt=resp.data;body.append(mask),html.css("overflow","hidden"),container.removeClass("none"),createRecordTable(dt,{name:e.data.name,sex:1==e.data.sex?"男":2==e.data.sex?"女":3==e.data.sex?"保密":"",age:e.data.ageStr,relation:e.data.relation,telephone:e.data.telephone})}else resp.data&&resp.data.data&&0===resp.data.data.length?modal.toast.warn("没有记录！"):modal.toast.error(resp.data.resultMsg)},function(x){console.error(x.statusText)})}})}newDiv.html(tab),newTd.html(newDiv),curInfoRow.append(newTd),curInfoRow.insertAfter(row),curRow=row}}),iArr.removeClass("fa-angle-double-down").addClass("fa-angle-double-up")}else if(curRow==row)curInfoRow.hasClass("none")?(curInfoRow.removeClass("none"),iArr.removeClass("fa-angle-double-down").addClass("fa-angle-double-up")):(curInfoRow.addClass("none"),iArr.removeClass("fa-angle-double-up").addClass("fa-angle-double-down"));else{var curTr=$(row).next();curTr.hasClass("none")?(curTr.removeClass("none"),iArr.removeClass("fa-angle-double-down").addClass("fa-angle-double-up")):(curTr.addClass("none"),iArr.removeClass("fa-angle-double-up").addClass("fa-angle-double-down"))}};var doctorList,dTable;initTable()});