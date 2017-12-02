const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create oder Schema & model

const OrderSchema = new Schema({

	name:{
		type: String,
		required: [true, 'Name field is required']
	}, 
	email:{
		type: String,
		required: [true, 'Email field is required']
	}, 
	available:{
		type: Boolean, 
		default: false
	}

	// add in geo location

});

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;