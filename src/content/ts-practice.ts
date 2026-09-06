import type { Section } from './types'

/**
 * Graded TypeScript practice. Types are erased before running, so checks combine runtime
 * behaviour with a look at the source (_src) for the annotations the lesson is teaching.
 */
export const tsPractice: Record<string, Section[]> = {
  'basic-types': [
    {
      type: 'exercise',
      language: 'typescript',
      content: 'Annotate every declaration with an explicit type: a string, a number, a boolean, an array of strings, and a tuple of [string, number]. Then build summary so it reads Bede has 3 books.',
      exercise: {
        title: 'Annotate the basics',
        starter: `const name = "Bede"\nconst books = 3\nconst isMonk = true\nconst titles = ["Historia", "De temporum ratione"]\nconst pair = ["Jarrow", 673]\n\nconst summary = ""\nconsole.log(summary)\n`,
        solution: `const name: string = "Bede"\nconst books: number = 3\nconst isMonk: boolean = true\nconst titles: string[] = ["Historia", "De temporum ratione"]\nconst pair: [string, number] = ["Jarrow", 673]\n\nconst summary: string = \`\${name} has \${books} books\`\nconsole.log(summary)\n`,
        hints: ['Annotations go after the name: const name: string = ...', 'A tuple type lists each position: [string, number].'],
        tests: [
          { name: 'summary reads correctly', check: `assert.equal(summary, 'Bede has 3 books')` },
          { name: 'Primitive annotations present', check: `assert(/name\\s*:\\s*string/.test(_src) && /books\\s*:\\s*number/.test(_src) && /isMonk\\s*:\\s*boolean/.test(_src), 'annotate name, books and isMonk')` },
          { name: 'Array and tuple annotations', check: `assert(/titles\\s*:\\s*(string\\[\\]|Array<string>)/.test(_src), 'titles: string[]'); assert(/pair\\s*:\\s*\\[\\s*string\\s*,\\s*number\\s*\\]/.test(_src), 'pair: [string, number]')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What happens at runtime when TypeScript code with a type error is compiled with plain tsc and run?',
      quiz: {
        choices: [
          { text: 'tsc reports the error, but the emitted JavaScript still runs; types are erased', correct: true, explanation: 'Types exist only at compile time. That is why the sandbox here erases them — full checking needs the compiler and its lib files.' },
          { text: 'The program refuses to start', explanation: 'JavaScript has no idea the types were ever there.' },
          { text: 'The value is converted to the right type', explanation: 'No conversion ever happens; annotations are documentation the compiler checks.' },
        ],
      },
    },
  ],

  'interfaces-and-types': [
    {
      type: 'exercise',
      language: 'typescript',
      content: 'Define an interface Monk with name (string), age (number), optional skills (string array) and a readonly id (number). Then write describe(m: Monk) returning "Bede (62): scribe, historian" — or "Bede (62): no skills listed" when skills are missing.',
      exercise: {
        title: 'An interface with optional and readonly fields',
        starter: `// interface Monk { ... }\n\nfunction describe(m) {\n  return ""\n}\n\nconsole.log(describe({ id: 1, name: "Bede", age: 62, skills: ["scribe", "historian"] }))\nconsole.log(describe({ id: 2, name: "Hild", age: 66 }))\n`,
        solution: `interface Monk {\n  readonly id: number\n  name: string\n  age: number\n  skills?: string[]\n}\n\nfunction describe(m: Monk): string {\n  const skills = m.skills && m.skills.length ? m.skills.join(", ") : "no skills listed"\n  return \`\${m.name} (\${m.age}): \${skills}\`\n}\n\nconsole.log(describe({ id: 1, name: "Bede", age: 62, skills: ["scribe", "historian"] }))\nconsole.log(describe({ id: 2, name: "Hild", age: 66 }))\n`,
        hints: ['Optional properties use a question mark: skills?: string[]', 'readonly id: number prevents reassignment after construction.'],
        tests: [
          { name: 'Describes a monk with skills', check: `assert.equal(describe({ id: 1, name: 'Bede', age: 62, skills: ['scribe', 'historian'] }), 'Bede (62): scribe, historian')` },
          { name: 'Handles missing skills', check: `assert.equal(describe({ id: 2, name: 'Hild', age: 66 }), 'Hild (66): no skills listed')` },
          { name: 'Interface declares the fields', check: `assert(/interface\\s+Monk/.test(_src), 'declare interface Monk'); assert(/readonly\\s+id\\s*:\\s*number/.test(_src), 'readonly id'); assert(/skills\\?\\s*:/.test(_src), 'skills is optional')` },
          { name: 'describe is annotated', check: `assert(/describe\\s*\\(\\s*m\\s*:\\s*Monk\\s*\\)/.test(_src), 'annotate the parameter as Monk')` },
        ],
      },
    },
    {
      type: 'exercise',
      language: 'typescript',
      content: 'Model a payment with a discriminated union: type Payment is either { kind: "card"; last4: string } or { kind: "cash" } or { kind: "transfer"; iban: string }. Write label(p: Payment) that returns "Card ending 4242", "Cash" or "Transfer to DE89…" (first four characters of the IBAN followed by an ellipsis).',
      exercise: {
        title: 'A discriminated union',
        starter: `// type Payment = ...\n\nfunction label(p) {\n  return ""\n}\n\nconsole.log(label({ kind: "card", last4: "4242" }))\nconsole.log(label({ kind: "cash" }))\nconsole.log(label({ kind: "transfer", iban: "DE89370400440532013000" }))\n`,
        solution: `type Payment =\n  | { kind: "card"; last4: string }\n  | { kind: "cash" }\n  | { kind: "transfer"; iban: string }\n\nfunction label(p: Payment): string {\n  switch (p.kind) {\n    case "card":\n      return \`Card ending \${p.last4}\`\n    case "cash":\n      return "Cash"\n    case "transfer":\n      return \`Transfer to \${p.iban.slice(0, 4)}…\`\n  }\n}\n\nconsole.log(label({ kind: "card", last4: "4242" }))\nconsole.log(label({ kind: "cash" }))\nconsole.log(label({ kind: "transfer", iban: "DE89370400440532013000" }))\n`,
        hints: ['Join the object types with | and give each a literal kind.', 'switch (p.kind) narrows p in each case, so p.last4 is only available under "card".'],
        tests: [
          { name: 'Card', check: `assert.equal(label({ kind: 'card', last4: '4242' }), 'Card ending 4242')` },
          { name: 'Cash', check: `assert.equal(label({ kind: 'cash' }), 'Cash')` },
          { name: 'Transfer', check: `assert.equal(label({ kind: 'transfer', iban: 'DE89370400440532013000' }), 'Transfer to DE89…')` },
          { name: 'Uses a union type alias', check: `assert(/type\\s+Payment\\s*=/.test(_src) && (_src.match(/kind\\s*:\\s*"/g) || []).length >= 3, 'declare type Payment as a union of three object types')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'When should you pick a type alias over an interface?',
      quiz: {
        choices: [
          { text: 'For unions, tuples and other non-object shapes; interfaces are for object shapes you may extend', correct: true, explanation: 'Both work for objects. Only type can express string | number or [string, number]; only interface can be merged and extended in the classic way.' },
          { text: 'Always; interfaces are deprecated', explanation: 'Interfaces are alive and well and give better error messages for object shapes.' },
          { text: 'Never; type is slower', explanation: 'There is no runtime cost to either — both vanish at compile time.' },
        ],
      },
    },
  ],

  'functions': [
    {
      type: 'exercise',
      language: 'typescript',
      content: 'Write applyDiscount(price: number, percent = 10): number, and a function type alias Formatter = (n: number) => string. Then implement money: Formatter that renders 12.5 as "£12.50".',
      exercise: {
        title: 'Typed functions and function types',
        starter: `function applyDiscount(price, percent) {\n  return price\n}\n\n// type Formatter = ...\n\nconst money = n => String(n)\n\nconsole.log(money(applyDiscount(50)))\nconsole.log(money(applyDiscount(50, 25)))\n`,
        solution: `function applyDiscount(price: number, percent: number = 10): number {\n  return price * (1 - percent / 100)\n}\n\ntype Formatter = (n: number) => string\n\nconst money: Formatter = n => \`£\${n.toFixed(2)}\`\n\nconsole.log(money(applyDiscount(50)))\nconsole.log(money(applyDiscount(50, 25)))\n`,
        hints: ['A default parameter still gets a type: percent: number = 10', 'A function type alias looks like an arrow with types: (n: number) => string'],
        tests: [
          { name: 'Default 10% discount', check: `assert.equal(applyDiscount(50), 45)` },
          { name: 'Custom discount', check: `assert.equal(applyDiscount(50, 25), 37.5)` },
          { name: 'money formats to two decimals with £', check: `assert.equal(money(12.5), '£12.50'); assert.equal(money(3), '£3.00')` },
          { name: 'Parameter, return and Formatter types declared', check: `assert(/applyDiscount\\s*\\(\\s*price\\s*:\\s*number/.test(_src), 'annotate price'); assert(/\\)\\s*:\\s*number\\s*\\{/.test(_src), 'annotate the return type'); assert(/type\\s+Formatter\\s*=\\s*\\(\\s*\\w+\\s*:\\s*number\\s*\\)\\s*=>\\s*string/.test(_src), 'declare type Formatter'); assert(/money\\s*:\\s*Formatter/.test(_src), 'annotate money as Formatter')` },
        ],
      },
    },
  ],

  'classes': [
    {
      type: 'exercise',
      language: 'typescript',
      content: 'Write a Library class using parameter properties: the constructor takes a public readonly name and a private books array (default empty). Add add(title: string): this, count getter, and has(title: string): boolean.',
      exercise: {
        title: 'Parameter properties and access modifiers',
        starter: `class Library {\n  constructor(name) {\n    this.name = name\n    this.books = []\n  }\n}\n\nconst lib = new Library("Jarrow")\nlib.add("Historia").add("De natura rerum")\nconsole.log(lib.name, lib.count, lib.has("Historia"))\n`,
        solution: `class Library {\n  constructor(public readonly name: string, private books: string[] = []) {}\n\n  add(title: string): this {\n    this.books.push(title)\n    return this\n  }\n\n  get count(): number {\n    return this.books.length\n  }\n\n  has(title: string): boolean {\n    return this.books.includes(title)\n  }\n}\n\nconst lib = new Library("Jarrow")\nlib.add("Historia").add("De natura rerum")\nconsole.log(lib.name, lib.count, lib.has("Historia"))\n`,
        hints: ['constructor(public readonly name: string, private books: string[] = []) {} declares and assigns both fields.', 'Returning this from add() lets calls chain.'],
        tests: [
          { name: 'Chaining and counting', check: `const l = new Library('Test'); l.add('a').add('b'); assert.equal(l.count, 2); assert.equal(l.name, 'Test')` },
          { name: 'has()', check: `const l = new Library('T'); l.add('x'); assert.equal(l.has('x'), true); assert.equal(l.has('y'), false)` },
          { name: 'Uses parameter properties', check: `assert(/constructor\\s*\\(\\s*public\\s+readonly\\s+name\\s*:\\s*string/.test(_src), 'public readonly name in the constructor'); assert(/private\\s+books/.test(_src), 'private books')` },
          { name: 'count is a getter', check: `const d = Object.getOwnPropertyDescriptor(Library.prototype, 'count'); assert(d && typeof d.get === 'function', 'define get count()')` },
        ],
      },
    },
  ],

  'generics': [
    {
      type: 'exercise',
      language: 'typescript',
      content: 'Write a generic function firstOr<T>(items: T[], fallback: T): T that returns the first element or the fallback, and a generic class Stack<T> with push, pop (returns T | undefined) and a size getter.',
      exercise: {
        title: 'Generic function and class',
        starter: `function firstOr(items, fallback) {\n  return fallback\n}\n\nclass Stack {\n  items = []\n}\n\nconsole.log(firstOr([3, 4], 0), firstOr([], "none"))\nconst s = new Stack()\ns.push("a"); s.push("b")\nconsole.log(s.pop(), s.size)\n`,
        solution: `function firstOr<T>(items: T[], fallback: T): T {\n  return items.length ? items[0] : fallback\n}\n\nclass Stack<T> {\n  private items: T[] = []\n\n  push(item: T): void {\n    this.items.push(item)\n  }\n\n  pop(): T | undefined {\n    return this.items.pop()\n  }\n\n  get size(): number {\n    return this.items.length\n  }\n}\n\nconsole.log(firstOr([3, 4], 0), firstOr([], "none"))\nconst s = new Stack<string>()\ns.push("a"); s.push("b")\nconsole.log(s.pop(), s.size)\n`,
        hints: ['Declare the type parameter after the name: function firstOr<T>(...)', 'class Stack<T> can then use T for the items array and method signatures.'],
        tests: [
          { name: 'firstOr', check: `assert.equal(firstOr([3, 4], 0), 3); assert.equal(firstOr([], 'none'), 'none')` },
          { name: 'Stack push/pop/size', check: `const st = new Stack(); st.push(1); st.push(2); assert.equal(st.pop(), 2); assert.equal(st.size, 1); st.pop(); assert.equal(st.pop(), undefined)` },
          { name: 'Generic declarations', check: `assert(/function\\s+firstOr\\s*<\\s*T\\s*>/.test(_src), 'firstOr<T>'); assert(/class\\s+Stack\\s*<\\s*T\\s*>/.test(_src), 'Stack<T>'); assert(/pop\\s*\\(\\s*\\)\\s*:\\s*T\\s*\\|\\s*undefined/.test(_src), 'pop(): T | undefined')` },
        ],
      },
    },
  ],

  'utility-types': [
    {
      type: 'exercise',
      language: 'typescript',
      content: 'Given interface User { id: number; name: string; email: string; role: "admin" | "reader" }, declare UserPreview = Pick<User, "id" | "name">, UserPatch = Partial<Omit<User, "id">>, and write updateUser(user: User, patch: UserPatch): User that returns a new object with the patch applied.',
      exercise: {
        title: 'Pick, Omit and Partial',
        starter: `interface User {\n  id: number\n  name: string\n  email: string\n  role: "admin" | "reader"\n}\n\n// type UserPreview = ...\n// type UserPatch = ...\n\nfunction updateUser(user, patch) {\n  return user\n}\n\nconst ada = { id: 1, name: "Ada", email: "ada@abbey.edu", role: "reader" }\nconsole.log(updateUser(ada, { role: "admin" }))\n`,
        solution: `interface User {\n  id: number\n  name: string\n  email: string\n  role: "admin" | "reader"\n}\n\ntype UserPreview = Pick<User, "id" | "name">\ntype UserPatch = Partial<Omit<User, "id">>\n\nfunction updateUser(user: User, patch: UserPatch): User {\n  return { ...user, ...patch }\n}\n\nconst ada: User = { id: 1, name: "Ada", email: "ada@abbey.edu", role: "reader" }\nconsole.log(updateUser(ada, { role: "admin" }))\n`,
        hints: ['Pick keeps listed keys; Omit removes them; Partial makes every key optional.', 'Spread the user then the patch so patched fields win: { ...user, ...patch }'],
        tests: [
          { name: 'Applies the patch without mutating', check: `const u = { id: 1, name: 'Ada', email: 'a@b', role: 'reader' }; const r = updateUser(u, { role: 'admin' }); assert.equal(r.role, 'admin'); assert.equal(u.role, 'reader'); assert.equal(r.id, 1)` },
          { name: 'UserPreview and UserPatch declared with utility types', check: `assert(/type\\s+UserPreview\\s*=\\s*Pick\\s*<\\s*User\\s*,/.test(_src), 'Pick<User, ...>'); assert(/type\\s+UserPatch\\s*=\\s*Partial\\s*<\\s*Omit\\s*<\\s*User\\s*,\\s*"id"\\s*>\\s*>/.test(_src), 'Partial<Omit<User, "id">>')` },
          { name: 'updateUser is typed', check: `assert(/updateUser\\s*\\(\\s*user\\s*:\\s*User\\s*,\\s*patch\\s*:\\s*UserPatch\\s*\\)\\s*:\\s*User/.test(_src), 'annotate parameters and return type')` },
        ],
      },
    },
  ],

  'narrowing-and-guards': [
    {
      type: 'exercise',
      language: 'typescript',
      content: 'Write a type guard isString(value: unknown): value is string, then formatValue(value: unknown): string that returns strings upper-cased, numbers with two decimals, arrays as their length in brackets, and "?" for anything else — narrowing at each step.',
      exercise: {
        title: 'Narrowing unknown',
        starter: `function isString(value) {\n  return false\n}\n\nfunction formatValue(value) {\n  return "?"\n}\n\nconsole.log(formatValue("bede"), formatValue(3.14159), formatValue([1, 2, 3]), formatValue(null))\n`,
        solution: `function isString(value: unknown): value is string {\n  return typeof value === "string"\n}\n\nfunction formatValue(value: unknown): string {\n  if (isString(value)) return value.toUpperCase()\n  if (typeof value === "number") return value.toFixed(2)\n  if (Array.isArray(value)) return \`[\${value.length}]\`\n  return "?"\n}\n\nconsole.log(formatValue("bede"), formatValue(3.14159), formatValue([1, 2, 3]), formatValue(null))\n`,
        hints: ['A type predicate return type — value is string — tells the compiler what a true result means.', 'typeof and Array.isArray narrow unknown inside if blocks.'],
        tests: [
          { name: 'Each branch', check: `assert.equal(formatValue('bede'), 'BEDE'); assert.equal(formatValue(3.14159), '3.14'); assert.equal(formatValue([1, 2, 3]), '[3]'); assert.equal(formatValue(null), '?'); assert.equal(formatValue({}), '?')` },
          { name: 'isString works', check: `assert.equal(isString('x'), true); assert.equal(isString(1), false)` },
          { name: 'Uses a type predicate and unknown', check: `assert(/value\\s*is\\s+string/.test(_src), 'return type "value is string"'); assert(/formatValue\\s*\\(\\s*value\\s*:\\s*unknown\\s*\\)/.test(_src), 'accept unknown')` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'Why prefer unknown over any for a value you have not inspected yet?',
      quiz: {
        choices: [
          { text: 'unknown forces you to narrow before using it; any switches the checker off', correct: true, explanation: 'With unknown, value.toUpperCase() is an error until you prove it is a string. With any, nothing is checked and bugs slip through.' },
          { text: 'unknown is faster at runtime', explanation: 'Neither exists at runtime.' },
          { text: 'any cannot hold objects', explanation: 'any can hold anything — that is exactly the problem.' },
        ],
      },
    },
  ],
}
