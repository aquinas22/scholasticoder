import { Language } from '../types'

export const python: Language = {
  slug: 'python',
  name: 'Python',
  tagline: 'Life is short. Use Python.',
  description: 'Python is a high-level, dynamically typed language famous for its readable syntax. It powers AI research, web backends, automation scripts, and that one thing your data science friend won\'t stop talking about.',
  accentColor: '#FFD43B',
  textOnAccent: '#111',
  icon: 'Py',
  difficulty: 'beginner',
  usedFor: ['Data Science / AI', 'Web Backends', 'Automation', 'Scripting', 'Scientific Computing'],
  notableUsers: ['Google', 'Instagram', 'Netflix', 'NASA', 'CERN'],
  setup: {
    description: 'Python ships pre-installed on macOS and most Linux distros. Windows users need one extra step — we still accept them.',
    windows: `# Option 1: Official installer (recommended)
# Visit python.org/downloads, download the latest 3.x installer
# CRITICAL: Check "Add Python to PATH" before clicking Install

# Verify in terminal:
python --version    # or python3 --version

# Option 2: Microsoft Store
# Search "Python 3.12" in the Microsoft Store, click Get

# Option 3: winget
winget install Python.Python.3`,
    mac: `# Option 1: Homebrew (recommended)
brew install python3

# Option 2: pyenv (manage multiple Python versions)
brew install pyenv
pyenv install 3.12
pyenv global 3.12

# Verify:
python3 --version`,
    linux: `# Debian / Ubuntu:
sudo apt update && sudo apt install python3 python3-pip

# Fedora:
sudo dnf install python3 python3-pip

# Arch:
sudo pacman -S python python-pip

# Verify:
python3 --version`,
  },
  lessons: [
    {
      slug: 'hello-world',
      title: 'Hello, World!',
      intro: 'Every coding journey starts with Hello World. It\'s tradition, hazing, and a sanity check all rolled into one.',
      sections: [
        {
          type: 'text',
          content: 'In Python, printing to the terminal takes exactly one line. No imports, no class definitions, no semicolons. The print() function outputs text (or any value) to standard output and appends a newline automatically.',
        },
        {
          type: 'code',
          language: 'python',
          content: `print("Hello, World!")`,
        },
        {
          type: 'text',
          content: 'Save that as hello.py and run it with python3 hello.py. That\'s it — you\'re a programmer. print() is more flexible than it looks: it accepts multiple arguments and lets you customize the separator and line ending.',
        },
        {
          type: 'code',
          language: 'python',
          content: `# Multiple arguments — joined with a space by default
print("Hello,", "World!")            # Hello, World!

# Custom separator
print("2024", "01", "15", sep="-")   # 2024-01-15

# No newline at end
print("Loading", end="...")
print("done!")                        # Loading...done!

# Print numbers and booleans directly
print(42)
print(3.14159)
print(True)`,
        },
        {
          type: 'note',
          content: 'Python 3 print() is a function — print("hello"). Python 2 had print as a statement — print "hello". Python 2 reached end-of-life in 2020. Do not learn Python 2.',
        },
      ],
    },
    {
      slug: 'variables',
      title: 'Variables & Data Types',
      intro: 'Python is dynamically typed, which means you don\'t declare types — Python figures it out. This is either liberating or terrifying depending on your background.',
      sections: [
        {
          type: 'text',
          content: 'Variables in Python are created by assignment. There\'s no need for keywords like var, let, or int. The built-in types cover all common use cases: integers, floats, strings, booleans, and None (Python\'s null).',
        },
        {
          type: 'code',
          language: 'python',
          content: `# Integer
age = 25
year = 2024

# Float
pi = 3.14159
temperature = -10.5

# String — single or double quotes are equivalent
name = "Alice"
greeting = 'Hello, world'

# Multi-line string
bio = """I'm Alice.
I like Python.
I am a multi-line string."""

# Boolean
is_student = True
has_car = False

# None (the absence of a value)
result = None

# Check a variable's type
print(type(age))         # <class 'int'>
print(type(pi))          # <class 'float'>
print(type(name))        # <class 'str'>
print(type(is_student))  # <class 'bool'>`,
        },
        {
          type: 'text',
          content: 'Python supports multiple assignment in one line, and you can swap variables without a temporary variable — a small but delightful trick.',
        },
        {
          type: 'code',
          language: 'python',
          content: `# Multiple assignment
x, y, z = 1, 2, 3

# Swap without a temp variable
x, y = y, x
print(x, y)   # 2 1

# String formatting — f-strings are the modern way
name = "Alice"
age = 30
print(f"My name is {name} and I am {age} years old.")

# Expressions work inside f-strings
print(f"Next year I'll be {age + 1}.")

# Type conversion
num_str = "42"
num = int(num_str)       # str -> int
flt = float(num_str)     # str -> float
back = str(num)          # int -> str`,
        },
        {
          type: 'note',
          content: 'Python uses snake_case for variable names (my_variable, not myVariable). Constants are written in UPPER_SNAKE_CASE by convention (MAX_RETRIES = 3), though Python doesn\'t enforce immutability.',
        },
      ],
    },
    {
      slug: 'control-flow',
      title: 'Control Flow',
      intro: 'Python uses indentation to define code blocks. Not curly braces. Not keywords. Whitespace. If you love arguments, bring this up at your next dinner party.',
      sections: [
        {
          type: 'text',
          content: 'Python\'s if/elif/else statements work like you\'d expect. The colon after the condition is required, and the body must be indented consistently (4 spaces is the standard). Python uses elif (not else if) for chained conditions.',
        },
        {
          type: 'code',
          language: 'python',
          content: `age = 20

if age < 13:
    print("child")
elif age < 18:
    print("teenager")
elif age < 65:
    print("adult")
else:
    print("senior")

# Comparison operators
x = 10
print(x > 5)    # True
print(x == 10)  # True (== for equality, not =)
print(x != 3)   # True
print(x >= 10)  # True

# Logical operators
print(x > 5 and x < 20)   # True
print(x < 0 or x > 5)     # True
print(not True)             # False`,
        },
        {
          type: 'text',
          content: 'Python has two loop types: for (iterates over a sequence) and while (runs while a condition is true). The for loop is used far more often in idiomatic Python.',
        },
        {
          type: 'code',
          language: 'python',
          content: `# For loop over a range
for i in range(5):
    print(i)   # 0, 1, 2, 3, 4

# range(start, stop, step)
for i in range(0, 10, 2):
    print(i)   # 0, 2, 4, 6, 8

# For loop over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# While loop
count = 0
while count < 5:
    print(count)
    count += 1

# break and continue
for i in range(10):
    if i == 3:
        continue   # skip 3
    if i == 7:
        break      # stop at 7
    print(i)       # 0, 1, 2, 4, 5, 6`,
        },
        {
          type: 'note',
          content: 'Python\'s "truthy" and "falsy" values: empty strings, empty lists, 0, None, and False are all falsy. Everything else is truthy. This lets you write: if my_list: instead of if len(my_list) > 0:',
        },
      ],
    },
    {
      slug: 'functions',
      title: 'Functions',
      intro: 'Functions are reusable blocks of code. Write once, call many times. This is the foundation of not hating yourself when you have to change something.',
      sections: [
        {
          type: 'text',
          content: 'Define functions with the def keyword. Parameters can have default values, and Python supports both positional and keyword arguments when calling functions.',
        },
        {
          type: 'code',
          language: 'python',
          content: `# Basic function
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))   # Hello, Alice!

# Default parameter values
def greet_with_title(name, title="Dr."):
    return f"Hello, {title} {name}!"

print(greet_with_title("Smith"))           # Hello, Dr. Smith!
print(greet_with_title("Jones", "Prof."))  # Hello, Prof. Jones!

# Multiple return values (returns a tuple)
def min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = min_max([3, 1, 4, 1, 5, 9, 2, 6])
print(lo, hi)   # 1 9

# *args — variable number of arguments
def total(*args):
    return sum(args)

print(total(1, 2, 3, 4))   # 10

# **kwargs — keyword arguments as a dict
def describe(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

describe(name="Alice", age=30, city="Paris")`,
        },
        {
          type: 'text',
          content: 'Lambda functions are anonymous single-expression functions, useful for short operations passed to higher-order functions like sorted(), map(), and filter().',
        },
        {
          type: 'code',
          language: 'python',
          content: `# Lambda: lambda parameters: expression
square = lambda x: x ** 2
print(square(5))   # 25

# Common use: sorting with a custom key
people = [("Alice", 30), ("Bob", 25), ("Charlie", 35)]
sorted_by_age = sorted(people, key=lambda p: p[1])
print(sorted_by_age)   # [('Bob', 25), ('Alice', 30), ('Charlie', 35)]

# map() — apply function to every element
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x**2, numbers))
print(squares)   # [1, 4, 9, 16, 25]

# filter() — keep elements where function returns True
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)   # [2, 4]`,
        },
      ],
    },
    {
      slug: 'data-structures',
      title: 'Lists, Dicts & Sets',
      intro: 'Python\'s built-in collections are so good you\'ll rarely need anything else. Lists, dicts, and sets cover 95% of real-world needs.',
      sections: [
        {
          type: 'text',
          content: 'Lists are ordered, mutable sequences. They\'re Python\'s workhorse collection type. You can put anything in a list — including other lists.',
        },
        {
          type: 'code',
          language: 'python',
          content: `# Lists
fruits = ["apple", "banana", "cherry"]
print(fruits[0])      # apple (0-indexed)
print(fruits[-1])     # cherry (negative index = from end)
print(fruits[1:3])    # ['banana', 'cherry'] (slicing)

# Mutating lists
fruits.append("date")           # add to end
fruits.insert(1, "avocado")    # insert at index 1
fruits.remove("banana")         # remove by value
popped = fruits.pop()           # remove and return last item
fruits.sort()                   # sort in-place

# List comprehension — the Pythonic way to build lists
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
print(squares)   # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Useful list methods
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
print(len(numbers))      # 8
print(sum(numbers))      # 31
print(min(numbers))      # 1
print(max(numbers))      # 9
print(numbers.count(1))  # 2`,
        },
        {
          type: 'text',
          content: 'Dictionaries map keys to values. As of Python 3.7+, they maintain insertion order. They\'re used everywhere — for config, JSON-like data, and anything that needs fast key-based lookup.',
        },
        {
          type: 'code',
          language: 'python',
          content: `# Dictionaries
person = {
    "name": "Alice",
    "age": 30,
    "city": "Paris",
}

print(person["name"])              # Alice
print(person.get("country", "Unknown"))  # Unknown (safe default)

# Mutating dicts
person["email"] = "alice@example.com"   # add or update
del person["city"]                        # remove key

# Iterating
for key in person:
    print(key, "->", person[key])

for key, value in person.items():
    print(f"{key}: {value}")

# Dict comprehension
squares = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Sets — unordered, unique values
tags = {"python", "web", "backend", "python"}
print(tags)   # {'python', 'web', 'backend'} — duplicate removed

a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a & b)   # intersection: {3, 4}
print(a | b)   # union: {1, 2, 3, 4, 5, 6}
print(a - b)   # difference: {1, 2}`,
        },
        {
          type: 'note',
          content: 'Use a list when order matters. Use a dict when you need to look things up by name. Use a set when you only care about unique membership. Picking the right data structure is half of writing good code.',
        },
      ],
    },
    {
      slug: 'modules',
      title: 'Modules & Packages',
      intro: 'Python\'s standard library is enormous. And if that\'s not enough, there\'s PyPI with 500,000+ packages. You will rarely need to write code from scratch.',
      sections: [
        {
          type: 'text',
          content: 'A module is just a Python file. You can import any module using the import keyword, and access its contents with dot notation. The standard library covers math, dates, files, networking, JSON, and much more.',
        },
        {
          type: 'code',
          language: 'python',
          content: `import math
import random
import os
from datetime import datetime

# math module
print(math.pi)              # 3.141592653589793
print(math.sqrt(16))        # 4.0
print(math.ceil(3.2))       # 4
print(math.floor(3.9))      # 3

# random module
print(random.randint(1, 10))        # random int 1-10
print(random.choice(["a","b","c"])) # random element
numbers = [1, 2, 3, 4, 5]
random.shuffle(numbers)              # shuffle in-place

# datetime
now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M"))  # 2024-01-15 14:30

# os module
print(os.getcwd())               # current directory
files = os.listdir(".")          # list files
os.makedirs("new_dir", exist_ok=True)  # create directory`,
        },
        {
          type: 'text',
          content: 'Write your own module by creating a .py file. Import it by filename (without .py). Use pip to install third-party packages from PyPI.',
        },
        {
          type: 'code',
          language: 'python',
          content: `# mymath.py
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

PI = 3.14159

# In another file:
# import mymath
# print(mymath.add(2, 3))     # 5
# print(mymath.PI)             # 3.14159

# Or import specific names:
# from mymath import add, PI
# print(add(2, 3))             # 5

# Installing packages with pip
# pip install requests         (HTTP client)
# pip install pandas           (data manipulation)
# pip install flask            (web framework)

# Virtual environments — isolate dependencies per project
# python3 -m venv venv         (create)
# source venv/bin/activate     (activate on Mac/Linux)
# venv\\Scripts\\activate       (activate on Windows)
# pip install requests         (installs into venv, not system)`,
        },
        {
          type: 'note',
          content: 'Always use a virtual environment for projects. Without one, pip installs packages globally and you\'ll eventually hit version conflicts. It\'s two extra commands and will save you hours of pain.',
        },
      ],
    },
    {
      slug: 'error-handling',
      title: 'Error Handling',
      intro: 'Things go wrong. Files don\'t exist. Users type letters when you expected numbers. APIs return 500. Python\'s try/except lets you handle these gracefully instead of crashing.',
      sections: [
        {
          type: 'text',
          content: 'Python uses try/except blocks for exception handling. You can catch specific exception types, multiple types, or all exceptions. Always be as specific as possible — catching all exceptions hides bugs.',
        },
        {
          type: 'code',
          language: 'python',
          content: `# Basic try/except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("You can't divide by zero!")

# Multiple exception types
try:
    num = int("not a number")
except ValueError as e:
    print(f"Value error: {e}")
except TypeError as e:
    print(f"Type error: {e}")

# else — runs if no exception occurred
try:
    result = 10 / 2
except ZeroDivisionError:
    print("Division error")
else:
    print(f"Result: {result}")   # Result: 5.0

# finally — always runs
try:
    f = open("data.txt", "r")
    content = f.read()
except FileNotFoundError:
    print("File not found")
finally:
    print("This always runs")    # cleanup code goes here

# Raising exceptions
def divide(a, b):
    if b == 0:
        raise ValueError("Denominator cannot be zero")
    return a / b

try:
    divide(10, 0)
except ValueError as e:
    print(e)   # Denominator cannot be zero`,
        },
        {
          type: 'text',
          content: 'For file and resource handling, Python\'s with statement is the idiomatic approach. It automatically closes the file even if an exception occurs — no finally needed.',
        },
        {
          type: 'code',
          language: 'python',
          content: `# Context managers — the right way to handle files
with open("data.txt", "r") as f:
    content = f.read()
# file is automatically closed here

# Writing to a file
with open("output.txt", "w") as f:
    f.write("Hello, file!\\n")
    f.write("Second line\\n")

# Reading line by line (memory-efficient for large files)
with open("data.txt", "r") as f:
    for line in f:
        print(line.strip())   # strip() removes the trailing newline

# Custom exceptions
class InsufficientFundsError(Exception):
    def __init__(self, amount, balance):
        self.amount = amount
        self.balance = balance
        super().__init__(f"Cannot withdraw {amount}. Balance: {balance}")

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(amount, balance)
    return balance - amount`,
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: CLI Todo App',
      intro: 'Let\'s build something real: a command-line todo app that saves your tasks to a file. Everything you\'ve learned, put together.',
      sections: [
        {
          type: 'text',
          content: 'We\'ll build a todo app that persists tasks to a JSON file. It will support adding, listing, completing, and deleting tasks. This uses file I/O, JSON, functions, and all the other concepts from previous lessons.',
        },
        {
          type: 'code',
          language: 'python',
          content: `import json
import os
import sys
from datetime import datetime

TODO_FILE = "todos.json"

def load_todos():
    if not os.path.exists(TODO_FILE):
        return []
    with open(TODO_FILE, "r") as f:
        return json.load(f)

def save_todos(todos):
    with open(TODO_FILE, "w") as f:
        json.dump(todos, f, indent=2)

def add_todo(text):
    todos = load_todos()
    todo = {
        "id": len(todos) + 1,
        "text": text,
        "done": False,
        "created": datetime.now().isoformat()
    }
    todos.append(todo)
    save_todos(todos)
    print(f"Added: {text}")

def list_todos():
    todos = load_todos()
    if not todos:
        print("No todos yet. Add some!")
        return
    for todo in todos:
        status = "✓" if todo["done"] else "○"
        print(f"[{todo['id']}] {status} {todo['text']}")

def complete_todo(todo_id):
    todos = load_todos()
    for todo in todos:
        if todo["id"] == todo_id:
            todo["done"] = True
            save_todos(todos)
            print(f"Completed: {todo['text']}")
            return
    print(f"No todo with id {todo_id}")

def delete_todo(todo_id):
    todos = load_todos()
    todos = [t for t in todos if t["id"] != todo_id]
    save_todos(todos)
    print(f"Deleted todo {todo_id}")

def main():
    if len(sys.argv) < 2:
        print("Usage: python todo.py [add|list|done|delete] [args]")
        return

    command = sys.argv[1]

    if command == "add" and len(sys.argv) > 2:
        add_todo(" ".join(sys.argv[2:]))
    elif command == "list":
        list_todos()
    elif command == "done" and len(sys.argv) > 2:
        complete_todo(int(sys.argv[2]))
    elif command == "delete" and len(sys.argv) > 2:
        delete_todo(int(sys.argv[2]))
    else:
        print("Unknown command or missing arguments")

if __name__ == "__main__":
    main()`,
        },
        {
          type: 'text',
          content: 'Save this as todo.py and try it out. The if __name__ == "__main__": pattern means the main() function only runs when you execute the file directly, not when it\'s imported as a module — a crucial Python convention.',
        },
        {
          type: 'code',
          language: 'bash',
          content: `python todo.py add "Buy groceries"
python todo.py add "Write code"
python todo.py list
python todo.py done 1
python todo.py list
python todo.py delete 2`,
        },
        {
          type: 'note',
          content: 'Next steps: try adding a "due date" field, or rewrite the file storage to use SQLite instead of JSON (hint: look at the sqlite3 module in the standard library).',
        },
      ],
    },
    {
      slug: 'classes-oop',
      title: 'Classes & OOP',
      intro: 'Python classes are simpler than Java or C++ — no access modifiers, no header files, and you can add attributes whenever you want. This is either liberating or terrifying, depending on your background.',
      sections: [
        {
          type: 'text',
          content: 'A class is a blueprint for creating objects. Python uses the __init__ method as the constructor. The self parameter is the instance — Python passes it automatically, but you must declare it explicitly in every method.',
        },
        {
          type: 'code',
          language: 'python',
          content: `class Animal:
    # Class variable — shared by all instances
    kingdom = "Animalia"

    def __init__(self, name: str, sound: str):
        # Instance variables — unique to each instance
        self.name = name
        self.sound = sound
        self._age = 0  # _ prefix = "private by convention"

    def speak(self) -> str:
        return f"{self.name} says {self.sound}!"

    def birthday(self):
        self._age += 1

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value: int):
        if value < 0:
            raise ValueError("Age cannot be negative")
        self._age = value

    def __repr__(self):
        return f"Animal(name={self.name!r}, sound={self.sound!r})"

    def __str__(self):
        return self.name


dog = Animal("Rex", "woof")
print(dog.speak())       # Rex says woof!
print(dog.age)           # 0
dog.birthday()
print(dog.age)           # 1
print(repr(dog))         # Animal(name='Rex', sound='woof')
print(str(dog))          # Rex`,
        },
        {
          type: 'code',
          language: 'python',
          content: `# Inheritance
class Dog(Animal):
    def __init__(self, name: str, breed: str):
        super().__init__(name, "woof")  # call parent __init__
        self.breed = breed

    def speak(self) -> str:
        # Override parent method
        return f"{self.name} the {self.breed} barks!"

    def fetch(self, item: str) -> str:
        return f"{self.name} fetched the {item}!"


class Cat(Animal):
    def __init__(self, name: str):
        super().__init__(name, "meow")
        self.lives = 9

    def speak(self) -> str:
        return f"{self.name} ignores you."


# Polymorphism — same interface, different behavior
animals: list[Animal] = [
    Dog("Buddy", "Labrador"),
    Cat("Whiskers"),
    Dog("Max", "Poodle"),
]

for animal in animals:
    print(animal.speak())

# isinstance checks
print(isinstance(animals[0], Dog))     # True
print(isinstance(animals[0], Animal))  # True
print(isinstance(animals[1], Dog))     # False`,
        },
        {
          type: 'code',
          language: 'python',
          content: `# Dataclasses — less boilerplate for simple classes
from dataclasses import dataclass, field
from typing import Optional

@dataclass
class Point:
    x: float
    y: float

    def distance_to(self, other: 'Point') -> float:
        return ((self.x - other.x)**2 + (self.y - other.y)**2) ** 0.5


@dataclass
class Player:
    name: str
    hp: int = 100
    inventory: list[str] = field(default_factory=list)  # mutable default!
    position: Point = field(default_factory=lambda: Point(0, 0))

    def pick_up(self, item: str):
        self.inventory.append(item)

    def __post_init__(self):
        if self.hp < 0:
            raise ValueError("HP cannot be negative")


p1 = Point(0, 0)
p2 = Point(3, 4)
print(p1.distance_to(p2))  # 5.0

player = Player("Alice")
player.pick_up("sword")
player.pick_up("shield")
print(player)  # Player(name='Alice', hp=100, inventory=['sword', 'shield'], ...)`,
        },
        {
          type: 'note',
          content: 'Use dataclasses for plain data containers. Use regular classes when you need complex initialization, inheritance, or custom descriptors. The @dataclass decorator auto-generates __init__, __repr__, and __eq__ based on your field annotations.',
        },
      ],
    },
    {
      slug: 'file-io',
      title: 'File I/O',
      intro: 'Python file handling is clean and safe with the "with" statement, which automatically closes files even if an exception occurs. It is a small thing that prevents a large number of subtle bugs.',
      sections: [
        {
          type: 'code',
          language: 'python',
          content: `# Reading files
# open(path, mode) — mode: 'r' read, 'w' write, 'a' append, 'b' binary

# Read entire file
with open("hello.txt", "r") as f:
    content = f.read()
    print(content)

# Read line by line (memory-efficient for large files)
with open("data.txt", "r") as f:
    for line in f:
        print(line.strip())  # strip() removes trailing newline

# Read all lines into a list
with open("data.txt", "r") as f:
    lines = f.readlines()  # each line includes \\n
    lines = [l.strip() for l in lines]

# Writing files
with open("output.txt", "w") as f:  # 'w' overwrites!
    f.write("Hello, file!\\n")
    f.write("Second line\\n")

# Appending
with open("log.txt", "a") as f:
    f.write("New log entry\\n")

# Writing multiple lines at once
lines = ["line 1\\n", "line 2\\n", "line 3\\n"]
with open("output.txt", "w") as f:
    f.writelines(lines)`,
        },
        {
          type: 'code',
          language: 'python',
          content: `import json
import csv
from pathlib import Path

# JSON
data = {"name": "Alice", "scores": [95, 87, 92], "active": True}

# Write JSON
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

# Read JSON
with open("data.json", "r") as f:
    loaded = json.load(f)
print(loaded["name"])  # Alice

# CSV
rows = [
    ["name", "age", "city"],
    ["Alice", "30", "Paris"],
    ["Bob", "25", "Berlin"],
]

with open("people.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(rows)

with open("people.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"{row['name']} lives in {row['city']}")

# pathlib — modern path handling
p = Path("data")
p.mkdir(exist_ok=True)         # create directory
(p / "file.txt").write_text("hello")   # write
text = (p / "file.txt").read_text()    # read
print(list(p.glob("*.txt")))   # find files
print(p.exists())              # True`,
        },
        {
          type: 'warning',
          content: 'Always use "with open(...) as f:" — never bare open() without a close(). The with statement guarantees the file is closed even if an exception is raised inside the block. Also: "w" mode truncates the file immediately on open, before you write anything.',
        },
      ],
    },
    {
      slug: 'comprehensions',
      title: 'Comprehensions & Generators',
      intro: 'List comprehensions are Pythonic. They are also extremely easy to abuse until you have written a one-liner that takes 10 minutes to understand. Use them for simple transformations; reach for a loop when it gets complicated.',
      sections: [
        {
          type: 'code',
          language: 'python',
          content: `# List comprehension — [expression for item in iterable if condition]
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

squares = [n**2 for n in numbers]
print(squares)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

evens = [n for n in numbers if n % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]

even_squares = [n**2 for n in numbers if n % 2 == 0]
print(even_squares)  # [4, 16, 36, 64, 100]

# Nested comprehension (flatten a 2D list)
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [x for row in matrix for x in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Dict comprehension
words = ["hello", "world", "python"]
lengths = {word: len(word) for word in words}
print(lengths)  # {'hello': 5, 'world': 5, 'python': 6}

# Set comprehension
dupes = [1, 2, 2, 3, 3, 3, 4]
unique = {x**2 for x in dupes}
print(unique)  # {1, 4, 9, 16} (order not guaranteed)

# Conditional expression (ternary)
labels = ["even" if n % 2 == 0 else "odd" for n in range(1, 6)]
print(labels)  # ['odd', 'even', 'odd', 'even', 'odd']`,
        },
        {
          type: 'code',
          language: 'python',
          content: `# Generator expressions — lazy, memory-efficient
# Use () instead of []
gen = (n**2 for n in range(1_000_000))  # creates no list yet
print(next(gen))  # 0
print(next(gen))  # 1
print(sum(gen))   # computes on the fly

# Generator function — yield instead of return
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
print([next(fib) for _ in range(10)])  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Generator with yield from
def chain(*iterables):
    for it in iterables:
        yield from it

print(list(chain([1, 2], [3, 4], [5])))  # [1, 2, 3, 4, 5]

# itertools — powerful combinator utilities
import itertools

print(list(itertools.islice(fibonacci(), 8)))     # first 8 Fibonacci numbers
print(list(itertools.product([0,1], repeat=3)))   # all 3-bit binary combos
print(list(itertools.combinations("ABCD", 2)))    # C(4,2) = 6 pairs
pairs = list(itertools.zip_longest([1,2,3], [4,5], fillvalue=0))
print(pairs)  # [(1, 4), (2, 5), (3, 0)]`,
        },
        {
          type: 'note',
          content: 'Generator expressions use O(1) memory regardless of input size. Prefer them over list comprehensions when you only need to iterate once and do not need random access. sum(x**2 for x in range(1_000_000)) is faster and uses less memory than sum([x**2 for x in range(1_000_000)]).',
        },
      ],
    },
    {
      slug: 'decorators',
      title: 'Decorators & Functional Tools',
      intro: 'A decorator is just a function that takes a function and returns a function. The @syntax is syntactic sugar. It looks magic; it is not magic. It is just clever use of the fact that functions are objects.',
      sections: [
        {
          type: 'code',
          language: 'python',
          content: `import time
import functools

# A decorator is: decorated = decorator(original_function)
# @decorator is just syntax sugar for that assignment

def timer(func):
    @functools.wraps(func)  # preserves __name__, __doc__, etc.
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_sum(n: int) -> int:
    return sum(range(n))

slow_sum(10_000_000)  # slow_sum took 0.2345s


# Decorator with arguments — a decorator factory
def retry(max_attempts: int = 3, delay: float = 0.5):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_error = None
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_error = e
                    print(f"Attempt {attempt} failed: {e}")
                    if attempt < max_attempts:
                        time.sleep(delay)
            raise last_error
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.1)
def flaky_operation():
    import random
    if random.random() < 0.7:
        raise ConnectionError("Temporary failure")
    return "success"`,
        },
        {
          type: 'code',
          language: 'python',
          content: `from functools import lru_cache, partial, reduce

# @lru_cache — memoization (cache results of expensive calls)
@lru_cache(maxsize=128)
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

print(fib(40))  # fast because results are cached
print(fib.cache_info())  # CacheInfo(hits=38, misses=41, ...)

# functools.partial — pre-fill some arguments
def power(base: float, exp: float) -> float:
    return base ** exp

square = partial(power, exp=2)
cube   = partial(power, exp=3)

print(square(5))  # 25.0
print(cube(3))    # 27.0

# map, filter, reduce
nums = [1, 2, 3, 4, 5]
doubled   = list(map(lambda x: x * 2, nums))
big       = list(filter(lambda x: x > 2, nums))
total     = reduce(lambda acc, x: acc + x, nums, 0)

print(doubled)  # [2, 4, 6, 8, 10]
print(big)      # [3, 4, 5]
print(total)    # 15

# sorted with key function
words = ["banana", "apple", "cherry", "date"]
by_len   = sorted(words, key=len)
by_last  = sorted(words, key=lambda w: w[-1])
print(by_len)   # ['date', 'apple', 'banana', 'cherry']`,
        },
        {
          type: 'note',
          content: 'functools.wraps is not optional — without it, your decorated function loses its __name__ and __doc__, which breaks introspection, logging, and error messages. Always include it in every wrapper you write.',
        },
      ],
    },
    {
      slug: 'type-hints',
      title: 'Type Hints & Modern Python',
      intro: 'Python type hints do not make Python a statically typed language — the interpreter still ignores them at runtime. But they let tools like mypy catch bugs before you run the code, and they make your code infinitely more readable.',
      sections: [
        {
          type: 'code',
          language: 'python',
          content: `from typing import Optional, Union, Any, TypeVar, Generic
from collections.abc import Callable, Sequence, Iterator

# Basic type hints
def greet(name: str) -> str:
    return f"Hello, {name}!"

def add(a: int, b: int) -> int:
    return a + b

# Optional — value can be None
def find_user(user_id: int) -> Optional[str]:  # str | None in Python 3.10+
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)

# Union — multiple possible types
def stringify(value: Union[int, float, str]) -> str:
    return str(value)

# Python 3.10+ syntax (cleaner)
def process(data: int | str | None) -> str:
    if data is None:
        return "none"
    return str(data)

# Container types
def sum_list(nums: list[int]) -> int:
    return sum(nums)

def merge(a: dict[str, int], b: dict[str, int]) -> dict[str, int]:
    return {**a, **b}

def first(items: Sequence[Any]) -> Any:
    return items[0]

# Callable types
def apply(func: Callable[[int], int], value: int) -> int:
    return func(value)

print(apply(lambda x: x * 2, 5))  # 10`,
        },
        {
          type: 'code',
          language: 'python',
          content: `from typing import TypeVar, Generic, Protocol
from dataclasses import dataclass

T = TypeVar('T')

# Generic class
class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        if not self._items:
            raise IndexError("pop from empty stack")
        return self._items.pop()

    def peek(self) -> T:
        return self._items[-1]

    def __len__(self) -> int:
        return len(self._items)


s: Stack[int] = Stack()
s.push(1)
s.push(2)
print(s.pop())  # 2

# Protocol — structural subtyping ("duck typing" with type safety)
class Drawable(Protocol):
    def draw(self) -> str: ...

@dataclass
class Circle:
    radius: float
    def draw(self) -> str:
        return f"Circle(r={self.radius})"

@dataclass
class Square:
    side: float
    def draw(self) -> str:
        return f"Square(s={self.side})"

def render(shape: Drawable) -> None:
    print(shape.draw())

render(Circle(5.0))    # works
render(Square(3.0))    # works — no explicit inheritance needed

# Type aliases
Vector = list[float]
Matrix = list[Vector]

def dot_product(a: Vector, b: Vector) -> float:
    return sum(x * y for x, y in zip(a, b))`,
        },
        {
          type: 'note',
          content: 'Install mypy (pip install mypy) and run "mypy yourfile.py" to catch type errors before running. For new projects, use "mypy --strict" to enforce full type coverage. Type hints are especially valuable in larger codebases where you cannot hold the entire program in your head.',
        },
      ],
    },
  ],
}
