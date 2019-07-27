DROP DATABASE IF EXISTS weather;

CREATE DATABASE weather;

USE weather;

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