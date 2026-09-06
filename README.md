# ScholastiCoder

**The open-source coding scriptorium.** Free, interactive lessons across 32 languages and computer-science paths, with an emphasis on Python. Live at **https://aquinas22.github.io/scholasticoder/**.

## What is inside

- **Run code in the browser.** Every Python code block has a Run button, backed by a real CPython interpreter ([Pyodide](https://pyodide.org)) running in a Web Worker. JavaScript blocks run in an isolated worker, SQL blocks run on SQLite ([sql.js](https://sql.js.org)) against a seeded sample database, and HTML and CSS blocks get a live sandboxed preview.
- **Graded exercises.** Python, JavaScript and SQL lessons end with exercises that are checked automatically, with progressive hints and a reference solution. Quick-check quizzes reinforce the ideas.
- **The Dojo** (`/dojo`): a Python and JavaScript playground with example programs, program input for `input()`, a virtual file system, on-demand scientific packages, and shareable links.
- **The challenge ladder** (`/challenges`): 34 problems from FizzBuzz to Dijkstra and a Markdown parser, in four tiers.
- **Progress** (`/progress`) is stored in the browser (localStorage). No accounts, no tracking. A **glossary** (`/glossary`) links every term to the path that teaches it.
- **Themes.** Scriptorium, Vellum, Illuminated and Vespers palettes in the monastic spirit, plus editor classics: Gruvbox, Tokyo Night, Catppuccin, Nord, Dracula, Solarized, One Dark, Rosé Pine, Monokai, GitHub. Defined in `src/lib/themes.ts`; every palette recolours the code editors too.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000/scholasticoder/
npm run lint
npm run build      # static export to ./out
```

The site is a static Next.js export deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Content layout

| Path | Purpose |
| --- | --- |
| `src/content/languages/*.ts` | One file per learning path: setup, lessons, sections |
| `src/content/python-practice.ts`, `js-practice.ts`, `sql-practice.ts` | Exercises and quizzes merged into the Python, JavaScript and SQL lessons |
| `src/content/languages/python-extra.ts` | Additional Python lessons (strings, regex, JSON, collections, recursion, debugging) |
| `src/content/challenges.ts` | The challenge ladder |
| `src/content/glossary.ts` | Glossary entries |
| `src/lib/sql-seed.ts` | The sample database every SQL block queries |
| `src/lib/themes.ts` | Colour palettes |
| `src/content/cheatsheets.ts`, `field-guides.ts` | Per-path reference material |
| `public/workers/python-worker.js` | The Pyodide worker that runs learner code |

### Writing an exercise

```ts
{
  type: 'exercise',
  content: 'Prompt shown to the learner.',
  exercise: {
    title: 'Short name',
    starter: 'def solve():\n    ...\n',
    solution: 'def solve():\n    return 42\n',
    hints: ['First nudge', 'Second nudge'],
    tests: [
      // `check` is Python executed in the learner's namespace after their program.
      // `_out` holds everything they printed; `_src` holds their source.
      { name: 'Returns 42', check: 'assert solve() == 42' },
    ],
  },
}
```

JavaScript checks use `assert`, `assert.equal` and `assert.deepEqual` in the learner's scope. SQL checks are queries that must return a truthy value; the learner's last result set is available as the temp table `_result`.

Code sections default to runnable when their language is Python, JavaScript, SQL, HTML or CSS; set `runnable: false` on blocks that need a real machine (sockets, GUIs, subprocesses, PostgreSQL-only syntax).
