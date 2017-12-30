import React from 'react';
import {Test1} from './test1';
import {connect} from 'react-redux';
import {setName} from "../../actions/userAction";

class Test extends React.Component{

	constructor(props){
    	super();
		this.state = {
			age: props.initialAge,
			homeLink : 'home',
		};
		this.makeOlder = this.makeOlder.bind(this);
	}
	makeOlder(){
		this.setState({
			age : this.state.age + 3,
		});
	}

	makeClick(){
		alert("hello");
	}

	onChangeLinkName(newTitle){
		this.setState({
			homeLink: newTitle,
		});
	}

	render(){
		return(
			<div>
				{/*<h1>I'm {this.state.homeLink}</h1>
				<div>{this.state.age}</div>
				<button onClick={this.makeOlder.bind(this)}>add age</button>
				<Test1 
					alert={this.makeClick}
					chnageLink={this.onChangeLinkName.bind(this)} 
					currentTitle={this.state.homeLink}
				/>*/}
				<h1>{this.props.user.name}</h1>
				<button onClick={() => this.props.setName("Kick Max")}>Click Setname</button>

			</div>
		);
	}
}

const mapStateToProps = (state) =>{
  return {
    user: state.user,
    math: state.math
  };
};

const mapDispatchToProps = (dispatch) =>{
  return {
    setName: (name) => {
      dispatch(setName(name));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Test);

