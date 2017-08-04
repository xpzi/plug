;(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals.
        window.UploadFile = factory();
    }
})(function() {

    function UploadFile(opt) {
        if (!(this instanceof UploadFile)) {
            return new UploadFile(opt);
        }
        this.opt = {
            $ipt: $(""),
            $preview: $(""), // 预览元素
            $previewFE: $(""), // 前端预览元素
            $iptHide: $(""), // 隐藏域
            $loading: $(""), // loading 元素
            extArr: ["png", "jpg", "gif", "jpeg"],
            maxSize: 1024, // 最大存储 单位K
            maxWidth: "",
            maxHeight: "",
            zipWidth: 800,
            zipHeight: 1300,
            uri: "http://testweb.busi.inke.com:89/upload/image_test",  //上传URI
            onSelectSuccess: function () {
            }, // 选择文件 成功事件
            onSelectFail: function () {
            }, // 选择文件 失败事件
            onPreview: function () {
            }, // 预览 事件
            onUploadSuccess: function () {
            }, // 上传成功
            onUploadError: function () {
            } // 上传失败
        };
        $.extend(true, this.opt, opt || {});
        this.init();
    }

    UploadFile.prototype = {
        init: function () {
            var that = this, opt = that.opt;
            opt.extArr.length && opt.$ipt.attr("accept", "image/" + opt.extArr.join(",image/"));
            opt.$ipt.on("change", that.changeFile.bind(that));
        },
        changeFile: function (e) {
            var that = this, opt = that.opt;
            var target = e.currentTarget;
            var $ipt = $(target);
            if (!target.files.length) {
                // // console.log("file is null");
                return;
            }
            var file = target.files[0];
            var extName = file.name.split(".").pop().toLocaleLowerCase();
            that.extName = extName;
            if (opt.extArr.indexOf(extName) === -1) {
                Base.alertShow("图片格式不对");
                typeof opt.onSelectFail === "function" && opt.onSelectFail("文件格式不对" + file.name);
                return;
            }
            if (opt.maxSize && file.size > opt.maxSize * 1024) {
                Base.alertShow("图片不能超过 " + opt.maxSize + " K");
                typeof opt.onSelectFail === "function" && opt.onSelectFail("文件超过 " + opt.maxSize + " K");
                return;
            }
            typeof opt.onSelectSuccess === "function" && opt.onSelectSuccess(file);
            var reader = new FileReader();
            reader.onloadend = function (event) {
                var imgData = event.target.result;
                that.getWidth(imgData, function (w, h) {
                    // // console.log("原有图片 宽:" + w + " ;高度 ：" + h);
                    var newW = w, newH = h;
                    if (w > that.opt.zipWidth && h > that.opt.zipHeight) {
                        if (w / h > that.opt.zipWidth / that.opt.zipHeight) {
                            newH = that.opt.zipHeight;
                            newW = w * that.opt.zipHeight / h;
                        } else {
                            newW = that.opt.zipWidth;
                            newH = h * that.opt.zipWidth / w;
                        }
                    }
                    // // console.log("压缩图片 宽:" + newW + " ;高度 ：" + newH);
                    that.zipImg(file, newW, newH, function (data) {
                        that.preview(data, true);
                        that.uploadForm(data);
                    });

                });
                // that.preview(imgData,true);
            };
            reader.readAsDataURL(file);
            // that.uploadForm(file);
        },
        getWidth: function (src, callback) {
            var $con = $("<div>", {
                "id": "js-img-size-cont"
            }).css({
                opacity: 0,
                position: "absolute",
                zIndex: -1,
                top: -10000,
                overflow: "hidden",
                width: 100
            }).appendTo($("body"));
            var $img = $("<img>", {
                src: src
            }).appendTo($con);
            $img.on("load", function () {
                callback.call(this, this.width, this.height);
                $con.remove();
            });
        },
        preview: function (src, isFE) {
            var that = this, opt = that.opt;
            if (opt.$previewFE.length && isFE) {
                opt.$previewFE.attr("src", src);
            }
            if (!isFE) {
                if (opt.$preview[0] && opt.$preview[0].tagName.toLocaleLowerCase() === "img") {
                    opt.$preview.attr("src", src);
                } else {
                    opt.$preview.css({"background-image": "url(" + src + ")"});
                }
            }
        },
        uploadForm: function (file, isBase64) {
            var that = this, opt = that.opt;
            var url = opt.uri;
            if (isBase64) {
                var formData = {};
                formData[opt.$ipt.attr("name")] = file;
            } else {
                var formData = new FormData();
                var key = opt.$ipt.attr("name");
                formData.append(key, file);
            }
            opt.$loading.show();
            $(".img-info").append("<br>1");
            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                dataType: "json",
                success: function (res) {
                    opt.$loading.hide();
                    opt.$ipt.val("");
                    if (res.error_code === 0) {
                        var info = res.data[key];
                        opt.$iptHide.val(info.url);
                        that.preview(info.url, false);
                        typeof opt.onUploadSuccess === "function" && opt.onUploadSuccess(res);
                    } else {
                        typeof opt.onUploadError === "function" && opt.onUploadError(res);
                    }
                },
                error: function () {
                    opt.$loading.hide();
                    opt.$ipt.val("");
                    typeof opt.onUploadError === "function" && opt.onUploadError();
                }
            });
        },
        /**
         *
         *  iphone 压缩后图片有问题，主要是竖图会有丢失，用开源的 canvasResize 会解决掉这个问题
         *  所依这个函数在使用的时候可能需要用canvasResize重写
         *  @param   {[type]}    imgData   [description]
         *  @param   {[type]}    width     [description]
         *  @param   {[type]}    height    [description]
         *  @param   {Function}  callback  [description]
         *  @return  {[type]}              [description]
         *
         **/
        zipImg: function (imgData, width, height, callback) {
            var that = this;
            canvasResize(imgData, {
                width: width || 1000,
                height: height || 1000,
                crop: false,
                quality: 80,
                rotate: 0,
                callback: function (data, width, height) {
                    callback && callback(data);
                }
            });
        }
    };

    return function (opt) {
        var obj = new UploadFile(opt);
        return obj;
    };

});