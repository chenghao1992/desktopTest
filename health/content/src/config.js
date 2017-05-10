// config

var app = angular.module('app').config(
    ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$stateProvider',
        function($controllerProvider, $compileProvider, $filterProvider, $provide, $stateProvider) {
            // lazy controller, directive and service
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.constant = $provide.constant;
            app.value = $provide.value;

            // API路径集合
            app.urlRoot = serverApiRoot;
            //app.urlRoot = '/kangzhe/';

            app.urlFile = uploadApiRoot;
            //app.urlFile = '/upload/';

            app.yiliao = '/yiliao/';

            app.yiliao = serverApiRoot;

            // 医药
            app.yiyao = medicineApiRoot;

            var common = {
                list: 'list.iv',
                save: 'save.iv',
                edit: 'edit.iv',
                modify: 'modify.iv',
                //delete: 'delete.iv',
                delete: 'batchDelete.iv',
                find: 'findByIds.iv',
                view: 'view.iv'
            };

            function getApi(name, common) {
                var apis = {};
                for (var n in common) {
                    apis[n] = serverApiRoot + name + '/' + common[n];
                }
                return apis;
            }

            // 定义统一api路径
            app.url = {
                access_token: localStorage.getItem('access_token'),
                groupId: function() {
                    return localStorage.getItem('curGroupId');
                },
                getSMS: serverApiRoot + 'sms/randcode/getSMSCode',
                verifySMS: serverApiRoot + 'sms/randcode/verifyCode',
                login: serverApiRoot + 'user/login',
                logout: serverApiRoot + 'user/logout',
                sendRanCode: serverApiRoot + 'user/sendRanCode',
                loginByCode: serverApiRoot + 'user/loginByCode',
                preResetPassword: serverApiRoot + 'user/preResetPassword',
                resetPassword: serverApiRoot + 'user/resetPassword',
                common: {
                    // 获取线下执业医院
                    getGroupHospital: serverApiRoot + 'guide/getGroupHospital',
                    // 获取配置code(博徳嘉联)
                    getServiceCate: serverApiRoot + 'serviceCate/getByGId',
                    // 设置医院列表
                    setGroupHospital: serverApiRoot + 'guide/setGroupHospital',

                    findHospitalByCondition: serverApiRoot + 'base/findHospitalByCondition',
                },
                admin: {
                    check: {
                        getDoctors: serverApiRoot + 'admin/check/getDoctors',
                        getDoctor: serverApiRoot + 'admin/check/getDoctor',
                        getArea: serverApiRoot + 'admin/check/getArea',
                        getHospitals: serverApiRoot + 'admin/check/getHospitals',
                        getDepts: serverApiRoot + 'admin/check/getDepts',
                        getTitles: serverApiRoot + 'admin/check/getTitles',
                        checked: serverApiRoot + 'admin/check/checked',
                        fail: serverApiRoot + 'admin/check/fail'
                    }
                },
                doctor: {
                    getDoctor: serverApiRoot + 'doctor/search',
                    searchs: serverApiRoot + 'doctor/searchs',
                    getIntro: serverApiRoot + 'doctor/getIntro',
                    getWork: serverApiRoot + 'doctor/getWork',
                    getDoctorFile: serverApiRoot + 'user/getDoctorFile',
                    // 新增推荐名医 -
                    addDoctor: serverApiRoot + 'recommend/addDoctor',
                    // 推荐/取消推荐名医
                    setRecommend: serverApiRoot + 'recommend/setRecommend',
                    // 移除推荐名医
                    delDoctor: serverApiRoot + 'recommend/delDoctor',
                    // 根据集团ID获取对应推荐名医列表
                    getRecommendDocList: serverApiRoot + 'recommend/getRecommendDocList',
                    getRecommentDoc: serverApiRoot + 'recommend/getRecommentDoc',
                    // 上移推荐 -
                    upWeight: serverApiRoot + 'recommend/upWeight',
                    updateRecDocument: serverApiRoot + 'document/updateRecDocument'
                },
                sms: {
                    sendMsg: serverApiRoot + 'sms/randcode/getSMSCode'
                },
                feedback: {
                    query: serverApiRoot + 'feedback/query',
                    get: serverApiRoot + 'feedback/get'
                },
                upload: {
                    getCertPath: app.urlFile + 'getCertPath',
                    upLoadImg: app.urlFile + 'cert',
                    CommonUploadServlet: app.urlFile + 'CommonUploadServlet',
                    commonDelFile: app.urlFile + 'commonDelFile',
                },
                signup: serverApiRoot + 'user/register',
                yiliao: {

                    companyLogin: app.yiliao + 'company/user/companyLogin',
                    enterprise_login: app.yiliao + 'user/login',
                    login: app.yiliao + 'user/login',
                    isAdminOfGroup: app.yiliao + 'group/user/isAdminOfGroup',
                    getAllData: app.yiliao + 'department/getAllDataById', // 获取自定义组织树
                    getDepartments: app.yiliao + 'group/getDepartments', // 获取科室组织树
                    getGroupRegion: app.yiliao + 'group/getGroupRegion', // 获取区域组织树
                    getServiceType: app.yiliao + 'group/getServiceType', // 获取区域组织树
                    getDoctors: app.yiliao + 'department/doctor/searchByDeDoctor',
                    searchDoctor: app.yiliao + 'group/doctor/searchByGroupDoctor',
                    getUndistributed: app.yiliao + 'group/doctor/getUndistributedDoctor',
                    saveDoctor: app.yiliao + 'department/doctor/saveDoctorIdBydepartIds',
                    dimission: app.yiliao + 'group/doctor/dimission',
                    deleteDoctor: app.yiliao + 'department/doctor/deleteByDeDoctor',
                    saveByGroupDoctor: app.yiliao + 'group/doctor/saveByGroupDoctor',
                    updateDoctor: app.yiliao + 'group/doctor/updateByGroupDoctor',
                    confirmByDoctorApply: app.yiliao + 'group/doctor/confirmByDoctorApply',
                    saveByDepart: app.yiliao + 'department/saveByDepart',
                    updateByDepart: app.yiliao + 'department/updateByDepart',
                    deleteByDepart: app.yiliao + 'department/deleteByDepart',
                    fillInfo: app.yiliao + 'company/regCompany',
                    verifyEnterprise: serverApiRoot + 'company/user/verifyByCuser',
                    getDptSchedule: serverApiRoot + 'group/schedule/getOnlines',
                    getSchedule: serverApiRoot + 'schedule/getOnlines',
                    getCompany: serverApiRoot + 'company/getCompanyById',
                    hasCreateRole: serverApiRoot + 'group/hasCreateRole', // 是否有资格创建集团
                    regGroup: serverApiRoot + 'group/regGroup', // 创建集团（old）
                    groupApply: serverApiRoot + 'group/groupApply', // 创建集团（new）
                    updateGroupApplyImageUrl: serverApiRoot + 'group/updateGroupApplyImageUrl',
                    applyTransfer: serverApiRoot + 'group/applyTransfer', // 集团转让
                    groupApplyInfo: serverApiRoot + 'group/groupApplyInfo', // 获取集团申请记录
                    updateGroupProfit: serverApiRoot + 'group/updateGroupProfit', // 修改集团分成
                    updateGroupConfigAndFee: serverApiRoot + 'guide/updateGroupConfigAndFee', // 集团财务设置
                    getGroupStatusInfo: serverApiRoot + 'group/getGroupStatusInfo', // 获取集团状态
                    getGroupList: serverApiRoot + 'group/searchByGroup',
                    getGroupInfo: serverApiRoot + 'group/getGroupById',
                    updateGroup: serverApiRoot + 'group/updateByGroup',
                    applyjoinCompany: serverApiRoot + 'company/applyjoinCompany',
                    verifyByGuser: serverApiRoot + 'group/user/verifyByGuser',
                    sendInviteCode: serverApiRoot + 'invite/code/sendInviteCode',
                    searchByCompanyUser: serverApiRoot + 'company/user/searchByCompanyUser',
                    deleteByCompanyUser: serverApiRoot + 'company/user/deleteByCompanyUser',
                    addCompanyUser: serverApiRoot + 'company/user/addCompanyUser',
                    getGroupAdmins: serverApiRoot + 'group/user/searchByGroup',
                    deleteGroupAdmin: serverApiRoot + 'group/user/deleteByGroupUser',
                    addGroupUser: serverApiRoot + 'group/user/addGroupUser',
                    getDepDocs: serverApiRoot + 'department/doctor/searchByDeDoctor',
                    deleteOnline: serverApiRoot + 'group/schedule/deleteOnline',
                    addOnline: serverApiRoot + 'group/schedule/addOnline',
                    getRelationShip: serverApiRoot + 'group/doctor/getInviteRelationTree',
                    getProfitTree: serverApiRoot + 'group/profit/getTree',
                    getProfitList: serverApiRoot + 'group/profit/getList',
                    getProfitListByKeyword: serverApiRoot + 'group/profit/searchByKeyword',
                    updateProfit: serverApiRoot + 'group/profit/updateProfit',
                    updateProfitRelation: serverApiRoot + 'group/profit/update',
                    deleteRelation: serverApiRoot + 'group/profit/delete',
                    getInviteList: serverApiRoot + 'group/doctor/getMyInviteRelationListById',
                    updateByCompany: serverApiRoot + 'company/updateByCompany',
                    inviteDoctor: serverApiRoot + 'group/stat/inviteDoctor',
                    getDepartmentDoctor: serverApiRoot + 'department/doctor/getDepartmentDoctor',
                    patient: serverApiRoot + 'group/stat/patient',
                    getMembers: serverApiRoot + 'group/stat/patient/member',
                    getTreatmentRecords: serverApiRoot + 'group/stat/patient/cureRecord',
                    doctorArea: serverApiRoot + 'group/stat/doctorArea',
                    doctorDisease: serverApiRoot + 'group/stat/disease',
                    getCharge: serverApiRoot + 'group/fee/getGroupFee',
                    setCharge: serverApiRoot + 'group/fee/setting',
                    getDocInviteNum: serverApiRoot + 'group/stat/invitePatient',
                    getDocInvitePatient: serverApiRoot + 'group/stat/invitePatient',
                    getDiseaseTree: serverApiRoot + 'group/stat/getDiseaseTree',
                    getUserDetail: serverApiRoot + 'user/getUserDetail',
                    findDoctorByGroup: serverApiRoot + 'groupSearch/findDoctorByGroup',
                    setResExpert: serverApiRoot + 'group/settings/setResExpert',
                    findOnlineDoctorByGroupId: serverApiRoot + 'group/doctor/findOnlineDoctorByGroupId',
                    getHasSetPrice: serverApiRoot + 'group/doctor/getHasSetPrice',
                    setTaskTimeLong: serverApiRoot + 'group/doctor/setTaskTimeLong',
                    setOutpatientPrice: serverApiRoot + 'group/doctor/setOutpatientPrice',
                    getDiseaseLabel: serverApiRoot + 'groupSearch/findDiseaseByGroup',
                    setDiseaseLabel: serverApiRoot + 'group/settings/addSpecialty',
                    saveBatchInvite: serverApiRoot + 'group/doctor/saveBatchInvite',
                    findProDoctorByGroupId: serverApiRoot + 'groupSearch/findProDoctorByGroupId',
                    searchDoctorByKeyWord: serverApiRoot + 'group/doctor/searchDoctorByKeyWord',
                    updateDutyTime: serverApiRoot + 'group/settings/updateDutyTime',
                    searchByKeyword: serverApiRoot + 'group/profit/searchByKeyword',
                    getDoctorInfoDetails: serverApiRoot + 'doctor/getDoctorInfoDetails',
                    submitCert: serverApiRoot + 'group/cert/submitCert',
                    getGroupCert: serverApiRoot + 'group/cert/getGroupCert',
                    getGroupCerts: serverApiRoot + 'group/cert/getGroupCerts',
                    getTypeByParent: serverApiRoot + 'article/getTypeByParent',
                    getGroupDoctorListById: serverApiRoot + 'group/doctor/getGroupDoctorListById',
                    //多维度统计医生（1：病种、2：职称、3：区域）
                    statDoctor: serverApiRoot + 'group/stat/statDoctor',
                    addPatient: serverApiRoot + 'doctor/addPatient',
                    getPatients: serverApiRoot + 'doctor/getPatients',
                    addPatientTag: serverApiRoot + 'doctor/addPatientTag',
                    deletePatientTag: serverApiRoot + '/doctor/deletePatientTag',
                    createDocument: serverApiRoot + '/document/createDocument',
                    getGroupDescInfoById: serverApiRoot + 'document/getGoupDescInfoById',
                    getDepartmentRecommendDoctor: serverApiRoot + 'department/doctor/getDepartmentRecommendDoctor'

                },
                //患教中心
                document: {
                    getAllData: app.yiliao + 'department/getAllDataById',
                    getDepartmentDoctor: serverApiRoot + 'department/doctor/getDepartmentDoctor',
                    getDiseaseTree: serverApiRoot + 'base/getDiseaseTree',
                    //上移置顶指定文章
                    topArticleUp: serverApiRoot + 'article/topArticleUp',
                    //取消指定文档置顶
                    topArticleRemove: serverApiRoot + 'article/topArticleRemove',
                    //获取置顶文章列表（最多5条）
                    findTopArticle: serverApiRoot + 'article/findTopArticle',
                    //收藏一个文档，已收藏不做重复收藏操作
                    collectArticle: serverApiRoot + 'article/collectArticle',
                    //置顶指定文章，如果已置顶文章大于5，则不置顶并返回提示信息
                    topArticle: serverApiRoot + 'article/topArticle',
                    //新建文章
                    addArticle: serverApiRoot + 'article/addArticle',
                    //查询病种树并统计对应一级病种文档数量
                    findDiseaseTreeForArticle: serverApiRoot + 'article/findDiseaseTreeForArticle',
                    //根据关键字搜索文章标题,获取文章列表
                    findArticleByKeyWord: serverApiRoot + 'article/findArticleByKeyWord',
                    //根据病种查出对应范围内文章，返回文章（基本信息）列表，指定查询范围（1：平台，2：集团，3：个体医生），指定创建者ID范围内文章列表
                    getArticleByDisease: serverApiRoot + 'article/getArticleByDisease',
                    //根据父节点获取专长，parentId为空查找一级病种
                    getDisease: serverApiRoot + 'base/getDisease',
                    //根据ID查询出文章，返回所有基本信息
                    getArticleById: serverApiRoot + 'article/getArticleById',
                    //编辑指定ID文章，返回所有基本信息，后台增加一条浏览记录
                    updateArticle: serverApiRoot + 'article/updateArticle',
                    //根据标签搜索tag字段,获取文章列表 整个文档对象（包含ＵＲＬ）（查看平台文章时，该用户是否已收藏，后面再做）
                    findArticleByTag: serverApiRoot + 'article/findArticleByTag',
                    //取消收藏文档
                    collectArticleRemove: serverApiRoot + 'article/collectArticleRemove',
                    //删除文章，只能删除useNum为0的所有文章
                    delArticle: serverApiRoot + 'article/delArticle',
                    //根据ID查询出文章，返回所有基本信息（web端）
                    getArticleByIdWeb: serverApiRoot + 'article/getArticleByIdWeb',
                    //获取指定医生ID的收藏文档
                    getArticleByDoctor: serverApiRoot + 'article/getArticleByDoctor',
                    //根据ID查询出文章，返回文章，后台增加一条浏览记录(默认是医生身份)。
                    viewArticle: serverApiRoot + 'article/viewArticle',
                },
                //就医知识
                knowledge: {
                    //获取医生就医知识列表
                    getDoctorMedicalKnowledgeList: serverApiRoot + 'knowledge/getDoctorMedicalKnowledgeList',
                    //获取集团就医知识列表
                    getGroupMedicalKnowledgeList: serverApiRoot + 'knowledge/getGroupMedicalKnowledgeList',
                    //访问就医知识
                    getUrlById: serverApiRoot + 'knowledge/getUrlById',
                    //更新就医知识
                    updateKnowledge: serverApiRoot + 'knowledge/updateKnowledge',
                    //获取就医知识详情
                    getDetailById: serverApiRoot + 'knowledge/getDetailById',
                    //设置就医知识为置顶
                    setTop: serverApiRoot + 'knowledge/setTop',
                    //取消就医知识为置顶
                    cancelTop: serverApiRoot + 'knowledge/cancelTop',
                    //上移已经置顶的就医知识
                    upKnowledge: serverApiRoot + 'knowledge/upKnowledge',
                    //添加就医知识
                    addKnowledge: serverApiRoot + 'knowledge/addKnowledge',
                    //删除就医知识
                    delKnowledgeById: serverApiRoot + 'knowledge/delKnowledgeById',
                    //新增就医知识分类
                    addGroupCategory: serverApiRoot + 'knowledge/addGroupCategory',
                    //删除就医知识分类
                    delCategoryById: serverApiRoot + 'knowledge/delCategoryById',
                    //重命名就医知识分类
                    updateCategoryById: serverApiRoot + 'knowledge/updateCategoryById',

                    //获取分类列表
                    getCategoryList: serverApiRoot + 'knowledge/getCategoryList',
                    //根据分类ID获取文章列表
                    getKnowledgeListByCategoryId: serverApiRoot + 'knowledge/getKnowledgeListByCategoryId',
                    //根据关键字搜索
                    findKnowledgeListByKeys: serverApiRoot + 'knowledge/findKnowledgeListByKeys',
                },
                //动态
                dynamic: {
                    //删除医生动态
                    deleteDoctorDynamic: serverApiRoot + 'dynamic/deleteDoctorDynamic',
                    //新增医生动态
                    addDoctorDynamicForWeb: serverApiRoot + 'dynamic/addDoctorDynamicForWeb',
                    //新增医生动态
                    addDoctorDynamic: serverApiRoot + 'dynamic/addDoctorDynamic',
                    //新增集团动态
                    addGroupDynamicForWeb: serverApiRoot + 'dynamic/addGroupDynamicForWeb',
                    //查询 医生的动态列表(分页)
                    getDoctorDynamicList: serverApiRoot + 'dynamic/getDoctorDynamicList',
                    //查询 患者相关的动态列表(分页)
                    getPatientRelatedDynamicList: serverApiRoot + 'dynamic/getPatientRelatedDynamicList',
                    //查询该集团和所有集团医生的动态列表(分页)
                    getGroupAndDoctorDynamicListByGroupId: serverApiRoot + 'dynamic/getGroupAndDoctorDynamicListByGroupId',
                    //根据集团id查询该集团动态列表(分页)
                    getDynamicListByGroupIdForWeb: serverApiRoot + 'dynamic/getDynamicListByGroupIdForWeb',

                },
                //病情跟踪
                designer:{
                    //获取病情问题库病种树
                    getDiseaseTypeFromStore:serverApiRoot+'designer/getDiseaseTypeFromStore',
                    //获取病情跟踪问题列表
                    getQuestionListFromStore:serverApiRoot+'designer/getQuestionListFromStore'

                },
                //公共号
                pubMsg: {
                    //根据集团Id获取该集团下所有公共号
                    getPubListByMid: serverApiRoot + 'pub/getByMid',
                    //公共号发送消息(消息只接收json格式)
                    sendMsg: serverApiRoot + 'pub/sendMsg',
                    //根据公共号Id获取公共号信息
                    getPubInfo: serverApiRoot + 'pub/get',
                    //保存公共号信息
                    savePubInfo: serverApiRoot + 'pub/save',
                    //公共号 - 获取消息历史
                    getMsgHistory: serverApiRoot + 'pub/msgList',
                    //删除公共号信息
                    delMsgHistory: serverApiRoot + 'pub/delMsg',
                    //获取消息历史(分页查询)
                    getMsgPageList: serverApiRoot + 'pub/msgPageList'
                },
                // 关怀计划
                care: {
                    // 添加随访计划模板接口
                    addFollowUpTemplate: app.yiliao + 'pack/followReForm/addFollowUpTemplate',
                    // 查询单个随访计划模板接口
                    findFollowUpTemplate: app.yiliao + 'pack/followReForm/findFollowUpTemplate',
                    // 删除随访计划模板接口
                    deleteFollowUpTemplate: app.yiliao + 'pack/followReForm/deleteFollowUpTemplate',
                    //统计 - 获取有数据的集团病种树
                    getDiseaseTypeTree: serverApiRoot + 'group/stat/getDiseaseTypeTree'
                },
                // 医药
                yiyao: {
                    // 调用方法：app.yiyao + x
                    // 获取集团药品库
                    c_Group_Goods_select: '/c_Group_Goods.select',
                    // 集团药品库 添加药品
                    c_Group_Goods_create: '/c_Group_Goods.create',
                    // 集团药品库 添加多条药品
                    c_Group_Goods_creates: '/c_Group_Goods.creates',
                    // 集团药品库 删除药品
                    c_Group_Goods_delete: '/c_Group_Goods.delete'
                },
                //会诊
                consult: {
                    //添加会诊包
                    addPack: serverApiRoot + 'consultation/pack/add',
                    //获取集团会诊包列表
                    getPackList: serverApiRoot + 'consultation/pack/getList',
                    //获取集团会诊包详情
                    getPackDetail: serverApiRoot + 'consultation/pack/getDetail',
                    //修改会诊包 以及 添加和删除会诊包医生
                    updatePack: serverApiRoot + 'consultation/pack/update',
                    //使用场景：集团进入后台管理系统点击开通会诊服务按钮
                    openService: serverApiRoot + 'consultation/pack/openService',
                    //删除集团会诊包
                    delPack: serverApiRoot + 'consultation/pack/delete',
                    //获取集团在其他会诊包中的医生ids
                    getNotInCurrentPackDoctorIds: serverApiRoot + 'consultation/pack/getNotInCurrentPackDoctorIds',
                    //判断该集团是否有开通会诊包
                    getOpenConsultation: serverApiRoot + 'consultation/pack/getOpenConsultation'
                },
                finance: {
                    gdIncomeList: serverApiRoot + 'income/gdIncomeList', // 集团内医生收入列表
                    gIncomeList: serverApiRoot + 'income/gIncomeList', // 集团收入列表,departed
                    gIncomeListNew: serverApiRoot + 'income/gIncomeListNew', // 集团收入列表
                    setBankDefault: serverApiRoot + 'income/setBankDeault', // 指定默认银行卡
                    gIncomeDetail: serverApiRoot + 'income/gIncomeDetail', // 集团某年某月收入
                    gMIncomeDetail: serverApiRoot + 'income/gMIncomeDetail', // 集团某年某月收入，查询
                    getGroupBanks: serverApiRoot + 'pack/bank/getGroupBanks', // 获取集团所有银行卡
                    addGroupBankCard: serverApiRoot + 'pack/bank/addGroupBankCard', // 添加集团银行卡
                    setBankStatus: serverApiRoot + 'pack/bank/setBankStatus', // 设置默认银行卡
                    getBanks: serverApiRoot + 'pack/bank/getBanks', // 获取银行列表
                    deleteBankCard: serverApiRoot + 'pack/bank/deleteBankCard', // 删除银行卡
                    downExcel: serverApiRoot + 'income/downExcel',
                },
                // 集团订单
                order: {
                    // 集团开通或关闭预约套餐
                    setAppointmentInfo: serverApiRoot + 'guide/setAppointmentInfo',
                    // 获取集团的线下预约信息
                    getAppointmentInfo: serverApiRoot + '/guide/getAppointmentInfo',
                    // 获取集团订单
                    getOrderList: serverApiRoot + 'pack/order/getOrderList',
                    // 集团订单导出
                    downOrderList: serverApiRoot + 'pack/order/downOrderList',
                },
                hospital: {
                    getHospitalLevel: serverApiRoot + 'admin/check/getHospitalLevel', // 获取医院级别
                    getHospitalList: serverApiRoot + 'group/hospital/groupHospitalList',
                    findHospitalByCondition: serverApiRoot + 'base/findHospitalByCondition',
                    createGroupHospital: serverApiRoot + 'group/hospital/createGroupHospital',
                    findDoctorsByCondition: serverApiRoot + 'doctor/findDoctorsByCondition',
                    getDetailByGroupId: serverApiRoot + 'group/hospital/getDetailByGroupId',
                    updateHospitalRoot: serverApiRoot + 'group/hospital/updateHospitalRoot',
                    registerByAdmin: serverApiRoot + 'user/registerByAdmin', // 管理员创建医生账号
                    saveBatchInvite: serverApiRoot + 'group/doctor/saveBatchInvite', // 发短信邀请医生加入集团
                    registerByGroupNotify: serverApiRoot + 'user/registerByGroupNotify' // 新建账号成功后的通知短信
                },
                account: {
                    //获取导医列表
                    getGuideDoctorList: serverApiRoot + 'user/getGuideDoctorList',
                    //注册账户
                    register: serverApiRoot + 'user/register',
                    //重置密码
                    resetPassword: serverApiRoot + 'user/oneKeyReset',
                    //更新导医信息
                    updateUserInfo: serverApiRoot + 'user/updateGuidInfo',
                    //更改启用信息
                    updateStatus: serverApiRoot + 'user/updateGuideStatus',
                    updatePassword: serverApiRoot + 'user/updatePassword' // 修改密码
                },
                drugLibrary: {
                    //集团添加药品
                    addDoctorGroupDrugLibGoods: drugFirmsApiRoot + 'goods/doctorGroup/addDoctorGroupDrugLibGoods',
                    //集团品种库品种列表搜索
                    searchDoctorGroupDrugLibList: drugFirmsApiRoot + 'goods/doctorGroup/searchDoctorGroupDrugLibList',
                    // 删除集团品种
                    deleteDoctorGroupDrugById: drugFirmsApiRoot + 'goods/doctorGroup/deleteDoctorGroupDrugById'
                },
                community: {
                    // 医生论坛帖子列表
                    findPcTopicList: serverApiRoot + 'community/findPcTopicList',
                    // 搜索帖子
                    findTopicKeyWord: serverApiRoot + 'community/findTopicKeyWord',
                    // 发帖
                    publish: serverApiRoot + 'community/publish',
                    // 获取栏目列表
                    getByGroupCircle: serverApiRoot + 'community/getByGroupCircle',
                    // 删除帖子
                    deleteTopic: serverApiRoot + 'community/deleteTopic',
                    // 主帖详情
                    findByTopicDetail: serverApiRoot + 'community/findByTopicDetail',
                    // 回帖列表
                    findByReplyList: serverApiRoot + 'community/findByReplyList',
                    // 删除回帖和评论
                    deleteReplyId: serverApiRoot + 'community/deleteReplyId',
                    // 删除贴子
                    deleteTopic: serverApiRoot + 'community/deleteTopic',
                    // 新增栏目
                    addCircle: serverApiRoot + 'community/addCircle',
                    // 删除栏目
                    deleteCircle: serverApiRoot + 'community/deleteCircle',
                    // 上移栏目
                    topCircle: serverApiRoot + 'community/topCircle',
                    // 修改栏目
                    updateCircle: serverApiRoot + 'community/updateCircle',
                    // 我的帖子
                    getPubListTopic: serverApiRoot + 'community/getPubListTopic',
                    // 置顶帖子
                    topTopic: serverApiRoot + 'community/topTopic',
                    // 取消置顶帖子
                    undoTopTopic: serverApiRoot + 'community/undoTopTopic',
                    // 上移帖子
                    moveTopic: serverApiRoot + 'community/moveTopic',
                    // 修改帖子
                    editTopic: serverApiRoot + 'community/editTopic'
                }
            };
            app.lang = {
                datatables: {
                    translation: {
                        "sLengthMenu": "每页 _MENU_ 条",
                        "sZeroRecords": "无数据",
                        "sProcessing": "<img style='position:fixed;top:30%;left:50%;z-index:10000;height:80px;border:1px solid #aaa;border-radius:6px;box-shadow:0 0 10px rgba(0,0,0,.5)' src=\"src/img/loading.gif\" />",
                        "sInfo": "当前第 _START_ - _END_ 条，共 _TOTAL_ 条",
                        "sInfoEmpty": "",
                        "sInfoFiltered": "(从 _MAX_ 条记录中过滤)",
                        "sSearch": "搜索",
                        "oPaginate": {
                            "sFirst": "<<",
                            "sPrevious": "<",
                            "sNext": ">",
                            "sLast": ">>"
                        }
                    }
                }
            }
        }
    ]).config(['$translateProvider',
    function($translateProvider) {
        // 注册一个静态文件加载器，模块会在指定的url中查找翻译词典
        // url结构为 [prefix][langKey][suffix].
        $translateProvider.useStaticFilesLoader({
            prefix: 'src/l10n/',
            suffix: '.js'
        });
        // 设置默认语言
        $translateProvider.preferredLanguage('en');
        // 存储默认语言(本地)
        $translateProvider.useLocalStorage();
    }
]).factory('authorityInterceptor', [
    function() {

        var authorityInterceptor = {
            response: function(response) {
                //console.log(response);
                if (response.resultCode === 1030102 || response.resultCode === 1030101 || response.data.resultCode === 1030102 || response.data.resultCode === 1030101) {
                    window.location.href = '#/access/signin';
                }
                if ('no permission' == response.data) {
                    app.controller('Interceptor', ['$state',
                        function($state) {
                            app.state.go('access.404');
                        }
                    ]);
                }
                if ("no login" == response.data) {
                    app.state.go('access.signin');
                }
                return response;
            }
        };
        return authorityInterceptor;
    }
]).config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.interceptors.push('authorityInterceptor');
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.transformRequest = [

            function(data) {
                return angular.isObject(data) && String(data) !== '[object File]' ? $.param(data, true) : data;
            }
        ];
    }

]);
(function() {
    angular.module('app').directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
})();
(function() {
    angular.module('app').factory('AppFactory', funAppFactory);

    funAppFactory.$inject = ['$http', '$state', 'toaster', 'Group'];

    function funAppFactory($http, $state, toaster, Group) {

        // 获取当前组织信息
        var currentOrgInfo = Group.getCurrentOrgInfo();

        // 处理 ajax 请求返回的数据
        function _ajaxDeal(response) {
            if (response && response.status == 200) {
                return response.data
            } else {
                toaster.pop('error', null, status)
                return status;
            }
        };

        // 处理 平台接口 返回的数据
        function _ajaxDealHealth(response) {
            response = _ajaxDeal(response);
            if (!response) {
                return response;
            } else if (response.resultCode != 1) {
                if (response.resultMsg) {
                    toaster.pop('error', null, response.resultMsg)
                } else {
                    toaster.pop('error', null, '接口出错');
                }
                return false;
            } else {
                return response.data || true;
            }
        };


        function isServiceGroup(groupId) {
            return $http.post(app.url.common.getServiceCate, {
                access_token: app.url.access_token,
                groupId: groupId
            }).then(function(_data) {
                _data = _ajaxDealHealth(_data);
                if (_data.id == '5721afe7f95c43d41203d233') {
                    return true
                }
                return false;
            });
        };

        return {
            ajax: {
                deal: _ajaxDeal,
                dealHealth: _ajaxDealHealth
            },
            group: {
                isServiceGroup: isServiceGroup
            }
        };

    };
})();
