import React from 'react';

export class Test1 extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			newChangeName : "Dont",
			currentTitle : this.props.currentTitle,
		};
	}

	changeNameLink(){
		this.props.chnageLink(this.state.currentTitle);
	}

	onchange(event){
		console.log(event.target.value);
		this.setState({
			currentTitle: event.target.value,
		});
	}

	componentWillReceiveProps(nextProps){
		console.log("next Props" , nextProps);
		console.log("got it");
	}
	shouldComponentUpdate(nextProps, nextState){
		console.log(nextProps, nextState);
		return true;

	}

	render(){
		return(
			<div>
				<input type="text" onChange={this.onchange.bind(this)} value={this.state.currentTitle}/>
				<button onClick={this.changeNameLink.bind(this)}>ChangeName</button>
			</div>
		);
	}
	
};