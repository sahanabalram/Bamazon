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
    password: "MYSQL_PASSWORD",
    // database name
    database: "bamazon_db"
});
inquirer.prompt([{
        message: "Select an option to change the stock",
        type: "list",
        choices:["View Products For Sale","View Low Inventory","Add to Inventory","Add New Product"],
        name: "options"
    },
]).then(function (answers) {
    switch(answers.options){
        case "View Products For Sale":
        viewProduct();
        break;
        case "View Low Inventory":
        viewInventory();
        break;
        case "Add to Inventory":
        addInventory();
        break;
    }
});

function viewProduct() {
    connection.query("SELECT * FROM products",function(error,products){
        console.table(products);
    });
}

function viewInventory() {
    var viewInventoryQuery ="SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(viewInventoryQuery,function(error,products){
        if(error) throw error;
        console.table(products);
    });
}

function addInventory(){
    var addInventoryQuery = "SELECT * FROM products";
    inquirer.prompt([
        {
            message: "Please enter the ID of a product that you would like to add more stock to [Quit Q]",
            type: "input",
            name: "enterID"
        }
]) .then(function(answers){
    if(answers.enterID.toLowerCase() === "q"){
        connection.end();
    } else {
        inquirer.prompt([
        {
            message: "Enter the quantity that has to be added to the stock",
            type:"input",
            name: "enterQuantity"
        }
    ]) .then(function(inventoryAdd){
        if(inventoryAdd.enterQuantity){

        }
    })
    }
})
}