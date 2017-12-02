const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://triziasweets:Mojo1991!@ds023603.mlab.com:23603/triziasweets');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

//list for requests
app.listen(process.env.port || 4000, function(){
	console.log('now listening for requests');
});