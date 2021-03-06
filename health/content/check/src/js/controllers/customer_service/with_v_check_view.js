'use strict';
(function () {
    app.controller('GroupCheckEdit', ['$scope', '$http', '$state', '$rootScope', 'utils', '$stateParams', 'modal','$modal',
        function ($scope, $http, $state, $rootScope, utils, $stateParams, modal,$modal) {
            //var userId;
            $scope.isPass = true;
            $scope.authError = null;
            $scope.formData = {};
            $scope.viewData = {};
            $scope.tabs = {};

            if($stateParams.id){
                var groupId = $stateParams.id || utils.localData('curGroupId');
            }

            $scope.isCheckingV = $scope.isCheckingV || utils.localData('isCheckingV') === 'true';

            $scope.isEditing = utils.localData('isEditing') ? true : false;

            // 获取认证公司信息
            var getGroupInfo = function(){
                if(groupId){
                    $http({
                        url: app.url.admin.check.getGroupCert,
                        method: 'post',
                        data: {
                            access_token: app.url.access_token,
                            groupId: groupId || utils.localData('curGroupId')
                        }
                    }).then(function(resp) {
                        if (resp.data.resultCode === 1) {
                            var dt = resp.data.data;
                            // 集团信息
                            $scope.viewData.name = dt.name || '--';
                            $scope.viewData.introduction = dt.introduction || '--';
                            $scope.viewData.logo = dt.groupIconPath || 'src/img/logoDefault.jpg';
                            $scope.viewData.skill = dt.diseaseName || '--';

                            if(!dt.groupCert){
                                $scope.hasIdentified = false;
                            }else{
                                $scope.hasIdentified = true;
                                // 公司信息
                                $scope.companyName = dt.groupCert.companyName;
                                $scope.orgCode = dt.groupCert.orgCode;
                                $scope.license = dt.groupCert.license;
                                $scope.corporation = dt.groupCert.corporation;
                                $scope.businessScope = dt.groupCert.businessScope;
                                $scope.accountName = dt.groupCert.accountName;
                                $scope.openBank = dt.groupCert.openBank;
                                $scope.bankAcct = dt.groupCert.bankAcct;
                                $scope.adminName = dt.groupCert.adminName;
                                $scope.idNo = dt.groupCert.idNo;
                                $scope.adminTel = dt.groupCert.adminTel;
                                $scope.usrPicUrl = dt.groupCert.idImage;
                                $scope.orgCodePicUrl = dt.groupCert.orgCodeImage;
                                $scope.licPicUrl = dt.groupCert.licenseImage;
                                //$scope.remarks = dt.groupCert.remarks;
                            }
                        } else {
                            $scope.authError = resp.data.resultMsg;
                        }
                    }, function(resp) {
                        $scope.authError = resp.data.resultMsg;
                    });
                }
            };

            $scope.tabs.groupInfo = function(){
                $scope.isEditing = false;
                utils.localData('isEditing', null);
                if($rootScope.groupInfo){
                    $scope.viewData.name = $rootScope.groupInfo.name || '--';
                    $scope.viewData.introduction = $rootScope.groupInfo.introduction || '--';
                    $scope.viewData.logo = $rootScope.groupInfo.logo || 'src/img/logoDefault.jpg';
                    $scope.viewData.skill = $rootScope.groupInfo.skill || '--';
                }else{
                    if(groupId){
                        getGroupInfo();
                    }
                }
                //utils.localData('isEditing', null);
            };

            $scope.tabs.companyInfo = function(){
                getGroupInfo();
            };

            // 提交并更新数据
            $scope.submit = function() {
                var modalInstance = $modal.open({
                    templateUrl: 'delModalContent.html',
                    controller: 'delModalInstanceCtrl',
                    size: 'sm'
                });

                modalInstance.result.then(function (status) {
                    if (status == 'ok') {
                        var chk_pass = $('#pass'),
                            formParam = {},
                            remark = $('.check-items input:checked').siblings('span'),
                            isPass = true;

                        if (remark.length > 0) {
                            $scope.formData.remark = remark.html();
                        } else {
                            $scope.formData.remark = $scope.viewData.remarkNopass;
                        }
                        $scope.formData.access_token = app.url.access_token;

                        // 选择url，并组装提交参数
                        formParam = {
                            access_token: app.url.access_token,
                            groupId: groupId
                        };
                        if (chk_pass.prop('checked')) {
                            var url = app.url.admin.check.passCert;
                            isPass = true;
                        } else {
                            var url = app.url.admin.check.noPass;
                            formParam.remarks = $scope.formData.remark;
                            isPass = false;
                        }

                        $http.post(url, formParam).then(function (resp) {
                            if (resp.data.resultCode === 1) {
                                // 更新界面中的数据
                                $('#group_check_with_v').html(utils.localData('group_check_with_v') * 1 - 1);
                                window.history.back();
                            } else {
                                modal.toast.error(resp.data.resultMsg);
                            }
                        }, function (x) {
                            modal.toast.error('服务器错误！');
                        });
                    }
                })
            }

            // 不操作返回
            $scope.return = function () {
                utils.localData('isEditing', null);
                $rootScope.ids = [];
                window.history.back();
            };

            setTimeout(function () {
                var chk_pass = $('#pass');
                var chk_nopass = $('#nopass');
                var is = $('.required-items i');
                var ipts = $('.required-items input');
                var btn = $('form button[type=submit]');
                var other = $('#other_remark');
                var txtr = $('#remarkNopass');
                var timer_a, timer_b;

                chk_nopass.change(function () {
                    if (chk_nopass.prop('checked')) {
                        is.addClass('none');
                        ipts.removeAttr('required');
                        if (!other.prop('checked')) {
                            btn.removeAttr('disabled');
                        }
                        if (!timer_a) {
                            timer_a = setInterval(function () {
                                if (other.prop('checked')) {
                                    if (/\S/g.test(txtr.val())) {
                                        btn.removeAttr('disabled');
                                    } else {
                                        btn.attr('disabled', true);
                                        clearInterval(timer_b);
                                        if (!timer_b) {
                                            timer_b = setInterval(function () {
                                                if (/\S/g.test(txtr.val())) {
                                                    btn.removeAttr('disabled');
                                                } else {
                                                    btn.attr('disabled', true);
                                                }
                                            }, 200);
                                        }
                                    }
                                } else {
                                    clearInterval(timer_b);
                                    timer_b = null;
                                    btn.removeAttr('disabled');
                                }
                            }, 200);
                        }
                    } else {
                        clearInterval(timer_a);
                        timer_a = null;
                    }
                });
                chk_pass.change(function () {
                    clearInterval(timer_a);
                    clearInterval(timer_b);
                    timer_a = timer_b = null;
                    if (chk_pass.prop('checked')) {
                        btn.removeAttr('disabled');
                        is.removeClass('none');
                    }
                });
            }, 500);

            var curFile, progress, imgURL;

            $scope.selectFile = function (model) {
                $scope.upload();
                progress = model + 'Progress';
                imgURL = model + 'Url';
            };

            // 设置七牛上传获取uptoken的参数
            $scope.token = app.url.access_token;

            // 选择文件后回调
            $scope.uploaderAdded = function (up, files) {
                $scope.uploadBoxOpen = true;
            };
            // 文件上传进度
            $scope.progress = function (up, file) {
                $scope[progress] = file.percent;
            };

            // 每个文件上传成功回调
            $scope.uploaderSuccess = function (up, file, info) {
                if (file.url) {
                    $scope[imgURL] = file.url;
                    $scope.$apply();
                }

                file.result = '上传成功！';
                modal.toast.success('上传成功！');
            };

            // 每个文件上传失败后回调
            $scope.uploaderError = function (up, err, errTip) {
                modal.toast.error('error', null, errTip);
            };

            $scope.edit = function () {
                $scope.isEditing = true;
                utils.localData('isEditing', 1);
            };

            $scope.back = function () {
                $scope.isEditing = false;
                utils.localData('isEditing', null);
            };
        }
    ]);
    app.controller('tabsEdit', ['$scope', '$http', '$state', '$rootScope', 'utils', '$stateParams', 'modal',
        function ($scope, $http, $state, $rootScope, utils, $stateParams, modal) {
            var userId;
            //$scope.isPass = true;
            $scope.authError = null;
            //$scope.tabs = {};


            if($stateParams.id){
                var groupId = $stateParams.id || utils.localData('curGroupId');
            }


            // 提交认证资料
            $rootScope.submitInfo = function() {
                $http({
                    url: app.url.yiliao.submitCert,
                    method: 'post',
                    data: {
                        access_token: app.url.access_token,
                        groupId: groupId || utils.localData('curGroupId'),
                        doctorId: userId || utils.localData('user_id'),
                        companyName: $scope.companyName,
                        orgCode: $scope.orgCode,
                        license: $scope.license,
                        corporation: $scope.corporation,
                        businessScope: $scope.businessScope,
                        accountName: $scope.accountName,
                        openBank: $scope.openBank,
                        bankAcct: $scope.bankAcct,
                        adminName: $scope.adminName,
                        idNo: $scope.idNo,
                        adminTel: $scope.adminTel,
                        idImage: $scope.usrPicUrl,
                        orgCodeImage: $scope.orgCodePicUrl,
                        licenseImage: $scope.licPicUrl
                    }
                }).then(function(resp) {
                    if (resp.data.resultCode === 1) {
                        $scope.$parent.isIdentifying = false;
                        $scope.$parent.isIdentified = true;
                        modal.toast.success('保存成功！');
                        $scope.back();
                    } else {
                        $scope.authError = resp.data.resultMsg;
                    }
                }, function(resp) {
                    $scope.authError = resp.data.resultMsg;
                });
            };

        }
    ]);

//删除弹窗
    app.controller('delModalInstanceCtrl', ['$scope', '$modalInstance', 'toaster', '$http', 'utils',function ($scope, $modalInstance, toaster, $http, utils) {
        $scope.ok = function () {
            $modalInstance.close('ok');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);


})();
