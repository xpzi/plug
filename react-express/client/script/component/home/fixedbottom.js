import React from 'react';



class Fixedbottom extends React.Component {
	
	constructor(props) {
		super(props);
	}

	// 第一次render开始
	componentWillMount() {
		
	}

	// 第一次render结束
	componentDidMount() {

	}


	render() {


		return (
			<div className="fixedbottom">
                <div  className="con">
                    <a href="#">
                        <span><img src="http://static.jiaju.com/jiaju/com/m7gz/assets/images/calculator2.png" alt=""/></span>
                        <span>
                            <h3>装修花多少？</h3>
                            <p>一键申请免费报价</p>
                        </span>
                    </a>
                </div>
                <div  className="con">
                    <a href="#">
                        <span><img src="http://static.jiaju.com/jiaju/com/m7gz/assets/images/house2.png" alt=""/></span>
                        <span>
                            <h3>免费上门量房</h3>
                            <p>几日仅剩 <i>100</i> 名额 </p>
                        </span>
                    </a>
                </div>
            </div>
		);


		
	}
}

export default Fixedbottom;