

function  ActionLink(){
	
	function handleClick( e ) {
		e.preventDefault();
		console.log( 'The link was ckicked' );
	}

	return (
		<a href="#" oncClick={handleClick} >  Click  me</a>

	)

}



export default ActionLink;
