var mysql = require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'tiger123',
    database : 'hybridApp'
  });
db.connect();
module.exports = db;
  
  