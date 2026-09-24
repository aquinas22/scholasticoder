import { Language } from '../types'

export const swift: Language = {
  slug: 'swift',
  name: 'Swift',
  tagline: 'Apple\'s language for building iPhone, iPad and Mac apps.',
  description: "Swift is Apple's language for apps on iPhone, iPad, Mac and its other devices. It is compiled and fast, its optionals catch missing-value errors at compile time, and with SwiftUI you can build app screens in a small amount of code.",
  accentColor: '#F05138',
  textOnAccent: '#fff',
  icon: 'Sw',
  difficulty: 'intermediate',
  usedFor: ['iOS Apps', 'macOS Apps', 'watchOS & tvOS', 'Server (Vapor)', 'App Store'],
  notableUsers: ['Apple', 'Airbnb', 'Lyft', 'LinkedIn', 'Duolingo'],
  setup: {
    description: "Building iOS apps requires Xcode, which only runs on a Mac. The language itself also runs on Linux and Windows, and the Swift Playgrounds app on iPad or Mac is a good way to learn.",
    windows: `# Swift toolchain for Windows exists (swift.org/install),
# but you cannot build iOS apps on Windows.
winget install Swift.Toolchain

swift --version
swift run          # in a package folder

# Realistic options for iOS without a Mac:
# - Swift Playgrounds on an iPad
# - online: swiftfiddle.com`,
    mac: `# Install Xcode from the App Store (includes everything):
xcode-select --install    # command line tools

swift --version
swift repl                # interactive
swift hello.swift         # run a script

# New executable project without Xcode:
mkdir hello && cd hello
swift package init --type executable
swift run`,
    linux: `# From https://swift.org/install — or:
curl -O https://download.swift.org/...   # see site for your distro

swift --version
swift hello.swift

# Note: Linux Swift is great for learning the language
# and server-side Swift, but iOS apps still require a Mac.`,
  },
  lessons: [
    {
      slug: 'hello-swift',
      title: 'Hello, Swift',
      intro: "Write and run your first Swift program and learn let, var and Swift's basic types. Swift has concise syntax with no semicolons, and it compiles to fast native code.",
      sections: [
        {
          type: 'code',
          language: 'swift',
          content: `// hello.swift — run with: swift hello.swift
print("Hello, World!")

let name = "Ada"        // let = constant (use by default)
var age = 17            // var = mutable
age = 18
// name = "Bob"         // error: 'name' is a let constant

print("I'm \\(name), age \\(age)")     // string interpolation
print("Next year: \\(age + 1)")`,
        },
        {
          type: 'text',
          content: "Types are inferred but static: let name = \"Ada\" is a String forever. Explicit annotations use a colon — let name: String = \"Ada\". As in Kotlin and Rust, prefer immutable (let) and reach for var only when mutation is the point.",
        },
        {
          type: 'code',
          language: 'swift',
          content: `let int: Int = 42
let double: Double = 3.14
let bool: Bool = true
let text: String = "hello"

// No implicit conversions — be explicit:
let sum = Double(int) + double

// Multi-line strings:
let poem = """
    Roses are red,
    Swift compiles too.
    """

// Type check and conversion:
type(of: int)               // Int
let parsed = Int("123")     // Int? — might fail! (next lesson)`,
        },
        {
          type: 'note',
          content: "Int(\"123\") returns Int? — an optional — because the string might not be a number. Swift makes every 'this could fail' visible in the type. That question mark is the heart of the language, and the next lesson.",
        },
      ],
    },
    {
      slug: 'optionals',
      title: 'Optionals',
      intro: "Learn optionals, Swift's way of handling values that might be missing. A String? is a different type from a String, and the compiler makes you handle the missing case before you use it.",
      sections: [
        {
          type: 'code',
          language: 'swift',
          content: `var nickname: String? = nil     // String? can hold nil
nickname = "Lovelace"

// print(nickname.count)  // error: must unwrap first

// if let — unwrap into a new constant if non-nil:
if let nick = nickname {
    print("Called \\(nick), \\(nick.count) letters")
} else {
    print("no nickname")
}

// Shorthand since Swift 5.7:
if let nickname {
    print(nickname.count)
}

// guard let — unwrap or bail out; great in functions:
func shout(_ word: String?) {
    guard let word else {
        print("nothing to shout")
        return
    }
    print(word.uppercased() + "!")   // 'word' is String here
}`,
        },
        {
          type: 'code',
          language: 'swift',
          content: `// Optional chaining — nil short-circuits the chain:
let length = nickname?.count            // Int?

// Nil-coalescing — default when nil:
let display = nickname ?? "anonymous"

// Force unwrap — crashes if nil. Avoid:
// let boom = nickname!.count

let maybeNumber = Int("42")
print(maybeNumber ?? 0)                 // 42`,
        },
        {
          type: 'warning',
          content: "The ! operator means 'crash if this is nil'. In app code there's nearly always a better shape: if let, guard let, ?? or ?. — reserve ! for cases where nil is provably impossible, and expect reviewers to question every one.",
        },
        {
          type: 'tip',
          content: "guard let is the idiomatic Swift function opener: check requirements at the top, exit early if unmet, and the rest of the function works with clean non-optional values. Deeply nested if-lets are a smell.",
        },
      ],
    },
    {
      slug: 'control-flow-functions',
      title: 'Functions & Control Flow',
      intro: "Learn how to write functions with argument labels, and how to branch with if and switch. Swift's switch can match ranges and patterns, so it often replaces long if-else chains.",
      sections: [
        {
          type: 'code',
          language: 'swift',
          content: `// Argument labels make call sites readable:
func greet(person: String, from hometown: String) -> String {
    return "Hello \\(person) from \\(hometown)!"
}
greet(person: "Ada", from: "London")

// _ removes the label; defaults work as expected:
func power(_ base: Int, to exponent: Int = 2) -> Int {
    var result = 1
    for _ in 0..<exponent { result *= base }
    return result
}
power(3)          // 9
power(2, to: 10)  // 1024

// Single-expression functions return implicitly:
func double(_ n: Int) -> Int { n * 2 }`,
        },
        {
          type: 'code',
          language: 'swift',
          content: `let grade = 87

// Ranges: ..< excludes the end, ... includes it
for i in 1...5 { print(i) }      // 1 2 3 4 5
for i in 0..<3 { print(i) }      // 0 1 2

// switch: no fallthrough, must be exhaustive,
// matches ranges, tuples, and patterns:
switch grade {
case 90...100:
    print("A")
case 80..<90:
    print("B")
case let g where g >= 70:
    print("C — specifically \\(g)")
default:
    print("study time")
}

let point = (x: 3, y: 0)
switch point {
case (0, 0):        print("origin")
case (_, 0):        print("on the x-axis")
case (0, _):        print("on the y-axis")
case (let x, let y): print("at \\(x), \\(y)")
}`,
        },
        {
          type: 'note',
          content: "Swift switch statements must cover every possible value — add default or cover all cases. Combined with enums (next lesson) the compiler literally tells you when you forgot to handle a case.",
        },
      ],
    },
    {
      slug: 'structs-enums',
      title: 'Structs, Enums & Value Types',
      intro: "Learn structs, enums and the difference between value and reference types. In Swift, structs are copied on assignment and are the usual choice, and enum cases can carry data.",
      sections: [
        {
          type: 'code',
          language: 'swift',
          content: `struct Student {
    let name: String
    var grade: Int = 0

    // Methods live inside; mutating ones must say so:
    mutating func improve(by points: Int) {
        grade += points
    }

    var letterGrade: String {        // computed property
        switch grade {
        case 90...: return "A"
        case 80...: return "B"
        default:    return "C"
        }
    }
}

var ada = Student(name: "Ada", grade: 88)   // free memberwise init
ada.improve(by: 7)
print(ada.letterGrade)      // A

// Value semantics — assignment copies:
var copy = ada
copy.grade = 0
print(ada.grade)            // still 95`,
        },
        {
          type: 'code',
          language: 'swift',
          content: `// Enums with associated values — model 'one of N shapes':
enum NetworkResult {
    case success(data: String)
    case failure(code: Int, message: String)
    case offline
}

func handle(_ result: NetworkResult) {
    switch result {
    case .success(let data):
        print("got \\(data)")
    case .failure(let code, let message):
        print("error \\(code): \\(message)")
    case .offline:
        print("no connection")
    }
}

handle(.failure(code: 404, message: "not found"))

// This is how Swift's own Optional works — it's just:
// enum Optional<T> { case some(T); case none }`,
        },
        {
          type: 'text',
          content: "Classes exist too (class Student { }) with inheritance and reference semantics — SwiftUI and most modern Swift use them sparingly. Protocols (Swift's interfaces) plus structs cover most designs: define capabilities as protocols, adopt them in small value types.",
        },
        {
          type: 'code',
          language: 'swift',
          content: `protocol Describable {
    var description: String { get }
}

struct Circle: Describable {
    let radius: Double
    var description: String { "circle r=\\(radius)" }
}

// Protocol extensions give default behavior to all adopters:
extension Describable {
    func shout() -> String { description.uppercased() }
}
print(Circle(radius: 2).shout())    // CIRCLE R=2.0`,
        },
      ],
    },
    {
      slug: 'collections-closures',
      title: 'Collections & Closures',
      intro: "Learn arrays, dictionaries and sets, and how to transform them with closures and map, filter and reduce, including the short $0 syntax.",
      sections: [
        {
          type: 'code',
          language: 'swift',
          content: `var fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits[0]                       // "apple"
fruits.count                    // 4
fruits.contains("banana")       // true

var ages = ["Ada": 17, "Alan": 16]
ages["Grace"] = 17              // insert
let adaAge = ages["Ada"]        // Int? — key might be missing!

let unique: Set = [1, 2, 2, 3]  // {1, 2, 3}

// let makes collections deeply immutable:
let locked = [1, 2, 3]
// locked.append(4)             // error`,
        },
        {
          type: 'code',
          language: 'swift',
          content: `let students = [
    (name: "Ada", grade: 95),
    (name: "Alan", grade: 88),
    (name: "Grace", grade: 92),
]

// Closures, from verbose to idiomatic:
let names1 = students.map({ (s: (name: String, grade: Int)) -> String in
    return s.name
})
let names2 = students.map { $0.name }    // same thing

let honorRoll = students
    .filter { $0.grade >= 90 }
    .map { $0.name }
    .sorted()                             // ["Ada", "Grace"]

let total = students.reduce(0) { $0 + $1.grade }
let best = students.max { $0.grade < $1.grade }

// sorted with a custom order:
let byGrade = students.sorted { $0.grade > $1.grade }`,
        },
        {
          type: 'tip',
          content: "$0, $1 are shorthand for the closure's first and second arguments, and trailing closures drop the parentheses — that's how map { $0.name } gets so compact. Fine for one-liners; name the parameters when the closure grows.",
        },
      ],
    },
    {
      slug: 'error-handling-async',
      title: 'Errors & async/await',
      intro: "Learn how to throw and handle errors and how to call asynchronous code with async/await. Swift marks both in the code: throws in a function signature and await at the call site.",
      sections: [
        {
          type: 'code',
          language: 'swift',
          content: `enum FileError: Error {
    case notFound(path: String)
    case noPermission
}

func read(file path: String) throws -> String {
    guard path.hasSuffix(".txt") else {
        throw FileError.notFound(path: path)
    }
    return "file contents"
}

// Callers must acknowledge the risk with 'try':
do {
    let text = try read(file: "notes.txt")
    print(text)
} catch FileError.notFound(let path) {
    print("missing: \\(path)")
} catch {
    print("other error: \\(error)")
}

let maybe = try? read(file: "bad.pdf")   // nil on failure`,
        },
        {
          type: 'code',
          language: 'swift',
          content: `// async/await — modern Swift concurrency:
struct User: Codable {
    let login: String
    let name: String?
}

func fetchUser(_ username: String) async throws -> User {
    let url = URL(string: "https://api.github.com/users/\\(username)")!
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode(User.self, from: data)
}

// Run concurrently with async let:
func fetchTwo() async throws {
    async let a = fetchUser("octocat")
    async let b = fetchUser("torvalds")
    let (first, second) = try await (a, b)
    print(first.login, second.login)
}`,
        },
        {
          type: 'note',
          content: "Codable is Swift's built-in JSON serialization: declare a struct matching the JSON's shape, and encoding/decoding is automatic. Combined with async/await, a typed network call is ~5 lines with zero libraries.",
        },
      ],
    },
    {
      slug: 'first-swiftui-app',
      title: 'Your First SwiftUI App',
      intro: "Build a simple counter app with SwiftUI. You describe screens as structs, and SwiftUI updates them when @State values change.",
      sections: [
        {
          type: 'code',
          language: 'swift',
          content: `// In Xcode: File -> New -> Project -> iOS App (SwiftUI)
import SwiftUI

struct ContentView: View {
    // @State: when this changes, the view re-renders.
    @State private var count = 0

    var body: some View {
        VStack(spacing: 16) {
            Text("Count: \\(count)")
                .font(.largeTitle)
                .bold()

            Button("Tap me") {
                count += 1
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}`,
        },
        {
          type: 'text',
          content: "body describes what the screen looks like for the current state — you never manually update views. Change count, and SwiftUI diffs and redraws. VStack stacks vertically, HStack horizontally, and modifiers like .font() chain to style anything.",
        },
        {
          type: 'code',
          language: 'swift',
          content: `// Lists and navigation — the skeleton of most iOS apps:
struct Student: Identifiable {
    let id = UUID()
    let name: String
    let grade: Int
}

struct StudentListView: View {
    let students = [
        Student(name: "Ada", grade: 95),
        Student(name: "Alan", grade: 88),
        Student(name: "Grace", grade: 92),
    ]

    var body: some View {
        NavigationStack {
            List(students) { student in
                NavigationLink(student.name) {
                    VStack {
                        Text(student.name).font(.title)
                        Text("Grade: \\(student.grade)%")
                            .foregroundStyle(.secondary)
                    }
                }
            }
            .navigationTitle("Students")
        }
    }
}`,
        },
        {
          type: 'tip',
          content: "Press ⌘R to run in the iOS Simulator — no iPhone needed. Apple's free 'Develop in Swift' tutorials and Hacking with Swift's 100 Days of SwiftUI are the two best next steps.",
        },
      ],
    },
  ],
}
