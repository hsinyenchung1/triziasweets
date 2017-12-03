const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create geolocation schema
const GeoSchema = new Schema({
	type: {
		type :String, 
		default:"Point"
	},
	coordinates:{
		type: [Number],
		index: "2dsphere"
	}
});
// create oder Schema & model
const OrderSchema = new Schema({

	name:{
		type: String,
		required: [true, 'Name field is required']
	},
	contactNumber:{
		type: String,
		required: [true, 'Contact number field is required']
	},
	emailAddress:{
		type: String,
		required: [true, 'Email address field is required']
	},
	weChatID:{
		type: String
	},
	message:{
		type: String,
		required: [true, 'Message field is required']
	},
	orderDate:{
		type: Date,
		required: [true, 'orderDate field is required']
	}, 
	pickupDate:{
		type: String,
		required: [true, 'pickupDate field is required']
	}, 
	pickupTime:{
		type: String,
		required: [true, 'pickupTime field is required']
	}, 
	comfirm:{
		type: Boolean, 
		default: false
	}

	// add in geo location

});

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;