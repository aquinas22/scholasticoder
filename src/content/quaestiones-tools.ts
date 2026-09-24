import type { Quaestio } from './types'

/**
 * Common questions for Git, the shell, HTML, CSS, React, Vue and Node, one per lesson:
 * misconceptions with replies, a source note, and the answer.
 */
export const quaestionesTools: Record<string, Record<string, Quaestio>> = {
  git: {
    'what-git-solves': {
      question: 'Do I need version control if I work alone?',
      objections: [
        { claim: 'Git exists to coordinate teams, so someone working alone has nothing to coordinate.', reply: 'Coordination is one use. The others apply to one person: a history you can read, the ability to go back to any earlier state, and the freedom to try a risky change knowing one command undoes it. Most of a solo programmer\'s Git use is coordinating with their past self.' },
        { claim: 'Copying the folder to project-final-v2-real is version control enough.', reply: 'Copies record the states but not the reasons, cannot show what changed between two copies, and give you no way to combine work done in two of them. Git records each change with a message, shows differences on demand, and merges separate lines of work.', code: 'git log --oneline\ngit diff HEAD~3 -- src/main.py\ngit show a1b2c3d', language: 'bash' },
        { claim: 'A commit stores the differences from the previous commit.', reply: 'A commit stores a complete snapshot of the files, identified by a hash, along with a link to its parent. Diffs are calculated when you ask for them. That is why checking out an old commit is fast and exact rather than a replay of patches.' },
      ],
      sedContra: 'Linus Torvalds wrote the first version of Git in about ten days in 2005, after the Linux kernel lost access to its previous version control tool.',
      respondeo: [
        'Version control is a record of every state a project has been in, with a note on why each change was made. Git keeps that record on your machine as a chain of snapshots identified by content hashes, so nothing depends on a server and nothing can change behind your back. From that record you get the practical powers: look through history, compare any two points, go back to a version that worked, and work on several ideas at once without them getting in each other\'s way.',
        'The habits worth starting on day one are small: commit when something works, write a message that says why rather than what, and make a branch before trying anything you are unsure about. They cost seconds and let you experiment without fear.',
      ],
    },
    'branches': {
      question: 'Is a branch a copy of the project?',
      objections: [
        { claim: 'Switching branches must copy the files, since the working directory changes.', reply: 'A branch is a movable pointer to one commit, and the commits themselves are shared. Switching updates the working directory to match a different commit, but nothing is duplicated. That is why creating a branch is instant even in a huge repository.', code: 'git switch -c experiment    # a new pointer, not a copy\ncat .git/refs/heads/experiment   # just a hash', language: 'bash' },
        { claim: 'Branches are for big features, so small fixes should go straight to main.', reply: 'A branch costs one command, so the size of the change is not what matters. What matters is whether main should keep working while you experiment. For most changes it should.' },
        { claim: 'Merging rewrites history, so the branch\'s commits disappear.', reply: 'A merge creates a new commit with two parents; both lines of history stay and show up in the log. Rebasing is a different operation: it replays commits onto a new base and does change their identity, which is why you should not rebase commits other people have already pulled.' },
      ],
      sedContra: 'The Git documentation calls a branch "a lightweight movable pointer to a commit".',
      respondeo: [
        'Git stores commits as a graph that never changes. A branch is a name pointing at one commit, and it moves forward as you commit. Because the graph is shared, ten branches cost almost nothing, and switching between them only changes which snapshot your working directory shows.',
        'Work like this: make a branch for each piece of work, commit freely on it, then merge it into main when it is done and tested. Delete the branch afterwards; its commits live on in main. Keep main in a state you could deploy at any moment, and keep everything unfinished on branches.',
      ],
    },
    'undoing-things': {
      question: 'Can I undo a mistake after committing it?',
      objections: [
        { claim: 'Once committed, a change is permanent, and only another commit can fix it.', reply: 'Almost everything can be undone. git revert makes a new commit that reverses an old one, git reset moves the branch pointer, git restore brings back a file, and git reflog remembers where every branch has been for weeks, even after a reset you thought wiped out your work.', code: 'git reflog                 # every position HEAD has held\ngit reset --hard HEAD@{2}  # go back to one of them', language: 'bash' },
        { claim: 'git reset --hard is the general-purpose undo.', reply: 'It throws away uncommitted work for good, which is the one thing Git cannot recover. Prefer revert for commits you have shared and restore for single files; save --hard for when you really do want the working directory thrown away.' },
        { claim: 'A file that was deleted and committed is gone.', reply: 'It still exists in every commit before the deletion. git checkout <commit> -- path brings it back, and git log -- path shows its whole history.' },
      ],
      sedContra: 'The Git documentation describes the reflog as a record of "when the tips of branches and other references were updated in the local repository", which is what lets you find work you thought was lost.',
      respondeo: [
        'Git\'s undo tools differ in what they touch. restore brings back files in the working directory; reset moves the branch pointer, and can take the staging area and working files with it; revert records a new commit that reverses an old one; and the reflog remembers every position each branch has been at, so even a bad reset can be walked back.',
        'The rule that keeps you safe: anything committed can be recovered; anything never committed cannot. Commit early, commit often, and prefer revert over rewriting history once your work has been shared.',
      ],
    },
  },
  terminal: {
    'terminal-vs-shell': {
      question: 'Is the terminal the same thing as the shell?',
      objections: [
        { claim: 'The black window with the prompt is the shell, so the two words name one program.', reply: 'The window is a terminal emulator: it draws characters and turns keystrokes into bytes. The shell is a separate program running inside it that reads those bytes, treats them as commands, and starts other programs. You can run the same shell in different terminals, and a different shell in the same terminal.' },
        { claim: 'Since the shell prints the output, it must be doing the work of every command.', reply: 'The shell finds and launches the program; the program does the work and writes to standard output, which the terminal displays. The shell\'s own job is parsing, expansion, redirection and job control.', code: 'type ls        # ls is /usr/bin/ls — a separate program\ntype cd        # cd is a shell builtin — the shell must do this one itself', language: 'bash' },
        { claim: 'The terminal understands commands like ls and cd.', reply: 'It understands only bytes and escape sequences. Every command you type means nothing to it; the shell is what gives it meaning.' },
      ],
      sedContra: 'Over ssh, the shell runs on a remote machine while your local terminal just displays it. The two are separate programs that happen to be connected.',
      respondeo: [
        'Three programs are involved when you run a command. The terminal emulator draws the screen and handles the keyboard. The shell reads your line, expands it, finds the program and runs it. The program does the actual work, reading standard input and writing standard output and standard error, which flow back through the terminal to your screen.',
        'Knowing this split clears up a lot of confusion: why colours are escape sequences the terminal interprets, why cd has to be built into the shell instead of being a separate program, why a pipeline is the shell\'s work and not the program\'s, and why the same commands behave the same over ssh.',
      ],
    },
    'stdin-stdout-pipes': {
      question: 'Are small single-purpose programs worse than one program that does everything?',
      objections: [
        { claim: 'One tool that sorts, filters and counts is more convenient than three joined by pipes.', reply: 'It is more convenient until you want a combination its author did not think of. Three tools you can combine give you every combination; one big tool gives you only the ones it was built for. The pipe is what makes combining them free.', code: 'cut -d , -f 1 cities.csv | sort | uniq -c | sort -rn | head -3', language: 'bash' },
        { claim: 'Pipes write to a temporary file between the stages.', reply: 'A pipe is an in-memory channel between two processes running at the same time. The second stage starts consuming as soon as the first produces, which is why a pipeline can process a stream larger than memory.' },
        { claim: 'Redirecting output with > also captures error messages.', reply: 'It captures standard output only. Errors go to a separate stream, file descriptor 2, and need 2> or 2>&1. That separation is what lets you save results while still seeing failures.' },
      ],
      sedContra: 'Doug McIlroy, who invented the Unix pipe: "Write programs that do one thing and do it well. Write programs to work together."',
      respondeo: [
        'Every process starts with three streams: input, output and errors. Because programs read and write these instead of naming files, the shell can connect them freely: a file into a program, one program into another, output to a file while errors go somewhere else. That one convention is what lets small tools combine into powerful pipelines.',
        'Learn the operators (|, >, >>, 2>, < and 2>&1) and the handful of filters that make up most pipelines: grep, sort, uniq, cut, head, tail and wc. Then build pipelines one stage at a time, checking the output at each step before adding the next.',
      ],
    },
  },
  html: {
    'semantic-html': {
      question: 'Does it matter which HTML tag I use if it looks the same?',
      objections: [
        { claim: 'A div with a "heading" class looks identical to an h1, so the choice is cosmetic.', reply: 'It looks identical to a sighted user with CSS on. To a screen reader, a search engine or a browser\'s reader mode, the h1 is the page title and the div is nothing. Meaning comes from the tag, not the appearance.', code: '<!-- Announced as "heading level 1"; listed in the page outline -->\n<h1>Getting Started with Python</h1>\n\n<!-- Announced as nothing at all -->\n<div class="heading">Getting Started with Python</div>', language: 'html' },
        { claim: 'A clickable div with an onclick handler is as good as a button.', reply: 'A button can be focused, activates with Enter and Space, announces itself as a button, and sits in the tab order. A div does none of that until you rebuild all of it yourself, usually badly.' },
        { claim: 'Semantic tags only matter for accessibility, which is a niche concern.', reply: 'They also drive search results, reader modes, browser autofill, and the structure your own CSS and JavaScript select against. Accessibility is the reason they are not optional, but it is not the only benefit.' },
      ],
      sedContra: 'The HTML specification defines each element by what it means, not how it looks. Appearance is CSS\'s job.',
      respondeo: [
        'HTML describes what content is: a heading, a paragraph, a list, a navigation area, a button, a form field with its label. Browsers, assistive technology and other software read that description. CSS then decides how it looks, and it can make any element look like any other, which is exactly why the underlying meaning has to be right.',
        'Pick the element that names the content: header, nav, main, article, section, aside and footer for page regions; h1 to h6 in order for structure; button for actions and a for links; a label tied to every input. Use div and span only when no meaningful element fits.',
      ],
    },
  },
  css: {
    'box-model': {
      question: 'Does setting width decide how wide an element will be?',
      objections: [
        { claim: 'width: 300px means the element takes up 300 pixels.', reply: 'With the default box-sizing: content-box, width sets the content area only; padding and border are added outside it. So 300px of width with 20px padding and a 1px border takes up 342px. Setting box-sizing: border-box makes width mean the whole visible box, which is why nearly every stylesheet sets it globally.', code: '*, *::before, *::after { box-sizing: border-box; }\n\n.card { width: 300px; padding: 20px; border: 1px solid; }\n/* content-box: 342px wide.  border-box: exactly 300px. */', language: 'css' },
        { claim: 'Margin and padding are two names for spacing and can be swapped freely.', reply: 'Padding is inside the border and shows the element\'s background; margin is outside it and is transparent. Vertical margins between siblings collapse into one; padding never collapses. The choice changes both the look and the layout maths.' },
        { claim: 'A block element with no width only takes as much space as its content.', reply: 'That is how inline elements behave. A block element fills the width available to it and stacks vertically; its height is whatever the content needs.' },
      ],
      sedContra: 'The CSS box model says every element is a box of content, padding, border and margin. All of layout builds on that.',
      respondeo: [
        'Every element is a rectangle built in layers: content, then padding, then border, then margin. Backgrounds cover the content and padding; borders sit at the edge; margins push neighbours away. Whether width means just the content or content plus padding and border depends on box-sizing, and border-box is almost always the sensible choice.',
        'Set box-sizing: border-box once at the top of your stylesheet, use padding for space inside a component and margin for space between components, and remember that neighbouring vertical margins collapse. With those three rules, layout maths stops surprising you.',
      ],
    },
    'flexbox': {
      question: 'Has flexbox replaced grid?',
      objections: [
        { claim: 'Flexbox can lay out anything, so grid is redundant.', reply: 'Flexbox lays things out in one direction: a row or a column, with items sized and spaced along it. Grid handles two directions at once, with rows and columns defined up front and items placed into cells. You can build a two-dimensional page layout from nested flex containers, but it is unpleasant.', code: '/* one dimension: a toolbar */\n.toolbar { display: flex; gap: 1rem; align-items: center; }\n\n/* two dimensions: a page */\n.page { display: grid; grid-template-columns: 240px 1fr; grid-template-rows: auto 1fr auto; }', language: 'css' },
        { claim: 'justify-content centres items vertically in a row.', reply: 'justify-content works along the main axis, which for a row is horizontal; align-items works across it. Switch flex-direction to column and the two swap. This is the single most common source of flexbox confusion.' },
        { claim: 'Floats are still needed for layout if older browsers have to be supported.', reply: 'Flexbox and grid work in every browser in current use. Floats are still useful for their original purpose, wrapping text around an image, and nothing else.' },
      ],
      sedContra: 'The CSS specifications describe Flexible Box Layout as laying out items "in a single dimension" and Grid Layout as "a two-dimensional layout system".',
      respondeo: [
        'Flexbox shares out space along one axis: it decides how items grow, shrink, align and space themselves in a row or a column. Grid divides an area into rows and columns and places items into the resulting cells, including across several of them. Most interfaces use both: grid for the page layout, flex for the components inside it.',
        'Keep the axes straight: justify-* works along the main axis, align-* across it, and flex-direction decides which is which. Use gap instead of margins for space between items, and let flex-grow and flex-basis say what you mean instead of fixed pixel widths.',
      ],
    },
  },
  react: {
    'state': {
      question: 'Can I change React state by assigning to it?',
      objections: [
        { claim: 'State is a variable, so count = count + 1 should update it.', reply: 'The value useState gives you is a snapshot for this render. Assigning to it changes a local variable and nothing else; React never finds out. Calling the setter both stores the new value and schedules a re-render.', code: "const [count, setCount] = useState(0)\n\ncount = count + 1        // nothing re-renders\nsetCount(count + 1)      // React updates and re-renders", language: 'javascript' },
        { claim: 'Pushing to a state array updates the component, because the array changed.', reply: 'React compares the old value with the new one by identity. A mutated array is the same object, so it looks like nothing changed. Create a new array, setItems([...items, item]), and the identity is different.' },
        { claim: 'After calling the setter, the variable holds the new value on the next line.', reply: 'The current render keeps its snapshot; the new value shows up in the next render. When the new value depends on the old one, pass a function, setCount(c => c + 1), so React applies it to the latest state instead of a stale snapshot.' },
      ],
      sedContra: 'The React documentation describes state as "a snapshot": setting it requests a new render with the new value and does not change the variable in the render that is already running.',
      respondeo: [
        'A component is a function that takes props and returns what should be on screen. State is memory attached to that component between calls. useState returns the value for this render and a setter; calling the setter stores a new value and asks React to render again, which runs the function fresh with the new snapshot.',
        'Three habits follow. Never mutate state; create a new value. Use the updater form when the next value depends on the current one. And keep state small: anything you can compute from existing state or props during render should be computed, not stored.',
      ],
    },
    'effects': {
      question: 'Does every piece of logic belong in useEffect?',
      objections: [
        { claim: 'An effect runs after render, so it\'s the natural place for anything that should happen when data changes.', reply: 'Most of that logic is a calculation, and calculations belong in the render itself. An effect that only derives state from props causes a second render and a moment of out-of-date UI. Effects are for syncing with things outside React: the network, the DOM, subscriptions, timers.', code: "// Unnecessary effect\nconst [full, setFull] = useState('')\nuseEffect(() => setFull(first + ' ' + last), [first, last])\n\n// Just compute it\nconst full = first + ' ' + last", language: 'javascript' },
        { claim: 'An empty dependency array means the effect never runs.', reply: 'It means the effect runs once after the first render and never again, because there are no dependencies to change. Leaving the array out means it runs after every render.' },
        { claim: 'Cleanup functions are optional tidiness.', reply: 'Without cleanup, subscriptions pile up, timers keep firing after the component is gone, and responses from old requests overwrite newer ones. The returned function runs before the effect runs again and when the component unmounts, which is exactly when those things need to stop.' },
      ],
      sedContra: 'The React documentation has a whole page called "You Might Not Need an Effect", listing common cases where an effect is the wrong tool.',
      respondeo: [
        'An effect keeps a component in sync with something outside React. Its dependency array lists the values that, when they change, mean it needs to sync again; its returned cleanup undoes the previous sync. That is the whole model, and it explains how every effect you write will behave.',
        'Before writing one, ask what outside thing you are syncing with. If the answer is "nothing, I\'m working out a value", compute it during render. If it is "responding to a click", put it in the event handler. Save effects for subscriptions, timers, manual DOM work and data fetching, and always clean them up.',
      ],
    },
  },
  nodejs: {
    'async-patterns': {
      question: 'Is Node.js slow because it only uses one thread?',
      objections: [
        { claim: 'One thread can only serve one request at a time, so Node must be slower than a threaded server.', reply: 'A request spends most of its life waiting on the database, the disk or the network. Node hands that waiting to the operating system and serves other requests in the meantime, so one thread handles thousands of connections at once. Threads help when the work is computation, not waiting.' },
        { claim: 'Since Node is non-blocking, no code can block it.', reply: 'Any synchronous work blocks the loop and every pending request with it: a tight loop, a large JSON.parse, a synchronous file read, a bcrypt round. Non-blocking applies to I/O that Node does for you, not to your own calculations.', code: "const data = fs.readFileSync('huge.json')   // blocks everything\nconst data = await fs.promises.readFile('huge.json')   // does not", language: 'javascript' },
        { claim: 'CPU-heavy work in Node means rewriting the service in another language.', reply: 'Worker threads and child processes run that work off the main loop, and the cluster module spreads connections across CPU cores. The single loop is designed for I/O; it is not a hard limit.' },
      ],
      sedContra: 'The Node.js website describes it as using "an event-driven, non-blocking I/O model that makes it lightweight and efficient".',
      respondeo: [
        'Node runs your JavaScript on one thread with an event loop, while the platform underneath does I/O asynchronously on a pool of threads you never see. When an operation finishes, its callback is queued and the loop runs it. This suits servers, whose work is mostly waiting on other machines.',
        'The practical rule is to keep the loop free: use the promise-based APIs, never call the Sync versions while handling a request, break long computations into chunks or move them to a worker, and measure event loop delay when response times go up. In Node, one blocking line is enough to lose your concurrency.',
      ],
    },
  },
  vue: {
    'reactivity': {
      question: 'Does Vue re-render the whole component when data changes?',
      objections: [
        { claim: 'The component function has to run again, like in React, so everything gets rebuilt.', reply: 'Vue tracks which reactive values each part of the render depends on. When a value changes, only the effects that read it run again, and the compiler marks static parts so they are never re-checked. The component setup runs once.' },
        { claim: 'ref and reactive are interchangeable ways to make data reactive.', reply: 'ref wraps any value, including primitives, and is read through .value in script. reactive takes an object and returns a proxy, but loses reactivity if you destructure it. The usual advice is to use ref by default.', code: "const count = ref(0)\ncount.value++            // .value in script, plain in template\n\nconst state = reactive({ n: 0 })\nconst { n } = state      // n is no longer reactive", language: 'javascript' },
        { claim: 'A computed property is the same as a method that returns the value.', reply: 'A computed caches its result and recalculates only when its dependencies change; a method runs on every render. For anything expensive, or used in several places, that difference matters.' },
      ],
      sedContra: 'Vue\'s documentation describes its core as "a reactivity system that tracks dependencies at a fine granularity".',
      respondeo: [
        'Vue makes data reactive by intercepting reads and writes. While rendering, it records which values were read; when one of them changes, exactly the effects that depended on it run again. That is why updates are precise and why you rarely have to think about optimisation in Vue.',
        'Declare state with ref, derive values with computed, react to changes with watch or watchEffect when you really need a side effect, and avoid destructuring reactive objects. Keep templates declarative and let Vue\'s tracking decide what to update.',
      ],
    },
  },
}
