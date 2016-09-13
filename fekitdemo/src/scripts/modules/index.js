//引入库文件
var $ = require("../libs/jquery.min.js");

// 引入模块文件
module.exports = function(){
	$.ajax({
		url:'./api/getIndexList',
		type:"get",
		data:{},
		success: function (res) {
			// body...
			var str = "";
			$.each( res.data , function(index , value){
				str += "<li>" + value + "</li>"	;
			});
			$('.list').prepend(str);
		}
	});
}

