var connection = require("./connection");
var inquirer = require("inquirer");
require("console.table");
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
        console.table(products);
        bamazonStart();
    });
}

function bamazonStart() {
    inquirer.prompt([{
        message: "Please enter the ID of the product that you would you like to buy [Quit Q] ?",
        type: "input",
        name: "productID"
    }]).then(function (answers) {
        if (answers.productID.toLowerCase() === "q") {
            console.log("Good Bye");
            connection.end();
        } else {
            inquirer.prompt([{
                message: "How many would you like to buy?",
                type: "input",
                name: "quantity"
            }]).then(function (answer1) {
                checkStockQuantity(answers.productID, answer1.quantity);
            });
        }
    });
}

function checkStockQuantity(productID, quantity) {
    var query = "SELECT stock_quantity,price,product_sales FROM products WHERE item_id = " + productID;
    connection.query(query, function (error, data) {
        if (error) throw error;
        if (data[0].stock_quantity >= quantity) {
            var productSales = data[0].product_sales + (quantity * data[0].price);
            updateProductsDatabase(productID, data[0].stock_quantity - quantity, productSales);
        } else {
            console.log("Insufficient quantity!");
            // connection.end();
            bamazonStart();
        }
    });
}

function updateProductsDatabase(productID, quantity, productSales) {
    var updateQuery = "UPDATE products SET stock_quantity = " + quantity +
        ", product_sales = " + productSales + " WHERE item_id = " + productID;
    connection.query(updateQuery, function (error, results, fields) {
        if (error) {
            // console.log("Insufficient quantity!");
            // bamazonStart();
        } else {
            console.log("Successfully placed your order");
            console.log("----------------------------------");
            allProducts();
            // connection.end();
        }
    });
}