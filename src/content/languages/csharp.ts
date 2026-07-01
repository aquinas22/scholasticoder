import { Language } from '../types'

export const csharp: Language = {
  slug: 'csharp',
  name: 'C#',
  tagline: 'Java, but Microsoft-flavored. Honestly, quite good.',
  description: 'C# is a modern, statically typed language from Microsoft built on the .NET platform. It\'s the language of Unity game development, Windows desktop apps, and enterprise backends. It evolves rapidly and has some genuinely excellent features.',
  accentColor: '#512BD4',
  textOnAccent: '#fff',
  icon: 'C#',
  difficulty: 'intermediate',
  usedFor: ['Unity Game Dev', 'ASP.NET Web Apps', 'Windows Desktop', 'Enterprise Software'],
  notableUsers: ['Microsoft', 'Unity Technologies', 'Stack Overflow', 'Adobe (Substance)'],
  setup: {
    description: 'C# runs on .NET, which is now cross-platform (Linux, macOS, Windows). Install the .NET SDK and you\'re ready to go.',
    windows: `# Download the .NET SDK from dotnet.microsoft.com
# Or via winget:
winget install Microsoft.DotNet.SDK.8

# Verify:
dotnet --version

# Create and run a new project:
dotnet new console -n MyApp
cd MyApp
dotnet run`,
    mac: `# Via Homebrew:
brew install dotnet-sdk

# Or download from dotnet.microsoft.com

# Verify:
dotnet --version`,
    linux: `# Ubuntu / Debian:
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt update && sudo apt install dotnet-sdk-8.0

# Fedora:
sudo dnf install dotnet-sdk-8.0

# Verify:
dotnet --version`,
  },
  lessons: [
    {
      slug: 'hello-world',
      title: 'Hello, World!',
      intro: 'C# has evolved dramatically. Modern C# (12+) lets you write Hello World in one line. Old C# needed a class, a namespace, and a static void Main. We\'ll show both, but live in the modern world.',
      sections: [
        {
          type: 'text',
          content: 'Modern C# (9+) supports "top-level statements" — you can write code directly without wrapping it in a class. The compiler generates the boilerplate for you. For reference, we\'ll also show the traditional form.',
        },
        {
          type: 'code',
          language: 'csharp',
          content: `// Modern C# (top-level statements) — Program.cs
Console.WriteLine("Hello, World!");`,
        },
        {
          type: 'code',
          language: 'csharp',
          content: `// Traditional form (still valid, required in some contexts)
using System;

namespace HelloApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
            Console.WriteLine("My name is {0} and I am {1}.", "Alice", 30);

            // String interpolation (modern, preferred)
            string name = "World";
            Console.WriteLine($"Hello, {name}!");
            Console.WriteLine($"2 + 2 = {2 + 2}");

            // Console.Write — no newline
            Console.Write("Loading");
            Console.Write("...");
            Console.WriteLine("done!");
        }
    }
}`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `dotnet new console -n HelloWorld
cd HelloWorld
# Edit Program.cs, then:
dotnet run`,
        },
        {
          type: 'note',
          content: 'C# files have the .cs extension. A C# project is defined by a .csproj file. dotnet run handles compilation and execution. For production builds, use dotnet build then dotnet <project>.dll.',
        },
      ],
    },
    {
      slug: 'variables-types',
      title: 'Variables & Types',
      intro: 'C# has a rich type system with value types, reference types, and nullable types. It\'s verbose in the old style but quite clean with var and modern inference.',
      sections: [
        {
          type: 'code',
          language: 'csharp',
          content: `// Value types (stored on stack)
int i = 42;
double d = 3.14159;
float f = 3.14f;
bool b = true;
char c = 'A';
decimal money = 99.99m;  // use decimal for financial calculations!
long big = 9_999_999_999L;

// Reference types (stored on heap)
string name = "Alice";
string? nullable = null;  // nullable reference type (C# 8+)

// var — type inference (compiler figures out the type)
var count = 10;         // int
var pi = 3.14;          // double
var greeting = "hello"; // string

// const and readonly
const int MaxRetries = 3;          // compile-time constant
readonly int instanceMax;          // set once in constructor

// String operations
string first = "Hello";
string combined = first + " World";
string interpolated = $"The answer is {42}";
string verbatim = @"C:\\Users\\Alice";  // no escape sequences
string multi = @"Line 1
Line 2
Line 3";

Console.WriteLine(name.Length);         // 5
Console.WriteLine(name.ToUpper());      // ALICE
Console.WriteLine(name.Contains("li")); // True
Console.WriteLine(name.Replace("i", "I")); // AlIce

// Nullable value types
int? maybeNull = null;
int value = maybeNull ?? 0;  // null-coalescing: use 0 if null
Console.WriteLine(value);    // 0`,
        },
        {
          type: 'text',
          content: 'C# distinguishes between value types (int, double, bool, struct) and reference types (class, string, arrays). Value types are copied on assignment; reference types share the same underlying data.',
        },
        {
          type: 'code',
          language: 'csharp',
          content: `// Type conversion
int n = 42;
double d = n;              // implicit widening
int back = (int)3.99;      // explicit cast: truncates to 3
string s = n.ToString();   // int to string
int parsed = int.Parse("42");  // string to int (throws if invalid)
bool ok = int.TryParse("abc", out int result);  // safe parse
Console.WriteLine(ok);     // False

// Tuples (C# 7+)
(string name, int age) person = ("Alice", 30);
Console.WriteLine(person.name);  // Alice

var (n2, a2) = person;  // deconstruct
Console.WriteLine(n2);  // Alice`,
        },
        {
          type: 'warning',
          content: 'Use decimal, not double, for money and financial calculations. double has floating-point precision issues: 0.1 + 0.2 != 0.3. decimal has more precision and exact decimal representation.',
        },
      ],
    },
    {
      slug: 'control-flow',
      title: 'Control Flow',
      intro: 'C# control flow is classic C-family. The highlight is pattern matching in switch statements, which is genuinely one of C#\'s best features.',
      sections: [
        {
          type: 'code',
          language: 'csharp',
          content: `int score = 85;

// if/else if/else
if (score >= 90) Console.WriteLine("A");
else if (score >= 80) Console.WriteLine("B");
else if (score >= 70) Console.WriteLine("C");
else Console.WriteLine("Try harder");

// Ternary
string grade = score >= 60 ? "Pass" : "Fail";

// switch with pattern matching (C# 7+)
object shape = "circle";

string desc = shape switch {
    "circle"    => "Round thing",
    "square"    => "Four equal sides",
    int n when n > 0 => $"Positive number: {n}",
    null        => "Nothing",
    _           => "Unknown"   // default
};
Console.WriteLine(desc);

// Classic switch
int day = 2;
switch (day) {
    case 1:
        Console.WriteLine("Monday"); break;
    case 6:
    case 7:
        Console.WriteLine("Weekend"); break;
    default:
        Console.WriteLine("Weekday"); break;
}`,
        },
        {
          type: 'code',
          language: 'csharp',
          content: `// for loop
for (int i = 0; i < 5; i++) {
    Console.Write($"{i} ");
}
Console.WriteLine();

// foreach — iterate over collections
string[] fruits = { "apple", "banana", "cherry" };
foreach (string fruit in fruits) {
    Console.WriteLine(fruit);
}

// while
int n = 10;
while (n > 0) {
    Console.Write($"{n} ");
    n -= 3;
}

// LINQ — Language Integrated Query (C#'s killer feature)
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
var evens = numbers.Where(n => n % 2 == 0);
var squares = numbers.Select(n => n * n);
var evenSquares = numbers.Where(n => n % 2 == 0).Select(n => n * n);
int sum = numbers.Sum();
int max = numbers.Max();

foreach (int n2 in evenSquares) {
    Console.Write($"{n2} ");   // 4 16 36 64 100
}`,
        },
        {
          type: 'note',
          content: 'LINQ (Language Integrated Query) is one of C#\'s most powerful features. It lets you query collections (and databases, and XML) using a uniform syntax. Learn it — you\'ll use it constantly.',
        },
      ],
    },
    {
      slug: 'methods',
      title: 'Methods & Properties',
      intro: 'In C#, properties are special class members that look like fields but act like methods. They\'re how you do encapsulation without writing getBlah()/setBlah() everywhere.',
      sections: [
        {
          type: 'code',
          language: 'csharp',
          content: `// Methods
int Add(int a, int b) => a + b;   // expression-bodied (C# 6+)

string Greet(string name, string title = "friend") {
    return $"Hello, {title} {name}!";
}

// Out parameters
bool TryDivide(double a, double b, out double result) {
    if (b == 0) { result = 0; return false; }
    result = a / b;
    return true;
}

// Params — variable arguments
int Sum(params int[] numbers) {
    int total = 0;
    foreach (int n in numbers) total += n;
    return total;
}

// Extension methods — add methods to existing types
static class StringExtensions {
    public static string Capitalize(this string s) {
        if (string.IsNullOrEmpty(s)) return s;
        return char.ToUpper(s[0]) + s[1..];
    }
}

// Usage:
Console.WriteLine(Add(3, 4));             // 7
Console.WriteLine(Greet("Alice"));        // Hello, friend Alice!
Console.WriteLine(Greet("Smith", "Dr.")); // Hello, Dr. Smith!

if (TryDivide(10, 3, out double r)) {
    Console.WriteLine($"{r:F4}");  // 3.3333
}

Console.WriteLine(Sum(1, 2, 3, 4, 5));   // 15
Console.WriteLine("hello".Capitalize());  // Hello`,
        },
        {
          type: 'code',
          language: 'csharp',
          content: `class Temperature {
    private double celsius;

    // Auto-property (no backing field needed)
    public string Unit { get; set; } = "Celsius";

    // Property with getter and setter
    public double Celsius {
        get => celsius;
        set {
            if (value < -273.15)
                throw new ArgumentOutOfRangeException("Below absolute zero!");
            celsius = value;
        }
    }

    // Computed property (getter only)
    public double Fahrenheit => celsius * 9 / 5 + 32;
    public double Kelvin => celsius + 273.15;

    public Temperature(double celsius) {
        Celsius = celsius;
    }

    public override string ToString() =>
        $"{Celsius}°C / {Fahrenheit:F1}°F / {Kelvin:F1}K";
}

var t = new Temperature(100);
Console.WriteLine(t);           // 100°C / 212.0°F / 373.1K
Console.WriteLine(t.Fahrenheit); // 212
t.Celsius = 0;
Console.WriteLine(t.Kelvin);     // 273.15`,
        },
      ],
    },
    {
      slug: 'collections',
      title: 'Collections',
      intro: 'C# has a rich set of collection types in System.Collections.Generic. List<T> is your workhorse.',
      sections: [
        {
          type: 'code',
          language: 'csharp',
          content: `using System.Collections.Generic;

// List<T> — dynamic array
List<string> fruits = new() { "apple", "banana", "cherry" };
fruits.Add("date");
fruits.Remove("banana");
fruits.Insert(0, "avocado");
Console.WriteLine(fruits.Count);       // 4
Console.WriteLine(fruits.Contains("apple")); // True
fruits.Sort();
Console.WriteLine(string.Join(", ", fruits)); // apple, avocado, cherry, date

// Dictionary<TKey, TValue>
Dictionary<string, int> scores = new() {
    ["Alice"] = 95,
    ["Bob"] = 87,
};
scores["Carol"] = 92;
scores["Alice"] = 98;  // update

if (scores.TryGetValue("Dave", out int daveScore)) {
    Console.WriteLine(daveScore);
} else {
    Console.WriteLine("Dave not found");
}

foreach (var (name, score) in scores) {
    Console.WriteLine($"{name}: {score}");
}

// HashSet<T> — unique values
HashSet<int> set = new() { 1, 2, 3, 2, 1 };  // duplicates removed
Console.WriteLine(set.Count);  // 3

// Queue<T> and Stack<T>
Queue<string> queue = new();
queue.Enqueue("first");
queue.Enqueue("second");
Console.WriteLine(queue.Dequeue());  // first

Stack<int> stack = new();
stack.Push(1); stack.Push(2); stack.Push(3);
Console.WriteLine(stack.Pop());  // 3 (LIFO)`,
        },
        {
          type: 'note',
          content: 'new() — called "target-typed new expression" (C# 9+) — infers the type from the variable declaration. List<string> fruits = new(); is cleaner than List<string> fruits = new List<string>();',
        },
      ],
    },
    {
      slug: 'classes-oop',
      title: 'Classes & OOP',
      intro: 'C# is a thoroughly object-oriented language. Classes, inheritance, interfaces, abstract classes — it\'s all here, and it\'s well-designed.',
      sections: [
        {
          type: 'code',
          language: 'csharp',
          content: `// Abstract base class
abstract class Animal {
    public string Name { get; init; }  // init: set only at construction

    protected Animal(string name) { Name = name; }

    public abstract string Speak();  // must be overridden

    public virtual string Describe() =>  // can be overridden
        $"{Name} says '{Speak()}'";
}

// Interface
interface ITrainable {
    void Train(string trick);
    IEnumerable<string> GetTricks();
}

// Concrete class
class Dog : Animal, ITrainable {
    private readonly List<string> tricks = new();

    public Dog(string name) : base(name) {}

    public override string Speak() => "Woof!";

    public void Train(string trick) => tricks.Add(trick);
    public IEnumerable<string> GetTricks() => tricks;

    // Override and extend
    public override string Describe() =>
        base.Describe() + $" (knows {tricks.Count} tricks)";
}

// Record — immutable data class (C# 9+)
record Point(double X, double Y) {
    public double Distance => Math.Sqrt(X * X + Y * Y);
}

// Usage
Dog dog = new("Rex");
dog.Train("sit");
dog.Train("shake");
Console.WriteLine(dog.Describe());

// Polymorphism
Animal animal = dog;  // Dog is an Animal
Console.WriteLine(animal.Speak());  // Woof!

// Record usage
var p = new Point(3, 4);
Console.WriteLine(p.Distance);     // 5

// Records are immutable — create modified copies with 'with'
var p2 = p with { X = 0 };
Console.WriteLine(p2);  // Point { X = 0, Y = 4 }`,
        },
      ],
    },
    {
      slug: 'async',
      title: 'LINQ & Async/Await',
      intro: 'LINQ is what makes C# shine for data manipulation. async/await is what makes C# shine for I/O. Together they\'re unstoppable.',
      sections: [
        {
          type: 'code',
          language: 'csharp',
          content: `using System.Linq;
using System.Net.Http;
using System.Text.Json;

// LINQ examples
int[] numbers = Enumerable.Range(1, 20).ToArray();

var evenSquares = numbers
    .Where(n => n % 2 == 0)
    .Select(n => n * n)
    .ToList();

Console.WriteLine(string.Join(", ", evenSquares));
// 4, 16, 36, 64, 100, 144, 196, 256, 324, 400

// Group by
string[] words = { "apple", "ant", "bear", "banana", "cat", "cherry" };
var grouped = words.GroupBy(w => w[0]);
foreach (var group in grouped) {
    Console.WriteLine($"{group.Key}: {string.Join(", ", group)}");
}
// a: apple, ant
// b: bear, banana
// c: cat, cherry

// Order by multiple fields
var people = new[] {
    new { Name = "Alice", Age = 30 },
    new { Name = "Bob", Age = 25 },
    new { Name = "Carol", Age = 30 },
};
var sorted = people.OrderBy(p => p.Age).ThenBy(p => p.Name);
foreach (var p in sorted) {
    Console.WriteLine($"{p.Name}: {p.Age}");
}`,
        },
        {
          type: 'code',
          language: 'csharp',
          content: `// async/await — non-blocking I/O
using System.Net.Http;
using System.Net.Http.Json;

async Task<string> FetchAsync(string url) {
    using var client = new HttpClient();
    return await client.GetStringAsync(url);
}

async Task<T?> FetchJsonAsync<T>(string url) {
    using var client = new HttpClient();
    return await client.GetFromJsonAsync<T>(url);
}

// Run multiple tasks in parallel
async Task Main() {
    var tasks = new[] {
        FetchAsync("https://httpbin.org/get"),
        FetchAsync("https://httpbin.org/ip"),
    };

    string[] results = await Task.WhenAll(tasks);
    foreach (var result in results) {
        Console.WriteLine(result[..100]);  // first 100 chars
    }
}

await Main();`,
        },
        {
          type: 'note',
          content: 'In C# console apps with top-level statements, you can use await directly at the top level. In older style code, the Main method must be async Task Main(). Either way, async/await is the standard for any I/O operation.',
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: Simple Calculator',
      intro: 'A console calculator that evaluates expressions and tracks history, using everything we\'ve covered.',
      sections: [
        {
          type: 'code',
          language: 'csharp',
          content: `using System.Text.RegularExpressions;

class Calculator {
    private readonly List<string> history = new();

    public double Evaluate(string expression) {
        // Match: number operator number (simple two-operand expressions)
        var match = Regex.Match(expression.Trim(),
            @"^(-?\d+\.?\d*)\s*([+\-*/^%])\s*(-?\d+\.?\d*)$");

        if (!match.Success)
            throw new FormatException($"Invalid expression: '{expression}'");

        double a = double.Parse(match.Groups[1].Value);
        char op = match.Groups[2].Value[0];
        double b = double.Parse(match.Groups[3].Value);

        double result = op switch {
            '+' => a + b,
            '-' => a - b,
            '*' => a * b,
            '/' => b == 0 ? throw new DivideByZeroException() : a / b,
            '%' => a % b,
            '^' => Math.Pow(a, b),
            _ => throw new InvalidOperationException($"Unknown operator: {op}")
        };

        string entry = $"{expression} = {result}";
        history.Add(entry);
        return result;
    }

    public void PrintHistory() {
        if (history.Count == 0) { Console.WriteLine("No history."); return; }
        Console.WriteLine("\n=== Calculation History ===");
        foreach (var (item, i) in history.Select((x, i) => (x, i + 1))) {
            Console.WriteLine($"  {i}. {item}");
        }
    }
}

var calc = new Calculator();
Console.WriteLine("Calculator — type expressions like '10 + 5', or 'history', or 'quit'");

while (true) {
    Console.Write("> ");
    string? input = Console.ReadLine()?.Trim();
    if (string.IsNullOrEmpty(input)) continue;
    if (input == "quit" || input == "exit") break;
    if (input == "history") { calc.PrintHistory(); continue; }

    try {
        double result = calc.Evaluate(input);
        Console.WriteLine($"= {result}");
    } catch (Exception ex) {
        Console.WriteLine($"Error: {ex.Message}");
    }
}`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `dotnet run

# Then type expressions:
# 10 + 5
# 2 ^ 10
# 100 / 4
# history
# quit`,
        },
      ],
    },
  ],
}
