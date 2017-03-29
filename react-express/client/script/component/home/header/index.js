import React from 'react';
require('./index.scss');

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.props;
	}

	render(){
		var data = this.state.data || {
			logo:  'http://static.jiaju.com/jiaju/com/m7gz/assets/images/logo.png',
			href: '#',
			city: '上海',
			title: '标题'
		}
		return (
			<div className="header">
				<div>
					<a href={ data.href } ><img src={ data.logo } alt={data.title} /></a>
				</div>
				<div>
					<span>{  data.city }</span>
					<i></i>
				</div>
				<div>
					<i></i>
				</div>
			</div>	
		);
	}

}

export default Header;