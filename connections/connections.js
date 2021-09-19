const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "employees_db",
});

db.connect(function (err) {
  if (err) throw err;
  console.log(`Connected to the employees_db database.`);
});

module.exports = db;
