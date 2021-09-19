const db = require("./connections/connections");
const inquirer = require("inquirer");
const cTable = require("console.table");

// const deptView = require("./utils/deptView");

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
    const { initAnswer } = await inquirer.prompt(initQuestions);
    // console.log(initAnswer);

    switch (initAnswer) {
      case "View all departments":
        deptView();
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

      default:
        console.log("default");
    }
  } catch (err) {
    console.log(err);
  }
}

init();

function deptView() {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    init();
  });
}

function roleView() {
  db.query(
    `SELECT role.id, title, salary 
    FROM role 
    JOIN department ON role.department_id = department.id`,
    function (err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      init();
    }
  );
}

function employeeView() {
  db.query(
    // "SELECT CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee AS e LEFT JOIN employee AS m ON e.manager_id = m.id",
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager 
    FROM employee AS e 
    JOIN role AS r ON e.role_id = r.id 
    JOIN department AS d ON r.department_id = d.id
    LEFT JOIN employee AS m ON e.manager_id = m.id`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init();
    }
  );
}
