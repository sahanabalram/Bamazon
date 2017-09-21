var connection = require("./connection");
var inquirer = require("inquirer");
require("console.table");
// create database connection
console.log("Welcome to Supervisor application of Bamazon");

inquirer.prompt([{
    message: "Select an option to either view or create a department",
    type: "list",
    choices: ["View Product Sales by Department", "Create New Department"],
    name: "departments"
}, ]).then(function (answers) {
    switch (answers.departments) {
        case "View Product Sales by Department":
            viewProductSalesByDepartment();
            break;
        case "Create New Department":
            createNewDepartment();
            break;
    }
});

function viewProductSalesByDepartment() {
    var qry = " \
        SELECT \
            dpt.department_id, \
            pdt.department_name, \
            dpt.over_head_costs, \
            pdt.product_sales, \
            (pdt.product_sales-dpt.over_head_costs) as total_profit \
        FROM \
            ( \
                SELECT \
                    department_name, \
                    sum(product_sales) as product_sales \
                FROM products \
                GROUP BY department_name) pdt \
        INNER JOIN \
            ( \
                SELECT \
                    department_id, \
                    department_name, \
                    over_head_costs \
                FROM departments) dpt \
        ON pdt.department_name = dpt.department_name";
    connection.query(qry, function (error, data) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.table(data);
        connection.end();
    });
}

function createNewDepartment() {
    inquirer.prompt([{
            message: "Enter the department name",
            type: "input",
            name: "enterDepartment"
        },
        {
            message: "Enter the Over Head Cost",
            type: "input",
            name: "enteroverHeadCost"
        },
    ]).then(function (answer) {
        var addNewProductDepartment = connection.query("INSERT INTO departments SET ?", {
                department_name: answer.enterDepartment,
                over_head_costs: answer.enteroverHeadCost
            },
            function (error, response) {
                if (error) {
                    console.log(error);
                    throw error;
                }
                console.table(response.affectedRows + " department has been inserted\n");

               departmentTable();
            }
        );
    });
}

function departmentTable() {
    connection.query("SELECT * FROM departments", function (error, data) {
        if (error) {
            console.log(error);
            throw error;
        } else {
            console.table(data);

        }
        connection.end();
    });

}