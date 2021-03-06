const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

// const normalizePort = port => parseInt(port, 10);
// const PORT = normalizePort(process.env.PORT || 5000);

// set up express app
const app = express();
const dev = app.get('env') != 'production';
const PORT = 5000;

if (app.get('env') === 'production') {
  console.log('============ production env ============');
  var mongodb_url = 'mongodb://triziasweets:triziasweets@ds129796.mlab.com:29796/productiondb';
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('common'));

  app.use(express.static(path.resolve(__dirname, 'build')));
  app.get('', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}
if (app.get('env') === 'development') {
  console.log('============ development env ============');
  var mongodb_url = 'mongodb://triziasweets:triziasweets@ds023603.mlab.com:23603/triziasweets';
  // var mongodb_url = 'mongodb://triziasweets:triziasweets@ds129796.mlab.com:29796/productiondb';
  app.use(morgan('dev'));
}
// connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(mongodb_url, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api', require('./routes/api'));

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

// list for requests
app.listen(PORT, () => {
  console.log(`now listening for requests at ${PORT}`);
});
