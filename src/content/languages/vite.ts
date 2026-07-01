import { Language } from '../types'

export const vite: Language = {
  slug: 'vite',
  name: 'Vite',
  tagline: 'Next generation frontend tooling.',
  description: "Vite (French for 'fast') is a build tool that uses native ES modules in the browser during development — meaning no bundling step, instant server start, and HMR updates in under 50ms. Created by Evan You (Vue's creator), it's now the standard build tool for Vue, React, Svelte, and vanilla JS projects.",
  accentColor: '#646CFF',
  textOnAccent: '#fff',
  icon: 'Vi',
  difficulty: 'intermediate',
  usedFor: ['Dev Server', 'Build Tool', 'Frontend Tooling', 'Library Builds', 'SSR'],
  notableUsers: ['Nuxt', 'SvelteKit', 'Remix', 'Astro', 'Laravel'],
  setup: {
    description: 'Vite is installed automatically when you scaffold a project with `npm create vite`. You can also add it to an existing project.',
    windows: `# Create a new project:
npm create vite@latest my-project
# Choose: framework (React/Vue/Svelte/Vanilla) and variant (JS/TS)

cd my-project
npm install
npm run dev`,
    mac: `# Create a new project:
npm create vite@latest my-project
cd my-project
npm install
npm run dev

# Or with specific template (no prompts):
npm create vite@latest my-react-app -- --template react-ts`,
    linux: `# Create a new project:
npm create vite@latest my-project
cd my-project
npm install
npm run dev`,
  },
  lessons: [
    {
      slug: 'why-vite',
      title: 'Why Vite?',
      intro: "Webpack bundles everything on start. With 10,000 modules that's 30+ seconds. Vite skips bundling during dev — the browser loads ES modules directly. That's a 2-second start regardless of project size.",
      sections: [
        {
          type: 'text',
          content: "Vite solves two problems: slow dev server startup (because old tools pre-bundle everything) and slow HMR (Hot Module Replacement). Vite uses native browser ES modules during development — no bundle at all. For production builds, it uses Rollup for optimized output.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Create and start a new project
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev    # starts in <300ms

# Available templates:
# vanilla, vanilla-ts
# vue, vue-ts
# react, react-ts
# preact, preact-ts
# lit, lit-ts
# svelte, svelte-ts
# solid, solid-ts
# qwik, qwik-ts

# Build for production
npm run build

# Preview the production build locally
npm run preview`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Resulting project structure:
my-app/
├── public/            # Static assets (copied as-is)
│   └── favicon.svg
├── src/
│   ├── main.ts        # App entry point
│   ├── App.tsx        # Root component
│   └── assets/        # Processed assets (images, fonts)
├── index.html         # Entry HTML (NOT in public/)
├── vite.config.ts     # Vite configuration
├── tsconfig.json
└── package.json`,
        },
        {
          type: 'note',
          content: "Unlike Webpack, Vite's entry point is `index.html` at the project root, not a JavaScript file. Vite parses the HTML to find `<script type=\"module\">` tags and uses those as entry points. This matches how the browser natively loads ES modules.",
        },
      ],
    },
    {
      slug: 'config',
      title: 'Vite Config',
      intro: "`vite.config.ts` is where you configure everything: plugins, path aliases, proxy rules, build options, and environment variables. It's shorter than Webpack config by an order of magnitude.",
      sections: [
        {
          type: 'code',
          language: 'typescript',
          content: `// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  // Plugins — framework support, transformations
  plugins: [react()],

  // Path aliases — import '@/components/Button' instead of '../../components/Button'
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  // Dev server options
  server: {
    port: 3000,
    open: true,     // auto-open browser

    // Proxy API requests to avoid CORS during development
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },

  // Build options
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2020',
    // Chunk splitting — separate vendor from app code
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },

  // CSS handling
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
})`,
        },
        {
          type: 'code',
          language: 'typescript',
          content: `// Environment variables in Vite
// Variables must be prefixed with VITE_ to be exposed to the client

// .env                — loaded in all environments
// .env.local          — loaded in all environments, ignored by git
// .env.development    — loaded in dev only
// .env.production     — loaded in production build only

// .env.local
// VITE_API_URL=http://localhost:8080
// VITE_STRIPE_KEY=pk_test_xxxxx

// Access in your code:
const apiUrl  = import.meta.env.VITE_API_URL
const isProd  = import.meta.env.PROD       // boolean
const isDev   = import.meta.env.DEV        // boolean
const mode    = import.meta.env.MODE       // 'development' | 'production'

// TypeScript: declare the env variables for type safety
// src/env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_STRIPE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}`,
        },
        {
          type: 'tip',
          content: 'Never prefix non-public secrets with `VITE_`. Anything with `VITE_` is bundled into your client-side code and visible in the browser. Server-side secrets (database URLs, private API keys) should be in your backend environment, not your frontend .env files.',
        },
      ],
    },
    {
      slug: 'imports-assets',
      title: 'Imports & Assets',
      intro: "Vite extends the native ES module system — you can import CSS, images, JSON, SVGs, and more directly from JavaScript. The imports are processed and optimized at build time.",
      sections: [
        {
          type: 'code',
          language: 'typescript',
          content: `// JavaScript/TypeScript imports — standard
import { useState } from 'react'
import MyComponent from './components/MyComponent'

// CSS imports — injected into the page
import './styles.css'
import './App.module.css'   // CSS Modules

// CSS Modules — locally-scoped class names
import styles from './Button.module.css'
// <button className={styles.button}>Click</button>
// Generates: <button class="Button_button__xyz">

// JSON imports — parsed automatically
import config from './config.json'
console.log(config.apiUrl)   // fully typed!

// Image imports — returns URL string
import logo from './assets/logo.png'
// <img src={logo} alt="Logo" />

// SVG as React component (with @vitejs/plugin-react)
// vite.config.ts: plugins: [react({ include: /\.(jsx|tsx|svg)$/ })]
import { ReactComponent as Logo } from './logo.svg'
// <Logo className="logo" />

// SVG as URL
import logoUrl from './logo.svg?url'

// Raw file content (as string)
import shaderSrc from './shader.glsl?raw'
import markdownText from './content.md?raw'

// Dynamic imports — lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'))`,
        },
        {
          type: 'code',
          language: 'typescript',
          content: `// Glob imports — import multiple files at once
// import.meta.glob is a Vite-specific API

// Import all markdown posts
const posts = import.meta.glob('./posts/*.md', { eager: true })

// Import all test files
const tests = import.meta.glob('../**/*.test.ts')

// Import all Vue components in a directory
const components = import.meta.glob('./components/**/*.vue', { eager: true })

// Practical use: auto-register Vue components
import { defineAsyncComponent } from 'vue'

const modules = import.meta.glob('./components/**/*.vue')

for (const path in modules) {
  const name = path.split('/').pop()?.replace('.vue', '') ?? ''
  app.component(name, defineAsyncComponent(modules[path]))
}

// Public directory — no processing, served at root URL
// public/favicon.ico → /favicon.ico (in your HTML/CSS)
// public/robots.txt  → /robots.txt
// Don't reference public assets from JS imports — use '/filename.ext'`,
        },
        {
          type: 'tip',
          content: 'Put static assets that need URL references (fonts, icons referenced in CSS) in the `public/` directory. Put assets you import from JavaScript (images in components, SVGs) in `src/assets/`. Vite hashes filenames in `src/assets/` for cache-busting; `public/` filenames are unchanged.',
        },
      ],
    },
    {
      slug: 'plugins',
      title: 'Plugins & HMR',
      intro: "Vite's plugin API is based on Rollup's, extended with Vite-specific hooks. Most frameworks have an official Vite plugin. HMR (Hot Module Replacement) updates the browser in milliseconds without a full page reload.",
      sections: [
        {
          type: 'code',
          language: 'typescript',
          content: `// Popular Vite plugins
// npm install -D @vitejs/plugin-react
// npm install -D @vitejs/plugin-vue
// npm install -D @tailwindcss/vite
// npm install -D vite-plugin-pwa
// npm install -D vite-plugin-svgr

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),        // import SVGs as React components

    VitePWA({      // progressive web app support
      registerType: 'autoUpdate',
      manifest: {
        name: 'My App',
        short_name: 'App',
        theme_color: '#646cff',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})`,
        },
        {
          type: 'code',
          language: 'typescript',
          content: `// Writing a simple Vite plugin
import type { Plugin } from 'vite'

function myPlugin(): Plugin {
  return {
    name: 'my-plugin',

    // Transform a file's content
    transform(code, id) {
      if (!id.endsWith('.txt')) return null
      return {
        code: \`export default \${JSON.stringify(code)}\`,
        map: null,
      }
    },

    // Inject content into HTML
    transformIndexHtml(html) {
      return html.replace(
        '<head>',
        '<head><meta name="generator" content="Vite" />'
      )
    },

    // Hook into server startup
    configureServer(server) {
      server.middlewares.use('/status', (req, res) => {
        res.end(JSON.stringify({ ok: true }))
      })
    },
  }
}

// HMR API — for writing libraries that support HMR
if (import.meta.hot) {
  import.meta.hot.accept('./module', (newModule) => {
    // Called when module or its dependencies update
    updateSomething(newModule)
  })

  import.meta.hot.dispose(() => {
    // Cleanup before module is replaced
    cleanup()
  })
}`,
        },
        {
          type: 'note',
          content: "Vite's HMR works out of the box for Vue and React (via their plugins). For vanilla JS, you need to handle `import.meta.hot` manually. HMR preserves component state during updates — you edit a button's style and the button updates instantly without losing what you typed in a nearby form.",
        },
      ],
    },
    {
      slug: 'build-optimization',
      title: 'Build & Optimization',
      intro: "`npm run build` runs Rollup under the hood and produces optimized, code-split output. Vite handles CSS minification, asset hashing, tree-shaking, and chunk splitting automatically.",
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `# Build for production
npm run build

# Output (dist/):
# dist/index.html
# dist/assets/index-a1b2c3d4.css     (hashed filename = cache-busting)
# dist/assets/index-e5f6a7b8.js      (main bundle)
# dist/assets/vendor-c9d0e1f2.js     (react + react-dom, cached separately)

# Analyze bundle size
npm install -D rollup-plugin-visualizer

# Add to vite.config.ts:
# import { visualizer } from 'rollup-plugin-visualizer'
# plugins: [react(), visualizer({ open: true })]
# Then: npm run build — opens interactive treemap in browser

# Preview production build locally
npm run preview   # serves dist/ at http://localhost:4173`,
        },
        {
          type: 'code',
          language: 'typescript',
          content: `// Build optimization in vite.config.ts
import { defineConfig, splitVendorChunkPlugin } from 'vite'

export default defineConfig({
  build: {
    // Target modern browsers — smaller output
    target: 'es2020',

    // Increase chunk size warning threshold (default 500kB)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Manual chunk splitting — separate big libraries
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Put React in its own chunk
            if (id.includes('react')) return 'react-vendor'
            // Put charting library in its own chunk
            if (id.includes('recharts')) return 'charts'
            // Everything else in vendor
            return 'vendor'
          }
        },
      },
    },

    // Generate .gz and .br compressed versions
    // (needs vite-plugin-compression)
    reportCompressedSize: true,
  },

  // Pre-bundle dependencies for faster dev cold start
  optimizeDeps: {
    include: ['lodash-es', 'axios'],
    exclude: ['your-esm-package'],
  },
})

// Lazy loading routes (React Router example)
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home    = lazy(() => import('./pages/Home'))
const About   = lazy(() => import('./pages/About'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/about"     element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  )
}`,
        },
        {
          type: 'tip',
          content: 'After `npm run build`, check the output for chunks larger than 500KB — Vite warns you about them. Use `rollup-plugin-visualizer` to see exactly what\'s taking up space. The usual culprits: moment.js (use date-fns), lodash (use lodash-es or individual imports), and large icon libraries (import individually, not the whole set).',
        },
      ],
    },
  ],
}
