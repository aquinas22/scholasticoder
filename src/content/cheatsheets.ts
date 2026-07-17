import { Lesson } from './types'

// One compact cheatsheet lesson per track, appended as the final
// lesson of each language in index.ts. Keyed by language slug.
export const cheatsheets: Record<string, Lesson> = {
  python: {
    slug: 'cheatsheet',
    title: 'Python Cheatsheet',
    intro: 'The whole language on one page — syntax, collections, idioms. Bookmark this.',
    sections: [
      {
        type: 'code',
        language: 'python',
        content: `# ── Basics ──────────────────────────────
x = 42                      # int
pi = 3.14                   # float
name = "Ada"                # str
ok = True                   # bool
nothing = None
f"{name} is {x}"            # f-string interpolation
x, y = y, x                 # swap

# ── Control flow ────────────────────────
if x > 10:      ...
elif x > 5:     ...
else:           ...

for i in range(5): ...          # 0..4
for i, v in enumerate(items): ...
while cond: ...
result = "big" if x > 10 else "small"

# ── Functions ───────────────────────────
def greet(name, punct="!"):
    return f"Hi {name}{punct}"
def total(*args, **kwargs): ...
square = lambda n: n * n`,
      },
      {
        type: 'code',
        language: 'python',
        content: `# ── Collections ─────────────────────────
nums = [3, 1, 4]                 # list (mutable)
nums.append(1); nums.sort(); nums[0]; nums[-1]; nums[1:3]
point = (3, 4)                   # tuple (immutable)
ages = {"Ada": 17, "Bob": 15}    # dict
ages.get("Eve", 0); ages.items(); ages.keys()
seen = {1, 2, 3}                 # set
[n * 2 for n in nums if n > 1]   # comprehension
{k: v for k, v in pairs}         # dict comprehension

# ── Strings ─────────────────────────────
s.upper() .lower() .strip() .split(",") .replace(a, b)
",".join(items); s.startswith("py"); "x" in s; len(s)

# ── Files & errors ──────────────────────
with open("f.txt") as f:
    data = f.read()              # .readlines() for a list
try:
    risky()
except ValueError as e:
    handle(e)
finally:
    cleanup()

# ── Classes ─────────────────────────────
class Dog:
    def __init__(self, name):
        self.name = name
    def bark(self):
        return f"{self.name} says woof"

# ── Common stdlib ───────────────────────
import json, os, sys, re, math, random
json.dumps(obj); json.loads(text)
random.randint(1, 6); math.floor(x)
sorted(items, key=lambda x: x.age, reverse=True)
min(nums); max(nums); sum(nums); abs(-5)`,
      },
    ],
  },

  javascript: {
    slug: 'cheatsheet',
    title: 'JavaScript Cheatsheet',
    intro: 'Modern JS on one page — ES6+ syntax, arrays, async, DOM.',
    sections: [
      {
        type: 'code',
        language: 'javascript',
        content: `// ── Basics ──────────────────────────────
const x = 42;               // can't reassign (default)
let y = "hi";               // can reassign
\`template \${x} literal\`     // interpolation
x === y                     // always use ===, never ==
typeof x                    // "number"

// ── Functions ───────────────────────────
function add(a, b = 0) { return a + b; }
const add2 = (a, b) => a + b;          // arrow
const sq = n => n * n;                 // single param

// ── Destructuring & spread ──────────────
const { name, age = 18 } = person;
const [first, ...rest] = items;
const merged = { ...defaults, ...options };
const copy = [...arr];

// ── Control flow ────────────────────────
if (x > 10) {} else if (x > 5) {} else {}
for (const item of items) {}           // values
for (const key in obj) {}              // keys
items.forEach((item, i) => {});
const label = x > 10 ? "big" : "small";
value ?? fallback                      // null/undefined only
obj?.deep?.maybe                       // optional chaining`,
      },
      {
        type: 'code',
        language: 'javascript',
        content: `// ── Arrays ──────────────────────────────
arr.map(x => x * 2)
arr.filter(x => x > 0)
arr.reduce((acc, x) => acc + x, 0)
arr.find(x => x.id === 7); arr.some(f); arr.every(f)
arr.includes(3); arr.indexOf(3); arr.slice(1, 3)
arr.push(x); arr.pop(); arr.sort((a, b) => a - b)
[...new Set(arr)]                      // dedupe

// ── Objects ─────────────────────────────
Object.keys(o); Object.values(o); Object.entries(o)
JSON.stringify(o); JSON.parse(s)

// ── Async ───────────────────────────────
const res = await fetch(url);
const data = await res.json();
try { await risky(); } catch (e) { handle(e); }
await Promise.all([a(), b()]);         // concurrent
setTimeout(() => {}, 1000);

// ── Classes ─────────────────────────────
class Dog {
  #secret = "hidden";                  // private field
  constructor(name) { this.name = name; }
  bark() { return \`\${this.name} says woof\`; }
  static create(n) { return new Dog(n); }
}

// ── DOM ─────────────────────────────────
document.querySelector(".btn")
document.querySelectorAll("li")
el.addEventListener("click", e => {})
el.textContent = "hi"; el.classList.toggle("on")`,
      },
    ],
  },

  typescript: {
    slug: 'cheatsheet',
    title: 'TypeScript Cheatsheet',
    intro: 'The type system on one page — annotations, interfaces, generics, utility types.',
    sections: [
      {
        type: 'code',
        language: 'typescript',
        content: `// ── Annotations ─────────────────────────
let n: number = 42;
let s: string; let b: boolean;
let ids: number[] = [1, 2];
let pair: [string, number] = ["a", 1];   // tuple
let anything: unknown;                    // safe any
function add(a: number, b: number): number { return a + b; }
const f = (x: string): void => {};

// ── Objects & interfaces ────────────────
interface User {
  name: string;
  age?: number;                 // optional
  readonly id: string;          // can't reassign
}
type Point = { x: number; y: number };   // type alias

// ── Unions & narrowing ──────────────────
type Status = "active" | "banned" | "new";   // literal union
function fmt(x: string | number) {
  if (typeof x === "string") return x.toUpperCase();
  return x.toFixed(2);          // narrowed to number here
}
// Discriminated union — the workhorse pattern:
type Result =
  | { ok: true; data: string }
  | { ok: false; error: string };
if (r.ok) r.data; else r.error;`,
      },
      {
        type: 'code',
        language: 'typescript',
        content: `// ── Generics ────────────────────────────
function first<T>(arr: T[]): T | undefined { return arr[0]; }
interface Box<T> { value: T }
function prop<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// ── Utility types ───────────────────────
Partial<User>          // all props optional
Required<User>         // all props required
Pick<User, "name">     // subset
Omit<User, "id">       // everything except
Record<string, number> // typed map
ReturnType<typeof fn>  // a function's return type
NonNullable<T>

// ── Enums, assertions, misc ─────────────
const dir = "up" as const;          // literal, not string
const el = document.getElementById("x") as HTMLInputElement;
value!                              // assert non-null (avoid)
satisfies Point                     // check without widening

// ── tsconfig essentials ─────────────────
// "strict": true          <- non-negotiable
// "noUncheckedIndexedAccess": true
// "target": "ES2022", "module": "ESNext"`,
      },
    ],
  },

  react: {
    slug: 'cheatsheet',
    title: 'React Cheatsheet',
    intro: 'Components, hooks, and patterns on one page.',
    sections: [
      {
        type: 'code',
        language: 'jsx',
        content: `// ── Components & JSX ────────────────────
function Card({ title, children, onClose }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
      <button onClick={onClose}>×</button>
    </div>
  );
}
<Card title="Hi">body</Card>

// Conditional & list rendering:
{isOpen && <Modal />}
{user ? <Profile /> : <Login />}
{items.map(item => <Row key={item.id} {...item} />)}

// ── State ───────────────────────────────
const [count, setCount] = useState(0);
setCount(c => c + 1);              // updater form for math
const [form, setForm] = useState({ name: "", email: "" });
setForm(f => ({ ...f, name: "Ada" }));   // never mutate

// ── Effects ─────────────────────────────
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);  // cleanup
}, []);                            // [] = run once on mount
useEffect(() => { ... }, [dep]);   // re-run when dep changes`,
      },
      {
        type: 'code',
        language: 'jsx',
        content: `// ── More hooks ──────────────────────────
const ref = useRef(null);              // DOM handle / mutable box
const memo = useMemo(() => expensive(x), [x]);
const cb = useCallback(() => save(id), [id]);
const value = useContext(ThemeContext);
const [state, dispatch] = useReducer(reducer, initial);

// ── Context ─────────────────────────────
const ThemeContext = createContext("light");
<ThemeContext.Provider value="dark">...</ThemeContext.Provider>

// ── Controlled forms ────────────────────
<input
  value={text}
  onChange={e => setText(e.target.value)}
/>
<form onSubmit={e => { e.preventDefault(); submit(); }}>

// ── Rules & patterns ────────────────────
// hooks only at the top level, never in if/loops
// key must be stable & unique — not the array index
// state is a snapshot; effects sync with EXTERNAL systems
// derive what you can: don't mirror props into state
// lift state up to the closest common parent`,
      },
    ],
  },

  vue: {
    slug: 'cheatsheet',
    title: 'Vue Cheatsheet',
    intro: 'Composition API, template syntax, and reactivity on one page.',
    sections: [
      {
        type: 'code',
        language: 'html',
        content: `<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

// ── Reactivity ──────────────────────────
const count = ref(0)               // .value in script, bare in template
const user = reactive({ name: 'Ada' })
const double = computed(() => count.value * 2)

watch(count, (now, prev) => console.log(now))
watch(() => user.name, n => {})    // watch a property
onMounted(() => {})                // lifecycle

// ── Props & events ──────────────────────
const props = defineProps({ title: String, n: { type: Number, default: 0 } })
const emit = defineEmits(['save'])
emit('save', payload)
const model = defineModel()        // v-model made easy
</script>

<template>
  <!-- ── Template syntax ─────────────── -->
  <h1>{{ count }} / {{ double }}</h1>
  <button @click="count++">add</button>
  <input v-model="user.name" />

  <div v-if="count > 5">big</div>
  <div v-else-if="count > 0">small</div>
  <div v-else>zero</div>
  <p v-show="visible">toggles CSS only</p>

  <li v-for="item in items" :key="item.id">{{ item.name }}</li>

  <img :src="url" :alt="desc" />          <!-- bind attrs -->
  <div :class="{ active: isOn }" :style="{ color }" />
  <input @keyup.enter="save" />            <!-- modifiers -->
  <slot />                                 <!-- children -->
</template>`,
      },
      {
        type: 'code',
        language: 'javascript',
        content: `// ── Composables — Vue's reusable logic ──
// useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'
export function useMouse() {
  const x = ref(0), y = ref(0)
  const update = e => { x.value = e.pageX; y.value = e.pageY }
  onMounted(() => addEventListener('mousemove', update))
  onUnmounted(() => removeEventListener('mousemove', update))
  return { x, y }
}
// any component:  const { x, y } = useMouse()

// ── Pinia store (state management) ──────
export const useCart = defineStore('cart', () => {
  const items = ref([])
  const total = computed(() =>
    items.value.reduce((s, i) => s + i.price, 0))
  function add(item) { items.value.push(item) }
  return { items, total, add }
})

// ── Router essentials ───────────────────
// <RouterLink to="/about">  <RouterView />
// const route = useRoute()   route.params.id
// const router = useRouter() router.push('/home')`,
      },
    ],
  },

  nodejs: {
    slug: 'cheatsheet',
    title: 'Node.js Cheatsheet',
    intro: 'Runtime APIs, modules, files, and servers on one page.',
    sections: [
      {
        type: 'code',
        language: 'javascript',
        content: `// ── Modules (ESM — "type": "module") ────
import fs from 'node:fs/promises'
import path from 'node:path'
import { readFile } from 'node:fs/promises'
export function helper() {}
export default main

// ── Files ───────────────────────────────
const text = await fs.readFile('data.txt', 'utf8')
await fs.writeFile('out.txt', text)
await fs.appendFile('log.txt', line)
await fs.mkdir('dir', { recursive: true })
const files = await fs.readdir('.')
const info = await fs.stat('file')       // .isDirectory(), .size

// ── Paths & env ─────────────────────────
path.join(__dirname, 'data', 'f.txt')
path.resolve('..'); path.extname('a.md')  // '.md'
process.env.PORT ?? 3000
process.argv.slice(2)                     // CLI args
process.exit(1)
import.meta.url                           // this file's URL`,
      },
      {
        type: 'code',
        language: 'javascript',
        content: `// ── HTTP server (no framework) ──────────
import { createServer } from 'node:http'
createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ ok: true }))
}).listen(3000)

// ── Express (the standard framework) ────
import express from 'express'
const app = express()
app.use(express.json())
app.get('/users/:id', (req, res) => res.json({ id: req.params.id }))
app.post('/users', (req, res) => res.status(201).json(req.body))
app.listen(3000)

// ── Common tasks ────────────────────────
const res = await fetch(url)              // built-in now
crypto.randomUUID()
setTimeout / setInterval / queueMicrotask

// child processes:
import { execSync } from 'node:child_process'
const out = execSync('git status', { encoding: 'utf8' })

// ── npm essentials ──────────────────────
// npm init -y | npm i pkg | npm i -D pkg | npx tool
// package.json scripts:  "dev": "node --watch app.js"
// npm run dev`,
      },
    ],
  },

  html: {
    slug: 'cheatsheet',
    title: 'HTML Cheatsheet',
    intro: 'Document structure, semantic tags, and forms on one page.',
    sections: [
      {
        type: 'code',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page Title</title>
  <link rel="stylesheet" href="style.css">
  <script src="app.js" defer></script>
</head>
<body>
  <!-- ── Semantic layout ─────────────── -->
  <header>site banner / nav</header>
  <nav><a href="/about">About</a></nav>
  <main>
    <article>self-contained content</article>
    <section>thematic grouping</section>
    <aside>sidebar</aside>
  </main>
  <footer>copyright etc.</footer>

  <!-- ── Text ────────────────────────── -->
  <h1>One per page</h1> <h2>…</h2> … <h6>…</h6>
  <p>paragraph with <strong>important</strong>,
     <em>emphasized</em>, <code>inline code</code></p>
  <ul><li>bullet</li></ul>
  <ol><li>numbered</li></ol>
  <blockquote>quotation</blockquote>

  <!-- ── Media & links ───────────────── -->
  <a href="https://x.com" target="_blank" rel="noopener">link</a>
  <img src="cat.jpg" alt="describe it — required" width="300">
  <video src="clip.mp4" controls></video>
</body>
</html>`,
      },
      {
        type: 'code',
        language: 'html',
        content: `<!-- ── Forms ───────────────────────────── -->
<form action="/submit" method="post">
  <label for="name">Name</label>
  <input id="name" name="name" required minlength="2">

  <input type="email" name="email" placeholder="you@example.com">
  <input type="password" name="pw" required>
  <input type="number" min="0" max="10" step="1">
  <input type="date"> <input type="checkbox"> <input type="radio">
  <input type="file" accept="image/*">
  <input type="range" min="0" max="100">

  <select name="size">
    <option value="s">Small</option>
    <option value="l" selected>Large</option>
  </select>

  <textarea name="bio" rows="4"></textarea>
  <button type="submit">Send</button>
</form>

<!-- ── Tables ──────────────────────────── -->
<table>
  <thead><tr><th>Name</th><th>Grade</th></tr></thead>
  <tbody><tr><td>Ada</td><td>95</td></tr></tbody>
</table>

<!-- ── Accessibility quick rules ───────── -->
<!-- every img: alt | every input: label | one h1 -->
<!-- buttons for actions, links for navigation -->
<!-- use semantic tags before reaching for ARIA -->`,
      },
    ],
  },

  css: {
    slug: 'cheatsheet',
    title: 'CSS Cheatsheet',
    intro: 'Selectors, box model, flexbox, grid, and responsive patterns on one page.',
    sections: [
      {
        type: 'code',
        language: 'css',
        content: `/* ── Selectors ─────────────────────── */
.class  #id  tag  *
div p          /* descendant */
div > p        /* direct child */
a:hover  input:focus  li:first-child  li:nth-child(2n)
[type="text"]  .a.b   /* both classes */
:not(.done)    :is(h1, h2, h3)

/* specificity: inline > id > class > tag */

/* ── Box model ─────────────────────── */
* { box-sizing: border-box; }   /* always */
.box {
  margin: 1rem;                 /* outside */
  border: 1px solid #ccc;
  padding: 1rem;                /* inside */
  width: 100%; max-width: 60ch;
}

/* ── Units ─────────────────────────── */
/* rem: root font size (use for most things)
   em: parent font size | %: of parent
   vw/vh: viewport | ch: character width */

/* ── Custom properties ─────────────── */
:root { --accent: #6366f1; }
.btn { color: var(--accent); }`,
      },
      {
        type: 'code',
        language: 'css',
        content: `/* ── Flexbox (1-D layout) ──────────── */
.row {
  display: flex;
  justify-content: space-between; /* main axis */
  align-items: center;            /* cross axis */
  gap: 1rem;
  flex-wrap: wrap;
}
.grow { flex: 1; }

/* ── Grid (2-D layout) ─────────────── */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.span2 { grid-column: span 2; }

/* ── Position ──────────────────────── */
.rel { position: relative; }
.abs { position: absolute; top: 0; right: 0; }
.fixed { position: fixed; inset: 0; }
.sticky { position: sticky; top: 0; }

/* ── Responsive ────────────────────── */
@media (max-width: 768px) {
  .row { flex-direction: column; }
}

/* ── Transitions & transforms ──────── */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.15);
}
@keyframes spin { to { transform: rotate(360deg); } }
.loader { animation: spin 1s linear infinite; }`,
      },
    ],
  },

  tailwind: {
    slug: 'cheatsheet',
    title: 'Tailwind Cheatsheet',
    intro: 'The utility classes you reach for daily, on one page.',
    sections: [
      {
        type: 'code',
        language: 'html',
        content: `<!-- ── Spacing (0.25rem per unit) ─────── -->
<!-- p-4 px-2 py-8 pt/pr/pb/pl-1  m-4 mx-auto -mt-2
     gap-4 space-y-2 (between children) -->

<!-- ── Sizing ─────────────────────────── -->
<!-- w-full w-1/2 w-64 max-w-md min-h-screen h-10 size-8 -->

<!-- ── Typography ─────────────────────── -->
<!-- text-sm/base/lg/xl..9xl  font-bold font-mono
     text-center italic underline truncate
     leading-tight tracking-wide uppercase -->

<!-- ── Color (shades 50-950) ──────────── -->
<!-- text-gray-600 bg-indigo-500 border-red-300
     bg-black/50 (opacity)  text-white -->

<!-- ── Borders & effects ──────────────── -->
<!-- border border-2 rounded rounded-lg rounded-full
     shadow-sm shadow-lg ring-2 ring-indigo-400
     opacity-75 blur-sm -->

<!-- ── Flex & grid ────────────────────── -->
<div class="flex items-center justify-between gap-4 flex-wrap">
<div class="grid grid-cols-3 gap-6 md:grid-cols-6">

<!-- ── Position ───────────────────────── -->
<!-- relative absolute inset-0 top-4 z-10 fixed sticky top-0 -->`,
      },
      {
        type: 'code',
        language: 'html',
        content: `<!-- ── States & responsive prefixes ───── -->
<!-- hover:bg-indigo-600  focus:ring-2  active:scale-95
     disabled:opacity-50  group-hover:visible
     dark:bg-gray-900 dark:text-white
     sm: 640px  md: 768px  lg: 1024px  xl: 1280px
     (mobile-first: unprefixed = all sizes,
      md:x = 768px AND UP) -->

<!-- A complete button: -->
<button class="rounded-lg bg-indigo-600 px-4 py-2 font-semibold
               text-white shadow hover:bg-indigo-500
               focus:outline-none focus:ring-2 focus:ring-indigo-400
               disabled:opacity-50">
  Save
</button>

<!-- A responsive card grid: -->
<div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-4
            sm:grid-cols-2 lg:grid-cols-3">
  <div class="rounded-xl border bg-white p-6 shadow-sm
              transition hover:shadow-md dark:border-gray-700
              dark:bg-gray-800">
    <h3 class="text-lg font-bold">Card</h3>
    <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
      Body text.
    </p>
  </div>
</div>

<!-- ── Escape hatches ─────────────────── -->
<!-- w-[137px] bg-[#1da1f2] grid-cols-[1fr_2fr]  (arbitrary)
     transition duration-200 ease-out animate-pulse -->`,
      },
    ],
  },

  vite: {
    slug: 'cheatsheet',
    title: 'Vite Cheatsheet',
    intro: 'Commands, config, and env handling on one page.',
    sections: [
      {
        type: 'code',
        language: 'bash',
        content: `# ── Commands ────────────────────────────
npm create vite@latest app -- --template react-ts
npm run dev            # dev server, instant HMR
npm run build          # production build -> dist/
npm run preview        # serve the dist/ build locally

# templates: vanilla(-ts) vue(-ts) react(-ts)
#            preact svelte solid lit qwik

# ── Env variables ───────────────────────
# .env               loaded always
# .env.development   npm run dev only
# .env.production    npm run build only
# .env.local         gitignored secrets
#
# MUST start with VITE_ to reach client code:
# VITE_API_URL=https://api.example.com`,
      },
      {
        type: 'code',
        language: 'typescript',
        content: `// vite.config.ts — the config you'll actually write:
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: {
    port: 3000,
    proxy: {                       // avoid CORS in dev
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})

// In app code:
import.meta.env.VITE_API_URL      // your env vars
import.meta.env.DEV               // true in dev
import.meta.env.PROD              // true in build
import logo from './logo.svg'     // assets become URLs
const mods = import.meta.glob('./pages/*.tsx')  // lazy import many`,
      },
    ],
  },

  go: {
    slug: 'cheatsheet',
    title: 'Go Cheatsheet',
    intro: 'Syntax, slices, maps, errors, and goroutines on one page.',
    sections: [
      {
        type: 'code',
        language: 'go',
        content: `// ── Basics ──────────────────────────────
package main
import "fmt"

func main() {
    x := 42                    // declare + infer
    var y float64 = 3.14       // explicit
    const Pi = 3.14159
    s := fmt.Sprintf("%s is %d", "Ada", x)
    fmt.Println(s)
}

// ── Control flow ────────────────────────
if x > 10 { } else if x > 5 { } else { }
if err := do(); err != nil { }     // init statement

for i := 0; i < 5; i++ { }         // the only loop keyword
for i, v := range items { }
for cond { }                       // "while"
for { }                            // forever

switch day {
case "sat", "sun": rest()
default: work()
}                                  // no fallthrough

// ── Functions ───────────────────────────
func div(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("divide by zero")
    }
    return a / b, nil
}
result, err := div(10, 2)
if err != nil {
    return fmt.Errorf("calc failed: %w", err)  // wrap
}`,
      },
      {
        type: 'code',
        language: 'go',
        content: `// ── Slices & maps ───────────────────────
nums := []int{3, 1, 4}
nums = append(nums, 1)
nums[0]; nums[1:3]; len(nums)
grid := make([][]int, rows)

ages := map[string]int{"Ada": 17}
ages["Bob"] = 15
v, ok := ages["Eve"]          // ok=false if missing
delete(ages, "Bob")

// ── Structs & methods ───────────────────
type Dog struct {
    Name string
    Age  int
}
func (d Dog) Bark() string { return d.Name + " woofs" }
func (d *Dog) Birthday()   { d.Age++ }    // pointer = mutates

// ── Interfaces (implicit!) ──────────────
type Speaker interface{ Bark() string }
// Dog satisfies Speaker automatically — no "implements"

// ── Goroutines & channels ───────────────
ch := make(chan string)
go func() { ch <- "done" }()      // concurrent
msg := <-ch                        // blocks until sent

var wg sync.WaitGroup
for _, url := range urls {
    wg.Add(1)
    go func() {
        defer wg.Done()
        fetch(url)
    }()
}
wg.Wait()

// ── Tooling ─────────────────────────────
// go run . | go build | go test ./... | go fmt ./...
// go mod init example.com/app | go get pkg@latest`,
      },
    ],
  },

  rust: {
    slug: 'cheatsheet',
    title: 'Rust Cheatsheet',
    intro: 'Ownership, pattern matching, and the types you use daily — one page.',
    sections: [
      {
        type: 'code',
        language: 'rust',
        content: `// ── Basics ──────────────────────────────
let x = 42;                  // immutable by default
let mut y = 3.14;            // opt into mutation
let name: &str = "Ada";      // string slice
let owned: String = String::from("hi");
println!("{name} is {x}");   // interpolation

// ── Ownership rules ─────────────────────
// 1. every value has ONE owner
// 2. value dropped when owner leaves scope
// 3. either ONE &mut ref or MANY & refs — never both
let s = String::from("hi");
takes(s);            // moved — s unusable now
takes_ref(&s);       // borrowed — s still fine
takes_mut(&mut s);   // exclusive borrow

// ── Control flow ────────────────────────
if x > 10 { } else { }
let label = if x > 10 { "big" } else { "small" };  // expression
for i in 0..5 { }            // 0-4
for item in &items { }
while cond { }
loop { break; }

// ── Functions ───────────────────────────
fn add(a: i32, b: i32) -> i32 {
    a + b                    // last expression = return
}
let double = |n| n * 2;      // closure`,
      },
      {
        type: 'code',
        language: 'rust',
        content: `// ── Enums, Option, Result ───────────────
enum Shape { Circle(f64), Rect { w: f64, h: f64 } }

match shape {
    Shape::Circle(r) => 3.14 * r * r,
    Shape::Rect { w, h } => w * h,
}                            // must be exhaustive

let maybe: Option<i32> = Some(5);
if let Some(n) = maybe { }
maybe.unwrap_or(0); maybe.map(|n| n * 2);

fn read() -> Result<String, io::Error> {
    let text = fs::read_to_string("f.txt")?;  // ? = return Err early
    Ok(text)
}

// ── Structs & traits ────────────────────
#[derive(Debug, Clone, PartialEq)]
struct Dog { name: String }
impl Dog {
    fn new(name: &str) -> Self { Self { name: name.into() } }
    fn bark(&self) -> String { format!("{} woofs", self.name) }
}
trait Speak { fn speak(&self) -> String; }
impl Speak for Dog { fn speak(&self) -> String { self.bark() } }

// ── Collections & iterators ─────────────
let v = vec![3, 1, 4];
let m: HashMap<&str, i32> = HashMap::new();
let doubled: Vec<i32> = v.iter().map(|n| n * 2).collect();
v.iter().filter(|n| **n > 1).sum::<i32>();

// ── Cargo ───────────────────────────────
// cargo new app | cargo run | cargo test | cargo clippy
// cargo add serde --features derive`,
      },
    ],
  },

  java: {
    slug: 'cheatsheet',
    title: 'Java Cheatsheet',
    intro: 'Modern Java (17+) on one page — records, streams, collections.',
    sections: [
      {
        type: 'code',
        language: 'java',
        content: `// ── Basics ──────────────────────────────
public class Main {
    public static void main(String[] args) {
        int x = 42;
        double pi = 3.14;
        String name = "Ada";
        boolean ok = true;
        var list = new ArrayList<String>();   // inference
        System.out.println(name + " is " + x);
        String s = String.format("%s: %d", name, x);
    }
}

// ── Control flow ────────────────────────
if (x > 10) { } else if (x > 5) { } else { }
for (int i = 0; i < 5; i++) { }
for (String item : items) { }        // for-each
while (cond) { }

// switch expressions (14+):
String size = switch (n) {
    case 1, 2 -> "small";
    case 3    -> "medium";
    default   -> "large";
};

// ── Records (16+) — data classes ────────
record Point(int x, int y) { }
var p = new Point(1, 2);
p.x(); p.equals(q); // toString/equals/hashCode free`,
      },
      {
        type: 'code',
        language: 'java',
        content: `// ── Classes & interfaces ────────────────
public class Dog extends Animal implements Comparable<Dog> {
    private final String name;
    public Dog(String name) { this.name = name; }
    public String bark() { return name + " woofs"; }
    @Override public int compareTo(Dog o) {
        return name.compareTo(o.name);
    }
}

// ── Collections ─────────────────────────
List<Integer> nums = new ArrayList<>(List.of(3, 1, 4));
nums.add(1); nums.get(0); nums.size(); nums.contains(4);
Map<String, Integer> ages = new HashMap<>();
ages.put("Ada", 17); ages.getOrDefault("Eve", 0);
Set<Integer> seen = new HashSet<>();

// ── Streams ─────────────────────────────
List<String> honorRoll = students.stream()
    .filter(s -> s.grade() >= 90)
    .map(Student::name)                 // method reference
    .sorted()
    .toList();
int total = nums.stream().mapToInt(Integer::intValue).sum();
Optional<Student> best =
    students.stream().max(Comparator.comparing(Student::grade));

// ── Exceptions & misc ───────────────────
try (var reader = Files.newBufferedReader(path)) {  // auto-close
    ...
} catch (IOException e) {
    throw new RuntimeException("read failed", e);
}
Optional.ofNullable(x).orElse(fallback);

// javac Main.java && java Main   |  or: jshell to explore`,
      },
    ],
  },

  csharp: {
    slug: 'cheatsheet',
    title: 'C# Cheatsheet',
    intro: 'Modern C# on one page — records, LINQ, async, pattern matching.',
    sections: [
      {
        type: 'code',
        language: 'csharp',
        content: `// ── Basics (top-level statements) ───────
int x = 42;
double pi = 3.14;
string name = "Ada";
var list = new List<string>();       // inference
Console.WriteLine($"{name} is {x}"); // interpolation

// ── Control flow ────────────────────────
if (x > 10) { } else if (x > 5) { } else { }
for (int i = 0; i < 5; i++) { }
foreach (var item in items) { }
while (cond) { }
var label = x > 10 ? "big" : "small";
value ?? fallback;  obj?.Prop;       // null tools

// switch expression + patterns:
string Describe(object o) => o switch {
    int n when n > 100 => "big number",
    int n              => $"number {n}",
    string s           => $"text {s.Length} long",
    null               => "nothing",
    _                  => "unknown",
};

// ── Records & classes ───────────────────
record Point(int X, int Y);          // value equality free
var p2 = p1 with { Y = 5 };          // non-destructive update

class Dog {
    public string Name { get; init; }        // properties
    public int Age { get; private set; }
    public string Bark() => $"{Name} woofs"; // expression body
}`,
      },
      {
        type: 'code',
        language: 'csharp',
        content: `// ── Collections ─────────────────────────
var nums = new List<int> { 3, 1, 4 };
nums.Add(1); nums[0]; nums.Count; nums.Contains(4);
var ages = new Dictionary<string, int> { ["Ada"] = 17 };
ages.TryGetValue("Eve", out var age);
int[] arr = [1, 2, 3];               // collection expression

// ── LINQ — the crown jewel ──────────────
var honorRoll = students
    .Where(s => s.Grade >= 90)
    .OrderBy(s => s.Name)
    .Select(s => s.Name)
    .ToList();
var total = nums.Sum();
var best = students.MaxBy(s => s.Grade);
var byAge = students.GroupBy(s => s.Age);
var any = students.Any(s => s.Grade == 100);

// ── Async ───────────────────────────────
async Task<string> FetchAsync(string url) {
    using var http = new HttpClient();
    return await http.GetStringAsync(url);
}
var results = await Task.WhenAll(a, b);   // concurrent

// ── Exceptions ──────────────────────────
try { Risky(); }
catch (IOException e) { Handle(e); }
finally { Cleanup(); }

// dotnet new console | dotnet run | dotnet test
// dotnet add package Newtonsoft.Json`,
      },
    ],
  },

  cpp: {
    slug: 'cheatsheet',
    title: 'C++ Cheatsheet',
    intro: 'Modern C++ (17/20) on one page — RAII, STL, smart pointers.',
    sections: [
      {
        type: 'code',
        language: 'cpp',
        content: `// ── Basics ──────────────────────────────
#include <iostream>
#include <string>
#include <vector>

int main() {
    int x = 42;
    double pi = 3.14;
    std::string name = "Ada";
    auto y = 3.14f;              // type inference
    const int LIMIT = 100;
    std::cout << name << " is " << x << "\\n";
}

// ── Control flow ────────────────────────
if (x > 10) { } else if (x > 5) { } else { }
for (int i = 0; i < 5; i++) { }
for (const auto& item : items) { }    // range-for
while (cond) { }
auto label = x > 10 ? "big" : "small";

// ── Functions ───────────────────────────
int add(int a, int b = 0) { return a + b; }
void grow(std::vector<int>& v);       // reference: no copy
int sum(const std::vector<int>& v);   // const ref: read-only
auto square = [](int n) { return n * n; };   // lambda
auto addN = [n](int x) { return x + n; };    // capture`,
      },
      {
        type: 'code',
        language: 'cpp',
        content: `// ── STL containers ──────────────────────
std::vector<int> v = {3, 1, 4};
v.push_back(1); v[0]; v.size(); v.empty();
std::map<std::string, int> ages{{"Ada", 17}};
ages["Bob"] = 15; ages.count("Eve");
std::unordered_map<std::string, int> fast;  // hash map
std::set<int> seen;

// ── Algorithms ──────────────────────────
#include <algorithm>
std::sort(v.begin(), v.end());
std::find(v.begin(), v.end(), 4);
std::count_if(v.begin(), v.end(), [](int n){ return n > 2; });
auto it = std::max_element(v.begin(), v.end());

// ── Classes & RAII ──────────────────────
class Dog {
    std::string name_;
public:
    explicit Dog(std::string name) : name_(std::move(name)) {}
    std::string bark() const { return name_ + " woofs"; }
    ~Dog() { /* cleanup runs automatically */ }
};

// ── Smart pointers (never raw new/delete) ──
#include <memory>
auto dog = std::make_unique<Dog>("Rex");   // sole owner
auto shared = std::make_shared<Dog>("Fido"); // ref-counted
// std::move transfers ownership of a unique_ptr

// ── Modern extras ───────────────────────
std::optional<int> maybe;        // value-or-nothing
if (maybe) use(*maybe);
std::string_view sv = name;      // non-owning string ref
struct Point { int x, y; };
auto [px, py] = Point{1, 2};     // structured bindings

// g++ -std=c++20 -Wall -O2 main.cpp -o app`,
      },
    ],
  },

  c: {
    slug: 'cheatsheet',
    title: 'C Cheatsheet',
    intro: 'Pointers, memory, strings, and structs on one page.',
    sections: [
      {
        type: 'code',
        language: 'c',
        content: `// ── Basics ──────────────────────────────
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    int x = 42;
    double pi = 3.14;
    char c = 'A';
    printf("%d %f %c %s\\n", x, pi, c, "text");
    // %d int  %f double  %c char  %s string  %p pointer
    // %zu size_t  %ld long  %x hex
    return 0;
}

// ── Control flow ────────────────────────
if (x > 10) { } else if (x > 5) { } else { }
for (int i = 0; i < 5; i++) { }
while (cond) { }
do { } while (cond);
switch (n) { case 1: ...; break; default: ...; }

// ── Arrays & strings ────────────────────
int nums[5] = {3, 1, 4, 1, 5};
int len = sizeof(nums) / sizeof(nums[0]);
char s[] = "hello";              // char array + '\\0'
strlen(s); strcmp(a, b); strcpy(dst, src);
strncpy(dst, src, n);            // bounded (safer)
snprintf(buf, sizeof buf, "%d", x);  // int -> string`,
      },
      {
        type: 'code',
        language: 'c',
        content: `// ── Pointers ────────────────────────────
int x = 42;
int *p = &x;         // p holds x's address
*p = 10;             // dereference: x is now 10
int arr[3] = {1, 2, 3};
int *a = arr;        // arrays decay to pointers
a[1] == *(a + 1);    // same thing

void grow(int *n) { (*n)++; }   // "pass by reference"
grow(&x);

// ── Heap memory ─────────────────────────
int *buf = malloc(10 * sizeof(int));
if (buf == NULL) { /* always check */ }
buf = realloc(buf, 20 * sizeof(int));
free(buf);            // exactly once, then don't touch
buf = NULL;           // habit that prevents use-after-free

char *copy = strdup(s);   // malloc + strcpy
free(copy);

// ── Structs ─────────────────────────────
struct Point { int x, y; };
typedef struct { char name[50]; int age; } Dog;
Dog d = { "Rex", 3 };
d.age = 4;
Dog *pd = &d;
pd->age = 5;          // arrow for pointer access

// ── Files ───────────────────────────────
FILE *f = fopen("data.txt", "r");   // "w" write, "a" append
if (f) {
    char line[256];
    while (fgets(line, sizeof line, f)) { }
    fclose(f);
}

// gcc -Wall -Wextra -std=c17 main.c -o app
// valgrind ./app       <- finds leaks & bad memory access`,
      },
    ],
  },

  bash: {
    slug: 'cheatsheet',
    title: 'Bash Cheatsheet',
    intro: 'Daily commands and scripting syntax on one page.',
    sections: [
      {
        type: 'code',
        language: 'bash',
        content: `# ── Navigation & files ──────────────────
pwd; cd dir; cd ..; cd -          # - = previous dir
ls -la                            # all files, details
cp src dst; cp -r dir1 dir2
mv old new                        # move/rename
rm file; rm -rf dir               # careful with -rf
mkdir -p a/b/c
touch file; cat file; less file
head -20 f; tail -f log           # -f = follow live

# ── Finding things ──────────────────────
grep -rn "pattern" src/           # recursive + line numbers
grep -i case-insensitive; grep -v invert
find . -name "*.js" -not -path "*/node_modules/*"
which python3; history | grep ssh

# ── Pipes & redirection ─────────────────
cmd > out.txt 2>&1                # both streams to file
cmd >> append.txt
cmd1 | cmd2                       # pipe
cmd1 && cmd2                      # 2 only if 1 succeeded
cmd1 || echo "failed"
wc -l; sort | uniq -c | sort -rn  # count occurrences
cut -d, -f2 file.csv              # 2nd CSV column
xargs: find . -name "*.tmp" | xargs rm`,
      },
      {
        type: 'code',
        language: 'bash',
        content: `#!/usr/bin/env bash
set -euo pipefail          # strict mode: die on errors

# ── Variables & quoting ─────────────────
name="Ada"                 # no spaces around =
echo "$name"               # ALWAYS quote expansions
result=$(date +%F)         # command substitution
n=$(( 2 + 3 ))             # arithmetic

# ── Arguments ───────────────────────────
# $0 script  $1..$9 args  $# count  "$@" all args
# $? last exit code       $$ this PID

# ── Conditions ──────────────────────────
if [[ -f "$file" ]]; then echo exists; fi
# -f file  -d dir  -z empty-string  -n non-empty
# == != for strings | -eq -ne -lt -gt for numbers
[[ "$a" == "yes" && $n -gt 3 ]]

# ── Loops & functions ───────────────────
for f in *.txt; do echo "$f"; done
for i in {1..5}; do echo "$i"; done
while read -r line; do echo "$line"; done < file

greet() {
    local who="$1"         # local scope
    echo "Hello, $who"
    return 0
}
greet "Ada"

case "$1" in
    start) run ;;
    stop)  halt ;;
    *)     echo "usage: $0 start|stop"; exit 1 ;;
esac`,
      },
    ],
  },

  powershell: {
    slug: 'cheatsheet',
    title: 'PowerShell Cheatsheet',
    intro: 'Cmdlets, objects, and scripting syntax on one page.',
    sections: [
      {
        type: 'code',
        language: 'powershell',
        content: `# ── Files & navigation ──────────────────
Get-Location; Set-Location dir      # pwd / cd
Get-ChildItem -Recurse -Filter *.js # ls / find
Copy-Item src dst -Recurse
Move-Item old new; Remove-Item file
New-Item -ItemType Directory -Path a\\b -Force
Get-Content file; Get-Content log -Tail 20 -Wait

# Aliases exist: ls, cd, cp, mv, rm, cat, pwd all work

# ── Objects, not text — the big idea ────
Get-Process | Where-Object CPU -gt 100 |
    Sort-Object CPU -Descending |
    Select-Object Name, CPU -First 5

Get-ChildItem | Measure-Object Length -Sum
(Get-Process).Count
Get-Process | Get-Member          # inspect properties

# ── Finding things ──────────────────────
Select-String -Pattern "TODO" -Path src\\*.ts -Recurse
Get-Command *service*             # find cmdlets
Get-Help Get-Process -Examples`,
      },
      {
        type: 'code',
        language: 'powershell',
        content: `# ── Variables & types ───────────────────
$name = "Ada"
$n = 42
"$name is $n"                     # interpolation
$items = @(3, 1, 4)               # array
$ages = @{ Ada = 17; Bob = 15 }   # hashtable
$ages["Ada"]; $ages.Ada
[int]"42"; "$n".GetType()

# ── Control flow ────────────────────────
if ($n -gt 10) { } elseif ($n -gt 5) { } else { }
# operators: -eq -ne -gt -lt -ge -le -like -match -contains
foreach ($item in $items) { $item }
$items | ForEach-Object { $_ * 2 }
$items | Where-Object { $_ -gt 2 }
1..5                              # range
switch ($n) { 1 { "one" }; default { "many" } }

# ── Functions & scripts ─────────────────
function Get-Greeting {
    param(
        [Parameter(Mandatory)] [string]$Name,
        [int]$Times = 1
    )
    "Hello, $Name! " * $Times
}
Get-Greeting -Name Ada -Times 2

try { Risky } catch { Write-Error $_ } finally { Cleanup }

# ── Useful one-liners ───────────────────
Invoke-RestMethod https://api.github.com/users/octocat
Get-Process node | Stop-Process
Test-Path .\\config.json
ConvertTo-Json $ages; ConvertFrom-Json $text
Get-Date -Format "yyyy-MM-dd"`,
      },
    ],
  },

  ruby: {
    slug: 'cheatsheet',
    title: 'Ruby Cheatsheet',
    intro: 'Syntax, blocks, collections, and classes on one page.',
    sections: [
      {
        type: 'code',
        language: 'ruby',
        content: `# ── Basics ──────────────────────────────
x = 42
pi = 3.14
name = "Ada"
ok = true
nothing = nil
puts "#{name} is #{x}"        # interpolation
:symbol                       # lightweight identifier

# ── Control flow ────────────────────────
if x > 10
  "big"
elsif x > 5
  "medium"
else
  "small"
end
puts "yes" if ok              # trailing modifier
puts "no" unless ok
label = x > 10 ? "big" : "small"

case x
when 1..5 then "low"
when Integer then "number"
else "other"
end

5.times { |i| puts i }
(1..5).each { |i| puts i }
while x > 0 do x -= 1 end

# ── Methods ─────────────────────────────
def greet(name, punct: "!")   # keyword arg with default
  "Hi #{name}#{punct}"        # last expression returned
end
def total(*nums) = nums.sum   # endless method (3.0+)`,
      },
      {
        type: 'code',
        language: 'ruby',
        content: `# ── Collections & blocks ────────────────
nums = [3, 1, 4]
nums << 1                     # append
nums.first; nums.last; nums[1..2]; nums.length

nums.map { |n| n * 2 }        # [6, 2, 8, 2]
nums.select { |n| n > 1 }     # filter
nums.reject { |n| n > 1 }
nums.sum; nums.sort; nums.uniq; nums.include?(4)
nums.each_with_index { |n, i| }
nums.reduce(0) { |acc, n| acc + n }
%w[apple banana cherry]       # word array

ages = { "Ada" => 17, bob: 15 }   # hash (symbol keys common)
ages[:bob]; ages.fetch(:eve, 0)
ages.each { |k, v| puts "#{k}: #{v}" }

# ── Strings ─────────────────────────────
s.upcase.strip.split(",").join("-")
s.start_with?("ru"); s.include?("x"); s.gsub("a", "b")

# ── Classes ─────────────────────────────
class Dog
  attr_reader :name           # getter
  attr_accessor :age          # getter + setter

  def initialize(name, age = 0)
    @name = name              # instance variable
    @age = age
  end

  def bark = "#{@name} says woof"
  def to_s = "Dog(#{@name})"
end

dog = Dog.new("Rex", 3)
dog.bark

# ── Errors & files ──────────────────────
begin
  risky
rescue ArgumentError => e
  handle(e)
ensure
  cleanup
end
File.read("f.txt"); File.write("f.txt", data)
File.readlines("f.txt").each { |line| }

# gem install pry | bundle init | bundle add rails`,
      },
    ],
  },

  asm: {
    slug: 'cheatsheet',
    title: 'x86-64 Assembly Cheatsheet',
    intro: 'Registers, instructions, and calling convention on one page.',
    sections: [
      {
        type: 'code',
        language: 'nasm',
        content: `; ── Registers (64-bit) ──────────────────
; rax  return value / accumulator
; rdi rsi rdx rcx r8 r9   <- args 1-6 (System V ABI)
; rsp  stack pointer     rbp  frame pointer
; rbx r12-r15  callee-saved (restore before ret)
; 32-bit halves: eax, edi...  16: ax  8: al

; ── Moving data ─────────────────────────
mov rax, 42            ; register <- constant
mov rax, rbx           ; register <- register
mov rax, [rbx]         ; load from memory at rbx
mov [rbx], rax         ; store to memory
lea rax, [rbx + 8]     ; compute address (no load)

; ── Arithmetic ──────────────────────────
add rax, 5             ; rax += 5
sub rax, rbx
imul rax, rbx          ; signed multiply
inc rax                ; rax++
neg rax
and/or/xor rax, rbx    ; bitwise
xor rax, rax           ; idiomatic: rax = 0
shl rax, 3             ; << 3  (×8)
shr rax, 1             ; >> 1  (÷2)`,
      },
      {
        type: 'code',
        language: 'nasm',
        content: `; ── Compare & jump ──────────────────────
cmp rax, rbx           ; sets flags (subtract, discard)
je  label              ; ==        jne  !=
jl  label              ; <  signed jg   >  signed
jle jge                ; <= >=     jb/ja unsigned
jmp label              ; unconditional

; if (rax == 0) goto done:
test rax, rax          ; cheaper than cmp rax, 0
jz done

; a loop (for i = 5; i > 0; i--):
mov rcx, 5
loop_top:
    ; ... body ...
    dec rcx
    jnz loop_top

; ── Stack & functions ───────────────────
push rax               ; rsp -= 8; store
pop rbx                ; load; rsp += 8
call func              ; push return addr; jump
ret                    ; pop return addr; jump back

func:                  ; standard prologue/epilogue
    push rbp
    mov rbp, rsp
    sub rsp, 16        ; local space (keep 16-aligned)
    ; ... body: args in rdi, rsi...; result -> rax
    leave              ; mov rsp,rbp ; pop rbp
    ret

; ── Syscalls (Linux) ────────────────────
; rax = number, args in rdi rsi rdx; then 'syscall'
; 0 read | 1 write | 2 open | 60 exit
mov rax, 60
xor rdi, rdi           ; exit code 0
syscall

; nasm -felf64 prog.asm && ld prog.o -o prog
; gdb ./prog  |  objdump -d prog`,
      },
    ],
  },

  sql: {
    slug: 'cheatsheet',
    title: 'SQL Cheatsheet',
    intro: 'Queries, joins, aggregates, and DDL on one page.',
    sections: [
      {
        type: 'code',
        language: 'sql',
        content: `-- ── Reading ─────────────────────────────
SELECT * FROM students;
SELECT name, grade AS score FROM students;
SELECT DISTINCT age FROM students;

SELECT name FROM students
WHERE age >= 16
  AND grade > 80
  AND name LIKE 'A%'          -- % any chars, _ one char
  AND age IN (16, 17)
  AND email IS NOT NULL       -- never  = NULL
ORDER BY grade DESC, name ASC
LIMIT 10 OFFSET 20;

-- ── Aggregates ──────────────────────────
SELECT COUNT(*), AVG(grade), MAX(grade), MIN(grade), SUM(grade)
FROM students;

SELECT age, COUNT(*) AS n, AVG(grade) AS avg_grade
FROM students
WHERE grade > 0               -- WHERE: filters rows (before)
GROUP BY age
HAVING COUNT(*) > 2           -- HAVING: filters groups (after)
ORDER BY n DESC;

-- ── Joins ───────────────────────────────
SELECT s.name, c.name AS course, e.score
FROM enrollments e
JOIN students s ON s.id = e.student_id     -- inner: match both
LEFT JOIN courses c ON c.id = e.course_id; -- left: keep all left

-- rows with no match on the right:
SELECT s.name FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id
WHERE e.student_id IS NULL;`,
      },
      {
        type: 'code',
        language: 'sql',
        content: `-- ── Writing ─────────────────────────────
INSERT INTO students (name, age) VALUES ('Ada', 17), ('Bob', 16);
UPDATE students SET grade = 95 WHERE id = 1;   -- ALWAYS where
DELETE FROM students WHERE id = 2;             -- ALWAYS where

-- ── Tables ──────────────────────────────
CREATE TABLE students (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  email TEXT UNIQUE,
  age   INTEGER DEFAULT 0,
  class_id INTEGER REFERENCES classes(id)
);
ALTER TABLE students ADD COLUMN city TEXT;
DROP TABLE students;
CREATE INDEX idx_students_email ON students(email);

-- ── Useful extras ───────────────────────
SELECT name,
  CASE WHEN grade >= 90 THEN 'A'
       WHEN grade >= 80 THEN 'B'
       ELSE 'C' END AS letter
FROM students;

COALESCE(nickname, name, 'unknown')   -- first non-null

-- subquery:
SELECT name FROM students
WHERE grade > (SELECT AVG(grade) FROM students);

-- CTE — named subquery, reads top-down:
WITH top_students AS (
  SELECT * FROM students WHERE grade >= 90
)
SELECT age, COUNT(*) FROM top_students GROUP BY age;

-- transactions:
BEGIN; UPDATE ...; UPDATE ...; COMMIT;   -- or ROLLBACK;`,
      },
    ],
  },

  git: {
    slug: 'cheatsheet',
    title: 'Git Cheatsheet',
    intro: 'The commands you run daily, plus the rescue toolbox — one page.',
    sections: [
      {
        type: 'code',
        language: 'bash',
        content: `# ── Daily loop ──────────────────────────
git status                  # what's going on (run constantly)
git add file.js             # stage one file
git add .                   # stage everything
git commit -m "Add login"
git log --oneline --graph   # history
git diff                    # unstaged changes
git diff --staged           # staged changes

# ── Branches ────────────────────────────
git branch                  # list
git switch -c feature-x     # create + switch
git switch main             # switch back
git merge feature-x         # merge into current branch
git branch -d feature-x     # delete merged branch

# ── Remotes ─────────────────────────────
git clone URL
git push                    # upload commits
git push -u origin feature-x   # first push of a branch
git pull                    # download + merge
git fetch                   # download only
git remote -v               # list remotes`,
      },
      {
        type: 'code',
        language: 'bash',
        content: `# ── Undo toolbox ────────────────────────
git restore file.js               # discard unstaged edits
git restore --staged file.js      # unstage, keep edits
git commit --amend -m "Better"    # fix last commit
git revert abc123                 # safe undo (new commit)
git reset --soft HEAD~1           # uncommit, keep staged
git reset --hard HEAD~1           # DESTROY last commit + changes

git stash                         # shelve work-in-progress
git stash pop                     # bring it back
git reflog                        # EVERYTHING that happened
git reset --hard HEAD@{1}         # time-travel via reflog

# ── Inspection ──────────────────────────
git log -p file.js                # commits + diffs for a file
git log -S "functionName"         # commits touching this string
git blame file.js                 # who wrote each line
git show abc123                   # one commit in full
git bisect start                  # binary-search for a bug

# ── Conflicts ───────────────────────────
# <<<<<<< HEAD your side ======= their side >>>>>>>
# edit file, remove markers, then:
git add file.js && git commit
git merge --abort                 # or: bail out

# ── Config once per machine ─────────────
git config --global user.name  "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main`,
      },
    ],
  },

  php: {
    slug: 'cheatsheet',
    title: 'PHP Cheatsheet',
    intro: 'Modern PHP 8 syntax, arrays, and classes on one page.',
    sections: [
      {
        type: 'code',
        language: 'php',
        content: `<?php
declare(strict_types=1);      // top of every file

// ── Basics ──────────────────────────────
$x = 42;
$name = "Ada";
echo "Hi $name";              // "..." interpolates
echo 'literal $name';         // '...' doesn't
$s = $a . $b;                 // concatenation
var_dump($x);                 // debug print

// ── Comparisons — use === always ────────
$a === $b;  $a !== $b;        // value AND type
$x ?? "default";              // null coalescing
$obj?->method();              // nullsafe
$cond ? "yes" : "no";

// ── Control flow ────────────────────────
if ($x > 10) { } elseif ($x > 5) { } else { }
foreach ($items as $item) { }
foreach ($map as $key => $value) { }
for ($i = 0; $i < 5; $i++) { }
while ($cond) { }
$label = match(true) {
    $x >= 90 => "A",
    $x >= 80 => "B",
    default  => "C",
};

// ── Functions ───────────────────────────
function greet(string $name, int $times = 1): string {
    return str_repeat("Hi $name! ", $times);
}
greet("Ada", times: 3);       // named args
$double = fn($n) => $n * 2;   // arrow fn (auto-capture)`,
      },
      {
        type: 'code',
        language: 'php',
        content: `<?php
// ── Arrays ──────────────────────────────
$nums = [3, 1, 4];
$nums[] = 1;                        // append
count($nums); in_array(4, $nums); sort($nums);
$student = ["name" => "Ada", "age" => 17];
$student["email"] = "a@b.c";

array_map(fn($n) => $n * 2, $nums);
array_filter($nums, fn($n) => $n > 1);
array_reduce($nums, fn($c, $n) => $c + $n, 0);
array_keys($m); array_values($m); array_merge($a, $b);
implode(", ", $nums); explode(",", $csv);
array_slice($nums, 0, 2); array_sum($nums);

// ── Strings ─────────────────────────────
strlen($s); strtoupper($s); trim($s);
str_contains($s, "x"); str_starts_with($s, "ph");
str_replace("a", "b", $s); substr($s, 0, 5);
sprintf("%s: %d", $name, $x);

// ── Classes (PHP 8) ─────────────────────
class Student {
    public function __construct(
        public readonly string $name,   // promoted props
        private int $grade = 0,
    ) {}
    public function grade(): int { return $this->grade; }
}
$s = new Student("Ada", 95);
echo $s->name;

enum Status: string {
    case Active = 'active';
    case Banned = 'banned';
}

// ── Web & DB essentials ─────────────────
$_GET['q'] ?? '';  $_POST['name'] ?? '';
htmlspecialchars($input);           // ALWAYS escape output
$pdo = new PDO('sqlite:app.db');
$st = $pdo->prepare('SELECT * FROM users WHERE id = ?');
$st->execute([$id]);                // NEVER concat SQL
json_encode($data); json_decode($json, true);

// php -S localhost:8000 | composer require pkg`,
      },
    ],
  },

  lua: {
    slug: 'cheatsheet',
    title: 'Lua Cheatsheet',
    intro: 'The whole language on one page — it fits.',
    sections: [
      {
        type: 'code',
        language: 'lua',
        content: `-- ── Basics ──────────────────────────────
local x = 42               -- ALWAYS use local
local name = "Ada"
local ok = true
local nothing = nil
print("Hi " .. name)       -- .. concatenates
print(#name)               -- # = length
print(10 // 3, 10 % 3, 2 ^ 8)   -- floor div, mod, power

-- ── Control flow ────────────────────────
if x > 10 then
  print("big")
elseif x > 5 then
  print("medium")
else
  print("small")
end
-- ~= is NOT EQUAL. and / or / not.
-- only nil and false are falsy (0 is truthy!)
local v = maybe or "default"     -- idiom

for i = 1, 5 do print(i) end     -- INCLUSIVE both ends
for i = 10, 1, -1 do end         -- step
while x > 0 do x = x - 1 end     -- no x-- or x -= 1
repeat x = x + 1 until x == 5

-- ── Functions ───────────────────────────
local function divide(a, b)
  if b == 0 then return nil, "div by zero" end
  return a / b                   -- multiple returns
end
local result, err = divide(10, 2)
local double = function (n) return n * 2 end
local function sum(...) return select("#", ...) end`,
      },
      {
        type: 'code',
        language: 'lua',
        content: `-- ── Tables (the only data structure) ────
local list = { "a", "b", "c" }   -- array: 1-INDEXED
list[1]                          -- "a"
#list                            -- 3
table.insert(list, "d")          -- append
table.remove(list, 1)
table.sort(list)
table.concat(list, ", ")

local map = { name = "Ada", age = 17 }
map.name; map["name"]            -- same
map.email = "a@b.c"              -- add
map.age = nil                    -- delete

for i, v in ipairs(list) do end  -- arrays (stops at nil)
for k, v in pairs(map) do end    -- everything, any order

-- ── Strings ─────────────────────────────
s:upper(); s:lower(); s:sub(1, 5); s:rep(2)
s:find("pat"); s:gsub("old", "new")
string.format("%s: %.2f", name, 3.14159)
for w in s:gmatch("%a+") do end  -- iterate words
-- patterns: %d digit %a letter %s space %w alnum + * -

-- ── OOP pattern ─────────────────────────
local Dog = {}
Dog.__index = Dog
function Dog.new(name)
  return setmetatable({ name = name }, Dog)
end
function Dog:bark()              -- colon = implicit self
  return self.name .. " woofs"
end
local rex = Dog.new("Rex")
rex:bark()

-- ── Stdlib highlights ───────────────────
math.floor(3.7); math.max(1, 5); math.random(1, 6)
os.time(); os.date("%Y-%m-%d")
local f = io.open("f.txt", "r")
local text = f:read("a"); f:close()
pcall(risky)                     -- protected call (try/catch)`,
      },
    ],
  },

  kotlin: {
    slug: 'cheatsheet',
    title: 'Kotlin Cheatsheet',
    intro: 'Null safety, data classes, collections, and coroutines on one page.',
    sections: [
      {
        type: 'code',
        language: 'kotlin',
        content: `// ── Basics ──────────────────────────────
val x = 42                 // read-only (default choice)
var y = 3.14               // mutable
val name: String = "Ada"
println("Hi $name, next: \${x + 1}")

// ── Null safety ─────────────────────────
var s: String? = null      // ? = nullable type
s?.length                  // safe call -> null
s?.length ?: 0             // elvis default
s!!.length                 // crash if null (avoid)
if (s != null) s.length    // smart cast
s?.let { println(it) }     // run only if non-null

// ── Control flow ────────────────────────
val label = if (x > 10) "big" else "small"   // expression
when (x) {
    0        -> "zero"
    in 1..9  -> "small"
    is Int   -> "int"
    else     -> "other"
}
for (i in 1..5) { }        // inclusive
for (i in 0 until 5) { }   // exclusive
for (i in 10 downTo 1 step 2) { }

// ── Functions ───────────────────────────
fun add(a: Int, b: Int = 0): Int = a + b
fun greet(name: String) = "Hi $name"
add(b = 5, a = 1)          // named args
val double = { n: Int -> n * 2 }`,
      },
      {
        type: 'code',
        language: 'kotlin',
        content: `// ── Classes ─────────────────────────────
class Student(val name: String, var grade: Int = 0)
data class Point(val x: Int, val y: Int)
// data = equals/hashCode/toString/copy free
val p2 = p1.copy(y = 5)
val (a, b) = p2                     // destructuring

sealed class Result
data class Ok(val data: String) : Result()
data class Err(val msg: String) : Result()
// when(result) is exhaustive — no else needed

object Config { val version = "1.0" }   // singleton
enum class Color { RED, GREEN }

// ── Collections ─────────────────────────
val nums = listOf(3, 1, 4)              // read-only
val mut = mutableListOf(1, 2)
val ages = mapOf("Ada" to 17)
ages["Ada"]

nums.filter { it > 1 }
    .map { it * 2 }
    .sorted()
nums.sumOf { it }; nums.maxByOrNull { it }
nums.any { it > 3 }; nums.groupBy { it % 2 }
nums.forEach { println(it) }
nums.firstOrNull { it > 10 } ?: -1

// ── Coroutines ──────────────────────────
suspend fun fetch(): String { delay(1000); return "data" }

runBlocking {
    val a = async { fetch() }       // concurrent
    val b = async { fetch() }
    println(a.await() + b.await())  // ~1s total
    launch { sideEffect() }         // fire and forget
    withContext(Dispatchers.IO) { readFile() }
}

// ── Scope functions ─────────────────────
obj.let { it.thing() }     // transform, null-guard
obj.apply { prop = 1 }     // configure, returns obj
obj.also { log(it) }       // side effect, returns obj
with(obj) { method() }     // grouping`,
      },
    ],
  },

  swift: {
    slug: 'cheatsheet',
    title: 'Swift Cheatsheet',
    intro: 'Optionals, structs, enums, closures, and SwiftUI basics on one page.',
    sections: [
      {
        type: 'code',
        language: 'swift',
        content: `// ── Basics ──────────────────────────────
let x = 42                 // constant (default choice)
var y = 3.14               // mutable
let name: String = "Ada"
print("Hi \\(name), next: \\(x + 1)")

// ── Optionals ───────────────────────────
var s: String? = nil
s?.count                   // safe chain -> nil
s ?? "default"             // nil-coalescing
if let s { print(s.count) }          // unwrap (shorthand)
guard let s else { return }          // unwrap or bail
// s! force-unwrap — avoid

// ── Control flow ────────────────────────
for i in 1...5 { }         // inclusive
for i in 0..<5 { }         // exclusive
while cond { }
switch grade {             // exhaustive, no fallthrough
case 90...100: "A"
case 80..<90:  "B"
case let g where g > 0: "C (\\(g))"
default: "F"
}

// ── Functions & closures ────────────────
func greet(_ name: String, from city: String = "?") -> String {
    "Hi \\(name) from \\(city)"
}
greet("Ada", from: "London")
let double = { (n: Int) in n * 2 }
nums.map { $0 * 2 }        // $0 = first argument`,
      },
      {
        type: 'code',
        language: 'swift',
        content: `// ── Structs & enums ─────────────────────
struct Student {
    let name: String
    var grade = 0
    var letter: String {                 // computed
        grade >= 90 ? "A" : "B"
    }
    mutating func improve() { grade += 1 }
}
// structs COPY on assignment; classes share references

enum Result {
    case success(data: String)
    case failure(code: Int)
}
switch r {
case .success(let data): print(data)
case .failure(let code): print(code)
}

protocol Describable { var description: String { get } }
extension Student: Describable {
    var description: String { "\\(name): \\(grade)" }
}

// ── Collections ─────────────────────────
var nums = [3, 1, 4]; nums.append(1)
var ages = ["Ada": 17]; ages["Ada"]     // -> Int?
let set: Set = [1, 2, 3]
nums.filter { $0 > 1 }.map { $0 * 2 }.sorted()
nums.reduce(0, +); nums.max(); nums.contains(4)

// ── Errors & async ──────────────────────
enum AppError: Error { case notFound }
func load() throws -> String { throw AppError.notFound }
do { let d = try load() } catch { print(error) }
let maybe = try? load()               // nil on failure

func fetch() async throws -> Data {
    let (data, _) = try await URLSession.shared
        .data(from: url)
    return data
}
async let a = fetch(); async let b = fetch()  // concurrent
let both = try await (a, b)

// ── SwiftUI skeleton ────────────────────
struct ContentView: View {
    @State private var count = 0
    var body: some View {
        VStack {
            Text("Count: \\(count)")
            Button("Tap") { count += 1 }
        }
    }
}`,
      },
    ],
  },

  'computer-architecture': {
    slug: 'cheatsheet',
    title: 'Architecture Cheatsheet',
    intro: 'The numbers and mental models worth memorizing, on one page.',
    sections: [
      {
        type: 'code',
        language: 'text',
        content: `── Number representation ────────────────
bit=0/1   byte=8 bits=256 values   0xFF = 255
binary 1011 = 8+2+1 = 11   |  1 hex digit = 4 bits
two's complement: negate = flip bits + 1
  signed 8-bit range: -128..127; overflow wraps
floats (IEEE 754): sign × fraction × 2^exp
  -> 0.1 + 0.2 != 0.3 in every language

── The CPU loop ─────────────────────────
fetch -> decode -> execute, billions/sec
registers: ~16 slots, where all work happens
pipeline: overlap stages | superscalar: >1 instr/cycle
branch predictor ~95%+ right; miss = ~15-20 cycles
out-of-order: hardware reorders independent work

── Memory hierarchy (approx.) ───────────
registers   0 cyc
L1          ~4 cyc      64 KB      cache line = 64 bytes
L2          ~12 cyc     ~1 MB
L3          ~40 cyc     ~32 MB
RAM         ~200 cyc    GBs
SSD         ~100K cyc
network     millions

sequential access >> random access, every level
arrays beat linked lists: locality, not big-O`,
      },
      {
        type: 'code',
        language: 'text',
        content: `── Latency numbers to memorize ──────────
L1 ref               1 ns
branch mispredict    3 ns
RAM ref            100 ns
SSD random read     16 µs
datacenter RTT     500 µs
disk seek            2 ms
US<->EU packet     150 ms

rule: batch network/disk work; N+1 queries kill apps

── How code runs ────────────────────────
AOT compiled (C/Rust/Go):  source -> machine code, fastest
JIT (JS/Java/C#):  interpret, compile hot paths at runtime
interpreted (Python/Ruby):  ~30-100x slower tight loops
x86-64 (desktop/server) vs ARM64 (phones, Apple, Graviton)
  = different instruction sets, binaries not portable

── Parallelism ──────────────────────────
clock speeds stalled ~2005 (power wall) -> more cores
Amdahl: speedup capped by serial fraction
  90% parallel -> max 10x, ever
counter++ = load,add,store -> data race without locks
SIMD: one instruction, 8-16 values (NumPy, codecs)
GPU: thousands of simple cores, uniform work
false sharing: two cores fighting over one cache line

── Tools ────────────────────────────────
godbolt.org         see your code's assembly
lscpu / sysctl      your CPU's specs
perf / Instruments  where time actually goes`,
      },
    ],
  },

  'operating-systems': {
    slug: 'cheatsheet',
    title: 'OS Cheatsheet',
    intro: 'Processes, memory, files, and the commands to inspect them — one page.',
    sections: [
      {
        type: 'code',
        language: 'text',
        content: `── Core concepts ────────────────────────
kernel: privileged code managing everything
user/kernel mode: CPU-enforced protection boundary
syscall: the only door into the kernel
  (open, read, write, fork, execve, socket, ~350 total)

process: running program + its own virtual memory,
  file descriptors, PID, parent
thread: execution stream INSIDE a process;
  shares memory with siblings (fast, race-prone)
fork+exec: how every process is born (Unix)
signals: SIGINT (Ctrl+C), SIGTERM (please die),
  SIGKILL (-9, unblockable), SIGHUP (terminal gone)

scheduler: timer interrupt every few ms,
  save registers, pick next thread, restore, resume
  -> the illusion of everything running at once
blocked threads cost no CPU (waiting on IO/locks)

── Memory ───────────────────────────────
virtual memory: per-process address space, MMU
  translates via page tables, 4KB pages
page fault: minor (lazy alloc, fine) vs
  major (from disk, slow) vs segfault (illegal)
copy-on-write: fork copies nothing until writes
OOM killer: RAM exhausted -> biggest process dies
layout: [code | globals | heap -> ... <- stack]`,
      },
      {
        type: 'code',
        language: 'bash',
        content: `# ── Inspection commands ─────────────────
ps aux                   # all processes
top / htop               # live view
pstree                   # parent/child tree
kill PID; kill -9 PID    # SIGTERM / SIGKILL
free -h                  # RAM ('available' includes cache)
cat /proc/PID/status     # kernel's view of a process
strace CMD               # every syscall it makes
lsof -p PID              # its open files/sockets
dmesg | tail             # kernel messages
nice -n 10 CMD           # run at lower priority

# ── Files & permissions ─────────────────
# inode = the file (metadata+data); name = just a link
# fd 0 stdin, 1 stdout, 2 stderr
ls -li                   # inode numbers
stat file                # all metadata
chmod 644 f              # rw-r--r--  (u/g/o × rwx)
chmod u+x script.sh
ln target hardlink; ln -s target symlink
df -h; du -sh dir        # disk usage

# ── Concurrency rules ───────────────────
# race: unsynchronized shared writes -> lost updates
# fix: locks / atomics / share nothing
# deadlock: cyclic lock wait
# fix: always acquire locks in the same order

# ── Containers ≠ VMs ────────────────────
# namespaces (private view of PIDs/net/fs)
# + cgroups (CPU/RAM caps) = container
# same kernel, millisecond startup; VM = whole OS`,
      },
    ],
  },

  terminal: {
    slug: 'cheatsheet',
    title: 'Terminal Cheatsheet',
    intro: 'The mental model plus the keystrokes, on one page.',
    sections: [
      {
        type: 'code',
        language: 'text',
        content: `── The model ────────────────────────────
terminal emulator: draws text, sends keystrokes
shell (bash/zsh): parses commands, runs programs
they're separate programs — either swaps out

pressing Enter:
  1. shell expands:  $VARS  *.glob  ~  $(cmd)
  2. finds program:  aliases -> builtins -> $PATH dirs
  3. fork + exec, wires up the 3 streams
  4. waits; exit code lands in $?

streams: 0=stdin 1=stdout 2=stderr
  cmd > f        stdout to file
  cmd 2> f       stderr to file
  cmd > f 2>&1   both
  cmd1 | cmd2    stdout -> next stdin
  cmd && next    only on success
environment: KEY=value copied parent -> child
  export makes a var inheritable; never flows back
startup files: ~/.bashrc / ~/.zshrc (PATH, aliases)
escape codes: ESC[32m = green; cursor moves; \\r redraw
  vim/htop = raw mode + furious redrawing`,
      },
      {
        type: 'code',
        language: 'bash',
        content: `# ── Keystrokes that matter ──────────────
# Ctrl+C  kill current program (SIGINT)
# Ctrl+Z  suspend (fg to resume, bg to background)
# Ctrl+D  end of input / close shell
# Ctrl+R  search command history
# Ctrl+A/E  start/end of line   Ctrl+W  delete word
# Tab     complete   Tab Tab  show options
# !!      last command    !$   its last argument

# ── Diagnosis one-liners ────────────────
type CMD               # alias? builtin? which file?
echo $PATH             # where commands are searched
echo $?                # did the last command succeed?
env | sort             # my environment
history | tail -20
stty sane              # fix a garbled terminal (+ Enter)

# ── Jobs ────────────────────────────────
long_task &            # start in background
jobs                   # list them
fg %1; bg %1           # foreground / background
nohup task &           # survives closing the terminal

# ── SSH & remote ────────────────────────
ssh user@host                  # remote shell
ssh-keygen -t ed25519          # make keys (once)
ssh-copy-id user@host          # passwordless login
ssh user@host 'df -h'          # one remote command
scp file user@host:/path/      # copy over ssh
rsync -av src/ user@host:dst/  # sync, resumable
tmux                           # persistent session
# Ctrl+B D to detach; tmux attach to resume`,
      },
    ],
  },

  internet: {
    slug: 'cheatsheet',
    title: 'Internet Cheatsheet',
    intro: 'Layers, ports, status codes, and debug commands — one page.',
    sections: [
      {
        type: 'code',
        language: 'text',
        content: `── The layers ───────────────────────────
Application  HTTP, DNS, SSH    (meaning)
Transport    TCP/UDP           (delivery, ports)
Internet     IP                (addressing, routing)
Link         Ethernet, WiFi    (next physical hop)
data = envelopes in envelopes; routers read IP only

── Addresses ────────────────────────────
IPv4: 93.184.216.34 (4 bytes, scarce)
IPv6: 2606:2800:... (16 bytes, plentiful)
private: 10.x | 172.16-31.x | 192.168.x
127.0.0.1 = localhost | NAT: home shares one public IP

── DNS ──────────────────────────────────
browser cache -> OS -> resolver -> root -> TLD -> authoritative
A=IPv4  AAAA=IPv6  CNAME=alias  MX=mail  TXT=misc  NS=who answers
TTL controls caching -> why changes "propagate"

── TCP vs UDP ───────────────────────────
TCP: handshake (SYN/SYN-ACK/ACK), numbered bytes,
  ACKs, retransmit, ordering -> reliable stream
UDP: fling packets, no promises -> DNS, games, calls
QUIC (HTTP/3): reliability over UDP, no head-of-line block
connection = (src IP, src port, dst IP, dst port)

── Ports worth knowing ──────────────────
22 SSH | 53 DNS | 80 HTTP | 443 HTTPS
5432 Postgres | 3306 MySQL | 6379 Redis | 3000/8080 dev

── HTTP ─────────────────────────────────
GET read | POST create | PUT replace | PATCH edit | DELETE
2xx ok | 3xx redirect | 4xx your fault | 5xx server's fault
200 ok  201 created  301 moved  304 cached  400 bad request
401 unauthenticated  403 forbidden  404 missing
429 rate limited  500 crashed  502/503 backend down
cookies = server-set state the browser echoes back
HTTPS = HTTP in TLS: certs prove identity, math encrypts`,
      },
      {
        type: 'code',
        language: 'bash',
        content: `# ── Debugging toolbox ───────────────────
ping example.com               # reachable? latency?
traceroute example.com         # the route (tracert on Win)
dig example.com +short         # DNS answer
dig example.com MX             # any record type
dig example.com +trace         # full resolution chain
curl -v https://example.com    # whole HTTP conversation
curl -I https://example.com    # headers only
curl -o /dev/null -s -w '%{time_total}s\\n' URL   # timing
curl ifconfig.me               # my public IP
netstat -an | grep LISTEN      # what's listening here
nc -zv host 443                # is that port open?

# ── Reading a failure ───────────────────
# DNS error (NXDOMAIN)      -> name wrong / DNS broken
# connection refused        -> host up, nothing on port
# timeout                   -> firewall or host down
# TLS/cert error            -> expired/wrong-domain cert
# 4xx                       -> fix your request
# 5xx                       -> their server; retry later
# works here, not there     -> caching or DNS, always

# ── Page-load order (perf checklist) ────
# DNS -> TCP -> TLS -> request -> HTML -> subresources
# fewer round trips > smaller bytes
# CDN = closer server; cache-control = skip requests
# defer scripts; browser DevTools Network tab = truth`,
      },
    ],
  },

  compilers: {
    slug: 'cheatsheet',
    title: 'Compilers Cheatsheet',
    intro: 'The pipeline, the vocabulary, and the experiments — one page.',
    sections: [
      {
        type: 'code',
        language: 'text',
        content: `── The pipeline ─────────────────────────
text -> LEXER -> tokens
     -> PARSER -> AST (tree = precedence & structure)
     -> SEMANTIC -> names resolved, types checked
     -> IR -> OPTIMIZER -> better IR
     -> CODEGEN -> assembly / bytecode / other language

front end understands source; back end emits target
LLVM: shared back end (Rust, Swift, Clang all use it)

── Vocabulary decoder ───────────────────
token         a "word": NUMBER(42), IDENT(x), PLUS
AST           tree of the program's structure
symbol table  stack of scopes: name -> declaration
type checking do these types allow this operation?
  static = at compile time | dynamic = at runtime
IR            simplified middle language (e.g. SSA form)
transpiler    compiler targeting a high-level language
JIT           compile at runtime, guided by profiling
linker        stitches .o files, resolves symbols
ABI           binary-level calling conventions

── Error messages, decoded ──────────────
"unexpected character"    lexer choked
"unexpected token"        parser: legal word, wrong place
"undefined variable"      name resolution failed
"type mismatch"           type checker said no
"undefined reference"     LINKER: no definition anywhere
"duplicate symbol"        linker found two`,
      },
      {
        type: 'code',
        language: 'text',
        content: `── Optimizations (what -O2 does) ────────
constant folding      3*60 -> 180 at compile time
constant propagation  x=5; y=x+1 -> y=6
dead code elimination unreachable/unused -> gone
inlining              call -> pasted body (enables more)
CSE                   compute repeated expr once
loop hoisting         invariant work out of loops
strength reduction    i*2 -> i<<1
unrolling             fewer branches, more straight line
vectorization         SIMD: 8 adds per instruction
as-if rule: anything goes if behavior looks unchanged
UB warning (C/C++): compiler assumes UB never happens
  -> may delete your overflow checks

── JIT tiers (V8, JVM) ──────────────────
interpret -> profile -> compile hot code specialized
to observed types -> guards -> deoptimize if wrong
lesson: consistent types = code stays fast

── Experiments to run ───────────────────
godbolt.org                    # any language -> assembly
gcc -E file.c                  # preprocessor only
gcc -S -O2 file.c              # emit assembly
gcc -c file.c && nm file.o     # symbols: T defined, U needed
objdump -d ./binary            # disassemble
python3 -c "import dis; dis.dis(lambda x: x*2)"  # bytecode
node --print-bytecode app.js   # V8's bytecode

── Build one yourself ───────────────────
lexer: loop chars, group into tokens        (~40 lines)
parser: recursive descent, fn per rule      (~60 lines)
eval: walk the tree                         (~10 lines)
then read: Crafting Interpreters (free online)`,
      },
    ],
  },
  dsa: {
    slug: 'cheatsheet',
    title: 'DSA Cheatsheet',
    intro: 'Every structure, its costs, and when to reach for it — one page.',
    sections: [
      {
        type: 'code',
        language: 'text',
        content: `── Big-O, fastest to slowest ────────────
O(1)        constant     hash lookup, array index
O(log n)    logarithmic  binary search, balanced BST
O(n)        linear       one pass over data
O(n log n)  linearithmic good sorting (merge, Timsort)
O(n^2)      quadratic    nested loops over same data
O(2^n)      exponential  try all subsets — hopeless past ~30

drop constants: O(2n + 5) = O(n)
n = 1M: O(n) ~ 1 sec, O(n^2) ~ 11 days

── Structure costs ──────────────────────
                access  search  insert  delete
array (index)   O(1)    O(n)    O(n)*   O(n)*
                                *O(1) at the end
hash map/set    —       O(1)    O(1)    O(1)
linked list     O(n)    O(n)    O(1)**  O(1)**
                                **given the node
balanced BST    —       O(logn) O(logn) O(logn)
stack/queue     top/front only, all O(1)`,
      },
      {
        type: 'code',
        language: 'text',
        content: `── Which structure? ─────────────────────
lookup by key / seen before?   hash map / set
ordered + index access         array (list)
last in first out (undo, calls)  stack
first in first out (jobs, BFS)   queue (deque)
sorted + fast search           sorted array + binary search
hierarchy (files, DOM, JSON)   tree
things connected to things     graph (adjacency list)
top-k / running min-max        heap (priority queue)

── Pattern -> problem type ──────────────
two pointers      pairs, reverse, dedup in sorted data
sliding window    best subarray/substring
hash map          kill the inner loop: O(n^2) -> O(n)
stack             nesting, matching brackets, undo
BFS + queue       shortest path (unweighted)
DFS + recursion   any path, components, cycles
binary search     sorted data, O(log n)
recursion + cache overlapping subproblems (DP)
sort first        duplicates adjacent, enables binary search`,
      },
      {
        type: 'code',
        language: 'python',
        content: `# ── Snippets you'll rewrite forever ────
from collections import deque
from functools import lru_cache

# counting
counts = {}
for x in items:
    counts[x] = counts.get(x, 0) + 1

# binary search (canonical form)
lo, hi = 0, len(a) - 1
while lo <= hi:
    mid = (lo + hi) // 2
    if a[mid] == target: break
    if a[mid] < target: lo = mid + 1
    else: hi = mid - 1

# BFS skeleton
queue, visited = deque([start]), {start}
while queue:
    node = queue.popleft()
    for nb in graph[node]:
        if nb not in visited:
            visited.add(nb)
            queue.append(nb)

# DFS skeleton
def dfs(node, visited):
    visited.add(node)
    for nb in graph[node]:
        if nb not in visited:
            dfs(nb, visited)

# memoized recursion (DP)
@lru_cache(maxsize=None)
def solve(n): ...

# sort by key, then tiebreak
items.sort(key=lambda p: (p[1], p[0]))

# ── Traps ──────────────────────────────
# list.pop(0) is O(n)      -> use deque.popleft()
# str += in loop is O(n^2) -> ''.join(parts)
# BFS/DFS without visited  -> infinite loop on cycles
# unbalanced BST           -> degrades to O(n)`,
      },
    ],
  },
}
