var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
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
console.log("Welcome to the Manager application of Bamazon!!!");
inquirer.prompt([{
    message: "Select an option to change the stock",
    type: "list",
    choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
    name: "options"
}, ]).then(function (answers) {
    switch (answers.options) {
        case "View Products For Sale":
            viewProduct(true);
            break;
        case "View Low Inventory":
            viewInventory(true);
            break;
        case "Add to Inventory":
            addInventory();
            break;
        case "Add New Product":
            addNewProduct();
            break;
    }
});

function viewProduct(connectionTerminate) {
    connection.query("SELECT * FROM products", function (error, products) {
        console.table(products);
        if (connectionTerminate) {
            connection.end();
        }
    });
}
function viewInventory(connectionTerminate) {
    var viewInventoryQuery = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(viewInventoryQuery, function (error, products) {
        if (error) {
            console.log(error);
            throw error;
        }
        if (products.length > 0) {
            console.table(products);
        } else {
            console.log("Inventory is Full");
        }

        if (connectionTerminate) {
            connection.end();
        }
    });

}
function addInventory() {
    // viewProduct();
    inquirer.prompt([{
        message: "Please Enter the ID for which the stock has to be added [Quit Q]",
        type: "input",
        name: "enterID"
    }]).then(function (answer) {
        if (answer.enterID.toLowerCase() === "q") {
            connection.end();
        } else {
            inquirer.prompt([{
                message: "Enter the quantity that has to be added to the stock",
                type: "input",
                name: "enterQuantity"
            }]).then(function (inventoryAdd) {
                var query = "SELECT stock_quantity FROM products WHERE item_id = " + answer.enterID;
                connection.query(query, function (error, stock_quantity) {
                    var newInventory = parseInt(stock_quantity[0].stock_quantity) + parseInt(inventoryAdd.enterQuantity)
                    updateProductsDatabase(answer.enterID, newInventory);

                });
            });
        }
    });
}

function updateProductsDatabase(productID, quantity) {
    var updateQuery = "UPDATE products SET stock_quantity = " + quantity +
        " WHERE item_id = " + productID;
    connection.query(updateQuery, function (error, results, fields) {
        if (error) {
            // console.log("Insufficient quantity!");
            // bamazonStart();
        } else {
            console.log("Successfully updated");
            console.log("----------------------------------");
            viewProduct(true);
            // connection.end();
        }

    });
}

function addNewProduct() {
    inquirer.prompt([{
            message: "Enter the product name",
            type: "input",
            name: "enterProduct"
        },

        {
            message: "Enter the department name",
            type: "input",
            name: "enterDepartment"
        },

        {
            message: "Enter the price for the product",
            type: "input",
            name: "enterPrice"
        },
        {
            message: "Enter the stock_quantity",
            type: "input",
            name: "enterStock"
        }
    ]).then(function (answer) {
        var addNewProductQuery = connection.query("INSERT INTO products SET ?", {
                product_name: answer.enterProduct,
                department_name: answer.enterDepartment,
                price: answer.enterPrice,
                stock_quantity: answer.enterStock
            },
            function (error, response) {
                if (error) {
                    console.log(error);
                    throw error;
                }

                console.table(response.affectedRows + "product has been inserted\n");
                viewProduct(true);
            }
        );
    });
}