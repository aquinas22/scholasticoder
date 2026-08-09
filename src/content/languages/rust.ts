import { Language } from '../types'

export const rust: Language = {
  slug: 'rust',
  name: 'Rust',
  tagline: 'Memory safe. Blazingly fast. Compiler as therapist.',
  description: 'Rust is a systems programming language focused on safety, performance, and concurrency. The borrow checker will reject your code at first. Then at second. Eventually, you\'ll understand why — and you\'ll become a better programmer for it.',
  accentColor: '#CE4A00',
  textOnAccent: '#fff',
  icon: 'Rs',
  difficulty: 'advanced',
  usedFor: ['Systems Programming', 'WebAssembly', 'Game Engines', 'Embedded', 'CLI Tools'],
  notableUsers: ['Mozilla', 'Microsoft', 'Google', 'Amazon', 'Meta'],
  setup: {
    description: 'Rust is installed via rustup, the official toolchain manager. It handles compiler versions, cross-compilation targets, and documentation — all in one tool.',
    windows: `# Download and run rustup-init.exe from:
# https://www.rust-lang.org/tools/install

# Or via winget:
winget install Rustlang.Rustup

# After installation, restart your terminal:
rustup update stable
rustc --version
cargo --version`,
    mac: `# Install via rustup (recommended):
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Verify:
rustc --version
cargo --version`,
    linux: `# Install via rustup:
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# You may need build tools:
# Ubuntu: sudo apt install build-essential
# Fedora: sudo dnf install gcc

# Verify:
rustc --version
cargo --version`,
  },
  lessons: [
    {
      slug: 'hello-world',
      title: 'Hello, World!',
      intro: 'Don\'t worry, the borrow checker is your friend. It\'s a very aggressive friend who won\'t let you do anything fun, but it IS your friend. Let\'s start with something it will definitely approve.',
      sections: [
        {
          type: 'text',
          content: 'Every Rust program starts with a main() function. Rust files have the .rs extension. The rustc compiler compiles your file to a native binary — no virtual machine, no interpreter.',
        },
        {
          type: 'code',
          language: 'rust',
          content: `fn main() {
    println!("Hello, World!");
}`,
        },
        {
          type: 'text',
          content: 'println! is a macro (the ! tells you so). Macros in Rust are more powerful than functions — they can take a variable number of arguments and do compile-time magic. You\'ll use println! constantly for debugging.',
        },
        {
          type: 'code',
          language: 'rust',
          content: `fn main() {
    // Simple string
    println!("Hello, World!");

    // Formatted output — {} is a placeholder
    let name = "Alice";
    let age = 30;
    println!("Name: {}, Age: {}", name, age);

    // Named placeholders
    println!("{name} is {age} years old.");

    // Debug format — prints almost anything with {:?}
    let numbers = vec![1, 2, 3, 4, 5];
    println!("{:?}", numbers);   // [1, 2, 3, 4, 5]
    println!("{:#?}", numbers);  // pretty-printed

    // eprintln! prints to stderr
    eprintln!("This goes to stderr");
}`,
        },
        {
          type: 'text',
          content: 'To compile and run: rustc hello.rs && ./hello. For any real project, use Cargo — Rust\'s build system and package manager. cargo new my_project creates a project, cargo run compiles and runs it.',
        },
        {
          type: 'code',
          language: 'bash',
          content: `cargo new hello_world
cd hello_world
cargo run`,
        },
      ],
    },
    {
      slug: 'variables-types',
      title: 'Variables & Types',
      intro: 'In Rust, variables are immutable by default. This is not a bug. This is the entire point.',
      sections: [
        {
          type: 'text',
          content: 'Use let to declare variables. They are immutable by default — you cannot change them after assignment. Use let mut if you need mutability. Rust infers types, but you can annotate them explicitly.',
        },
        {
          type: 'code',
          language: 'rust',
          content: `fn main() {
    // Immutable by default
    let x = 5;
    // x = 6;  // ERROR: cannot assign twice to immutable variable

    // Mutable
    let mut y = 5;
    y = 6;   // OK
    println!("y = {}", y);

    // Explicit type annotation
    let z: i32 = 42;
    let pi: f64 = 3.14159;
    let flag: bool = true;
    let ch: char = 'A';

    // Integer types
    let a: i8  = 127;         // signed 8-bit:  -128 to 127
    let b: i32 = 2_147_483_647;  // signed 32-bit (underscores for readability)
    let c: u64 = 18_446_744_073_709_551_615; // unsigned 64-bit
    let d: usize = 42;        // pointer-sized int (use for indexing)

    // Float types
    let e: f32 = 3.14;    // 32-bit float
    let f: f64 = 3.14;    // 64-bit float (default for float literals)

    // Constants — must have explicit type, evaluated at compile time
    const MAX_POINTS: u32 = 100_000;
}`,
        },
        {
          type: 'text',
          content: 'Shadowing is a Rust superpower: you can re-declare a variable with the same name using let, even changing its type. This is different from mutation.',
        },
        {
          type: 'code',
          language: 'rust',
          content: `fn main() {
    // Shadowing — each let creates a new variable
    let spaces = "   ";                 // &str
    let spaces = spaces.len();          // usize — different type!
    println!("{}", spaces);             // 3

    // String types
    let s1 = "hello";           // &str — string slice, lives in program data
    let s2 = String::from("hello");  // String — heap-allocated, growable

    let mut s3 = String::from("hello");
    s3.push_str(", world");     // mutate a String
    s3.push('!');               // append a char
    println!("{}", s3);         // hello, world!

    // Tuples — fixed-size collection of mixed types
    let tup: (i32, f64, bool) = (500, 6.4, true);
    let (x, y, z) = tup;       // destructuring
    println!("{} {} {}", x, y, z);
    println!("{}", tup.0);      // access by index

    // Arrays — fixed-size, same type
    let arr = [1, 2, 3, 4, 5];
    let zeros = [0; 10];        // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    println!("{}", arr[0]);     // 1
}`,
        },
        {
          type: 'warning',
          content: 'Integer overflow panics in debug mode and wraps silently in release mode. Use checked_add(), saturating_add(), or wrapping_add() when you need explicit overflow behavior.',
        },
      ],
    },
    {
      slug: 'ownership',
      title: 'Ownership & Borrowing',
      intro: 'This is the chapter that makes people close their laptop and go for a walk. But it\'s also the chapter that makes Rust special. Take it slow.',
      sections: [
        {
          type: 'text',
          content: 'Every value in Rust has exactly one owner. When the owner goes out of scope, the value is dropped (freed). No garbage collector. No manual free(). This is Rust\'s entire memory safety story.',
        },
        {
          type: 'code',
          language: 'rust',
          content: `fn main() {
    // Ownership basics
    let s1 = String::from("hello");
    let s2 = s1;  // s1 is MOVED to s2
    // println!("{}", s1);  // ERROR: s1's value moved to s2

    // Clone — explicit deep copy
    let s1 = String::from("hello");
    let s2 = s1.clone();   // s1 is still valid
    println!("{} {}", s1, s2);

    // Copy types (integers, floats, bool, char, tuples of copies)
    // are copied, not moved
    let x = 5;
    let y = x;   // x is COPIED, not moved
    println!("{} {}", x, y);   // both work fine

    // Move into a function
    let s = String::from("hello");
    takes_ownership(s);     // s is moved
    // println!("{}", s);   // ERROR: s was moved

    // Return ownership
    let s = gives_ownership();
    println!("{}", s);      // works
}

fn takes_ownership(s: String) {
    println!("{}", s);
}   // s dropped here, memory freed

fn gives_ownership() -> String {
    String::from("yours now")
}`,
        },
        {
          type: 'text',
          content: 'References let you use a value without taking ownership. A reference is like a pointer, but the borrow checker guarantees it\'s always valid — no dangling pointers ever.',
        },
        {
          type: 'code',
          language: 'rust',
          content: `fn main() {
    let s = String::from("hello");

    // Shared reference — borrow without taking ownership
    let len = calculate_len(&s);   // &s is a reference to s
    println!("{} has length {}", s, len);   // s still works!

    // Mutable reference — allows mutation
    let mut s = String::from("hello");
    change(&mut s);
    println!("{}", s);   // hello world

    // Rules:
    // 1. Any number of shared (&) references, OR
    // 2. Exactly ONE mutable (&mut) reference — never both
    // These rules prevent data races at compile time.

    let r1 = &s;
    let r2 = &s;
    println!("{} and {}", r1, r2);  // OK — two shared refs
    // let r3 = &mut s;            // ERROR — can't have mutable while shared refs exist
}

fn calculate_len(s: &String) -> usize {
    s.len()
}   // s is NOT dropped, we only borrowed it

fn change(s: &mut String) {
    s.push_str(" world");
}`,
        },
        {
          type: 'note',
          content: 'The borrow checker operates at compile time with zero runtime cost. If your code compiles, memory safety is guaranteed. If it doesn\'t compile, the error messages will tell you exactly what the problem is (usually).',
        },
      ],
    },
    {
      slug: 'structs-enums',
      title: 'Structs & Enums',
      intro: 'Rust doesn\'t have classes, but it has structs + impl blocks, which are better in every way. Fight me.',
      sections: [
        {
          type: 'code',
          language: 'rust',
          content: `#[derive(Debug)]
struct Rectangle {
    width: f64,
    height: f64,
}

impl Rectangle {
    // Associated function (like a static method — no 'self')
    fn new(width: f64, height: f64) -> Self {
        Rectangle { width, height }
    }

    // Method — 'self' is the instance
    fn area(&self) -> f64 {
        self.width * self.height
    }

    fn perimeter(&self) -> f64 {
        2.0 * (self.width + self.height)
    }

    fn is_square(&self) -> bool {
        self.width == self.height
    }

    // Mutable method
    fn scale(&mut self, factor: f64) {
        self.width *= factor;
        self.height *= factor;
    }
}

fn main() {
    let mut rect = Rectangle::new(10.0, 5.0);
    println!("{:?}", rect);            // Rectangle { width: 10.0, height: 5.0 }
    println!("Area: {}", rect.area()); // Area: 50
    rect.scale(2.0);
    println!("Scaled: {:?}", rect);    // Rectangle { width: 20.0, height: 10.0 }
}`,
        },
        {
          type: 'text',
          content: 'Rust\'s enums are far more powerful than enums in most languages — each variant can hold different types of data. Combined with pattern matching, they make Rust code extremely expressive.',
        },
        {
          type: 'code',
          language: 'rust',
          content: `#[derive(Debug)]
enum Shape {
    Circle(f64),              // radius
    Rectangle(f64, f64),      // width, height
    Triangle { base: f64, height: f64 },  // named fields
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle(r) => std::f64::consts::PI * r * r,
            Shape::Rectangle(w, h) => w * h,
            Shape::Triangle { base, height } => 0.5 * base * height,
        }
    }
}

fn main() {
    let shapes = vec![
        Shape::Circle(5.0),
        Shape::Rectangle(4.0, 6.0),
        Shape::Triangle { base: 3.0, height: 8.0 },
    ];

    for shape in &shapes {
        println!("{:?} has area {:.2}", shape, shape.area());
    }
}`,
        },
      ],
    },
    {
      slug: 'error-handling',
      title: 'Error Handling',
      intro: 'Rust doesn\'t have exceptions. Instead it has Result<T, E> and Option<T>, which force you to handle errors. This sounds annoying until you use a language that doesn\'t do this.',
      sections: [
        {
          type: 'code',
          language: 'rust',
          content: `use std::num::ParseIntError;

// Result<T, E> — either Ok(value) or Err(error)
fn parse_number(s: &str) -> Result<i32, ParseIntError> {
    s.trim().parse::<i32>()
}

fn main() {
    // Pattern matching on Result
    match parse_number("42") {
        Ok(n) => println!("Parsed: {}", n),
        Err(e) => println!("Error: {}", e),
    }

    // ? operator — propagate errors upward
    // (only works in functions that return Result or Option)
    let result: Result<i32, _> = (|| {
        let a = parse_number("10")?;
        let b = parse_number("20")?;
        Ok(a + b)
    })();
    println!("{:?}", result);   // Ok(30)

    // unwrap() — panics on Err (fine for scripts, not for libraries)
    let n = parse_number("42").unwrap();  // 42

    // unwrap_or — provide a default
    let n = parse_number("oops").unwrap_or(0);  // 0

    // unwrap_or_else — compute default lazily
    let n = parse_number("oops").unwrap_or_else(|e| {
        eprintln!("Falling back: {}", e);
        -1
    });
}`,
        },
        {
          type: 'code',
          language: 'rust',
          content: `// Option<T> — either Some(value) or None
fn first_even(numbers: &[i32]) -> Option<i32> {
    numbers.iter().find(|&&x| x % 2 == 0).copied()
}

fn main() {
    let odds = vec![1, 3, 5, 7];
    let mixed = vec![1, 2, 3, 4];

    println!("{:?}", first_even(&odds));   // None
    println!("{:?}", first_even(&mixed));  // Some(2)

    // if let — concise match for one variant
    if let Some(n) = first_even(&mixed) {
        println!("Found even: {}", n);
    }

    // Option methods
    let opt: Option<i32> = Some(5);
    println!("{}", opt.unwrap_or(0));             // 5
    println!("{:?}", opt.map(|x| x * 2));         // Some(10)
    println!("{:?}", opt.filter(|&x| x > 3));     // Some(5)

    let none: Option<i32> = None;
    println!("{}", none.unwrap_or(42));            // 42
    println!("{:?}", none.map(|x| x * 2));        // None
}`,
        },
        {
          type: 'note',
          content: 'The ? operator is your best friend. It unwraps Ok/Some values and returns early with Err/None if the value is absent. It replaces dozens of match statements and makes error-handling code clean.',
        },
      ],
    },
    {
      slug: 'traits',
      title: 'Traits & Generics',
      intro: 'Traits are Rust\'s version of interfaces. Generics let you write code that works across types. Together, they\'re how Rust achieves zero-cost abstraction.',
      sections: [
        {
          type: 'code',
          language: 'rust',
          content: `// Define a trait
trait Describable {
    fn describe(&self) -> String;
    fn short_desc(&self) -> String {
        // Default implementation
        self.describe()[..50.min(self.describe().len())].to_string()
    }
}

struct Cat {
    name: String,
    indoor: bool,
}

struct Car {
    make: String,
    year: u32,
}

impl Describable for Cat {
    fn describe(&self) -> String {
        let location = if self.indoor { "indoor" } else { "outdoor" };
        format!("{} is an {} cat", self.name, location)
    }
}

impl Describable for Car {
    fn describe(&self) -> String {
        format!("{} ({})", self.make, self.year)
    }
}

// Generic function with trait bound
fn print_desc<T: Describable>(item: &T) {
    println!("{}", item.describe());
}

// or with 'impl Trait' syntax (cleaner for simple cases)
fn print_short(item: &impl Describable) {
    println!("{}", item.short_desc());
}

fn main() {
    let cat = Cat { name: "Whiskers".to_string(), indoor: true };
    let car = Car { make: "Tesla".to_string(), year: 2024 };

    print_desc(&cat);
    print_desc(&car);
}`,
        },
        {
          type: 'code',
          language: 'rust',
          content: `// Generic struct
#[derive(Debug)]
struct Pair<T> {
    first: T,
    second: T,
}

impl<T: PartialOrd + std::fmt::Display> Pair<T> {
    fn new(first: T, second: T) -> Self {
        Pair { first, second }
    }

    fn larger(&self) -> &T {
        if self.first > self.second { &self.first } else { &self.second }
    }
}

// Common standard library traits
use std::fmt;

struct Point { x: f64, y: f64 }

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

fn main() {
    let pair = Pair::new(5, 10);
    println!("Larger: {}", pair.larger());  // Larger: 10

    let p = Point { x: 1.0, y: 2.5 };
    println!("{}", p);  // (1, 2.5) — uses our Display impl
}`,
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: CLI Calculator',
      intro: 'Let\'s build a command-line calculator using everything we\'ve learned: structs, enums, error handling, and pattern matching.',
      sections: [
        {
          type: 'code',
          language: 'rust',
          content: `use std::env;
use std::fmt;

#[derive(Debug)]
enum CalcError {
    InvalidNumber(String),
    InvalidOperator(String),
    DivisionByZero,
    MissingArguments,
}

impl fmt::Display for CalcError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            CalcError::InvalidNumber(s) => write!(f, "Invalid number: '{}'", s),
            CalcError::InvalidOperator(s) => write!(f, "Unknown operator: '{}'", s),
            CalcError::DivisionByZero => write!(f, "Cannot divide by zero"),
            CalcError::MissingArguments => write!(f, "Usage: calc <num> <op> <num>"),
        }
    }
}

fn calculate(a: f64, op: &str, b: f64) -> Result<f64, CalcError> {
    match op {
        "+" => Ok(a + b),
        "-" => Ok(a - b),
        "*" | "x" => Ok(a * b),
        "/" => {
            if b == 0.0 {
                Err(CalcError::DivisionByZero)
            } else {
                Ok(a / b)
            }
        }
        "%" => Ok(a % b),
        "^" => Ok(a.powf(b)),
        _ => Err(CalcError::InvalidOperator(op.to_string())),
    }
}

fn run() -> Result<(), CalcError> {
    let args: Vec<String> = env::args().collect();

    if args.len() != 4 {
        return Err(CalcError::MissingArguments);
    }

    let a: f64 = args[1].parse().map_err(|_| CalcError::InvalidNumber(args[1].clone()))?;
    let op = &args[2];
    let b: f64 = args[3].parse().map_err(|_| CalcError::InvalidNumber(args[3].clone()))?;

    let result = calculate(a, op, b)?;
    println!("{} {} {} = {}", a, op, b, result);
    Ok(())
}

fn main() {
    if let Err(e) = run() {
        eprintln!("Error: {}", e);
        std::process::exit(1);
    }
}`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `cargo run -- 10 + 5
cargo run -- 10 / 0
cargo run -- 2 ^ 10
cargo run -- 15 % 7`,
        },
        {
          type: 'note',
          content: 'Notice how every error path is explicit and handled. The ? operator makes propagation clean without hiding anything. This is the Rust way: errors are values, not surprises.',
        },
      ],
    },
    {
      slug: 'collections-iterators',
      title: 'Collections & Iterators',
      intro: 'Rust\'s iterators are zero-cost: a chain of map, filter and sum compiles down to the same machine code as the hand-written loop, with none of the off-by-one risk.',
      sections: [
        {
          type: 'code',
          language: 'rust',
          content: `use std::collections::{HashMap, HashSet, BTreeMap, VecDeque};

fn main() {
    // Vec — growable array, the workhorse
    let mut nums = vec![3, 1, 4, 1, 5];
    nums.push(9);
    nums.sort();
    nums.dedup();
    println!("{:?}", nums);                 // [1, 3, 4, 5, 9]
    println!("{:?}", nums.first());         // Some(1)  — never panics
    println!("{:?}", nums.get(99));         // None     — unlike nums[99]

    // HashMap
    let mut scores: HashMap<String, i32> = HashMap::new();
    scores.insert("ada".to_string(), 10);

    // entry() is the idiomatic get-or-insert
    *scores.entry("ada".into()).or_insert(0) += 5;
    *scores.entry("bob".into()).or_insert(0) += 1;
    println!("{:?}", scores.get("ada"));    // Some(15)

    for (name, score) in &scores {
        println!("{name}: {score}");
    }

    // HashSet for membership, BTreeMap for sorted keys, VecDeque for a queue
    let seen: HashSet<i32> = nums.iter().copied().collect();
    let sorted: BTreeMap<&str, i32> = BTreeMap::from([("b", 2), ("a", 1)]);
    let mut queue: VecDeque<i32> = VecDeque::from([1, 2, 3]);
    queue.push_back(4);
    println!("{:?} {:?} {:?}", seen.contains(&4), sorted.keys().collect::<Vec<_>>(), queue.pop_front());
}`,
        },
        {
          type: 'code',
          language: 'rust',
          content: `#[derive(Debug, Clone)]
struct Order { customer: String, region: String, total: f64 }

fn main() {
    let orders = vec![
        Order { customer: "Ada".into(),  region: "EU".into(), total: 120.5 },
        Order { customer: "Bob".into(),  region: "US".into(), total: 45.0 },
        Order { customer: "Cleo".into(), region: "EU".into(), total: 310.75 },
    ];

    // Three ways to iterate — the difference is ownership:
    //   .iter()      -> &T      borrow each item
    //   .iter_mut()  -> &mut T  borrow mutably
    //   .into_iter() -> T       consume the collection
    let total: f64 = orders.iter().map(|o| o.total).sum();
    println!("{total:.2}");                          // 476.25

    let eu_names: Vec<&str> = orders
        .iter()
        .filter(|o| o.region == "EU")
        .map(|o| o.customer.as_str())
        .collect();
    println!("{eu_names:?}");                        // ["Ada", "Cleo"]

    // Nothing runs until a consuming adapter: collect, sum, count, for_each, fold
    let biggest = orders.iter().max_by(|a, b| a.total.total_cmp(&b.total));
    println!("{:?}", biggest.map(|o| &o.customer));

    let summary = orders.iter().fold(String::new(), |mut acc, o| {
        acc.push_str(&format!("{} ", o.customer));
        acc
    });
    println!("{}", summary.trim());
}`,
        },
        {
          type: 'code',
          language: 'rust',
          content: `use std::collections::HashMap;

fn main() {
    let words = ["apple", "banana", "avocado", "blueberry", "cherry"];

    // Grouping
    let mut by_letter: HashMap<char, Vec<&str>> = HashMap::new();
    for w in words {
        by_letter.entry(w.chars().next().unwrap()).or_default().push(w);
    }
    println!("{:?}", by_letter.get(&'a'));      // Some(["apple", "avocado"])

    // The adapters worth memorising
    let nums: Vec<i32> = (1..=10).collect();
    println!("{:?}", nums.iter().enumerate().take(2).collect::<Vec<_>>());
    println!("{:?}", nums.iter().zip("abc".chars()).collect::<Vec<_>>());
    println!("{:?}", nums.iter().skip(8).collect::<Vec<_>>());
    println!("{:?}", nums.chunks(3).next());
    println!("{:?}", nums.windows(2).next());
    println!("{}",   nums.iter().any(|&n| n > 9));
    println!("{}",   nums.iter().all(|&n| n > 0));
    println!("{:?}", nums.iter().position(|&n| n == 7));
    println!("{:?}", nums.iter().rev().take(3).collect::<Vec<_>>());

    // filter_map: filter and transform in one pass
    let inputs = ["1", "two", "3"];
    let parsed: Vec<i32> = inputs.iter().filter_map(|s| s.parse().ok()).collect();
    println!("{parsed:?}");                     // [1, 3]

    // collect into a Result: fails fast if ANY item fails
    let all: Result<Vec<i32>, _> = inputs.iter().map(|s| s.parse::<i32>()).collect();
    println!("{}", all.is_err());               // true
}`,
        },
        {
          type: 'tip',
          content: 'If the compiler cannot infer what collect() should build, tell it: either "let v: Vec<_> = ...collect();" or the turbofish "...collect::<Vec<_>>()". Both are common in real Rust code.',
        },
        {
          type: 'note',
          content: 'Indexing with nums[i] panics when out of range. nums.get(i) returns Option<&T> instead — prefer it anywhere the index comes from user input or arithmetic.',
        },
      ],
    },
    {
      slug: 'lifetimes-generics',
      title: 'Generics & Lifetimes',
      intro: 'Generics let one function serve many types; lifetimes let the compiler prove that every reference outlives the thing it points at. Lifetimes look alien for a week and then become invisible.',
      sections: [
        {
          type: 'code',
          language: 'rust',
          content: `use std::fmt::Display;

// Generic function with trait bounds
fn largest<T: PartialOrd + Copy>(items: &[T]) -> T {
    let mut best = items[0];
    for &item in items {
        if item > best { best = item; }
    }
    best
}

// where clauses keep complicated signatures readable
fn describe<T, U>(a: T, b: U) -> String
where
    T: Display + Clone,
    U: Display,
{
    format!("{a} and {b}")
}

// Generic struct with methods
struct Pair<T> { left: T, right: T }

impl<T: PartialOrd + Display> Pair<T> {
    fn new(left: T, right: T) -> Self { Self { left, right } }

    fn larger(&self) -> &T {
        if self.left > self.right { &self.left } else { &self.right }
    }
}

fn main() {
    println!("{}", largest(&[1, 5, 3]));
    println!("{}", largest(&[1.2, 0.4]));
    println!("{}", describe("x", 42));
    println!("{}", Pair::new(3, 9).larger());
}`,
        },
        {
          type: 'code',
          language: 'rust',
          content: `// A lifetime annotation does NOT change how long anything lives.
// It tells the compiler how the lifetimes of inputs and outputs RELATE.

// "The returned reference lives as long as the shorter of a and b."
fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() >= b.len() { a } else { b }
}

// Without the annotation the compiler cannot know which input the result
// borrows from, and refuses to compile.

// Structs holding references need a lifetime parameter
struct Parser<'a> {
    input: &'a str,
    position: usize,
}

impl<'a> Parser<'a> {
    fn new(input: &'a str) -> Self { Parser { input, position: 0 } }

    fn next_word(&mut self) -> Option<&'a str> {
        let rest = &self.input[self.position..];
        let trimmed = rest.trim_start();
        if trimmed.is_empty() { return None; }
        let skipped = rest.len() - trimmed.len();
        let end = trimmed.find(' ').unwrap_or(trimmed.len());
        self.position += skipped + end;
        Some(&trimmed[..end])
    }
}

fn main() {
    let text = String::from("hello brave new world");
    let mut parser = Parser::new(&text);
    while let Some(word) = parser.next_word() {
        println!("{word}");
    }
    println!("{}", longest("short", "much longer"));
}`,
        },
        {
          type: 'code',
          language: 'rust',
          content: `use std::fmt;

// Traits define shared behaviour; impl blocks provide it.
trait Shape {
    fn area(&self) -> f64;
    fn name(&self) -> String { "shape".to_string() }   // default method
}

struct Circle { radius: f64 }
struct Square { side: f64 }

impl Shape for Circle {
    fn area(&self) -> f64 { std::f64::consts::PI * self.radius * self.radius }
    fn name(&self) -> String { "circle".into() }
}
impl Shape for Square {
    fn area(&self) -> f64 { self.side * self.side }
}

// Static dispatch: one specialized copy per type, no runtime cost
fn print_area(shape: &impl Shape) { println!("{}: {:.2}", shape.name(), shape.area()); }

// Dynamic dispatch: one function, a vtable lookup at runtime — needed for mixed collections
fn total_area(shapes: &[Box<dyn Shape>]) -> f64 {
    shapes.iter().map(|s| s.area()).sum()
}

// Implementing standard traits unlocks language features
impl fmt::Display for Circle {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Circle(r={})", self.radius)
    }
}

fn main() {
    let shapes: Vec<Box<dyn Shape>> = vec![
        Box::new(Circle { radius: 1.0 }),
        Box::new(Square { side: 2.0 }),
    ];
    print_area(&Circle { radius: 2.0 });
    println!("{:.2}", total_area(&shapes));
    println!("{}", Circle { radius: 3.0 });
}`,
        },
        {
          type: 'note',
          content: 'Most functions need no lifetime annotations at all — the compiler elides them. You only write them when a function takes several references and returns one, or when a struct stores a reference.',
        },
        {
          type: 'tip',
          content: 'Fighting the borrow checker over a struct full of references? Storing owned values (String instead of &str, Vec<T> instead of &[T]) is usually the right call. Optimize to borrows later, once the design has settled.',
        },
      ],
    },
    {
      slug: 'modules-cargo',
      title: 'Modules, Crates & Cargo',
      intro: 'Cargo is build system, package manager, test runner and doc generator in one binary. Combined with the module system it makes Rust projects unusually consistent from repo to repo.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `cargo new myapp           # binary project
cargo new mylib --lib      # library project
cargo add serde --features derive
cargo add tokio --features full

cargo run                  # build + run (debug)
cargo build --release      # optimized build in target/release
cargo test                 # run all tests
cargo check                # type-check only, much faster than build
cargo clippy               # the linter. Listen to it, it is usually right.
cargo fmt                  # canonical formatting
cargo doc --open           # build and read your own API docs

# Cargo.toml
# [package]
# name = "myapp"
# version = "0.1.0"
# edition = "2021"
#
# [dependencies]
# serde = { version = "1", features = ["derive"] }
# anyhow = "1"
#
# [dev-dependencies]
# criterion = "0.5"`,
        },
        {
          type: 'code',
          language: 'rust',
          content: `// src/lib.rs — the crate root
pub mod store {                     // an inline module
    #[derive(Debug)]
    pub struct Item {
        pub name: String,           // pub on the field too, or it stays private
        quantity: u32,              // private to this module
    }

    impl Item {
        pub fn new(name: &str, quantity: u32) -> Self {
            Self { name: name.to_string(), quantity }
        }
        pub fn quantity(&self) -> u32 { self.quantity }
    }

    pub mod pricing {               // nested module
        pub fn with_tax(amount: f64) -> f64 { amount * 1.23 }

        pub(crate) fn internal_rate() -> f64 { 0.23 }   // visible inside this crate only
    }
}

// Bringing things into scope
use store::{Item, pricing::with_tax};

pub fn demo() {
    let item = Item::new("keyboard", 3);
    println!("{} x{} -> {:.2}", item.name, item.quantity(), with_tax(79.0));
}

// File-based modules: "mod store;" in lib.rs looks for
//   src/store.rs   or   src/store/mod.rs
// and nested modules live in src/store/pricing.rs`,
        },
        {
          type: 'code',
          language: 'rust',
          content: `/// Adds two numbers.
///
/// # Examples
///
/// \`\`\`
/// assert_eq!(myapp::add(2, 3), 5);
/// \`\`\`
pub fn add(a: i32, b: i32) -> i32 { a + b }

pub fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 { return Err("division by zero".into()); }
    Ok(a / b)
}

// Unit tests live in the same file, in a module compiled only for tests
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn adds_numbers() {
        assert_eq!(add(2, 3), 5);
    }

    #[test]
    fn divides() {
        assert!(divide(1.0, 0.0).is_err());
        assert_eq!(divide(10.0, 4.0).unwrap(), 2.5);
    }

    #[test]
    #[should_panic(expected = "index out of bounds")]
    fn panics_on_bad_index() {
        let v: Vec<i32> = vec![];
        let _ = v[0];
    }
}

// Integration tests go in tests/*.rs and see only the PUBLIC API.
// Doc examples in /// comments are compiled and run by "cargo test" too.`,
        },
        {
          type: 'note',
          content: 'Everything in Rust is private by default, including struct fields and enum-free functions. pub exposes an item to the parent module, pub(crate) to the whole crate, and plain pub in lib.rs to the outside world.',
        },
        {
          type: 'tip',
          content: 'Run cargo clippy before every commit. Its suggestions are not style nitpicks — it catches redundant clones, needless allocations and genuine logic errors.',
        },
      ],
    },
    {
      slug: 'concurrency-rust',
      title: 'Concurrency & Smart Pointers',
      intro: 'Rust calls this "fearless concurrency": data races are a compile error, not a production incident. The ownership rules you already learned are exactly what makes that possible.',
      sections: [
        {
          type: 'code',
          language: 'rust',
          content: `use std::thread;
use std::sync::mpsc;
use std::time::Duration;

fn main() {
    // Threads: move takes ownership of what the closure captures
    let data = vec![1, 2, 3];
    let handle = thread::spawn(move || {
        println!("{:?}", data);
        data.iter().sum::<i32>()
    });
    let sum = handle.join().unwrap();     // join returns the closure's value
    println!("sum = {sum}");

    // Channels: multiple producers, single consumer
    let (tx, rx) = mpsc::channel();
    for id in 0..3 {
        let tx = tx.clone();
        thread::spawn(move || {
            thread::sleep(Duration::from_millis(50 * id));
            tx.send(format!("worker {id} done")).unwrap();
        });
    }
    drop(tx);                              // drop the last sender so rx can finish

    for msg in rx {                        // iterates until every sender is gone
        println!("{msg}");
    }
}`,
        },
        {
          type: 'code',
          language: 'rust',
          content: `use std::sync::{Arc, Mutex, RwLock};
use std::thread;

fn main() {
    // Arc = Atomically Reference Counted: shared ownership across threads.
    // Mutex = mutual exclusion: one writer at a time.
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..8 {
        let counter = Arc::clone(&counter);     // clones the HANDLE, not the data
        handles.push(thread::spawn(move || {
            let mut n = counter.lock().unwrap(); // blocks until the lock is free
            *n += 1;
        }));                                     // lock released here, automatically
    }

    for h in handles { h.join().unwrap(); }
    println!("{}", *counter.lock().unwrap());    // always 8 — no race possible

    // RwLock: many readers OR one writer
    let cache = Arc::new(RwLock::new(vec!["a".to_string()]));
    {
        let read = cache.read().unwrap();
        println!("{}", read.len());
    }
    cache.write().unwrap().push("b".into());

    // Rc<RefCell<T>> is the single-threaded equivalent (Rc is not thread safe).
}`,
        },
        {
          type: 'code',
          language: 'rust',
          content: `use std::rc::Rc;
use std::cell::RefCell;

// Box<T>: a value on the heap. Needed for recursive types of unknown size.
#[derive(Debug)]
enum Tree {
    Leaf(i32),
    Node(Box<Tree>, Box<Tree>),
}

fn sum(tree: &Tree) -> i32 {
    match tree {
        Tree::Leaf(v) => *v,
        Tree::Node(l, r) => sum(l) + sum(r),
    }
}

// Rc<T>: shared ownership in one thread. RefCell<T>: borrow rules checked at RUNTIME.
#[derive(Debug)]
struct Account { balance: RefCell<f64> }

fn main() {
    let tree = Tree::Node(
        Box::new(Tree::Leaf(1)),
        Box::new(Tree::Node(Box::new(Tree::Leaf(2)), Box::new(Tree::Leaf(3)))),
    );
    println!("{}", sum(&tree));               // 6

    let account = Rc::new(Account { balance: RefCell::new(100.0) });
    let a = Rc::clone(&account);
    let b = Rc::clone(&account);

    *a.balance.borrow_mut() += 50.0;          // mutate through a shared reference
    *b.balance.borrow_mut() -= 20.0;

    println!("{} owners, balance {}", Rc::strong_count(&account), account.balance.borrow());
}`,
        },
        {
          type: 'warning',
          content: 'RefCell moves the borrow check from compile time to run time: two overlapping borrow_mut() calls panic with "already borrowed". Keep the borrow scopes as short as possible, and never hold one across a function call that might borrow again.',
        },
        {
          type: 'note',
          content: 'Send means a type can be moved to another thread; Sync means it can be shared by reference. The compiler derives both automatically, which is why Rc (not thread safe) simply will not compile inside thread::spawn while Arc will.',
        },
      ],
    },
  ],
}
