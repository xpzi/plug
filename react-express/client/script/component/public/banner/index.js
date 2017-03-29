import React from 'react';
import Swiper from 'swiper';
require('./swiper.min.css');


class Banner extends React.Component {
	
	constructor(props) {
		super(props);
		
		// this.state =   this.props || ;
		this.state = {
			id : this.props.id ,
			pagination: this.props.pagination || false
		}


	}

	// 第一次render开始
	componentWillMount() {
		
	}

	

	// 第一次render结束
	componentDidMount() {
		if( !Swiper ) return;

		var swiperOption = {};
		swiperOption['autoplay'] = 5000;
		swiperOption['loop'] = true;
		if( this.state.pagination ){
			swiperOption['pagination'] = '.swiper-pagination';
		}
		console.log( swiperOption );

		this.state.swiper = new Swiper(  '#' + this.state.id , swiperOption);
	}


	renderPagination(){
      if (!this.state.pagination) return false;
      return React.createElement('div', { className: ['swiper-pagination'].join(' ') });

	};

	render() {
		var self = this;
		return React.createElement(
        	'div',
        	{ className: 'swiper-container', id: this.state.id },
    		React.createElement(
          		'div',
          		{ className: 'swiper-wrapper' },
          		React.Children.map(self.props.children, function (e) {
            		return React.cloneElement(e, { className: ['swiper-slide', e.props.className].join(' ') });
          		})
        	),
        	self.renderPagination()

    	);
		
	}
}

export default Banner;