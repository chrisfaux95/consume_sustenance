DROP DATABASE IF EXISTS food_db;
CREATE DATABASE food_db;
USE food_db;

CREATE TABLE food
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	eaten BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
