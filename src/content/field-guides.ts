export interface FieldGuide {
  practicalUses: string[]
  projectIdeas: string[]
  ecosystem: string[]
  popularSoftware: string[]
}

export const fieldGuides: Record<string, FieldGuide> = {
  python: {
    practicalUses: ['Automate files, spreadsheets, and repetitive office work', 'Build APIs, web backends, and internal tools', 'Analyze data and train machine-learning models', 'Write scientific simulations and test infrastructure'],
    projectIdeas: ['CLI habit tracker', 'CSV expense analyzer', 'FastAPI book catalog', 'Image classifier with a small web UI'],
    ecosystem: ['Django', 'FastAPI', 'Flask', 'pandas', 'NumPy', 'PyTorch', 'pytest', 'Ruff'],
    popularSoftware: ['Instagram', 'Dropbox', 'Blender', 'Ansible', 'Jupyter', 'Calibre'],
  },
  javascript: {
    practicalUses: ['Create interactive browser experiences', 'Build full-stack web applications', 'Automate browsers and workflow scripts', 'Develop desktop and mobile apps with web technology'],
    projectIdeas: ['Pomodoro timer', 'Weather dashboard', 'Collaborative kanban board', 'Offline-first personal finance PWA'],
    ecosystem: ['npm', 'Express', 'Next.js', 'Vite', 'Vitest', 'Playwright', 'Electron', 'React Native'],
    popularSoftware: ['Discord', 'Slack', 'Visual Studio Code', 'Notion', 'Figma web app', 'Postman'],
  },
  typescript: {
    practicalUses: ['Build large web applications with safer refactoring', 'Create typed APIs and backend services', 'Publish reliable JavaScript libraries', 'Share domain models across frontend and backend'],
    projectIdeas: ['Typed budgeting app', 'REST client SDK', 'Realtime team chat', 'Type-safe full-stack issue tracker'],
    ecosystem: ['TypeScript ESLint', 'Zod', 'tRPC', 'NestJS', 'Prisma', 'Vitest', 'Playwright', 'tsup'],
    popularSoftware: ['Visual Studio Code', 'Slack', 'Notion', 'Linear', 'Deno', 'Angular'],
  },
  react: {
    practicalUses: ['Build component-based web interfaces', 'Create dashboards and admin systems', 'Power server-rendered and static sites', 'Share UI concepts with native mobile apps'],
    projectIdeas: ['Recipe organizer', 'Accessible component library', 'Analytics dashboard', 'Realtime collaborative editor'],
    ecosystem: ['Next.js', 'React Router', 'TanStack Query', 'Zustand', 'Redux Toolkit', 'Storybook', 'Testing Library', 'React Hook Form'],
    popularSoftware: ['Facebook', 'Instagram', 'Netflix', 'Airbnb', 'Shopify Admin', 'Discord'],
  },
  vue: {
    practicalUses: ['Add interactivity progressively to existing pages', 'Build single-page applications', 'Create server-rendered sites with Nuxt', 'Develop dashboards and content tools'],
    projectIdeas: ['Reading list', 'Markdown knowledge base', 'Inventory dashboard', 'Nuxt storefront'],
    ecosystem: ['Nuxt', 'Pinia', 'Vue Router', 'VueUse', 'Vitest', 'Vue Test Utils', 'Vuetify', 'Vite'],
    popularSoftware: ['GitLab', 'Laravel Forge', 'Statamic', 'PageKit', 'Vue Storefront', 'Font Awesome site'],
  },
  nodejs: {
    practicalUses: ['Serve APIs and realtime applications', 'Build command-line developer tools', 'Process queues, uploads, and webhooks', 'Run JavaScript automation and build systems'],
    projectIdeas: ['File-renaming CLI', 'Webhook inspector', 'WebSocket chat server', 'Background job processing service'],
    ecosystem: ['Express', 'Fastify', 'NestJS', 'Prisma', 'Socket.IO', 'BullMQ', 'Pino', 'Commander.js'],
    popularSoftware: ['npm', 'Ghost', 'Strapi', 'Directus', 'Webpack', 'Prettier'],
  },
  html: {
    practicalUses: ['Structure every website and web application', 'Create accessible documents and forms', 'Build email templates', 'Describe content for browsers, readers, and search engines'],
    projectIdeas: ['Semantic personal profile', 'Accessible restaurant menu', 'Multi-page documentation site', 'Validated checkout form'],
    ecosystem: ['HTML Validator', 'Emmet', 'Prettier', 'axe DevTools', 'Lighthouse', 'htmx', 'Alpine.js', 'Nunjucks'],
    popularSoftware: ['Every public website', 'Wikipedia', 'MDN Web Docs', 'GOV.UK', 'GitHub Pages', 'HTML email'],
  },
  css: {
    practicalUses: ['Design responsive page layouts', 'Create reusable design systems', 'Animate interfaces without JavaScript', 'Adapt experiences for print, motion, and accessibility preferences'],
    projectIdeas: ['Responsive article layout', 'Themeable component set', 'Pure-CSS illustration', 'Documentation design system'],
    ecosystem: ['Sass', 'PostCSS', 'CSS Modules', 'Stylelint', 'Autoprefixer', 'Lightning CSS', 'Open Props', 'PurgeCSS'],
    popularSoftware: ['Bootstrap', 'GitHub Primer', 'Google Material Design', 'Pico CSS', 'Bulma', 'Normalize.css'],
  },
  tailwind: {
    practicalUses: ['Prototype polished interfaces quickly', 'Enforce consistent design tokens', 'Build responsive component libraries', 'Style application UIs close to their markup'],
    projectIdeas: ['Pricing page', 'Responsive admin shell', 'Reusable marketing sections', 'Themeable SaaS dashboard'],
    ecosystem: ['Headless UI', 'Heroicons', 'daisyUI', 'shadcn/ui', 'Prettier plugin', 'Typography plugin', 'Forms plugin', 'Container Queries'],
    popularSoftware: ['Tailwind UI', 'Laravel Jetstream', 'Refactoring UI site', 'Syntax', 'Transistor.fm', 'Spotlight'],
  },
  vite: {
    practicalUses: ['Run fast frontend development servers', 'Bundle production web applications', 'Build reusable JavaScript libraries', 'Prototype framework and vanilla projects'],
    projectIdeas: ['Vanilla TypeScript microsite', 'React component playground', 'Multi-page app', 'Published component library'],
    ecosystem: ['@vitejs/plugin-react', '@vitejs/plugin-vue', 'Vitest', 'vite-plugin-pwa', 'Rollup plugins', 'Storybook', 'Sass', 'SVGR'],
    popularSoftware: ['Vue projects', 'SvelteKit tooling', 'Vitest', 'Storybook', 'Laravel frontend builds', 'Astro integrations'],
  },
  sql: {
    practicalUses: ['Query operational and analytical data', 'Design reliable application storage', 'Build reports and business dashboards', 'Transform data in warehouses and pipelines'],
    projectIdeas: ['Library database', 'Sales KPI report', 'Event analytics schema', 'Search and recommendation dataset'],
    ecosystem: ['PostgreSQL', 'SQLite', 'MySQL', 'DuckDB', 'DBeaver', 'DataGrip', 'dbt', 'Prisma'],
    popularSoftware: ['WordPress', 'GitLab', 'Metabase', 'Supabase', 'Airflow metadata DB', 'Most business applications'],
  },
  php: {
    practicalUses: ['Build server-rendered websites', 'Create APIs and business applications', 'Develop content-management systems', 'Run ecommerce and publishing platforms'],
    projectIdeas: ['Contact form', 'Personal blog', 'Laravel appointment system', 'Small ecommerce backend'],
    ecosystem: ['Laravel', 'Symfony', 'Composer', 'PHPUnit', 'Pest', 'Doctrine', 'PHPStan', 'Monolog'],
    popularSoftware: ['WordPress', 'Wikipedia', 'Laravel', 'Drupal', 'Magento', 'Nextcloud'],
  },
  go: {
    practicalUses: ['Build cloud services and network servers', 'Create fast single-binary command-line tools', 'Develop infrastructure and observability systems', 'Run concurrent data-processing pipelines'],
    projectIdeas: ['Concurrent URL checker', 'Static file server', 'Container metrics agent', 'Distributed key-value store'],
    ecosystem: ['Gin', 'Chi', 'Cobra', 'GORM', 'sqlc', 'Testify', 'Zap', 'OpenTelemetry'],
    popularSoftware: ['Docker', 'Kubernetes', 'Terraform', 'Prometheus', 'Grafana', 'Hugo'],
  },
  rust: {
    practicalUses: ['Write memory-safe systems software', 'Build high-performance services and CLIs', 'Create embedded and WebAssembly applications', 'Develop engines, runtimes, and developer tools'],
    projectIdeas: ['Fast grep clone', 'Multithreaded web server', 'WebAssembly image filter', 'Embedded sensor logger'],
    ecosystem: ['Tokio', 'Axum', 'Serde', 'Clap', 'Rayon', 'SQLx', 'Cargo', 'Criterion'],
    popularSoftware: ['Firefox components', 'ripgrep', 'Alacritty', 'Deno', 'uv', 'Zed'],
  },
  java: {
    practicalUses: ['Build enterprise backend systems', 'Develop Android applications', 'Run high-throughput data platforms', 'Create cross-platform desktop and server software'],
    projectIdeas: ['CLI gradebook', 'Spring Boot REST API', 'Android habit tracker', 'Event-driven order service'],
    ecosystem: ['Spring Boot', 'Maven', 'Gradle', 'JUnit', 'Hibernate', 'Jackson', 'Mockito', 'Quarkus'],
    popularSoftware: ['IntelliJ IDEA', 'Minecraft', 'Jenkins', 'Elasticsearch', 'Apache Kafka', 'Gradle'],
  },
  kotlin: {
    practicalUses: ['Develop modern Android apps', 'Build concise JVM backend services', 'Share code across mobile platforms', 'Create Gradle build logic and scripting tools'],
    projectIdeas: ['Android notes app', 'Ktor JSON API', 'Compose desktop timer', 'Multiplatform reading tracker'],
    ecosystem: ['Jetpack Compose', 'Ktor', 'Kotlin Coroutines', 'kotlinx.serialization', 'Exposed', 'Kotest', 'Detekt', 'Koin'],
    popularSoftware: ['Pinterest Android', 'Trello Android', 'Gradle Kotlin DSL', 'IntelliJ platform features', 'Cash App', 'Duolingo Android'],
  },
  swift: {
    practicalUses: ['Build iPhone, iPad, Mac, and watch apps', 'Create server-side Swift services', 'Develop command-line tools for Apple platforms', 'Write safe performance-sensitive applications'],
    projectIdeas: ['SwiftUI journal', 'Weather menu-bar app', 'Core Data expense tracker', 'Vapor web API'],
    ecosystem: ['SwiftUI', 'UIKit', 'Swift Package Manager', 'Vapor', 'Alamofire', 'Swift Testing', 'XCTest', 'SwiftLint'],
    popularSoftware: ['Apple platform apps', 'Firefox iOS', 'Signal iOS', 'WordPress iOS', 'LinkedIn iOS', 'Arc for macOS'],
  },
  csharp: {
    practicalUses: ['Build .NET web APIs and enterprise systems', 'Create games with Unity', 'Develop Windows and cross-platform apps', 'Run cloud services and automation'],
    projectIdeas: ['Console budget tracker', 'ASP.NET Core API', 'Unity puzzle game', 'Cross-platform Avalonia desktop app'],
    ecosystem: ['ASP.NET Core', 'Entity Framework Core', 'Unity', 'NuGet', 'xUnit', 'Serilog', 'MediatR', 'Avalonia'],
    popularSoftware: ['Unity games', 'Stack Overflow', 'Paint.NET', 'PowerShell', 'KeePass', 'Microsoft PowerToys'],
  },
  cpp: {
    practicalUses: ['Build game engines and real-time graphics', 'Create browsers, databases, and desktop applications', 'Program robotics and low-latency systems', 'Optimize performance-critical libraries'],
    projectIdeas: ['Terminal chess game', 'Ray tracer', 'Physics sandbox', 'Small database engine'],
    ecosystem: ['CMake', 'Conan', 'vcpkg', 'Boost', 'Qt', 'Catch2', 'GoogleTest', 'SDL'],
    popularSoftware: ['Unreal Engine', 'Chrome', 'Photoshop', 'Blender', 'MySQL', 'LLVM'],
  },
  c: {
    practicalUses: ['Program operating systems and embedded devices', 'Write drivers, runtimes, and language interpreters', 'Build portable low-level libraries', 'Control memory and hardware directly'],
    projectIdeas: ['CLI text utility', 'Arena allocator', 'Tiny shell', 'Microcontroller weather station'],
    ecosystem: ['GCC', 'Clang', 'CMake', 'Meson', 'GDB', 'Valgrind', 'Unity Test', 'libcurl'],
    popularSoftware: ['Linux kernel', 'Git', 'SQLite', 'CPython', 'Redis', 'Vim'],
  },
  lua: {
    practicalUses: ['Embed scripting inside larger applications', 'Create game behavior and modifications', 'Configure editors and infrastructure tools', 'Build lightweight automation'],
    projectIdeas: ['Text adventure', 'Neovim plugin', 'LÖVE2D platformer', 'Embedded rules engine'],
    ecosystem: ['LuaRocks', 'LÖVE2D', 'OpenResty', 'Busted', 'Penlight', 'LPeg', 'LuaJIT', 'Neovim API'],
    popularSoftware: ['Neovim', 'Roblox experiences', 'World of Warcraft addons', 'Redis scripts', 'Wireshark', 'AwesomeWM'],
  },
  git: {
    practicalUses: ['Track and review changes safely', 'Collaborate through branches and pull requests', 'Investigate regressions and restore history', 'Automate releases and deployment workflows'],
    projectIdeas: ['Version a writing project', 'Practice branching with a team repo', 'Build a release workflow', 'Write a custom Git hook'],
    ecosystem: ['GitHub', 'GitLab', 'Bitbucket', 'Lazygit', 'Git LFS', 'pre-commit', 'Husky', 'Conventional Commits'],
    popularSoftware: ['Linux kernel development', 'Chromium source', 'Kubernetes', 'React', 'Homebrew', 'Nearly every modern codebase'],
  },
  bash: {
    practicalUses: ['Automate development and server operations', 'Compose Unix tools into data pipelines', 'Write CI and deployment scripts', 'Manage files, processes, and environments'],
    projectIdeas: ['Backup script', 'Project scaffolder', 'Log-analysis pipeline', 'Zero-downtime deployment script'],
    ecosystem: ['ShellCheck', 'shfmt', 'Bats', 'fzf', 'jq', 'ripgrep', 'GNU coreutils', 'Taskfile'],
    popularSoftware: ['Docker entrypoints', 'Git hooks', 'CI pipelines', 'Linux installers', 'Homebrew formula scripts', 'Server bootstrap scripts'],
  },
  powershell: {
    practicalUses: ['Administer Windows and Microsoft cloud services', 'Automate structured system tasks', 'Manage Active Directory and Microsoft 365', 'Build cross-platform DevOps scripts'],
    projectIdeas: ['System inventory report', 'Bulk user provisioner', 'Azure cleanup tool', 'CI environment diagnostic module'],
    ecosystem: ['Pester', 'PSReadLine', 'PowerShellGet', 'Az', 'Microsoft.Graph', 'dbatools', 'PSScriptAnalyzer', 'posh-git'],
    popularSoftware: ['Windows administration scripts', 'Azure Cloud Shell', 'Microsoft 365 automation', 'Chocolatey tooling', 'PowerShell itself', 'DevOps build agents'],
  },
  terminal: {
    practicalUses: ['Control local and remote computers efficiently', 'Understand streams, processes, and environment variables', 'Operate full-screen text applications', 'Diagnose how developer tools communicate'],
    projectIdeas: ['Customize a prompt', 'Build a colored progress display', 'Record a terminal session', 'Write a tiny terminal emulator'],
    ecosystem: ['Windows Terminal', 'iTerm2', 'Alacritty', 'kitty', 'tmux', 'Zellij', 'Starship', 'fzf'],
    popularSoftware: ['Vim', 'Neovim', 'htop', 'SSH', 'Lazygit', 'GitHub CLI'],
  },
  ruby: {
    practicalUses: ['Build productive web applications', 'Write readable automation and domain-specific languages', 'Create developer tooling and static sites', 'Prototype business ideas quickly'],
    projectIdeas: ['CLI journal', 'Sinatra URL shortener', 'Rails booking system', 'Custom static-site generator'],
    ecosystem: ['Rails', 'Bundler', 'RSpec', 'Sidekiq', 'Sinatra', 'RuboCop', 'Hanami', 'Jekyll'],
    popularSoftware: ['GitHub', 'Shopify', 'Basecamp', 'Discourse', 'Homebrew', 'Jekyll'],
  },
  dsa: {
    practicalUses: ['Choose efficient representations for real data', 'Reason about performance and scalability', 'Implement search, scheduling, and routing', 'Prepare for technical interviews thoughtfully'],
    projectIdeas: ['Visual sorting explorer', 'Autocomplete trie', 'Route planner with Dijkstra', 'Mini search engine with inverted index'],
    ecosystem: ['VisuAlgo', 'LeetCode', 'HackerRank', 'Graphviz', 'Jupyter', 'Big-O Cheat Sheet', 'NetworkX', 'Benchmark tools'],
    popularSoftware: ['Database indexes', 'GPS routing', 'Search engines', 'Compilers', 'Compression tools', 'Recommendation systems'],
  },
  internet: {
    practicalUses: ['Debug requests across browsers, servers, and networks', 'Design reliable HTTP APIs', 'Understand DNS, TLS, caching, and CDNs', 'Secure and operate internet-facing systems'],
    projectIdeas: ['HTTP request inspector', 'DNS lookup visualizer', 'Tiny HTTP server', 'Caching reverse proxy'],
    ecosystem: ['curl', 'Wireshark', 'dig', 'Postman', 'mitmproxy', 'ngrok', 'Cloudflare', 'OpenSSL'],
    popularSoftware: ['Nginx', 'Apache HTTP Server', 'BIND', 'Cloudflare CDN', 'Chrome DevTools', 'Let’s Encrypt'],
  },
  'computer-architecture': {
    practicalUses: ['Understand how source becomes machine execution', 'Optimize cache and memory behavior', 'Reason about CPU performance and concurrency', 'Design embedded and low-level systems'],
    projectIdeas: ['Logic-gate simulator', '8-bit CPU emulator', 'Cache simulator', 'Pipelined processor in HDL'],
    ecosystem: ['Logisim Evolution', 'RISC-V tools', 'QEMU', 'Verilator', 'GTKWave', 'perf', 'Compiler Explorer', 'gem5'],
    popularSoftware: ['RISC-V cores', 'ARM processors', 'x86-64 CPUs', 'Apple silicon', 'QEMU', 'FPGA soft cores'],
  },
  'operating-systems': {
    practicalUses: ['Understand processes, memory, files, and scheduling', 'Debug performance and resource failures', 'Build system software and containers', 'Operate servers with stronger mental models'],
    projectIdeas: ['Process monitor', 'Userspace file system', 'Memory allocator simulator', 'Small teaching kernel'],
    ecosystem: ['strace', 'perf', 'GDB', 'QEMU', 'Docker', 'systemd tools', 'eBPF', 'Valgrind'],
    popularSoftware: ['Linux', 'Windows NT', 'macOS/XNU', 'FreeBSD', 'Android', 'Redox OS'],
  },
  compilers: {
    practicalUses: ['Translate languages into executable behavior', 'Build linters, formatters, and code analyzers', 'Create domain-specific languages', 'Optimize programs and developer tooling'],
    projectIdeas: ['Arithmetic parser', 'Tiny interpreted language', 'Static-analysis linter', 'Bytecode compiler and virtual machine'],
    ecosystem: ['LLVM', 'ANTLR', 'Tree-sitter', 'Bison', 'Flex', 'MLIR', 'Cranelift', 'WebAssembly'],
    popularSoftware: ['Clang', 'GCC', 'Rust compiler', 'TypeScript compiler', 'V8', 'Babel'],
  },
  asm: {
    practicalUses: ['Inspect what compilers and CPUs actually execute', 'Optimize tiny performance-critical routines', 'Program bootloaders and embedded targets', 'Reverse engineer binaries and debug crashes'],
    projectIdeas: ['Hello world syscall', 'Integer conversion routine', 'Boot sector', 'SIMD image-processing kernel'],
    ecosystem: ['NASM', 'GNU assembler', 'GDB', 'LLDB', 'objdump', 'radare2', 'Ghidra', 'Compiler Explorer'],
    popularSoftware: ['Bootloaders', 'Cryptography kernels', 'Game console emulators', 'Operating-system entry code', 'SIMD media codecs', 'Firmware'],
  },
}

export function getFieldGuide(slug: string): FieldGuide | undefined {
  return fieldGuides[slug]
}
