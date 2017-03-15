// require('../../dist/js/vendors.js');


console.log('--->enter:' ,process.env.NODE_ENV );
var page = {};
if(  process.env.NODE_ENV == 'development' ){
	page = {
		app: require('../../client/enter/app.js')
	}
} else{
	page = {
		app: require('../../client/enter/app.js')
	}
}



module.exports = page;