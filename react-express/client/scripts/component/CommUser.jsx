'use strict';
import React from 'react';

class Demo extends React.Component {
	
	
	piclist(){
		if( this.props.picList ){
			return(<div className="picList">
					<img />
					<img />
					<img />
					<img />
				</div>);	
		} else{
			return ;
		}
		
	}
	
	render(){
		return (
			<div className="commuser">
				<div className="user-baic">
					<span>
						<img src="" />	
					</span>
					<span>
						<h3>火箭人</h3>
						<span>12分钟前</span>
					</span>
					<span>
						<span><i></i></span>
						<span><i></i></span>
						<span><i></i></span>
						<span><i></i></span>
						<span><i></i></span>
					</span>
				</div>
				<div className="content">
					fanflk 开发举案说法萨克房间号.,过得好师傅
				</div>
				{ this.piclist() }
			</div>
		)
	}
};


export default Demo;