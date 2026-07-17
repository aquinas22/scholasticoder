import { Language } from '../types'

export const php: Language = {
  slug: 'php',
  name: 'PHP',
  tagline: 'The language that runs most of the web.',
  description: "PHP powers roughly three-quarters of all websites with a known server language — WordPress alone is over 40% of the web. Modern PHP (8.x) is fast, typed, and pleasant, a world away from its messy reputation. If you want web development jobs, PHP is a quietly enormous market.",
  accentColor: '#777BB4',
  textOnAccent: '#fff',
  icon: 'Ph',
  difficulty: 'beginner',
  usedFor: ['Web Backends', 'WordPress', 'APIs', 'E-commerce', 'Server-side Rendering'],
  notableUsers: ['WordPress', 'Wikipedia', 'Slack', 'Etsy', 'Laravel'],
  setup: {
    description: "Install PHP and you get a built-in development web server — no Apache or nginx needed to learn.",
    windows: `winget install PHP.PHP.8.3
# Or grab a zip from https://windows.php.net

php --version

# Run a file:
php hello.php

# Start the built-in dev server in a folder:
php -S localhost:8000`,
    mac: `brew install php

php --version
php hello.php
php -S localhost:8000`,
    linux: `sudo apt install php-cli    # Debian/Ubuntu
sudo dnf install php-cli    # Fedora

php --version
php hello.php
php -S localhost:8000`,
  },
  lessons: [
    {
      slug: 'hello-php',
      title: 'Hello, PHP',
      intro: "PHP's superpower and its quirk in one: PHP files are HTML files with code embedded in <?php ?> tags. The server runs the code, the browser sees only the result.",
      sections: [
        {
          type: 'code',
          language: 'php',
          content: `<?php
// hello.php — run with: php hello.php
echo "Hello, World!\\n";

$name = "Ada";              // variables start with $
$age  = 17;
echo "I'm $name, age $age\\n";   // variables interpolate in "..."
echo 'No interpolation in single quotes: $name' . "\\n";
// . is string concatenation`,
        },
        {
          type: 'text',
          content: "Every variable starts with $ — love it or hate it, you always know what's a variable. Double-quoted strings interpolate variables; single-quoted strings are literal. Statements end with semicolons.",
        },
        {
          type: 'code',
          language: 'php',
          content: `<!-- index.php — HTML with embedded PHP.
     Serve with: php -S localhost:8000 -->
<!DOCTYPE html>
<html>
  <body>
    <h1>Today is <?php echo date('l'); ?></h1>

    <?php if (date('G') < 12): ?>
      <p>Good morning!</p>
    <?php else: ?>
      <p>Good afternoon!</p>
    <?php endif; ?>
  </body>
</html>`,
        },
        {
          type: 'note',
          content: "This embed-in-HTML model is why PHP conquered the web in the 2000s: rename page.html to page.php, sprinkle in dynamic bits, done. Modern PHP apps keep logic in pure-PHP files and use templates for HTML, but the model remains request → PHP runs → HTML out.",
        },
      ],
    },
    {
      slug: 'types-and-control-flow',
      title: 'Types, Conditions & Loops',
      intro: "PHP is dynamically typed but has grown a real type system. Learn the comparison gotcha (== vs ===) early — it's the classic PHP interview question for a reason.",
      sections: [
        {
          type: 'code',
          language: 'php',
          content: `<?php
$int    = 42;
$float  = 3.14;
$string = "hello";
$bool   = true;
$null   = null;

var_dump($int);     // int(42) — var_dump shows type + value
gettype($float);    // "double"

// Conditions:
$grade = 87;
if ($grade >= 90) {
    echo "A";
} elseif ($grade >= 80) {
    echo "B";
} else {
    echo "C";
}

// match (PHP 8) — like switch but an expression, no fallthrough:
$label = match(true) {
    $grade >= 90 => "excellent",
    $grade >= 80 => "good",
    default      => "keep going",
};`,
        },
        {
          type: 'warning',
          content: "== compares after type juggling: 0 == 'a' was true in old PHP, '1' == '01' is still true. === compares value AND type with no conversions. Use === and !== always; reserve == for the rare case you truly want coercion.",
        },
        {
          type: 'code',
          language: 'php',
          content: `<?php
for ($i = 0; $i < 5; $i++) {
    echo $i;
}

$count = 0;
while ($count < 3) {
    $count++;
}

// foreach is the loop you'll use most (arrays, next lesson):
foreach ([1, 2, 3] as $n) {
    echo $n * 2;      // 2 4 6
}

// Ternary and null coalescing:
$status = $age >= 18 ? "adult" : "minor";
$name   = $input ?? "anonymous";   // default if null/unset`,
        },
      ],
    },
    {
      slug: 'arrays',
      title: 'Arrays — PHP\'s Swiss Army Knife',
      intro: "PHP has one collection type doing the job of lists, dictionaries, sets, and tuples: the array. Master it and you've mastered half of PHP.",
      sections: [
        {
          type: 'code',
          language: 'php',
          content: `<?php
// List-style (sequential integer keys):
$fruits = ["apple", "banana", "cherry"];
echo $fruits[0];          // apple
$fruits[] = "date";       // append
count($fruits);           // 4

// Map-style (string keys) — an 'associative array':
$student = [
    "name"  => "Ada",
    "age"   => 17,
    "grade" => 95,
];
echo $student["name"];    // Ada
$student["email"] = "ada@example.com";   // add a key

// Both styles in foreach:
foreach ($fruits as $fruit) { echo $fruit; }
foreach ($student as $key => $value) {
    echo "$key: $value\\n";
}`,
        },
        {
          type: 'code',
          language: 'php',
          content: `<?php
$nums = [3, 1, 4, 1, 5, 9, 2, 6];

sort($nums);                        // sorts in place
in_array(5, $nums);                 // true
array_search(9, $nums);             // index of 9

// The functional trio:
$doubled = array_map(fn($n) => $n * 2, $nums);
$evens   = array_filter($nums, fn($n) => $n % 2 === 0);
$sum     = array_reduce($nums, fn($acc, $n) => $acc + $n, 0);

// Slicing and merging:
array_slice($nums, 0, 3);           // first three
array_merge($nums, [7, 8]);
implode(", ", $fruits);             // array -> string
explode(",", "a,b,c");              // string -> array`,
        },
        {
          type: 'tip',
          content: "PHP has 80+ array_* functions — before writing a loop, check if one exists. fn($x) => ... is the short arrow-function syntax (PHP 7.4+); it auto-captures outer variables.",
        },
      ],
    },
    {
      slug: 'functions',
      title: 'Functions & Type Declarations',
      intro: "Modern PHP functions look almost like TypeScript: typed parameters, return types, default and named arguments. Use the types — they turn silent bugs into loud errors.",
      sections: [
        {
          type: 'code',
          language: 'php',
          content: `<?php
declare(strict_types=1);   // put this at the top of every file

function greet(string $name, int $times = 1): string {
    return str_repeat("Hello, $name! ", $times);
}

echo greet("Ada");            // Hello, Ada!
echo greet("Ada", times: 3);  // named argument (PHP 8)

greet(42);   // TypeError — thanks to strict_types

// Nullable and union types:
function findUser(int $id): ?string { /* string or null */ }
function parse(string|int $input): array { /* union type */ }`,
        },
        {
          type: 'note',
          content: "Without declare(strict_types=1), PHP silently coerces arguments ('42' becomes 42). With it, wrong types throw. Every modern codebase turns it on — make it a habit from day one.",
        },
        {
          type: 'code',
          language: 'php',
          content: `<?php
// Anonymous functions and closures:
$multiply = function (int $a, int $b): int {
    return $a * $b;
};
echo $multiply(3, 4);   // 12

// Long closures need 'use' to capture variables:
$factor = 10;
$scale = function (int $n) use ($factor): int {
    return $n * $factor;
};

// Arrow functions capture automatically:
$scale2 = fn(int $n) => $n * $factor;

// Variadics and spread:
function sum(int ...$nums): int {
    return array_sum($nums);
}
sum(1, 2, 3);            // 6
sum(...[4, 5, 6]);       // 15`,
        },
      ],
    },
    {
      slug: 'classes-oop',
      title: 'Classes & Modern OOP',
      intro: "PHP's object system is genuinely good now. Constructor property promotion, readonly properties, enums, interfaces — this is where modern PHP shines brightest.",
      sections: [
        {
          type: 'code',
          language: 'php',
          content: `<?php
declare(strict_types=1);

class Student
{
    // Constructor property promotion (PHP 8):
    // declares + assigns the properties in one place.
    public function __construct(
        public readonly string $name,
        private int $grade = 0,
    ) {}

    public function grade(): int
    {
        return $this->grade;
    }

    public function setGrade(int $grade): void
    {
        if ($grade < 0 || $grade > 100) {
            throw new InvalidArgumentException("Grade out of range");
        }
        $this->grade = $grade;
    }
}

$ada = new Student("Ada", 95);
echo $ada->name;         // Ada  (-> accesses members)
$ada->name = "Bob";      // Error: readonly property`,
        },
        {
          type: 'code',
          language: 'php',
          content: `<?php
interface Shape
{
    public function area(): float;
}

class Circle implements Shape
{
    public function __construct(private float $radius) {}

    public function area(): float
    {
        return M_PI * $this->radius ** 2;
    }
}

// Enums (PHP 8.1) — real enums, with methods:
enum Status: string
{
    case Active    = 'active';
    case Suspended = 'suspended';

    public function label(): string
    {
        return match($this) {
            Status::Active    => 'Active student',
            Status::Suspended => 'Suspended',
        };
    }
}

$s = Status::from('active');
echo $s->label();`,
        },
        {
          type: 'tip',
          content: "Classes autoload by convention: one class per file, file path matches namespace (PSR-4 standard). You'll rarely write require statements — Composer (next lesson) generates the autoloader.",
        },
      ],
    },
    {
      slug: 'composer-ecosystem',
      title: 'Composer & the Ecosystem',
      intro: "Composer is PHP's npm — dependency manager, autoloader, and the gateway to 400,000+ packages. No modern PHP project starts without it.",
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `# Install Composer: https://getcomposer.org

composer init                    # start a project interactively
composer require guzzlehttp/guzzle   # add a package
composer require --dev phpunit/phpunit

# Installs into vendor/ and writes composer.json + composer.lock
# (commit both json and lock; ignore vendor/)`,
        },
        {
          type: 'code',
          language: 'php',
          content: `<?php
// One require gives you every installed package + your own classes:
require __DIR__ . '/vendor/autoload.php';

use GuzzleHttp\\Client;

$client = new Client();
$response = $client->get('https://api.github.com/users/octocat');
$data = json_decode($response->getBody()->getContents(), true);
echo $data['name'];`,
        },
        {
          type: 'text',
          content: "The ecosystem's center of gravity is Laravel — a full-featured web framework with an ORM, routing, queues, auth, and famously good documentation. Symfony is the other giant, more modular and the foundation many tools build on. WordPress is its own universe: older-style PHP, but half the freelance web market.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Try Laravel:
composer global require laravel/installer
laravel new blog
cd blog
php artisan serve      # dev server at localhost:8000

# Useful quality tools:
composer require --dev phpstan/phpstan   # static analysis
./vendor/bin/phpstan analyse src --level=8`,
        },
      ],
    },
    {
      slug: 'web-request-basics',
      title: 'Handling Web Requests',
      intro: "PHP's home turf: a form posts to your script, you read the input, talk to a database, and print HTML. Here's the raw version every framework abstracts.",
      sections: [
        {
          type: 'code',
          language: 'php',
          content: `<?php
// form.php — serve with: php -S localhost:8000
// $_GET  = query string params (?name=Ada)
// $_POST = submitted form fields

$name = $_POST['name'] ?? '';
?>
<!DOCTYPE html>
<html><body>
  <form method="post">
    <input name="name" placeholder="Your name">
    <button>Say hi</button>
  </form>

  <?php if ($name !== ''): ?>
    <!-- htmlspecialchars prevents XSS — ALWAYS escape output -->
    <p>Hello, <?= htmlspecialchars($name) ?>!</p>
  <?php endif; ?>
</body></html>`,
        },
        {
          type: 'warning',
          content: "Two security rules cover most PHP vulnerabilities ever written: (1) escape all output with htmlspecialchars() to stop XSS; (2) never concatenate user input into SQL — use prepared statements (PDO below) to stop SQL injection.",
        },
        {
          type: 'code',
          language: 'php',
          content: `<?php
// PDO — PHP's built-in database layer (works with SQLite,
// MySQL, Postgres...). Prepared statements keep input as data:

$db = new PDO('sqlite:app.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$db->exec('CREATE TABLE IF NOT EXISTS guests
           (id INTEGER PRIMARY KEY, name TEXT)');

$stmt = $db->prepare('INSERT INTO guests (name) VALUES (?)');
$stmt->execute([$name]);

$rows = $db->query('SELECT name FROM guests')->fetchAll();
foreach ($rows as $row) {
    echo htmlspecialchars($row['name']), "<br>";
}`,
        },
        {
          type: 'note',
          content: "Each request starts a fresh PHP process state — no memory carries over between requests. That 'shared-nothing' model is why PHP scales so simply, and why sessions ($_SESSION) exist for the state you do want to keep.",
        },
      ],
    },
  ],
}
