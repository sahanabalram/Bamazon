var mysql = require("mysql");

// create database connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
   // username
    user: "root",
    // password
    password: process.env.MYSQL_PASSWORD,
    // database name
    database: "bamazon_db"
});

module.exports = connection;