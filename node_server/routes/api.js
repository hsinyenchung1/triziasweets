const express = require('express');
const router = express.Router();
//import mongo model
const Order = require('../models/order');

//get a list of order from db
router.get('/order', function (req, res, next) {
	Order.find({}).then(function(order){
		res.send(order);
	});
});

/*
Order.geoNear(
	{type:'Point', coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]}, 
	{maxDistance: 100000, spherical:true}
).then(function(order){
	res.send(order)
});
*/

//add a new order to db
router.post('/order', function (req, res, next) {
	console.log(req.body);
	//add current date
	const date = new Date();
	console.log(date);
	req.body['orderDate'] = date;
	Order.create(req.body).then(function(order){
		res.send(order);
	}).catch(next);
	
});

//update an order in db
router.put('/order/:id', function (req, res, next) {
	Order.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
		Order.findOne({_id: req.params.id}).then(function(order){
			res.send(order);
		})
	});
});

//delete an order in db
router.delete('/order/:id', function (req, res, next) {
	Order.findByIdAndRemove({_id: req.params.id}).then(function(order){
		res.send(order);
	});
});

module.exports= router;