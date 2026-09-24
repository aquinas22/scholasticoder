import type { Quaestio } from './types'

/**
 * Common questions, one per lesson: misconceptions with replies, a source note, and the answer.
 * Keyed by path slug, then lesson slug.
 */
export const quaestiones: Record<string, Record<string, Quaestio>> = {
  python: {
    'hello-world': {
      question: 'Is a program that only prints one line a real program?',
      objections: [
        { claim: 'A real program has to do something useful, and printing a greeting does nothing.', reply: 'Usefulness is not what makes something a program. A program is any list of instructions the machine carries out. print("Hello, World!") exercises the whole pipeline (editor, interpreter, output) and proves it works. That proof is useful, which is why nearly every language starts here.' },
        { claim: 'Since print is built in, I didn\'t really write anything.', reply: 'Every program is built from things you did not write: the interpreter, the operating system, the hardware. Calling print is the same act as calling any other function. The real work of programming is choosing which calls to make and in what order.', code: 'print("Hello,", "World!", sep=" — ", end="\\n\\n")\nprint(42, 3.5, True)' },
        { claim: 'A program with no input can\'t be tested, so it can\'t be called correct.', reply: 'Correct means the output matches what you intended, whatever the input. A program with no input has one intended output, and you check it by running it. Tests for bigger programs work the same way, just many times over.' },
      ],
      sedContra: 'Kernighan and Ritchie opened The C Programming Language (1978) with exactly this program, and most languages since have followed.',
      respondeo: [
        'A program is text a machine can run. The smallest one worth writing is the one that proves you and the machine agree on the basics: where the file goes, how you run it, where the output shows up. Hello, World is a handshake, and every bigger program depends on that handshake working.',
        'It also teaches the core habit: write one thing, run it, look at the result, then change one thing and run it again. Running early and often matters more than any language feature, and it starts with a single print.',
      ],
    },
    'variables': {
      question: 'Does a Python variable have a type?',
      objections: [
        { claim: 'Since age = 25 and later age = "twenty-five" both work, a variable has no type at all.', reply: 'The name age has no type; the objects 25 and "twenty-five" do. A Python variable is a label you can move from one object to another. The type belongs to the object the label points at right now, and type(age) reports that object\'s type.', code: 'age = 25\nprint(type(age))     # <class \'int\'>\nage = "twenty-five"\nprint(type(age))     # <class \'str\'>' },
        { claim: 'Because "3" + 4 fails, Python must be secretly declaring types the way C does.', reply: 'Nothing is declared. The failure comes from the objects: a str and an int do not know how to add together. Python checks the objects at the moment of the operation, not the names at the moment of assignment. That is dynamic typing, and it is strict. Python refuses rather than guessing.' },
        { claim: 'Writing y = x copies the value, so changing x afterwards won\'t affect y.', reply: 'Assignment never copies. y = x makes both names point at the same object. For immutable objects like numbers and strings this is harmless, because the object cannot change. For a list, both names see the same changes.', code: 'a = [1, 2]\nb = a\nb.append(3)\nprint(a)   # [1, 2, 3]' },
      ],
      sedContra: 'The Python language reference: "Every object has an identity, a type and a value." Names are not mentioned. Types belong to objects.',
      respondeo: [
        'A variable in Python is a name bound to an object. You can rebind it at any time, and the same name can point at objects of different types over the life of a program. The type lives with the object, and Python checks it when an operation runs. That is why errors like adding a string to a number show up at run time, not when you create the variable.',
        'Two things follow. First, conversion is explicit: int("42") makes a new int object and leaves the string alone. Second, assignment shares instead of copying, so with mutable objects you need to decide when you actually want a copy. Type hints (name: str) document intent and let tools check it ahead of time; they do not change any of this.',
      ],
    },
    'control-flow': {
      question: 'Is indentation in Python just a style choice?',
      objections: [
        { claim: 'In other languages indentation is just decoration, so it must be the same in Python.', reply: 'In C, Java and JavaScript the braces define the block and the indentation is for humans. Python dropped the braces and kept the indentation, so indentation is the only thing marking structure. What is a courtesy elsewhere is grammar here.', code: 'if hour < 12:\n    print("breakfast")\n    print("coffee")    # inside the if\nprint("always")        # outside — the dedent ends the block' },
        { claim: 'A for loop over an empty list does nothing, so Python must skip those loops to save time.', reply: 'The loop body runs once per item. With zero items it runs zero times. Nothing is skipped; the loop just has no iterations. An else clause on the loop, which runs when no break happened, still runs in that case.' },
        { claim: 'while True is a bug, because a condition that is always true can never end.', reply: 'A while loop also ends when break runs inside it, or when an exception or return leaves the function. while True with a break is the standard way to write "repeat until something happens in the middle".', code: 'while True:\n    line = input("> ")\n    if line == "quit":\n        break\n    print(line.upper())' },
      ],
      sedContra: 'The Python grammar defines a block as INDENT statements DEDENT. Indentation is a token, not whitespace.',
      respondeo: [
        'Control flow is the order in which statements run. Conditionals pick one path out of several; loops repeat a path. Python marks where each path starts and ends with indentation: the lines indented under a colon belong to it, and the first line back at the previous level ends it. Because Python reads structure from the same cue your eye does, code cannot look one way and behave another.',
        'The practical rules: use four spaces, never mix tabs and spaces, and end each header (if, elif, else, for, while) with a colon. range stops before its end value. Use for when walking through a collection and while when repeating until something changes, and use break and continue to steer the loop from inside.',
      ],
    },
    'functions': {
      question: 'Is a function worth writing if I only call it once?',
      objections: [
        { claim: 'Functions exist for reuse, so code used once should stay inline.', reply: 'Reuse is one benefit. Naming is a bigger one. A function gives a block of code a name, a boundary and clear inputs and outputs. A reader can understand the caller without reading the body, and you can test the block on its own. All of that holds even when the function is called once.' },
        { claim: 'Function parameters are copies, so changing a list inside a function is safe.', reply: 'The parameter name is bound to the same object the caller passed in. A list parameter is the caller\'s list, so appending to it inside the function changes what the caller sees. Rebinding the parameter to a new list, though, does not.', code: 'def add_item(items, item):\n    items.append(item)      # visible to the caller\n\ndef replace(items):\n    items = ["new"]         # only rebinds the local name\n\nbasket = []\nadd_item(basket, "bread")\nreplace(basket)\nprint(basket)               # [\'bread\']' },
        { claim: 'A default value like items=[] is created fresh on every call.', reply: 'Defaults are evaluated once, when the def statement runs, and the same object is reused on every call. So a mutable default builds up state across calls. The usual fix is items=None and creating the list inside the body.' },
      ],
      sedContra: 'Edsger Dijkstra: "The purpose of abstraction is not to be vague, but to create a new semantic level in which one can be absolutely precise."',
      respondeo: [
        'A function is a named piece of work with defined inputs and a returned output. Its value is as much in the name as in reuse: it lets you think about a program in bigger chunks, test each chunk alone, and change how something works without touching the code that calls it. That is why experienced programmers pull out functions freely, including ones called from a single place.',
        'The mechanics to remember are few. Parameters point at the caller\'s objects, so mutating them affects the caller and rebinding them does not. Default values are created once, when the function is defined. A function with no return gives back None. Positional arguments come first, then keyword arguments, and *args and **kwargs collect any extras.',
      ],
    },
    'data-structures': {
      question: 'Can I just use a list for everything?',
      objections: [
        { claim: 'A list can hold anything and be searched with in, so other containers aren\'t needed.', reply: 'A list can hold anything, but searching it with in checks every element. A dict or set finds a key in constant time by hashing. For membership checks and lookups on more than a handful of items, that is the difference between instant and noticeably slow.', code: 'import time\nbig_list = list(range(1_000_000))\nbig_set = set(big_list)\nt = time.perf_counter(); 999_999 in big_list; print("list", round(time.perf_counter() - t, 4))\nt = time.perf_counter(); 999_999 in big_set;  print("set ", round(time.perf_counter() - t, 6))' },
        { claim: 'A dictionary is just a list of pairs, and it doesn\'t keep any order.', reply: 'Since Python 3.7 a dict keeps insertion order, and the language guarantees it. But what makes a dict a dict is lookup by key, not order. Use a dict when you fetch values by name; use a list when position matters.' },
        { claim: 'Tuples can\'t be changed, so they are strictly less useful than lists.', reply: 'Not being changeable is a feature. A tuple can be a dictionary key or a set member, which a list cannot. It signals a fixed record, like a coordinate, and it is what functions return when they return several values.' },
      ],
      sedContra: 'Fred Brooks, The Mythical Man-Month: "Show me your flowcharts and conceal your tables, and I shall continue to be mystified. Show me your tables, and I won\'t usually need your flowcharts."',
      respondeo: [
        'Each built-in container answers a different question. A list answers "what is at position n?" and keeps things in order. A dict answers "what is the value for this key?" and finds it instantly. A set answers "is this here?" and holds each value once. A tuple answers "what is this fixed record?" and can be hashed. Picking the one that matches your question makes code faster and clearer, because the container itself tells the reader what you meant.',
        'Some habits that follow: count with a dict (or collections.Counter), remove duplicates with a set, return multiple values as a tuple, and keep lists for ordered sequences you will loop over or index. If you catch yourself writing a loop to search a list, ask whether a dict would make the search disappear.',
      ],
    },
    'modules': {
      question: 'Does importing a module run its code?',
      objections: [
        { claim: 'import just declares a name, like a header file in C, and runs no code.', reply: 'Importing runs the module top to bottom, once, and caches the resulting module object in sys.modules. def and class are statements that run, and so is any print at the top level. That is why side effects at import time are frowned on.' },
        { claim: 'from math import * is best because it saves typing.', reply: 'A star import dumps every public name into your namespace, hiding where each one came from and silently overwriting names you already had. math.sqrt costs five extra characters and tells the reader exactly what sqrt is.' },
        { claim: 'The if __name__ == "__main__" check is boilerplate that does nothing.', reply: 'When a file is run directly its __name__ is "__main__"; when it is imported, __name__ is the module name. So the check separates "code that runs as a script" from "definitions for anyone who imports it", and one file can be both a tool and a library.', code: 'def main():\n    print("running as a script")\n\nif __name__ == "__main__":\n    main()' },
      ],
      sedContra: 'The Python import system docs: "The import statement combines two operations: it searches for the named module, then it binds the results of that search to a name in the local scope." Loading the module includes running it.',
      respondeo: [
        'A module is a file of Python code. The first import finds the file on sys.path, runs it to build a module object, stores that object in sys.modules, and binds a name to it. Later imports reuse the cached object, so a module\'s top-level code runs exactly once per program. Everything the module defined (functions, classes, constants) is then reachable with a dot.',
        'This shapes good style. Keep the top level to definitions and constants so importing is cheap and predictable. Prefer import math or from math import sqrt over star imports. Put script behaviour under the main check. And remember your own files are modules too: a file called tools.py in the same folder is one import tools away.',
      ],
    },
    'error-handling': {
      question: 'Should I check for problems first, or just try it and handle the error?',
      objections: [
        { claim: 'Exceptions are for rare situations, so ordinary cases like a missing file should be checked with if first.', reply: 'Check-then-act leaves a gap between the check and the action, and things can change in that gap: the file can vanish right after os.path.exists returned True. Trying the operation and catching the failure has no gap and no duplicated logic. Python\'s own motto for this is "easier to ask forgiveness than permission".', code: 'try:\n    with open("config.json") as f:\n        text = f.read()\nexcept FileNotFoundError:\n    text = "{}"' },
        { claim: 'A bare except is safest because it catches everything.', reply: 'It does catch everything, including bugs you needed to see, KeyboardInterrupt and SystemExit. Catching too broadly turns crashes into silent wrong answers. Catch the specific exceptions you can actually handle and let the rest through.' },
        { claim: 'Raising exceptions is rude, because it forces the caller to deal with the failure.', reply: 'The alternative, returning None or -1 and hoping the caller checks, hides the failure and moves it somewhere far away and confusing. Raising says clearly and right away that the operation could not be done, and the exception carries the reason.' },
      ],
      sedContra: 'The Zen of Python: "Errors should never pass silently. Unless explicitly silenced."',
      respondeo: [
        'An exception is an object that travels up the call stack until something catches it. It has a type, which says what kind of thing went wrong, and a message, which says how. Python raises them for the many things that can fail (missing keys, bad conversions, missing files), and you can raise your own when a function cannot do what it promised.',
        'The habit is: try the operation, catch exactly what you can handle, and leave everything else alone. Use else for code that should run only if nothing was raised, and finally for cleanup that must always run. Use the with statement for resources so cleanup is automatic. Define your own exception classes when callers need to tell your failures apart from Python\'s.',
      ],
    },
    'mini-project': {
      question: 'Should a beginner build a whole program before mastering the parts?',
      objections: [
        { claim: 'You should learn every feature first and combine them later; building early just locks in bad habits.', reply: 'Features learned in isolation are quickly forgotten because nothing depends on them. A small complete program gives each feature a reason to exist and a place to practise it. Bad habits get fixed by review, not by waiting.' },
        { claim: 'A to-do list is too simple to teach anything.', reply: 'It has a data model, saving to disk, input parsing, validation and a command loop. That is the same skeleton as a database client or a game. Simple content with real structure is exactly what a first project should have.' },
        { claim: 'Storing tasks in a JSON file is unprofessional; real programs use databases.', reply: 'A JSON file is a perfectly good store for one user and a few hundred items, and plenty of professional tools use exactly that for settings and small amounts of state. Reaching for a database before the problem needs one is the less professional choice.' },
      ],
      sedContra: 'The C Programming Language by Kernighan and Ritchie ends almost every section with exercises that ask you to write a small working program.',
      respondeo: [
        'A project is where the parts come together. Functions get callers, data structures get data, error handling gets errors, and file I/O gets a reason to exist. The to-do app is small enough to finish in one sitting but shaped like real software: a loop that reads commands, hands them to functions, and keeps state on disk between runs.',
        'Build it in slices. First print a hard-coded list; then add tasks in memory; then save and load; then complete and delete. Run it after every slice. When it works, extend it in a direction you care about (due dates, priorities, colours), because the extension you actually want is the one you will finish.',
      ],
    },
    'classes-oop': {
      question: 'Should I use classes for every kind of data?',
      objections: [
        { claim: 'Everything in Python is an object, so every piece of data deserves its own class.', reply: 'Everything is already an object of some class: int, str, list, dict. A new class earns its place when data and the rules that govern it belong together, like a bank account with a withdrawal rule or a shape with an area. A pair of numbers is a tuple; a lookup table is a dict.' },
        { claim: 'self is a special keyword that Python treats magically.', reply: 'self is an ordinary parameter name, used by convention. When you write acct.deposit(50), Python calls Account.deposit(acct, 50); the instance arrives as the first argument. You could name it anything, but nobody does, and readers rely on the convention.', code: 'class Account:\n    def deposit(self, amount):\n        self.balance += amount\n\nacct = Account()\nacct.balance = 0\nAccount.deposit(acct, 50)   # exactly what acct.deposit(50) does\nprint(acct.balance)' },
        { claim: 'Inheritance is the main way to reuse code, so deep class hierarchies mean good design.', reply: 'Inheritance models "is a kind of" and is easy to overuse. Composition, where one object holds another, models "has a" and is more flexible. And with Python\'s duck typing you often need neither: any object with the right methods will do.' },
      ],
      sedContra: 'Alan Kay, who coined the term: "OOP to me means only messaging, local retention and protection and hiding of state-process." Classes are a means, not the point.',
      respondeo: [
        'A class bundles state (attributes) with the operations that keep that state consistent (methods). Its constructor __init__ sets things up correctly; its methods keep them that way; its dunder methods (__repr__, __eq__, __len__) let instances behave like built-in values. A good sign you need one: you keep passing the same dictionary to the same handful of functions. That dictionary wants to be an object.',
        'Prefer small classes with clear jobs, dataclasses for plain records, properties for computed or validated attributes, and composition over inheritance. Inherit only when a subclass really is a special case of the parent and can be used anywhere the parent is expected.',
      ],
    },
    'file-io': {
      question: 'Does it matter if I close a file after reading it?',
      objections: [
        { claim: 'Python has garbage collection, so an unclosed file gets closed eventually and no harm is done.', reply: '"Eventually" is not a time. Until the file is closed, written data may sit in a buffer and never reach disk, and a loop can run into the operating system\'s limit on open files. The with statement closes the file at a known moment, even if an exception happens.' },
        { claim: 'Reading a whole file with read() is always fine.', reply: 'It is fine for files that fit comfortably in memory, which is most of them. For a multi-gigabyte log, looping over the file object line by line keeps memory flat and starts giving results right away.', code: 'with open("huge.log") as f:\n    for line in f:          # one line at a time\n        if "ERROR" in line:\n            print(line, end="")' },
        { claim: 'Opening a file with mode "w" adds to whatever is already there.', reply: 'Mode "w" empties the file the instant it opens. Append is "a". Plenty of data files have been wiped out by mixing these up.' },
      ],
      sedContra: 'The Python tutorial: "It is good practice to use the with keyword when dealing with file objects. The advantage is that the file is properly closed after its suite finishes."',
      respondeo: [
        'A file object is a handle on something the operating system owns. Opening it grabs the resource; closing it releases the handle and flushes any buffered writes. The with statement ties both to a block, so the file is closed on the way out no matter how the block ends. It is the same context-manager mechanism used for locks and network connections.',
        'Name the encoding when reading text, loop over large files line by line, and pick the mode carefully: "r" reads, "w" replaces, "a" appends, "x" creates and fails if the file exists. For structured data, use the csv and json modules instead of parsing by hand, and pathlib.Path for paths that work on every operating system.',
      ],
    },
    'comprehensions': {
      question: 'Is a comprehension just a shorter loop?',
      objections: [
        { claim: 'A comprehension does the same work as a loop with append, so it\'s only a matter of taste.', reply: 'It does the same work but says something different: the result is a transformation of the input, with no other effects. A reader knows at once that nothing else happens inside. It is also faster, because Python builds the list in one specialised operation.' },
        { claim: 'If one comprehension is good, nesting three of them is better.', reply: 'Comprehensions suit expressions that read like a sentence: "the square of n for each n in numbers if n is odd". Once a comprehension needs a comment, or its nested loops cannot be read aloud, turn it into a loop or a named function.' },
        { claim: 'A generator expression is just a list comprehension with round brackets.', reply: 'The brackets change what gets built. A list comprehension creates every element in memory. A generator expression produces elements on demand and holds only one at a time, so it can stream a million items into sum() without ever holding them all.', code: 'total = sum(n * n for n in range(1_000_000))   # no list is built\nsquares = [n * n for n in range(10)]            # a list is built' },
      ],
      sedContra: 'The Zen of Python: "Beautiful is better than ugly. Simple is better than complex."',
      respondeo: [
        'A comprehension is an expression that builds a collection from an iterable by mapping and filtering: [f(x) for x in xs if p(x)]. Because it is an expression, you can assign it, return it or pass it directly, and it tells the reader this is a pure transformation with no side effects. Dict and set comprehensions build those types; a generator expression gives the same values lazily.',
        'Use comprehensions for transformations that fit on one readable line. Use loops when there are side effects, several outputs, or logic that deserves a name. Prefer a generator expression when the result is used once by sum, max, any, all or a join.',
      ],
    },
    'decorators': {
      question: 'Does a decorator change the function it decorates?',
      objections: [
        { claim: 'The @ syntax edits the function in place, adding behaviour to its body.', reply: 'The original function is untouched. The decorator receives it as an argument and returns a new callable, usually a wrapper that calls the original, and the name is rebound to that new callable. @timer above def work is exactly work = timer(work).' },
        { claim: 'A decorator only works on functions that take no arguments.', reply: 'A wrapper written with *args and **kwargs passes any arguments through to the original, so one decorator fits every signature.', code: 'import functools\n\ndef log_calls(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        print("calling", func.__name__, args, kwargs)\n        return func(*args, **kwargs)\n    return wrapper' },
        { claim: 'functools.wraps is optional and has no practical effect.', reply: 'Without it the wrapper reports its own name, docstring and signature, so help(), debuggers and test frameworks see "wrapper" everywhere. wraps copies that information across so the decorated function still looks like itself.' },
      ],
      sedContra: 'PEP 318, which introduced the syntax, defines @dec followed by def f as "equivalent to f = dec(f)".',
      respondeo: [
        'A decorator is a function that takes a function and returns a function. Python functions are objects, so you can pass them around and wrap them like any value; the @ syntax is just a tidy way to apply that wrapping when the function is defined. The wrapper can run code before and after the original, change its arguments or result, cache it, retry it, or register it somewhere.',
        'Write decorators with a wrapper that accepts *args and **kwargs, apply functools.wraps to keep the metadata, and keep them small. A decorator that needs its own settings is a function that returns a decorator. The standard library\'s cache, lru_cache, property and staticmethod are all built on this idea.',
      ],
    },
    'type-hints': {
      question: 'Do type hints make Python a statically typed language?',
      objections: [
        { claim: 'Once every parameter is annotated, Python will refuse to run code with the wrong types.', reply: 'Python stores annotations and otherwise ignores them. double("ab") with n: int runs and returns "abab". Enforcement comes from separate tools (mypy, pyright, your editor) that read the hints before the program runs.', code: 'def double(n: int) -> int:\n    return n * 2\n\nprint(double("ab"))   # abab — no error at run time' },
        { claim: 'Since they aren\'t enforced, type hints are worthless.', reply: 'They are documentation a machine can check. Editors use them for autocomplete and instant red underlines; type checkers catch whole categories of bugs before any test runs; readers learn what a function expects from its signature alone.' },
        { claim: 'A dataclass is a different kind of class with special runtime type checking.', reply: 'A dataclass is an ordinary class whose __init__, __repr__ and __eq__ are generated from the annotated fields. The annotations tell the decorator which fields exist; they are still not enforced.' },
      ],
      sedContra: 'PEP 484: "Python will remain a dynamically typed language, and the authors have no desire to ever make type hints mandatory, even by convention."',
      respondeo: [
        'Type hints are annotations on parameters, return values and variables that say what types you intend. Python records them and does nothing else with them. Their power comes from tools that read them ahead of time: checkers that flag a str passed where an int was promised, and editors that can complete attribute names because they know what kind of object a variable holds.',
        'Annotate function signatures first, since they describe how to use the function. Use the built-in generics (list[int], dict[str, float]), Optional or X | None for values that may be missing, and dataclasses for records. Run a type checker in your editor or in CI, and treat what it finds the way you would treat a failing test.',
      ],
    },
    'iterators-generators': {
      question: 'Is a generator a kind of list?',
      objections: [
        { claim: 'A generator produces a sequence of values, so it\'s a list built one piece at a time.', reply: 'A list holds all its elements at once and can be indexed, sliced and looped over again and again. A generator holds none of them; it produces each value when asked and then forgets it. You can loop over it once, it has no length, and it can go on forever.', code: 'def naturals():\n    n = 0\n    while True:\n        yield n\n        n += 1\n\ng = naturals()          # no values exist yet\nprint(next(g), next(g)) # 0 1\n# len(g) -> TypeError; list(g) would never finish' },
        { claim: 'Calling a generator function runs its body.', reply: 'Calling it creates a generator object and runs nothing. The body runs when next() is called, up to the first yield, and then pauses. Each later next() picks up from that point.' },
        { claim: 'A for loop is special syntax that has nothing to do with iterators.', reply: 'for calls iter() on the object to get an iterator, then calls next() until StopIteration is raised. Lists, strings, dicts, files and generators all follow this one protocol, which is why your own classes can join in by defining __iter__.' },
      ],
      sedContra: 'PEP 255: "A generator function is a function that, when called, returns an iterator object. The body is not executed until the iterator\'s next method is invoked."',
      respondeo: [
        'An iterator is an object that hands out values one at a time through next() and signals the end with StopIteration. A generator is the easiest way to write one: a function with yield in it, whose state (local variables and where it is in the body) is paused between calls. Because values are made on demand, generators handle streams of any size, even endless ones, in constant memory.',
        'Use generators to build pipelines: one yields lines, the next filters them, the next parses them, and nothing is computed until the final step asks for a value. Use itertools for the common patterns (islice, chain, groupby), and remember that a generator is used up after one pass. Call the function again for a fresh one.',
      ],
    },
    'async-python': {
      question: 'Does asyncio make my program run in parallel?',
      objections: [
        { claim: 'asyncio.gather runs several coroutines at once, so it must be using several CPU cores.', reply: 'asyncio runs on one thread and one core. The coroutines take turns: while one waits for a network reply, another runs. They overlap their waiting, not their computing. A CPU-heavy task gains nothing from asyncio and needs multiprocessing instead.' },
        { claim: 'Adding async to a function makes it faster.', reply: 'An async function with no await inside is just a slower way to call a function. The benefit shows up only where the function would otherwise sit waiting for I/O, and only when there are other tasks to use that time.' },
        { claim: 'time.sleep inside a coroutine pauses only that coroutine.', reply: 'time.sleep blocks the whole thread, and with it the event loop and every other task. Inside a coroutine, use await asyncio.sleep, which hands control back so the others can run.', code: 'import asyncio\n\nasync def fetch(name, delay):\n    await asyncio.sleep(delay)   # yields to the loop\n    return name\n\nasync def main():\n    print(await asyncio.gather(fetch("a", 0.3), fetch("b", 0.2)))\n\nasyncio.run(main())' },
      ],
      sedContra: 'The asyncio documentation: "asyncio is a library to write concurrent code using the async/await syntax." Concurrent, not parallel.',
      respondeo: [
        'Concurrency is dealing with many things at once; parallelism is doing many things at once. asyncio gives you the first, on a single thread, through an event loop that runs one task until it awaits and then switches to another task that is ready. So the program does useful work while I/O is in flight, which for network-heavy programs is most of the time.',
        'Write coroutines with async def, pause them only with await on things that can be awaited, and start many at once with gather or TaskGroup. Never call blocking functions inside the loop; wrap them with asyncio.to_thread if you have to. For CPU-heavy work, use multiprocessing or a native extension, because awaiting never makes arithmetic faster.',
      ],
    },
    'testing-and-tooling': {
      question: 'Do tests slow me down?',
      objections: [
        { claim: 'Time spent writing tests is time not spent writing the program.', reply: 'It is time not spent re-checking the program by hand. Every change to untested code has to be verified manually, forever. A test is that check written once and run in a second, every time.' },
        { claim: 'Tests are for big teams; if I\'m working alone I know the code and don\'t need them.', reply: 'You today are a stranger to the code six months from now. Tests are the notes that stranger needs, and because they run, they cannot quietly go out of date.' },
        { claim: 'A virtual environment is unnecessary when pip install works fine globally.', reply: 'It works until two projects need different versions of the same package, or a global upgrade breaks something that used to run. A venv is one command and gives each project its own reproducible set of packages.', code: 'python3 -m venv .venv\nsource .venv/bin/activate\npip install pytest\npytest -q' },
      ],
      sedContra: 'Kent Beck: "I get paid for code that works, not for tests, so my philosophy is to test as little as possible to reach a given level of confidence." Confidence is the goal; tests are the cheap way to get it.',
      respondeo: [
        'A test is a small program that calls your code and checks what it returns. pytest finds files and functions named test_, runs them, and reports any failed checks along with the values involved. The payoff is confidence you can renew in seconds: change something, run the tests, and know whether you broke anything.',
        'Write tests for behaviour you would otherwise check by hand, especially awkward cases: empty input, edge values, bad data. Keep each project in its own virtual environment with its dependencies listed in a file, and run a formatter and linter such as Ruff so style stops being something to argue about. Good tooling is what lets a program grow without falling apart.',
      ],
    },
    'strings-deep-dive': {
      question: 'Can a Python string be changed?',
      objections: [
        { claim: 'name.upper() changes name, since I can print it in upper case afterwards.', reply: 'upper() returns a new string and leaves name alone; what you print is the new one. To keep the result you have to assign it: name = name.upper(). Every string method works this way.', code: 'name = "ada"\nname.upper()\nprint(name)          # ada\nname = name.upper()\nprint(name)          # ADA' },
        { claim: 'Building a long string with += in a loop is efficient because it edits in place.', reply: 'Each += creates a new string and copies the old contents into it, so the loop does quadratic work. Collect the pieces in a list and join them once at the end.' },
        { claim: 'bytes and strings are interchangeable, since both hold text.', reply: 'A str holds Unicode characters; bytes holds raw 8-bit values. Files, sockets and hashes deal in bytes; people read str. Convert on purpose with encode and decode and name the encoding, which is almost always utf-8.' },
      ],
      sedContra: 'The Python data model: "Strings are immutable sequences of Unicode code points."',
      respondeo: [
        'A string is an immutable sequence of characters. That is what makes strings safe to share, usable as dictionary keys, and easy to reason about: no function you call can quietly change your text. The trade-off is that every operation that seems to modify a string actually returns a new one, and you have to keep the result.',
        'Work with strings through their methods (split, join, strip, replace, startswith) and format them with f-strings, whose format specs handle alignment, padding and precision. Build large strings with a list and join. At the edges of your program, encode to bytes on the way out and decode on the way in.',
      ],
    },
    'regular-expressions': {
      question: 'Should I use regular expressions for all text matching?',
      objections: [
        { claim: 'A regex can describe any pattern, so it\'s the universal tool for text.', reply: 'Regular expressions describe regular languages, which cannot count or nest. They cannot match balanced brackets or parse HTML in general, and trying to make them do so produces fragile monsters. Nested structures need a parser.' },
        { claim: 'A simple check like "does this string end with .txt" needs a regex.', reply: 'It needs text.endswith(".txt"). The string methods (startswith, endswith, in, split, find) are clearer and faster for fixed text. Reach for re when the pattern really varies.' },
        { claim: '.* matches the shortest possible run of characters.', reply: 'Quantifiers are greedy by default: .* takes as much as it can while still letting the whole pattern match. The lazy form .*? takes as little as possible. Mixing the two up is the classic cause of matching too much.', code: 'import re\ntext = "<b>bread</b> and <b>butter</b>"\nprint(re.findall(r"<b>.*</b>", text))    # one greedy match\nprint(re.findall(r"<b>.*?</b>", text))   # two lazy matches' },
      ],
      sedContra: 'Jamie Zawinski: "Some people, when confronted with a problem, think \'I know, I\'ll use regular expressions.\' Now they have two problems."',
      respondeo: [
        'A regular expression is a compact language for describing a set of strings: literal characters, character classes, anchors, quantifiers and groups. The re module uses it to search, match, extract and substitute. For what it is good at (validating formats, pulling fields out of lines, rewriting patterns) nothing is more concise.',
        'Use raw strings so backslashes survive, compile patterns you reuse, prefer named groups for readability, and test each pattern against examples that should and should not match. Keep patterns short. When one grows past a line, split the problem up or write a small parser instead.',
      ],
    },
    'working-with-json': {
      question: 'Is JSON the same as a Python dictionary?',
      objections: [
        { claim: 'JSON text looks exactly like a dict literal, so they\'re the same thing.', reply: 'JSON is text; a dict is an object in memory. json.loads turns one into the other and json.dumps turns it back. The resemblance is deliberate, but the differences are real: JSON keys must be strings, JSON has no tuples, sets, dates or comments, and true, false and null are spelled differently.', code: 'import json\ntext = \'{"active": true, "email": null}\'\ndata = json.loads(text)\nprint(data)   # {\'active\': True, \'email\': None}' },
        { claim: 'Any Python object can be dumped to JSON.', reply: 'Only dicts, lists, strings, numbers, booleans and None convert directly. A date, a set or an instance of your own class raises TypeError until you tell dumps how to convert it with the default argument.' },
        { claim: 'JSON files can have comments and trailing commas, like Python code.', reply: 'Strict JSON allows neither. A lot of "my config file won\'t load" bugs come down to a stray comma after the last item or a helpful comment.' },
      ],
      sedContra: 'RFC 8259 defines JSON as "a lightweight, text-based, language-independent data interchange format." It is a text format, not a data structure.',
      respondeo: [
        'JSON is a text format for structured data (objects, arrays, strings, numbers, booleans and null) that almost every language can read and write. Python maps it onto dicts and lists, so once loaded you handle it with ordinary indexing and loops. Because it is everywhere in APIs, config files and data exchange, it is the format a Python programmer meets most often.',
        'Load with json.load or loads, save with json.dump or dumps, and pretty-print with indent when people will read it. Convert non-JSON types explicitly on the way out and restore them on the way in. Validate what you load before trusting it, because it came from outside your program.',
      ],
    },
    'collections-and-itertools': {
      question: 'Do I need the special containers when dict and list already exist?',
      objections: [
        { claim: 'Anything Counter does can be done with a dict and a loop, so Counter is redundant.', reply: 'It can, in five lines instead of one, with a chance of an off-by-one mistake in each. Counter also gives you most_common, arithmetic between counters and a zero default. Being able to do something by hand does not make the clearer version redundant.', code: 'from collections import Counter\nwords = "to be or not to be".split()\nprint(Counter(words).most_common(2))' },
        { claim: 'A list is as good as a deque for a queue.', reply: 'Removing from the front of a list shifts every remaining element, so a list-based queue slows down as it grows. A deque removes from either end in constant time.' },
        { claim: 'itertools functions build lists, so they use as much memory as a comprehension.', reply: 'Every itertools function returns a lazy iterator. chain, islice, product and the rest produce one item at a time and can be combined without building anything until you ask for the values.' },
      ],
      sedContra: 'The Zen of Python: "There should be one — and preferably only one — obvious way to do it." For counting, the obvious way is Counter.',
      respondeo: [
        'The collections module gives you containers shaped for common jobs: Counter for tallies, defaultdict for grouping, deque for queues and sliding windows, namedtuple for light records. itertools gives you lazy building blocks for looping: chaining, slicing, grouping, combining. Together they replace many small hand-written loops with one named, tested operation.',
        'Learn the handful you will use every week (Counter, defaultdict, deque, chain, islice, groupby) and reach for them whenever a loop starts with "make an empty thing, then for each item...". The result is shorter, faster and, because the name says what it does, easier to read.',
      ],
    },
    'recursion': {
      question: 'Is recursion just a trick for showing off?',
      objections: [
        { claim: 'Any recursive function can be written as a loop, so recursion adds nothing.', reply: 'True, any recursion can be replaced by a loop with an explicit stack. But for problems shaped like trees (nested folders, nested JSON, expression grammars) the recursive version mirrors the data, while the loop version has to rebuild the stack by hand. Recursion adds a better fit.' },
        { claim: 'Recursion is always slower than a loop.', reply: 'Function calls have a cost, and Python does not optimise tail calls, so recursing linearly over a million items is a poor choice. For problems whose depth is the height of a tree or the log of the input, the cost is negligible and the clarity is worth it.' },
        { claim: 'A recursive function should call itself first and handle the base case last.', reply: 'The base case has to be checked first, before recursing, or the function recurses forever. The shape is always: if it is trivial, return; otherwise solve a smaller version and combine.', code: 'def depth(value):\n    if not isinstance(value, (list, dict)):\n        return 0                       # base case first\n    children = value.values() if isinstance(value, dict) else value\n    return 1 + max((depth(c) for c in children), default=0)' },
      ],
      sedContra: 'A tree is defined in terms of smaller trees, so the natural way to process one is a function defined in terms of itself.',
      respondeo: [
        'Recursion means solving a problem by solving smaller versions of the same problem until one is trivial. It fits data that is itself recursive (trees, nested structures, grammars) and algorithms that split the input, such as merge sort and binary search. There, the recursive version is shorter and more obviously correct than any loop.',
        'Always write the base case first and make sure every recursive call moves toward it. Keep the depth tied to the shape of the data, not its size; for flat sequences use a loop. When the same subproblems come up repeatedly, memoise with functools.cache so each is solved once.',
      ],
    },
    'debugging-and-tracebacks': {
      question: 'Does an error message mean I failed?',
      objections: [
        { claim: 'A good programmer writes code that doesn\'t produce errors.', reply: 'A good programmer hits errors constantly and reads every one. The traceback is the program telling you exactly what it could not do and where. Code that fails silently is the real problem; a clear exception is the machine helping you.' },
        { claim: 'The first line of a traceback shows where the bug is.', reply: 'The first frame is the outermost caller. The last frame, just above the error message, is where the exception was raised. The fix is often somewhere in between: a bad value created higher up and only noticed lower down.', code: 'def average(numbers):\n    return sum(numbers) / len(numbers)   # raised here...\n\ndef report(groups):\n    for name, scores in groups.items():\n        print(name, average(scores))      # ...called from here...\n\nreport({"kitchen": []})                   # ...because of this input' },
        { claim: 'print statements are unprofessional; a debugger is the only proper tool.', reply: 'print is fast, always available and understood by everyone. The debugger shines when the state is complicated or the failure is buried deep. Professionals use both, and switch to logging when the output needs to stay.' },
      ],
      sedContra: 'The Python tutorial, on errors and exceptions: "The last line of the error message indicates what happened."',
      respondeo: [
        'A traceback lists the chain of calls that led to an exception, ending with the exception type and message. Read it from the bottom: the message says what went wrong, the last frame says where, and the frames above show how the program got there. The type alone often names the cause: NameError for a typo, TypeError for a None where an object was expected, KeyError for a missing key.',
        'Debugging is narrowing "something is wrong" down to "this line, with this input". Reproduce the failure with the smallest input that triggers it; print or log the values along the way; decide what you expect before you look; and once you find the fix, add a test that would have caught it.',
      ],
    },
  },
}
