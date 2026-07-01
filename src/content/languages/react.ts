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
  ],
}
