import { Language } from '../types'

export const java: Language = {
  slug: 'java',
  name: 'Java',
  tagline: 'Write once, run anywhere. Debug everywhere.',
  description: 'Java is a verbose, strictly typed, object-oriented language that powers Android, enterprise backends, and countless financial systems. It\'s been reliably annoying developers since 1995. That longevity means a massive ecosystem and rock-solid tooling.',
  accentColor: '#ED8B00',
  textOnAccent: '#fff',
  icon: 'Ja',
  difficulty: 'intermediate',
  usedFor: ['Android Development', 'Enterprise Backends', 'Big Data (Hadoop, Spark)', 'Financial Systems'],
  notableUsers: ['Google (Android)', 'Netflix', 'LinkedIn', 'Amazon', 'Twitter'],
  setup: {
    description: 'Java requires the JDK (Java Development Kit). Install JDK 21 (the current LTS) and you\'re good to go.',
    windows: `# Option 1: Adoptium (Eclipse Temurin — recommended open source)
# Download the .msi from adoptium.net — check "Set JAVA_HOME" option

# Option 2: winget
winget install EclipseAdoptium.Temurin.21.JDK

# Option 3: Oracle JDK from oracle.com

# Verify (in new terminal):
java --version
javac --version`,
    mac: `# Homebrew:
brew install --cask temurin@21

# Or via sdkman (manages multiple JDK versions):
curl -s "https://get.sdkman.io" | bash
sdk install java 21-tem

# Verify:
java --version`,
    linux: `# Ubuntu / Debian:
sudo apt update
sudo apt install openjdk-21-jdk

# Fedora:
sudo dnf install java-21-openjdk-devel

# Arch:
sudo pacman -S jdk21-openjdk

# Verify:
java --version
javac --version`,
  },
  lessons: [
    {
      slug: 'hello-world',
      title: 'Hello, World!',
      intro: 'The famous Java Hello World. Note: it requires a class. And the class name must match the file name. And everything is public static void. Java is very thorough.',
      sections: [
        {
          type: 'text',
          content: 'In Java, all code must be inside a class. The entry point is a static method called main. The full signature — public static void main(String[] args) — is required exactly. Welcome to Java.',
        },
        {
          type: 'code',
          language: 'java',
          content: `// File: HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
        },
        {
          type: 'text',
          content: 'Compile with javac HelloWorld.java, then run with java HelloWorld. Java 11+ added the ability to run single-file programs directly: java HelloWorld.java. The JVM (Java Virtual Machine) runs the compiled bytecode — this is the "run anywhere" part.',
        },
        {
          type: 'code',
          language: 'java',
          content: `public class HelloWorld {
    public static void main(String[] args) {
        // println adds newline; print does not
        System.out.println("Hello, World!");
        System.out.print("No newline");
        System.out.print(" here\n");

        // Formatted output (like printf)
        System.out.printf("Name: %s, Age: %d%n", "Alice", 30);

        // String.format — returns a string
        String msg = String.format("Pi is %.4f", 3.14159);
        System.out.println(msg);

        // Command-line arguments
        if (args.length > 0) {
            System.out.println("First arg: " + args[0]);
        }

        // Modern Java (21): text blocks
        String json = """
                {
                    "name": "Alice",
                    "age": 30
                }
                """;
        System.out.println(json);
    }
}`,
        },
        {
          type: 'note',
          content: 'Java file names must exactly match the public class name, including case. HelloWorld.java must contain public class HelloWorld. This is a compile-time error if they don\'t match.',
        },
      ],
    },
    {
      slug: 'variables-types',
      title: 'Variables & Types',
      intro: 'Java is strictly typed. You cannot assign an int to a String. You cannot even assign a long to an int without an explicit cast. Java trusts nothing.',
      sections: [
        {
          type: 'code',
          language: 'java',
          content: `public class Variables {
    public static void main(String[] args) {
        // Primitive types (stored by value)
        byte   b = 127;              // -128 to 127
        short  s = 32767;
        int    i = 2_147_483_647;    // underscores for readability (Java 7+)
        long   l = 9_999_999_999L;   // L suffix required
        float  f = 3.14f;            // f suffix required
        double d = 3.14159265358979;
        boolean flag = true;
        char   c = 'A';              // 16-bit Unicode

        // var — type inference (Java 10+)
        var name = "Alice";          // String
        var count = 42;              // int
        var pi = 3.14;               // double

        // String — special class (immutable, reference type)
        String first = "Hello";
        String second = "World";
        String combined = first + ", " + second + "!";

        // String methods
        System.out.println(combined.length());         // 13
        System.out.println(combined.toUpperCase());    // HELLO, WORLD!
        System.out.println(combined.contains("World")); // true
        System.out.println(combined.replace("World", "Java")); // Hello, Java!
        System.out.println(combined.substring(7));     // World!
        System.out.println(combined.trim());           // removes whitespace

        // String comparison — use .equals(), NOT ==
        String a = "hello";
        String b2 = "hello";
        System.out.println(a.equals(b2));     // true (correct)
        // System.out.println(a == b2);       // might be true (accident) or false

        System.out.println(combined);
    }
}`,
        },
        {
          type: 'code',
          language: 'java',
          content: `public class TypeConversion {
    public static void main(String[] args) {
        // Widening conversion (automatic)
        int i = 42;
        double d = i;   // int -> double, automatic

        // Narrowing conversion (explicit cast required)
        double pi = 3.14159;
        int truncated = (int) pi;  // 3 — decimal part lost!

        // String conversions
        int num = 42;
        String s = Integer.toString(num);    // "42"
        String s2 = String.valueOf(num);     // "42"
        String s3 = "" + num;               // "42" (concatenation trick)
        int back = Integer.parseInt("42");   // 42 (throws NumberFormatException if invalid)

        double d2 = Double.parseDouble("3.14");
        boolean flag = Boolean.parseBoolean("true");  // true

        // Wrapper classes — boxed versions of primitives
        Integer boxed = 42;     // auto-boxing
        int unboxed = boxed;    // auto-unboxing

        // Useful constants
        System.out.println(Integer.MAX_VALUE);   // 2147483647
        System.out.println(Integer.MIN_VALUE);   // -2147483648
        System.out.println(Double.MAX_VALUE);    // 1.7976931348623157E308

        System.out.println(s + " " + back);
    }
}`,
        },
        {
          type: 'warning',
          content: 'Never use == to compare String objects. == checks if they\'re the same object in memory, not if they have the same content. Use .equals() for content comparison, .equalsIgnoreCase() for case-insensitive.',
        },
      ],
    },
    {
      slug: 'control-flow',
      title: 'Control Flow',
      intro: 'Java control flow is straight C-family. No surprises, no weird tricks. The enhanced switch expression in Java 14+ is genuinely nice.',
      sections: [
        {
          type: 'code',
          language: 'java',
          content: `public class ControlFlow {
    public static void main(String[] args) {
        int score = 85;

        if (score >= 90) System.out.println("A");
        else if (score >= 80) System.out.println("B");
        else if (score >= 70) System.out.println("C");
        else System.out.println("Below C");

        // Ternary
        String result = score >= 60 ? "Pass" : "Fail";

        // Enhanced switch expression (Java 14+)
        int day = 3;
        String dayName = switch (day) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            case 4 -> "Thursday";
            case 5 -> "Friday";
            case 6, 7 -> "Weekend";
            default -> "Invalid";
        };
        System.out.println(dayName);  // Wednesday

        // Classic switch (still valid)
        String quarter = switch (day) {
            case 1: case 2: case 3:
                yield "Q1";
            case 4: case 5: case 6:
                yield "Q2";
            default:
                yield "Later";
        };

        System.out.println(result);
    }
}`,
        },
        {
          type: 'code',
          language: 'java',
          content: `import java.util.List;

public class Loops {
    public static void main(String[] args) {
        // for loop
        for (int i = 0; i < 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();

        // Enhanced for (for-each)
        String[] fruits = {"apple", "banana", "cherry"};
        for (String fruit : fruits) {
            System.out.println(fruit);
        }

        // List with for-each
        List<Integer> numbers = List.of(1, 2, 3, 4, 5);
        for (int n : numbers) {
            System.out.print(n * n + " ");   // 1 4 9 16 25
        }
        System.out.println();

        // while
        int n = 10;
        while (n > 0) {
            System.out.print(n + " ");
            n -= 3;
        }
        System.out.println();

        // do-while — runs at least once
        int count = 0;
        do {
            count++;
        } while (count < 5);
        System.out.println("count: " + count);   // 5

        // Labels for nested loop control
        outer:
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (i == 1 && j == 1) break outer;  // break outer loop
                System.out.print("(" + i + "," + j + ") ");
            }
        }
    }
}`,
        },
      ],
    },
    {
      slug: 'methods',
      title: 'Methods',
      intro: 'In Java, functions are called methods and must live inside classes. A small indignity. Get used to it.',
      sections: [
        {
          type: 'code',
          language: 'java',
          content: `public class Methods {

    // Static method — called on class, not instance
    public static int add(int a, int b) {
        return a + b;
    }

    // Method overloading — same name, different params
    public static double add(double a, double b) {
        return a + b;
    }

    public static String add(String a, String b) {
        return a + b;
    }

    // Varargs — variable number of arguments
    public static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) total += n;
        return total;
    }

    // Recursive method
    public static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    // Return multiple values via array or object
    public static int[] minMax(int[] arr) {
        int min = arr[0], max = arr[0];
        for (int n : arr) {
            if (n < min) min = n;
            if (n > max) max = n;
        }
        return new int[]{min, max};
    }

    public static void main(String[] args) {
        System.out.println(add(3, 4));         // 7 (int version)
        System.out.println(add(3.14, 2.71));   // 5.85 (double version)
        System.out.println(add("Hello", "!")); // Hello! (String version)

        System.out.println(sum(1, 2, 3, 4, 5)); // 15

        System.out.println(factorial(10));  // 3628800

        int[] result = minMax(new int[]{5, 2, 8, 1, 9});
        System.out.println("Min: " + result[0] + ", Max: " + result[1]);
    }
}`,
        },
      ],
    },
    {
      slug: 'arrays-collections',
      title: 'Arrays & Collections',
      intro: 'Java arrays are fixed-size. For anything dynamic, use the Collections framework — ArrayList, HashMap, HashSet. You\'ll use these constantly.',
      sections: [
        {
          type: 'code',
          language: 'java',
          content: `import java.util.*;
import java.util.stream.*;

public class Collections {
    public static void main(String[] args) {
        // Array — fixed size
        int[] nums = {5, 2, 8, 1, 9, 3};
        Arrays.sort(nums);  // sorts in place
        System.out.println(Arrays.toString(nums));  // [1, 2, 3, 5, 8, 9]
        System.out.println(nums.length);            // 6

        // ArrayList — dynamic, resizable array
        List<String> fruits = new ArrayList<>();
        fruits.add("apple");
        fruits.add("banana");
        fruits.add("cherry");
        fruits.remove("banana");
        fruits.add(0, "avocado");  // insert at index 0

        System.out.println(fruits.size());          // 3
        System.out.println(fruits.get(0));          // avocado
        System.out.println(fruits.contains("apple")); // true

        Collections.sort(fruits);
        System.out.println(fruits);

        // HashMap
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Carol", 92);

        System.out.println(scores.get("Alice"));        // 95
        System.out.println(scores.getOrDefault("Dave", 0)); // 0

        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        // HashSet — unique values
        Set<Integer> set = new HashSet<>(Arrays.asList(1, 2, 3, 2, 1));
        System.out.println(set.size());  // 3
    }
}`,
        },
        {
          type: 'code',
          language: 'java',
          content: `import java.util.*;
import java.util.stream.*;

public class Streams {
    public static void main(String[] args) {
        // Java Streams — functional-style collection operations (Java 8+)
        List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // filter, map, collect
        List<Integer> evenSquares = numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .collect(Collectors.toList());

        System.out.println(evenSquares);  // [4, 16, 36, 64, 100]

        // reduce
        int sum = numbers.stream().reduce(0, Integer::sum);
        System.out.println("Sum: " + sum);  // 55

        // min, max, average
        OptionalInt max = numbers.stream().mapToInt(Integer::intValue).max();
        max.ifPresent(m -> System.out.println("Max: " + m));  // Max: 10

        // String joining
        List<String> words = List.of("hello", "world", "java");
        String joined = words.stream().collect(Collectors.joining(", "));
        System.out.println(joined);  // hello, world, java

        // Count
        long count = numbers.stream().filter(n -> n > 5).count();
        System.out.println("Count > 5: " + count);  // 5
    }
}`,
        },
        {
          type: 'note',
          content: 'Use List.of(), Map.of(), Set.of() for immutable collections (Java 9+). For mutable collections, use new ArrayList<>(), new HashMap<>(), etc. Immutable collections are preferred when you don\'t need to modify them.',
        },
      ],
    },
    {
      slug: 'classes-oop',
      title: 'Classes & OOP',
      intro: 'Java is fully committed to OOP. Everything is a class. Even the Hello World program. Embrace it.',
      sections: [
        {
          type: 'code',
          language: 'java',
          content: `// Abstract class
public abstract class Animal {
    private String name;  // private — encapsulation

    public Animal(String name) { this.name = name; }

    public String getName() { return name; }  // getter

    public abstract String speak();  // subclasses must implement

    public String describe() {  // can be overridden
        return name + " says " + speak();
    }
}

// Interface
public interface Trainable {
    void learn(String trick);
    List<String> getTricks();

    default String showTricks() {  // default implementation (Java 8+)
        return String.join(", ", getTricks());
    }
}

// Concrete class
public class Dog extends Animal implements Trainable {
    private List<String> tricks = new ArrayList<>();

    public Dog(String name) { super(name); }

    @Override
    public String speak() { return "Woof!"; }

    @Override
    public void learn(String trick) { tricks.add(trick); }

    @Override
    public List<String> getTricks() { return tricks; }

    @Override
    public String describe() {
        return super.describe() + " (knows " + tricks.size() + " tricks)";
    }
}

// Java 16+ records — immutable data classes
record Point(double x, double y) {
    // Compact constructor for validation
    Point {
        if (Double.isNaN(x) || Double.isNaN(y))
            throw new IllegalArgumentException("Coordinates cannot be NaN");
    }

    public double distance() {
        return Math.sqrt(x * x + y * y);
    }
}`,
        },
        {
          type: 'code',
          language: 'java',
          content: `// Generics
public class Pair<A, B> {
    private final A first;
    private final B second;

    public Pair(A first, B second) {
        this.first = first;
        this.second = second;
    }

    public A getFirst() { return first; }
    public B getSecond() { return second; }

    @Override
    public String toString() {
        return "(" + first + ", " + second + ")";
    }
}

// Generic method
public static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

// Main usage
public static void main(String[] args) {
    Dog dog = new Dog("Rex");
    dog.learn("sit");
    dog.learn("shake");
    System.out.println(dog.describe());
    System.out.println(dog.showTricks());

    Point p = new Point(3, 4);
    System.out.println("Distance: " + p.distance());

    Pair<String, Integer> pair = new Pair<>("Alice", 30);
    System.out.println(pair);

    System.out.println(max("apple", "banana"));   // banana
    System.out.println(max(42, 17));               // 42
}`,
        },
      ],
    },
    {
      slug: 'exceptions',
      title: 'Exception Handling',
      intro: 'Java has checked exceptions, which force you to handle or declare errors. This is either responsible engineering or the most annoying thing in existence, depending on your morning.',
      sections: [
        {
          type: 'code',
          language: 'java',
          content: `import java.io.*;
import java.util.*;

public class ExceptionHandling {
    // Checked exception — must declare or catch it
    public static String readFile(String path) throws IOException {
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append("\\n");
            }
        }
        return sb.toString();  // auto-closes reader (try-with-resources)
    }

    // Custom exception
    static class InsufficientFundsException extends RuntimeException {
        private final double amount;
        private final double balance;

        InsufficientFundsException(double amount, double balance) {
            super(String.format("Cannot withdraw %.2f, balance is %.2f", amount, balance));
            this.amount = amount;
            this.balance = balance;
        }

        public double getAmount() { return amount; }
        public double getBalance() { return balance; }
    }

    public static void main(String[] args) {
        // try-catch-finally
        try {
            String content = readFile("data.txt");
            System.out.println(content);
        } catch (FileNotFoundException e) {
            System.err.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.err.println("IO error: " + e.getMessage());
        } finally {
            System.out.println("Always runs");
        }

        // Multi-catch (Java 7+)
        try {
            int[] arr = {1, 2, 3};
            int n = Integer.parseInt("abc");
            System.out.println(arr[n]);
        } catch (NumberFormatException | ArrayIndexOutOfBoundsException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}`,
        },
        {
          type: 'note',
          content: 'RuntimeException and its subclasses are unchecked — you don\'t have to declare or catch them. IOException, SQLException, and similar are checked — you must handle them. Design custom exceptions: extend RuntimeException for unchecked, Exception for checked.',
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: Simple Bank',
      intro: 'A console banking application that puts together classes, collections, exceptions, and user input.',
      sections: [
        {
          type: 'code',
          language: 'java',
          content: `import java.util.*;

class Account {
    private static int nextId = 1000;
    private final int id;
    private final String owner;
    private double balance;
    private final List<String> transactions = new ArrayList<>();

    Account(String owner, double initial) {
        this.id = nextId++;
        this.owner = owner;
        this.balance = initial;
        transactions.add(String.format("Initial deposit: +$%.2f", initial));
    }

    void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        balance += amount;
        transactions.add(String.format("Deposit: +$%.2f (balance: $%.2f)", amount, balance));
    }

    void withdraw(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        if (amount > balance) throw new IllegalStateException(
            String.format("Insufficient funds: needed $%.2f, have $%.2f", amount, balance));
        balance -= amount;
        transactions.add(String.format("Withdrawal: -$%.2f (balance: $%.2f)", amount, balance));
    }

    void printStatement() {
        System.out.printf("%nAccount #%d — %s%n", id, owner);
        System.out.printf("Balance: $%.2f%n", balance);
        System.out.println("Transactions:");
        transactions.forEach(t -> System.out.println("  " + t));
    }

    int getId() { return id; }
    String getOwner() { return owner; }
    double getBalance() { return balance; }
}

public class Bank {
    private final Map<Integer, Account> accounts = new HashMap<>();
    private final Scanner scanner = new Scanner(System.in);

    void createAccount() {
        System.out.print("Owner name: ");
        String name = scanner.nextLine();
        System.out.print("Initial deposit: $");
        double amount = scanner.nextDouble(); scanner.nextLine();
        Account acc = new Account(name, amount);
        accounts.put(acc.getId(), acc);
        System.out.printf("Account created: #%d%n", acc.getId());
    }

    Account findAccount() {
        System.out.print("Account ID: ");
        int id = scanner.nextInt(); scanner.nextLine();
        Account acc = accounts.get(id);
        if (acc == null) throw new NoSuchElementException("Account not found: " + id);
        return acc;
    }

    public static void main(String[] args) {
        Bank bank = new Bank();
        Scanner sc = new Scanner(System.in);
        System.out.println("=== Simple Bank ===");

        while (true) {
            System.out.println("\\n1) New account  2) Deposit  3) Withdraw  4) Statement  5) Quit");
            System.out.print("> ");
            String choice = sc.nextLine().trim();
            try {
                switch (choice) {
                    case "1" -> bank.createAccount();
                    case "2" -> {
                        Account a = bank.findAccount();
                        System.out.print("Amount: $");
                        a.deposit(sc.nextDouble()); sc.nextLine();
                        System.out.println("Deposited.");
                    }
                    case "3" -> {
                        Account a = bank.findAccount();
                        System.out.print("Amount: $");
                        a.withdraw(sc.nextDouble()); sc.nextLine();
                        System.out.println("Withdrawn.");
                    }
                    case "4" -> bank.findAccount().printStatement();
                    case "5" -> { System.out.println("Goodbye!"); return; }
                    default -> System.out.println("Invalid choice");
                }
            } catch (Exception e) {
                System.err.println("Error: " + e.getMessage());
            }
        }
    }
}`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `javac Bank.java
java Bank`,
        },
      ],
    },
    {
      slug: 'interfaces-generics',
      title: 'Interfaces, Abstract Classes & Generics',
      intro: 'Interfaces describe what a type can do; generics let one class or method work with many types without giving up compile-time safety. Together they are the backbone of every Java library you will ever use.',
      sections: [
        {
          type: 'code',
          language: 'java',
          content: `// An interface is a contract: methods without bodies (plus default/static ones).
interface Shape {
    double area();                       // every implementer must provide this
    double perimeter();

    default String describe() {          // default method — inherited body
        return String.format("%s: area=%.2f", getClass().getSimpleName(), area());
    }

    static Shape unitSquare() {          // static factory on the interface
        return new Rectangle(1, 1);
    }
}

record Rectangle(double width, double height) implements Shape {
    public double area()      { return width * height; }
    public double perimeter() { return 2 * (width + height); }
}

record Circle(double radius) implements Shape {
    public double area()      { return Math.PI * radius * radius; }
    public double perimeter() { return 2 * Math.PI * radius; }
}

// A class can implement MANY interfaces but extend only ONE class.
public class Demo {
    public static void main(String[] args) {
        List<Shape> shapes = List.of(new Rectangle(3, 4), new Circle(2));
        for (Shape s : shapes) System.out.println(s.describe());
    }
}`,
        },
        {
          type: 'code',
          language: 'java',
          content: `// Abstract classes sit between interfaces and concrete classes:
// they hold STATE and constructors, which interfaces cannot.
abstract class Employee {
    protected final String name;
    protected final double baseSalary;

    protected Employee(String name, double baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }

    public abstract double monthlyPay();      // subclasses must define

    public String payslip() {                 // shared behaviour
        return "%s: %.2f".formatted(name, monthlyPay());
    }
}

class Salaried extends Employee {
    Salaried(String name, double annual) { super(name, annual); }
    public double monthlyPay() { return baseSalary / 12; }
}

class Contractor extends Employee {
    private final int hours;
    Contractor(String name, double rate, int hours) {
        super(name, rate);
        this.hours = hours;
    }
    public double monthlyPay() { return baseSalary * hours; }
}

// Rule of thumb: interface for capability ("Comparable", "Closeable"),
// abstract class when subclasses genuinely share fields and construction logic.`,
        },
        {
          type: 'code',
          language: 'java',
          content: `import java.util.*;

// A generic class: T is a placeholder chosen by the caller.
class Box<T> {
    private T value;
    public void put(T value) { this.value = value; }
    public T get()           { return value; }
}

// Bounded type parameter: T must be Comparable with itself.
class Range<T extends Comparable<T>> {
    private final T low, high;
    Range(T low, T high) { this.low = low; this.high = high; }
    boolean contains(T v) { return low.compareTo(v) <= 0 && high.compareTo(v) >= 0; }
}

public class Generics {
    // Generic method — <T> declared before the return type
    static <T> List<T> repeat(T item, int times) {
        List<T> out = new ArrayList<>();
        for (int i = 0; i < times; i++) out.add(item);
        return out;
    }

    // Wildcards control what you can read and write:
    //   ? extends Number  -> you can READ Numbers  (producer)
    //   ? super Integer   -> you can WRITE Integers (consumer)
    static double sum(List<? extends Number> nums) {
        double total = 0;
        for (Number n : nums) total += n.doubleValue();
        return total;
    }

    static void addInts(List<? super Integer> sink) {
        sink.add(1);
        sink.add(2);
    }

    public static void main(String[] args) {
        Box<String> box = new Box<>();
        box.put("hello");
        System.out.println(box.get().length());     // no cast needed

        System.out.println(new Range<>(1, 10).contains(7));   // true
        System.out.println(sum(List.of(1, 2.5, 3L)));         // 6.5
        System.out.println(repeat("x", 3));                   // [x, x, x]
    }
}`,
        },
        {
          type: 'note',
          content: 'Java generics are erased at runtime: List<String> and List<Integer> are the same class once compiled. That is why you cannot write "new T[]" or check "x instanceof List<String>". The types protect you at compile time only.',
        },
        {
          type: 'tip',
          content: 'Remember PECS — Producer Extends, Consumer Super. If a parameter supplies values to you, use "? extends T". If it receives values from you, use "? super T".',
        },
      ],
    },
    {
      slug: 'streams-lambdas',
      title: 'Lambdas & the Stream API',
      intro: 'Streams turn loops-with-a-mutable-accumulator into a readable pipeline: filter, map, collect. They are the single biggest readability upgrade in modern Java.',
      sections: [
        {
          type: 'code',
          language: 'java',
          content: `import java.util.function.*;

// A lambda is a compact implementation of a single-method interface.
Runnable task            = () -> System.out.println("running");
Function<String, Integer> len = s -> s.length();
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
Predicate<String> isEmpty     = String::isEmpty;      // method reference
Supplier<List<String>> maker   = ArrayList::new;      // constructor reference
Consumer<String> printer       = System.out::println;

// The core functional interfaces you will meet constantly:
//   Function<T,R>   R apply(T)      transform
//   Predicate<T>    boolean test(T) filter
//   Consumer<T>     void accept(T)  side effect
//   Supplier<T>     T get()         produce
//   UnaryOperator<T>  Function<T,T>

System.out.println(len.apply("hello"));       // 5
System.out.println(add.apply(2, 3));          // 5

// Composition
Function<Integer, Integer> doubled = x -> x * 2;
Function<Integer, Integer> plusTen = x -> x + 10;
System.out.println(doubled.andThen(plusTen).apply(5));   // 20
System.out.println(doubled.compose(plusTen).apply(5));   // 30`,
        },
        {
          type: 'code',
          language: 'java',
          content: `import java.util.*;
import java.util.stream.*;

record Order(String customer, String region, double total, int items) {}

List<Order> orders = List.of(
    new Order("Ada",  "EU", 120.50, 3),
    new Order("Bob",  "US",  45.00, 1),
    new Order("Cleo", "EU", 310.75, 8),
    new Order("Dan",  "US", 210.00, 4),
    new Order("Ada",  "EU",  60.25, 2)
);

// Filter -> map -> collect
List<String> bigEuCustomers = orders.stream()
    .filter(o -> o.region().equals("EU"))
    .filter(o -> o.total() > 100)
    .map(Order::customer)
    .distinct()
    .sorted()
    .toList();                                   // [Ada, Cleo]

// Reductions
double revenue   = orders.stream().mapToDouble(Order::total).sum();
OptionalDouble avg = orders.stream().mapToDouble(Order::total).average();
Optional<Order> biggest = orders.stream().max(Comparator.comparingDouble(Order::total));

System.out.println(revenue);                     // 746.5
System.out.println(biggest.map(Order::customer).orElse("none"));   // Cleo

// Sorting by several keys
List<Order> sorted = orders.stream()
    .sorted(Comparator.comparing(Order::region)
                      .thenComparing(Comparator.comparingDouble(Order::total).reversed()))
    .toList();`,
        },
        {
          type: 'code',
          language: 'java',
          content: `import java.util.*;
import java.util.stream.*;

// Collectors do the heavy lifting for grouping and summarising.
Map<String, List<Order>> byRegion = orders.stream()
    .collect(Collectors.groupingBy(Order::region));

Map<String, Double> revenueByRegion = orders.stream()
    .collect(Collectors.groupingBy(Order::region,
             Collectors.summingDouble(Order::total)));
// {EU=491.5, US=255.0}

Map<Boolean, List<Order>> split = orders.stream()
    .collect(Collectors.partitioningBy(o -> o.total() >= 100));

String names = orders.stream()
    .map(Order::customer)
    .distinct()
    .collect(Collectors.joining(", ", "[", "]"));   // [Ada, Bob, Cleo, Dan]

DoubleSummaryStatistics stats = orders.stream()
    .collect(Collectors.summarizingDouble(Order::total));
System.out.println(stats.getMax() + " " + stats.getCount());

// flatMap flattens nested structures
List<List<String>> tags = List.of(List.of("a", "b"), List.of("c"));
List<String> flat = tags.stream().flatMap(List::stream).toList();  // [a, b, c]

// Generating streams
List<Integer> firstTen = Stream.iterate(1, n -> n + 1).limit(10).toList();
IntStream.rangeClosed(1, 5).forEach(System.out::println);`,
        },
        {
          type: 'warning',
          content: 'A stream is consumed once. Calling a second terminal operation on the same stream throws IllegalStateException ("stream has already been operated upon or closed"). Build a new stream from the source instead.',
        },
        {
          type: 'note',
          content: 'Nothing runs until a terminal operation (toList, collect, forEach, sum, findFirst). Intermediate steps like filter and map only describe the pipeline — that laziness is what lets streams short-circuit on findFirst or limit.',
        },
      ],
    },
    {
      slug: 'concurrency',
      title: 'Threads, Executors & Concurrency',
      intro: 'Java has real OS threads, and since Java 21, cheap virtual threads. The hard part is never starting work in parallel — it is sharing data safely between the pieces.',
      sections: [
        {
          type: 'code',
          language: 'java',
          content: `import java.util.concurrent.*;
import java.util.*;

public class Concurrency {
    public static void main(String[] args) throws Exception {
        // Do not create raw Threads by hand — use an executor pool.
        ExecutorService pool = Executors.newFixedThreadPool(4);

        List<Callable<Integer>> jobs = new ArrayList<>();
        for (int i = 1; i <= 8; i++) {
            final int n = i;
            jobs.add(() -> { Thread.sleep(100); return n * n; });
        }

        List<Future<Integer>> futures = pool.invokeAll(jobs);
        int total = 0;
        for (Future<Integer> f : futures) total += f.get();   // get() blocks
        System.out.println("total = " + total);               // 204

        pool.shutdown();
        pool.awaitTermination(5, TimeUnit.SECONDS);

        // Java 21+: virtual threads — millions of them, cheap to block
        try (var vt = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 10_000; i++) {
                vt.submit(() -> { Thread.sleep(1000); return null; });
            }
        }   // close() waits for all tasks
    }
}`,
        },
        {
          type: 'code',
          language: 'java',
          content: `import java.util.concurrent.*;
import java.util.concurrent.atomic.*;

// The classic bug: two threads incrementing the same field.
class Counter {
    private int count = 0;
    void increment() { count++; }              // NOT atomic: read, add, write
    int get() { return count; }
}

// Three correct fixes:
class SyncCounter {
    private int count = 0;
    synchronized void increment() { count++; }        // 1. lock the method
    synchronized int get() { return count; }
}

class AtomicCounter {
    private final AtomicInteger count = new AtomicInteger();
    void increment() { count.incrementAndGet(); }     // 2. atomic primitive
    int get() { return count.get(); }
}

class LockCounter {
    private final java.util.concurrent.locks.ReentrantLock lock =
        new java.util.concurrent.locks.ReentrantLock();
    private int count = 0;
    void increment() {                                 // 3. explicit lock
        lock.lock();
        try { count++; } finally { lock.unlock(); }    // ALWAYS unlock in finally
    }
}

// Concurrent collections instead of manual locking
ConcurrentHashMap<String, Integer> hits = new ConcurrentHashMap<>();
hits.merge("/home", 1, Integer::sum);
BlockingQueue<String> queue = new LinkedBlockingQueue<>(100);`,
        },
        {
          type: 'code',
          language: 'java',
          content: `import java.util.concurrent.*;

// CompletableFuture: composable async work without blocking on get()
CompletableFuture<String> user   = CompletableFuture.supplyAsync(() -> fetchUser(42));
CompletableFuture<String> orders = CompletableFuture.supplyAsync(() -> fetchOrders(42));

CompletableFuture<String> combined = user
    .thenCombine(orders, (u, o) -> u + " has " + o)
    .thenApply(String::toUpperCase)
    .exceptionally(err -> "failed: " + err.getMessage())
    .orTimeout(3, TimeUnit.SECONDS);

System.out.println(combined.join());

// Chain dependent calls with thenCompose (flatMap for futures)
CompletableFuture<Integer> pipeline =
    CompletableFuture.supplyAsync(() -> 21)
        .thenCompose(n -> CompletableFuture.supplyAsync(() -> n * 2));

static String fetchUser(int id)   { return "user" + id; }
static String fetchOrders(int id) { return "3 orders"; }`,
        },
        {
          type: 'warning',
          content: 'Shared mutable state is the source of nearly every concurrency bug. Prefer immutable objects (records, List.of, final fields) and message passing through a queue. A field only one thread ever writes needs no lock at all.',
        },
        {
          type: 'tip',
          content: 'If two threads take the same two locks in different orders, they will eventually deadlock. Always acquire locks in a fixed global order, or restructure so only one lock is needed.',
        },
      ],
    },
    {
      slug: 'file-io-records',
      title: 'Files, I/O & Modern Java Features',
      intro: 'Reading and writing files in Java used to mean five nested streams. java.nio.file makes it one line — and records, sealed types, and pattern matching make the surrounding code far shorter than the Java you may have seen before.',
      sections: [
        {
          type: 'code',
          language: 'java',
          content: `import java.nio.file.*;
import java.io.*;
import java.util.*;
import java.util.stream.*;

Path path = Path.of("data", "notes.txt");

// Whole-file operations
Files.writeString(path, "first line\\nsecond line\\n");
String all = Files.readString(path);
List<String> lines = Files.readAllLines(path);

// Append instead of overwrite
Files.writeString(path, "third line\\n", StandardOpenOption.APPEND);

// Stream a large file lazily — never loads it all into memory
try (Stream<String> stream = Files.lines(path)) {
    long errors = stream.filter(l -> l.contains("ERROR")).count();
    System.out.println(errors);
}

// Buffered writer for many small writes
try (BufferedWriter w = Files.newBufferedWriter(Path.of("out.csv"))) {
    w.write("id,name");
    w.newLine();
    w.write("1,Ada");
    w.newLine();
}

// Paths and directories
Files.createDirectories(Path.of("data/archive"));
System.out.println(Files.exists(path) + " " + Files.size(path));
try (Stream<Path> walk = Files.walk(Path.of("data"))) {
    walk.filter(Files::isRegularFile).forEach(System.out::println);
}`,
        },
        {
          type: 'code',
          language: 'java',
          content: `// Records: immutable data carriers in one line.
// You get constructor, accessors, equals, hashCode and toString for free.
record Point(int x, int y) {
    // Compact constructor for validation
    Point {
        if (x < 0 || y < 0) throw new IllegalArgumentException("negative coordinate");
    }
    // Extra methods are allowed
    double distanceTo(Point other) {
        return Math.hypot(x - other.x, y - other.y);
    }
    static Point origin() { return new Point(0, 0); }
}

var a = new Point(3, 4);
System.out.println(a);                       // Point[x=3, y=4]
System.out.println(a.distanceTo(Point.origin()));   // 5.0
System.out.println(a.equals(new Point(3, 4)));      // true — value equality

// Sealed types: a closed set of subtypes the compiler knows about
sealed interface Event permits Click, KeyPress, Scroll {}
record Click(int x, int y) implements Event {}
record KeyPress(char key) implements Event {}
record Scroll(int amount) implements Event {}`,
        },
        {
          type: 'code',
          language: 'java',
          content: `// Pattern matching over a sealed hierarchy — exhaustive, no default needed.
static String describe(Event e) {
    return switch (e) {
        case Click(int x, int y) when x == y -> "diagonal click at " + x;
        case Click(int x, int y)             -> "click at " + x + "," + y;
        case KeyPress(char k)                -> "key " + k;
        case Scroll s                        -> "scrolled " + s.amount();
    };
}

// instanceof pattern removes the cast
static int length(Object o) {
    if (o instanceof String s) return s.length();     // s is in scope, already cast
    if (o instanceof Collection<?> c) return c.size();
    return -1;
}

// Text blocks for multi-line strings
String query = """
    SELECT id, name
    FROM users
    WHERE active = true
    ORDER BY name
    """;

// var for local type inference (the type is still static, just inferred)
var counts = new HashMap<String, Integer>();
for (var entry : counts.entrySet()) { /* ... */ }`,
        },
        {
          type: 'note',
          content: 'try-with-resources (the parentheses after try) closes anything implementing AutoCloseable, even when an exception is thrown. Any stream over a file — Files.lines, Files.walk — must be closed this way or you leak file handles.',
        },
        {
          type: 'tip',
          content: 'Reach for records whenever a class exists only to hold data: DTOs, API responses, coordinates, config. If you find yourself writing getters and equals by hand, a record probably fits.',
        },
      ],
    },
  ],
}
