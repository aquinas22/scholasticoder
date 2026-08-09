import { Language } from '../types'

export const c: Language = {
  slug: 'c',
  name: 'C',
  tagline: 'You have the power of the gods. Use it wisely. We believe in you. Mostly.',
  description: 'C is the foundation of modern computing. Your operating system is written in it. Your browser\'s JavaScript engine is written in it. Python itself is written in it. Learning C means learning how computers actually work.',
  accentColor: '#659BD3',
  textOnAccent: '#fff',
  icon: 'C',
  difficulty: 'intermediate',
  usedFor: ['Operating Systems', 'Embedded Systems', 'Game Engines', 'Compilers', 'Systems Programming'],
  notableUsers: ['Linux', 'Windows NT', 'macOS XNU kernel', 'PostgreSQL', 'Python (CPython)'],
  setup: {
    description: 'C needs a compiler. GCC and Clang are the two most common. On Linux/macOS they\'re easy to get. On Windows, you have a few good options.',
    windows: `# Option 1: MSYS2 + GCC (recommended for Windows dev)
# Download MSYS2 from msys2.org
# In the MSYS2 terminal:
pacman -S mingw-w64-ucrt-x86_64-gcc

# Option 2: Visual Studio (installs MSVC compiler)
# Download Visual Studio Community (free)
# Select "Desktop development with C++"

# Option 3: WSL2 + Ubuntu (best experience)
wsl --install
# Then in WSL: sudo apt install gcc

# Verify (in the appropriate terminal):
gcc --version`,
    mac: `# Install Xcode Command Line Tools (includes clang):
xcode-select --install

# Or install GCC via Homebrew:
brew install gcc

# Verify:
gcc --version  # or clang --version`,
    linux: `# Debian / Ubuntu:
sudo apt update && sudo apt install gcc build-essential

# Fedora:
sudo dnf install gcc

# Arch:
sudo pacman -S gcc

# Verify:
gcc --version`,
  },
  lessons: [
    {
      slug: 'hello-world',
      title: 'Hello, World!',
      intro: 'The original Hello World was written in C in 1974 by Brian Kernighan. We\'re still writing it today. This is either a testament to C\'s longevity or our lack of creativity.',
      sections: [
        {
          type: 'text',
          content: 'C programs start with #include directives for headers, followed by functions. The main() function is the entry point. printf() from <stdio.h> prints formatted output to the terminal.',
        },
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
        },
        {
          type: 'text',
          content: 'Compile with gcc hello.c -o hello, then run with ./hello. The -o flag specifies the output filename. main() returns an int — 0 means success, non-zero means error. The \\n is a newline escape sequence; printf() doesn\'t add one automatically.',
        },
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>

int main() {
    // printf uses format specifiers
    printf("Hello, World!\\n");
    printf("The answer is %d\\n", 42);
    printf("Pi is approximately %.4f\\n", 3.14159);
    printf("Name: %s\\n", "Alice");
    printf("Char: %c\\n", 'A');

    // printf returns the number of characters written
    int chars = printf("Count me\\n");
    printf("That was %d characters\\n", chars);

    return 0;
}`,
        },
        {
          type: 'note',
          content: 'The return 0; at the end of main() tells the operating system the program ran successfully. You can omit it in C99 and later, but it\'s good practice to be explicit.',
        },
      ],
    },
    {
      slug: 'variables-types',
      title: 'Variables & Data Types',
      intro: 'C gives you direct control over data types and sizes. With great power comes the ability to cause extremely confusing bugs.',
      sections: [
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>
#include <stdint.h>  // for fixed-size integer types

int main() {
    // Integer types (sizes vary by platform and compiler)
    char c = 'A';      // 1 byte, -128 to 127
    short s = 32767;   // at least 2 bytes
    int i = 2147483647;    // at least 2 bytes, usually 4
    long l = 2147483647L;  // at least 4 bytes
    long long ll = 9223372036854775807LL;  // at least 8 bytes

    // Unsigned variants (no negative numbers, double positive range)
    unsigned int ui = 4294967295U;
    unsigned char uc = 255;

    // Fixed-size types from <stdint.h> (more portable)
    int8_t  i8  = 127;
    int32_t i32 = 2147483647;
    int64_t i64 = 9223372036854775807LL;
    uint8_t u8  = 255;

    // Floating point
    float f = 3.14f;       // usually 4 bytes, ~7 digits precision
    double d = 3.14159265; // usually 8 bytes, ~15 digits precision

    // Boolean (no bool in C89; use int or include stdbool.h)
    #include <stdbool.h>
    bool flag = true;
    bool other = false;

    printf("char: %c, int: %d, double: %f\\n", c, i, d);
    printf("flag: %d\\n", flag);  // prints 1 for true

    return 0;
}`,
        },
        {
          type: 'text',
          content: 'Variables in C must be declared before use. They are NOT initialized automatically — they contain whatever garbage was in that memory location. Always initialize your variables.',
        },
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>

int main() {
    // Uninitialized — DANGEROUS (undefined behavior)
    int x;
    // printf("%d\\n", x);  // could print anything!

    // Always initialize
    int a = 0;
    double b = 0.0;
    char name[50] = "";   // zero out the string buffer

    // Constants — can't be changed after declaration
    const int MAX = 100;
    const double PI = 3.14159265358979;

    // Preprocessor macro constants (no type, replaced before compile)
    #define BUFFER_SIZE 1024
    #define SQUARE(x) ((x) * (x))  // note extra parens — important!

    printf("MAX = %d\\n", MAX);
    printf("SQUARE(5) = %d\\n", SQUARE(5));

    // sizeof — get size in bytes
    printf("int: %zu bytes\\n", sizeof(int));
    printf("double: %zu bytes\\n", sizeof(double));
    printf("char: %zu bytes\\n", sizeof(char));

    return 0;
}`,
        },
        {
          type: 'warning',
          content: 'Reading an uninitialized variable is undefined behavior in C — the compiler is allowed to do literally anything, including generating code that does something completely unexpected. Always initialize your variables.',
        },
      ],
    },
    {
      slug: 'control-flow',
      title: 'Control Flow',
      intro: 'C\'s control flow is the template every other language copied. If you\'ve used any other language, this will feel familiar.',
      sections: [
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>

int main() {
    int score = 75;

    // if / else if / else
    if (score >= 90) {
        printf("A\\n");
    } else if (score >= 80) {
        printf("B\\n");
    } else if (score >= 70) {
        printf("C\\n");
    } else {
        printf("Study more\\n");
    }

    // Ternary operator
    char *result = (score >= 60) ? "Pass" : "Fail";
    printf("%s\\n", result);

    // switch (only works on integer types)
    int day = 2;
    switch (day) {
        case 1:
            printf("Monday\\n");
            break;  // REQUIRED — fallthrough is the default
        case 2:
            printf("Tuesday\\n");
            break;
        case 6:
        case 7:  // multiple cases can share a body
            printf("Weekend\\n");
            break;
        default:
            printf("Midweek\\n");
    }

    // Logical operators
    int x = 5, y = 10;
    if (x > 0 && y > 0) printf("both positive\\n");
    if (x < 0 || y < 0) printf("one is negative\\n");
    if (!(x == y)) printf("not equal\\n");

    return 0;
}`,
        },
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>

int main() {
    // for loop
    for (int i = 0; i < 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");  // 0 1 2 3 4

    // while loop
    int n = 10;
    while (n > 0) {
        printf("%d ", n);
        n -= 3;
    }
    printf("\\n");  // 10 7 4 1

    // do-while — always runs at least once
    int count = 0;
    do {
        printf("count: %d\\n", count);
        count++;
    } while (count < 3);

    // Nested loops and break/continue
    for (int i = 0; i < 5; i++) {
        if (i == 2) continue;  // skip 2
        if (i == 4) break;     // stop at 4
        printf("%d ", i);
    }
    printf("\\n");  // 0 1 3

    return 0;
}`,
        },
      ],
    },
    {
      slug: 'functions',
      title: 'Functions & Pointers',
      intro: 'C functions are straightforward. Pointers less so. But pointers are what make C C, so buckle up.',
      sections: [
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>

// Function declaration (prototype) — tells compiler about the function
int add(int a, int b);
double average(int arr[], int len);

int main() {
    printf("%d\\n", add(3, 4));   // 7

    int data[] = {5, 10, 15, 20};
    printf("%.1f\\n", average(data, 4));  // 12.5

    // Pointers — a variable that holds a memory address
    int x = 42;
    int *p = &x;  // p points to x; & is "address of"

    printf("Value of x: %d\\n", x);    // 42
    printf("Address of x: %p\\n", &x); // some address
    printf("Value via p: %d\\n", *p);  // 42 — * is "dereference"

    *p = 100;  // change x through the pointer
    printf("x is now: %d\\n", x);   // 100

    return 0;
}

// Function definitions
int add(int a, int b) {
    return a + b;
}

double average(int arr[], int len) {
    int sum = 0;
    for (int i = 0; i < len; i++) {
        sum += arr[i];
    }
    return (double)sum / len;  // cast to double before dividing
}`,
        },
        {
          type: 'text',
          content: 'C passes arguments by value — functions get copies. To modify a variable from a function, you must pass a pointer to it. This is the classic "pass by reference" pattern in C.',
        },
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>

// Swap using pointers — pass by reference
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// Return pointer to array (careful: must be static or heap-allocated)
int* make_range(int n) {
    static int arr[100];  // static — lives beyond function call
    for (int i = 0; i < n; i++) arr[i] = i;
    return arr;
}

// Function pointer
int (*operation)(int, int);  // pointer to a function taking two ints

int multiply(int a, int b) { return a * b; }
int subtract(int a, int b) { return a - b; }

int main() {
    int x = 5, y = 10;
    printf("Before: x=%d, y=%d\\n", x, y);
    swap(&x, &y);  // pass addresses
    printf("After:  x=%d, y=%d\\n", x, y);  // swapped!

    // Use a function pointer
    operation = multiply;
    printf("3 * 4 = %d\\n", operation(3, 4));  // 12
    operation = subtract;
    printf("10 - 3 = %d\\n", operation(10, 3)); // 7

    return 0;
}`,
        },
        {
          type: 'note',
          content: 'Pointer arithmetic in C is one of its most powerful and dangerous features. We\'ll keep things simple here — the key insight is that pointers enable passing large data structures efficiently and modifying variables from called functions.',
        },
      ],
    },
    {
      slug: 'arrays-strings',
      title: 'Arrays & Strings',
      intro: 'In C, a string is just an array of characters ending with a null byte (\\0). This is either elegant or terrifying. Reader\'s choice.',
      sections: [
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>
#include <string.h>

int main() {
    // Arrays — fixed size, all same type
    int numbers[5] = {10, 20, 30, 40, 50};
    printf("%d\\n", numbers[0]);    // 10
    printf("%d\\n", numbers[4]);    // 50

    // Partial initialization — rest is zero
    int data[10] = {1, 2, 3};  // data[3..9] = 0

    // Iterate
    int len = sizeof(numbers) / sizeof(numbers[0]);  // common idiom
    for (int i = 0; i < len; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n");

    // 2D arrays
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    printf("Center: %d\\n", matrix[1][1]);  // 5

    // Strings — char arrays ending with '\\0'
    char greeting[] = "Hello";     // compiler adds '\\0'
    char name[50] = "World";       // 50-byte buffer

    printf("%s\\n", greeting);      // Hello
    printf("Length: %zu\\n", strlen(greeting));  // 5 (not counting '\\0')

    // String functions from <string.h>
    char full[100];
    strcpy(full, greeting);        // copy greeting into full
    strcat(full, ", ");            // append
    strcat(full, name);            // append
    strcat(full, "!");
    printf("%s\\n", full);          // Hello, World!

    printf("%d\\n", strcmp("abc", "abc"));  // 0 — strings are equal
    printf("%d\\n", strcmp("abc", "xyz"));  // negative — abc < xyz

    return 0;
}`,
        },
        {
          type: 'warning',
          content: 'Buffer overflows are C\'s most famous security vulnerability. Never use strcpy() with untrusted input — use strncpy() or snprintf() instead. Always make sure your buffers are large enough for the data plus the null terminator.',
        },
      ],
    },
    {
      slug: 'structs',
      title: 'Structs',
      intro: 'Structs let you group related data together. They\'re C\'s version of objects — without the methods, inheritance, or any of the fun parts.',
      sections: [
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>
#include <string.h>

// Define a struct type
typedef struct {
    char name[50];
    int age;
    double gpa;
} Student;

// Struct with a pointer to another struct (linked list node)
typedef struct Node {
    int value;
    struct Node *next;  // pointer to same type
} Node;

// Function that takes a struct pointer
void print_student(const Student *s) {
    printf("Name: %s, Age: %d, GPA: %.2f\\n", s->name, s->age, s->gpa);
    //                                          ^^^ arrow for pointer access
}

int main() {
    // Initialize a struct
    Student s1 = {"Alice", 20, 3.8};
    Student s2;
    strcpy(s2.name, "Bob");  // use strcpy for string fields
    s2.age = 22;
    s2.gpa = 3.5;

    // Access with . (dot) for values, -> for pointers
    printf("%s is %d years old\\n", s1.name, s1.age);

    Student *ptr = &s2;
    printf("Via pointer: %s\\n", ptr->name);  // arrow notation

    // Function with pointer argument
    print_student(&s1);
    print_student(&s2);

    // Array of structs
    Student class[3] = {
        {"Charlie", 21, 3.7},
        {"Diana",   19, 3.9},
        {"Eve",     23, 3.6},
    };

    for (int i = 0; i < 3; i++) {
        print_student(&class[i]);
    }

    return 0;
}`,
        },
        {
          type: 'note',
          content: 'typedef struct { ... } Name; is the standard C idiom to avoid writing struct every time. Without it, you\'d need to write struct Student everywhere. The typedef just creates an alias.',
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: Number Guessing Game',
      intro: 'Let\'s build something interactive: a number guessing game that uses everything we\'ve learned.',
      sections: [
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define MAX_GUESSES 7
#define MIN_NUMBER  1
#define MAX_NUMBER  100

int clamp(int val, int min, int max) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}

void play_game() {
    srand((unsigned int)time(NULL));  // seed random number generator
    int secret = (rand() % MAX_NUMBER) + MIN_NUMBER;
    int guess, guesses_left = MAX_GUESSES;

    printf("\\n=== Number Guessing Game ===\\n");
    printf("Guess a number between %d and %d.\\n", MIN_NUMBER, MAX_NUMBER);
    printf("You have %d guesses.\\n\\n", MAX_GUESSES);

    while (guesses_left > 0) {
        printf("Guesses left: %d. Your guess: ", guesses_left);

        if (scanf("%d", &guess) != 1) {
            // Clear invalid input
            while (getchar() != '\\n');
            printf("Please enter a number.\\n");
            continue;
        }

        guess = clamp(guess, MIN_NUMBER, MAX_NUMBER);
        guesses_left--;

        if (guess < secret) {
            printf("Too low!\\n");
        } else if (guess > secret) {
            printf("Too high!\\n");
        } else {
            int used = MAX_GUESSES - guesses_left;
            printf("Correct! You got it in %d guess%s!\\n",
                   used, used == 1 ? "" : "es");
            return;
        }
    }

    printf("Out of guesses! The number was %d.\\n", secret);
}

int main() {
    char play_again;
    do {
        play_game();
        printf("\\nPlay again? (y/n): ");
        scanf(" %c", &play_again);
    } while (play_again == 'y' || play_again == 'Y');

    printf("Thanks for playing!\\n");
    return 0;
}`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `gcc -o guess guess.c
./guess`,
        },
        {
          type: 'note',
          content: 'Notice the scanf(" %c", ...) with a space before %c — this skips whitespace (including newlines) left in the input buffer from the previous scanf. Input handling is a common source of bugs in C programs.',
        },
      ],
    },
    {
      slug: 'pointers',
      title: 'Pointers',
      intro: 'A pointer is just a variable that holds a memory address. Every "hard" part of C — arrays, strings, structs passed to functions, dynamic memory — is really the same pointer rules applied again.',
      sections: [
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>

int main(void) {
    int x = 42;
    int *p = &x;          /* & takes the address of x */

    printf("value:   %d\\n", x);      /* 42 */
    printf("address: %p\\n", (void *)p);
    printf("deref:   %d\\n", *p);     /* 42 — * reads through the pointer */

    *p = 99;                          /* write through the pointer */
    printf("x is now %d\\n", x);      /* 99 */

    int *nothing = NULL;              /* always initialise; NULL means "points nowhere" */
    if (nothing != NULL) printf("%d\\n", *nothing);   /* check before dereferencing */

    /* Declaration syntax reads right to left */
    int   a = 1;
    int  *ptr_to_int   = &a;
    int **ptr_to_ptr   = &ptr_to_int;
    printf("%d\\n", **ptr_to_ptr);    /* 1 */

    const int *read_only = &a;        /* cannot write *read_only */
    int *const fixed_target = &a;     /* cannot change where it points */
    return 0;
}`,
        },
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>
#include <string.h>

/* C passes everything BY VALUE. To let a function modify a caller's variable,
   pass its address. */
void broken_swap(int a, int b) { int t = a; a = b; b = t; }        /* does nothing */
void swap(int *a, int *b)      { int t = *a; *a = *b; *b = t; }    /* works */

/* Returning several values: write them through out-parameters */
int divide(int num, int den, int *quotient, int *remainder) {
    if (den == 0) return -1;                  /* error code */
    *quotient  = num / den;
    *remainder = num % den;
    return 0;
}

/* Arrays decay to a pointer to their first element when passed,
   so the length must travel separately. */
int sum(const int *values, size_t count) {
    int total = 0;
    for (size_t i = 0; i < count; i++) total += values[i];   /* same as *(values + i) */
    return total;
}

int main(void) {
    int a = 1, b = 2;
    swap(&a, &b);
    printf("%d %d\\n", a, b);              /* 2 1 */

    int q, r;
    if (divide(17, 5, &q, &r) == 0) printf("%d rem %d\\n", q, r);   /* 3 rem 2 */

    int nums[] = {1, 2, 3, 4, 5};
    printf("%d\\n", sum(nums, sizeof nums / sizeof nums[0]));       /* 15 */
    return 0;
}`,
        },
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>
#include <stdlib.h>

/* Pointer arithmetic moves in units of the pointed-to TYPE, not bytes. */
void walk(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    int *p = arr;

    printf("%d\\n", *p);        /* 10 */
    printf("%d\\n", *(p + 2));  /* 30 — advanced 2 ints, i.e. 8 bytes */
    p++;
    printf("%d\\n", *p);        /* 20 */
    printf("%td\\n", p - arr);  /* 1 — distance in elements */

    for (int *it = arr; it != arr + 5; ++it) printf("%d ", *it);
    printf("\\n");
}

/* Function pointers: pass behaviour as a parameter */
int ascending(const void *a, const void *b)  { return *(const int *)a - *(const int *)b; }
int descending(const void *a, const void *b) { return *(const int *)b - *(const int *)a; }

int main(void) {
    walk();

    int data[] = {5, 2, 9, 1};
    size_t n = sizeof data / sizeof data[0];

    qsort(data, n, sizeof data[0], ascending);
    for (size_t i = 0; i < n; i++) printf("%d ", data[i]);   /* 1 2 5 9 */
    printf("\\n");

    int (*compare)(const void *, const void *) = descending;
    qsort(data, n, sizeof data[0], compare);
    for (size_t i = 0; i < n; i++) printf("%d ", data[i]);   /* 9 5 2 1 */
    printf("\\n");
    return 0;
}`,
        },
        {
          type: 'warning',
          content: 'Indexing past the end of an array does not raise an error in C — it reads or writes whatever memory happens to be there. That is the root of most C security vulnerabilities. Compile with -Wall -Wextra -fsanitize=address while developing and these become loud runtime errors.',
        },
        {
          type: 'tip',
          content: 'Read declarations from the variable name outward: "int *p" is "p is a pointer to int", "int *arr[5]" is "arr is an array of 5 pointers to int". When it gets confusing, a typedef is not cheating.',
        },
      ],
    },
    {
      slug: 'dynamic-memory',
      title: 'Dynamic Memory',
      intro: 'Stack variables disappear when the function returns and their size must be known in advance. malloc gives you memory that outlives the scope and can be sized at runtime — and makes you responsible for giving it back.',
      sections: [
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    /* malloc: size in BYTES, returns void* (or NULL if it fails) */
    int *nums = malloc(5 * sizeof *nums);
    if (nums == NULL) {                  /* ALWAYS check */
        perror("malloc");
        return 1;
    }
    for (int i = 0; i < 5; i++) nums[i] = i * i;

    /* calloc: count + size, and zeroes the memory */
    int *zeros = calloc(5, sizeof *zeros);

    /* realloc: grow or shrink. Assign to a TEMP so you do not leak on failure. */
    int *bigger = realloc(nums, 10 * sizeof *nums);
    if (bigger == NULL) { free(nums); return 1; }
    nums = bigger;
    for (int i = 5; i < 10; i++) nums[i] = i * i;

    printf("%d %d\\n", nums[3], nums[9]);   /* 9 81 */

    free(nums);
    free(zeros);
    nums = NULL;          /* defensive: a freed pointer that is NULL cannot be reused */
    return 0;
}`,
        },
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* A growable array — the data structure C does not give you. */
typedef struct {
    int   *items;
    size_t length;
    size_t capacity;
} IntVec;

int vec_init(IntVec *v, size_t capacity) {
    v->items = malloc(capacity * sizeof *v->items);
    if (!v->items) return -1;
    v->length = 0;
    v->capacity = capacity;
    return 0;
}

int vec_push(IntVec *v, int value) {
    if (v->length == v->capacity) {
        size_t new_cap = v->capacity * 2;
        int *grown = realloc(v->items, new_cap * sizeof *v->items);
        if (!grown) return -1;                 /* old buffer still valid */
        v->items = grown;
        v->capacity = new_cap;
    }
    v->items[v->length++] = value;
    return 0;
}

void vec_free(IntVec *v) {
    free(v->items);
    v->items = NULL;
    v->length = v->capacity = 0;
}

int main(void) {
    IntVec v;
    if (vec_init(&v, 2) != 0) return 1;
    for (int i = 0; i < 10; i++) vec_push(&v, i);
    printf("%zu items, capacity %zu, last=%d\\n", v.length, v.capacity, v.items[9]);
    vec_free(&v);
    return 0;
}`,
        },
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Strings on the heap: remember the +1 for the terminating '\\0'. */
char *duplicate(const char *src) {
    size_t len = strlen(src);
    char *copy = malloc(len + 1);
    if (!copy) return NULL;
    memcpy(copy, src, len + 1);       /* copies the '\\0' too */
    return copy;
}

char *join(const char *a, const char *b, char sep) {
    size_t la = strlen(a), lb = strlen(b);
    char *out = malloc(la + lb + 2);
    if (!out) return NULL;
    memcpy(out, a, la);
    out[la] = sep;
    memcpy(out + la + 1, b, lb + 1);
    return out;
}

int main(void) {
    char *name = duplicate("Ada Lovelace");
    char *path = join("usr", "local", '/');
    printf("%s | %s\\n", name, path);

    /* Whoever allocates must document who frees. Here, the caller. */
    free(name);
    free(path);
    return 0;
}`,
        },
        {
          type: 'warning',
          content: 'The four fatal memory errors: leaking (never freeing), double free (freeing twice), use-after-free (touching memory you returned), and buffer overflow (writing past the end). Run your program under valgrind, or build with -fsanitize=address, and all four become immediate, specific error messages.',
        },
        {
          type: 'note',
          content: 'Write "malloc(n * sizeof *ptr)" rather than "malloc(n * sizeof(int))". If the type of ptr ever changes, the size follows automatically and cannot go stale.',
        },
      ],
    },
    {
      slug: 'file-io',
      title: 'File I/O',
      intro: 'C\'s file interface is small: open a FILE stream, read or write it, close it. The traps are all in error checking and in remembering that fgets keeps the newline.',
      sections: [
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    /* Modes: "r" read, "w" truncate+write, "a" append, "r+" read/write,
       add "b" for binary ("rb", "wb") */
    FILE *out = fopen("notes.txt", "w");
    if (!out) { perror("fopen"); return 1; }

    fprintf(out, "line %d\\n", 1);
    fputs("line 2\\n", out);
    fclose(out);                      /* flushes; skipping this can lose data */

    FILE *in = fopen("notes.txt", "r");
    if (!in) { perror("fopen"); return 1; }

    char line[256];
    while (fgets(line, sizeof line, in) != NULL) {
        line[strcspn(line, "\\n")] = '\\0';    /* strip the trailing newline */
        printf("[%s]\\n", line);
    }
    if (ferror(in)) fprintf(stderr, "read error\\n");
    fclose(in);
    return 0;
}`,
        },
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Read an entire file into a heap buffer */
char *read_all(const char *path, long *out_size) {
    FILE *f = fopen(path, "rb");
    if (!f) return NULL;

    fseek(f, 0, SEEK_END);
    long size = ftell(f);              /* current position = file length */
    rewind(f);                         /* back to the start */

    char *buffer = malloc((size_t)size + 1);
    if (!buffer) { fclose(f); return NULL; }

    size_t read = fread(buffer, 1, (size_t)size, f);
    buffer[read] = '\\0';
    fclose(f);

    if (out_size) *out_size = (long)read;
    return buffer;                     /* caller must free */
}

/* Binary records: fwrite/fread move raw bytes */
typedef struct { int id; char name[32]; double score; } Record;

int save_records(const char *path, const Record *recs, size_t n) {
    FILE *f = fopen(path, "wb");
    if (!f) return -1;
    size_t written = fwrite(recs, sizeof *recs, n, f);
    fclose(f);
    return written == n ? 0 : -1;
}

int main(void) {
    Record recs[2] = { {1, "Ada", 99.5}, {2, "Grace", 98.0} };
    save_records("data.bin", recs, 2);

    long size = 0;
    char *text = read_all("notes.txt", &size);
    if (text) { printf("%ld bytes\\n", size); free(text); }
    return 0;
}`,
        },
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* A tiny CSV reader — parsing with strtok */
void parse_csv(const char *path) {
    FILE *f = fopen(path, "r");
    if (!f) { perror(path); return; }

    char line[512];
    int lineno = 0;

    while (fgets(line, sizeof line, f)) {
        lineno++;
        if (lineno == 1) continue;                 /* skip the header */
        line[strcspn(line, "\\r\\n")] = '\\0';

        char *id    = strtok(line, ",");
        char *name  = strtok(NULL, ",");
        char *score = strtok(NULL, ",");
        if (!id || !name || !score) {
            fprintf(stderr, "malformed line %d\\n", lineno);
            continue;
        }
        printf("%s -> %s (%.1f)\\n", id, name, atof(score));
    }
    fclose(f);
}

/* Command line arguments and standard streams */
int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "usage: %s <file.csv>\\n", argv[0]);   /* errors go to stderr */
        return 1;
    }
    parse_csv(argv[1]);
    return 0;
}`,
        },
        {
          type: 'warning',
          content: 'Never use gets() — it cannot know the size of your buffer and is the textbook buffer-overflow vulnerability. It was removed from the language in C11. Use fgets with sizeof buffer instead.',
        },
        {
          type: 'note',
          content: 'strtok modifies the string it parses by writing null terminators into it, and it keeps hidden state between calls, so it is not safe across threads or nested loops. For anything beyond a quick script, use strtok_r (POSIX) or write your own scanner.',
        },
      ],
    },
    {
      slug: 'preprocessor-multifile',
      title: 'The Preprocessor & Multi-File Programs',
      intro: 'Before the compiler sees your code, the preprocessor pastes headers in, expands macros, and deletes the branches that do not apply. Understanding it is what lets you split a program across files without duplicate-symbol errors.',
      sections: [
        {
          type: 'code',
          language: 'c',
          content: `/* mathutils.h — the INTERFACE: types, declarations, macros */
#ifndef MATHUTILS_H            /* include guard: prevents double inclusion */
#define MATHUTILS_H

#include <stddef.h>

#define PI 3.14159265358979323846
#define MAX(a, b) ((a) > (b) ? (a) : (b))     /* parenthesise every argument! */
#define ARRAY_LEN(a) (sizeof (a) / sizeof (a)[0])

typedef struct {
    double x, y;
} Vec2;

double vec2_length(Vec2 v);
Vec2   vec2_add(Vec2 a, Vec2 b);
int    clamp(int value, int low, int high);

#endif /* MATHUTILS_H */`,
        },
        {
          type: 'code',
          language: 'c',
          content: `/* mathutils.c — the IMPLEMENTATION */
#include "mathutils.h"      /* quotes: your own headers. <> : system headers */
#include <math.h>

double vec2_length(Vec2 v) {
    return sqrt(v.x * v.x + v.y * v.y);
}

Vec2 vec2_add(Vec2 a, Vec2 b) {
    return (Vec2){ a.x + b.x, a.y + b.y };     /* compound literal */
}

int clamp(int value, int low, int high) {
    if (value < low)  return low;
    if (value > high) return high;
    return value;
}

/* static = internal linkage: visible only inside this file */
static int helper_nobody_else_sees(int n) { return n * 2; }


/* main.c */
#include <stdio.h>
#include "mathutils.h"

int main(void) {
    Vec2 a = {3, 4};
    printf("%.1f\\n", vec2_length(a));          /* 5.0 */
    printf("%d\\n", MAX(10, 3));
    printf("%d\\n", clamp(120, 0, 100));        /* 100 */
    return 0;
}`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Compile each .c to an object file, then link them together
gcc -Wall -Wextra -std=c17 -c mathutils.c -o mathutils.o
gcc -Wall -Wextra -std=c17 -c main.c      -o main.o
gcc mathutils.o main.o -o app -lm         # -lm links the math library

# Or in one step
gcc -Wall -Wextra -std=c17 main.c mathutils.c -o app -lm

# A minimal Makefile
# CC     = gcc
# CFLAGS = -Wall -Wextra -std=c17 -g
# app: main.o mathutils.o
# 	$(CC) $^ -o $@ -lm
# %.o: %.c mathutils.h
# 	$(CC) $(CFLAGS) -c $< -o $@
# clean:
# 	rm -f *.o app

# See exactly what the preprocessor produced
gcc -E main.c | less`,
        },
        {
          type: 'code',
          language: 'c',
          content: `#include <stdio.h>
#include <assert.h>

/* Conditional compilation */
#define DEBUG 1

#if DEBUG
    #define LOG(fmt, ...) fprintf(stderr, "[%s:%d] " fmt "\\n", __FILE__, __LINE__, __VA_ARGS__)
#else
    #define LOG(fmt, ...) ((void)0)
#endif

/* Platform differences */
#ifdef _WIN32
    #define PATH_SEP '\\\\'
#else
    #define PATH_SEP '/'
#endif

/* Predefined macros: __FILE__ __LINE__ __func__ __DATE__ __STDC_VERSION__ */

int divide(int a, int b) {
    assert(b != 0 && "divide by zero");   /* removed entirely when NDEBUG is defined */
    return a / b;
}

int main(void) {
    LOG("starting with sep %c", PATH_SEP);
    printf("%d\\n", divide(10, 2));
    return 0;
}`,
        },
        {
          type: 'warning',
          content: 'Macros are text substitution, not functions. MAX(i++, j) increments i twice, and a macro without parentheses around each argument breaks on any expression: #define SQ(x) x*x makes SQ(1+2) expand to 1+2*1+2 = 5. Prefer a static inline function whenever a macro is not strictly needed.',
        },
        {
          type: 'tip',
          content: 'Headers declare, .c files define. If you put a function BODY or a global variable definition in a header and include it twice, the linker reports "multiple definition" — the fix is to move the definition into one .c file, or mark it static inline.',
        },
      ],
    },
  ],
}
