// const express = require("express");
const db = require("./connections/connections");
const inquirer = require("inquirer");
const cTable = require("console.table");

const deptView = require("./utils/deptView");

const initQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
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
    name: "initAnswer",
  },
];

async function init() {
  try {
    const initAnswer = inquirer.prompt(initQuestions);
    // console.log(initAnswer);

    switch (initAnswer) {
      case "View all departments":
        const depts = deptView();
        console.table(depts);
        break;

      case "View all roles":
        roleView();
        break;

      case "View all employees":
        employeeView();
        break;

      case "Add a department":
        addDepartment();
        break;

      case "Add a role":
        addRole();
        break;

      case "Add an employee":
        addEmployee();
        break;

      case "Update employee role":
        updateEmpRole();
        break;

      case "Quit":
        db.end;
    }
  } catch (err) {
    console.log(err);
  }
}

init();

// db.query("SELECT * FROM employees_db.employee;", (err, results) => {
//   console.log(results);
// });
