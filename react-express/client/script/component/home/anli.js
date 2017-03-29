import React from 'react';
import Banner from '../public/banner';
var imgUrl = 'http://bjcache.leju.com/gongzhang/';


class Nav extends React.Component {
	
	constructor(props) {
		super(props);

		
		this.state = { 
			data: this.props.data || null
		};
	}

	// 第一次render开始
	componentWillMount() {
		
	}

	// 第一次render结束
	componentDidMount() {

	}

	rendergzal(Case){
        var items = Case.map((item, index) => {
            return (
                <div key={index} className="gzanli-item">
                    <a href="#"  >
                        <img src={ 'http://bjcache.leju.com/gongzhang/' + item.case.case_thumb } alt=""/>
                        <label><span>{ '清工辅料:' }</span><span className="lanse">{ '1.00万' }</span></label>
                        <div className="gzinfo">
                            <div>
                                <span><img src={ imgUrl + item.avatar} alt=""/></span>
                                <span><h3>{ item.case.name }</h3>
                                <p>施工工长：{  item.chief_name}</p></span>
                            </div>
                        </div>
                    </a>
                </div>
            )
        });

        return (
            <Banner id="gzal" pagination={ true }>
                { items }
            </Banner>
        )
    }
	
	renderzssj(data){
        var items = data.map((item, index) => {
            return (
                <div key={index} className="gzanli-item">
                    <a href="#"  >
                        <img src={ item.case_pic } alt=""/>
                        <div className="gzinfo">
                            <div>
                                <span><h3>{ item.name }</h3></span>
                            </div>
                        </div>
                    </a>
                </div>
            )
        });

        return (
            <Banner id="zssj" pagination={ true }>
                { items }
            </Banner>
        )
    }



    renderlgtj(data){
		var items = [];
		for( var key in data ){
			const itm = data[key].map( (item, index) => {
				return (
					<a key={index} href="#" className="tj-item">
						<img src={ item.pic } alt=""/>
						<div><span>{ item.title }</span></div>
					</a>
				)
			});

			items.push(
				<div key={ key } className="lgtj-item" >
					<div className="tj-itembox" >{ itm }</div>
					<div className="tj-more">{ '更多风格' }</div>
				</div>
			)
		}

        return (
            <Banner id="lgtj" pagination={ false } >
                { items }
            </Banner>
        )
    }



	render() {

		if( this.state.data ) {

			const { moduoID , title, data } = this.state.data;
            const renderkey = 'render'+ moduoID;
			return  (
				<div className="anli"> 
					{  moduoID == 'lgtj' ? (
						<div className="anlititle">
		                    <h3>{ title.title }</h3>
		                    <div>
		                    	<span><i className="action">户型</i></span>
		                    	<span><i>空间</i></span>
		                    	<span><i>风格</i></span>
		                    </div>
		                </div>
					) : (
						<a className="anlititle">
		                    <h3>{ title.title }</h3>
		                    <em></em>
		                </a>
					)}
	                
	                { this[renderkey](data) }
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

export default Nav;