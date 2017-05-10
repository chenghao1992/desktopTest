!function(window,undefined){"use strict";var isCommonjs="undefined"!=typeof module&&module.exports,DataBox=("undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,function(id,settings){return this.settings=settings,this.targets=[],this.fixdata=[],this.targetsId=[],this.tempId=[],this.tags=[],this.tagsId=[],this.isTrigger=!0,this.init(id,this.settings),this});DataBox.prototype={init:function(id,set){function btnSearch(){var _key=$.trim($("#keys_ipt").val());if(tempKey=_key,_key||"0"==_key){var dataSource=that.treeObj.getSourceData();set.search.searchDepth&&that.treeObj.setLeafDepth(leafDepth-set.search.searchDepth[0]);var _dt=that.queryByKey(dataSource,_key,!1,null,["name"],set.search.searchDepth||null);that.treeObj.setTree(_dt)}else that.treeObj.setLeafDepth(leafDepth),that.treeObj.setTree(that.treeObj.getSourceData())}function handlerUp(){}function handlerDown(){}function click(){var tempsAdd=that.treeObj.getTempsAdd(),tempsIdAdd=that.treeObj.getTempsIdAdd(),lenAdd=tempsIdAdd.length,tempsSub=that.treeObj.getTempsSub(),tempsIdSub=that.treeObj.getTempsIdSub(),lenSub=tempsIdSub.length;if(!set.multiple)return void(that.targets=tempsAdd);for(var i=0;i<lenAdd;i++){var _idx=that.tempId.indexOf(tempsIdAdd[i]);_idx===-1&&(that.targets.push(tempsAdd[i]),that.targetsId.push(tempsIdAdd[i]),that.tempId.push(tempsIdAdd[i]),that.insertTag(tempsAdd[i],!0))}for(var i=0;i<lenSub;i++){var _idx=that.tempId.indexOf(tempsIdSub[i]);_idx!==-1&&(that.targets.splice(_idx,1),that.targetsId.splice(_idx,1),that.tempId.splice(_idx,1),that.insertTag(tempsSub[i],!1))}that.setNumber()}var that=this;if(set.fixdata&&set.fixdata.length>0){for(var len=set.fixdata.length,i=0;i<len;i++)this.fixdata.push(set.fixdata[i]),this.targetsId.push(set.fixdata[i].id);this.targets=this.fixdata,set.fixdata=this.fixdata}for(var targets=this.fixdata,l=targets.length,i=0;i<l;i++)this.tempId.push(targets[i].id);if(set.events||(set.events={},set.events.click=click,set.unionSelect),set.events.callback=function(){var dts=that.treeObj.getTree().find("dt"),len=dts.length,ln=that.targetsId.length,dt=$();if(set.hasCheck&&set.selectView)for(var i=0;i<ln;i++)for(var j=0;j<len;j++)dt=dts.eq(j),dt.data("info").id===that.targetsId[i]&&dt.trigger("click")},!window.Tree)return void alert('The "Tree" companent is not loaded!');var mask=$('<div class="mask"></div>'),templete='<div class="dialog-heading font-bold text-center">'+(set.titles?set.titles.main:"选择数据")+'</div><div class="dialog-body '+(set.search?"select-view":"")+'"><div class="'+(set.search?"search-ipt":"")+'">'+(set.search?'<div class="search-form '+(set.selectView?"dialog-bar":"")+'"><input id="keys_ipt" autocomplete="off" placeholder='+(set.titles?set.titles.searchKey:"关键字")+' class="form-control"/><i id="btn_search" class="fa icon-magnifier"></i></div>':"")+(set.selectView?'<div class="data-num">'+(set.titles?set.titles.label:"已选择个数")+':<span id="data_num">20</span></div>':"")+"</div>"+(set.selectView?'<div class="box-r"><div id="data_box" class="data-box"></div></div>':"")+'<div class="box-l"><div id="data_res"><div class="loading"><i class="glyphicon glyphicon-repeat"></i></div></div></div></div><div class="dialog-opr-bar clear"><div class="col-md-offset-2 col-md-4" id="opr_ok"></div><div class="col-md-4" id="opr_cancal"></div></div>',container=$("<div></div>");container.addClass("dialog-container animating fade-in-down").html(templete),$("body").append(mask).append(container),container.css("margin-left",-(container.width()/2)),that.treeObj=new Tree(id,set);var oprOk=$("#opr_ok"),oprCancal=$("#opr_cancal"),btn_ok=$('<button type="button" class="w100 btn btn-success">确 定</button>'),btn_cancel=$('<button type="button" class="w100 btn btn-default">取 消</button>'),btn_search=$("#btn_search"),keys_ipt=$("#keys_ipt"),leafDepth=set.leafDepth,timer=0,tempKey="",isSearching=!1;this.data_num=$("#data_num").html(this.targets.length),oprOk.append(btn_ok),oprCancal.append(btn_cancel),keys_ipt.focus(function(){timer=setInterval(function(){var _key=$.trim(keys_ipt.val());tempKey===_key||_key||"0"==_key?tempKey!==_key&&_key&&(isSearching=!0,btn_search.removeClass("icon-magnifier").addClass("fa-times-circle"),btnSearch()):(that.treeObj.setLeafDepth(leafDepth),that.treeObj.setTree(that.treeObj.getSourceData()),tempKey=_key,isSearching=!1,btn_search.removeClass("fa-times-circle").addClass("icon-magnifier"))},100)}),keys_ipt.blur(function(){clearInterval(timer)}),btn_search.click(function(){isSearching=!1,tempKey="",keys_ipt.val(""),isSearching=!1,btn_search.removeClass("fa-times-circle").addClass("icon-magnifier"),btnSearch()}),that.keyHandler(keys_ipt,{key13:btnSearch,key38:handlerUp,key40:handlerDown}),btn_ok.click(function(e){var evt=e||window.event;evt.stopPropagation(),set.response.call(null,that.targets),mask.remove(),container.remove()}),oprCancal.click(function(e){var evt=e||window.event;evt.stopPropagation(),mask.remove(),container.remove()}),this.fixdata.length>0&&this.insertTag(this.fixdata,!0)},setNumber:function(){this.data_num.html(this.treeObj.getTargets().length)},keyHandler:function(dom,handleObj){dom=dom||window.document,$(dom).bind("keydown",function(e){var evt=e||window.event,keyCode=evt.keyCode;switch(keyCode){case 13:handleObj["key"+keyCode]();break;case 37:handleObj["key"+keyCode]();break;case 38:handleObj["key"+keyCode]();break;case 39:break;case 40:handleObj["key"+keyCode]()}})},insertTag:function(dt,isNeed){function removeTag(e){var evt=e||window.event,_dts=that.treeObj.tree.find("dt"),_len=_dts.length,_idx=-1;if(evt.stopPropagation(),that.isTrigger)for(var j=0;j<_len;j++)_dts.eq(j).data("info").id==e.data.id&&_dts.eq(j).trigger("click");_idx=that.tagsId.indexOf(e.data.id),_idx!==-1&&(that.tags.splice(_idx,1),that.tagsId.splice(_idx,1)),_idx=-1,$(this).parent().remove(),that.removeTargets(e.data),that.isTrigger=!0,that.setNumber()}var that=this,dataBox=$("#data_box");if(dt.length>0&&isNeed)for(var i=0;i<dt.length;i++){var span=$('<span class="label-btn btn-info"></span>'),iEle=$('<i class="fa fa-times"></i>');span.html(dt[i].name),span.append(iEle),dataBox.append(span),iEle.on("click",dt[i],removeTag),iEle.data("id",dt[i].id),that.tags.push(iEle),that.tagsId.push(dt[i].id)}else if(isNeed){var span=$('<span class="label-btn btn-info"></span>'),iEle=$('<i class="fa fa-times"></i>');span.html(dt.name),span.append(iEle),dataBox.append(span),iEle.on("click",dt,removeTag),iEle.data("id",dt.id),that.tags.push(iEle),that.tagsId.push(dt.id)}else for(var i=0;i<that.tags.length;i++)that.tags[i].data("id")==dt.id&&(that.isTrigger=!1,that.tags[i].trigger("click"))},removeTargets:function(target){var len=target.length,idx=-1;if(len)for(var i=0;i<len;i++)idx=this.targetsId.indexOf(target[i].id),idx!==-1&&(this.targets.splice(idx,1),this.targetsId.splice(idx,1));else idx=this.targetsId.indexOf(target.id),idx!==-1&&(this.targets.splice(idx,1),this.targetsId.splice(idx,1))},queryByKey:function(data,key,only,exclude,types,depth){function getArrVal(dt){if(dt.constructor===Array){if(!(dt.length>0))return;for(var len=dt.length,i=0;i<len;i++)if(dt[i].constructor===Object)getArrVal(dt[i]);else{if(depth&&depth.indexOf(dep)==-1)break;if((dt[i]+"").search(new RegExp(key,"ig"))!==-1){if(only)return void(value=dt[i]);value.push(dt[i])}}}else if(dt.constructor===Object){if(types)for(var len=types.length,i=0;i<len;i++){var type=types[i].split(".");if(1===type.length)var _dt=dt[type[0]];else if(2===type.length){if(dt[type[0]])var _dt=dt[type[0]][type[1]]}else if(dt[type[0]]&&dt[type[0]][type[1]])var _dt=dt[type[0]][type[1]][type[2]];if(_dt||"0"==_dt)if(_dt.constructor===Array)_dt.length>0&&(dep++,getArrVal(_dt),dep--);else{if(depth&&depth.indexOf(dep)==-1)break;if((_dt+"").search(new RegExp(key,"ig"))!==-1){if(only)return void(value=dt);value.push(dt)}}}var isExcluded=!1;for(var k in dt){if(exclude&&exclude.length>0)for(var i=0;i<exclude.length;i++)if(k===exclude[i]){isExcluded=!0;break}if(!isExcluded)if(dt[k].constructor===Array)dt[k].length>0&&(dep++,getArrVal(dt[k]),dep--);else if(dt[k].constructor===Object)getArrVal(dt[k]);else if(!types){if(depth&&depth.indexOf(dep)==-1)break;if((dt[k]+"").search(new RegExp(key,"ig"))!==-1){if(only)return void(value=dt);value.push(dt)}}}}else{if(depth&&depth.indexOf(dep)==-1)return;if((dt+"").search(new RegExp(key,"ig"))!==-1){if(only)return void(value=dt);value.push(dt)}}}var value=[],dep=0;return data?(getArrVal(data),value):null}},isCommonjs?module.exports=DataBox:window.DataBox=DataBox}(window);