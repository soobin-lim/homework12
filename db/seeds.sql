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