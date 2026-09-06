/* ScholastiCoder Python worker — runs CPython (Pyodide) off the main thread.
 * Protocol (main → worker):  { type: 'init' } | { type: 'run', id, code, stdin, tests? }
 * Protocol (worker → main):  { type: 'status', text } | { type: 'ready', version }
 *                            { type: 'stdout' | 'stderr', id, text } | { type: 'done', id, ok, error?, tests?, ms }
 */
const PYODIDE_VERSION = '0.28.3'
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

let pyodide = null
let currentId = null
const decoder = new TextDecoder()

function post(msg) { self.postMessage(msg) }

async function init() {
  post({ type: 'status', text: 'Downloading Python runtime…' })
  importScripts(INDEX_URL + 'pyodide.js')
  pyodide = await loadPyodide({ indexURL: INDEX_URL })
  pyodide.setStdout({ write: buf => { post({ type: 'stdout', id: currentId, text: decoder.decode(buf) }); return buf.length } })
  pyodide.setStderr({ write: buf => { post({ type: 'stderr', id: currentId, text: decoder.decode(buf) }); return buf.length } })
  // Helper module used by the run loop: fresh namespaces, stdin, clean tracebacks, test harness.
  pyodide.runPython(`
import sys, io, traceback, json, builtins

def _sc_namespace():
    return {"__name__": "__main__", "__builtins__": builtins}

def _sc_set_stdin(text):
    sys.stdin = io.StringIO(text if text else "")

async def _sc_exec(code, ns):
    """Run learner code; return a traceback string trimmed to the learner's own frames, or None."""
    from pyodide.code import eval_code_async
    try:
        await eval_code_async(code, ns, filename='<your code>')
    except SystemExit as e:
        if e.code not in (None, 0):
            return f"SystemExit: {e.code}"
        return None
    except BaseException as e:
        tb = e.__traceback__
        while tb is not None and tb.tb_frame.f_code.co_filename != '<your code>':
            tb = tb.tb_next
        return ''.join(traceback.format_exception(type(e), e, tb))
    return None

def _sc_run_tests(ns, tests_json, captured, src):
    tests = json.loads(tests_json)
    results = []
    ns['_out'] = captured
    ns['_src'] = src
    for t in tests:
        try:
            exec(t['check'], ns)
            results.append({"name": t['name'], "passed": True, "message": ""})
        except AssertionError as e:
            results.append({"name": t['name'], "passed": False, "message": str(e) or "Assertion failed"})
        except Exception as e:
            results.append({"name": t['name'], "passed": False, "message": type(e).__name__ + ": " + str(e)})
    return json.dumps(results)
`)
  const version = pyodide.runPython('import sys; f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"')
  post({ type: 'ready', version })
}

// `asyncio.run(main())` cannot block inside the browser event loop; rewrite it to a top-level await.
function rewriteAsyncioRun(code) {
  return code.replace(/^(\s*)asyncio\.run\((.*)\)\s*$/gm, '$1await $2')
}

async function run({ id, code, stdin, tests }) {
  currentId = id
  const started = performance.now()
  let ns = null
  let captured = ''
  const stdoutCapture = tests ? (text => { captured += text }) : null
  if (stdoutCapture) {
    pyodide.setStdout({ write: buf => { const t = decoder.decode(buf); captured += t; post({ type: 'stdout', id, text: t }); return buf.length } })
  }
  try {
    pyodide.runPython('_sc_set_stdin')(stdin || '')
    try {
      await pyodide.loadPackagesFromImports(code, { messageCallback: m => post({ type: 'status', id, text: m }) })
    } catch (e) {
      // Missing packages surface as ImportError from the user's code below.
    }
    ns = pyodide.runPython('_sc_namespace')()
    const tracebackText = await pyodide.runPython('_sc_exec')(rewriteAsyncioRun(code), ns)
    if (tracebackText) {
      let testResults
      if (tests) testResults = tests.map(t => ({ name: t.name, passed: false, message: 'Your code raised an error before this check could run.' }))
      post({ type: 'done', id, ok: false, error: String(tracebackText).trim(), tests: testResults, ms: Math.round(performance.now() - started) })
      return
    }
    let testResults
    if (tests) {
      const raw = pyodide.runPython('_sc_run_tests')(ns, JSON.stringify(tests), captured, code)
      testResults = JSON.parse(raw)
    }
    post({ type: 'done', id, ok: true, tests: testResults, ms: Math.round(performance.now() - started) })
  } catch (err) {
    let text = String(err && err.message ? err.message : err)
    text = cleanTraceback(text)
    let testResults
    if (tests) testResults = tests.map(t => ({ name: t.name, passed: false, message: 'Your code raised an error before this check could run.' }))
    post({ type: 'done', id, ok: false, error: text, tests: testResults, ms: Math.round(performance.now() - started) })
  } finally {
    if (stdoutCapture) {
      pyodide.setStdout({ write: buf => { post({ type: 'stdout', id: currentId, text: decoder.decode(buf) }); return buf.length } })
    }
    if (ns) try { ns.destroy() } catch (_) {}
    currentId = null
  }
}

function cleanTraceback(text) {
  const lines = text.split('\n')
  const out = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/^\s+File "[^"]*(_pyodide|\/lib\/python3[^"]*\/(asyncio|concurrent)\/)[^"]*"/.test(line)) {
      // Skip the frame line and its source line.
      if (lines[i + 1] && /^\s{4,}\S/.test(lines[i + 1]) && !/^\s+File "/.test(lines[i + 1])) i++
      continue
    }
    out.push(line)
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

self.onmessage = async event => {
  const msg = event.data
  if (msg.type === 'init') {
    try { await init() } catch (err) { post({ type: 'fatal', error: String(err && err.message ? err.message : err) }) }
  } else if (msg.type === 'run') {
    if (!pyodide) { post({ type: 'done', id: msg.id, ok: false, error: 'Python runtime is not ready yet.', ms: 0 }); return }
    await run(msg)
  }
}
