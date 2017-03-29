import React from 'react';
require('./index.scss');


class Nav extends React.Component {
	
	constructor(props) {
		super(props);

		const { data = [{
		        url: 'http://static.jiaju.com/jiaju/com/m7gz/assets/images/qgz_new.png',
		        text: '抢工长',
		        href: '/chieflist'
		    },{
		        url: 'http://static.jiaju.com/jiaju/com/m7gz/assets/images/m-nav-02.png',
		        text: '看案例',
		        href: '/zxcase'
		    },{
		        url: 'http://static.jiaju.com/jiaju/com/m7gz/assets/images/m-nav-03.png',
		        text: '装修报价',
		        href: '#',
				label: '免费'
		    },{
		        url: 'http://static.jiaju.com/jiaju/com/m7gz/assets/images/m-nav-04.png',
		        text: '上门量房',
		        href: '#',
		        label: '免费'
		    },{
		        url: 'http://static.jiaju.com/jiaju/com/m7gz/assets/images/appdown_new.png',
		        text: 'App下载',
		        href: '#'
		    }] } = this.props; 
		
		this.state = { data };
	}

	// 第一次render开始
	componentWillMount() {
		
	}

	// 第一次render结束
	componentDidMount() {

	}

	renderNav(){
        
        return this.state.data.map((item, index) => {
            return (
                <a key={index} href={ item.href } className="nav-item" >
                    <span>
                        <img src={ item.url } alt={ item.href }/>
                    </span>
                    <span> { item.text } </span>

                    { item.label ? <i>{ item.label }</i> : '' }

                </a> 
            )
        });
    }

	render() {


		return (
			 <div className="nav"> {  this.renderNav() } </div>
		);


		
	}
}

export default Nav;