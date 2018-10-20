var express= require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./router/index');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var socket=require('./socketManager/socket');

app.use(express.static(path.join(__dirname, 'www')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(index);

app.set('views', './www/views');               
app.set('view engine', 'ejs');

socket(io);


server.listen(8080);