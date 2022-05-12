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


// addDepartment = () => {
//   inquirer.prompt([
//     {
//       type: 'input',
//       name: 'name',
//       message: 'What is the name of the department?'
//     }
//   ])
// }
  //     const sql = `INSERT INTO department (depart_name)
  //                 VALUES (?)`;
  //     const params = [body.depart_name];
  
  //     db.query(sql, params, (err, result) => {
  //         if (err) {
  //           res.status(400).json({ error: err.message });
  //           return;
  //         }
  //         res.json({
  //           message: 'success',
  //           data: body
  //         });


//GET ALL DEPARTMENTS
// app.get('/api/department', (req, res) => {
//     const sql = `SELECT * FROM department`;

//     db.query(sql, (err, rows) => {
//         if (err) {
//           res.status(500).json({ error: err.message });
//           return;
//         }
//         res.json({
//           message: 'success',
//           data: rows
//         });
//       });
// });

// GET A SINGLE DEPARTMENT
// app.get('/api/department/:id', (req, res) => {
//     const sql = 'SELECT * FROM department WHERE id = ?';
//     const params = [req.params.id];

//     db.query(sql, params, (err, row) => {
//         if (err) {
//           res.status(400).json({ error: err.message });
//           return;
//         }
//         res.json({
//           message: 'success',
//           data: row
//         });
//     });
// });

// Delete a DEPARTMENT
// app.delete('/api/department/:id', (req, res) => {
//     const sql = `DELETE FROM department WHERE id = ?`;
//     const params = [req.params.id];
  
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.statusMessage(400).json({ error: res.message });
//       } else if (!result.affectedRows) {
//         res.json({
//           message: 'Department not found'
//         });
//       } else {
//         res.json({
//           message: 'deleted department',
//           changes: result.affectedRows,
//           id: req.params.id
//         });
//       }
//     });
// });

// // CREATE NEW DEPARTMENT
// app.post('/api/department', ({ body }, res) => {
//     const errors = inputCheck(body, 'depart_name');
//     if (errors) {
//         res.status(400).json({ error: errors });
//         return;
//     }

//     const sql = `INSERT INTO department (depart_name)
//                 VALUES (?)`;
//     const params = [body.depart_name];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//           res.status(400).json({ error: err.message });
//           return;
//         }
//         res.json({
//           message: 'success',
//           data: body
//         });
//       });
//     });

// // GET ALL ROLES
// app.get('/api/role', (req, res) => {
//     const sql = `SELECT * FROM role`;

//     db.query(sql, (err, rows) => {
//         if (err) {
//           res.status(500).json({ error: err.message });
//           return;
//         }
//         res.json({
//           message: 'success',
//           data: rows
//         });
//       });
// });

// // GET SINGLE ROLE
// app.get('/api/role/:id', (req, res) => {
//     const sql = `SELECT * FROM role WHERE id = ?`;
//     const params = [req.params.id];

//     db.query(sql, params, (err, row) => {
//         if (err) {
//           res.status(400).json({ error: err.message });
//           return;
//         }
//         res.json({
//           message: 'success',
//           data: row
//         });
//     });
// });

// // ADD NEW ROLE
// app.post('/api/role', ({ body }, res) => {
//     const errors = inputCheck(body, 'title', 'salary', 'department_id');
//     if (errors) {
//         res.status(400).json({ error: errors });
//         return;
//     }

//     const sql = `INSERT INTO role (title, salary, department_id)
//                 VALUES (?,?,?)`;
//     const params = [body.title, body.salary, body.department_id];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//           res.status(400).json({ error: err.message });
//           return;
//         }
//         res.json({
//           message: 'success',
//           data: body
//         });
//     });
// });


mainMenu();