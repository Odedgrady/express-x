 
const mysql = require('mysql2');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'ejsbruger'
});

connection.connect();

global.db = connection;

