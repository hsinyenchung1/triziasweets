const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');    
//set up express app
const app = express();

//connect to mongodb

var uri = 'mongodb://triziasweets:triziasweets@ds023603.mlab.com:23603/triziasweets';

mongoose.Promise = global.Promise

mongoose.connect(uri, {useMongoClient: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

//list for requests
app.listen(process.env.port || 4000, function(){
	console.log('now listening for requests');
});