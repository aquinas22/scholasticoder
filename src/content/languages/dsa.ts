import { Language } from '../types'

export const dsa: Language = {
  slug: 'dsa',
  name: 'Data Structures & Algorithms',
  tagline: 'The patterns behind every fast program.',
  description: "Data structures are ways to organize data; algorithms are recipes for working with it. Together they explain why one program handles a million records instantly while another chokes on ten thousand. This track covers the core toolkit — Big-O, arrays, hash maps, stacks, queues, recursion, trees, graphs, sorting — with runnable Python examples. It's the language-agnostic layer under every language you'll ever learn, and the backbone of technical interviews.",
  accentColor: '#E91E63',
  textOnAccent: '#fff',
  icon: 'DS',
  difficulty: 'intermediate',
  usedFor: ['Problem Solving', 'Technical Interviews', 'Performance', 'System Design', 'CS Fundamentals'],
  notableUsers: ['Every tech interview', 'Database engines', 'Game engines', 'Compilers', 'Search engines'],
  setup: {
    description: "Examples use Python because it reads like pseudocode — but every concept transfers to any language. If you finished the Python track's setup you're ready. Otherwise install Python and run examples in a file or the REPL.",
    windows: `winget install Python.Python.3.12

# verify:
python --version

# run examples:
python dsa_practice.py`,
    mac: `# Python 3 usually preinstalled; otherwise:
brew install python

python3 --version
python3 dsa_practice.py`,
    linux: `sudo apt install python3      # Debian/Ubuntu

python3 --version
python3 dsa_practice.py`,
  },
  lessons: [
    {
      slug: 'big-o',
      title: 'Big-O: Measuring Speed',
      intro: "Before learning any data structure, you need the vocabulary for comparing them. Big-O notation describes how an algorithm's work grows as its input grows — the single most useful idea in this track.",
      sections: [
        {
          type: 'text',
          content: "Timing code in seconds is fragile: a faster laptop changes the number, a bigger input changes it more. Big-O ignores the machine and asks one question — when the input gets 10× bigger, how much more work happens? If the work also grows 10×, that's O(n), linear. If it grows 100×, that's O(n²), quadratic. If it barely grows at all, that's O(log n) or O(1). The letter n is the input size: items in a list, characters in a string, users in a database.",
        },
        {
          type: 'code',
          language: 'python',
          content: `
# O(1) — constant: same work no matter how big the list
def first_item(items):
    return items[0]

# O(n) — linear: touches every item once
def total(items):
    result = 0
    for x in items:          # n iterations
        result += x
    return result

# O(n²) — quadratic: for every item, loop over every item
def has_duplicate_slow(items):
    for i in range(len(items)):
        for j in range(len(items)):     # n * n comparisons
            if i != j and items[i] == items[j]:
                return True
    return False

# O(n) — same job, one pass with a set (next lessons explain why)
def has_duplicate_fast(items):
    seen = set()
    for x in items:
        if x in seen:
            return True
        seen.add(x)
    return False
`,
        },
        {
          type: 'text',
          content: "The common classes, fastest to slowest: O(1) constant, O(log n) logarithmic (halve the problem each step — binary search), O(n) linear, O(n log n) the best sorting can do in general, O(n²) quadratic (nested loops over the same data), O(2ⁿ) exponential (try every combination — hopeless past ~30 items). Big-O drops constants and small terms: O(2n + 5) is just O(n), because for large n the multiplier stops mattering compared to the growth shape.",
        },
        {
          type: 'code',
          language: 'text',
          content: `
n = 1,000 items, 1 operation = 1 microsecond:

O(1)        1 op            instant
O(log n)    ~10 ops         instant
O(n)        1,000 ops       1 ms
O(n log n)  ~10,000 ops     10 ms
O(n^2)      1,000,000 ops   1 second
O(2^n)      way too many    heat death of universe

Same table at n = 1,000,000:
O(n)        1 second
O(n^2)      11.5 DAYS       <- why nested loops kill big data
`,
        },
        {
          type: 'tip',
          content: "Practical habit: whenever you write a loop inside a loop over the same data, pause and ask if a set or dictionary could remove the inner loop. That one reflex converts more O(n²) code to O(n) than any other trick.",
        },
      ],
    },
    {
      slug: 'arrays-and-strings',
      title: 'Arrays & Strings',
      intro: "The array is the simplest data structure: items in a row, side by side in memory. Almost everything else is built on top of it — and its strengths and weaknesses explain half of Big-O in practice.",
      sections: [
        {
          type: 'text',
          content: "An array stores elements in one contiguous block of memory. That layout gives its superpower: to find item 500, the computer multiplies 500 by the item size and jumps straight there — O(1) access by index, no searching. The weakness is the flip side of the same layout: inserting at the front means shifting every other element right one slot, O(n). Python's list, JavaScript's array, and Java's ArrayList are all dynamic arrays — arrays that grow by allocating a bigger block and copying when full.",
        },
        {
          type: 'code',
          language: 'python',
          content: `
nums = [10, 20, 30, 40, 50]

nums[2]           # O(1) — jump straight to index 2
nums.append(60)   # O(1) — write at the end (amortized)
nums.pop()        # O(1) — remove from the end

nums.insert(0, 5) # O(n) — shifts ALL elements right
nums.pop(0)       # O(n) — shifts ALL elements left
30 in nums        # O(n) — checks each item until found

# Classic pattern: two pointers. Reverse in place, O(n), no extra memory:
def reverse(items):
    left, right = 0, len(items) - 1
    while left < right:
        items[left], items[right] = items[right], items[left]
        left += 1
        right -= 1
`,
        },
        {
          type: 'text',
          content: "Strings are arrays of characters with one twist in most languages: they're immutable. \"Changing\" a string actually builds a new one, copying everything — so concatenating in a loop is a hidden O(n²) trap. Every language has an escape hatch: collect pieces in a list and join once at the end.",
        },
        {
          type: 'code',
          language: 'python',
          content: `
# TRAP — O(n^2): each += copies the whole string so far
def bad_join(words):
    s = ''
    for w in words:
        s += w        # copy, copy, copy...
    return s

# FIX — O(n): build list, join once
def good_join(words):
    return ''.join(words)

# Second classic pattern: sliding window.
# Longest substring without repeated characters, one pass:
def longest_unique(s):
    seen = {}          # char -> last index
    start = best = 0
    for i, ch in enumerate(s):
        if ch in seen and seen[ch] >= start:
            start = seen[ch] + 1     # jump window past the repeat
        seen[ch] = i
        best = max(best, i - start + 1)
    return best

longest_unique('abcabcbb')   # 3 ('abc')
`,
        },
        {
          type: 'note',
          content: "Two pointers and sliding window are the two most common array interview patterns. Both replace a nested loop (O(n²)) with a single coordinated pass (O(n)). If a problem says 'subarray', 'substring', or 'pair that sums to', one of these is usually the answer.",
        },
      ],
    },
    {
      slug: 'hash-maps',
      title: 'Hash Maps & Sets',
      intro: "The hash map is the most useful data structure in programming: look anything up by key in O(1). Python's dict, JavaScript's object and Map, Java's HashMap — same idea everywhere, and the #1 tool for making slow code fast.",
      sections: [
        {
          type: 'text',
          content: "A hash map stores key–value pairs and finds any value by key in constant time. The trick: a hash function converts the key into a number, and that number decides which slot of an internal array holds the value. Lookup doesn't search — it recomputes the hash and jumps straight to the slot, the same way array indexing jumps. A set is a hash map that only keeps keys; 'have I seen this before?' in O(1).",
        },
        {
          type: 'code',
          language: 'python',
          content: `
ages = {'ada': 36, 'linus': 55}

ages['ada']              # O(1) lookup
ages['grace'] = 85       # O(1) insert
'linus' in ages          # O(1) membership test
del ages['linus']        # O(1) delete

# Compare with a list of pairs — every operation is O(n) scanning.

# Killer use case 1: counting
def count_words(text):
    counts = {}
    for word in text.split():
        counts[word] = counts.get(word, 0) + 1
    return counts

# Killer use case 2: replacing nested loops.
# "Find two numbers that sum to target" — the classic.

def two_sum_slow(nums, target):      # O(n^2)
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return (i, j)

def two_sum_fast(nums, target):      # O(n)
    seen = {}                        # value -> index
    for i, x in enumerate(nums):
        if target - x in seen:       # O(1) instead of inner loop
            return (seen[target - x], i)
        seen[x] = i
`,
        },
        {
          type: 'text',
          content: "Why does it work? The hash function spreads keys evenly across slots. Occasionally two keys land in the same slot — a collision — and the map handles it by chaining a small list in that slot or probing nearby ones. With a good hash function collisions stay rare, so lookups average O(1). This is also why keys must be immutable (hashable): if a key could change after insertion, its hash would change, and the map would look in the wrong slot forever.",
        },
        {
          type: 'code',
          language: 'python',
          content: `
# Sets: hash maps without values. Perfect for membership + dedup.
visited = set()
visited.add('/home')
'/home' in visited        # O(1)

unique = set([3, 1, 3, 2, 1])     # {1, 2, 3} — dedup in O(n)

# Set algebra — each O(len) not O(len^2):
admins = {'ada', 'grace'}
online = {'grace', 'linus'}
admins & online     # {'grace'}          intersection
admins | online     # all three          union
admins - online     # {'ada'}            difference
`,
        },
        {
          type: 'tip',
          content: "Rule of thumb for interviews and real code alike: if your solution is O(n²) because of a lookup inside a loop, a hash map or set almost always makes it O(n). It trades memory for speed — nearly always a great trade.",
        },
      ],
    },
    {
      slug: 'stacks-queues-linked-lists',
      title: 'Stacks, Queues & Linked Lists',
      intro: "Three structures about controlling the ORDER things come out: stacks (last in, first out), queues (first in, first out), and the linked list that often implements them.",
      sections: [
        {
          type: 'text',
          content: "A stack is a pile of plates: push onto the top, pop from the top — last in, first out (LIFO). You already depend on one constantly: the call stack. Every function call pushes a frame; every return pops it; a recursion that never stops overflows it. Stacks also power undo history, the back button, and matching brackets in every editor and compiler.",
        },
        {
          type: 'code',
          language: 'python',
          content: `
# Python list IS a stack: append/pop at the end are O(1).
stack = []
stack.append('a')     # push
stack.append('b')
stack.pop()           # 'b' — last in, first out

# Classic stack problem: are brackets balanced?
def balanced(text):
    pairs = {')': '(', ']': '[', '}': '{'}
    stack = []
    for ch in text:
        if ch in '([{':
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack

balanced('f(a[0], {x: 1})')   # True
balanced('f(a[0)]')           # False — wrong nesting
`,
        },
        {
          type: 'text',
          content: "A queue is a line at a shop: join at the back, served from the front — first in, first out (FIFO). Print jobs, task schedulers, message queues, and breadth-first search (graphs lesson) all use one. Don't use a Python list as a queue — pop(0) shifts everything, O(n). Use collections.deque, which gives O(1) at both ends.",
        },
        {
          type: 'code',
          language: 'python',
          content: `
from collections import deque

queue = deque()
queue.append('job1')      # enqueue at back
queue.append('job2')
queue.popleft()           # 'job1' — first in, first out, O(1)
`,
        },
        {
          type: 'text',
          content: "How does deque get O(1) at both ends? Linked lists. A linked list stores each element in its own node with a pointer to the next node — no contiguous block. Insert or remove anywhere you hold a pointer: O(1), just rewire two links, no shifting. The price is the array's superpower reversed: no jumping to index 500 — you must walk there, O(n). Arrays trade cheap access for expensive insertion; linked lists trade the opposite.",
        },
        {
          type: 'code',
          language: 'python',
          content: `
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

# Build:  1 -> 2 -> 3
head = Node(1)
head.next = Node(2)
head.next.next = Node(3)

# Insert 99 after head: O(1), just rewire — no shifting
new = Node(99)
new.next = head.next
head.next = new           # 1 -> 99 -> 2 -> 3

# Walk the list (this part is O(n)):
node = head
while node:
    print(node.value)
    node = node.next
`,
        },
        {
          type: 'note',
          content: "In practice you'll rarely hand-roll a linked list — dynamic arrays win most real workloads because contiguous memory is cache-friendly (see the Computer Architecture track). But the node-and-pointer idea is the building block for trees and graphs, which you'll use constantly.",
        },
      ],
    },
    {
      slug: 'recursion',
      title: 'Recursion',
      intro: "A recursive function calls itself on a smaller piece of the problem until the piece is trivially small. It's the natural language for trees, divide-and-conquer sorting, and any nested structure — master it here before the next two lessons lean on it.",
      sections: [
        {
          type: 'text',
          content: "Every recursive function has two parts: a base case — the input so small the answer is immediate — and a recursive case that shrinks the problem and calls itself. Miss the base case, or fail to shrink, and calls nest forever until the call stack overflows. The mental model: trust the recursive call. Assume it correctly solves the smaller problem, and only ask 'how do I combine that answer into mine?'",
        },
        {
          type: 'code',
          language: 'python',
          content: `
def factorial(n):
    if n <= 1:                    # base case: answer is immediate
        return 1
    return n * factorial(n - 1)   # shrink, recurse, combine

factorial(5)     # 5 * 4 * 3 * 2 * 1 = 120

# What the call stack does:
# factorial(5)
#   factorial(4)
#     factorial(3)
#       factorial(2)
#         factorial(1) -> 1      base case hit, stack unwinds
#       -> 2 * 1 = 2
#     -> 3 * 2 = 6
#   -> 4 * 6 = 24
# -> 5 * 24 = 120
`,
        },
        {
          type: 'text',
          content: "Recursion shines on nested data, where loops get awkward: a folder contains files and folders, which contain files and folders. The structure is recursive, so the cleanest code is too. Anything a loop does, recursion can do and vice versa — but for self-similar structures, recursion mirrors the shape of the data.",
        },
        {
          type: 'code',
          language: 'python',
          content: `
import os

def total_size(path):
    if os.path.isfile(path):                  # base case: a file
        return os.path.getsize(path)
    total = 0
    for name in os.listdir(path):             # recursive case: a folder
        total += total_size(os.path.join(path, name))
    return total
`,
        },
        {
          type: 'warning',
          content: "Recursion with overlapping subproblems can explode. Naive fibonacci(n) calls itself twice per step — O(2ⁿ), and fibonacci(50) takes minutes. The fix is memoization: cache results so each subproblem is solved once. In Python, one decorator: @functools.lru_cache turns O(2ⁿ) into O(n). This idea — recursion plus a cache — is the heart of dynamic programming.",
        },
        {
          type: 'code',
          language: 'python',
          content: `
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

fib(50)    # instant — each fib(k) computed once, then cached
`,
        },
      ],
    },
    {
      slug: 'trees',
      title: 'Trees & Binary Search',
      intro: "A tree is nodes and pointers arranged as a hierarchy: one root, branching children, no cycles. File systems, the DOM, JSON, org charts, database indexes — hierarchies are everywhere, and trees are how programs hold them.",
      sections: [
        {
          type: 'text',
          content: "Tree vocabulary in one breath: the root is the top node; children hang off parents; leaves have no children; height is the longest root-to-leaf path. A binary tree limits each node to two children, left and right. Since each subtree is itself a tree, tree code is naturally recursive — the base case is the empty tree (None).",
        },
        {
          type: 'code',
          language: 'python',
          content: `
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Every tree question follows one recursive shape:
def height(node):
    if node is None:                # base case: empty tree
        return 0
    return 1 + max(height(node.left), height(node.right))

def count(node):
    if node is None:
        return 0
    return 1 + count(node.left) + count(node.right)

# Traversal — visit every node. "In-order" = left, self, right:
def in_order(node):
    if node is None:
        return
    in_order(node.left)
    print(node.value)
    in_order(node.right)
`,
        },
        {
          type: 'text',
          content: "The star of the family is the binary search tree (BST): every node's left subtree holds smaller values, right subtree holds bigger ones. That single rule means search never explores both sides — compare, go left or right, half the tree eliminated per step. On a balanced tree that's O(log n): a million items found in ~20 comparisons. Databases index columns with tree variants (B-trees) for exactly this reason — it's why indexed queries are fast (see the SQL track).",
        },
        {
          type: 'code',
          language: 'python',
          content: `
def search(node, target):
    if node is None:
        return False
    if target == node.value:
        return True
    if target < node.value:
        return search(node.left, target)     # skip entire right half
    return search(node.right, target)        # skip entire left half

def insert(node, value):
    if node is None:
        return TreeNode(value)
    if value < node.value:
        node.left = insert(node.left, value)
    else:
        node.right = insert(node.right, value)
    return node

# Bonus: in_order() on a BST prints values in sorted order. Free sort!
`,
        },
        {
          type: 'text',
          content: "Same halving idea works on a plain sorted array — binary search, no tree needed. Check the middle; too small, discard the left half; too big, discard the right. O(log n) with three lines of state. It's the most implemented-slightly-wrong algorithm in history (off-by-one errors), so learn this canonical form.",
        },
        {
          type: 'code',
          language: 'python',
          content: `
def binary_search(sorted_items, target):
    lo, hi = 0, len(sorted_items) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if sorted_items[mid] == target:
            return mid
        if sorted_items[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

binary_search([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23)   # 5
`,
        },
        {
          type: 'note',
          content: "BSTs are only O(log n) while balanced. Insert already-sorted data into a naive BST and it degenerates into a linked list — O(n) again. Real implementations (red-black trees, AVL, B-trees) rebalance automatically; that's what your language's sorted containers and every database index use.",
        },
      ],
    },
    {
      slug: 'graphs',
      title: 'Graphs: BFS & DFS',
      intro: "A graph is nodes plus edges connecting them — no hierarchy required, cycles allowed. Social networks, road maps, the internet, package dependencies, game maps: when things connect to things, it's a graph.",
      sections: [
        {
          type: 'text',
          content: "Graphs generalize trees: any node can connect to any other, edges can be one-way (directed) or two-way (undirected), and loops are allowed. The standard representation is an adjacency list — a hash map from each node to the list of its neighbors. Nearly every graph question reduces to one operation: traversal, visiting nodes by following edges. Two orders matter: breadth-first (BFS) and depth-first (DFS).",
        },
        {
          type: 'code',
          language: 'python',
          content: `
# Adjacency list: node -> neighbors
graph = {
    'you':    ['alice', 'bob'],
    'alice':  ['you', 'carol'],
    'bob':    ['you', 'carol', 'dave'],
    'carol':  ['alice', 'bob'],
    'dave':   ['bob'],
}
`,
        },
        {
          type: 'text',
          content: "BFS explores in rings: all direct neighbors first, then neighbors-of-neighbors, and so on outward. It uses a queue (FIFO — the stacks & queues lesson) and a visited set to avoid going in circles. Because it expands one ring at a time, the first time BFS reaches a node is via a shortest path — which is why GPS-style 'fewest hops' problems are BFS.",
        },
        {
          type: 'code',
          language: 'python',
          content: `
from collections import deque

def bfs_shortest(graph, start, goal):
    queue = deque([(start, 0)])       # (node, distance)
    visited = {start}
    while queue:
        node, dist = queue.popleft()
        if node == goal:
            return dist
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))
    return -1                          # unreachable

bfs_shortest(graph, 'you', 'dave')     # 2 (you -> bob -> dave)
`,
        },
        {
          type: 'text',
          content: "DFS dives instead: follow one path as deep as it goes, back up, try the next. Swap the queue for a stack — or just use recursion, since the call stack is the stack. DFS answers 'is there any path?', finds connected components, and detects cycles (how npm and pip catch circular dependencies). BFS finds shortest; DFS goes deep. Choosing between them is usually the whole problem.",
        },
        {
          type: 'code',
          language: 'python',
          content: `
def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited

dfs(graph, 'you')     # every node reachable from 'you'

# Same algorithm, no recursion — explicit stack:
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    while stack:
        node = stack.pop()            # pop = LIFO = depth-first
        if node not in visited:
            visited.add(node)
            stack.extend(graph[node])
    return visited
`,
        },
        {
          type: 'tip',
          content: "Both traversals are O(V + E) — every node and edge visited once. The 'visited' set is not optional: without it, any cycle loops forever. Forgetting it is the single most common graph bug. Weighted shortest paths (roads with distances, not hops) need Dijkstra's algorithm — BFS with a priority queue instead of a plain queue.",
        },
      ],
    },
    {
      slug: 'sorting-and-searching',
      title: 'Sorting: How & When',
      intro: "Sorting is the most-studied problem in computer science, and the ideas inside the classic algorithms — divide and conquer, trading memory for speed — show up everywhere. You'll almost always call your language's built-in sort, but knowing what's under it makes you use it well.",
      sections: [
        {
          type: 'text',
          content: "The simple sorts are O(n²): bubble sort repeatedly swaps neighbors that are out of order; insertion sort takes each item and slides it back into place among the already-sorted prefix (how people sort cards — and genuinely good on small or nearly-sorted data). They're worth reading once to see why they're slow: both compare almost every pair.",
        },
        {
          type: 'code',
          language: 'python',
          content: `
def insertion_sort(items):            # O(n^2) worst, O(n) if nearly sorted
    for i in range(1, len(items)):
        current = items[i]
        j = i - 1
        while j >= 0 and items[j] > current:
            items[j + 1] = items[j]   # slide bigger items right
            j -= 1
        items[j + 1] = current
    return items
`,
        },
        {
          type: 'text',
          content: "The fast sorts hit O(n log n) with divide and conquer plus recursion. Merge sort: split the list in half, recursively sort each half, then merge two sorted halves in one linear pass. The log n comes from halving (like binary search), the n from merging each level. It's the cleanest recursive algorithm in this track.",
        },
        {
          type: 'code',
          language: 'python',
          content: `
def merge_sort(items):
    if len(items) <= 1:                    # base case
        return items
    mid = len(items) // 2
    left = merge_sort(items[:mid])         # trust the recursion
    right = merge_sort(items[mid:])
    return merge(left, right)

def merge(a, b):                           # two sorted lists -> one
    result, i, j = [], 0, 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            result.append(a[i]); i += 1
        else:
            result.append(b[j]); j += 1
    return result + a[i:] + b[j:]

merge_sort([38, 27, 43, 3, 9, 82, 10])
# [3, 9, 10, 27, 38, 43, 82]
`,
        },
        {
          type: 'text',
          content: "Quicksort is merge sort's rival: pick a pivot, partition items into smaller-than and bigger-than, recurse on each side. Faster in practice (in-place, cache-friendly) but O(n²) worst case on adversarial input. Real standard libraries use hybrids — Python's sorted() uses Timsort (merge sort + insertion sort, exploits already-sorted runs), and it's stable: equal items keep their original order, so you can sort by one key then another.",
        },
        {
          type: 'code',
          language: 'python',
          content: `
# In practice: use the built-in, master the key parameter.
people = [('ada', 36), ('linus', 55), ('grace', 85), ('ken', 55)]

sorted(people, key=lambda p: p[1])              # by age
sorted(people, key=lambda p: p[1], reverse=True)
sorted(people, key=lambda p: (p[1], p[0]))      # age, then name

# Sorting as a TOOL — many problems become easy after sorting:
# duplicates become adjacent, min/max hit the ends,
# and binary search (trees lesson) becomes available: O(log n) lookups.
nums = sorted([5, 3, 8, 3, 1])       # [1, 3, 3, 5, 8]
`,
        },
        {
          type: 'note',
          content: "That's the core toolkit: Big-O to measure, arrays and hash maps for storage, stacks and queues for order, recursion for self-similar problems, trees and graphs for connected data, sorting to impose order. From here, practice beats theory — pick easy problems on any practice site, and reach for the structure whose trade-offs fit. You now know them all.",
        },
      ],
    },
  ],
}
