import type { Section } from './types'

/**
 * Graded SQL practice, merged into the SQL lessons at load time. Each check is a SQL query that
 * must return a truthy single value. The learner's last result set is available as the temp
 * table _result; the sample tables are defined in src/lib/sql-seed.ts.
 */
export const sqlPractice: Record<string, Section[]> = {
  'tables-and-select': [
    {
      type: 'exercise',
      language: 'sql',
      content: 'Write a query that returns the name and grade of every student who is 17 years old.',
      exercise: {
        title: 'Filter by age',
        starter: `SELECT * FROM students;\n`,
        solution: `SELECT name, grade FROM students WHERE age = 17;\n`,
        hints: ['List the two columns after SELECT.', 'WHERE age = 17 keeps only matching rows.'],
        tests: [
          { name: 'Returns 3 rows', check: `SELECT (SELECT COUNT(*) FROM _result) = 3` },
          { name: 'Has name and grade columns', check: `SELECT COUNT(name) >= 0 AND COUNT(grade) >= 0 FROM _result` },
          { name: 'Every row is a 17-year-old', check: `SELECT NOT EXISTS (SELECT 1 FROM _result r JOIN students s ON s.name = r.name WHERE s.age <> 17)` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'sql',
      content: 'Return the names of students whose name starts with A or whose grade is 90 or higher.',
      exercise: {
        title: 'LIKE and OR',
        starter: `SELECT name FROM students WHERE ...;\n`,
        solution: `SELECT name FROM students WHERE name LIKE 'A%' OR grade >= 90;\n`,
        hints: ["LIKE 'A%' matches names beginning with A.", 'Combine the two conditions with OR.'],
        tests: [
          { name: 'Returns 4 names', check: `SELECT (SELECT COUNT(*) FROM _result) = 4` },
          { name: 'Includes Alan and Margaret', check: `SELECT EXISTS (SELECT 1 FROM _result WHERE name = 'Alan') AND EXISTS (SELECT 1 FROM _result WHERE name = 'Margaret')` },
          { name: 'Excludes Linus', check: `SELECT NOT EXISTS (SELECT 1 FROM _result WHERE name = 'Linus')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: "Which of these is a valid string literal in standard SQL?",
      quiz: {
        choices: [
          { text: "'Ada'", correct: true, explanation: "Single quotes delimit strings. Double quotes delimit identifiers (column and table names), so \"Ada\" would look for a column called Ada." },
          { text: '"Ada"', explanation: 'Double quotes mean an identifier in standard SQL. Some databases tolerate it, which is how bugs sneak in.' },
          { text: '`Ada`', explanation: 'Backticks are a MySQL identifier quote, not a string.' },
        ],
      },
    },
  ],

  'creating-data': [
    {
      type: 'exercise',
      language: 'sql',
      content: 'Three changes in order: insert a new student named Hypatia, age 17, grade 97; set Ken\'s grade to 70; then delete every student younger than 16.',
      exercise: {
        title: 'Insert, update, delete',
        starter: `-- 1. INSERT Hypatia\n\n-- 2. UPDATE Ken\n\n-- 3. DELETE students under 16\n\nSELECT * FROM students;\n`,
        solution: `INSERT INTO students (name, age, grade) VALUES ('Hypatia', 17, 97);\nUPDATE students SET grade = 70 WHERE name = 'Ken';\nDELETE FROM students WHERE age < 16;\n\nSELECT * FROM students;\n`,
        hints: ['INSERT INTO students (name, age, grade) VALUES (...);', 'UPDATE students SET grade = 70 WHERE name = \'Ken\';', 'DELETE FROM students WHERE age < 16;'],
        tests: [
          { name: 'Hypatia exists with grade 97', check: `SELECT EXISTS (SELECT 1 FROM students WHERE name = 'Hypatia' AND age = 17 AND grade = 97)` },
          { name: "Ken's grade is 70", check: `SELECT (SELECT grade FROM students WHERE name = 'Ken') = 70` },
          { name: 'No students under 16 remain', check: `SELECT NOT EXISTS (SELECT 1 FROM students WHERE age < 16)` },
          { name: 'Nobody else was deleted', check: `SELECT (SELECT COUNT(*) FROM students) = 8` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What does DELETE FROM students; do?',
      quiz: {
        choices: [
          { text: 'Deletes every row in the table, immediately', correct: true, explanation: 'No WHERE means all rows. Write the WHERE clause first, and preview it with a SELECT.' },
          { text: 'Deletes the table itself', explanation: 'That is DROP TABLE students;. DELETE removes rows and leaves the table.' },
          { text: 'Asks for confirmation', explanation: 'SQL never asks. Transactions are your safety net.' },
        ],
      },
    },
  ],

  'sorting-and-limiting': [
    {
      type: 'exercise',
      language: 'sql',
      content: 'Return the name and grade of the three highest-graded students, best first.',
      exercise: {
        title: 'Top three',
        starter: `SELECT name, grade FROM students;\n`,
        solution: `SELECT name, grade FROM students ORDER BY grade DESC LIMIT 3;\n`,
        hints: ['ORDER BY grade DESC puts the highest first.', 'LIMIT 3 keeps only three rows.'],
        tests: [
          { name: 'Exactly 3 rows', check: `SELECT (SELECT COUNT(*) FROM _result) = 3` },
          { name: 'Ada is first', check: `SELECT (SELECT name FROM _result ORDER BY rowid LIMIT 1) = 'Ada'` },
          { name: 'Margaret is third', check: `SELECT (SELECT name FROM _result ORDER BY rowid LIMIT 1 OFFSET 2) = 'Margaret'` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'sql',
      content: 'List each distinct age that appears in the students table, smallest first, as a single column called age.',
      exercise: {
        title: 'Distinct ages',
        starter: `SELECT age FROM students;\n`,
        solution: `SELECT DISTINCT age FROM students ORDER BY age;\n`,
        hints: ['DISTINCT removes repeated rows.', 'ORDER BY age sorts ascending by default.'],
        tests: [
          { name: 'Four distinct ages', check: `SELECT (SELECT COUNT(*) FROM _result) = 4 AND (SELECT COUNT(DISTINCT age) FROM _result) = 4` },
          { name: 'Sorted ascending', check: `SELECT (SELECT age FROM _result ORDER BY rowid LIMIT 1) = 15 AND (SELECT age FROM _result ORDER BY rowid DESC LIMIT 1) = 18` },
        ],
      },
    },
  ],

  'aggregates': [
    {
      type: 'exercise',
      language: 'sql',
      content: 'For each age that has more than one student, show the age and the average grade as avg_grade.',
      exercise: {
        title: 'Group and filter groups',
        starter: `SELECT age, AVG(grade) AS avg_grade\nFROM students\nGROUP BY age;\n`,
        solution: `SELECT age, AVG(grade) AS avg_grade\nFROM students\nGROUP BY age\nHAVING COUNT(*) > 1;\n`,
        hints: ['Filter groups with HAVING, not WHERE.', 'HAVING COUNT(*) > 1 keeps ages with at least two students.'],
        tests: [
          { name: 'Three age groups', check: `SELECT (SELECT COUNT(*) FROM _result) = 3` },
          { name: 'Age 15 (one student) is excluded', check: `SELECT NOT EXISTS (SELECT 1 FROM _result WHERE age = 15)` },
          { name: 'Average for 18-year-olds is 72.5', check: `SELECT ABS((SELECT avg_grade FROM _result WHERE age = 18) - 72.5) < 0.01` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'sql',
      content: 'How much has each customer spent? Return customer_id and total_spent (the sum of order totals), largest first. Only count orders that are not cancelled.',
      exercise: {
        title: 'Sum per customer',
        starter: `SELECT customer_id, ... FROM orders\n`,
        solution: `SELECT customer_id, SUM(total) AS total_spent\nFROM orders\nWHERE status <> 'cancelled'\nGROUP BY customer_id\nORDER BY total_spent DESC;\n`,
        hints: ['WHERE filters rows before grouping; use it to drop cancelled orders.', 'SUM(total) AS total_spent, then GROUP BY customer_id.'],
        tests: [
          { name: 'Five customers have orders', check: `SELECT (SELECT COUNT(*) FROM _result) = 5` },
          { name: 'Customer 1 spent 1405', check: `SELECT ABS((SELECT total_spent FROM _result WHERE customer_id = 1) - 1405) < 0.01` },
          { name: 'Cancelled order excluded (customer 5 = 72)', check: `SELECT ABS((SELECT total_spent FROM _result WHERE customer_id = 5) - 72) < 0.01` },
          { name: 'Largest first', check: `SELECT (SELECT customer_id FROM _result ORDER BY rowid LIMIT 1) = 1` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'Why does WHERE AVG(grade) > 85 fail?',
      quiz: {
        choices: [
          { text: 'WHERE runs before grouping, so aggregates do not exist yet; use HAVING', correct: true, explanation: 'Execution order: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT.' },
          { text: 'AVG only works in ORDER BY', explanation: 'AVG works anywhere aggregates are allowed: SELECT, HAVING, ORDER BY.' },
          { text: '85 must be quoted', explanation: 'Numbers are never quoted in SQL.' },
        ],
      },
    },
  ],

  'joins': [
    {
      type: 'exercise',
      language: 'sql',
      content: 'Produce one row per enrollment with the columns student, course and score, joining the three tables. Students who are not enrolled in anything must not appear.',
      exercise: {
        title: 'Three-table join',
        starter: `SELECT ...\nFROM enrollments e\n`,
        solution: `SELECT s.name AS student, c.name AS course, e.score\nFROM enrollments e\nJOIN students s ON s.id = e.student_id\nJOIN courses c ON c.id = e.course_id;\n`,
        hints: ['Join students on students.id = enrollments.student_id and courses likewise.', 'Alias the columns: s.name AS student, c.name AS course.'],
        tests: [
          { name: 'Ten enrollments', check: `SELECT (SELECT COUNT(*) FROM _result) = 10` },
          { name: 'Ada scored 98 in Algorithms', check: `SELECT EXISTS (SELECT 1 FROM _result WHERE student = 'Ada' AND course = 'Algorithms' AND score = 98)` },
          { name: 'Dennis (not enrolled) is absent', check: `SELECT NOT EXISTS (SELECT 1 FROM _result WHERE student = 'Dennis')` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'sql',
      content: 'Find the students who are not enrolled in any course. Return just their names.',
      exercise: {
        title: 'The anti-join',
        starter: `SELECT s.name\nFROM students s\n`,
        solution: `SELECT s.name\nFROM students s\nLEFT JOIN enrollments e ON e.student_id = s.id\nWHERE e.student_id IS NULL;\n`,
        hints: ['LEFT JOIN keeps every student, with NULLs where there is no enrollment.', 'Then keep only the rows where the enrollment side IS NULL.'],
        tests: [
          { name: 'Three students', check: `SELECT (SELECT COUNT(*) FROM _result) = 3` },
          { name: 'Dennis, Ken and Margaret', check: `SELECT EXISTS (SELECT 1 FROM _result WHERE name = 'Dennis') AND EXISTS (SELECT 1 FROM _result WHERE name = 'Ken') AND EXISTS (SELECT 1 FROM _result WHERE name = 'Margaret')` },
          { name: 'Enrolled students are excluded', check: `SELECT NOT EXISTS (SELECT 1 FROM _result WHERE name IN ('Ada', 'Alan'))` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'A LEFT JOIN between students and enrollments returns…',
      quiz: {
        choices: [
          { text: 'Every student, with NULL enrollment columns for students who have none', correct: true, explanation: 'The left table is preserved. An INNER JOIN would drop the unmatched students.' },
          { text: 'Only students with at least one enrollment', explanation: 'That is the INNER JOIN.' },
          { text: 'Every enrollment, even ones with no student', explanation: 'That would be a RIGHT JOIN (or swapping the tables).' },
        ],
      },
    },
  ],

  'indexes-and-keys': [
    {
      type: 'exercise',
      language: 'sql',
      content: 'The orders table is queried by customer_id constantly. Create an index named idx_orders_customer on that column, then look at the query plan for a lookup by customer.',
      exercise: {
        title: 'Create an index',
        starter: `-- create the index\n\nEXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id = 2;\n`,
        solution: `CREATE INDEX idx_orders_customer ON orders(customer_id);\n\nEXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id = 2;\n`,
        hints: ['CREATE INDEX name ON table(column);', 'After creating it, the plan should say SEARCH ... USING INDEX.'],
        tests: [
          { name: 'Index exists on orders(customer_id)', check: `SELECT EXISTS (SELECT 1 FROM sqlite_master WHERE type = 'index' AND name = 'idx_orders_customer' AND tbl_name = 'orders')` },
          { name: 'The plan uses the index', check: `SELECT EXISTS (SELECT 1 FROM _result WHERE detail LIKE '%USING INDEX idx_orders_customer%')` },
        ],
      },
    },
  ],

  'transactions': [
    {
      type: 'exercise',
      language: 'sql',
      content: 'Move 100 from the Almonry account (id 1) to the Infirmary account (id 2) inside a single transaction, so both updates succeed or fail together.',
      exercise: {
        title: 'An atomic transfer',
        starter: `-- BEGIN, two UPDATEs, COMMIT\n\nSELECT * FROM accounts;\n`,
        solution: `BEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;\n\nSELECT * FROM accounts;\n`,
        hints: ['BEGIN TRANSACTION; ... COMMIT;', 'balance = balance - 100 subtracts from the current value.'],
        tests: [
          { name: 'Almonry has 400', check: `SELECT (SELECT balance FROM accounts WHERE id = 1) = 400` },
          { name: 'Infirmary has 350', check: `SELECT (SELECT balance FROM accounts WHERE id = 2) = 350` },
          { name: 'Money was conserved', check: `SELECT (SELECT SUM(balance) FROM accounts) = 1950` },
        ],
      },
    },
  ],

  'subqueries-and-ctes': [
    {
      type: 'exercise',
      language: 'sql',
      content: 'Return the names of customers who have placed at least one order with a total above 500. Use IN or EXISTS with a subquery, not a JOIN.',
      exercise: {
        title: 'Subquery filter',
        starter: `SELECT name FROM customers WHERE ...;\n`,
        solution: `SELECT name FROM customers\nWHERE id IN (SELECT customer_id FROM orders WHERE total > 500);\n`,
        hints: ['The inner query lists customer_ids with big orders.', 'WHERE id IN (...) keeps customers whose id appears in that list.'],
        tests: [
          { name: 'Four customers', check: `SELECT (SELECT COUNT(*) FROM _result) = 4` },
          { name: 'Includes Hildegard and Teresa, not Bede', check: `SELECT EXISTS (SELECT 1 FROM _result WHERE name = 'Hildegard') AND EXISTS (SELECT 1 FROM _result WHERE name = 'Teresa') AND NOT EXISTS (SELECT 1 FROM _result WHERE name = 'Bede')` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'sql',
      content: 'Using a CTE named customer_totals, compute each customer\'s total spending, then return name and total_spent for everyone who has spent more than 300, highest first.',
      exercise: {
        title: 'A CTE for readability',
        starter: `WITH customer_totals AS (\n  SELECT customer_id, SUM(total) AS total_spent\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT ...\n`,
        solution: `WITH customer_totals AS (\n  SELECT customer_id, SUM(total) AS total_spent\n  FROM orders\n  GROUP BY customer_id\n)\nSELECT c.name, t.total_spent\nFROM customer_totals t\nJOIN customers c ON c.id = t.customer_id\nWHERE t.total_spent > 300\nORDER BY t.total_spent DESC;\n`,
        hints: ['Join the CTE to customers to get names.', 'Filter with WHERE total_spent > 300 and sort DESC.'],
        tests: [
          { name: 'Four big spenders', check: `SELECT (SELECT COUNT(*) FROM _result) = 4` },
          { name: 'Hildegard first with 1405', check: `SELECT (SELECT name FROM _result ORDER BY rowid LIMIT 1) = 'Hildegard' AND ABS((SELECT total_spent FROM _result ORDER BY rowid LIMIT 1) - 1405) < 0.01` },
          { name: 'Catherine last with 599', check: `SELECT (SELECT name FROM _result ORDER BY rowid DESC LIMIT 1) = 'Catherine'` },
        ],
      },
    },
  ],

  'window-functions': [
    {
      type: 'exercise',
      language: 'sql',
      content: 'For every employee return name, department, salary and dept_rank: their rank within their department by salary, highest paid first.',
      exercise: {
        title: 'Rank within a partition',
        starter: `SELECT name, department, salary\nFROM employees;\n`,
        solution: `SELECT name, department, salary,\n       RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank\nFROM employees;\n`,
        hints: ['RANK() OVER (PARTITION BY department ORDER BY salary DESC)', 'Every original row stays in the output; that is what makes it a window, not a GROUP BY.'],
        tests: [
          { name: 'All 11 employees', check: `SELECT (SELECT COUNT(*) FROM _result) = 11` },
          { name: 'Sister Hild is first in engineering', check: `SELECT (SELECT dept_rank FROM _result WHERE name = 'Sister Hild') = 1` },
          { name: 'Brother Bede is third in engineering', check: `SELECT (SELECT dept_rank FROM _result WHERE name = 'Brother Bede') = 3` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'sql',
      content: 'From daily_sales return day, revenue and running_total: the cumulative revenue from the first day up to and including that day, in date order.',
      exercise: {
        title: 'Running total',
        starter: `SELECT day, revenue\nFROM daily_sales\nORDER BY day;\n`,
        solution: `SELECT day, revenue,\n       SUM(revenue) OVER (ORDER BY day ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total\nFROM daily_sales\nORDER BY day;\n`,
        hints: ['SUM(revenue) OVER (ORDER BY day ...)', 'The frame ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW is the running total.'],
        tests: [
          { name: 'Second day is 255', check: `SELECT (SELECT running_total FROM _result WHERE day = '2026-03-02') = 255` },
          { name: 'Last day is the grand total 2358', check: `SELECT (SELECT running_total FROM _result ORDER BY day DESC LIMIT 1) = 2358` },
          { name: 'All 14 days', check: `SELECT (SELECT COUNT(*) FROM _result) = 14` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'How does a window function differ from GROUP BY?',
      quiz: {
        choices: [
          { text: 'Window functions compute over a set of rows but keep every original row in the output', correct: true, explanation: 'GROUP BY collapses each group to one row. OVER (PARTITION BY ...) computes per group while leaving the rows intact.' },
          { text: 'Window functions are only for dates', explanation: 'They work on any ordering or partitioning.' },
          { text: 'There is no difference', explanation: 'The output shape is completely different.' },
        ],
      },
    },
  ],
}
