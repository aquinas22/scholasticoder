/** Colour palettes. Every token is a CSS custom property applied on <html data-palette="…">. */
export interface Palette {
  id: string
  name: string
  group: 'default' | 'editor'
  dark: boolean
  /** Short flavour text shown in the picker. */
  note: string
  vars: Record<string, string>
}

const syntax = (o: { comment: string; keyword: string; string: string; number: string; fn: string; cls: string; op: string; punct: string; builtin: string; attr: string }) => ({
  '--syn-comment': o.comment, '--syn-keyword': o.keyword, '--syn-string': o.string, '--syn-number': o.number,
  '--syn-function': o.fn, '--syn-class': o.cls, '--syn-operator': o.op, '--syn-punct': o.punct, '--syn-builtin': o.builtin, '--syn-attr': o.attr,
})

export const palettes: Palette[] = [
  {
    id: 'light', name: 'Light', group: 'default', dark: false, note: 'Clean and calm. Easy on the eyes in daylight.',
    vars: {
      '--bg': '#fafaf8', '--surface': '#ffffff', '--card': '#f2f2ef', '--border': '#e2e1dc', '--text': '#1d1c1a', '--text-muted': '#5d5a54',
      '--accent': '#1d6b50', '--accent-secondary': '#3a7ca5', '--on-accent': '#ffffff', '--rubric': '#b0452a', '--gold': '#95650c',
      '--code-bg': '#f6f6f3', '--code-head': '#eeeeea', '--code-border': '#e2e1dc', '--code-gutter': '#9d9a93', '--code-text': '#1d1c1a',
      ...syntax({ comment: '#6f7278', keyword: '#a3336b', string: '#1f6b3a', number: '#9a5a00', fn: '#2458a6', cls: '#8a4b08', op: '#3d3b37', punct: '#5d5a54', builtin: '#6b3fa0', attr: '#1f6b3a' }),
    },
  },
  {
    id: 'dark', name: 'Dark', group: 'default', dark: true, note: 'Soft contrast for evenings and long sessions.',
    vars: {
      '--bg': '#131312', '--surface': '#1a1a19', '--card': '#222220', '--border': '#32312e', '--text': '#ecebe6', '--text-muted': '#a8a59d',
      '--accent': '#5cc49a', '--accent-secondary': '#7fb3d9', '--on-accent': '#0b1f17', '--rubric': '#e8845f', '--gold': '#e0b457',
      '--code-bg': '#0f0f0e', '--code-head': '#181817', '--code-border': '#2a2927', '--code-gutter': '#5f5d58', '--code-text': '#e6e4de',
      ...syntax({ comment: '#8a877f', keyword: '#e39bc4', string: '#9fd08a', number: '#f0b877', fn: '#86b9ec', cls: '#e8c47c', op: '#d6d3cb', punct: '#a8a59d', builtin: '#c3a3ea', attr: '#9fd08a' }),
    },
  },
  {
    id: 'gruvbox-dark', name: 'Gruvbox Dark', group: 'editor', dark: true, note: 'Retro groove, warm and low-contrast.',
    vars: {
      '--bg': '#282828', '--surface': '#32302f', '--card': '#3c3836', '--border': '#504945', '--text': '#ebdbb2', '--text-muted': '#a89984',
      '--accent': '#fabd2f', '--accent-secondary': '#b8bb26', '--on-accent': '#1d2021', '--rubric': '#fb4934', '--gold': '#fabd2f',
      '--code-bg': '#1d2021', '--code-head': '#282828', '--code-border': '#3c3836', '--code-gutter': '#665c54', '--code-text': '#ebdbb2',
      ...syntax({ comment: '#928374', keyword: '#fb4934', string: '#b8bb26', number: '#d3869b', fn: '#fabd2f', cls: '#8ec07c', op: '#ebdbb2', punct: '#a89984', builtin: '#fe8019', attr: '#b8bb26' }),
    },
  },
  {
    id: 'gruvbox-light', name: 'Gruvbox Light', group: 'editor', dark: false, note: 'The same groove on paper.',
    vars: {
      '--bg': '#fbf1c7', '--surface': '#f9f5d7', '--card': '#ebdbb2', '--border': '#d5c4a1', '--text': '#3c3836', '--text-muted': '#7c6f64',
      '--accent': '#b57614', '--accent-secondary': '#79740e', '--on-accent': '#fbf1c7', '--rubric': '#9d0006', '--gold': '#b57614',
      '--code-bg': '#f9f5d7', '--code-head': '#ebdbb2', '--code-border': '#d5c4a1', '--code-gutter': '#a89984', '--code-text': '#3c3836',
      ...syntax({ comment: '#928374', keyword: '#9d0006', string: '#79740e', number: '#8f3f71', fn: '#b57614', cls: '#427b58', op: '#3c3836', punct: '#7c6f64', builtin: '#af3a03', attr: '#79740e' }),
    },
  },
  {
    id: 'tokyo-night', name: 'Tokyo Night', group: 'editor', dark: true, note: 'Neon on a rainy blue night.',
    vars: {
      '--bg': '#1a1b26', '--surface': '#1f2335', '--card': '#24283b', '--border': '#3b4261', '--text': '#c0caf5', '--text-muted': '#8189b3',
      '--accent': '#7aa2f7', '--accent-secondary': '#bb9af7', '--on-accent': '#15161e', '--rubric': '#f7768e', '--gold': '#e0af68',
      '--code-bg': '#16161e', '--code-head': '#1a1b26', '--code-border': '#292e42', '--code-gutter': '#3b4261', '--code-text': '#c0caf5',
      ...syntax({ comment: '#565f89', keyword: '#bb9af7', string: '#9ece6a', number: '#ff9e64', fn: '#7aa2f7', cls: '#2ac3de', op: '#89ddff', punct: '#a9b1d6', builtin: '#f7768e', attr: '#73daca' }),
    },
  },
  {
    id: 'catppuccin-mocha', name: 'Catppuccin Mocha', group: 'editor', dark: true, note: 'Soothing pastels on a dark roast.',
    vars: {
      '--bg': '#1e1e2e', '--surface': '#242438', '--card': '#313244', '--border': '#45475a', '--text': '#cdd6f4', '--text-muted': '#a6adc8',
      '--accent': '#cba6f7', '--accent-secondary': '#94e2d5', '--on-accent': '#1e1e2e', '--rubric': '#f38ba8', '--gold': '#f9e2af',
      '--code-bg': '#181825', '--code-head': '#1e1e2e', '--code-border': '#313244', '--code-gutter': '#585b70', '--code-text': '#cdd6f4',
      ...syntax({ comment: '#6c7086', keyword: '#cba6f7', string: '#a6e3a1', number: '#fab387', fn: '#89b4fa', cls: '#f9e2af', op: '#89dceb', punct: '#9399b2', builtin: '#f38ba8', attr: '#94e2d5' }),
    },
  },
  {
    id: 'catppuccin-latte', name: 'Catppuccin Latte', group: 'editor', dark: false, note: 'The pastel set, in daylight.',
    vars: {
      '--bg': '#eff1f5', '--surface': '#f7f8fb', '--card': '#e6e9ef', '--border': '#ccd0da', '--text': '#4c4f69', '--text-muted': '#6c6f85',
      '--accent': '#8839ef', '--accent-secondary': '#179299', '--on-accent': '#ffffff', '--rubric': '#d20f39', '--gold': '#df8e1d',
      '--code-bg': '#f7f8fb', '--code-head': '#e6e9ef', '--code-border': '#ccd0da', '--code-gutter': '#9ca0b0', '--code-text': '#4c4f69',
      ...syntax({ comment: '#9ca0b0', keyword: '#8839ef', string: '#40a02b', number: '#fe640b', fn: '#1e66f5', cls: '#df8e1d', op: '#04a5e5', punct: '#7c7f93', builtin: '#d20f39', attr: '#179299' }),
    },
  },
  {
    id: 'nord', name: 'Nord', group: 'editor', dark: true, note: 'Arctic, bluish, calm.',
    vars: {
      '--bg': '#2e3440', '--surface': '#353b49', '--card': '#3b4252', '--border': '#4c566a', '--text': '#eceff4', '--text-muted': '#a3adc2',
      '--accent': '#88c0d0', '--accent-secondary': '#a3be8c', '--on-accent': '#2e3440', '--rubric': '#bf616a', '--gold': '#ebcb8b',
      '--code-bg': '#282d38', '--code-head': '#2e3440', '--code-border': '#3b4252', '--code-gutter': '#616e88', '--code-text': '#d8dee9',
      ...syntax({ comment: '#616e88', keyword: '#81a1c1', string: '#a3be8c', number: '#b48ead', fn: '#88c0d0', cls: '#8fbcbb', op: '#81a1c1', punct: '#d8dee9', builtin: '#d08770', attr: '#8fbcbb' }),
    },
  },
  {
    id: 'dracula', name: 'Dracula', group: 'editor', dark: true, note: 'Purple and pink on a moonless night.',
    vars: {
      '--bg': '#282a36', '--surface': '#2e3040', '--card': '#343746', '--border': '#44475a', '--text': '#f8f8f2', '--text-muted': '#a8abbe',
      '--accent': '#bd93f9', '--accent-secondary': '#8be9fd', '--on-accent': '#1e1f29', '--rubric': '#ff5555', '--gold': '#f1fa8c',
      '--code-bg': '#21222c', '--code-head': '#282a36', '--code-border': '#383a4a', '--code-gutter': '#6272a4', '--code-text': '#f8f8f2',
      ...syntax({ comment: '#6272a4', keyword: '#ff79c6', string: '#f1fa8c', number: '#bd93f9', fn: '#50fa7b', cls: '#8be9fd', op: '#ff79c6', punct: '#f8f8f2', builtin: '#ffb86c', attr: '#50fa7b' }),
    },
  },
  {
    id: 'solarized-dark', name: 'Solarized Dark', group: 'editor', dark: true, note: 'Precision colours, carefully balanced.',
    vars: {
      '--bg': '#002b36', '--surface': '#073642', '--card': '#0a3d4a', '--border': '#1f4f5c', '--text': '#eee8d5', '--text-muted': '#93a1a1',
      '--accent': '#b58900', '--accent-secondary': '#2aa198', '--on-accent': '#002b36', '--rubric': '#dc322f', '--gold': '#b58900',
      '--code-bg': '#00232c', '--code-head': '#002b36', '--code-border': '#0e3c48', '--code-gutter': '#586e75', '--code-text': '#eee8d5',
      ...syntax({ comment: '#586e75', keyword: '#859900', string: '#2aa198', number: '#d33682', fn: '#268bd2', cls: '#b58900', op: '#93a1a1', punct: '#839496', builtin: '#cb4b16', attr: '#2aa198' }),
    },
  },
  {
    id: 'solarized-light', name: 'Solarized Light', group: 'editor', dark: false, note: 'The same palette on parchment.',
    vars: {
      '--bg': '#fdf6e3', '--surface': '#fffbf0', '--card': '#eee8d5', '--border': '#d6cdb3', '--text': '#073642', '--text-muted': '#657b83',
      '--accent': '#b58900', '--accent-secondary': '#2aa198', '--on-accent': '#fdf6e3', '--rubric': '#dc322f', '--gold': '#b58900',
      '--code-bg': '#fffbf0', '--code-head': '#eee8d5', '--code-border': '#d6cdb3', '--code-gutter': '#93a1a1', '--code-text': '#073642',
      ...syntax({ comment: '#93a1a1', keyword: '#859900', string: '#2aa198', number: '#d33682', fn: '#268bd2', cls: '#b58900', op: '#586e75', punct: '#657b83', builtin: '#cb4b16', attr: '#2aa198' }),
    },
  },
  {
    id: 'one-dark', name: 'One Dark', group: 'editor', dark: true, note: 'The Atom classic.',
    vars: {
      '--bg': '#282c34', '--surface': '#2c313a', '--card': '#353b45', '--border': '#3e4451', '--text': '#dcdfe4', '--text-muted': '#9da5b4',
      '--accent': '#61afef', '--accent-secondary': '#98c379', '--on-accent': '#1b1f24', '--rubric': '#e06c75', '--gold': '#e5c07b',
      '--code-bg': '#21252b', '--code-head': '#282c34', '--code-border': '#3e4451', '--code-gutter': '#5c6370', '--code-text': '#abb2bf',
      ...syntax({ comment: '#5c6370', keyword: '#c678dd', string: '#98c379', number: '#d19a66', fn: '#61afef', cls: '#e5c07b', op: '#56b6c2', punct: '#abb2bf', builtin: '#e06c75', attr: '#d19a66' }),
    },
  },
  {
    id: 'rose-pine', name: 'Rosé Pine', group: 'editor', dark: true, note: 'Soho vibes for the classy minimalist.',
    vars: {
      '--bg': '#191724', '--surface': '#1f1d2e', '--card': '#26233a', '--border': '#403d52', '--text': '#e0def4', '--text-muted': '#908caa',
      '--accent': '#ebbcba', '--accent-secondary': '#9ccfd8', '--on-accent': '#191724', '--rubric': '#eb6f92', '--gold': '#f6c177',
      '--code-bg': '#16141f', '--code-head': '#191724', '--code-border': '#26233a', '--code-gutter': '#6e6a86', '--code-text': '#e0def4',
      ...syntax({ comment: '#6e6a86', keyword: '#31748f', string: '#f6c177', number: '#ebbcba', fn: '#ebbcba', cls: '#9ccfd8', op: '#908caa', punct: '#908caa', builtin: '#eb6f92', attr: '#c4a7e7' }),
    },
  },
  {
    id: 'monokai', name: 'Monokai', group: 'editor', dark: true, note: 'The Sublime original.',
    vars: {
      '--bg': '#272822', '--surface': '#2d2e27', '--card': '#3e3d32', '--border': '#49483e', '--text': '#f8f8f2', '--text-muted': '#a59f85',
      '--accent': '#a6e22e', '--accent-secondary': '#66d9ef', '--on-accent': '#1e1f1a', '--rubric': '#f92672', '--gold': '#e6db74',
      '--code-bg': '#1e1f1c', '--code-head': '#272822', '--code-border': '#3e3d32', '--code-gutter': '#75715e', '--code-text': '#f8f8f2',
      ...syntax({ comment: '#75715e', keyword: '#f92672', string: '#e6db74', number: '#ae81ff', fn: '#a6e22e', cls: '#66d9ef', op: '#f92672', punct: '#f8f8f2', builtin: '#fd971f', attr: '#a6e22e' }),
    },
  },
  {
    id: 'github-light', name: 'GitHub Light', group: 'editor', dark: false, note: 'Clean, familiar, bright.',
    vars: {
      '--bg': '#ffffff', '--surface': '#f6f8fa', '--card': '#eaeef2', '--border': '#d0d7de', '--text': '#1f2328', '--text-muted': '#656d76',
      '--accent': '#0969da', '--accent-secondary': '#1a7f37', '--on-accent': '#ffffff', '--rubric': '#cf222e', '--gold': '#9a6700',
      '--code-bg': '#f6f8fa', '--code-head': '#eaeef2', '--code-border': '#d0d7de', '--code-gutter': '#8c959f', '--code-text': '#1f2328',
      ...syntax({ comment: '#6e7781', keyword: '#cf222e', string: '#0a3069', number: '#0550ae', fn: '#8250df', cls: '#953800', op: '#0550ae', punct: '#24292f', builtin: '#116329', attr: '#0550ae' }),
    },
  },
]

export const DEFAULT_PALETTE = 'dark'
/** Stored value meaning "follow the operating system's light/dark setting". Also used when nothing is stored. */
export const AUTO_PALETTE = 'auto'
/** Palette ids from earlier versions of the site, mapped to their closest current palette. */
const LEGACY: Record<string, string> = { scriptorium: 'dark', vespers: 'dark', vellum: 'light', illuminated: 'light' }

export function systemPalette(): string {
  try { return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark' } catch { return DEFAULT_PALETTE }
}

/** Turns a stored choice (a palette id, 'auto', a legacy id or nothing) into a palette id. */
export function resolvePalette(stored: string | null | undefined): string {
  if (!stored || stored === AUTO_PALETTE) return systemPalette()
  const id = LEGACY[stored] ?? stored
  return palettes.some(p => p.id === id) ? id : systemPalette()
}
export const PALETTE_KEY = 'scholasticoder_palette'

export function getPalette(id: string | null | undefined): Palette {
  return palettes.find(p => p.id === id) ?? palettes[0]
}

/** CSS for every palette, generated once at build time and inlined in the layout. */
export function paletteCss(): string {
  return palettes.map(p => `html[data-palette="${p.id}"]{${Object.entries(p.vars).map(([k, v]) => `${k}:${v}`).join(';')}}`).join('\n')
}

/** Runs before hydration so the chosen palette paints first. */
export const paletteBootScript = `(function(){try{var d=${JSON.stringify(Object.fromEntries(palettes.map(p => [p.id, p.dark])))};var l=${JSON.stringify(LEGACY)};var p=null;try{p=localStorage.getItem('${PALETTE_KEY}')}catch(e){}if(p&&l[p])p=l[p];if(!p||!(p in d))p=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';var h=document.documentElement;h.setAttribute('data-palette',p);h.classList.toggle('dark',d[p]);h.classList.toggle('light',!d[p]);h.style.colorScheme=d[p]?'dark':'light';}catch(e){}})();`
