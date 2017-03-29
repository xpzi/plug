import React from 'react';
require('./index.scss');

class Ad extends React.Component {

	constructor(props) {
		super(props);
		this.state = {hide: ''};
	}

	hideFunc(){
		console.log("hide");
		this.setState({
			hide: 'hide'
		});
		console.log( this.state )
	}

	render(){

		const { 
			imgurl = 'http://src.leju.com/imp/imp/deal/e5/d3/d/41f19e6820a63aa34ad967bd723_p1_mk1_os5a5d79.jpg',
			label ='广告',
		} = this.props; 

		return (
			<div className={ 'ad ' + this.state.hide  }>
				<div className="adcontent">
					<a>	<img src={ imgurl }  alt=""/></a>	
				</div>
				<div className="adlabel">
					<span>{ label }</span>
				</div>
				<div className="clear"  onClick={ this.hideFunc.bind(this) }>
					<span>X</span>
				</div>
			</div>	
		);

	}

}

export default Ad;