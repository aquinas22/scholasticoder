/** Groups used to organise the course list. Every course slug belongs to exactly one group. */
export const COURSE_GROUPS: Array<{ id: string; label: string; blurb: string; slugs: string[] }> = [
  { id: 'start', label: 'Good first languages', blurb: 'Friendly languages to learn programming with.', slugs: ['python', 'javascript', 'typescript', 'ruby', 'lua'] },
  { id: 'web', label: 'Build for the web', blurb: 'Pages, styles, front-end frameworks and servers.', slugs: ['html', 'css', 'tailwind', 'react', 'vue', 'vite', 'nodejs', 'php'] },
  { id: 'tools', label: 'Data and everyday tools', blurb: 'Databases, version control and the command line.', slugs: ['sql', 'git', 'terminal', 'bash', 'powershell'] },
  { id: 'apps', label: 'Apps and systems languages', blurb: 'Compiled languages for apps, services and performance.', slugs: ['go', 'rust', 'java', 'kotlin', 'swift', 'csharp', 'cpp', 'c'] },
  { id: 'cs', label: 'How computers work', blurb: 'The ideas underneath every program.', slugs: ['dsa', 'internet', 'computer-architecture', 'operating-systems', 'compilers', 'asm'] },
]

export function groupOf(slug: string): string | undefined {
  return COURSE_GROUPS.find(g => g.slugs.includes(slug))?.id
}
