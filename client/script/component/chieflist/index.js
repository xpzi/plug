import React from 'react';
require('./index.scss');


class Home extends React.Component {

	constructor(props) {
		super(props);

		console.log( this.props );

	}

	render () {
		
	    return (
	        <div className="home">
				hello  word!  chieflist  终于好了  我的个天	防守打法	
	        </div>
	    )
	}
}

export default Home;




