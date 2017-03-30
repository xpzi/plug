import React from 'react';
import Swiper from 'swiper';
require('./swiper.min.css');


class Banner extends React.Component {
	
	constructor(props) {
		super(props);
		const option = {
			id: '',
			pagination: false
		}

		Object.assign(option, this.props.option );
		this.state = {option};
	}

	// 第一次render开始
	componentWillMount() {
		
	}

	

	// 第一次render结束
	componentDidMount() {
		if( !Swiper ) return;
		
		var option = this.state.option;


		if( option.pagination ){
			option['pagination'] = '.swiper-pagination';
		}
		console.log( option );

		this.state.swiper = new Swiper(  '#' + option.id , option);
	}


	renderPagination(){
      if (!this.state.option.pagination) return false;
      return React.createElement('div', { className: ['swiper-pagination'].join(' ') });

	};

	render() {
		var self = this;
		return React.createElement(
        	'div',
        	{ className: 'swiper-container', id: this.state.option.id },
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