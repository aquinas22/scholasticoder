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
    {
      slug: 'iterators-generators',
      title: 'Iterators & Generators',
      intro: 'A list holds every element in memory at once. A generator produces elements one at a time, on demand — which means you can iterate over a 40 GB log file, or an infinite sequence, using a few kilobytes of RAM.',
      sections: [
        {
          type: 'text',
          content: 'Every for loop in Python is powered by the iterator protocol: iter() gets an iterator, next() pulls the next value, and StopIteration signals the end. Generators let you write an iterator without writing a class.',
        },
        {
          type: 'code',
          language: 'python',
          content: `# The protocol, by hand
nums = [1, 2, 3]
it = iter(nums)
print(next(it))   # 1
print(next(it))   # 2
print(next(it))   # 3
# next(it) now raises StopIteration

# A generator function — "yield" instead of "return"
def countdown(n):
    while n > 0:
        yield n
        n -= 1
    print("liftoff!")

for x in countdown(3):
    print(x)      # 3, 2, 1  then "liftoff!"

# Execution PAUSES at each yield and resumes on the next next() call.
gen = countdown(2)
print(next(gen))  # 2   — body runs up to the first yield, then freezes
print(next(gen))  # 1
`,
        },
        {
          type: 'code',
          language: 'python',
          content: `# Generator expressions — like a list comprehension with () instead of []
squares_list = [x * x for x in range(1_000_000)]   # ~40 MB in memory
squares_gen  = (x * x for x in range(1_000_000))   # a few hundred bytes

print(sum(squares_gen))   # streams through, never materializes the list

# Reading a huge file line by line without loading it all
def read_lines(path):
    with open(path) as f:
        for line in f:          # file objects are already iterators
            yield line.rstrip()

def only_errors(lines):
    for line in lines:
        if "ERROR" in line:
            yield line

# Pipelines compose: each stage pulls one item at a time
# for err in only_errors(read_lines("app.log")):
#     print(err)

# Infinite generators are fine — just do not call list() on them
def naturals():
    n = 0
    while True:
        yield n
        n += 1

from itertools import islice
print(list(islice(naturals(), 5)))   # [0, 1, 2, 3, 4]
`,
        },
        {
          type: 'code',
          language: 'python',
          content: `from itertools import chain, groupby, count, cycle, takewhile

# itertools is the standard library's generator toolbox
print(list(chain([1, 2], [3, 4])))            # [1, 2, 3, 4]
print(list(takewhile(lambda n: n < 5, count()))) # [0, 1, 2, 3, 4]

# yield from — delegate to another generator
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

print(list(flatten([1, [2, [3, [4]]], 5])))   # [1, 2, 3, 4, 5]

# A custom iterator class (when you need extra state or methods)
class Fibonacci:
    def __init__(self, limit):
        self.limit = limit

    def __iter__(self):
        a, b = 0, 1
        for _ in range(self.limit):
            yield a
            a, b = b, a + b

print(list(Fibonacci(8)))   # [0, 1, 1, 2, 3, 5, 8, 13]
`,
        },
        {
          type: 'warning',
          content: 'A generator is exhausted after one full pass. Iterating it a second time yields nothing — no error, just an empty loop. If you need the values twice, call list() on it once and reuse the list.',
        },
        {
          type: 'tip',
          content: 'Rule of thumb: if you only loop over a result once, make it a generator. If you index into it, len() it, or loop twice, make it a list.',
        },
      ],
    },
    {
      slug: 'async-python',
      title: 'Async & Concurrency',
      intro: 'Most programs spend their time waiting — on the network, on the disk, on a database. asyncio lets a single thread start hundreds of waits at once and handle whichever finishes first, turning ten sequential one-second requests into one second total.',
      sections: [
        {
          type: 'code',
          language: 'python',
          content: `import asyncio, time

async def fetch(name, seconds):
    print(f"start {name}")
    await asyncio.sleep(seconds)     # yields control while waiting
    print(f"done {name}")
    return f"{name}-result"

async def sequential():
    a = await fetch("a", 1)
    b = await fetch("b", 1)
    return [a, b]                    # takes ~2 seconds

async def concurrent():
    return await asyncio.gather(
        fetch("a", 1),
        fetch("b", 1),
    )                                # takes ~1 second

start = time.perf_counter()
print(asyncio.run(concurrent()))
print(f"{time.perf_counter() - start:.2f}s")
`,
        },
        {
          type: 'code',
          language: 'python',
          content: `import asyncio

# Tasks run in the background as soon as they are created
async def worker(n):
    await asyncio.sleep(n * 0.1)
    return n * n

async def main():
    # TaskGroup (3.11+) — the modern way; cancels siblings if one fails
    async with asyncio.TaskGroup() as tg:
        tasks = [tg.create_task(worker(i)) for i in range(5)]
    print([t.result() for t in tasks])   # [0, 1, 4, 9, 16]

    # Timeouts
    try:
        await asyncio.wait_for(asyncio.sleep(10), timeout=0.5)
    except asyncio.TimeoutError:
        print("gave up waiting")

    # Bounding concurrency so you do not open 5000 sockets at once
    sem = asyncio.Semaphore(10)
    async def limited(i):
        async with sem:
            return await worker(i)

    results = await asyncio.gather(*(limited(i) for i in range(100)))
    print(len(results))

asyncio.run(main())
`,
        },
        {
          type: 'code',
          language: 'python',
          content: `import asyncio
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

# Three kinds of concurrency, three right answers:
#
#   asyncio      -> many I/O waits, one thread     (network, sockets, DB)
#   threads      -> blocking I/O in libraries that are not async-aware
#   processes    -> CPU-bound work (bypasses the GIL)

def cpu_heavy(n):
    return sum(i * i for i in range(n))

def blocking_io():
    import time; time.sleep(1); return "io done"

async def main():
    loop = asyncio.get_running_loop()

    # Push blocking work off the event loop so it stays responsive
    with ThreadPoolExecutor() as pool:
        print(await loop.run_in_executor(pool, blocking_io))

    with ProcessPoolExecutor() as pool:
        results = await asyncio.gather(*(
            loop.run_in_executor(pool, cpu_heavy, 1_000_000)
            for _ in range(4)
        ))
        print(results[0])

asyncio.run(main())
`,
        },
        {
          type: 'warning',
          content: 'Never call a blocking function (time.sleep, requests.get, a synchronous DB driver) inside an async function. It freezes the entire event loop — every other task stops until it returns. Use the async equivalent (asyncio.sleep, httpx, asyncpg) or run_in_executor.',
        },
        {
          type: 'note',
          content: 'Calling an async function without await does nothing — it just builds a coroutine object and Python warns "coroutine was never awaited". Every async call needs an await, a create_task, or a gather.',
        },
      ],
    },
    {
      slug: 'testing-and-tooling',
      title: 'Testing, Virtual Environments & Packaging',
      intro: 'Code that is not tested is code you are afraid to change. This lesson covers the practical toolchain around real Python projects: isolated environments, pytest, and a pyproject.toml that makes your code installable.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `# Virtual environments — one isolated set of packages per project
python -m venv .venv
source .venv/bin/activate        # macOS / Linux
.venv\\Scripts\\activate           # Windows PowerShell

pip install pytest requests
pip freeze > requirements.txt    # snapshot exact versions
pip install -r requirements.txt  # reproduce elsewhere
deactivate

# uv — a much faster modern replacement for pip + venv
# uv venv && uv pip install pytest
# uv run pytest
`,
        },
        {
          type: 'code',
          language: 'python',
          content: `# calculator.py
def divide(a, b):
    if b == 0:
        raise ValueError("cannot divide by zero")
    return a / b

def apply_discount(price, percent):
    if not 0 <= percent <= 100:
        raise ValueError("percent must be 0-100")
    return round(price * (1 - percent / 100), 2)


# test_calculator.py  — pytest finds files named test_*.py
import pytest
from calculator import divide, apply_discount

def test_divide_basic():
    assert divide(10, 2) == 5

def test_divide_by_zero_raises():
    with pytest.raises(ValueError, match="divide by zero"):
        divide(1, 0)

# One test body, many cases
@pytest.mark.parametrize("price,percent,expected", [
    (100, 0,   100.00),
    (100, 25,   75.00),
    (19.99, 10, 17.99),
])
def test_discount(price, percent, expected):
    assert apply_discount(price, percent) == expected
`,
        },
        {
          type: 'code',
          language: 'python',
          content: `# Fixtures build the world your test needs, then tear it down
import pytest, json

@pytest.fixture
def sample_config(tmp_path):
    path = tmp_path / "config.json"
    path.write_text(json.dumps({"debug": True, "retries": 3}))
    return path            # tmp_path is deleted automatically after the test

def test_reads_config(sample_config):
    data = json.loads(sample_config.read_text())
    assert data["retries"] == 3

# Replacing a real dependency with a fake
def get_user(client, user_id):
    return client.fetch(f"/users/{user_id}")

class FakeClient:
    def fetch(self, path):
        return {"path": path, "name": "Alice"}

def test_get_user_uses_correct_path():
    assert get_user(FakeClient(), 7)["path"] == "/users/7"
`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `pytest                    # run everything
pytest -v                 # one line per test
pytest -k discount        # only tests whose name matches "discount"
pytest -x                 # stop at the first failure
pytest --lf               # rerun only last failures
pytest --cov=mypackage    # coverage report (pip install pytest-cov)

# pyproject.toml — the modern project manifest
# [project]
# name = "mypackage"
# version = "0.1.0"
# requires-python = ">=3.11"
# dependencies = ["requests>=2.31"]
#
# [build-system]
# requires = ["hatchling"]
# build-backend = "hatchling.build"

pip install -e .          # install your own project in editable mode
`,
        },
        {
          type: 'tip',
          content: 'Write the test first when fixing a bug: reproduce the failure in a test, watch it fail, then fix the code and watch it pass. You end up with proof the bug is gone and a guard against it returning.',
        },
        {
          type: 'note',
          content: 'Add ruff (linter + formatter) and mypy (type checker) to any serious project. "ruff check --fix ." and "ruff format ." handle style so code review can focus on logic.',
        },
      ],
    },
    {
      slug: 'package-field-guide',
      title: 'Python Package Field Guide',
      intro: 'PyPI is a warehouse with half a million shelves. This field guide tells you which aisle to visit, which packages are worth learning, and what each one unlocks.',
      sections: [
        {
          type: 'text',
          content: 'Start with the standard library: pathlib, json, csv, sqlite3, argparse, logging, subprocess, tkinter, asyncio, and unittest already ship with Python. Add a third-party package when it meaningfully improves ergonomics or provides a capability Python does not include.',
        },
        {
          type: 'code',
          language: 'text',
          content: `WEB & APIs
requests / httpx    Friendly HTTP clients
FastAPI             Typed, async APIs with automatic docs
Flask               Small, flexible web applications
Django              Full-stack sites with ORM, auth, and admin
Beautiful Soup      Parse HTML you are allowed to collect

DATA & SCIENCE
numpy                Fast numerical arrays
pandas / polars      Tables, cleaning, joins, and analytics
matplotlib / seaborn Charts and statistical visualization
scikit-learn         Classical machine learning
Jupyter              Interactive notebooks

AUTOMATION & APPS
rich                 Color, tables, progress bars, tracebacks
typer                Type-hinted command-line applications
click                Mature composable CLI framework
paramiko             SSH and SFTP automation
Pillow               Image reading, conversion, and editing
openpyxl             Read and write Excel .xlsx files

QUALITY & SHIPPING
pytest               Expressive testing
ruff                 Very fast linting and formatting
mypy / pyright       Static type checking
pydantic             Runtime validation from type hints
python-dotenv        Load local environment variables
build / twine        Build and publish packages`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Explore before installing
python -m pip index versions rich
python -m pip show rich

# Install into an active virtual environment
python -m pip install requests rich typer

# Record direct and transitive dependencies
python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt

# See outdated packages; update intentionally, not blindly
python -m pip list --outdated
python -m pip install --upgrade rich`,
        },
        {
          type: 'tip',
          content: 'Evaluate a package by its documentation, release history, supported Python versions, license, issue activity, dependency count, and security record. A famous package with current maintenance is usually safer than a clever package with one release from six years ago.',
        },
        {
          type: 'warning',
          content: 'Package names can be typosquatted. Copy install names from the project\'s official documentation, inspect unfamiliar projects on PyPI, and never paste secrets into code. Keep credentials in environment variables or a proper secret store.',
        },
        {
          type: 'text',
          content: 'Build ideas by difficulty — Beginner: file organizer, duplicate finder, image resizer, Markdown link checker, habit tracker, expense CSV reporter. Intermediate: weather dashboard, REST API client, SQLite inventory app, SFTP backup tool, log analyzer, desktop Pomodoro timer. Advanced: job queue, collaborative API, deployment dashboard, package dependency auditor, or local search engine.',
        },
      ],
    },
    {
      slug: 'subprocess-automation',
      title: 'Subprocess & System Automation',
      intro: 'Python can coordinate the programs already on your computer. subprocess is the safe, modern bridge between Python and command-line tools.',
      sections: [
        {
          type: 'text',
          content: 'Use subprocess.run() for commands that finish. Pass arguments as a list, enable check=True so failures raise an exception, and use capture_output=True with text=True when you need the output as a string.',
        },
        {
          type: 'code',
          language: 'python',
          content: `import subprocess

result = subprocess.run(
    ["python", "--version"],
    capture_output=True,
    text=True,
    check=True,
    timeout=10,
)

# Some programs print version information to stderr.
version = result.stdout.strip() or result.stderr.strip()
print(version)

try:
    subprocess.run(["git", "status", "--short"], check=True, timeout=15)
except subprocess.TimeoutExpired:
    print("The command took too long")
except subprocess.CalledProcessError as error:
    print(f"Command failed with exit code {error.returncode}")
except FileNotFoundError:
    print("The executable is not installed or not on PATH")`,
        },
        {
          type: 'code',
          language: 'python',
          content: `from pathlib import Path
import subprocess

def convert_image(source: Path, destination: Path) -> None:
    """Call ImageMagick without invoking a shell."""
    source = source.resolve(strict=True)
    destination.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["magick", str(source), "-resize", "1600x1600>", str(destination)],
        check=True,
        timeout=60,
    )

# Stream a long-running process one line at a time
process = subprocess.Popen(
    ["ping", "-c", "4", "example.com"],
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    text=True,
)

assert process.stdout is not None
for line in process.stdout:
    print(line, end="")

exit_code = process.wait()
if exit_code != 0:
    raise RuntimeError(f"ping failed: {exit_code}")`,
        },
        {
          type: 'warning',
          content: 'Avoid shell=True, especially with user input. A list such as ["git", "show", revision] passes one exact argument at a time; a shell string can interpret semicolons, redirects, substitutions, and other syntax as new commands. Also set timeouts for tools that could hang.',
        },
        {
          type: 'tip',
          content: 'Projects to try: a Git repository health checker, FFmpeg batch converter, test runner dashboard, backup coordinator, or wrapper that gives a complicated CLI a friendly configuration file.',
        },
      ],
    },
    {
      slug: 'tkinter-desktop-apps',
      title: 'Tkinter Desktop Apps',
      intro: 'Tkinter ships with most Python installations and turns a script into a real window. It is perfect for small utilities, internal tools, and learning event-driven programming.',
      sections: [
        {
          type: 'text',
          content: 'A GUI is event-driven: create widgets, connect callbacks, then enter mainloop(). Use ttk widgets for native-looking controls and grid() for layouts that resize cleanly. Keep one geometry manager per parent widget.',
        },
        {
          type: 'code',
          language: 'python',
          content: `import tkinter as tk
from tkinter import ttk, messagebox

def convert() -> None:
    try:
        celsius = float(temperature.get())
    except ValueError:
        messagebox.showerror("Invalid temperature", "Enter a number.")
        return
    fahrenheit.set(f"{celsius * 9 / 5 + 32:.1f} °F")

root = tk.Tk()
root.title("Temperature Converter")
root.minsize(360, 160)

frame = ttk.Frame(root, padding=20)
frame.grid(sticky="nsew")
root.columnconfigure(0, weight=1)
root.rowconfigure(0, weight=1)
frame.columnconfigure(1, weight=1)

temperature = tk.StringVar()
fahrenheit = tk.StringVar(value="—")

ttk.Label(frame, text="Celsius").grid(row=0, column=0, padx=6, pady=6)
entry = ttk.Entry(frame, textvariable=temperature)
entry.grid(row=0, column=1, sticky="ew", padx=6, pady=6)
ttk.Button(frame, text="Convert", command=convert).grid(row=1, column=0, columnspan=2, pady=8)
ttk.Label(frame, textvariable=fahrenheit, font=("TkDefaultFont", 16)).grid(row=2, column=0, columnspan=2)

entry.focus()
root.bind("<Return>", lambda event: convert())
root.mainloop()`,
        },
        {
          type: 'code',
          language: 'python',
          content: `# Useful dialogs and a scrollable list
from tkinter import filedialog

path = filedialog.askopenfilename(
    title="Open a text file",
    filetypes=[("Text files", "*.txt"), ("All files", "*.*")],
)

tree = ttk.Treeview(root, columns=("size",), show="tree headings")
tree.heading("#0", text="Name")
tree.heading("size", text="Bytes")
tree.insert("", "end", text="notes.txt", values=(2048,))

# Schedule work without freezing the window
def update_clock():
    clock.configure(text=time.strftime("%H:%M:%S"))
    root.after(1000, update_clock)

# For slow network/file work, use a worker thread and send the
# result back with root.after(...). Never update widgets from that thread.`,
        },
        {
          type: 'tip',
          content: 'Great Tkinter builds: Pomodoro timer, Markdown note app, bulk file renamer, image contact-sheet maker, SQLite address book, download queue, budget tracker, or a friendly front end for one of your command-line scripts.',
        },
        {
          type: 'note',
          content: 'On some Linux distributions Tkinter is a separate OS package such as python3-tk. Test availability with: python -m tkinter. PyInstaller can bundle a finished app, but build separately on each target operating system.',
        },
      ],
    },
    {
      slug: 'paramiko-ssh',
      title: 'Paramiko: SSH & SFTP',
      intro: 'Paramiko lets Python securely run commands and transfer files over SSH. Use it for systems you own or are explicitly authorized to administer.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `python -m pip install paramiko

# Prefer an SSH key protected by a passphrase
ssh-keygen -t ed25519 -C "automation"
# Add the public key to the authorized server by an approved method`,
        },
        {
          type: 'code',
          language: 'python',
          content: `from pathlib import Path
import os
import paramiko

host = os.environ["DEPLOY_HOST"]
user = os.environ["DEPLOY_USER"]
key_path = Path.home() / ".ssh" / "id_ed25519"

client = paramiko.SSHClient()
# Load known_hosts and reject unknown or changed host keys.
client.load_system_host_keys()
client.set_missing_host_key_policy(paramiko.RejectPolicy())

try:
    client.connect(
        hostname=host,
        username=user,
        key_filename=str(key_path),
        timeout=10,
        banner_timeout=10,
        auth_timeout=10,
    )
    stdin, stdout, stderr = client.exec_command("uptime", timeout=15)
    exit_code = stdout.channel.recv_exit_status()
    output = stdout.read().decode().strip()
    errors = stderr.read().decode().strip()
    if exit_code != 0:
        raise RuntimeError(errors or f"remote exit code {exit_code}")
    print(output)
finally:
    client.close()`,
        },
        {
          type: 'code',
          language: 'python',
          content: `# SFTP uses the same encrypted SSH connection
with paramiko.SSHClient() as client:
    client.load_system_host_keys()
    client.connect(host, username=user, key_filename=str(key_path))
    with client.open_sftp() as sftp:
        sftp.put("report.csv", "/srv/reports/report.csv")
        sftp.get("/srv/reports/result.json", "result.json")
        for item in sftp.listdir_attr("/srv/reports"):
            print(item.filename, item.st_size)

# For many hosts, put connection logic in a function, collect a result
# object per host, limit concurrency, and log failures without abandoning
# the rest of the fleet.`,
        },
        {
          type: 'warning',
          content: 'Never use AutoAddPolicy in production just to silence host-key errors—it trusts the first key presented and weakens protection against impersonation. Provision known_hosts deliberately. Do not hard-code passwords or private keys, and do not concatenate untrusted text into remote shell commands.',
        },
        {
          type: 'tip',
          content: 'Build an authorized server inventory collector, SFTP backup verifier, disk-space monitor, deployment smoke tester, or multi-host log fetcher. Make dry-run mode, audit logs, timeouts, and per-host error reporting standard features.',
        },
      ],
    },
    {
      slug: 'requests-and-apis',
      title: 'Requests, HTTP & APIs',
      intro: 'Most useful programs eventually talk to another service. Requests makes HTTP readable while still exposing the timeouts, headers, status codes, and sessions that reliable clients need.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `python -m pip install requests`,
        },
        {
          type: 'code',
          language: 'python',
          content: `import requests

url = "https://api.github.com/repos/python/cpython"
headers = {"Accept": "application/vnd.github+json"}

try:
    response = requests.get(url, headers=headers, timeout=(3.05, 15))
    response.raise_for_status()
    repository = response.json()
except requests.Timeout:
    print("The service took too long to respond")
except requests.HTTPError as error:
    print(f"HTTP failure: {error.response.status_code}")
except requests.RequestException as error:
    print(f"Network failure: {error}")
else:
    print(repository["full_name"], repository["stargazers_count"])

# Query parameters are encoded safely for you
requests.get(
    "https://api.example.com/search",
    params={"q": "python tips", "page": 2},
    timeout=10,
)`,
        },
        {
          type: 'code',
          language: 'python',
          content: `import os
import requests

# A Session reuses connections and shared settings
with requests.Session() as session:
    session.headers.update({
        "Authorization": f"Bearer {os.environ['API_TOKEN']}",
        "User-Agent": "inventory-tool/1.0",
    })
    response = session.post(
        "https://api.example.com/items",
        json={"name": "keyboard", "quantity": 3},
        timeout=15,
    )
    response.raise_for_status()
    created = response.json()

# Stream large downloads instead of loading them all into memory
with requests.get(download_url, stream=True, timeout=30) as response:
    response.raise_for_status()
    with open("download.bin", "wb") as output:
        for chunk in response.iter_content(chunk_size=64 * 1024):
            output.write(chunk)`,
        },
        {
          type: 'tip',
          content: 'Always set a timeout; Requests has no default timeout. Handle rate-limit headers, retry only safe operations with backoff, validate response data, and keep API tokens out of source control. Try building a transit checker, GitHub dashboard, currency tracker, or API-to-CSV exporter.',
        },
      ],
    },
    {
      slug: 'pandas-data-tutorial',
      title: 'Pandas: Practical Data Analysis',
      intro: 'Pandas turns rows and columns into programmable objects. It shines when a spreadsheet is too repetitive but a database would be overkill.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `python -m pip install pandas matplotlib openpyxl`,
        },
        {
          type: 'code',
          language: 'python',
          content: `import pandas as pd

sales = pd.read_csv(
    "sales.csv",
    parse_dates=["date"],
    dtype={"region": "category"},
)

print(sales.head())
print(sales.info())
print(sales.describe(numeric_only=True))
print(sales.isna().sum())

# Clean deliberately: inspect missing values before choosing a policy.
sales["quantity"] = sales["quantity"].fillna(0).astype("int64")
sales = sales.dropna(subset=["price"])
sales["revenue"] = sales["quantity"] * sales["price"]
sales["month"] = sales["date"].dt.to_period("M")

summary = (
    sales.groupby(["month", "region"], observed=True)
    .agg(revenue=("revenue", "sum"), orders=("order_id", "nunique"))
    .reset_index()
    .sort_values("revenue", ascending=False)
)

summary.to_csv("monthly-sales.csv", index=False)
summary.to_excel("monthly-sales.xlsx", index=False)`,
        },
        {
          type: 'code',
          language: 'python',
          content: `# Join two datasets using a shared key
customers = pd.read_csv("customers.csv")
enriched = sales.merge(
    customers[["customer_id", "segment"]],
    on="customer_id",
    how="left",
    validate="many_to_one",
)

# Vectorized operations beat row-by-row Python loops
enriched["large_order"] = enriched["revenue"].gt(500)

# Plot and save a chart
monthly = sales.set_index("date").resample("ME")["revenue"].sum()
axis = monthly.plot(title="Monthly Revenue", ylabel="Revenue")
axis.figure.tight_layout()
axis.figure.savefig("revenue.png", dpi=150)`,
        },
        {
          type: 'tip',
          content: 'Use notebooks for exploration, then move repeatable cleaning into functions and scripts. Build a bank-statement categorizer, survey analyzer, sports dashboard, gradebook reporter, or data-quality checker. For data too large for memory, investigate Polars, DuckDB, or a database.',
        },
      ],
    },
    {
      slug: 'rich-typer-cli',
      title: 'Build Polished CLIs with Typer & Rich',
      intro: 'A good command-line app has help text, validation, readable errors, and useful output. Typer and Rich supply those details without burying your actual program.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `python -m pip install "typer>=0.12" rich`,
        },
        {
          type: 'code',
          language: 'python',
          content: `from pathlib import Path
from typing import Annotated
import typer
from rich.console import Console
from rich.table import Table

app = typer.Typer(help="Inspect text files.", no_args_is_help=True)
console = Console()

@app.command()
def stats(
    path: Annotated[Path, typer.Argument(exists=True, dir_okay=False)],
    words: Annotated[bool, typer.Option("--words/--no-words")] = True,
) -> None:
    """Show line, word, and character counts."""
    text = path.read_text(encoding="utf-8")
    table = Table(title=path.name)
    table.add_column("Metric")
    table.add_column("Count", justify="right")
    table.add_row("Lines", str(len(text.splitlines())))
    if words:
        table.add_row("Words", str(len(text.split())))
    table.add_row("Characters", str(len(text)))
    console.print(table)

if __name__ == "__main__":
    app()`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `python texttool.py --help
python texttool.py stats README.md

# Add a console entry point in pyproject.toml:
# [project.scripts]
# texttool = "texttool:app"

# Then install your project and run it anywhere:
python -m pip install -e .
texttool stats README.md`,
        },
        {
          type: 'text',
          content: 'Rich also provides progress bars, syntax highlighting, Markdown rendering, logging handlers, prompts, trees, and improved tracebacks. Keep a plain or JSON output mode for scripts and CI; beautiful terminal output should not make automation brittle.',
        },
        {
          type: 'tip',
          content: 'Build a project scaffolder, disk-usage explorer, changelog generator, bookmark manager, secret scanner, batch image tool, or a client for your favorite web API. Add --dry-run before any command that changes or deletes data.',
        },
      ],
    },
    {
      slug: 'fastapi-pydantic',
      title: 'FastAPI & Pydantic: Build an API',
      intro: 'FastAPI combines type hints, validation, async support, and automatic documentation. Pydantic turns untrusted JSON into validated Python objects.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `python -m pip install "fastapi[standard]"
fastapi dev main.py
# Open http://127.0.0.1:8000/docs for interactive API documentation`,
        },
        {
          type: 'code',
          language: 'python',
          content: `# main.py
from typing import Annotated
from fastapi import FastAPI, HTTPException, Query, status
from pydantic import BaseModel, Field

app = FastAPI(title="Book API")

class BookCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    author: str = Field(min_length=1, max_length=120)
    pages: int = Field(gt=0, le=20_000)

class Book(BookCreate):
    id: int

books: dict[int, Book] = {}

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

@app.get("/books", response_model=list[Book])
def list_books(
    search: Annotated[str | None, Query(max_length=100)] = None,
) -> list[Book]:
    results = list(books.values())
    if search:
        needle = search.casefold()
        results = [book for book in results if needle in book.title.casefold()]
    return results

@app.post("/books", response_model=Book, status_code=status.HTTP_201_CREATED)
def create_book(payload: BookCreate) -> Book:
    book = Book(id=len(books) + 1, **payload.model_dump())
    books[book.id] = book
    return book`,
        },
        {
          type: 'code',
          language: 'python',
          content: `@app.get("/books/{book_id}", response_model=Book)
def get_book(book_id: int) -> Book:
    if book_id not in books:
        raise HTTPException(status_code=404, detail="Book not found")
    return books[book_id]

@app.delete("/books/{book_id}", status_code=204)
def delete_book(book_id: int) -> None:
    if books.pop(book_id, None) is None:
        raise HTTPException(status_code=404, detail="Book not found")

# test_main.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_and_read_book():
    created = client.post("/books", json={
        "title": "The Left Hand of Darkness",
        "author": "Ursula K. Le Guin",
        "pages": 304,
    })
    assert created.status_code == 201
    book_id = created.json()["id"]
    assert client.get(f"/books/{book_id}").json()["pages"] == 304`,
        },
        {
          type: 'tip',
          content: 'Replace the in-memory dictionary with a database before production. Add authentication, CORS rules, structured logging, migrations, rate limits, and tests deliberately. Build a recipe API, reading tracker, webhook receiver, URL shortener, or backend for your Tkinter app.',
        },
        {
          type: 'warning',
          content: 'Validation is not authorization. A valid request can still come from the wrong user. Never put secrets in URLs, return internal tracebacks, or trust a user-supplied file path or database filter without enforcing access rules.',
        },
      ],
    },
    {
      slug: 'sqlalchemy-databases',
      title: 'SQLAlchemy: Python & Databases',
      intro: 'SQLAlchemy maps Python objects to relational data while still letting you use the power of SQL. Start with SQLite locally; move to PostgreSQL when deployment needs it.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `python -m pip install sqlalchemy
# For PostgreSQL later: python -m pip install "psycopg[binary]"`,
        },
        {
          type: 'code',
          language: 'python',
          content: `from datetime import datetime
from sqlalchemy import DateTime, String, create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column

class Base(DeclarativeBase):
    pass

class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200))
    done: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)

engine = create_engine("sqlite:///tasks.db", echo=False)
Base.metadata.create_all(engine)

with Session(engine) as session:
    session.add_all([Task(title="Learn SQLAlchemy"), Task(title="Build an app")])
    session.commit()

with Session(engine) as session:
    statement = select(Task).where(Task.done.is_(False)).order_by(Task.created_at)
    for task in session.scalars(statement):
        print(task.id, task.title)`,
        },
        {
          type: 'code',
          language: 'python',
          content: `def complete_task(task_id: int) -> bool:
    with Session(engine) as session:
        task = session.get(Task, task_id)
        if task is None:
            return False
        task.done = True
        session.commit()
        return True

def delete_completed() -> int:
    with Session(engine) as session:
        completed = list(session.scalars(select(Task).where(Task.done.is_(True))))
        for task in completed:
            session.delete(task)
        session.commit()
        return len(completed)`,
        },
        {
          type: 'tip',
          content: 'Use Alembic for schema migrations once your model changes after release. Keep sessions short, commit explicit, index columns you filter frequently, and inspect generated SQL when performance matters. Build an inventory system, journal, bookmark manager, or job tracker.',
        },
        {
          type: 'warning',
          content: 'Do not build SQL by concatenating user input. SQLAlchemy expressions bind values safely. Keep database URLs in environment variables, use least-privilege database accounts, and back up data before migrations.',
        },
      ],
    },
    {
      slug: 'pillow-images',
      title: 'Pillow: Image Automation',
      intro: 'Pillow is the practical toolkit for resizing, cropping, converting, compositing, and inspecting images. One careful script can replace hours of repetitive editing.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `python -m pip install pillow`,
        },
        {
          type: 'code',
          language: 'python',
          content: `from pathlib import Path
from PIL import Image, ImageOps

source_dir = Path("originals")
output_dir = Path("thumbnails")
output_dir.mkdir(exist_ok=True)

for path in source_dir.glob("*.*"):
    try:
        with Image.open(path) as image:
            # Correct phone-camera orientation using EXIF metadata.
            image = ImageOps.exif_transpose(image)
            image.thumbnail((800, 800), Image.Resampling.LANCZOS)
            if image.mode not in ("RGB", "L"):
                image = image.convert("RGB")
            destination = output_dir / f"{path.stem}.jpg"
            image.save(destination, quality=85, optimize=True)
            print(f"Wrote {destination}")
    except (OSError, ValueError) as error:
        print(f"Skipped {path}: {error}")`,
        },
        {
          type: 'code',
          language: 'python',
          content: `from PIL import Image, ImageDraw, ImageFont

with Image.open("photo.jpg").convert("RGBA") as photo:
    overlay = Image.new("RGBA", photo.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    font = ImageFont.truetype("DejaVuSans.ttf", 36)
    text = "© Example Studio"
    box = draw.textbbox((0, 0), text, font=font)
    width = box[2] - box[0]
    x, y = photo.width - width - 24, photo.height - 60
    draw.rounded_rectangle((x - 12, y - 8, photo.width - 12, photo.height - 10), fill=(0, 0, 0, 130), radius=8)
    draw.text((x, y), text, font=font, fill="white")
    Image.alpha_composite(photo, overlay).convert("RGB").save("watermarked.jpg", quality=90)`,
        },
        {
          type: 'tip',
          content: 'Build a thumbnail pipeline, avatar cropper, contact sheet, meme generator, receipt preprocessor, wallpaper maker, or duplicate-image finder. Preserve originals, write to a separate directory, and test color modes and transparency.',
        },
        {
          type: 'warning',
          content: 'Images are untrusted input too. Keep Pillow current, limit upload sizes and pixel dimensions, catch decompression-bomb warnings, and never overwrite originals until the output has been verified.',
        },
      ],
    },
    {
      slug: 'openpyxl-excel',
      title: 'OpenPyXL: Automate Excel',
      intro: 'OpenPyXL reads and writes modern Excel workbooks. It is ideal for reports that people need to open, filter, print, and pass around.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `python -m pip install openpyxl`,
        },
        {
          type: 'code',
          language: 'python',
          content: `from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill
from openpyxl.utils import get_column_letter

rows = [
    ("Product", "Units", "Unit Price"),
    ("Keyboard", 12, 79.99),
    ("Mouse", 25, 29.50),
    ("Monitor", 7, 249.00),
]

workbook = Workbook()
sheet = workbook.active
sheet.title = "Sales"

for row in rows:
    sheet.append(row)

sheet["D1"] = "Revenue"
for row_number in range(2, sheet.max_row + 1):
    sheet.cell(row=row_number, column=4, value=f"=B{row_number}*C{row_number}")
    sheet.cell(row=row_number, column=3).number_format = '$#,##0.00'
    sheet.cell(row=row_number, column=4).number_format = '$#,##0.00'

for cell in sheet[1]:
    cell.font = Font(bold=True, color="FFFFFF")
    cell.fill = PatternFill("solid", fgColor="2563EB")

sheet.freeze_panes = "A2"
sheet.auto_filter.ref = sheet.dimensions
for column, width in enumerate((22, 12, 14, 14), start=1):
    sheet.column_dimensions[get_column_letter(column)].width = width

workbook.save("sales-report.xlsx")`,
        },
        {
          type: 'code',
          language: 'python',
          content: `from openpyxl import load_workbook

# data_only=True reads cached formula results, not formula text.
workbook = load_workbook("sales-report.xlsx", data_only=False)
sheet = workbook["Sales"]

for product, units, price, formula in sheet.iter_rows(min_row=2, values_only=True):
    print(product, units, price, formula)

# For very large workbooks:
# load_workbook("huge.xlsx", read_only=True)
# Workbook(write_only=True)`,
        },
        {
          type: 'tip',
          content: 'Build an invoice generator, attendance report, gradebook exporter, inventory template, timesheet checker, or monthly KPI workbook. Use pandas when the main job is analysis; use OpenPyXL when workbook formatting and Excel features are the product.',
        },
        {
          type: 'warning',
          content: 'OpenPyXL does not calculate formulas; Excel or another spreadsheet engine does. Also guard against formula injection when exporting untrusted text: values beginning with =, +, -, or @ may be interpreted as formulas by spreadsheet software.',
        },
      ],
    },
  ],
}
