USE bamazon_db;

 DROP TABLE products;

CREATE TABLE products(
 item_id INTEGER(2) PRIMARY KEY,
 product_name VARCHAR(50),
 department_name VARCHAR(50),
 price DECIMAL(10,2),
 stock_quantity INTEGER(2)
 );
 INSERT INTO products (item_id,product_name,department_name,price,stock_quantity)
 VALUES(1,"iPhone","Electronics",1000,50),(2,"NoteBook","Stationery",10,150),
 (3,"Samsung Galaxy 5","Electronics",899.99,200),(4,"Hungry Hippo","Board Games",10,150),
 (5," Dolphin Puzzle","Board Games",5.50,120),(6,"MacBook Pro","Electronics",1200,140),
 (7,"Frying Pan","Kitchen Items",10.30,110),(8,"Tea-Spoons","Kitchen Items",3.45,50),
 (9,"Salt","Groceries",1.25,150),(10,"Sony Tv","Electronics",30.99,180);
 
 SELECT * FROM products;
 
 SELECT stock_quantity FROM products WHERE item_id = 10;
 
 UPDATE products
 SET stock_quantity = 20
 WHERE item_id = 1;
 
 UPDATE products 
 SET stock_quantity = 100
 WHERE item_id=3;