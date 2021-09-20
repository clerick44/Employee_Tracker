const db = require("./connections/connections");
const ask = require("./utils/questions");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { updateEmployee } = require("./utils/questions");

init();

async function init() {
  try {
    const { initAnswer } = await inquirer.prompt(ask.initQuestions);
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

async function addDepartment() {
  const { deptName } = await inquirer.prompt(ask.addDeptQuestions);
  console.log(deptName);
  db.query("INSERT INTO department SET ?", { name: deptName }, function (err) {
    if (err) throw err;
    console.log("Department Succesfully Added!");
    init();
  });
}

function addRole() {
  db.query(`SELECT * FROM department`, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const depData = data.map((department) => ({
      name: department.name,
      value: department.id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the title of your new role?",
          name: "roleTitle",
        },
        {
          type: "input",
          message: "What is the salary for this role?",
          name: "roleSalary",
        },
        {
          type: "list",
          message: "What is the department id for this role?",
          name: "roleDeptId",
          choices: depData,
        },
      ])
      .then((data) => {
        db.query(
          "INSERT INTO role SET ?",
          {
            title: data.roleTitle,
            salary: data.roleSalary,
            department_id: data.roleDeptId,
          },
          function (err) {
            if (err) throw err;
            console.log("Role Succesfully Added!");
            init();
          }
        );
      });
  });
}

async function addEmployee() {
  db.query(
    "SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee",
    async (err, employees) => {
      db.query(
        "SELECT id as value, title as name FROM role",
        async (err, roles) => {
          // get the name, category, starting bid from user
          const newEmp = await inquirer.prompt(
            ask.addEmpQuestions(roles, employees)
          );

          db.query("INSERT INTO employee SET ?", newEmp, function (err) {
            if (err) throw err;
            console.log("New employee was added successfully!");
            // re-prompt the user for if they want to bid or post
            init();
          });
        }
      );
    }
  );
}

async function updateEmpRole() {
  // query for the category choices
  db.query(
    `SELECT id AS value, CONCAT(first_name, ' ', last_name) as name FROM employee`,
    async (err, employees) => {
      db.query(`SELECT id AS value, title FROM role`, async (err, roles) => {
        console.log(employees);
        console.log(roles);
        // get the name, category, starting bid from user
        //
        const { newRole, employee } = await inquirer.prompt(
          ask.updateEmpQuestions(employees, roles)
        );
        const newArray = employee.split(" ");
        console.log(newArray);
        // console.log(data);
        console.log(employee);
        console.log(newRole);
        db.query(
          "UPDATE employee SET ? WHERE ? AND ?",
          [
            {
              role_id: newRole,
            },
            {
              first_name: newArray[0],
            },
            { last_name: newArray[1] },
          ],
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            console.table(employee);
            init();
          }
        );
      });
    }
  );
}
