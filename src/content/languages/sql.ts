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
    {
      slug: 'subqueries-and-ctes',
      title: 'Subqueries & CTEs',
      intro: 'When one query needs the answer to another query, you have two options: nest it as a subquery, or name it up front as a CTE. CTEs read top to bottom like a recipe, which is why they win for anything non-trivial.',
      sections: [
        {
          type: 'code',
          language: 'sql',
          content: `-- Scalar subquery: returns exactly one value
SELECT name, price,
       (SELECT AVG(price) FROM products) AS avg_price
FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- IN: does this value appear in that result set?
SELECT name
FROM customers
WHERE id IN (SELECT customer_id FROM orders WHERE total > 500);

-- EXISTS: usually faster, and it stops at the first match
SELECT c.name
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.customer_id = c.id AND o.total > 500
);

-- NOT EXISTS: customers who have never ordered
SELECT c.name
FROM customers c
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);

-- Derived table: a subquery in the FROM clause (it needs an alias)
SELECT region, order_count
FROM (
    SELECT region, COUNT(*) AS order_count
    FROM orders
    GROUP BY region
) AS totals
WHERE order_count > 10;`,
        },
        {
          type: 'code',
          language: 'sql',
          content: `-- A CTE names a result set so you can read the query in order.
WITH monthly_sales AS (
    SELECT
        customer_id,
        DATE_TRUNC('month', created_at) AS month,
        SUM(total) AS revenue
    FROM orders
    WHERE created_at >= '2026-01-01'
    GROUP BY customer_id, DATE_TRUNC('month', created_at)
),
customer_totals AS (
    SELECT customer_id, SUM(revenue) AS lifetime_value
    FROM monthly_sales
    GROUP BY customer_id
),
tiers AS (
    SELECT
        customer_id,
        lifetime_value,
        CASE
            WHEN lifetime_value >= 10000 THEN 'platinum'
            WHEN lifetime_value >=  2000 THEN 'gold'
            ELSE 'standard'
        END AS tier
    FROM customer_totals
)
SELECT c.name, t.tier, t.lifetime_value
FROM tiers t
JOIN customers c ON c.id = t.customer_id
WHERE t.tier <> 'standard'
ORDER BY t.lifetime_value DESC;`,
        },
        {
          type: 'code',
          language: 'sql',
          content: `-- Recursive CTEs walk hierarchies: org charts, category trees, graphs.
WITH RECURSIVE org_chart AS (
    -- Anchor: where the walk starts
    SELECT id, name, manager_id, 1 AS depth, name AS path
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive step: joins back onto the CTE itself
    SELECT e.id, e.name, e.manager_id, oc.depth + 1, oc.path || ' > ' || e.name
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.id
    WHERE oc.depth < 10                 -- always bound the recursion
)
SELECT depth, path
FROM org_chart
ORDER BY path;

-- Generating a series of dates to fill gaps in a report
WITH RECURSIVE days AS (
    SELECT DATE '2026-01-01' AS day
    UNION ALL
    SELECT day + INTERVAL '1 day' FROM days WHERE day < DATE '2026-01-31'
)
SELECT d.day, COALESCE(SUM(o.total), 0) AS revenue
FROM days d
LEFT JOIN orders o ON DATE(o.created_at) = d.day
GROUP BY d.day
ORDER BY d.day;`,
        },
        {
          type: 'warning',
          content: 'A correlated subquery in the SELECT list runs once per output row. On a million-row result that is a million extra queries. Rewrite it as a JOIN or a CTE aggregated once, and compare with EXPLAIN.',
        },
        {
          type: 'note',
          content: 'NOT IN with a subquery that can produce NULL returns no rows at all, because "x NOT IN (1, NULL)" evaluates to unknown. Use NOT EXISTS instead — it is both safer and usually faster.',
        },
      ],
    },
    {
      slug: 'window-functions',
      title: 'Window Functions',
      intro: 'GROUP BY collapses rows. A window function computes across a set of rows while keeping every row — which is how you get running totals, rankings, and "compare this row to the previous one" in plain SQL.',
      sections: [
        {
          type: 'code',
          language: 'sql',
          content: `-- The shape: function() OVER (PARTITION BY ... ORDER BY ...)
SELECT
    name,
    department,
    salary,
    AVG(salary) OVER (PARTITION BY department)          AS dept_avg,
    salary - AVG(salary) OVER (PARTITION BY department) AS diff_from_avg,
    COUNT(*)   OVER (PARTITION BY department)           AS dept_size,
    SUM(salary) OVER ()                                 AS company_payroll
FROM employees;

-- PARTITION BY splits the rows into groups; without it the window is everything.
-- Unlike GROUP BY, every original row is still in the output.

-- Ranking
SELECT
    name, department, salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
    RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank,
    NTILE(4)     OVER (ORDER BY salary DESC)                         AS quartile
FROM employees;

-- ROW_NUMBER: 1,2,3,4    always unique
-- RANK:       1,2,2,4    ties share, then it skips
-- DENSE_RANK: 1,2,2,3    ties share, no gap`,
        },
        {
          type: 'code',
          language: 'sql',
          content: `-- "Top N per group" — the classic use of ROW_NUMBER
WITH ranked AS (
    SELECT
        name, department, salary,
        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
    FROM employees
)
SELECT name, department, salary
FROM ranked
WHERE rn <= 3;             -- top 3 earners in each department

-- Comparing a row to its neighbours
SELECT
    day,
    revenue,
    LAG(revenue, 1)  OVER (ORDER BY day) AS previous_day,
    LEAD(revenue, 1) OVER (ORDER BY day) AS next_day,
    revenue - LAG(revenue) OVER (ORDER BY day) AS change,
    ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY day))
          / NULLIF(LAG(revenue) OVER (ORDER BY day), 0), 1) AS pct_change,
    FIRST_VALUE(revenue) OVER (ORDER BY day) AS first_day_revenue
FROM daily_sales
ORDER BY day;`,
        },
        {
          type: 'code',
          language: 'sql',
          content: `-- Frames control WHICH rows in the partition are included.
SELECT
    day,
    revenue,

    -- Running total: everything from the start up to this row
    SUM(revenue) OVER (
        ORDER BY day
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total,

    -- 7-day moving average
    AVG(revenue) OVER (
        ORDER BY day
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS avg_7day,

    -- Centred 3-day window
    AVG(revenue) OVER (
        ORDER BY day
        ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    ) AS avg_centered,

    -- Share of the grand total
    ROUND(100.0 * revenue / SUM(revenue) OVER (), 2) AS pct_of_total
FROM daily_sales;

-- Reusable window definitions with a WINDOW clause
SELECT
    day,
    SUM(revenue) OVER w AS running_total,
    AVG(revenue) OVER w AS running_avg
FROM daily_sales
WINDOW w AS (ORDER BY day ROWS UNBOUNDED PRECEDING);`,
        },
        {
          type: 'warning',
          content: 'Window functions are evaluated after WHERE and GROUP BY, so you cannot filter on one in the WHERE clause. Wrap the query in a CTE or subquery and filter on the outer level — that is why the "top N per group" pattern always has two levels.',
        },
        {
          type: 'tip',
          content: 'Adding ORDER BY inside OVER() silently changes the default frame to "start of partition through current row". That is exactly what you want for a running total and exactly wrong for a partition-wide average — so state the frame explicitly whenever it matters.',
        },
      ],
    },
    {
      slug: 'schema-design',
      title: 'Schema Design & Constraints',
      intro: 'The database is the last line of defence for your data. Application code has bugs, scripts get run by hand, and a second service will eventually write to the same table — constraints are what keep the data honest through all of it.',
      sections: [
        {
          type: 'code',
          language: 'sql',
          content: `CREATE TABLE customers (
    id          BIGSERIAL PRIMARY KEY,
    email       TEXT        NOT NULL UNIQUE,
    name        TEXT        NOT NULL,
    country     CHAR(2)     NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT email_format CHECK (email LIKE '%_@_%.__%')
);

CREATE TABLE orders (
    id           BIGSERIAL PRIMARY KEY,
    customer_id  BIGINT      NOT NULL,
    status       TEXT        NOT NULL DEFAULT 'pending',
    total        NUMERIC(12,2) NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_customer
        FOREIGN KEY (customer_id) REFERENCES customers(id)
        ON DELETE CASCADE,          -- delete the customer, delete their orders
                                    -- alternatives: RESTRICT, SET NULL, NO ACTION
    CONSTRAINT positive_total CHECK (total >= 0),
    CONSTRAINT valid_status  CHECK (status IN ('pending','paid','shipped','cancelled'))
);

-- Many-to-many needs a join table with a composite primary key
CREATE TABLE order_items (
    order_id   BIGINT NOT NULL REFERENCES orders(id)   ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity   INT    NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12,2) NOT NULL,
    PRIMARY KEY (order_id, product_id)
);`,
        },
        {
          type: 'code',
          language: 'sql',
          content: `-- Normalization: store each fact exactly once.

-- BAD: repeated data, no single source of truth
-- orders(id, customer_name, customer_email, customer_country, product_name, price)
--   * changing an email means updating every one of that customer's orders
--   * two rows can disagree about the same customer
--   * a customer with no orders cannot exist at all

-- GOOD: one table per entity, linked by keys
-- customers(id, name, email, country)
-- products(id, name, price)
-- orders(id, customer_id, created_at)
-- order_items(order_id, product_id, quantity, unit_price)

-- Note that order_items stores unit_price even though products has a price.
-- That is deliberate, not duplication: an order must remember what was charged
-- AT THE TIME, even after the product price changes.

-- Deliberate denormalization for read speed — keep it explicit and derived:
ALTER TABLE orders ADD COLUMN item_count INT NOT NULL DEFAULT 0;
-- ... maintained by a trigger or by the application, and rebuildable from
-- order_items at any time.`,
        },
        {
          type: 'code',
          language: 'sql',
          content: `-- Changing a live schema: additive first, destructive later.
ALTER TABLE customers ADD COLUMN phone TEXT;                    -- safe
ALTER TABLE customers ALTER COLUMN name SET NOT NULL;           -- needs a backfill first
ALTER TABLE customers RENAME COLUMN country TO country_code;    -- breaks old code
ALTER TABLE customers DROP COLUMN phone;                        -- irreversible

-- Add a constraint without locking the table for hours (Postgres)
ALTER TABLE orders ADD CONSTRAINT total_sane CHECK (total < 1000000) NOT VALID;
ALTER TABLE orders VALIDATE CONSTRAINT total_sane;

-- Useful column types
--   BIGSERIAL / IDENTITY   auto-incrementing keys
--   UUID                   keys generated by the client
--   NUMERIC(12,2)          money. NEVER use FLOAT for money.
--   TIMESTAMPTZ            an instant. Store UTC, format on display.
--   TEXT                   strings (no reason to guess a VARCHAR length)
--   JSONB                  semi-structured data you also want to query
--   BOOLEAN                a flag; NOT NULL DEFAULT FALSE

-- Soft deletes keep history but every query must now filter
ALTER TABLE customers ADD COLUMN deleted_at TIMESTAMPTZ;
CREATE INDEX idx_customers_active ON customers(id) WHERE deleted_at IS NULL;`,
        },
        {
          type: 'warning',
          content: 'Never store money in FLOAT or DOUBLE. 0.1 + 0.2 is not 0.3 in binary floating point, and the cents drift as they accumulate. Use NUMERIC/DECIMAL, or store integer cents.',
        },
        {
          type: 'tip',
          content: 'Write migrations as small, forward-only, reviewable steps, and test each one against a copy of production data. "Add column, backfill, start writing, start reading, drop the old column" is five deploys — and it never takes the site down.',
        },
      ],
    },
    {
      slug: 'query-performance',
      title: 'Query Performance & EXPLAIN',
      intro: 'A query that returns in 5 ms on your laptop can take 30 seconds on production data. EXPLAIN shows you what the database actually plans to do — the difference between guessing and knowing.',
      sections: [
        {
          type: 'code',
          language: 'sql',
          content: `-- EXPLAIN shows the plan; ANALYZE actually runs it and reports real timings.
EXPLAIN ANALYZE
SELECT c.name, COUNT(o.id) AS orders
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE c.country_code = 'PT'
GROUP BY c.name;

-- What to look for in the output:
--
--   Seq Scan on orders          -> reading EVERY row. Fine on 500 rows,
--                                  a red flag on 50 million.
--   Index Scan using idx_...    -> using an index. Usually what you want.
--   Bitmap Heap Scan            -> index found many rows, then fetched them.
--   Nested Loop                 -> good for small inputs, terrible for large ones.
--   Hash Join / Merge Join      -> the usual choice for big joins.
--   rows=1000 ... actual rows=2000000
--                               -> the estimate is way off; run ANALYZE on the
--                                  table so the planner has fresh statistics.
--   Rows Removed by Filter      -> work done and thrown away: index the filter.`,
        },
        {
          type: 'code',
          language: 'sql',
          content: `-- Index the columns you filter, join and sort on.
CREATE INDEX idx_orders_customer   ON orders(customer_id);
CREATE INDEX idx_orders_created    ON orders(created_at DESC);

-- Composite index: order matters. This serves
--   WHERE customer_id = ?
--   WHERE customer_id = ? AND status = ?
--   WHERE customer_id = ? AND status = ? ORDER BY created_at DESC
-- but NOT a query filtering only on status.
CREATE INDEX idx_orders_lookup ON orders(customer_id, status, created_at DESC);

-- Partial index: smaller and faster when you always filter the same way
CREATE INDEX idx_orders_pending ON orders(created_at)
WHERE status = 'pending';

-- Covering index: the query is answered from the index alone (an "index-only scan")
CREATE INDEX idx_orders_covering ON orders(customer_id) INCLUDE (total, status);

-- Indexes are not free: every INSERT, UPDATE and DELETE has to maintain them,
-- and they take disk space. Find the ones nobody uses:
SELECT relname, indexrelname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY relname;`,
        },
        {
          type: 'code',
          language: 'sql',
          content: `-- Patterns that silently disable an index:

-- BAD: a function on the indexed column
SELECT * FROM users WHERE LOWER(email) = 'ada@example.com';
-- FIX: index the expression instead
CREATE INDEX idx_users_email_lower ON users(LOWER(email));

-- BAD: leading wildcard cannot use a normal B-tree index
SELECT * FROM products WHERE name LIKE '%phone%';
-- FIX: a trigram index or a full-text search column
CREATE INDEX idx_products_name_trgm ON products USING GIN (name gin_trgm_ops);

-- BAD: arithmetic on the column
SELECT * FROM orders WHERE total * 1.23 > 100;
-- FIX: move the maths to the other side
SELECT * FROM orders WHERE total > 100 / 1.23;

-- BAD: SELECT * when you need two columns — more I/O, no index-only scan
SELECT * FROM orders WHERE customer_id = 42;
SELECT id, total FROM orders WHERE customer_id = 42;   -- better

-- BAD: OFFSET paging deep into a large table (it still reads every skipped row)
SELECT * FROM orders ORDER BY id LIMIT 20 OFFSET 100000;
-- FIX: keyset pagination
SELECT * FROM orders WHERE id > 100000 ORDER BY id LIMIT 20;`,
        },
        {
          type: 'warning',
          content: 'The N+1 query problem is the most common performance bug in application code: fetch 100 orders, then loop and fetch each customer separately. That is 101 round trips. One JOIN, or one WHERE id IN (...), replaces all of them.',
        },
        {
          type: 'note',
          content: 'Optimize with real data volumes. A sequential scan over 1000 rows is faster than an index lookup, so the planner is right to choose it — and a query tuned against an empty test database teaches you nothing.',
        },
      ],
    },
  ],
}
