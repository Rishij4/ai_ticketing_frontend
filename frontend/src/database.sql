CREATE TABLE tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT,
    category TEXT,
    summary TEXT,
    severity TEXT,
    resolution_path TEXT,
    sentiment TEXT,
    department TEXT,
    employee TEXT,
    confidence INTEGER,
    time_estimate TEXT,
    status TEXT,
    feedback TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    department TEXT,
    role TEXT,
    skills TEXT,
    avg_resolution_time INTEGER,
    current_load INTEGER,
    availability TEXT
);


INSERT INTO employees (name, email, department, role, skills, avg_resolution_time, current_load, availability)
VALUES
('Ravi', 'ravi@mail.com', 'IT', 'Support', 'Login,Access', 10, 2, 'Available'),
('Anita', 'anita@mail.com', 'HR', 'Manager', 'Policy,Leave', 15, 1, 'Available'),
('Kiran', 'kiran@mail.com', 'DevOps', 'Engineer', 'Server,Network', 20, 3, 'Busy');
