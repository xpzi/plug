var CryptoJS = require('crypto-js');

var common = {
    //继承
    extend: function(src, des){
        for(var tmp in src){
            if(src.hasOwnProperty(tmp)){
                des[tmp] = src[tmp];
            }
        }
        return des;
    },
    //加密
    encode: function($mobile){
        return base64_encode(substr(md5($mobile),0,8)+base64_encode($mobile)+substr(md5($mobile),10,4));
    },
    //解密
    decode: function($mobile_encode){
        return base64_decode(substr(base64_decode($mobile_encode),8));
    }
};

function base64_encode(str){
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
}

function base64_decode(str){
    return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(str));
}

function md5(str){
    return CryptoJS.MD5(str).toString();
}

function substr(str, start, length){
    return str.substr(start, length);
}

function substring(str, start, length){
    return str.substring(start, length);
}


module.exports  = common;