# ScholastiCoder

**The open-source coding scriptorium.** Free, interactive lessons across 32 languages and computer-science paths, with an emphasis on Python. Live at **https://aquinas22.github.io/scholasticoder/**.

## What is inside

- **The scholastic method.** Every lesson is arranged as Lectio (the reading), Disputatio (a disputed question in the form of the Summa: objections the learner judges before the reply is revealed, a *sed contra*, and the *respondeo*), Exercitatio (graded practice) and Examen (quick checks). 61 disputed questions across 22 paths, indexed at `/questions`. See `/method`.
- **Clickable key words.** Terms in lesson prose link to the glossary: click one for a definition, an example and the path that teaches it (`src/lib/terms.ts`, `src/components/Term.tsx`).

- **Run code in the browser.** Every Python code block has a Run button, backed by a real CPython interpreter ([Pyodide](https://pyodide.org)) running in a Web Worker. JavaScript blocks run in an isolated worker, TypeScript is compiled with the real compiler (types erased) then run the same way, SQL blocks run on SQLite ([sql.js](https://sql.js.org)) against a seeded sample database, and HTML and CSS blocks get a live sandboxed preview.
- **Graded exercises.** Python, JavaScript, TypeScript and SQL lessons end with exercises that are checked automatically, with progressive hints and a reference solution. The Terminal and Bash paths have exercises in a **simulated shell** (`src/lib/shell-sim.ts`) with a virtual file system, pipes, redirection, globs and tab completion. Quick-check quizzes reinforce the ideas and count toward progress.
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
| `src/content/python-practice.ts`, `js-practice.ts`, `ts-practice.ts`, `sql-practice.ts`, `shell-practice.ts` | Exercises and quizzes merged into the Python, JavaScript, TypeScript, SQL, Terminal and Bash lessons |
| `src/content/languages/python-extra.ts` | Additional Python lessons (strings, regex, JSON, collections, recursion, debugging) |
| `src/content/challenges.ts` | The challenge ladder |
| `src/content/glossary.ts` | Glossary entries, with examples and the words that link to them in prose |
| `src/content/quaestiones*.ts` | Disputed questions merged into lessons (Python, web, tools, systems) |
| `src/lib/sql-seed.ts` | The sample database every SQL block queries |
| `src/lib/shell-sim.ts` | The simulated bash shell used by shell exercises and the Dojo |
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

Shell exercises use `type: 'shell'` with check functions that receive the simulator state. Code sections default to runnable when their language is Python, JavaScript, TypeScript, SQL, HTML or CSS; set `runnable: false` on blocks that need a real machine (sockets, GUIs, subprocesses, PostgreSQL-only syntax).
