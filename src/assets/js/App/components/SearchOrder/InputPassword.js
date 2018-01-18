import React from 'react';

export class InputPassword extends React.Component{

	render(){
		return(
			<div>
				<form>
					Enter Password: <br/>
					<input type="text" onChange={this.props.onChangeInput}/> <br/>
					<input className="btn btn-primary btn-color" type="submit" onClick={this.props.onPasswordSubmit} value="Submit"/>
				</form>
			</div> 
		);
	}
}