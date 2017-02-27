'use strict';
import React from 'react';

if( typeof window  !== 'undefined' ){
	require( './header.scss' );
}

class Header extends React.Component {
	
	
	render(){
		return (
			<div className="tabel">
				<div className="active">全部(88)</div>
				<div>嗮图(12)</div>
				<div>低分(1)</div>
			</div>
		)
	}
};


export default Header;