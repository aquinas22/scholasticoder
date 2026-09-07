import type { Quaestio } from './types'

/** Disputed questions for the systems, language and computer-science paths. */
export const quaestionesSystems: Record<string, Record<string, Quaestio>> = {
  c: {
    'pointers': {
      question: 'Whether a pointer is a difficult idea?',
      objections: [
        { claim: 'pointers are notoriously hard, so they must involve a difficult concept.', reply: 'The concept is one sentence: a pointer is a variable holding an address. What is hard is the bookkeeping — who owns the memory, how long it lives, whether it was initialised — and that difficulty is about discipline, not about the idea.', code: 'int n = 42;\nint *p = &n;      /* p holds the address of n */\nprintf("%d %p\\n", *p, (void *)p);\n*p = 7;           /* writes through the address */\nprintf("%d\\n", n);   /* 7 */', language: 'c' },
        { claim: 'an array is a pointer, since both can be indexed and passed to functions.', reply: 'An array is a block of elements; a pointer is a variable holding an address. An array name decays to a pointer to its first element in most expressions, which is why the two behave alike when passed, but sizeof tells them apart, and an array cannot be reassigned.' },
        { claim: 'passing a pointer to a function lets the function change the pointer itself.', reply: 'It lets the function change what the pointer points at. To change the caller\'s pointer you must pass its address, a pointer to a pointer. C passes everything by value, pointers included.' },
      ],
      sedContra: 'Kernighan and Ritchie: "Pointers have been lumped with the goto statement as a marvellous way to create impossible-to-understand programs. This is certainly true when they are used carelessly."',
      respondeo: [
        'Memory is a numbered array of bytes. A pointer is a variable whose value is one of those numbers, together with a type saying how to interpret what lives there. & takes an address, * follows one, and pointer arithmetic moves in units of the pointed-to type. Everything else — arrays, strings, structs passed cheaply, dynamic allocation, linked structures — is built on that.',
        'The discipline is where the difficulty lies. Initialise every pointer, never dereference one you have not checked, know who owns each allocation and free it exactly once, and set pointers to NULL after freeing. Tools such as a sanitiser or Valgrind catch what discipline misses.',
      ],
    },
    'dynamic-memory': {
      question: 'Whether memory that is not freed is a problem in a short program?',
      objections: [
        { claim: 'the operating system reclaims everything when the process exits, so leaks in a short program are harmless.', reply: 'True for a program that runs once and exits. But short programs grow into long ones, and a leak inside a loop exhausts memory long before exit. The habit of freeing is what makes the code safe to reuse.' },
        { claim: 'freeing memory twice is harmless because the memory is already gone.', reply: 'A double free corrupts the allocator\'s bookkeeping and is a classic exploitable bug. Free once, then set the pointer to NULL — freeing NULL is defined and does nothing.', code: 'free(buf);\nbuf = NULL;    /* now a second free() is safe and a use is a clean crash */', language: 'c' },
        { claim: 'malloc always succeeds on a modern machine.', reply: 'It returns NULL when it cannot allocate, and a program that does not check dereferences NULL at the worst moment. Check every allocation.' },
      ],
      sedContra: 'C gives the programmer control of memory and, with it, the entire responsibility for it. That bargain is the language.',
      respondeo: [
        'Automatic variables live on the stack and vanish when their scope ends. Anything that must outlive its scope, or whose size is not known at compile time, is allocated on the heap with malloc or calloc and returned with free. The programmer decides both moments, which is what makes C fast and what makes it dangerous.',
        'Adopt rules that make the bookkeeping visible: allocate and free in the same layer, document who owns each pointer, check every allocation, free exactly once and NULL the pointer afterwards. Run the tests under a sanitiser; leaks and use-after-free are found in seconds by a machine and in days by a human.',
      ],
    },
  },
  rust: {
    'ownership': {
      question: 'Whether the borrow checker is an obstacle to be worked around?',
      objections: [
        { claim: 'the compiler rejects programs that would run correctly, so it is too strict.', reply: 'It rejects programs it cannot prove safe, which is a larger set than the unsafe ones. But almost every rejection points at a real question — who owns this, how long does it live — that the programmer had left unanswered. The strictness buys the absence of use-after-free and data races.', code: 'let s = String::from("abbey");\nlet t = s;              // ownership moves to t\n// println!("{}", s);   // error: s no longer owns anything\nprintln!("{}", t);', language: 'rust' },
        { claim: 'cloning everywhere is the practical way to satisfy the checker.', reply: 'It compiles, and for small values it is fine. But a clone in a hot loop is a real cost, and reaching for it reflexively hides the design question the checker is asking. Borrow when you need to read, move when you are done with a value, and clone when a genuinely separate copy is wanted.' },
        { claim: 'garbage collection would solve the same problems more simply.', reply: 'It solves use-after-free and double-free, at the cost of a runtime, pauses and no help at all with data races. Rust\'s rules give memory safety and thread safety with no runtime, which is why it can replace C in kernels and embedded systems.' },
      ],
      sedContra: 'The rules are three sentences: each value has one owner; there may be many shared references or one mutable reference, never both; every reference must not outlive its referent.',
      respondeo: [
        'Ownership is Rust\'s answer to the question every systems language must face: when is this memory released? Each value has exactly one owner, and when the owner goes out of scope the value is dropped. Passing a value moves ownership; borrowing lends access without transferring it, under rules that forbid a mutable borrow alongside any other.',
        'The compiler checks these rules statically, so the errors arrive while you type rather than in production. Read them as design questions. Prefer borrowing for reading, moving for handing off, and lifetimes to state how long a reference is valid. What feels like friction early becomes the reason a Rust program that compiles usually works.',
      ],
    },
    'error-handling': {
      question: 'Whether Rust\'s lack of exceptions makes error handling harder?',
      objections: [
        { claim: 'without exceptions, every call must be checked by hand, which clutters the code.', reply: 'The ? operator does the checking: it returns the error to the caller and continues on success, so the happy path reads like ordinary code while every failure is still handled explicitly.', code: 'fn read_config(path: &str) -> Result<String, std::io::Error> {\n    let text = std::fs::read_to_string(path)?;   // returns early on error\n    Ok(text.trim().to_string())\n}', language: 'rust' },
        { claim: 'unwrap is a reasonable default, since most operations succeed.', reply: 'unwrap panics on failure, which is right only when failure would mean a bug in your own program. For anything that can fail because of the world — a missing file, bad input — return a Result and let the caller decide.' },
        { claim: 'Option and Result are two ways of writing the same thing.', reply: 'Option says a value may be absent and gives no reason; Result says an operation may fail and carries the reason. Choosing correctly tells the reader whether absence is ordinary or exceptional.' },
      ],
      sedContra: 'A function that returns Result cannot have its failure ignored: the compiler warns on an unused Result, so an error must be handled or deliberately passed on.',
      respondeo: [
        'Rust encodes failure in the type system. Result<T, E> is either a value or an error, and Option<T> is either a value or nothing. Because they are ordinary enums, the compiler forces you to consider both cases, and pattern matching or the ? operator makes doing so concise.',
        'In practice: return Result from anything that can fail for external reasons, propagate with ?, convert error types with From, and reserve panic for broken invariants. Libraries define their own error enums; applications often use a crate such as anyhow to carry any error with context.',
      ],
    },
  },
  go: {
    'goroutines-channels': {
      question: 'Whether a goroutine is a thread?',
      objections: [
        { claim: 'a goroutine runs concurrently, so it must be an operating-system thread.', reply: 'Goroutines are scheduled by the Go runtime onto a small pool of OS threads. They start with a couple of kilobytes of stack that grows on demand, so a program can have hundreds of thousands of them; the same number of OS threads would exhaust the machine.' },
        { claim: 'because channels are safe, a program using them cannot deadlock.', reply: 'Channels remove data races, not deadlocks. Sending on an unbuffered channel with no receiver blocks forever, and two goroutines each waiting for the other block together. The runtime detects the total case and panics with "all goroutines are asleep".', code: 'ch := make(chan int)\nch <- 1   // fatal error: all goroutines are asleep - deadlock!', language: 'go' },
        { claim: 'starting a goroutine guarantees it will finish before the program exits.', reply: 'When main returns, the program exits and every goroutine stops where it stands. Use a WaitGroup, a channel or a context to wait for the work you care about.' },
      ],
      sedContra: 'Rob Pike: "Do not communicate by sharing memory; instead, share memory by communicating."',
      respondeo: [
        'A goroutine is a function running concurrently, multiplexed by the Go runtime onto threads it manages. Channels are typed conduits between goroutines: a send blocks until a receive is ready, which both transfers the value and synchronises the two. select waits on several channels at once, and context carries cancellation through a call tree.',
        'Design so that each piece of data is owned by one goroutine and passed on rather than shared. Where sharing is unavoidable, guard it with a mutex. Always know how each goroutine ends, and run the tests with -race, which finds the mistakes review does not.',
      ],
    },
  },
  dsa: {
    'big-o': {
      question: 'Whether an O(n²) algorithm is always worse than an O(n log n) one?',
      objections: [
        { claim: 'the notation says n² grows faster, so the n log n algorithm is always the better choice.', reply: 'Big O describes growth as n becomes large and discards constants. For small n the constants dominate: insertion sort beats merge sort on tiny arrays, which is why real sort implementations switch to it below a threshold. The asymptotic winner is the right default, not a universal law.' },
        { claim: 'O(1) means instant.', reply: 'It means the cost does not grow with the input. A constant-time operation can still be slow — a network request is O(1) in the size of your list and takes 100 milliseconds.' },
        { claim: 'the complexity of a loop is decided by how many lines it contains.', reply: 'It is decided by how many times the work is performed as n grows. A single line inside two nested loops over the input is O(n²); fifty lines in one loop are O(n).', code: '# O(n): one pass\nfor item in items:\n    process(item)\n\n# O(n^2): a pass inside a pass\nfor a in items:\n    for b in items:\n        compare(a, b)', language: 'python' },
      ],
      sedContra: 'Knuth: "Premature optimisation is the root of all evil (or at least most of it) in programming." Complexity guides the choice of algorithm; measurement decides the rest.',
      respondeo: [
        'Big O describes how an algorithm\'s cost grows with the size of its input, ignoring constant factors and lower-order terms. It answers the question that matters when data grows: will this still work at ten times the size? O(1) and O(log n) barely notice; O(n) keeps pace; O(n²) and worse fall over.',
        'Use it to choose the shape of a solution — a hash map instead of a scan, a sort instead of nested comparisons — and then measure, because constants, memory locality and the actual size of your data decide the rest. An algorithm that is asymptotically worse but simple can be the correct choice for a hundred items.',
      ],
    },
    'hash-maps': {
      question: 'Whether a hash map finds a key without looking at the other keys?',
      objections: [
        { claim: 'any lookup must compare against stored keys, so a map cannot be faster than a scan.', reply: 'The hash function turns the key into a number that says where to look. The map goes straight to that slot and compares only the handful of keys that landed there. No scan of the whole table occurs.' },
        { claim: 'a hash map guarantees constant-time lookup.', reply: 'It guarantees it on average. If many keys hash to the same slot — by bad luck or by a crafted attack — lookups degrade toward linear. Good hash functions and resizing keep this rare; the guarantee is expected, not worst-case.' },
        { claim: 'any object can be used as a key.', reply: 'A key must be hashable, which in practice means immutable: mutate a key after inserting and its hash no longer matches its slot, so the entry becomes unreachable. This is why Python forbids lists as keys and allows tuples.', code: 'ok = {(1, 2): "point"}          # tuples are hashable\n# bad = {[1, 2]: "point"}       # TypeError: unhashable type: \'list\'', language: 'python' },
      ],
      sedContra: 'A dictionary lookup in Python compiles to a single BINARY_SUBSCR that consults one bucket, regardless of whether the dictionary holds ten entries or ten million.',
      respondeo: [
        'A hash map stores entries in an array of buckets and uses a hash of the key to choose the bucket. Because the position is computed rather than searched for, insertion, lookup and deletion take about the same time whether the map holds ten items or ten million. Collisions — two keys in one bucket — are resolved by probing or chaining, and the table grows when it fills.',
        'The practical consequences: keys must be immutable and must hash consistently with their equality; ordering is not part of the structure, though Python\'s dict preserves insertion order; and whenever you find yourself scanning a list to find a matching item, a map probably removes the loop entirely.',
      ],
    },
  },
  internet: {
    'dns': {
      question: 'Whether the DNS is a single directory of names?',
      objections: [
        { claim: 'there must be one master list of domains for lookups to agree.', reply: 'The DNS is a hierarchy of independent servers. The root knows the top-level domains, each of those knows its registrars\' name servers, and those know individual zones. No machine holds the whole list; every answer is assembled by following the chain.' },
        { claim: 'a name is resolved fresh on every request.', reply: 'Answers are cached at every level — the browser, the operating system, the resolver — for the time-to-live the zone specifies. This is why a changed record takes time to propagate and why a lookup is usually instant.', code: 'dig +trace scholasticoder.example\n# root -> .example -> authoritative server -> A record', language: 'bash' },
        { claim: 'DNS translates names to addresses and nothing else.', reply: 'A records give addresses, but the same system carries mail routing (MX), aliases (CNAME), text records used for verification (TXT), service discovery (SRV) and more. It is a general distributed database keyed by name.' },
      ],
      sedContra: 'RFC 1034 calls the domain name space "a tree structure" whose authority is delegated at each level. Delegation is the design.',
      respondeo: [
        'The Domain Name System maps names to records through a hierarchy of authority. A resolver asks the root which servers know .com, asks those which servers are authoritative for example.com, and asks those for the record it wants. Each answer carries a time-to-live, and caches at every level make repeat lookups nearly free.',
        'The consequences are practical. Changes take as long as the old time-to-live to disappear, so lower it before a migration. A site can be moved by changing a record rather than an address. And when something is unreachable, the first question is always whether the name resolves at all.',
      ],
    },
    'http-https': {
      question: 'Whether HTTPS only matters for pages that handle passwords?',
      objections: [
        { claim: 'a page with no login has nothing worth encrypting.', reply: 'Encryption is one of three things TLS provides. The others are integrity — nobody can alter the page in transit — and authentication — you are talking to the server you named. Without them, any network between you and the site can inject advertisements, tracking or malware into a plain article.' },
        { claim: 'HTTPS makes a site secure.', reply: 'It secures the channel. The server can still have an injection flaw, weak authentication or leaky permissions. TLS says the bytes arrived unaltered from the right host; it says nothing about what that host does with them.' },
        { claim: 'HTTPS is slow because of the encryption.', reply: 'Modern TLS costs a handshake, which session resumption largely removes, and symmetric encryption that hardware performs at gigabytes per second. HTTP/2 and HTTP/3, which are faster than HTTP/1.1, are available only over TLS.', code: 'GET /index.html HTTP/1.1\nHost: example.com\n\nHTTP/1.1 200 OK\nStrict-Transport-Security: max-age=31536000\nContent-Type: text/html; charset=utf-8', language: 'text' },
      ],
      sedContra: 'Browsers now mark plain HTTP as "not secure" by default, and several features — service workers, geolocation, HTTP/2 — are refused without TLS.',
      respondeo: [
        'HTTP is a request-response protocol: a method, a path, headers and an optional body go out; a status code, headers and a body come back. It is text you can read, which is why it is easy to debug and why anything on the path can read it too. HTTPS wraps the same protocol in TLS, giving confidentiality, integrity and server authentication.',
        'Know the pieces that matter daily: the methods and what they promise, the status classes (2xx success, 3xx redirect, 4xx your fault, 5xx theirs), the headers that control caching and content type, and the fact that TLS protects the channel and nothing above it.',
      ],
    },
  },
  'computer-architecture': {
    'memory-hierarchy': {
      question: 'Whether all memory accesses cost the same?',
      objections: [
        { claim: 'reading any variable is a single instruction, so every read costs the same.', reply: 'The instruction is the same; the time is not. A value in the L1 cache arrives in a few cycles, one in main memory in a few hundred. The processor is idle for the difference, which is why the same algorithm can run ten times faster on data laid out contiguously.', code: '# Summing a Python list of 10 million ints vs a NumPy array:\n# the array is contiguous, so each cache line brings 8 useful values.\nimport numpy as np, time\na = np.arange(10_000_000)\nt = time.perf_counter(); a.sum(); print(round(time.perf_counter() - t, 4))', language: 'python' },
        { claim: 'more memory makes a program faster.', reply: 'Only if it was short of memory. Beyond that, speed comes from touching less memory and touching it in order, so that caches and prefetching work in your favour.' },
        { claim: 'the cache is managed by the operating system.', reply: 'Caches are hardware and invisible to software; the operating system manages virtual memory and paging, a level below. You influence the cache only by how your data is arranged and traversed.' },
      ],
      sedContra: 'A cycle on a modern processor is under a nanosecond; a main-memory access is around eighty. The processor can execute hundreds of instructions in the time one miss takes.',
      respondeo: [
        'Memory is a hierarchy: registers, then several levels of cache, then main memory, then storage. Each level is larger and far slower than the one above. Hardware moves data between them in fixed-size lines, betting that a program will soon reuse what it just touched and touch what lies next to it.',
        'Write code that rewards the bet. Prefer contiguous arrays to scattered structures, walk data in the order it is stored, keep working sets small, and batch work over one pass instead of many. These choices often matter more than the asymptotic complexity for data that fits in memory.',
      ],
    },
  },
  'operating-systems': {
    'processes': {
      question: 'Whether a process and a program are the same thing?',
      objections: [
        { claim: 'a program is what runs, so running one is the same as being a process.', reply: 'A program is a file on disk: instructions and data at rest. A process is one running instance of it, with its own memory, open files and identity. Open the same editor twice and one program has become two processes that cannot see each other\'s memory.' },
        { claim: 'a process can read another process\'s memory if it knows the address.', reply: 'Each process has its own virtual address space; the same address in two processes refers to different physical memory. Sharing requires explicit mechanisms — pipes, sockets, shared memory segments — which the kernel mediates.', code: 'ps -o pid,rss,comm -p $$    # this shell: its own pid and memory\nsleep 60 &                  # a new process with its own space', language: 'bash' },
        { claim: 'threads are lightweight processes and behave the same way.', reply: 'Threads of one process share its address space, which is what makes them cheap to create and dangerous to program: two threads can touch the same variable at the same time, and a crash in one takes the whole process down.' },
      ],
      sedContra: 'The kernel gives each process a page table of its own. That single fact is what separates one running program from another.',
      respondeo: [
        'A process is a program in execution together with everything the kernel tracks about it: an address space, a table of open files, a user, a scheduling state and a process id. Isolation between processes is what keeps one crashing program from taking the machine with it, and the kernel is the only party that can bridge them.',
        'From this follow the daily facts of system programming: fork and exec create and replace processes; pipes and sockets carry data between them; exit codes and signals report and control their end; and choosing between processes and threads is a choice between isolation and shared memory.',
      ],
    },
  },
  compilers: {
    'the-pipeline': {
      question: 'Whether a compiler translates a program line by line?',
      objections: [
        { claim: 'the source is read from top to bottom, so translation must proceed the same way.', reply: 'Reading is sequential; translation is not. The compiler builds a tree of the whole program, resolves names and types across it, optimises across statements and functions, and only then emits code. That is how it can inline a function defined later or eliminate a variable entirely.' },
        { claim: 'an interpreter is simply a slow compiler.', reply: 'They answer different questions. A compiler produces a program to be run later; an interpreter runs it now. Most real systems do both: Python compiles to bytecode and interprets that, and a JIT compiles hot paths to machine code while the program runs.', code: 'import dis\ndef add(a, b):\n    return a + b\ndis.dis(add)   # CPython compiles to bytecode, then interprets it', language: 'python' },
        { claim: 'a syntax error and a type error are found at the same stage.', reply: 'Syntax errors are found by the parser, which cannot build a tree from the text. Type errors are found later, by semantic analysis walking a tree that parsed perfectly well. That is why one syntax error can hide every other diagnostic.' },
      ],
      sedContra: 'The classic pipeline — lexing, parsing, semantic analysis, optimisation, code generation — exists because each stage needs the whole output of the one before it.',
      respondeo: [
        'A compiler is a sequence of translations. The lexer turns characters into tokens; the parser turns tokens into a tree that captures structure; semantic analysis resolves names, checks types and annotates the tree; optimisation rewrites an intermediate representation into a cheaper equivalent; code generation emits instructions for a target, and the linker joins the pieces.',
        'Understanding the stages pays off daily. It explains which errors appear when, why a single missing bracket produces a cascade of nonsense, what a stack trace is showing you, and why the code that runs may differ considerably from the code you wrote while computing the same result.',
      ],
    },
  },
  java: {
    'classes-oop': {
      question: 'Whether Java passes objects by reference?',
      objections: [
        { claim: 'changing a field of an object inside a method changes it for the caller, which is pass by reference.', reply: 'Java passes everything by value; for an object the value passed is a reference. The method can follow that reference and change the object, but assigning a new object to the parameter does not affect the caller\'s variable.', code: 'void rename(Monk m) { m.name = "Bede"; }   // caller sees this\nvoid replace(Monk m) { m = new Monk(); }    // caller sees nothing', language: 'java' },
        { claim: 'comparing two strings with == compares their characters.', reply: '== compares references. Two strings with the same characters may be different objects, and then == is false while equals is true. Literals are interned, which makes == appear to work until the string comes from input.' },
        { claim: 'an interface is a class with no implementation and nothing more.', reply: 'An interface is a contract that unrelated classes can satisfy, which is how Java gets polymorphism without multiple inheritance. Since Java 8 it may also carry default methods, so it is not merely an empty class.' },
      ],
      sedContra: 'The Java Language Specification: "All parameters to methods are passed by value."',
      respondeo: [
        'A Java variable of class type holds a reference to an object, not the object itself. Assignment copies the reference, so two variables can name one object; passing to a method copies the reference, so the method can mutate the object but cannot repoint the caller\'s variable. Primitives hold their values directly and are copied outright.',
        'Two rules follow that prevent most beginner bugs: compare objects with equals (and override it together with hashCode), and be deliberate about whether a method mutates its argument or returns a new value. Immutable classes, such as String and the modern record, make both questions disappear.',
      ],
    },
  },
  cpp: {
    'smart-pointers-raii': {
      question: 'Whether modern C++ still requires manual delete?',
      objections: [
        { claim: 'C++ has no garbage collector, so every new must be matched by a delete written by hand.', reply: 'Ownership is expressed by type instead. unique_ptr frees its object when it goes out of scope; shared_ptr frees when the last owner disappears; containers own their elements. Well-written modern C++ contains almost no explicit delete.', code: '#include <memory>\n\nauto page = std::make_unique<Page>(42);   // freed automatically\n{\n    auto shared = std::make_shared<Index>();\n}   // freed here when the last shared_ptr dies', language: 'cpp' },
        { claim: 'RAII is a technique for memory only.', reply: 'It applies to every resource with a lifetime: files, locks, sockets, database handles. A constructor acquires, a destructor releases, and the compiler guarantees the destructor runs when the scope ends — including when an exception unwinds it.' },
        { claim: 'shared_ptr is the safe default because it never frees too early.', reply: 'It also never frees a cycle, it costs an atomic refcount on every copy, and it obscures who owns what. unique_ptr is the default; reach for shared_ptr only when ownership is genuinely shared.' },
      ],
      sedContra: 'Bjarne Stroustrup on RAII: "Resource acquisition is initialisation — the most important technique in C++ for managing resources."',
      respondeo: [
        'RAII ties a resource\'s lifetime to an object\'s scope. The constructor acquires; the destructor releases; the language guarantees the destructor runs on every path out of the scope, including exceptions. Smart pointers apply this to heap allocations, so ownership becomes visible in the type rather than in comments.',
        'The modern practice: prefer values and containers to raw allocation, use make_unique and make_shared rather than new, take raw pointers or references only as non-owning parameters, and write classes that either manage one resource properly or manage none at all.',
      ],
    },
  },
  asm: {
    'how-cpus-work': {
      question: 'Whether a processor understands the code you write?',
      objections: [
        { claim: 'the CPU runs the program, so it must understand its variables and functions.', reply: 'The processor sees only bytes it decodes as instructions: move this register, add these, jump if a flag is set. Variables, types, functions and objects are conveniences the compiler removes on the way down.', code: 'section .text\nglobal _start\n_start:\n    mov rax, 60      ; syscall number: exit\n    mov rdi, 0       ; status\n    syscall', language: 'nasm' },
        { claim: 'assembly is faster than a compiled language because it is closer to the machine.', reply: 'Hand-written assembly can be faster in narrow cases, but modern compilers apply register allocation, instruction scheduling and vectorisation that a human rarely matches over a whole program. Assembly is learned for understanding and for the few places where it is unavoidable.' },
        { claim: 'a function call is a primitive operation the hardware provides.', reply: 'The hardware provides a jump that saves a return address, plus a stack pointer. Parameters, locals, saved registers and the frame layout are a convention the compiler follows, which is why calling conventions differ between platforms.' },
      ],
      sedContra: 'Compile any program with -S and read the output: the names are gone, and what remains is registers, memory and jumps.',
      respondeo: [
        'A processor repeats one loop: fetch the instruction at the program counter, decode it, execute it, advance. The instructions move data between registers and memory, perform arithmetic and logic, compare values and set flags, and jump conditionally. Everything a language offers is compiled into that vocabulary.',
        'Learning a little assembly changes how you read higher-level code. Stack frames explain recursion limits and stack overflows; registers explain why passing a few arguments is cheap; the flags explain branch-heavy performance; and system calls show exactly where the operating system takes over.',
      ],
    },
  },
}
