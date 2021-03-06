const inquirer = require('inquirer');
const inputCheck = require('./utils/inputCheck');

//Connect to database
const mysql = require('mysql2');
// .env for credential storage
require('dotenv').config();

// databe connection
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

// app interface user sees once logged in
mainMenu = () => {
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

// view all departments
viewDepartments = () => {
      const sql = `SELECT * FROM department`;
       db.query(sql, (err, rows) => {
      if (err)
      throw err;
    console.table(rows);
    mainMenu();
  });
};

// view all roles
viewRole = () => {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, rows) => {
    if (err) throw err
    console.table(rows);
    mainMenu();
  })
};

// view all employees
viewEmployees = () => {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) throw err
    console.table(rows);
    mainMenu();
  })
};

// add new department function
addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'depart_name',
      message: 'What is the name of the department? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Enter the Department name!');
          return false;
        }
      }
    },
  ]).then((answer) => {
    const sql = `INSERT INTO department (depart_name) VALUES (?)`;
    db.query(sql, answer.depart_name, (err, res) => {
      if (err) throw err;
      console.log(`You have added a new department: ${(answer.depart_name)}`);
    })
    mainMenu();
  })
};

// add new role function
addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the Role?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role?',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'What is the department ID number?'
    }
  ]).then((answer) => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    db.query(sql, [answer.title, answer.salary, answer.department_id], (err, res) => {
      if (err) throw err;
      console.log(`You have added a new role: ${(answer.title)}`);
    })
    mainMenu();
  })
};

// add new employee function
addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the employee first name?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the employee last name?'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'What is the employees role ID number?'
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'What is the manager ID number?'
    }
  ]).then((answer) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    db.query(sql, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
      if (err) throw err;
      console.log(`${(answer.first_name)} has been added to the database!`);
    })
    mainMenu();
  })
};

// starts app
mainMenu();