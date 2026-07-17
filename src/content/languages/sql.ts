import { Language } from '../types'

export const sql: Language = {
  slug: 'sql',
  name: 'SQL',
  tagline: 'The language every database speaks.',
  description: "SQL (Structured Query Language) has been the way to talk to relational databases since the 1970s — and it's not going anywhere. Whether you write Python, JavaScript, or Java, your data almost certainly lives in a SQL database. It's arguably the highest return-on-investment language you can learn.",
  accentColor: '#E38C00',
  textOnAccent: '#fff',
  icon: 'SQ',
  difficulty: 'beginner',
  usedFor: ['Databases', 'Data Analysis', 'Backend Development', 'Reporting', 'Data Engineering'],
  notableUsers: ['Every bank', 'Every airline', 'PostgreSQL', 'MySQL', 'SQLite'],
  setup: {
    description: 'The easiest way to start is SQLite — a full SQL database in a single file, no server needed. It ships with Python and most operating systems.',
    windows: `# SQLite comes with Python. Or download the CLI:
# https://www.sqlite.org/download.html (sqlite-tools zip)

# Then open a database (creates the file if missing):
sqlite3 mydata.db

# Or install PostgreSQL for the full experience:
winget install PostgreSQL.PostgreSQL`,
    mac: `# SQLite is preinstalled:
sqlite3 mydata.db

# PostgreSQL via Homebrew:
brew install postgresql@16
brew services start postgresql@16
psql postgres`,
    linux: `# SQLite is usually preinstalled. If not:
sudo apt install sqlite3        # Debian/Ubuntu

sqlite3 mydata.db

# PostgreSQL:
sudo apt install postgresql
sudo -u postgres psql`,
  },
  lessons: [
    {
      slug: 'tables-and-select',
      title: 'Tables & SELECT',
      intro: "A relational database is just spreadsheets with rules: tables made of rows and columns. SELECT is how you ask questions about them — and it's 80% of the SQL you'll ever write.",
      sections: [
        {
          type: 'text',
          content: "Everything in SQL revolves around tables. A table has named columns (each with a type) and any number of rows. SELECT reads rows out of a table. You choose which columns you want, and optionally filter which rows come back.",
        },
        {
          type: 'code',
          language: 'sql',
          content: `-- A table called 'students' might look like:
-- id | name    | age | grade
-- 1  | Ada     | 17  | 95
-- 2  | Linus   | 16  | 88
-- 3  | Grace   | 17  | 92

-- Get every column of every row:
SELECT * FROM students;

-- Get only some columns:
SELECT name, grade FROM students;

-- Rename a column in the output with AS:
SELECT name, grade AS score FROM students;`,
        },
        {
          type: 'note',
          content: "SQL keywords are case-insensitive — select, SELECT, and SeLeCt all work. Convention is UPPERCASE for keywords and lowercase for table/column names, which makes queries easier to scan.",
        },
        {
          type: 'code',
          language: 'sql',
          content: `-- Filter rows with WHERE:
SELECT name FROM students WHERE age = 17;

-- Comparison operators: =, <>, <, >, <=, >=
SELECT name FROM students WHERE grade >= 90;

-- Combine conditions with AND / OR / NOT:
SELECT name FROM students
WHERE age = 17 AND grade > 90;

-- Pattern matching with LIKE (% = any characters):
SELECT name FROM students WHERE name LIKE 'A%';`,
        },
        {
          type: 'tip',
          content: "Note the 'not equal' operator is <> in standard SQL, though most databases also accept !=. Also: SQL strings use single quotes ('Ada'), not double quotes — double quotes mean identifiers (column/table names) in standard SQL.",
        },
      ],
    },
    {
      slug: 'creating-data',
      title: 'CREATE, INSERT, UPDATE, DELETE',
      intro: "Reading data is half the story. The other half: creating tables and changing what's in them. These four statements are called CRUD — Create, Read, Update, Delete.",
      sections: [
        {
          type: 'text',
          content: "CREATE TABLE defines a new table: each column gets a name and a type. Common types are INTEGER, REAL (floating point), TEXT, and BOOLEAN. Constraints like NOT NULL and UNIQUE enforce rules on the data so garbage can't get in.",
        },
        {
          type: 'code',
          language: 'sql',
          content: `CREATE TABLE students (
  id    INTEGER PRIMARY KEY,   -- unique identifier for each row
  name  TEXT NOT NULL,         -- must have a value
  email TEXT UNIQUE,           -- no two rows can share this
  age   INTEGER,
  grade REAL DEFAULT 0         -- value used if none given
);`,
        },
        {
          type: 'code',
          language: 'sql',
          content: `-- Add rows:
INSERT INTO students (name, email, age, grade)
VALUES ('Ada', 'ada@example.com', 17, 95);

-- Insert several at once:
INSERT INTO students (name, age) VALUES
  ('Linus', 16),
  ('Grace', 17);

-- Change existing rows:
UPDATE students SET grade = 89 WHERE name = 'Linus';

-- Remove rows:
DELETE FROM students WHERE age < 16;`,
        },
        {
          type: 'warning',
          content: "UPDATE and DELETE without a WHERE clause affect EVERY row in the table. 'DELETE FROM students;' empties the whole table, no confirmation asked. Always write the WHERE first, and consider running it inside a SELECT to preview which rows will be hit.",
        },
      ],
    },
    {
      slug: 'sorting-and-limiting',
      title: 'ORDER BY, LIMIT & DISTINCT',
      intro: "Rows in a table have no guaranteed order. If you want the top 10 students by grade, you need to say so explicitly — that's ORDER BY and LIMIT.",
      sections: [
        {
          type: 'code',
          language: 'sql',
          content: `-- Sort ascending (default):
SELECT name, grade FROM students ORDER BY grade;

-- Sort descending:
SELECT name, grade FROM students ORDER BY grade DESC;

-- Sort by several columns (ties broken by the next one):
SELECT name, age, grade FROM students
ORDER BY age DESC, grade DESC;

-- Only the first N rows:
SELECT name, grade FROM students
ORDER BY grade DESC
LIMIT 3;

-- Skip rows with OFFSET (page 2 of results):
SELECT name FROM students
ORDER BY name
LIMIT 10 OFFSET 10;`,
        },
        {
          type: 'text',
          content: "DISTINCT removes duplicate rows from the result. Ask 'which ages appear in the table?' and you don't want 17 listed five times.",
        },
        {
          type: 'code',
          language: 'sql',
          content: `SELECT DISTINCT age FROM students;

-- DISTINCT applies to the whole selected row:
SELECT DISTINCT age, grade FROM students;
-- (only removes rows where BOTH values repeat)`,
        },
        {
          type: 'note',
          content: "LIMIT/OFFSET is how apps implement pagination — page 3 with 20 items per page is LIMIT 20 OFFSET 40. Beware: without ORDER BY, pagination is meaningless, because the database is free to return rows in any order it likes.",
        },
      ],
    },
    {
      slug: 'aggregates',
      title: 'COUNT, SUM & GROUP BY',
      intro: "So far every query returned rows as-is. Aggregate functions collapse many rows into one answer: how many students? What's the average grade? GROUP BY asks that per category.",
      sections: [
        {
          type: 'code',
          language: 'sql',
          content: `-- Aggregates over the whole table:
SELECT COUNT(*) FROM students;          -- number of rows
SELECT AVG(grade) FROM students;        -- average
SELECT MAX(grade), MIN(grade) FROM students;
SELECT SUM(grade) FROM students;

-- COUNT(column) skips NULLs; COUNT(*) counts all rows:
SELECT COUNT(email) FROM students;`,
        },
        {
          type: 'text',
          content: "GROUP BY splits rows into buckets and runs the aggregate per bucket. 'Average grade per age' means: bucket rows by age, then AVG each bucket. Every selected column must either be in the GROUP BY or wrapped in an aggregate — otherwise the database can't know which row's value to show.",
        },
        {
          type: 'code',
          language: 'sql',
          content: `-- Average grade per age group:
SELECT age, AVG(grade) AS avg_grade, COUNT(*) AS n
FROM students
GROUP BY age;

-- Filter groups with HAVING (WHERE filters rows, HAVING filters groups):
SELECT age, AVG(grade) AS avg_grade
FROM students
GROUP BY age
HAVING AVG(grade) > 85;

-- Full order of clauses:
-- SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT`,
        },
        {
          type: 'tip',
          content: "Remember the execution order: WHERE runs before grouping (it can't see aggregates), HAVING runs after (it can). If you catch yourself writing WHERE AVG(grade) > 85, you want HAVING.",
        },
      ],
    },
    {
      slug: 'joins',
      title: 'JOINs — Combining Tables',
      intro: "Real databases split data across many tables: students in one, courses in another, enrollments linking them. JOIN stitches them back together. This is the concept that makes databases 'relational'.",
      sections: [
        {
          type: 'text',
          content: "Instead of one giant table repeating the course name on every student row, you store courses once and reference them by id. A JOIN matches rows from two tables using a condition — almost always 'foreign key equals primary key'.",
        },
        {
          type: 'code',
          language: 'sql',
          content: `CREATE TABLE courses (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE enrollments (
  student_id INTEGER REFERENCES students(id),
  course_id  INTEGER REFERENCES courses(id),
  score      REAL
);

-- Which student is enrolled in which course?
SELECT students.name, courses.name AS course, enrollments.score
FROM enrollments
JOIN students ON students.id = enrollments.student_id
JOIN courses  ON courses.id  = enrollments.course_id;`,
        },
        {
          type: 'code',
          language: 'sql',
          content: `-- INNER JOIN (default): only rows with a match on both sides
SELECT s.name, e.score
FROM students s
JOIN enrollments e ON e.student_id = s.id;

-- LEFT JOIN: all rows from the left table,
-- NULLs where the right side has no match
SELECT s.name, e.score
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id;
-- Students with no enrollments still appear (score = NULL)

-- Find students NOT enrolled in anything:
SELECT s.name
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id
WHERE e.student_id IS NULL;`,
        },
        {
          type: 'note',
          content: "The single-letter names (students s) are table aliases — pure convenience for shorter queries. Also note NULL checks use IS NULL / IS NOT NULL, never = NULL. NULL isn't equal to anything, not even itself.",
        },
      ],
    },
    {
      slug: 'indexes-and-keys',
      title: 'Primary Keys, Foreign Keys & Indexes',
      intro: "Why was that query slow? Nine times out of ten: a missing index. Keys and indexes are how databases stay fast and consistent as tables grow to millions of rows.",
      sections: [
        {
          type: 'text',
          content: "A PRIMARY KEY uniquely identifies each row — usually an auto-incrementing integer. A FOREIGN KEY declares that a column's values must exist in another table, so you can't enroll a student id that doesn't exist. These constraints are the database protecting your data from your own bugs.",
        },
        {
          type: 'code',
          language: 'sql',
          content: `CREATE TABLE enrollments (
  id         INTEGER PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id),
  course_id  INTEGER NOT NULL REFERENCES courses(id),
  UNIQUE (student_id, course_id)   -- can't enroll twice in one course
);

-- Foreign keys reject bad data:
INSERT INTO enrollments (student_id, course_id) VALUES (9999, 1);
-- ERROR: violates foreign key constraint`,
        },
        {
          type: 'text',
          content: "Without an index, WHERE email = '...' scans every row — fine at 100 rows, disastrous at 10 million. An index is a sorted lookup structure (usually a B-tree) the database maintains alongside the table, turning scans into instant lookups.",
        },
        {
          type: 'code',
          language: 'sql',
          content: `-- Create an index on a column you filter/join by often:
CREATE INDEX idx_students_email ON students(email);

-- See how a query executes (works in SQLite and Postgres):
EXPLAIN QUERY PLAN
SELECT * FROM students WHERE email = 'ada@example.com';
-- Before index: SCAN students
-- After index:  SEARCH students USING INDEX idx_students_email`,
        },
        {
          type: 'warning',
          content: "Indexes aren't free — every INSERT/UPDATE must also update each index, and they consume disk. Index columns you actually query by; don't index everything 'just in case'.",
        },
      ],
    },
    {
      slug: 'transactions',
      title: 'Transactions & Safety',
      intro: "Transfer $100 between accounts: subtract from one, add to the other. If the server crashes between those two statements, money vanishes. Transactions make multiple statements succeed or fail as one unit.",
      sections: [
        {
          type: 'code',
          language: 'sql',
          content: `BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;    -- both changes become permanent together

-- If something went wrong instead:
-- ROLLBACK;  -- undoes everything since BEGIN`,
        },
        {
          type: 'text',
          content: "This is the A in ACID: Atomicity — all or nothing. The other letters: Consistency (constraints always hold), Isolation (concurrent transactions don't see each other's half-finished work), Durability (once committed, it survives a crash). ACID guarantees are the main reason banks run on SQL databases.",
        },
        {
          type: 'tip',
          content: "Transactions are also your safety net for risky manual changes: BEGIN, run your UPDATE, SELECT to verify it did what you meant — then COMMIT if happy or ROLLBACK if not.",
        },
        {
          type: 'text',
          content: "One more safety topic you must know: SQL injection. Never build queries by gluing user input into strings. Use parameterized queries — every language's database library supports them.",
        },
        {
          type: 'code',
          language: 'python',
          content: `# WRONG — user input becomes part of the SQL:
cursor.execute(f"SELECT * FROM users WHERE name = '{name}'")
# If name is:  ' OR '1'='1  — the query returns every user.

# RIGHT — parameterized query; input can never become SQL:
cursor.execute("SELECT * FROM users WHERE name = ?", (name,))`,
        },
      ],
    },
  ],
}
