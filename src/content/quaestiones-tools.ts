import type { Quaestio } from './types'

/** Disputed questions for Git, the shell, HTML, CSS, React, Vue and Node. */
export const quaestionesTools: Record<string, Record<string, Quaestio>> = {
  git: {
    'what-git-solves': {
      question: 'Whether version control is needed by a programmer working alone?',
      objections: [
        { claim: 'Git exists to coordinate teams, so a solitary programmer has nothing to coordinate.', reply: 'Coordination is one use. The others apply to one person: a history you can read, the ability to return to any earlier state, and the freedom to try a risky change knowing it can be undone in one command. Most of a lone programmer\'s Git use is with their past selves.' },
        { claim: 'copying the folder to project-final-v2-real is version control enough.', reply: 'It records the states but not the reasons, cannot show what changed between two copies, and gives no way to combine work done in two copies. Git records each change with a message, computes differences on demand, and merges divergent lines.', code: 'git log --oneline\ngit diff HEAD~3 -- src/main.py\ngit show a1b2c3d', language: 'bash' },
        { claim: 'a commit stores the differences from the previous commit.', reply: 'A commit stores a complete snapshot of the tree, addressed by a hash, together with its parent. Diffs are computed when you ask for them. This is why checking out an old commit is fast and exact rather than a replay of patches.' },
      ],
      sedContra: 'Linus Torvalds wrote Git in ten days because the alternative — losing the ability to answer "what changed, when, and why" — was intolerable even for code he controlled.',
      respondeo: [
        'Version control is a record of every state a project has been in, with a note on why each change was made. Git keeps that record locally as a chain of snapshots identified by content hashes, so nothing depends on a server and nothing can silently change beneath you. From that record come the practical powers: inspect history, compare any two points, return to a known-good state, and work on several ideas at once without them interfering.',
        'The habits worth forming from the first day are small: commit when something works, write a message that says why rather than what, and branch before attempting anything you are unsure of. These cost seconds and buy the ability to experiment without fear.',
      ],
    },
    'branches': {
      question: 'Whether a branch is a copy of the project?',
      objections: [
        { claim: 'switching branches must copy the files, since the working directory changes.', reply: 'A branch is a movable pointer to one commit; the commits themselves are shared. Switching updates the working directory to match a different commit, but nothing is duplicated. That is why creating a branch is instant even in a huge repository.', code: 'git switch -c experiment    # a new pointer, not a copy\ncat .git/refs/heads/experiment   # just a hash', language: 'bash' },
        { claim: 'branches are for large features, so small fixes should go straight to main.', reply: 'The cost of a branch is one command, so the size of the change is not the criterion. What matters is whether main should keep working while you experiment. For most changes the answer is yes.' },
        { claim: 'merging rewrites history so the branch\'s commits disappear.', reply: 'A merge creates a new commit with two parents; both lines of history remain and are visible in the log. Rebasing, a different operation, replays commits onto a new base and does change their identity — which is why one does not rebase what others have pulled.' },
      ],
      sedContra: 'The Git documentation calls a branch "a lightweight movable pointer to a commit". Lightweight is the operative word.',
      respondeo: [
        'Git stores commits as an immutable graph. A branch is a name pointing at one node, and it moves forward as you commit. Because the graph is shared, having ten branches costs almost nothing, and switching between them only changes which snapshot the working directory reflects.',
        'Work this way: branch for each piece of work, commit freely inside it, then merge into main when it is done and tested. Delete the branch afterwards; the commits it introduced live on in main. Keep main in a state you could deploy at any moment, and let branches carry everything unfinished.',
      ],
    },
    'undoing-things': {
      question: 'Whether a mistake committed to Git can be undone?',
      objections: [
        { claim: 'once committed, a change is permanent; only the next commit can correct it.', reply: 'Almost everything is reversible. git revert makes a new commit that undoes an old one, git reset moves the branch pointer, git restore recovers a file, and git reflog remembers where every branch has been for weeks — even after a reset you thought destroyed the work.', code: 'git reflog                 # every position HEAD has held\ngit reset --hard HEAD@{2}  # go back to one of them', language: 'bash' },
        { claim: 'git reset --hard is the general tool for undoing.', reply: 'It discards uncommitted work irrecoverably, which is the one thing Git cannot get back. Prefer revert for published commits and restore for single files; keep --hard for when you genuinely want the working directory thrown away.' },
        { claim: 'a file deleted and committed is gone.', reply: 'It exists in every commit before the deletion. git checkout <commit> -- path restores it, and git log -- path shows its whole life.' },
      ],
      sedContra: 'The reflog exists precisely so that "I have destroyed my work" is almost never true.',
      respondeo: [
        'Git\'s undo tools differ in what they touch. restore recovers files in the working directory; reset moves the branch pointer, optionally taking the index and working tree with it; revert records a new commit that reverses an old one; and the reflog remembers every position each branch has occupied, so even a bad reset can be walked back.',
        'The rule that keeps you safe: anything committed can be recovered; anything never committed cannot. Commit early, commit often, and prefer revert over history-rewriting once work has been shared.',
      ],
    },
  },
  terminal: {
    'terminal-vs-shell': {
      question: 'Whether the terminal is the same thing as the shell?',
      objections: [
        { claim: 'the black window with the prompt is the shell, so the two words name one program.', reply: 'The window is a terminal emulator: it draws characters and turns keystrokes into bytes. The shell is a separate program running inside it, which reads those bytes, interprets them as commands, and starts other programs. You can run the same shell in different terminals, and a different shell in the same terminal.' },
        { claim: 'since the shell prints the output, it must be doing the work of every command.', reply: 'The shell finds and launches the program; the program does the work and writes to standard output, which the terminal displays. The shell\'s own work is parsing, expansion, redirection and job control.', code: 'type ls        # ls is /usr/bin/ls — a separate program\ntype cd        # cd is a shell builtin — the shell must do this one itself', language: 'bash' },
        { claim: 'the terminal understands commands like ls and cd.', reply: 'It understands only bytes and escape sequences. Every command you type is meaningless to it; the shell gives it meaning.' },
      ],
      sedContra: 'ssh gives you a shell with no terminal emulator of your own, and a terminal with no shell shows only a blank window. Each works without the other.',
      respondeo: [
        'Three programs are involved when you run a command. The terminal emulator draws the screen and handles the keyboard. The shell reads your line, expands it, finds the program, and runs it. The program does the actual work, reading standard input and writing standard output and standard error, which flow back through the terminal to your eyes.',
        'Knowing the division explains much that is otherwise confusing: why colours are escape sequences the terminal interprets, why cd must be a shell builtin rather than a program, why a pipeline is the shell\'s doing and not the program\'s, and why the same commands behave identically over ssh where no local terminal is involved.',
      ],
    },
    'stdin-stdout-pipes': {
      question: 'Whether small single-purpose programs are worse than one program that does everything?',
      objections: [
        { claim: 'one tool that sorts, filters and counts is more convenient than three joined by pipes.', reply: 'It is more convenient until you want a combination its author did not anticipate. Three composable tools give every combination; one large tool gives the combinations it was written for. The pipe is what makes composition free.', code: 'cut -d , -f 1 monks.csv | sort | uniq -c | sort -rn | head -3', language: 'bash' },
        { claim: 'pipes write to a temporary file between the stages.', reply: 'A pipe is an in-memory channel between two processes that run at the same time. The second stage begins consuming as soon as the first produces, which is why a pipeline can process a stream larger than memory.' },
        { claim: 'redirecting output with > also captures error messages.', reply: 'It captures standard output only. Errors go to a separate stream, file descriptor 2, and need 2> or 2>&1. This separation is what lets you save results while still seeing failures.' },
      ],
      sedContra: 'Doug McIlroy, who invented the pipe: "Write programs that do one thing and do it well. Write programs to work together."',
      respondeo: [
        'Every process starts with three streams: input, output and errors. Because programs read and write these rather than naming files, the shell can connect them freely: a file into a program, one program into another, output to a file while errors go elsewhere. That single convention is what makes small tools combine into powerful pipelines.',
        'Learn the operators — |, >, >>, 2>, < and 2>&1 — and the handful of filters that fill most pipelines: grep, sort, uniq, cut, head, tail and wc. Then build pipelines one stage at a time, checking the output at each step before adding the next.',
      ],
    },
  },
  html: {
    'semantic-html': {
      question: 'Whether it matters which tag is used, if the styling is the same?',
      objections: [
        { claim: 'a div with a class of heading looks identical to an h1, so the choice is cosmetic.', reply: 'It looks identical to a sighted user with CSS enabled. To a screen reader, a search engine and a browser\'s reader mode, the h1 is the document\'s title and the div is nothing. Meaning is carried by the tag, not the appearance.', code: '<!-- Announced as "heading level 1"; listed in the page outline -->\n<h1>The Rule of Saint Benedict</h1>\n\n<!-- Announced as nothing at all -->\n<div class="heading">The Rule of Saint Benedict</div>', language: 'html' },
        { claim: 'a clickable div with an onclick handler is as good as a button.', reply: 'A button is focusable, activates with Enter and Space, announces itself as a button, and appears in the tab order. A div does none of that until you reimplement all of it, badly.' },
        { claim: 'semantic tags are only for accessibility, which is a niche concern.', reply: 'They also drive search results, reader modes, browser autofill, and the structure your own CSS and JavaScript select against. Accessibility is the reason it is not optional, but it is not the only benefit.' },
      ],
      sedContra: 'The HTML specification defines each element by what it means, not by how it looks; presentation is CSS\'s business.',
      respondeo: [
        'HTML describes what content is: a heading, a paragraph, a list, a navigation region, a button, a form field with its label. Browsers, assistive technology and machines read that description. CSS then decides how it looks, and can make any element look like any other — which is precisely why the underlying meaning must be right.',
        'Choose the element that names the content: header, nav, main, article, section, aside and footer for regions; h1 to h6 in order for structure; button for actions and a for navigation; label tied to every input. Reach for div and span only when no meaningful element exists.',
      ],
    },
  },
  css: {
    'box-model': {
      question: 'Whether setting width on an element fixes how wide it will be?',
      objections: [
        { claim: 'width: 300px means the element occupies 300 pixels.', reply: 'Under the default box-sizing: content-box, width sets the content area only; padding and border are added outside it, so 300px of width with 20px padding and a 1px border occupies 342. Setting box-sizing: border-box makes width mean the whole visible box, which is why nearly every stylesheet sets it globally.', code: '*, *::before, *::after { box-sizing: border-box; }\n\n.card { width: 300px; padding: 20px; border: 1px solid; }\n/* content-box: 342px wide.  border-box: exactly 300px. */', language: 'css' },
        { claim: 'margin and padding are two names for spacing and can be used interchangeably.', reply: 'Padding is inside the border and takes the element\'s background; margin is outside it and is transparent. Vertical margins between siblings collapse into one; padding never collapses. The choice changes both the look and the layout arithmetic.' },
        { claim: 'a block element with no width takes only as much space as its content.', reply: 'That is inline behaviour. A block element fills the width available to it and stacks vertically; its height is what the content needs.' },
      ],
      sedContra: 'The CSS box model specifies that every element is a box of content, padding, border and margin. Everything about layout follows from that.',
      respondeo: [
        'Every element is a rectangle built in layers: the content, then padding, then border, then margin. Backgrounds cover content and padding; borders sit at the edge; margins push neighbours away. Whether width refers to the content alone or to content plus padding and border depends on box-sizing, and border-box is almost always the sane choice.',
        'Set box-sizing: border-box once at the top of the stylesheet, use padding for space inside a component and margin for space between components, and remember that adjacent vertical margins collapse. With those three rules the arithmetic of layout stops surprising you.',
      ],
    },
    'flexbox': {
      question: 'Whether flexbox has replaced grid?',
      objections: [
        { claim: 'flexbox can lay out anything, so grid is redundant.', reply: 'Flexbox lays out one dimension: a row or a column, with items sized and spaced along it. Grid lays out two at once, with rows and columns defined ahead of time and items placed into cells. Building a page-level two-dimensional layout with nested flex containers is possible and unpleasant.', code: '/* one dimension: a toolbar */\n.toolbar { display: flex; gap: 1rem; align-items: center; }\n\n/* two dimensions: a page */\n.page { display: grid; grid-template-columns: 240px 1fr; grid-template-rows: auto 1fr auto; }', language: 'css' },
        { claim: 'justify-content centres items vertically in a row.', reply: 'justify-content works along the main axis, which for a row is horizontal; align-items works across it. Change flex-direction to column and the two swap meaning. That is the single most common source of confusion in flexbox.' },
        { claim: 'floats are still needed for layout when older browsers must be supported.', reply: 'Flexbox and grid are supported by every browser in current use. Floats remain useful for their original purpose, wrapping text around an image, and nothing else.' },
      ],
      sedContra: 'The specifications name them: Flexible Box Layout is "for laying out in a single dimension"; Grid Layout is "a two-dimensional layout system".',
      respondeo: [
        'Flexbox distributes space along one axis: it decides how items grow, shrink, align and space themselves in a row or a column. Grid divides an area into rows and columns and places items into the resulting cells, including across several of them. Most interfaces use both: grid for the page skeleton, flex for the components inside it.',
        'Keep the axes clear: justify-* works along the main axis, align-* across it, and flex-direction decides which is which. Use gap rather than margins for spacing between items, and let flex-grow and flex-basis express intent instead of fixed pixel widths.',
      ],
    },
  },
  react: {
    'state': {
      question: 'Whether state can be changed by assigning to it?',
      objections: [
        { claim: 'since state is a variable, count = count + 1 should update it.', reply: 'The value returned by useState is a snapshot for this render. Assigning to it changes a local variable and nothing else; React never learns that anything happened. Calling the setter both records the new value and schedules a re-render.', code: "const [count, setCount] = useState(0)\n\ncount = count + 1        // nothing re-renders\nsetCount(count + 1)      // React updates and re-renders", language: 'javascript' },
        { claim: 'pushing to a state array updates the component because the array changed.', reply: 'React compares the previous value with the next by identity. A mutated array is the same object, so nothing appears to have changed. Create a new array — setItems([...items, item]) — and the identity differs.' },
        { claim: 'after calling the setter, the variable holds the new value on the next line.', reply: 'The current render keeps its snapshot; the new value arrives in the next render. When the new value depends on the old, pass a function — setCount(c => c + 1) — so React applies it to the latest state rather than to a stale snapshot.' },
      ],
      sedContra: 'The React documentation: "State is a snapshot. Setting state requests a re-render with the new value; it does not change the variable in the running render."',
      respondeo: [
        'A component is a function that takes props and returns what should be on screen. State is memory attached to that component between calls. useState returns the value for this render and a setter; calling the setter records a new value and asks React to render again, at which point the function runs afresh with the new snapshot.',
        'Three habits follow. Never mutate state; produce a new value. Use the updater form when the next value derives from the current one. And keep state minimal: anything that can be computed from existing state or props during render should be computed, not stored.',
      ],
    },
    'effects': {
      question: 'Whether every piece of logic belongs in useEffect?',
      objections: [
        { claim: 'an effect runs after render, so it is the natural place for anything that must happen when data changes.', reply: 'Most such logic is a calculation, and calculations belong in the render itself. An effect that only derives state from props causes a second render and a moment of stale UI. Effects are for synchronising with things outside React: the network, the DOM, subscriptions, timers.', code: "// Unnecessary effect\nconst [full, setFull] = useState('')\nuseEffect(() => setFull(first + ' ' + last), [first, last])\n\n// Just compute it\nconst full = first + ' ' + last", language: 'javascript' },
        { claim: 'an empty dependency array means the effect never runs.', reply: 'It means the effect runs once after the first render and never again, because there are no dependencies to change. An omitted array means it runs after every render.' },
        { claim: 'cleanup functions are optional tidiness.', reply: 'Without cleanup, subscriptions accumulate, timers keep firing after the component is gone, and responses from stale requests overwrite fresh ones. The returned function runs before the effect re-runs and when the component unmounts, which is exactly when those things must stop.' },
      ],
      sedContra: 'The React documentation has a page titled "You Might Not Need an Effect", which lists the common cases where an effect is the wrong tool.',
      respondeo: [
        'An effect synchronises a component with an external system. Its dependency array lists the values that, when changed, require re-synchronising; its returned cleanup undoes the previous synchronisation. That is the whole model, and it explains the behaviour of every effect you will write.',
        'Before writing one, ask what external thing is being synchronised. If the answer is "nothing, I am deriving a value", compute during render. If it is "responding to a click", put it in the handler. Reserve effects for subscriptions, timers, manual DOM work and data fetching, and always clean them up.',
      ],
    },
  },
  nodejs: {
    'async-patterns': {
      question: 'Whether Node.js is slow because it uses only one thread?',
      objections: [
        { claim: 'one thread can serve only one request at a time, so Node must be slower than a threaded server.', reply: 'A request spends most of its life waiting on the database, the disk or the network. Node hands that waiting to the operating system and serves other requests meanwhile, so one thread handles thousands of concurrent connections. Threads help when the work is computation, not waiting.' },
        { claim: 'since Node is non-blocking, no code can block it.', reply: 'Any synchronous work blocks the loop and every pending request with it: a tight loop, a large JSON.parse, a synchronous file read, a bcrypt round. Non-blocking applies to I/O the runtime performs for you, not to your own arithmetic.', code: "const data = fs.readFileSync('huge.json')   // blocks everything\nconst data = await fs.promises.readFile('huge.json')   // does not", language: 'javascript' },
        { claim: 'CPU-heavy work in Node requires rewriting the service in another language.', reply: 'Worker threads and child processes run such work off the main loop, and the cluster module spreads connections across cores. The single loop is a design for I/O, not a hard ceiling.' },
      ],
      sedContra: 'The Node documentation states its purpose plainly: "an event-driven, non-blocking I/O model that makes it lightweight and efficient".',
      respondeo: [
        'Node runs your JavaScript on one thread with an event loop, while the platform beneath it performs I/O asynchronously on a pool of threads you never see. When an operation completes, its callback is queued and the loop runs it. This suits servers, whose work is overwhelmingly waiting on other machines.',
        'The practical discipline is to keep the loop free: prefer the promise-based APIs, never call the Sync variants in a request path, break long computations into chunks or move them to a worker, and measure the event loop\'s delay when latency rises. Concurrency in Node is a property you can lose with a single blocking line.',
      ],
    },
  },
  vue: {
    'reactivity': {
      question: 'Whether Vue re-renders the whole component when data changes?',
      objections: [
        { claim: 'the component function must run again, as in React, so everything is rebuilt.', reply: 'Vue tracks which reactive values each part of the render depends on. When a value changes, only the effects that read it re-run, and the compiler marks the static parts so they are never re-checked. The component setup runs once.' },
        { claim: 'ref and reactive are interchangeable ways to make data reactive.', reply: 'ref wraps any value, including primitives, and is read through .value in script. reactive takes an object and returns a proxy, but loses reactivity if you destructure it. The usual advice is ref by default.', code: "const count = ref(0)\ncount.value++            // .value in script, plain in template\n\nconst state = reactive({ n: 0 })\nconst { n } = state      // n is no longer reactive", language: 'javascript' },
        { claim: 'a computed property is the same as a method that returns the value.', reply: 'A computed caches its result and recomputes only when its dependencies change; a method runs on every render. For anything expensive, or read in several places, that difference matters.' },
      ],
      sedContra: 'Vue\'s documentation describes its core as "a reactivity system that tracks dependencies at a fine granularity".',
      respondeo: [
        'Vue makes data reactive by intercepting reads and writes. During rendering it records which values were read; when one of them is written, exactly the effects that depended on it run again. That is why updates are precise and why you rarely think about optimisation in Vue.',
        'Declare state with ref, derive with computed, react to changes with watch or watchEffect when a side effect is genuinely needed, and avoid destructuring reactive objects. Keep templates declarative and let the tracking system decide what to update.',
      ],
    },
  },
}
