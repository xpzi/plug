'use strict';
import React from 'react';

if( typeof window  !== 'undefined' ){
	require( './header.scss' );
}

class Header extends React.Component {
	
	
	render(){
		return (
			<div className="header">
				<span className="back"> 返回 </span>
				<span>用户评价</span>
				<span></span>
			</div>
		)
	}
};


export default Header;