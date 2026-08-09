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
    {
      slug: 'goroutines-channels',
      title: 'Goroutines & Channels',
      intro: 'A goroutine costs a couple of kilobytes, so starting ten thousand is normal. Channels are how they talk: "do not communicate by sharing memory; share memory by communicating."',
      sections: [
        {
          type: 'code',
          language: 'go',
          content: `package main

import (
	"fmt"
	"sync"
	"time"
)

func worker(id int, wg *sync.WaitGroup) {
	defer wg.Done()               // signal completion no matter how we return
	time.Sleep(100 * time.Millisecond)
	fmt.Printf("worker %d finished\\n", id)
}

func main() {
	var wg sync.WaitGroup

	for i := 1; i <= 5; i++ {
		wg.Add(1)                 // count BEFORE starting the goroutine
		go worker(i, &wg)         // "go" runs it concurrently
	}

	wg.Wait()                     // block until every Done() has been called
	fmt.Println("all done")

	// Without the WaitGroup, main would exit immediately and kill every
	// goroutine mid-flight. Nothing waits for a goroutine automatically.
}`,
        },
        {
          type: 'code',
          language: 'go',
          content: `package main

import "fmt"

func main() {
	// Unbuffered channel: a send blocks until a receiver is ready.
	done := make(chan string)
	go func() { done <- "finished" }()
	fmt.Println(<-done)

	// Buffered channel: sends succeed until the buffer is full.
	jobs := make(chan int, 100)
	results := make(chan int, 100)

	// Worker pool — three goroutines sharing one queue of work
	for w := 1; w <= 3; w++ {
		go func(id int) {
			for j := range jobs {          // ranges until jobs is closed
				results <- j * j
			}
		}(w)
	}

	for i := 1; i <= 9; i++ {
		jobs <- i
	}
	close(jobs)                            // tells the workers no more work is coming

	total := 0
	for i := 0; i < 9; i++ {
		total += <-results
	}
	fmt.Println(total)                     // 285

	// Direction in the signature documents intent and is compiler-checked
	// func produce(out chan<- int)   send-only
	// func consume(in <-chan int)    receive-only
}`,
        },
        {
          type: 'code',
          language: 'go',
          content: `package main

import (
	"context"
	"errors"
	"fmt"
	"time"
)

// select waits on several channels at once
func race(a, b <-chan string) string {
	select {
	case msg := <-a:
		return "a: " + msg
	case msg := <-b:
		return "b: " + msg
	case <-time.After(2 * time.Second):
		return "timeout"
	}
}

// context is how you cancel work in Go: pass it as the FIRST parameter.
func fetch(ctx context.Context, url string) (string, error) {
	select {
	case <-time.After(500 * time.Millisecond):     // pretend this is a network call
		return "body of " + url, nil
	case <-ctx.Done():
		return "", ctx.Err()                       // context canceled / deadline exceeded
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
	defer cancel()                                 // always cancel to release resources

	if _, err := fetch(ctx, "/slow"); errors.Is(err, context.DeadlineExceeded) {
		fmt.Println("gave up:", err)
	}

	// Mutex when a channel would be overkill (a shared counter, a cache)
	// var mu sync.Mutex; mu.Lock(); defer mu.Unlock()
}`,
        },
        {
          type: 'warning',
          content: 'Run your tests with "go test -race". The race detector finds unsynchronized access to shared variables that will otherwise corrupt data intermittently in production and never reproduce on your laptop.',
        },
        {
          type: 'note',
          content: 'Deadlock rules: receiving from a channel nobody sends to blocks forever; sending on a full or unbuffered channel with no receiver blocks forever; closing a channel twice, or sending on a closed channel, panics. Only the sender should ever close a channel.',
        },
      ],
    },
    {
      slug: 'errors-and-testing',
      title: 'Errors, Panics & Testing',
      intro: 'Go has no exceptions. Errors are ordinary values returned alongside results, checked with an if, and wrapped as they travel up. It is more typing and far fewer surprises.',
      sections: [
        {
          type: 'code',
          language: 'go',
          content: `package main

import (
	"errors"
	"fmt"
	"os"
)

// Sentinel errors — comparable values callers can test for
var ErrNotFound = errors.New("not found")

// Custom error types carry structured detail
type ValidationError struct {
	Field  string
	Reason string
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("field %q is invalid: %s", e.Field, e.Reason)
}

func findUser(id int) (string, error) {
	users := map[int]string{1: "Ada"}
	name, ok := users[id]
	if !ok {
		return "", fmt.Errorf("findUser %d: %w", id, ErrNotFound)   // %w wraps
	}
	return name, nil
}

func main() {
	_, err := findUser(99)

	// errors.Is unwraps the chain looking for a specific value
	if errors.Is(err, ErrNotFound) {
		fmt.Println("no such user")
	}

	// errors.As unwraps looking for a specific TYPE, and binds it
	var verr *ValidationError
	if errors.As(err, &verr) {
		fmt.Println("bad field:", verr.Field)
	}

	if _, err := os.Open("missing.txt"); errors.Is(err, os.ErrNotExist) {
		fmt.Println("file is not there")
	}
}`,
        },
        {
          type: 'code',
          language: 'go',
          content: `package main

import (
	"fmt"
	"os"
)

// defer runs when the function returns — even on panic. LIFO order.
func processFile(path string) (err error) {
	f, err := os.Open(path)
	if err != nil {
		return fmt.Errorf("open %s: %w", path, err)
	}
	defer f.Close()                 // guaranteed cleanup

	// Named return + recover turns a panic back into an error
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("recovered: %v", r)
		}
	}()

	// ... work that might panic ...
	return nil
}

// Panic is for programmer error and unrecoverable state, NOT control flow.
func mustPositive(n int) int {
	if n <= 0 {
		panic("n must be positive")     // a bug in the caller, not a runtime condition
	}
	return n
}

func main() {
	if err := processFile("nope.txt"); err != nil {
		fmt.Println("error:", err)
	}
}`,
        },
        {
          type: 'code',
          language: 'go',
          content: `// calc.go
package calc

import "errors"

func Add(a, b int) int { return a + b }

func Divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("division by zero")
	}
	return a / b, nil
}

// calc_test.go — file name must end in _test.go
package calc

import "testing"

func TestAdd(t *testing.T) {
	if got := Add(2, 3); got != 5 {
		t.Errorf("Add(2,3) = %d, want 5", got)
	}
}

// Table-driven tests are the Go idiom
func TestDivide(t *testing.T) {
	tests := []struct {
		name    string
		a, b    float64
		want    float64
		wantErr bool
	}{
		{"simple", 10, 2, 5, false},
		{"fraction", 1, 4, 0.25, false},
		{"by zero", 1, 0, 0, true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {      // subtest: named, isolated
			got, err := Divide(tt.a, tt.b)
			if (err != nil) != tt.wantErr {
				t.Fatalf("unexpected error state: %v", err)
			}
			if !tt.wantErr && got != tt.want {
				t.Errorf("got %v, want %v", got, tt.want)
			}
		})
	}
}

func BenchmarkAdd(b *testing.B) {
	for i := 0; i < b.N; i++ { Add(1, 2) }
}

// go test ./...            run everything
// go test -v -run Divide   verbose, only matching tests
// go test -cover           coverage
// go test -race            race detector`,
        },
        {
          type: 'tip',
          content: 'Wrap errors with context as they travel up: fmt.Errorf("loading config: %w", err). By the time the error is printed at the top you get "starting server: loading config: open config.yaml: no such file" — a stack trace made of sentences.',
        },
        {
          type: 'warning',
          content: 'Never ignore an error with _ unless you can explain why in a comment. "if err != nil { return err }" everywhere looks repetitive precisely because Go makes you see every place something can fail.',
        },
      ],
    },
    {
      slug: 'packages-modules',
      title: 'Packages, Modules & the Standard Library',
      intro: 'Go\'s build system is refreshingly small: one go.mod file, one command, no plugin configuration. Get the layout right and everything else follows.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `# Start a module — the path is normally the repo URL
go mod init github.com/you/myapp

# Add a dependency (or just import it and run go mod tidy)
go get github.com/google/uuid
go mod tidy          # add what is imported, remove what is not

go run ./cmd/server  # compile and run
go build ./...       # build everything
go test ./...        # test everything
go vet ./...         # catch suspicious constructs
gofmt -w .           # formatting is not a debate in Go

# A conventional layout
# myapp/
#   go.mod
#   cmd/server/main.go       package main — the entry point
#   internal/store/store.go  importable ONLY inside this module
#   pkg/api/client.go        intended for outside consumers
#   go.sum                   checksums, commit this file`,
        },
        {
          type: 'code',
          language: 'go',
          content: `// internal/store/store.go
package store          // package name = directory name, lowercase, no underscores

import "errors"

// Exported: capital letter. Unexported: lowercase, package-private.
var ErrMissing = errors.New("store: key missing")

type Store struct {
	data map[string]string     // unexported field — callers cannot touch it
}

func New() *Store {            // constructor convention: New / NewX
	return &Store{data: make(map[string]string)}
}

func (s *Store) Set(key, value string) { s.data[key] = value }

func (s *Store) Get(key string) (string, error) {
	v, ok := s.data[key]
	if !ok {
		return "", ErrMissing
	}
	return v, nil
}

// cmd/server/main.go
package main

import (
	"fmt"
	"github.com/you/myapp/internal/store"
)

func main() {
	s := store.New()
	s.Set("greeting", "hello")
	v, _ := s.Get("greeting")
	fmt.Println(v)
}`,
        },
        {
          type: 'code',
          language: 'go',
          content: `package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"
)

type Todo struct {
	ID    int    \`json:"id"\`
	Title string \`json:"title"\`
	Done  bool   \`json:"done,omitempty"\`   // struct tags control JSON names
}

func main() {
	// encoding/json
	data, _ := json.Marshal(Todo{ID: 1, Title: "Learn Go"})
	fmt.Println(string(data))               // {"id":1,"title":"Learn Go"}

	var t Todo
	json.Unmarshal([]byte(\`{"id":2,"title":"Ship it","done":true}\`), &t)

	// net/http server in six lines — no framework required
	mux := http.NewServeMux()
	mux.HandleFunc("GET /todos/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := r.PathValue("id")
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Todo{ID: 1, Title: "todo " + id})
	})
	srv := &http.Server{Addr: ":8080", Handler: mux, ReadTimeout: 5 * time.Second}
	go srv.ListenAndServe()

	// strings, os and friends
	fmt.Println(strings.Join([]string{"a", "b"}, "-"))
	fmt.Println(strings.HasPrefix("golang", "go"))
	fmt.Println(os.Getenv("HOME"))
}`,
        },
        {
          type: 'note',
          content: 'Anything under a directory named internal/ can only be imported by code inside the same module. It is the compiler-enforced way to say "this is not part of my public API" — use it generously.',
        },
        {
          type: 'tip',
          content: 'Go\'s standard library covers HTTP servers and clients, JSON, templates, crypto, compression and testing. Check it before adding a dependency; most Go services run on the standard library plus two or three packages.',
        },
      ],
    },
    {
      slug: 'generics-go',
      title: 'Generics',
      intro: 'Since Go 1.18 you can write one function that works for many types without interface{} and type assertions. Generics in Go are deliberately plain — type parameters and constraints, nothing more.',
      sections: [
        {
          type: 'code',
          language: 'go',
          content: `package main

import (
	"fmt"
	"cmp"
)

// [T any] declares a type parameter. any is an alias for interface{}.
func Map[T, U any](items []T, fn func(T) U) []U {
	out := make([]U, 0, len(items))
	for _, item := range items {
		out = append(out, fn(item))
	}
	return out
}

func Filter[T any](items []T, keep func(T) bool) []T {
	var out []T
	for _, item := range items {
		if keep(item) {
			out = append(out, item)
		}
	}
	return out
}

func Reduce[T, A any](items []T, initial A, fn func(A, T) A) A {
	acc := initial
	for _, item := range items {
		acc = fn(acc, item)
	}
	return acc
}

func main() {
	nums := []int{1, 2, 3, 4, 5}

	doubled := Map(nums, func(n int) int { return n * 2 })
	labels := Map(nums, func(n int) string { return fmt.Sprintf("#%d", n) })
	evens := Filter(nums, func(n int) bool { return n%2 == 0 })
	sum := Reduce(nums, 0, func(a, n int) int { return a + n })

	fmt.Println(doubled, labels, evens, sum)
}`,
        },
        {
          type: 'code',
          language: 'go',
          content: `package main

import (
	"cmp"
	"fmt"
	"golang.org/x/exp/constraints"    // or declare your own constraint
)

// A constraint is an interface listing the permitted types.
type Number interface {
	~int | ~int64 | ~float32 | ~float64      // ~ also allows named types with that base
}

func Sum[T Number](values []T) T {
	var total T                              // zero value of whatever T is
	for _, v := range values {
		total += v
	}
	return total
}

// cmp.Ordered covers every type supporting < and >
func Max[T cmp.Ordered](values []T) (T, bool) {
	var zero T
	if len(values) == 0 {
		return zero, false
	}
	best := values[0]
	for _, v := range values[1:] {
		if v > best {
			best = v
		}
	}
	return best, true
}

func main() {
	fmt.Println(Sum([]int{1, 2, 3}))            // 6
	fmt.Println(Sum([]float64{1.5, 2.5}))       // 4
	fmt.Println(Max([]string{"b", "a", "c"}))   // c true
}`,
        },
        {
          type: 'code',
          language: 'go',
          content: `package main

import (
	"fmt"
	"sync"
)

// Generic types: a type-safe, concurrency-safe cache
type Cache[K comparable, V any] struct {
	mu    sync.RWMutex
	items map[K]V
}

func NewCache[K comparable, V any]() *Cache[K, V] {
	return &Cache[K, V]{items: make(map[K]V)}
}

func (c *Cache[K, V]) Set(key K, value V) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.items[key] = value
}

func (c *Cache[K, V]) Get(key K) (V, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	v, ok := c.items[key]
	return v, ok
}

// A generic stack
type Stack[T any] struct{ items []T }

func (s *Stack[T]) Push(v T) { s.items = append(s.items, v) }
func (s *Stack[T]) Pop() (T, bool) {
	var zero T
	if len(s.items) == 0 {
		return zero, false
	}
	v := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	return v, true
}

func main() {
	c := NewCache[string, int]()
	c.Set("hits", 42)
	fmt.Println(c.Get("hits"))       // 42 true

	var s Stack[string]
	s.Push("a"); s.Push("b")
	fmt.Println(s.Pop())             // b true
}`,
        },
        {
          type: 'note',
          content: 'comparable is the constraint for anything usable as a map key or with ==. Slices, maps and functions are not comparable, so Cache[[]byte, V] will not compile.',
        },
        {
          type: 'tip',
          content: 'Go\'s culture is to reach for generics only when a concrete type or an interface genuinely will not do. The standard slices and maps packages already provide sorted, contains, keys and clone — check those before writing your own.',
        },
      ],
    },
  ],
}
