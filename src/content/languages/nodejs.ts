import { Language } from '../types'

export const nodejs: Language = {
  slug: 'nodejs',
  name: 'Node.js',
  tagline: 'JavaScript, but on the server.',
  description: "Node.js is a runtime that runs JavaScript outside the browser, powered by Chrome's V8 engine. It's event-driven, non-blocking, and perfect for I/O-heavy workloads. It's also the reason you can write your frontend and backend in the same language.",
  accentColor: '#5FA04E',
  textOnAccent: '#fff',
  icon: 'No',
  difficulty: 'intermediate',
  usedFor: ['Web Servers', 'REST APIs', 'CLI Tools', 'Real-time Apps', 'Build Tooling'],
  notableUsers: ['Netflix', 'LinkedIn', 'PayPal', 'NASA', 'Uber'],
  setup: {
    description: 'Install Node.js using nvm (Node Version Manager) — it lets you switch between Node versions easily.',
    windows: `# Install nvm-windows from github.com/coreybutler/nvm-windows
# Then:
nvm install lts
nvm use lts

# Verify:
node --version
npm --version`,
    mac: `# Install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.zshrc

nvm install --lts
nvm use --lts

# Verify:
node --version`,
    linux: `# Install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc

nvm install --lts
nvm use --lts

# Verify:
node --version`,
  },
  lessons: [
    {
      slug: 'hello-world',
      title: 'Hello, Node.js!',
      intro: "Node.js is JavaScript without a browser. It has no `window`, no `document`, but it does have the file system, network access, and a massive ecosystem of packages through npm.",
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `// hello.js
console.log("Hello, Node.js!")
console.log("Node version:", process.version)
console.log("Platform:", process.platform)
console.log("Working dir:", process.cwd())

// Command-line arguments
const args = process.argv.slice(2)   // remove 'node' and filename
console.log("Args:", args)

// Environment variables
const port = process.env.PORT ?? 3000
console.log("Port:", port)`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Run a file
node hello.js

# Pass arguments
node hello.js foo bar baz

# Set env variables
PORT=8080 node hello.js

# REPL — interactive Node.js shell
node`,
        },
        {
          type: 'note',
          content: "Node.js v12+ supports ES modules natively. Add `\"type\": \"module\"` to package.json to use `import/export` instead of `require/module.exports`. This guide uses ES modules throughout.",
        },
      ],
    },
    {
      slug: 'file-system',
      title: 'File System',
      intro: "Node's `fs` module gives you full control over the file system. The promises API (`fs/promises`) is the modern way — no callbacks needed.",
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `import { readFile, writeFile, appendFile,
          readdir, mkdir, stat, unlink } from 'fs/promises'
import { existsSync } from 'fs'

// Read a file
const text = await readFile("data.txt", "utf-8")
console.log(text)

// Write a file (overwrites if exists)
await writeFile("output.txt", "Hello, file system!\\n")

// Append to a file
await appendFile("log.txt", \`[\${new Date().toISOString()}] Event logged\\n\`)

// Read directory
const files = await readdir(".")
console.log(files.filter(f => f.endsWith(".txt")))

// Create directory (nested)
await mkdir("data/2024/reports", { recursive: true })

// File info
const info = await stat("data.txt")
console.log(info.size)         // bytes
console.log(info.mtime)        // last modified
console.log(info.isDirectory()) // false

// Check existence without throwing
if (existsSync("config.json")) {
  const config = JSON.parse(await readFile("config.json", "utf-8"))
}

// Delete a file
await unlink("temp.txt")`,
        },
        {
          type: 'code',
          language: 'javascript',
          content: `import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import { createGzip } from 'zlib'

// Streams — for large files that don't fit in memory
// pipeline() handles backpressure and cleanup automatically
await pipeline(
  createReadStream("huge-file.txt"),
  createGzip(),
  createWriteStream("huge-file.txt.gz")
)
console.log("Compressed!")

// Reading a large file line by line
import { createInterface } from 'readline'

async function* readLines(path) {
  const rl = createInterface({
    input: createReadStream(path),
    crlfDelay: Infinity,
  })
  for await (const line of rl) {
    yield line
  }
}

let count = 0
for await (const line of readLines("huge-file.txt")) {
  if (line.includes("ERROR")) {
    count++
    console.log(line)
  }
}
console.log(\`Found \${count} errors\`)`,
        },
        {
          type: 'tip',
          content: 'Use streams (`createReadStream`, `pipeline`) for files larger than ~50MB. Reading the whole file into memory with `readFile` will fail or slow down on large inputs. The `readline` interface combined with `for await` is the idiomatic way to process files line by line.',
        },
      ],
    },
    {
      slug: 'http-server',
      title: 'HTTP Server',
      intro: "Node has a built-in HTTP module that can serve requests with no dependencies. Most real apps use Express on top of it, but understanding the raw module makes Express less magical.",
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `import { createServer } from 'http'

const server = createServer((req, res) => {
  const url = new URL(req.url, \`http://\${req.headers.host}\`)

  // Route by pathname
  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end("Hello, World!")
    return
  }

  if (req.method === "GET" && url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ ok: true, uptime: process.uptime() }))
    return
  }

  // Read request body for POST
  if (req.method === "POST" && url.pathname === "/echo") {
    let body = ""
    req.on("data", chunk => body += chunk)
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ received: body }))
    })
    return
  }

  res.writeHead(404, { "Content-Type": "text/plain" })
  res.end("Not Found")
})

const PORT = process.env.PORT ?? 3000
server.listen(PORT, () => console.log(\`Server running on http://localhost:\${PORT}\`))`,
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// Express — the most popular Node.js web framework
// npm install express
import express from 'express'

const app  = express()
const PORT = process.env.PORT ?? 3000

// Built-in middleware
app.use(express.json())              // parse JSON request bodies
app.use(express.urlencoded({ extended: true })) // parse form data

// In-memory "database" for demo
const users = new Map()
let nextId = 1

// Routes
app.get("/",           (req, res) => res.json({ message: "API running" }))
app.get("/users",      (req, res) => res.json([...users.values()]))
app.get("/users/:id",  (req, res) => {
  const user = users.get(Number(req.params.id))
  if (!user) return res.status(404).json({ error: "User not found" })
  res.json(user)
})

app.post("/users", (req, res) => {
  const { name, email } = req.body
  if (!name || !email) return res.status(400).json({ error: "name and email required" })
  const user = { id: nextId++, name, email }
  users.set(user.id, user)
  res.status(201).json(user)
})

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id)
  if (!users.has(id)) return res.status(404).json({ error: "Not found" })
  users.delete(id)
  res.status(204).end()
})

app.listen(PORT, () => console.log(\`http://localhost:\${PORT}\`))`,
        },
        {
          type: 'tip',
          content: 'Add error handling middleware at the end of all your routes: `app.use((err, req, res, next) => { res.status(500).json({ error: err.message }) })`. Express recognizes 4-argument middleware as error handlers. Without it, unhandled errors crash the process or return HTML error pages.',
        },
      ],
    },
    {
      slug: 'modules-npm',
      title: 'Modules & npm',
      intro: "Node's module system lets you split code across files. npm (Node Package Manager) gives you access to millions of packages. package.json describes your project and its dependencies.",
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `// ES Modules (recommended — add "type": "module" in package.json)

// math.js — named exports
export function add(a, b)      { return a + b }
export function subtract(a, b) { return a - b }
export const PI = 3.14159

// Default export
export default class Calculator {
  add(a, b)      { return a + b }
  subtract(a, b) { return a - b }
}

// main.js — importing
import Calculator, { add, PI } from './math.js'  // .js required in Node ESM
import { readFile } from 'fs/promises'            // stdlib
import express from 'express'                      // npm package

// Dynamic import — lazy load a module
const { default: heavy } = await import('./heavy-module.js')

// __dirname / __filename equivalents in ESM
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)
const configPath = join(__dirname, "config.json")`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Initialize a project
npm init -y

# Install a package (adds to dependencies)
npm install express

# Install dev tools (adds to devDependencies)
npm install -D nodemon

# Install globally (available as CLI command)
npm install -g typescript

# Run scripts defined in package.json
npm start
npm run dev
npm test

# Audit for vulnerabilities
npm audit
npm audit fix

# List installed packages
npm list
npm list --depth=0   # only top-level

# Update packages
npm update
npm outdated   # see what's outdated`,
        },
        {
          type: 'code',
          language: 'json',
          content: `{
  "name": "my-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start":  "node src/index.js",
    "dev":    "nodemon src/index.js",
    "test":   "node --test",
    "lint":   "eslint src"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}`,
        },
        {
          type: 'tip',
          content: 'Always commit `package-lock.json` — it records exact versions of every dependency. Never commit `node_modules/`. Add it to `.gitignore`. The lock file ensures everyone on the team (and CI) gets identical installs, preventing "works on my machine" bugs.',
        },
      ],
    },
    {
      slug: 'async-patterns',
      title: 'Async Patterns',
      intro: "Node.js is built around async I/O. Understanding how the event loop works — and the patterns that emerge from it — is the key to writing fast, non-blocking Node code.",
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `// The callback era (still exists in legacy code)
import { readFile } from 'fs'

readFile("data.txt", "utf-8", (err, data) => {
  if (err) { console.error(err); return }
  console.log(data)
})

// Promises — cleaner than callbacks
import { readFile as readFilePromise } from 'fs/promises'

readFilePromise("data.txt", "utf-8")
  .then(data => console.log(data))
  .catch(err => console.error(err))

// async/await — cleanest
async function readAndLog(path) {
  try {
    const data = await readFilePromise(path, "utf-8")
    console.log(data)
  } catch (err) {
    console.error("Failed:", err.message)
  }
}

// Promise.all — run multiple async operations in parallel
async function readMultiple(paths) {
  const contents = await Promise.all(paths.map(p => readFilePromise(p, "utf-8")))
  return contents
}

// Promise.allSettled — don't fail fast on errors
async function readSafe(paths) {
  const results = await Promise.allSettled(paths.map(p => readFilePromise(p, "utf-8")))
  return results.map((r, i) => ({
    path: paths[i],
    content: r.status === "fulfilled" ? r.value : null,
    error: r.status === "rejected" ? r.reason.message : null,
  }))
}`,
        },
        {
          type: 'code',
          language: 'javascript',
          content: `// Concurrency control — don't fire 10,000 requests at once
async function processInBatches(items, batchSize, asyncFn) {
  const results = []
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    const batchResults = await Promise.all(batch.map(asyncFn))
    results.push(...batchResults)
    console.log(\`Processed \${Math.min(i + batchSize, items.length)}/\${items.length}\`)
  }
  return results
}

// Timeout wrapper
function withTimeout(promise, ms, message = "Timeout") {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(message)), ms)
  )
  return Promise.race([promise, timeout])
}

// Retry with exponential backoff
async function retry(fn, { attempts = 3, baseDelay = 100 } = {}) {
  let lastError
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err
      if (i < attempts - 1) {
        const delay = baseDelay * 2 ** i + Math.random() * 100
        await new Promise(r => setTimeout(r, delay))
      }
    }
  }
  throw lastError
}

// Usage
const data = await retry(
  () => fetch("https://api.example.com/data").then(r => r.json()),
  { attempts: 3, baseDelay: 200 }
)`,
        },
        {
          type: 'tip',
          content: 'Node.js is single-threaded but non-blocking. CPU-intensive work (image processing, encryption, parsing) blocks the event loop. Move it to `worker_threads` or a child process. Use `--prof` or the built-in `node --inspect` + Chrome DevTools to profile before optimizing.',
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: REST API with Persistence',
      intro: "Let's build a simple REST API for a notes app that saves data to a JSON file. No database setup required — just Node, Express, and the file system.",
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `// notes-api/src/index.js
// npm install express
// Run: node src/index.js

import express from 'express'
import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { randomUUID } from 'crypto'

const app   = express()
const DB    = "./notes.json"

app.use(express.json())

// Load / save helpers
async function load() {
  if (!existsSync(DB)) return []
  return JSON.parse(await readFile(DB, "utf-8"))
}

async function save(notes) {
  await writeFile(DB, JSON.stringify(notes, null, 2))
}

// GET /notes
app.get("/notes", async (req, res) => {
  const notes = await load()
  const { q } = req.query
  res.json(q ? notes.filter(n => n.body.includes(q) || n.title.includes(q)) : notes)
})

// GET /notes/:id
app.get("/notes/:id", async (req, res) => {
  const notes = await load()
  const note  = notes.find(n => n.id === req.params.id)
  if (!note) return res.status(404).json({ error: "Not found" })
  res.json(note)
})

// POST /notes
app.post("/notes", async (req, res) => {
  const { title, body } = req.body
  if (!title || !body) return res.status(400).json({ error: "title and body required" })

  const notes = await load()
  const note  = { id: randomUUID(), title, body, createdAt: new Date().toISOString() }
  notes.push(note)
  await save(notes)
  res.status(201).json(note)
})

// PATCH /notes/:id
app.patch("/notes/:id", async (req, res) => {
  const notes = await load()
  const idx   = notes.findIndex(n => n.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: "Not found" })

  notes[idx] = { ...notes[idx], ...req.body, updatedAt: new Date().toISOString() }
  await save(notes)
  res.json(notes[idx])
})

// DELETE /notes/:id
app.delete("/notes/:id", async (req, res) => {
  const notes    = await load()
  const filtered = notes.filter(n => n.id !== req.params.id)
  if (filtered.length === notes.length) return res.status(404).json({ error: "Not found" })
  await save(filtered)
  res.status(204).end()
})

app.listen(3000, () => console.log("Notes API: http://localhost:3000"))`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Test with curl
curl -X POST http://localhost:3000/notes \\
  -H "Content-Type: application/json" \\
  -d '{"title":"My First Note","body":"Hello, Node!"}'

curl http://localhost:3000/notes
curl http://localhost:3000/notes?q=Hello

# Replace <id> with an actual ID from the POST response
curl -X PATCH http://localhost:3000/notes/<id> \\
  -H "Content-Type: application/json" \\
  -d '{"body":"Updated body"}'

curl -X DELETE http://localhost:3000/notes/<id>`,
        },
        {
          type: 'note',
          content: "Next steps: replace the JSON file with SQLite using the `better-sqlite3` package, add request validation with `zod`, or add authentication with `jsonwebtoken`. The structure (load/save helpers, CRUD routes) scales to a real database without major changes.",
        },
      ],
    },
  ],
}
