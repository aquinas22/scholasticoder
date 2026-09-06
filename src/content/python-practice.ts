import type { Section } from './types'

/**
 * Hands-on practice appended to each core Python lesson: graded exercises that run in the browser
 * and quick-check quizzes. Keyed by lesson slug; merged into the lesson at load time (see index.ts).
 *
 * Inside a test's `check`, the learner's globals are available directly, `_out` holds everything
 * the program printed, and `_src` holds their source code.
 */
export const pythonPractice: Record<string, Section[]> = {
  'hello-world': [
    {
      type: 'exercise',
      content: 'Your turn. Change the program so it prints exactly Hello, ScholastiCoder! on one line, then on a second line print the number 42 without quotes.',
      exercise: {
        title: 'Say hello, then count',
        starter: `print("Hello, World!")\n`,
        solution: `print("Hello, ScholastiCoder!")\nprint(42)\n`,
        hints: ['print() can be called as many times as you like — each call ends with a newline.', 'Numbers do not need quotes: print(42) prints the integer 42.'],
        tests: [
          { name: 'First line greets ScholastiCoder', check: `assert _out.splitlines()[0] == "Hello, ScholastiCoder!", f"first line was {_out.splitlines()[0]!r}"` },
          { name: 'Second line is 42', check: `lines = _out.splitlines()\nassert len(lines) >= 2, "expected two lines of output"\nassert lines[1].strip() == "42", f"second line was {lines[1]!r}"` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Use the sep argument to print a date from three separate numbers so the output reads 2026-09-05. Then use end to print Loading and done! on the same line, joined by three dots.',
      exercise: {
        title: 'Separators and endings',
        starter: `year = 2026\nmonth = "09"\nday = "05"\n\n# 1. Print year-month-day using sep\n\n# 2. Print "Loading...done!" using two print() calls and end=\n`,
        solution: `year = 2026\nmonth = "09"\nday = "05"\n\nprint(year, month, day, sep="-")\nprint("Loading", end="...")\nprint("done!")\n`,
        hints: ['print(a, b, c, sep="-") joins the values with a dash instead of a space.', 'print("Loading", end="...") replaces the newline at the end with three dots.'],
        tests: [
          { name: 'Prints 2026-09-05', check: `assert "2026-09-05" in _out, "did not find 2026-09-05 in the output"` },
          { name: 'Prints Loading...done! on one line', check: `assert "Loading...done!" in _out, "expected Loading...done! on a single line"` },
          { name: 'Uses the sep keyword', check: `assert "sep=" in _src, "use the sep= argument rather than building the string by hand"` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What does print("a", "b", "c") output?',
      quiz: {
        choices: [
          { text: 'a b c', correct: true, explanation: 'Multiple arguments are joined with a single space by default. Change it with sep=.' },
          { text: 'abc', explanation: 'That would need sep="". The default separator is a space.' },
          { text: 'a, b, c', explanation: 'The commas separate arguments in the call; they are not printed.' },
          { text: '("a", "b", "c")', explanation: 'print() receives three separate strings, not a tuple, so no parentheses appear.' },
        ],
      },
    },
  ],

  'variables': [
    {
      type: 'exercise',
      content: 'The variable age_text holds a number typed by a user, so it is a string. Convert it to an integer, add one, store the result in next_year, and print Next year you will be 18.',
      exercise: {
        title: 'From text to number',
        starter: `age_text = "17"\n\n# Convert, add one, and print the sentence\n`,
        solution: `age_text = "17"\nage = int(age_text)\nnext_year = age + 1\nprint(f"Next year you will be {next_year}")\n`,
        hints: ['int("17") turns the string into the integer 17.', 'An f-string lets you drop a variable into text: f"... {next_year}".'],
        tests: [
          { name: 'next_year equals 18', check: `assert 'next_year' in globals(), "create a variable called next_year"\nassert next_year == 18, f"next_year is {next_year!r}"` },
          { name: 'next_year is an int, not a string', check: `assert isinstance(next_year, int), f"next_year is a {type(next_year).__name__}; convert with int()"` },
          { name: 'Prints the sentence', check: `assert "Next year you will be 18" in _out` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Swap the values of a and b using Python\'s tuple-unpacking trick — no third variable allowed. Then build the string summary with an f-string so it reads a=2, b=1.',
      exercise: {
        title: 'The swap',
        starter: `a = 1\nb = 2\n\n# swap them here\n\nsummary = ""  # build this with an f-string\nprint(summary)\n`,
        solution: `a = 1\nb = 2\n\na, b = b, a\n\nsummary = f"a={a}, b={b}"\nprint(summary)\n`,
        hints: ['Python evaluates the right-hand side first: a, b = b, a', 'f"a={a}, b={b}" produces the exact text.'],
        tests: [
          { name: 'a is 2 and b is 1', check: `assert (a, b) == (2, 1), f"a={a!r}, b={b!r}"` },
          { name: 'No temporary variable', check: `assert "temp" not in _src.lower() and "tmp" not in _src.lower(), "swap without a temporary variable: a, b = b, a"` },
          { name: 'summary reads a=2, b=1', check: `assert summary == "a=2, b=1", f"summary was {summary!r}"` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What is type(7 / 2) in Python 3?',
      quiz: {
        choices: [
          { text: 'float', correct: true, explanation: 'The / operator always produces a float (3.5). Use // for integer division.' },
          { text: 'int', explanation: '7 / 2 is 3.5. Integer division is written 7 // 2, which gives 3.' },
          { text: 'It raises an error', explanation: 'Dividing two ints is perfectly legal; the result is simply a float.' },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'Which of these is the conventional Python name for a variable holding a user\'s email address?',
      quiz: {
        choices: [
          { text: 'user_email', correct: true, explanation: 'Python style (PEP 8) uses snake_case for variables and functions.' },
          { text: 'userEmail', explanation: 'camelCase is common in JavaScript and Java, but Python style prefers snake_case.' },
          { text: 'UserEmail', explanation: 'CapWords is reserved for class names in Python.' },
          { text: 'USER_EMAIL', explanation: 'UPPER_SNAKE_CASE signals a constant that should not change.' },
        ],
      },
    },
  ],

  'control-flow': [
    {
      type: 'exercise',
      content: 'The classic. For each number from 1 to 20, print Fizz if it is divisible by 3, Buzz if divisible by 5, FizzBuzz if divisible by both, and the number itself otherwise — one item per line.',
      exercise: {
        title: 'FizzBuzz',
        starter: `for n in range(1, 21):\n    # your logic here\n    print(n)\n`,
        solution: `for n in range(1, 21):\n    if n % 15 == 0:\n        print("FizzBuzz")\n    elif n % 3 == 0:\n        print("Fizz")\n    elif n % 5 == 0:\n        print("Buzz")\n    else:\n        print(n)\n`,
        hints: ['n % 3 == 0 is True when n is divisible by 3.', 'Check the "both" case first — if you test 3 before 15, the number 15 will print Fizz.'],
        tests: [
          { name: 'Prints 20 lines', check: `lines = _out.strip().splitlines()\nassert len(lines) == 20, f"expected 20 lines, got {len(lines)}"` },
          { name: 'Numbers, Fizz, Buzz in the right places', check: `expected = ["FizzBuzz" if i % 15 == 0 else "Fizz" if i % 3 == 0 else "Buzz" if i % 5 == 0 else str(i) for i in range(1, 21)]\nlines = _out.strip().splitlines()\nfor i, (got, want) in enumerate(zip(lines, expected), 1):\n    assert got.strip() == want, f"line {i}: expected {want!r}, got {got!r}"` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Using a while loop (not for), add up every even number from 1 to 100 inclusive and store the result in total. Print it at the end.',
      exercise: {
        title: 'Sum the evens with while',
        starter: `total = 0\nn = 1\n\n# loop while n <= 100\n\nprint(total)\n`,
        solution: `total = 0\nn = 1\n\nwhile n <= 100:\n    if n % 2 == 0:\n        total += n\n    n += 1\n\nprint(total)\n`,
        hints: ['Remember to increase n inside the loop, or it never ends. Use the Stop button if that happens.', 'Even numbers satisfy n % 2 == 0.'],
        tests: [
          { name: 'total is 2550', check: `assert total == 2550, f"total is {total}"` },
          { name: 'Uses a while loop', check: `assert "while" in _src, "this one is about while loops"` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Convert each score in the list to a letter grade and print the letters one per line: 90 and above is A, 80–89 is B, 70–79 is C, 60–69 is D, anything lower is F.',
      exercise: {
        title: 'Letter grades',
        starter: `scores = [95, 82, 71, 64, 50]\n\nfor score in scores:\n    # decide the letter, then print it\n    pass\n`,
        solution: `scores = [95, 82, 71, 64, 50]\n\nfor score in scores:\n    if score >= 90:\n        letter = "A"\n    elif score >= 80:\n        letter = "B"\n    elif score >= 70:\n        letter = "C"\n    elif score >= 60:\n        letter = "D"\n    else:\n        letter = "F"\n    print(letter)\n`,
        hints: ['Test the highest threshold first with if, then work downwards with elif.', 'The final else catches everything below 60.'],
        tests: [
          { name: 'Prints A B C D F', check: `assert _out.split() == ["A", "B", "C", "D", "F"], f"got {_out.split()}"` },
          { name: 'Uses elif', check: `assert "elif" in _src, "chain the conditions with elif"` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What does list(range(1, 5)) evaluate to?',
      quiz: {
        choices: [
          { text: '[1, 2, 3, 4]', correct: true, explanation: 'range stops before the end value. range(1, 5) yields 1, 2, 3, 4.' },
          { text: '[1, 2, 3, 4, 5]', explanation: 'The stop value is excluded — the same half-open convention as slicing.' },
          { text: '[0, 1, 2, 3, 4]', explanation: 'That is range(5). Here the start is explicitly 1.' },
        ],
      },
    },
  ],

  'functions': [
    {
      type: 'exercise',
      content: 'Write is_palindrome(text) that returns True when the text reads the same forwards and backwards, ignoring case and spaces. "Never odd or even" should count.',
      exercise: {
        title: 'Palindrome checker',
        starter: `def is_palindrome(text):\n    # normalise, then compare with the reversed string\n    ...\n\n\nprint(is_palindrome("racecar"))\nprint(is_palindrome("Never odd or even"))\nprint(is_palindrome("python"))\n`,
        solution: `def is_palindrome(text):\n    cleaned = text.replace(" ", "").lower()\n    return cleaned == cleaned[::-1]\n\n\nprint(is_palindrome("racecar"))\nprint(is_palindrome("Never odd or even"))\nprint(is_palindrome("python"))\n`,
        hints: ['text.lower() handles case; text.replace(" ", "") drops spaces.', 'A string reversed is s[::-1].'],
        tests: [
          { name: 'racecar is a palindrome', check: `assert is_palindrome("racecar") is True` },
          { name: 'Ignores case and spaces', check: `assert is_palindrome("Never odd or even") is True\nassert is_palindrome("Was it a car or a cat I saw") is True` },
          { name: 'Rejects non-palindromes', check: `assert is_palindrome("python") is False\nassert is_palindrome("ab") is False` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Write average(*numbers) that accepts any number of arguments and returns their mean. With no arguments it should return 0 rather than crashing.',
      exercise: {
        title: 'Variadic average',
        starter: `def average(*numbers):\n    ...\n\n\nprint(average(2, 4, 6))\nprint(average())\n`,
        solution: `def average(*numbers):\n    if not numbers:\n        return 0\n    return sum(numbers) / len(numbers)\n\n\nprint(average(2, 4, 6))\nprint(average())\n`,
        hints: ['Inside the function, numbers is a tuple of everything that was passed.', 'An empty tuple is falsy: if not numbers: return 0'],
        tests: [
          { name: 'average(2, 4, 6) is 4', check: `assert average(2, 4, 6) == 4` },
          { name: 'Handles a single value', check: `assert average(10) == 10` },
          { name: 'No arguments returns 0', check: `assert average() == 0` },
          { name: 'Uses *args', check: `assert "*numbers" in _src or "*args" in _src` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Write greet(name, greeting="Hello") that returns a string like Hello, Ada! — and make it possible to change the greeting with a keyword argument.',
      exercise: {
        title: 'Default and keyword arguments',
        starter: `def greet(name):\n    return "Hello, " + name\n\n\nprint(greet("Ada"))\nprint(greet("Grace", greeting="Good morning"))\n`,
        solution: `def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\n\nprint(greet("Ada"))\nprint(greet("Grace", greeting="Good morning"))\n`,
        hints: ['Parameters with defaults go after required ones: def greet(name, greeting="Hello")', 'Remember the exclamation mark at the end.'],
        tests: [
          { name: 'Default greeting', check: `assert greet("Ada") == "Hello, Ada!", repr(greet("Ada"))` },
          { name: 'Custom greeting via keyword', check: `assert greet("Grace", greeting="Good morning") == "Good morning, Grace!"` },
          { name: 'Custom greeting positionally', check: `assert greet("Linus", "Hi") == "Hi, Linus!"` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What does this function return when called as add_item("apple") twice in a row?',
      quiz: {
        code: `def add_item(item, basket=[]):\n    basket.append(item)\n    return basket`,
        choices: [
          { text: '["apple", "apple"] on the second call', correct: true, explanation: 'Default values are evaluated once, when the function is defined. The same list is reused on every call — a famous Python gotcha. Use basket=None and create the list inside.' },
          { text: '["apple"] both times', explanation: 'That is what most people expect, but the default list is created only once and shared between calls.' },
          { text: 'It raises a TypeError', explanation: 'Mutable defaults are allowed; they just behave surprisingly.' },
        ],
      },
    },
  ],

  'data-structures': [
    {
      type: 'exercise',
      content: 'Count how many times each word appears in the text and store the result in a dictionary called counts. Treat words case-insensitively.',
      exercise: {
        title: 'Word frequencies',
        starter: `text = "the quick brown fox jumps over the lazy dog The DOG sleeps"\n\ncounts = {}\n# split the text, then count\n\nprint(counts)\n`,
        solution: `text = "the quick brown fox jumps over the lazy dog The DOG sleeps"\n\ncounts = {}\nfor word in text.lower().split():\n    counts[word] = counts.get(word, 0) + 1\n\nprint(counts)\n`,
        hints: ['text.lower().split() gives a list of lowercase words.', 'counts.get(word, 0) returns 0 if the word is not in the dict yet.'],
        tests: [
          { name: 'counts "the" three times', check: `assert counts.get("the") == 3, f'counts["the"] is {counts.get("the")}'` },
          { name: 'counts "dog" twice (case-insensitive)', check: `assert counts.get("dog") == 2, f'counts["dog"] is {counts.get("dog")}'` },
          { name: 'Every other word appears once', check: `for w in ["quick", "brown", "fox", "jumps", "over", "lazy", "sleeps"]:\n    assert counts.get(w) == 1, f"{w}: {counts.get(w)}"` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Write unique_sorted(items) that returns a new list containing each value once, in ascending order. A set does the de-duplication for you.',
      exercise: {
        title: 'Unique and sorted',
        starter: `def unique_sorted(items):\n    ...\n\n\nprint(unique_sorted([3, 1, 3, 2, 1, 5]))\n`,
        solution: `def unique_sorted(items):\n    return sorted(set(items))\n\n\nprint(unique_sorted([3, 1, 3, 2, 1, 5]))\n`,
        hints: ['set(items) removes duplicates but has no order.', 'sorted() accepts any iterable and returns a list.'],
        tests: [
          { name: 'Removes duplicates and sorts', check: `assert unique_sorted([3, 1, 3, 2, 1, 5]) == [1, 2, 3, 5]` },
          { name: 'Returns a list', check: `assert isinstance(unique_sorted([2, 2]), list)` },
          { name: 'Works on strings', check: `assert unique_sorted("banana") == ["a", "b", "n"]` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Manage an inventory dictionary: add 5 more apples, remove the pears entirely, add a new item "kiwi" with 12, then compute total_items as the sum of all quantities.',
      exercise: {
        title: 'Inventory update',
        starter: `inventory = {"apple": 10, "pear": 4, "banana": 7}\n\n# 1. add 5 apples\n# 2. remove pears\n# 3. add 12 kiwis\n# 4. total_items = sum of quantities\n\nprint(inventory, total_items)\n`,
        solution: `inventory = {"apple": 10, "pear": 4, "banana": 7}\n\ninventory["apple"] += 5\ndel inventory["pear"]\ninventory["kiwi"] = 12\ntotal_items = sum(inventory.values())\n\nprint(inventory, total_items)\n`,
        hints: ['inventory["apple"] += 5 updates an existing entry.', 'del inventory["pear"] or inventory.pop("pear") removes a key.', 'inventory.values() gives just the quantities — sum() adds them.'],
        tests: [
          { name: '15 apples', check: `assert inventory.get("apple") == 15` },
          { name: 'No pears', check: `assert "pear" not in inventory` },
          { name: '12 kiwis', check: `assert inventory.get("kiwi") == 12` },
          { name: 'total_items is 34', check: `assert total_items == 34, f"total_items is {total_items}"` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'Which statement about tuples is true?',
      quiz: {
        choices: [
          { text: 'They cannot be changed after creation', correct: true, explanation: 'Tuples are immutable. That makes them safe as dictionary keys and a good fit for fixed records like coordinates.' },
          { text: 'They can only hold numbers', explanation: 'Tuples can hold any mix of types, just like lists.' },
          { text: 'They are always faster to search than lists', explanation: 'Searching a tuple is a linear scan, exactly like a list. Sets and dicts are the fast lookup structures.' },
        ],
      },
    },
  ],

  'modules': [
    {
      type: 'exercise',
      content: 'Import the math module and write hypotenuse(a, b) that returns the length of the long side of a right triangle. math.sqrt or math.hypot both work.',
      exercise: {
        title: 'Borrow from the standard library',
        starter: `# import what you need\n\ndef hypotenuse(a, b):\n    ...\n\n\nprint(hypotenuse(3, 4))\n`,
        solution: `import math\n\ndef hypotenuse(a, b):\n    return math.sqrt(a ** 2 + b ** 2)\n\n\nprint(hypotenuse(3, 4))\n`,
        hints: ['import math at the top, then call math.sqrt(...).', 'a ** 2 squares a number.'],
        tests: [
          { name: 'hypotenuse(3, 4) is 5', check: `import math\nassert math.isclose(hypotenuse(3, 4), 5.0)` },
          { name: 'hypotenuse(5, 12) is 13', check: `import math\nassert math.isclose(hypotenuse(5, 12), 13.0)` },
          { name: 'Uses the math module', check: `assert "import math" in _src or "from math import" in _src` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Use the datetime module to write days_between(start, end) that takes two ISO date strings such as "2026-01-01" and returns the number of days from the first to the second.',
      exercise: {
        title: 'Counting days',
        starter: `from datetime import date\n\ndef days_between(start, end):\n    # date.fromisoformat(...) turns a string into a date\n    ...\n\n\nprint(days_between("2026-01-01", "2026-12-25"))\n`,
        solution: `from datetime import date\n\ndef days_between(start, end):\n    return (date.fromisoformat(end) - date.fromisoformat(start)).days\n\n\nprint(days_between("2026-01-01", "2026-12-25"))\n`,
        hints: ['Subtracting two date objects gives a timedelta.', 'A timedelta has a .days attribute.'],
        tests: [
          { name: 'New Year to Christmas 2026 is 358 days', check: `assert days_between("2026-01-01", "2026-12-25") == 358` },
          { name: 'Same day is 0', check: `assert days_between("2026-03-03", "2026-03-03") == 0` },
          { name: 'Handles leap years', check: `assert days_between("2028-02-01", "2028-03-01") == 29` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'Why do Python scripts often end with if __name__ == "__main__": main()?',
      quiz: {
        choices: [
          { text: 'So main() runs when the file is executed directly, but not when it is imported', correct: true, explanation: '__name__ is "__main__" only for the file Python was told to run. Imported modules see their own module name instead.' },
          { text: 'It is required for Python to find the entry point', explanation: 'Python runs a file top to bottom; there is no required entry point. The guard is a convention.' },
          { text: 'It makes the script faster', explanation: 'It has no effect on speed — it only controls whether the code inside runs.' },
        ],
      },
    },
  ],

  'error-handling': [
    {
      type: 'exercise',
      content: 'Write safe_divide(a, b) that returns a / b, but returns None instead of crashing when b is zero.',
      exercise: {
        title: 'Catch the crash',
        starter: `def safe_divide(a, b):\n    return a / b\n\n\nprint(safe_divide(10, 2))\nprint(safe_divide(1, 0))\n`,
        solution: `def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\n\n\nprint(safe_divide(10, 2))\nprint(safe_divide(1, 0))\n`,
        hints: ['Wrap the division in try: ... except ZeroDivisionError: ...', 'Catch the specific exception, not a bare except.'],
        tests: [
          { name: 'Normal division works', check: `assert safe_divide(10, 2) == 5` },
          { name: 'Division by zero returns None', check: `assert safe_divide(1, 0) is None` },
          { name: 'Catches ZeroDivisionError specifically', check: `assert "ZeroDivisionError" in _src, "catch ZeroDivisionError by name"` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Write to_ints(strings) that converts a list of strings to integers, silently skipping any that are not valid numbers. ["1", "x", "3"] should give [1, 3].',
      exercise: {
        title: 'Skip the bad ones',
        starter: `def to_ints(strings):\n    result = []\n    for s in strings:\n        result.append(int(s))\n    return result\n\n\nprint(to_ints(["1", "x", "3", "4.5", "10"]))\n`,
        solution: `def to_ints(strings):\n    result = []\n    for s in strings:\n        try:\n            result.append(int(s))\n        except ValueError:\n            continue\n    return result\n\n\nprint(to_ints(["1", "x", "3", "4.5", "10"]))\n`,
        hints: ['int("x") raises ValueError.', 'Put only the int() call inside the try so other bugs are not hidden.'],
        tests: [
          { name: 'Skips invalid strings', check: `assert to_ints(["1", "x", "3", "4.5", "10"]) == [1, 3, 10]` },
          { name: 'All valid', check: `assert to_ints(["7", "8"]) == [7, 8]` },
          { name: 'Catches ValueError', check: `assert "ValueError" in _src` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Define a custom exception InsufficientFunds and a function withdraw(balance, amount) that returns the new balance, or raises InsufficientFunds with a helpful message when the amount exceeds the balance.',
      exercise: {
        title: 'Raise your own exception',
        starter: `class InsufficientFunds(Exception):\n    pass\n\n\ndef withdraw(balance, amount):\n    ...\n\n\nprint(withdraw(100, 30))\ntry:\n    withdraw(100, 500)\nexcept InsufficientFunds as e:\n    print("Refused:", e)\n`,
        solution: `class InsufficientFunds(Exception):\n    pass\n\n\ndef withdraw(balance, amount):\n    if amount > balance:\n        raise InsufficientFunds(f"cannot withdraw {amount}, balance is {balance}")\n    return balance - amount\n\n\nprint(withdraw(100, 30))\ntry:\n    withdraw(100, 500)\nexcept InsufficientFunds as e:\n    print("Refused:", e)\n`,
        hints: ['raise InsufficientFunds("message") creates and throws the exception.', 'Check the condition before subtracting.'],
        tests: [
          { name: 'Returns the new balance', check: `assert withdraw(100, 30) == 70` },
          { name: 'Raises InsufficientFunds when overdrawn', check: `try:\n    withdraw(100, 500)\nexcept InsufficientFunds:\n    pass\nelse:\n    raise AssertionError("withdraw(100, 500) should raise InsufficientFunds")` },
          { name: 'InsufficientFunds is an Exception subclass', check: `assert issubclass(InsufficientFunds, Exception)` },
          { name: 'Exact balance is allowed', check: `assert withdraw(50, 50) == 0` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'When does the finally block run?',
      quiz: {
        choices: [
          { text: 'Always — whether or not an exception occurred', correct: true, explanation: 'finally is for cleanup that must happen no matter what: closing files, releasing locks, and so on.' },
          { text: 'Only when no exception was raised', explanation: 'That describes the else block of a try statement.' },
          { text: 'Only when an exception was raised', explanation: 'That describes except blocks. finally runs in both cases.' },
        ],
      },
    },
  ],

  'mini-project': [
    {
      type: 'exercise',
      content: 'The todo app stores tasks as dictionaries. Write two helpers for it: complete_task(tasks, index) marks the task at that 1-based position as done and returns True, or returns False if the index is out of range; pending(tasks) returns a list of the titles that are not yet done.',
      exercise: {
        title: 'Todo helpers',
        starter: `tasks = [\n    {"title": "Read lesson 8", "done": False},\n    {"title": "Write FizzBuzz", "done": True},\n    {"title": "Push to GitHub", "done": False},\n]\n\n\ndef complete_task(tasks, index):\n    ...\n\n\ndef pending(tasks):\n    ...\n\n\ncomplete_task(tasks, 1)\nprint(pending(tasks))\n`,
        solution: `tasks = [\n    {"title": "Read lesson 8", "done": False},\n    {"title": "Write FizzBuzz", "done": True},\n    {"title": "Push to GitHub", "done": False},\n]\n\n\ndef complete_task(tasks, index):\n    if 1 <= index <= len(tasks):\n        tasks[index - 1]["done"] = True\n        return True\n    return False\n\n\ndef pending(tasks):\n    return [t["title"] for t in tasks if not t["done"]]\n\n\ncomplete_task(tasks, 1)\nprint(pending(tasks))\n`,
        hints: ['The user counts from 1, the list from 0: tasks[index - 1].', 'Guard the index with 1 <= index <= len(tasks).', 'A list comprehension with an if filter builds the pending titles.'],
        tests: [
          { name: 'complete_task marks the task done', check: `t = [{"title": "a", "done": False}]\nassert complete_task(t, 1) is True\nassert t[0]["done"] is True` },
          { name: 'Out-of-range index returns False', check: `t = [{"title": "a", "done": False}]\nassert complete_task(t, 5) is False\nassert complete_task(t, 0) is False\nassert t[0]["done"] is False` },
          { name: 'pending lists only unfinished titles', check: `t = [{"title": "a", "done": False}, {"title": "b", "done": True}, {"title": "c", "done": False}]\nassert pending(t) == ["a", "c"]` },
        ],
      },
    },
  ],

  'classes-oop': [
    {
      type: 'exercise',
      content: 'Build a BankAccount class. The constructor takes an owner name and an optional starting balance. deposit(amount) and withdraw(amount) adjust the balance; withdrawing more than you have should raise ValueError. Expose the balance through a read-only property.',
      exercise: {
        title: 'BankAccount',
        starter: `class BankAccount:\n    def __init__(self, owner, balance=0):\n        ...\n\n    @property\n    def balance(self):\n        ...\n\n    def deposit(self, amount):\n        ...\n\n    def withdraw(self, amount):\n        ...\n\n\nacct = BankAccount("Ada", 100)\nacct.deposit(50)\nacct.withdraw(30)\nprint(acct.owner, acct.balance)\n`,
        solution: `class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self._balance = balance\n\n    @property\n    def balance(self):\n        return self._balance\n\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("deposit must be positive")\n        self._balance += amount\n\n    def withdraw(self, amount):\n        if amount > self._balance:\n            raise ValueError("insufficient funds")\n        self._balance -= amount\n\n\nacct = BankAccount("Ada", 100)\nacct.deposit(50)\nacct.withdraw(30)\nprint(acct.owner, acct.balance)\n`,
        hints: ['Store the balance in self._balance and return it from the balance property.', 'A property without a setter cannot be assigned to — that is the read-only part.', 'raise ValueError("insufficient funds") inside withdraw when amount > balance.'],
        tests: [
          { name: 'Deposits and withdrawals update the balance', check: `a = BankAccount("Ada", 100)\na.deposit(50)\na.withdraw(30)\nassert a.balance == 120, a.balance` },
          { name: 'Default balance is 0', check: `assert BankAccount("Bob").balance == 0` },
          { name: 'Overdraft raises ValueError', check: `a = BankAccount("Ada", 10)\ntry:\n    a.withdraw(50)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError("withdraw(50) on a balance of 10 should raise ValueError")\nassert a.balance == 10` },
          { name: 'balance is read-only', check: `a = BankAccount("Ada", 1)\ntry:\n    a.balance = 999\nexcept AttributeError:\n    pass\nelse:\n    raise AssertionError("balance should be a read-only property")` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Create an Animal base class with a name and a speak() method that returns "...". Then write Dog and Cat subclasses that override speak() to return "Woof" and "Meow". Each animal should describe itself as e.g. Rex says Woof via a describe() method defined once on the base class.',
      exercise: {
        title: 'Inheritance and overriding',
        starter: `class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return "..."\n\n    def describe(self):\n        ...\n\n\nclass Dog(Animal):\n    ...\n\n\nclass Cat(Animal):\n    ...\n\n\nfor animal in [Dog("Rex"), Cat("Tom"), Animal("Blob")]:\n    print(animal.describe())\n`,
        solution: `class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return "..."\n\n    def describe(self):\n        return f"{self.name} says {self.speak()}"\n\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof"\n\n\nclass Cat(Animal):\n    def speak(self):\n        return "Meow"\n\n\nfor animal in [Dog("Rex"), Cat("Tom"), Animal("Blob")]:\n    print(animal.describe())\n`,
        hints: ['describe() should call self.speak() so subclasses can change the sound without touching describe.', 'class Dog(Animal): puts Animal in the parentheses to inherit from it.'],
        tests: [
          { name: 'Dog and Cat inherit from Animal', check: `assert issubclass(Dog, Animal) and issubclass(Cat, Animal)` },
          { name: 'Subclasses override speak', check: `assert Dog("x").speak() == "Woof"\nassert Cat("x").speak() == "Meow"\nassert Animal("x").speak() == "..."` },
          { name: 'describe uses the overridden sound', check: `assert Dog("Rex").describe() == "Rex says Woof"\nassert Cat("Tom").describe() == "Tom says Meow"` },
          { name: 'describe is defined once, on Animal', check: `assert "describe" not in Dog.__dict__ and "describe" not in Cat.__dict__, "define describe() only on Animal"` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What is self in a method definition?',
      quiz: {
        choices: [
          { text: 'The specific instance the method was called on', correct: true, explanation: 'Python passes the instance automatically: dog.speak() becomes Dog.speak(dog). The name self is convention, not a keyword.' },
          { text: 'The class itself', explanation: 'That is cls, used in @classmethod methods.' },
          { text: 'A reserved keyword', explanation: 'self is just a naming convention. You could call it anything, but nobody does.' },
        ],
      },
    },
  ],

  'file-io': [
    {
      type: 'exercise',
      content: 'This sandbox has a real (virtual) file system. Write the three lines in the list to notes.txt, one per line, then read the file back and count how many lines it contains. Use with blocks for both operations.',
      exercise: {
        title: 'Write, then read',
        starter: `lines = ["Buy oat milk", "Finish lesson 10", "Call Grandma"]\n\n# write notes.txt\n\n# read it back and count the lines\nline_count = 0\n\nprint(line_count)\n`,
        solution: `lines = ["Buy oat milk", "Finish lesson 10", "Call Grandma"]\n\nwith open("notes.txt", "w") as f:\n    for line in lines:\n        f.write(line + "\\n")\n\nwith open("notes.txt") as f:\n    line_count = len(f.readlines())\n\nprint(line_count)\n`,
        hints: ['open("notes.txt", "w") creates or overwrites the file. Remember write() does not add newlines for you.', 'f.readlines() returns a list of lines; len() counts them.'],
        tests: [
          { name: 'notes.txt exists with the three lines', check: `with open("notes.txt") as f:\n    content = f.read()\nassert content.splitlines() == ["Buy oat milk", "Finish lesson 10", "Call Grandma"], content` },
          { name: 'line_count is 3', check: `assert line_count == 3, line_count` },
          { name: 'Uses with blocks', check: `assert _src.count("with open(") >= 2, "use a with block for writing and another for reading"` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Use the csv module to write the expense rows to expenses.csv with a header row, then read the file back with csv.DictReader and compute total as the sum of the amount column.',
      exercise: {
        title: 'CSV round trip',
        starter: `import csv\n\nexpenses = [\n    {"item": "coffee", "amount": 3.5},\n    {"item": "book", "amount": 12.0},\n    {"item": "lunch", "amount": 9.25},\n]\n\n# write expenses.csv with a header\n\n# read it back and total the amounts\ntotal = 0\n\nprint(total)\n`,
        solution: `import csv\n\nexpenses = [\n    {"item": "coffee", "amount": 3.5},\n    {"item": "book", "amount": 12.0},\n    {"item": "lunch", "amount": 9.25},\n]\n\nwith open("expenses.csv", "w", newline="") as f:\n    writer = csv.DictWriter(f, fieldnames=["item", "amount"])\n    writer.writeheader()\n    writer.writerows(expenses)\n\ntotal = 0\nwith open("expenses.csv", newline="") as f:\n    for row in csv.DictReader(f):\n        total += float(row["amount"])\n\nprint(total)\n`,
        hints: ['csv.DictWriter(f, fieldnames=[...]) then writer.writeheader() and writer.writerows(expenses).', 'Values read from CSV are strings — convert with float() before adding.'],
        tests: [
          { name: 'expenses.csv has a header and three rows', check: `import csv\nwith open("expenses.csv", newline="") as f:\n    rows = list(csv.reader(f))\nassert rows[0] == ["item", "amount"], rows[0]\nassert len(rows) == 4, f"expected 4 rows including header, got {len(rows)}"` },
          { name: 'total is 24.75', check: `import math\nassert math.isclose(total, 24.75), total` },
          { name: 'Uses DictReader', check: `assert "DictReader" in _src` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What happens when you open an existing file with mode "w"?',
      quiz: {
        choices: [
          { text: 'Its contents are erased immediately, even if you never write anything', correct: true, explanation: 'Mode "w" truncates the file on open. Use "a" to append, or "r+" to read and write in place.' },
          { text: 'New writes are added to the end', explanation: 'That is mode "a" (append).' },
          { text: 'Python raises FileExistsError', explanation: 'That only happens with mode "x", which is for exclusive creation.' },
        ],
      },
    },
  ],

  'comprehensions': [
    {
      type: 'exercise',
      content: 'Rewrite the loop as a single list comprehension that collects the squares of the odd numbers from 1 to 20.',
      exercise: {
        title: 'Squares of odds',
        starter: `squares = []\nfor n in range(1, 21):\n    if n % 2 == 1:\n        squares.append(n * n)\n\nprint(squares)\n`,
        solution: `squares = [n * n for n in range(1, 21) if n % 2 == 1]\n\nprint(squares)\n`,
        hints: ['Shape: [expression for item in iterable if condition]', 'The if part goes at the end, after the for.'],
        tests: [
          { name: 'Correct values', check: `assert squares == [1, 9, 25, 49, 81, 121, 169, 225, 289, 361], squares` },
          { name: 'Uses a comprehension, not append', check: `assert ".append(" not in _src and "for n in" in _src, "replace the loop with a comprehension"` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Build two things with comprehensions: lengths, a dict mapping each word to its length, and flat, a single flat list of every number in the nested matrix.',
      exercise: {
        title: 'Dict and nested comprehensions',
        starter: `words = ["python", "is", "wonderful"]\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n\nlengths = {}\nflat = []\n\nprint(lengths)\nprint(flat)\n`,
        solution: `words = ["python", "is", "wonderful"]\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n\nlengths = {word: len(word) for word in words}\nflat = [n for row in matrix for n in row]\n\nprint(lengths)\nprint(flat)\n`,
        hints: ['Dict comprehension: {key_expr: value_expr for item in iterable}', 'Nested loops read left to right: [n for row in matrix for n in row]'],
        tests: [
          { name: 'lengths maps words to lengths', check: `assert lengths == {"python": 6, "is": 2, "wonderful": 9}, lengths` },
          { name: 'flat is 1 through 9', check: `assert flat == [1, 2, 3, 4, 5, 6, 7, 8, 9], flat` },
          { name: 'Uses comprehensions', check: `assert "{" in _src and "for word in" in _src and "for row in" in _src` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What is the difference between [x * 2 for x in data] and (x * 2 for x in data)?',
      quiz: {
        choices: [
          { text: 'The first builds a whole list in memory; the second is a lazy generator that produces values on demand', correct: true, explanation: 'Generator expressions are ideal for large or infinite streams, and for feeding directly into sum(), max(), any() and friends.' },
          { text: 'The second creates a tuple', explanation: 'A common guess. Parentheses make a generator expression here; tuple(...) would make a tuple.' },
          { text: 'They are identical', explanation: 'They produce the same values but very different objects.' },
        ],
      },
    },
  ],

  'decorators': [
    {
      type: 'exercise',
      content: 'Write a decorator called shout that makes any function returning a string return it in UPPER CASE with an exclamation mark appended. Use functools.wraps so the decorated function keeps its name.',
      exercise: {
        title: 'Your first decorator',
        starter: `import functools\n\n\ndef shout(func):\n    ...\n\n\n@shout\ndef greet(name):\n    """Return a friendly greeting."""\n    return f"hello {name}"\n\n\nprint(greet("ada"))\nprint(greet.__name__)\n`,
        solution: `import functools\n\n\ndef shout(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper() + "!"\n    return wrapper\n\n\n@shout\ndef greet(name):\n    """Return a friendly greeting."""\n    return f"hello {name}"\n\n\nprint(greet("ada"))\nprint(greet.__name__)\n`,
        hints: ['A decorator takes a function and returns a new function (the wrapper).', 'The wrapper should accept *args, **kwargs and call the original.', 'Put @functools.wraps(func) directly above the wrapper definition.'],
        tests: [
          { name: 'Upper-cases and adds !', check: `assert greet("ada") == "HELLO ADA!", greet("ada")` },
          { name: 'Works on any string-returning function', check: `@shout\ndef whisper():\n    return "psst"\nassert whisper() == "PSST!"` },
          { name: 'Keeps the original name via functools.wraps', check: `assert greet.__name__ == "greet", greet.__name__\nassert "wraps" in _src` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Write count_calls, a decorator that counts how many times the decorated function has been called and stores the number on the function as a .calls attribute.',
      exercise: {
        title: 'Stateful decorator',
        starter: `import functools\n\n\ndef count_calls(func):\n    ...\n\n\n@count_calls\ndef ping():\n    return "pong"\n\n\nping(); ping(); ping()\nprint(ping.calls)\n`,
        solution: `import functools\n\n\ndef count_calls(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        return func(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper\n\n\n@count_calls\ndef ping():\n    return "pong"\n\n\nping(); ping(); ping()\nprint(ping.calls)\n`,
        hints: ['Functions are objects — you can set wrapper.calls = 0 after defining the wrapper.', 'Increment wrapper.calls inside the wrapper before calling func.'],
        tests: [
          { name: 'Counts three calls', check: `assert ping.calls == 3, ping.calls` },
          { name: 'Still returns the original result', check: `assert ping() == "pong"\nassert ping.calls == 4` },
          { name: 'Each decorated function has its own counter', check: `@count_calls\ndef other():\n    return 1\nother()\nassert other.calls == 1 and ping.calls == 4` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'The recursive fib below is correct but painfully slow: fib(35) takes seconds and fib(80) would take longer than the universe. Add a single decorator from functools so that fib(80) returns instantly, then change the print to try it.',
      exercise: {
        title: 'Memoise with one line',
        starter: `import functools\n\n\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\n\nprint(fib(25))  # try 80 once the decorator is on\n`,
        solution: `import functools\n\n\n@functools.cache\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\n\nprint(fib(80))\n`,
        hints: ['functools.cache (or lru_cache) remembers results per argument.', 'Decorate fib itself so the recursive calls hit the cache too.'],
        tests: [
          { name: 'Uses a functools cache', check: `assert "cache" in _src, "decorate with @functools.cache or @functools.lru_cache"` },
          { name: 'fib(80) is 23416728348467685', check: `assert "cache" in _src, "add the cache decorator first"\nassert fib(80) == 23416728348467685` },
          { name: 'Fast enough: fib(200) under a second', check: `assert "cache" in _src, "add the cache decorator first"\nimport time\nt = time.perf_counter()\nfib(200)\nassert time.perf_counter() - t < 1.0, "still too slow — is the decorator on fib?"` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What is @timer above def work(): equivalent to?',
      quiz: {
        choices: [
          { text: 'work = timer(work) after the definition', correct: true, explanation: 'Decorators are just syntax sugar for calling a function with the function and rebinding the name.' },
          { text: 'timer(work()) every time work is called', explanation: 'The decorator runs once, at definition time. What it returns is what gets called later.' },
          { text: 'Importing timer from the standard library', explanation: 'timer must already be defined; the @ syntax only applies it.' },
        ],
      },
    },
  ],

  'type-hints': [
    {
      type: 'exercise',
      content: 'Annotate total_price fully: prices is a list of floats, tax_rate is a float defaulting to 0.0, and it returns a float. Then implement it: the sum of the prices with the tax applied.',
      exercise: {
        title: 'Annotate and implement',
        starter: `def total_price(prices, tax_rate=0.0):\n    ...\n\n\nprint(total_price([10.0, 5.5], tax_rate=0.2))\n`,
        solution: `def total_price(prices: list[float], tax_rate: float = 0.0) -> float:\n    return sum(prices) * (1 + tax_rate)\n\n\nprint(total_price([10.0, 5.5], tax_rate=0.2))\n`,
        hints: ['Parameter hints go after the name: prices: list[float]', 'The return hint goes after the closing parenthesis: -> float'],
        tests: [
          { name: 'Computes the total with tax', check: `import math\nassert math.isclose(total_price([10.0, 5.5], tax_rate=0.2), 18.6)\nassert math.isclose(total_price([1.0, 2.0]), 3.0)` },
          { name: 'Return type is float', check: `assert total_price.__annotations__.get("return") is float, "add -> float"` },
          { name: 'Parameters are annotated', check: `ann = total_price.__annotations__\nassert "prices" in ann and "tax_rate" in ann, "annotate both parameters"\nassert ann["tax_rate"] is float` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Turn Point into a dataclass with float fields x and y, and add a distance_to(other) method. Dataclasses give you __init__, __repr__ and __eq__ for free.',
      exercise: {
        title: 'A dataclass with behaviour',
        starter: `from dataclasses import dataclass\nimport math\n\n\nclass Point:\n    x: float\n    y: float\n\n    def distance_to(self, other):\n        ...\n\n\np, q = Point(0, 0), Point(3, 4)\nprint(p, q, p.distance_to(q))\n`,
        solution: `from dataclasses import dataclass\nimport math\n\n\n@dataclass\nclass Point:\n    x: float\n    y: float\n\n    def distance_to(self, other: "Point") -> float:\n        return math.hypot(self.x - other.x, self.y - other.y)\n\n\np, q = Point(0, 0), Point(3, 4)\nprint(p, q, p.distance_to(q))\n`,
        hints: ['Add @dataclass directly above class Point.', 'math.hypot(dx, dy) gives the straight-line distance.'],
        tests: [
          { name: 'Point is a dataclass', check: `import dataclasses\nassert dataclasses.is_dataclass(Point), "add the @dataclass decorator"` },
          { name: 'Distance from (0,0) to (3,4) is 5', check: `import math\nassert math.isclose(Point(0, 0).distance_to(Point(3, 4)), 5.0)` },
          { name: 'Equality and repr come for free', check: `assert Point(1, 2) == Point(1, 2)\nassert repr(Point(1, 2)) == "Point(x=1, y=2)", repr(Point(1, 2))` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What happens at runtime if you call this with a string: def double(n: int) -> int: return n * 2  →  double("ab")?',
      quiz: {
        choices: [
          { text: 'It returns "abab" — hints are not enforced at runtime', correct: true, explanation: 'Type hints are documentation for humans and tools like mypy or pyright. Python itself ignores them when running your code.' },
          { text: 'It raises a TypeError', explanation: 'Python does not check annotations at runtime. A type checker would flag this before you run it.' },
          { text: 'It converts "ab" to an int', explanation: 'No conversion happens. The annotation is just metadata.' },
        ],
      },
    },
  ],

  'iterators-generators': [
    {
      type: 'exercise',
      content: 'Write countdown(n), a generator function that yields n, n-1, … down to 1. Because it uses yield, the values are produced one at a time — nothing is stored in a list.',
      exercise: {
        title: 'Countdown generator',
        starter: `def countdown(n):\n    ...\n\n\nfor value in countdown(5):\n    print(value)\n`,
        solution: `def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\n\nfor value in countdown(5):\n    print(value)\n`,
        hints: ['Use yield instead of return inside a loop.', 'A while loop that decrements n works nicely.'],
        tests: [
          { name: 'countdown(3) yields 3, 2, 1', check: `assert list(countdown(3)) == [3, 2, 1]` },
          { name: 'countdown(0) yields nothing', check: `assert list(countdown(0)) == []` },
          { name: 'Is a real generator function', check: `import inspect\nassert inspect.isgeneratorfunction(countdown), "use yield rather than building a list"` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Write fibonacci(), an infinite generator of the Fibonacci sequence starting 0, 1, 1, 2, 3, …. Then use itertools.islice to collect the first ten values into first_ten.',
      exercise: {
        title: 'Infinite Fibonacci',
        starter: `from itertools import islice\n\n\ndef fibonacci():\n    a, b = 0, 1\n    ...\n\n\nfirst_ten = []\nprint(first_ten)\n`,
        solution: `from itertools import islice\n\n\ndef fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\n\nfirst_ten = list(islice(fibonacci(), 10))\nprint(first_ten)\n`,
        hints: ['while True: yield a; a, b = b, a + b', 'islice(fibonacci(), 10) takes the first ten without running forever.'],
        tests: [
          { name: 'First ten values', check: `assert first_ten == [0, 1, 1, 2, 3, 5, 8, 13, 21, 34], first_ten` },
          { name: 'Generator is infinite (does not stop at 10)', check: `from itertools import islice\nassert list(islice(fibonacci(), 15))[-1] == 377` },
          { name: 'Uses islice', check: `assert "islice(" in _src` },
        ],
      },
    },
    {
      type: 'exercise',
      content: 'Write chunked(items, size) that yields consecutive lists of size elements from any iterable; the last chunk may be shorter. chunked(range(7), 3) gives [0,1,2], [3,4,5], [6].',
      exercise: {
        title: 'Chunk an iterable',
        starter: `def chunked(items, size):\n    ...\n\n\nfor chunk in chunked(range(7), 3):\n    print(chunk)\n`,
        solution: `def chunked(items, size):\n    chunk = []\n    for item in items:\n        chunk.append(item)\n        if len(chunk) == size:\n            yield chunk\n            chunk = []\n    if chunk:\n        yield chunk\n\n\nfor chunk in chunked(range(7), 3):\n    print(chunk)\n`,
        hints: ['Accumulate into a list; when it reaches size, yield it and start a fresh one.', 'After the loop, yield whatever is left over if it is not empty.'],
        tests: [
          { name: 'Splits into chunks of 3', check: `assert list(chunked(range(7), 3)) == [[0, 1, 2], [3, 4, 5], [6]]` },
          { name: 'Exact multiple has no empty trailing chunk', check: `assert list(chunked([1, 2, 3, 4], 2)) == [[1, 2], [3, 4]]` },
          { name: 'Works with any iterable, lazily', check: `import inspect\nassert inspect.isgeneratorfunction(chunked)\nassert next(chunked(iter("abcdef"), 4)) == ["a", "b", "c", "d"]` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What happens when you call next() on a generator that has already finished?',
      quiz: {
        choices: [
          { text: 'It raises StopIteration', correct: true, explanation: 'That is the iterator protocol\'s end signal. for loops catch it for you; next(gen, default) lets you supply a fallback instead.' },
          { text: 'It returns None', explanation: 'Unless you pass a default: next(gen, None). Without it, StopIteration is raised.' },
          { text: 'It starts over from the beginning', explanation: 'Generators cannot be rewound. Create a new one by calling the generator function again.' },
        ],
      },
    },
  ],

  'async-python': [
    {
      type: 'exercise',
      content: 'Write an async function fetch(name, delay) that sleeps for delay seconds with asyncio.sleep and returns name. In main(), run three fetches concurrently with asyncio.gather so the whole program finishes in about 0.3 seconds, not 0.6, and store the returned names in results.',
      exercise: {
        title: 'Run tasks concurrently',
        starter: `import asyncio\nimport time\n\n\nasync def fetch(name, delay):\n    ...\n\n\nasync def main():\n    global results\n    start = time.perf_counter()\n    # run fetch("A", 0.3), fetch("B", 0.2), fetch("C", 0.1) concurrently\n    results = []\n    print(results, f"{time.perf_counter() - start:.2f}s")\n\n\nasyncio.run(main())\n`,
        solution: `import asyncio\nimport time\n\n\nasync def fetch(name, delay):\n    await asyncio.sleep(delay)\n    return name\n\n\nasync def main():\n    global results\n    start = time.perf_counter()\n    results = list(await asyncio.gather(fetch("A", 0.3), fetch("B", 0.2), fetch("C", 0.1)))\n    print(results, f"{time.perf_counter() - start:.2f}s")\n\n\nasyncio.run(main())\n`,
        hints: ['await asyncio.sleep(delay) pauses without blocking other tasks.', 'asyncio.gather(coro1, coro2, coro3) runs them together and returns their results in order.'],
        tests: [
          { name: 'results are A, B, C in call order', check: `assert list(results) == ["A", "B", "C"], results` },
          { name: 'Uses asyncio.gather', check: `assert "gather(" in _src` },
          { name: 'fetch is a coroutine function', check: `import inspect\nassert inspect.iscoroutinefunction(fetch)` },
          { name: 'Finished concurrently (well under 0.6s)', check: `import re\nm = re.search(r"(\\d+\\.\\d+)s", _out)\nassert m, "print the elapsed time"\nassert float(m.group(1)) < 0.5, f"took {m.group(1)}s — the fetches ran one after another"` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'What does await do inside an async function?',
      quiz: {
        choices: [
          { text: 'Pauses this coroutine until the awaited thing finishes, letting other tasks run meanwhile', correct: true, explanation: 'That cooperative hand-off is the whole point of asyncio: one thread, many tasks taking turns while they wait on I/O.' },
          { text: 'Starts a new thread', explanation: 'asyncio runs on a single thread. Concurrency comes from tasks yielding control, not from threads.' },
          { text: 'Blocks the entire program', explanation: 'Only this coroutine pauses; the event loop keeps running other tasks.' },
        ],
      },
    },
  ],

  'testing-and-tooling': [
    {
      type: 'exercise',
      content: 'The tests at the bottom describe how apply_discount should behave, and two of them fail. Fix the function — do not touch the tests — then run the file to see three OK lines.',
      exercise: {
        title: 'Make the tests pass',
        starter: `def apply_discount(price, percent):\n    """Return price reduced by percent. Percent must be between 0 and 100."""\n    if percent < 0 or percent > 100:\n        raise ValueError("percent must be between 0 and 100")\n    return price - percent\n\n\ndef test_ten_percent_off():\n    assert apply_discount(200, 10) == 180\n\n\ndef test_zero_percent():\n    assert apply_discount(50, 0) == 50\n\n\ndef test_invalid_percent():\n    try:\n        apply_discount(10, 150)\n    except ValueError:\n        return\n    assert False, "expected ValueError"\n\n\nfor test in [test_ten_percent_off, test_zero_percent, test_invalid_percent]:\n    try:\n        test()\n        print("OK  ", test.__name__)\n    except AssertionError as e:\n        print("FAIL", test.__name__, e)\n`,
        solution: `def apply_discount(price, percent):\n    """Return price reduced by percent. Percent must be between 0 and 100."""\n    if percent < 0 or percent > 100:\n        raise ValueError("percent must be between 0 and 100")\n    return price * (1 - percent / 100)\n\n\ndef test_ten_percent_off():\n    assert apply_discount(200, 10) == 180\n\n\ndef test_zero_percent():\n    assert apply_discount(50, 0) == 50\n\n\ndef test_invalid_percent():\n    try:\n        apply_discount(10, 150)\n    except ValueError:\n        return\n    assert False, "expected ValueError"\n\n\nfor test in [test_ten_percent_off, test_zero_percent, test_invalid_percent]:\n    try:\n        test()\n        print("OK  ", test.__name__)\n    except AssertionError as e:\n        print("FAIL", test.__name__, e)\n`,
        hints: ['A percentage discount is multiplicative: price * (1 - percent / 100).', 'Run first, read which test fails, then change only the function body.'],
        tests: [
          { name: '10% off 200 is 180', check: `assert apply_discount(200, 10) == 180` },
          { name: '25% off 80 is 60', check: `assert apply_discount(80, 25) == 60` },
          { name: 'Invalid percent still raises', check: `try:\n    apply_discount(10, 150)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError("expected ValueError")` },
          { name: 'All three tests print OK', check: `assert _out.count("OK") == 3 and "FAIL" not in _out, _out` },
        ],
      },
    },
    {
      type: 'quiz',
      content: 'How does pytest decide which functions are tests?',
      quiz: {
        choices: [
          { text: 'Functions whose names start with test_ inside files named test_*.py or *_test.py', correct: true, explanation: 'No registration, no base classes. Naming convention is the whole discovery mechanism, and plain assert statements are the assertions.' },
          { text: 'Functions decorated with @pytest.test', explanation: 'There is no such decorator. pytest discovers tests by name.' },
          { text: 'Any function that contains an assert', explanation: 'assert statements can live anywhere. Only test_-prefixed functions are collected.' },
        ],
      },
    },
  ],
}
