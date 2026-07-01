import { Language } from '../types'

export const css: Language = {
  slug: 'css',
  name: 'CSS',
  tagline: 'It\'s not a programming language. (It\'s not a programming language.) We\'ll keep saying it.',
  description: 'CSS (Cascading Style Sheets) controls how HTML looks. Colors, fonts, layout, animations, responsiveness — CSS does all of it. It\'s deceptively powerful: the basics are easy to learn, mastering it takes years.',
  accentColor: '#1572B6',
  textOnAccent: '#fff',
  icon: 'CSS',
  difficulty: 'beginner',
  usedFor: ['Web Page Styling', 'Animations', 'Responsive Layouts', 'Print Stylesheets'],
  notableUsers: ['Every website ever'],
  setup: {
    description: 'CSS needs only a text editor and a browser. Create a .css file and link it from your HTML. The browser does the rest.',
    windows: `# Same as HTML — just a text editor + browser
# VS Code with these extensions helps enormously:
# - CSS Peek
# - IntelliSense for CSS
# - Live Server

# Create style.css, link it in your HTML:
# <link rel="stylesheet" href="style.css">`,
    mac: `# VS Code is recommended:
brew install --cask visual-studio-code

# Create style.css
# Link in HTML head:
# <link rel="stylesheet" href="style.css">

# Browser DevTools (F12 or right-click Inspect)
# are your best CSS debugging tool.`,
    linux: `# VS Code:
sudo snap install code --classic

# Or any text editor: Gedit, Kate, Vim, etc.

# Open index.html in Firefox — F12 opens DevTools
# You can live-edit CSS in the browser inspector`,
  },
  lessons: [
    {
      slug: 'linking-css',
      title: 'Linking CSS & Setup',
      intro: 'CSS is written separately from HTML (usually) and linked in. This is the separation of concerns principle: HTML handles structure, CSS handles appearance.',
      sections: [
        {
          type: 'text',
          content: 'There are three ways to add CSS to HTML. The external stylesheet (in a separate .css file, linked with <link>) is the best practice. The others exist but have specific, limited use cases.',
        },
        {
          type: 'code',
          language: 'html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Demo</title>

  <!-- Method 1: External stylesheet (BEST — use this) -->
  <link rel="stylesheet" href="styles.css">

  <!-- Method 2: Internal stylesheet (use only for single-page demos) -->
  <style>
    body { font-family: sans-serif; }
  </style>
</head>
<body>
  <!-- Method 3: Inline styles (avoid — mixes concerns, can't be reused) -->
  <p style="color: red; font-size: 18px;">Don't do this except in emergencies.</p>

  <h1>Hello, CSS!</h1>
  <p class="intro">This paragraph is styled via an external stylesheet.</p>
  <p id="special">This paragraph has a unique ID.</p>
</body>
</html>`,
        },
        {
          type: 'code',
          language: 'css',
          content: `/* styles.css */

/* This is a CSS comment */

/* Selector { property: value; } */
body {
  font-family: Georgia, serif;
  background-color: #f5f5f5;
  color: #333333;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #1a1a1a;
  font-size: 2.5rem;    /* rem = relative to root font size */
}

.intro {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;     /* 1.6x the font size */
}

#special {
  background-color: #fff3cd;
  padding: 12px;
  border-left: 4px solid #ffc107;
}`,
        },
        {
          type: 'note',
          content: 'Browser DevTools are your best friend for CSS. In Chrome or Firefox: right-click any element → Inspect. You can live-edit CSS properties in the Styles panel to see changes instantly, then copy them to your file.',
        },
      ],
    },
    {
      slug: 'selectors',
      title: 'Selectors & Properties',
      intro: 'Selectors target which HTML elements to style. The more specific the selector, the higher the specificity, and the more likely it is to win if there\'s a conflict.',
      sections: [
        {
          type: 'code',
          language: 'css',
          content: `/* Element selectors */
p { color: #333; }
h1 { font-size: 2rem; }

/* Class selector — use for reusable styles */
.highlight { background-color: yellow; }
.btn { padding: 8px 16px; border-radius: 4px; }

/* ID selector — use for unique elements */
#header { position: fixed; top: 0; width: 100%; }

/* Attribute selector */
input[type="email"] { border: 2px solid blue; }
a[href^="https"] { color: green; }  /* href starts with "https" */
a[href$=".pdf"] { color: red; }     /* href ends with ".pdf" */

/* Pseudo-classes — element in a specific state */
a:hover { text-decoration: underline; }   /* mouse over */
input:focus { outline: 2px solid blue; }  /* keyboard focused */
li:first-child { font-weight: bold; }
li:last-child { color: gray; }
li:nth-child(odd) { background: #f0f0f0; }
p:not(.intro) { font-size: 0.9rem; }

/* Pseudo-elements — virtual elements */
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; }
.quote::before { content: '"'; }
.quote::after { content: '"'; }

/* Combinators */
div p { color: blue; }        /* descendant: any p inside div */
div > p { color: red; }       /* child: direct p children of div */
h1 + p { margin-top: 0; }    /* adjacent sibling: p immediately after h1 */
h1 ~ p { color: gray; }       /* general sibling: any p after h1 */

/* Multiple selectors */
h1, h2, h3 { font-family: serif; }`,
        },
        {
          type: 'text',
          content: 'CSS specificity determines which rule wins when multiple rules target the same element. ID selectors beat class selectors, which beat element selectors. When specificity is equal, the last rule in the stylesheet wins.',
        },
        {
          type: 'code',
          language: 'css',
          content: `/* Common text properties */
.text-demo {
  font-family: 'Arial', Helvetica, sans-serif; /* fallback chain */
  font-size: 1rem;          /* 1rem = 16px by default */
  font-weight: bold;         /* or: 100-900, or: normal */
  font-style: italic;
  line-height: 1.5;          /* spacing between lines */
  letter-spacing: 0.05em;    /* spacing between letters */
  text-align: center;        /* left, right, center, justify */
  text-transform: uppercase; /* lowercase, capitalize */
  text-decoration: underline; /* none, overline, line-through */
  color: #333333;
}

/* Common color formats */
.colors {
  color: red;                 /* named color */
  color: #ff0000;             /* hex */
  color: rgb(255, 0, 0);      /* rgb */
  color: rgba(255, 0, 0, 0.5); /* rgba with alpha */
  color: hsl(0, 100%, 50%);   /* hue, saturation, lightness */
  color: oklch(0.6 0.2 30);   /* oklch (modern, perceptually uniform) */
}`,
        },
      ],
    },
    {
      slug: 'box-model',
      title: 'The Box Model',
      intro: 'Every HTML element is a box. This sounds obvious until you try to center something, and then it sounds like a conspiracy.',
      sections: [
        {
          type: 'text',
          content: 'The CSS box model defines how the browser calculates the size and spacing of every element. From inside out: content → padding → border → margin. Understanding this model is the key to understanding layout.',
        },
        {
          type: 'code',
          language: 'css',
          content: `/* Box model components */
.box {
  /* Content area */
  width: 300px;
  height: 200px;

  /* Padding — space inside the border */
  padding: 20px;                  /* all sides */
  padding: 10px 20px;             /* vertical horizontal */
  padding: 10px 20px 15px 20px;   /* top right bottom left */

  /* Border */
  border: 2px solid #333;
  border-radius: 8px;             /* rounded corners */
  border-top: 4px solid blue;     /* individual sides */

  /* Margin — space outside the border */
  margin: 0 auto;                 /* 0 top/bottom, auto left/right = centered */
  margin-bottom: 16px;
}

/* CRITICAL: Use border-box sizing */
/* Without it, padding and border ADD to the width */
/* With it, padding and border are INCLUDED in the width */
* {
  box-sizing: border-box;  /* Put this in every project. Always. */
}

/* Display types */
.block {
  display: block;      /* Takes full width, starts new line (default for div, p, h1) */
}
.inline {
  display: inline;     /* Flows with text, no width/height (default for span, a) */
}
.inline-block {
  display: inline-block; /* Flows inline, but accepts width/height */
}
.hidden {
  display: none;       /* Completely removed from layout */
}
.invisible {
  visibility: hidden;  /* Hidden but still takes up space */
}`,
        },
        {
          type: 'code',
          language: 'css',
          content: `/* The centering problems and solutions */

/* Center block element horizontally */
.centered-block {
  width: 500px;
  margin: 0 auto;    /* auto left+right = equal margins = centered */
}

/* Center with Flexbox (see next lesson) */
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Overflow */
.overflow-demo {
  width: 200px;
  height: 100px;
  overflow: hidden;   /* clip overflow */
  overflow: scroll;   /* always show scrollbar */
  overflow: auto;     /* scrollbar only when needed */
  overflow-x: auto;   /* horizontal only */
}

/* Position */
.positioned {
  position: static;    /* default — in document flow */
  position: relative;  /* offset from its normal position */
  position: absolute;  /* removed from flow, positioned relative to nearest non-static ancestor */
  position: fixed;     /* relative to viewport, stays while scrolling */
  position: sticky;    /* relative until it hits a threshold, then fixed */
  top: 10px;
  left: 20px;
  z-index: 10;         /* stack order (higher = on top) */
}`,
        },
        {
          type: 'warning',
          content: 'Add box-sizing: border-box to every project, globally. Without it, a box with width: 300px and padding: 20px will actually be 340px wide — a constant source of confusion. The * { box-sizing: border-box; } rule is a near-universal best practice.',
        },
      ],
    },
    {
      slug: 'flexbox',
      title: 'Flexbox',
      intro: 'Before Flexbox, centering things in CSS required three StackOverflow tabs and a blessing from the CSS gods. Now it\'s two lines.',
      sections: [
        {
          type: 'text',
          content: 'Flexbox is a one-dimensional layout system — it lays items out in either a row or a column. Apply display: flex to a container, and its children become "flex items" you can align, distribute, and resize with precision.',
        },
        {
          type: 'code',
          language: 'css',
          content: `/* Flexbox container properties */
.flex-container {
  display: flex;

  /* Direction */
  flex-direction: row;            /* left to right (default) */
  flex-direction: row-reverse;    /* right to left */
  flex-direction: column;         /* top to bottom */
  flex-direction: column-reverse;

  /* Wrapping */
  flex-wrap: nowrap;  /* all on one line (default) */
  flex-wrap: wrap;    /* wrap to next line if needed */

  /* Shorthand */
  flex-flow: row wrap;

  /* Alignment on main axis (row = horizontal, column = vertical) */
  justify-content: flex-start;     /* pack at start */
  justify-content: flex-end;       /* pack at end */
  justify-content: center;         /* center */
  justify-content: space-between;  /* even gaps, no outer gaps */
  justify-content: space-around;   /* even gaps with outer gaps */
  justify-content: space-evenly;   /* all gaps equal */

  /* Alignment on cross axis */
  align-items: stretch;     /* fill container height (default) */
  align-items: flex-start;  /* align to top */
  align-items: flex-end;    /* align to bottom */
  align-items: center;      /* center vertically */

  /* Gap between items */
  gap: 16px;           /* row and column gap */
  gap: 8px 16px;       /* row-gap column-gap */
}

/* Flex item properties */
.flex-item {
  flex-grow: 1;    /* how much to grow to fill space (0 = don't grow) */
  flex-shrink: 1;  /* how much to shrink (0 = don't shrink) */
  flex-basis: 200px; /* initial size before growing/shrinking */
  flex: 1;         /* shorthand: grow=1 shrink=1 basis=0 */

  align-self: center; /* override align-items for this item */
  order: 2;           /* control order (default 0) */
}`,
        },
        {
          type: 'code',
          language: 'css',
          content: `/* Common Flexbox patterns */

/* Navigation bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
}

/* Card grid that wraps */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px;  /* grow=1, shrink=1, basis=300px */
}

/* THE classic center-everything */
.center-everything {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;  /* full viewport height */
}

/* Sidebar layout */
.layout {
  display: flex;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;  /* don't shrink the sidebar */
}

.main-content {
  flex: 1;  /* take all remaining space */
  min-width: 0;  /* prevent overflow in flex children */
}`,
        },
        {
          type: 'note',
          content: 'Use Flexbox for one-dimensional layouts: navbars, card rows, centering. Use CSS Grid (next lesson) for two-dimensional layouts: page layouts, image galleries. They work great together.',
        },
      ],
    },
    {
      slug: 'grid',
      title: 'CSS Grid',
      intro: 'CSS Grid is the layout system we\'ve wanted since 1996. It arrived in 2017. Better late than never, we suppose.',
      sections: [
        {
          type: 'code',
          language: 'css',
          content: `/* CSS Grid basics */
.grid-container {
  display: grid;

  /* Define columns */
  grid-template-columns: 200px 1fr 2fr;          /* 3 cols: fixed, flexible */
  grid-template-columns: repeat(3, 1fr);           /* 3 equal columns */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));  /* responsive */

  /* Define rows */
  grid-template-rows: 60px 1fr auto;

  /* Template areas — visual layout map */
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";

  gap: 20px;           /* gap between rows and columns */
  row-gap: 10px;
  column-gap: 20px;
}

/* Place items in areas */
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }

/* Or use line numbers */
.item {
  grid-column: 1 / 3;   /* from line 1 to line 3 (spans 2 columns) */
  grid-row: 2 / 4;      /* from line 2 to line 4 */
}

/* span keyword */
.wide-item {
  grid-column: span 2;   /* span 2 columns from wherever it is */
}`,
        },
        {
          type: 'code',
          language: 'css',
          content: `/* Real-world grid examples */

/* Classic page layout */
.page {
  display: grid;
  grid-template-areas:
    "nav"
    "hero"
    "content"
    "footer";
  grid-template-rows: 60px 400px 1fr auto;
  min-height: 100vh;
}

@media (min-width: 768px) {
  .page {
    grid-template-areas:
      "nav     nav"
      "hero    hero"
      "sidebar content"
      "footer  footer";
    grid-template-columns: 250px 1fr;
  }
}

/* Auto-responsive card grid (no media queries needed) */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

/* Image gallery */
.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 8px;
}

.gallery .featured {
  grid-column: span 2;
  grid-row: span 2;
}`,
        },
      ],
    },
    {
      slug: 'responsive',
      title: 'Responsive Design',
      intro: 'Your site will be viewed on phones, tablets, laptops, and 27" monitors. Responsive design makes it look good on all of them.',
      sections: [
        {
          type: 'code',
          language: 'css',
          content: `/* Mobile-first approach: start with mobile styles, add complexity for larger screens */

/* Base styles (mobile) */
body {
  font-size: 16px;
  padding: 16px;
}

.nav { display: none; }        /* hide nav on mobile */
.nav-mobile { display: block; } /* show mobile menu */

.grid {
  display: grid;
  grid-template-columns: 1fr;  /* single column on mobile */
  gap: 16px;
}

/* Tablet and up (768px+) */
@media (min-width: 768px) {
  body { padding: 24px; }

  .grid {
    grid-template-columns: repeat(2, 1fr);  /* 2 columns */
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  body { padding: 40px; }

  .nav { display: flex; }         /* show full nav */
  .nav-mobile { display: none; }  /* hide mobile menu */

  .grid {
    grid-template-columns: repeat(3, 1fr);  /* 3 columns */
  }
}

/* Large desktop (1440px+) */
@media (min-width: 1440px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Dark mode — respect user preference */
@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: #e0e0e0;
  }
}

/* Print styles */
@media print {
  .no-print { display: none; }
  body { color: black; background: white; }
}`,
        },
        {
          type: 'code',
          language: 'css',
          content: `/* Responsive typography */
html {
  font-size: 16px;  /* base */
}

h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);  /* min, preferred, max */
}

/* Fluid spacing */
.section {
  padding: clamp(20px, 5vw, 60px);
}

/* Fluid images */
img {
  max-width: 100%;   /* never overflow container */
  height: auto;      /* maintain aspect ratio
}

/* Fluid container */
.container {
  width: min(90%, 1200px);  /* min of 90vw or 1200px */
  margin: 0 auto;
}

/* Responsive video embed */
.video-wrapper {
  position: relative;
  padding-bottom: 56.25%;  /* 16:9 aspect ratio */
  height: 0;
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}`,
        },
      ],
    },
    {
      slug: 'animations',
      title: 'Animations & Transitions',
      intro: 'CSS can animate almost any property. Done well, animations guide attention and provide feedback. Done poorly, they make users want to leave your site.',
      sections: [
        {
          type: 'code',
          language: 'css',
          content: `/* Transitions — animate between two states */
.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  /* transition: property duration timing-function delay */
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);  /* lift up slightly */
}

.button:active {
  transform: translateY(0);     /* push back down */
}

/* Transition multiple properties */
.card {
  transition: all 0.3s ease;   /* 'all' — convenient but use sparingly */
}

.card:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}`,
        },
        {
          type: 'code',
          language: 'css',
          content: `/* Keyframe animations — for complex, multi-step animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.05); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Apply animations */
.fade-in {
  animation: fadeIn 0.5s ease;
}

.slide-up {
  animation: slideUp 0.6s ease backwards;  /* backwards: apply from-state before start */
}

/* Staggered animations */
.list-item:nth-child(1) { animation: slideUp 0.4s 0.0s ease backwards; }
.list-item:nth-child(2) { animation: slideUp 0.4s 0.1s ease backwards; }
.list-item:nth-child(3) { animation: slideUp 0.4s 0.2s ease backwards; }

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #ddd;
  border-top-color: #007bff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Respect user preference for reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`,
        },
        {
          type: 'warning',
          content: 'Always include a prefers-reduced-motion media query. Some users have vestibular disorders that make motion literally nauseating. It\'s two lines of CSS and it\'s the right thing to do.',
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: Card Component',
      intro: 'Build a polished, responsive card component — the bread and butter of modern web UI.',
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Card Component</title>
  <link rel="stylesheet" href="card.css">
</head>
<body>
  <main class="page">
    <h1>Course Cards</h1>
    <div class="card-grid">

      <article class="card">
        <div class="card-image">
          <span class="card-badge">Beginner</span>
          <div class="card-icon" style="--color: #FFD43B">Py</div>
        </div>
        <div class="card-body">
          <h2 class="card-title">Python</h2>
          <p class="card-desc">Life is short, use Python. Batteries included, opinions optional.</p>
          <div class="card-meta">
            <span>8 lessons</span>
            <span>·</span>
            <span>3 hrs</span>
          </div>
        </div>
        <div class="card-footer">
          <div class="progress-bar">
            <div class="progress-fill" style="--width: 62%"></div>
          </div>
          <span class="progress-label">5/8 complete</span>
          <a href="#" class="card-cta">Continue →</a>
        </div>
      </article>

      <article class="card">
        <div class="card-image">
          <span class="card-badge card-badge--hard">Advanced</span>
          <div class="card-icon" style="--color: #CE4A00">Rs</div>
        </div>
        <div class="card-body">
          <h2 class="card-title">Rust</h2>
          <p class="card-desc">Memory safe, blazingly fast. The borrow checker is your friend.</p>
          <div class="card-meta">
            <span>8 lessons</span>
            <span>·</span>
            <span>6 hrs</span>
          </div>
        </div>
        <div class="card-footer">
          <div class="progress-bar">
            <div class="progress-fill" style="--width: 0%"></div>
          </div>
          <span class="progress-label">0/8 complete</span>
          <a href="#" class="card-cta">Start →</a>
        </div>
      </article>

    </div>
  </main>
</body>
</html>`,
        },
        {
          type: 'code',
          language: 'css',
          content: `/* card.css */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: system-ui, sans-serif;
  background: #f0f2f8;
  color: #111;
  min-height: 100vh;
}

.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page h1 {
  margin-bottom: 32px;
  font-size: 2rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.12);
}

.card-image {
  background: #1a1a24;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.card-icon {
  font-family: monospace;
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--color);
  letter-spacing: -2px;
}

.card-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255,255,255,0.15);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 3px 8px;
  border-radius: 999px;
}

.card-badge--hard { background: rgba(206,74,0,0.5); }

.card-body {
  padding: 20px;
  flex: 1;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.card-desc {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 12px;
}

.card-meta {
  display: flex;
  gap: 8px;
  color: #888;
  font-size: 0.8rem;
}

.card-footer {
  padding: 16px 20px;
  border-top: 1px solid #f0f0f0;
}

.progress-bar {
  height: 4px;
  background: #eee;
  border-radius: 2px;
  margin-bottom: 8px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: var(--width);
  background: linear-gradient(90deg, #00cc6a, #00d4ff);
  border-radius: 2px;
}

.progress-label {
  font-size: 0.75rem;
  color: #888;
  display: block;
  margin-bottom: 12px;
}

.card-cta {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #007bff;
  text-decoration: none;
}
.card-cta:hover { text-decoration: underline; }`,
        },
        {
          type: 'note',
          content: 'This card uses CSS custom properties (--color, --width) to pass data from HTML to CSS. This is a powerful pattern for dynamic styling without JavaScript.',
        },
      ],
    },
  ],
}
