INSERT INTO department(name)
VALUES  ("Sales"),
        ("Finance"),
        ("Engineering"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Salesperson", 80000, 1),
        ("Lead Engineer", 150000, 3),
        ("Software Engineer", 90000, 3),
        ("Account Manager", 100000, 2),
        ("Accountant", 160000, 2),
        ("Legal Team Lead", 190000, 4),
        ("Lawyer", 50, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Jesse", "Erickson", 2, null),
        ("Lisa", "Brown", 4, null),
        ("Jacob", "Keil", 5, 2),
        ("Rebekah", "Jones", 3, 1),
        ("Tami", "Stevens", 1, null );