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
};
