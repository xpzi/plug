import React from 'react';
require('./home.scss');


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state =  this.props;
  }

  render () {
  	const data = this.state.initData;
    const { assets } = this.state;
    return (
        <div>
        	<div> { data.map( (item, index) => {
	              	return (
		                <div key={item.chief_id}>
		                  <h3>{ item.name}</h3>
		                  <img	src={ require('./a.jpg') } />
                      <img  src={ require('./b.jpg') } />
                      <img  src={ require('./c.jpg') } />
                      <img  src={ require('../images/a.jpg') } />
                      <img  src={ require('../images/b.jpg') } />
                      <img  src={ require('../images/c.jpg') } />
		                  <div>{ item.tags_name }</div>
		                </div>
	              	)
	          	})}
        		<div>这不科学呀 fsjjfskjfsdhf  </div>
        	</div>
        </div>
    )
  }
}

export default Home;




