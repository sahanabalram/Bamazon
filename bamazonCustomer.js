var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
// create connection information

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // username
    user: "root",
    // password
    password: "pappy123",
    // database name
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
    /* // end the MySQL connection
    connection.end(); */

});

function allProducts() {
    connection.query("SELECT * FROM products", function (error, products) {
        for (var i = 0; i < products.length; i++) {
            console.log(products[i].item_id + " | " + products[i].product_name + " | " + products[i].department_name + " | " + products[i].price + " | " + products[i].stock_quantity);
        }
        bamazonStart();
    });


}

function bamazonStart() {
    inquirer.prompt([{
            message: "Please enter the ID of the product that you would you like to buy ?",
            type: "input",
            name: "productID"
        },
        {
            message: "How many would you like to buy?",
            type: "input",
            name: "quantity"
        }

    ]).then(function (answers) {
        console.log("Product ID:" + answers.productID, "Quantity:" + answers.quantity);
        checkStockQuantity(answers.productID, answers.quantity);
    });
}

function checkStockQuantity(productID, quantity) {
    var query = "SELECT stock_quantity FROM products WHERE item_id = " + productID;
    connection.query(query, function (error, stock_quantity) {
        if (error) throw error;
        console.log(stock_quantity);
        if (stock_quantity[0].stock_quantity >= quantity) {
            updateProductsDatabase(productID, stock_quantity[0].stock_quantity - quantity);
        } else {
            console.log("Insufficient quantity!");
            //connection.end();
            bamazonStart();
        }
    });
}

function updateProductsDatabase(productID, quantity) {
    var updateQuery = "UPDATE products SET stock_quantity = " + quantity +
        " WHERE item_id = " + productID;
    connection.query(updateQuery, function (error, results, fields) {
        if (error) {
            console.log("Insufficient quantity!");
        } else {
            console.log("Successfully placed your order");
            allProducts();
        }
        connection.end();
    });
}