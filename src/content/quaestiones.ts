import type { Quaestio } from './types'

/**
 * Disputed questions in the manner of the Summa, one per lesson. Each states the strongest
 * objections a learner might hold, a short authority on the contrary, and the answer itself.
 * Keyed by path slug, then lesson slug.
 */
export const quaestiones: Record<string, Record<string, Quaestio>> = {
  python: {
    'hello-world': {
      question: 'Whether a program that only prints a line is a real program?',
      objections: [
        { claim: 'a real program must do something useful, and printing a greeting accomplishes nothing.', reply: 'Usefulness is not the measure of a program; a program is any sequence of instructions the machine carries out. print("Hello, World!") exercises the whole pipeline — editor, interpreter, output — and proves the pipeline works. That proof is useful, which is why every language tradition begins here.' },
        { claim: 'since print is built in, the programmer wrote nothing of substance.', reply: 'Every program is built from things the programmer did not write: the interpreter, the operating system, the hardware. Calling print is the same act as calling any function; the substance of programming is choosing which calls to make and in what order.', code: 'print("Hello,", "World!", sep=" — ", end="\\n\\n")\nprint(42, 3.5, True)' },
        { claim: 'a program without input cannot be tested and therefore cannot be correct.', reply: 'Correctness means the output matches what was intended, whatever the input. A constant program has one intended output, and you check it by running it. Tests for larger programs work the same way, many times over.' },
      ],
      sedContra: 'Kernighan and Ritchie opened The C Programming Language (1978) with exactly this program, and every serious language since has followed them.',
      respondeo: [
        'A program is a text that a machine can execute. The smallest one worth writing is the one that proves the machine, the language and you agree on how execution works: where the file goes, how it is run, where the output appears. Hello, World is a handshake, and every larger program relies on the same handshake having succeeded.',
        'It is also the first lesson in the discipline of the craft: write one thing, run it, observe, then change one thing and run again. The habit of running early and often matters more than any feature of the language, and it begins with a single print.',
      ],
    },
    'variables': {
      question: 'Whether a Python variable has a type?',
      objections: [
        { claim: 'since age = 25 and later age = "twenty-five" both work, the variable has no type at all.', reply: 'The name age has no type; the objects 25 and "twenty-five" do. A Python variable is a label that can be moved from one object to another. The type belongs to the object the label currently points at, and type(age) reports that object\'s type.', code: 'age = 25\nprint(type(age))     # <class \'int\'>\nage = "twenty-five"\nprint(type(age))     # <class \'str\'>' },
        { claim: 'because "3" + 4 fails, Python must be secretly declaring types the way C does.', reply: 'Nothing is declared. The failure comes from the objects: a str object and an int object do not know how to add. Python checks the objects at the moment of the operation, not the names at the moment of assignment. That is dynamic typing, and it is strict — Python refuses rather than guessing.' },
        { claim: 'assigning y = x copies the value, so changing x afterwards will not affect y.', reply: 'Assignment never copies. y = x makes both names point at the same object. For immutable objects like numbers and strings this is harmless because the object cannot change. For a list, both names see the same mutations.', code: 'a = [1, 2]\nb = a\nb.append(3)\nprint(a)   # [1, 2, 3]' },
      ],
      sedContra: 'The language reference says: "Every object has an identity, a type and a value." Names are not listed. Types belong to objects.',
      respondeo: [
        'A variable in Python is a name bound to an object. The binding can be changed at any time by assignment, and the same name may be bound to objects of different types over the life of a program. The type lives with the object, and Python checks it whenever an operation is attempted, which is why errors such as adding a string to a number arrive at run time rather than at the point of declaration.',
        'Two consequences follow. First, conversion must be explicit: int("42") produces a new int object; the string is not changed. Second, assignment shares rather than copies, so for mutable objects one must be deliberate about when a copy is wanted. Type hints (name: str) exist to document intent and to let tools check it ahead of time; they do not change the behaviour described here.',
      ],
    },
    'control-flow': {
      question: 'Whether indentation is merely a matter of style?',
      objections: [
        { claim: 'in every other language indentation is decoration, so it must be so in Python too.', reply: 'In C, Java and JavaScript the braces define the block and the indentation is for humans. Python removed the braces and kept the indentation, making it the sole marker of structure. What was a courtesy elsewhere is grammar here.', code: 'if hour < 12:\n    print("matins")\n    print("lauds")     # inside the if\nprint("always")        # outside — the dedent ends the block' },
        { claim: 'a for loop that appears to do nothing on an empty list proves that Python skips such loops for efficiency.', reply: 'The loop body runs once per item; with zero items it runs zero times. Nothing is skipped: the loop is faithfully executed with no iterations. The else clause on a loop, which runs when no break occurred, still runs in that case.' },
        { claim: 'while True is an error, since a condition that is always true can never end.', reply: 'A while loop ends whenever break is executed inside it, or when an exception or return leaves the function. while True with a break is the standard shape for "repeat until something happens in the middle".', code: 'while True:\n    line = input("> ")\n    if line == "quit":\n        break\n    print(line.upper())' },
      ],
      sedContra: 'The Python grammar defines a block as INDENT statements DEDENT. Indentation is a token, not whitespace.',
      respondeo: [
        'Control flow is the order in which statements execute. Conditionals choose one path from several; loops repeat a path. Python marks each path\'s extent by indentation: the statements indented beneath a colon belong to it, and the first line that returns to the previous level ends it. Because the machine reads the structure from the same cue your eye does, code cannot look one way and behave another.',
        'The practical rules follow directly. Use four spaces, never mix tabs and spaces, and end each header (if, elif, else, for, while) with a colon. Read range as a half-open interval that stops before its end. Reach for for when walking a collection and for while when repeating until a condition changes, and use break and continue to shape the loop from inside.',
      ],
    },
    'functions': {
      question: 'Whether a function is worth writing when it is called only once?',
      objections: [
        { claim: 'the purpose of a function is reuse, so single-use code should stay inline.', reply: 'Reuse is one benefit; naming is another and larger one. A function gives a block of code a name, a boundary and a stated contract of inputs and outputs. That lets a reader understand the caller without reading the body, and lets you test the block in isolation. These hold even when the function is called once.' },
        { claim: 'a function\'s parameters are copies, so modifying a list parameter inside the function is safe.', reply: 'Arguments are passed by binding the parameter name to the same object the caller passed. A list parameter is the caller\'s list. Appending to it inside the function changes what the caller sees. Rebinding the parameter to a new list, however, does not.', code: 'def add_item(items, item):\n    items.append(item)      # visible to the caller\n\ndef replace(items):\n    items = ["new"]         # only rebinds the local name\n\nbasket = []\nadd_item(basket, "bread")\nreplace(basket)\nprint(basket)               # [\'bread\']' },
        { claim: 'a default value such as items=[] is evaluated fresh on every call, as in a constructor.', reply: 'Defaults are evaluated once, when the def statement runs, and the same object is reused on every call. A mutable default therefore accumulates state across calls. The idiom is items=None and creating the list inside the body.' },
      ],
      sedContra: 'Dijkstra: "The purpose of abstraction is not to be vague, but to create a new semantic level in which one can be absolutely precise."',
      respondeo: [
        'A function is a named piece of computation with declared inputs and a returned output. Its value lies as much in the naming as in the reuse: it lets you think about a program in larger units, test each unit alone, and change an implementation without touching the callers. That is why experienced programmers extract functions freely, including ones called from a single place.',
        'The mechanics to hold in mind are few. Parameters are bound to the caller\'s objects, so mutating them mutates what the caller sees while rebinding does not. Default values are created once at definition time. A function without a return produces None. Positional arguments come first, then keyword arguments, and *args and **kwargs gather any extras.',
      ],
    },
    'data-structures': {
      question: 'Whether a list is the right container for everything?',
      objections: [
        { claim: 'a list can hold anything and be searched with in, so other containers are unnecessary.', reply: 'A list can hold anything, but searching it with in examines every element. A dict or set finds a key in constant time by hashing. For membership tests and lookups on more than a handful of items, the difference is between instant and noticeably slow.', code: 'import time\nbig_list = list(range(1_000_000))\nbig_set = set(big_list)\nt = time.perf_counter(); 999_999 in big_list; print("list", round(time.perf_counter() - t, 4))\nt = time.perf_counter(); 999_999 in big_set;  print("set ", round(time.perf_counter() - t, 6))' },
        { claim: 'a dictionary is just a list of pairs and so preserves no order.', reply: 'Since Python 3.7 a dict remembers insertion order as part of the language guarantee. But its defining property is lookup by key, not order. Choose a dict when you fetch values by name; choose a list when position matters.' },
        { claim: 'since tuples cannot be changed they are strictly less useful than lists.', reply: 'Immutability is a feature. A tuple can be a dictionary key or a set member, which a list cannot. It signals a fixed record such as a coordinate, and it is what functions return when they return several values.' },
      ],
      sedContra: 'Fred Brooks: "Show me your flowcharts and conceal your tables, and I shall continue to be mystified. Show me your tables, and I won\'t usually need your flowcharts."',
      respondeo: [
        'Each built-in container answers a different question. A list answers "what is at position n?" and keeps things in order. A dict answers "what is the value for this key?" and finds it instantly. A set answers "is this present?" and holds each value once. A tuple answers "what is this fixed record?" and can be hashed. Choosing the structure that matches the question makes code both faster and clearer, because the container itself documents the intent.',
        'The habits that follow: count with a dict (or collections.Counter), de-duplicate with a set, return multiple values as a tuple, and reserve lists for ordered sequences you will iterate or index. When you catch yourself writing a loop to search a list, ask whether a dict would make the search disappear.',
      ],
    },
    'modules': {
      question: 'Whether importing a module runs its code?',
      objections: [
        { claim: 'import merely declares a name, as a header file does in C, and no code is executed.', reply: 'Importing executes the module top to bottom, once, and caches the resulting module object in sys.modules. Function and class definitions are statements that run; so is any print at module level. This is why side effects at import time are frowned upon.' },
        { claim: 'from math import * is best because it saves typing.', reply: 'Star imports pour every public name into your namespace, hiding where each came from and silently overwriting names you already had. math.sqrt costs five characters and tells the reader exactly what sqrt is.' },
        { claim: 'the if __name__ == "__main__" guard is a ritual with no effect.', reply: 'When a file is run directly its __name__ is "__main__"; when it is imported, __name__ is the module name. The guard therefore separates "code that runs as a script" from "definitions available to importers", so the same file can be both a tool and a library.', code: 'def main():\n    print("running as a script")\n\nif __name__ == "__main__":\n    main()' },
      ],
      sedContra: 'The import system documentation: "The import statement combines two operations: it searches for the named module, then it binds the results of that search to a name in the local scope." The search includes executing the module.',
      respondeo: [
        'A module is a file of Python code. The first import finds the file on sys.path, executes it to build a module object, stores that object in sys.modules, and binds a name to it. Later imports reuse the cached object, so a module\'s top-level code runs exactly once per program. Everything the module defined — functions, classes, constants — is then reachable through the dot.',
        'The consequences shape good style. Keep module level to definitions and constants so importing is cheap and predictable. Prefer import math or from math import sqrt over star imports. Put script behaviour under the main guard. And remember that your own files are modules too: a file named tools.py in the same directory is one import tools away.',
      ],
    },
    'error-handling': {
      question: 'Whether it is better to check for problems before acting or to act and handle the error?',
      objections: [
        { claim: 'exceptions are for exceptional situations, so ordinary conditions like a missing file should be checked with if first.', reply: 'A check-then-act sequence has a gap between the check and the act in which the world may change: the file may vanish after os.path.exists returned True. Trying the operation and catching the failure has no such gap and needs no duplicate logic. Python\'s own idiom is "easier to ask forgiveness than permission".', code: 'try:\n    with open("config.json") as f:\n        text = f.read()\nexcept FileNotFoundError:\n    text = "{}"' },
        { claim: 'a bare except is safest because it catches everything.', reply: 'It catches everything, including bugs you needed to see, KeyboardInterrupt, and SystemExit. Catching broadly turns crashes into silent wrong answers. Catch the specific exceptions you can actually handle and let the rest propagate.' },
        { claim: 'raising exceptions is bad manners, since it forces the caller to deal with a failure.', reply: 'The alternative — returning None or -1 and hoping the caller checks — hides failures and moves them to a distant, confusing place. Raising says clearly and immediately that the operation could not be completed, and the exception carries the reason.' },
      ],
      sedContra: 'The Zen of Python: "Errors should never pass silently. Unless explicitly silenced."',
      respondeo: [
        'An exception is an object that travels up the call stack until something catches it. It carries a type, which says what kind of thing went wrong, and a message, which says how. Python raises them for the many things that can fail — missing keys, bad conversions, absent files — and lets you raise your own to signal that a function\'s promise cannot be kept.',
        'The discipline is to try the operation, catch precisely what you can handle, and leave everything else alone. Use else for code that should run only if nothing was raised and finally for cleanup that must run regardless. Prefer the with statement for resources so cleanup is automatic. Define your own exception classes when callers need to tell your failures apart from Python\'s.',
      ],
    },
    'mini-project': {
      question: 'Whether a beginner should build a whole program before mastering the parts?',
      objections: [
        { claim: 'one should learn every feature first, then combine them; building early only cements bad habits.', reply: 'Features learned in isolation are quickly forgotten because nothing depends on them. A small whole program gives each feature a reason to exist and a place to be exercised. Bad habits are corrected by review, not by delay.' },
        { claim: 'a to-do list is too trivial to teach anything.', reply: 'It contains a data model, persistence, input parsing, validation and a command loop — the same skeleton as a database client or a game. Trivial content with real structure is exactly what a first project should have.' },
        { claim: 'storing tasks in a JSON file is unprofessional; real programs use databases.', reply: 'A JSON file is a perfectly good store for a single user and a few hundred items, and many professional tools use exactly that for configuration and small state. Reaching for a database before the problem needs one is the unprofessional choice.' },
      ],
      sedContra: 'Aquinas: "Nihil est in intellectu quod non prius fuerit in sensu" — nothing is in the understanding that was not first in experience. Programs are learned by building them.',
      respondeo: [
        'A project is where the parts become a whole. Functions get callers, data structures get data, error handling gets errors, and file I/O gets a reason. The to-do app is small enough to finish in a sitting yet shaped like real software: a loop that reads commands, dispatches to functions, and keeps state on disk between runs.',
        'Build it in slices. First print a hard-coded list; then add tasks in memory; then save and load; then complete and delete. Run after every slice. When it works, extend it in a direction you choose — due dates, priorities, colours — because the extension you want is the one you will finish.',
      ],
    },
    'classes-oop': {
      question: 'Whether classes should be used for every kind of data?',
      objections: [
        { claim: 'since everything in Python is an object, every piece of data deserves its own class.', reply: 'Everything is already an object of some class: int, str, list, dict. A new class earns its place when data and the behaviour that governs it belong together — a bank account with a withdrawal rule, a shape with an area. A pair of numbers is a tuple; a lookup is a dict.' },
        { claim: 'self is a special keyword the interpreter treats magically.', reply: 'self is an ordinary parameter name chosen by convention. When you write acct.deposit(50), Python calls Account.deposit(acct, 50); the instance arrives as the first argument. You could name it anything, but nobody does, and readers depend on the convention.', code: 'class Account:\n    def deposit(self, amount):\n        self.balance += amount\n\nacct = Account()\nacct.balance = 0\nAccount.deposit(acct, 50)   # exactly what acct.deposit(50) does\nprint(acct.balance)' },
        { claim: 'inheritance is the primary way to reuse code, so deep class hierarchies are a mark of good design.', reply: 'Inheritance models "is a kind of" and is easily overused. Composition — an object holding another object — models "has a" and is more flexible. Python\'s duck typing means you often need neither: any object with the right methods will do.' },
      ],
      sedContra: 'Alan Kay, who coined the term: "OOP to me means only messaging, local retention and protection and hiding of state-process." Classes are a means, not the point.',
      respondeo: [
        'A class bundles state (attributes) with the operations that keep that state coherent (methods). Its constructor __init__ establishes the invariants; its methods preserve them; its dunder methods (__repr__, __eq__, __len__) let instances behave like built-in values. Use one when you find yourself passing the same dictionary to the same handful of functions — that dictionary wants to be an object.',
        'Prefer small classes with clear responsibilities, dataclasses for plain records, properties for computed or validated attributes, and composition over inheritance. Inherit when a subclass genuinely is a special case of the parent and can be used wherever the parent is expected.',
      ],
    },
    'file-io': {
      question: 'Whether it matters to close a file after reading it?',
      objections: [
        { claim: 'Python collects garbage, so an unclosed file will be closed eventually and no harm is done.', reply: '"Eventually" is not a time. Until the file is closed, written data may sit in a buffer and never reach disk, and the operating system\'s limit on open files can be exhausted by a loop. The with statement closes the file at a known moment, even if an exception occurs.' },
        { claim: 'reading a whole file with read() is always fine.', reply: 'It is fine for files that fit comfortably in memory, which is most of them. For a multi-gigabyte log, iterating the file object line by line keeps memory flat and starts producing results immediately.', code: 'with open("huge.log") as f:\n    for line in f:          # one line at a time\n        if "ERROR" in line:\n            print(line, end="")' },
        { claim: 'opening a file with mode "w" adds to whatever is there.', reply: 'Mode "w" truncates the file to nothing the instant it opens. Append is "a". Many a data file has been erased by this confusion.' },
      ],
      sedContra: 'The tutorial states: "It is good practice to use the with keyword when dealing with file objects. The advantage is that the file is properly closed after its suite finishes."',
      respondeo: [
        'A file object is a handle on a resource owned by the operating system. Opening it acquires the resource; closing it releases the handle and flushes any buffered writes. The with statement ties both to a block, so the file is closed on the way out no matter how the block ends. This is the same context-manager mechanism that guards locks and network connections.',
        'Read text with the encoding named explicitly, iterate large files line by line, and choose the mode with care: "r" reads, "w" replaces, "a" appends, "x" creates and fails if the file exists. For structured data, prefer the csv and json modules to hand-parsing, and pathlib.Path for paths that work on every operating system.',
      ],
    },
    'comprehensions': {
      question: 'Whether a comprehension is merely a shorter loop?',
      objections: [
        { claim: 'a comprehension does the same work as a loop with append, so it is only a matter of taste.', reply: 'It does the same work but says something different: a comprehension declares that the result is a transformation of an input, with no other effects. A reader knows at once that nothing else happens inside. It is also faster, because the interpreter builds the list in a single specialised operation.' },
        { claim: 'if one comprehension is good, nesting three of them is better.', reply: 'Comprehensions are for expressions that read as a sentence: "the square of n for each n in numbers if n is odd". Once a comprehension needs a comment, or its nested loops cannot be read aloud, it should become a loop or a named function.' },
        { claim: 'a generator expression is the same as a list comprehension with round brackets.', reply: 'The brackets change what is built. A list comprehension materialises every element in memory. A generator expression produces elements on demand and holds only one at a time, so it can stream a million items into sum() without ever holding them all.', code: 'total = sum(n * n for n in range(1_000_000))   # no list is built\nsquares = [n * n for n in range(10)]            # a list is built' },
      ],
      sedContra: 'The Zen of Python: "Beautiful is better than ugly. Simple is better than complex." A comprehension is the simple form of a transformation.',
      respondeo: [
        'A comprehension is an expression that builds a collection from an iterable by mapping and filtering: [f(x) for x in xs if p(x)]. Its value is that it is an expression — it can be assigned, returned or passed directly — and that it promises the reader a pure transformation with no side effects. Dict and set comprehensions build those types; a generator expression yields the same values lazily.',
        'Use comprehensions for transformations that fit on one readable line; use loops when there are side effects, multiple outputs, or logic that needs a name. Prefer a generator expression when the result is consumed once by sum, max, any, all or a join.',
      ],
    },
    'decorators': {
      question: 'Whether a decorator changes the function it decorates?',
      objections: [
        { claim: 'the @ syntax modifies the function in place, adding behaviour to its body.', reply: 'The original function is untouched. The decorator receives it as an argument and returns a new callable — usually a wrapper that calls the original — and the name is rebound to that new callable. @timer above def work is exactly work = timer(work).' },
        { claim: 'a decorator can only wrap functions that take no arguments.', reply: 'A wrapper written with *args and **kwargs forwards any arguments to the original, so one decorator fits every signature.', code: 'import functools\n\ndef log_calls(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        print("calling", func.__name__, args, kwargs)\n        return func(*args, **kwargs)\n    return wrapper' },
        { claim: 'functools.wraps is optional decoration with no practical effect.', reply: 'Without it the wrapper reports its own name, docstring and signature, so help(), debuggers and test frameworks see "wrapper" everywhere. wraps copies the metadata across so the decorated function still looks like itself.' },
      ],
      sedContra: 'PEP 318, which introduced the syntax, defines @dec followed by def f as "equivalent to f = dec(f)".',
      respondeo: [
        'A decorator is a function that takes a function and returns a function. Because Python functions are objects, they can be passed around and wrapped like any value; the @ syntax is only a tidy way to apply such a wrapping at definition time. The wrapper can run code before and after the original, alter its arguments or result, cache it, retry it, or register it somewhere.',
        'Write decorators with a wrapper that accepts *args and **kwargs, apply functools.wraps to keep the metadata, and keep them small: a decorator that needs its own parameters is a function that returns a decorator. The standard library\'s cache, lru_cache, property and staticmethod are decorators built on the same idea.',
      ],
    },
    'type-hints': {
      question: 'Whether type hints make Python a statically typed language?',
      objections: [
        { claim: 'once every parameter is annotated, Python will refuse to run the program with wrong types.', reply: 'Python stores annotations and otherwise ignores them. double("ab") with n: int runs and returns "abab". Enforcement comes from external tools — mypy, pyright, your editor — that read the hints before the program runs.', code: 'def double(n: int) -> int:\n    return n * 2\n\nprint(double("ab"))   # abab — no error at run time' },
        { claim: 'since they are not enforced, hints are worthless.', reply: 'They are documentation that a machine can verify. Editors use them for completion and immediate red underlines; type checkers catch whole classes of bugs before any test runs; readers learn a function\'s contract from its signature alone.' },
        { claim: 'a dataclass is a different kind of class with special runtime typing.', reply: 'A dataclass is an ordinary class whose __init__, __repr__ and __eq__ are generated from the annotated fields. The annotations tell the decorator which fields exist; they still are not enforced.' },
      ],
      sedContra: 'PEP 484: "Python will remain a dynamically typed language, and the authors have no desire to ever make type hints mandatory, even by convention."',
      respondeo: [
        'Type hints are annotations on parameters, return values and variables that state the intended types. The interpreter records them and does nothing more. Their power comes from tools that read them ahead of time: checkers that flag a str passed where an int was promised, and editors that complete attribute names because they know what kind of object a variable holds.',
        'Annotate function signatures first, since they document the contract. Use the built-in generics (list[int], dict[str, float]), Optional or the X | None form for values that may be absent, and dataclasses for records. Run a type checker in your editor or in CI, and treat its findings as you would a failing test.',
      ],
    },
    'iterators-generators': {
      question: 'Whether a generator is a kind of list?',
      objections: [
        { claim: 'a generator produces a sequence of values, so it is a list built one piece at a time.', reply: 'A list holds all its elements at once and can be indexed, sliced and iterated repeatedly. A generator holds none of them; it produces each value when asked and forgets it. It can be iterated once, has no length, and may be infinite.', code: 'def naturals():\n    n = 0\n    while True:\n        yield n\n        n += 1\n\ng = naturals()          # no values exist yet\nprint(next(g), next(g)) # 0 1\n# len(g) -> TypeError; list(g) would never finish' },
        { claim: 'calling a generator function runs its body.', reply: 'Calling it creates a generator object and runs nothing. The body runs when next() is called, up to the first yield, then pauses. Each further next() resumes from that point.' },
        { claim: 'a for loop is special syntax unrelated to iterators.', reply: 'for calls iter() on the object to get an iterator, then calls next() until StopIteration is raised. Lists, strings, dicts, files and generators all follow this one protocol, which is why your own classes can join it by defining __iter__.' },
      ],
      sedContra: 'PEP 255: "A generator function is a function that, when called, returns an iterator object. The body is not executed until the iterator\'s next method is invoked."',
      respondeo: [
        'An iterator is an object that yields values one at a time through next() and signals the end with StopIteration. A generator is the easiest way to write one: a function containing yield, whose state — local variables and the position in the body — is suspended between calls. Because values are produced on demand, generators work on streams of any size, including endless ones, in constant memory.',
        'Use generators to express pipelines: one yields lines, the next filters them, the next parses them, and nothing is computed until the final consumer pulls. Use itertools for the common shapes — islice, chain, groupby — and remember that a generator is spent after one pass; call the function again for a fresh one.',
      ],
    },
    'async-python': {
      question: 'Whether asyncio makes a program run in parallel?',
      objections: [
        { claim: 'asyncio.gather runs several coroutines at once, so it must use several CPU cores.', reply: 'asyncio runs on one thread and one core. The coroutines take turns: while one awaits a network reply, another runs. They overlap their waiting, not their computing. A CPU-bound task gains nothing from asyncio and needs multiprocessing instead.' },
        { claim: 'adding async to a function makes it faster.', reply: 'An async function with no await inside is simply a slower way to call a function. The benefit appears only where the function would otherwise block waiting for I/O, and only when other tasks exist to use that time.' },
        { claim: 'time.sleep inside a coroutine pauses only that coroutine.', reply: 'time.sleep blocks the whole thread, and with it the event loop and every other task. Inside a coroutine, use await asyncio.sleep, which yields control so the others may run.', code: 'import asyncio\n\nasync def fetch(name, delay):\n    await asyncio.sleep(delay)   # yields to the loop\n    return name\n\nasync def main():\n    print(await asyncio.gather(fetch("a", 0.3), fetch("b", 0.2)))\n\nasyncio.run(main())' },
      ],
      sedContra: 'The asyncio documentation: "asyncio is a library to write concurrent code using the async/await syntax." Concurrent, not parallel.',
      respondeo: [
        'Concurrency is dealing with many things at once; parallelism is doing many things at once. asyncio provides the former on a single thread through an event loop that runs one task until it awaits, then switches to another that is ready. The program therefore spends its time doing useful work while I/O is in flight, which for network-bound programs is most of the time.',
        'Write coroutines with async def, pause them only with await on awaitable things, and start many at once with gather or TaskGroup. Never call blocking functions inside the loop; wrap them with asyncio.to_thread if you must. For CPU-heavy work, reach for multiprocessing or a native extension, because no amount of awaiting makes arithmetic faster.',
      ],
    },
    'testing-and-tooling': {
      question: 'Whether tests slow a programmer down?',
      objections: [
        { claim: 'time spent writing tests is time not spent writing the program.', reply: 'It is time not spent writing the program a second time. Every change to untested code must be re-verified by hand, forever. A test is that verification written once and run in a second, every time.' },
        { claim: 'tests are for large teams; a single developer knows the code and does not need them.', reply: 'The single developer of today is a stranger to the code in six months. Tests are the notes that stranger needs, and they are executable, so they cannot go stale silently.' },
        { claim: 'a virtual environment is unnecessary complexity when pip install works fine globally.', reply: 'It works until two projects need different versions of the same package, or a global upgrade breaks something that used to run. A venv is one command and gives each project its own, reproducible set of packages.', code: 'python3 -m venv .venv\nsource .venv/bin/activate\npip install pytest\npytest -q' },
      ],
      sedContra: 'Kent Beck: "I get paid for code that works, not for tests, so my philosophy is to test as little as possible to reach a given level of confidence." Confidence is the product; tests are how it is bought cheaply.',
      respondeo: [
        'A test is a small program that calls your code and asserts what it should return. pytest discovers files and functions named test_, runs them, and reports the assertions that failed with the values involved. The payoff is confidence you can renew in seconds: change something, run the tests, know whether you broke anything.',
        'Write tests for behaviour you would otherwise check by hand, especially the awkward cases: empty input, boundaries, bad data. Keep each project in its own virtual environment with its dependencies listed in a file, and run a formatter and linter such as Ruff so that style stops being a topic. The tooling is the scaffolding that lets the program grow without collapsing.',
      ],
    },
    'strings-deep-dive': {
      question: 'Whether a string can be changed?',
      objections: [
        { claim: 'name.upper() changes name, since afterwards we can print it in upper case.', reply: 'upper() returns a new string and leaves name untouched; what we print is the new one. To keep the result you must assign it, as in name = name.upper(). Every string method behaves this way.', code: 'name = "bede"\nname.upper()\nprint(name)          # bede\nname = name.upper()\nprint(name)          # BEDE' },
        { claim: 'building a long string with += in a loop is efficient because it edits in place.', reply: 'Each += creates a new string and copies the old contents into it, so the loop does quadratic work. Collect pieces in a list and join them once at the end.' },
        { claim: 'bytes and strings are interchangeable, since both hold text.', reply: 'A str holds Unicode code points; bytes holds raw 8-bit values. Files, sockets and hashes speak bytes; humans read str. Convert deliberately with encode and decode and name the encoding, almost always utf-8.' },
      ],
      sedContra: 'The data model: "Strings are immutable sequences of Unicode code points."',
      respondeo: [
        'A string is an immutable sequence of characters. Immutability is what makes strings safe to share, usable as dictionary keys, and simple to reason about: no function you call can quietly alter your text. The price is that every operation that seems to modify a string in fact returns a new one, and the programmer must keep the result.',
        'Work with strings through their methods — split, join, strip, replace, startswith — and format them with f-strings, whose format specifications handle alignment, padding and precision. Build large strings with a list and join. At the boundaries of your program, encode to bytes on the way out and decode on the way in.',
      ],
    },
    'regular-expressions': {
      question: 'Whether regular expressions should be used for all text matching?',
      objections: [
        { claim: 'a regex can describe any pattern, so it is the universal tool for text.', reply: 'Regular expressions describe regular languages, which cannot count or nest. They cannot match balanced brackets or parse HTML in general, and attempts to make them do so produce fragile monsters. Nested structures want a parser.' },
        { claim: 'a simple check like "does this string end with .txt" needs a regex.', reply: 'It needs text.endswith(".txt"). The string methods — startswith, endswith, in, split, find — are clearer and faster for fixed text. Reach for re when the pattern genuinely varies.' },
        { claim: '.* matches the shortest possible run of characters.', reply: 'Quantifiers are greedy by default: .* takes as much as it can while still allowing the overall match. The lazy form .*? takes as little as possible. Confusing the two is the classic source of over-matching.', code: 'import re\ntext = "<b>ora</b> et <b>labora</b>"\nprint(re.findall(r"<b>.*</b>", text))    # one greedy match\nprint(re.findall(r"<b>.*?</b>", text))   # two lazy matches' },
      ],
      sedContra: 'Jamie Zawinski: "Some people, when confronted with a problem, think \'I know, I\'ll use regular expressions.\' Now they have two problems."',
      respondeo: [
        'A regular expression is a compact language for describing a class of strings: literal characters, character classes, anchors, quantifiers and groups. The re module searches, matches, extracts and substitutes with it. Within its domain — validating formats, pulling fields out of lines, rewriting patterns — nothing is more concise.',
        'Use raw strings so backslashes survive, compile patterns you reuse, prefer named groups for readability, and test each pattern against examples that should and should not match. Keep patterns short; when one grows beyond a line, split the problem or write a small parser instead.',
      ],
    },
    'working-with-json': {
      question: 'Whether JSON is the same as a Python dictionary?',
      objections: [
        { claim: 'JSON text looks exactly like a dict literal, so the two are one thing.', reply: 'JSON is text; a dict is an object in memory. json.loads turns the one into the other and json.dumps turns it back. The resemblance is deliberate but the differences are real: JSON keys must be strings, JSON has no tuples, sets, dates or comments, and true, false and null are spelled differently.', code: 'import json\ntext = \'{"saint": true, "died": null}\'\ndata = json.loads(text)\nprint(data)   # {\'saint\': True, \'died\': None}' },
        { claim: 'any Python object can be dumped to JSON.', reply: 'Only dicts, lists, strings, numbers, booleans and None serialise directly. A date, a set or an instance of your own class raises TypeError until you tell dumps how to convert it with the default argument.' },
        { claim: 'JSON files may contain comments and trailing commas like Python source.', reply: 'Strict JSON allows neither. Many a "config file will not load" bug is a stray comma after the last item or a helpful comment.' },
      ],
      sedContra: 'RFC 8259 defines JSON as "a lightweight, text-based, language-independent data interchange format." It is a format for text, not a data structure.',
      respondeo: [
        'JSON is a text format for structured data — objects, arrays, strings, numbers, booleans and null — that almost every language can read and write. Python maps it onto dicts and lists, so once loaded it is handled with ordinary indexing and loops. Its ubiquity in APIs, configuration and data exchange makes it the most common format a Python programmer meets.',
        'Load with json.load or loads, dump with json.dump or dumps, and pretty-print with indent for humans. Convert non-JSON types explicitly on the way out and restore them on the way in. Validate what you load before trusting it, because the file came from outside your program.',
      ],
    },
    'collections-and-itertools': {
      question: 'Whether the specialised containers are needed when dict and list exist?',
      objections: [
        { claim: 'anything Counter does can be done with a dict and a loop, so Counter is redundant.', reply: 'It can, in five lines instead of one, with a chance of the off-by-one mistake in each. Counter also brings most_common, arithmetic between counters and a zero default. Redundancy in expressive power is not redundancy in clarity.', code: 'from collections import Counter\nwords = "ora et labora ora et lege".split()\nprint(Counter(words).most_common(2))' },
        { claim: 'a list is as good as a deque for a queue.', reply: 'Removing from the front of a list shifts every remaining element, so a queue built on a list slows down as it grows. A deque removes from either end in constant time.' },
        { claim: 'itertools functions build lists, so they cost as much memory as a comprehension.', reply: 'Every itertools function returns a lazy iterator. chain, islice, product and the rest produce one item at a time and can be composed without materialising anything until the consumer asks.' },
      ],
      sedContra: 'The Zen of Python: "There should be one — and preferably only one — obvious way to do it." For counting, the obvious way is Counter.',
      respondeo: [
        'The collections module supplies containers shaped for common jobs: Counter for tallies, defaultdict for grouping, deque for queues and windows, namedtuple for light records. itertools supplies lazy building blocks for iteration: chaining, slicing, grouping, combining. Together they replace many small hand-written loops with a single, named, tested operation.',
        'Learn the handful you will use weekly — Counter, defaultdict, deque, chain, islice, groupby — and reach for them whenever a loop begins with "initialise an empty thing, then for each item…". The result is shorter, faster and, because the name says what it does, easier to read.',
      ],
    },
    'recursion': {
      question: 'Whether recursion is only a trick for showing off?',
      objections: [
        { claim: 'any recursive function can be written as a loop, so recursion adds nothing.', reply: 'It is true that any recursion can be replaced by a loop with an explicit stack. But for problems shaped like trees — nested files, nested JSON, expression grammars — the recursive version mirrors the data and the loop version must reinvent the stack by hand. Recursion adds fit.' },
        { claim: 'recursion is always slower than iteration.', reply: 'Function calls have a cost, and Python does not optimise tail calls, so a linear recursion over a million items is a poor choice. For problems whose depth is the height of a tree or log of the input, the cost is negligible and the clarity is worth it.' },
        { claim: 'a recursive function must call itself first and handle the base case last.', reply: 'The base case must be checked first, before recursing, or the function recurses forever. The shape is always: if trivial, return; otherwise, solve a smaller instance and combine.', code: 'def depth(value):\n    if not isinstance(value, (list, dict)):\n        return 0                       # base case first\n    children = value.values() if isinstance(value, dict) else value\n    return 1 + max((depth(c) for c in children), default=0)' },
      ],
      sedContra: 'The structure of a tree is defined in terms of trees; the natural algorithm over it is defined in terms of itself.',
      respondeo: [
        'Recursion is solving a problem by solving smaller instances of the same problem until an instance is trivial. Its home is data that is itself recursive — trees, nested structures, grammars — and algorithms that divide the input, such as merge sort and binary search. There the recursive solution is shorter and more obviously correct than any loop.',
        'Always write the base case first and make sure every recursive call moves toward it. Keep the depth bounded by the shape of the data, not its size; for flat sequences use a loop. When subproblems overlap, memoise with functools.cache so each is solved once.',
      ],
    },
    'debugging-and-tracebacks': {
      question: 'Whether an error message is a sign of failure?',
      objections: [
        { claim: 'a good programmer writes code that produces no errors.', reply: 'A good programmer produces errors constantly and reads every one. The traceback is the program explaining precisely what it could not do and where. Code that fails silently is the real failure; a clear exception is the machine cooperating.' },
        { claim: 'the first line of a traceback shows where the bug is.', reply: 'The first frame is the outermost caller. The last frame, just above the exception message, is where the exception was raised. The fix is often somewhere between: a bad value created above and only detected below.', code: 'def average(numbers):\n    return sum(numbers) / len(numbers)   # raised here...\n\ndef report(groups):\n    for name, scores in groups.items():\n        print(name, average(scores))      # ...called from here...\n\nreport({"kitchen": []})                   # ...because of this input' },
        { claim: 'print statements are unprofessional; a debugger is the only proper tool.', reply: 'print is fast, always available and understood by everyone. The debugger shines when state is complex or the failure is deep. Professionals use both, and logging when the printing needs to stay.' },
      ],
      sedContra: 'Aquinas, on the method of the disputation: the objection must be stated at full strength before it can be answered. The traceback states the objection.',
      respondeo: [
        'A traceback lists the chain of calls that led to an exception, ending with the exception type and message. Read it from the bottom: the message says what went wrong, the last frame says where, and the frames above say how the program got there. The type alone often names the cause — NameError for a typo, TypeError for a None where an object was expected, KeyError for a missing key.',
        'Debugging is the disciplined narrowing of "something is wrong" to "this line, with this input". Reproduce the failure with the smallest input that triggers it; print or log the values along the path; state what you expect before you look; and when the fix is found, add a test that would have caught it.',
      ],
    },
  },
}
