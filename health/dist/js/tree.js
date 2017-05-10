!function(window,undefined){var Tree=function(id,settings,fixDt){return this.settings=settings,this.settings.modal?this.tree=$("#data_box").addClass("list-group"):this.tree=$("#"+id).addClass("list-group"),this.data=null,this.treeDepth=0,this.targetsDt=[],this.fixdata=fixDt,this.hiddenData=[],this.targets=[],this.targetsId=[],this.tempsAdd=[],this.tempsSub=[],this.tempsIdAdd=[],this.tempsIdSub=[],this.isRendered=!1,this.isLeaf=!1,this.dtKey={},this.targetData=this.deepClone(this.settings.targetData),this.dataKey=this.deepClone(this.settings.datakey),this.filter=this.settings.excluded,this.allExcluded=!1,this.p_checked=!1,this.init(this.settings),this};Tree.prototype={init:function(set){if(this.iconArrow="fa fa-caret-right/fa fa-caret-down",this.iconCheck="fa fa-check/fa fa-square",this.iconRoot="fa fa-hospital-o dcolor",this.iconBranch="fa fa-h-square dcolor",this.iconLeaf="fa fa-user-md dcolor",this.iconHead="headPicFileName",this.iconExtra="fa fa-h-square dcolor",this.iconExcluded="fa fa-hospital-o text-muted",this.settings.icons&&(this.settings.icons.arrow&&(this.iconArrow=this.settings.icons.arrow),this.settings.icons.check&&(this.iconCheck=this.settings.icons.check),this.settings.icons.root&&(this.iconRoot=this.settings.icons.root),this.settings.icons.branch&&(this.iconBranch=this.settings.icons.branch),this.settings.excluded&&this.settings.excluded.icon&&(this.iconExcluded=this.settings.excluded.icon),this.settings.icons.leaf&&(this.iconLeaf=this.settings.icons.leaf),this.settings.icons.headPicFileName&&(this.iconHead=this.settings.icons.headPicFileName)),this.iconArrow=this.iconArrow.split("/"),this.iconArrow_r=this.iconArrow[0],this.iconArrow_d=this.iconArrow[1],this.iconCheck=this.iconCheck.split("/"),this.iconCheck_s=this.iconCheck[0],this.iconCheck_u=this.iconCheck[1],this.fixdata&&this.fixdata.length>0)for(var len=this.fixdata.length,i=0;i<len;i++)this.targetsId.push(this.fixdata[i].id);this.targets=this.fixdata,set.hiddenData&&set.hiddenData.length>0&&(this.hiddenData=set.hiddenData),set.data.url?this.getData(set.data):this.setTree(set.data)},getData:function(data){var _this=this;$.ajax({url:data.url,type:"post",dataType:"json",data:data.param,success:function(resp){1===resp.resultCode&&resp.data?(_this.sourceData=resp.data,_this.setTree(resp.data)):(console.error(resp.resultMsg),1!==resp.resultCode)},error:function(resp){console.error(resp.resultMsg)}})},dataReset:function(dt){function sort(d){for(var l=d.length,dArr=[],i=0;i<l;i++)d[i][sub]&&(dArr.push(d[i]),sort(d[i][sub]));data.push(d)}var data=[],sub=this.settings.datakey.sub;sort(dt)},setTree:function(dt){var that=this;if(that.settings.datakey=that.dataKey,this.settings.root&&dt&&dt.length>0||this.settings.root&&dt&&that.settings.extra){var data=[{}];data[0].nodeType="root",data[0].name=this.settings.root.name,data[0].id=this.settings.root.id,data[0][this.settings.datakey.sub]=dt}else var data=dt;if(that.settings.extra&&data&&data.length>0&&!this.isRendered)for(var len=that.settings.extra.length,i=0;i<len;i++)that.settings.extra[i].isExtra=!0,data[0][this.settings.datakey.sub].push(that.settings.extra[i]);if(this.treeWrapper=$('<div class="tree-wrap"></div>'),data&&data.length>0)for(var objs=this.setBranch(data),i=0;i<objs.length;i++)this.treeWrapper.append(objs[i]);else setTimeout(function(){that.treeWrapper.prepend($('<p class="text-muted text-center">未找到相关数据！</p>'))},10);that.tree.html(""),that.tree.append(that.treeWrapper),this.isRendered=!0,this.settings.callback&&this.settings.callback(this),this.settings.events&&this.settings.events.callback&&this.settings.events.callback(this)},setBranch:function(data){function arrowHandler(e){function setCurLine(){var pSiblings=that.parent().siblings();that.hasClass(_this.iconArrow_d)?(pSiblings.addClass("none"),that.removeClass(_this.iconArrow_d).addClass(_this.iconArrow_r),curDt.length>0&&(!that.parent().hasClass("cur-line")&&that.parent().find(".cur-line").length>0&&cur_div.css("display","none"),cur_div.css("top",curDt.offset().top-tTop))):(pSiblings.removeClass("none"),that.removeClass(_this.iconArrow_r).addClass(_this.iconArrow_d),curDt.length>0&&(cur_div.css("display","block"),cur_div.css("top",curDt.offset().top-tTop)))}var that=$(this),evt=e||window.event,cur_div=that.parents(".list-group").find(".cur-back-line"),curDt=that.parents(".list-group").find(".cur-line");if(evt.stopPropagation(),_this.p_checked=!1,!_this.settings.async||that.hasClass(_this.iconArrow_d)||e.data.pNode.data("subs")||_this.settings.loadDisabled)setCurLine();else{var loading=$('<i class="refreshing glyphicon glyphicon-repeat"></i>');e.data.pNode.prev().append(loading);var _param={},_dataKey="";if(e.data.dt.isExtra){_dataKey=_this.settings.extra[0].target.dataKey.id;var url=e.data.dt.url;for(var key in e.data.dt.param)_param[key]=e.data.dt.param[key];for(var key in e.data.dt.dataKey)_param[key]=e.data.dt[e.data.dt.dataKey[key]];e.data.dt.target&&(_this.settings.targetData=e.data.dt.target.data,_this.settings.datakey=e.data.dt.target.dataKey)}else{_dataKey=_this.settings.async.target.dataKey.id;var url=_this.settings.async.url;for(var key in _this.settings.async.data)_param[key]=_this.settings.async.data[key];for(var key in _this.settings.async.dataKey)_param[key]=e.data.dt[_this.settings.async.dataKey[key]];_this.settings.targetData=_this.targetData,_this.settings.datakey=_this.dataKey}$.ajax({dataType:"json",url:url,method:"post",data:_param,success:function(resp){var dt=resp.data;if(1===resp.resultCode&&dt){if(dt&&dt.length||(dt=resp.data.data),dt&&dt.length||(dt=resp.data.pageData),!dt||!dt.length)return loading.remove(),void setCurLine();for(var diffDt=[],i=0;i<dt.length;i++)_this.hiddenData.indexOf(dt[i][_dataKey])==-1&&diffDt.push(dt[i]);_this.isLeaf=!0,e.data.pNode.data("subs",diffDt),_this.insertNodes(e.data.pNode,diffDt),_this.initCheckStatus()}else 1030102===resp.resultCode&&(window.location.href="#/access/signin");loading.remove(),setCurLine()},error:function(resp){console.error(resp.resultMsg)}})}}function getAsyncData(e,param,fun){if(e.pNode.data("subs"))fun(e.pNode.children("dl").children("dt"));else{var _dataKey="";if(e.dt.isExtra){_dataKey=_this.settings.extra[0].target.dataKey.id;var url=e.dt.url;for(var key in e.dt.param)param[key]=e.dt.param[key];for(var key in e.dt.dataKey)param[key]=e.dt[e.dt.dataKey[key]];e.dt.target&&(_this.settings.targetData=e.dt.target.data,_this.settings.datakey=e.dt.target.dataKey)}else{_dataKey=_this.settings.async.target.dataKey.id;var url=_this.settings.async.url;for(var key in _this.settings.async.dataKey)param[key]=e.dt[_this.settings.async.dataKey[key]];_this.settings.targetData=_this.targetData,_this.settings.datakey=_this.dataKey}$.ajax({dataType:"json",url:url,method:"post",data:param,success:function(resp){var dt=resp.data;if(1===resp.resultCode&&dt){if(dt&&dt.length||(dt=resp.data.data),dt&&dt.length||(dt=resp.data.pageData),!dt||!dt.length)return void fun(null);for(var diffDt=[],i=0;i<dt.length;i++)_this.hiddenData.indexOf(dt[i][_dataKey])==-1&&diffDt.push(dt[i]);_this.isLeaf=!0,e.pNode.data("subs",diffDt),_this.insertNodes(e.pNode,diffDt),fun(e.pNode.children("dl").children("dt"))}else fun(e.pNode.children("dl").children("dt")),1030102===resp.resultCode&&(window.location.href="#/access/signin")},error:function(resp){console.error(resp.resultMsg)}})}}function checked(e){function setTopCheck(node){var _p=node.parent().parent(),_dt=_p.parent().children("dl").children("dt"),_check=_dt.children(".un-check"),_ln=0;0===_check.length?(_check=_dt.children("."+_uchk_class),_check.length>0&&(_ln=_check.length)):_ln=_check.length;var len=_dt.data("subLen"),num=len-_ln,_check=_p.parent().siblings("dt").children("."+_chk_class);num===len?_this.settings.cover?(_p.parent().parent().children("dt").trigger("click"),setSubCheck(node)):_check.removeClass("un-check").removeClass(_uchk_class):num<len&&0!==num&&!_this.settings.cover?_check.removeClass("un-check").addClass(_this.iconCheck_u):_check.removeClass(_uchk_class).addClass("un-check"),_p.parent().parent().parent().siblings("dt").length>0&&(_this.settings.cover||setTopCheck(_check))}function appendData(dts){dts.each(function(){$(this).find("."+_chk_class).removeClass("un-check"),_this.settings.self?_this.addTargets($(this)):2===$(this).children("i").length&&_this.addTargets($(this))})}function setSubCheck(node){var _dl=node.parent().parent(),_dt=_dl.parent().children("dl").children("dt"),_check=_dt.children(".fa-check");_check.removeClass(_uchk_class).addClass("un-check"),_this.removeTargets(_dt),_dt.each(function(){$(this).find("."+_chk_class).addClass("un-check"),_this.settings.self?2===$(this).children("i").length&&_this.removeTargets($(this)):_this.removeTargets($(this))})}if($(this).data("info").id||_this.settings.root.selectable){0===_this.treeWrapper.find(".cur-back-line").length?(cur_div=$('<div class="cur-back-line"></div>'),tTop=_this.treeWrapper.offset().top+1,_this.treeWrapper.append(cur_div)):(cur_div=_this.treeWrapper.find(".cur-back-line"),tTop=_this.treeWrapper.offset().top+1),_this.settings.async&&(_this.p_checked=!0);var _p=e.data.iCheck.parent().parent();if(_this.settings.hasCheck)if(_this.settings.multiple){var _chk_class=_this.iconCheck_s.split(" ")[1],_uchk_class=_this.iconCheck_u.split(" ")[1];if(_this.targetsDt=[],_this.tempsAdd=[],_this.tempsIdAdd=[],_this.tempsSub=[],_this.tempsIdSub=[],e.data.iCheck.hasClass("un-check")){if(_this.settings.allCheck){var _dts=_p.find("dt");if(_this.settings.async&&!_this.settings.loadDisabled)if(e.data.pNode){var loading=$('<i class="refreshing glyphicon glyphicon-repeat"></i>');e.data.pNode.prev().append(loading);var _param={};_param.access_token=app.url.access_token;for(var key in _this.settings.async.data)_param[key]=_this.settings.async.data[key];for(var len=_dts.length,_num=0,dts=[],i=0;i<len;i++)_dts.eq(i).children("i").length>2&&dts.push(_dts.eq(i));len=dts.length;for(var i=0;i<len;i++)getAsyncData({pNode:dts[i].next(),dt:dts[i].data("info")},_param,function(dts){_num++,dts&&dts.length>0&&(appendData(dts),_this.settings.events.click&&!_this.settings.unionSelect&&_this.settings.events.click.call($(this),$(this).data("info"))),loading.remove()})}else appendData(_dts);else appendData(_dts)}else _this.addTargets($(this));e.data.iCheck.removeClass(_uchk_class).removeClass("un-check")}else _this.settings.allCheck?_p.find("dt").each(function(){$(this).find("."+_chk_class).addClass("un-check"),_this.settings.self?_this.removeTargets($(this)):2===$(this).children("i").length&&_this.removeTargets($(this))}):_this.removeTargets($(this)),e.data.iCheck.addClass("un-check");_this.settings.leafCheck||setTopCheck(e.data.iCheck)}else e.data.iCheck.hasClass("un-check")?(_this.tree.find(".fa-check").addClass("un-check"),e.data.iCheck.removeClass("un-check"),_this.targetsDt=[],_this.targets=[],_this.tempsAdd=[],_this.tempsIdAdd=[],_this.tempsSub=[],_this.tempsIdSub=[],_this.addTargets(e.data.iCheck.parent())):(_this.tree.find(".fa-check").addClass("un-check"),e.data.iCheck.addClass("un-check"),_this.targets=[]);else cur_div.css("top",$(this).offset().top-tTop),_this.tree.find(".cur-line").removeClass("cur-line"),$(this).addClass("cur-line"),_this.addTargets($(this));_this.settings.events.click&&_this.settings.events.click.call($(this),$(this).data("info"))}}var _this=this,len=data.length,dt=null,dd=null,dl=null,iArrow=null,iCheck=null,iIcon=null,span=null,subs=null,ln=0,hasSub=!1,objArr=[],info={},depth=0;for(var key in this.settings.info){var k=this.settings.datakey[key];k||(k=this.settings.info[key]),k&&(this.dtKey[key]=k)}for(var i=0;i<len&&_this.settings.leafDepth!==_this.treeDepth;i++)if(dl=dl=$('<dl class="cnt-list-warp"></dl>'),dt=$("<dt></dt>"),iArrow=$("<i></i>"),iCheck=$("<i></i>"),iIcon=$("<i></i>"),this.iconHead=$("<img />"),span=$("<span></span>"),_this.settings.targetData&&(data[i]=data[i][_this.settings.targetData]||data[i]),data[i]){span.html(data[i].name),info={};for(var key in _this.dtKey){var k=_this.dtKey[key];"id"===key?info[key]=data[i][k]||"0"==data[i][k]?data[i][k]:data[i].userId:"pid"===key?info[key]=data[i][k]||"0"==data[i][k]?data[i][k]:"x":info[key]=data[i][k]}if(dt.data("info",info),!this.filter||"hidden"!==this.filter.type||"all"!==this.filter.scope||info[this.filter.key.name]!=this.filter.key.value){var _isLeaf=data[i][_this.settings.datakey.leaf];subs=data[i][_this.settings.datakey.sub]||!_isLeaf&&"undefined"!=typeof _isLeaf,subs&&_this.settings.leafDepth-1!==_this.treeDepth?_this.isLeaf=!1:_this.isLeaf=!0,dl.append(dt);var cur_div,tTop,reached=_this.settings.leafDepth&&_this.settings.leafDepth-1===_this.treeDepth;if(subs&&(ln=subs.length)>0&&!reached||_this.settings.allHaveArr&&!_this.isLeaf&&!reached){if(hasSub=!0,dd=$("<dd></dd>"),_this.settings.async&&"0"!=info.id&&!_this.settings.arrType||_this.settings.arrType&&"1"!=_this.settings.arrType[_this.treeDepth])iArrow.addClass(this.iconArrow_r);else{var _search=_this.settings.search&&!_this.settings.search.unwind;_this.settings.arrType&&"1"!=_this.settings.arrType[depth]&&_search||_this.settings.arrType&&"1"!=_this.settings.arrType[depth]&&_this.settings.async&&!_isLeaf?iArrow.addClass(this.iconArrow_r):iArrow.addClass(this.iconArrow_d)}if("root"!==data[i].nodeType&&!data[i].isExtra&&this.filter?"disabled"===this.filter.type&&(info[this.filter.key.name]==this.filter.key.value||this.allExcluded)?iIcon.addClass(this.iconExcluded):iIcon.addClass(this.iconBranch):"root"===data[i].nodeType?iIcon.addClass(this.iconRoot):iIcon.addClass(data[i].icon||this.iconExtra),dt.append(iArrow),iArrow.on("click",{pNode:dd,dt:info},arrowHandler),subs&&ln>0){_this.treeDepth++,this.filter&&"disabled"===this.filter.type&&"all"===this.filter.scope&&info[this.filter.key.name]==this.filter.key.value&&(this.allExcluded=!0,depth=_this.treeDepth);var objs=this.setBranch(subs);depth===_this.treeDepth&&(this.allExcluded=!1);for(var j=0;j<objs.length;j++)dd.append(objs[j]);_this.treeDepth--}var _search=_this.settings.search&&!_this.settings.search.unwind;(this.settings.async||"x"!=info.pid&&"0"!=info.id&&_this.settings.arrType)&&_this.settings.arrType&&"1"!=_this.settings.arrType[_this.treeDepth]&&_search&&dd.addClass("none"),!_this.settings.async&&_this.settings.arrType&&"1"!=_this.settings.arrType[_this.treeDepth]&&dd.addClass("none"),dl.append(dd)}else _this.settings.extra&&!_this.isLeaf?(hasSub=!0,iIcon.addClass("root"!==data[i].nodeType?data[i].isExtra?data[i].icon||this.iconExtra:this.iconBranch:this.iconRoot)):(hasSub=!1,this.filter&&"disabled"===this.filter.type&&(info[this.filter.key.name]==this.filter.key.value||this.allExcluded)?iIcon.addClass(this.iconExcluded):iIcon.addClass(this.iconLeaf));dt.data("subLen",len),_this.settings.hasCheck&&(_this.settings.leafCheck&&_this.isLeaf&&!hasSub?(iCheck.addClass(this.iconCheck_s+" un-check"),dt.append(iCheck)):_this.settings.leafCheck||(iCheck.addClass(this.iconCheck_s+" un-check"),dt.append(iCheck))),dt.append(iIcon).append(span),objArr.push(dl),this.filter&&info[this.filter.key.name]==this.filter.key.value||this.allExcluded||(_this.settings.self||!_this.settings.self&&_this.settings.multiple||_this.settings.leafCheck&&_this.isLeaf&&!hasSub)&&(dt.on("click",{pNode:dd,iCheck:iCheck,dt:info},checked),_this.p_checked&&0===_this.treeDepth&&_this.settings.async&&dt.trigger("click"));var div=$('<div class="back-line"></div>');dt.hover(function(){tTop=_this.treeWrapper.offset().top+1,div.css("top",$(this).offset().top-tTop),_this.treeWrapper.append(div),($(this).data("info").id||_this.settings.root.selectable)&&_this.settings.events.mouseenter&&_this.settings.events.mouseenter.call($(this),$(this).data("info"))},function(){div.remove(),($(this).data("info").id||_this.settings.root.selectable)&&_this.settings.events.mouseleave&&_this.settings.events.mouseleave.call($(this),$(this).data("info"))})}}return objArr},insertNodes:function(node,dt){for(var _this=this,objs=this.setBranch(dt),i=0;i<objs.length;i++)node.append(objs[i]);this.settings.async&&_this.p_checked&&node.addClass("none");for(var _dt=node.children("dl").children("dt"),i=0;i<_dt.length;i++)_dt.eq(i).data("subLen",_dt.length)},initCheckStatus:function(){if(this.fixdata)for(var dts=this.tree.find("dt"),fixDt=this.fixdata,ln=fixDt.length,l=dts.length,i=0;i<ln;i++)for(var j=0;j<l;j++){var _dt=dts.eq(j);if(_dt.data("info").id==fixDt[i].id&&_dt.children(".un-check").length>0){_dt.trigger("click");break}}},setCheck:function(id){for(var len=this.targets.length,i=0;i<len;i++){var dt=$(this.targetsDt[i]);if(id===dt.data("info").id&&0===dt.children("un-check").length){dt.trigger("click");break}}},setLeafDepth:function(num){this.settings.leafDepth=num},getTargets:function(){return this.targets},getTargetsId:function(){return this.targetsId},getTempsAdd:function(){return this.tempsAdd},getTempsIdAdd:function(){return this.tempsIdAdd},getTempsSub:function(){return this.tempsSub},getTempsIdSub:function(){return this.tempsIdSub},addTargets:function(dt){this.settings.multiple||(this.targetsDt=[],this.targets=[],this.targetsId=[],this.tempsAdd=[],this.tempsIdAdd=[],this.tempsIdSub=[]);var info=dt.data("info");this.targetsId.indexOf(info.id)===-1&&(this.targetsDt.push(dt),this.targets.push(info),this.targetsId.push(info.id)),this.tempsAdd.push(info),this.tempsIdAdd.push(info.id)},removeTargets:function(dt){var idx=(dt.length,-1),info=dt.data("info");idx=this.targetsId.indexOf(info.id),idx!==-1&&(this.targetsDt.splice(idx,1),this.targets.splice(idx,1),this.targetsId.splice(idx,1)),this.tempsSub.push(info),this.tempsIdSub.push(info.id)},getTree:function(){return this.tree},getSourceData:function(){return this.sourceData},deepClone:function(obj){function clone(obj){if(obj.constructor===Object){var _obj={};for(var k in obj)!obj[k]||obj[k].constructor!==Object&&obj[k].constructor!==Array?_obj[k]=obj[k]:_obj[k]=clone(obj[k])}else if(obj.constructor===Array)for(var _obj=[],len=obj.length,i=0;i<len;i++)!obj[i]||obj[i].constructor!==Array&&obj[i].constructor!==Object?_obj.push(obj[i]):_obj.push(clone(obj[i]));else var _obj=obj;return _obj}return obj&&"object"==typeof obj?clone(obj):obj}},window.Tree=Tree}(window);