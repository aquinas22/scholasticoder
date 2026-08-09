import { Language } from '../types'

export const cpp: Language = {
  slug: 'cpp',
  name: 'C++',
  tagline: 'C, but with more ways to shoot yourself in the foot. And classes.',
  description: 'C++ is C with object-oriented programming, templates, and a standard library that actually does things. It\'s complex, but it\'s used for game engines, browsers, trading systems, and anything where performance is non-negotiable.',
  accentColor: '#00599C',
  textOnAccent: '#fff',
  icon: 'C++',
  difficulty: 'advanced',
  usedFor: ['Game Engines', 'High-Frequency Trading', 'Browsers', 'Compilers', 'Embedded Systems'],
  notableUsers: ['Adobe', 'Google Chrome', 'Microsoft Office', 'Unreal Engine', 'MySQL'],
  setup: {
    description: 'C++ uses the same compilers as C. GCC, Clang, and MSVC all support C++. Use the g++ or clang++ commands instead of gcc/cc.',
    windows: `# Same options as C — install GCC via MSYS2 or use Visual Studio
# With MSYS2:
pacman -S mingw-w64-ucrt-x86_64-gcc

# Use g++ to compile C++:
g++ hello.cpp -o hello -std=c++17

# Visual Studio (MSVC):
# cl /std:c++17 hello.cpp`,
    mac: `# Xcode Command Line Tools includes clang++:
xcode-select --install

# Compile:
clang++ -std=c++17 hello.cpp -o hello
# or:
g++ -std=c++17 hello.cpp -o hello`,
    linux: `# Debian / Ubuntu:
sudo apt install g++ build-essential

# Compile:
g++ -std=c++17 hello.cpp -o hello

# For C++20:
g++ -std=c++20 hello.cpp -o hello`,
  },
  lessons: [
    {
      slug: 'hello-world',
      title: 'Hello, World!',
      intro: 'C++ Hello World has a critical upgrade over C\'s version: it uses cout instead of printf, and the difference reveals everything about the two languages.',
      sections: [
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>
#include <string>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
        },
        {
          type: 'text',
          content: 'cout is the standard output stream. << is the stream insertion operator — it "inserts" data into the stream. endl flushes the buffer and adds a newline (use "\\n" instead for performance in tight loops). std:: is the standard library namespace.',
        },
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>
#include <string>
using namespace std;  // now you can write cout instead of std::cout

int main() {
    cout << "Hello, World!" << "\\n";

    string name = "Alice";
    int age = 30;

    // Chain multiple insertions
    cout << "Name: " << name << ", Age: " << age << "\\n";

    // endl vs "\\n"
    // endl: flushes buffer (slower, use when you need immediate output)
    // "\\n": just a newline (faster)
    cout << "Fast newline\\n";
    cout << "Flushed output" << endl;

    // Input with cin
    // cout << "Enter your name: ";
    // string input;
    // cin >> input;   // reads one word
    // getline(cin, input);  // reads full line

    return 0;
}`,
        },
        {
          type: 'note',
          content: 'using namespace std; saves typing but pollutes the global namespace. In small programs and student code it\'s fine. In larger codebases, be explicit: std::cout, std::string, etc.',
        },
      ],
    },
    {
      slug: 'variables-types',
      title: 'Variables & Types',
      intro: 'C++ inherits all of C\'s types and adds a bunch of its own. The good news: you\'ll mostly use int, double, string, and bool.',
      sections: [
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Fundamental types (same as C)
    int i = 42;
    double d = 3.14159;
    float f = 3.14f;
    bool b = true;
    char c = 'A';
    long long ll = 1234567890LL;

    // C++ adds: string (not a char array)
    string name = "Alice";          // no buffer size needed
    string greeting = "Hello, " + name + "!";  // concatenation with +
    cout << greeting << "\n";
    cout << "Length: " << name.length() << "\n";  // 5

    // auto — type inference (C++11)
    auto x = 42;        // int
    auto y = 3.14;      // double
    auto z = "hello";   // const char*
    auto s = string("hello");  // std::string

    // const
    const int MAX = 100;
    const double PI = 3.14159265358979;

    // References — alias for another variable
    int original = 10;
    int& ref = original;  // ref IS original
    ref = 99;
    cout << original << "\n";  // 99 — original changed through ref

    cout << i << " " << d << " " << b << "\n";
    return 0;
}`,
        },
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    // std::vector — dynamic array (the C++ way to use arrays)
    vector<int> nums = {1, 2, 3, 4, 5};
    nums.push_back(6);
    nums.pop_back();

    cout << nums[0] << "\n";        // 1
    cout << nums.size() << "\n";    // 5
    cout << nums.front() << "\n";   // 1
    cout << nums.back() << "\n";    // 5

    // Range-based for loop (C++11)
    for (int n : nums) {
        cout << n << " ";
    }
    cout << "\n";

    // Vector of strings
    vector<string> fruits = {"apple", "banana", "cherry"};
    fruits.push_back("date");
    for (const string& f : fruits) {   // const& to avoid copying
        cout << f << "\n";
    }

    return 0;
}`,
        },
      ],
    },
    {
      slug: 'control-flow',
      title: 'Control Flow',
      intro: 'Same as C, with a few quality-of-life improvements. The range-based for loop alone is worth learning C++.',
      sections: [
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    // if/else — same as C, but condition can initialize
    int score = 85;
    if (score >= 90) cout << "A\n";
    else if (score >= 80) cout << "B\n";
    else if (score >= 70) cout << "C\n";
    else cout << "Lower\n";

    // C++17: if with initializer
    if (int n = score / 10; n >= 9) {
        cout << "Excellent\n";
    } else {
        cout << "Grade: " << n << "\n";
    }

    // Range-based for — iterate without index
    vector<int> numbers = {1, 2, 3, 4, 5};
    for (int n : numbers) {
        cout << n << " ";
    }
    cout << "\n";

    // Classic for — when you need the index
    for (size_t i = 0; i < numbers.size(); i++) {
        cout << "numbers[" << i << "] = " << numbers[i] << "\n";
    }

    // While
    int countdown = 5;
    while (countdown > 0) {
        cout << countdown-- << " ";
    }
    cout << "\n";

    // Switch with strings (C++17 — actually, C++ switch doesn't work on strings)
    // Use if/else for string comparison
    string day = "Monday";
    if (day == "Saturday" || day == "Sunday") {
        cout << "Weekend!\n";
    } else {
        cout << "Weekday.\n";
    }

    return 0;
}`,
        },
      ],
    },
    {
      slug: 'functions',
      title: 'Functions & References',
      intro: 'C++ functions add default arguments, function overloading, and references — things C wishes it had.',
      sections: [
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Default arguments
string greet(const string& name, const string& title = "friend") {
    return "Hello, " + title + " " + name + "!";
}

// Function overloading — same name, different parameter types
double area(double radius) {
    return 3.14159 * radius * radius;
}

double area(double width, double height) {
    return width * height;
}

// Pass by reference — modifies the original
void increment(int& n) {
    n++;
}

// Pass by const reference — read-only, no copy
void printVec(const vector<int>& v) {
    for (int n : v) cout << n << " ";
    cout << "\n";
}

// Template function — works with any comparable type
template<typename T>
T maxOf(T a, T b) {
    return a > b ? a : b;
}

int main() {
    cout << greet("Alice") << "\n";           // Hello, friend Alice!
    cout << greet("Smith", "Dr.") << "\n";    // Hello, Dr. Smith!

    cout << area(5.0) << "\n";       // circle: 78.5398
    cout << area(4.0, 6.0) << "\n";  // rect: 24

    int x = 10;
    increment(x);
    cout << x << "\n";  // 11

    vector<int> nums = {1, 2, 3, 4, 5};
    printVec(nums);

    cout << maxOf(3, 7) << "\n";          // 7 (int)
    cout << maxOf(3.14, 2.71) << "\n";    // 3.14 (double)
    cout << maxOf(string("a"), string("z")) << "\n";  // z (string)

    return 0;
}`,
        },
        {
          type: 'note',
          content: 'Pass large objects (like vector or string) by const reference — const vector<int>&. This avoids copying the entire object. Pass small types (int, double, char) by value — copying them is cheap.',
        },
      ],
    },
    {
      slug: 'classes',
      title: 'Classes & OOP',
      intro: 'Here\'s the part that justified calling C++ "C with classes." The original name, by the way, was actually "C with Classes." Creative bunch.',
      sections: [
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>
#include <string>
#include <cmath>
using namespace std;

class Shape {
public:
    virtual double area() const = 0;      // pure virtual
    virtual double perimeter() const = 0;  // pure virtual
    virtual void describe() const {        // virtual with default
        cout << "Shape with area " << area() << "\n";
    }
    virtual ~Shape() = default;  // always have virtual destructor
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}  // initializer list

    double area() const override {
        return M_PI * radius * radius;
    }
    double perimeter() const override {
        return 2 * M_PI * radius;
    }
    void describe() const override {
        cout << "Circle(r=" << radius << ") area=" << area() << "\n";
    }
};

class Rectangle : public Shape {
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}

    double area() const override { return width * height; }
    double perimeter() const override { return 2 * (width + height); }
};

int main() {
    // Polymorphism via pointers/references
    Shape* shapes[] = {
        new Circle(5.0),
        new Rectangle(4.0, 6.0),
        new Circle(3.0),
    };

    for (Shape* s : shapes) {
        s->describe();
        cout << "  Perimeter: " << s->perimeter() << "\n";
    }

    for (Shape* s : shapes) delete s;  // clean up
    return 0;
}`,
        },
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
    string owner;
    double balance;

public:
    // Constructor
    BankAccount(const string& name, double initialBalance = 0.0)
        : owner(name), balance(initialBalance) {}

    // Getter (const — doesn't modify the object)
    double getBalance() const { return balance; }
    const string& getOwner() const { return owner; }

    // Methods
    bool deposit(double amount) {
        if (amount <= 0) return false;
        balance += amount;
        return true;
    }

    bool withdraw(double amount) {
        if (amount <= 0 || amount > balance) return false;
        balance -= amount;
        return true;
    }

    void print() const {
        cout << owner << ": $" << balance << "\n";
    }
};

int main() {
    BankAccount acc("Alice", 1000.0);
    acc.deposit(500);
    acc.withdraw(200);
    acc.print();  // Alice: $1300

    if (!acc.withdraw(9999)) {
        cout << "Insufficient funds\n";
    }

    return 0;
}`,
        },
      ],
    },
    {
      slug: 'stl',
      title: 'STL Containers',
      intro: 'The Standard Template Library is C++\'s collection of containers and algorithms. It\'s massive, powerful, and the reason you don\'t have to implement your own linked list.',
      sections: [
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>
#include <vector>
#include <map>
#include <set>
#include <unordered_map>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    // vector — dynamic array
    vector<int> v = {5, 2, 8, 1, 9, 3};
    sort(v.begin(), v.end());
    cout << "Sorted: ";
    for (int n : v) cout << n << " ";
    cout << "\n";  // 1 2 3 5 8 9

    int total = accumulate(v.begin(), v.end(), 0);
    cout << "Sum: " << total << "\n";  // 28

    auto it = find(v.begin(), v.end(), 5);
    cout << "5 found: " << (it != v.end()) << "\n";  // 1 (true)

    // map — sorted key-value pairs
    map<string, int> scores;
    scores["Alice"] = 95;
    scores["Bob"] = 87;
    scores["Carol"] = 92;

    for (const auto& [name, score] : scores) {
        cout << name << ": " << score << "\n";  // alphabetical order
    }

    // unordered_map — hash table, O(1) lookup, no order
    unordered_map<string, int> fast_scores = {
        {"Alice", 95}, {"Bob", 87}
    };

    // set — sorted unique elements
    set<int> unique = {5, 3, 1, 4, 1, 5, 9, 2, 6};  // duplicates removed
    cout << "Set: ";
    for (int n : unique) cout << n << " ";  // 1 2 3 4 5 6 9
    cout << "\n";

    return 0;
}`,
        },
        {
          type: 'note',
          content: 'Use vector for most things. Use map when you need sorted iteration or don\'t care about lookup speed. Use unordered_map when you need fast (O(1)) lookup and don\'t care about order. Use set for unique sorted collections.',
        },
      ],
    },
    {
      slug: 'error-handling',
      title: 'Error Handling & Exceptions',
      intro: 'C++ uses exceptions for error handling. They\'re controversial in some circles — many game engines and embedded systems disable them. Know them anyway.',
      sections: [
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>
#include <stdexcept>
#include <string>
using namespace std;

class InsufficientFundsException : public runtime_error {
    double amount, balance;
public:
    InsufficientFundsException(double amt, double bal)
        : runtime_error("Insufficient funds"),
          amount(amt), balance(bal) {}

    double getAmount() const { return amount; }
    double getBalance() const { return balance; }
};

double safeDivide(double a, double b) {
    if (b == 0) throw invalid_argument("Division by zero");
    return a / b;
}

void withdraw(double& balance, double amount) {
    if (amount > balance) {
        throw InsufficientFundsException(amount, balance);
    }
    balance -= amount;
}

int main() {
    // Basic try/catch
    try {
        double result = safeDivide(10, 0);
        cout << result << "\n";
    } catch (const invalid_argument& e) {
        cout << "Error: " << e.what() << "\n";
    }

    // Multiple catch blocks
    double balance = 100.0;
    try {
        withdraw(balance, 50);   // OK
        cout << "Balance: " << balance << "\n";
        withdraw(balance, 200);  // throws
    } catch (const InsufficientFundsException& e) {
        cout << "Can't withdraw " << e.getAmount()
             << ", balance is " << e.getBalance() << "\n";
    } catch (const exception& e) {
        cout << "Generic error: " << e.what() << "\n";
    } catch (...) {
        cout << "Unknown error\n";  // catch anything
    }

    // Standard exception types:
    // std::runtime_error — general runtime failure
    // std::invalid_argument — bad function argument
    // std::out_of_range — value out of valid range
    // std::overflow_error — arithmetic overflow

    return 0;
}`,
        },
        {
          type: 'warning',
          content: 'Exceptions have overhead — they\'re not free even when none are thrown. For performance-critical code, consider returning error codes or using std::expected (C++23) or std::optional instead.',
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: Bank Account System',
      intro: 'Let\'s put it all together: a small bank account system using classes, vectors, exceptions, and file I/O.',
      sections: [
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>
#include <vector>
#include <string>
#include <stdexcept>
#include <algorithm>
#include <iomanip>
using namespace std;

struct Transaction {
    string type;
    double amount;
    double balance_after;
};

class Account {
    string id;
    string owner;
    double balance;
    vector<Transaction> history;

public:
    Account(const string& id, const string& owner, double initial = 0.0)
        : id(id), owner(owner), balance(initial) {}

    void deposit(double amount) {
        if (amount <= 0) throw invalid_argument("Deposit amount must be positive");
        balance += amount;
        history.push_back({"deposit", amount, balance});
    }

    void withdraw(double amount) {
        if (amount <= 0) throw invalid_argument("Withdrawal amount must be positive");
        if (amount > balance) throw runtime_error("Insufficient funds");
        balance -= amount;
        history.push_back({"withdrawal", amount, balance});
    }

    void printStatement() const {
        cout << "\n=== Account Statement ===\n";
        cout << "ID: " << id << " | Owner: " << owner << "\n";
        cout << fixed << setprecision(2);
        cout << "Balance: $" << balance << "\n\n";
        cout << left << setw(12) << "Type"
             << right << setw(10) << "Amount"
             << right << setw(12) << "Balance" << "\n";
        cout << string(36, '-') << "\n";
        for (const auto& t : history) {
            cout << left << setw(12) << t.type
                 << right << setw(10) << t.amount
                 << right << setw(12) << t.balance_after << "\n";
        }
    }

    double getBalance() const { return balance; }
    const string& getOwner() const { return owner; }
};

int main() {
    Account acc("ACC001", "Alice", 1000.0);

    try {
        acc.deposit(500);
        acc.withdraw(200);
        acc.deposit(1000);
        acc.withdraw(750);
        acc.withdraw(5000);  // this will throw
    } catch (const runtime_error& e) {
        cout << "Transaction failed: " << e.what() << "\n";
    }

    acc.printStatement();
    return 0;
}`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `g++ -std=c++17 -o bank bank.cpp
./bank`,
        },
      ],
    },
    {
      slug: 'pointers-references-memory',
      title: 'Pointers, References & Memory',
      intro: 'C++ gives you direct control over memory, which is why it is fast and why it is unforgiving. This lesson covers the three ways to refer to a value — by copy, by reference, by pointer — and what actually happens to the stack and the heap.',
      sections: [
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>

int main() {
    int x = 42;

    int& ref = x;        // reference: another name for x. Cannot be null or rebound.
    int* ptr = &x;       // pointer: holds the ADDRESS of x. Can be null, can move.

    ref = 10;            // writes through the reference
    *ptr = 20;           // dereference then write
    std::cout << x << "\\n";              // 20

    std::cout << ptr << "\\n";            // the address itself
    std::cout << *ptr << "\\n";           // the value at that address

    int y = 99;
    ptr = &y;            // pointers can be reseated
    // ref = y;          // does NOT rebind: this assigns y's VALUE into x

    int* nothing = nullptr;              // use nullptr, never NULL or 0
    if (nothing) std::cout << *nothing;  // always check before dereferencing
}`,
        },
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>
#include <string>
#include <vector>

// Parameter passing decides who copies what.
void byValue(std::vector<int> v)        { v.push_back(1); }   // copies the whole vector
void byRef(std::vector<int>& v)         { v.push_back(1); }   // modifies the caller's
void byConstRef(const std::vector<int>& v) { std::cout << v.size(); }  // no copy, no writes
void byPointer(std::vector<int>* v)     { if (v) v->push_back(1); }    // may be null

// Rule: pass small things (int, double, pointers) by value.
// Pass anything bigger by const& unless you intend to modify it.

struct Point { double x, y; };

// Returning references to locals is a classic disaster:
// int& broken() { int local = 5; return local; }   // dangling reference, UB

int main() {
    std::vector<int> nums{1, 2, 3};

    byValue(nums);      std::cout << nums.size() << "\\n";   // 3 — unchanged
    byRef(nums);        std::cout << nums.size() << "\\n";   // 4
    byPointer(&nums);   std::cout << nums.size() << "\\n";   // 5

    // Range-for: & to modify, const& to read cheaply
    for (int& n : nums) n *= 2;
    for (const int& n : nums) std::cout << n << ' ';
}`,
        },
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>

// The stack: automatic, fast, freed when the scope ends, limited in size.
// The heap:  manual (or smart-pointer managed), large, survives the scope.

void stackDemo() {
    int arr[1000];          // on the stack, gone at the closing brace
    arr[0] = 1;
}   // freed automatically

void rawHeapDemo() {
    int* single = new int(42);          // one int on the heap
    int* many   = new int[1000];        // an array on the heap

    std::cout << *single << " " << many[0] << "\\n";

    delete single;      // every new needs exactly one delete
    delete[] many;      // array form MUST use delete[]

    // The three ways this goes wrong:
    //   forget delete        -> memory leak
    //   delete twice         -> double free, undefined behaviour
    //   use after delete     -> dangling pointer, undefined behaviour
}

int main() {
    stackDemo();
    rawHeapDemo();
    // In modern C++ you almost never write new/delete by hand — the next
    // lesson replaces them with std::unique_ptr and std::vector.
}`,
        },
        {
          type: 'warning',
          content: 'Reading an uninitialized variable, indexing past the end of an array, or dereferencing a dangling pointer is undefined behaviour: the program may crash, may print garbage, or may appear to work until it reaches production. Build with -fsanitize=address,undefined during development — it catches these at the moment they happen.',
        },
        {
          type: 'tip',
          content: 'Prefer references over pointers whenever "no value" is not a legal state. A reference cannot be null, so the reader knows there is nothing to check.',
        },
      ],
    },
    {
      slug: 'smart-pointers-raii',
      title: 'RAII, Smart Pointers & Move Semantics',
      intro: 'C++ has no garbage collector and does not need one. RAII ties every resource to an object\'s lifetime, so memory, files, locks and sockets are released exactly when the owner goes out of scope — even when an exception is thrown.',
      sections: [
        {
          type: 'code',
          language: 'cpp',
          content: `#include <fstream>
#include <mutex>
#include <iostream>

// RAII: acquire in the constructor, release in the destructor.
class FileLogger {
    std::ofstream out;
public:
    explicit FileLogger(const std::string& path) : out(path) {
        if (!out) throw std::runtime_error("cannot open " + path);
    }
    ~FileLogger() { out.flush(); }        // runs no matter how we leave the scope
    void log(const std::string& msg) { out << msg << '\\n'; }
};

void work() {
    FileLogger logger("app.log");
    logger.log("started");
    throw std::runtime_error("boom");     // the file is STILL closed properly
}

std::mutex m;
void guarded() {
    std::lock_guard<std::mutex> lock(m);  // locks here
    // ... critical section ...
}                                          // unlocks here, even on exception`,
        },
        {
          type: 'code',
          language: 'cpp',
          content: `#include <memory>
#include <vector>
#include <iostream>

struct Node {
    int value;
    std::unique_ptr<Node> next;          // owns the rest of the list
    explicit Node(int v) : value(v) {}
    ~Node() { std::cout << "destroying " << value << "\\n"; }
};

int main() {
    // unique_ptr: exactly one owner. Zero overhead vs a raw pointer.
    auto a = std::make_unique<Node>(1);
    a->next = std::make_unique<Node>(2);
    // auto copy = a;          // compile error — unique_ptr cannot be copied
    auto moved = std::move(a); // ownership transferred; a is now nullptr
    std::cout << (a == nullptr) << "\\n";  // 1

    // shared_ptr: reference counted, freed when the last owner dies.
    auto s1 = std::make_shared<Node>(10);
    {
        auto s2 = s1;
        std::cout << s1.use_count() << "\\n";   // 2
    }
    std::cout << s1.use_count() << "\\n";       // 1

    // weak_ptr: observes without owning — breaks reference cycles.
    std::weak_ptr<Node> observer = s1;
    if (auto locked = observer.lock()) std::cout << locked->value << "\\n";
}   // everything freed here, in reverse order of construction`,
        },
        {
          type: 'code',
          language: 'cpp',
          content: `#include <vector>
#include <string>
#include <utility>

// Move semantics: transfer resources instead of copying them.
class Buffer {
    std::size_t size_;
    int* data_;
public:
    explicit Buffer(std::size_t n) : size_(n), data_(new int[n]{}) {}
    ~Buffer() { delete[] data_; }

    // Copy constructor — expensive: allocates and copies
    Buffer(const Buffer& other) : size_(other.size_), data_(new int[other.size_]) {
        std::copy(other.data_, other.data_ + size_, data_);
    }

    // Move constructor — cheap: steals the pointer, leaves the source empty
    Buffer(Buffer&& other) noexcept : size_(other.size_), data_(other.data_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }

    Buffer& operator=(Buffer&& other) noexcept {
        if (this != &other) {
            delete[] data_;
            data_ = other.data_; size_ = other.size_;
            other.data_ = nullptr; other.size_ = 0;
        }
        return *this;
    }
};

void demo() {
    std::vector<std::string> names;
    std::string big(1'000'000, 'x');

    names.push_back(big);              // copies one million characters
    names.push_back(std::move(big));   // steals them; big is now empty but valid
}

// Rule of Zero: if your class holds only vectors, strings and smart pointers,
// write NO destructor, copy or move operations — the compiler gets them right.`,
        },
        {
          type: 'note',
          content: 'Always use std::make_unique and std::make_shared rather than "new". They are exception-safe, they say the ownership model in the type, and make_shared allocates the control block and the object in one go.',
        },
        {
          type: 'warning',
          content: 'Two shared_ptrs that point at each other never reach a count of zero — that is a leak a garbage collector would have caught. Make one direction a weak_ptr (parent owns child, child observes parent).',
        },
      ],
    },
    {
      slug: 'templates',
      title: 'Templates & Compile-Time Generics',
      intro: 'A template is a recipe the compiler uses to generate a concrete function or class for each type you actually use. No boxing, no virtual dispatch, no runtime cost — the specialization happens before your program ever runs.',
      sections: [
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>
#include <vector>
#include <string>

// Function template
template <typename T>
T maxOf(const T& a, const T& b) {
    return a > b ? a : b;
}

// Multiple parameters, deduced return type
template <typename A, typename B>
auto add(const A& a, const B& b) -> decltype(a + b) {
    return a + b;
}

// Class template
template <typename T, std::size_t N>
class FixedArray {
    T data_[N]{};
public:
    T& operator[](std::size_t i)             { return data_[i]; }
    const T& operator[](std::size_t i) const { return data_[i]; }
    constexpr std::size_t size() const       { return N; }
    T* begin() { return data_; }
    T* end()   { return data_ + N; }
};

int main() {
    std::cout << maxOf(3, 7) << "\\n";                     // int version
    std::cout << maxOf(std::string("a"), std::string("b")) << "\\n";  // string version
    std::cout << add(1, 2.5) << "\\n";                     // 3.5

    FixedArray<int, 4> arr;
    arr[0] = 10;
    for (int v : arr) std::cout << v << ' ';
}`,
        },
        {
          type: 'code',
          language: 'cpp',
          content: `#include <concepts>
#include <iostream>
#include <vector>

// C++20 concepts: constrain templates and get readable error messages.
template <typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template <Numeric T>
T mean(const std::vector<T>& values) {
    T total{};
    for (const T& v : values) total += v;
    return values.empty() ? T{} : total / static_cast<T>(values.size());
}

// Custom concept: "anything I can print"
template <typename T>
concept Printable = requires(T t, std::ostream& os) {
    { os << t } -> std::same_as<std::ostream&>;
};

template <Printable T>
void print(const T& value) { std::cout << value << '\\n'; }

// Variadic templates: any number of arguments
template <typename... Args>
void printAll(const Args&... args) {
    ((std::cout << args << ' '), ...);      // C++17 fold expression
    std::cout << '\\n';
}

int main() {
    std::cout << mean(std::vector<double>{1.0, 2.0, 4.0}) << "\\n";   // 2.33
    printAll(1, "two", 3.0, 'x');
    // mean(std::vector<std::string>{});    // clear error: does not satisfy Numeric
}`,
        },
        {
          type: 'code',
          language: 'cpp',
          content: `#include <iostream>
#include <type_traits>

// Compile-time computation with constexpr
constexpr long long factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}
static_assert(factorial(5) == 120);       // checked by the COMPILER

// if constexpr: branches removed at compile time
template <typename T>
std::string describe(const T& value) {
    if constexpr (std::is_integral_v<T>) {
        return "integer: " + std::to_string(value);
    } else if constexpr (std::is_floating_point_v<T>) {
        return "float: " + std::to_string(value);
    } else {
        return "some other type";
    }
}

// Template specialization: a custom implementation for one type
template <typename T> struct TypeName            { static constexpr auto value = "unknown"; };
template <>           struct TypeName<int>       { static constexpr auto value = "int"; };
template <>           struct TypeName<double>    { static constexpr auto value = "double"; };

int main() {
    std::cout << describe(42) << "\\n";
    std::cout << describe(3.14) << "\\n";
    std::cout << TypeName<int>::value << "\\n";
    constexpr auto f = factorial(10);      // computed during compilation
    std::cout << f << "\\n";
}`,
        },
        {
          type: 'note',
          content: 'Templates are compiled per instantiation, which is why they must live in headers — the compiler needs the full body at every call site. It is also why heavy template use slows compilation and grows the binary.',
        },
        {
          type: 'tip',
          content: 'When a template error dumps thirty lines of gibberish, add a concept. "T does not satisfy Numeric" points straight at the mistake, while an unconstrained template fails deep inside its own body.',
        },
      ],
    },
    {
      slug: 'modern-cpp',
      title: 'Modern C++: Lambdas, Algorithms & Ranges',
      intro: 'Everything since C++11 pushes toward writing intent instead of index arithmetic. Learn the standard algorithms and you will delete most of your hand-written loops — along with the off-by-one bugs living in them.',
      sections: [
        {
          type: 'code',
          language: 'cpp',
          content: `#include <algorithm>
#include <numeric>
#include <vector>
#include <iostream>

int main() {
    std::vector<int> nums{5, 3, 9, 1, 7, 3};

    // Lambdas: [captures](params) { body }
    auto isOdd = [](int n) { return n % 2 != 0; };

    int threshold = 4;
    auto above = [threshold](int n) { return n > threshold; };   // capture by value
    int count = 0;
    auto tally = [&count](int) { ++count; };                     // capture by reference
    auto everything = [&](int n) { return n > threshold; };      // capture all by ref
    auto mutableLambda = [x = 0](int n) mutable { return x += n; };

    std::sort(nums.begin(), nums.end());
    std::sort(nums.begin(), nums.end(), std::greater<>{});       // descending

    auto it = std::find_if(nums.begin(), nums.end(), above);
    if (it != nums.end()) std::cout << "first > 4: " << *it << "\\n";

    std::cout << std::count_if(nums.begin(), nums.end(), isOdd) << "\\n";
    std::cout << std::accumulate(nums.begin(), nums.end(), 0) << "\\n";
    std::cout << std::any_of(nums.begin(), nums.end(), above) << "\\n";

    // erase-remove idiom: actually delete the matching elements
    nums.erase(std::remove_if(nums.begin(), nums.end(), isOdd), nums.end());
    // C++20 shortcut: std::erase_if(nums, isOdd);
}`,
        },
        {
          type: 'code',
          language: 'cpp',
          content: `#include <ranges>
#include <vector>
#include <string>
#include <iostream>

int main() {
    std::vector<int> nums{1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // C++20 ranges: composable views, evaluated lazily, no temporary vectors
    auto result = nums
        | std::views::filter([](int n) { return n % 2 == 0; })
        | std::views::transform([](int n) { return n * n; })
        | std::views::take(3);

    for (int n : result) std::cout << n << ' ';    // 4 16 36
    std::cout << '\\n';

    // Algorithms without .begin()/.end() noise
    std::ranges::sort(nums);
    auto pos = std::ranges::find(nums, 7);
    std::cout << std::ranges::count_if(nums, [](int n) { return n > 5; }) << "\\n";

    // Common views
    for (int n : std::views::iota(1, 5)) std::cout << n;          // 1234
    for (int n : nums | std::views::reverse | std::views::take(2)) std::cout << n;
}`,
        },
        {
          type: 'code',
          language: 'cpp',
          content: `#include <optional>
#include <variant>
#include <string>
#include <string_view>
#include <iostream>

// optional<T>: a value that may be absent, without using a sentinel or a pointer
std::optional<int> parsePort(const std::string& text) {
    try {
        int value = std::stoi(text);
        if (value < 1 || value > 65535) return std::nullopt;
        return value;
    } catch (...) {
        return std::nullopt;
    }
}

// variant<A, B>: exactly one of several types, checked at compile time
using Result = std::variant<int, std::string>;

std::string render(const Result& r) {
    return std::visit([](const auto& v) -> std::string {
        if constexpr (std::is_same_v<std::decay_t<decltype(v)>, int>)
            return "ok: " + std::to_string(v);
        else
            return "error: " + v;
    }, r);
}

// string_view: a non-owning window into a string — no allocation, no copy
void logLine(std::string_view line) { std::cout << line << '\\n'; }

int main() {
    if (auto port = parsePort("8080")) std::cout << *port << "\\n";
    std::cout << parsePort("abc").value_or(80) << "\\n";          // 80

    std::cout << render(Result{42}) << "\\n";
    std::cout << render(Result{std::string("bad input")}) << "\\n";

    std::string s = "hello world";
    logLine(s);
    logLine("a literal");        // no std::string is constructed
}`,
        },
        {
          type: 'warning',
          content: 'A string_view does not own its characters. Returning one that points into a temporary or a local string leaves a dangling view — the same class of bug as a dangling pointer, just harder to spot.',
        },
        {
          type: 'tip',
          content: 'Capture explicitly in lambdas that outlive the current scope. [&] on a lambda stored in a member or passed to a thread captures references to locals that may already be gone by the time it runs.',
        },
      ],
    },
  ],
}
