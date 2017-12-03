const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 4000);

//set up express app
const app = express();
const dev = app.get('env') != 'production';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

if(!dev){
	app.disable('x-powered-by');
	app.use(compression());
	app.use(morgan('common'));

	app.use(express.static(path.resolve(__dirname, 'build')));

	app.get('*', (req, res) =>{
		res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
	});
}

if(dev){
	app.use(morgan('dev'));
}

//connect to mongodb
var uri = 'mongodb://triziasweets:triziasweets@ds023603.mlab.com:23603/triziasweets';
mongoose.Promise = global.Promise
mongoose.connect(uri, {useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));
app.use(function(err,req, res, next){
	res.status(422).send({'error': err.message});
});

//list for requests
app.listen(process.env.port || 4000, function(){
	console.log('now listening for requests');
});