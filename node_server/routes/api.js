const express = require('express');
const router = express.Router();
//import mongo model
const Order = require('../models/order');

//get a list of order from db
router.get('/order', function (req, res, next) {
	console.log('order information');
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



var nodemailer = require('nodemailer');

router.post('/sayHello', handleSayHello); // handle the route at yourdomain.com/sayHello

function handleSayHello(req, res) {
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'triziasweets@gmail.com', // Your email id
            pass: 'Mojo1991!' // Your password
        },
        secure: true, // use SSL
        pool: true,
    	host: 'smtp.gmail.com'
    });

    var text = 'Hello world from \n\n' + req.body.name;

    var mailOptions = {
	    from: 'triziasweets@gmail.com', // sender address
	    to: 'steven332211@yopmail.com', // list of receivers
	    subject: 'Triziasweets order#', // Subject line
	    text: text //, // plaintext body
	    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	        res.json({yo: 'error'});
	    }else{
	        console.log('Message sent: ' + info.response);
	        res.json({yo: info.response});
	    };
	});
}
module.exports= router;