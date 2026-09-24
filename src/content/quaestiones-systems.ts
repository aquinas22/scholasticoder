import type { Quaestio } from './types'

/**
 * Common questions for the systems, language and computer-science paths, one per lesson:
 * misconceptions with replies, a source note, and the answer.
 */
export const quaestionesSystems: Record<string, Record<string, Quaestio>> = {
  c: {
    'pointers': {
      question: 'Is a pointer a hard idea?',
      objections: [
        { claim: 'Pointers are famously hard, so the idea behind them must be difficult.', reply: 'The idea fits in one sentence: a pointer is a variable holding an address. The hard part is the bookkeeping (who owns the memory, how long it lives, whether it was initialised), and that is about careful habits, not a difficult concept.', code: 'int n = 42;\nint *p = &n;      /* p holds the address of n */\nprintf("%d %p\\n", *p, (void *)p);\n*p = 7;           /* writes through the address */\nprintf("%d\\n", n);   /* 7 */', language: 'c' },
        { claim: 'An array is a pointer, since both can be indexed and passed to functions.', reply: 'An array is a block of elements; a pointer is a variable holding an address. In most expressions an array name turns into a pointer to its first element, which is why the two behave alike when passed to functions. But sizeof tells them apart, and you cannot reassign an array.' },
        { claim: 'Passing a pointer to a function lets the function change the pointer itself.', reply: 'It lets the function change what the pointer points at. To change the caller\'s pointer you have to pass its address, a pointer to a pointer. C passes everything by value, pointers included.' },
      ],
      sedContra: 'Kernighan and Ritchie, The C Programming Language: "Pointers have been lumped with the goto statement as a marvelous way to create impossible-to-understand programs. This is certainly true when they are used carelessly."',
      respondeo: [
        'Memory is a numbered array of bytes. A pointer is a variable whose value is one of those numbers, plus a type saying how to read what is stored there. & takes an address, * follows one, and pointer arithmetic moves in steps the size of the pointed-to type. Everything else (arrays, strings, passing structs cheaply, dynamic allocation, linked structures) is built on that.',
        'The difficulty is in the habits. Initialise every pointer, never dereference one you have not checked, know who owns each allocation and free it exactly once, and set pointers to NULL after freeing. Tools like a sanitiser or Valgrind catch what you miss.',
      ],
    },
    'dynamic-memory': {
      question: 'Is forgetting to free memory a problem in a short program?',
      objections: [
        { claim: 'The operating system reclaims everything when the process exits, so leaks in a short program are harmless.', reply: 'True for a program that runs once and exits. But short programs grow into long ones, and a leak inside a loop can run out of memory long before exit. The habit of freeing is what makes the code safe to reuse.' },
        { claim: 'Freeing memory twice is harmless because the memory is already gone.', reply: 'A double free corrupts the allocator\'s bookkeeping and is a classic security bug. Free once, then set the pointer to NULL; freeing NULL is defined and does nothing.', code: 'free(buf);\nbuf = NULL;    /* now a second free() is safe and a use is a clean crash */', language: 'c' },
        { claim: 'malloc always succeeds on a modern machine.', reply: 'It returns NULL when it cannot allocate, and a program that does not check will dereference NULL at the worst possible moment. Check every allocation.' },
      ],
      sedContra: 'The C standard says malloc returns "either a null pointer or a pointer to the allocated space", and the space stays allocated until the program calls free.',
      respondeo: [
        'Local variables live on the stack and vanish when their scope ends. Anything that has to outlive its scope, or whose size is not known at compile time, is allocated on the heap with malloc or calloc and handed back with free. You decide both moments, which is what makes C fast and what makes it dangerous.',
        'Use rules that make the bookkeeping visible: allocate and free in the same layer, document who owns each pointer, check every allocation, free exactly once and set the pointer to NULL afterwards. Run your tests under a sanitiser; a tool finds leaks and use-after-free in seconds, where a person might take days.',
      ],
    },
  },
  rust: {
    'ownership': {
      question: 'Is the borrow checker something to work around?',
      objections: [
        { claim: 'The compiler rejects programs that would run fine, so it\'s too strict.', reply: 'It rejects programs it cannot prove safe, which is a bigger set than the unsafe ones. But nearly every rejection points at a real question you left unanswered: who owns this, and how long does it live? The strictness is what rules out use-after-free and data races.', code: 'let s = String::from("hello");\nlet t = s;              // ownership moves to t\n// println!("{}", s);   // error: s no longer owns anything\nprintln!("{}", t);', language: 'rust' },
        { claim: 'Cloning everything is the practical way to keep the checker happy.', reply: 'It compiles, and for small values it is fine. But a clone in a hot loop is a real cost, and cloning by reflex hides the design question the checker is asking. Borrow when you need to read, move when you are done with a value, and clone when you really want a separate copy.' },
        { claim: 'Garbage collection would solve the same problems more simply.', reply: 'It solves use-after-free and double-free, at the cost of a runtime, pauses, and no help at all with data races. Rust\'s rules give memory safety and thread safety with no runtime, which is why it can replace C in kernels and embedded systems.' },
      ],
      sedContra: 'The Rust Book sums up the rules: each value has one owner; you can have many shared references or one mutable reference, never both; and a reference must never outlive the value it points to.',
      respondeo: [
        'Ownership is Rust\'s answer to the question every systems language has to answer: when does this memory get released? Each value has exactly one owner, and when the owner goes out of scope the value is dropped. Passing a value moves ownership; borrowing lends access without handing it over, under rules that forbid a mutable borrow alongside any other.',
        'The compiler checks these rules before the program runs, so the errors show up while you type instead of in production. Treat them as design questions. Borrow for reading, move for handing off, and use lifetimes to say how long a reference is valid. What feels like friction at first becomes the reason a Rust program that compiles usually works.',
      ],
    },
    'error-handling': {
      question: 'Does Rust\'s lack of exceptions make error handling harder?',
      objections: [
        { claim: 'Without exceptions, every call has to be checked by hand, which clutters the code.', reply: 'The ? operator does the checking: it returns the error to the caller and carries on if things succeeded, so the normal path reads like ordinary code while every failure is still handled explicitly.', code: 'fn read_config(path: &str) -> Result<String, std::io::Error> {\n    let text = std::fs::read_to_string(path)?;   // returns early on error\n    Ok(text.trim().to_string())\n}', language: 'rust' },
        { claim: 'unwrap is a reasonable default, since most operations succeed.', reply: 'unwrap panics on failure, which is right only when failure would mean a bug in your own program. For anything that can fail because of the outside world (a missing file, bad input) return a Result and let the caller decide.' },
        { claim: 'Option and Result are two ways of writing the same thing.', reply: 'Option says a value may be missing and gives no reason; Result says an operation may fail and carries the reason. Picking the right one tells the reader whether a missing value is normal or a problem.' },
      ],
      sedContra: 'Result is marked #[must_use], so the compiler warns if you ignore one. An error has to be handled or deliberately passed on.',
      respondeo: [
        'Rust puts failure into the type system. Result<T, E> is either a value or an error, and Option<T> is either a value or nothing. Because they are ordinary enums, the compiler makes you deal with both cases, and pattern matching or the ? operator keeps that short.',
        'In practice: return Result from anything that can fail for outside reasons, pass errors up with ?, convert error types with From, and save panic for situations that mean your own code is broken. Libraries define their own error enums; applications often use a crate such as anyhow to carry any error along with context.',
      ],
    },
  },
  go: {
    'goroutines-channels': {
      question: 'Is a goroutine a thread?',
      objections: [
        { claim: 'A goroutine runs concurrently, so it must be an operating-system thread.', reply: 'The Go runtime schedules goroutines onto a small pool of OS threads. Each starts with a couple of kilobytes of stack that grows as needed, so a program can have hundreds of thousands of them. The same number of OS threads would bring the machine down.' },
        { claim: 'Channels are safe, so a program that uses them can\'t deadlock.', reply: 'Channels remove data races, not deadlocks. Sending on an unbuffered channel with no receiver blocks forever, and two goroutines each waiting on the other block together. The runtime detects the case where everything is stuck and panics with "all goroutines are asleep".', code: 'ch := make(chan int)\nch <- 1   // fatal error: all goroutines are asleep - deadlock!', language: 'go' },
        { claim: 'Starting a goroutine guarantees it will finish before the program exits.', reply: 'When main returns, the program exits and every goroutine stops wherever it is. Use a WaitGroup, a channel or a context to wait for the work you care about.' },
      ],
      sedContra: 'Rob Pike: "Do not communicate by sharing memory; instead, share memory by communicating."',
      respondeo: [
        'A goroutine is a function running concurrently, spread by the Go runtime across threads it manages. Channels are typed pipes between goroutines: a send waits until a receiver is ready, which both hands over the value and syncs the two. select waits on several channels at once, and context carries cancellation down a chain of calls.',
        'Design so each piece of data belongs to one goroutine and gets passed on rather than shared. Where sharing cannot be avoided, protect it with a mutex. Always know how each goroutine ends, and run your tests with -race, which finds the mistakes code review misses.',
      ],
    },
  },
  dsa: {
    'big-o': {
      question: 'Is an O(n²) algorithm always worse than an O(n log n) one?',
      objections: [
        { claim: 'n² grows faster, so the n log n algorithm is always the better choice.', reply: 'Big O describes growth as n gets large and ignores constants. For small n the constants dominate: insertion sort beats merge sort on tiny arrays, which is why real sort implementations switch to it below a certain size. The asymptotic winner is the right default, not a universal law.' },
        { claim: 'O(1) means instant.', reply: 'It means the cost does not grow with the input. A constant-time operation can still be slow: a network request is O(1) in the size of your list and still takes 100 milliseconds.' },
        { claim: 'A loop\'s complexity depends on how many lines it has.', reply: 'It depends on how many times the work runs as n grows. A single line inside two nested loops over the input is O(n²); fifty lines in one loop are O(n).', code: '# O(n): one pass\nfor item in items:\n    process(item)\n\n# O(n^2): a pass inside a pass\nfor a in items:\n    for b in items:\n        compare(a, b)', language: 'python' },
      ],
      sedContra: 'Donald Knuth: "Premature optimization is the root of all evil (or at least most of it) in programming." Complexity guides your choice of algorithm; measuring decides the rest.',
      respondeo: [
        'Big O describes how an algorithm\'s cost grows with the size of its input, ignoring constant factors and smaller terms. It answers the question that matters when data grows: will this still work at ten times the size? O(1) and O(log n) barely notice; O(n) keeps pace; O(n²) and worse fall over.',
        'Use it to pick the shape of a solution (a hash map instead of a scan, a sort instead of nested comparisons) and then measure, because constants, memory layout and the real size of your data decide the rest. A simple algorithm that is worse on paper can be the right choice for a hundred items.',
      ],
    },
    'hash-maps': {
      question: 'Can a hash map find a key without looking at the other keys?',
      objections: [
        { claim: 'Any lookup has to compare against the stored keys, so a map can\'t be faster than a scan.', reply: 'The hash function turns the key into a number that says where to look. The map goes straight to that slot and compares only the few keys that landed there. It never scans the whole table.' },
        { claim: 'A hash map guarantees constant-time lookup.', reply: 'On average, yes. If many keys hash to the same slot, by bad luck or by a deliberate attack, lookups slow down toward linear. Good hash functions and resizing keep this rare; constant time is what you expect, not a worst-case promise.' },
        { claim: 'Any object can be used as a key.', reply: 'A key has to be hashable, which in practice means immutable. Change a key after inserting it and its hash no longer matches its slot, so the entry becomes unreachable. That is why Python forbids lists as keys but allows tuples.', code: 'ok = {(1, 2): "point"}          # tuples are hashable\n# bad = {[1, 2]: "point"}       # TypeError: unhashable type: \'list\'', language: 'python' },
      ],
      sedContra: 'The Python wiki\'s TimeComplexity page lists dict lookup as O(1) on average, whether the dictionary holds ten entries or ten million.',
      respondeo: [
        'A hash map stores entries in an array of buckets and uses a hash of the key to pick the bucket. Because the position is calculated rather than searched for, inserting, looking up and deleting take about the same time whether the map holds ten items or ten million. Collisions, where two keys land in one bucket, are handled by probing or chaining, and the table grows when it fills up.',
        'In practice: keys must be immutable and must hash consistently with how they compare for equality; order is not part of the structure, though Python\'s dict keeps insertion order; and whenever you catch yourself scanning a list for a matching item, a map can probably remove the loop entirely.',
      ],
    },
  },
  internet: {
    'dns': {
      question: 'Is DNS one big directory of names?',
      objections: [
        { claim: 'There must be one master list of domains, or lookups wouldn\'t agree.', reply: 'DNS is a hierarchy of independent servers. The root servers know the top-level domains, each of those knows the name servers for domains under it, and those know the individual records. No machine holds the whole list; every answer is built by following the chain.' },
        { claim: 'A name is looked up fresh on every request.', reply: 'Answers are cached at every level (the browser, the operating system, the resolver) for the time-to-live the domain sets. That is why a changed record takes time to spread and why a lookup is usually instant.', code: 'dig +trace scholasticoder.example\n# root -> .example -> authoritative server -> A record', language: 'bash' },
        { claim: 'DNS turns names into addresses and nothing else.', reply: 'A records give addresses, but the same system carries mail routing (MX), aliases (CNAME), text records used for verification (TXT), service discovery (SRV) and more. It is a general distributed database keyed by name.' },
      ],
      sedContra: 'RFC 1034 describes the domain name space as "a tree structure", with authority for each part handed down (delegated) level by level.',
      respondeo: [
        'The Domain Name System maps names to records through a hierarchy. A resolver asks the root which servers know .com, asks those which servers are in charge of example.com, and asks those for the record it wants. Each answer comes with a time-to-live, and caches at every level make repeat lookups nearly free.',
        'This has practical consequences. A change takes as long as the old time-to-live to fully take effect, so lower it before a migration. You can move a site by changing a record instead of telling everyone a new address. And when something is unreachable, the first thing to check is whether the name resolves at all.',
      ],
    },
    'http-https': {
      question: 'Does HTTPS only matter for pages with passwords?',
      objections: [
        { claim: 'A page with no login has nothing worth encrypting.', reply: 'Encryption is one of three things TLS gives you. The others are integrity (nobody can change the page on the way) and authentication (you are really talking to the server you asked for). Without them, any network between you and the site can inject ads, tracking or malware into a plain article.' },
        { claim: 'HTTPS makes a site secure.', reply: 'It secures the connection. The server can still have an injection bug, weak login checks or leaky permissions. TLS says the bytes arrived unchanged from the right host; it says nothing about what that host does with them.' },
        { claim: 'HTTPS is slow because of the encryption.', reply: 'Modern TLS costs a handshake, which session resumption mostly removes, and symmetric encryption that hardware does at gigabytes per second. Browsers only support HTTP/2 and HTTP/3, which are faster than HTTP/1.1, over TLS.', code: 'GET /index.html HTTP/1.1\nHost: example.com\n\nHTTP/1.1 200 OK\nStrict-Transport-Security: max-age=31536000\nContent-Type: text/html; charset=utf-8', language: 'text' },
      ],
      sedContra: 'Browsers now mark plain HTTP pages as "Not secure", and features like service workers and geolocation only work over HTTPS.',
      respondeo: [
        'HTTP is a request-response protocol: a method, a path, headers and an optional body go out; a status code, headers and a body come back. It is readable text, which makes it easy to debug and also means anything along the way can read it. HTTPS wraps the same protocol in TLS, adding privacy, integrity and proof of the server\'s identity.',
        'Know the pieces you will use every day: the methods and what they promise, the status classes (2xx success, 3xx redirect, 4xx your mistake, 5xx theirs), the headers that control caching and content type, and the fact that TLS protects the connection and nothing beyond it.',
      ],
    },
  },
  'computer-architecture': {
    'memory-hierarchy': {
      question: 'Do all memory accesses cost the same?',
      objections: [
        { claim: 'Reading any variable is a single instruction, so every read costs the same.', reply: 'The instruction is the same; the time is not. A value in the L1 cache arrives in a few cycles, one in main memory in a few hundred. The processor sits idle for the difference, which is why the same algorithm can run ten times faster on data stored side by side.', code: '# Summing a Python list of 10 million ints vs a NumPy array:\n# the array is contiguous, so each cache line brings 8 useful values.\nimport numpy as np, time\na = np.arange(10_000_000)\nt = time.perf_counter(); a.sum(); print(round(time.perf_counter() - t, 4))', language: 'python' },
        { claim: 'More memory makes a program faster.', reply: 'Only if it was running short. Beyond that, speed comes from touching less memory and touching it in order, so caches and prefetching work for you.' },
        { claim: 'The cache is managed by the operating system.', reply: 'Caches are hardware and invisible to software. The operating system manages virtual memory and paging, which is a separate layer. You affect the cache only through how your data is laid out and walked through.' },
      ],
      sedContra: 'A clock cycle on a modern processor is under a nanosecond; a trip to main memory takes around eighty. The processor could run hundreds of instructions in the time one cache miss takes.',
      respondeo: [
        'Memory is layered: registers, then several levels of cache, then main memory, then storage. Each level is bigger and much slower than the one above. The hardware moves data between levels in fixed-size chunks called lines, betting that a program will soon reuse what it just touched and touch what sits next to it.',
        'Write code that makes that bet pay off. Prefer contiguous arrays to scattered structures, walk data in the order it is stored, keep the data you are working on small, and do work in one pass instead of many. For data that fits in memory, these choices often matter more than Big O.',
      ],
    },
  },
  'operating-systems': {
    'processes': {
      question: 'Are a process and a program the same thing?',
      objections: [
        { claim: 'A program is what runs, so running one is the same as being a process.', reply: 'A program is a file on disk: instructions and data sitting still. A process is one running copy of it, with its own memory, open files and ID. Open the same editor twice and one program has become two processes that cannot see each other\'s memory.' },
        { claim: 'A process can read another process\'s memory if it knows the address.', reply: 'Each process has its own virtual address space; the same address in two processes points at different physical memory. Sharing needs an explicit mechanism (pipes, sockets, shared memory), and the kernel sits in the middle.', code: 'ps -o pid,rss,comm -p $$    # this shell: its own pid and memory\nsleep 60 &                  # a new process with its own space', language: 'bash' },
        { claim: 'Threads are lightweight processes and behave the same way.', reply: 'Threads in one process share its address space, which is what makes them cheap to create and tricky to program: two threads can touch the same variable at the same time, and a crash in one takes down the whole process.' },
      ],
      sedContra: 'The kernel gives each process its own page table, which maps its addresses to physical memory. That is what keeps one running program apart from another.',
      respondeo: [
        'A process is a program that is running, plus everything the kernel tracks about it: an address space, a table of open files, a user, a scheduling state and a process ID. Keeping processes apart is what stops one crashing program from taking the whole machine with it, and only the kernel can connect them.',
        'The everyday facts of systems programming follow from this: fork and exec create and replace processes; pipes and sockets carry data between them; exit codes and signals report and control how they end; and choosing between processes and threads is choosing between isolation and shared memory.',
      ],
    },
  },
  compilers: {
    'the-pipeline': {
      question: 'Does a compiler translate a program line by line?',
      objections: [
        { claim: 'The source is read top to bottom, so translation must happen the same way.', reply: 'Reading is in order; translating is not. The compiler builds a tree of the whole program, resolves names and types across it, optimises across statements and functions, and only then outputs code. That is how it can inline a function defined further down or remove a variable entirely.' },
        { claim: 'An interpreter is just a slow compiler.', reply: 'They do different jobs. A compiler produces a program to run later; an interpreter runs it now. Most real systems do both: Python compiles to bytecode and interprets that, and a JIT compiles hot code paths to machine code while the program runs.', code: 'import dis\ndef add(a, b):\n    return a + b\ndis.dis(add)   # CPython compiles to bytecode, then interprets it', language: 'python' },
        { claim: 'Syntax errors and type errors are found at the same stage.', reply: 'Syntax errors are found by the parser, when it cannot build a tree from the text. Type errors come later, from checking a tree that parsed fine. That is why one syntax error can hide every other error message.' },
      ],
      sedContra: 'The classic compiler stages are lexing, parsing, semantic analysis, optimisation and code generation. Each one needs the complete output of the stage before it.',
      respondeo: [
        'A compiler is a series of translations. The lexer turns characters into tokens; the parser turns tokens into a tree that captures the structure; semantic analysis resolves names, checks types and annotates the tree; optimisation rewrites an intermediate form into a cheaper equivalent; code generation outputs instructions for the target machine, and the linker joins the pieces.',
        'Knowing the stages pays off every day. It explains which errors show up when, why one missing bracket produces a flood of nonsense, what a stack trace is showing you, and why the code that runs can look quite different from the code you wrote while still computing the same result.',
      ],
    },
  },
  java: {
    'classes-oop': {
      question: 'Does Java pass objects by reference?',
      objections: [
        { claim: 'Changing an object\'s field inside a method changes it for the caller, so that\'s pass by reference.', reply: 'Java passes everything by value; for an object, the value passed is a reference. The method can follow that reference and change the object, but assigning a new object to the parameter does not affect the caller\'s variable.', code: 'void rename(Person p) { p.name = "Ada"; }       // caller sees this\nvoid replace(Person p) { p = new Person(); }    // caller sees nothing', language: 'java' },
        { claim: 'Comparing two strings with == compares their characters.', reply: '== compares references. Two strings with the same characters can be different objects, and then == is false while equals is true. String literals are shared (interned), which makes == seem to work until the string comes from input.' },
        { claim: 'An interface is just a class with no implementation.', reply: 'An interface is a contract that unrelated classes can fulfil, which is how Java gets polymorphism without multiple inheritance. Since Java 8 it can also have default methods, so it is more than an empty class.' },
      ],
      sedContra: 'The Java Language Specification says that when a method is invoked, the values of the actual argument expressions initialise newly created parameter variables. Java copies values; it never passes the caller\'s variable itself.',
      respondeo: [
        'A Java variable of a class type holds a reference to an object, not the object itself. Assignment copies the reference, so two variables can point at one object. Passing to a method copies the reference too, so the method can change the object but cannot repoint the caller\'s variable. Primitives hold their values directly and are copied outright.',
        'Two rules prevent most beginner bugs: compare objects with equals (and override it together with hashCode), and be deliberate about whether a method changes its argument or returns a new value. Immutable classes, like String and the newer records, make both questions go away.',
      ],
    },
  },
  cpp: {
    'smart-pointers-raii': {
      question: 'Does modern C++ still need manual delete?',
      objections: [
        { claim: 'C++ has no garbage collector, so every new needs a delete written by hand.', reply: 'Ownership is expressed through types instead. unique_ptr frees its object when it goes out of scope; shared_ptr frees it when the last owner goes away; containers own their elements. Well-written modern C++ has almost no explicit delete.', code: '#include <memory>\n\nauto page = std::make_unique<Page>(42);   // freed automatically\n{\n    auto shared = std::make_shared<Index>();\n}   // freed here when the last shared_ptr dies', language: 'cpp' },
        { claim: 'RAII is only a technique for memory.', reply: 'It applies to anything with a lifetime: files, locks, sockets, database handles. The constructor acquires, the destructor releases, and the compiler guarantees the destructor runs when the scope ends, including when an exception unwinds it.' },
        { claim: 'shared_ptr is the safe default because it never frees too early.', reply: 'It also never frees a cycle, it costs an atomic reference count update on every copy, and it hides who owns what. unique_ptr is the default; use shared_ptr only when ownership really is shared.' },
      ],
      sedContra: 'The C++ Core Guidelines, rule R.1: "Manage resources automatically using resource handles and RAII (Resource Acquisition Is Initialization)."',
      respondeo: [
        'RAII ties a resource\'s lifetime to an object\'s scope. The constructor acquires; the destructor releases; the language guarantees the destructor runs on every way out of the scope, including exceptions. Smart pointers apply this to heap memory, so ownership shows up in the type instead of in comments.',
        'Modern practice: prefer plain values and containers to raw allocation, use make_unique and make_shared instead of new, use raw pointers or references only as parameters that do not own anything, and write classes that either manage one resource properly or manage none at all.',
      ],
    },
  },
  asm: {
    'how-cpus-work': {
      question: 'Does the processor understand the code I write?',
      objections: [
        { claim: 'The CPU runs the program, so it must understand its variables and functions.', reply: 'The processor only sees bytes it decodes as instructions: move this into a register, add these, jump if a flag is set. Variables, types, functions and objects are conveniences the compiler strips away on the way down.', code: 'section .text\nglobal _start\n_start:\n    mov rax, 60      ; syscall number: exit\n    mov rdi, 0       ; status\n    syscall', language: 'nasm' },
        { claim: 'Assembly is faster than a compiled language because it\'s closer to the machine.', reply: 'Hand-written assembly can be faster in narrow cases, but modern compilers do register allocation, instruction scheduling and vectorisation that a person rarely beats across a whole program. People learn assembly to understand the machine, and for the few places where nothing else will do.' },
        { claim: 'A function call is a basic operation the hardware provides.', reply: 'The hardware provides a jump that saves a return address, plus a stack pointer. Parameters, local variables, saved registers and the frame layout are a convention the compiler follows, which is why calling conventions differ between platforms.' },
      ],
      sedContra: 'Compile any program with -S and read the output: the names are gone, and what is left is registers, memory and jumps.',
      respondeo: [
        'A processor repeats one loop: fetch the instruction at the program counter, decode it, run it, move on. The instructions move data between registers and memory, do arithmetic and logic, compare values and set flags, and jump based on those flags. Everything a language gives you is compiled down to that.',
        'Learning a little assembly changes how you read higher-level code. Stack frames explain recursion limits and stack overflows; registers explain why passing a few arguments is cheap; flags explain why branch-heavy code can be slow; and system calls show exactly where the operating system takes over.',
      ],
    },
  },
}
