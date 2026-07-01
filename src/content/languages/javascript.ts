import { Language } from '../types'

export const javascript: Language = {
  slug: 'javascript',
  name: 'JavaScript',
  tagline: 'The language that runs the web. Whether you like it or not.',
  description: 'JavaScript is the only language that runs natively in every web browser. Originally written in 10 days. Somehow it took over the world. Now it runs on servers, mobile devices, and against all reason, your smart toaster.',
  accentColor: '#F7DF1E',
  textOnAccent: '#111',
  icon: 'JS',
  difficulty: 'beginner',
  usedFor: ['Web Frontend', 'Backend (Node.js)', 'Mobile (React Native)', 'Desktop (Electron)'],
  notableUsers: ['Google', 'Facebook', 'Netflix', 'Twitter', 'GitHub'],
  setup: {
    description: 'JavaScript runs in every browser, so you already have a runtime. For serious development, install Node.js to run JS outside the browser.',
    windows: `# Download Node.js from nodejs.org
# Get the LTS (Long Term Support) version

# Or use winget:
winget install OpenJS.NodeJS.LTS

# Verify:
node --version
npm --version`,
    mac: `# Option 1: Homebrew (recommended)
brew install node

# Option 2: nvm (Node Version Manager — great for switching versions)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts
nvm use --lts

# Verify:
node --version
npm --version`,
    linux: `# Debian / Ubuntu (via NodeSource):
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Or via nvm (works on all distros):
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

# Verify:
node --version`,
  },
  lessons: [
    {
      slug: 'hello-world',
      title: 'Hello, World!',
      intro: 'You can run JavaScript in your browser\'s console right now. Open DevTools (F12), click Console, and type. You\'re already set up. Relax.',
      sections: [
        {
          type: 'text',
          content: 'JavaScript has two environments: the browser and Node.js. In the browser, you\'d use console.log(). In Node.js, same thing. The function is identical — the output just goes to different places.',
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// In browser console or Node.js
console.log("Hello, World!");

// console has many methods
console.log("Regular message");
console.warn("Warning message");
console.error("Error message");

// Log multiple values
console.log("Name:", "Alice", "Age:", 30);

// Template literals (backticks) for string interpolation
const name = "World";
console.log(\`Hello, \${name}!\`);`,
        },
        {
          type: 'text',
          content: 'In a browser, you can also display output in the HTML page itself. But for learning, console.log() is almost always what you want.',
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// Save as hello.js, run with: node hello.js
console.log("Hello from Node.js!");

// Or in an HTML file:
// <script>
//   document.getElementById("output").textContent = "Hello, World!";
// </script>`,
        },
        {
          type: 'note',
          content: 'JavaScript files run top-to-bottom. There\'s no main() function required — code at the top level executes immediately when the file is loaded or run.',
        },
      ],
    },
    {
      slug: 'variables',
      title: 'Variables & Types',
      intro: 'JavaScript has three ways to declare variables: var, let, and const. One is old and troublesome, one is modern, and one is modern and immutable. Spot the pattern.',
      sections: [
        {
          type: 'text',
          content: 'Use const for values that don\'t change. Use let for values that do. Avoid var — it has confusing scoping rules and function-level scope instead of block scope. Pretend it doesn\'t exist.',
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// const — cannot be reassigned
const PI = 3.14159;
const name = "Alice";

// let — can be reassigned
let age = 30;
age = 31;  // fine

// JavaScript's primitive types
const integer = 42;
const float = 3.14;           // both are 'number' type
const text = "hello";
const template = \`Hello, \${name}\`;
const flag = true;
const nothing = null;         // intentional absence of value
const notDefined = undefined; // uninitialized

// Check types with typeof
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object"  ← famous bug, kept for compatibility`,
        },
        {
          type: 'text',
          content: 'JavaScript is weakly typed, which means it will automatically convert types when comparing values. This is the source of many surprises. Use === (triple equals) for comparison — it checks type AND value.',
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// == does type coercion (avoid)
console.log(1 == "1");    // true  ← surprising
console.log(0 == false);  // true  ← also surprising

// === checks type AND value (use this)
console.log(1 === "1");   // false ← correct
console.log(0 === false); // false ← correct

// Type conversion
const num = Number("42");     // 42
const str = String(42);       // "42"
const bool = Boolean(0);      // false
const bool2 = Boolean("hi");  // true

// Falsy values in JS: false, 0, "", null, undefined, NaN
// Everything else is truthy
if ("") console.log("won't print");  // empty string is falsy
if ("a") console.log("will print");  // non-empty string is truthy`,
        },
        {
          type: 'warning',
          content: 'NaN (Not a Number) is the result of invalid math operations like Number("cat") or 0/0. Weirdly, typeof NaN is "number". And NaN !== NaN. Use Number.isNaN() to check for it.',
        },
      ],
    },
    {
      slug: 'control-flow',
      title: 'Control Flow & Loops',
      intro: 'JavaScript has all the standard control structures, plus a few extras. It\'s also the only major language where the for loop has four different forms.',
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `// if / else if / else
const score = 75;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("Try harder");
}

// Ternary operator — one-line if/else
const result = score >= 60 ? "Pass" : "Fail";
console.log(result);   // Pass

// Nullish coalescing — use right side if left is null/undefined
const username = null ?? "Guest";
console.log(username);   // Guest

// Optional chaining — safely access nested properties
const user = { profile: { name: "Alice" } };
console.log(user?.profile?.name);    // Alice
console.log(user?.address?.city);    // undefined (no error)`,
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// Classic for loop
for (let i = 0; i < 5; i++) {
  console.log(i);   // 0, 1, 2, 3, 4
}

// for...of — iterate over array values (use this for arrays)
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}

// for...in — iterate over object keys (use this for objects)
const person = { name: "Alice", age: 30, city: "Paris" };
for (const key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}

// while loop
let count = 0;
while (count < 3) {
  console.log(count);
  count++;
}

// Array methods replace many loops in modern JS
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);      // [2, 4, 6, 8, 10]
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15`,
        },
        {
          type: 'note',
          content: 'Prefer for...of over the classic for loop for arrays. Prefer .map()/.filter()/.reduce() for transformations. Reserve while for when you genuinely don\'t know the iteration count upfront.',
        },
      ],
    },
    {
      slug: 'functions',
      title: 'Functions & Arrow Functions',
      intro: 'JavaScript has multiple syntaxes for functions. This is not a bug, it\'s a feature. The arrow syntax is the most common in modern code.',
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `// Function declaration — hoisted (can be called before it's defined)
function add(a, b) {
  return a + b;
}

// Function expression — not hoisted
const multiply = function(a, b) {
  return a * b;
};

// Arrow function — modern, concise
const subtract = (a, b) => a - b;            // implicit return
const square = x => x * x;                    // single param, no parens needed
const greet = () => "Hello!";                  // no params

// Multi-line arrow function needs explicit return
const divide = (a, b) => {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
};

console.log(add(2, 3));       // 5
console.log(multiply(4, 5));  // 20
console.log(square(7));       // 49

// Default parameters
function greetUser(name = "World") {
  return \`Hello, \${name}!\`;
}
console.log(greetUser());        // Hello, World!
console.log(greetUser("Alice")); // Hello, Alice!

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4, 5));  // 15`,
        },
        {
          type: 'text',
          content: 'JavaScript functions are first-class values — you can assign them to variables, pass them as arguments, and return them from other functions. This enables powerful patterns like callbacks and higher-order functions.',
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// Closures — functions that remember their surrounding scope
function makeCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  };
}

const counter = makeCounter(10);
counter.increment();
counter.increment();
console.log(counter.value()); // 12

// Destructuring in function parameters
function displayUser({ name, age, city = "Unknown" }) {
  console.log(\`\${name}, \${age}, \${city}\`);
}
displayUser({ name: "Alice", age: 30, city: "Paris" });

// Spread operator
function addThree(a, b, c) {
  return a + b + c;
}
const args = [1, 2, 3];
console.log(addThree(...args));  // 6`,
        },
      ],
    },
    {
      slug: 'arrays-objects',
      title: 'Arrays & Objects',
      intro: 'Arrays and objects are the backbone of JavaScript data. Master these and you\'ve mastered 80% of what you\'ll actually use.',
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `// Arrays
const numbers = [1, 2, 3, 4, 5];

// Core array methods
numbers.push(6);               // add to end
numbers.unshift(0);            // add to start
numbers.pop();                 // remove from end
numbers.shift();               // remove from start
const sliced = numbers.slice(1, 3);  // [2, 3] (non-destructive)
numbers.splice(1, 2);          // remove 2 elements at index 1 (mutates)

// Transformation methods (return new arrays)
const doubled = [1,2,3].map(x => x * 2);        // [2, 4, 6]
const evens = [1,2,3,4].filter(x => x % 2 === 0); // [2, 4]
const sum = [1,2,3].reduce((acc, x) => acc + x, 0); // 6
const found = [1,2,3,4].find(x => x > 2);        // 3
const hasEven = [1,2,3].some(x => x % 2 === 0);  // true
const allPos = [1,2,3].every(x => x > 0);         // true

// Spread and destructuring
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];  // [1,2,3,4,5,6]

const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first, second, rest);   // 1 2 [3, 4, 5]`,
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// Objects
const person = {
  name: "Alice",
  age: 30,
  greet() {               // method shorthand
    return \`Hi, I'm \${this.name}\`;
  }
};

console.log(person.name);         // Alice
console.log(person["age"]);       // 30
console.log(person.greet());      // Hi, I'm Alice

// Object destructuring
const { name, age, city = "Unknown" } = person;
console.log(name, age, city);     // Alice 30 Unknown

// Spread for copying/merging
const updated = { ...person, age: 31, email: "alice@example.com" };

// Object methods
console.log(Object.keys(person));    // ["name", "age", "greet"]
console.log(Object.values(person));  // ["Alice", 30, [Function]]
console.log(Object.entries(person)); // [["name","Alice"], ...]

// Optional chaining and nullish coalescing
const config = { server: { port: 3000 } };
const port = config?.server?.port ?? 8080;   // 3000
const host = config?.server?.host ?? "localhost"; // "localhost"`,
        },
      ],
    },
    {
      slug: 'classes',
      title: 'Classes & Modules',
      intro: 'ES6 brought classes to JavaScript. They\'re syntactic sugar over prototypes, but don\'t let that ruin the moment.',
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `class Animal {
  #name;  // private field (# prefix)

  constructor(name, sound) {
    this.#name = name;
    this.sound = sound;
  }

  speak() {
    return \`\${this.#name} says \${this.sound}\`;
  }

  get name() { return this.#name; }  // getter
}

class Dog extends Animal {
  constructor(name) {
    super(name, "Woof");  // call parent constructor
    this.tricks = [];
  }

  learn(trick) {
    this.tricks.push(trick);
    return this;  // enables chaining
  }

  showTricks() {
    return \`\${this.name} knows: \${this.tricks.join(", ")}\`;
  }
}

const dog = new Dog("Rex");
dog.learn("sit").learn("shake").learn("roll over");
console.log(dog.speak());       // Rex says Woof
console.log(dog.showTricks());  // Rex knows: sit, shake, roll over`,
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// ES Modules — one file, one module

// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }
export default function square(x) { return x * x; }

// In another file:
// import square, { PI, add } from './math.js';
// console.log(square(4));  // 16
// console.log(add(2, 3));  // 5

// CommonJS (Node.js older style)
// module.exports = { add, multiply };
// const { add } = require('./math');

// Dynamic import (lazy loading)
// const module = await import('./heavy-module.js');`,
        },
        {
          type: 'note',
          content: 'In modern Node.js (with "type": "module" in package.json) and all modern browsers, use ES module syntax (import/export). In older Node.js code you\'ll see CommonJS (require/module.exports).',
        },
      ],
    },
    {
      slug: 'async',
      title: 'Promises & Async/Await',
      intro: 'JavaScript is single-threaded but non-blocking. This sounds impossible and makes perfect sense once you live with it for a few months.',
      sections: [
        {
          type: 'text',
          content: 'JavaScript handles slow operations (network requests, file reads) asynchronously. Instead of blocking the entire thread waiting for a response, it registers a callback and continues running. Async/await makes this look like synchronous code.',
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// Promises
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    // Simulate an API call
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "Alice" });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 100);
  });
}

// .then() chaining
fetchUser(1)
  .then(user => {
    console.log(user.name);  // Alice
    return fetchUser(2);     // chain another promise
  })
  .then(user => console.log(user))
  .catch(err => console.error(err.message));

// async/await — cleaner syntax for the same thing
async function getUser() {
  try {
    const user = await fetchUser(1);
    console.log(user.name);   // Alice
  } catch (err) {
    console.error(err.message);
  }
}

getUser();`,
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// fetch() — built-in for HTTP requests
async function getGitHubUser(username) {
  const response = await fetch(\`https://api.github.com/users/\${username}\`);

  if (!response.ok) {
    throw new Error(\`HTTP error: \${response.status}\`);
  }

  const data = await response.json();
  return data;
}

async function main() {
  try {
    const user = await getGitHubUser("torvalds");
    console.log(user.name);         // Linus Torvalds
    console.log(user.public_repos); // lots
  } catch (err) {
    console.error("Failed:", err.message);
  }
}

main();

// Run multiple promises in parallel
async function fetchAll() {
  const [user1, user2] = await Promise.all([
    getGitHubUser("torvalds"),
    getGitHubUser("gvanrossum"),
  ]);
  console.log(user1.name, user2.name);
}`,
        },
        {
          type: 'note',
          content: 'await can only be used inside async functions (or at the top level of ES modules). If you try to use it in regular code, you\'ll get a syntax error.',
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: Fetch & Display Data',
      intro: 'Let\'s build a real Node.js script that fetches data from a public API and displays it nicely. Networks, JSON, async/await — all in one.',
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `// weather.js — Fetches weather from Open-Meteo (free, no API key)
// Run: node weather.js

async function getWeather(city) {
  // Step 1: Geocode the city name to coordinates
  const geoUrl = \`https://geocoding-api.open-meteo.com/v1/search?name=\${encodeURIComponent(city)}&count=1\`;
  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  if (!geoData.results?.length) {
    throw new Error(\`City not found: \${city}\`);
  }

  const { latitude, longitude, name, country } = geoData.results[0];

  // Step 2: Fetch weather data
  const weatherUrl = \`https://api.open-meteo.com/v1/forecast\`
    + \`?latitude=\${latitude}&longitude=\${longitude}\`
    + \`&current=temperature_2m,wind_speed_10m,weather_code\`;

  const weatherRes = await fetch(weatherUrl);
  const weatherData = await weatherRes.json();

  const current = weatherData.current;

  return {
    city: \`\${name}, \${country}\`,
    temp: current.temperature_2m,
    wind: current.wind_speed_10m,
  };
}

function formatWeather(data) {
  const lines = [
    \`📍 \${data.city}\`,
    \`🌡  Temperature: \${data.temp}°C\`,
    \`💨  Wind: \${data.wind} km/h\`,
  ];
  return lines.join("\\n");
}

async function main() {
  const cities = process.argv.slice(2);

  if (cities.length === 0) {
    console.log("Usage: node weather.js <city> [city2] ...");
    console.log("Example: node weather.js London Paris Berlin");
    process.exit(1);
  }

  const results = await Promise.allSettled(
    cities.map(city => getWeather(city))
  );

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(formatWeather(result.value));
    } else {
      console.error(\`Error for \${cities[i]}: \${result.reason.message}\`);
    }
    console.log("");
  });
}

main().catch(console.error);`,
        },
        {
          type: 'text',
          content: 'This script uses Promise.allSettled() instead of Promise.all() — the difference is that allSettled waits for ALL promises to finish, even if some fail, while Promise.all() rejects immediately if any promise fails. For fetching multiple items where partial results are acceptable, allSettled is the right choice.',
        },
        {
          type: 'code',
          language: 'bash',
          content: `node weather.js London Paris Tokyo Berlin`,
        },
      ],
    },
    {
      slug: 'closures-scope',
      title: 'Closures & Scope',
      intro: 'A closure is a function that remembers the variables from the scope it was created in, even after that scope has ended. This sounds academic. It powers half of JavaScript.',
      sections: [
        {
          type: 'text',
          content: 'JavaScript has function scope (var), block scope (let/const), and module scope. Understanding which scope a variable lives in is critical to avoiding subtle bugs with callbacks, loops, and timers.',
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// Scope basics
let x = 1          // module scope

function outer() {
  let y = 2        // function scope

  function inner() {
    let z = 3      // function scope of inner
    console.log(x, y, z)  // can see all three
  }

  inner()
  // console.log(z)  // ReferenceError — z doesn't exist here
}

// Block scope with let/const
{
  let blockVar = "inside"
  const blockConst = "also inside"
}
// console.log(blockVar)  // ReferenceError

// Classic closure
function makeCounter(start = 0) {
  let count = start  // this variable lives in the closure

  return {
    increment() { count++; return count },
    decrement() { count--; return count },
    value()     { return count },
    reset()     { count = start },
  }
}

const counter = makeCounter(10)
console.log(counter.increment())  // 11
console.log(counter.increment())  // 12
console.log(counter.decrement())  // 11
console.log(counter.value())      // 11

// Two counters — separate closures, separate state
const c1 = makeCounter()
const c2 = makeCounter(100)
c1.increment()
console.log(c1.value(), c2.value())  // 1, 100`,
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// The classic loop closure bug
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
// Prints: 3 3 3 — all callbacks share the same var i

// Fix 1: use let (block-scoped, new binding each iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
// Prints: 0 1 2

// Fix 2: IIFE to capture current value (old-school)
for (var i = 0; i < 3; i++) {
  ((captured) => {
    setTimeout(() => console.log(captured), 0)
  })(i)
}

// Practical closure: memoization
function memoize(fn) {
  const cache = new Map()
  return function(...args) {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)
    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}

const expensiveFib = memoize(function fib(n) {
  if (n <= 1) return n
  return expensiveFib(n - 1) + expensiveFib(n - 2)
})

console.log(expensiveFib(40))  // fast!

// Partial application via closure
const multiply = (a) => (b) => a * b
const double = multiply(2)
const triple = multiply(3)
console.log(double(5))   // 10
console.log(triple(5))   // 15`,
        },
        {
          type: 'note',
          content: 'Use const by default, let when you need to reassign, and never use var. The var keyword ignores block scope, which causes exactly the kind of bugs that let and const were invented to prevent.',
        },
      ],
    },
    {
      slug: 'destructuring',
      title: 'Destructuring, Spread & Rest',
      intro: 'ES6 destructuring lets you unpack arrays and objects in a single expression. Combined with spread and rest, it makes JavaScript feel dramatically less verbose. Fair warning: it also makes clever one-liners dramatically easier to write.',
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `// Array destructuring
const [a, b, c] = [1, 2, 3]
console.log(a, b, c)  // 1 2 3

// Skip elements with commas
const [first, , third] = [1, 2, 3]
console.log(first, third)  // 1 3

// Default values
const [x = 10, y = 20] = [5]
console.log(x, y)  // 5 20

// Swap without temp variable
let p = 1, q = 2;
[p, q] = [q, p]
console.log(p, q)  // 2 1

// Rest elements
const [head, ...tail] = [1, 2, 3, 4, 5]
console.log(head)  // 1
console.log(tail)  // [2, 3, 4, 5]

// Object destructuring
const user = { name: "Alice", age: 30, city: "Paris" }
const { name, age } = user
console.log(name, age)  // Alice 30

// Rename while destructuring
const { name: userName, city: location = "Unknown" } = user
console.log(userName, location)  // Alice Paris

// Nested destructuring
const config = {
  server: { host: "localhost", port: 8080 },
  db: { name: "myapp", user: "admin" }
}
const { server: { host, port }, db: { name: dbName } } = config
console.log(host, port, dbName)  // localhost 8080 myapp`,
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// Spread operator (...)
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const combined = [...arr1, ...arr2]         // [1, 2, 3, 4, 5, 6]
const copy     = [...arr1]                  // shallow copy
const inserted = [0, ...arr1, 4]           // [0, 1, 2, 3, 4]

// Spread with objects
const base = { color: "blue", size: 10 }
const updated = { ...base, size: 20, weight: 5 }  // override size
console.log(updated)  // { color: 'blue', size: 20, weight: 5 }

// Merge objects (last wins on conflict)
const merged = { ...base, ...{ color: "red", opacity: 0.5 } }

// Rest parameters in functions
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0)
}
console.log(sum(1, 2, 3, 4, 5))  // 15

// Destructuring in function parameters
function displayUser({ name, age, role = "user" }) {
  console.log(\`\${name} (\${age}) — \${role}\`)
}
displayUser({ name: "Bob", age: 25 })         // Bob (25) — user
displayUser({ name: "Alice", age: 30, role: "admin" })  // Alice (30) — admin

// Destructuring in loops
const users = [
  { id: 1, name: "Alice", score: 95 },
  { id: 2, name: "Bob",   score: 87 },
]
for (const { name, score } of users) {
  console.log(\`\${name}: \${score}\`)
}`,
        },
        {
          type: 'note',
          content: 'Spread creates shallow copies — nested objects are still references. { ...obj } and [...arr] are fine for one-level-deep copies. For deep cloning, use structuredClone(obj) (modern JS) or JSON.parse(JSON.stringify(obj)) (lossy but widely supported).',
        },
      ],
    },
    {
      slug: 'dom-manipulation',
      title: 'DOM & Events',
      intro: 'The DOM is the browser API that lets JavaScript interact with HTML. It is a tree of nodes. You can read it, modify it, and listen for events on it. This is how every interactive web page works.',
      sections: [
        {
          type: 'text',
          content: 'The Document Object Model represents the HTML structure as a tree of JavaScript objects. document.querySelector gives you the first matching element; document.querySelectorAll gives you a NodeList of all matches. Always wait for DOMContentLoaded before querying elements.',
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// Selecting elements
const btn   = document.querySelector("#submit-btn")       // by id
const items = document.querySelectorAll(".list-item")     // all matches
const first = document.querySelector("ul > li:first-child")

// Reading & writing content
const p = document.querySelector("p")
console.log(p.textContent)      // get text
p.textContent = "New text"       // set text (safe — no HTML injection)
p.innerHTML  = "<strong>Bold</strong>"  // set HTML (careful with user input!)

// Attributes
const img = document.querySelector("img")
console.log(img.getAttribute("src"))
img.setAttribute("alt", "A description")
img.removeAttribute("hidden")
console.log(img.id, img.className)     // direct property access for common attrs

// Styles and classes
const box = document.querySelector(".box")
box.style.backgroundColor = "red"     // camelCase for CSS properties
box.style.width = "200px"

box.classList.add("active")
box.classList.remove("hidden")
box.classList.toggle("open")           // add if missing, remove if present
box.classList.contains("active")       // true

// Creating and inserting elements
const li = document.createElement("li")
li.textContent = "New item"
li.classList.add("item")

const ul = document.querySelector("ul")
ul.appendChild(li)                     // add at end
ul.prepend(li)                         // add at start
ul.insertBefore(li, ul.children[2])   // insert at position

li.remove()   // remove element`,
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// Events
const btn = document.querySelector("button")

// addEventListener (preferred over onclick attribute)
btn.addEventListener("click", (event) => {
  console.log("clicked!", event.target)
  event.preventDefault()   // prevent default browser action (form submit, link follow)
  event.stopPropagation()  // stop event bubbling up to parent elements
})

// Event delegation — one listener on parent handles all children
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.matches("li")) {
    e.target.classList.toggle("done")
  }
})

// Common events
document.addEventListener("DOMContentLoaded", () => {
  // DOM is ready — safe to query elements
})

window.addEventListener("resize", () => {
  console.log(window.innerWidth, window.innerHeight)
})

// Form events
const form = document.querySelector("form")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  const data = new FormData(form)
  console.log(data.get("username"))
})

const input = document.querySelector("input")
input.addEventListener("input", (e) => {
  console.log("current value:", e.target.value)
})

// Keyboard events
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal()
  if (e.ctrlKey && e.key === "s") { e.preventDefault(); save() }
})`,
        },
        {
          type: 'note',
          content: 'Never use innerHTML with user-provided content — it executes scripts and enables XSS attacks. Use textContent for plain text, or create elements with createElement and textContent for safe HTML construction.',
        },
      ],
    },
    {
      slug: 'modules',
      title: 'Modules & npm',
      intro: "JavaScript modules let you split code across files and import only what you need. They also gave rise to npm, which has over 2 million packages, making it simultaneously the world's largest software repository and the world's largest potential supply-chain attack surface.",
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `// ES Modules (use in browsers and Node.js with "type": "module" in package.json)

// math.js — named exports
export function add(a, b) { return a + b }
export function subtract(a, b) { return a - b }
export const PI = 3.14159

// Default export (one per module)
export default class Calculator {
  add(a, b) { return a + b }
}

// utils/strings.js
export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)
export const slugify = (s) => s.toLowerCase().replace(/\\s+/g, "-")

// main.js — importing
import Calculator from "./math.js"           // default import
import { add, PI } from "./math.js"          // named imports
import { capitalize as cap } from "./utils/strings.js"  // rename on import
import * as MathUtils from "./math.js"       // namespace import

console.log(add(2, 3))         // 5
console.log(PI)                // 3.14159
console.log(MathUtils.PI)      // 3.14159
console.log(cap("hello"))      // Hello

// Dynamic import — load a module only when needed
async function loadHeavyModule() {
  const { heavyFunction } = await import("./heavy.js")
  return heavyFunction()
}`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `# npm basics
npm init -y          # create package.json
npm install lodash   # install a package (adds to dependencies)
npm install -D jest  # install as devDependency (testing tools etc.)
npm install          # install all dependencies from package.json
npm update           # update packages to latest allowed versions

# Run scripts defined in package.json
npm run test
npm run build
npm run dev

# package.json scripts section:
# {
#   "scripts": {
#     "start": "node index.js",
#     "dev":   "node --watch index.js",
#     "test":  "jest"
#   }
# }`,
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// CommonJS (older Node.js style, .js files without "type": "module")
const fs = require('fs')
const path = require('path')
const { EventEmitter } = require('events')

module.exports = { myFunction }
module.exports.myValue = 42

// Using a popular npm package (lodash)
import _ from 'lodash'

const data = [1, 2, 2, 3, 3, 3, 4]
console.log(_.uniq(data))           // [1, 2, 3, 4]
console.log(_.chunk(data, 3))       // [[1, 2, 2], [3, 3, 3], [4]]
console.log(_.groupBy([6.1, 4.2, 6.3], Math.floor))  // { 4: [4.2], 6: [6.1, 6.3] }

const users = [
  { name: "Alice", age: 30 },
  { name: "Bob",   age: 25 },
  { name: "Carol", age: 35 },
]
console.log(_.sortBy(users, "age"))
console.log(_.minBy(users, "age"))  // { name: 'Bob', age: 25 }
console.log(_.maxBy(users, "age"))  // { name: 'Carol', age: 35 }

// Deep clone (no structuredClone needed for older envs)
const original = { a: { b: { c: 1 } } }
const clone = _.cloneDeep(original)
clone.a.b.c = 99
console.log(original.a.b.c)  // 1 (untouched)`,
        },
        {
          type: 'note',
          content: 'Keep node_modules out of git — add it to .gitignore. The package-lock.json file should be committed; it records exact versions of every dependency so installs are reproducible across machines and CI.',
        },
      ],
    },
    {
      slug: 'error-handling-advanced',
      title: 'Error Handling & Debugging',
      intro: 'JavaScript has one Error type but many error names, a try/catch that silently swallows everything, and async errors that require special handling. The good news: once you understand the three failure modes, it gets simple.',
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `// Error types
try {
  null.property           // TypeError
} catch (e) {
  console.log(e instanceof TypeError)  // true
  console.log(e.name)     // 'TypeError'
  console.log(e.message)  // Cannot read properties of null
  console.log(e.stack)    // full stack trace
}

// Custom errors
class ValidationError extends Error {
  constructor(field, message) {
    super(message)
    this.name = "ValidationError"
    this.field = field
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.name = "NetworkError"
    this.statusCode = statusCode
  }
}

function validateAge(age) {
  if (typeof age !== "number") throw new ValidationError("age", "must be a number")
  if (age < 0 || age > 150)  throw new ValidationError("age", "must be 0-150")
  return true
}

try {
  validateAge(-5)
} catch (e) {
  if (e instanceof ValidationError) {
    console.log(\`Field "\${e.field}" failed: \${e.message}\`)
  } else {
    throw e  // re-throw unexpected errors
  }
}`,
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// Async error handling
// Three patterns: callbacks (old), Promises, async/await

// 1. Promise catch
fetch("https://api.example.com/data")
  .then(res => {
    if (!res.ok) throw new NetworkError("Request failed", res.status)
    return res.json()
  })
  .then(data => console.log(data))
  .catch(err => {
    if (err instanceof NetworkError) {
      console.error(\`HTTP \${err.statusCode}: \${err.message}\`)
    } else {
      console.error("Unexpected error:", err)
    }
  })
  .finally(() => console.log("Request complete"))

// 2. async/await try/catch (preferred)
async function fetchUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`)
    if (!res.ok) throw new NetworkError("Not found", res.status)
    return await res.json()
  } catch (err) {
    if (err instanceof NetworkError && err.statusCode === 404) {
      return null  // user not found — not an error per se
    }
    throw err     // re-throw everything else
  }
}

// Handling multiple async operations
async function loadDashboard(userId) {
  const results = await Promise.allSettled([
    fetchUser(userId),
    fetch("/api/notifications").then(r => r.json()),
    fetch("/api/stats").then(r => r.json()),
  ])

  for (const [i, result] of results.entries()) {
    if (result.status === "rejected") {
      console.error(\`Request \${i} failed:\`, result.reason)
    }
  }

  return results
    .filter(r => r.status === "fulfilled")
    .map(r => r.value)
}`,
        },
        {
          type: 'warning',
          content: 'Never use empty catch blocks: catch (e) {}. This silently swallows errors and makes debugging a nightmare. At minimum, log the error. If you truly want to ignore an error, write a comment explaining why: // ignore AbortError from cancelled fetch.',
        },
      ],
    },
  ],
}
