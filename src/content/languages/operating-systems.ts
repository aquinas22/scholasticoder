import { Language } from '../types'

export const operatingSystems: Language = {
  slug: 'operating-systems',
  name: 'Operating Systems',
  tagline: 'The program that runs all your programs.',
  description: "The OS is the layer between your code and the hardware: it decides which program runs when, hands out memory, turns 'open this file' into disk operations, and keeps processes from trampling each other. Every language and every app sits on these ideas — processes, threads, files, system calls. Learn them once, understand computing forever.",
  accentColor: '#3FA65C',
  textOnAccent: '#fff',
  icon: 'OS',
  difficulty: 'advanced',
  usedFor: ['Systems Programming', 'DevOps & Servers', 'Debugging', 'Performance', 'CS Fundamentals'],
  notableUsers: ['Linux', 'Windows', 'macOS', 'Android', 'iOS'],
  setup: {
    description: "Concepts track — nothing to install. The best lab is a Linux shell: WSL on Windows, Terminal on macOS, or any Linux box. Commands below let you watch your OS work in real time.",
    windows: `# Install WSL (a real Linux kernel inside Windows):
wsl --install

# Then inside WSL, watch the OS at work:
ps aux          # every process
top             # live process view
free -h         # memory usage`,
    mac: `# Built-in tools:
ps aux          # every process
top             # live view (or Activity Monitor.app)
vm_stat         # virtual memory stats

# Activity Monitor shows processes, threads,
# memory pressure, and energy — all lesson topics.`,
    linux: `# You're already in the lab:
ps aux            # every process
top / htop        # live view
free -h           # memory
cat /proc/self/status | head    # the kernel's view of THIS shell
strace ls         # every system call 'ls' makes`,
  },
  lessons: [
    {
      slug: 'what-an-os-does',
      title: 'What an OS Actually Does',
      intro: "Strip away the desktop and wallpaper: an operating system is a resource manager and a bodyguard. It multiplexes one CPU among hundreds of programs, and stops each one from wrecking the others.",
      sections: [
        {
          type: 'text',
          content: "Three jobs. Abstraction: turn ugly hardware (disk sectors, network chips, interrupts) into clean concepts (files, sockets, processes). Multiplexing: share limited CPU, RAM, and disk among many programs that each think they own the machine. Protection: isolate programs from each other and the kernel from everyone, so a crashing game can't take down your unsaved document.",
        },
        {
          type: 'code',
          language: 'text',
          content: `The layer cake:

  your app (Chrome, your Python script)
  ------------------------------------ user space
  standard library (libc, CPython, JVM)
  ==================================== system call boundary
  kernel: scheduler | memory | filesystems | drivers | network
  ------------------------------------
  hardware: CPU, RAM, SSD, NIC, GPU

Everything above the ==== line can crash safely.
Everything below it runs with total power.`,
        },
        {
          type: 'text',
          content: "The CPU itself enforces the boundary with privilege modes: kernel code runs in a privileged mode that can touch any memory and any device; your programs run in user mode, where dangerous instructions and other programs' memory are off-limits. Crossing the line happens only through system calls — the kernel's official API.",
        },
        {
          type: 'note',
          content: "Kernel panics (Linux) and Blue Screens (Windows) are what happens when code below the line hits a bug — there's no safety net beneath the kernel, so the OS stops everything rather than corrupt your data. A user program crashing is Tuesday; a kernel crash is an event.",
        },
      ],
    },
    {
      slug: 'processes',
      title: 'Processes',
      intro: "A process is a running program plus everything it owns: its memory, its open files, its identity. It's also the OS's unit of protection — each process lives in its own bubble.",
      sections: [
        {
          type: 'text',
          content: "A program is a file on disk; a process is that program running. Each process gets its own virtual address space (it thinks it has all of memory to itself), its own file descriptor table, an ID (PID), an owner, and a parent. Chrome with 40 tabs is dozens of processes on purpose — one tab crashing can't corrupt another.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `ps aux | head            # snapshot of all processes
# USER  PID  %CPU %MEM  ... COMMAND
# noah  4312 12.0  2.3  ... firefox

pstree | head            # processes form a family tree
echo $$                  # PID of your shell
kill 4312                # ask process 4312 to exit (SIGTERM)
kill -9 4312             # force it, no cleanup (SIGKILL)

# A process's memory layout, roughly:
#  [ code | globals | heap ->     ...      <- stack ]
#  heap grows up (malloc/new), stack grows down (calls)`,
        },
        {
          type: 'code',
          language: 'python',
          content: `# Creating processes — the Unix way is fork + exec:
import os, subprocess

# High level (what you'll actually use):
result = subprocess.run(["ls", "-l"], capture_output=True, text=True)
print(result.stdout)

# What's underneath: fork() clones the current process;
# exec() replaces the clone's program with a new one.
pid = os.fork()
if pid == 0:
    os.execvp("echo", ["echo", "I am the child"])
else:
    os.waitpid(pid, 0)     # parent waits for child to finish
    print("child done")`,
        },
        {
          type: 'note',
          content: "Signals are the OS's way to poke a process: Ctrl+C sends SIGINT, kill sends SIGTERM (please exit — handlers can run cleanup), kill -9 sends SIGKILL (unblockable, immediate). A 'zombie' is a dead child whose parent hasn't collected its exit status yet — harmless in small numbers, a bug in large ones.",
        },
      ],
    },
    {
      slug: 'threads-scheduling',
      title: 'Threads & the Scheduler',
      intro: "Your machine runs 400 processes on 8 cores. The illusion that they all run 'at once' is the scheduler switching between them thousands of times per second — the greatest magic trick in computing.",
      sections: [
        {
          type: 'text',
          content: "A thread is an execution stream inside a process: its own stack and registers, but sharing the process's memory with sibling threads. Sharing makes communication trivial — and dangerous: two threads writing the same data without coordination is a data race. Processes are isolated and safe; threads are cheap and risky. Every concurrency design chooses a point on that line.",
        },
        {
          type: 'code',
          language: 'text',
          content: `Context switch — how one core runs 'everything at once':

 1. Timer interrupt fires (every few ms)
 2. Kernel saves thread A's registers into memory
 3. Scheduler picks the next thread (priorities, fairness)
 4. Kernel loads thread B's saved registers
 5. Return to user mode — B continues, unaware it ever stopped

Cost: ~1-10 microseconds, plus cold caches afterward.
Thousands of switches per second = smooth multitasking.`,
        },
        {
          type: 'text',
          content: "Threads block constantly — waiting for disk, network, a lock, or user input. A blocked thread costs no CPU: the scheduler just runs someone else. This is why a web server can hold 10,000 idle connections cheaply, and why 'CPU-bound' (needs cores) versus 'I/O-bound' (needs concurrency while waiting) is the first question of performance tuning.",
        },
        {
          type: 'code',
          language: 'python',
          content: `import threading

counter = 0
lock = threading.Lock()

def work():
    global counter
    for _ in range(100_000):
        with lock:            # without this: lost updates,
            counter += 1      # wrong result, different every run

threads = [threading.Thread(target=work) for _ in range(4)]
for t in threads: t.start()
for t in threads: t.join()
print(counter)                # 400000 — only correct WITH the lock`,
        },
        {
          type: 'warning',
          content: "Locks fix races but introduce deadlock: thread A holds lock 1 and wants lock 2; thread B holds 2 and wants 1; both wait forever. Rule that prevents it: every thread acquires locks in the same global order. Concurrency bugs are timing-dependent — they vanish when you look (add a print, race disappears) — which is why the discipline matters more than debugging skill.",
        },
      ],
    },
    {
      slug: 'memory-management',
      title: 'Memory: Virtual, Paged, Shared',
      intro: "Every process believes it has the entire address space to itself. It's lying — or rather, the OS is lying to it, beautifully. Virtual memory is the OS's single best idea.",
      sections: [
        {
          type: 'text',
          content: "Addresses your program uses are virtual; hardware translates them to physical RAM through per-process page tables, in 4KB chunks called pages. Consequences: processes can't see each other's memory (isolation), each can lay out its memory the same way (simplicity), and the same physical page can appear in many processes (shared libraries — one copy of libc for a thousand processes).",
        },
        {
          type: 'code',
          language: 'text',
          content: `Virtual memory tricks, all from one mechanism:

  Lazy allocation   malloc(1GB) instantly 'succeeds' — pages
                    materialize only when actually touched
  Swap              rarely-used pages evicted to disk; RAM
                    'overcommitted' beyond physical size
  Memory-mapped IO  a file mapped into your address space —
                    reading memory reads the file (mmap)
  Copy-on-write     fork() copies nothing; pages duplicate
                    only when parent or child writes one

A 'page fault' = CPU touched a page with no mapping.
Minor fault: kernel fixes it up (lazy alloc). Normal.
Major fault: page must come from disk. Slow.
Segfault: no legal mapping ever — program dies.`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `free -h                  # total / used / available RAM
# 'available' counts cache the kernel will give back —
# 'Linux ate my RAM' is free RAM being used as disk cache.

cat /proc/$$/status | grep -E 'VmSize|VmRSS'
# VmSize: virtual size (promises). VmRSS: real RAM (truth).

# Watch a memory hog get killed:
# When RAM + swap run out, the kernel's OOM killer
# picks the biggest offender and SIGKILLs it.
dmesg | grep -i "out of memory"`,
        },
        {
          type: 'note',
          content: "This is the machinery under every language's memory story: C's malloc asks the kernel for pages and carves them up; Python/Java/JS garbage collectors manage objects inside pages the same way. When a process's RSS climbs and never falls, that's a leak — in any language.",
        },
      ],
    },
    {
      slug: 'files-and-filesystems',
      title: 'Files, Descriptors & Filesystems',
      intro: "Unix's boldest simplification: everything is a file. Documents, your terminal, network sockets, even random numbers — all read and written through the same tiny interface.",
      sections: [
        {
          type: 'text',
          content: "A filesystem maps names to data: directories are lists of name-to-inode entries, and an inode holds a file's metadata (size, owner, permissions, timestamps) plus pointers to its data blocks on disk. The filename is not the file — several names can point to one inode (hard links), and a file deleted while open lives on until the last descriptor closes.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `ls -li                    # -i shows inode numbers
stat README.md            # everything the inode knows

# Permissions: read/write/execute for user/group/other
# rwxr-xr--  =  owner: rwx, group: r-x, others: r--
chmod u+x script.sh       # let the owner execute
chmod 644 notes.txt       # rw-r--r-- in octal shorthand

# 'Everything is a file':
cat /dev/urandom | head -c 16 | xxd    # random bytes
echo hi > /dev/null                    # the bit bucket
cat /proc/cpuinfo | head -5            # kernel state as files`,
        },
        {
          type: 'code',
          language: 'python',
          content: `# File descriptors: small integers naming open files.
# Every process starts with three:
#   0 = stdin, 1 = stdout, 2 = stderr
import os
fd = os.open("data.txt", os.O_WRONLY | os.O_CREAT)
print(fd)                 # 3 — next free number
os.write(fd, b"hello\\n")
os.close(fd)

# Shell redirection is just descriptor surgery:
#   ./prog > out.txt 2>&1
# means: point fd 1 at out.txt, then point fd 2
# wherever fd 1 points. That's the whole trick.`,
        },
        {
          type: 'tip',
          content: "Writes are buffered at multiple layers — your language's library, then the kernel's page cache. 'Saved' data may sit in RAM for seconds before reaching disk; that's what fsync() and safe-save patterns (write temp file, fsync, rename) are for. Databases obsess over this — now you know why.",
        },
      ],
    },
    {
      slug: 'syscalls-and-ipc',
      title: 'System Calls & Talking Between Processes',
      intro: "Every interesting thing a program does — print, read a file, open a connection — is a polite request to the kernel. Watch the requests and any program's behavior becomes transparent.",
      sections: [
        {
          type: 'text',
          content: "A system call is a controlled jump into the kernel: the program puts a syscall number and arguments in registers and executes a special instruction; the CPU switches to kernel mode at a fixed entry point; the kernel does the work, and returns a result (or an error). There are ~350 syscalls on Linux; a dozen — open, read, write, close, mmap, fork, execve, wait, socket, connect, accept, exit — cover most of what programs do.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# strace shows every syscall a program makes:
strace -c ls        # summary: counts and time per syscall
strace echo hi      # full trace; note write(1, "hi\\n", 3)

# Even print() is a syscall at the bottom:
# python3 -c 'print("hi")'  ends in  write(1, "hi\\n", 3)

# Syscalls are ~100-300ns each — cheap, not free.
# That's why buffered IO exists: 1 write() of 8KB
# beats 8000 write()s of 1 byte, ~1000x.`,
        },
        {
          type: 'text',
          content: "Processes are isolated by design, so the OS provides official channels between them — inter-process communication (IPC). Pipes stream bytes from one process to another (every shell | is one). Sockets do the same across machines. Shared memory maps the same physical pages into two processes — fastest, and reintroduces every threading hazard. Signals poke; files rendezvous.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# A shell pipeline is three processes and two pipes:
cat access.log | grep "500" | wc -l
#   cat's stdout -> pipe -> grep's stdin
#   grep's stdout -> pipe -> wc's stdin
# The kernel moves the bytes; the processes never meet.

# The pipe blocks when full — that's backpressure:
# 'cat' automatically slows to the speed of 'wc'.
# Unix got streaming right in 1973.`,
        },
        {
          type: 'note',
          content: "Containers (Docker) are not virtual machines — they're OS features: namespaces give a process group its own view of PIDs, filesystems, and network; cgroups cap its CPU and memory. Same kernel, walled gardens. A VM boots a whole second OS; a container is just processes wearing blinders — which is why containers start in milliseconds.",
        },
      ],
    },
  ],
}
