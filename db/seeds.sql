INSERT INTO department (depart_name)
VALUES
    ('Sales'),
    ('Marketing'),
    ('Finance'),
    ('International');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Manager', '55000', 1),
    ('Marketing Associate', '45000', 2),
    ('Director of Finance', '110000', 3),
    ('International Shipping Lead', '43000', 4),
    ('Sales Associate', '35000', 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Bryce', 'Larkin', 3, 5),
    ('John', 'Williams', 1, 3),
    ('Carmen', 'Ruiz', 4, 2),
    ('Stephen', 'Gilmer', 1, 1),
    ('Jada', 'Jackson', 2, 4);