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
  ],
}
