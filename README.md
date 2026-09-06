# ScholastiCoder

**The open-source coding scriptorium.** Free, interactive lessons across 32 languages and computer-science paths, with an emphasis on Python. Live at **https://aquinas22.github.io/scholasticoder/**.

## What is inside

- **Run code in the browser.** Every Python code block has a Run button, backed by a real CPython interpreter ([Pyodide](https://pyodide.org)) running in a Web Worker. JavaScript blocks run in an isolated worker; HTML and CSS blocks get a live sandboxed preview.
- **Graded exercises.** The core Python lessons end with exercises that are checked automatically, with progressive hints and a reference solution. Quick-check quizzes reinforce the ideas.
- **The Dojo** (`/dojo`): a blank Python playground with example programs, program input for `input()`, a virtual file system, and on-demand scientific packages (numpy, pandas, …).
- **The challenge ladder** (`/challenges`): 26 problems from FizzBuzz to a recursive-descent calculator, in three tiers.
- **Progress** is stored in the browser (localStorage). No accounts, no tracking.

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
| `src/content/python-practice.ts` | Exercises and quizzes merged into the Python lessons |
| `src/content/challenges.ts` | The challenge ladder |
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

Code sections default to runnable when their language is Python, JavaScript, HTML or CSS; set `runnable: false` on blocks that need a real machine (sockets, GUIs, subprocesses).
