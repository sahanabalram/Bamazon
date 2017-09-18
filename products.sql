-- CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
item_id INTEGER(10),
product_name VARCHAR(50),
department_name VARCHAR(50),
price INTEGER(10),
stock_quantity INTEGER(10)
);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES(4578, " Echo Laundrey Detergent","Home Cleaning", 20.00, 50);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES(4568, "Dove Deodrant","Personal Care", 10.00, 60);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES(3988, " Bic Ball Point Pens","Stationery", 2.00, 100);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES(1256, " White Board Marker","Stationery", 1.00, 150);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES(6098, " Organic Banana","Fruits", .50, 20);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES(7654, " Organic Strawberry","Fruits", 3.00, 10);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES(1250, " Organic Cucumber","Vegetables", 2.00, 5);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES(4891, "Box Of Pencils","Stationery", 1.50, 50);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES(9080, "Printed T-shirt","Clothing", 20, 50);

INSERT INTO products(item_id,product_name,department_name,price,stock_quantity)
VALUES(7058, "Sarong","Clothing", 18, 50);

SELECT * FROM products;