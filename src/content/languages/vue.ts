import { Language } from '../types'

export const vue: Language = {
  slug: 'vue',
  name: 'Vue',
  tagline: 'The Progressive JavaScript Framework.',
  description: "Vue is a framework for building UIs that is intentionally approachable. You can start with a script tag and no build step, or use a full CLI-built SPA. Vue 3's Composition API is powerful and explicit, while its Options API keeps simple things simple. Often described as the best parts of Angular and React, without the downsides of either.",
  accentColor: '#42b883',
  textOnAccent: '#fff',
  icon: 'Vu',
  difficulty: 'intermediate',
  usedFor: ['Web UIs', 'Single-Page Apps', 'Full-stack (Nuxt)', 'Progressive Enhancement'],
  notableUsers: ['GitLab', 'Alibaba', 'Xiaomi', 'Laravel', 'Chess.com'],
  setup: {
    description: 'Create a Vue project with Vite — the official and fastest setup. Vue also works as a CDN drop-in for progressive enhancement.',
    windows: `# Create a Vite-powered Vue app:
npm create vite@latest my-app -- --template vue
cd my-app
npm install
npm run dev

# With TypeScript:
npm create vite@latest my-app -- --template vue-ts`,
    mac: `# Create a Vite-powered Vue app:
npm create vite@latest my-app -- --template vue
cd my-app
npm install
npm run dev`,
    linux: `# Create a Vite-powered Vue app:
npm create vite@latest my-app -- --template vue
cd my-app
npm install
npm run dev`,
  },
  lessons: [
    {
      slug: 'hello-world',
      title: 'Hello, Vue!',
      intro: "Vue's building block is the Single File Component (.vue file) — HTML, JavaScript, and CSS in one file, cleanly separated into three sections. It's the part that makes developers who've never used Vue say 'wait, that's actually nice.'",
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<!-- App.vue — a Vue Single File Component (SFC) -->
<template>
  <div>
    <h1>{{ message }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// ref() makes a value reactive
const message = ref("Hello, Vue!")
const count   = ref(0)
</script>

<style scoped>
/* scoped — styles only apply to this component */
h1 { color: #42b883; }
</style>`,
        },
        {
          type: 'text',
          content: "`<script setup>` is Vue 3's Composition API. The `setup` attribute is syntactic sugar — everything you declare at the top level is automatically available in the template. No need for `return {}` or wrapping in `setup()`.",
        },
        {
          type: 'code',
          language: 'html',
          content: `<!-- CDN version — no build step, great for quick experiments -->
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    <h1>{{ message }}</h1>
    <button @click="count++">{{ count }}</button>
  </div>
  <script>
    const { createApp, ref } = Vue
    createApp({
      setup() {
        const message = ref("Hello from CDN!")
        const count   = ref(0)
        return { message, count }
      }
    }).mount('#app')
  </script>
</body>
</html>`,
        },
        {
          type: 'note',
          content: "Vue has two API styles: Composition API (`<script setup>`, modern, recommended) and Options API (`data()`, `methods:`, `computed:`, older style). Both work in Vue 3. This course uses Composition API — it's better for large components and TypeScript.",
        },
      ],
    },
    {
      slug: 'reactivity',
      title: 'Reactivity: ref & reactive',
      intro: "Vue's reactivity system tracks which data a template uses and only re-renders what changed. `ref` wraps a primitive. `reactive` wraps an object. Know the difference and you'll avoid 90% of Vue gotchas.",
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<template>
  <div>
    <!-- Access ref values with .value in <script>, directly in template -->
    <p>Count: {{ count }}</p>
    <p>Name: {{ name }}</p>
    <p>Items: {{ items.join(', ') }}</p>
    <button @click="increment">+</button>
    <button @click="addItem">Add Item</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// ref() — for primitives (number, string, boolean) and anything you might reassign
const count = ref(0)
const name  = ref("Alice")
const items = ref([])

// In <script>, access the value with .value
function increment() {
  count.value++
}

function addItem() {
  items.value.push(\`Item \${items.value.length + 1}\`)
}

// You can reassign refs entirely
function reset() {
  count.value = 0
  items.value = []   // OK — reassigning the ref
}
</script>`,
        },
        {
          type: 'code',
          language: 'html',
          content: `<template>
  <form @submit.prevent="submit">
    <input v-model="form.name"  placeholder="Name" />
    <input v-model="form.email" placeholder="Email" type="email" />
    <button type="submit">Submit</button>
    <pre>{{ form }}</pre>
  </form>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'

// reactive() — for objects (no .value needed)
const form = reactive({
  name:  "",
  email: "",
})

// computed() — derived reactive value, cached
const isValid = computed(() =>
  form.name.length > 0 && form.email.includes("@")
)

// watch() — run a function when a value changes
watch(() => form.email, (newEmail) => {
  console.log("Email changed to:", newEmail)
})

function submit() {
  if (!isValid.value) return alert("Invalid form")
  console.log("Submitting:", { ...form })
  form.name  = ""
  form.email = ""
}
</script>`,
        },
        {
          type: 'tip',
          content: 'Rule of thumb: use `ref` for single values (number, string, array you\'ll replace), `reactive` for objects with multiple related fields (forms, config). Never destructure a `reactive` object — you lose reactivity. Use `toRefs(state)` if you need to destructure.',
        },
      ],
    },
    {
      slug: 'directives',
      title: 'Template Directives',
      intro: "Vue's directives (`v-if`, `v-for`, `v-bind`, `v-on`, `v-model`) are the glue between your reactive data and the DOM. They're attributes that start with `v-` and get special treatment from Vue's compiler.",
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<template>
  <div>
    <!-- v-if / v-else-if / v-else — conditional rendering -->
    <p v-if="isLoggedIn">Welcome back!</p>
    <p v-else>Please log in.</p>

    <!-- v-show — toggles visibility (CSS display) instead of removing from DOM -->
    <div v-show="isLoading">Loading...</div>

    <!-- v-for — list rendering (always use :key) -->
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} — {{ item.price }}
      </li>
    </ul>

    <!-- v-for with index -->
    <ol>
      <li v-for="(item, index) in items" :key="item.id">
        {{ index + 1 }}. {{ item.name }}
      </li>
    </ol>

    <!-- v-for over an object -->
    <div v-for="(value, key) in user" :key="key">
      {{ key }}: {{ value }}
    </div>

    <!-- v-bind (:) — bind attribute to data -->
    <img :src="user.avatar" :alt="user.name" />
    <a :href="profileUrl" :class="{ active: isActive }">Profile</a>

    <!-- v-on (@) — event listener -->
    <button @click="handleClick">Click</button>
    <input @input="handleInput" @keydown.enter="submit" />

    <!-- Event modifiers -->
    <form @submit.prevent="onSubmit">       <!-- e.preventDefault() -->
    <div @click.stop="doSomething">         <!-- e.stopPropagation() -->
    <a @click.prevent.stop="handleLink">   <!-- both -->

    <!-- v-model — two-way binding -->
    <input v-model="username" />
    <select v-model="selectedRole">
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
    <input type="checkbox" v-model="agreed" />
    <input type="range" v-model.number="volume" min="0" max="100" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isLoggedIn = ref(true)
const isLoading  = ref(false)
const username   = ref("")
const agreed     = ref(false)
const volume     = ref(50)
const user = { name: "Alice", email: "alice@example.com", avatar: "/alice.jpg" }
const items = [
  { id: 1, name: "Widget", price: "$9.99" },
  { id: 2, name: "Gadget", price: "$19.99" },
]
</script>`,
        },
        {
          type: 'tip',
          content: 'Prefer `v-show` over `v-if` for elements that toggle frequently (like a dropdown or modal) — it avoids creating/destroying DOM nodes on every toggle. Use `v-if` when the element rarely appears or has expensive child components that should not initialize until needed.',
        },
      ],
    },
    {
      slug: 'components',
      title: 'Components & Props',
      intro: "Vue components communicate via props (parent → child) and emits (child → parent). This one-directional data flow makes applications predictable — you always know where data comes from.",
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<!-- UserCard.vue — child component -->
<template>
  <div class="user-card">
    <img :src="avatar" :alt="name" />
    <h3>{{ name }}</h3>
    <p>{{ role }}</p>
    <button @click="$emit('follow', userId)">Follow</button>
  </div>
</template>

<script setup>
// defineProps — declare incoming props
const props = defineProps({
  userId:  { type: Number, required: true },
  name:    { type: String, required: true },
  avatar:  { type: String, default: '/default-avatar.png' },
  role:    { type: String, default: 'user' },
})

// defineEmits — declare events this component can emit
const emit = defineEmits(['follow', 'unfollow'])

// Or with TypeScript:
// const props = defineProps<{ userId: number; name: string; role?: string }>()
// const emit  = defineEmits<{ follow: [userId: number] }>()
</script>

<!-- App.vue — parent using UserCard -->
<template>
  <div>
    <UserCard
      v-for="user in users"
      :key="user.id"
      :userId="user.id"
      :name="user.name"
      :role="user.role"
      @follow="handleFollow"
    />
  </div>
</template>

<script setup>
import UserCard from './UserCard.vue'
import { ref } from 'vue'

const users = ref([
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob",   role: "user" },
])

function handleFollow(userId) {
  console.log(\`Following user \${userId}\`)
}
</script>`,
        },
        {
          type: 'code',
          language: 'html',
          content: `<!-- Slots — pass template content into a component -->

<!-- Card.vue -->
<template>
  <div class="card">
    <header v-if="$slots.header" class="card-header">
      <slot name="header" />
    </header>
    <div class="card-body">
      <slot />  <!-- default slot -->
    </div>
    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<!-- Using Card with named slots -->
<Card>
  <template #header>
    <h2>Card Title</h2>
  </template>

  <p>This goes in the default slot.</p>
  <p>Multiple elements are fine.</p>

  <template #footer>
    <button>Save</button>
    <button>Cancel</button>
  </template>
</Card>

<!-- Scoped slots — component passes data back to the parent template -->
<!-- DataTable.vue exposes each row's data via scoped slot -->
<DataTable :rows="users">
  <template #row="{ row, index }">
    <td>{{ index + 1 }}</td>
    <td>{{ row.name }}</td>
    <td>{{ row.email }}</td>
  </template>
</DataTable>`,
        },
        {
          type: 'tip',
          content: 'Keep props simple — pass data down, emit events up. If you find yourself passing props through 3+ levels, that\'s a sign to use `provide`/`inject` (Vue\'s context API) or a state management library like Pinia.',
        },
      ],
    },
    {
      slug: 'composables',
      title: 'Composables',
      intro: "Composables are Vue 3's way of extracting and sharing reactive logic between components. They're just functions that use Vue's Composition API — a composable is to Vue what a custom hook is to React.",
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `// composables/useFetch.js
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data    = ref(null)
  const error   = ref(null)
  const loading = ref(false)

  watchEffect(async () => {
    const resolvedUrl = toValue(url)   // works with ref or plain string
    if (!resolvedUrl) return

    data.value    = null
    error.value   = null
    loading.value = true

    try {
      const res = await fetch(resolvedUrl)
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
      data.value = await res.json()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  })

  return { data, error, loading }
}`,
        },
        {
          type: 'code',
          language: 'html',
          content: `<!-- Using the composable -->
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <ul v-else>
      <li v-for="post in data" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from './composables/useFetch'

// Works with a static URL
const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts')

// Also works reactively — refetches when postId changes!
const postId = ref(1)
const { data: post } = useFetch(() => \`https://jsonplaceholder.typicode.com/posts/\${postId.value}\`)
</script>

<!-- composables/useLocalStorage.js -->
<script>
import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key)
  const value  = ref(stored ? JSON.parse(stored) : defaultValue)

  watch(value, (newVal) => {
    localStorage.setItem(key, JSON.stringify(newVal))
  }, { deep: true })

  return value
}
</script>

<!-- Using useLocalStorage -->
<script setup>
import { useLocalStorage } from './composables/useLocalStorage'

const theme    = useLocalStorage('theme', 'light')
const settings = useLocalStorage('settings', { notifications: true, lang: 'en' })
</script>`,
        },
        {
          type: 'tip',
          content: "Name composables starting with `use` (like `useFetch`, `useMousePosition`, `useTheme`). Put them in a `composables/` directory. Any logic that involves reactive state and could be used in multiple components is a good candidate for extraction into a composable.",
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: Todo App with Pinia',
      intro: "Build a fully featured todo app using Vue 3 + Pinia (Vue's official state management library). Pinia replaces Vuex — it's simpler, type-safe, and works great with the Composition API.",
      sections: [
        {
          type: 'code',
          language: 'javascript',
          content: `// stores/todos.js  (install pinia: npm install pinia)
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodosStore = defineStore('todos', () => {
  // State
  const todos  = ref([])
  const filter = ref('all')   // 'all' | 'active' | 'done'

  // Getters (computed)
  const filtered = computed(() => {
    if (filter.value === 'active') return todos.value.filter(t => !t.done)
    if (filter.value === 'done')   return todos.value.filter(t => t.done)
    return todos.value
  })

  const remaining = computed(() => todos.value.filter(t => !t.done).length)

  // Actions
  function add(text) {
    todos.value.push({ id: Date.now(), text, done: false })
  }

  function toggle(id) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.done = !todo.done
  }

  function remove(id) {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  function clearDone() {
    todos.value = todos.value.filter(t => !t.done)
  }

  return { todos, filter, filtered, remaining, add, toggle, remove, clearDone }
})`,
        },
        {
          type: 'code',
          language: 'html',
          content: `<!-- App.vue -->
<template>
  <div class="app">
    <h1>Todos <span class="badge">{{ store.remaining }}</span></h1>

    <!-- Add new todo -->
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="What needs to be done?" />
      <button type="submit">Add</button>
    </form>

    <!-- Filter buttons -->
    <div class="filters">
      <button v-for="f in filters" :key="f"
              :class="{ active: store.filter === f }"
              @click="store.filter = f">
        {{ f }}
      </button>
    </div>

    <!-- Todo list -->
    <TransitionGroup name="list" tag="ul">
      <li v-for="todo in store.filtered" :key="todo.id" :class="{ done: todo.done }">
        <input type="checkbox" :checked="todo.done" @change="store.toggle(todo.id)" />
        <span>{{ todo.text }}</span>
        <button @click="store.remove(todo.id)">✕</button>
      </li>
    </TransitionGroup>

    <button v-if="store.todos.some(t => t.done)" @click="store.clearDone">
      Clear completed
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodosStore } from './stores/todos'

const store   = useTodosStore()
const newTodo = ref("")
const filters = ['all', 'active', 'done']

function addTodo() {
  if (!newTodo.value.trim()) return
  store.add(newTodo.value.trim())
  newTodo.value = ""
}
</script>

<style>
.list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-enter-from, .list-leave-to       { opacity: 0; transform: translateX(-30px); }
</style>`,
        },
        {
          type: 'note',
          content: "Register Pinia in `main.js`: `import { createPinia } from 'pinia'; app.use(createPinia())`. Next steps: add local storage persistence with `pinia-plugin-persistedstate`, or try Vue Router for multi-page navigation.",
        },
      ],
    },
  ],
}
