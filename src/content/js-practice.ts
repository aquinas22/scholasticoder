import type { Section } from './types'

/**
 * Graded JavaScript practice, merged into the JavaScript lessons at load time.
 * Checks run in the same scope as the learner's code. Available helpers: assert(cond, msg),
 * assert.equal(a, b), assert.deepEqual(a, b), plus _out (captured console output) and _src (source).
 */
export const jsPractice: Record<string, Section[]> = {
  'hello-world': [
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Log Hello, ScholastiCoder! on the first line, then log the result of 6 * 7 on the second. console.log accepts any value, not only strings.',
      exercise: {
        title: 'Two logs',
        starter: `console.log("Hello, World!")\n`,
        solution: `console.log("Hello, ScholastiCoder!")\nconsole.log(6 * 7)\n`,
        hints: ['Each console.log call prints on its own line.', 'Pass the expression 6 * 7 directly; JavaScript evaluates it first.'],
        tests: [
          { name: 'First line greets ScholastiCoder', check: `assert.equal(_out.split('\\n')[0], 'Hello, ScholastiCoder!')` },
          { name: 'Second line is 42', check: `assert.equal(_out.split('\\n')[1], '42')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'Where does console.log("hi") show its output when run in a browser?',
      quiz: {
        choices: [
          { text: 'In the DevTools console, not on the page', correct: true, explanation: 'console.log writes to the developer console. To change the page you use the DOM (document.querySelector and friends).' },
          { text: 'In a popup dialog', explanation: 'That is alert("hi"). It blocks the page, so it is rarely used in real code.' },
          { text: 'Inside the <body> of the page', explanation: 'Nothing on the page changes. Only the console sees it.' },
        ],
      },
    },
  ],

  'variables': [
    {
      type: 'exercise',
      language: 'javascript',
      content: 'This program crashes because it reassigns a const. Fix the declaration so the counter can change, and make sure count ends at 3.',
      exercise: {
        title: 'const versus let',
        starter: `const count = 0\ncount = count + 1\ncount += 2\nconsole.log(count)\n`,
        solution: `let count = 0\ncount = count + 1\ncount += 2\nconsole.log(count)\n`,
        hints: ['const means the binding can never be reassigned.', 'let is for values that change. Do not reach for var.'],
        tests: [
          { name: 'count is 3', check: `assert.equal(count, 3)` },
          { name: 'Declared with let', check: `assert(/\\blet\\s+count\\b/.test(_src), 'declare count with let')\nassert(!/\\bvar\\b/.test(_src), 'avoid var')` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'javascript',
      content: 'The quantity arrives as a string from a form. Convert it to a number, compute total as quantity times price, and build label with a template literal so it reads Total: 50.',
      exercise: {
        title: 'Strings into numbers',
        starter: `const quantityText = "5"\nconst price = 10\n\nconst total = quantityText * price   // works by accident — be explicit\nconst label = "Total: " + total\nconsole.log(label)\n`,
        solution: `const quantityText = "5"\nconst price = 10\n\nconst quantity = Number(quantityText)\nconst total = quantity * price\nconst label = \`Total: \${total}\`\nconsole.log(label)\n`,
        hints: ['Number("5") gives 5. parseInt works too.', 'Template literals use backticks and ${expression}.'],
        tests: [
          { name: 'total is the number 50', check: `assert.equal(total, 50)\nassert.equal(typeof total, 'number')` },
          { name: 'label reads Total: 50', check: `assert.equal(label, 'Total: 50')` },
          { name: 'Converts explicitly with Number() or parseInt()', check: `assert(/Number\\(|parseInt\\(|parseFloat\\(/.test(_src), 'convert the string explicitly')` },
          { name: 'Uses a template literal', check: `assert(_src.includes('\${'), 'build label with a template literal')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What does "5" + 3 evaluate to in JavaScript?',
      quiz: {
        choices: [
          { text: '"53"', correct: true, explanation: 'With a string on either side, + concatenates. "5" - 3 would give 2 because - only works on numbers. Convert explicitly to avoid surprises.' },
          { text: '8', explanation: 'The + operator prefers concatenation when a string is involved.' },
          { text: 'NaN', explanation: 'NaN appears when a conversion to number fails, such as "five" * 3.' },
        ],
      },
    },
  ],

  'control-flow': [
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Fill the out array with FizzBuzz for 1 to 15: "Fizz" for multiples of 3, "Buzz" for multiples of 5, "FizzBuzz" for both, otherwise the number itself.',
      exercise: {
        title: 'FizzBuzz, JavaScript edition',
        starter: `const out = []\nfor (let n = 1; n <= 15; n++) {\n  out.push(n)\n}\nconsole.log(out.join(' '))\n`,
        solution: `const out = []\nfor (let n = 1; n <= 15; n++) {\n  if (n % 15 === 0) out.push('FizzBuzz')\n  else if (n % 3 === 0) out.push('Fizz')\n  else if (n % 5 === 0) out.push('Buzz')\n  else out.push(n)\n}\nconsole.log(out.join(' '))\n`,
        hints: ['n % 3 === 0 is true for multiples of 3.', 'Test the both case first, or 15 becomes Fizz.'],
        tests: [
          { name: '15 entries', check: `assert.equal(out.length, 15)` },
          { name: 'Correct sequence', check: `const want = Array.from({ length: 15 }, (_, i) => { const n = i + 1; return n % 15 === 0 ? 'FizzBuzz' : n % 3 === 0 ? 'Fizz' : n % 5 === 0 ? 'Buzz' : n })\nassert.deepEqual(out, want)` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Using a while loop, push the numbers 5 down to 1 into countdown, then push the string "Liftoff!".',
      exercise: {
        title: 'Countdown with while',
        starter: `const countdown = []\nlet n = 5\n\n// while n is at least 1 ...\n\nconsole.log(countdown)\n`,
        solution: `const countdown = []\nlet n = 5\n\nwhile (n >= 1) {\n  countdown.push(n)\n  n--\n}\ncountdown.push('Liftoff!')\n\nconsole.log(countdown)\n`,
        hints: ['Decrement n inside the loop, or it runs forever (use Stop).', 'Push "Liftoff!" after the loop ends.'],
        tests: [
          { name: 'Counts 5 to 1 then Liftoff', check: `assert.deepEqual(countdown, [5, 4, 3, 2, 1, 'Liftoff!'])` },
          { name: 'Uses a while loop', check: `assert(/\\bwhile\\b/.test(_src), 'use a while loop')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'Which comparison should you use by default, and why?',
      quiz: {
        choices: [
          { text: '=== because it never converts types', correct: true, explanation: 'Strict equality compares value and type. Loose == coerces, so 0 == "" and null == undefined are both true, which hides bugs.' },
          { text: '== because it is shorter', explanation: 'Shorter, but it silently converts types. Most style guides ban it.' },
          { text: 'They are identical for numbers', explanation: 'For two numbers, yes, but you rarely know both operands are numbers.' },
        ],
      },
    },
  ],

  'functions': [
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Write double as an arrow function, and applyTwice(fn, x) as a regular function that applies fn to x two times. applyTwice(double, 3) should be 12.',
      exercise: {
        title: 'Functions as values',
        starter: `// const double = ...\n\n// function applyTwice(fn, x) { ... }\n\nconsole.log(applyTwice(double, 3))\n`,
        solution: `const double = n => n * 2\n\nfunction applyTwice(fn, x) {\n  return fn(fn(x))\n}\n\nconsole.log(applyTwice(double, 3))\n`,
        hints: ['Arrow syntax: const double = n => n * 2', 'applyTwice returns fn(fn(x)).'],
        tests: [
          { name: 'double works', check: `assert.equal(double(21), 42)` },
          { name: 'applyTwice(double, 3) is 12', check: `assert.equal(applyTwice(double, 3), 12)` },
          { name: 'Works with any function', check: `assert.equal(applyTwice(s => s + '!', 'hi'), 'hi!!')` },
          { name: 'double is an arrow function', check: `assert(/double\\s*=\\s*\\(?\\w*\\)?\\s*=>/.test(_src), 'define double with =>')` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Give greet a default greeting of "Hello" and make it return a string like Hello, Ada! Then call it once with the default and once with "Good evening".',
      exercise: {
        title: 'Default parameters',
        starter: `function greet(name, greeting) {\n  return greeting + ', ' + name\n}\n\nconsole.log(greet('Ada'))\nconsole.log(greet('Ada', 'Good evening'))\n`,
        solution: `function greet(name, greeting = 'Hello') {\n  return \`\${greeting}, \${name}!\`\n}\n\nconsole.log(greet('Ada'))\nconsole.log(greet('Ada', 'Good evening'))\n`,
        hints: ['Defaults go in the parameter list: greeting = "Hello".', 'Do not forget the exclamation mark.'],
        tests: [
          { name: 'Default greeting', check: `assert.equal(greet('Ada'), 'Hello, Ada!')` },
          { name: 'Custom greeting', check: `assert.equal(greet('Ada', 'Good evening'), 'Good evening, Ada!')` },
          { name: 'Uses a default parameter', check: `assert(/greeting\\s*=\\s*['"\`]Hello['"\`]/.test(_src), 'set the default in the parameter list')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What does a function return if it has no return statement?',
      quiz: {
        choices: [
          { text: 'undefined', correct: true, explanation: 'Every JavaScript function returns something; without a return statement that something is undefined. Arrow functions with a bare expression body return that expression implicitly.' },
          { text: 'null', explanation: 'null is never produced automatically; you have to return it explicitly.' },
          { text: 'The last expression evaluated', explanation: 'That is how Ruby and Rust behave. JavaScript returns undefined unless you say otherwise.' },
        ],
      },
    },
  ],

  'arrays-objects': [
    {
      type: 'exercise',
      language: 'javascript',
      content: 'From the prices array build three values with array methods, not loops: discounted (every price times 0.9), expensive (only prices above 20) and total (the sum of the original prices).',
      exercise: {
        title: 'map, filter, reduce',
        starter: `const prices = [12, 25, 8, 40, 19]\n\nconst discounted = []\nconst expensive = []\nconst total = 0\n\nconsole.log(discounted, expensive, total)\n`,
        solution: `const prices = [12, 25, 8, 40, 19]\n\nconst discounted = prices.map(p => p * 0.9)\nconst expensive = prices.filter(p => p > 20)\nconst total = prices.reduce((sum, p) => sum + p, 0)\n\nconsole.log(discounted, expensive, total)\n`,
        hints: ['map transforms every element; filter keeps some; reduce folds to one value.', 'reduce takes a callback (accumulator, item) and a starting value.'],
        tests: [
          { name: 'discounted', check: `assert.deepEqual(discounted.map(x => Math.round(x * 100) / 100), [10.8, 22.5, 7.2, 36, 17.1])` },
          { name: 'expensive', check: `assert.deepEqual(expensive, [25, 40])` },
          { name: 'total is 104', check: `assert.equal(total, 104)` },
          { name: 'Uses map, filter and reduce', check: `assert(_src.includes('.map(') && _src.includes('.filter(') && _src.includes('.reduce('), 'use the three array methods')` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Update the user object: add an email property, remove age, and set keys to the list of remaining property names. Finish by building tagline with the user\'s name and city.',
      exercise: {
        title: 'Working with objects',
        starter: `const user = { name: 'Hild', age: 34, city: 'Whitby' }\n\n// add email, remove age\n\nconst keys = []\nconst tagline = ''\nconsole.log(keys, tagline)\n`,
        solution: `const user = { name: 'Hild', age: 34, city: 'Whitby' }\n\nuser.email = 'hild@whitby.abbey'\ndelete user.age\n\nconst keys = Object.keys(user)\nconst tagline = \`\${user.name} of \${user.city}\`\nconsole.log(keys, tagline)\n`,
        hints: ['Adding a property is just assignment: user.email = ...', 'delete user.age removes it; Object.keys lists what is left.'],
        tests: [
          { name: 'email added, age removed', check: `assert(typeof user.email === 'string' && user.email.length > 0, 'add an email')\nassert(!('age' in user), 'remove age')` },
          { name: 'keys lists the remaining properties', check: `assert.deepEqual([...keys].sort(), ['city', 'email', 'name'])` },
          { name: 'tagline', check: `assert.equal(tagline, 'Hild of Whitby')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What is [1, 2, 3].map(x => x * 2)?',
      quiz: {
        choices: [
          { text: 'A new array [2, 4, 6]; the original is untouched', correct: true, explanation: 'map, filter, slice and friends return new arrays. Methods like push, splice and sort mutate in place.' },
          { text: '[1, 2, 3] mutated to [2, 4, 6]', explanation: 'map never changes the array it is called on.' },
          { text: '12', explanation: 'That would need reduce, not map.' },
        ],
      },
    },
  ],

  'classes': [
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Build a Counter class with increment() and decrement() methods, a value getter, and a constructor that accepts an optional starting value (default 0). Methods should return this so calls can be chained.',
      exercise: {
        title: 'A chainable Counter',
        starter: `class Counter {\n  constructor(start) {\n  }\n}\n\nconst c = new Counter()\nc.increment().increment().decrement()\nconsole.log(c.value)\n`,
        solution: `class Counter {\n  constructor(start = 0) {\n    this._value = start\n  }\n\n  get value() {\n    return this._value\n  }\n\n  increment() {\n    this._value++\n    return this\n  }\n\n  decrement() {\n    this._value--\n    return this\n  }\n}\n\nconst c = new Counter()\nc.increment().increment().decrement()\nconsole.log(c.value)\n`,
        hints: ['Store the number in this._value and expose it with get value().', 'return this at the end of each method enables chaining.'],
        tests: [
          { name: 'Chained calls give 1', check: `assert.equal(new Counter().increment().increment().decrement().value, 1)` },
          { name: 'Starting value', check: `assert.equal(new Counter(10).increment().value, 11)` },
          { name: 'value is a getter', check: `const d = Object.getOwnPropertyDescriptor(Counter.prototype, 'value')\nassert(d && typeof d.get === 'function', 'define get value()')` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Shape is a base class with an area() that returns 0 and a describe() using it. Write Circle(radius) and Square(side) subclasses that override area(). Use super in the constructors.',
      exercise: {
        title: 'Inheritance',
        starter: `class Shape {\n  constructor(name) {\n    this.name = name\n  }\n  area() {\n    return 0\n  }\n  describe() {\n    return \`\${this.name} with area \${this.area().toFixed(2)}\`\n  }\n}\n\n// class Circle extends Shape ...\n// class Square extends Shape ...\n\nconsole.log(new Circle(1).describe())\nconsole.log(new Square(3).describe())\n`,
        solution: `class Shape {\n  constructor(name) {\n    this.name = name\n  }\n  area() {\n    return 0\n  }\n  describe() {\n    return \`\${this.name} with area \${this.area().toFixed(2)}\`\n  }\n}\n\nclass Circle extends Shape {\n  constructor(radius) {\n    super('circle')\n    this.radius = radius\n  }\n  area() {\n    return Math.PI * this.radius ** 2\n  }\n}\n\nclass Square extends Shape {\n  constructor(side) {\n    super('square')\n    this.side = side\n  }\n  area() {\n    return this.side ** 2\n  }\n}\n\nconsole.log(new Circle(1).describe())\nconsole.log(new Square(3).describe())\n`,
        hints: ['class Circle extends Shape { constructor(radius) { super("circle"); this.radius = radius } }', 'Override area() in each subclass; describe() will pick it up.'],
        tests: [
          { name: 'Circle area', check: `assert(Math.abs(new Circle(2).area() - Math.PI * 4) < 1e-9)` },
          { name: 'Square area', check: `assert.equal(new Square(3).area(), 9)` },
          { name: 'Both extend Shape', check: `assert(new Circle(1) instanceof Shape && new Square(1) instanceof Shape)` },
          { name: 'describe uses the override', check: `assert.equal(new Square(3).describe(), 'square with area 9.00')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What is a JavaScript class, underneath?',
      quiz: {
        choices: [
          { text: 'Syntax over prototypes: methods live on Class.prototype', correct: true, explanation: 'class did not add a new object model. Instances delegate to the prototype chain exactly as they did with constructor functions.' },
          { text: 'A copy of every method into each instance', explanation: 'Methods are shared through the prototype, not copied. That is why instance.method === Class.prototype.method.' },
          { text: 'A struct with fixed fields', explanation: 'Instances are ordinary objects; you can add properties at any time.' },
        ],
      },
    },
  ],

  'async': [
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Write wait(ms) that returns a promise resolving after ms milliseconds, and an async fetchName(name, ms) that waits then returns the name. In main, start all three fetches at once with Promise.all so the whole thing takes about 300 ms, not 600, and store the names in results.',
      exercise: {
        title: 'Promises in parallel',
        starter: `let results = []\n\nfunction wait(ms) {\n  // return a Promise that resolves after ms\n}\n\nasync function fetchName(name, ms) {\n  // wait, then return the name\n}\n\nasync function main() {\n  const start = Date.now()\n  // run fetchName('A', 300), fetchName('B', 200), fetchName('C', 100) concurrently\n  console.log(results, Date.now() - start, 'ms')\n}\n\nawait main()\n`,
        solution: `let results = []\n\nfunction wait(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms))\n}\n\nasync function fetchName(name, ms) {\n  await wait(ms)\n  return name\n}\n\nasync function main() {\n  const start = Date.now()\n  results = await Promise.all([fetchName('A', 300), fetchName('B', 200), fetchName('C', 100)])\n  console.log(results, Date.now() - start, 'ms')\n}\n\nawait main()\n`,
        hints: ['new Promise(resolve => setTimeout(resolve, ms))', 'Promise.all takes an array of promises and resolves to an array of results in the same order.'],
        tests: [
          { name: 'results are A, B, C in call order', check: `assert.deepEqual(results, ['A', 'B', 'C'])` },
          { name: 'wait returns a promise', check: `assert(wait(1) instanceof Promise)` },
          { name: 'Uses Promise.all', check: `assert(_src.includes('Promise.all'), 'use Promise.all')` },
          { name: 'Ran concurrently (under 500 ms)', check: `const t = Date.now(); await Promise.all([fetchName('x', 120), fetchName('y', 120)]); assert(Date.now() - t < 230, 'the fetches ran one after another')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What happens when you await a value that is not a promise, such as await 5?',
      quiz: {
        choices: [
          { text: 'It is wrapped in a resolved promise and you get 5 back after a microtask', correct: true, explanation: 'await works on anything. Non-promises are treated as already resolved, but the function still yields to the event loop briefly.' },
          { text: 'It throws a TypeError', explanation: 'Awaiting a plain value is legal and common.' },
          { text: 'The function blocks the whole thread for a tick', explanation: 'await never blocks the thread; it suspends only the current async function.' },
        ],
      },
    },
  ],

  'closures-scope': [
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Write makeCounter() that returns a function; each call to that function returns the next number, starting at 1. The count must be private, and two counters must not share state.',
      exercise: {
        title: 'A private counter',
        starter: `function makeCounter() {\n  // ...\n}\n\nconst a = makeCounter()\nconst b = makeCounter()\nconsole.log(a(), a(), b())\n`,
        solution: `function makeCounter() {\n  let count = 0\n  return () => ++count\n}\n\nconst a = makeCounter()\nconst b = makeCounter()\nconsole.log(a(), a(), b())\n`,
        hints: ['Declare let count = 0 inside makeCounter and return a function that increments it.', 'Each call to makeCounter creates a fresh count — that is the closure.'],
        tests: [
          { name: 'Counts 1, 2, 3', check: `const c = makeCounter(); assert.deepEqual([c(), c(), c()], [1, 2, 3])` },
          { name: 'Counters are independent', check: `const x = makeCounter(), y = makeCounter(); x(); x(); assert.equal(y(), 1)` },
          { name: 'No global count variable', check: `assert.equal(typeof globalThis.count, 'undefined')` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'javascript',
      content: 'A classic bug: every timeout logs 3 because var is function-scoped. Fix the loop so logged ends up as [0, 1, 2]. One keyword change is enough.',
      exercise: {
        title: 'The loop closure bug',
        starter: `const logged = []\n\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => logged.push(i), 10)\n}\n\nawait new Promise(r => setTimeout(r, 50))\nconsole.log(logged)\n`,
        solution: `const logged = []\n\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => logged.push(i), 10)\n}\n\nawait new Promise(r => setTimeout(r, 50))\nconsole.log(logged)\n`,
        hints: ['let creates a new binding for every iteration of the loop.', 'var hoists one shared i to the function scope.'],
        tests: [
          { name: 'logged is [0, 1, 2]', check: `await new Promise(r => setTimeout(r, 60)); assert.deepEqual(logged, [0, 1, 2])` },
          { name: 'No var', check: `assert(!/\\bvar\\b/.test(_src), 'replace var with let')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What is a closure?',
      quiz: {
        choices: [
          { text: 'A function bundled with the variables from the scope where it was created', correct: true, explanation: 'The inner function keeps a live reference to those variables, even after the outer function has returned.' },
          { text: 'A function with no parameters', explanation: 'Parameter count has nothing to do with it.' },
          { text: 'A function that has been called', explanation: 'Closures are about scope, not about being invoked.' },
        ],
      },
    },
  ],

  'destructuring': [
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Destructure config in a single statement: pull out host and port (defaulting port to 8080), and collect everything else into rest.',
      exercise: {
        title: 'Object destructuring with defaults',
        starter: `const config = { host: 'abbey.local', debug: true, retries: 3 }\n\n// const { ... } = config\n\nconsole.log(host, port, rest)\n`,
        solution: `const config = { host: 'abbey.local', debug: true, retries: 3 }\n\nconst { host, port = 8080, ...rest } = config\n\nconsole.log(host, port, rest)\n`,
        hints: ['Defaults: { port = 8080 }', 'Rest in objects: { ...rest } collects the remaining properties.'],
        tests: [
          { name: 'host and default port', check: `assert.equal(host, 'abbey.local'); assert.equal(port, 8080)` },
          { name: 'rest holds the other properties', check: `assert.deepEqual(rest, { debug: true, retries: 3 })` },
          { name: 'Single destructuring statement', check: `assert(/const\\s*\\{[^}]*host[^}]*\\}\\s*=\\s*config/.test(_src), 'destructure config with const { ... } = config')` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Three small tasks with spread and rest: swap a and b with array destructuring, build merged by spreading defaults then overrides, and write sum(...nums) that adds any number of arguments.',
      exercise: {
        title: 'Spread and rest',
        starter: `let a = 1, b = 2\n// swap a and b\n\nconst defaults = { theme: 'light', lang: 'en' }\nconst overrides = { theme: 'dark' }\nconst merged = {}\n\nfunction sum() {\n  return 0\n}\n\nconsole.log(a, b, merged, sum(1, 2, 3, 4))\n`,
        solution: `let a = 1, b = 2\n;[a, b] = [b, a]\n\nconst defaults = { theme: 'light', lang: 'en' }\nconst overrides = { theme: 'dark' }\nconst merged = { ...defaults, ...overrides }\n\nfunction sum(...nums) {\n  return nums.reduce((t, n) => t + n, 0)\n}\n\nconsole.log(a, b, merged, sum(1, 2, 3, 4))\n`,
        hints: ['[a, b] = [b, a] — start the line with a semicolon if the previous line has none.', 'Later spreads win: { ...defaults, ...overrides }', 'Rest parameters: function sum(...nums)'],
        tests: [
          { name: 'a and b swapped', check: `assert.equal(a, 2); assert.equal(b, 1)` },
          { name: 'merged', check: `assert.deepEqual(merged, { theme: 'dark', lang: 'en' })` },
          { name: 'sum of any count', check: `assert.equal(sum(1, 2, 3, 4), 10); assert.equal(sum(), 0)` },
          { name: 'Uses rest parameters', check: `assert(/sum\\s*\\(\\s*\\.\\.\\./.test(_src), 'use ...nums')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'In function f(...args) and in g(...list), what does the ... do?',
      quiz: {
        choices: [
          { text: 'In f it gathers arguments into an array (rest); in g it spreads an array out into separate arguments', correct: true, explanation: 'Same three dots, opposite direction. Rest appears in parameter lists and destructuring; spread appears in calls and literals.' },
          { text: 'Both create a copy of an array', explanation: 'Spread in an array literal copies, but in a parameter list the dots gather.' },
          { text: 'It is only valid inside arrays', explanation: 'It works with objects, calls and parameters too.' },
        ],
      },
    },
  ],

  'error-handling-advanced': [
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Write parseJsonSafe(text) that never throws: it returns { ok: true, value } when the JSON parses, and { ok: false, error } with the error message when it does not.',
      exercise: {
        title: 'A result object instead of a throw',
        starter: `function parseJsonSafe(text) {\n  return { ok: true, value: JSON.parse(text) }\n}\n\nconsole.log(parseJsonSafe('{"a": 1}'))\nconsole.log(parseJsonSafe('{nope'))\n`,
        solution: `function parseJsonSafe(text) {\n  try {\n    return { ok: true, value: JSON.parse(text) }\n  } catch (err) {\n    return { ok: false, error: err.message }\n  }\n}\n\nconsole.log(parseJsonSafe('{"a": 1}'))\nconsole.log(parseJsonSafe('{nope'))\n`,
        hints: ['Wrap JSON.parse in try/catch.', 'err.message holds the human-readable reason.'],
        tests: [
          { name: 'Valid JSON', check: `assert.deepEqual(parseJsonSafe('{"a": 1}'), { ok: true, value: { a: 1 } })` },
          { name: 'Invalid JSON does not throw', check: `const r = parseJsonSafe('{nope'); assert.equal(r.ok, false); assert(typeof r.error === 'string' && r.error.length > 0)` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Create ValidationError, a subclass of Error that records which field failed, and validateAge(age) that throws it when age is not an integer between 0 and 150. The error\'s name should be "ValidationError".',
      exercise: {
        title: 'A custom error class',
        starter: `class ValidationError extends Error {\n  constructor(message, field) {\n    super(message)\n  }\n}\n\nfunction validateAge(age) {\n  return age\n}\n\ntry {\n  validateAge(-4)\n} catch (err) {\n  console.log(err.name, err.field, err.message)\n}\n`,
        solution: `class ValidationError extends Error {\n  constructor(message, field) {\n    super(message)\n    this.name = 'ValidationError'\n    this.field = field\n  }\n}\n\nfunction validateAge(age) {\n  if (!Number.isInteger(age) || age < 0 || age > 150) {\n    throw new ValidationError(\`age must be an integer between 0 and 150, got \${age}\`, 'age')\n  }\n  return age\n}\n\ntry {\n  validateAge(-4)\n} catch (err) {\n  console.log(err.name, err.field, err.message)\n}\n`,
        hints: ['Set this.name and this.field in the constructor after super(message).', 'Number.isInteger(age) rejects 3.5 and "3".'],
        tests: [
          { name: 'Valid ages pass through', check: `assert.equal(validateAge(30), 30); assert.equal(validateAge(0), 0)` },
          { name: 'Invalid ages throw ValidationError', check: `let caught = null; try { validateAge(-4) } catch (e) { caught = e }; assert(caught instanceof ValidationError, 'throw a ValidationError'); assert(caught instanceof Error)` },
          { name: 'name and field are set', check: `let e = null; try { validateAge(999) } catch (x) { e = x }; assert.equal(e.name, 'ValidationError'); assert.equal(e.field, 'age')` },
          { name: 'Rejects non-integers', check: `let threw = false; try { validateAge(3.5) } catch { threw = true }; assert(threw, '3.5 should be rejected')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'Why is an empty catch block, catch (e) {}, considered dangerous?',
      quiz: {
        choices: [
          { text: 'It swallows every error, including bugs you would want to know about', correct: true, explanation: 'Catch specific situations, log or rethrow the rest. Silence is not safety.' },
          { text: 'It is a syntax error', explanation: 'It is legal, which is exactly the problem.' },
          { text: 'It slows the program down', explanation: 'Performance is fine; the issue is lost information.' },
        ],
      },
    },
  ],

  'iterators-generators-js': [
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Write a generator range(start, end, step = 1) that yields start, start + step, … while less than end, without ever building an array.',
      exercise: {
        title: 'A lazy range',
        starter: `function* range(start, end, step = 1) {\n  // yield values from start up to (not including) end\n}\n\nconsole.log([...range(0, 10, 3)])\n`,
        solution: `function* range(start, end, step = 1) {\n  for (let n = start; n < end; n += step) {\n    yield n\n  }\n}\n\nconsole.log([...range(0, 10, 3)])\n`,
        hints: ['function* marks a generator; yield hands out one value at a time.', 'A for loop with n += step is all it takes.'],
        tests: [
          { name: 'range(0, 10, 3)', check: `assert.deepEqual([...range(0, 10, 3)], [0, 3, 6, 9])` },
          { name: 'Default step', check: `assert.deepEqual([...range(1, 5)], [1, 2, 3, 4])` },
          { name: 'Is a generator (lazy)', check: `const it = range(0, 1e9); assert.equal(it.next().value, 0); assert.equal(typeof it[Symbol.iterator], 'function')` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Make Playlist iterable by implementing [Symbol.iterator] as a generator method, so for...of and spread yield the track titles in order.',
      exercise: {
        title: 'A custom iterable',
        starter: `class Playlist {\n  constructor() {\n    this.tracks = []\n  }\n  add(title) {\n    this.tracks.push(title)\n    return this\n  }\n  // *[Symbol.iterator]() { ... }\n}\n\nconst p = new Playlist().add('Kyrie').add('Gloria').add('Credo')\nconsole.log([...p])\n`,
        solution: `class Playlist {\n  constructor() {\n    this.tracks = []\n  }\n  add(title) {\n    this.tracks.push(title)\n    return this\n  }\n  *[Symbol.iterator]() {\n    yield* this.tracks\n  }\n}\n\nconst p = new Playlist().add('Kyrie').add('Gloria').add('Credo')\nconsole.log([...p])\n`,
        hints: ['A generator method: *[Symbol.iterator]() { ... }', 'yield* delegates to another iterable such as this.tracks.'],
        tests: [
          { name: 'Spread yields the titles', check: `assert.deepEqual([...new Playlist().add('a').add('b')], ['a', 'b'])` },
          { name: 'for...of works', check: `const seen = []; for (const t of new Playlist().add('x')) seen.push(t); assert.deepEqual(seen, ['x'])` },
          { name: 'Implements Symbol.iterator', check: `assert.equal(typeof Playlist.prototype[Symbol.iterator], 'function')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What does for...of look for on the object it loops over?',
      quiz: {
        choices: [
          { text: 'A [Symbol.iterator] method that returns an iterator with next()', correct: true, explanation: 'Arrays, strings, Maps, Sets and generators all provide it. Plain objects do not, which is why for...of on {} throws.' },
          { text: 'A length property', explanation: 'That is what old-style index loops rely on; for...of uses the iterator protocol.' },
          { text: 'A forEach method', explanation: 'forEach is a method on arrays; for...of does not call it.' },
        ],
      },
    },
  ],

  'this-and-prototypes': [
    {
      type: 'exercise',
      language: 'javascript',
      content: 'The timer never counts because the callback\'s this is not the timer object. Fix it so that after the timeout fires, timer.ticks is 1. An arrow function or bind will do.',
      exercise: {
        title: 'Losing this',
        starter: `const timer = {\n  ticks: 0,\n  start() {\n    setTimeout(function () {\n      this.ticks++\n    }, 10)\n  },\n}\n\ntimer.start()\nawait new Promise(r => setTimeout(r, 40))\nconsole.log(timer.ticks)\n`,
        solution: `const timer = {\n  ticks: 0,\n  start() {\n    setTimeout(() => {\n      this.ticks++\n    }, 10)\n  },\n}\n\ntimer.start()\nawait new Promise(r => setTimeout(r, 40))\nconsole.log(timer.ticks)\n`,
        hints: ['Arrow functions do not have their own this; they use the surrounding one.', 'Alternatively: setTimeout(function () { ... }.bind(this), 10)'],
        tests: [
          { name: 'ticks is 1 after the timeout', check: `await new Promise(r => setTimeout(r, 50)); assert.equal(timer.ticks, 1)` },
          { name: 'No global leak', check: `assert(Number.isNaN(globalThis.ticks) || globalThis.ticks === undefined)` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'Inside an arrow function, what is this?',
      quiz: {
        choices: [
          { text: 'Whatever this was in the enclosing scope when the arrow was created', correct: true, explanation: 'Arrows capture this lexically. That makes them ideal for callbacks inside methods and wrong for object methods that need their own this.' },
          { text: 'The object the arrow is stored on', explanation: 'That is how regular function methods behave, not arrows.' },
          { text: 'Always undefined', explanation: 'Only if the enclosing this was undefined.' },
        ],
      },
    },
  ],

  'regular-expressions': [
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Write isValidEmail(s) with a simple pattern (something@something.tld, no spaces) and extractHashtags(text) that returns every #word in the text without the hash.',
      exercise: {
        title: 'Test and extract',
        starter: `function isValidEmail(s) {\n  return false\n}\n\nfunction extractHashtags(text) {\n  return []\n}\n\nconsole.log(isValidEmail('bede@jarrow.uk'), isValidEmail('not an email'))\nconsole.log(extractHashtags('Learning #python and #sql today #100DaysOfCode'))\n`,
        solution: `function isValidEmail(s) {\n  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(s)\n}\n\nfunction extractHashtags(text) {\n  return [...text.matchAll(/#(\\w+)/g)].map(m => m[1])\n}\n\nconsole.log(isValidEmail('bede@jarrow.uk'), isValidEmail('not an email'))\nconsole.log(extractHashtags('Learning #python and #sql today #100DaysOfCode'))\n`,
        hints: ['regex.test(string) returns true or false.', 'matchAll with the g flag gives every match; m[1] is the first capture group.'],
        tests: [
          { name: 'Accepts a normal email', check: `assert.equal(isValidEmail('bede@jarrow.uk'), true)` },
          { name: 'Rejects junk', check: `assert.equal(isValidEmail('not an email'), false); assert.equal(isValidEmail('a@b'), false); assert.equal(isValidEmail('a @b.com'), false)` },
          { name: 'Extracts hashtags', check: `assert.deepEqual(extractHashtags('Learning #python and #sql today #100DaysOfCode'), ['python', 'sql', '100DaysOfCode'])` },
          { name: 'No hashtags gives []', check: `assert.deepEqual(extractHashtags('plain text'), [])` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'javascript',
      content: 'Write slugify(title): lower-case, replace every run of non-alphanumeric characters with a single hyphen, and trim hyphens from the ends. "Hello, World! 2026" becomes "hello-world-2026".',
      exercise: {
        title: 'Slugify',
        starter: `function slugify(title) {\n  return title\n}\n\nconsole.log(slugify('Hello, World! 2026'))\n`,
        solution: `function slugify(title) {\n  return title\n    .toLowerCase()\n    .replace(/[^a-z0-9]+/g, '-')\n    .replace(/^-+|-+$/g, '')\n}\n\nconsole.log(slugify('Hello, World! 2026'))\n`,
        hints: ['[^a-z0-9]+ matches one or more characters that are not letters or digits.', 'A second replace with ^-+|-+$ trims leading and trailing hyphens.'],
        tests: [
          { name: 'Basic', check: `assert.equal(slugify('Hello, World! 2026'), 'hello-world-2026')` },
          { name: 'Collapses runs and trims ends', check: `assert.equal(slugify('  --Ora et   Labora!!  '), 'ora-et-labora')` },
          { name: 'Uses a regular expression', check: `assert(/replace\\(\\s*\\//.test(_src), 'use replace with a regex')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What does the g flag change in "a1b2".replace(/\\d/, "#")?',
      quiz: {
        choices: [
          { text: 'Without g only the first digit is replaced ("a#b2"); with g every digit is ("a#b#")', correct: true, explanation: 'g means global. It also matters for matchAll (required) and for test() on a reused regex (it remembers lastIndex, a classic gotcha).' },
          { text: 'g makes the match case-insensitive', explanation: 'That is the i flag.' },
          { text: 'g is required for any replace', explanation: 'replace works without it; it simply stops after the first match.' },
        ],
      },
    },
  ],
}
