var express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3001;
const cTable = require('console.table');
// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'homework12db'
  },
  console.log(`Connected to the books_db database.`)
);

var inquirer = require('inquirer');
const my_choices = [
  'View all departments',
  'View all roles',
  'View all employees',
  'add a department',
  'add a role',
  'add a employee'];


callinquirer();

async function callinquirer() {
  inquirer
    .prompt([{
      type: 'list',
      message: 'Please select a view',
      name: 'view',
      choices: my_choices,
    }
    ])
    .then((answers) => {
      if (answers.view == 'View all departments') {//---------------------------------------------------------department
        view_department();
      } else if (answers.view == 'View all roles') {
        view_role();
      } else if (answers.view == 'View all employees') {
        view_employee();
      } else if (answers.view == 'add a department') {
        // ask name again
        let name;
        inquirer.prompt([{ type: 'input', name: 'department_name', message: "please input department_name?" }])
          .then((answer) => {
            name = answer.department_name;
            db.query(`INSERT INTO department VALUES (DEFAULT, '${name}');`, function (err, data) { if (err) { console.log(err) } else { return console.table(data) } });
            view_department();
          })
          .catch((err) => { if (err.isTtyError) { console.log(err) } else { console.log(err) } });

      } else if (answers.view == 'add a role') {//---------------------------------------------------------role
        let title;
        let salary;
        let department_id;
        let department_rows;
        let departmentArray = [];

        db.query('SELECT COUNT(*) as row_count FROM department', function (err, data) {
          if (err) {
            console.log(err);
          } else {
            // console.log(data);
            // console.log('data.row_count: ',data[0].row_count);
            department_rows = data[0].row_count;
            for (var i = 1; i <= department_rows; i++) {
              departmentArray.push(i);
            }
            // console.log(department_rows);
            // console.log(departmentArray);
          }
        });

        inquirer.prompt([
          { type: 'input', name: 'role_title', message: "please input role_title?" },
          { type: 'input', name: 'role_salary', message: "please input role_salary?" },
          { type: 'list', name: 'role_department_id', message: "please input role_department_id?", choices: departmentArray }])
          .then((answer) => {
            title = answer.role_title;
            salary = answer.role_salary;
            department_id = answer.role_department_id;
            db.query(`INSERT INTO role VALUES (DEFAULT, '${title}', ${salary}, ${department_id});`);
            view_role();
          })
          .catch((err) => { if (err.isTtyError) { } else { console.log() } });
      } else if (answers.view == 'add a employee') {  //---------------------------------------------------------employee
        let first_name;
        let last_name;
        let role_id;
        let manager_id;
        let role_rows;
        let roleidArray;

        db.query('SELECT COUNT(*) as row_count FROM role', function (err, data) {
          if (err) {
            console.log(err);
          } else {
            role_rows = data[0].row_count;
            for (var i = 1; i <= role_rows; i++) {
              roleidArray.push(i);
            }
          }
        });

        inquirer.prompt([
          { type: 'input', name: 'first_name', message: "please input employee's first name?" },
          { type: 'input', name: 'last_name', message: "please input employee's last name?" },
          { type: 'list', name: 'role_id', message: "please input role id?" , choices = roleidArray},
          { type: 'input', name: 'manager_id', message: "please input manager id?" }
        ])
          .then((answer) => { 
            first_name = answer.first_name;
            last_name = answer.last_name;
            role_id = answer.role_id;
            manager_id = answer.manager_id;
          })
          .catch((err) => { if (err.isTtyError) { } else { console.log() } });
        db.query(`INSERT INTO employee VALUES (DEFAULT, '${first_name}', '${last_name}', '${role_id}', '${manager_id}');`);
        view_employee();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
        console.log()
      }
    });

}


function view_role(){
  db.query('SELECT * FROM role;', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      return console.table(data);
    }
  });
}

function view_employee(){
  db.query('SELECT * FROM employee;', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      return console.table(data);
    }
  });
}

function view_department(){
  db.query('SELECT * FROM department;', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      return console.table(data);
    }
  });
}