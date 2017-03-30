var index = require('./index/index.js');
var users = require('./users/users.js');

var router = function(app){
	app.use('/', index);
	app.use('/users', users);
};






module.exports = router;
