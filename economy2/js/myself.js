
// var apiHost = "https://broker.busi.inke.cn";
// if (location.href.indexOf(":63342") >= 0 || location.href.indexOf(":8019") >= 0) {
//     apiHost = "http://54.223.24.201:999";
// } else if (location.href.indexOf("betaact.") >= 0) {
//     apiHost = "https://betabroker.busi.inke.cn";
// }

var Page = {
    uid: Common.getQueryString("uid"),
    sid: Common.getQueryString("sid"),
    ad_order_id: Common.getQueryString("ad_order_id"),
    loading: $("#loading"),
    alert_box: $(".alert-box"),
    alert_text: $(".alert-box p"),
    confirm_box: $(".confirm-box"),
    confirm_text: $(".confirm-box p"),
    confirm_out: $(".confirm-out"),
    confirm_go: $(".confirm-go"),
    wrapper: $("#wrapper"),
    desc_box: $(".desc-box"),
    desc_img_list: $(".desc-img ul"),
    desc_img: $(".desc-img img"),
    swiper_container: $(".swiper-container"),
    swiper_out: $(".swiper-out"),
    bot: $(".bot"),
    /*----选择提交视频----*/
    vid: $(".vid"),
    vid_list: $(".vid-list"),
    vid_show: $(".vid-show"),
    vid_out: $(".vid-out"),
    vid_true: $(".vid-true"),
    vid_chb: $(".vid-list input"),
    /*----头部提示信息----*/
    hint: $(".hint"),
    /*----广告内容----*/
    desc_title: $(".desc-title"),
    desc_mon: $(".desc-mon"),
    desc_time: $(".desc-time"),
    desc_form: $(".desc-form"),
    desc_par: $(".desc-par"),
    /*----各种时间----*/
    detail: $(".detail"),
    ad_order: $(".ad_order"),  //  任务编号
    invite_time: $(".invite_time"),  //  邀约时间
    accept_time: $(".accept_time"),  //  接受任务时间
    cancel_time: $(".cancel_time"),  //  任务取消时间
    invalid_time: $(".invalid_time"),  //  任务失效时间
    submit_time: $(".submit_time"),  //  提交视频时间
    verify_time: $(".verify_time"),  //  广告主确认时间
    init: function () {
        var that = this;
        that.initData();
        that.showImg();
        that.bindEvent();
    },
    initData: function () {
        var that = this;
        that.loading.show();
        Common.ajax({
            url: "/app/get_order_info",
            data: {
                uid: that.uid,
                sid: that.sid,
                ad_order_id: that.ad_order_id
            },
            success: function (res) {
                that.loading.hide();
                var dm_error = res.dm_error;
                if (dm_error == 0) {
                    var info = res.data.order_info,
                        status = info.status,
                        imgArr = info.attachment,
                        html1 = "",
                        html2 = "";
                    if (imgArr.length == 0) {
                        that.desc_box.remove();
                        that.desc_par.css({
                            border: "none"
                        });
                    } else {
                        for (var i = 0; i < imgArr.length; i++) {
                            html1 += "<div class=\"swiper-slide\"><img src=\"" + imgArr[i] + "\" alt=\"\"></div>";
                            html2 += "<li><img src=\"" + imgArr[i] + "\" alt=\"\"></li>";
                        }
                        $(".swiper-wrapper").append(html1);
                        that.desc_img_list.append(html2);
                        that.desc_img_list.css({
                            width: 5.5 * imgArr.length + "rem"
                        });
                    }
                    /*// console.log("info", info);*/
                    function none(str) {
                        that.bot.remove();
                        that.vid.remove();
                        that.hint.html(str);
                    }

                    switch (status) {
                        case 0:
                            /*// console.log("初始化");*/
                            break;
                        case 1:
                            /*// console.log("发送通知，邀约中");*/
                            break;
                        case 2:
                            /*// console.log("主播接完单，等待提交任务");*/
                            $(
                                "<p>邀约时间：<span class=\"invite_time\">" + info.invite_time + "</span></p>" +
                                "<p>接受任务时间：<span class=\"accept_time\">" + info.accept_time + "</span></p>"
                            ).insertBefore(that.detail.find("div"));
                            that.bot.show();
                            that.detail.removeClass("bot-none");
                            that.hint.html("请按要求准时开播，结束后记得来提交视频。");
                            Common.ajax({
                                url: "/app/get_task_list",
                                data: {
                                    uid: that.uid,
                                    sid: that.sid,
                                    ad_order_id: that.ad_order_id,
                                    cur_page: 1
                                },
                                success: function (res) {
                                    var dm_error = res.dm_error;
                                    if (dm_error == 0) {
                                        if (res.data == null) {
                                            that.vid_true.off("click").addClass("bot-ash");
                                        } else {
                                            that.vid_list.html("");
                                            var records = res.data.records,
                                                user_info = res.data.user_info;
                                            /*// console.log("records is", records);
                                            // console.log("user_info is", user_info);*/
                                            for (var i = 0; i < records.length; i++) {
                                                $(
                                                    "<li>" +
                                                    "<a><img src=\"" + user_info.portrait + "\" alt=\"\"></a>" +
                                                    "<div><p>" + records[i].records_info.title + "</p>" +
                                                    "<p>观看：<span>" + records[i].records_info.online_users + "</span></p>" +
                                                    "<p>任务记录：<span>" + records[i].total_time_new + "</span></p>" +
                                                    "<p>" + records[i].records_info.create_time_new + "</p></div>" +
                                                    "<input type=\"checkbox\"/>" +
                                                    "<button data-index=\"id-" + records[i].records_info.id + "\"></button>" +
                                                    "</li>"
                                                ).appendTo(that.vid_list);
                                            }
                                        }
                                    } else if (dm_error == 1099010012) {
                                        that.alertShow("登录已过期，请在设置中<br/>退出并重新登录");
                                    } else {
                                        that.alertShow(res.error_msg);
                                    }
                                },
                                error: function () {

                                }
                            });
                            break;
                        case 3:
                            /*// console.log("主播订单接收过期");*/
                            break;
                        case 4:
                            /*// console.log("主播提交完任务，等待审核中");*/
                            $(
                                "<p>邀约时间：<span class=\"invite_time\">" + info.invite_time + "</span></p>" +
                                "<p>接受任务时间：<span class=\"accept_time\">" + info.accept_time + "</span></p>" +
                                "<p>提交视频时间：<span class=\"submit_time\">" + info.submit_time + "</span></p>"
                            ).insertBefore(that.detail.find("div"));
                            none("任务视频提交成功，请等待广告主确认。");
                            break;
                        case 5:
                            /*// console.log("主播订单提交过期");*/
                            $(
                                "<p>邀约时间：<span class=\"invite_time\">" + info.invite_time + "</span></p>" +
                                "<p>接受任务时间：<span class=\"accept_time\">" + info.accept_time + "</span></p>" +
                                "<p>任务失效时间：<span class=\"invalid_time\">" + info.invalid_time + "</span></p>"
                            ).insertBefore(that.detail.find("div"));
                            none("超过最晚提交视频时间，任务已失败。");
                            break;
                        case 6:
                            /*// console.log("审核通过，现直接会进入到完成状态");*/
                            break;
                        case 7:
                            /*// console.log("订单被主播拒绝");*/
                            break;
                        case 8:
                            /*// console.log("清算状态，现在不存在");*/
                            $(
                                "<p>邀约时间：<span class=\"invite_time\">" + info.invite_time + "</span></p>" +
                                "<p>接受任务时间：<span class=\"accept_time\">" + info.accept_time + "</span></p>" +
                                "<p>任务取消时间：<span class=\"cancel_time\">" + info.cancel_time + "</span></p>" +
                                "<p>任务失效时间：<span class=\"invalid_time\">" + info.invalid_time + "</span></p>" +
                                "<p>提交视频时间：<span class=\"submit_time\">" + info.submit_time + "</span></p>" +
                                "<p>广告主确认时间：<span class=\"verify_time\">" + info.verify_time + "</span></p>"
                            );
                            break;
                        case 9:
                            /*// console.log("订单被IMS拒绝，接单前");*/
                            break;
                        case 10:
                            /*// console.log("订单完成状态");*/
                            $(
                                "<p>邀约时间：<span class=\"invite_time\">" + info.invite_time + "</span></p>" +
                                "<p>接受任务时间：<span class=\"accept_time\">" + info.accept_time + "</span></p>" +
                                "<p>提交视频时间：<span class=\"submit_time\">" + info.submit_time + "</span></p>" +
                                "<p>广告主确认时间：<span class=\"verify_time\">" + info.verify_time + "</span></p>"
                            ).insertBefore(that.detail.find("div"));
                            none("任务已完成，收入将由财务人员下月打款结算。");
                            break;
                        case 11:
                            /*// console.log("订单被IMS拒绝，接单后");*/
                            $(
                                "<p>邀约时间：<span class=\"invite_time\">" + info.invite_time + "</span></p>" +
                                "<p>接受任务时间：<span class=\"accept_time\">" + info.accept_time + "</span></p>" +
                                "<p>任务取消时间：<span class=\"cancel_time\">" + info.cancel_time + "</span></p>"
                            ).insertBefore(that.detail.find("div"));
                            none("任务已被中途取消。");
                            break;
                    }
                    that.desc_title.html(info.title);
                    that.desc_mon.html(info.order_price + "元");
                    that.desc_time.html(info.live_start_time + "~" + info.live_end_time);
                    that.desc_form.html(info.order_type);
                    that.desc_par.html(info.content);
                    that.ad_order.html(that.ad_order_id);
                } else if (dm_error == 1099010012) {
                    that.alertShow("登录已过期，请在设置中<br/>退出并重新登录");
                } else {
                    that.alertShow(res.error_msg);
                }
            },
            error: function () {

            }
        });
    },
    showImg: function () {
        var that = this,
            fig = 0,
            index = 0,
            mySwiper = null;
        that.desc_img_list.on("tap", "img", function () {
            index = $(this).parent().index();
            that.wrapper.hide();
            that.swiper_container.show();
            if (fig == 0) {
                mySwiper = new Swiper(".swiper-container", {
                    paginationClickable: true,
                    pagination: ".swiper-pagination"
                });
                fig = 1;
            }
            mySwiper.slideTo(index, 0);
        });
        that.swiper_out.on("tap", function () {
            that.wrapper.show();
            that.swiper_container.hide();
        });
    },
    body: $("body"),
    vidArr: [],
    bindEvent: function () {
        var that = this,
            inp = "",
            btn = "",
            index = 0,
            _this = null;
        that.vid_show.on("click", function () {
            that.log("video-submit");
            that.vid.show();
            $(this).parent().hide();
            that.body.scrollTop(that.body.height());
        });
        that.vid_out.on("click", function () {
            that.vid.hide();
            that.vid_show.parent().show();
        });
        that.vid_list.on("change", "input", function () {
            _this = $(this);
            btn = _this.next();
            index = _this.closest("li").index();
            inp = _this.closest("li").find("input:checked").index();
            if (inp >= 0) {
                btn.addClass("btn-true");
            } else {
                btn.removeClass("btn-true");
            }
        });
        that.vid_true.on("click", function () {
            var arr = $(".btn-true"),
                length = arr.length;
            if (length > 0) {
                that.confirm("是否确认提交", function () {
                    that.log("video-true");
                    that.loading.show();
                    for (var i = 0; i < length; i++) {
                        that.vidArr.push($(arr[i]).attr("data-index").replace("id-", ""));
                    }
                    /*// console.log(that.vidArr.join(","));*/
                    Common.ajax({
                        url: "/app/commit_order",
                        data: {
                            uid: that.uid,
                            sid: that.sid,
                            ad_order_id: that.ad_order_id,
                            video_info: that.vidArr.join(",")
                        },
                        success: function (res) {
                            /*// console.log(res);*/
                            that.loading.hide();
                            var dm_error = res.dm_error;
                            if (dm_error == 0) {
                                that.vid.hide();
                                that.bot.remove();
                                that.detail.addClass("bot-none");
                                that.hint.html("任务视频提交成功，请等待广告主确认");
                            } else if (dm_error == 1099010012) {
                                that.alertShow("登录已过期，请在设置中<br/>退出并重新登录");
                            } else {
                                that.alertShow(res.error_msg);
                            }
                        },
                        error: function () {

                        }
                    });
                });
            } else {
                that.alertShow("请选择任务视频");
            }
            that.vidArr = [];
        });
    },
    alertShow: function (str) {  //  alert弹窗
        this.alert_box.show();
        this.alert_text.html(str);
        this.alertHide();
    },
    alertHide: function () {
        var that = this;
        $(".alert-out").off("click").on("click", function () {
            that.alert_box.hide();
            that.alert_text.html("");
        });
    },
    confirm: function (str, fun) {  //  confirm弹窗
        var that = this,
            fig = 0;
        that.confirm_box.show();
        that.confirm_text.html(str);
        that.confirm_go.off("click").on("click", function () {
            fig = 1;
            that.confirm_box.hide();
            if (typeof fun == "function") {
                fun();
            } else {
                // console.log("fun is not a function!");
            }
        });
        that.confirm_out.off("click").on("click", function () {
            fig = 0;
            that.confirm_box.hide();
        });
    },
    log: function (click_id, callback) {  //  埋点
        Common.log({
            busi_code: "economy2",
            page_code: "myself",
            other: {
                click_id: click_id
            },
            callback: callback
        });
    }
};

$(function () {
    Page.init();
});
