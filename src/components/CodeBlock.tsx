'use client'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

// Without this, react-syntax-highlighter puts the default theme's font and line height inline on <code>,
// which overrides the stylesheet and makes the editor caret drift away from the highlighted text.
const CODE_TAG_PROPS = { style: {} }

const LANG_MAP: Record<string, string> = {
  cpp: 'cpp', csharp: 'csharp', javascript: 'javascript', jsx: 'jsx', typescript: 'typescript', tsx: 'tsx', python: 'python', rust: 'rust', go: 'go', java: 'java', c: 'c',
  bash: 'bash', sh: 'bash', shell: 'bash', powershell: 'powershell', html: 'markup', css: 'css', json: 'json', sql: 'sql', ruby: 'ruby', nasm: 'nasm', asm: 'nasm', php: 'php', lua: 'lua', kotlin: 'kotlin', swift: 'swift', text: 'text',
}

const LANG_LABEL: Record<string, string> = {
  javascript: 'JavaScript', jsx: 'JSX', typescript: 'TypeScript', tsx: 'TSX', python: 'Python', rust: 'Rust', go: 'Go', cpp: 'C++', csharp: 'C#', java: 'Java', c: 'C', bash: 'Bash', sh: 'Shell', shell: 'Shell',
  powershell: 'PowerShell', html: 'HTML', css: 'CSS', json: 'JSON', sql: 'SQL', ruby: 'Ruby', nasm: 'x86-64 assembly', asm: 'Assembly', php: 'PHP', lua: 'Lua', kotlin: 'Kotlin', swift: 'Swift', text: 'Text',
}

interface Props {
  code: string
  language?: string
  showLineNumbers?: boolean
}

/** A read-only, themed code block. Colours come from the palette's --syn-* variables (see globals.css). */
export function CodeBlock({ code, language = 'text', showLineNumbers = false }: Props) {
  const [copied, setCopied] = useState(false)
  const lang = LANG_MAP[language] ?? language
  const label = LANG_LABEL[language] ?? language
  const trimmedCode = code.replace(/\n$/, '')
  const lineCount = trimmedCode.split('\n').length
  const numbered = showLineNumbers && lineCount > 1

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trimmedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="sc-codeblock">
      <div className="sc-codeblock-bar">
        <span className="sc-codeblock-label">{label}</span>
        <button type="button" onClick={handleCopy} aria-label={copied ? 'Copied' : 'Copy code'} className={`sc-codeblock-copy ${copied ? 'is-copied' : ''}`}>{copied ? '✓ Copied' : 'Copy'}</button>
      </div>
      <div className="sc-codeblock-body">
        {numbered && (
          <div aria-hidden className="sc-codeblock-gutter">
            {Array.from({ length: lineCount }, (_, i) => <div key={i}>{i + 1}</div>)}
          </div>
        )}
        <div className="sc-codeblock-scroll" tabIndex={0} aria-label={`${label} code`}>
          <SyntaxHighlighter language={lang} useInlineStyles={false} showLineNumbers={false} wrapLongLines={false} PreTag="pre" CodeTag="code" codeTagProps={CODE_TAG_PROPS}>
            {trimmedCode}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  )
}
