DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
 id INTEGER(11) AUTO_INCREMENT NOT NULL,
 product_name VARCHAR(30) NOT NULL,
 department VARCHAR(30) NOT NULL,
 price INTEGER(10),
 stock_quantity INTEGER(10),
 primary key(id)
);

USE bamazon_db;

INSERT INTO products(product_name, deparment, price, stock_quantity)
VALUES ("Osprey Aether 70", "Backpacks", 100, 25);


INSERT INTO products(product_name, deparment, price, stock_quantity)
VALUES ("Gregory Z55", "Backpacks", 75, 20);


INSERT INTO products(product_name, deparment, price, stock_quantity)
VALUES ("OBOZ Firebrand sz9", "Boots", 125, 10);

INSERT INTO products(product_name, deparment, price, stock_quantity)
VALUES ("Asolo Fugative sz9", "Boots", 120, 10);

INSERT INTO products(product_name, deparment, price, stock_quantity)
VALUES ("ENO Hammock Blue", "Camp", 60, 40);

INSERT INTO products(product_name, deparment, price, stock_quantity)
VALUES ("Mountain Hardware Drifter 3", "Tent", 200, 15);

INSERT INTO products(product_name, deparment, price, stock_quantity)
VALUES ("MSR Hubba Hubba", "Tent", 180, 30);

INSERT INTO products(product_name, deparment, price, stock_quantity)
VALUES ("Outdoor Research Fury Black Lg", "Jacket", 100, 50);

INSERT INTO products(product_name, deparment, price, stock_quantity)
VALUES ("Marmot Gravity Jkt Charcoal Lg", "Jacket", 135, 60);

INSERT INTO products(product_name, deparment, price, stock_quantity)
VALUES ("poop scoop", "Camp", 20, 300);

SELECT * FROM products;