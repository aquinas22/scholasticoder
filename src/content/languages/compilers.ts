import { Language } from '../types'

export const compilers: Language = {
  slug: 'compilers',
  name: 'Compilers',
  tagline: 'How text becomes a running program.',
  description: "A compiler is a program that reads your code and writes an equivalent program in another language — usually machine code. Understanding the pipeline (lexing, parsing, type checking, optimization, code generation) demystifies error messages, explains what optimizers can and can't do, and covers the ideas behind every linter, formatter, and transpiler you use daily.",
  accentColor: '#9C27B0',
  textOnAccent: '#fff',
  icon: 'Cc',
  difficulty: 'advanced',
  usedFor: ['Language Tools', 'Linters & Formatters', 'Transpilers', 'Performance', 'CS Fundamentals'],
  notableUsers: ['GCC', 'LLVM/Clang', 'V8', 'rustc', 'TypeScript'],
  setup: {
    description: "Concepts track — any compiler you already have works for the experiments. Godbolt (godbolt.org) shows compiler output for 40+ languages with zero install and is the single best companion to this track.",
    windows: `# Zero install: https://godbolt.org
# paste code, see assembly, toggle optimization flags

# Or a local C compiler via WSL:
wsl --install
# then inside WSL:
sudo apt install gcc
gcc -O2 -S hello.c -o hello.s   # emit assembly`,
    mac: `# clang ships with the Xcode command line tools:
xcode-select --install

clang -O2 -S hello.c -o hello.s   # emit assembly
clang -O0 -S hello.c -o slow.s    # compare unoptimized

# Also: https://godbolt.org for instant exploration`,
    linux: `sudo apt install gcc        # Debian/Ubuntu

gcc -O2 -S hello.c -o hello.s   # emit assembly instead of binary
gcc -E hello.c | tail           # preprocessor output only
objdump -d ./a.out | less       # disassemble a binary

# Also: https://godbolt.org`,
  },
  lessons: [
    {
      slug: 'the-pipeline',
      title: 'The Compiler Pipeline',
      intro: "Every compiler — GCC, V8, rustc, even the TypeScript checker — is the same assembly line: characters to tokens to tree to checked tree to optimized form to output code. Learn the stations once, recognize them everywhere.",
      sections: [
        {
          type: 'code',
          language: 'text',
          content: `source text
   |
   v  LEXER        characters -> tokens ("words")
   v  PARSER       tokens -> syntax tree (AST)
   v  SEMANTIC     names resolved, types checked
   v  IR           tree -> intermediate representation
   v  OPTIMIZER    IR -> better IR (most of the magic)
   v  CODEGEN      IR -> assembly / bytecode / JS / ...
   |
   v  output program

Front end = understand the source (lexer..semantic).
Back end  = produce the target (optimizer..codegen).`,
        },
        {
          type: 'text',
          content: "The front/back split is the field's great economy: LLVM is a shared back end, so Rust, Swift, Clang, and Julia each wrote only a front end and got world-class optimization for every CPU free. Same trick in reverse: one front end can target many back ends — that's how the same C code compiles for x86, ARM, and WebAssembly.",
        },
        {
          type: 'text',
          content: "This pipeline isn't just for 'real' compilers. A linter is a front end that reports patterns instead of generating code. A formatter parses and prints the tree back prettily. TypeScript's compiler type-checks and then emits JavaScript — a compiler whose target language is another high-level language (a 'transpiler'). Syntax highlighting in your editor is a lexer running on every keystroke.",
        },
        {
          type: 'note',
          content: "Interpreters share the front half: Python lexes, parses, and compiles your file to bytecode, then executes the bytecode in a loop instead of translating it to machine code. JIT engines like V8 do both — interpret first, compile hot paths natively while running. 'Compiled vs interpreted' is a spectrum, not a binary.",
        },
      ],
    },
    {
      slug: 'lexing',
      title: 'Lexing — Text to Tokens',
      intro: "The lexer reads raw characters and groups them into tokens: words, numbers, operators. It's the simplest stage — simple enough that you can write a real one in 40 lines, and you're about to.",
      sections: [
        {
          type: 'code',
          language: 'text',
          content: `Input:   let price = 3 * (cost + 12);

Tokens:
  KEYWORD(let)  IDENT(price)  EQUALS
  NUMBER(3)  STAR  LPAREN  IDENT(cost)
  PLUS  NUMBER(12)  RPAREN  SEMICOLON

Whitespace and comments: consumed, discarded.
The lexer knows NOTHING about grammar — '3 + + let ('
lexes fine. Structure is the parser's job.`,
        },
        {
          type: 'code',
          language: 'python',
          content: `# A real lexer for arithmetic — this is the whole idea:
def lex(src):
    tokens, i = [], 0
    while i < len(src):
        c = src[i]
        if c.isspace():
            i += 1
        elif c.isdigit():
            start = i
            while i < len(src) and src[i].isdigit():
                i += 1
            tokens.append(("NUMBER", int(src[start:i])))
        elif c.isalpha():
            start = i
            while i < len(src) and src[i].isalnum():
                i += 1
            tokens.append(("IDENT", src[start:i]))
        elif c in "+-*/()=;":
            tokens.append(("OP", c))
            i += 1
        else:
            raise SyntaxError(f"unexpected {c!r} at {i}")
    return tokens

print(lex("price = 3 * (cost + 12);"))
# [('IDENT','price'), ('OP','='), ('NUMBER',3), ('OP','*'), ...]`,
        },
        {
          type: 'text',
          content: "Real lexers add string literals (with escape sequences), multi-character operators (== vs =, maximal munch: always take the longest match), comments, and position tracking so error messages can say line 12, column 8. The core loop never changes: look at the current character, decide the token type, consume characters until it ends.",
        },
        {
          type: 'tip',
          content: "'Unexpected token' errors come from this stage's output: the parser received a legal token in an illegal place. 'Unexpected character' or 'invalid token' means the lexer itself choked — usually a stray symbol or an unterminated string.",
        },
      ],
    },
    {
      slug: 'parsing',
      title: 'Parsing — Tokens to Trees',
      intro: "Flat token lists become a tree that captures structure: what belongs to what, what happens first. The AST — abstract syntax tree — is the data structure every language tool lives on.",
      sections: [
        {
          type: 'code',
          language: 'text',
          content: `3 * (cost + 12)   parses to:

        (*)
       /   \\
     (3)   (+)
          /   \\
      (cost)  (12)

The tree IS the precedence: to evaluate (*) you need
(+) first. '3 * cost + 12' builds a different tree —
(+) on top — same tokens, different meaning.
Parentheses exist only to shape the tree; the tree
itself has no parentheses.`,
        },
        {
          type: 'code',
          language: 'python',
          content: `# Recursive descent — the technique real compilers use
# (Clang, V8, TypeScript are all hand-written this way).
# One function per grammar rule; precedence via layering:

def parse_expr(toks):        # expr := term (('+'|'-') term)*
    node = parse_term(toks)
    while toks and toks[0] == ("OP", "+"):
        toks.pop(0)
        node = ("add", node, parse_term(toks))
    return node

def parse_term(toks):        # term := factor (('*') factor)*
    node = parse_factor(toks)
    while toks and toks[0] == ("OP", "*"):
        toks.pop(0)
        node = ("mul", node, parse_factor(toks))
    return node

def parse_factor(toks):      # factor := NUMBER | '(' expr ')'
    kind, val = toks.pop(0)
    if kind == "NUMBER":
        return ("num", val)
    if (kind, val) == ("OP", "("):
        node = parse_expr(toks)
        toks.pop(0)          # the ')'
        return node
    raise SyntaxError(f"unexpected {val}")

print(parse_expr(lex("3 * (4 + 12)")))
# ('mul', ('num', 3), ('add', ('num', 4), ('num', 12)))`,
        },
        {
          type: 'text',
          content: "Notice the layering does the precedence: parse_expr calls parse_term which calls parse_factor, so * binds tighter than + automatically. Grammars are written down formally (BNF notation), and parser generators can produce parsers from them — though production compilers mostly hand-write for better error messages.",
        },
        {
          type: 'note',
          content: "Once you have an AST, an interpreter is trivial: walk the tree, evaluating children before parents. def eval(n): return n[1] if n[0]=='num' else eval(n[1]) + eval(n[2]) if n[0]=='add' else eval(n[1]) * eval(n[2]). Congratulations — lexer, parser, evaluator is a complete language implementation, and you've now seen all three.",
        },
      ],
    },
    {
      slug: 'semantic-analysis',
      title: 'Names, Scopes & Type Checking',
      intro: "The parser accepts 'undefined_thing + 3' happily — it's grammatically fine. Semantic analysis is where the compiler asks: does this name exist? Do these types fit? It's the stage that catches your actual bugs.",
      sections: [
        {
          type: 'text',
          content: "Name resolution walks the tree carrying a symbol table — a stack of scopes mapping names to their declarations. Enter a function or block: push a scope. Leave: pop it. A name lookup searches innermost outward, which is exactly why an inner 'x' shadows an outer one, and why 'undefined variable' errors can name the function but not variables from elsewhere.",
        },
        {
          type: 'code',
          language: 'text',
          content: `let x = 10
fn f(y):           scope stack while checking f's body:
    let z = y + x     [ globals: x, f ]
    return z          [ f's params: y ]
                      [ f's body: z ]
z = 5              <- ERROR: 'z' not in any live scope —
                      f's scopes were popped at its end.`,
        },
        {
          type: 'text',
          content: "Type checking then asks, for every operation, whether the operand types allow it — using declared types (C, Rust) or inferred ones (compilers can deduce that x = 3 makes x an int, and flow that through everything x touches; that's how TypeScript knows so much with so few annotations). Static checking happens here, at compile time; dynamic languages defer the same checks to runtime, one operation at a time.",
        },
        {
          type: 'code',
          language: 'text',
          content: `"hello" + 3

C:           compile error — char* + int is pointer math
             you didn't mean
Rust:        compile error — no impl of Add<i32> for &str
TypeScript:  allowed -> "hello3" (+ is overloaded, checked)
Python:      RUNTIME TypeError — same check, later
JavaScript:  "hello3" — coerces silently, no check ever

Same question — 'do these types fit this operation?' —
five different policies on when/whether to ask it.`,
        },
        {
          type: 'note',
          content: "This stage powers your editor: 'go to definition' reads the symbol table, autocomplete lists what's in scope with fitting types, and red squiggles are the semantic checker running continuously. A language server (LSP) is a compiler front end kept alive, re-checking as you type.",
        },
      ],
    },
    {
      slug: 'optimization',
      title: 'Optimization — Where the Magic Lives',
      intro: "Naively translated code is slow. Optimizers transform the program — hundreds of passes, each a small rewrite that provably preserves behavior — until the output beats what you'd write by hand.",
      sections: [
        {
          type: 'code',
          language: 'text',
          content: `What -O2 does to your code (each pass, repeatedly):

  constant folding     3 * 60          ->  180
  constant propagation x=5; y=x+1      ->  y=6
  dead code removal    if(false){...}  ->  (gone)
  common subexpression (a*b) + (a*b)   ->  t=a*b; t+t
  function inlining    call sq(x)      ->  x*x  (no call)
  loop invariant hoist for(...){k=n*4} ->  k=n*4; for(...)
  strength reduction   i * 2           ->  i << 1
  loop unrolling       4 iterations    ->  straight-line code
  vectorization        sum loop        ->  SIMD: 8 adds/instr

Passes enable each other: inlining exposes constants,
folding kills branches, killing branches exposes more.
That's why they run in a loop until nothing changes.`,
        },
        {
          type: 'code',
          language: 'c',
          content: `// Try on godbolt.org — gcc -O2:
int sum_to(int n) {
    int total = 0;
    for (int i = 1; i <= n; i++)
        total += i;
    return total;
}

// The compiler recognizes the pattern and emits the
// CLOSED FORM — no loop at all:
//   n * (n + 1) / 2   (a few instructions, O(1))

// And this function:
int always_42(void) {
    int x = 6, y = 7;
    return x * y;
}
// compiles to:
//   mov eax, 42
//   ret`,
        },
        {
          type: 'text',
          content: "The contract is the 'as-if' rule: the optimizer may do anything as long as observable behavior is unchanged. This is also where undefined behavior gets teeth — in C, signed overflow is UB, so the compiler assumes it never happens and deletes your 'if (x + 1 < x)' overflow check as dead code. The optimizer isn't malicious; it's holding you to the language's rules.",
        },
        {
          type: 'tip',
          content: "Practical takeaways: write clear code — the optimizer handles micro-tricks better than you, and clear code optimizes better. Debug builds (-O0) are slow on purpose (variables stay in memory so debuggers can see them). And when a benchmark shows 0ns, the optimizer probably deleted your unused computation entirely.",
        },
      ],
    },
    {
      slug: 'codegen-and-linking',
      title: 'Code Generation, Linking & JITs',
      intro: "The last mile: optimized IR becomes real instructions with real registers, separate files get stitched into one executable, and JIT compilers do the whole pipeline live while your program runs.",
      sections: [
        {
          type: 'text',
          content: "Codegen makes two hard choices. Instruction selection: which of the CPU's instructions implement each IR operation (x86 can often fold load-add-store into one instruction; ARM can't). Register allocation: the IR pretends registers are infinite, hardware has ~16 — graph coloring assigns the busiest values to registers and 'spills' the rest to stack memory. Register pressure is a real performance force: too many live variables means spills, means memory traffic.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Separate compilation + linking — how big projects build:
gcc -c utils.c        # -> utils.o   (machine code, but
gcc -c main.c         # -> main.o     unresolved references)
gcc main.o utils.o -o app     # linker joins them

# main.o contains 'call helper' with a BLANK address and
# a note: "patch this when you find 'helper'". The linker
# resolves every such note across all .o files + libraries.

# 'undefined reference to helper' = linker found no
#   definition anywhere (forgot a file or a library flag).
# 'duplicate symbol' = found two.

nm utils.o            # see a file's symbols: T=defined, U=needed`,
        },
        {
          type: 'text',
          content: "Static linking copies library code into your binary (bigger, self-contained — Go's default). Dynamic linking loads shared libraries (.so/.dll) at startup, so all programs share one libc in memory and library fixes arrive without recompiling — at the cost of 'DLL hell' version mismatches. Every deployment headache about glibc versions traces here.",
        },
        {
          type: 'code',
          language: 'text',
          content: `JIT compilation — V8 running your JavaScript:

 1. Parse to bytecode, start interpreting immediately
 2. Profile while running: which functions are hot?
    what types actually flow through them?
 3. Hot function -> compile to machine code SPECIALIZED
    to the observed types ("x is always a small int")
 4. Guard checks protect the assumption; if a string
    shows up one day -> DEOPTIMIZE: throw away the
    fast code, fall back, maybe recompile

Why JS engines love consistent types — and why that
advice exists: monomorphic code stays compiled;
type-shifting code bounces between tiers.

The full pipeline, running in milliseconds,
while your page loads. Compilers all the way down.`,
        },
        {
          type: 'note',
          content: "Where to go deeper: 'Crafting Interpreters' by Robert Nystrom (free online — you build two complete languages), then LLVM's Kaleidoscope tutorial for a real back end. You already have the map; those fill in the territory.",
        },
      ],
    },
  ],
}
