var mysql = require("mysql");
var inquirer = require("inquirer");

// create connection information

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // username
    user: "root",
    // password
    password: process.env.MSSQL_PASSWORD,
    database: "bamazon_db"
});

// connect to mysql server

connection.connect(function (error) {
    if (error) throw error;
    console.log(error);
    // run the allProducts function to display all the products that are on sale
    allProducts();
    // run the bamazonStart function after the connection is made to prompt the user
    // bamazonStart();
});

function allProducts() {
    connection.query("SELECT * FROM products", function (error, products) {
        for (var i = 0; i < products.length; i++) {
            console.log(products[i].item_id + " | " + products[i].product_name + " | " + products[i].department_name + " | " + products[i].price);
        }
    })
}
/*function bamazonStart() {
    inquirer.prompt(
        {
            message:"Which product(ID) would you like to buy ?",
            type: "input",
            name: "productID"
    }
)
} */