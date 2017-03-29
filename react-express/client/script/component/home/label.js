import React from 'react';



class Nav extends React.Component {
	
	constructor(props) {
		super(props);

		const { data = [{
	        icon: 'http://static.jiaju.com/jiaju/com/m7gz/assets/images/m-nav-09.png',
	        href:'http://live.leju.com/7gz/bj/',
	        text: '装修直播'
	    },{
	        icon: 'http://static.jiaju.com/jiaju/com/m7gz/assets/images/m-nav-06.png',
	        href:'http://m.7gz.com/Activity',
	        text: '最新活动'
	    },{
	        icon: 'http://static.jiaju.com/jiaju/com/m7gz/assets/images/m-nav-07.png',
	        href:'http://m.7gz.com/News',
	        text: '装修攻略'
	    },{
	        icon: 'http://static.jiaju.com/jiaju/com/m7gz/assets/images/m-nav-08.png',
	        href:'http://m.7gz.com/ServiceIntro/index.html',
	        text: '服务保障'
	    }] } = this.props; 
		
		this.state = { data };
	}

	// 第一次render开始
	componentWillMount() {
		
	}

	// 第一次render结束
	componentDidMount() {

	}

	renderKjan(){
        return this.state.data.map((item, index) => {
            return (
                <div key={index} >
                    <a href={ item.href } className="kjan-item" key={index} >
                        <span> <img src={item.icon} alt=""/> </span>
                        <span>{ item.text}</span>
                    </a>
                </div>
            )
        }); 
    }

	render() {


		return (
			<div className="kjan"> { this.renderKjan() } </div>
		);


		
	}
}

export default Nav;