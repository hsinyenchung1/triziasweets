const express = require('express');
const router = express.Router();
const axios = require('axios');
var nodemailer = require('nodemailer');
//import mongo model
const Order = require('../models/order');

// set url for prod or dev
var current_url = '';
if(express().get('env') === 'production'){
    current_url = 'http://triziasweets.com';
}else{
    current_url = 'http://localhost:5000';
}

//get a list of order from db
router.get('/order', function (req, res, next) {
	console.log('+++++++++++++++++++++++++Get All Orders++++++++++++++++++++++++++++++');
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
router.post('/order', function(req, res, next) {
	console.log('+++++++++++++++++++++++++POST An Order++++++++++++++++++++++++++++++');
    console.log(req.body);
    //add current date
    const date = new Date();
    console.log(date);
    req.body['orderDate'] = date;
    Order.create(req.body).then(function(order) {
    	req.body['emailType'] = 'mailCustomer';

    	axios.post(current_url+'/api/sendEmail', req.body)
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
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


router.post('/sendEmail', handleEmail); // handle the route at yourdomain.com/sayHello

function handleEmail(req, res) {

    console.log('+++++++++++++++++++++++++POST sendEmail++++++++++++++++++++++++++++++');
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

    console.log(req.body);
    switch(req.body.emailType){
    	case 'mailCustomer':
    		var text = 'Hi, ' + req.body.name +  
    					'\n\n\nYour order is placed' +
    					 '\n\n\n' + '====Order Details=====' +
    					 '\n\n\n' + 'Name: ' + req.body.name + 
    					 '\n\n\n' + 'Contact number: ' + req.body.contactNumber + 
    					 '\n\n\n' + 'Email address: ' + req.body.emailAddress + 
    					 '\n\n\n' + 'WeChat ID:  ' + req.body.weChatID + 
    					 '\n\n\n' + 'Message: ' + req.body.message +
    					 '\n\n\n' + 'Order date: ' + req.body.orderDate +
    					 '\n\n\n' + 'Pickup date: ' + req.body.pickupDate + 
    					 '\n\n\n' + 'Pickup time: ' + req.body.pickupTime +
    					 '\n\n\n\nThanks,\nTriziasweets';
    			var mailOptions = {
			    from: 'triziasweets@gmail.com', // sender address
			    to: [req.body.emailAddress, 'triziasweets@gmail.com', 'trizia900203@gmail.com'], // list of receivers
			    subject: 'Triziasweets: Thank you for ordering', // Subject line
			    text: text //, // plaintext body
			    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
			};
    	break;
    	case 'mailTrizasweets':
    		var text = 'Your order number is' + req.body.name + '\n\n\n\nTriziasweets';
    		var mailOptions = {
			    from: 'triziasweets@gmail.com', // sender address
			    to: req.body.emailAddress, // list of receivers
			    subject: 'Triziasweets: Thank you for ordering', // Subject line
			    text: text //, // plaintext body
			    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
			};
    	break;
    	default:
    		 var mailOptions = {
			    from: 'triziasweets@gmail.com', // sender address
			    to: 'steven332211@yopmail.com', // list of receivers
			    subject: 'Triziasweets order#', // Subject line
			    text: text //, // plaintext body
			    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
			};
    }
   
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