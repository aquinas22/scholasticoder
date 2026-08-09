import { Language } from '../types'

export const react: Language = {
  slug: 'react',
  name: 'React',
  tagline: 'A JavaScript library for building user interfaces.',
  description: 'React is a declarative, component-based library for building UIs. Created by Facebook in 2013, it changed how developers think about web interfaces — from "mutate the DOM" to "describe what you want and let React figure it out." Now the most widely-used frontend library in the world.',
  accentColor: '#61DAFB',
  textOnAccent: '#111',
  icon: 'Re',
  difficulty: 'intermediate',
  usedFor: ['Web UIs', 'Single-Page Apps', 'Mobile (React Native)', 'Desktop (Electron)', 'Static Sites (Next.js)'],
  notableUsers: ['Meta', 'Netflix', 'Airbnb', 'Twitter', 'Discord'],
  setup: {
    description: 'The fastest way to start is with Vite (recommended) or Create React App. You need Node.js installed first.',
    windows: `# Using Vite (recommended):
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

# Or with TypeScript:
npm create vite@latest my-app -- --template react-ts`,
    mac: `# Using Vite (recommended):
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

# Or with TypeScript:
npm create vite@latest my-app -- --template react-ts`,
    linux: `# Using Vite (recommended):
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

# Or with TypeScript:
npm create vite@latest my-app -- --template react-ts`,
  },
  lessons: [
    {
      slug: 'hello-world',
      title: 'Hello, React!',
      intro: "React turns your app into a tree of components. Each component is a function that returns JSX — which looks like HTML but is actually JavaScript.",
      sections: [
        {
          type: 'text',
          content: "JSX lets you write HTML-like syntax in JavaScript. Babel (or Vite) transforms it to `React.createElement()` calls before the browser sees it. The key mental model: components are functions, JSX is what they return.",
        },
        {
          type: 'code',
          language: 'jsx',
          content: `// App.jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>
}

export default function App() {
  return (
    <div>
      <Greeting name="World" />
      <Greeting name="React" />
    </div>
  )
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          content: `// JSX rules:
// 1. Return a single root element (or use a Fragment)
function GoodComponent() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  )
  // <> </> is shorthand for <React.Fragment> </React.Fragment>
}

// 2. className, not class (class is a JS keyword)
// 3. All tags must close: <img /> not <img>
// 4. Expressions in curly braces: {2 + 2}, {name}, {condition ? "yes" : "no"}

function Card({ title, count }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <span className={count > 0 ? "positive" : "zero"}>{count}</span>
    </div>
  )
}`,
        },
        {
          type: 'note',
          content: 'Component names must start with a capital letter. `<button>` is HTML. `<Button>` is a React component. React uses this convention to tell the two apart.',
        },
      ],
    },
    {
      slug: 'props',
      title: 'Props & Composition',
      intro: "Props are how data flows in React — from parent to child, as function arguments. They're read-only: a component never modifies its own props.",
      sections: [
        {
          type: 'code',
          language: 'jsx',
          content: `// Props are the function's first argument
function UserCard({ name, email, avatar, role = "user" }) {
  return (
    <div className="card">
      <img src={avatar} alt={name} width={48} height={48} />
      <div>
        <strong>{name}</strong>
        <span>{email}</span>
        <span className={\`badge badge-\${role}\`}>{role}</span>
      </div>
    </div>
  )
}

// Using the component
function App() {
  const user = {
    name: "Alice",
    email: "alice@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    role: "admin",
  }

  return <UserCard {...user} />   // spread object as props
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          content: `// children — the content between component tags
function Card({ title, children, footer }) {
  return (
    <div className="card">
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

// Usage
function App() {
  return (
    <Card title="Welcome" footer={<button>Close</button>}>
      <p>This is the card body.</p>
      <p>children can be any valid JSX.</p>
    </Card>
  )
}

// Rendering lists — always provide a key
function TodoList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} className={item.done ? "done" : ""}>
          {item.text}
        </li>
      ))}
    </ul>
  )
}

// Conditional rendering
function Status({ isLoading, error, data }) {
  if (isLoading) return <p>Loading...</p>
  if (error)     return <p className="error">{error.message}</p>
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}`,
        },
        {
          type: 'tip',
          content: 'The `key` prop on list items must be unique and stable. Using array index as a key (`key={i}`) breaks if the list can reorder or filter — React uses keys to match elements across renders. Use the item\'s ID, or a stable unique string.',
        },
      ],
    },
    {
      slug: 'state',
      title: 'State & useState',
      intro: "State is a component's memory. Unlike props (which come from outside), state lives inside the component and triggers a re-render when it changes. `useState` is the hook you'll use constantly.",
      sections: [
        {
          type: 'code',
          language: 'jsx',
          content: `import { useState } from 'react'

function Counter() {
  // useState returns [currentValue, setterFunction]
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

// When state depends on previous value, use the updater form
function SafeCounter() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(prev => prev + 1)
  // Always safe, even with multiple rapid updates
  return <button onClick={increment}>{count}</button>
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          content: `import { useState } from 'react'

// State can be any value: string, number, object, array
function ProfileEditor() {
  const [user, setUser] = useState({
    name: "Alice",
    email: "alice@example.com",
    bio: "",
  })

  // Always create new objects/arrays — never mutate state directly
  const updateField = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form>
      <input
        value={user.name}
        onChange={e => updateField("name", e.target.value)}
        placeholder="Name"
      />
      <input
        value={user.email}
        onChange={e => updateField("email", e.target.value)}
        placeholder="Email"
      />
      <textarea
        value={user.bio}
        onChange={e => updateField("bio", e.target.value)}
        placeholder="Bio"
      />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </form>
  )
}

// Array state — add, remove, update items
function TodoApp() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState("")

  const add    = () => {
    if (!text.trim()) return
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }])
    setText("")
  }
  const toggle = (id) => setTodos(prev =>
    prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
  )
  const remove = (id) => setTodos(prev => prev.filter(t => t.id !== id))

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)}
             onKeyDown={e => e.key === "Enter" && add()} />
      <button onClick={add}>Add</button>
      {todos.map(t => (
        <div key={t.id}>
          <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
          <span style={{ textDecoration: t.done ? "line-through" : "none" }}>{t.text}</span>
          <button onClick={() => remove(t.id)}>✕</button>
        </div>
      ))}
    </div>
  )
}`,
        },
        {
          type: 'warning',
          content: 'Never mutate state directly: `state.count++` or `state.items.push(x)`. React uses reference equality to detect changes — mutating the existing object means React sees the same reference and skips the re-render. Always create new objects/arrays: `setState(prev => ({ ...prev, count: prev.count + 1 }))`.',
        },
      ],
    },
    {
      slug: 'effects',
      title: 'useEffect & Side Effects',
      intro: "`useEffect` is where you handle things that happen outside the React render cycle: API calls, timers, subscriptions, DOM manipulation. It runs after every render, unless you tell it otherwise.",
      sections: [
        {
          type: 'code',
          language: 'jsx',
          content: `import { useState, useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    // The dependency array [userId] means:
    // "run this effect when userId changes"
    let cancelled = false   // cleanup flag

    setLoading(true)
    setError(null)

    fetch(\`/api/users/\${userId}\`)
      .then(res => {
        if (!res.ok) throw new Error("Not found")
        return res.json()
      })
      .then(data => {
        if (!cancelled) setUser(data)
      })
      .catch(err => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    // Cleanup function — runs before next effect or on unmount
    return () => { cancelled = true }
  }, [userId])   // dependency array

  if (loading) return <p>Loading...</p>
  if (error)   return <p>Error: {error.message}</p>
  return <h1>{user.name}</h1>
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          content: `import { useState, useEffect, useRef } from 'react'

// useEffect dependency array patterns:
// []         — run once after mount
// [a, b]     — run when a or b changes
// (omitted)  — run after every render (usually wrong)

// Timer example — with proper cleanup
function Stopwatch() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(id)   // cleanup clears the interval
  }, [running])

  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={() => setRunning(r => !r)}>
        {running ? "Pause" : "Start"}
      </button>
      <button onClick={() => { setRunning(false); setSeconds(0) }}>Reset</button>
    </div>
  )
}

// useRef — mutable ref that doesn't trigger re-renders
function AutoFocusInput() {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()   // focus on mount
  }, [])

  return <input ref={inputRef} placeholder="I'm focused!" />
}`,
        },
        {
          type: 'tip',
          content: 'Always return a cleanup function from useEffect if you start something (timer, subscription, event listener, fetch). Without cleanup, you get memory leaks and "Can\'t perform state update on unmounted component" warnings. The `cancelled` flag pattern is especially important for fetch calls.',
        },
      ],
    },
    {
      slug: 'custom-hooks',
      title: 'Custom Hooks',
      intro: "Custom hooks are functions that start with `use` and call other hooks. They let you extract stateful logic into reusable pieces — without the complexity of class components or render props.",
      sections: [
        {
          type: 'code',
          language: 'jsx',
          content: `import { useState, useEffect } from 'react'

// useFetch — reusable data fetching
function useFetch(url) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch(url)
      .then(r => { if (!r.ok) throw new Error(\`HTTP \${r.status}\`); return r.json() })
      .then(d  => { if (!cancelled) setData(d) })
      .catch(e => { if (!cancelled) setError(e) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [url])

  return { data, loading, error }
}

// Usage — clean and readable
function PostList() {
  const { data: posts, loading, error } = useFetch('/api/posts')

  if (loading) return <p>Loading...</p>
  if (error)   return <p>Error: {error.message}</p>
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          content: `import { useState, useCallback, useEffect } from 'react'

// useLocalStorage — sync state with localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const set = useCallback(val => {
    setValue(val)
    window.localStorage.setItem(key, JSON.stringify(val))
  }, [key])

  return [value, set]
}

// useDebounce — delay updating a value
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

// useDebounce in practice — search that doesn't fire on every keystroke
function SearchBox() {
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 400)
  const { data: results } = useFetch(
    debouncedQuery ? \`/api/search?q=\${encodeURIComponent(debouncedQuery)}\` : null
  )

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." />
      {results?.map(r => <div key={r.id}>{r.title}</div>)}
    </div>
  )
}`,
        },
        {
          type: 'tip',
          content: 'The rule of hooks: call hooks at the top level of a component or custom hook — never inside conditions, loops, or nested functions. This ensures hooks run in the same order on every render, which is how React tracks which state belongs to which hook call.',
        },
      ],
    },
    {
      slug: 'context',
      title: 'Context & State Management',
      intro: "Context lets you share data across a component tree without passing props through every level. It's great for global state like the current user, theme, or locale — but it's not a replacement for a proper state manager in complex apps.",
      sections: [
        {
          type: 'code',
          language: 'jsx',
          content: `import { createContext, useContext, useState } from 'react'

// 1. Create the context
const ThemeContext = createContext({ theme: 'light', toggle: () => {} })

// 2. Provide the context
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Custom hook to consume it
function useTheme() {
  return useContext(ThemeContext)
}

// 4. Use anywhere in the tree
function Header() {
  const { theme, toggle } = useTheme()
  return (
    <header data-theme={theme}>
      <button onClick={toggle}>Switch to {theme === 'light' ? 'dark' : 'light'}</button>
    </header>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>...</main>
    </ThemeProvider>
  )
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          content: `import { createContext, useContext, useReducer } from 'react'

// useReducer — better than useState for complex state logic
const initialState = {
  user: null,
  cart: [],
  notifications: [],
}

function appReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] }
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter(i => i.id !== action.payload) }
    case "ADD_NOTIFICATION":
      return { ...state, notifications: [...state.notifications, action.payload] }
    default:
      return state
  }
}

const AppContext = createContext(null)

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Usage
function CartBadge() {
  const { state, dispatch } = useContext(AppContext)
  return (
    <span>
      Cart: {state.cart.length}
      <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: { id: 1, name: "Item" } })}>
        Add
      </button>
    </span>
  )
}`,
        },
        {
          type: 'note',
          content: 'Context re-renders all consumers when the value changes. For frequently-changing data (like a real-time counter), context can cause performance issues. Use Zustand, Jotai, or Redux Toolkit for complex global state. Context is best for infrequently-changing global config.',
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: Weather Dashboard',
      intro: "Let's build a weather dashboard that uses everything we've learned: components, props, state, effects, and a custom hook for data fetching.",
      sections: [
        {
          type: 'code',
          language: 'jsx',
          content: `// WeatherDashboard.jsx
import { useState, useEffect } from 'react'

function useFetch(url) {
  const [state, setState] = useState({ data: null, loading: !!url, error: null })

  useEffect(() => {
    if (!url) return
    let cancelled = false
    setState({ data: null, loading: true, error: null })

    fetch(url)
      .then(r => r.ok ? r.json() : Promise.reject(new Error(\`HTTP \${r.status}\`)))
      .then(data => !cancelled && setState({ data, loading: false, error: null }))
      .catch(err => !cancelled && setState({ data: null, loading: false, error: err }))

    return () => { cancelled = true }
  }, [url])

  return state
}

function WeatherCard({ data }) {
  const wmo = { 0: "☀️ Clear", 1: "🌤 Mostly Clear", 2: "⛅ Partly Cloudy",
                3: "☁️ Overcast", 51: "🌦 Drizzle", 61: "🌧 Rain", 80: "🌧 Showers" }

  const icon = wmo[data.current.weather_code] ?? "🌡"

  return (
    <div className="weather-card">
      <h2>{icon}</h2>
      <p className="temp">{data.current.temperature_2m}°C</p>
      <p>Wind: {data.current.wind_speed_10m} km/h</p>
      <p>Humidity: {data.current.relative_humidity_2m}%</p>
    </div>
  )
}

const CITIES = [
  { name: "London",   lat: 51.5074, lon: -0.1278 },
  { name: "New York", lat: 40.7128, lon: -74.0060 },
  { name: "Tokyo",    lat: 35.6762, lon: 139.6503 },
]

function WeatherDashboard() {
  const [city, setCity] = useState(CITIES[0])

  const url = \`https://api.open-meteo.com/v1/forecast\`
    + \`?latitude=\${city.lat}&longitude=\${city.lon}\`
    + \`&current=temperature_2m,wind_speed_10m,weather_code,relative_humidity_2m\`

  const { data, loading, error } = useFetch(url)

  return (
    <div>
      <h1>Weather Dashboard</h1>
      <div>
        {CITIES.map(c => (
          <button key={c.name} onClick={() => setCity(c)}
                  style={{ fontWeight: city.name === c.name ? "bold" : "normal" }}>
            {c.name}
          </button>
        ))}
      </div>
      <h2>{city.name}</h2>
      {loading && <p>Loading...</p>}
      {error   && <p>Error: {error.message}</p>}
      {data    && <WeatherCard data={data} />}
    </div>
  )
}

export default WeatherDashboard`,
        },
        {
          type: 'tip',
          content: "Add this to `main.jsx` and it works with zero backend. Open-Meteo is free and requires no API key. Try extending it: add a 7-day forecast, a dark/light theme toggle with useContext, or LocalStorage to persist the last selected city.",
        },
      ],
    },
    {
      slug: 'lists-and-conditionals',
      title: 'Lists, Keys & Conditional Rendering',
      intro: 'Rendering an array is where React apps spend most of their JSX — and where the two most common bugs live: a missing key, and a condition that renders a stray 0 on the page.',
      sections: [
        {
          type: 'code',
          language: 'jsx',
          content: `function TodoList({ todos, filter }) {
  const visible = todos.filter(t =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  )

  return (
    <ul>
      {visible.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

// The key tells React which item is which between renders.
// Use a STABLE id from your data. The array index works only if the list
// is never reordered, filtered, or inserted into — which is rarely true.

// Wrong: state and DOM follow the position, not the item
{todos.map((todo, i) => <TodoItem key={i} todo={todo} />)}

// Also wrong: a new key every render remounts the whole row every time
{todos.map(todo => <TodoItem key={Math.random()} todo={todo} />)}

// Right
{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}`,
        },
        {
          type: 'code',
          language: 'jsx',
          content: `function Dashboard({ user, notifications, error, isLoading }) {
  // Early returns keep the happy path flat and readable
  if (isLoading) return <Spinner />
  if (error) return <ErrorBanner message={error.message} />
  if (!user) return <LoginPrompt />

  return (
    <div>
      {/* Ternary for either/or */}
      {user.isAdmin ? <AdminPanel /> : <UserPanel />}

      {/* && for "render this or nothing" */}
      {notifications.length > 0 && <Badge count={notifications.length} />}

      {/* CAREFUL: 0 is falsy but React RENDERS it. This prints a bare "0". */}
      {notifications.length && <Badge count={notifications.length} />}

      {/* Fixes: force a boolean, or use a ternary */}
      {notifications.length > 0 && <Badge count={notifications.length} />}
      {notifications.length ? <Badge count={notifications.length} /> : null}

      {/* Nullish values render nothing: null, undefined, false, "" */}
      {user.bio ?? <em>No bio yet</em>}

      {/* Fragments group without adding a DOM node */}
      <>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </>
    </div>
  )
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          content: `// Empty, loading and error states are part of the component, not an afterthought.
function SearchResults({ query, results, status }) {
  if (status === 'idle')    return <p>Type to search.</p>
  if (status === 'loading') return <SkeletonList count={5} />
  if (status === 'error')   return <p role="alert">Something went wrong.</p>
  if (results.length === 0) return <p>No results for "{query}".</p>

  return (
    <ol>
      {results.map(r => (
        <li key={r.id}>
          <a href={r.url}>{r.title}</a>
          {r.isNew && <span className="badge">New</span>}
        </li>
      ))}
    </ol>
  )
}

// Rendering a lookup table instead of a switch
const ICONS = { success: '✓', warning: '!', error: '×' }

function Alert({ type = 'success', children }) {
  return (
    <div className={\`alert alert-\${type}\`}>
      <span aria-hidden="true">{ICONS[type]}</span>
      {children}
    </div>
  )
}

// Grouped lists: build the groups first, render second
function GroupedTodos({ todos }) {
  const groups = Object.groupBy(todos, t => t.category)
  return Object.entries(groups).map(([category, items]) => (
    <section key={category}>
      <h3>{category}</h3>
      <ul>{items.map(t => <li key={t.id}>{t.title}</li>)}</ul>
    </section>
  ))
}`,
        },
        {
          type: 'warning',
          content: 'Using the array index as a key breaks any list the user can reorder, sort, or delete from: React reuses the wrong DOM node, and typed text or focus jumps to the neighbouring row. If your items have no id, add one when you create them.',
        },
        {
          type: 'tip',
          content: 'Do the filtering and sorting during render from props and state — never store a derived list in its own useState. Two sources of truth for the same data always drift apart.',
        },
      ],
    },
    {
      slug: 'forms',
      title: 'Forms & User Input',
      intro: 'Forms are where React\'s "state is the source of truth" model pays off most — and where beginners write the most boilerplate. One state object and one change handler cover almost every form you will build.',
      sections: [
        {
          type: 'code',
          language: 'jsx',
          content: `import { useState } from 'react'

function SignupForm({ onSubmit }) {
  const [form, setForm] = useState({ email: '', password: '', plan: 'free', terms: false })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  // One handler for every field, keyed by the input's name attribute
  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function validate(values) {
    const next = {}
    if (!values.email.includes('@')) next.email = 'Enter a valid email'
    if (values.password.length < 8)  next.password = 'At least 8 characters'
    if (!values.terms)               next.terms = 'You must accept the terms'
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()                    // stop the browser from reloading the page
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setSubmitting(true)
    try {
      await onSubmit(form)
      setForm({ email: '', password: '', plan: 'free', terms: false })
    } catch (err) {
      setErrors({ form: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email"
             value={form.email} onChange={handleChange}
             aria-invalid={!!errors.email} />
      {errors.email && <p role="alert">{errors.email}</p>}

      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password"
             value={form.password} onChange={handleChange} />
      {errors.password && <p role="alert">{errors.password}</p>}

      <select name="plan" value={form.plan} onChange={handleChange}>
        <option value="free">Free</option>
        <option value="pro">Pro</option>
      </select>

      <label>
        <input name="terms" type="checkbox"
               checked={form.terms} onChange={handleChange} />
        I accept the terms
      </label>
      {errors.terms && <p role="alert">{errors.terms}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Creating...' : 'Create account'}
      </button>
      {errors.form && <p role="alert">{errors.form}</p>}
    </form>
  )
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          content: `import { useState, useRef } from 'react'

// Controlled: React state is the value. Predictable, validates as you type.
function Controlled() {
  const [value, setValue] = useState('')
  return <input value={value} onChange={e => setValue(e.target.value.toUpperCase())} />
}

// Uncontrolled: the DOM keeps the value, you read it on submit. Less code,
// fewer renders — good for simple forms and for file inputs (which MUST be
// uncontrolled).
function Uncontrolled() {
  const fileRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)     // reads every named field
    console.log(Object.fromEntries(data))
    console.log(fileRef.current.files[0])
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" defaultValue="Untitled" />   {/* defaultValue, not value */}
      <input name="upload" type="file" ref={fileRef} />
      <button>Save</button>
    </form>
  )
}

// Dynamic field lists
function TagEditor() {
  const [tags, setTags] = useState([''])

  const update = (i, v) => setTags(tags.map((t, idx) => (idx === i ? v : t)))
  const remove = i => setTags(tags.filter((_, idx) => idx !== i))

  return (
    <>
      {tags.map((tag, i) => (
        <div key={i}>
          <input value={tag} onChange={e => update(i, e.target.value)} />
          <button type="button" onClick={() => remove(i)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => setTags([...tags, ''])}>Add tag</button>
    </>
  )
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          content: `import { useState, useEffect, useMemo } from 'react'

// Debouncing: wait for the user to stop typing before doing expensive work
function useDebounced(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)      // cancel on every new keystroke
  }, [value, delay])

  return debounced
}

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounced(query, 400)

  useEffect(() => {
    if (debouncedQuery) onSearch(debouncedQuery)
  }, [debouncedQuery, onSearch])

  return (
    <input
      type="search"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search..."
      aria-label="Search"
    />
  )
}`,
        },
        {
          type: 'warning',
          content: 'An input with value but no onChange is read-only and React warns about it. If you want a starting value the user can edit freely, use defaultValue (uncontrolled) instead of value.',
        },
        {
          type: 'tip',
          content: 'Always call e.preventDefault() in a submit handler, and put the submit logic on the form\'s onSubmit rather than the button\'s onClick — that way Enter in a text field submits too, which is what users expect.',
        },
      ],
    },
    {
      slug: 'usereducer-and-state-patterns',
      title: 'useReducer & State Patterns',
      intro: 'When five useState calls have to change together, they will eventually get out of sync. useReducer puts every transition in one place, so an impossible state becomes impossible to write.',
      sections: [
        {
          type: 'code',
          language: 'jsx',
          content: `import { useReducer } from 'react'

// The reducer is a pure function: (state, action) => new state.
// No fetching, no timers, no mutation — just the next state.
const initialState = { items: [], filter: 'all', draft: '' }

function todosReducer(state, action) {
  switch (action.type) {
    case 'draft_changed':
      return { ...state, draft: action.value }

    case 'added':
      if (!state.draft.trim()) return state
      return {
        ...state,
        draft: '',
        items: [...state.items, { id: crypto.randomUUID(), title: state.draft, done: false }],
      }

    case 'toggled':
      return {
        ...state,
        items: state.items.map(t => (t.id === action.id ? { ...t, done: !t.done } : t)),
      }

    case 'deleted':
      return { ...state, items: state.items.filter(t => t.id !== action.id) }

    case 'filter_changed':
      return { ...state, filter: action.filter }

    default:
      throw new Error('Unknown action: ' + action.type)
  }
}

function Todos() {
  const [state, dispatch] = useReducer(todosReducer, initialState)

  const visible = state.items.filter(t =>
    state.filter === 'all' ? true : state.filter === 'done' ? t.done : !t.done
  )

  return (
    <>
      <form onSubmit={e => { e.preventDefault(); dispatch({ type: 'added' }) }}>
        <input
          value={state.draft}
          onChange={e => dispatch({ type: 'draft_changed', value: e.target.value })}
        />
        <button>Add</button>
      </form>

      <ul>
        {visible.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.done}
                   onChange={() => dispatch({ type: 'toggled', id: todo.id })} />
            {todo.title}
            <button onClick={() => dispatch({ type: 'deleted', id: todo.id })}>×</button>
          </li>
        ))}
      </ul>
    </>
  )
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          content: `import { useReducer, useEffect } from 'react'

// Model state as a state MACHINE so impossible combinations cannot exist.

// Fragile: isLoading && error && data can all be true at once.
// const [data, setData] = useState(null)
// const [isLoading, setIsLoading] = useState(false)
// const [error, setError] = useState(null)

// Solid: exactly one status at a time.
const initial = { status: 'idle', data: null, error: null }

function fetchReducer(state, action) {
  switch (action.type) {
    case 'fetch_started':   return { status: 'loading', data: null, error: null }
    case 'fetch_succeeded': return { status: 'success', data: action.data, error: null }
    case 'fetch_failed':    return { status: 'error',   data: null, error: action.error }
    case 'reset':           return initial
    default:                return state
  }
}

function useFetchReducer(url) {
  const [state, dispatch] = useReducer(fetchReducer, initial)

  useEffect(() => {
    const controller = new AbortController()
    dispatch({ type: 'fetch_started' })

    fetch(url, { signal: controller.signal })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .then(data => dispatch({ type: 'fetch_succeeded', data }))
      .catch(error => {
        if (error.name !== 'AbortError') dispatch({ type: 'fetch_failed', error })
      })

    return () => controller.abort()
  }, [url])

  return state
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          content: `import { createContext, useContext, useReducer } from 'react'

// Reducer + Context = shared state without prop drilling and without a library.
const CartContext = createContext(null)
const CartDispatchContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'added': {
      const existing = state.items.find(i => i.id === action.item.id)
      return existing
        ? { ...state, items: state.items.map(i =>
              i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i) }
        : { ...state, items: [...state.items, { ...action.item, qty: 1 }] }
    }
    case 'removed':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'cleared':
      return { items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] })
  // Two contexts: components that only dispatch do not re-render when the cart changes.
  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
export const useCartDispatch = () => useContext(CartDispatchContext)

function AddToCartButton({ product }) {
  const dispatch = useCartDispatch()
  return <button onClick={() => dispatch({ type: 'added', item: product })}>Add</button>
}`,
        },
        {
          type: 'note',
          content: 'Reducers must stay pure: same state plus same action gives the same result, with no mutation and no side effects. That is what makes them trivial to unit test — no React, no rendering, just a function call.',
        },
        {
          type: 'tip',
          content: 'Name actions after what HAPPENED ("added", "filter_changed"), not after what the reducer should do ("setItems"). The event log then reads like a description of user behaviour, and one action can update several fields at once.',
        },
      ],
    },
    {
      slug: 'performance',
      title: 'Performance: memo, useMemo & useCallback',
      intro: 'React is fast by default. Optimize only what you have measured — but when a list of a thousand rows re-renders on every keystroke, these three tools are the fix.',
      sections: [
        {
          type: 'code',
          language: 'jsx',
          content: `import { memo, useMemo, useCallback, useState } from 'react'

// memo skips re-rendering a component when its props are shallowly equal.
const Row = memo(function Row({ item, onSelect }) {
  console.log('rendering', item.id)
  return <li onClick={() => onSelect(item.id)}>{item.name}</li>
})

function List({ items }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  // useMemo: skip an expensive calculation when its inputs have not changed.
  const filtered = useMemo(
    () => items.filter(i => i.name.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  )

  // useCallback: keep the SAME function identity between renders, so the
  // memoized Row above actually stays memoized.
  const handleSelect = useCallback(id => setSelected(id), [])

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>
        {filtered.map(item => (
          <Row key={item.id} item={item} onSelect={handleSelect} />
        ))}
      </ul>
    </>
  )
}

// Without useCallback, handleSelect is a NEW function every render, so every
// Row gets a new prop, so memo never skips anything. memo and useCallback
// only work as a pair.`,
        },
        {
          type: 'code',
          language: 'jsx',
          content: `import { useState, lazy, Suspense } from 'react'

// The cheapest optimizations are structural — no hooks required.

// 1. Move state DOWN so fewer components re-render.
function SlowPage() {
  const [text, setText] = useState('')     // every keystroke re-renders ExpensiveTree
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <ExpensiveTree />
    </>
  )
}

function FastPage() {
  return (
    <>
      <TextField />          {/* state lives here now */}
      <ExpensiveTree />      {/* untouched by typing */}
    </>
  )
}

// 2. Pass expensive subtrees as children so they keep the same element identity.
function Wrapper({ children }) {
  const [count, setCount] = useState(0)
  return (
    <div onClick={() => setCount(count + 1)}>
      {count}
      {children}             {/* does not re-render when count changes */}
    </div>
  )
}

// 3. Lazy-load routes and heavy components
const Chart = lazy(() => import('./Chart'))

function Report() {
  return (
    <Suspense fallback={<Spinner />}>
      <Chart />
    </Suspense>
  )
}`,
        },
        {
          type: 'code',
          language: 'jsx',
          content: `import { useState, useDeferredValue, useTransition, memo } from 'react'

// useDeferredValue: keep the input responsive while a heavy list catches up.
function SearchPage({ allItems }) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const isStale = query !== deferredQuery

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <div style={{ opacity: isStale ? 0.6 : 1 }}>
        <ExpensiveResults query={deferredQuery} items={allItems} />
      </div>
    </>
  )
}

const ExpensiveResults = memo(function ExpensiveResults({ query, items }) {
  const results = items.filter(i => i.name.includes(query))
  return <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>
})

// useTransition: mark an update as low priority so urgent ones interrupt it.
function TabBar() {
  const [tab, setTab] = useState('home')
  const [isPending, startTransition] = useTransition()

  function select(next) {
    startTransition(() => setTab(next))    // the click feedback stays instant
  }

  return (
    <>
      <button onClick={() => select('reports')}>Reports</button>
      {isPending && <Spinner />}
      <TabPanel tab={tab} />
    </>
  )
}`,
        },
        {
          type: 'warning',
          content: 'Wrapping everything in useMemo and useCallback makes code slower and harder to read: each one costs a comparison and keeps its dependencies alive. Profile first with the React DevTools Profiler, then memoize the component that actually shows up.',
        },
        {
          type: 'note',
          content: 'The React Compiler (React 19) inserts most of this memoization automatically. If your project has it enabled, write the plain version and let the compiler do the work — hand-written useMemo becomes the exception, not the rule.',
        },
      ],
    },
  ],
}
