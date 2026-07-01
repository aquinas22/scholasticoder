import { Language } from '../types'

export const html: Language = {
  slug: 'html',
  name: 'HTML',
  tagline: 'It\'s not a programming language and we don\'t want to hear about it.',
  description: 'HTML (HyperText Markup Language) is the structure of every web page. It\'s not a programming language — it\'s a markup language. But it\'s the foundation of the web, and you cannot build anything for a browser without understanding it.',
  accentColor: '#E34F26',
  textOnAccent: '#fff',
  icon: 'HTML',
  difficulty: 'beginner',
  usedFor: ['Web Pages', 'Email Templates', 'Web Apps (with CSS/JS)', 'Documentation'],
  notableUsers: ['Every single website on the internet'],
  setup: {
    description: 'HTML requires only a text editor and a web browser. You already have both. Open a .html file in your browser to see it rendered.',
    windows: `# You need: a text editor and a browser
# Text editor options:
#   VS Code (recommended): code.visualstudio.com
#   Notepad (built-in — not recommended)

# Create hello.html in VS Code
# Open it in Chrome/Firefox/Edge
# Done — no compilation needed

# Optional: Live Server VS Code extension
# (auto-refreshes the browser when you save)`,
    mac: `# Text editor:
brew install --cask visual-studio-code

# Or TextEdit (built-in) — but save as plain text, not rich text

# Open .html files in browser:
open index.html         # opens in default browser
open -a "Google Chrome" index.html

# Optional: VS Code Live Server extension`,
    linux: `# Install VS Code:
# Download from code.visualstudio.com
# Or: sudo snap install code --classic

# Open files in browser:
xdg-open index.html    # opens in default browser
google-chrome index.html

# Optional: VS Code Live Server extension`,
  },
  lessons: [
    {
      slug: 'first-page',
      title: 'Your First Web Page',
      intro: 'HTML is what web browsers read. Create a .html file, open it in a browser, and you\'ve made a web page. No server required.',
      sections: [
        {
          type: 'text',
          content: 'An HTML document has a specific structure. The DOCTYPE declaration tells browsers this is HTML5. The html element is the root. head contains metadata (not shown on page). body contains the visible content.',
        },
        {
          type: 'code',
          language: 'html',
          content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is my first web page.</p>
  </body>
</html>`,
        },
        {
          type: 'text',
          content: 'HTML uses tags to mark up content. Tags come in pairs: an opening tag <p> and a closing tag </p>. The content goes between them. Some tags are self-closing (like <br> and <img>). Every tag has a meaning — use the right tag for the right content.',
        },
        {
          type: 'code',
          language: 'html',
          content: `<!-- This is an HTML comment — browsers ignore it -->

<!-- Headings h1-h6 (h1 is most important, h6 least) -->
<h1>Main Heading</h1>
<h2>Section Heading</h2>
<h3>Subsection</h3>

<!-- Paragraph -->
<p>This is a paragraph. HTML ignores extra
   whitespace in source code.</p>

<!-- Line break (self-closing) -->
<p>First line<br>Second line</p>

<!-- Horizontal rule -->
<hr>

<!-- Bold and italic -->
<p>This is <strong>important</strong> and this is <em>emphasized</em>.</p>

<!-- Code inline -->
<p>Run the <code>git status</code> command.</p>

<!-- Preformatted text (preserves whitespace) -->
<pre>
    This    preserves
    spaces and newlines.
</pre>`,
        },
        {
          type: 'note',
          content: 'Use semantic tags: <strong> means "important" (usually bold), <em> means "emphasized" (usually italic). Don\'t use <b> and <i> — they only describe appearance, not meaning. Meaning-based markup is better for accessibility and SEO.',
        },
      ],
    },
    {
      slug: 'text-headings',
      title: 'Text & Headings',
      intro: 'HTML has a rich set of text elements. Not because web developers love complexity, but because text comes in many flavors.',
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Text Elements</title>
</head>
<body>

  <!-- Heading hierarchy (use only one h1 per page) -->
  <h1>Page Title</h1>
  <h2>Main Section</h2>
  <h3>Subsection</h3>
  <h4>Sub-subsection</h4>

  <!-- Semantic text elements -->
  <p>
    The <strong>borrow checker</strong> is <em>central</em> to Rust's safety model.
    The function was <del>removed</del> <ins>deprecated</ins> in version 2.0.
    The formula is E = mc<sup>2</sup>.
    Water is H<sub>2</sub>O.
    Press <kbd>Ctrl+S</kbd> to save.
    The result was <samp>Error 404</samp>.
    The variable <var>x</var> represents the input.
  </p>

  <!-- Quotes -->
  <blockquote cite="https://example.com">
    <p>The best code is no code at all.</p>
    <footer>— Jeff Atwood, <cite>Coding Horror</cite></footer>
  </blockquote>

  <p>Einstein said <q>Imagination is more important than knowledge.</q></p>

  <!-- Abbreviations with tooltip -->
  <p>The <abbr title="HyperText Markup Language">HTML</abbr> specification is maintained by the W3C.</p>

  <!-- Address -->
  <address>
    Written by <a href="mailto:alice@example.com">Alice</a>
  </address>

  <!-- Time -->
  <p>Published: <time datetime="2024-01-15">January 15, 2024</time></p>

</body>
</html>`,
        },
        {
          type: 'note',
          content: 'Only ever have one <h1> per page — it\'s the main heading. Use h2-h6 for hierarchy. Screen readers and search engines use this structure to understand your content.',
        },
      ],
    },
    {
      slug: 'links-images',
      title: 'Links & Images',
      intro: 'The "HyperText" in HTML is all about links. And images because the web would be unbearable without them.',
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<!-- Links — <a> is "anchor" -->
<!-- Absolute URL -->
<a href="https://example.com">Visit Example.com</a>

<!-- Relative URL — links within your site -->
<a href="about.html">About page</a>
<a href="../index.html">Go up one directory</a>
<a href="#section2">Jump to section 2 on this page</a>

<!-- Open in new tab (with security attributes) -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External link
</a>

<!-- Email link -->
<a href="mailto:alice@example.com">Email Alice</a>

<!-- Phone link (useful on mobile) -->
<a href="tel:+15551234567">Call us</a>

<!-- Images -->
<!-- src: image path; alt: description for screen readers and broken images -->
<img src="cat.jpg" alt="A tabby cat sitting on a keyboard">

<!-- Image with dimensions (helps browser lay out page before image loads) -->
<img src="logo.png" alt="Company Logo" width="200" height="100">

<!-- Image from URL -->
<img src="https://via.placeholder.com/300x200" alt="Placeholder image">

<!-- Responsive image (described in srcset) -->
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  alt="A responsive photo"
>

<!-- Image as a link -->
<a href="https://example.com">
  <img src="logo.png" alt="Go to homepage">
</a>`,
        },
        {
          type: 'warning',
          content: 'Always include the alt attribute on images. An empty alt="" is fine for decorative images. A missing alt attribute is a failing mark on accessibility audits. Screen readers need alt text to describe images to blind users.',
        },
      ],
    },
    {
      slug: 'lists-tables',
      title: 'Lists & Tables',
      intro: 'Use lists when you have items. Use tables for tabular data. Do not use tables for layout — that was the 1990s. We don\'t talk about the 1990s.',
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<!-- Unordered list (bullet points) -->
<ul>
  <li>Apples</li>
  <li>Bananas</li>
  <li>Cherries</li>
</ul>

<!-- Ordered list (numbered) -->
<ol>
  <li>Preheat oven to 350°F</li>
  <li>Mix ingredients</li>
  <li>Bake for 30 minutes</li>
</ol>

<!-- Nested lists -->
<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>Backend
    <ul>
      <li>Python</li>
      <li>Go</li>
      <li>Rust</li>
    </ul>
  </li>
</ul>

<!-- Description list — term and definition pairs -->
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language — the structure of web pages</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets — the appearance of web pages</dd>
</dl>`,
        },
        {
          type: 'code',
          language: 'html',
          content: `<!-- Table — for tabular data only -->
<table>
  <caption>Programming Language Popularity</caption>

  <!-- Table head -->
  <thead>
    <tr>
      <th scope="col">Language</th>
      <th scope="col">Year Created</th>
      <th scope="col">Paradigm</th>
    </tr>
  </thead>

  <!-- Table body -->
  <tbody>
    <tr>
      <td>Python</td>
      <td>1991</td>
      <td>Multi-paradigm</td>
    </tr>
    <tr>
      <td>JavaScript</td>
      <td>1995</td>
      <td>Multi-paradigm</td>
    </tr>
    <tr>
      <td>Rust</td>
      <td>2010</td>
      <td>Systems</td>
    </tr>
  </tbody>

  <!-- Table foot (optional — good for totals/summaries) -->
  <tfoot>
    <tr>
      <td colspan="3">Source: Various</td>
    </tr>
  </tfoot>
</table>`,
        },
        {
          type: 'note',
          content: 'The scope="col" attribute on <th> elements helps screen readers understand which column or row a header relates to. Always use it in tables with both row and column headers.',
        },
      ],
    },
    {
      slug: 'forms',
      title: 'Forms',
      intro: 'Forms are how users give you data. Every login page, every search box, every contact form is made with these elements.',
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<form action="/submit" method="POST">

  <!-- Text input -->
  <label for="name">Full Name:</label>
  <input type="text" id="name" name="name" placeholder="Alice Smith" required>

  <!-- Email -->
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>

  <!-- Password -->
  <label for="password">Password:</label>
  <input type="password" id="password" name="password" minlength="8">

  <!-- Number -->
  <label for="age">Age:</label>
  <input type="number" id="age" name="age" min="0" max="150">

  <!-- Date -->
  <label for="birthday">Birthday:</label>
  <input type="date" id="birthday" name="birthday">

  <!-- Select dropdown -->
  <label for="language">Favorite Language:</label>
  <select id="language" name="language">
    <option value="">-- Choose one --</option>
    <option value="python">Python</option>
    <option value="js">JavaScript</option>
    <option value="rust">Rust</option>
  </select>

  <!-- Textarea -->
  <label for="bio">About you:</label>
  <textarea id="bio" name="bio" rows="4" cols="50"></textarea>

  <!-- Checkboxes -->
  <fieldset>
    <legend>Interests:</legend>
    <input type="checkbox" id="web" name="interest" value="web">
    <label for="web">Web Development</label>
    <input type="checkbox" id="data" name="interest" value="data">
    <label for="data">Data Science</label>
  </fieldset>

  <!-- Radio buttons -->
  <fieldset>
    <legend>Experience:</legend>
    <input type="radio" id="beginner" name="level" value="beginner">
    <label for="beginner">Beginner</label>
    <input type="radio" id="intermediate" name="level" value="intermediate">
    <label for="intermediate">Intermediate</label>
  </fieldset>

  <!-- Submit button -->
  <button type="submit">Submit</button>
  <button type="reset">Clear</button>
</form>`,
        },
        {
          type: 'warning',
          content: 'Always associate labels with inputs using for and id attributes. Without this, screen readers can\'t tell users what an input is for, and clicking a label won\'t focus the input. This is basic accessibility.',
        },
      ],
    },
    {
      slug: 'semantic-html',
      title: 'Semantic HTML',
      intro: 'Semantic HTML means using the right element for the right job. Not just div and span everywhere. Browsers, search engines, and assistive technologies all understand semantic HTML.',
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Semantic HTML Example</title>
</head>
<body>

  <!-- Site header with navigation -->
  <header>
    <h1>My Blog</h1>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- Main content area -->
  <main>

    <!-- A self-contained article (could be shared independently) -->
    <article>
      <header>
        <h2>Learning Rust in 2024</h2>
        <p>By <address><a href="/author/alice">Alice</a></address>
           on <time datetime="2024-01-15">January 15, 2024</time></p>
      </header>

      <p>Rust's ownership model is unlike anything in most languages...</p>

      <!-- A section within the article -->
      <section>
        <h3>The Borrow Checker</h3>
        <p>At first, the borrow checker feels like an obstacle...</p>
      </section>

      <footer>
        <p>Tags: <a href="/tags/rust">Rust</a>, <a href="/tags/systems">Systems</a></p>
      </footer>
    </article>

  </main>

  <!-- Sidebar content related to, but not part of, main content -->
  <aside>
    <h2>Related Posts</h2>
    <ul>
      <li><a href="/post/2">Learning Go</a></li>
      <li><a href="/post/3">C vs C++</a></li>
    </ul>
  </aside>

  <!-- Site footer -->
  <footer>
    <p>&copy; 2024 My Blog. All rights reserved.</p>
  </footer>

</body>
</html>`,
        },
        {
          type: 'note',
          content: 'Use <main> once per page for primary content. Use <article> for self-contained content that could be republished. Use <section> for thematic groupings within a page or article. Use <aside> for tangentially related content. Avoid <div> when a semantic element fits.',
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: Personal Page',
      intro: 'Build a complete personal homepage using semantic HTML. No CSS yet — pure structure. You\'ll add styles later.',
      sections: [
        {
          type: 'code',
          language: 'html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Personal page for Alice Smith, software developer">
  <title>Alice Smith — Developer</title>
</head>
<body>

  <header>
    <h1>Alice Smith</h1>
    <p>Software Developer · Open Source Enthusiast · Coffee Drinker</p>
    <nav aria-label="Page sections">
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>

    <section id="about">
      <h2>About Me</h2>
      <img src="avatar.jpg" alt="Alice Smith smiling" width="200" height="200">
      <p>
        I'm a software developer with 5 years of experience building web applications.
        I specialize in Python backends and React frontends, and I contribute to
        open-source projects in my free time.
      </p>
    </section>

    <section id="skills">
      <h2>Skills</h2>
      <h3>Languages</h3>
      <ul>
        <li>Python</li>
        <li>JavaScript / TypeScript</li>
        <li>Go</li>
        <li>SQL</li>
      </ul>
      <h3>Tools</h3>
      <ul>
        <li>Git, Docker, Kubernetes</li>
        <li>PostgreSQL, Redis</li>
        <li>AWS, GCP</li>
      </ul>
    </section>

    <section id="projects">
      <h2>Projects</h2>
      <article>
        <h3><a href="https://github.com/alice/taskr">Taskr</a></h3>
        <p>A command-line task manager built in Python.
           <strong>500+ GitHub stars.</strong></p>
      </article>
      <article>
        <h3><a href="https://github.com/alice/goqueue">GoQueue</a></h3>
        <p>A high-performance message queue implementation in Go.</p>
      </article>
    </section>

    <section id="contact">
      <h2>Get In Touch</h2>
      <form action="/contact" method="POST">
        <label for="sender-name">Your Name:</label>
        <input type="text" id="sender-name" name="name" required>

        <label for="sender-email">Your Email:</label>
        <input type="email" id="sender-email" name="email" required>

        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="5" required></textarea>

        <button type="submit">Send Message</button>
      </form>

      <ul>
        <li><a href="https://github.com/alice">GitHub</a></li>
        <li><a href="https://linkedin.com/in/alice">LinkedIn</a></li>
        <li><a href="mailto:alice@example.com">alice@example.com</a></li>
      </ul>
    </section>

  </main>

  <footer>
    <p>© 2024 Alice Smith · Built with pure HTML (and some grit)</p>
  </footer>

</body>
</html>`,
        },
        {
          type: 'note',
          content: 'Notice the semantic structure: header, main with sections, articles within sections, footer. Every section has an id for anchor linking. Every image has alt text. Every form input has a label. This is good, accessible, semantic HTML.',
        },
      ],
    },
  ],
}
