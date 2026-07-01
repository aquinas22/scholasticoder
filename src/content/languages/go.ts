import { Language } from '../types'

export const go: Language = {
  slug: 'go',
  name: 'Go',
  tagline: 'Simple by design. Boring on purpose. Runs on everything.',
  description: 'Go (Golang) is a statically typed, compiled language designed at Google. It prioritizes simplicity and readability. There are usually only one or two ways to do anything — and the Go team considers this a feature, not a limitation.',
  accentColor: '#00ADD8',
  textOnAccent: '#fff',
  icon: 'Go',
  difficulty: 'intermediate',
  usedFor: ['Backend Services', 'CLIs', 'Kubernetes / DevOps', 'Microservices', 'Networking'],
  notableUsers: ['Google', 'Docker', 'Kubernetes', 'Cloudflare', 'Dropbox'],
  setup: {
    description: 'Go has a single, straightforward installer and one of the best tooling experiences in the ecosystem.',
    windows: `# Download the Windows installer from go.dev/dl
# Run the .msi — it handles PATH setup automatically

# Or via winget:
winget install GoLang.Go

# Verify:
go version`,
    mac: `# Option 1: Homebrew
brew install go

# Option 2: Download the .pkg installer from go.dev/dl

# Verify:
go version`,
    linux: `# Download and install:
wget https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz

# Add to PATH in ~/.bashrc or ~/.zshrc:
export PATH=$PATH:/usr/local/go/bin

source ~/.bashrc

# Verify:
go version`,
  },
  lessons: [
    {
      slug: 'hello-world',
      title: 'Hello, World!',
      intro: 'Go\'s Hello World is famously minimal. Package declaration, one import, one function. That\'s the whole language in microcosm.',
      sections: [
        {
          type: 'text',
          content: 'Every Go file starts with a package declaration. The main package is the entry point for executables. fmt is the standard library package for formatted I/O. Every Go program that prints something will import fmt.',
        },
        {
          type: 'code',
          language: 'go',
          content: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
        },
        {
          type: 'text',
          content: 'Save as hello.go and run with go run hello.go. To compile a binary: go build hello.go, then ./hello. Go compiles fast — fast enough that go run feels instant.',
        },
        {
          type: 'code',
          language: 'go',
          content: `package main

import "fmt"

func main() {
    // Println adds a newline
    fmt.Println("Hello, World!")

    // Printf — C-style formatted output
    name := "Alice"
    age := 30
    fmt.Printf("Name: %s, Age: %d\\n", name, age)

    // Sprintf — returns a string instead of printing
    s := fmt.Sprintf("Hello, %s!", name)
    fmt.Println(s)

    // %v — default format (works for anything)
    nums := []int{1, 2, 3}
    fmt.Printf("%v\\n", nums)   // [1 2 3]

    // %T — type of value
    fmt.Printf("%T\\n", 42)    // int
    fmt.Printf("%T\\n", nums)  // []int
}`,
        },
        {
          type: 'note',
          content: 'Go enforces that all imports are used. If you import a package and don\'t use it, your code won\'t compile. Same for declared variables — unused variables are compile errors. Go takes "clean code" literally.',
        },
      ],
    },
    {
      slug: 'variables-types',
      title: 'Variables & Types',
      intro: 'Go is statically typed, but it has type inference. You get the safety of static types without the verbosity. Usually.',
      sections: [
        {
          type: 'code',
          language: 'go',
          content: `package main

import "fmt"

func main() {
    // Long form: var name type = value
    var name string = "Alice"
    var age int = 30

    // Short form: := infers the type (most common inside functions)
    city := "Paris"
    pi := 3.14159

    // Zero values — Go initializes everything
    var i int       // 0
    var f float64   // 0.0
    var b bool      // false
    var s string    // ""
    fmt.Println(i, f, b, s)

    // Multiple assignment
    x, y := 1, 2
    x, y = y, x  // swap
    fmt.Println(x, y)

    // Constants
    const MaxSize = 1024
    const Pi = 3.14159
    const Greeting = "Hello"

    // iota — auto-incrementing constant
    const (
        Sunday = iota  // 0
        Monday         // 1
        Tuesday        // 2
        Wednesday      // 3
    )

    fmt.Println(name, age, city, pi)
    fmt.Println(Sunday, Monday, Tuesday, Wednesday)
}`,
        },
        {
          type: 'code',
          language: 'go',
          content: `package main

import "fmt"

func main() {
    // Basic types
    var i8 int8 = 127         // -128 to 127
    var i32 int32 = 2147483647
    var u64 uint64 = 18446744073709551615
    var f32 float32 = 3.14
    var f64 float64 = 3.141592653589793

    // Type conversion must be explicit
    var x int = 42
    var y float64 = float64(x)  // explicit conversion required
    var z int = int(y)

    // Strings
    s := "Hello, 世界"
    fmt.Println(len(s))         // byte count (not rune count!)
    fmt.Println([]rune(s))      // convert to rune (Unicode codepoints)

    // String concatenation
    first := "Hello"
    second := "World"
    combined := first + ", " + second + "!"
    fmt.Println(combined)

    // Rune (unicode codepoint)
    r := 'A'   // rune (int32)
    fmt.Printf("%c %d\\n", r, r)   // A 65

    _ = i8; _ = i32; _ = u64; _ = f32; _ = f64; _ = z  // avoid "declared and not used"
}`,
        },
        {
          type: 'note',
          content: 'Go has no implicit type conversion. Ever. int(x) and float64(y) are required everywhere. This catches bugs but requires more typing. The Go team considers this a worthwhile tradeoff.',
        },
      ],
    },
    {
      slug: 'control-flow',
      title: 'Control Flow',
      intro: 'Go\'s for loop is its only loop. No while, no do-while. Just for, wearing three different costumes.',
      sections: [
        {
          type: 'code',
          language: 'go',
          content: `package main

import "fmt"

func main() {
    // if/else — no parentheses around condition
    x := 42
    if x > 100 {
        fmt.Println("large")
    } else if x > 10 {
        fmt.Println("medium")
    } else {
        fmt.Println("small")
    }

    // if with initialization statement
    if n := computeSomething(); n > 0 {
        fmt.Println("positive:", n)
    } else {
        fmt.Println("non-positive:", n)
    }

    // switch — no fallthrough by default (unlike C)
    day := "Monday"
    switch day {
    case "Saturday", "Sunday":
        fmt.Println("weekend")
    case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday":
        fmt.Println("weekday")
    default:
        fmt.Println("unknown")
    }

    // switch with no condition (like if/else chain)
    n := 7
    switch {
    case n < 0:
        fmt.Println("negative")
    case n == 0:
        fmt.Println("zero")
    default:
        fmt.Println("positive")
    }
}

func computeSomething() int { return 42 }`,
        },
        {
          type: 'code',
          language: 'go',
          content: `package main

import "fmt"

func main() {
    // Classic for loop
    for i := 0; i < 5; i++ {
        fmt.Println(i)
    }

    // for as while
    n := 0
    for n < 10 {
        n += 3
    }
    fmt.Println(n)   // 12

    // Infinite loop
    // for {
    //     // break out when ready
    //     break
    // }

    // for range — iterate over slices, maps, strings
    fruits := []string{"apple", "banana", "cherry"}
    for i, v := range fruits {
        fmt.Printf("%d: %s\\n", i, v)
    }

    // Ignore index with _
    for _, fruit := range fruits {
        fmt.Println(fruit)
    }

    // Range over a map
    capitals := map[string]string{
        "France": "Paris",
        "Japan":  "Tokyo",
        "UK":     "London",
    }
    for country, capital := range capitals {
        fmt.Printf("%s -> %s\\n", country, capital)
    }

    // Range over a string (yields runes)
    for i, r := range "Hello" {
        fmt.Printf("%d: %c\\n", i, r)
    }
}`,
        },
      ],
    },
    {
      slug: 'functions',
      title: 'Functions & Multiple Returns',
      intro: 'Go functions can return multiple values. This is how Go does error handling, and it\'s a genuinely elegant design.',
      sections: [
        {
          type: 'code',
          language: 'go',
          content: `package main

import (
    "errors"
    "fmt"
    "math"
)

// Basic function
func add(a, b int) int {
    return a + b
}

// Multiple return values — the Go idiom for error handling
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

// Named return values
func minMax(nums []int) (min, max int) {
    min, max = nums[0], nums[0]
    for _, n := range nums[1:] {
        if n < min { min = n }
        if n > max { max = n }
    }
    return  // "naked" return — returns named values
}

// Variadic function
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

// Function as a value
func apply(f func(float64) float64, x float64) float64 {
    return f(x)
}

func main() {
    fmt.Println(add(3, 4))   // 7

    result, err := divide(10, 3)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("%.4f\\n", result)  // 3.3333
    }

    lo, hi := minMax([]int{3, 1, 4, 1, 5, 9, 2, 6})
    fmt.Println(lo, hi)   // 1 9

    fmt.Println(sum(1, 2, 3, 4, 5))   // 15

    // Passing a function
    fmt.Printf("%.4f\\n", apply(math.Sqrt, 16))  // 4.0000

    // Anonymous function / closure
    multiplier := func(factor float64) func(float64) float64 {
        return func(x float64) float64 {
            return x * factor
        }
    }
    double := multiplier(2)
    triple := multiplier(3)
    fmt.Println(double(5), triple(5))  // 10 15
}`,
        },
        {
          type: 'note',
          content: 'The (value, error) return pattern is idiomatic Go. Always check the error before using the value. result, _ := divide(10, 3) silently ignores errors — acceptable in scripts, bad in production code.',
        },
      ],
    },
    {
      slug: 'slices-maps',
      title: 'Slices & Maps',
      intro: 'Go\'s two primary collection types. Slices are dynamic arrays. Maps are hash tables. Together they cover nearly everything.',
      sections: [
        {
          type: 'code',
          language: 'go',
          content: `package main

import (
    "fmt"
    "sort"
)

func main() {
    // Slices (dynamic arrays)
    nums := []int{1, 2, 3, 4, 5}
    fmt.Println(nums[0])          // 1
    fmt.Println(nums[1:3])        // [2 3]
    fmt.Println(len(nums))        // 5
    fmt.Println(cap(nums))        // capacity (may be > len)

    // append — may reallocate
    nums = append(nums, 6, 7, 8)
    fmt.Println(nums)   // [1 2 3 4 5 6 7 8]

    // Spread operator for appending a slice
    more := []int{9, 10}
    nums = append(nums, more...)

    // make — allocate with size and capacity
    s := make([]int, 5)      // len=5, all zeros
    s2 := make([]int, 0, 10) // len=0, cap=10

    // copy
    src := []int{1, 2, 3}
    dst := make([]int, len(src))
    copy(dst, src)

    // 2D slice
    matrix := [][]int{
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9},
    }
    fmt.Println(matrix[1][2])   // 6

    // Sorting
    data := []int{5, 2, 8, 1, 9, 3}
    sort.Ints(data)
    fmt.Println(data)   // [1 2 3 5 8 9]

    words := []string{"banana", "apple", "cherry"}
    sort.Strings(words)
    fmt.Println(words)  // [apple banana cherry]

    _ = s; _ = s2
}`,
        },
        {
          type: 'code',
          language: 'go',
          content: `package main

import "fmt"

func main() {
    // Maps (hash tables)
    ages := map[string]int{
        "Alice": 30,
        "Bob":   25,
        "Carol": 35,
    }

    fmt.Println(ages["Alice"])   // 30

    // Check if key exists
    age, ok := ages["Dave"]
    if !ok {
        fmt.Println("Dave not found")
    }
    _ = age

    // Add and update
    ages["Dave"] = 28
    ages["Alice"] = 31  // update

    // Delete
    delete(ages, "Bob")

    // Iterate (order is random)
    for name, age := range ages {
        fmt.Printf("%s: %d\\n", name, age)
    }

    // Map of slices
    groups := map[string][]string{
        "fruits":     {"apple", "banana", "cherry"},
        "vegetables": {"carrot", "broccoli"},
    }
    groups["fruits"] = append(groups["fruits"], "date")
    fmt.Println(groups)

    // make a map
    m := make(map[string]int)
    m["key"] = 42
    fmt.Println(m)
}`,
        },
        {
          type: 'warning',
          content: 'Slices are reference types — assigning a slice to another variable does not copy the data; both point to the same underlying array. Use copy() or append([]int{}, src...) to make an independent copy.',
        },
      ],
    },
    {
      slug: 'structs-interfaces',
      title: 'Structs & Interfaces',
      intro: 'Go favors composition over inheritance. There are no classes, no extends. Just structs, methods, and interfaces. It\'s refreshingly simple.',
      sections: [
        {
          type: 'code',
          language: 'go',
          content: `package main

import (
    "fmt"
    "math"
)

// Struct definition
type Point struct {
    X, Y float64
}

// Method on a struct (pointer receiver enables mutation)
func (p *Point) Scale(factor float64) {
    p.X *= factor
    p.Y *= factor
}

// Value receiver (doesn't mutate)
func (p Point) Distance() float64 {
    return math.Sqrt(p.X*p.X + p.Y*p.Y)
}

func (p Point) String() string {
    return fmt.Sprintf("(%.2f, %.2f)", p.X, p.Y)
}

// Embedding (composition)
type ColoredPoint struct {
    Point          // embed Point — gets all its methods
    Color string
}

// Interface — any type with these methods satisfies it
type Shape interface {
    Area() float64
    Perimeter() float64
}

type Circle struct{ Radius float64 }
type Rect struct{ Width, Height float64 }

func (c Circle) Area() float64 { return math.Pi * c.Radius * c.Radius }
func (c Circle) Perimeter() float64 { return 2 * math.Pi * c.Radius }
func (r Rect) Area() float64 { return r.Width * r.Height }
func (r Rect) Perimeter() float64 { return 2 * (r.Width + r.Height) }

func printShapeInfo(s Shape) {
    fmt.Printf("Area: %.2f, Perimeter: %.2f\\n", s.Area(), s.Perimeter())
}

func main() {
    p := Point{3, 4}
    fmt.Println(p.Distance())   // 5

    p.Scale(2)
    fmt.Println(p)              // (6.00, 8.00)

    cp := ColoredPoint{Point: Point{1, 2}, Color: "red"}
    fmt.Println(cp.Distance())  // 2.23... (method promoted from Point)

    shapes := []Shape{
        Circle{Radius: 5},
        Rect{Width: 4, Height: 6},
    }
    for _, s := range shapes {
        printShapeInfo(s)
    }
}`,
        },
        {
          type: 'note',
          content: 'In Go, interfaces are satisfied implicitly — a type doesn\'t declare that it implements an interface. If it has the right methods, it satisfies the interface. This is called structural typing and keeps code decoupled.',
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: HTTP Server',
      intro: 'Go\'s standard library includes a production-quality HTTP server. No frameworks needed for the basics. Let\'s build one.',
      sections: [
        {
          type: 'code',
          language: 'go',
          content: `package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "strconv"
    "sync"
    "time"
)

type Task struct {
    ID        int       \`json:"id"\`
    Text      string    \`json:"text"\`
    Done      bool      \`json:"done"\`
    CreatedAt time.Time \`json:"created_at"\`
}

type Store struct {
    mu     sync.Mutex
    tasks  []Task
    nextID int
}

func (s *Store) Add(text string) Task {
    s.mu.Lock()
    defer s.mu.Unlock()
    s.nextID++
    t := Task{ID: s.nextID, Text: text, Done: false, CreatedAt: time.Now()}
    s.tasks = append(s.tasks, t)
    return t
}

func (s *Store) List() []Task {
    s.mu.Lock()
    defer s.mu.Unlock()
    result := make([]Task, len(s.tasks))
    copy(result, s.tasks)
    return result
}

func (s *Store) Complete(id int) bool {
    s.mu.Lock()
    defer s.mu.Unlock()
    for i := range s.tasks {
        if s.tasks[i].ID == id {
            s.tasks[i].Done = true
            return true
        }
    }
    return false
}

func writeJSON(w http.ResponseWriter, status int, v any) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(v)
}

func main() {
    store := &Store{nextID: 0}

    http.HandleFunc("GET /tasks", func(w http.ResponseWriter, r *http.Request) {
        writeJSON(w, http.StatusOK, store.List())
    })

    http.HandleFunc("POST /tasks", func(w http.ResponseWriter, r *http.Request) {
        var body struct{ Text string \`json:"text"\` }
        if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
            http.Error(w, "Bad request", http.StatusBadRequest)
            return
        }
        task := store.Add(body.Text)
        writeJSON(w, http.StatusCreated, task)
    })

    http.HandleFunc("PUT /tasks/{id}/done", func(w http.ResponseWriter, r *http.Request) {
        id, err := strconv.Atoi(r.PathValue("id"))
        if err != nil {
            http.Error(w, "Invalid ID", http.StatusBadRequest)
            return
        }
        if !store.Complete(id) {
            http.Error(w, "Not found", http.StatusNotFound)
            return
        }
        writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
    })

    addr := ":8080"
    fmt.Printf("Server running on http://localhost%s\\n", addr)
    log.Fatal(http.ListenAndServe(addr, nil))
}`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `go run main.go

# In another terminal:
curl -X POST http://localhost:8080/tasks -H "Content-Type: application/json" -d '{"text":"Learn Go"}'
curl http://localhost:8080/tasks
curl -X PUT http://localhost:8080/tasks/1/done`,
        },
        {
          type: 'note',
          content: 'sync.Mutex protects the task list from concurrent access. Go servers handle each request in its own goroutine, so shared state must be protected. This is a simple example — production code would use a database.',
        },
      ],
    },
  ],
}
