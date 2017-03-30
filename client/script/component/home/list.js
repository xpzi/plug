import React from 'react';
import Tool from '../../util/tool.js';
console.log( Tool );

var imgbiscurl = 'http://bjcache.leju.com/gongzhang/';



class List extends React.Component {
	
	constructor(props) {
		super(props);

		const { data = [{
	        icon: 'http://static.jiaju.com/jiaju/com/m7gz/assets/images/m-nav-09.png',
	        text: '装修直播'
	    },{
	        icon: 'http://static.jiaju.com/jiaju/com/m7gz/assets/images/m-nav-06.png',
	        text: '最新活动'
	    },{
	        icon: 'http://static.jiaju.com/jiaju/com/m7gz/assets/images/m-nav-07.png',
	        text: '装修攻略'
	    },{
	        icon: 'http://static.jiaju.com/jiaju/com/m7gz/assets/images/m-nav-08.png',
	        text: '服务保障'
	    }] } = this.props; 
		
		this.state = { data };
		this.targetLink.bind(this);
		this.likes.bind(this);
	}

	// 第一次render开始
	componentWillMount() {
		
	}

	// 第一次render结束
	componentDidMount( ) {

	}

	// 喜欢按钮
	likes( event ){
		event.stopPropagation();
		var keys = event.currentTarget.dataset.keys.split('**');
		this.state.data.data[keys[0]][keys[1]].clicks++;
		this.setState();
	}

	targetLink( event ){
		event.stopPropagation();
		window.open(event.currentTarget.dataset.href);
	}

	renderList( data ){
		var _this = this;
		var arrs = [];
		for( var key in data ){
			var item = data[key].map( (it, index) => {
				return (
					<div onClick={ _this.targetLink } key={it.title} data-href={ it.detail_url }  className="listitem">
						<span><img src={  it.pic_url ?  imgbiscurl + it.pic_url : 'http://static.jiaju.com/jiaju/com/m7gz/assets/images/m-placeholder-case.png' } alt=""/></span>
						<span>
							<h3>{ Tool.stringMax( it.title, 12) }</h3>
							<p>{Tool.stringMax( it.summary, 28)}</p>
							<label onClick={ _this.likes.bind(_this)} data-keys={key+ '**'+ index} >
								<i>{ it.clicks }</i>
							</label>
						</span>
					</div>
				)
			});

			arrs = arrs.concat( item );
		}
		return (
			<div className="listbox">
				{ arrs }
			</div>
		)
	}

	render() {

		if( this.state.data ) {
			const {  title, data } = this.state.data;
			return  (
				<div className="list"> 
	                <a className="listtitle">
	                    <h3>{ title.title }</h3>
	                    <em></em>
	                </a>
	                { this.renderList(data) }
	            </div>
			)
		} else{
			return  (
				<div>
					hello 
				</div>
			)
		}

		
	}
}

export default List;