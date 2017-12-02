const express = require('express');
const router = express.Router();
const Order = require('../models/order');

//get a list of order from db
router.get('/order', function (req, res) {
	res.send({type: 'GET'});
});


//add a new order to db
router.post('/order', function (req, res) {
	Order.create(req.body).then(function(order){
		console.log(order);
		res.send(order);
	});
	
});

//update an order in db
router.put('/order/:id', function (req, res) {
	res.send({type: 'PUT'});
});

//delete an order in db
router.delete('/order/:id', function (req, res) {
	res.send({type: 'DELETE'});
});

module.exports= router;