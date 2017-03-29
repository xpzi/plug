class Abcd {
	constructor(props) {
		
		
	}


	stringMax( str, num ){
		num = num || str.length;
		if(  str.length > num ){
			str = str.substr(0, num) + '...';
		}
		return str;
	}
}

export default new  Abcd();