var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');

var app = express();
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://tUser:tPassword@cluster0-3m1qe.mongodb.net/test', { useNewUrlParser: true,useUnifiedTopology: true },);

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var cardRoutes = require('./routes/card.routes.js')(app);
var columnRoutes = require('./routes/column.routes.js')(app);
var boardRoutes = require('./routes/board.routes.js')(app);

var server = app.listen(3001, function () {
    console.log('Server running at http://127.0.0.1:3001/');
});
