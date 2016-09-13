var $ = require("../libs/jquery.min.js");
var Comment = {
	renderHtml : function (ele ,  str  ) {
		$(ele).prepend(str);
	}
};
module.exports = Comment;