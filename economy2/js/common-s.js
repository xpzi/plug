
(function(win) {

    var apiHost = 'https://actapi.busi.inke.cn',            // 线上 映客
        webHost = 'https://act.inke.cn',                    // 线上 映客
        downLoadUrl = 'https://api.busi.inke.cn/open_app.html?pname=hallhot'; // app下载地址

        var _href = window.location.href;
        if (_href.indexOf('testact.inke.cn') !== -1 || _href.indexOf('localhost:') !== -1) {
            apiHost = 'http://testact.inke.cn:999';     //  映客 测试
            apiHost = 'https://betabroker.busi.inke.cn'; // 映天下 测试
            webHost = 'http://testact.inke.cn:8019';       // 映客 测试
                   // 映天下 测试
        } else if (_href.indexOf('betaact.inke.cn') !== -1) {

            apiHost = 'https://betabroker.busi.inke.cn';   // 映天下 灰度 
                                                            // 映客  灰度
            webHost = 'https://betaact.inke.cn';           // 映客  灰度
                                                            // 映天下  灰度

        } else{
            apiHost = 'https://broker.busi.inke.cn';    // 映天下 线上
            // apiHost = 'https://actapi.busi.inke.cn'  // 映客 线上
                                                        // 映天下 线上
            webHost = 'https://act.inke.cn';            // 映客 线上
        }

    var common = {
        conf: {
            apiHost: 'https://actapi.busi.inke.cn', // 接口地址（默认：线上）
            webHost: 'https://act.inke.cn', // 网页地址（默认：线上）
            downLoadUrl: 'https://api.busi.inke.cn/open_app.html?pname=hallhot' // app下载地址
        },
        ajax: function (opt) {
            var opt = opt || {},
                data = {},
                url = (opt.host || apiHost) + opt.url;
            if (opt.url.indexOf('http') >= 0 || opt.url.indexOf('.com') >= 0 || opt.url.indexOf('.cn') >= 0 || opt.url.indexOf('.201') >= 0) {
                url = opt.url;
            }
            this.getQueryString('uid') && (data.uid = this.getQueryString('uid'));
            this.getQueryString('sid') && (data.sid = this.getQueryString('sid'));
            if (this.getQueryString('s_sg')) {
                var that = this;
                ['s_sg', 'devi', 'idfa', 's_rc'].forEach(function (one, index) {
                    data[one] = that.getQueryString(one);
                });
                data.location = location.pathname;
            }
            $.extend(true, data, opt.data || {});
            return $.ajax({
                url: url,
                data: data || {},
                type: opt.type || 'POST',
                dataType: opt.dataType || 'json',
                success: function (res) {
                    opt.success && opt.success(res);
                },
                error: function () {
                    opt.error && opt.error();
                    console.error('api error url is ', opt.url)
                }
            });
        },
        getQueryString: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) return unescape(r[2]);
            return '';
        },
        wxShare: function (conf) {
            if (!conf || !conf.title) {
                return;
            }
            if (!window.wx) {
                console.error('not load wxsdk')
                return;
            }
            common.ajax({
                url: '/app/wx_share_config',
                success: function (res) {
                    if (res.dm_error * 1 === 0) {
                        $.extend(conf, res.data || {});
                        weixin_share(conf);
                    }
                },
                error: function () {
                    console.error('get wx config error');
                }
            })
        },
        log: function (param, callback) {
            if (!param) {
                return;
            }
            var uid = common.getQueryString('uid') || '';
            var wechatShareOther = {
                click_id: '',
                click_pos: '',
                live_uid: '',
                live_id: '',
                live_status: '',
                share_uid: '',
                share_from: '',
                installed: '',
                pop: '',
                share_time: '',
                app_type: '',
                open_time: '',
                is_login: '',
                uid: ''
            };
            var qaOther = {
                allloadtime: '',
                imgloadtime: '',
                load_type: '',
                api_end: '',
                video_status: '',
                video_loadtime: '',
                video_url: ''
            };
            var actOther = {click_id: ''};
            var opt = {
                cc: 'TG6003',
                source: '',
                page_code: '',
                uid: uid || '',
                busi_code: '',
                report_type: 'act',
                other: {},
                time: parseInt(new Date().getTime()),
                url: window.location.href,
                _t: new Date().getTime()
            };
            var other = actOther;
            if (param.report_type === 'qa') {
                other = qaOther;
            } else if (param.report_type === 'wechat_share') {
                other = wechatShareOther;
            }
            opt.other = other;
            $.extend(true, opt, param || {});
            opt.other = JSON.stringify(opt.other);
            var host = '//service.busi.inke.cn';
            if (location.href.indexOf('localhost:') >= 0 || location.href.indexOf('testact.') >= 0) {
                host = 'http://test.web.service.inke.com';
            }
            var url = host + '/web/click_report?' + $.param(opt);
            if (typeof callback === 'function') {
                common.ajax({
                    url: url,
                    complete: function () {
                    },
                    success: function (res) {
                        callback();
                    },
                    error: function () {
                        // console.log('log error ');
                        callback();
                    }
                });
            } else {
                setTimeout(function () {
                    new Image().src = url;
                }, 0);
            }

        },
        /*
         *   初始化右上角按钮
         *
         *   message = JSON.stringify({
         *      'action': 'setTitleRightButton',
         *      'data': {
         *          'buttonText': '',
         *          'buttonImageType': 1
         *      }
         *   });
         *   
         *   这是初始化传递给客户端的参数，
         *      实现分享功能传参 {'buttonText': '', 'buttonImageType': 1}，
         *      实现自定义按钮传参 {'buttonText': text, 'buttonImageType': 0}
         *
         *   1. 实现分享功能，老逻辑暂不放弃，新逻辑调用：（新老逻辑共存，APP不支持新逻辑时会使用老逻辑）
         *      Common.initShare({（已包含微信二次分享）
         *          title: '分享标题',
         *          desc: '分享描述',
         *          imgUrl: '分享图片',  //--------不支持https
         *          link: '分享链接'
         *      });
         *
         *   2. 实现自定义右上角按钮文字，调用：
         *      Common.initRightButton({
         *          text: text,  //--------text：String，最长3个汉字
         *          callback: function () {},  //--------callback：function，右上角按钮的点击事件
         *          status: status  //--------status：Number，默认为 0
         *      });
         *
         *   注意：分享和自定义按钮不能同时存在（Common.initShare() & Common.initRightButton()不能同时调用）
         *
         * */
        rightButton: {
            status: 1,
            shareMsg: {},
            isiOS: /iPhone|mac|iPod|iPad/i.test(window.navigator.userAgent),
            postMessage: function (msg) {  //--------向新版客户端传递参数
                var that = this;
                if (that.isiOS && window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.sendInkeNativeInfo) {
                    // console.log('iOS');
                    window.webkit.messageHandlers.sendInkeNativeInfo.postMessage(msg);  //--------iOS的注册协议
                } else if (!that.isiOS && window.InKeJs) {
                    // console.log('Android');
                    window.InKeJs.sendInkeNativeInfo(msg);  //--------Android的注册协议
                } else {
                    // console.log('手机系统为：', window.navigator.userAgent);
                }
            },
            rightButtonFun: null  //--------右上角按钮点击后执行的函数
            ,
            initRightButton: function (opt) {  //--------初始化自定义右上角按钮文字
                var that = this,
                    setting = {
                        text: '',
                        callback: null,
                        status: 0
                    },
                    message = '';
                $.extend(true, setting, opt || {});

                if (common.getQueryString('uid') && common.getQueryString('sid')) {
                    message = JSON.stringify({
                        'action': 'setTitleRightButton',
                        'data': {
                            'buttonText': setting.text,
                            'buttonImageType': setting.status
                        }
                    });
                    that.status = setting.status;
                    that.postMessage(message);
                    that.rightButtonFun = setting.callback;
                }
            },
            initShare: function (opt) {  //--------初始化分享按钮
                var that = this,
                    setting = {
                        title: '上映客 直播我',
                        desc: '映客直播，实时、高清、快捷、流畅的视频直播平台，中国全新的视频社交媒体，明星大咖、网络红人、时尚娱乐、视频交友、高颜值等尽在映客直播app。',
                        imgUrl: 'http://img2.inke.cn/MTQ4NzE2NjY1Mzc4OSMxNDYjanBn.jpg',
                        link: 'https://3g.inke.cn'
                    },
                    message = JSON.stringify({
                        'action': 'setTitleRightButton',
                        'data': {
                            'buttonText': '',
                            'buttonImageType': 1
                        }
                    });
                $.extend(true, setting, opt || {});

                if (common.getQueryString('uid') && common.getQueryString('sid')) {
                    that.status = 1;
                    that.shareMsg = JSON.stringify({
                        'action': 'shareUrl',
                        'data': {
                            'url': opt.link,
                            'title': opt.title,
                            'msg': opt.desc,
                            'image': opt.imgUrl
                        }
                    });
                    that.postMessage(message);
                } else {
                    common.wxShare({
                        title: opt.title,
                        desc: opt.desc,
                        imgUrl: opt.imgUrl,
                        link: opt.link
                    });
                }
            },
            rightButtonClick: function (info) {  //--------右上角按钮的点击事件
                var that = this,
                    msg = JSON.parse(info);
                switch (msg.action) {
                    case 'onTitleRightButtonClick':
                        switch (that.status) {
                            case 0:
                                typeof that.rightButtonFun === 'function' && that.rightButtonFun();
                                break;
                            case 1:
                                that.postMessage(that.shareMsg);
                                break;
                            default:
                                // console.log('common.status is', that.status);
                        }
                        break;
                    case 'pageWasBackForward':
                        window.location.reload(true);
                        break;
                    default:
                        // console.log('msg.action is', msg.action);
                }
            }
        }
    };

    window.sendInkeJsInfo = function (info) {
        /*
         *   初始化后，点击右上角按钮，客户端会自动调用此函数（必须是window的对象）
         *   info：客户端传回的参数，String json，如：'{'action': 'setTitleRightButton'}'
         *
         *   1. 初始化后，点击右上角会返回：setTitleRightButton
         *
         *   2. 当发生页面跳转时，A→B，然后点击左上角返回，B→A，客户端并没有重新加载页面而是加载缓存的，
         *      客户端会监测页面是由点击了返回按钮出现的，重新调用此函数，返回：pageWasBackForward
         *
         * */
        common.rightButton.rightButtonClick(info);
    };

    // 微信分享设置
    function weixin_share(conf) {
        if (!conf || !conf.appid || !conf.noncestr || !conf.timestamp || !conf.signature) {
            console.error('wx_conf_is_error');
            return;
        }
        var setting = {
            title: conf.title || '',
            desc: conf.desc || '',
            link: conf.link || '',
            imgUrl: conf.imgUrl || '',
            trigger: function (res) {
            },
            success: function (res) {
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        };
        wx.config({
            debug: false,
            appId: conf.appid,
            timestamp: conf.timestamp,
            nonceStr: conf.noncestr,
            signature: conf.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareQZone',
                'onMenuShareWeibo',
                'getNetworkType'
            ]
        });
        wx.error(function (res) {
        });
        wx.ready(function () {
            wx.onMenuShareAppMessage(setting);
            wx.onMenuShareTimeline({
                title: conf.desc || '',
                link: conf.link || '',
                imgUrl: conf.imgUrl || '',
                trigger: function (res) {
                },
                success: function (res) {
                },
                cancel: function (res) {
                },
                fail: function (res) {
                }
            });
            wx.onMenuShareQQ(setting);
            wx.onMenuShareQZone(setting);
        });
    }

    win.Common = common;
})(window);

// DOM 加载完后展现视图
$(function() {
    $('#wrapper').show();
    $('#loading').hide();
});

// 活动性能统计
window.addEventListener('load', function() {
    if (window.performance) {
        var timing = performance.timing,
            pageloadtime = timing.loadEventStart - timing.navigationStart,
            pageparsetime = timing.domInteractive - timing.domLoading; // 页面解析时间
        var imgloadtime = 0;
        var param = {
            busi_code: 'all_act',
            report_type: 'qa',
            other: {}
        };
        if (performance.getEntries) {
            var entries = performance.getEntries(),
                imgsourcetime = 0,
                iNum = 0,
                reg = /.*(.jpg|.png|.gif)$/;
            for (var i = 0; i < entries.length; i++) {
                if (!reg.test(entries[i]['name'])) {
                    continue;
                }
                ++iNum;
                if (imgsourcetime < entries[i]['duration'] && iNum <= 4) {
                    imgsourcetime = entries[i]['duration'];
                }
            }
            // 页面解析 + 首屏图片最大加载时间
            imgloadtime = parseInt(pageparsetime + imgsourcetime);
        } else {
            imgloadtime = parseInt(pageloadtime);
        }
        param.other.allloadtime = pageloadtime;
        param.other.imgloadtime = imgloadtime;
        Common.log(param);
        if (typeof _czc !== 'undefined') {
            _czc && _czc.push(['_trackEvent', window.location.href.match(/(\/[A-Za-z0-9_-]+){2}\.html/g)[0].replace(/\//g, '_'), 'allloadtime', 'from_economy2', pageloadtime]);
            _czc && _czc.push(['_trackEvent', window.location.href.match(/(\/[A-Za-z0-9_-]+){2}\.html/g)[0].replace(/\//g, '_'), 'imgloadtime', 'from_economy2', imgloadtime]);
        }
    } else {
        // console.log('您的浏览器不支持performance属性，请升级浏览器版本');
    }
});
