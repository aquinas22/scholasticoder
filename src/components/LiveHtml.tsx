'use client'
import { useState } from 'react'
import { CodeEditor } from './CodeEditor'

interface Props { code: string; language?: 'html' | 'css'; title?: string }

const CSS_SCAFFOLD = `<main>
  <h1>Heading</h1>
  <p>A paragraph with a <a href="#">link</a> and <strong>bold text</strong>.</p>
  <button>Button</button>
  <div class="box card container">.box .card .container</div>
  <ul><li>List item one</li><li>List item two</li></ul>
</main>`

/** Editable HTML/CSS with a sandboxed live preview. */
export function LiveHtml({ code, language = 'html', title }: Props) {
  const [source, setSource] = useState(code)
  const [showPreview, setShowPreview] = useState(false)
  const doc = language === 'css'
    ? `<!doctype html><html><head><style>body{font-family:system-ui;padding:1rem;margin:0}${source}</style></head><body>${CSS_SCAFFOLD}</body></html>`
    : /<html[\s>]/i.test(source) ? source : `<!doctype html><html><head><style>body{font-family:system-ui;padding:1rem;margin:0}</style></head><body>${source}</body></html>`
  return (
    <section className="sc-lab sc-lab-compact" aria-label={title ?? 'Live HTML'}>
      <CodeEditor value={source} onChange={setSource} language={language} minLines={3} onRun={() => setShowPreview(true)} />
      <div className="sc-lab-toolbar">
        <div className="sc-lab-actions">
          <button type="button" className="sc-btn sc-btn-run" onClick={() => setShowPreview(true)}>▶ Preview</button>
          {showPreview && <button type="button" className="sc-btn sc-btn-ghost" onClick={() => setShowPreview(false)}>Hide preview</button>}
          <button type="button" className="sc-btn sc-btn-ghost" onClick={() => setSource(code)}>↺ Reset</button>
        </div>
        <span className="sc-lab-status is-ready">{language === 'css' ? 'CSS on a sample page' : 'Sandboxed page'}</span>
      </div>
      {showPreview && (
        <div className="sc-preview">
          <div className="sc-output-bar"><span>Preview</span><span className="sc-output-meta">updates live</span></div>
          <iframe title="Preview" sandbox="allow-scripts" srcDoc={doc} />
        </div>
      )}
    </section>
  )
}
