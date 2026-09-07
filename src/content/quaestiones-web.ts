import type { Quaestio } from './types'

/** Disputed questions for the JavaScript, TypeScript and SQL paths. */
export const quaestionesWeb: Record<string, Record<string, Quaestio>> = {
  javascript: {
    'variables': {
      question: 'Whether var, let and const are three names for the same thing?',
      objections: [
        { claim: 'all three declare a variable, so the choice is only a matter of taste.', reply: 'They differ in scope and in mutability. var is scoped to the whole function and hoisted; let and const are scoped to the nearest block; const additionally forbids reassignment. The choice changes what the program means, as the loop-and-timeout bug shows.', code: "for (var i = 0; i < 3; i++) setTimeout(() => console.log(i))   // 3 3 3\nfor (let j = 0; j < 3; j++) setTimeout(() => console.log(j))   // 0 1 2", language: 'javascript' },
        { claim: 'const makes an object immutable.', reply: 'const freezes the binding, not the value. A const array can still be pushed to; a const object can still have properties changed. Object.freeze is the tool for the value itself.' },
        { claim: 'since JavaScript converts types automatically, "5" + 3 and "5" - 3 behave alike.', reply: 'They do not: + concatenates when either side is a string ("53"), while - has no string meaning and converts both sides to numbers (2). Coercion follows rules, and the rules differ by operator. Convert explicitly and compare with ===.' },
      ],
      sedContra: 'ECMAScript 2015 introduced let and const precisely because var\'s scoping had proven a persistent source of bugs.',
      respondeo: [
        'A declaration introduces a name with a scope and a policy on reassignment. const is the default: the name is bound once, within its block. let is for the few names that must change, such as counters. var is a relic with function-wide scope and hoisting, and its only remaining use is in code that must run on very old engines.',
        'Alongside this sits JavaScript\'s weak typing: operators convert operands by rules that are consistent but surprising. Prefer explicit conversion with Number, String and Boolean, prefer === to ==, and let the declarations say what changes and what does not.',
      ],
    },
    'functions': {
      question: 'Whether an arrow function is just a shorter way to write function?',
      objections: [
        { claim: 'the arrow is syntactic sugar; the two forms are interchangeable.', reply: 'An arrow function has no this, no arguments object and cannot be used as a constructor. It takes this from where it was written. That difference is why arrows are right for callbacks inside methods and wrong for methods themselves.', code: "const timer = {\n  ticks: 0,\n  start() {\n    setTimeout(() => this.ticks++, 10)          // this is timer\n    setTimeout(function () { this.ticks++ }, 10) // this is not\n  },\n}", language: 'javascript' },
        { claim: 'a function must be declared before the line that calls it.', reply: 'Function declarations are hoisted: the whole function is available from the top of its scope. Function expressions assigned to const are not, so calling one before its line throws.' },
        { claim: 'functions cannot be stored in variables or passed around like numbers.', reply: 'Functions are values. They can be assigned, passed as arguments, returned from other functions and stored in arrays and objects. Most of JavaScript — event handlers, array methods, promises — is built on passing functions.' },
      ],
      sedContra: 'The specification describes arrow functions as having "lexical this", a deliberate difference from ordinary functions, not an abbreviation of them.',
      respondeo: [
        'JavaScript has function declarations, function expressions and arrow functions. All create callable values, and values is the important word: a function can be passed to another function, which is how map, filter, setTimeout and addEventListener work. Arrow functions add a compact syntax and lexical this, which makes them the natural choice for callbacks.',
        'Use declarations or method syntax for functions that need their own this or a hoisted name; use arrows for everything passed inline. Give parameters defaults, gather extras with rest parameters, and remember that a function without return yields undefined.',
      ],
    },
    'async': {
      question: 'Whether await pauses the whole program?',
      objections: [
        { claim: 'await waits, and while it waits nothing else can happen.', reply: 'await suspends only the async function it appears in and returns control to the event loop. Timers fire, clicks are handled and other async functions continue. The program as a whole never blocks.' },
        { claim: 'a promise is a value that arrives later, so reading it directly gives the value once it has resolved.', reply: 'A promise is an object; it never becomes the value. You obtain the value with await or with .then. Logging a resolved promise prints Promise { ... }, not the result.' },
        { claim: 'awaiting three fetches one after another is as fast as starting all three.', reply: 'Sequential awaits add their durations. Starting the three promises first and then awaiting Promise.all overlaps the waiting, so the total is the longest of them, not the sum.', code: "const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()])   // overlapped", language: 'javascript' },
      ],
      sedContra: 'JavaScript runs on a single thread with an event loop; the language\'s own design forbids blocking waits, and await is defined in terms of that loop.',
      respondeo: [
        'A promise represents a result that will exist later. async functions return promises, and await inside them suspends the function until a promise settles, handing the thread to whatever else is ready. This is how one thread serves many slow operations: none of them holds the thread while waiting.',
        'Start independent operations before awaiting any of them, and combine them with Promise.all or allSettled. Wrap awaits in try/catch to handle rejections. Never expect a promise to become its value — await it. And keep the synchronous parts short, because a long computation does block, promise or no promise.',
      ],
    },
    'closures-scope': {
      question: 'Whether a variable dies when its function returns?',
      objections: [
        { claim: 'local variables live in the function\'s stack frame and vanish when it returns.', reply: 'If an inner function that references the variable survives — returned, stored, passed to setTimeout — the variable survives with it. The inner function closes over the variable, and the pair is a closure.', code: "function makeCounter() {\n  let count = 0\n  return () => ++count   // count lives on inside this arrow\n}\nconst next = makeCounter()\nnext(); next()   // 2", language: 'javascript' },
        { claim: 'a closure captures the value a variable had when the closure was created.', reply: 'It captures the variable itself. If the variable changes afterwards, the closure sees the new value. That is why three timeouts sharing one var i all print the final i, and why let, which creates a fresh binding per iteration, fixes it.' },
        { claim: 'block scope and function scope are the same thing.', reply: 'A block is anything in braces: an if body, a loop body. let and const live in the nearest block; var ignores blocks and lives in the whole function.' },
      ],
      sedContra: 'The specification models every function as carrying a reference to the environment in which it was created. Closures are not a feature added to JavaScript; they are how JavaScript functions work.',
      respondeo: [
        'Scope is the region of code in which a name is visible: global, function, or block. A closure is a function together with the scope it was created in; when the function is used later, it still reads and writes those variables. This is what gives JavaScript private state without classes, callbacks that remember their context, and the module pattern.',
        'Prefer let and const so that each block and each loop iteration has its own bindings. When a callback must remember something, let it close over a variable rather than a global. And when several closures share a variable by accident, expect them to share its changes too.',
      ],
    },
    'this-and-prototypes': {
      question: 'Whether "this" refers to the function it appears in?',
      objections: [
        { claim: 'this means the current function or the object where the function was written.', reply: 'this is decided by how the function is called, not where it was written. obj.method() sets this to obj; a plain call sets it to undefined in strict mode; a callback passed to setTimeout loses the object entirely. Arrow functions are the exception: they capture this from their surroundings.' },
        { claim: 'a class copies its methods into every instance.', reply: 'Methods live once, on Class.prototype, and instances delegate to it through the prototype chain. That is why instance.method === Class.prototype.method and why patching the prototype affects every instance.', code: "class Bell { ring() { return 'dong' } }\nconst a = new Bell(), b = new Bell()\nconsole.log(a.ring === b.ring)   // true — one function, shared", language: 'javascript' },
        { claim: 'bind, call and apply are obscure and never needed.', reply: 'They are the explicit way to choose this. bind fixes it permanently, which rescues methods passed as callbacks; call and apply set it for one invocation.' },
      ],
      sedContra: 'The specification defines this as a binding established at each call, computed from the call\'s form — a definition that mentions no class and no place of writing.',
      respondeo: [
        'JavaScript objects delegate to other objects: when a property is missing, the lookup follows the prototype chain. class syntax builds such chains, putting methods on the prototype so every instance shares them. this is the object a method was called on, resolved at each call, which is why a method torn off its object and passed elsewhere forgets its owner.',
        'Keep this predictable: call methods on their objects, use arrow functions for callbacks that need the enclosing this, and bind when you must pass a method as a value. Understand the prototype chain so that instanceof, inheritance and the odd behaviour of borrowed methods stop being mysteries.',
      ],
    },
    'error-handling-advanced': {
      question: 'Whether catching every error makes a program robust?',
      objections: [
        { claim: 'wrapping everything in try/catch prevents crashes, and a program that never crashes is robust.', reply: 'A program that never crashes but silently continues with wrong state is not robust; it is dishonest. Catch what you can genuinely handle — a missing file, a bad response — and let programming errors surface loudly so they get fixed.' },
        { claim: 'try/catch around an async call catches errors from the promise.', reply: 'Only if the call is awaited inside the try. A rejected promise that is not awaited escapes the try block and becomes an unhandled rejection. Either await it or attach .catch.', code: "try {\n  await mightFail()       // caught\n} catch (e) { /* ... */ }\n\ntry {\n  mightFail()             // not awaited: rejection escapes\n} catch (e) { /* never runs for the rejection */ }", language: 'javascript' },
        { claim: 'throwing strings is fine because catch receives whatever was thrown.', reply: 'A thrown string has no stack trace, no name and no type to test with instanceof. Throw Error objects, or subclasses that carry the information a handler needs.' },
      ],
      sedContra: 'An error that is caught and ignored has not been handled; it has been hidden. The Node.js documentation warns that swallowing errors "is one of the most common mistakes".',
      respondeo: [
        'Errors in JavaScript are objects with a name, a message and a stack. throw raises one; try/catch/finally handles it; async errors travel as rejected promises and must be awaited or caught with .catch. Custom subclasses of Error let handlers distinguish "the user typed a bad date" from "the database is down".',
        'Handle errors at the level that can do something about them, log or rethrow the rest, and never leave a catch block empty. Read stack traces from the top frame down, use the debugger and breakpoints for tangled state, and write the failing case as a test once you have found it.',
      ],
    },
  },
  typescript: {
    'basic-types': {
      question: 'Whether TypeScript makes a program safer at run time?',
      objections: [
        { claim: 'a TypeScript program will not run if it has a type error, so runtime failures are impossible.', reply: 'tsc reports the error and, by default, still emits JavaScript, which runs. Even with strict settings, the types are erased before execution. Safety comes from acting on the compiler\'s reports before shipping, not from the runtime.' },
        { claim: 'annotating a function parameter as number guarantees a number arrives.', reply: 'It guarantees that TypeScript-checked callers pass a number. Data from JSON, user input or untyped JavaScript is whatever it is. Validate at the boundaries; trust the types inside.' },
        { claim: 'any is a harmless escape hatch to use when the types get awkward.', reply: 'any switches checking off for everything it touches and spreads through assignments. Prefer unknown, which forces you to narrow before use, or fix the awkward type.' },
      ],
      sedContra: 'The TypeScript handbook: "TypeScript\'s type system is erased at compile time. It does not add runtime checks."',
      respondeo: [
        'TypeScript is JavaScript with a static type system layered on top. Annotations describe the intended shapes of values; the compiler checks that the program uses them consistently and then removes them, emitting plain JavaScript. The benefit is that whole classes of mistakes — a misspelled property, a string where a number was meant — are caught while editing rather than in production.',
        'Enable strict mode, annotate function signatures, let inference handle local variables, and treat unknown as the type of data that has not been checked yet. At the edges of the program — network, storage, user input — validate and convert, because that is where the compiler cannot see.',
      ],
    },
    'generics': {
      question: 'Whether generics are needed when any exists?',
      objections: [
        { claim: 'a function that accepts any handles every type, which is what generics do.', reply: 'any accepts every type and forgets it: firstOr(items: any[], fallback: any) returns any, so the caller loses all knowledge of what came back. A generic firstOr<T> accepts every type and remembers it: pass numbers, get a number.', code: "function firstOr<T>(items: T[], fallback: T): T {\n  return items.length ? items[0] : fallback\n}\nconst n = firstOr([1, 2], 0)        // n: number\nconst s = firstOr([], 'none')       // s: string", language: 'typescript' },
        { claim: 'a generic type parameter is a runtime value the function can inspect.', reply: 'Type parameters exist only at compile time. The function cannot test what T is; it can only use T consistently. Runtime decisions still need typeof or a discriminant.' },
        { claim: 'generics belong to library authors and are too abstract for application code.', reply: 'Any function that returns something related to what it received — the first element, a wrapped value, a cached result — is generic. Writing it with a type parameter keeps callers typed without repetition.' },
      ],
      sedContra: 'Array<T>, Promise<T> and Map<K, V> are generic. A programmer who uses them already depends on generics daily.',
      respondeo: [
        'A generic is a function, class or type that takes types as parameters, so that one definition serves many types without losing precision. Stack<T> is a stack of whatever the caller chooses; the compiler tracks that choice through every push and pop. Constraints (T extends Something) let the generic rely on capabilities of T while remaining open.',
        'Reach for a type parameter whenever a value flows in and a related value flows out. Name parameters meaningfully when there are several, constrain them when you need a property, and let inference pick T at the call site so callers rarely write the angle brackets themselves.',
      ],
    },
  },
  sql: {
    'tables-and-select': {
      question: 'Whether the rows of a table are stored in order?',
      objections: [
        { claim: 'rows appear in the order they were inserted, so SELECT returns them in that order.', reply: 'A table is a set of rows; the database is free to store and return them in any order that is convenient — after an UPDATE, a VACUUM or a change of plan, the order may change. Only ORDER BY guarantees an order.' },
        { claim: 'a query returns the whole table, and filtering happens afterwards in the application.', reply: 'WHERE filters inside the database, before rows are sent, and with an index it avoids reading the unwanted rows at all. Filtering in the application moves every row across the network to discard most of them.' },
        { claim: 'SELECT * is fine in production code because it saves listing columns.', reply: 'It ties the program to the table\'s current shape: add a column and the program\'s row layout changes; drop one and it breaks. Naming the columns you need documents the query and lets the database read less.' },
      ],
      sedContra: 'Codd\'s relational model defines a relation as a set of tuples. Sets have no order.',
      respondeo: [
        'A relational table is an unordered collection of rows, each with the same named, typed columns. SELECT declares which columns you want and WHERE which rows; the database decides how to find them. This declarative style is the point of SQL: you state the result, and the engine plans the work.',
        'Say exactly what you need. Name columns rather than using *, filter with WHERE rather than in code, and add ORDER BY whenever order matters, because without it the order is an accident that will one day change.',
      ],
    },
    'aggregates': {
      question: 'Whether a column may appear in SELECT without being in GROUP BY?',
      objections: [
        { claim: 'SELECT name, AVG(grade) FROM students GROUP BY age should work, showing each group\'s name.', reply: 'A group of several rows has several names; the database cannot know which one you mean. Every selected column must be either grouped by or wrapped in an aggregate that collapses the group to one value. Some engines allow the query and return an arbitrary name, which is worse than an error.' },
        { claim: 'WHERE can filter on an aggregate, as in WHERE COUNT(*) > 1.', reply: 'WHERE runs before grouping, when no aggregates exist yet. HAVING runs after and can see them. Both may appear in one query: WHERE trims rows, HAVING trims groups.', code: "SELECT age, AVG(grade) AS avg_grade\nFROM students\nWHERE grade IS NOT NULL\nGROUP BY age\nHAVING COUNT(*) > 1;", language: 'sql' },
        { claim: 'COUNT(*) and COUNT(email) are the same.', reply: 'COUNT(*) counts rows; COUNT(email) counts rows where email is not NULL. Every aggregate except COUNT(*) skips NULLs, which is why AVG of a column with gaps averages only the present values.' },
      ],
      sedContra: 'The SQL standard requires that each non-aggregated column in the select list be functionally dependent on the grouping columns.',
      respondeo: [
        'Aggregation collapses many rows into one. Without GROUP BY, the whole result collapses to a single row; with it, each distinct combination of the grouping columns becomes one output row, and aggregates such as COUNT, SUM and AVG summarise the rows inside. The rule that every selected column be grouped or aggregated follows from this: a single output row cannot carry several different values.',
        'Read a grouping query in execution order — FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY — and place each condition at the stage where its inputs exist. Remember that NULLs are skipped by the aggregates and counted only by COUNT(*).',
      ],
    },
    'joins': {
      question: 'Whether data should be split across tables at all?',
      objections: [
        { claim: 'one wide table with every fact is simpler than several joined tables.', reply: 'It repeats every customer\'s details on every order. Change an email and you must change it everywhere; two rows can disagree; a customer with no orders cannot exist. Normalisation stores each fact once, and JOIN reassembles the view you need.' },
        { claim: 'a JOIN returns rows from both tables whether or not they match.', reply: 'An INNER JOIN, the default, returns only matching pairs. LEFT JOIN keeps every row of the left table and fills the right side with NULLs where nothing matched; that is how you find students with no enrollments.', code: "SELECT s.name\nFROM students s\nLEFT JOIN enrollments e ON e.student_id = s.id\nWHERE e.student_id IS NULL;", language: 'sql' },
        { claim: 'joining on the wrong column produces an error.', reply: 'It produces a result — often a huge one, every row paired with every row — with no error at all. The join condition is a promise you make; the database keeps it literally.' },
      ],
      sedContra: 'Codd\'s first normal form and its successors exist because repeated facts drift apart. The relational model was designed so that facts are stored once and combined on demand.',
      respondeo: [
        'A JOIN combines rows from two tables where a condition holds, almost always a foreign key in one matching a primary key in the other. It is what makes the split into tables workable: each entity lives in one place, and queries stitch the pieces together as needed. INNER JOIN keeps matches; LEFT JOIN keeps everything on one side; the NULLs it produces are how absence is expressed.',
        'Alias tables for readability, join on keys, and check the row count of a new join against your expectation — an unexpected multiplication means the condition is wrong. When you need "rows with no match", think LEFT JOIN with IS NULL, or NOT EXISTS.',
      ],
    },
    'transactions': {
      question: 'Whether a single statement can be trusted to leave the database consistent?',
      objections: [
        { claim: 'each statement either succeeds or fails, so consistency is automatic.', reply: 'Each statement is atomic on its own, but a transfer is two statements. If the second fails, the first has already happened and money has vanished. Only a transaction makes the pair atomic.', code: "BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;   -- both, or neither", language: 'sql' },
        { claim: 'transactions are only for banks.', reply: 'Any change that touches more than one row or table — creating an order and its items, moving a file record and its permissions — has the same shape. Transactions are for every multi-step change.' },
        { claim: 'building a query by pasting user input into the SQL string is fine if the input looks harmless.', reply: 'Input only has to look harmless until someone crafts it. Parameterised queries pass values separately from the SQL text, so input can never become SQL. This is the one rule with no exceptions.' },
      ],
      sedContra: 'ACID — atomicity, consistency, isolation, durability — is the contract a relational database makes, and the transaction is the unit to which it applies.',
      respondeo: [
        'A transaction groups statements so that they take effect together or not at all. BEGIN opens it; COMMIT makes the changes permanent; ROLLBACK discards them. Between those points the database also isolates your work from other users, so a report never sees half a transfer.',
        'Wrap every multi-step change in a transaction, keep transactions short so they do not hold locks, and let the database enforce constraints — NOT NULL, CHECK, foreign keys — so that a bug in the application cannot commit nonsense. And always, without exception, pass values as parameters.',
      ],
    },
  },
}
