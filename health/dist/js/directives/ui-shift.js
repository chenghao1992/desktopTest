angular.module("app").directive("uiShift",["$timeout",function($timeout){return{restrict:"A",link:function(scope,el,attr){function sm(){$timeout(function(){var method=attr.uiShift,target=attr.target;_el.hasClass("in")||_el[method](target).addClass("in")})}function md(){parent&&parent.prepend(el),!parent&&_el.insertAfter(prev),_el.removeClass("in")}var parent,_el=$(el),_window=$(window),prev=_el.prev(),width=_window.width();!prev.length&&(parent=_el.parent()),width<768&&sm()||md(),_window.resize(function(){width!==_window.width()&&$timeout(function(){_window.width()<768&&sm()||md(),width=_window.width()})})}}}]);