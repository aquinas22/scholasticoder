/** Colour palettes. Every token is a CSS custom property applied on <html data-palette="…">. */
export interface Palette {
  id: string
  name: string
  group: 'scriptorium' | 'editor'
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
    id: 'scriptorium', name: 'Scriptorium', group: 'scriptorium', dark: true, note: 'Candlelit ink on dark vellum. The default.',
    vars: {
      '--bg': '#171611', '--surface': '#201f19', '--card': '#2a2820', '--border': '#3d392d', '--text': '#eee6d5', '--text-muted': '#aaa18f',
      '--accent': '#86df3d', '--accent-secondary': '#9cab83', '--on-accent': '#14170e', '--rubric': '#d9563b', '--gold': '#d5a94a',
      '--code-bg': '#12110d', '--code-head': '#1b1a14', '--code-border': '#33302a', '--code-gutter': '#4a463b', '--code-text': '#ece4d2',
      ...syntax({ comment: '#7d7663', keyword: '#e0a65c', string: '#b9cf6d', number: '#e5c07b', fn: '#8fc6e8', cls: '#e6b96a', op: '#d7cfbb', punct: '#a39c8a', builtin: '#c9a4e0', attr: '#b9cf6d' }),
    },
  },
  {
    id: 'vellum', name: 'Vellum', group: 'scriptorium', dark: false, note: 'Parchment, iron-gall ink and a red rubric.',
    vars: {
      '--bg': '#f3eddf', '--surface': '#fffaf0', '--card': '#e9dfcc', '--border': '#d2c3aa', '--text': '#211f1a', '--text-muted': '#756d60',
      '--accent': '#a44325', '--accent-secondary': '#68765a', '--on-accent': '#fff8ee', '--rubric': '#a44325', '--gold': '#a8842b',
      '--code-bg': '#fbf6ea', '--code-head': '#efe6d3', '--code-border': '#d8cbb1', '--code-gutter': '#b9ab90', '--code-text': '#2a2620',
      ...syntax({ comment: '#8d8371', keyword: '#8a3a1c', string: '#4d6b2a', number: '#8c5a12', fn: '#1f5f8b', cls: '#7a4b12', op: '#4e463a', punct: '#7b7262', builtin: '#6b3f8f', attr: '#4d6b2a' }),
    },
  },
  {
    id: 'illuminated', name: 'Illuminated', group: 'scriptorium', dark: false, note: 'Gold leaf and lapis on cream, like a Book of Hours.',
    vars: {
      '--bg': '#f6efe0', '--surface': '#fdf8ec', '--card': '#efe4cc', '--border': '#d9c69e', '--text': '#1f1b26', '--text-muted': '#6d6273',
      '--accent': '#1f4e9e', '--accent-secondary': '#a8842b', '--on-accent': '#fff8ee', '--rubric': '#b0321f', '--gold': '#b9922e',
      '--code-bg': '#fbf5e6', '--code-head': '#f1e7cf', '--code-border': '#dccaa3', '--code-gutter': '#b7a67e', '--code-text': '#26212e',
      ...syntax({ comment: '#8f8577', keyword: '#1f4e9e', string: '#5c6f1f', number: '#a0641a', fn: '#7b2f8e', cls: '#9b6a12', op: '#4a4350', punct: '#7d7486', builtin: '#b0321f', attr: '#5c6f1f' }),
    },
  },
  {
    id: 'vespers', name: 'Vespers', group: 'scriptorium', dark: true, note: 'Violet dusk, liturgical purple and gold.',
    vars: {
      '--bg': '#14111c', '--surface': '#1c1826', '--card': '#272032', '--border': '#3c324c', '--text': '#eee7f4', '--text-muted': '#a99fb8',
      '--accent': '#d8b25a', '--accent-secondary': '#9d7fd1', '--on-accent': '#1a1408', '--rubric': '#e0645a', '--gold': '#d8b25a',
      '--code-bg': '#100d17', '--code-head': '#18131f', '--code-border': '#302740', '--code-gutter': '#4b4060', '--code-text': '#ece6f2',
      ...syntax({ comment: '#7a6f8c', keyword: '#c497f0', string: '#d8b25a', number: '#f0a56c', fn: '#7fc8e6', cls: '#f2c98a', op: '#d2cbe0', punct: '#9a90ad', builtin: '#e58cb0', attr: '#d8b25a' }),
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

export const DEFAULT_PALETTE = 'scriptorium'
export const PALETTE_KEY = 'scholasticoder_palette'

export function getPalette(id: string | null | undefined): Palette {
  return palettes.find(p => p.id === id) ?? palettes[0]
}

/** CSS for every palette, generated once at build time and inlined in the layout. */
export function paletteCss(): string {
  return palettes.map(p => `html[data-palette="${p.id}"]{${Object.entries(p.vars).map(([k, v]) => `${k}:${v}`).join(';')}}`).join('\n')
}

/** Runs before hydration so the chosen palette paints first. */
export const paletteBootScript = `(function(){try{var p=localStorage.getItem('${PALETTE_KEY}');var d=${JSON.stringify(Object.fromEntries(palettes.map(p => [p.id, p.dark])))};if(!p||!(p in d))p='${DEFAULT_PALETTE}';var h=document.documentElement;h.setAttribute('data-palette',p);h.classList.toggle('dark',d[p]);h.classList.toggle('light',!d[p]);h.style.colorScheme=d[p]?'dark':'light';}catch(e){}})();`
