import React from 'react';



class Footer extends React.Component {
	
	constructor(props) {
		super(props);
	}

	// 第一次render开始
	componentWillMount() {}

	// 第一次render结束
	componentDidMount() {}


	render() {

		return (
			<div className="footer">
                <div className="link">
                    <a href="#">首页</a><i></i>
                    <a href="#">电@脑@版</a><i></i>
                    <a href="#">APP下载</a>
                </div>
                <div className="siteinfo">©2017 抢工长 京ICP备14045086号-1</div>
            </div>
		);


		
	}
}

export default Footer;