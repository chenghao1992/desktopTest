/**
 * Created by clf on 2015/10/13.
 */
'use strict';
(function() {

app.controller('GroupArticleListCtrl', function($scope, $timeout, utils, $http, $modal, toaster, $location, $state, Group, AppFactory) {
    'use strict'
    //当前集团id
    var curGroupId = localStorage.getItem('curGroupId');
    //获取当前用户的userId
    var userId = localStorage.getItem('user_id');
    //当前选中的病种id
    var currentTreeId;
    //"更多"按钮
    $scope.showMore = false;
    //所有文档
    var articleTable;
    //筛选模块
    $scope.isCollapsed = false;
    $scope.open = false;
    //树的数据的加载情况
    $scope.isTreeLoaded = false;
    //文章的加载情况
    //$scope.isDocLoaded = false;
    //关键字
    $scope.mainKeyword = null;
    //点击搜索前所在的branch
    var preBranch;

    // 获取当前组织信息
    $scope.currentOrgInfo = Group.getCurrentOrgInfo();

    // 是否博徳嘉联
    if ($scope.currentOrgInfo) {
        AppFactory.group.isServiceGroup($scope.currentOrgInfo.id)
            .then(function (_data) {
                if (_data) {
                    $scope.isServiceGroup = true;
                } else {
                    $scope.isServiceGroup = false;
                }
            });
    }

    //初始化树
    var tree = {};
    $scope.my_tree = tree = {};

    $scope.mainKWLength = 0;
    $scope.$watch('mainKeyword', function(newValue, oldValue) {
        if (newValue != oldValue) {
            if ($scope.mainKeyword) {
                $scope.mainKWLength = $scope.mainKeyword.length;
            } else {
                $scope.mainKWLength = 0;
            }
        }
    });


    //所有文档获取数据的url和param
    var allDocUrl = app.url.document.getArticleByDisease;
    var allDocParam = {
        access_token: app.url.access_token,
        createType: 2,
        pageIndex: 1,
        pageSize: 10,
        createrId: curGroupId
    };

    //清除搜索关键字
    $scope.clearMainKW = function() {
        $scope.my_tree.select_branch(preBranch);
        $scope.mainKeyword = null;
    };


    //文档树的数据
    $scope.my_data = [];

    //将服务端传过来树结构转换为树控件支持的结构
    function clone(myObj) {
        var newObj = {};
        newObj.label = myObj.name + '(' + myObj.count + ')';
        newObj.id = myObj.diseaseId;
        if (myObj.children != undefined) {
            newObj.children = [];
            for (var i in myObj.children) {
                newObj.children[i] = clone(myObj.children[i]);
            }
        }
        return newObj;
    }

    //这里要获取病种树的数据
    var getTreeData = function() {
        $http.post(app.url.group.getCategoryList, {
            access_token: app.url.access_token,
            createType: 2,
            groupId: curGroupId
        }).
        success(function(data, status, headers, config) {
            if (data.resultCode == 1) {

                var source = {
                    count: data.data.total,
                    name: '全部文档'
                };

                source.children = data.data.tree;
                var result = clone(source);
                var eArray = new Array();
                eArray[0] = result;
                $scope.my_data = eArray;
                $scope.isTreeLoaded = true;
            } else {
                console.log(data.resultMsg);
            }
        }).
        error(function(data, status, headers, config) {
            alert(data.resultMsg);
        });
    };

    getTreeData();

    //点击文档树节点
    $scope.my_tree_handler = function(branch) {
        currentTreeId = branch.id;
        //如果是文档树的最后节点
        if (branch.level == 3) {
            //请求病种标签
            $http.post(app.url.document.getDisease, {
                parentId: branch.id
            }).
            success(function(data, status, headers, config) {
                if (data.resultCode == 1) {
                    $scope.keywords = data.data;
                    if ($scope.keywords.length > 0) {
                        $scope.keywords.unshift({
                            name: '不限',
                            id: null
                        });
                    }
                } else {
                    alert(data.resultMsg);
                }
            }).
            error(function(data, status, headers, config) {
                alert(data.resultMsg);
            });

        } else {
            $scope.keywords = [];
        }

        allDocUrl = app.url.document.getArticleByDisease;
        allDocParam = {
            access_token: app.url.access_token,
            createType: 2,
            pageIndex: 1,
            pageSize: 10,
            createrId: curGroupId,
            diseaseId: branch.id
        };
        initDocTable();
    };

    //点击新建文章
    $scope.createArticle = function() {
        $state.go('app.document.group.create_article', null, {
            reload: true
        });
    };

    //点击病种标签
    $scope.sortByKeyword = function(keyword) {
        if (keyword.name == '不限') {
            allDocUrl = app.url.document.getArticleByDisease;
            allDocParam = {
                access_token: app.url.access_token,
                createType: 2,
                pageIndex: 1,
                pageSize: 10,
                createrId: curGroupId,
                diseaseId: currentTreeId
            };
        } else {
            allDocUrl = app.url.document.findArticleByTag;
            allDocParam = {
                access_token: app.url.access_token,
                createType: 2,
                pageIndex: 1,
                pageSize: 10,
                createrId: curGroupId,
                tags: keyword.id
            };
        }

        initDocTable();
    };


    //按回车键搜索文档标题
    $scope.pressEnter = function($event) {
        if ($event.keyCode == 13) {
            $scope.findDocByKeyWord();
        }
    };

    //关键字搜索文档标题
    $scope.findDocByKeyWord = function() {
        preBranch = $scope.my_tree.get_selected_branch();
        $scope.my_tree.select_branch();
        $scope.keywords = [];
        if ($scope.mainKeyword == null || $scope.mainKeyword.length == 0) {
            //所有文档
            allDocUrl = app.url.document.getArticleByDisease;
            allDocParam = {
                access_token: app.url.access_token,
                createType: 2,
                pageIndex: 1,
                pageSize: 10,
                createrId: curGroupId
            };
        } else {
            allDocUrl = app.url.knowledge.findKnowledgeListByKeys;
            allDocParam = {
                title: $scope.mainKeyword,
                access_token: app.url.access_token,
                createType: 2,
                createrId: curGroupId,
                pageIndex: 1,
                pageSize: 10
            };
        }
        initDocTable();
    };

    //观察关键字长度来确定是否显示“更多”按钮
    $scope.$watch('keywords', function(newValue, oldValue) {
        setTimeout(function() {
            var kw_c_height = $('#g_kw_content').height();
            console.log(kw_c_height);
            if (kw_c_height < 40) {
                $scope.showMore = false;

            } else {
                $scope.showMore = true;
            }
            $scope.$apply('showMore');
        }, 0);
    });

    //从平台添加文章
    $scope.addFromPlatform = function() {
        var modalInstance = $modal.open({
            templateUrl: 'docModalContent.html',
            controller: 'article_list_docModalInstanceCtrl',
            windowClass: 'docModal doc',
            resolve: {
                items: function() {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            //所有文档获取数据的url和param
            allDocUrl = app.url.document.getArticleByDisease;
            allDocParam = {
                access_token: app.url.access_token,
                createType: 2,
                pageIndex: 1,
                pageSize: 10,
                createrId: curGroupId
            };
            initDocTable();
            //树的数据的加载情况
            $scope.isTreeLoaded = false;
            getTreeData();
        }, function() {
            allDocUrl = app.url.document.getArticleByDisease;
            allDocParam = {
                access_token: app.url.access_token,
                createType: 2,
                pageIndex: 1,
                pageSize: 10,
                createrId: curGroupId
            };
            initDocTable();
            //树的数据的加载情况
            $scope.isTreeLoaded = false;
            getTreeData();
        });
    };


    //编辑文章
    var editArticle = function(aData) {
        $state.go('app.document.group.edit_article', {
            id: aData.id
        }, {
            'reload': true
        });
    };


    //取消收藏
    var removeCollect = function(aData, nRow) {
        $http.post(app.url.document.collectArticleRemove, {
            access_token: app.url.access_token,
            articleId: aData.id,
            createType: 2,
            createrId: curGroupId
        }).
        success(function(data, status, headers, config) {
            if (data.resultCode == 1) {
                nRow.remove();
                toaster.pop('success', '', '取消收藏成功');
            } else {
                console.log(data.resultMsg);
            }
        }).
        error(function(data, status, headers, config) {
            alert(data.resultMsg);
        });
    };


    // 初始化所有文档表格
    function initDocTable() {
        var index = 1,
            length = 10,
            start = 0,
            idx = 0,
            size = 10,
            num = 0;

        var setTable = function() {
            articleTable = $('#article_list').DataTable({
                "language": app.lang.datatables.translation,
                "searching": false,
                "sScrollX": "100%",
                "sScrollXInner": "110%",
                "destroy": true,
                "lengthChange": true,
                "ordering": false,
                "draw": index,
                "pageLength": length,
                "lengthMenu": [5, 10, 20, 50],
                "autoWidth": false,
                "displayStart": start,
                "bServerSide": true,
                "sAjaxSource": allDocUrl,
                "fnServerData": function(sSource, aoData, fnCallback) {
                    //$timeout(function() {
                    //    $scope.isDocLoaded = false;
                    //});

                    $.ajax({
                        "type": "post",
                        "url": sSource,
                        "dataType": "json",
                        "data": allDocParam,
                        "success": function(resp) {
                            if (resp.resultCode == 1) {
                                //$timeout(function() {
                                //    $scope.isDocLoaded = true;
                                //});
                                var data = {};
                                data.recordsTotal = resp.data.total;
                                data.recordsFiltered = resp.data.total;
                                data.length = resp.data.pageSize;
                                data.data = resp.data.pageData;
                                size = aoData[4]['value'];
                                fnCallback(data);
                            } else {
                                console.log(resp.resultMsg);
                            }
                        }
                    });
                },
                "columns": [{
                    "data": "author",
                    "render": function(set, status, dt) {

                        var keywordsStr = '';
                        if (dt.tag && dt.tag.length > 0) {
                            keywordsStr += '关键字：';
                            dt.tag.forEach(function(item, index, array) {
                                if (item) {
                                    keywordsStr += item.name + '；';
                                }
                            });
                        } else {
                            keywordsStr += '&nbsp;'
                        }

                        //var groupNameStr=dt.groupName?'&nbsp<i class="fa fa-circle" style="transform:scale(0.5,0.5);"></i>&nbsp'+dt.groupName:'';
                        //var doctorTitle=dt.doctor&&dt.doctor.title?'&nbsp<i class="fa fa-circle" style="transform:scale(0.5,0.5);"></i>&nbsp'+dt.doctor.title:'';
                        //var doctorHos=dt.doctor&&dt.doctor.hospital?'&nbsp<i class="fa fa-circle" style="transform:scale(0.5,0.5);"></i>&nbsp'+dt.doctor.hospital:'';
                        var authorName = dt.authorName ? dt.authorName : dt.author;
                        var photoPath = dt.copy_small ? dt.copy_small : 'src/img/nophoto.jpg';

                        return '<img src=' + photoPath + ' alt="..." style="width:60px;height:60px;margin-right:10px;float:left;border-radius:0;">' +
                            '<span class="clear">' +
                            '<span>' + dt.title + '</span>' +
                            '<small class="text-muted clear text-ellipsis">' + keywordsStr.substring(0, 30) +
                            '</small>' +
                            '<small class="text-muted clear text-ellipsis">作者：' + authorName +
                            '</small>' +
                            '</span>';
                    }
                }, {
                    "data": "useNum",
                    "render": function(set, status, dt) {
                        if (dt.useNum == undefined) {
                            return 0;
                        } else {
                            return dt.useNum;
                        }
                    }
                }, {
                    "data": "visitCount",
                    "render": function(set, status, dt) {
                        if (dt.visitCount == undefined) {
                            return 0;
                        } else {
                            return dt.visitCount;
                        }
                    }
                }, {
                    "render": function(set, status, dt) {
                        return utils.dateFormat(dt.creatTime, 'yyyy-MM-dd');
                    }
                }, {
                    "render": function(set, status, dt) {
                        if (dt.collect == 2) {
                            return '<label id="editArticle" class="operate">编辑</label> | <label id="copyUrl"  class="operate copyUrl" data-clipboard-text="' + dt.url + '">拷贝url</label>';
                        } else if (dt.collect == 1) {
                            if (dt.groupId.indexOf(curGroupId)>-1) {
                                return '<label id="editArticle" class="operate">编辑</label> | <label id="copyUrl"  class="operate copyUrl" data-clipboard-text="' + dt.url + '">拷贝url</label>';
                            } else {
                                return '<label id="removeCollect" class="operate">取消收藏</label> | <label id="copyUrl"  class="operate copyUrl" data-clipboard-text="' + dt.url + '">拷贝url</label>';
                            }
                        } else {
                            return '<label id="copyUrl"  class="operate copyUrl" data-clipboard-text="' + dt.url + '">拷贝url</label>';
                        }

                    }
                }],
                "createdRow": function(nRow, aData, iDataIndex) {
                    $(nRow).on('click', '#editArticle', function(event) {
                        editArticle(aData);
                        event.stopPropagation();
                    });
                    $(nRow).on('click', '#removeCollect', function(event) {
                        removeCollect(aData, nRow);
                        event.stopPropagation();
                    });
                    $(nRow).on('click', '', function(event) {
                        if (event.target.id == 'copyUrl') {
                            return;
                        }
                        var url = $state.href('groupArticle', {
                            id: aData.id
                        });
                        window.open(url, '_blank');
                    });
                }
            });

            // 表格事件处理,init-初始化完成,length-改变每页长度,page-翻页,search-搜索
            articleTable.off('page.dt').on('page.dt', function(e, settings) {
                    index = articleTable.page.info().page + 1;
                    start = length * (index - 1);
                    allDocParam.pageIndex = index;
                })
                .on('length.dt', function(e, settings, len) {
                    length = len;
                    index = 1;
                    start = 0;
                    allDocParam.pageIndex = 1;
                    allDocParam.pageSize = len;
                });
        };
        setTable();
    }

    initDocTable();

    var clipboard = new Clipboard('.copyUrl');

    clipboard.on('success', function(e) {
        $timeout(function() {
            toaster.pop('success', '', '复制成功')
        });
        e.clearSelection();
    });

    clipboard.on('error', function(e) {
        $timeout(function() {
            toaster.pop('error', '', '复制失败');
        });
        e.clearSelection();
    });

    window.reflashData = function() {
        initDocTable();
    };

    $scope.$on('$destroy', function() {
        clipboard.destroy();
    });
});


//平台文档
app.controller('article_list_docModalInstanceCtrl', function($scope, $modalInstance, toaster, $http, utils, $timeout) {
    //当前集团id
    var curGroupId = localStorage.getItem('curGroupId');

    //所有文档
    var platArticleTable;
    //筛选模块
    $scope.isCollapsed = false;
    $scope.open = false;

    //“更多”按钮
    $scope.showMore = false;

    //当前选中的病种id
    var currentTreeId;

    //病种标签列表
    $scope.keywords = [];

    //树的数据的加载情况
    $scope.isTreeLoaded = false;

    //文章的加载情况
    $scope.isDocLoaded = false;

    $scope.mainKeyword = null;

    //点击搜索前所在的branch
    var preBranch;
    var tree = {};
    $scope.my_tree = tree = {};

    //所有文档获取数据的url和param
    var allDocUrl = app.url.document.getArticleByDisease;
    var allDocParam = {
        access_token: app.url.access_token,
        createType: 4,
        createrId: curGroupId,
        pageIndex: 1,
        pageSize: 10
    };


    //文档树的数据
    $scope.my_data = [];

    function clone(myObj) {
        var newObj = {};
        newObj.label = myObj.name + '(' + myObj.count + ')';
        newObj.id = myObj.diseaseId;
        if (myObj.children != undefined) {
            newObj.children = [];
            for (var i in myObj.children) {
                newObj.children[i] = clone(myObj.children[i]);
            }
        }
        return newObj;
    }


    //这里要获取病种树的数据
    var getTreeData = function() {
        $http.post(app.url.document.findDiseaseTreeForArticle, {
            access_token: app.url.access_token,
            createType: 1
        }).
        success(function(data, status, headers, config) {
            if (data.resultCode == 1) {
                var source = {
                    count: data.data.total,
                    name: '全部文档',
                    diseaseId: null
                };
                source.children = data.data.tree;
                var result = clone(source);
                var eArray = new Array();
                eArray[0] = result;
                $scope.my_data = eArray;
                $scope.isTreeLoaded = true;
            } else {
                console.log(data.resultMsg);
            }
        }).
        error(function(data, status, headers, config) {
            alert(data.resultMsg);
        });
    };

    getTreeData();

    //点击文档树节点
    $scope.my_tree_handler = function(branch) {
        currentTreeId = branch.id;
        $scope.isTop = false;

        //如果是文档树的最后节点
        if (branch.children.length == 0) {
            //请求病种标签
            $http.post(app.url.document.getDisease, {
                parentId: branch.id
            }).
            success(function(data, status, headers, config) {
                if (data.resultCode == 1) {
                    $scope.keywords = data.data;
                    if ($scope.keywords.length > 0) {
                        $scope.keywords.unshift({
                            name: '不限',
                            id: null
                        });
                    }
                } else {
                    alert(data.resultMsg);
                }
            }).
            error(function(data, status, headers, config) {
                alert(data.resultMsg);
            });

        } else {
            $scope.keywords = [];
        }

        allDocUrl = app.url.document.getArticleByDisease;
        allDocParam = {
            access_token: app.url.access_token,
            createType: 4,
            createrId: curGroupId,
            pageIndex: 1,
            pageSize: 10,
            diseaseId: branch.id
        };
        initPlatDocTable();

    };

    //watch搜索框
    $scope.mainKWLength = 0;
    $scope.$watch('mainKeyword', function(newValue, oldValue) {
        if (newValue != oldValue) {
            if ($scope.mainKeyword) {
                $scope.mainKWLength = $scope.mainKeyword.length;
            } else {
                $scope.mainKWLength = 0;
            }
        }
    });

    //观察关键字长度来确定是否显示“更多”按钮
    $scope.$watch('keywords', function(newValue, oldValue) {
        setTimeout(function() {
            var kw_c_height = $('#p_kw_content').height();
            console.log(kw_c_height);
            if (kw_c_height < 40) {
                $scope.showMore = false;

            } else {
                $scope.showMore = true;
            }
            $scope.$apply('showMore');
        }, 0);
    });


    //点击病种标签
    $scope.sortByKeyword = function(keyword) {
        if (keyword.name == '不限') {
            allDocUrl = app.url.document.getArticleByDisease;
            allDocParam = {
                access_token: app.url.access_token,
                createType: 4,
                createrId: curGroupId,
                pageIndex: 1,
                pageSize: 10,
                diseaseId: currentTreeId
            };
        } else {
            allDocUrl = app.url.document.findArticleByTag;
            allDocParam = {
                access_token: app.url.access_token,
                createType: 4,
                createrId: curGroupId,
                pageIndex: 1,
                pageSize: 10,
                tags: keyword.id
            };
        }

        initPlatDocTable();
    };


    //清除搜索关键字
    $scope.clearMainKW = function() {
        $scope.my_tree.select_branch(preBranch);
        $scope.mainKeyword = null;
    };


    //按回车键搜索文档标题
    $scope.pressEnter = function($event) {
        if ($event.keyCode == 13) {
            $scope.findDocByKeyWord();
        }
    };

    //关键字搜索文档标题
    $scope.findDocByKeyWord = function() {
        preBranch = $scope.my_tree.get_selected_branch();
        $scope.my_tree.select_branch();
        $scope.keywords = [];
        if ($scope.mainKeyword == null || $scope.mainKeyword.length == 0) {
            //所有文档
            allDocUrl = app.url.document.getArticleByDisease;
            allDocParam = {
                access_token: app.url.access_token,
                createType: 4,
                createrId: curGroupId,
                pageIndex: 1,
                pageSize: 10
            };
        } else {
            //搜索标题
            allDocUrl = app.url.document.findArticleByKeyWord;
            allDocParam = {
                title: $scope.mainKeyword,
                access_token: app.url.access_token,
                createType: 4,
                createrId: curGroupId,
                pageIndex: 1,
                pageSize: 10
            };
        }
        initPlatDocTable();
    };


    //收藏
    var collectArticle = function(aData) {
        $http.post(app.url.document.collectArticle, {
            access_token: app.url.access_token,
            articleId: aData.id,
            createType: 2,
            createrId: curGroupId
        }).
        success(function(data, status, headers, config) {
            if (data.resultCode == 1) {
                if (data.data == "false") {
                    toaster.pop('error', '', '收藏失败');
                } else if (data.data == "true") {
                    allDocParam.pageIndex = 1;
                    initPlatDocTable();
                    toaster.pop('success', '', '收藏成功');
                }

            } else {
                console.log(data.resultMsg);
            }
        }).
        error(function(data, status, headers, config) {
            console.log(data.resultMsg);
        });
    };


    //取消收藏
    var removeCollect = function(aData) {
        $http.post(app.url.document.collectArticleRemove, {
            access_token: app.url.access_token,
            articleId: aData.id,
            createType: 2,
            createrId: curGroupId
        }).
        success(function(data, status, headers, config) {
            if (data.resultCode == 1) {
                allDocParam.pageIndex = 1;
                initPlatDocTable();
                toaster.pop('success', '', '取消收藏成功');
            } else {
                console.log(data.resultMsg);
            }
        }).
        error(function(data, status, headers, config) {
            alert(data.resultMsg);
        });
    };



    // 初始化所有文档表格
    function initPlatDocTable() {
        var index = 1,
            length = 10,
            start = 0,
            size = 10;

        var setTable = function() {
            platArticleTable = $('#doc_list').DataTable({
                "language": app.lang.datatables.translation,
                "searching": false,
                "sScrollX": "100%",
                "sScrollXInner": "110%",
                "destroy": true,
                "lengthChange": true,
                "ordering": false,
                "draw": index,
                "pageLength": length,
                "lengthMenu": [5, 10, 20, 50],
                "autoWidth": false,
                "displayStart": start,
                "bServerSide": true,
                "sAjaxSource": allDocUrl,
                "fnServerData": function(sSource, aoData, fnCallback) {
                    //$timeout(function() {
                    //    $scope.isDocLoaded = false;
                    //});
                    $.ajax({
                        "type": "post",
                        "url": sSource,
                        "dataType": "json",
                        "data": allDocParam,
                        "success": function(resp) {
                            if (resp.resultCode == 1) {
                                var data = {};
                                data.recordsTotal = resp.data.total;
                                data.recordsFiltered = resp.data.total;
                                data.length = resp.data.pageSize;
                                data.data = resp.data.pageData;
                                size = aoData[4]['value'];
                                fnCallback(data);
                                //$timeout(function() {
                                //    $scope.isDocLoaded = true;
                                //});
                            } else {
                                console.log(resp.resultMsg);
                            }
                        }
                    });
                },
                "columns": [{
                    "data": "author",
                    "render": function(set, status, dt) {

                        var keywordsStr = '';
                        if (dt.tag && dt.tag.length > 0) {
                            keywordsStr += '关键字：';
                            dt.tag.forEach(function(item, index, array) {
                                if (item) {
                                    keywordsStr += item.name + '；';
                                }
                            });
                        } else {
                            keywordsStr += '&nbsp;'
                        }
                        //var groupNameStr=dt.groupName?'&nbsp<i class="fa fa-circle" style="transform:scale(0.5,0.5);"></i>&nbsp'+dt.groupName:'';
                        //var doctorTitle=dt.doctor&&dt.doctor.title?'&nbsp<i class="fa fa-circle" style="transform:scale(0.5,0.5);"></i>&nbsp'+dt.doctor.title:'';
                        //var doctorHos=dt.doctor&&dt.doctor.hospital?'&nbsp<i class="fa fa-circle" style="transform:scale(0.5,0.5);"></i>&nbsp'+dt.doctor.hospital:'';
                        var authorName = dt.authorName ? dt.authorName : dt.author;
                        var photoPath = dt.copy_small ? dt.copy_small : 'src/img/nophoto.jpg';

                        return '<img src=' + photoPath + ' alt="..." style="width:60px;height:60px;margin-right:10px;float:left;border-radius:0;">' +
                            '<span class="clear">' +
                            '<span>' + dt.title + '</span>' +
                            '<small class="text-muted clear text-ellipsis">' + keywordsStr.substring(0, 30) +
                            '</small>' +
                            '<small class="text-muted clear text-ellipsis">作者：' + authorName +
                            '</small>' +
                            '</span>';
                    },
                    "orderable":  false
                }, {
                    "data": "useNum",
                    "orderable":  false,
                    "render": function(set, status, dt) {
                        if (dt.useNum == undefined) {
                            return 0;
                        } else {
                            return dt.useNum;
                        }
                    }
                }, {
                    "data": "visitCount",
                    "orderable":  false,
                    "render": function(set, status, dt) {
                        if (dt.visitCount == undefined) {
                            return 0;
                        } else {
                            return dt.visitCount;
                        }
                    }
                }, {
                    "render": function(set, status, dt) {
                        return utils.dateFormat(dt.creatTime, 'yyyy-MM-dd');
                    }
                }, {
                    "render": function(set, status, dt) {
                        if (dt.collect == 0) {
                            return '<label id="collectArticle" class="operate">收藏</label>';
                        } else if (dt.collect == 1) {
                            if (dt.groupId.indexOf(curGroupId)>-1) {
                                return '';
                            } else {
                                return '<label id="removeCollect" class="operate">取消收藏</label>';
                            }
                        } else {
                            return "";
                        }

                    },
                    "orderable":  false
                }],
                "createdRow": function(nRow, aData, iDataIndex) {
                    $(nRow).on('click', '#collectArticle', function(event) {
                        collectArticle(aData);
                        event.stopPropagation();
                    });
                    $(nRow).on('click', '#removeCollect', function(event) {
                        removeCollect(aData);
                        event.stopPropagation();
                    });
                    $(nRow).on('click', '', function() {
                        window.open(aData.url + '?' + Date.now());
                    });
                }
            });


            // 表格事件处理,init-初始化完成,length-改变每页长度,page-翻页,search-搜索
            platArticleTable.off('page.dt').on('page.dt', function(e, settings) {
                    index = platArticleTable.page.info().page + 1;
                    start = length * (index - 1);
                    allDocParam.pageIndex = index;
                })
                .on('length.dt', function(e, settings, len) {
                    length = len;
                    index = 1;
                    start = 0;
                    allDocParam.pageIndex = 1;
                    allDocParam.pageSize = len;
                });
        };
        setTable();

    }

    setTimeout(function() {
        initPlatDocTable();
    }, 200);


    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };


});
})();
