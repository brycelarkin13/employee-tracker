const inquirer = require('inquirer');
const inputCheck = require('./utils/inputCheck');

//Connect to database
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: process.env.DB_USER,
      // Your MySQL password
      password: process.env.DB_PW,
      database: process.env.DB_NAME
    }
);


function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Welcome to Employee Database, what would you like to do?',
        choices: ['view departments', 'view role', 'view employees', 'add a department', 'add a role', 'add an employee', 'update employee role']
      }
      ])
      .then(answer => {
        if(answer.choice === 'view departments') {
          viewDepartments();
        }
        else if (answer.choice === 'view role') {
          viewRole();
        }
        else if (answer.choice === 'view employees') {
          viewEmployees();
        }
        else if (answer.choice === 'add a department') {
          addDepartment();
        }
        else if (answer.choice === 'add a role') {
          addRole();
        }
        else if (answer.choice === 'add an employee') {
          addEmployee();
        }
        else if (answer.choice === 'update employee role') {
          updateRole();
        }
      })
};

function viewDepartments() {
      const sql = `SELECT * FROM department`;
       db.query(sql, (err, rows) => {
      if (err)
      throw err;
    console.table(rows);
    mainMenu();
  });
};

function viewRole() {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, rows) => {
    if (err) throw err
    console.table(rows);
    mainMenu();
  })
};

function viewEmployees() {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) throw err
    console.table(rows);
    mainMenu();
  })
};

addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'depart_name',
      message: 'What is the name of the department?'
    }
  ]).then(function(answer) {
    const sql = `INSERT INTO department (depart_name) VALUES (?)`;
    db.query(sql, answer.depart_name, function(err, res) {
      console.log(`You have added: ${(answer.depart_name)}`)
    })
    mainMenu();
  })
  };


mainMenu();