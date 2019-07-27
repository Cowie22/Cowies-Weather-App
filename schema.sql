DROP DATABASE IF EXISTS weather;

CREATE DATABASE weather;

USE weather;

-- Very simple table, mostly implemented to demonstrate backend experience for this challenge.
-- There is definitely potential to utilize the database further, especially to make the app
-- More optimized, where once the weather is requested for a particualr city, it could be saved
-- In the database and returned from the database, instead of having to go the API every time.

CREATE TABLE city (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  latitude int NOT NULL,
  longitude int NOT NULL,
  PRIMARY KEY (id)
);




/*  Execute this file from the command line by typing:
 *    mysql -u root -p < schema.sql
 *  to create the database and the tables.*/