/**
 * A small simulated Unix shell with an in-memory file system, used by the Terminal and Bash paths.
 * It supports the everyday commands, pipes, redirection, globs, variables and exit codes —
 * enough to practise the rhythm without touching a real machine.
 */

export interface ShellDir { type: 'dir'; children: Record<string, ShellNode> }
export interface ShellFile { type: 'file'; content: string; exec?: boolean }
export type ShellNode = ShellDir | ShellFile

export interface ShellState {
  fs: ShellDir
  cwd: string
  env: Record<string, string>
  history: string[]
  lastStatus: number
  user: string
  host: string
}

export interface ShellLine { kind: 'command' | 'stdout' | 'stderr'; text: string }

const HOME = '/home/apprentice'

export function dir(children: Record<string, ShellNode> = {}): ShellDir { return { type: 'dir', children } }
export function file(content: string, exec = false): ShellFile { return { type: 'file', content, exec } }

export function createInitialState(): ShellState {
  return {
    fs: dir({
      home: dir({
        apprentice: dir({
          'README.md': file('# Welcome, apprentice\n\nThis is a practice shell. Nothing here is real, so break things freely.\nTry: ls, cat README.md, cd lessons, mkdir notes\n'),
          'koan.txt': file('A bug is only a lesson wearing a disguise.\n'),
          lessons: dir({
            'day1.txt': file('ls pwd cd cat\n'),
            'day2.txt': file('mkdir touch rm mv cp\n'),
            'day3.txt': file('pipes | redirection > grep\n'),
          }),
          scripts: dir({
            'hello.sh': file('#!/bin/bash\necho "Hello from a script"\n', true),
          }),
          data: dir({
            'psalms.txt': file('Psalm 23 The Lord is my shepherd\nPsalm 51 Have mercy on me\nPsalm 100 Make a joyful noise\nPsalm 150 Praise him with the trumpet\nPsalm 23 The Lord is my shepherd\n'),
            'monks.csv': file('name,role,pages\nBede,scribe,412\nHild,abbess,88\nAlcuin,teacher,300\nCaedmon,poet,12\n'),
          }),
        }),
      }),
      etc: dir({ hostname: file('abbey\n'), motd: file('Ora et labora.\n') }),
      tmp: dir(),
      usr: dir({ bin: dir() }),
      bin: dir(),
    }),
    cwd: HOME,
    env: { HOME, USER: 'apprentice', PATH: '/usr/local/bin:/usr/bin:/bin', SHELL: '/bin/bash', PWD: HOME, LANG: 'en_US.UTF-8' },
    history: [],
    lastStatus: 0,
    user: 'apprentice',
    host: 'abbey',
  }
}

export const COMMANDS = ['pwd', 'ls', 'cd', 'cat', 'echo', 'mkdir', 'touch', 'rm', 'rmdir', 'cp', 'mv', 'head', 'tail', 'wc', 'grep', 'sort', 'uniq', 'find', 'tree', 'which', 'type', 'whoami', 'hostname', 'date', 'env', 'printenv', 'export', 'history', 'clear', 'help', 'man', 'chmod', 'true', 'false', 'cut', 'tr', 'rev', 'seq', 'basename', 'dirname', 'printf', 'yes'] as const

/* ───────────────────────── path helpers ───────────────────────── */

export function resolvePath(state: ShellState, p: string): string {
  if (!p) return state.cwd
  if (p === '~' || p.startsWith('~/')) p = state.env.HOME + p.slice(1)
  const parts = (p.startsWith('/') ? p : state.cwd + '/' + p).split('/')
  const out: string[] = []
  for (const part of parts) {
    if (!part || part === '.') continue
    if (part === '..') { out.pop(); continue }
    out.push(part)
  }
  return '/' + out.join('/')
}

export function getNode(state: ShellState, abs: string): ShellNode | null {
  if (abs === '/') return state.fs
  let node: ShellNode = state.fs
  for (const part of abs.split('/').filter(Boolean)) {
    if (node.type !== 'dir' || !(part in node.children)) return null
    node = node.children[part]
  }
  return node
}

function parentOf(abs: string) {
  const i = abs.lastIndexOf('/')
  return { parent: i <= 0 ? '/' : abs.slice(0, i), name: abs.slice(i + 1) }
}

function displayPath(state: ShellState, abs: string) {
  return abs === state.env.HOME ? '~' : abs.startsWith(state.env.HOME + '/') ? '~' + abs.slice(state.env.HOME.length) : abs
}

export function prompt(state: ShellState) {
  return `${state.user}@${state.host}:${displayPath(state, state.cwd)}$`
}

/* ───────────────────────── tokenising ───────────────────────── */

interface Token { text: string; quoted: boolean }

function tokenize(line: string, state: ShellState): Token[] | { error: string } {
  const tokens: Token[] = []
  let cur = ''
  let quoted = false
  let i = 0
  let inToken = false
  const push = () => { if (inToken) { tokens.push({ text: cur, quoted }); cur = ''; quoted = false; inToken = false } }
  while (i < line.length) {
    const ch = line[i]
    if (ch === "'") {
      const end = line.indexOf("'", i + 1)
      if (end === -1) return { error: 'unterminated single quote' }
      cur += line.slice(i + 1, end); quoted = true; inToken = true; i = end + 1; continue
    }
    if (ch === '"') {
      const end = line.indexOf('"', i + 1)
      if (end === -1) return { error: 'unterminated double quote' }
      cur += expandVars(line.slice(i + 1, end), state); quoted = true; inToken = true; i = end + 1; continue
    }
    if (ch === '\\' && i + 1 < line.length) { cur += line[i + 1]; inToken = true; i += 2; continue }
    if (/\s/.test(ch)) { push(); i++; continue }
    if (ch === '|' || ch === ';' || ch === '>' || ch === '<' || ch === '&') {
      push()
      let op = ch
      if ((ch === '>' && line[i + 1] === '>') || (ch === '&' && line[i + 1] === '&') || (ch === '|' && line[i + 1] === '|')) { op += line[i + 1]; i++ }
      if (ch === '>' && cur === '' && tokens.length && tokens[tokens.length - 1].text === '2' && !tokens[tokens.length - 1].quoted) { tokens.pop(); op = '2' + op }
      tokens.push({ text: op, quoted: false })
      i++
      continue
    }
    if (ch === '#' && !inToken) break
    cur += ch; inToken = true; i++
  }
  push()
  // expand unquoted variables and globs
  return tokens.map(t => (t.quoted ? t : { ...t, text: expandVars(t.text, state) }))
}

function expandVars(text: string, state: ShellState) {
  return text.replace(/\$\{?([A-Za-z_][A-Za-z0-9_]*|\?)\}?/g, (_, name: string) => (name === '?' ? String(state.lastStatus) : state.env[name] ?? ''))
}

function globExpand(state: ShellState, pattern: string): string[] {
  if (!/[*?]/.test(pattern)) return [pattern]
  const { parent, name } = pattern.includes('/') ? parentOf(pattern) : { parent: '', name: pattern }
  const base = parent ? resolvePath(state, parent) : state.cwd
  const node = getNode(state, base)
  if (!node || node.type !== 'dir') return [pattern]
  const re = new RegExp('^' + name.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$')
  const matches = Object.keys(node.children).filter(n => !n.startsWith('.') && re.test(n)).sort().map(n => (parent ? parent.replace(/\/$/, '') + '/' + n : n))
  return matches.length ? matches : [pattern]
}

/* ───────────────────────── execution ───────────────────────── */

interface Cmd { argv: string[]; stdoutTo?: { path: string; append: boolean }; stderrTo?: { path: string; append: boolean }; stdinFrom?: string }
interface Result { out: string; err: string; status: number }

function splitPipeline(tokens: Token[]): { cmds: Cmd[]; error?: string } {
  const cmds: Cmd[] = []
  let cur: Cmd = { argv: [] }
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]
    if (!t.quoted && t.text === '|') { cmds.push(cur); cur = { argv: [] }; continue }
    if (!t.quoted && (t.text === '>' || t.text === '>>' || t.text === '2>' || t.text === '2>>' || t.text === '<')) {
      const target = tokens[i + 1]
      if (!target) return { cmds, error: `syntax error near unexpected token 'newline'` }
      i++
      if (t.text === '<') cur.stdinFrom = target.text
      else if (t.text.startsWith('2')) cur.stderrTo = { path: target.text, append: t.text === '2>>' }
      else cur.stdoutTo = { path: target.text, append: t.text === '>>' }
      continue
    }
    cur.argv.push(t.text)
  }
  cmds.push(cur)
  return { cmds }
}

function writeFile(state: ShellState, target: string, content: string, append: boolean): string | null {
  const abs = resolvePath(state, target)
  const { parent, name } = parentOf(abs)
  const p = getNode(state, parent)
  if (!p || p.type !== 'dir') return `bash: ${target}: No such file or directory`
  const existing = p.children[name]
  if (existing && existing.type === 'dir') return `bash: ${target}: Is a directory`
  p.children[name] = file((append && existing ? (existing as ShellFile).content : '') + content, existing ? (existing as ShellFile).exec : false)
  return null
}

function readFileContent(state: ShellState, target: string): { content?: string; error?: string } {
  const node = getNode(state, resolvePath(state, target))
  if (!node) return { error: `${target}: No such file or directory` }
  if (node.type === 'dir') return { error: `${target}: Is a directory` }
  return { content: node.content }
}

function lsEntry(name: string, node: ShellNode, long: boolean) {
  if (!long) return node.type === 'dir' ? name + '/' : name
  const perms = node.type === 'dir' ? 'drwxr-xr-x' : node.exec ? '-rwxr-xr-x' : '-rw-r--r--'
  const size = node.type === 'dir' ? 4096 : node.content.length
  return `${perms}  1 apprentice apprentice ${String(size).padStart(6)} Sep  6 09:00 ${name}${node.type === 'dir' ? '/' : ''}`
}

function flags(argv: string[]) {
  const opts = new Set<string>()
  const args: string[] = []
  for (const a of argv) {
    if (a.startsWith('-') && a.length > 1 && !/^-\d/.test(a)) { for (const ch of a.slice(1)) opts.add(ch) } else args.push(a)
  }
  return { opts, args }
}

function walk(state: ShellState, abs: string, node: ShellNode, out: string[], rel: string) {
  out.push(rel)
  if (node.type === 'dir') for (const name of Object.keys(node.children).sort()) walk(state, abs + '/' + name, node.children[name], out, rel + '/' + name)
}

function runCommand(state: ShellState, cmd: Cmd, stdin: string, emitClear: () => void): Result {
  const argv = cmd.argv.flatMap(a => globExpand(state, a))
  if (argv.length === 0) return { out: '', err: '', status: 0 }
  if (cmd.stdinFrom) {
    const r = readFileContent(state, cmd.stdinFrom)
    if (r.error) return { out: '', err: 'bash: ' + r.error + '\n', status: 1 }
    stdin = r.content ?? ''
  }
  const [name, ...rest] = argv
  const { opts, args } = flags(rest)
  const fail = (msg: string, status = 1): Result => ({ out: '', err: `${name}: ${msg}\n`, status })

  switch (name) {
    case 'pwd': return { out: state.cwd + '\n', err: '', status: 0 }
    case 'whoami': return { out: state.user + '\n', err: '', status: 0 }
    case 'hostname': return { out: state.host + '\n', err: '', status: 0 }
    case 'date': return { out: new Date().toString() + '\n', err: '', status: 0 }
    case 'true': return { out: '', err: '', status: 0 }
    case 'false': return { out: '', err: '', status: 1 }
    case 'clear': emitClear(); return { out: '', err: '', status: 0 }
    case 'history': return { out: state.history.map((h, i) => `${String(i + 1).padStart(5)}  ${h}`).join('\n') + '\n', err: '', status: 0 }
    case 'env': case 'printenv': {
      if (args.length) return { out: (args.map(a => state.env[a] ?? '').join('\n')) + '\n', err: '', status: 0 }
      return { out: Object.entries(state.env).map(([k, v]) => `${k}=${v}`).join('\n') + '\n', err: '', status: 0 }
    }
    case 'export': {
      for (const a of args) { const m = a.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/); if (m) state.env[m[1]] = m[2] }
      return { out: '', err: '', status: 0 }
    }
    case 'echo': return { out: args.join(' ') + (opts.has('n') ? '' : '\n'), err: '', status: 0 }
    case 'printf': return { out: args.length ? args[0].replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/%s/g, () => args.splice(1, 1)[0] ?? '') : '', err: '', status: 0 }
    case 'yes': return { out: Array(20).fill(args[0] ?? 'y').join('\n') + '\n', err: '', status: 0 }
    case 'seq': {
      const nums = args.map(Number)
      const [a, b] = nums.length === 1 ? [1, nums[0]] : nums
      const out: string[] = []
      for (let i = a; i <= b && out.length < 10000; i++) out.push(String(i))
      return { out: out.join('\n') + '\n', err: '', status: 0 }
    }
    case 'which': case 'type': {
      const outs = args.map(a => ((COMMANDS as readonly string[]).includes(a) ? (name === 'which' ? `/usr/bin/${a}` : `${a} is /usr/bin/${a}`) : `${name}: ${a}: not found`))
      return { out: outs.join('\n') + '\n', err: '', status: outs.some(o => o.includes('not found')) ? 1 : 0 }
    }
    case 'help': return { out: 'Available commands:\n  ' + COMMANDS.join('  ') + '\n\nPipes (|), redirection (>, >>, 2>, <), && and ;, $VARS, and * globs all work.\nType man <command> for a one-line description.\n', err: '', status: 0 }
    case 'man': {
      const MAN: Record<string, string> = { ls: 'list directory contents (-l long, -a all)', cd: 'change the working directory', pwd: 'print the working directory', cat: 'concatenate files and print them', echo: 'print its arguments', mkdir: 'make directories (-p creates parents)', touch: 'create an empty file or update its time', rm: 'remove files (-r for directories)', cp: 'copy files', mv: 'move or rename files', head: 'first lines of a file (-n N)', tail: 'last lines of a file (-n N)', wc: 'count lines, words and bytes (-l -w -c)', grep: 'print lines matching a pattern (-i ignore case, -n line numbers, -v invert, -c count)', sort: 'sort lines (-r reverse, -n numeric, -u unique)', uniq: 'drop repeated adjacent lines (-c count)', find: 'search for files (find DIR -name PATTERN)', tree: 'show a directory as a tree', chmod: 'change permissions (chmod +x FILE)', cut: 'select fields (-d DELIM -f N)', tr: 'translate characters', env: 'print environment variables', export: 'set an environment variable' }
      const a = args[0]
      return a && MAN[a] ? { out: `${a} — ${MAN[a]}\n`, err: '', status: 0 } : fail(`No manual entry for ${a ?? ''}`)
    }
    case 'cd': {
      const target = args[0] ? resolvePath(state, args[0]) : state.env.HOME
      const node = getNode(state, target)
      if (!node) return fail(`${args[0]}: No such file or directory`)
      if (node.type !== 'dir') return fail(`${args[0]}: Not a directory`)
      state.cwd = target; state.env.PWD = target
      return { out: '', err: '', status: 0 }
    }
    case 'ls': {
      const targets = args.length ? args : ['.']
      const out: string[] = []
      let status = 0
      for (const t of targets) {
        const node = getNode(state, resolvePath(state, t))
        if (!node) { status = 2; out.push(`ls: cannot access '${t}': No such file or directory`); continue }
        if (node.type === 'file') { out.push(lsEntry(t, node, opts.has('l'))); continue }
        const names = Object.keys(node.children).filter(n => opts.has('a') || !n.startsWith('.')).sort()
        if (targets.length > 1) out.push(`${t}:`)
        if (opts.has('l')) out.push(...names.map(n => lsEntry(n, node.children[n], true)))
        else out.push(names.map(n => lsEntry(n, node.children[n], false)).join('  '))
      }
      return { out: out.join('\n') + '\n', err: '', status }
    }
    case 'tree': {
      const abs = resolvePath(state, args[0] ?? '.')
      const node = getNode(state, abs)
      if (!node) return fail(`${args[0]}: No such file or directory`)
      const lines: string[] = [displayPath(state, abs)]
      const rec = (n: ShellNode, prefix: string) => {
        if (n.type !== 'dir') return
        const names = Object.keys(n.children).sort()
        names.forEach((nm, i) => { const last = i === names.length - 1; lines.push(`${prefix}${last ? '└── ' : '├── '}${nm}`); rec(n.children[nm], prefix + (last ? '    ' : '│   ')) })
      }
      rec(node, '')
      return { out: lines.join('\n') + '\n', err: '', status: 0 }
    }
    case 'cat': {
      if (!args.length) return { out: stdin, err: '', status: 0 }
      let out = '', err = '', status = 0
      for (const a of args) { const r = readFileContent(state, a); if (r.error) { err += `cat: ${r.error}\n`; status = 1 } else out += r.content }
      return { out, err, status }
    }
    case 'mkdir': {
      if (!args.length) return fail('missing operand')
      let err = '', status = 0
      for (const a of args) {
        const abs = resolvePath(state, a)
        if (opts.has('p')) {
          let node: ShellDir = state.fs
          for (const part of abs.split('/').filter(Boolean)) { if (!node.children[part]) node.children[part] = dir(); const next = node.children[part]; if (next.type !== 'dir') { err += `mkdir: cannot create directory '${a}': Not a directory\n`; status = 1; break } node = next }
          continue
        }
        const { parent, name: nm } = parentOf(abs)
        const p = getNode(state, parent)
        if (!p || p.type !== 'dir') { err += `mkdir: cannot create directory '${a}': No such file or directory\n`; status = 1; continue }
        if (p.children[nm]) { err += `mkdir: cannot create directory '${a}': File exists\n`; status = 1; continue }
        p.children[nm] = dir()
      }
      return { out: '', err, status }
    }
    case 'touch': {
      if (!args.length) return fail('missing file operand')
      for (const a of args) { const abs = resolvePath(state, a); const { parent, name: nm } = parentOf(abs); const p = getNode(state, parent); if (!p || p.type !== 'dir') return fail(`cannot touch '${a}': No such file or directory`); if (!p.children[nm]) p.children[nm] = file('') }
      return { out: '', err: '', status: 0 }
    }
    case 'rm': case 'rmdir': {
      if (!args.length) return fail('missing operand')
      let err = '', status = 0
      for (const a of args) {
        const abs = resolvePath(state, a)
        const { parent, name: nm } = parentOf(abs)
        const p = getNode(state, parent)
        const node = p && p.type === 'dir' ? p.children[nm] : undefined
        if (!p || p.type !== 'dir' || !node) { if (!opts.has('f')) { err += `${name}: cannot remove '${a}': No such file or directory\n`; status = 1 } continue }
        if (node.type === 'dir' && name === 'rm' && !opts.has('r')) { err += `rm: cannot remove '${a}': Is a directory\n`; status = 1; continue }
        if (node.type === 'dir' && name === 'rmdir' && Object.keys(node.children).length) { err += `rmdir: failed to remove '${a}': Directory not empty\n`; status = 1; continue }
        if (abs === state.env.HOME || abs === '/') { err += `${name}: refusing to remove '${a}'\n`; status = 1; continue }
        delete p.children[nm]
      }
      return { out: '', err, status }
    }
    case 'cp': case 'mv': {
      if (args.length < 2) return fail('missing destination file operand')
      const dest = args[args.length - 1]
      const sources = args.slice(0, -1)
      const destAbs = resolvePath(state, dest)
      const destNode = getNode(state, destAbs)
      let err = '', status = 0
      for (const src of sources) {
        const srcAbs = resolvePath(state, src)
        const node = getNode(state, srcAbs)
        if (!node) { err += `${name}: cannot stat '${src}': No such file or directory\n`; status = 1; continue }
        if (node.type === 'dir' && name === 'cp' && !opts.has('r')) { err += `cp: -r not specified; omitting directory '${src}'\n`; status = 1; continue }
        const targetAbs = destNode && destNode.type === 'dir' ? destAbs + '/' + parentOf(srcAbs).name : destAbs
        const { parent, name: nm } = parentOf(targetAbs)
        const p = getNode(state, parent)
        if (!p || p.type !== 'dir') { err += `${name}: cannot create '${dest}': No such file or directory\n`; status = 1; continue }
        p.children[nm] = JSON.parse(JSON.stringify(node))
        if (name === 'mv') { const sp = getNode(state, parentOf(srcAbs).parent); if (sp && sp.type === 'dir') delete sp.children[parentOf(srcAbs).name] }
      }
      return { out: '', err, status }
    }
    case 'chmod': {
      const mode = args[0]; const targets = args.slice(1)
      if (!mode || !targets.length) return fail('missing operand')
      for (const t of targets) { const node = getNode(state, resolvePath(state, t)); if (!node) return fail(`cannot access '${t}': No such file or directory`); if (node.type === 'file') node.exec = mode.includes('+x') || /^[0-7]*[1357]/.test(mode) }
      return { out: '', err: '', status: 0 }
    }
    case 'head': case 'tail': {
      const nIdx = rest.indexOf('-n')
      const count = nIdx !== -1 ? Number(rest[nIdx + 1]) : Number((rest.find(a => /^-\d+$/.test(a)) ?? '-10').slice(1))
      const files = args.filter((a, i) => !(nIdx !== -1 && rest[nIdx + 1] === a && i === args.indexOf(a)))
      const input = files.length ? files.map(f => readFileContent(state, f).content ?? '').join('') : stdin
      const lines = input.replace(/\n$/, '').split('\n')
      const picked = name === 'head' ? lines.slice(0, count) : lines.slice(-count)
      return { out: picked.join('\n') + (picked.length ? '\n' : ''), err: '', status: 0 }
    }
    case 'wc': {
      const inputs = args.length ? args.map(a => ({ label: a, text: readFileContent(state, a).content ?? '' })) : [{ label: '', text: stdin }]
      const out = inputs.map(({ label, text }) => {
        const l = (text.match(/\n/g) ?? []).length, w = text.split(/\s+/).filter(Boolean).length, c = text.length
        const cols = opts.size ? [opts.has('l') ? l : null, opts.has('w') ? w : null, opts.has('c') ? c : null].filter(v => v !== null) : [l, w, c]
        return cols.map(v => String(v).padStart(opts.size ? 1 : 7)).join(' ') + (label ? ' ' + label : '')
      })
      return { out: out.join('\n') + '\n', err: '', status: 0 }
    }
    case 'grep': {
      const pattern = args[0]
      if (pattern === undefined) return fail('usage: grep [-inv] PATTERN [FILE...]', 2)
      const files = args.slice(1)
      let re: RegExp
      try { re = new RegExp(pattern, opts.has('i') ? 'i' : '') } catch { return fail('invalid regular expression', 2) }
      const sources = files.length ? files.map(f => ({ label: f, r: readFileContent(state, f) })) : [{ label: '', r: { content: stdin } }]
      const out: string[] = []
      let err = ''
      for (const { label, r } of sources) {
        if (r.error) { err += `grep: ${r.error}\n`; continue }
        const lines = (r.content ?? '').replace(/\n$/, '').split('\n')
        const hits = lines.map((l, i) => ({ l, i })).filter(({ l }) => re.test(l) !== opts.has('v'))
        if (opts.has('c')) { out.push((files.length > 1 ? label + ':' : '') + hits.length); continue }
        for (const { l, i } of hits) out.push((files.length > 1 ? label + ':' : '') + (opts.has('n') ? `${i + 1}:` : '') + l)
      }
      return { out: out.length ? out.join('\n') + '\n' : '', err, status: out.length ? 0 : 1 }
    }
    case 'sort': {
      const input = args.length ? args.map(a => readFileContent(state, a).content ?? '').join('') : stdin
      let lines = input.replace(/\n$/, '').split('\n').filter((l, i, arr) => !(arr.length === 1 && l === ''))
      lines.sort(opts.has('n') ? (a, b) => parseFloat(a) - parseFloat(b) : (a, b) => (a < b ? -1 : a > b ? 1 : 0))
      if (opts.has('r')) lines.reverse()
      if (opts.has('u')) lines = lines.filter((l, i) => lines.indexOf(l) === i)
      return { out: lines.length ? lines.join('\n') + '\n' : '', err: '', status: 0 }
    }
    case 'uniq': {
      const input = args.length ? readFileContent(state, args[0]).content ?? '' : stdin
      const lines = input.replace(/\n$/, '').split('\n')
      const out: string[] = []
      let prev: string | null = null, count = 0
      const flush = () => { if (prev !== null) out.push(opts.has('c') ? `${String(count).padStart(7)} ${prev}` : prev) }
      for (const l of lines) { if (l === prev) count++; else { flush(); prev = l; count = 1 } }
      flush()
      return { out: out.join('\n') + '\n', err: '', status: 0 }
    }
    case 'cut': {
      const d = rest.includes('-d') ? rest[rest.indexOf('-d') + 1] : '\t'
      const fIdx = rest.indexOf('-f')
      const fields = fIdx !== -1 ? rest[fIdx + 1].split(',').map(Number) : [1]
      const files = args.filter(a => a !== d && (fIdx === -1 || a !== rest[fIdx + 1]))
      const input = files.length ? files.map(f => readFileContent(state, f).content ?? '').join('') : stdin
      const out = input.replace(/\n$/, '').split('\n').map(l => { const parts = l.split(d); return fields.map(f => parts[f - 1] ?? '').join(d) })
      return { out: out.join('\n') + '\n', err: '', status: 0 }
    }
    case 'tr': {
      if (args.length < 2 && !opts.has('d')) return fail('missing operand')
      const expand = (s: string) => s === 'a-z' ? 'abcdefghijklmnopqrstuvwxyz' : s === 'A-Z' ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : s
      const from = expand(args[0]), to = expand(args[1] ?? '')
      const out = [...stdin].map(ch => { const i = from.indexOf(ch); if (i === -1) return ch; if (opts.has('d')) return ''; return to[Math.min(i, to.length - 1)] ?? ch }).join('')
      return { out, err: '', status: 0 }
    }
    case 'rev': return { out: stdin.replace(/\n$/, '').split('\n').map(l => [...l].reverse().join('')).join('\n') + '\n', err: '', status: 0 }
    case 'basename': return args[0] ? { out: parentOf(resolvePath(state, args[0])).name + '\n', err: '', status: 0 } : fail('missing operand')
    case 'dirname': return args[0] ? { out: parentOf(resolvePath(state, args[0])).parent + '\n', err: '', status: 0 } : fail('missing operand')
    case 'find': {
      const start = args[0] && !args[0].startsWith('-') ? args[0] : '.'
      const nIdx = rest.indexOf('-name')
      const pat = nIdx !== -1 ? rest[nIdx + 1] : null
      const typeIdx = rest.indexOf('-type')
      const type = typeIdx !== -1 ? rest[typeIdx + 1] : null
      const abs = resolvePath(state, start)
      const node = getNode(state, abs)
      if (!node) return fail(`'${start}': No such file or directory`)
      const all: string[] = []
      walk(state, abs, node, all, start.replace(/\/$/, ''))
      const re = pat ? new RegExp('^' + pat.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$') : null
      const out = all.filter(p => {
        const n = getNode(state, resolvePath(state, p))
        if (type === 'f' && n?.type !== 'file') return false
        if (type === 'd' && n?.type !== 'dir') return false
        return !re || re.test(parentOf(p).name || p)
      })
      return { out: out.join('\n') + '\n', err: '', status: 0 }
    }
    default: {
      // Running a script: ./scripts/hello.sh
      if (name.includes('/')) {
        const node = getNode(state, resolvePath(state, name))
        if (!node) return { out: '', err: `bash: ${name}: No such file or directory\n`, status: 127 }
        if (node.type === 'dir') return { out: '', err: `bash: ${name}: Is a directory\n`, status: 126 }
        if (!node.exec) return { out: '', err: `bash: ${name}: Permission denied (try chmod +x ${name})\n`, status: 126 }
        return runScript(state, node.content, emitClear)
      }
      return { out: '', err: `bash: ${name}: command not found\n`, status: 127 }
    }
  }
}

function runScript(state: ShellState, content: string, emitClear: () => void): Result {
  let out = '', err = '', status = 0
  for (const line of content.split('\n')) {
    if (!line.trim() || line.startsWith('#')) continue
    const r = execute(state, line, emitClear, false)
    out += r.out; err += r.err; status = r.status
  }
  return { out, err, status }
}

/** Execute one line of input. Returns combined output; mutates state. */
export function execute(state: ShellState, line: string, emitClear: () => void = () => {}, record = true): Result {
  if (record && line.trim()) state.history.push(line)
  // Split on ; && || at top level (quotes are handled by tokenising each segment).
  const segments: Array<{ op: ';' | '&&' | '||'; text: string }> = []
  let cur = '', q: string | null = null, op: ';' | '&&' | '||' = ';'
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (q) { cur += ch; if (ch === q) q = null; continue }
    if (ch === "'" || ch === '"') { q = ch; cur += ch; continue }
    if (ch === ';') { segments.push({ op, text: cur }); cur = ''; op = ';'; continue }
    if (ch === '&' && line[i + 1] === '&') { segments.push({ op, text: cur }); cur = ''; op = '&&'; i++; continue }
    if (ch === '|' && line[i + 1] === '|') { segments.push({ op, text: cur }); cur = ''; op = '||'; i++; continue }
    cur += ch
  }
  segments.push({ op, text: cur })

  let out = '', err = ''
  for (const seg of segments) {
    if (seg.op === '&&' && state.lastStatus !== 0) continue
    if (seg.op === '||' && state.lastStatus === 0) continue
    if (!seg.text.trim()) continue
    const tokens = tokenize(seg.text, state)
    if ('error' in tokens) { err += `bash: ${tokens.error}\n`; state.lastStatus = 2; continue }
    const { cmds, error } = splitPipeline(tokens)
    if (error) { err += `bash: ${error}\n`; state.lastStatus = 2; continue }
    let stdin = ''
    let last: Result = { out: '', err: '', status: 0 }
    for (const cmd of cmds) {
      last = runCommand(state, cmd, stdin, emitClear)
      if (cmd.stderrTo) { const e = writeFile(state, cmd.stderrTo.path, last.err, cmd.stderrTo.append); last.err = e ? e + '\n' : '' }
      if (cmd.stdoutTo) { const e = writeFile(state, cmd.stdoutTo.path, last.out, cmd.stdoutTo.append); if (e) { last.err += e + '\n'; last.status = 1 } last.out = '' }
      err += last.err
      stdin = last.out
    }
    out += last.out
    state.lastStatus = last.status
  }
  return { out, err, status: state.lastStatus }
}
