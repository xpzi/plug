var fetch = require('node-fetch');
module.exports = {

	postJson(url, option, callback){
		var { option, callback } = this._init(option, callback);
		fetch( url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(option)
		})
		.then( (res) => res.json() )
		.then( ( data) => callback('',data) );
	},

	get( url, option, callback){
		var {option, callback} = this._init(option, callback);


		fetch( url, option)
		.then( ( res) => res.text() )
		.then( (data) => callback('',data));
	},
	getJson( url, option, callback ){

		var {option, callback} = this._init(option, callback);
		url += '?';

		for(var key in option){
			url +=  key + '=' + option[key]+ '&';
		}

		fetch( url, option)
		.then( ( res) => res.json() )	
		.then( (data) => callback('',data));
	},

	_init( option, callback ){
		if(   typeof option == 'function' ){
			callback = option;
			option = {};
		} else if(  typeof option != 'object' ){
			option = {}
		}
		return {option,  callback };
	}

}