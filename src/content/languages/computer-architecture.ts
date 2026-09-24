import { Language } from '../types'

export const computerArchitecture: Language = {
  slug: 'computer-architecture',
  name: 'Computer Architecture',
  tagline: 'How the hardware runs your code.',
  description: "Every language runs on the same basic machine: a CPU, registers, caches and RAM. Knowing how they work explains practical things like why arrays are usually faster than linked lists and what a cache miss costs.",
  accentColor: '#FF9E2C',
  textOnAccent: '#1a1a1a',
  icon: 'CA',
  difficulty: 'advanced',
  usedFor: ['Performance Tuning', 'Systems Programming', 'Embedded Devices', 'Debugging', 'CS Fundamentals'],
  notableUsers: ['Intel', 'AMD', 'ARM', 'Apple Silicon', 'RISC-V'],
  setup: {
    description: "This is a concepts track, so there is nothing to install. These optional commands let you look at your own CPU details and at compiled machine code.",
    windows: `# See your CPU's details:
# Task Manager -> Performance -> CPU
# or:
wmic cpu get name, numberofcores, maxclockspeed

# Explore compiler output for any C code (no install):
# https://godbolt.org`,
    mac: `# CPU details:
sysctl -n machdep.cpu.brand_string
sysctl hw.ncpu hw.l1dcachesize hw.l2cachesize

# Disassemble a compiled program:
clang -O2 hello.c -o hello
objdump -d hello | head -50

# Or explore interactively: https://godbolt.org`,
    linux: `# CPU details:
lscpu
cat /proc/cpuinfo | head -30

# Cache sizes:
lscpu | grep -i cache

# Disassemble a compiled program:
gcc -O2 hello.c -o hello
objdump -d hello | head -50`,
  },
  lessons: [
    {
      slug: 'bits-and-binary',
      title: 'Bits, Bytes & Binary',
      intro: "Everything a computer stores, from numbers to text to images, is made of bits that are either 0 or 1. You'll learn binary, hexadecimal and how negative numbers and text are represented.",
      sections: [
        {
          type: 'text',
          content: "A bit is a single 0 or 1. Eight bits make a byte, which can represent 256 different values (2^8). Binary is just place-value counting with 2s instead of 10s: the binary number 1011 means 1×8 + 0×4 + 1×2 + 1×1 = 11. Hexadecimal (base 16, digits 0-9 then a-f) is shorthand — one hex digit is exactly four bits, so 0xFF is 11111111 is 255.",
        },
        {
          type: 'code',
          language: 'python',
          content: `# Explore binary in any language — Python shown:
print(bin(11))       # 0b1011
print(0b1011)        # 11
print(hex(255))      # 0xff
print(0xff)          # 255

# Bitwise operators work directly on the bits:
a, b = 0b1100, 0b1010
print(bin(a & b))    # 0b1000  AND — both bits set
print(bin(a | b))    # 0b1110  OR  — either bit set
print(bin(a ^ b))    # 0b0110  XOR — exactly one set
print(bin(a << 1))   # 0b11000 shift left = ×2
print(bin(a >> 2))   # 0b11    shift right = ÷4`,
        },
        {
          type: 'text',
          content: "Negative numbers use two's complement: to negate, flip every bit and add one. The top bit acts as the sign. This is why an 8-bit signed integer ranges from -128 to 127, and why integer overflow wraps around to a huge negative number — the bits just carried past the sign position.",
        },
        {
          type: 'code',
          language: 'text',
          content: `8-bit two's complement:
  0000 0101  =  5
  1111 1011  = -5   (flip all bits of 5, add 1)
  0111 1111  =  127 (biggest positive)
  1000 0000  = -128 (most negative)
  0111 1111 + 1 = 1000 0000   -> 127 + 1 = -128. Overflow!

Text is numbers too (ASCII/Unicode):
  'A' = 65 = 0100 0001
  'a' = 97 = 0110 0001   (one bit apart — that's why
                          case-toggling is a single XOR)`,
        },
        {
          type: 'note',
          content: "Floating point (float/double) stores numbers as sign × fraction × 2^exponent — like scientific notation in binary. 0.1 has no exact binary representation, which is why 0.1 + 0.2 != 0.3 in every language. It's the format (IEEE 754), not the language.",
        },
      ],
    },
    {
      slug: 'cpu-fetch-decode-execute',
      title: 'The CPU: Fetch, Decode, Execute',
      intro: "A CPU repeats one loop billions of times per second: fetch the next instruction, decode it, execute it. You'll see what instructions look like and how modern CPUs speed this loop up.",
      sections: [
        {
          type: 'text',
          content: "Machine instructions are tiny: load this memory address into a register, add two registers, compare, jump somewhere else if the result was zero. Registers are a few dozen very fast storage slots (64 bits each on modern machines) where all actual work happens. The program counter register holds the address of the next instruction; jumps just overwrite it.",
        },
        {
          type: 'code',
          language: 'nasm',
          content: `; What 'x = a + b' compiles to (x86-64 assembly):
mov  rax, [a]      ; fetch a from memory into register rax
add  rax, [b]      ; add b's value to it
mov  [x], rax      ; store the result back to memory

; What 'if (x == 0) goto done' looks like:
cmp  rax, 0        ; compare, sets CPU flags
je   done          ; 'jump if equal' — reads the flags

; A loop is a compare and a backwards jump:
loop_start:
  dec  rcx         ; count down
  jnz  loop_start  ; jump if not zero`,
        },
        {
          type: 'text',
          content: "Clock speed (say 3 GHz — 3 billion cycles per second) sets the rhythm, but modern CPUs don't do one instruction per cycle. They pipeline (overlap the fetch/decode/execute stages of many instructions like an assembly line), execute out of order when instructions don't depend on each other, and are superscalar (multiple instructions per cycle). A modern core juggles hundreds of instructions in flight.",
        },
        {
          type: 'note',
          content: "Branch prediction: pipelines only stay full if the CPU guesses which way an if will go before it's computed. Predictors are right ~95%+ of the time; a wrong guess flushes the pipeline (~15-20 cycles wasted). This is why sorting data before a loop full of branches can make the loop much faster.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# See it yourself — compile and disassemble:
cat > tiny.c << 'EOF'
int add(int a, int b) { return a + b; }
EOF
gcc -O1 -c tiny.c && objdump -d tiny.o

# Output includes:
#   lea eax, [rdi+rsi]     <- the entire function: one instruction
# (or paste the C into https://godbolt.org)`,
        },
      ],
    },
    {
      slug: 'memory-hierarchy',
      title: 'The Memory Hierarchy & Caches',
      intro: "Reading from RAM takes around 200 CPU cycles, so CPUs keep copies of recently used memory in small, fast caches. You'll learn how caches work and how to write code that uses them well.",
      sections: [
        {
          type: 'code',
          language: 'text',
          content: `The hierarchy (typical modern desktop):

  Registers      ~0 cycles      ~1 KB total
  L1 cache       ~4 cycles      32-64 KB per core
  L2 cache       ~12 cycles     512 KB - 2 MB per core
  L3 cache       ~40 cycles     16-64 MB shared
  RAM            ~200 cycles    16-64 GB
  SSD            ~100,000 cyc   1-4 TB
  Network        ~10,000,000+   the internet

Each level: ~10x bigger, ~4-10x slower.`,
        },
        {
          type: 'text',
          content: "Caches work because of locality. Temporal locality: memory you just used, you'll likely use again. Spatial locality: memory near what you just used, you'll likely use next. Caches exploit the second by loading memory in 64-byte cache lines — touch one byte and the surrounding 64 arrive for free. Code that walks memory in order rides this; code that jumps around fights it.",
        },
        {
          type: 'code',
          language: 'c',
          content: `// Same work, wildly different speed — traversal order matters:
#define N 4096
int grid[N][N];

// Row-major: walks memory sequentially. Cache-friendly.
for (int row = 0; row < N; row++)
    for (int col = 0; col < N; col++)
        sum += grid[row][col];

// Column-major: jumps N*4 bytes every access.
// Each read misses cache. Often 5-10x SLOWER:
for (int col = 0; col < N; col++)
    for (int row = 0; row < N; row++)
        sum += grid[row][col];`,
        },
        {
          type: 'tip',
          content: "This is why arrays usually beat linked lists in practice even when big-O says they're equal: array elements are adjacent (cache lines full of useful data), list nodes are scattered (every next-pointer a likely cache miss). Data layout is a first-class performance decision.",
        },
        {
          type: 'note',
          content: "Virtual memory: each process sees its own private address space; hardware (the MMU, using page tables) translates virtual addresses to physical RAM in 4KB pages. This gives isolation (one program can't read another's memory), and lets the OS swap unused pages to disk. A 'segmentation fault' is the MMU catching an access to a page you don't own.",
        },
      ],
    },
    {
      slug: 'how-code-becomes-instructions',
      title: 'From Source Code to Machine Code',
      intro: "Source code reaches the CPU in one of three ways: compiled ahead of time, compiled just in time, or interpreted. You'll learn how each works and what it means for performance.",
      sections: [
        {
          type: 'text',
          content: "Ahead-of-time compilation (C, C++, Rust, Go, Swift): a compiler translates the whole program to machine code once, before it runs. The binary is native instructions; startup is instant and speed is maximal, but the binary is built for one CPU architecture and OS.",
        },
        {
          type: 'text',
          content: "Interpretation (classic Python, Ruby): a program (the interpreter) reads your code — usually pre-parsed into simple bytecode — and performs each operation itself. A bytecode 'ADD' might cost the interpreter 50+ real instructions of dispatching, type checking, and boxing. Flexible and portable, 10-100x slower for tight loops.",
        },
        {
          type: 'text',
          content: "Just-in-time (JIT) compilation (JavaScript's V8, the JVM, C#, PyPy): start by interpreting, watch which functions run hot, compile those to native machine code at runtime — optimizing for the types actually seen. That's how JavaScript became fast enough to run within a few times the speed of C for many workloads.",
        },
        {
          type: 'code',
          language: 'text',
          content: `The classic AOT pipeline (detailed in the Compilers track):

 source.c
   -> preprocessor  (expand #include, #define)
   -> compiler      (C -> assembly, optimizations here)
   -> assembler     (assembly -> object file: machine code)
   -> linker        (combine .o files + libraries -> executable)
 ./program

Rough single-thread speed for a numeric loop:
  C / Rust (AOT)      1x
  JS / Java (JIT)     1-3x slower
  Python (interp)     30-100x slower
  (NumPy escapes by calling AOT-compiled C under the hood)`,
        },
        {
          type: 'note',
          content: "Architectures matter: x86-64 (Intel/AMD desktops, most servers) and ARM64 (every phone, Apple Silicon, AWS Graviton) speak different instruction sets. A binary for one can't run natively on the other — that's why Apple built Rosetta 2, a translator, for the Intel-to-M1 transition.",
        },
      ],
    },
    {
      slug: 'parallelism',
      title: 'Cores, Threads & Parallelism',
      intro: "Around 2005 single cores stopped getting much faster, so chips gained more cores instead. You'll learn how cores and threads work and why sharing memory between them needs care.",
      sections: [
        {
          type: 'text',
          content: "Clock speeds hit a power wall (~4 GHz produces too much heat to cool practically), so vendors put multiple full CPUs — cores — on one chip. Each core runs one instruction stream (thread) at a time; 8 cores genuinely execute 8 things simultaneously. Simultaneous multithreading (Intel's 'hyper-threading') lets one core juggle two threads to fill idle execution slots — helpful, but not double speed.",
        },
        {
          type: 'code',
          language: 'text',
          content: `One core, 3 GHz, in one second:  ~10 billion instructions
Eight cores: ~80 billion — IF the work splits evenly.

Amdahl's Law — speedup is capped by the serial fraction:
  90% parallel work, infinite cores -> at most 10x faster.
  50% parallel work, infinite cores -> at most 2x.

The catch: cores share memory. Two cores writing the
same data need coordination — and that's where bugs live.`,
        },
        {
          type: 'code',
          language: 'c',
          content: `// The classic data race:
// Two threads both run: counter++
// which is really THREE instructions:
//   load  counter into register
//   add   1
//   store register back to counter
//
// Interleaving:
//   Thread A loads 100      Thread B loads 100
//   A adds -> 101           B adds -> 101
//   A stores 101            B stores 101
// Two increments, counter went up by ONE. Lost update.
//
// Fixes: locks (mutex), atomic instructions
// (lock xadd on x86), or sharing nothing at all.`,
        },
        {
          type: 'tip',
          content: "Modern hardware parallelism also includes SIMD (one instruction operating on 8-16 values at once — how video codecs and NumPy get their speed) and GPUs (thousands of simple cores for uniform work — graphics and neural networks). Different shapes of the same idea: do more per clock, since clocks stopped climbing.",
        },
        {
          type: 'note',
          content: "Cache coherency ties the whole chip together: when core A writes data cached by core B, hardware invalidates B's copy automatically. Correctness is preserved, but ping-ponging a hot cache line between cores ('false sharing') quietly hurts performance — a common advanced pitfall.",
        },
      ],
    },
    {
      slug: 'performance-thinking',
      title: 'Thinking in Nanoseconds',
      intro: "It helps to know roughly how long common operations take. Once you know a RAM access costs ~100ns and a disk read ~100µs, many design decisions become easier.",
      sections: [
        {
          type: 'code',
          language: 'text',
          content: `Latency numbers every programmer should know (~2020s):

  L1 cache reference ................ 1 ns
  Branch mispredict ................. 3 ns
  L2 cache reference ................ 4 ns
  Mutex lock/unlock ................ 17 ns
  Main memory reference ........... 100 ns
  Compress 1KB (Snappy) .......... 2,000 ns
  Read 1MB sequentially from RAM . 10,000 ns
  SSD random read ............... 16,000 ns
  Read 1MB sequentially from SSD  ~200,000 ns
  Round trip in same datacenter . 500,000 ns
  Read 1MB from spinning disk .. 1,000,000 ns
  Packet US -> Europe -> US  150,000,000 ns

Scaled up: if L1 = 1 second, RAM = 100 seconds,
SSD read = 4.4 hours, transatlantic packet = 4.8 YEARS.`,
        },
        {
          type: 'text',
          content: "Read the table vertically and rules of thumb fall out. Sequential beats random at every level. Memory beats disk by ~100x, disk beats network round trips. One database query per item in a loop (the N+1 problem) is very slow not because queries are slow, but because each one is a network round trip — half a million nanoseconds of waiting per item.",
        },
        {
          type: 'code',
          language: 'python',
          content: `# The same lesson at application level:

# BAD: 1000 network round trips
for user_id in user_ids:            # 1000 ids
    user = db.query("SELECT ... WHERE id = ?", user_id)

# GOOD: 1 round trip carrying 1000 rows
users = db.query("SELECT ... WHERE id IN (...)", user_ids)

# Same asymptotic complexity. ~1000x faster in practice.
# The machine rewards batching, always.`,
        },
        {
          type: 'tip',
          content: "Measure before optimizing — profilers (perf on Linux, Instruments on macOS) show where time actually goes, and it's rarely where you'd guess. But knowing the price list tells you what's plausible: if your code reads 1 GB from SSD, anything under ~2 seconds means caching is helping; anything over 30 means you're doing random reads.",
        },
      ],
    },
  ],
}
