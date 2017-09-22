USE bamazon_db;

 DROP TABLE products;

CREATE TABLE products(
 item_id INTEGER(2) PRIMARY KEY AUTO_INCREMENT,
 product_name VARCHAR(50),
 department_name VARCHAR(50),
 price DECIMAL(10,2),
 stock_quantity INTEGER(2),
 product_sales DECIMAL(10,2) DEFAULT 0
 );
 INSERT INTO products (product_name,department_name,price,stock_quantity)
 VALUES("iPhone","Electronics",1000,50),("NoteBook","Stationery",10,150),
 ("Samsung Galaxy 5","Electronics",899.99,200),("Hungry Hippo","Board Games",10,150),
 ("Dolphin Puzzle","Board Games",5.50,120),("MacBook Pro","Electronics",1200,140),
 ("Frying Pan","Kitchen Items",10.30,110),("Tea-Spoons","Kitchen Items",3.45,50),
 ("Salt","Groceries",1.25,150),("Sony Tv","Electronics",30.99,180);
 
 SELECT * FROM products;
 
 SELECT stock_quantity FROM products WHERE item_id = 10;
 
 UPDATE products
 SET stock_quantity = 200, product_sales = 20
 WHERE item_id = 1;
 
 UPDATE products 
 SET stock_quantity = 100
 WHERE item_id=1;
 
SELECT stock_quantity ,COUNT(*)
FROM products
GROUP BY stock_quantity
HAVING COUNT(*) < 5;

CREATE TABLE departments(
department_id INTEGER(10) PRIMARY KEY AUTO_INCREMENT,
department_name VARCHAR(100),
over_head_costs INTEGER(10)
);


SELECT department_name , SUM(product_sales)
FROM products
GROUP BY department_name;

SELECT dpt.department_id,pdt.department_name,dpt.over_head_costs,pdt.product_sales, (pdt.product_sales-dpt.over_head_costs) as total_profit
FROM
(SELECT  department_name , sum(product_sales) as product_sales
FROM products
GROUP BY department_name) pdt
INNER JOIN 
(SELECT department_id,department_name, over_head_costs
FROM departments) dpt ON pdt.department_name = dpt.department_name;

INSERT INTO departments(department_name,over_head_costs)
VALUES("Electronics",2000),("Board Game",9000),("Stationery",50000),("Kitchen Items",8000),("Groceries",7000);

SELECT * FROM  departments;

