var util = require('util');
var mysql = require('mysql');

var pool = mysql.createPool({
    conectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    port: process.env.MYSQL_PORT
})

pool.query = util.promisify(pool.query);
module.exports = pool;