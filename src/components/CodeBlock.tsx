'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

const LANG_MAP: Record<string, string> = {
  cpp: 'cpp',
  csharp: 'csharp',
  javascript: 'javascript',
  jsx: 'jsx',
  typescript: 'typescript',
  tsx: 'tsx',
  python: 'python',
  rust: 'rust',
  go: 'go',
  java: 'java',
  c: 'c',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  powershell: 'powershell',
  html: 'markup',
  css: 'css',
  json: 'json',
  sql: 'sql',
  ruby: 'ruby',
  nasm: 'nasm',
  asm: 'nasm',
  text: 'text',
}

const LANG_LABEL: Record<string, string> = {
  javascript: 'JavaScript',
  jsx: 'JSX',
  typescript: 'TypeScript',
  tsx: 'TSX',
  python: 'Python',
  rust: 'Rust',
  go: 'Go',
  cpp: 'C++',
  csharp: 'C#',
  java: 'Java',
  c: 'C',
  bash: 'Bash',
  sh: 'Shell',
  shell: 'Shell',
  powershell: 'PowerShell',
  html: 'HTML',
  css: 'CSS',
  json: 'JSON',
  sql: 'SQL',
  ruby: 'Ruby',
  nasm: 'x86-64 ASM',
  asm: 'ASM',
}

// Shared typographic constants — must match between the line-number column and the pre
const CODE_FONT_SIZE = '0.84rem'
const CODE_LINE_HEIGHT = '1.65'
const CODE_PADDING_V = '1.1rem'
const CODE_PADDING_H = '1.25rem'

interface Props {
  code: string
  language?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, language = 'text', showLineNumbers = false }: Props) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])

  const isDark = mounted ? resolvedTheme === 'dark' : false
  const lang  = LANG_MAP[language] ?? language
  const label = LANG_LABEL[language] ?? null

  const outerBg     = isDark ? '#0d0d15'  : '#f5f7fc'
  const headerBg    = isDark ? '#13131e'  : '#eaecf5'
  const borderColor = isDark ? '#252535'  : '#d4d9e8'
  const numColor    = isDark ? '#2e2e48'  : '#c4c8d8'

  const prismStyle = isDark
    ? {
        ...oneDark,
        'pre[class*="language-"]': {
          ...oneDark['pre[class*="language-"]'],
          background: outerBg,
          borderRadius: 0,
          margin: 0,
          padding: `${CODE_PADDING_V} ${CODE_PADDING_H}`,
          fontSize: CODE_FONT_SIZE,
          lineHeight: CODE_LINE_HEIGHT,
          fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
          border: 'none',
          overflowX: 'auto' as const,
        },
        'code[class*="language-"]': {
          ...oneDark['code[class*="language-"]'],
          fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
          fontSize: CODE_FONT_SIZE,
          lineHeight: CODE_LINE_HEIGHT,
          background: 'none',
        },
      }
    : {
        ...oneLight,
        'pre[class*="language-"]': {
          ...oneLight['pre[class*="language-"]'],
          background: outerBg,
          borderRadius: 0,
          margin: 0,
          padding: `${CODE_PADDING_V} ${CODE_PADDING_H}`,
          fontSize: CODE_FONT_SIZE,
          lineHeight: CODE_LINE_HEIGHT,
          fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
          border: 'none',
          overflowX: 'auto' as const,
        },
        'code[class*="language-"]': {
          ...oneLight['code[class*="language-"]'],
          fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
          fontSize: CODE_FONT_SIZE,
          lineHeight: CODE_LINE_HEIGHT,
          background: 'none',
        },
      }

  // Trim trailing newline that template literals often add
  const trimmedCode = code.replace(/\n$/, '')
  const lineCount   = trimmedCode.split('\n').length
  const numWidth    = `${Math.max(String(lineCount).length, 1) + 0.5}ch`

  return (
    <div
      style={{
        borderRadius: 10,
        overflow: 'hidden',
        border: `1px solid ${borderColor}`,
        background: outerBg,
      }}
    >
      {/* ── Header bar ───────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
          height: 36,
          background: headerBg,
          borderBottom: `1px solid ${borderColor}`,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {['#ff5f57', '#ffbd2e', '#28c840'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.75 }} />
          ))}
        </div>

        {label && (
          <span style={{
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono, monospace)',
            fontWeight: 600,
            color: isDark ? '#484868' : '#9298b0',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            {label}
          </span>
        )}

        <div style={{ width: 42 }} />
      </div>

      {/* ── Code body ────────────────────────────────── */}
      {!mounted ? (
        // SSR skeleton — no theme yet
        <pre style={{
          background: 'var(--card)',
          padding: `${CODE_PADDING_V} ${CODE_PADDING_H}`,
          fontSize: CODE_FONT_SIZE,
          lineHeight: CODE_LINE_HEIGHT,
          overflowX: 'auto',
          fontFamily: 'monospace',
          margin: 0,
          color: 'var(--text)',
        }}>
          <code>{code}</code>
        </pre>
      ) : (
        <div style={{ display: 'flex', overflow: 'hidden' }}>

          {/* ── Line numbers (rendered independently of Prism) ── */}
          {showLineNumbers && (
            <div
              aria-hidden
              style={{
                flexShrink: 0,
                background: outerBg,
                borderRight: `1px solid ${borderColor}`,
                padding: `${CODE_PADDING_V} 0.75rem ${CODE_PADDING_V} ${CODE_PADDING_H}`,
                fontSize: CODE_FONT_SIZE,
                lineHeight: CODE_LINE_HEIGHT,
                fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                color: numColor,
                textAlign: 'right',
                userSelect: 'none',
                minWidth: `calc(${numWidth} + ${CODE_PADDING_H} + 0.75rem)`,
              }}
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i} style={{ lineHeight: CODE_LINE_HEIGHT }}>
                  {i + 1}
                </div>
              ))}
            </div>
          )}

          {/* ── Syntax highlighted code ── */}
          <div style={{ flex: 1, minWidth: 0, overflowX: 'auto' }}>
            <SyntaxHighlighter
              language={lang}
              style={prismStyle}
              showLineNumbers={false}
              wrapLongLines={false}
            >
              {trimmedCode}
            </SyntaxHighlighter>
          </div>

        </div>
      )}
    </div>
  )
}
