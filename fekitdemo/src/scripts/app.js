var $ = require("./libs/jquery.min.js");

var common = require("./utils/common.utils.js");

var tplHeader = require("./tpls/header.string");
var tplBody = require("./tpls/body.string");
var tplFooter = require("./tpls/footer.string");

var list = require("./modules/index.js");

$(function(){

	common.renderHtml("body" , tplHeader+ tplBody +  tplFooter);
	list();
});