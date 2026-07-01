import { Language } from '../types'

export const asm: Language = {
  slug: 'asm',
  name: 'Assembly',
  tagline: 'The last language between you and the hardware.',
  description: "Assembly language is a thin layer above raw machine code. Every other programming language compiles down to this. Learning it means seeing exactly what the CPU does — registers, memory, jumps, the stack. It's tedious, unforgiving, and makes everything else feel like a luxury. We teach x86-64 NASM on Linux, the most common flavor for desktop/server work.",
  accentColor: '#6E4C9F',
  textOnAccent: '#fff',
  icon: 'As',
  difficulty: 'advanced',
  usedFor: ['Reverse Engineering', 'Exploit Development', 'OS Kernels', 'Embedded Firmware', 'Performance-Critical Code'],
  notableUsers: ['OS kernels', 'Game emulators', 'Cryptographic libraries', 'Antivirus engines', 'Bootloaders'],
  setup: {
    description: 'We use NASM (Netwide Assembler) with the x86-64 Linux ABI. You need a Linux environment — WSL2 works fine on Windows.',
    windows: `# Install WSL2 (run in PowerShell as Administrator):
wsl --install
# Restart, then in Ubuntu (WSL2):
sudo apt update && sudo apt install nasm build-essential

# Verify:
nasm --version
ld --version`,
    mac: `# macOS uses a different ABI and linker — Homebrew + NASM:
brew install nasm

# Note: macOS syscall numbers differ from Linux.
# The lessons use Linux ABI. Run in a Linux VM or use Docker:
docker run -it --rm -v $(pwd):/work ubuntu bash
# Then: apt install nasm build-essential`,
    linux: `# Debian / Ubuntu:
sudo apt update && sudo apt install nasm build-essential

# Fedora:
sudo dnf install nasm gcc binutils

# Arch:
sudo pacman -S nasm base-devel

# Verify:
nasm --version    # should be 2.14+
ld --version`,
  },
  lessons: [
    {
      slug: 'how-cpus-work',
      title: 'How CPUs Actually Work',
      intro: "Before writing a single line, you need a mental model of what the CPU is doing. Everything in assembly makes sense once you understand registers, memory, and the fetch-decode-execute cycle.",
      sections: [
        {
          type: 'text',
          content: "A CPU is a machine that reads instructions from memory one at a time, executes them, and moves to the next. An instruction might be \"add two numbers,\" \"copy a value from memory,\" or \"jump to a different instruction.\" That's it. Everything your computer does — 3D games, video calls, AI — reduces to sequences of these tiny operations.",
        },
        {
          type: 'text',
          content: "Registers are small, fast storage locations inside the CPU itself. x86-64 has 16 general-purpose registers: rax, rbx, rcx, rdx, rsi, rdi, rbp, rsp, and r8–r15. Each holds 64 bits (8 bytes). Operations on registers are the fastest thing the CPU can do — no memory access required.",
        },
        {
          type: 'code',
          language: 'nasm',
          content: `; x86-64 general-purpose registers and their conventional uses:
; rax — accumulator: return values, arithmetic results
; rbx — base: callee-saved (must preserve across function calls)
; rcx — counter: loop counters, 4th argument
; rdx — data: I/O, 3rd argument
; rsi — source index: string source, 2nd argument
; rdi — destination index: string dest, 1st argument
; rbp — base pointer: stack frame base (callee-saved)
; rsp — stack pointer: always points to top of stack
; r8–r11  — 5th–8th arguments, caller-saved
; r12–r15 — callee-saved scratch registers

; Each 64-bit register has sub-register aliases:
; rax  = 64-bit (the full register)
; eax  = lower 32 bits
; ax   = lower 16 bits
; al   = lower 8 bits
; ah   = bits 8-15

; Example: after  mov rax, 0x0000000100FF
;   rax = 0x0000000100FF
;   eax = 0x000100FF
;   ax  = 0x00FF
;   al  = 0xFF
;   ah  = 0x00`,
        },
        {
          type: 'text',
          content: "Memory is a huge array of bytes, each with an address (a 64-bit number on x86-64). To use data in memory, you load it into a register, operate on it, then store it back. The stack is a region of memory that grows downward — rsp points to the current top. The heap is where malloc lives. Code lives in the text segment.",
        },
        {
          type: 'code',
          language: 'nasm',
          content: `; Memory layout of a running program (low address at top):
;
;  0x0000...  ──────────────────────
;             │  text segment        │  your compiled code (read + execute)
;             ├──────────────────────┤
;             │  data segment        │  initialized globals (read + write)
;             ├──────────────────────┤
;             │  bss segment         │  uninitialized globals (zero-filled)
;             ├──────────────────────┤
;             │  heap                │  grows upward (malloc/free)
;             │         ↓            │
;             │  (free space)        │
;             │         ↑            │
;             │  stack               │  grows downward
;  0xFFFF...  ──────────────────────
;
; rsp always points to the last pushed value on the stack.
; push rax  →  rsp -= 8, then [rsp] = rax
; pop  rax  →  rax = [rsp], then rsp += 8`,
        },
        {
          type: 'tip',
          content: 'Assembly is architecture-specific. x86-64 (what you run on your laptop and most servers) is what we cover here. ARM64 (your phone, Apple Silicon, Raspberry Pi) has a cleaner instruction set but different syntax and conventions. The concepts transfer; the specifics do not.',
        },
      ],
    },
    {
      slug: 'hello-world',
      title: 'Hello, World!',
      intro: "In Python, `print('Hello')` is one line that hides a function call, a string object, stdout buffering, and a syscall. In assembly, you see all of it.",
      sections: [
        {
          type: 'text',
          content: "To print text, we make a `write` system call directly to the Linux kernel. A syscall is the mechanism for asking the OS to do something on your behalf — write to stdout, read a file, allocate memory. We load the syscall number into rax and arguments into rdi, rsi, rdx, then execute the `syscall` instruction.",
        },
        {
          type: 'code',
          language: 'nasm',
          content: `; hello.asm — x86-64 Linux NASM
; Assemble: nasm -f elf64 hello.asm -o hello.o
; Link:     ld hello.o -o hello
; Run:      ./hello

section .data
    msg db "Hello, World!", 10   ; 10 = newline (\\n)
    len equ $ - msg              ; $ = current address, so len = length of msg

section .text
    global _start                ; expose _start as entry point to linker

_start:
    ; sys_write(fd=1, buf=msg, count=len)
    mov rax, 1          ; syscall number: 1 = write
    mov rdi, 1          ; file descriptor: 1 = stdout
    mov rsi, msg        ; pointer to the string
    mov rdx, len        ; number of bytes to write
    syscall             ; make the kernel call

    ; sys_exit(status=0)
    mov rax, 60         ; syscall number: 60 = exit
    mov rdi, 0          ; exit code 0 = success
    syscall`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `nasm -f elf64 hello.asm -o hello.o
ld hello.o -o hello
./hello
# Hello, World!

# See the object file's symbols:
nm hello.o

# Disassemble to verify:
objdump -d hello`,
        },
        {
          type: 'note',
          content: "There's no C runtime, no libc, no main(). We link directly with `ld` and the entry point is `_start`. The `db` directive defines a byte sequence. `equ` is a compile-time constant — the assembler computes `len` itself; it's not stored in memory.",
        },
      ],
    },
    {
      slug: 'registers-moves',
      title: 'Registers & Data Movement',
      intro: "`mov` is the most common instruction. It moves data between registers, and between registers and memory. 'Move' is a misnomer — it copies. The source is unchanged.",
      sections: [
        {
          type: 'code',
          language: 'nasm',
          content: `section .text
global _start

_start:
    ; mov dst, src — copies src into dst (src unchanged)

    ; Register to register
    mov rax, 42         ; rax = 42
    mov rbx, rax        ; rbx = 42, rax still 42

    ; Immediate (literal) to register
    mov rcx, 0xFF       ; rcx = 255
    mov rdx, 0b1010     ; rdx = 10 (binary literal)
    mov rsi, 'A'        ; rsi = 65 (ASCII for 'A')

    ; Memory to register (load)
    ; Square brackets = "the value at this address"
    mov rax, [some_var]     ; rax = value stored at some_var

    ; Register to memory (store)
    mov [some_var], rbx     ; store rbx at address some_var

    ; Immediate to memory — must specify size
    mov qword [some_var], 99   ; store 64-bit value 99
    mov dword [some_var], 99   ; store 32-bit value 99
    mov  word [some_var], 99   ; store 16-bit value 99
    mov  byte [some_var], 99   ; store  8-bit value 99

    ; Address arithmetic in brackets
    mov rax, [rbp - 8]     ; load from rbp minus 8 bytes
    mov rax, [rdi + rcx*8] ; load from rdi + rcx*8 (array indexing!)

    ; lea — load effective address (compute address, don't dereference)
    lea rax, [rbp - 8]     ; rax = rbp - 8 (the address, not the value)
    lea rdi, [rel msg]     ; rdi = address of msg (position-independent)

    mov rax, 60
    xor rdi, rdi
    syscall

section .data
    some_var dq 0   ; dq = define quadword (8 bytes), initialized to 0
    msg      db "hi", 0`,
        },
        {
          type: 'code',
          language: 'nasm',
          content: `; Size specifiers and their meanings:
; byte   —  8 bits (1 byte)   — db, al, bl, cl...
; word   — 16 bits (2 bytes)  — dw, ax, bx, cx...
; dword  — 32 bits (4 bytes)  — dd, eax, ebx...
; qword  — 64 bits (8 bytes)  — dq, rax, rbx...

; IMPORTANT: writing to a 32-bit register (eax) zero-extends to 64-bit (rax)
; but writing to 8-bit or 16-bit does NOT zero the upper bits!
mov rax, 0xFFFFFFFFFFFFFFFF
mov al,  0x00               ; rax = 0xFFFFFFFFFFFFFF00 (upper bytes unchanged!)
mov eax, 0x00               ; rax = 0x0000000000000000 (zero-extended!)

; xchg — swap two registers (no temp needed)
xchg rax, rbx

; movzx — move with zero extension
movzx rax, byte [some_byte]   ; load 1 byte into rax, zero-fill upper 56 bits

; movsx — move with sign extension (preserves sign bit)
movsx rax, byte [some_signed]  ; e.g., -1 (0xFF) becomes 0xFFFFFFFFFFFFFFFF`,
        },
        {
          type: 'tip',
          content: '`lea` (Load Effective Address) is useful for pointer arithmetic without touching memory. `lea rax, [rbx + rcx*4 + 8]` is a single instruction that computes rbx + rcx*4 + 8 and puts the result in rax — no load, no side effects. Compilers use it for fast multiplication by small constants.',
        },
      ],
    },
    {
      slug: 'arithmetic-logic',
      title: 'Arithmetic & Logic',
      intro: "The CPU can add, subtract, multiply, divide, and do bitwise operations. Every result updates the FLAGS register — a set of bits that record whether the result was zero, negative, overflowed, etc. Branches read those flags.",
      sections: [
        {
          type: 'code',
          language: 'nasm',
          content: `; Arithmetic
add rax, rbx        ; rax = rax + rbx
sub rax, 10         ; rax = rax - 10
inc rax             ; rax = rax + 1  (faster than add rax, 1)
dec rax             ; rax = rax - 1
neg rax             ; rax = -rax  (two's complement negate)

; imul — signed multiply
imul rax, rbx       ; rax = rax * rbx (lower 64 bits)
imul rax, rbx, 7    ; rax = rbx * 7 (three-operand form)

; idiv — signed divide (uses rdx:rax as 128-bit dividend)
; Prepare: sign-extend rax into rdx with cqo
cqo                 ; sign extend rax -> rdx:rax
idiv rbx            ; rax = rdx:rax / rbx (quotient)
                    ; rdx = rdx:rax % rbx (remainder)

; Bitwise
and rax, rbx        ; rax = rax & rbx
or  rax, rbx        ; rax = rax | rbx
xor rax, rbx        ; rax = rax ^ rbx
not rax             ; rax = ~rax  (bitwise NOT)

; xor reg, reg — idiomatic zero a register (smaller encoding than mov reg, 0)
xor eax, eax        ; eax = 0 (also zeros rax via zero-extension)

; Shifts
shl rax, 3          ; rax = rax << 3  (multiply by 8)
shr rax, 1          ; rax = rax >> 1  (divide by 2, unsigned)
sar rax, 1          ; rax = rax >> 1  (arithmetic, preserves sign)
rol rax, 4          ; rotate left 4 bits
ror rax, 4          ; rotate right 4 bits`,
        },
        {
          type: 'code',
          language: 'nasm',
          content: `; FLAGS register — bits set by arithmetic/logic instructions
; ZF (zero flag)  — set if result == 0
; SF (sign flag)  — set if result < 0 (MSB is 1)
; CF (carry flag) — set if unsigned overflow occurred
; OF (of flag)    — set if signed overflow occurred
; PF (parity flag)— set if number of 1-bits is even

; cmp — subtract without storing result, just sets flags
cmp rax, rbx        ; sets flags based on (rax - rbx)
cmp rax, 0          ; common: check if rax is zero

; test — AND without storing result, just sets flags
test rax, rax       ; sets ZF if rax == 0 (common pattern!)
test rax, 1         ; sets ZF if rax is even (check lowest bit)

; Conditional moves (branchless programming)
cmp rax, rbx
cmovg  rax, rbx     ; rax = rbx  if rax > rbx (signed greater)
cmovge rax, rbx     ; rax = rbx  if rax >= rbx
cmovl  rax, rbx     ; rax = rbx  if rax < rbx
cmove  rax, rbx     ; rax = rbx  if equal (ZF set)
cmovne rax, rbx     ; rax = rbx  if not equal

; Example: max(rax, rbx) without branching
cmp rax, rbx
cmovl rax, rbx      ; if rax < rbx, rax = rbx`,
        },
        {
          type: 'tip',
          content: 'Bit manipulation tricks that compilers know and you should too: `x & (x-1)` clears the lowest set bit, `x & (-x)` isolates the lowest set bit, `x | (x-1)` sets all bits below the lowest set bit, `(x >> 63)` extracts the sign bit of a 64-bit value. These appear constantly in optimized code.',
        },
      ],
    },
    {
      slug: 'control-flow',
      title: 'Control Flow & Loops',
      intro: "Assembly has no if/else, no for loops. It has unconditional jumps (`jmp`) and conditional jumps that read the FLAGS register. Every higher-level control structure is built from these two primitives.",
      sections: [
        {
          type: 'code',
          language: 'nasm',
          content: `; Unconditional jump
jmp label           ; jump to label (like goto)

; Conditional jumps — read FLAGS set by cmp/test
; After cmp rax, rbx:
je  label           ; jump if equal       (ZF=1)
jne label           ; jump if not equal   (ZF=0)
jg  label           ; jump if greater     (signed: ZF=0, SF=OF)
jge label           ; jump if >=
jl  label           ; jump if less        (signed: SF≠OF)
jle label           ; jump if <=
ja  label           ; jump if above       (unsigned greater: CF=0, ZF=0)
jb  label           ; jump if below       (unsigned less: CF=1)
jz  label           ; same as je  (jump if zero)
jnz label           ; same as jne (jump if not zero)
js  label           ; jump if sign (SF=1, result negative)

; if (rax > 0) { do something }
test rax, rax       ; set flags from rax
jle  .skip          ; jump if rax <= 0
; ... "then" block ...
.skip:

; if-else
cmp rax, 10
jge .else
; ... "then" block (rax < 10) ...
jmp .end
.else:
; ... "else" block (rax >= 10) ...
.end:`,
        },
        {
          type: 'code',
          language: 'nasm',
          content: `; Loop: sum = 0; for i in 0..9: sum += i
section .text
global _start

_start:
    xor rax, rax        ; rax = 0 (sum)
    xor rcx, rcx        ; rcx = 0 (i)

.loop:
    add rax, rcx        ; sum += i
    inc rcx             ; i++
    cmp rcx, 10
    jl  .loop           ; if i < 10, loop again

    ; rax now holds 45 (0+1+2+...+9)

    mov rdi, rax        ; exit with the sum as status code (visible via $?)
    mov rax, 60
    syscall

; loop instruction — uses rcx as counter (decrement + jnz in one instruction)
; (less common in modern code, but valid)
    mov rcx, 10
.loop2:
    ; ... loop body ...
    loop .loop2         ; rcx--; if rcx != 0 goto .loop2

; Nested loop: 3x3 matrix print (indices only, no actual print here)
    xor r12, r12        ; row = 0
.outer:
    xor r13, r13        ; col = 0
.inner:
    ; do something with r12=row, r13=col
    inc r13
    cmp r13, 3
    jl .inner           ; col < 3
    inc r12
    cmp r12, 3
    jl .outer           ; row < 3`,
        },
        {
          type: 'note',
          content: "Labels starting with `.` (like `.loop`, `.skip`) are local labels — they're scoped to the enclosing non-local label. This avoids name collisions in large files and is the conventional style in NASM.",
        },
      ],
    },
    {
      slug: 'the-stack',
      title: 'The Stack & Functions',
      intro: "The stack is how functions store local variables and return addresses. `push` and `pop` move data on and off it. Understanding the stack is the key to understanding function calls, recursion, and most security vulnerabilities.",
      sections: [
        {
          type: 'code',
          language: 'nasm',
          content: `; Stack mechanics
; rsp = stack pointer, always points to the last pushed value
; Stack grows DOWNWARD (rsp decreases as you push)

push rax        ; rsp -= 8, [rsp] = rax
pop  rbx        ; rbx = [rsp], rsp += 8

; Manually allocate stack space for local variables
sub rsp, 32     ; reserve 32 bytes for locals
; ... use [rsp], [rsp+8], [rsp+16], [rsp+24] ...
add rsp, 32     ; free the space (must match the sub!)

; call and ret — the function call mechanism
; call label:
;   push the return address (rip + instruction size) onto the stack
;   jmp label
; ret:
;   pop the return address from the stack
;   jmp to it

call my_function
; execution resumes here after ret

my_function:
    ; Standard function prologue
    push rbp            ; save caller's base pointer
    mov  rbp, rsp       ; establish new stack frame
    sub  rsp, 16        ; reserve 16 bytes for locals (keep rsp 16-byte aligned!)

    ; Local variables live at [rbp-8], [rbp-16], etc.
    mov qword [rbp-8], 42

    ; ... function body ...

    ; Standard function epilogue
    mov rsp, rbp        ; restore rsp (discard locals)
    pop rbp             ; restore caller's rbp
    ret                 ; pop return address, jump to it`,
        },
        {
          type: 'code',
          language: 'nasm',
          content: `; x86-64 System V ABI — the calling convention used on Linux/macOS
; Integer/pointer arguments passed in: rdi, rsi, rdx, rcx, r8, r9
; Further arguments go on the stack
; Return value in rax (and rdx for 128-bit returns)
; Caller-saved: rax, rcx, rdx, rsi, rdi, r8-r11 (callee may trash these)
; Callee-saved: rbx, rbp, r12-r15 (callee must restore these)
; rsp must be 16-byte aligned before a call instruction

; Example: add(a, b) → rdi=a, rsi=b, return rax
add_two:
    push rbp
    mov  rbp, rsp

    mov  rax, rdi       ; rax = a
    add  rax, rsi       ; rax = a + b
    ; return value is in rax — caller reads it from there

    pop  rbp
    ret

; Calling it:
;   mov rdi, 10    ; first arg
;   mov rsi, 32    ; second arg
;   call add_two
;   ; rax = 42

; Recursive factorial
; factorial(n): if n <= 1 return 1; else return n * factorial(n-1)
factorial:
    push rbp
    mov  rbp, rsp
    push rbx            ; save rbx (callee-saved)

    mov  rbx, rdi       ; save n in rbx
    cmp  rdi, 1
    jle  .base

    dec  rdi            ; n - 1
    call factorial      ; recursive call — result in rax
    imul rax, rbx       ; rax = n * factorial(n-1)
    jmp  .done

.base:
    mov rax, 1          ; base case: return 1

.done:
    pop  rbx
    pop  rbp
    ret`,
        },
        {
          type: 'warning',
          content: "The stack must be 16-byte aligned before any `call` instruction — the ABI requires it for SSE/AVX instructions. A `call` pushes 8 bytes (return address), so rsp becomes misaligned by 8 inside a function. The standard prologue (`push rbp; mov rbp, rsp`) restores alignment because push is another 8 bytes (8+8=16). If you skip the prologue, align manually: `sub rsp, 8` before calling external functions.",
        },
      ],
    },
    {
      slug: 'syscalls',
      title: 'System Calls',
      intro: "A syscall is the gate between user space and the kernel. Reading files, writing to the terminal, allocating memory, creating threads — all of it goes through syscalls. In x86-64 Linux, the interface is beautifully simple.",
      sections: [
        {
          type: 'code',
          language: 'nasm',
          content: `; Linux x86-64 syscall convention:
; rax = syscall number
; rdi = argument 1
; rsi = argument 2
; rdx = argument 3
; r10 = argument 4
; r8  = argument 5
; r9  = argument 6
; Return value in rax (negative = error, -(errno))

; Key Linux syscall numbers:
; 0   read    (fd, buf, count)
; 1   write   (fd, buf, count)
; 2   open    (path, flags, mode)
; 3   close   (fd)
; 9   mmap    (addr, length, prot, flags, fd, offset)
; 11  munmap  (addr, length)
; 39  getpid  ()
; 57  fork    ()
; 59  execve  (path, argv, envp)
; 60  exit    (status)
; 231 exit_group (status)

; Read from stdin into buffer
section .bss
    buf resb 128    ; reserve 128 uninitialized bytes

section .text
global _start

_start:
    ; sys_read(fd=0, buf, count=128)
    mov rax, 0          ; read
    mov rdi, 0          ; stdin
    mov rsi, buf
    mov rdx, 128
    syscall
    ; rax = number of bytes actually read (or negative errno)

    ; Echo it back — write the bytes we just read
    mov rdx, rax        ; count = bytes read
    mov rax, 1          ; write
    mov rdi, 1          ; stdout
    mov rsi, buf
    syscall

    ; Exit cleanly
    mov rax, 60
    xor rdi, rdi
    syscall`,
        },
        {
          type: 'code',
          language: 'nasm',
          content: `; Open, read, and print a file
section .data
    filename db "/etc/hostname", 0   ; null-terminated path

section .bss
    filebuf resb 256

section .text
global _start

_start:
    ; open(filename, O_RDONLY=0)
    mov rax, 2              ; sys_open
    lea rdi, [rel filename] ; path
    xor rsi, rsi            ; flags = O_RDONLY (0)
    xor rdx, rdx            ; mode = 0 (ignored for read-only)
    syscall
    ; rax = file descriptor (or negative error)
    mov r12, rax            ; save fd in r12 (callee-saved)

    ; read(fd, buf, 256)
    mov rax, 0              ; sys_read
    mov rdi, r12            ; fd
    lea rsi, [rel filebuf]  ; buffer
    mov rdx, 256            ; max bytes
    syscall
    mov r13, rax            ; save bytes read

    ; write(stdout, buf, bytes_read)
    mov rax, 1
    mov rdi, 1
    lea rsi, [rel filebuf]
    mov rdx, r13
    syscall

    ; close(fd)
    mov rax, 3
    mov rdi, r12
    syscall

    ; exit(0)
    mov rax, 60
    xor rdi, rdi
    syscall`,
        },
        {
          type: 'tip',
          content: 'The syscall table is in `/usr/include/asm/unistd_64.h` or at `man 2 syscalls`. You can also trace syscalls of any running program with `strace ./program` — this is incredibly useful for understanding what your OS is doing and for debugging segfaults that happen inside libc.',
        },
      ],
    },
    {
      slug: 'calling-c',
      title: 'Calling C Functions from ASM',
      intro: "You don't have to do everything in raw assembly. Linking against libc gives you printf, malloc, file I/O, and the entire C standard library — while your hot paths stay in assembly.",
      sections: [
        {
          type: 'code',
          language: 'nasm',
          content: `; Link with libc: nasm -f elf64 main.asm -o main.o && gcc main.o -o main -no-pie
; (gcc handles linking libc and the C runtime startup)
; Entry point becomes main instead of _start

extern printf
extern malloc
extern free
extern strlen
extern puts

section .data
    fmt_int  db "Value: %ld", 10, 0     ; printf format string (null-terminated)
    fmt_str  db "Hello, %s!", 10, 0
    mystr    db "World", 0

section .text
global main

main:
    push rbp
    mov  rbp, rsp
    sub  rsp, 16            ; align and reserve locals

    ; printf("Value: %ld\\n", 42)
    lea  rdi, [rel fmt_int] ; format string (1st arg)
    mov  rsi, 42            ; integer (2nd arg)
    xor  eax, eax           ; rax = 0 (no vector regs used — required for variadic!)
    call printf

    ; printf("Hello, %s!\\n", "World")
    lea  rdi, [rel fmt_str]
    lea  rsi, [rel mystr]
    xor  eax, eax
    call printf

    ; puts("simple string")
    lea  rdi, [rel mystr]
    call puts

    ; malloc(128) — allocate 128 bytes
    mov  rdi, 128
    call malloc             ; rax = pointer to 128 bytes (or NULL)
    mov  r12, rax           ; save pointer

    ; strlen(pointer)
    mov  rdi, r12
    call strlen             ; rax = length

    ; free(pointer)
    mov  rdi, r12
    call free

    ; return 0 from main
    xor  eax, eax
    leave                   ; equivalent to: mov rsp, rbp; pop rbp
    ret`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Assemble and link with libc via gcc
nasm -f elf64 main.asm -o main.o
gcc main.o -o main -no-pie
./main

# -no-pie: disable position-independent executable
# (PIE changes how globals/extern are addressed, complicates assembly)

# See what symbols your .o needs from external libs:
nm -u main.o

# See what libc functions a compiled binary calls:
objdump -d main | grep call
ltrace ./main   # trace library calls at runtime
strace ./main   # trace syscalls at runtime`,
        },
        {
          type: 'note',
          content: "For variadic C functions like `printf`, you must set `rax = number of XMM registers used for floating-point arguments`. If you're not passing floats, `xor eax, eax` is always correct. Forgetting this causes silent crashes or garbage output when printf tries to read FP arguments that don't exist.",
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: String Operations',
      intro: "Let's write a small library of string utilities in pure assembly — strlen, strcpy, strcmp, and a number-to-string converter. No libc. Just registers, memory, and loops.",
      sections: [
        {
          type: 'code',
          language: 'nasm',
          content: `; strings.asm — string utility library + demo
; nasm -f elf64 strings.asm -o strings.o && ld strings.o -o strings && ./strings

section .data
    str1  db "Hello, Assembly!", 0
    str2  db "Hello, Assembly!", 0
    str3  db "Different string", 0
    newln db 10, 0

section .bss
    outbuf resb 32      ; output buffer for number conversion

section .text
global _start

; strlen(rdi: *str) -> rax: length
strlen:
    xor  rax, rax           ; rax = 0 (counter)
.loop:
    cmp  byte [rdi + rax], 0
    je   .done
    inc  rax
    jmp  .loop
.done:
    ret

; puts(rdi: *str) — print string + newline
puts_asm:
    push rbx
    mov  rbx, rdi
    call strlen             ; rax = length
    mov  rdx, rax           ; count
    mov  rax, 1             ; sys_write
    mov  rdi, 1             ; stdout
    mov  rsi, rbx           ; string pointer
    syscall
    ; print newline
    mov  rax, 1
    mov  rdi, 1
    lea  rsi, [rel newln]
    mov  rdx, 1
    syscall
    pop  rbx
    ret

; strcmp(rdi: *s1, rsi: *s2) -> rax: 0 if equal, nonzero if not
strcmp_asm:
    xor  rax, rax
.loop:
    mov  al,  byte [rdi]    ; al = *s1
    mov  ah,  byte [rsi]    ; ah = *s2
    cmp  al,  ah
    jne  .differ
    test al,  al            ; end of string?
    jz   .equal
    inc  rdi
    inc  rsi
    jmp  .loop
.equal:
    xor  rax, rax
    ret
.differ:
    movzx rax, al
    movzx rcx, ah
    sub   rax, rcx          ; return difference (like C strcmp)
    ret

; itoa(rdi: number, rsi: *buf) -> rax: *buf (null-terminated decimal string)
itoa:
    push rbp
    mov  rbp, rsp
    push rbx
    push r12
    push r13

    mov  r12, rsi           ; save buf start
    mov  rbx, rdi           ; save number

    ; Handle 0 specially
    test rbx, rbx
    jnz  .convert
    mov  byte [r12], '0'
    mov  byte [r12+1], 0
    lea  rax, [r12]
    jmp  .done

.convert:
    ; Write digits in reverse, then flip
    mov  r13, rsi           ; current position in buffer
    mov  rax, rbx
.digit_loop:
    xor  rdx, rdx
    mov  rcx, 10
    div  rcx                ; rax = rax/10, rdx = rax%10
    add  dl,  '0'
    mov  byte [r13], dl
    inc  r13
    test rax, rax
    jnz  .digit_loop
    mov  byte [r13], 0      ; null terminate

    ; Reverse the string (r12..r13-1)
    mov  rdi, r12
    lea  rsi, [r13-1]
.reverse:
    cmp  rdi, rsi
    jge  .reversed
    mov  al,  byte [rdi]
    mov  bl,  byte [rsi]
    mov  byte [rdi], bl
    mov  byte [rsi], al
    inc  rdi
    dec  rsi
    jmp  .reverse
.reversed:
    lea  rax, [r12]

.done:
    pop  r13
    pop  r12
    pop  rbx
    pop  rbp
    ret

_start:
    ; Test strlen
    lea  rdi, [rel str1]
    call strlen
    ; rax = 16

    ; Print str1
    lea  rdi, [rel str1]
    call puts_asm

    ; Test strcmp — equal strings
    lea  rdi, [rel str1]
    lea  rsi, [rel str2]
    call strcmp_asm
    ; rax = 0 (equal)

    ; Test strcmp — different strings
    lea  rdi, [rel str1]
    lea  rsi, [rel str3]
    call strcmp_asm
    ; rax != 0 (different)

    ; Convert 2024 to string and print
    mov  rdi, 2024
    lea  rsi, [rel outbuf]
    call itoa
    mov  rdi, rax
    call puts_asm

    mov  rax, 60
    xor  rdi, rdi
    syscall`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `nasm -f elf64 strings.asm -o strings.o
ld strings.o -o strings
./strings
# Hello, Assembly!
# 2024

# Inspect generated machine code:
objdump -d strings | head -60

# Check binary size (should be tiny — no libc):
ls -lh strings`,
        },
        {
          type: 'tip',
          content: "Use `gdb` to step through assembly line by line: `gdb ./strings`, then `layout asm` for the disassembly view, `layout regs` for register display, `si` to step one instruction. Or use `gdb -tui`. Seeing registers change as each instruction executes makes assembly click faster than anything else.",
        },
      ],
    },
  ],
}
