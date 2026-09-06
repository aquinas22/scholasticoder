import type { Lesson } from '../types'

/** Additional Python lessons, inserted after the core sequence and before the package tutorials. */
export const pythonExtraLessons: Lesson[] = [
  {
    slug: 'strings-deep-dive',
    title: 'Strings, Deeply',
    intro: 'Most real programs are mostly string handling: parsing, cleaning, formatting, searching. Python\'s str type is small, immutable and full of well-named methods worth knowing by heart.',
    sections: [
      { type: 'text', content: 'Strings are sequences, so everything that works on lists works here: indexing, slicing, len(), in, and iteration. Negative indexes count from the end, and slices never raise IndexError — they just clip.' },
      { type: 'code', language: 'python', content: `s = "Ora et labora"\nprint(s[0], s[-1])        # O a\nprint(s[4:6])             # et\nprint(s[::-1])            # reversed\nprint(len(s), "labora" in s)\n\nfor word in s.split():\n    print(word.upper(), end=" ")\nprint()` },
      { type: 'text', content: 'Because strings are immutable, every method returns a new string and leaves the original alone. The methods you will use most: strip, split, join, replace, lower/upper, startswith/endswith, find, and the is* family.' },
      { type: 'code', language: 'python', content: `raw = "   Brother Cadfael  \\n"\nname = raw.strip()\nprint(repr(name))\n\ncsv_line = "bede,673,jarrow"\nfields = csv_line.split(",")\nprint(fields)\nprint(" | ".join(fields))\n\nprint("scriptorium".replace("script", "SCRIPT"))\nprint("psalm.txt".endswith(".txt"), "psalm.txt".removesuffix(".txt"))\nprint("42".isdigit(), "forty".isalpha(), "Hello World".istitle())\nprint("abbey".find("b"), "abbey".find("z"))   # 1 -1` },
      { type: 'text', content: 'f-strings are the modern formatting tool. Inside the braces you can put any expression, then a colon and a format spec: width, alignment, padding, precision, thousands separators, and even a date format.' },
      { type: 'code', language: 'python', content: `from datetime import date\n\nname, pages, price = "Vellum", 1200, 3.5\nprint(f"{name:<10}|{pages:>8,}|{price:>8.2f}")\nprint(f"{name:^12}")          # centred\nprint(f"{0.256:.1%}")          # 25.6%\nprint(f"{255:08b} {255:#x}")  # binary and hex\nprint(f"{date.today():%A, %d %B}")\nprint(f"{name=} {pages=}")     # debugging shorthand` },
      { type: 'tip', content: 'The format spec grammar is [fill][align][sign][width][,][.precision][type]. You do not need to memorise it; remember that :>8.2f means "right-align in 8 characters, two decimals" and derive the rest.' },
      { type: 'text', content: 'Bytes are not strings. Text is a sequence of Unicode code points; bytes are what goes over the wire or into a file. Convert with encode and decode, and always name the encoding.' },
      { type: 'code', language: 'python', content: `text = "Gloria in excelsis Deo — ☧"\ndata = text.encode("utf-8")\nprint(type(data), len(text), len(data))\nprint(data[:6])\nprint(data.decode("utf-8") == text)\n\nprint(ord("☧"), chr(9767))` },
      {
        type: 'exercise',
        content: 'Write normalise_name(raw) that trims whitespace, collapses internal runs of spaces to one, and title-cases the result. "  brother   CADFAEL " should become "Brother Cadfael".',
        exercise: {
          title: 'Clean a name',
          starter: `def normalise_name(raw):\n    ...\n\n\nprint(normalise_name("  brother   CADFAEL "))\n`,
          solution: `def normalise_name(raw):\n    return " ".join(raw.split()).title()\n\n\nprint(normalise_name("  brother   CADFAEL "))\n`,
          hints: ['split() with no argument splits on any run of whitespace and drops the ends.', '" ".join(...) puts single spaces back; .title() capitalises each word.'],
          tests: [
            { name: 'Trims, collapses, title-cases', check: `assert normalise_name("  brother   CADFAEL ") == "Brother Cadfael"` },
            { name: 'Already clean stays clean', check: `assert normalise_name("Hildegard of Bingen") == "Hildegard Of Bingen"` },
            { name: 'Tabs and newlines count as whitespace', check: `assert normalise_name("\\tbede\\n jarrow") == "Bede Jarrow"` },
          ],
        },
      },
      {
        type: 'exercise',
        content: 'Write receipt(items) that takes a list of (name, quantity, unit_price) tuples and returns a string with one line per item: the name left-aligned in 12 characters, quantity right-aligned in 3, and the line total right-aligned in 8 with two decimals.',
        exercise: {
          title: 'Aligned columns',
          starter: `def receipt(items):\n    lines = []\n    for name, qty, price in items:\n        lines.append(f"{name} {qty} {qty * price}")\n    return "\\n".join(lines)\n\n\nprint(receipt([("candles", 3, 4.5), ("ink", 12, 0.75)]))\n`,
          solution: `def receipt(items):\n    lines = []\n    for name, qty, price in items:\n        lines.append(f"{name:<12}{qty:>3}{qty * price:>8.2f}")\n    return "\\n".join(lines)\n\n\nprint(receipt([("candles", 3, 4.5), ("ink", 12, 0.75)]))\n`,
          hints: ['{name:<12} pads to 12, left-aligned.', '{value:>8.2f} right-aligns a float in 8 characters with two decimals.'],
          tests: [
            { name: 'Columns line up', check: `out = receipt([("candles", 3, 4.5), ("ink", 12, 0.75)]).splitlines()\nassert out[0] == "candles       3   13.50", repr(out[0])\nassert out[1] == "ink          12    9.00", repr(out[1])` },
            { name: 'Uses format specs', check: `assert ":<12" in _src and ".2f" in _src` },
          ],
        },
      },
      {
        type: 'quiz',
        content: 'What does "abbey"[1:-1] evaluate to?',
        quiz: {
          choices: [
            { text: '"bbe"', correct: true, explanation: 'Start at index 1 (b), stop before the last character (y). Slices exclude the stop index.' },
            { text: '"bbey"', explanation: 'The -1 stop excludes the final character.' },
            { text: 'An IndexError', explanation: 'Slices never raise; out-of-range bounds are simply clipped.' },
          ],
        },
      },
    ],
  },

  {
    slug: 'regular-expressions',
    title: 'Regular Expressions',
    intro: 'A regular expression is a tiny language for describing text patterns. Learn a dozen symbols and you can validate, extract and rewrite text that would take pages of if-statements.',
    sections: [
      { type: 'text', content: 'The re module is the standard library\'s regex engine. Write patterns as raw strings (r"...") so backslashes survive. re.search finds the first match anywhere; re.match only at the start; re.fullmatch requires the whole string to match.' },
      { type: 'code', language: 'python', content: `import re\n\ntext = "Psalm 23, Psalm 150 and Psalm 8"\nm = re.search(r"Psalm (\\d+)", text)\nprint(m.group(0), m.group(1), m.span())\n\nprint(re.findall(r"\\d+", text))            # every number\nprint(re.fullmatch(r"[A-Z][a-z]+", "Bede") is not None)\nprint(re.fullmatch(r"[A-Z][a-z]+", "bede") is not None)` },
      { type: 'text', content: 'The core vocabulary: . any character, \\d digit, \\w word character, \\s whitespace, [abc] a set, [^abc] a negated set, ^ and $ anchors, and the quantifiers * (0+), + (1+), ? (0 or 1) and {m,n}. Parentheses capture; (?:...) groups without capturing.' },
      { type: 'code', language: 'python', content: `import re\n\nlog = """\n2026-09-05 08:12:01 INFO  matins started\n2026-09-05 08:40:17 WARN  bell rope frayed\n2026-09-05 12:00:00 ERROR kitchen fire\n"""\npattern = re.compile(r"^(\\d{4}-\\d{2}-\\d{2}) (\\d{2}:\\d{2}):\\d{2} (\\w+)\\s+(.*)$", re.MULTILINE)\nfor date, time, level, msg in pattern.findall(log):\n    print(f"{time} [{level}] {msg}")\n\n# Named groups read better in real code\nemail = re.compile(r"(?P<user>[\\w.]+)@(?P<domain>[\\w.]+)")\nm = email.search("write to cuthbert@lindisfarne.uk today")\nprint(m["user"], m["domain"])` },
      { type: 'text', content: 're.sub replaces matches, and the replacement can refer to groups with \\1 or \\g<name>, or be a function that receives each match. re.split splits on a pattern instead of a fixed string.' },
      { type: 'code', language: 'python', content: `import re\n\nprint(re.sub(r"\\s+", " ", "too   many    spaces"))\nprint(re.sub(r"(\\w+)@(\\w+)", r"\\2 at \\1", "bede@jarrow"))\nprint(re.sub(r"\\d+", lambda m: str(int(m.group()) * 2), "3 loaves, 5 fishes"))\nprint(re.split(r"[,;]\\s*", "matins, lauds;prime,  terce"))` },
      { type: 'warning', content: 'Regex is greedy by default: .* grabs as much as it can. Use .*? for the shortest match. And do not parse HTML or nested structures with regex; use a real parser for those.' },
      {
        type: 'exercise',
        content: 'Write extract_dates(text) that returns every date written as YYYY-MM-DD in the text, in order, as a list of strings.',
        exercise: {
          title: 'Find the dates',
          starter: `import re\n\n\ndef extract_dates(text):\n    ...\n\n\nprint(extract_dates("Founded 0529-03-21, rebuilt 1066-10-14, restored 2026-09-05."))\n`,
          solution: `import re\n\n\ndef extract_dates(text):\n    return re.findall(r"\\b\\d{4}-\\d{2}-\\d{2}\\b", text)\n\n\nprint(extract_dates("Founded 0529-03-21, rebuilt 1066-10-14, restored 2026-09-05."))\n`,
          hints: ['\\d{4}-\\d{2}-\\d{2} matches four digits, a dash, two digits, a dash, two digits.', 're.findall returns every non-overlapping match as a list.'],
          tests: [
            { name: 'Finds three dates', check: `assert extract_dates("Founded 0529-03-21, rebuilt 1066-10-14, restored 2026-09-05.") == ["0529-03-21", "1066-10-14", "2026-09-05"]` },
            { name: 'Ignores near-misses', check: `assert extract_dates("2026-9-5 and 20260905") == []` },
            { name: 'Uses the re module', check: `assert "re." in _src` },
          ],
        },
      },
      {
        type: 'exercise',
        content: 'Write redact(text) that replaces every email address with [redacted], and mask_card(number) that keeps only the last four digits of a card number, replacing the rest with *. "4111 2222 3333 4444" becomes "**** **** **** 4444".',
        exercise: {
          title: 'Substitute with care',
          starter: `import re\n\n\ndef redact(text):\n    ...\n\n\ndef mask_card(number):\n    ...\n\n\nprint(redact("mail bede@jarrow.uk or hild@whitby.abbey"))\nprint(mask_card("4111 2222 3333 4444"))\n`,
          solution: `import re\n\n\ndef redact(text):\n    return re.sub(r"[\\w.+-]+@[\\w-]+\\.[\\w.]+", "[redacted]", text)\n\n\ndef mask_card(number):\n    digits = re.sub(r"\\D", "", number)\n    masked = "*" * (len(digits) - 4) + digits[-4:]\n    return " ".join(masked[i:i + 4] for i in range(0, len(masked), 4))\n\n\nprint(redact("mail bede@jarrow.uk or hild@whitby.abbey"))\nprint(mask_card("4111 2222 3333 4444"))\n`,
          hints: ['An email is roughly [\\w.+-]+@[\\w-]+\\.[\\w.]+', 'Strip everything that is not a digit first (\\D), then rebuild groups of four.'],
          tests: [
            { name: 'Redacts both emails', check: `assert redact("mail bede@jarrow.uk or hild@whitby.abbey") == "mail [redacted] or [redacted]"` },
            { name: 'Leaves other text alone', check: `assert redact("no emails here") == "no emails here"` },
            { name: 'Masks all but the last four', check: `assert mask_card("4111 2222 3333 4444") == "**** **** **** 4444"` },
            { name: 'Accepts unspaced input', check: `assert mask_card("4111222233334444") == "**** **** **** 4444"` },
          ],
        },
      },
      {
        type: 'quiz',
        content: 'What does the pattern r"colou?r" match?',
        quiz: {
          choices: [
            { text: 'Both "color" and "colour"', correct: true, explanation: 'The ? makes the preceding u optional: zero or one occurrence.' },
            { text: 'Only "colour"', explanation: '? means optional, so the u may be absent.' },
            { text: '"colo" followed by any character then "r"', explanation: 'That would be colo.r with a dot. ? is a quantifier, not a wildcard.' },
          ],
        },
      },
    ],
  },

  {
    slug: 'working-with-json',
    title: 'Working with JSON',
    intro: 'JSON is the lingua franca of APIs, config files and data exports. Python\'s json module turns it into dicts and lists and back again in one call each.',
    sections: [
      { type: 'text', content: 'json.loads parses a string; json.dumps produces one. Objects become dicts, arrays become lists, strings stay strings, numbers become int or float, true/false/null become True/False/None.' },
      { type: 'code', language: 'python', content: `import json\n\ntext = '{"name": "Bede", "born": 673, "works": ["Historia", "De temporum ratione"], "saint": true, "died": null}'\nrecord = json.loads(text)\nprint(type(record), record["works"][0], record["saint"], record["died"])\n\nprint(json.dumps(record))\nprint(json.dumps(record, indent=2, sort_keys=True))` },
      { type: 'text', content: 'For files use json.load and json.dump (no s). Nested data is just nested dicts and lists, so walk it with the usual indexing and loops. dict.get with a default protects you from missing keys.' },
      { type: 'code', language: 'python', content: `import json\nfrom pathlib import Path\n\nlibrary = {\n    "abbey": "Jarrow",\n    "shelves": [\n        {"topic": "history", "books": [{"title": "Historia Ecclesiastica", "pages": 400}]},\n        {"topic": "science", "books": [{"title": "De natura rerum", "pages": 120}, {"title": "De temporibus", "pages": 60}]},\n    ],\n}\nPath("library.json").write_text(json.dumps(library, indent=2))\n\nloaded = json.load(open("library.json"))\nfor shelf in loaded["shelves"]:\n    total = sum(b["pages"] for b in shelf["books"])\n    print(f"{shelf['topic']:<8} {len(shelf['books'])} books, {total} pages")\n\nprint(loaded.get("scriptorium", "no scriptorium key"))` },
      { type: 'text', content: 'Not everything serialises. Dates, sets, Decimal and your own classes raise TypeError. The default= argument lets you tell dumps how to convert them; for the reverse direction, post-process the loaded dict.' },
      { type: 'code', language: 'python', content: `import json\nfrom datetime import date\nfrom dataclasses import dataclass, asdict\n\n@dataclass\nclass Feast:\n    name: str\n    day: date\n\ndef to_json(obj):\n    if isinstance(obj, date):\n        return obj.isoformat()\n    raise TypeError(f"cannot serialise {type(obj).__name__}")\n\nfeasts = [Feast("St Benedict", date(2026, 7, 11)), Feast("All Saints", date(2026, 11, 1))]\ntext = json.dumps([asdict(f) for f in feasts], default=to_json)\nprint(text)\n\nback = [Feast(d["name"], date.fromisoformat(d["day"])) for d in json.loads(text)]\nprint(back[0].day.strftime("%d %B"))` },
      { type: 'note', content: 'JSON has no comments, no trailing commas and only double quotes. If json.loads complains about a config file a human wrote, one of those three is usually the reason.' },
      {
        type: 'exercise',
        content: 'Write total_pages(text) that parses the JSON library above (a dict with a shelves list, each with books that have pages) and returns the total page count across every shelf.',
        exercise: {
          title: 'Walk nested JSON',
          starter: `import json\n\nTEXT = '{"shelves": [{"topic": "history", "books": [{"title": "A", "pages": 400}]}, {"topic": "science", "books": [{"title": "B", "pages": 120}, {"title": "C", "pages": 60}]}]}'\n\n\ndef total_pages(text):\n    ...\n\n\nprint(total_pages(TEXT))\n`,
          solution: `import json\n\nTEXT = '{"shelves": [{"topic": "history", "books": [{"title": "A", "pages": 400}]}, {"topic": "science", "books": [{"title": "B", "pages": 120}, {"title": "C", "pages": 60}]}]}'\n\n\ndef total_pages(text):\n    data = json.loads(text)\n    return sum(book["pages"] for shelf in data["shelves"] for book in shelf["books"])\n\n\nprint(total_pages(TEXT))\n`,
          hints: ['json.loads(text) gives you a dict.', 'A nested generator expression: for shelf in data["shelves"] for book in shelf["books"].'],
          tests: [
            { name: 'Totals 580 pages', check: `assert total_pages(TEXT) == 580` },
            { name: 'Empty library is 0', check: `assert total_pages('{"shelves": []}') == 0` },
            { name: 'Parses with json.loads', check: `assert "json.loads" in _src` },
          ],
        },
      },
      {
        type: 'exercise',
        content: 'Write save_settings(path, settings) and load_settings(path). Saving must write pretty-printed JSON with sorted keys; loading must return the dict, or an empty dict if the file does not exist.',
        exercise: {
          title: 'A settings file',
          starter: `import json\nfrom pathlib import Path\n\n\ndef save_settings(path, settings):\n    ...\n\n\ndef load_settings(path):\n    ...\n\n\nsave_settings("settings.json", {"theme": "dark", "bells": True})\nprint(load_settings("settings.json"))\nprint(load_settings("missing.json"))\n`,
          solution: `import json\nfrom pathlib import Path\n\n\ndef save_settings(path, settings):\n    Path(path).write_text(json.dumps(settings, indent=2, sort_keys=True))\n\n\ndef load_settings(path):\n    p = Path(path)\n    if not p.exists():\n        return {}\n    return json.loads(p.read_text())\n\n\nsave_settings("settings.json", {"theme": "dark", "bells": True})\nprint(load_settings("settings.json"))\nprint(load_settings("missing.json"))\n`,
          hints: ['json.dumps(settings, indent=2, sort_keys=True)', 'Path(path).exists() tells you whether to read or return {}.'],
          tests: [
            { name: 'Round trip', check: `save_settings("t.json", {"b": 1, "a": [1, 2]})\nassert load_settings("t.json") == {"b": 1, "a": [1, 2]}` },
            { name: 'Pretty-printed with sorted keys', check: `save_settings("t2.json", {"zeta": 1, "alpha": 2})\ntext = open("t2.json").read()\nassert "\\n" in text and text.index("alpha") < text.index("zeta"), text` },
            { name: 'Missing file gives {}', check: `assert load_settings("definitely-missing.json") == {}` },
          ],
        },
      },
      {
        type: 'quiz',
        content: 'json.loads(\'{"a": null, "b": true}\') returns…',
        quiz: {
          choices: [
            { text: "{'a': None, 'b': True}", correct: true, explanation: 'JSON null maps to None and the booleans to True/False. The keys are always strings.' },
            { text: "{'a': 'null', 'b': 'true'}", explanation: 'Unquoted null and true are JSON literals, not strings.' },
            { text: 'It raises an error because null is not Python', explanation: 'The json module translates the literals for you.' },
          ],
        },
      },
    ],
  },

  {
    slug: 'collections-and-itertools',
    title: 'collections & itertools',
    intro: 'Two standard-library modules that turn ten-line loops into one-liners: collections for smarter containers, itertools for smarter iteration.',
    sections: [
      { type: 'text', content: 'Counter counts things. It is a dict subclass, so counts["x"] works, missing keys read as 0, and most_common(n) hands you the leaderboard.' },
      { type: 'code', language: 'python', content: `from collections import Counter\n\nwords = "ora et labora ora et lege ora et scribe".split()\ncounts = Counter(words)\nprint(counts)\nprint(counts["ora"], counts["nope"])\nprint(counts.most_common(2))\n\nletters = Counter("mississippi")\nprint(letters.most_common(3))\nprint(Counter(a=3, b=1) + Counter(a=1, c=2))` },
      { type: 'text', content: 'defaultdict creates a missing value on first access, which removes the "if key not in d" dance when grouping. deque is a double-ended queue with O(1) appends and pops at both ends — the right structure for sliding windows and breadth-first search.' },
      { type: 'code', language: 'python', content: `from collections import defaultdict, deque\n\nby_first_letter = defaultdict(list)\nfor name in ["Bede", "Benedict", "Hild", "Hildegard", "Anselm"]:\n    by_first_letter[name[0]].append(name)\nprint(dict(by_first_letter))\n\nwindow = deque(maxlen=3)\nfor reading in [12, 15, 11, 18, 20]:\n    window.append(reading)\n    print(list(window), round(sum(window) / len(window), 1))\n\nqueue = deque(["matins", "lauds", "prime"])\nqueue.appendleft("vigils")\nprint(queue.popleft(), queue.pop(), list(queue))` },
      { type: 'text', content: 'namedtuple gives you lightweight records with named fields (use a dataclass when you need methods or mutability). ChainMap layers dicts so lookups fall through, ideal for defaults + overrides.' },
      { type: 'code', language: 'python', content: `from collections import namedtuple, ChainMap\n\nPoint = namedtuple("Point", "x y")\np = Point(3, 4)\nprint(p, p.x, p[1], p._asdict())\n\ndefaults = {"theme": "vellum", "bells": True}\nuser = {"theme": "vespers"}\nsettings = ChainMap(user, defaults)\nprint(settings["theme"], settings["bells"])` },
      { type: 'text', content: 'itertools composes iterators lazily. chain joins iterables; islice slices any iterator; product, permutations and combinations enumerate arrangements; groupby clusters consecutive equal keys; accumulate produces running totals.' },
      { type: 'code', language: 'python', content: `from itertools import chain, islice, product, combinations, groupby, accumulate, count\n\nprint(list(chain([1, 2], (3, 4), "ab")))\nprint(list(islice(count(10, 5), 4)))            # 10 15 20 25\nprint(list(product("ab", [1, 2])))\nprint(list(combinations(["bread", "wine", "oil"], 2)))\nprint(list(accumulate([100, 20, -30, 50])))\n\nmonks = [("choir", "Bede"), ("choir", "Hild"), ("kitchen", "Oswald"), ("choir", "Ebba")]\nfor role, group in groupby(sorted(monks), key=lambda m: m[0]):\n    print(role, [name for _, name in group])` },
      { type: 'tip', content: 'groupby only groups adjacent items, so sort by the key first. If you want unordered grouping, reach for defaultdict(list) instead.' },
      {
        type: 'exercise',
        content: 'Write group_by_length(words) that returns a dict mapping each length to the list of words of that length, in original order. Then write top_letters(text, n) that returns the n most common letters (ignoring case and non-letters) as (letter, count) tuples.',
        exercise: {
          title: 'Group and count',
          starter: `from collections import defaultdict, Counter\n\n\ndef group_by_length(words):\n    ...\n\n\ndef top_letters(text, n):\n    ...\n\n\nprint(group_by_length(["ora", "et", "labora", "lege", "ama"]))\nprint(top_letters("Ora et labora!", 2))\n`,
          solution: `from collections import defaultdict, Counter\n\n\ndef group_by_length(words):\n    groups = defaultdict(list)\n    for w in words:\n        groups[len(w)].append(w)\n    return dict(groups)\n\n\ndef top_letters(text, n):\n    letters = Counter(ch for ch in text.lower() if ch.isalpha())\n    return letters.most_common(n)\n\n\nprint(group_by_length(["ora", "et", "labora", "lege", "ama"]))\nprint(top_letters("Ora et labora!", 2))\n`,
          hints: ['defaultdict(list) lets you append without checking the key first.', 'Counter(generator) counts as it goes; most_common(n) sorts for you.'],
          tests: [
            { name: 'Groups by length', check: `assert group_by_length(["ora", "et", "labora", "lege", "ama"]) == {3: ["ora", "ama"], 2: ["et"], 6: ["labora"], 4: ["lege"]}` },
            { name: 'Returns a plain dict', check: `assert type(group_by_length(["a"])) is dict` },
            { name: 'Top letters', check: `assert top_letters("Ora et labora!", 2) == [("a", 3), ("o", 2)]` },
            { name: 'Uses Counter and defaultdict', check: `assert "Counter(" in _src and "defaultdict(" in _src` },
          ],
        },
      },
      {
        type: 'exercise',
        content: 'Write moving_average(values, size) that returns a list of the average of each window of size consecutive values. Use a deque with maxlen. moving_average([1, 2, 3, 4, 5], 3) gives [2.0, 3.0, 4.0].',
        exercise: {
          title: 'Sliding window',
          starter: `from collections import deque\n\n\ndef moving_average(values, size):\n    ...\n\n\nprint(moving_average([1, 2, 3, 4, 5], 3))\n`,
          solution: `from collections import deque\n\n\ndef moving_average(values, size):\n    window = deque(maxlen=size)\n    result = []\n    for v in values:\n        window.append(v)\n        if len(window) == size:\n            result.append(sum(window) / size)\n    return result\n\n\nprint(moving_average([1, 2, 3, 4, 5], 3))\n`,
          hints: ['deque(maxlen=size) drops the oldest item automatically.', 'Only record an average once the window is full.'],
          tests: [
            { name: 'Window of 3', check: `assert moving_average([1, 2, 3, 4, 5], 3) == [2.0, 3.0, 4.0]` },
            { name: 'Window of 1 is identity', check: `assert moving_average([4, 8], 1) == [4.0, 8.0]` },
            { name: 'Too few values gives []', check: `assert moving_average([1, 2], 5) == []` },
            { name: 'Uses deque(maxlen=...)', check: `assert "maxlen" in _src` },
          ],
        },
      },
      {
        type: 'quiz',
        content: 'What does Counter("banana")["z"] return?',
        quiz: {
          choices: [
            { text: '0', correct: true, explanation: 'Missing keys in a Counter read as zero instead of raising KeyError.' },
            { text: 'KeyError', explanation: 'That is what a plain dict would do; Counter is friendlier.' },
            { text: 'None', explanation: 'Counter returns 0, which makes arithmetic on counts safe.' },
          ],
        },
      },
    ],
  },

  {
    slug: 'recursion',
    title: 'Recursion',
    intro: 'A recursive function calls itself on a smaller piece of the problem until the piece is trivial. It is the natural way to handle trees, nested data and anything defined in terms of itself.',
    sections: [
      { type: 'text', content: 'Every recursive function has two parts: a base case that returns without recursing, and a recursive case that makes progress toward it. Forget the base case and you get RecursionError; forget to make progress and you get the same.' },
      { type: 'code', language: 'python', content: `def factorial(n):\n    if n <= 1:          # base case\n        return 1\n    return n * factorial(n - 1)   # recursive case: smaller n\n\ndef sum_list(items):\n    if not items:\n        return 0\n    return items[0] + sum_list(items[1:])\n\nprint(factorial(10), sum_list([1, 2, 3, 4]))\n\nimport sys\nprint(sys.getrecursionlimit())` },
      { type: 'text', content: 'Recursion shines on nested structures because the structure itself is recursive: a directory contains files and directories, a JSON value contains JSON values. The function mirrors the shape of the data.' },
      { type: 'code', language: 'python', content: `tree = {\n    "name": "abbey",\n    "children": [\n        {"name": "church", "children": [{"name": "choir", "children": []}, {"name": "nave", "children": []}]},\n        {"name": "cloister", "children": [{"name": "scriptorium", "children": []}]},\n    ],\n}\n\ndef show(node, depth=0):\n    print("  " * depth + node["name"])\n    for child in node["children"]:\n        show(child, depth + 1)\n\ndef count_nodes(node):\n    return 1 + sum(count_nodes(c) for c in node["children"])\n\nshow(tree)\nprint(count_nodes(tree), "rooms")` },
      { type: 'text', content: 'Divide and conquer splits a problem in half, solves each half recursively and merges. Merge sort is the classic example, and binary search is the same idea with only one half kept.' },
      { type: 'code', language: 'python', content: `def merge_sort(items):\n    if len(items) <= 1:\n        return items\n    mid = len(items) // 2\n    left, right = merge_sort(items[:mid]), merge_sort(items[mid:])\n    merged = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            merged.append(left[i]); i += 1\n        else:\n            merged.append(right[j]); j += 1\n    return merged + left[i:] + right[j:]\n\nprint(merge_sort([38, 27, 43, 3, 9, 82, 10]))` },
      { type: 'warning', content: 'Python does not optimise tail calls and the default recursion limit is about 1000 frames. Recursion is for problems whose depth is naturally bounded (tree height, log n). For a plain linear walk over a million items, use a loop.' },
      { type: 'text', content: 'Overlapping subproblems make naive recursion exponential: fib(n) calls fib(n-1) and fib(n-2), which each call fib(n-3)… Memoisation caches results so each subproblem is solved once. functools.cache does it in one line.' },
      { type: 'code', language: 'python', content: `from functools import cache\nimport time\n\ndef fib_slow(n):\n    return n if n < 2 else fib_slow(n - 1) + fib_slow(n - 2)\n\n@cache\ndef fib(n):\n    return n if n < 2 else fib(n - 1) + fib(n - 2)\n\nt = time.perf_counter(); fib_slow(25); print(f"slow: {time.perf_counter() - t:.3f}s")\nt = time.perf_counter(); print(fib(90)); print(f"cached: {time.perf_counter() - t:.6f}s")` },
      {
        type: 'exercise',
        content: 'Write power_set(items) that returns every subset of a list as a list of lists, using recursion: the subsets of [x, *rest] are the subsets of rest, plus each of those with x added.',
        exercise: {
          title: 'All subsets',
          starter: `def power_set(items):\n    ...\n\n\nprint(power_set([1, 2, 3]))\n`,
          solution: `def power_set(items):\n    if not items:\n        return [[]]\n    first, rest = items[0], items[1:]\n    without = power_set(rest)\n    with_first = [[first] + s for s in without]\n    return without + with_first\n\n\nprint(power_set([1, 2, 3]))\n`,
          hints: ['Base case: the only subset of [] is [] itself, so return [[]].', 'Recursive case: compute the subsets of the rest, then add copies with the first item prepended.'],
          tests: [
            { name: '8 subsets of 3 items', check: `result = power_set([1, 2, 3])\nassert len(result) == 8\nassert sorted(map(sorted, result)) == sorted([[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]])` },
            { name: 'Empty input', check: `assert power_set([]) == [[]]` },
            { name: 'Is recursive', check: `import re\nbody = _src.split("def power_set", 1)[1]\nassert "power_set(" in body, "power_set should call itself"` },
          ],
        },
      },
      {
        type: 'exercise',
        content: 'Write depth(value) that returns how deeply nested a JSON-like value is: a non-container is 0, a list or dict is 1 plus the maximum depth of its contents (an empty container is 1).',
        exercise: {
          title: 'Nesting depth',
          starter: `def depth(value):\n    ...\n\n\nprint(depth(3), depth([]), depth([1, [2, [3]]]), depth({"a": {"b": [1]}}))\n`,
          solution: `def depth(value):\n    if isinstance(value, dict):\n        children = value.values()\n    elif isinstance(value, list):\n        children = value\n    else:\n        return 0\n    return 1 + max((depth(c) for c in children), default=0)\n\n\nprint(depth(3), depth([]), depth([1, [2, [3]]]), depth({"a": {"b": [1]}}))\n`,
          hints: ['Check isinstance for dict and list; anything else is depth 0.', 'max() with default=0 handles empty containers.'],
          tests: [
            { name: 'Scalars are 0', check: `assert depth(3) == 0 and depth("x") == 0 and depth(None) == 0` },
            { name: 'Empty containers are 1', check: `assert depth([]) == 1 and depth({}) == 1` },
            { name: 'Nested lists and dicts', check: `assert depth([1, [2, [3]]]) == 3\nassert depth({"a": {"b": [1]}}) == 3\nassert depth([[], [[]]]) == 3` },
          ],
        },
      },
      {
        type: 'quiz',
        content: 'What is wrong with this function?  def count_down(n): print(n); count_down(n - 1)',
        quiz: {
          choices: [
            { text: 'It has no base case, so it recurses until RecursionError', correct: true, explanation: 'Add if n == 0: return (or similar) before the recursive call.' },
            { text: 'It needs a return statement to print', explanation: 'print works fine without return; the problem is that it never stops.' },
            { text: 'Nothing; it stops at 0 automatically', explanation: 'Python does not stop for you. Negative numbers are perfectly valid arguments.' },
          ],
        },
      },
    ],
  },

  {
    slug: 'debugging-and-tracebacks',
    title: 'Debugging & Reading Tracebacks',
    intro: 'Programs fail. The skill that separates beginners from professionals is not avoiding errors but reading them calmly and finding the cause fast.',
    sections: [
      { type: 'text', content: 'Read a traceback from the bottom up. The last line names the exception and its message. Above it, each "File ... line ..., in ..." entry is a frame; the lowest frame is where the error happened, the ones above are who called it. Run this and read the output before reading on.' },
      { type: 'code', language: 'python', content: `def average(numbers):\n    return sum(numbers) / len(numbers)\n\ndef report(groups):\n    for name, scores in groups.items():\n        print(name, average(scores))\n\nreport({"choir": [90, 85], "kitchen": []})` },
      { type: 'text', content: 'The most common exceptions tell you exactly what to look for. NameError: a typo or a variable used before assignment. TypeError: wrong kind of value, often None where an object was expected. KeyError/IndexError: a lookup that does not exist. AttributeError: usually None again, or a misspelled method. ValueError: right type, wrong content.' },
      { type: 'code', language: 'python', content: `# Each of these raises a different exception. Run it, then fix them one by one.\nsamples = [\n    lambda: undefined_name,\n    lambda: "3" + 3,\n    lambda: {"a": 1}["b"],\n    lambda: [1, 2, 3][5],\n    lambda: None.upper(),\n    lambda: int("forty"),\n]\nfor fn in samples:\n    try:\n        fn()\n    except Exception as e:\n        print(f"{type(e).__name__:<16} {e}")` },
      { type: 'text', content: 'print debugging is legitimate. The f"{x=}" form prints both the name and the value. For anything longer-lived, the logging module gives you levels, timestamps and the ability to switch output off without deleting lines.' },
      { type: 'code', language: 'python', content: `import logging\n\nlogging.basicConfig(level=logging.DEBUG, format="%(levelname)s %(funcName)s: %(message)s")\nlog = logging.getLogger(__name__)\n\ndef tithe(amount, rate=0.1):\n    log.debug(f"{amount=} {rate=}")\n    if amount < 0:\n        log.warning("negative amount, treating as zero")\n        amount = 0\n    result = round(amount * rate, 2)\n    log.info(f"tithe is {result}")\n    return result\n\ntithe(120)\ntithe(-5)` },
      { type: 'text', content: 'assert states something you believe is true at that point in the program. When the belief is wrong, it fails loudly and early instead of letting bad data travel. breakpoint() drops you into the interactive debugger on your own machine (not in this sandbox), where n steps, p prints and c continues.' },
      { type: 'code', language: 'python', content: `def split_bill(total, people):\n    assert people > 0, f"need at least one person, got {people}"\n    assert total >= 0, "total cannot be negative"\n    share = total / people\n    return round(share, 2)\n\nprint(split_bill(100, 3))\ntry:\n    split_bill(100, 0)\nexcept AssertionError as e:\n    print("caught:", e)` },
      { type: 'tip', content: 'When you are stuck, shrink the problem: copy the failing call into a fresh cell with the smallest input that still fails. Half of all bugs disappear the moment you can state exactly which input breaks which line.' },
      {
        type: 'exercise',
        content: 'This function should return the median of a list, but it has two bugs: one crashes on even-length lists and one gives wrong answers for unsorted input. Run it, read the traceback, and fix both.',
        exercise: {
          title: 'Fix the median',
          starter: `def median(values):\n    n = len(values)\n    middle = n / 2\n    if n % 2 == 1:\n        return values[middle]\n    return (values[middle - 1] + values[middle]) / 2\n\n\nprint(median([3, 1, 2]))\nprint(median([4, 1, 3, 2]))\n`,
          solution: `def median(values):\n    ordered = sorted(values)\n    n = len(ordered)\n    middle = n // 2\n    if n % 2 == 1:\n        return ordered[middle]\n    return (ordered[middle - 1] + ordered[middle]) / 2\n\n\nprint(median([3, 1, 2]))\nprint(median([4, 1, 3, 2]))\n`,
          hints: ['The traceback says list indices must be integers: n / 2 is a float. Use //.', 'A median only makes sense on sorted data; sort a copy first.'],
          tests: [
            { name: 'Odd length', check: `assert median([3, 1, 2]) == 2` },
            { name: 'Even length', check: `assert median([4, 1, 3, 2]) == 2.5` },
            { name: 'Does not mutate the input', check: `data = [5, 1, 4]\nmedian(data)\nassert data == [5, 1, 4], "sort a copy, not the caller's list"` },
          ],
        },
      },
      {
        type: 'exercise',
        content: 'Write safe_get(data, path) that walks a nested dict/list structure following a list of keys and indexes, returning None instead of raising when any step is missing. safe_get(cfg, ["db", "hosts", 0]) should give "alpha".',
        exercise: {
          title: 'Defensive lookups',
          starter: `cfg = {"db": {"hosts": ["alpha", "beta"], "port": 5432}}\n\n\ndef safe_get(data, path):\n    for step in path:\n        data = data[step]\n    return data\n\n\nprint(safe_get(cfg, ["db", "hosts", 0]))\nprint(safe_get(cfg, ["db", "user"]))\nprint(safe_get(cfg, ["db", "hosts", 5]))\n`,
          solution: `cfg = {"db": {"hosts": ["alpha", "beta"], "port": 5432}}\n\n\ndef safe_get(data, path):\n    for step in path:\n        try:\n            data = data[step]\n        except (KeyError, IndexError, TypeError):\n            return None\n    return data\n\n\nprint(safe_get(cfg, ["db", "hosts", 0]))\nprint(safe_get(cfg, ["db", "user"]))\nprint(safe_get(cfg, ["db", "hosts", 5]))\n`,
          hints: ['Missing dict keys raise KeyError; bad list indexes raise IndexError; indexing None raises TypeError.', 'Catch exactly those three and return None.'],
          tests: [
            { name: 'Found path', check: `assert safe_get(cfg, ["db", "hosts", 0]) == "alpha"\nassert safe_get(cfg, ["db", "port"]) == 5432` },
            { name: 'Missing key or index gives None', check: `assert safe_get(cfg, ["db", "user"]) is None\nassert safe_get(cfg, ["db", "hosts", 5]) is None` },
            { name: 'Walking through a scalar gives None', check: `assert safe_get(cfg, ["db", "port", "x"]) is None` },
            { name: 'Catches specific exceptions, not everything', check: `assert "KeyError" in _src and "IndexError" in _src\nassert "except Exception" not in _src and "except:" not in _src` },
          ],
        },
      },
      {
        type: 'quiz',
        content: 'In a traceback, which frame usually points at the line that actually raised the exception?',
        quiz: {
          choices: [
            { text: 'The bottom one, just above the exception message', correct: true, explanation: 'Tracebacks list the call chain top-down, so the most recent call — where it broke — is last. The fix, however, is often in a frame above it, where a bad value was passed.' },
            { text: 'The top one', explanation: 'The top frame is the outermost caller, typically your main script.' },
            { text: 'Whichever is in your own file', explanation: 'Your files matter for the fix, but the raising line is always the last frame.' },
          ],
        },
      },
    ],
  },
]
