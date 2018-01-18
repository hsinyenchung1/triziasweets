import React from 'react';
import View from './View';
import {loadAllOrdersData} from './loadData';
import axios from 'axios';

export default class extends React.Component{

	constructor(){
		super()
		this.state = {
			password: "",
			sortBtnFlag : false,
      		orders: [],
      		displayOrders: []
		}

	    this.passwordSubmit = this.passwordSubmit.bind(this);
	    this.onChangeInput = this.onChangeInput.bind(this);
	    this.sortOrdersAction = this.sortOrdersAction.bind(this);
	    this.getCurrentDateOrders = this.getCurrentDateOrders.bind(this);
	    this.getWeekOrders = this.getWeekOrders.bind(this);
	}

	onChangeInput(e){
		this.setState({
			password : e.target.value, 
		});
	}

	passwordSubmit(e){
		e.preventDefault();
		const ordersPromise = loadAllOrdersData(this.state.password);
		ordersPromise.then(response => {
			this.setState({
				orders : response,
				displayOrders : response, 
				sortBtnFlag: true
			});
		});
	}

	sortOrdersAction(e){
		e.preventDefault();

		const sortOrders = this.state.orders.sort((a, b) => {
			var a = a.pickupDate.split('-');
			var b = b.pickupDate.split('-');
			return new Date(b[0], b[1] - 1, b[2]) - new Date(a[0], a[1] - 1, a[2]);
		});

		 this.setState({
	          displayOrders: sortOrders,
	     });
	}


	getCurrentDateOrders(e){
		e.preventDefault();
		const currentPickupOrders = getPickUpOrderByDays(0, this.state.orders);

		if(currentPickupOrders !== null){
			this.setState({
				displayOrders : currentPickupOrders,
			});
		}
	}

	getWeekOrders(e){
		e.preventDefault();
		const currentPickupOrders = getPickUpOrderByDays(3, this.state.orders);

		if(currentPickupOrders !== null){
			this.setState({
				displayOrders : currentPickupOrders,
			});
		}
	}

	render(){
		return(
			<div>
				<View
					orders = {this.state.displayOrders}
					sortBtnFlag = {this.state.sortBtnFlag}
					onPasswordSubmit={this.passwordSubmit.bind(this)} 
					onChangeInput={this.onChangeInput.bind(this)}
					sortOrdersAction={this.sortOrdersAction.bind(this)}
					getCurrentDateOrders={this.getCurrentDateOrders.bind(this)}
					getWeekOrders={this.getWeekOrders.bind(this)}
				/>	
			</div>
		);
	}
}


function getPickUpOrderByDays(days, orders){

	const date = new Date(); 
	const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
	let currentPickupOrders = new Array();
	orders.forEach((order)=>{
	
		const currPickupDate = order.pickupDate.split('-');
		const pickupDate = new Date (currPickupDate[0], currPickupDate[1] - 1, currPickupDate[2]);

		if(pickupDate.getTime() >= currentDate.getTime() && pickupDate.getTime() <= endDate.getTime()){
			currentPickupOrders.push(order);
		}
	});

	return currentPickupOrders;
}
