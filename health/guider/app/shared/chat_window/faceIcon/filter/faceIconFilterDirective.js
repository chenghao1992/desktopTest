(function() {
    angular.module('app')
        .directive('faceIconFilter', faceIconFilter);

    function faceIconFilter() {
        return {
            scope: {
                code: '=',
                url: '=',
                file: '=',
                arry: '=',
                faceimg: '=',
            },
            // template: '{{code}}_{{url}}_{{file.fileName}}_{{file.key}}',
            template: '<img width="100%" height="100%" ng-src="{{url}}/{{file.fileName}}" title="{{file.key}}">',
            controller: function($scope) {
                $scope.arry = getFaceCode();
                $scope.file = filterFaceCode($scope.code);
                $scope.faceimg = getFaceImg;
            },
        };

    };

    function getFaceImg(text, url) {
        var faceCode = getFaceCode();
        for (var i = 0; i < faceCode.length; i++) {

            text = text.replace(eval('/\\' + faceCode[i].key + '\/g'), '<img class="faceIcon" src="' + url + '/' + faceCode[i].fileName + '" title="' + faceCode[i].fileName + '">');

        };
        return text;
    };

    function filterFaceCode(key) {
        var faceCode = getFaceCode();
        for (var i = faceCode.length - 1; i >= 0; i--) {
            if (faceCode[i].key == key)
                return faceCode[i];
        };
        return null;
    };

    function getFaceCode() {
        return [{
            key: '[呲牙]',
            fileName: 'f_static_000.png'
        }, {
            key: '[调皮]',
            fileName: 'f_static_001.png'
        }, {
            key: '[流汗]',
            fileName: 'f_static_002.png'
        }, {
            key: '[偷笑]',
            fileName: 'f_static_003.png'
        }, {
            key: '[再见]',
            fileName: 'f_static_004.png'
        }, {
            key: '[敲打]',
            fileName: 'f_static_005.png'
        }, {
            key: '[擦汗]',
            fileName: 'f_static_006.png'
        }, {
            key: '[猪头]',
            fileName: 'f_static_007.png'
        }, {
            key: '[玫瑰]',
            fileName: 'f_static_008.png'
        }, {
            key: '[流泪]',
            fileName: 'f_static_009.png'
        }, {
            key: '[大哭]',
            fileName: 'f_static_010.png'
        }, {
            key: '[嘘]',
            fileName: 'f_static_011.png'
        }, {
            key: '[酷]',
            fileName: 'f_static_012.png'
        }, {
            key: '[抓狂]',
            fileName: 'f_static_013.png'
        }, {
            key: '[委屈]',
            fileName: 'f_static_014.png'
        }, {
            key: '[便便]',
            fileName: 'f_static_015.png'
        }, {
            key: '[炸弹]',
            fileName: 'f_static_016.png'
        }, {
            key: '[菜刀]',
            fileName: 'f_static_017.png'
        }, {
            key: '[可爱]',
            fileName: 'f_static_018.png'
        }, {
            key: '[色]',
            fileName: 'f_static_019.png'
        }, {
            key: '[害羞]',
            fileName: 'f_static_020.png'
        }, {
            key: '[得意]',
            fileName: 'f_static_021.png'
        }, {
            key: '[吐]',
            fileName: 'f_static_022.png'
        }, {
            key: '[微笑]',
            fileName: 'f_static_023.png'
        }, {
            key: '[发怒]',
            fileName: 'f_static_024.png'
        }, {
            key: '[尴尬]',
            fileName: 'f_static_025.png'
        }, {
            key: '[惊恐]',
            fileName: 'f_static_026.png'
        }, {
            key: '[冷汗]',
            fileName: 'f_static_027.png'
        }, {
            key: '[爱心]',
            fileName: 'f_static_028.png'
        }, {
            key: '[示爱]',
            fileName: 'f_static_029.png'
        }, {
            key: '[白眼]',
            fileName: 'f_static_030.png'
        }, {
            key: '[傲慢]',
            fileName: 'f_static_031.png'
        }, {
            key: '[难过]',
            fileName: 'f_static_032.png'
        }, {
            key: '[惊讶]',
            fileName: 'f_static_033.png'
        }, {
            key: '[疑问]',
            fileName: 'f_static_034.png'
        }, {
            key: '[睡]',
            fileName: 'f_static_035.png'
        }, {
            key: '[亲亲]',
            fileName: 'f_static_036.png'
        }, {
            key: '[憨笑]',
            fileName: 'f_static_037.png'
        }, {
            key: '[爱情]',
            fileName: 'f_static_038.png'
        }, {
            key: '[衰]',
            fileName: 'f_static_039.png'
        }, {
            key: '[撇嘴]',
            fileName: 'f_static_040.png'
        }, {
            key: '[阴险]',
            fileName: 'f_static_041.png'
        }, {
            key: '[奋斗]',
            fileName: 'f_static_042.png'
        }, {
            key: '[发呆]',
            fileName: 'f_static_043.png'
        }, {
            key: '[右哼哼]',
            fileName: 'f_static_044.png'
        }, {
            key: '[拥抱]',
            fileName: 'f_static_045.png'
        }, {
            key: '[坏笑]',
            fileName: 'f_static_046.png'
        }, {
            key: '[飞吻]',
            fileName: 'f_static_047.png'
        }, {
            key: '[鄙视]',
            fileName: 'f_static_048.png'
        }, {
            key: '[晕]',
            fileName: 'f_static_049.png'
        }, {
            key: '[大兵]',
            fileName: 'f_static_050.png'
        }, {
            key: '[可怜]',
            fileName: 'f_static_051.png'
        }, {
            key: '[强]',
            fileName: 'f_static_052.png'
        }, {
            key: '[弱]',
            fileName: 'f_static_053.png'
        }, {
            key: '[握手]',
            fileName: 'f_static_054.png'
        }, {
            key: '[胜利]',
            fileName: 'f_static_055.png'
        }, {
            key: '[抱拳]',
            fileName: 'f_static_056.png'
        }, {
            key: '[凋谢]',
            fileName: 'f_static_057.png'
        }, {
            key: '[饭]',
            fileName: 'f_static_058.png'
        }, {
            key: '[蛋糕]',
            fileName: 'f_static_059.png'
        }, {
            key: '[西瓜]',
            fileName: 'f_static_060.png'
        }, {
            key: '[啤酒]',
            fileName: 'f_static_061.png'
        }, {
            key: '[飘虫]',
            fileName: 'f_static_062.png'
        }, {
            key: '[勾引]',
            fileName: 'f_static_063.png'
        }, {
            key: '[OK]',
            fileName: 'f_static_064.png'
        }, {
            key: '[爱你]',
            fileName: 'f_static_065.png'
        }, {
            key: '[咖啡]',
            fileName: 'f_static_066.png'
        }, {
            key: '[钱]',
            fileName: 'f_static_067.png'
        }, {
            key: '[月亮]',
            fileName: 'f_static_068.png'
        }, {
            key: '[美女]',
            fileName: 'f_static_069.png'
        }, {
            key: '[刀]',
            fileName: 'f_static_070.png'
        }, {
            key: '[发抖]',
            fileName: 'f_static_071.png'
        }, {
            key: '[差劲]',
            fileName: 'f_static_072.png'
        }, {
            key: '[拳头]',
            fileName: 'f_static_073.png'
        }, {
            key: '[心碎]',
            fileName: 'f_static_074.png'
        }, {
            key: '[太阳]',
            fileName: 'f_static_075.png'
        }, {
            key: '[礼物]',
            fileName: 'f_static_076.png'
        }, {
            key: '[足球]',
            fileName: 'f_static_077.png'
        }, {
            key: '[骷髅]',
            fileName: 'f_static_078.png'
        }, {
            key: '[挥手]',
            fileName: 'f_static_079.png'
        }, {
            key: '[闪电]',
            fileName: 'f_static_080.png'
        }, {
            key: '[饥饿]',
            fileName: 'f_static_081.png'
        }, {
            key: '[困]',
            fileName: 'f_static_082.png'
        }, {
            key: '[咒骂]',
            fileName: 'f_static_083.png'
        }, {
            key: '[折磨]',
            fileName: 'f_static_084.png'
        }, {
            key: '[抠鼻]',
            fileName: 'f_static_085.png'
        }, {
            key: '[鼓掌]',
            fileName: 'f_static_086.png'
        }, {
            key: '[糗大了]',
            fileName: 'f_static_087.png'
        }, {
            key: '[左哼哼]',
            fileName: 'f_static_088.png'
        }, {
            key: '[哈欠]',
            fileName: 'f_static_089.png'
        }, {
            key: '[快哭了]',
            fileName: 'f_static_090.png'
        }, {
            key: '[吓]',
            fileName: 'f_static_091.png'
        }, {
            key: '[篮球]',
            fileName: 'f_static_092.png'
        }, {
            key: '[乒乓球]',
            fileName: 'f_static_093.png'
        }, {
            key: '[NO]',
            fileName: 'f_static_094.png'
        }, {
            key: '[跳跳]',
            fileName: 'f_static_095.png'
        }, {
            key: '[怄火]',
            fileName: 'f_static_096.png'
        }, {
            key: '[转圈]',
            fileName: 'f_static_097.png'
        }, {
            key: '[磕头]',
            fileName: 'f_static_098.png'
        }, {
            key: '[回头]',
            fileName: 'f_static_099.png'
        }, {
            key: '[跳绳]',
            fileName: 'f_static_100.png'
        }, {
            key: '[激动]',
            fileName: 'f_static_101.png'
        }, {
            key: '[街舞]',
            fileName: 'f_static_102.png'
        }, {
            key: '[献吻]',
            fileName: 'f_static_103.png'
        }, {
            key: '[左太极]',
            fileName: 'f_static_104.png'
        }, {
            key: '[右太极]',
            fileName: 'f_static_105.png'
        }, {
            key: '[闭嘴]',
            fileName: 'f_static_106.png'
        }]
    };
})();