/** A small school-and-shop database every SQL lesson can query. Recreated fresh for each lesson page. */
export const SQL_SEED = `
CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  age INTEGER,
  grade REAL DEFAULT 0
);
INSERT INTO students (id, name, email, age, grade) VALUES
  (1, 'Ada',    'ada.lovelace@abbey.edu',   17, 95),
  (2, 'Linus',  'linus.t@abbey.edu',        16, 88),
  (3, 'Grace',  'grace.h@abbey.edu',        17, 92),
  (4, 'Alan',   'alan.t@abbey.edu',         18, 79),
  (5, 'Barbara','barbara.l@abbey.edu',      16, 84),
  (6, 'Dennis', NULL,                       17, 71),
  (7, 'Margaret','margaret.h@abbey.edu',    15, 90),
  (8, 'Ken',    'ken.t@abbey.edu',          18, 66);

CREATE TABLE courses (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);
INSERT INTO courses (id, name) VALUES (1, 'Algorithms'), (2, 'Databases'), (3, 'Latin'), (4, 'Music Theory');

CREATE TABLE enrollments (
  id INTEGER PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id),
  course_id INTEGER NOT NULL REFERENCES courses(id),
  score REAL,
  UNIQUE (student_id, course_id)
);
INSERT INTO enrollments (student_id, course_id, score) VALUES
  (1, 1, 98), (1, 2, 91), (2, 1, 85), (3, 2, 94), (3, 3, 88),
  (4, 1, 72), (4, 3, 96), (4, 4, 89), (5, 2, 81), (5, 4, 93);

CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL,
  created_at TEXT NOT NULL
);
INSERT INTO customers (id, name, email, country, created_at) VALUES
  (1, 'Hildegard', 'hildegard@bingen.de', 'DE', '2025-11-03'),
  (2, 'Thomas',    'thomas@aquino.it',    'IT', '2025-12-14'),
  (3, 'Teresa',    'teresa@avila.es',     'ES', '2026-01-09'),
  (4, 'Anselm',    'anselm@bec.fr',       'FR', '2026-01-21'),
  (5, 'Bede',      'bede@jarrow.uk',      'UK', '2026-02-02'),
  (6, 'Catherine', 'catherine@siena.it',  'IT', '2026-02-18'),
  (7, 'Benedict',  'benedict@nursia.it',  'IT', '2026-03-05');

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL
);
INSERT INTO products (id, name, category, price) VALUES
  (1, 'Vellum notebook', 'stationery', 24.00),
  (2, 'Iron gall ink',   'stationery', 9.50),
  (3, 'Goose quill set', 'stationery', 12.00),
  (4, 'Beeswax candles', 'home',       18.00),
  (5, 'Gregorian chant LP', 'music',   29.00),
  (6, 'Abbey ale (6)',   'food',       15.00),
  (7, 'Herbal tea tin',  'food',       7.25);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  region TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  total REAL NOT NULL,
  created_at TEXT NOT NULL
);
INSERT INTO orders (id, customer_id, region, status, total, created_at) VALUES
  (1, 1, 'EU', 'shipped',  120.00, '2026-01-04'),
  (2, 2, 'EU', 'shipped',  640.00, '2026-01-11'),
  (3, 3, 'EU', 'pending',   33.50, '2026-01-15'),
  (4, 1, 'EU', 'shipped',  980.00, '2026-02-01'),
  (5, 5, 'UK', 'cancelled', 45.00, '2026-02-09'),
  (6, 2, 'EU', 'shipped',  210.00, '2026-02-20'),
  (7, 6, 'EU', 'pending',  510.00, '2026-03-02'),
  (8, 1, 'EU', 'shipped',  305.00, '2026-03-08'),
  (9, 5, 'UK', 'shipped',   72.00, '2026-03-12'),
  (10, 3, 'EU', 'shipped', 1200.00, '2026-03-19'),
  (11, 6, 'EU', 'shipped',  89.00, '2026-03-25'),
  (12, 2, 'EU', 'pending',  57.00, '2026-04-01');

CREATE TABLE order_items (
  order_id INTEGER NOT NULL REFERENCES orders(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  unit_price REAL NOT NULL
);
INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
  (1, 1, 5, 24.00), (2, 5, 20, 29.00), (2, 4, 3, 18.00), (3, 2, 2, 9.50), (3, 7, 2, 7.25),
  (4, 1, 30, 24.00), (4, 3, 20, 12.00), (5, 6, 3, 15.00), (6, 4, 10, 18.00), (6, 5, 1, 29.00),
  (7, 1, 15, 24.00), (7, 6, 10, 15.00), (8, 5, 10, 29.00), (9, 7, 8, 7.25), (10, 1, 50, 24.00),
  (11, 2, 6, 9.50), (11, 3, 2, 12.00), (12, 7, 4, 7.25), (12, 2, 3, 9.50);

CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  salary INTEGER NOT NULL,
  manager_id INTEGER REFERENCES employees(id)
);
INSERT INTO employees (id, name, department, salary, manager_id) VALUES
  (1, 'Abbot Cuthbert', 'leadership', 120000, NULL),
  (2, 'Prior Aidan',    'leadership',  95000, 1),
  (3, 'Sister Julian',  'engineering', 88000, 2),
  (4, 'Brother Bede',   'engineering', 82000, 3),
  (5, 'Brother Alcuin', 'engineering', 76000, 3),
  (6, 'Sister Hild',    'engineering', 91000, 3),
  (7, 'Brother Caedmon','scriptorium', 64000, 2),
  (8, 'Sister Ebba',    'scriptorium', 69000, 7),
  (9, 'Brother Oswald', 'scriptorium', 58000, 7),
  (10, 'Sister Werburgh','kitchen',    52000, 2),
  (11, 'Brother Wilfrid','kitchen',    49000, 10);

CREATE TABLE daily_sales (
  day TEXT PRIMARY KEY,
  revenue REAL NOT NULL
);
INSERT INTO daily_sales (day, revenue) VALUES
  ('2026-03-01', 120), ('2026-03-02', 135), ('2026-03-03', 98),  ('2026-03-04', 160),
  ('2026-03-05', 175), ('2026-03-06', 140), ('2026-03-07', 210), ('2026-03-08', 190),
  ('2026-03-09', 105), ('2026-03-10', 150), ('2026-03-11', 165), ('2026-03-12', 230),
  ('2026-03-13', 220), ('2026-03-14', 260);

CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  owner TEXT NOT NULL,
  balance REAL NOT NULL CHECK (balance >= 0)
);
INSERT INTO accounts (id, owner, balance) VALUES (1, 'Almonry', 500.00), (2, 'Infirmary', 250.00), (3, 'Library', 1200.00);

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'reader'
);
INSERT INTO users (id, name, email, role) VALUES
  (1, 'ada', 'ada@example.com', 'admin'), (2, 'bede', 'bede@example.com', 'reader'), (3, 'hild', 'hild@example.com', 'editor');
`
