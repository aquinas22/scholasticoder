import { Language } from '../types'

export const kotlin: Language = {
  slug: 'kotlin',
  name: 'Kotlin',
  tagline: "A concise, modern language for Android apps that runs on the JVM.",
  description: "Kotlin is Google's recommended language for Android development. It runs on the JVM and works with existing Java libraries, while adding concise syntax, null safety in the type system and coroutines for async work.",
  accentColor: '#7F52FF',
  textOnAccent: '#fff',
  icon: 'Kt',
  difficulty: 'intermediate',
  usedFor: ['Android Apps', 'Backend (Ktor/Spring)', 'Multiplatform Mobile', 'JVM Development', 'Gradle Scripts'],
  notableUsers: ['Google', 'Netflix', 'Uber', 'Duolingo', 'JetBrains'],
  setup: {
    description: "For Android apps, install Android Studio, which includes everything you need. To learn just the language, install the Kotlin compiler (it runs anywhere Java does) or use play.kotlinlang.org in your browser with no install.",
    windows: `# Fastest: https://play.kotlinlang.org (no install)

# For Android development:
winget install Google.AndroidStudio

# Just the compiler (needs a JDK):
winget install EclipseAdoptium.Temurin.21.JDK
# then via SDKMAN in WSL/Git Bash, or scoop install kotlin

kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar`,
    mac: `# For Android development:
brew install --cask android-studio

# Just the compiler:
brew install kotlin

kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar

# Or REPL-style scripting:
kotlinc -script hello.kts`,
    linux: `# For Android development: download Android Studio
# from https://developer.android.com/studio

# Just the compiler, via SDKMAN:
curl -s "https://get.sdkman.io" | bash
sdk install kotlin

kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar`,
  },
  lessons: [
    {
      slug: 'hello-kotlin',
      title: 'Hello, Kotlin',
      intro: "Write and run your first Kotlin program and learn val, var and type inference. Kotlin needs less setup code than Java: main does not need a class and semicolons are optional.",
      sections: [
        {
          type: 'code',
          language: 'kotlin',
          content: `// hello.kt
fun main() {
    println("Hello, World!")

    val name = "Ada"        // val = read-only (use by default)
    var age = 17            // var = mutable
    age = 18                // ok
    // name = "Bob"         // error: val cannot be reassigned

    println("I'm $name, age $age")          // string templates
    println("Next year: \${age + 1}")        // expressions in {}
}`,
        },
        {
          type: 'text',
          content: "Types are inferred: val name = \"Ada\" is a String without saying so. You can be explicit — val name: String = \"Ada\" — and must be when there's nothing to infer from. Prefer val everywhere; reach for var only when reassignment is genuinely needed.",
        },
        {
          type: 'code',
          language: 'kotlin',
          content: `fun main() {
    val int: Int = 42
    val long: Long = 42L
    val double: Double = 3.14
    val bool: Boolean = true
    val char: Char = 'A'
    val text: String = "hello"

    // No implicit numeric conversions — convert explicitly:
    val d: Double = int.toDouble()

    // Multi-line strings:
    val poem = """
        Roses are red,
        code compiles blue.
    """.trimIndent()
    println(poem)
}`,
        },
        {
          type: 'note',
          content: "Kotlin compiles to JVM bytecode — the same thing Java compiles to. That's why interop is seamless: Kotlin calls Java classes directly and vice versa, and Android's entire Java API is available.",
        },
      ],
    },
    {
      slug: 'null-safety',
      title: 'Null Safety',
      intro: "Learn how Kotlin handles null. String and String? are different types, so the compiler can stop you from writing code that would throw a NullPointerException.",
      sections: [
        {
          type: 'code',
          language: 'kotlin',
          content: `fun main() {
    var name: String = "Ada"
    // name = null              // compile error — String can't be null

    var nickname: String? = null    // String? CAN be null

    // println(nickname.length)  // compile error: might be null

    // Safe call — returns null instead of crashing:
    println(nickname?.length)       // null

    // Elvis operator — default when null:
    val len = nickname?.length ?: 0

    // Chains short-circuit on the first null:
    // user?.address?.city ?: "unknown"
}`,
        },
        {
          type: 'code',
          language: 'kotlin',
          content: `fun describe(input: String?) {
    // Smart cast: after the null check, the compiler
    // treats 'input' as non-null String inside the block.
    if (input != null) {
        println("length is \${input.length}")   // no ?. needed
    }

    // let: run a block only when non-null:
    input?.let { s ->
        println("got: $s")
    }
}

fun main() {
    // !! asserts 'trust me, not null' — crashes if wrong:
    val risky: String? = null
    // val boom = risky!!.length   // NullPointerException`,
        },
        {
          type: 'warning',
          content: "Every !! in your code is a place you've told the compiler to stop protecting you. Treat it as a code smell — there's almost always a ?. / ?: / let shape that expresses the intent safely.",
        },
      ],
    },
    {
      slug: 'functions-control-flow',
      title: 'Functions, when & Expressions',
      intro: "Learn how to write functions, use default and named arguments, and branch with if and when. In Kotlin both if and when return values, which keeps many functions short.",
      sections: [
        {
          type: 'code',
          language: 'kotlin',
          content: `// Full form:
fun add(a: Int, b: Int): Int {
    return a + b
}

// Expression body — same thing:
fun add2(a: Int, b: Int) = a + b

// Default and named arguments:
fun greet(name: String, greeting: String = "Hello") =
    "$greeting, $name!"

fun main() {
    println(greet("Ada"))                       // Hello, Ada!
    println(greet("Ada", greeting = "Hey"))     // Hey, Ada!

    // if is an expression:
    val grade = 87
    val letter = if (grade >= 90) "A" else if (grade >= 80) "B" else "C"
    println(letter)
}`,
        },
        {
          type: 'code',
          language: 'kotlin',
          content: `fun describe(x: Any): String = when (x) {
    0             -> "zero"
    1, 2, 3       -> "small"
    in 4..99      -> "medium"        // ranges
    is String     -> "a string of length \${x.length}"  // smart cast
    else          -> "something else"
}

fun main() {
    // Loops:
    for (i in 1..5) print(i)          // 12345 (inclusive)
    for (i in 5 downTo 1) print(i)    // 54321
    for (i in 0 until 10 step 2) print(i)  // 02468

    val fruits = listOf("apple", "banana")
    for (fruit in fruits) println(fruit)
    for ((index, fruit) in fruits.withIndex()) println("$index: $fruit")
}`,
        },
        {
          type: 'tip',
          content: "when replaces chains of if/else and Java's switch — no fallthrough, and when used as an expression the compiler forces you to cover every case. Reach for it whenever you branch on one value.",
        },
      ],
    },
    {
      slug: 'classes-data-classes',
      title: 'Classes & Data Classes',
      intro: "Learn classes, interfaces and data classes. A data class gives you equals, hashCode, toString and copy from a single line, so you can model data with very little code.",
      sections: [
        {
          type: 'code',
          language: 'kotlin',
          content: `// Constructor is in the header; val/var make properties:
class Student(val name: String, var grade: Int = 0) {
    fun praise() = "$name is doing great!"
}

fun main() {
    val ada = Student("Ada", 95)
    println(ada.name)        // property access, no getters
    ada.grade = 97           // var property is settable
    println(ada.praise())
}

// data class: equals, hashCode, toString, copy — free:
data class Point(val x: Int, val y: Int)

fun main2() {
    val p1 = Point(1, 2)
    val p2 = Point(1, 2)
    println(p1 == p2)             // true (structural equality)
    println(p1)                   // Point(x=1, y=2)
    val p3 = p1.copy(y = 5)       // Point(x=1, y=5)
    val (x, y) = p3               // destructuring
}`,
        },
        {
          type: 'code',
          language: 'kotlin',
          content: `// Inheritance — classes are final unless marked 'open':
open class Shape(val name: String) {
    open fun area(): Double = 0.0
}

class Circle(private val radius: Double) : Shape("circle") {
    override fun area() = Math.PI * radius * radius
}

// Interfaces:
interface Drawable {
    fun draw()
    fun describe() = "a drawable thing"   // default implementation
}

// Sealed classes — a closed set of subtypes; when() knows them all:
sealed class Result
data class Success(val data: String) : Result()
data class Failure(val error: String) : Result()

fun handle(r: Result) = when (r) {
    is Success -> "got: \${r.data}"
    is Failure -> "oops: \${r.error}"
    // no else needed — compiler knows these are all the cases
}

// object — a singleton in one keyword:
object Config {
    val version = "1.0"
}`,
        },
        {
          type: 'note',
          content: "Sealed classes + when is Kotlin's answer to Rust enums / TypeScript discriminated unions: model 'a value that is one of N shapes' and the compiler guarantees every shape is handled. Android code uses this pattern for UI state constantly.",
        },
      ],
    },
    {
      slug: 'collections-lambdas',
      title: 'Collections & Lambdas',
      intro: "Learn lists, maps and lambdas, and how functions like filter, map, sumOf and groupBy replace many hand-written loops. This style is common in Android code.",
      sections: [
        {
          type: 'code',
          language: 'kotlin',
          content: `fun main() {
    // Read-only vs mutable is explicit:
    val nums = listOf(3, 1, 4, 1, 5, 9)        // List<Int>
    val mut = mutableListOf(1, 2)              // can add/remove
    mut.add(3)

    val ages = mapOf("Ada" to 17, "Alan" to 16)
    println(ages["Ada"])                        // 17
    val unique = setOf(1, 2, 2, 3)              // {1, 2, 3}

    // Lambdas: { parameters -> body }
    val double = { n: Int -> n * 2 }
    println(double(21))                         // 42
}`,
        },
        {
          type: 'code',
          language: 'kotlin',
          content: `data class Student(val name: String, val grade: Int)

fun main() {
    val students = listOf(
        Student("Ada", 95),
        Student("Alan", 88),
        Student("Grace", 92),
        Student("Linus", 76),
    )

    // 'it' = the single lambda parameter:
    val honorRoll = students
        .filter { it.grade >= 90 }
        .map { it.name }
        .sorted()
    println(honorRoll)                    // [Ada, Grace]

    val avg = students.map { it.grade }.average()
    val best = students.maxByOrNull { it.grade }
    val byPass = students.groupBy { it.grade >= 80 }
    val total = students.sumOf { it.grade }

    students.forEach { println(it.name) }

    // first/any/all/none:
    students.any { it.grade == 100 }      // false
    students.all { it.grade >= 70 }       // true
}`,
        },
        {
          type: 'tip',
          content: "When a lambda is the last argument, it moves outside the parentheses — filter { ... } rather than filter({ ... }). That trailing-lambda rule is why Kotlin DSLs (Jetpack Compose, Gradle) look like built-in syntax.",
        },
      ],
    },
    {
      slug: 'coroutines',
      title: 'Coroutines and Async Code',
      intro: "Learn coroutines, Kotlin's way of doing slow work such as network calls without freezing the app. Asynchronous code written with coroutines reads like ordinary step-by-step code.",
      sections: [
        {
          type: 'code',
          language: 'kotlin',
          content: `import kotlinx.coroutines.*

// 'suspend' marks a function that can pause without
// blocking its thread:
suspend fun fetchUser(): String {
    delay(1000)              // pretend network call (non-blocking)
    return "Ada"
}

suspend fun fetchScore(): Int {
    delay(1000)
    return 95
}

fun main() = runBlocking {
    // Sequential — takes ~2 seconds:
    val user = fetchUser()
    val score = fetchScore()
    println("$user: $score")

    // Concurrent — takes ~1 second:
    val userDeferred = async { fetchUser() }
    val scoreDeferred = async { fetchScore() }
    println("\${userDeferred.await()}: \${scoreDeferred.await()}")
}`,
        },
        {
          type: 'text',
          content: "delay() suspends the coroutine but frees the thread to do other work — unlike Thread.sleep(), which blocks it. launch starts a fire-and-forget coroutine; async starts one that returns a value you await. Structured concurrency means coroutines launched in a scope are cancelled with it — no leaked background work.",
        },
        {
          type: 'code',
          language: 'kotlin',
          content: `// The shape you'll write constantly in Android:
class ProfileViewModel : ViewModel() {
    fun loadProfile() {
        // viewModelScope dies with the screen — auto-cancel:
        viewModelScope.launch {
            val user = withContext(Dispatchers.IO) {
                api.fetchUser()        // network on IO threads
            }
            _uiState.value = UiState.Loaded(user)  // back on main
        }
    }
}

// Dispatchers = which threads:
// Dispatchers.Main    -> UI updates
// Dispatchers.IO      -> network / disk
// Dispatchers.Default -> heavy computation`,
        },
        {
          type: 'note',
          content: "Compare with JavaScript: suspend fun ≈ async function, await() ≈ await. The big extra is structured concurrency — parents own their children, cancellation propagates, and 'forgotten' background tasks can't outlive the screen that started them.",
        },
      ],
    },
    {
      slug: 'first-android-app',
      title: 'Your First Android Screen',
      intro: "Build a simple counter app with Jetpack Compose, Android's UI toolkit. You describe the screen with Kotlin functions and it redraws when state changes.",
      sections: [
        {
          type: 'code',
          language: 'kotlin',
          content: `// In Android Studio: New Project -> Empty Activity (Compose)
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CounterScreen()
        }
    }
}

@Composable
fun CounterScreen() {
    // remember + mutableStateOf = state that survives redraws.
    // When 'count' changes, Compose re-runs this function.
    var count by remember { mutableStateOf(0) }

    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text("Count: $count", fontSize = 32.sp)
        Spacer(Modifier.height(16.dp))
        Button(onClick = { count++ }) {
            Text("Tap me")
        }
    }
}`,
        },
        {
          type: 'text',
          content: "This is declarative UI: you never say 'find the text view and update it' — you describe what the screen looks like for a given state, change the state, and the framework handles the rest. Same mental model as React, in pure Kotlin.",
        },
        {
          type: 'code',
          language: 'kotlin',
          content: `// Lists — the RecyclerView replacement:
@Composable
fun StudentList(students: List<Student>) {
    LazyColumn {
        items(students) { student ->
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text(student.name)
                Text("\${student.grade}%")
            }
        }
    }
}

// LazyColumn only composes the rows on screen —
// a 10,000-item list scrolls smoothly.`,
        },
        {
          type: 'tip',
          content: "Run it: Android Studio's device manager gives you an emulator, or plug in your own phone with USB debugging enabled. From here, the official Compose pathway (developer.android.com/courses) is excellent and free.",
        },
      ],
    },
  ],
}
