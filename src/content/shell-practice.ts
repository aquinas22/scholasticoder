import type { Section } from './types'
import { getNode, resolvePath, type ShellState } from '../lib/shell-sim'

const HOME = '/home/apprentice'
const fileText = (s: ShellState, p: string) => { const n = getNode(s, resolvePath({ ...s, cwd: HOME }, p)); return n && n.type === 'file' ? n.content : null }
const isDir = (s: ShellState, p: string) => { const n = getNode(s, resolvePath({ ...s, cwd: HOME }, p)); return !!n && n.type === 'dir' }
const exists = (s: ShellState, p: string) => !!getNode(s, resolvePath({ ...s, cwd: HOME }, p))
const ran = (s: ShellState, re: RegExp) => s.history.some(h => re.test(h))

/** Hands-on shell exercises merged into the Terminal and Bash paths. */
export const shellPractice: Record<string, Record<string, Section[]>> = {
  terminal: {
    'terminal-vs-shell': [
      {
        type: 'shell',
        content: 'Get your bearings. Print the working directory, list what is in it, read the koan, then move into the lessons directory and list it too.',
        shell: {
          title: 'First steps',
          intro: ['Welcome to the practice shell. It is a simulation: nothing you do here can hurt a real machine.', 'Type help at any time.'],
          hints: ['pwd prints where you are; ls lists files; cat shows a file.', 'cd lessons changes directory; ls afterwards lists the new place.'],
          solution: 'pwd\nls\ncat koan.txt\ncd lessons\nls',
          checks: [
            { name: 'Printed the working directory with pwd', check: s => ran(s, /^\s*pwd\b/) || 'run pwd' },
            { name: 'Read koan.txt with cat', check: s => ran(s, /^\s*cat\s+.*koan\.txt/) || 'run cat koan.txt' },
            { name: 'Ended up inside the lessons directory', check: s => s.cwd === `${HOME}/lessons` || `you are in ${s.cwd}; cd into lessons` },
            { name: 'Listed the lessons directory', check: s => ran(s, /^\s*ls\b/) && s.history.lastIndexOf('ls') > s.history.findIndex(h => /^\s*cd\s+lessons/.test(h)) || 'run ls after cd lessons' },
          ],
        },
      },
    ],
    'what-happens-when-you-run-a-command': [
      {
        type: 'shell',
        content: 'Explore how the shell finds and reports on commands. Use which to locate ls, print your PATH, run a command that does not exist, then print its exit status with $? on the very next line.',
        shell: {
          title: 'PATH and exit codes',
          hints: ['which ls shows where the program lives; echo $PATH shows where the shell looks.', 'Run something like frobnicate, then immediately echo $? — the status of the last command.'],
          solution: 'which ls\necho $PATH\nfrobnicate\necho $?',
          checks: [
            { name: 'Located ls with which (or type)', check: s => ran(s, /^\s*(which|type)\s+ls\b/) || 'run which ls' },
            { name: 'Printed PATH', check: s => ran(s, /echo\s+"?\$PATH/) || 'run echo $PATH' },
            { name: 'Printed a non-zero exit status right after a failing command', check: s => { const h = s.history; for (let i = 1; i < h.length; i++) if (/echo\s+"?\$\?/.test(h[i]) && !/^\s*(echo|pwd|ls|cd|which|type|true|cat|help|man)\b/.test(h[i - 1])) return true; return 'run a made-up command, then echo $? on the next line' } },
          ],
        },
      },
    ],
    'stdin-stdout-pipes': [
      {
        type: 'shell',
        content: 'Redirect and pipe. Save the output of ls -l to files.txt, append the line "end of listing" to it, then use a pipe to count how many lines in data/psalms.txt mention Psalm 23.',
        shell: {
          title: 'Redirection and a pipe',
          hints: ['> overwrites, >> appends: ls -l > files.txt then echo "end of listing" >> files.txt', 'grep "Psalm 23" data/psalms.txt | wc -l counts matching lines (grep -c does it too).'],
          solution: 'ls -l > files.txt\necho "end of listing" >> files.txt\ngrep "Psalm 23" data/psalms.txt | wc -l',
          checks: [
            { name: 'files.txt contains an ls -l listing', check: s => { const t = fileText(s, 'files.txt'); return (t !== null && /rw-r--r--|drwx/.test(t)) || 'redirect ls -l into files.txt with >' } },
            { name: 'files.txt ends with "end of listing"', check: s => { const t = fileText(s, 'files.txt'); return (t !== null && t.trimEnd().endsWith('end of listing') && t.split('\n').length > 2) || 'append the line with >>' } },
            { name: 'Counted the Psalm 23 lines through a pipe', check: (s, out) => (ran(s, /grep.*\|.*wc/) || ran(s, /grep\s+-c/)) && /\b2\b/.test(out) || 'grep the file and pipe into wc -l; the answer should be 2' },
          ],
        },
      },
      {
        type: 'shell',
        content: 'Build a small pipeline: print the names from data/monks.csv (the first field, skipping the header line), sorted alphabetically, and save the result to names.txt.',
        shell: {
          title: 'A pipeline that transforms data',
          hints: ['tail -n 4 data/monks.csv skips the header (there are 5 lines).', 'cut -d , -f 1 takes the first comma-separated field; then sort; then > names.txt.'],
          solution: 'tail -n 4 data/monks.csv | cut -d , -f 1 | sort > names.txt\ncat names.txt',
          checks: [
            { name: 'names.txt has the four names sorted', check: s => { const t = fileText(s, 'names.txt'); return (t !== null && t.trim().split('\n').join(',') === 'Alcuin,Bede,Caedmon,Hild') || `names.txt should contain Alcuin, Bede, Caedmon, Hild in that order` } },
            { name: 'Used a pipeline with at least two pipes', check: s => ran(s, /\|.*\|/) || 'chain the commands with |' },
          ],
        },
      },
    ],
    'environment-and-config': [
      {
        type: 'shell',
        content: 'Variables live in the environment. Print your HOME and USER, create a variable EDITOR set to nano with export, and confirm it shows up in env.',
        shell: {
          title: 'Environment variables',
          hints: ['echo $HOME $USER', 'export EDITOR=nano, then env | grep EDITOR'],
          solution: 'echo $HOME $USER\nexport EDITOR=nano\nenv | grep EDITOR',
          checks: [
            { name: 'Printed HOME and USER', check: s => ran(s, /echo.*\$HOME/) && ran(s, /echo.*\$USER/) || 'echo $HOME and echo $USER' },
            { name: 'EDITOR is exported as nano', check: s => s.env.EDITOR === 'nano' || 'export EDITOR=nano' },
            { name: 'Looked it up with env or printenv', check: s => ran(s, /^\s*(env|printenv)\b/) || 'run env | grep EDITOR' },
          ],
        },
      },
    ],
  },
  bash: {
    'first-script': [
      {
        type: 'shell',
        content: 'Scripts are just files of commands. Run the existing scripts/hello.sh, then create your own greet.sh in the scripts directory that echoes "Ora et labora", make it executable, and run it.',
        shell: {
          title: 'Write and run a script',
          hints: ['./scripts/hello.sh runs a script by path.', 'echo \'echo "Ora et labora"\' > scripts/greet.sh writes a one-line script; chmod +x scripts/greet.sh makes it runnable.'],
          solution: './scripts/hello.sh\necho \'echo "Ora et labora"\' > scripts/greet.sh\nchmod +x scripts/greet.sh\n./scripts/greet.sh',
          checks: [
            { name: 'Ran hello.sh', check: s => ran(s, /scripts\/hello\.sh/) || 'run ./scripts/hello.sh' },
            { name: 'scripts/greet.sh exists and echoes the motto', check: s => { const t = fileText(s, 'scripts/greet.sh'); return (t !== null && /echo.*Ora et labora/.test(t)) || 'create scripts/greet.sh containing echo "Ora et labora"' } },
            { name: 'greet.sh is executable', check: s => { const n = getNode(s, `${HOME}/scripts/greet.sh`); return (!!n && n.type === 'file' && !!n.exec) || 'chmod +x scripts/greet.sh' } },
            { name: 'Ran greet.sh and saw the motto', check: (s, out) => ran(s, /greet\.sh\s*$/) && /Ora et labora/.test(out) || 'run ./scripts/greet.sh' },
          ],
        },
      },
    ],
    'files': [
      {
        type: 'shell',
        content: 'Organise a project. Create a directory project with src and docs inside it, move README.md into docs, copy koan.txt into src as motto.txt, and remove the lessons/day3.txt file.',
        shell: {
          title: 'Make, move, copy, remove',
          hints: ['mkdir -p project/src project/docs creates everything in one go.', 'mv README.md project/docs/ moves; cp koan.txt project/src/motto.txt copies with a new name; rm lessons/day3.txt deletes.'],
          solution: 'mkdir -p project/src project/docs\nmv README.md project/docs/\ncp koan.txt project/src/motto.txt\nrm lessons/day3.txt\ntree project',
          checks: [
            { name: 'project/src and project/docs exist', check: s => isDir(s, 'project/src') && isDir(s, 'project/docs') || 'mkdir -p project/src project/docs' },
            { name: 'README.md was moved into project/docs', check: s => exists(s, 'project/docs/README.md') && !exists(s, 'README.md') || 'mv README.md project/docs/' },
            { name: 'koan.txt copied to project/src/motto.txt (original kept)', check: s => { const a = fileText(s, 'koan.txt'), b = fileText(s, 'project/src/motto.txt'); return (a !== null && b !== null && a === b) || 'cp koan.txt project/src/motto.txt' } },
            { name: 'lessons/day3.txt removed', check: s => !exists(s, 'lessons/day3.txt') || 'rm lessons/day3.txt' },
          ],
        },
      },
    ],
    'pipes-redirection': [
      {
        type: 'shell',
        content: 'From data/psalms.txt produce a de-duplicated, sorted list of the psalm numbers only and save it to numbers.txt. Then capture the error message from reading a file that does not exist into errors.log without it appearing on screen.',
        shell: {
          title: 'Sort, uniq and stderr',
          hints: ['cut -d " " -f 2 data/psalms.txt gives the numbers; sort -n | uniq de-duplicates numerically.', 'cat nothing.txt 2> errors.log sends only stderr to the file.'],
          solution: 'cut -d " " -f 2 data/psalms.txt | sort -n | uniq > numbers.txt\ncat numbers.txt\ncat nothing.txt 2> errors.log\ncat errors.log',
          checks: [
            { name: 'numbers.txt holds 23, 51, 100, 150', check: s => { const t = fileText(s, 'numbers.txt'); return (t !== null && t.trim().split('\n').join(',') === '23,51,100,150') || 'numbers.txt should be 23, 51, 100, 150 one per line' } },
            { name: 'errors.log contains a "No such file" message', check: s => { const t = fileText(s, 'errors.log'); return (t !== null && /No such file/.test(t)) || 'redirect stderr with 2> errors.log' } },
            { name: 'Used 2> for stderr', check: s => ran(s, /2>\s*errors\.log/) || 'use 2> errors.log' },
          ],
        },
      },
    ],
  },
}
