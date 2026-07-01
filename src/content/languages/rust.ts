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
  ],
}
