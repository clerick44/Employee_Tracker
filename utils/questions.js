const inquirer = require("inquirer");
const db = require("../connections/connections");

// const addRole = () => {
//   db.query(`SELECT * FROM department`, (err, res) => {
//     if (err) {
//       throw err;
//     }

//     const depData = res.map((department) => ({
//       name: department.name,
//       value: department.id,
//     }));
//     console.log(depData);
//     inquirer.prompt([
//         {
//           type: "input",
//           message: "What is the title of your new role?",
//           name: "roleTitle",
//         },
//         {
//           type: "input",
//           message: "What is the salary for this role?",
//           name: "roleSalary",
//         },
//         {
//           type: "list",
//           message: "What is the department id for this role?",
//           name: "roleDeptId",
//           choices: depdata,
//         },
//       ]);
// });
// };

module.exports = {
  initQuestions: {
    type: "list",
    message: "What would you like to do?",
    name: "initAnswer",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update employee role",
      "Quit",
    ],
  },

  addDeptQuestions: {
    type: "input",
    message: "What is the name of your department?",
    name: "deptName",
  },

  addEmpQuestions: (roles, employees) => [
    {
      type: "input",
      message: "What is your employee's first name?",
      name: "first_name",
    },
    {
      type: "input",
      message: "What is your employee's last name?",
      name: "last_name",
    },
    {
      type: "list",
      message: "What is your employee's roleID?",
      name: "role_id",
      choices: roles,
    },
    {
      type: "list",
      message: "Who is your employee's manager?",
      name: "manager_id",
      choices: employees,
    },
  ],
  updateEmpQuestions: (employees, roles) => [
    {
      type: "list",
      message: "Choose an employee to update:",
      name: "employee",
      choices: () => {
        return employees.map((employee) => employee.name);
      },
    },
    {
      type: "list",
      message: "What is this employee's new role?",
      name: "newRole",
      choices: () => {
        return roles.map((role) => role.title);
      },
    },
  ],
};
