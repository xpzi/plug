import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends React.Component {
  render() {
    return (
    	<div >hello  yjp  dsgksh </div>
    );
  }
}

if( typeof window !== 'undefined'  ){
	require( '../styles/app.scss' );
	var app = document.getElementById('app');

	ReactDOM.render(
		<HelloWorld />,
		app
	);
}

module.exports = HelloWorld;