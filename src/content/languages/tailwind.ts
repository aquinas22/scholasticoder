import { Language } from '../types'

export const tailwind: Language = {
  slug: 'tailwind',
  name: 'Tailwind CSS',
  tagline: 'A utility-first CSS framework for rapid UI development.',
  description: "Tailwind CSS gives you low-level utility classes that let you build custom designs without leaving your HTML. No more writing CSS files, fighting specificity, or naming things. It's controversial until you use it, then it's difficult to go back.",
  accentColor: '#06B6D4',
  textOnAccent: '#fff',
  icon: 'Tw',
  difficulty: 'beginner',
  usedFor: ['Web UI Styling', 'Design Systems', 'Rapid Prototyping', 'Component Libraries'],
  notableUsers: ['GitHub', 'Shopify', 'OpenAI', 'Loom', 'Linear'],
  setup: {
    description: 'Install Tailwind via npm and configure it with PostCSS. Works with any framework — Vite, Next.js, Astro, plain HTML.',
    windows: `# Via Vite (recommended for new projects):
npm create vite@latest my-project -- --template vanilla
cd my-project
npm install -D tailwindcss @tailwindcss/vite

# Edit vite.config.js to add the Tailwind plugin,
# then add @import "tailwindcss" to your CSS file.

# Or standalone for plain HTML:
npm install -D tailwindcss
npx tailwindcss init`,
    mac: `# Via Vite:
npm create vite@latest my-project -- --template vanilla
cd my-project
npm install -D tailwindcss @tailwindcss/vite

# Or with npm CDN for quick experiments (not production):
# Add to HTML <head>:
# <script src="https://cdn.tailwindcss.com"></script>`,
    linux: `# Via Vite:
npm create vite@latest my-project -- --template vanilla
cd my-project
npm install -D tailwindcss @tailwindcss/vite

# Follow Vite setup: add plugin to vite.config.js
# and @import "tailwindcss" to your main CSS`,
  },
  lessons: [
    {
      slug: 'core-concept',
      title: 'The Utility-First Approach',
      intro: "Traditional CSS: you write a class name, then write CSS for it. Tailwind: the class names ARE the CSS. `p-4` means `padding: 1rem`. `text-blue-500` means that specific blue. No naming, no context-switching, no files.",
      sections: [
        {
          type: 'text',
          content: "Tailwind classes are atomic utilities — each does exactly one thing. You compose them directly in your HTML to build any design. This feels weird for about two hours and then feels obviously correct.",
        },
        {
          type: 'code',
          language: 'html',
          content: `<!-- Traditional CSS approach -->
<div class="card">
  <h2 class="card-title">Hello</h2>
  <p class="card-body">Some text here.</p>
</div>

<style>
.card { padding: 1.5rem; background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.card-title { font-size: 1.25rem; font-weight: 700; color: #111; margin-bottom: 0.5rem; }
.card-body { color: #6b7280; line-height: 1.6; }
</style>

<!-- Tailwind approach — same result, no CSS file -->
<div class="p-6 bg-white rounded-lg shadow">
  <h2 class="text-xl font-bold text-gray-900 mb-2">Hello</h2>
  <p class="text-gray-500 leading-relaxed">Some text here.</p>
</div>`,
        },
        {
          type: 'note',
          content: "Tailwind's build process scans your HTML/JS files and includes only the CSS classes you actually use. The final CSS bundle is typically 5–15 KB, not the full framework. This is why you must configure the `content` paths in tailwind.config.js — Tailwind needs to find all your class names.",
        },
      ],
    },
    {
      slug: 'spacing-sizing',
      title: 'Spacing & Sizing',
      intro: "Tailwind's spacing scale is based on `0.25rem` increments. `p-4` = 1rem padding, `m-8` = 2rem margin, `w-1/2` = 50% width. Memorize the scale and you stop looking things up.",
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<!-- Padding: p-{size}, px-{size}, py-{size}, pt-{size}, pr-{size}, pb-{size}, pl-{size} -->
<div class="p-4">all sides 1rem</div>
<div class="px-6 py-2">horizontal 1.5rem, vertical 0.5rem</div>
<div class="pt-8 pb-4">top 2rem, bottom 1rem</div>

<!-- Margin: same pattern with m- -->
<div class="m-4">1rem margin all sides</div>
<div class="mx-auto">center horizontally</div>
<div class="mt-8 mb-4">top 2rem, bottom 1rem</div>
<div class="space-y-4"><!-- children get 1rem gap between them --></div>

<!-- Width and Height -->
<div class="w-full">100% width</div>
<div class="w-1/2">50% width</div>
<div class="w-1/3">33.3% width</div>
<div class="w-64">16rem (256px) width</div>
<div class="w-screen">100vw</div>
<div class="max-w-lg">max-width: 32rem</div>
<div class="max-w-7xl mx-auto">centered page container</div>

<div class="h-screen">100vh</div>
<div class="h-64">16rem height</div>
<div class="min-h-screen">min-height: 100vh</div>`,
        },
        {
          type: 'code',
          language: 'html',
          content: `<!-- The spacing scale: 1 = 0.25rem, 2 = 0.5rem, 4 = 1rem, 8 = 2rem, 16 = 4rem -->
<!-- Common sizes: 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64 -->

<!-- Practical card layout -->
<div class="max-w-sm mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
  <div class="flex items-center gap-4 mb-4">
    <img class="w-12 h-12 rounded-full" src="avatar.jpg" alt="User" />
    <div>
      <h3 class="font-semibold text-gray-900">Alice Smith</h3>
      <p class="text-sm text-gray-500">Software Engineer</p>
    </div>
  </div>
  <p class="text-gray-600 leading-relaxed mb-4">
    Building things on the web. Loves Tailwind.
  </p>
  <div class="flex gap-2">
    <button class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">Follow</button>
    <button class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium">Message</button>
  </div>
</div>`,
        },
        {
          type: 'tip',
          content: "The most useful size to memorize: `p-4` = `padding: 1rem` (16px). Everything else is a multiple: `p-2` = 0.5rem, `p-8` = 2rem, `p-16` = 4rem. The scale is consistent across padding, margin, width, height, gap, and border-radius.",
        },
      ],
    },
    {
      slug: 'typography-colors',
      title: 'Typography & Colors',
      intro: "Tailwind ships a carefully-curated color palette (50 shades × 22 colors) and a typographic scale covering size, weight, line-height, letter-spacing, and more. All of it is accessible by name.",
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<!-- Font size: text-{size} -->
<p class="text-xs">12px</p>
<p class="text-sm">14px</p>
<p class="text-base">16px (default)</p>
<p class="text-lg">18px</p>
<p class="text-xl">20px</p>
<p class="text-2xl">24px</p>
<p class="text-3xl">30px</p>
<p class="text-4xl">36px</p>

<!-- Font weight -->
<p class="font-thin">100</p>
<p class="font-normal">400</p>
<p class="font-medium">500</p>
<p class="font-semibold">600</p>
<p class="font-bold">700</p>
<p class="font-black">900</p>

<!-- Text color: text-{color}-{shade} (50, 100, 200...900, 950) -->
<p class="text-gray-900">Almost black</p>
<p class="text-gray-500">Mid gray</p>
<p class="text-blue-600">Blue</p>
<p class="text-red-500">Red</p>
<p class="text-emerald-600">Green</p>

<!-- Line height / tracking / alignment -->
<p class="leading-tight">Tight (1.25)</p>
<p class="leading-normal">Normal (1.5)</p>
<p class="leading-relaxed">Relaxed (1.625)</p>
<p class="tracking-wide">Wide letter spacing</p>
<p class="text-center">Centered</p>`,
        },
        {
          type: 'code',
          language: 'html',
          content: `<!-- Background colors -->
<div class="bg-white">White background</div>
<div class="bg-gray-50">Very light gray (good for page backgrounds)</div>
<div class="bg-blue-500">Blue</div>
<div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg">
  Gradient background
</div>

<!-- Borders -->
<div class="border">1px border (default gray)</div>
<div class="border-2 border-blue-500">2px blue border</div>
<div class="border-t border-gray-200">Top border only</div>
<div class="rounded">4px radius</div>
<div class="rounded-lg">8px radius</div>
<div class="rounded-xl">12px radius</div>
<div class="rounded-full">Full circle/pill</div>

<!-- Shadows -->
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">XL shadow</div>

<!-- Ring (focus-visible outline) -->
<button class="ring-2 ring-blue-500 ring-offset-2">Focused look</button>`,
        },
        {
          type: 'tip',
          content: "The color naming is `{color}-{shade}`. Shade 500 is the \"pure\" version of any color. Lighter = lower number (100, 200), darker = higher number (700, 800). Use 50 for backgrounds, 100-300 for light accents, 500 for buttons/links, 700-900 for text on light backgrounds.",
        },
      ],
    },
    {
      slug: 'flexbox-grid',
      title: 'Flexbox & Grid',
      intro: "Tailwind wraps flexbox and CSS Grid in intuitive utilities. Most layouts are one-liners. `flex items-center justify-between` = horizontal bar with centered items. `grid grid-cols-3 gap-6` = three-column grid.",
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<!-- Flexbox -->
<div class="flex">Horizontal row (default)</div>
<div class="flex flex-col">Vertical column</div>
<div class="flex flex-wrap">Wrap to next line when full</div>

<!-- Alignment -->
<div class="flex items-center">Vertically centered</div>
<div class="flex items-start">Align to top</div>
<div class="flex items-end">Align to bottom</div>
<div class="flex items-stretch">Stretch to fill (default)</div>

<div class="flex justify-center">Horizontally centered</div>
<div class="flex justify-between">Space between</div>
<div class="flex justify-around">Space around</div>
<div class="flex justify-end">Align right</div>

<!-- Gap -->
<div class="flex gap-4">1rem gap between items</div>
<div class="flex gap-x-4 gap-y-2">Different horizontal/vertical gaps</div>

<!-- Flex children -->
<div class="flex">
  <div class="flex-1">Grows to fill space</div>
  <div class="w-48">Fixed width sidebar</div>
</div>

<!-- Common navbar pattern -->
<nav class="flex items-center justify-between px-6 py-4 bg-white border-b">
  <a href="/" class="font-bold text-xl">Logo</a>
  <div class="flex items-center gap-6">
    <a href="/about" class="text-gray-600 hover:text-gray-900">About</a>
    <a href="/blog"  class="text-gray-600 hover:text-gray-900">Blog</a>
    <button class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">Sign in</button>
  </div>
</nav>`,
        },
        {
          type: 'code',
          language: 'html',
          content: `<!-- CSS Grid -->
<div class="grid grid-cols-3 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<!-- Auto-fill responsive grid (most common pattern) -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <!-- Cards go here — auto-wraps based on screen size -->
</div>

<!-- Spanning columns -->
<div class="grid grid-cols-4 gap-4">
  <div class="col-span-3">Main content (3 of 4 cols)</div>
  <div class="col-span-1">Sidebar (1 of 4 cols)</div>
</div>

<!-- Spanning rows -->
<div class="grid grid-cols-3 grid-rows-3 gap-4 h-64">
  <div class="col-span-2 row-span-2 bg-blue-500">Featured</div>
  <div class="bg-gray-200">Item 2</div>
  <div class="bg-gray-200">Item 3</div>
  <div class="col-span-3 bg-gray-100">Footer row</div>
</div>

<!-- Place items -->
<div class="grid place-items-center h-screen">
  <p>Perfectly centered, vertically and horizontally</p>
</div>`,
        },
        {
          type: 'tip',
          content: "For responsive grids of cards, `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` is the pattern you'll write over and over. It stacks on mobile, shows 2 on tablet, 3 on desktop. The `sm:`, `md:`, `lg:`, `xl:` prefixes are Tailwind's breakpoint modifiers.",
        },
      ],
    },
    {
      slug: 'responsive-states',
      title: 'Responsive Design & States',
      intro: "Tailwind uses a mobile-first approach. Classes apply at all sizes unless prefixed. `sm:text-xl` means \"text-xl at 640px and above.\" Hover, focus, active — all controlled by state prefixes.",
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<!-- Breakpoints (min-width):
  sm:   640px
  md:   768px
  lg:  1024px
  xl:  1280px
  2xl: 1536px
-->

<!-- Mobile-first: no prefix = all screens, prefixed = that breakpoint and up -->
<h1 class="text-2xl md:text-4xl lg:text-6xl font-bold">
  Responsive Heading
</h1>

<div class="flex flex-col md:flex-row gap-6">
  <main class="md:w-2/3">Stack on mobile, side by side on md+</main>
  <aside class="md:w-1/3">Sidebar</aside>
</div>

<!-- Show/hide at breakpoints -->
<div class="block md:hidden">Mobile only</div>
<div class="hidden md:block">Desktop only</div>

<!-- Responsive padding -->
<section class="px-4 sm:px-6 lg:px-8">
  Content with responsive horizontal padding
</section>

<!-- Responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div class="bg-gray-100 p-4 rounded">Card 1</div>
  <div class="bg-gray-100 p-4 rounded">Card 2</div>
  <div class="bg-gray-100 p-4 rounded">Card 3</div>
  <div class="bg-gray-100 p-4 rounded">Card 4</div>
</div>`,
        },
        {
          type: 'code',
          language: 'html',
          content: `<!-- State modifiers -->

<!-- hover: — applies on mouse hover -->
<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
  Hover me
</button>

<!-- focus: — applies when focused (keyboard/click) -->
<input class="border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />

<!-- active: — applies while being clicked -->
<button class="bg-blue-500 active:scale-95 transition-transform px-4 py-2 rounded text-white">
  Click me
</button>

<!-- disabled: — applies to disabled elements -->
<button disabled class="bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded">
  Disabled
</button>

<!-- group + group-hover — parent controls child state -->
<div class="group flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
  <span class="text-gray-600 group-hover:text-blue-500 transition-colors">File.txt</span>
  <button class="opacity-0 group-hover:opacity-100 transition-opacity text-red-400">✕</button>
</div>

<!-- dark: — applies in dark mode (requires darkMode: 'class' in config) -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4">
  Adapts to dark mode
</div>`,
        },
        {
          type: 'tip',
          content: "Use `transition-{property}` and `duration-{ms}` to animate hover/focus state changes smoothly. `transition-colors` animates color/background, `transition-transform` animates scale/translate, `transition-all` animates everything (but is slower). `duration-200` is usually the sweet spot.",
        },
      ],
    },
    {
      slug: 'components',
      title: 'Building Components',
      intro: "Real-world Tailwind means building reusable component patterns. In a framework like React or Vue you extract these into components. In plain HTML, `@apply` in CSS can package groups of utilities.",
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<!-- Button variants — the pattern -->
<!-- Primary -->
<button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Primary
</button>

<!-- Secondary -->
<button class="px-4 py-2 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-lg text-sm border border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
  Secondary
</button>

<!-- Danger -->
<button class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
  Delete
</button>

<!-- Ghost -->
<button class="px-4 py-2 hover:bg-gray-100 text-gray-700 font-medium rounded-lg text-sm transition-colors">
  Ghost
</button>

<!-- Alert variants -->
<div class="flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
  <span>ℹ️</span>
  <p>Informational message here.</p>
</div>

<div class="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
  <span>⚠️</span>
  <p>Something went wrong. Please try again.</p>
</div>

<div class="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
  <span>✅</span>
  <p>Successfully saved your changes.</p>
</div>`,
        },
        {
          type: 'code',
          language: 'html',
          content: `<!-- Badge component -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">New</span>
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Error</span>

<!-- Input with label -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-gray-700" for="email">Email</label>
  <input
    id="email"
    type="email"
    class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
    placeholder="you@example.com"
  />
  <p class="text-xs text-gray-500">We'll never share your email.</p>
</div>

<!-- Card with image -->
<div class="max-w-xs rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow">
  <img class="w-full h-48 object-cover" src="image.jpg" alt="Card image" />
  <div class="p-5">
    <span class="text-xs font-semibold text-blue-600 uppercase tracking-wider">Category</span>
    <h3 class="mt-1 font-bold text-gray-900 text-lg leading-snug">Card Title Here</h3>
    <p class="mt-2 text-gray-500 text-sm line-clamp-3">
      Description text that might be long and gets clamped after three lines.
    </p>
    <div class="mt-4 flex items-center justify-between">
      <span class="text-sm text-gray-400">5 min read</span>
      <a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-700">Read more →</a>
    </div>
  </div>
</div>`,
        },
        {
          type: 'tip',
          content: "If you're using React, Vue, or Svelte, extract repeated utility strings into components instead of `@apply`. Component abstraction is the right level — not CSS class abstraction. `@apply` is mainly useful for integrating Tailwind with plain HTML pages or third-party component slots.",
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: Landing Page',
      intro: "Let's build a complete landing page hero section using Tailwind. Navigation, headline, subtext, CTAs, and a responsive layout.",
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Product</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-gray-900 antialiased">

  <!-- Navigation -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <a href="/" class="font-bold text-xl text-gray-900">Acme Co.</a>
        <div class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#pricing"  class="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          <a href="#about"    class="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</a>
          <a href="/login"    class="text-sm font-medium text-gray-900">Log in</a>
          <a href="/signup"   class="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
            Get started
          </a>
        </div>
      </div>
    </nav>
  </header>

  <!-- Hero -->
  <main class="pt-16">
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
      <!-- Badge -->
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-8">
        <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
        Now in public beta
      </div>

      <!-- Headline -->
      <h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 max-w-4xl mx-auto leading-tight">
        Build faster with
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          less code
        </span>
      </h1>

      <!-- Subtext -->
      <p class="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
        The modern platform for building web apps. Deploy in seconds,
        scale automatically, and never think about servers again.
      </p>

      <!-- CTAs -->
      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/signup" class="w-full sm:w-auto px-8 py-3.5 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
          Start for free →
        </a>
        <a href="/demo" class="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border border-gray-200 transition-colors">
          Watch demo
        </a>
      </div>

      <!-- Social proof -->
      <p class="mt-8 text-sm text-gray-400">
        Trusted by <span class="font-semibold text-gray-600">10,000+</span> developers worldwide
      </p>
    </section>
  </main>

</body>
</html>`,
        },
        {
          type: 'note',
          content: "This uses the CDN version (no build step) — great for prototyping. For production, install Tailwind via npm and use the build process to tree-shake unused classes. The CDN includes all 3MB of Tailwind; your built CSS will be 5-15 KB.",
        },
      ],
    },
  ],
}
