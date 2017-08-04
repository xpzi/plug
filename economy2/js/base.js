
// 本地存储
var LocalData = {
    set: function (key, val) {
        if (window.localStorage) {
            localStorage[key] = val;
        } else {
            var exp = new Date();
            exp.setTime(exp.getTime() + 3600 * 24 * 30 * 1000);
            val = window.escape ? window.escape(val) : val;
            document.cookie = key + '=' + val + ';expires=' + exp.toGMTString();
        }
    },
    get: function (key) {
        if (window.localStorage) {
            return localStorage[key] || '';
        }
        var arr, reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
        arr = document.cookie.match(reg);
        if (arr) {
            return window.unescape ? window.unescape(arr[2]) : arr[2];
        } else {
            return '';
        }
    },
    del: function (key) {
        var val = LocalData.get(key);
        if (val !== undefined) {
            if (window.localStorage) {
                delete localStorage[key];
            } else {
                document.cookie = key + '=' + val + ';expires=' + new Date(0).toGMTString();
            }
        }
    },
    getSelect: function (str) {
        var _str = '';
        if (str.indexOf('请选择') !== -1) {
            _str = '';
        } else if (str === '保密') {
            _str = 0;
        } else {
            _str = Number(str.replace(/cm|kg/g, ''));
        }
        return _str;
    },
    setSelect: function (msg, u) {
        var _msg = '';
        if (msg === '') {
            _msg = '请选择';
        } else if (msg === 0) {
            _msg = '保密';
        } else {
            _msg = msg + (u || '');
        }
        return _msg;
    }
};

// 公用Base
var Base = {
    uid: Common.getQueryString('uid'),
    sid: Common.getQueryString('sid'),
    downloadUrl: 'https://api.busi.inke.cn/open_app.html?pname=hallhot',
    body: $('body'),
    loading: $('#loading'),
    wrapper: $('#wrapper'),
    alert_box: $('.alert-box'),
    alert_text: $('.alert-box p'),
    alert_out: $('.alert-out'),
    confirm_box: $('.confirm-box'),
    confirm_text: $('.confirm-box p'),
    confirm_out: $('.confirm-out'),
    confirm_go: $('.confirm-go'),
    apiHost: function () {
        var _href = window.location.href;
        if (_href.indexOf('testact.inke.cn') !== -1 || _href.indexOf('localhost:') !== -1) {
            // return 'http://testact.inke.cn:999';    // ceshi
            return 'https://betabroker.busi.inke.cn'
        } else if (_href.indexOf('betaact.inke.cn') !== -1) {
            return 'https://betabroker.busi.inke.cn';   // 灰度
        } else {
            return 'https://broker.busi.inke.cn';  // 线上的
        }
    },
    webHost: function () {
        var _href = window.location.href;
        if (_href.indexOf('testact.inke.cn') !== -1 || _href.indexOf('localhost:') !== -1) {
            return 'http://testact.inke.cn:8019';
        } else if (_href.indexOf('betaact.inke.cn') !== -1) {
            return 'https://betaact.inke.cn';
        } else {
            return 'https://act.inke.cn';
        }
    },
    // 微信环境
    isWeChat: function () {
        return /MicroMessenger/i.test(window.navigator.userAgent);
    },
    // iOS
    isIos: function () {
        return /iPhone|mac|iPod|iPad/i.test(window.navigator.userAgent);
    },
    // 判断是否是函数
    isFnHandle: function (fn) {
        return Object.prototype.toString.call(fn) === '[object Function]';
    },
    // 创建 alert 弹窗
    createAlert: function () {
        if (!$('.alert-box').length) {
            this.body.append($('<section class="dialog-box alert-box">' +
                '<div class="dialog">' +
                '<div class="alert-text">' +
                '<p></p>' +
                '</div>' +
                '<button class="alert-out">确认</button>' +
                '</div>' +
                '</section>'));
            this.alert_box = $('.alert-box');
            this.alert_text = $('.alert-box p');
            this.alert_out = $('.alert-out');
        }
    },
    // 创建 confirm 弹窗
    createConfirm: function () {
        if (!$('.confirm-box').length) {
            this.body.append($('<section class="dialog-box confirm-box">' +
                '<div class="dialog">' +
                '<div class="confirm-text">' +
                '<p></p>' +
                '</div>' +
                '<div class="confirm-btn">' +
                '<button class="confirm-out">取消</button>' +
                '<button class="confirm-go">确认</button>' +
                '</div>' +
                '</div>' +
                '</section>'));
            this.confirm_box = $('.confirm-box');
            this.confirm_text = $('.confirm-box p');
            this.confirm_out = $('.confirm-out');
            this.confirm_go = $('.confirm-go');
        }
    },
    // alert 弹窗
    alertShow: function (str, fun) {
        this.createAlert();
        this.alert_box.show();
        this.alert_text.html(str);
        this.alertHide(fun);
    },
    alertHide: function (fun) {
        var that = this;
        that.alert_out.off('click').on('click', function () {
            that.alert_box.hide();
            that.alert_text.html('');
            typeof fun === 'function' && fun();
        });
    },
    // confirm 弹窗
    confirm: function (str, fun) {
        var that = this,
            _fig = 0;
        that.createConfirm();
        that.confirm_box.show();
        that.confirm_text.html(str);
        that.confirm_go.off('click').on('click', function () {
            _fig = 1;
            that.confirm_box.hide();
            typeof fun === 'function' && fun();
        });
        that.confirm_out.off('click').on('click', function () {
            _fig = 0;
            that.confirm_box.hide();
        });
    },
    // 打开 app
    openApp: function () {
        var that = this;
        that.confirm('在“映客”中打开', function () {
            window.location.href = that.downloadUrl;
        });
    },
    // select 模拟
    selFun: function () {
        var $this = null;
        $('.sel').on('change', function () {
            $this = $(this);
            $this.prev().html($this.val());
            if ($this.val().indexOf('请选择') !== -1) {
                $this.prev().addClass('c3');
            } else {
                $this.prev().removeClass('c3');
            }
        });
    },
    // 链接追加原子参数
    href: function (href) {
        if (href) {
            return (href + window.location.search);
        }
    },
    // 自动跳转
    jumpHref: function (href) {
        if (href) {
            window.location.href = href + window.location.search;
        }
    },
    // 点击跳转
    clickHref: function (obj, href) {
        if (obj && href) {
            obj.on('click', function () {
                window.location.href = href + window.location.search;
            });
        }
    },
    // 禁用 input || button || select || textarea
    disabled: function () {
        $('input, button, select, textarea').attr('disabled', !0);
    },
    // 埋点
    log: function (click_id, callback) {
        Common.log({
            busi_code: 'busi_code',
            page_code: 'page_code',
            other: {
                click_id: click_id
            },
            callback: callback
        });
    },
    // 栈外埋点
    logOut: function (click_id) {
        var that = this;
        that.log(click_id, function () {
            that.openApp();
        });
    }
};

// cnzz 统计 PV/UV
if (typeof _czc !== 'undefined') {
    _czc && _czc.push(['_trackEvent', window.location.href.match(/(\/[A-Za-z0-9_-]+){2}\.html/g)[0].replace(/\//g, '_'), 'view', 'from_economy2']);
}
