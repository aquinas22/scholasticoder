import type { Quaestio } from './types'

/**
 * Common questions for the JavaScript, TypeScript and SQL paths, one per lesson:
 * misconceptions with replies, a source note, and the answer.
 */
export const quaestionesWeb: Record<string, Record<string, Quaestio>> = {
  javascript: {
    'variables': {
      question: 'Are var, let and const just three names for the same thing?',
      objections: [
        { claim: 'All three declare a variable, so which one I use is only a matter of taste.', reply: 'They differ in scope and in whether you can reassign them. var is scoped to the whole function and hoisted; let and const are scoped to the nearest block; const also forbids reassignment. The choice changes what the program does, as the loop-and-timeout bug shows.', code: "for (var i = 0; i < 3; i++) setTimeout(() => console.log(i))   // 3 3 3\nfor (let j = 0; j < 3; j++) setTimeout(() => console.log(j))   // 0 1 2", language: 'javascript' },
        { claim: 'const makes an object immutable.', reply: 'const locks the binding, not the value. You can still push to a const array or change properties on a const object. Object.freeze is the tool for freezing the value itself.' },
        { claim: 'Since JavaScript converts types automatically, "5" + 3 and "5" - 3 behave the same way.', reply: 'They do not. + joins strings when either side is a string ("53"), while - has no string meaning and converts both sides to numbers (2). Type conversion follows rules, and the rules differ by operator. Convert explicitly and compare with ===.' },
      ],
      sedContra: 'ECMAScript 2015 added let and const because var\'s scoping rules had been a steady source of bugs.',
      respondeo: [
        'A declaration creates a name with a scope and a rule about reassignment. const is the default: the name is bound once, inside its block. let is for the few names that need to change, like counters. var is a leftover with function-wide scope and hoisting; you only need it for code that must run on very old engines.',
        'Alongside this is JavaScript\'s loose typing: operators convert values by rules that are consistent but surprising. Convert explicitly with Number, String and Boolean, use === instead of ==, and let your declarations show what changes and what does not.',
      ],
    },
    'functions': {
      question: 'Is an arrow function just a shorter way to write function?',
      objections: [
        { claim: 'Arrow functions are just shorthand; the two forms are interchangeable.', reply: 'An arrow function has no this of its own, no arguments object, and cannot be used as a constructor. It takes this from where it was written. That is why arrows are right for callbacks inside methods and wrong for the methods themselves.', code: "const timer = {\n  ticks: 0,\n  start() {\n    setTimeout(() => this.ticks++, 10)          // this is timer\n    setTimeout(function () { this.ticks++ }, 10) // this is not\n  },\n}", language: 'javascript' },
        { claim: 'A function has to be declared before the line that calls it.', reply: 'Function declarations are hoisted: the whole function is available from the top of its scope. Function expressions assigned to const are not, so calling one before its line throws an error.' },
        { claim: 'Functions can\'t be stored in variables or passed around like numbers.', reply: 'Functions are values. You can assign them, pass them as arguments, return them from other functions, and store them in arrays and objects. Most of JavaScript (event handlers, array methods, promises) is built on passing functions around.' },
      ],
      sedContra: 'The ECMAScript specification gives arrow functions a "lexical this", a deliberate difference from ordinary functions rather than an abbreviation of them.',
      respondeo: [
        'JavaScript has function declarations, function expressions and arrow functions. All of them create callable values, and "values" is the key word: a function can be passed to another function, which is how map, filter, setTimeout and addEventListener work. Arrow functions add a compact syntax and borrow this from their surroundings, which makes them the natural choice for callbacks.',
        'Use declarations or method syntax for functions that need their own this or a hoisted name; use arrows for anything passed inline. Give parameters defaults, collect extras with rest parameters, and remember that a function without return gives back undefined.',
      ],
    },
    'async': {
      question: 'Does await pause the whole program?',
      objections: [
        { claim: 'await waits, and while it\'s waiting nothing else can happen.', reply: 'await pauses only the async function it appears in and hands control back to the event loop. Timers fire, clicks get handled and other async functions keep going. The program as a whole never blocks.' },
        { claim: 'A promise is a value that arrives later, so once it resolves I can read the value straight from it.', reply: 'A promise is an object, and it never turns into the value. You get the value with await or with .then. Logging a resolved promise prints Promise { ... }, not the result.' },
        { claim: 'Awaiting three fetches one after another is as fast as starting all three at once.', reply: 'Awaiting them one by one adds up their times. Starting all three first and then awaiting Promise.all overlaps the waiting, so the total is the slowest one, not the sum.', code: "const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()])   // overlapped", language: 'javascript' },
      ],
      sedContra: 'JavaScript runs on a single thread with an event loop. The language has no blocking waits, and await is defined in terms of that loop.',
      respondeo: [
        'A promise stands for a result that will exist later. async functions return promises, and await inside them pauses the function until a promise settles, letting the thread run whatever else is ready. That is how one thread handles many slow operations: none of them holds the thread while it waits.',
        'Start independent operations before awaiting any of them, and combine them with Promise.all or allSettled. Wrap awaits in try/catch to handle rejections. Never expect a promise to become its value; await it. And keep the synchronous parts short, because a long computation does block, promise or not.',
      ],
    },
    'closures-scope': {
      question: 'Does a variable disappear when its function returns?',
      objections: [
        { claim: 'Local variables live in the function\'s stack frame and vanish when it returns.', reply: 'If an inner function that uses the variable survives (returned, stored, passed to setTimeout), the variable survives with it. The inner function "closes over" the variable, and together they form a closure.', code: "function makeCounter() {\n  let count = 0\n  return () => ++count   // count lives on inside this arrow\n}\nconst next = makeCounter()\nnext(); next()   // 2", language: 'javascript' },
        { claim: 'A closure captures the value a variable had when the closure was created.', reply: 'It captures the variable itself. If the variable changes later, the closure sees the new value. That is why three timeouts sharing one var i all print the final i, and why let, which makes a fresh binding each iteration, fixes it.' },
        { claim: 'Block scope and function scope are the same thing.', reply: 'A block is anything in braces: an if body, a loop body. let and const live in the nearest block; var ignores blocks and belongs to the whole function.' },
      ],
      sedContra: 'The ECMAScript specification gives every function a reference to the environment it was created in. Closures are not an add-on; they are how JavaScript functions work.',
      respondeo: [
        'Scope is the part of the code where a name is visible: global, function or block. A closure is a function together with the scope it was created in; when you call it later, it can still read and write those variables. That is what gives JavaScript private state without classes, callbacks that remember their context, and the module pattern.',
        'Prefer let and const so each block and each loop iteration gets its own bindings. When a callback needs to remember something, let it close over a variable instead of using a global. And if several closures share a variable by accident, expect them to see each other\'s changes.',
      ],
    },
    'this-and-prototypes': {
      question: 'Does "this" refer to the function it\'s written in?',
      objections: [
        { claim: 'this means the current function, or the object the function was written in.', reply: 'this is decided by how the function is called, not where it was written. obj.method() sets this to obj; a plain call sets it to undefined in strict mode; a callback passed to setTimeout loses the object entirely. Arrow functions are the exception: they take this from their surroundings.' },
        { claim: 'A class copies its methods into every instance.', reply: 'Methods live once, on Class.prototype, and instances look them up through the prototype chain. That is why instance.method === Class.prototype.method, and why changing the prototype affects every instance.', code: "class Bell { ring() { return 'dong' } }\nconst a = new Bell(), b = new Bell()\nconsole.log(a.ring === b.ring)   // true — one function, shared", language: 'javascript' },
        { claim: 'bind, call and apply are obscure and never needed.', reply: 'They are the explicit way to choose this. bind fixes it permanently, which rescues methods passed as callbacks; call and apply set it for a single call.' },
      ],
      sedContra: 'The ECMAScript specification sets this fresh on each call, based on how the call is written. The definition mentions no class and no place of writing.',
      respondeo: [
        'JavaScript objects fall back on other objects: when a property is missing, the lookup follows the prototype chain. class syntax builds these chains and puts methods on the prototype so every instance shares them. this is the object a method was called on, worked out at each call, which is why a method pulled off its object and passed somewhere else forgets who it belonged to.',
        'Keep this predictable: call methods on their objects, use arrow functions for callbacks that need the surrounding this, and bind when you have to pass a method as a value. Learn the prototype chain, and instanceof, inheritance and the odd behaviour of borrowed methods stop being mysteries.',
      ],
    },
    'error-handling-advanced': {
      question: 'Does catching every error make a program robust?',
      objections: [
        { claim: 'Wrapping everything in try/catch prevents crashes, and a program that never crashes is robust.', reply: 'A program that never crashes but quietly carries on with bad state is not robust; it is misleading. Catch what you can actually handle (a missing file, a bad response) and let programming errors fail loudly so they get fixed.' },
        { claim: 'try/catch around an async call catches errors from the promise.', reply: 'Only if the call is awaited inside the try. A rejected promise that is not awaited escapes the try block and becomes an unhandled rejection. Either await it or attach .catch.', code: "try {\n  await mightFail()       // caught\n} catch (e) { /* ... */ }\n\ntry {\n  mightFail()             // not awaited: rejection escapes\n} catch (e) { /* never runs for the rejection */ }", language: 'javascript' },
        { claim: 'Throwing strings is fine, because catch receives whatever was thrown.', reply: 'A thrown string has no stack trace, no name and no type to check with instanceof. Throw Error objects, or subclasses that carry the information a handler needs.' },
      ],
      sedContra: 'An error that is caught and ignored has not been handled, only hidden. The Node.js documentation lists swallowing errors among "the most common mistakes".',
      respondeo: [
        'Errors in JavaScript are objects with a name, a message and a stack. throw raises one; try/catch/finally handles it; async errors travel as rejected promises and have to be awaited or caught with .catch. Your own subclasses of Error let handlers tell "the user typed a bad date" apart from "the database is down".',
        'Handle errors at the level that can do something about them, log or rethrow the rest, and never leave a catch block empty. Read stack traces from the top frame down, use the debugger and breakpoints for tangled state, and once you find the failing case, write it as a test.',
      ],
    },
  },
  typescript: {
    'basic-types': {
      question: 'Does TypeScript make my program safer at run time?',
      objections: [
        { claim: 'A TypeScript program won\'t run if it has a type error, so runtime failures are impossible.', reply: 'tsc reports the error and, by default, still outputs JavaScript, which runs. Even with strict settings, the types are removed before the code runs. The safety comes from fixing what the compiler reports before you ship, not from the runtime.' },
        { claim: 'Annotating a parameter as number guarantees a number arrives.', reply: 'It guarantees that callers checked by TypeScript pass a number. Data from JSON, user input or untyped JavaScript is whatever it is. Validate at the edges; trust the types inside.' },
        { claim: 'any is a harmless escape hatch for when the types get awkward.', reply: 'any turns checking off for everything it touches, and it spreads through assignments. Prefer unknown, which makes you narrow the type before using it, or fix the awkward type.' },
      ],
      sedContra: 'The TypeScript handbook: "TypeScript\'s type system is erased at compile time. It does not add runtime checks."',
      respondeo: [
        'TypeScript is JavaScript with a static type system on top. Annotations describe the shapes you intend values to have; the compiler checks that the program uses them consistently, then strips them out and outputs plain JavaScript. The benefit is that whole categories of mistakes (a misspelled property, a string where a number was meant) are caught while you edit rather than in production.',
        'Turn on strict mode, annotate function signatures, let inference handle local variables, and use unknown for data that has not been checked yet. At the edges of the program (network, storage, user input) validate and convert, because that is where the compiler cannot see.',
      ],
    },
    'generics': {
      question: 'Do I need generics when any exists?',
      objections: [
        { claim: 'A function that takes any handles every type, which is all generics do.', reply: 'any accepts every type and forgets it: firstOr(items: any[], fallback: any) returns any, so the caller loses track of what came back. A generic firstOr<T> accepts every type and remembers it: pass numbers, get a number.', code: "function firstOr<T>(items: T[], fallback: T): T {\n  return items.length ? items[0] : fallback\n}\nconst n = firstOr([1, 2], 0)        // n: number\nconst s = firstOr([], 'none')       // s: string", language: 'typescript' },
        { claim: 'A generic type parameter is a runtime value the function can inspect.', reply: 'Type parameters exist only at compile time. The function cannot test what T is; it can only use T consistently. Decisions at run time still need typeof or a tag field.' },
        { claim: 'Generics are for library authors and too abstract for app code.', reply: 'Any function that returns something related to what it received (the first element, a wrapped value, a cached result) is generic. Writing it with a type parameter keeps callers typed without repeating yourself.' },
      ],
      sedContra: 'Array<T>, Promise<T> and Map<K, V> are all generic. If you use them, you already rely on generics every day.',
      respondeo: [
        'A generic is a function, class or type that takes types as parameters, so one definition works for many types without losing precision. Stack<T> is a stack of whatever the caller picks, and the compiler tracks that choice through every push and pop. Constraints (T extends Something) let the generic rely on what T can do while staying open.',
        'Reach for a type parameter whenever a value goes in and a related value comes out. Give parameters meaningful names when there are several, constrain them when you need a property, and let inference pick T at the call site so callers rarely write the angle brackets themselves.',
      ],
    },
  },
  sql: {
    'tables-and-select': {
      question: 'Are the rows in a table stored in order?',
      objections: [
        { claim: 'Rows come back in the order they were inserted, so SELECT returns them in that order.', reply: 'A table is a set of rows, and the database can store and return them in whatever order is convenient. After an UPDATE, a VACUUM or a change of query plan, the order may change. Only ORDER BY guarantees an order.' },
        { claim: 'A query returns the whole table, and filtering happens afterwards in the application.', reply: 'WHERE filters inside the database, before rows are sent, and with an index it can skip reading the unwanted rows entirely. Filtering in the application sends every row across the network just to throw most of them away.' },
        { claim: 'SELECT * is fine in production code because it saves listing columns.', reply: 'It ties the program to the table\'s current shape: add a column and the row layout changes; drop one and the program breaks. Naming the columns you need documents the query and lets the database read less.' },
      ],
      sedContra: 'Codd\'s relational model defines a relation as a set of tuples, and sets have no order.',
      respondeo: [
        'A relational table is an unordered collection of rows, each with the same named, typed columns. SELECT says which columns you want and WHERE says which rows; the database decides how to find them. That declarative style is the point of SQL: you describe the result and the engine plans the work.',
        'Say exactly what you need. Name columns instead of using *, filter with WHERE instead of in code, and add ORDER BY whenever order matters, because without it the order is an accident that will change one day.',
      ],
    },
    'aggregates': {
      question: 'Can a column be in SELECT without being in GROUP BY?',
      objections: [
        { claim: 'SELECT name, AVG(grade) FROM students GROUP BY age should work and show each group\'s name.', reply: 'A group of several rows has several names, and the database cannot know which one you mean. Every selected column must either be in GROUP BY or wrapped in an aggregate that reduces the group to one value. Some engines allow the query and return an arbitrary name, which is worse than an error.' },
        { claim: 'WHERE can filter on an aggregate, as in WHERE COUNT(*) > 1.', reply: 'WHERE runs before grouping, when no aggregates exist yet. HAVING runs after and can see them. Both can appear in one query: WHERE trims rows, HAVING trims groups.', code: "SELECT age, AVG(grade) AS avg_grade\nFROM students\nWHERE grade IS NOT NULL\nGROUP BY age\nHAVING COUNT(*) > 1;", language: 'sql' },
        { claim: 'COUNT(*) and COUNT(email) are the same.', reply: 'COUNT(*) counts rows; COUNT(email) counts rows where email is not NULL. Every aggregate except COUNT(*) skips NULLs, which is why AVG over a column with gaps averages only the values that are there.' },
      ],
      sedContra: 'The SQL standard requires every non-aggregated column in the select list to be functionally dependent on the grouping columns.',
      respondeo: [
        'Aggregation squashes many rows into one. Without GROUP BY, the whole result becomes a single row; with it, each distinct combination of the grouping columns becomes one output row, and aggregates like COUNT, SUM and AVG summarise the rows inside. The rule that every selected column must be grouped or aggregated follows directly: one output row cannot hold several different values.',
        'Read a grouping query in the order it runs (FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY) and put each condition at the step where its inputs exist. Remember that aggregates skip NULLs, and only COUNT(*) counts them.',
      ],
    },
    'joins': {
      question: 'Should I split data across tables at all?',
      objections: [
        { claim: 'One wide table with every fact is simpler than several joined tables.', reply: 'It repeats every customer\'s details on every order. Change an email and you have to change it everywhere; two rows can disagree; a customer with no orders cannot exist. Normalisation stores each fact once, and JOIN puts together the view you need.' },
        { claim: 'A JOIN returns rows from both tables whether or not they match.', reply: 'An INNER JOIN, the default, returns only matching pairs. LEFT JOIN keeps every row of the left table and fills the right side with NULLs where nothing matched; that is how you find students with no enrollments.', code: "SELECT s.name\nFROM students s\nLEFT JOIN enrollments e ON e.student_id = s.id\nWHERE e.student_id IS NULL;", language: 'sql' },
        { claim: 'Joining on the wrong column gives an error.', reply: 'It gives a result, often a huge one with every row paired with every other row, and no error at all. The join condition is something you promise; the database takes it literally.' },
      ],
      sedContra: 'Codd\'s normal forms exist because repeated facts drift apart. The relational model stores each fact once and combines them when you ask.',
      respondeo: [
        'A JOIN combines rows from two tables where a condition holds, almost always a foreign key in one matching a primary key in the other. It is what makes splitting data into tables practical: each thing lives in one place, and queries stitch the pieces back together as needed. INNER JOIN keeps matches; LEFT JOIN keeps everything on one side, and the NULLs it produces are how "no match" shows up.',
        'Give tables short aliases, join on keys, and check the row count of a new join against what you expect. An unexpected jump in rows means the condition is wrong. When you need "rows with no match", think LEFT JOIN with IS NULL, or NOT EXISTS.',
      ],
    },
    'transactions': {
      question: 'Can I trust a single statement to keep the database consistent?',
      objections: [
        { claim: 'Each statement either succeeds or fails, so consistency is automatic.', reply: 'Each statement is all-or-nothing on its own, but a transfer is two statements. If the second fails, the first has already happened and money has vanished. Only a transaction makes the pair all-or-nothing.', code: "BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;   -- both, or neither", language: 'sql' },
        { claim: 'Transactions are only for banks.', reply: 'Any change that touches more than one row or table, like creating an order and its items or moving a file record and its permissions, has the same shape. Transactions are for every multi-step change.' },
        { claim: 'Building a query by pasting user input into the SQL string is fine if the input looks harmless.', reply: 'Input only has to look harmless until someone crafts it. Parameterised queries send values separately from the SQL text, so input can never turn into SQL. This is the one rule with no exceptions.' },
      ],
      sedContra: 'ACID (atomicity, consistency, isolation, durability) is the guarantee a relational database makes, and it applies per transaction.',
      respondeo: [
        'A transaction groups statements so they take effect together or not at all. BEGIN starts it; COMMIT makes the changes permanent; ROLLBACK throws them away. In between, the database also keeps your work separate from other users, so a report never sees half a transfer.',
        'Wrap every multi-step change in a transaction, keep transactions short so they do not hold locks for long, and let the database enforce constraints (NOT NULL, CHECK, foreign keys) so a bug in the application cannot save nonsense. And always pass values as parameters, no exceptions.',
      ],
    },
  },
}
