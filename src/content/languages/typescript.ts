import { Language } from '../types'

export const typescript: Language = {
  slug: 'typescript',
  name: 'TypeScript',
  tagline: 'JavaScript that scales.',
  description: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It catches errors early in your editor, not later in production. All valid JavaScript is valid TypeScript — migration is gradual.',
  accentColor: '#3178C6',
  textOnAccent: '#FFFFFF',
  icon: 'TS',
  difficulty: 'intermediate',
  usedFor: ['Web Development', 'Full-stack Applications', 'Libraries', 'Tooling'],
  notableUsers: ['Microsoft', 'Slack', 'Asana', 'Airbnb', 'Google'],
  setup: {
    description: 'TypeScript is installed via npm. For quick experimentation, ts-node lets you run .ts files directly without a compile step.',
    windows: `# Install Node.js from nodejs.org first
# Then install TypeScript and ts-node:
npm install -g typescript ts-node

# Verify:
tsc --version
ts-node --version`,
    mac: `# Install Node.js via Homebrew:
brew install node

# Then install TypeScript and ts-node:
npm install -g typescript ts-node

# Verify:
tsc --version`,
    linux: `# Install Node.js via nvm (recommended):
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

# Then:
npm install -g typescript ts-node

# Verify:
tsc --version`,
  },
  lessons: [
    {
      slug: 'hello-world',
      title: 'Hello, TypeScript!',
      intro: "TypeScript is a superset of JavaScript. Every .js file is valid TypeScript — you just get to add types on top. Start simple, add types where they help.",
      sections: [
        {
          type: 'text',
          content: 'TypeScript files end in .ts. The TypeScript compiler (tsc) transpiles them to plain JavaScript. Alternatively, ts-node runs TypeScript directly for scripts and development.',
        },
        {
          type: 'code',
          language: 'typescript',
          content: `// hello.ts
function greet(name: string): string {
  return \`Hello, \${name.toUpperCase()}!\`
}

console.log(greet("World"))   // Hello, WORLD!

// TypeScript catches this at compile time — before you run the code:
// greet(42)   // Error: Argument of type 'number' is not assignable to parameter of type 'string'`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Compile to JS, then run:
tsc hello.ts
node hello.js

# Or run directly with ts-node:
ts-node hello.ts

# Compile entire project with tsconfig:
tsc --init     # generates tsconfig.json
tsc            # compiles everything in project`,
        },
        {
          type: 'note',
          content: "TypeScript types only exist at compile time. Once compiled to JavaScript, all type information is erased — it adds zero runtime overhead. The types are purely for you, your editor, and the compiler.",
        },
      ],
    },
    {
      slug: 'basic-types',
      title: 'Basic Types',
      intro: "TypeScript has all JavaScript's types plus a few extras: tuples, enums, `unknown`, `never`, and `void`. The most important one is the one TypeScript infers for you automatically.",
      sections: [
        {
          type: 'code',
          language: 'typescript',
          content: `// Primitive types
let name: string      = "Alice"
let age: number       = 30
let active: boolean   = true
let nothing: null     = null
let missing: undefined = undefined

// Type inference — TypeScript infers from assignment, annotation often optional
let inferredName = "Bob"      // TypeScript knows this is string
let inferredAge  = 25         // TypeScript knows this is number
// inferredAge = "twenty-five"  // Error: Type 'string' is not assignable to 'number'

// Arrays
let nums: number[]         = [1, 2, 3]
let strs: Array<string>    = ["a", "b", "c"]  // generic form
let mixed: (string|number)[] = ["a", 1, "b", 2]

// Tuples — fixed-length array with known types at each position
let point: [number, number]           = [10, 20]
let entry: [string, number, boolean]  = ["Alice", 30, true]

const [x, y] = point   // destructuring works

// any — opt out of type checking (use sparingly)
let wild: any = "anything"
wild = 42
wild = true
wild.nonExistentMethod()  // no error — you lose type safety

// unknown — safer alternative to any (must narrow before use)
let input: unknown = getUserInput()
if (typeof input === "string") {
  console.log(input.toUpperCase())  // OK — narrowed to string
}

function getUserInput(): unknown { return "hello" }`,
        },
        {
          type: 'code',
          language: 'typescript',
          content: `// Enums — named constants
enum Direction {
  Up    = "UP",
  Down  = "DOWN",
  Left  = "LEFT",
  Right = "RIGHT",
}

function move(dir: Direction): void {
  console.log(\`Moving \${dir}\`)
}

move(Direction.Up)   // Moving UP
// move("UP")        // Error: string is not Direction

// Const enums — inlined at compile time, no runtime object
const enum Status {
  Pending,    // 0
  Active,     // 1
  Inactive,   // 2
}

// void — function returns nothing
function log(msg: string): void {
  console.log(msg)
}

// never — function never returns (throws or infinite loops)
function fail(msg: string): never {
  throw new Error(msg)
}

// Type assertions — tell TypeScript you know better
const input = document.getElementById("name") as HTMLInputElement
const value = (input).value`,
        },
        {
          type: 'tip',
          content: 'Prefer `unknown` over `any`. With `any`, TypeScript stops checking entirely. With `unknown`, you must narrow the type before using it — which forces you to handle the case properly. Reserve `any` for genuinely untyped third-party data where you\'ll add types later.',
        },
      ],
    },
    {
      slug: 'interfaces-and-types',
      title: 'Interfaces & Type Aliases',
      intro: "Interfaces and type aliases both let you name a shape. The difference is subtle — interfaces are open (extendable), type aliases are closed. In practice, use whichever your team prefers. The important thing is using them.",
      sections: [
        {
          type: 'code',
          language: 'typescript',
          content: `// Interface
interface User {
  id: number
  name: string
  email?: string        // optional property
  readonly createdAt: Date  // can't be reassigned after creation
}

const user: User = {
  id: 1,
  name: "Alice",
  createdAt: new Date(),
}

// user.createdAt = new Date()   // Error: readonly

// Extending interfaces
interface AdminUser extends User {
  role: "admin" | "superadmin"
  permissions: string[]
}

// Type alias — can do everything interfaces can, plus more
type Point = {
  x: number
  y: number
}

// Type aliases can represent primitives, unions, intersections
type ID      = string | number
type Status  = "active" | "inactive" | "pending"  // literal union type

// Intersection types — combine multiple types
type TimestampedUser = User & {
  updatedAt: Date
  version: number
}

const admin: AdminUser = {
  id: 2,
  name: "Bob",
  createdAt: new Date(),
  role: "admin",
  permissions: ["read", "write", "delete"],
}`,
        },
        {
          type: 'code',
          language: 'typescript',
          content: `// Index signatures — object with dynamic keys
interface StringMap {
  [key: string]: string
}

const config: StringMap = {
  host: "localhost",
  port: "3000",
  env: "development",
}

// Function types in interfaces
interface Transformer<T, U> {
  (input: T): U
}

const double: Transformer<number, number> = (n) => n * 2
const stringify: Transformer<number, string> = (n) => String(n)

// Discriminated unions — tagged union types
type Shape =
  | { kind: "circle";    radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle";  base: number;  height: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2
    case "rectangle":
      return shape.width * shape.height
    case "triangle":
      return 0.5 * shape.base * shape.height
  }
  // TypeScript knows all cases are handled — no default needed
}

console.log(area({ kind: "circle", radius: 5 }))     // 78.54...
console.log(area({ kind: "rectangle", width: 4, height: 6 }))  // 24`,
        },
        {
          type: 'tip',
          content: 'Use literal union types like `"active" | "inactive"` instead of plain strings wherever you have a fixed set of values. TypeScript will then catch typos at compile time, and your editor will autocomplete the valid values.',
        },
      ],
    },
    {
      slug: 'functions',
      title: 'Typed Functions',
      intro: "Adding types to functions is where TypeScript pays off most immediately — your editor knows what you're passing and what you'll get back, and the compiler catches mismatches before you run anything.",
      sections: [
        {
          type: 'code',
          language: 'typescript',
          content: `// Function declarations — parameter and return types
function add(a: number, b: number): number {
  return a + b
}

// Arrow functions
const multiply = (a: number, b: number): number => a * b

// Optional parameters — must come after required ones
function greet(name: string, greeting?: string): string {
  return \`\${greeting ?? "Hello"}, \${name}!\`
}

// Default parameters
function createUser(name: string, role: string = "user", active: boolean = true) {
  return { name, role, active }
}

// Rest parameters
function sum(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0)
}

console.log(sum(1, 2, 3, 4, 5))  // 15

// Function overloads — multiple signatures for one implementation
function format(value: string): string
function format(value: number): string
function format(value: string | number): string {
  if (typeof value === "number") return value.toFixed(2)
  return value.trim()
}

console.log(format(3.14159))  // "3.14"
console.log(format("  hello  "))  // "hello"`,
        },
        {
          type: 'code',
          language: 'typescript',
          content: `// Higher-order functions with types
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn)
}

const doubled = map([1, 2, 3], n => n * 2)           // number[]
const strings = map([1, 2, 3], n => n.toString())     // string[]

// Callback types
type Predicate<T> = (item: T) => boolean
type Transformer<T, U> = (item: T) => U

function filter<T>(arr: T[], pred: Predicate<T>): T[] {
  return arr.filter(pred)
}

// Type narrowing — TypeScript learns the type from checks
function processValue(val: string | number | null): string {
  if (val === null) return "null"
  if (typeof val === "number") return val.toFixed(2)
  return val.toUpperCase()  // TypeScript knows val is string here
}

// User-defined type guards
interface Cat { meow(): void }
interface Dog { bark(): void }

function isCat(animal: Cat | Dog): animal is Cat {
  return "meow" in animal
}

function makeSound(animal: Cat | Dog): void {
  if (isCat(animal)) {
    animal.meow()   // TypeScript knows it's a Cat
  } else {
    animal.bark()   // TypeScript knows it's a Dog
  }
}`,
        },
        {
          type: 'tip',
          content: 'Always annotate function return types explicitly on public API functions — even though TypeScript can infer them. Explicit return types act as a contract: if you accidentally return the wrong type, TypeScript flags the function body, not the caller.',
        },
      ],
    },
    {
      slug: 'classes',
      title: 'Classes',
      intro: "TypeScript classes add access modifiers (`public`, `private`, `protected`, `readonly`) and parameter properties — a shorthand that declares and assigns instance properties in the constructor signature.",
      sections: [
        {
          type: 'code',
          language: 'typescript',
          content: `class Animal {
  // Access modifiers:
  // public    — accessible anywhere (default)
  // private   — accessible only inside this class
  // protected — accessible inside this class and subclasses
  // readonly  — can only be assigned in constructor

  readonly id: number
  public name: string
  private sound: string
  protected energy: number = 100

  // Static counter
  private static nextId = 1

  // Parameter properties — shorthand for declaring + assigning
  constructor(name: string, sound: string) {
    this.id    = Animal.nextId++
    this.name  = name
    this.sound = sound
  }

  speak(): string {
    return \`\${this.name} says \${this.sound}!\`
  }

  // Getter / setter
  get isEnergetic(): boolean {
    return this.energy > 50
  }

  set energyLevel(val: number) {
    if (val < 0 || val > 100) throw new RangeError("Energy must be 0-100")
    this.energy = val
  }

  static kingdom = "Animalia"
}

const a = new Animal("Rex", "woof")
console.log(a.speak())          // Rex says woof!
console.log(a.isEnergetic)      // true
console.log(Animal.kingdom)     // Animalia`,
        },
        {
          type: 'code',
          language: 'typescript',
          content: `// Inheritance and abstract classes
abstract class Shape {
  abstract area(): number    // subclasses must implement
  abstract perimeter(): number

  describe(): string {
    return \`Area: \${this.area().toFixed(2)}, Perimeter: \${this.perimeter().toFixed(2)}\`
  }
}

class Circle extends Shape {
  constructor(private radius: number) {   // parameter property shorthand
    super()
  }

  area(): number      { return Math.PI * this.radius ** 2 }
  perimeter(): number { return 2 * Math.PI * this.radius }
}

class Rectangle extends Shape {
  constructor(
    private width: number,
    private height: number,
  ) { super() }

  area(): number      { return this.width * this.height }
  perimeter(): number { return 2 * (this.width + this.height) }
}

// Interfaces implemented by classes
interface Serializable {
  serialize(): string
  deserialize(data: string): void
}

class Config implements Serializable {
  private data: Record<string, unknown> = {}

  serialize(): string       { return JSON.stringify(this.data) }
  deserialize(json: string) { this.data = JSON.parse(json) }
  set(key: string, val: unknown) { this.data[key] = val }
  get(key: string) { return this.data[key] }
}

const c = new Circle(5)
const r = new Rectangle(4, 6)
console.log(c.describe())   // Area: 78.54, Perimeter: 31.42
console.log(r.describe())   // Area: 24.00, Perimeter: 20.00`,
        },
      ],
    },
    {
      slug: 'generics',
      title: 'Generics',
      intro: "Generics let you write code that works with many types while staying type-safe. Think of `<T>` as a type parameter — like a function parameter, but for types.",
      sections: [
        {
          type: 'code',
          language: 'typescript',
          content: `// Generic function — works with any type T
function identity<T>(value: T): T {
  return value
}

const n = identity(42)          // T inferred as number
const s = identity("hello")     // T inferred as string
const explicit = identity<boolean>(true)

// Generic with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: "Alice", age: 30, active: true }
const name = getProperty(user, "name")   // TypeScript knows this is string
const age  = getProperty(user, "age")    // TypeScript knows this is number
// getProperty(user, "email")   // Error: "email" not in user

// Generic class
class Stack<T> {
  private items: T[] = []

  push(item: T): void   { this.items.push(item) }
  pop(): T | undefined  { return this.items.pop() }
  peek(): T | undefined { return this.items.at(-1) }
  get size(): number    { return this.items.length }
  isEmpty(): boolean    { return this.items.length === 0 }
}

const numStack = new Stack<number>()
numStack.push(1)
numStack.push(2)
console.log(numStack.pop())   // 2

const strStack = new Stack<string>()
strStack.push("hello")
// strStack.push(42)   // Error: number not assignable to string`,
        },
        {
          type: 'code',
          language: 'typescript',
          content: `// Multiple type parameters
function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
  return arr1.map((item, i) => [item, arr2[i]])
}

const pairs = zip([1, 2, 3], ["a", "b", "c"])
// pairs is [number, string][]

// Generic constraints
interface HasLength {
  length: number
}

function longest<T extends HasLength>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}

console.log(longest("hello", "hi"))          // "hello"
console.log(longest([1, 2, 3], [1, 2]))      // [1, 2, 3]
// console.log(longest(1, 2))  // Error: number has no length

// Generic interfaces
interface Repository<T extends { id: number }> {
  findById(id: number): T | undefined
  findAll(): T[]
  save(item: T): void
  delete(id: number): void
}

// Generic type aliases
type Nullable<T>  = T | null
type Optional<T>  = T | undefined
type Result<T, E extends Error = Error> =
  | { ok: true;  value: T }
  | { ok: false; error: E }

function divide(a: number, b: number): Result<number> {
  if (b === 0) return { ok: false, error: new Error("Division by zero") }
  return { ok: true, value: a / b }
}

const res = divide(10, 2)
if (res.ok) console.log(res.value)   // 5`,
        },
        {
          type: 'tip',
          content: 'Start with `<T>` and add constraints (`T extends SomeType`) only when the compiler tells you a property doesn\'t exist. Over-constraining generics defeats the purpose. The goal is to capture the relationship between input and output types, not to enumerate every property.',
        },
      ],
    },
    {
      slug: 'utility-types',
      title: 'Utility Types',
      intro: "TypeScript ships a library of generic utility types that transform existing types. These replace entire categories of repetitive type definitions. Once you know them, you'll wonder how you lived without them.",
      sections: [
        {
          type: 'code',
          language: 'typescript',
          content: `interface User {
  id: number
  name: string
  email: string
  password: string
  createdAt: Date
  role: "user" | "admin"
}

// Partial<T> — all properties become optional
type UserUpdate = Partial<User>
// { id?: number; name?: string; email?: string; ... }

// Required<T> — all optional properties become required
type StrictUser = Required<UserUpdate>

// Readonly<T> — all properties become readonly
type FrozenUser = Readonly<User>

// Pick<T, Keys> — select a subset of properties
type UserPublic = Pick<User, "id" | "name" | "role">
// { id: number; name: string; role: "user" | "admin" }

// Omit<T, Keys> — exclude properties
type UserWithoutPassword = Omit<User, "password">

// Record<Keys, Type> — create an object type with specific keys
type RolePermissions = Record<"user" | "admin", string[]>
const perms: RolePermissions = {
  user:  ["read"],
  admin: ["read", "write", "delete"],
}

// Exclude<T, U> — remove members from union
type NotAdmin = Exclude<"user" | "admin" | "guest", "admin">
// "user" | "guest"

// Extract<T, U> — keep only members assignable to U
type StringOrNumber = Extract<string | number | boolean, string | number>
// string | number`,
        },
        {
          type: 'code',
          language: 'typescript',
          content: `// ReturnType<T> — extract return type of a function
function getUser() {
  return { id: 1, name: "Alice", email: "alice@example.com" }
}
type UserFromFn = ReturnType<typeof getUser>
// { id: number; name: string; email: string }

// Parameters<T> — extract parameter types as tuple
function createPost(title: string, body: string, authorId: number) {}
type CreatePostArgs = Parameters<typeof createPost>
// [string, string, number]

// Awaited<T> — unwrap Promise type
type ResolvedUser = Awaited<Promise<User>>   // User

// NonNullable<T> — remove null and undefined
type DefinitelyString = NonNullable<string | null | undefined>
// string

// Practical example — form handling pattern
type FormValues = Omit<User, "id" | "createdAt">
type FormErrors = Partial<Record<keyof FormValues, string>>

function validateUser(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name)  errors.name  = "Name is required"
  if (!values.email.includes("@")) errors.email = "Invalid email"
  if (values.password.length < 8)  errors.password = "Min 8 characters"
  return errors
}`,
        },
        {
          type: 'tip',
          content: 'Before defining a new interface, ask if a utility type can derive it from an existing one. `Omit<User, "password">` is better than a separate `PublicUser` interface that you have to keep in sync. If the source type changes, derived types update automatically.',
        },
      ],
    },
    {
      slug: 'async',
      title: 'Async TypeScript',
      intro: "TypeScript's async types are straightforward once you know the pattern: async functions return `Promise<T>`, and `await` unwraps them to `T`. The tricky part is typing errors, which TypeScript forces you to acknowledge.",
      sections: [
        {
          type: 'code',
          language: 'typescript',
          content: `// async functions always return Promise<T>
async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`)
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
  return res.json() as Promise<User>
}

// Promise<void> for functions that don't return a value
async function logUser(id: number): Promise<void> {
  const user = await fetchUser(id)
  console.log(user.name)
}

// Promise.all — parallel with typed results
async function fetchMultiple(ids: number[]): Promise<User[]> {
  return Promise.all(ids.map(id => fetchUser(id)))
}

// Promise.allSettled — partial success
async function fetchSafe(ids: number[]): Promise<(User | null)[]> {
  const results = await Promise.allSettled(ids.map(id => fetchUser(id)))
  return results.map(r => r.status === "fulfilled" ? r.value : null)
}

// Generic fetch wrapper with proper typing
async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(\`HTTP \${res.status}: \${url}\`)
  return res.json()
}

// Usage — TypeScript knows the return type
const users = await apiFetch<User[]>("/api/users")
const post  = await apiFetch<Post>("/api/posts/1")

interface User { id: number; name: string; email: string }
interface Post { id: number; title: string; body: string }`,
        },
        {
          type: 'code',
          language: 'typescript',
          content: `// Result type pattern — explicit error handling without throwing
type Result<T, E = Error> =
  | { ok: true;  value: T }
  | { ok: false; error: E }

async function safeFetch<T>(url: string): Promise<Result<T>> {
  try {
    const res = await fetch(url)
    if (!res.ok) return { ok: false, error: new Error(\`HTTP \${res.status}\`) }
    const value = await res.json() as T
    return { ok: true, value }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err : new Error(String(err)) }
  }
}

// Usage
const result = await safeFetch<User[]>("/api/users")
if (result.ok) {
  result.value.forEach(u => console.log(u.name))
} else {
  console.error("Failed:", result.error.message)
}

// Typed EventEmitter pattern
type EventMap = {
  connect:    [userId: number]
  disconnect: [userId: number, reason: string]
  message:    [from: number, to: number, text: string]
}

class TypedEmitter<Events extends Record<string, unknown[]>> {
  private handlers = new Map<keyof Events, ((...args: unknown[]) => void)[]>()

  on<K extends keyof Events>(event: K, fn: (...args: Events[K]) => void): this {
    const list = this.handlers.get(event) ?? []
    this.handlers.set(event, [...list, fn as never])
    return this
  }

  emit<K extends keyof Events>(event: K, ...args: Events[K]): void {
    this.handlers.get(event)?.forEach(fn => fn(...args))
  }
}`,
        },
        {
          type: 'note',
          content: 'In TypeScript, `catch (err)` gives you `unknown`, not `Error` — because anything can be thrown. Always check `err instanceof Error` before accessing `.message` or `.stack`. The Result<T> pattern above avoids this entirely by keeping errors in the return value.',
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: Typed CLI Tool',
      intro: "Let's build a typed command-line tool that queries a public API. We'll use generics, interfaces, async/await, and the Result pattern — all in one cohesive program.",
      sections: [
        {
          type: 'code',
          language: 'typescript',
          content: `#!/usr/bin/env ts-node
// github-info.ts — query GitHub's public API
// Usage: ts-node github-info.ts <username> [<username2> ...]

interface GHUser {
  login: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
  location: string | null
  blog: string
  created_at: string
}

type Result<T> =
  | { ok: true;  value: T }
  | { ok: false; error: string }

async function fetchGH<T>(path: string): Promise<Result<T>> {
  try {
    const res = await fetch(\`https://api.github.com\${path}\`, {
      headers: { "Accept": "application/vnd.github.v3+json" }
    })
    if (res.status === 404) return { ok: false, error: "Not found" }
    if (!res.ok)            return { ok: false, error: \`HTTP \${res.status}\` }
    return { ok: true, value: await res.json() as T }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Network error" }
  }
}

function formatUser(u: GHUser): string {
  const lines: string[] = [
    \`── @\${u.login} \${u.name ? \`(\${u.name})\` : ""}\`,
    u.bio      ? \`   \${u.bio}\`         : "",
    u.location ? \`   📍 \${u.location}\` : "",
    u.blog     ? \`   🔗 \${u.blog}\`     : "",
    \`   repos: \${u.public_repos}  followers: \${u.followers}\`,
  ]
  return lines.filter(Boolean).join("\\n")
}

async function main(): Promise<void> {
  const usernames = process.argv.slice(2)

  if (usernames.length === 0) {
    console.log("Usage: ts-node github-info.ts <username> [username2] ...")
    process.exit(1)
  }

  const results = await Promise.all(
    usernames.map(async (username): Promise<[string, Result<GHUser>]> => [
      username,
      await fetchGH<GHUser>(\`/users/\${username}\`),
    ])
  )

  for (const [username, result] of results) {
    if (result.ok) {
      console.log(formatUser(result.value))
    } else {
      console.error(\`✗ \${username}: \${result.error}\`)
    }
    console.log()
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `ts-node github-info.ts torvalds gvanrossum Rich-Harris`,
        },
        {
          type: 'note',
          content: "Next steps: add a `tsconfig.json` with `strict: true` (enables every strict check), add `--repos` flag to list repositories, or try running this with `npx tsx` (a faster alternative to ts-node).",
        },
      ],
    },
  ],
}
