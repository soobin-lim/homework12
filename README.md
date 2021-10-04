# Link to Video
https://watch.screencastify.com/v/M0EpcbzXXxVpy3u1zzB9

# Mysql Connection
directly wrote db access information


# Queries in Server.js

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;

INSERT INTO department (id, name);

INSERT INTO role (id, title, salary, department_id)

INSERT INTO employee (id, firstname, lastname, role_id, manager_id)


# Seed data

INSERT INTO department (name)
VALUES ('department1'),
       ('department2'),
       ('department3'),
       ('department4');
       

INSERT INTO role (title, salary, department_id)
VALUES ("title1", 100, 1),
       ("title2", 200, 4),
       ("title3", 400, 2),
       ("title4", 200, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("firstname1", "lastname1", 1, 101),
       ("firstname2", "lastname2", 4, 101),
       ("firstname3", "lastname3", 4, 101),
       ("firstname4", "lastname4", 2, 102),
       ("firstname5", "lastname5", 2, 102),
       ("firstname6", "lastname6", 1, 102),
       ("firstname7", "lastname7", 3, 103),
       ("firstname8", "lastname8", 3, 103);


# Schema
DROP DATABASE IF EXISTS homework12db;
CREATE DATABASE homework12db;

USE homework12db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL,
  manager_id INT
);

