import React from 'react';
require('./video.scss');


class Video extends React.Component {

	constructor(props) {
		super(props);
		this.state = this.props;
	}

	render(){
		return (
			<div className="video">
					<iframe  src="http://player.youku.com/embed/XMjY0MjMzMDk0MA==" frameborder="0" allowfullscreen="true"></iframe>	
			</div>	
		);
	}

}

export default Video;