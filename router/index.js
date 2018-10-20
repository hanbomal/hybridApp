var path = require('path');
var express = require('express');
var router = express.Router();
var main = require('./main');

router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../www' ,'index.html'))
)

router.use('/main', main);

module.exports =router;