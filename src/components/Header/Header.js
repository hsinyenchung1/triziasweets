import React from 'react';
import  {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom';
import classNames from 'classnames';

export class Header extends React.Component{
	  	
	  	constructor(props){
	  		super(props);
	  		this.state = {
	  			click : false
	  		};
	  		this.clickHandler = this.clickHandler.bind(this);
	  	}

		clickHandler(event){

	  		this.setState({
	  			click : !this.state.click
	  		});
	  		console.log(this.state.click);
	  	}


	  render() {

	
	  	 	var display = classNames({ 
	  	 		'nav-mv' : true,
	  	 		'display-block' : this.state.click,
	  	 		'display-none' : !this.state.click
			});

			var hamburgerClassName = classNames({
				'float-right' : true, 
				'mrg-48' : true, 
				'hamburger-icon': true
			});

			var backgroundClassName = classNames({
				'container-mv-nav' : true,
				'hide-mv-view' : true, 
				'fill-color-white' : !this.state.click
				});

	    return (
	          


	         <header>
				   <div className="container-nav hide-dt-view">
				     <div alt="logo" className="logo logo-icon"></div>

				     <nav>
				       <ul>
				          <li><NavLink to='/home'>HOME</NavLink></li>
				          <li><NavLink to='/order'>CAKE</NavLink></li>
				          <li><NavLink to='/order'>ORDER</NavLink></li>
				          <li><NavLink to='/track'>TRACK</NavLink></li>
				       </ul>
				     </nav>
				  </div>

				  <div className={backgroundClassName}>
				  	<div>
					  	<div alt="logo" className="logo logo-icon mrg-16"></div>
					  	<div onClick={this.clickHandler.bind(this)} alt="hamburger" className={hamburgerClassName}></div>
					</div>
				  	<div className="">
					     <nav className={display}>
					       <ul>
					          <li><NavLink to='/home'>HOME</NavLink></li>
					          <li><NavLink to='/order'>CAKE</NavLink></li>
					          <li><NavLink to='/order'>ORDER</NavLink></li>
					          <li><NavLink to='/track'>TRACK</NavLink></li>
					       </ul>
					     </nav>
				     </div>
				     
				  </div>
			</header>

	    );
	}
}