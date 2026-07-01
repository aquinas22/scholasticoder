import { Language } from '../types'

export const ruby: Language = {
  slug: 'ruby',
  name: 'Ruby',
  tagline: "A programmer's best friend.",
  description: 'Ruby is a dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write. Often associated with the Ruby on Rails web framework.',
  accentColor: '#CC342D',
  textOnAccent: '#FFFFFF',
  icon: 'Rb',
  difficulty: 'beginner',
  usedFor: ['Web Development', 'Automation', 'DevOps', 'Prototyping'],
  notableUsers: ['GitHub', 'Shopify', 'Airbnb', 'Stripe'],
  setup: {
    description: 'Ruby is best installed using a version manager like rbenv or rvm on Unix-like systems. On Windows, use RubyInstaller.',
    windows: `# Download and run RubyInstaller from rubyinstaller.org
# Choose the version with MSYS2/MINGW development toolchain (DevKit).

# Verify:
ruby -v
gem -v`,
    mac: `# Using rbenv (recommended — manage multiple Ruby versions):
brew install rbenv ruby-build
rbenv install 3.3.0
rbenv global 3.3.0

# Add to your shell profile (~/.zshrc or ~/.bashrc):
eval "$(rbenv init -)"

# Verify:
ruby -v`,
    linux: `# Using rbenv (recommended):
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash

# Add to ~/.bashrc:
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"

rbenv install 3.3.0
rbenv global 3.3.0

# Verify:
ruby -v`,
  },
  lessons: [
    {
      slug: 'hello-world',
      title: 'Hello, Ruby!',
      intro: "Ruby is famous for developer happiness. Matz (Ruby's creator) has said the language is optimized for programmer joy. Let's find out if he was lying.",
      sections: [
        {
          type: 'text',
          content: 'In Ruby, you use `puts` (put string) to print to the console with a newline, or `print` if you want no newline. Ruby files end in .rb and are run with the ruby command.',
        },
        {
          type: 'code',
          language: 'ruby',
          content: `puts "Hello, World!"        # puts adds a newline
print "Hello, "             # print does not
puts "Ruby!"                # Hello, Ruby!

# p is like puts but shows the raw representation — great for debugging
p "hello"     # "hello" (with quotes)
p 42          # 42
p [1, 2, 3]   # [1, 2, 3]
p nil         # nil`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Save as hello.rb, then:
ruby hello.rb`,
        },
        {
          type: 'note',
          content: "Ruby doesn't require semicolons. Parentheses on method calls are usually optional — puts \"hello\" and puts(\"hello\") are identical. Most Rubyists omit them for single arguments.",
        },
        {
          type: 'tip',
          content: 'Use `p` instead of `puts` when debugging. `puts` calls `.to_s` on the value (hiding the type), while `p` calls `.inspect`, showing you exactly what the object is — including nil vs empty string, and array brackets.',
        },
      ],
    },
    {
      slug: 'variables-and-types',
      title: 'Variables & Types',
      intro: "Ruby is dynamically typed with a twist: everything is an object. Not almost everything — everything. Even nil, true, and integers are objects with methods.",
      sections: [
        {
          type: 'text',
          content: "Variables in Ruby need no type declaration. Ruby uses naming conventions to convey scope: lowercase/snake_case for local variables, @variable for instance variables, @@variable for class variables, CONSTANT for constants, and $global for global variables (which you should avoid).",
        },
        {
          type: 'code',
          language: 'ruby',
          content: `# Local variables
name = "Alice"
age  = 30
pi   = 3.14159

# Strings
greeting = "Hello, #{name}!"   # string interpolation with #{}
multiline = <<~TEXT
  This is a
  heredoc string.
TEXT

# Symbols — immutable, memory-efficient strings used as identifiers
status  = :active
action  = :delete
puts status.class   # Symbol
puts status == :active   # true

# nil — Ruby's null
result = nil
puts result.nil?    # true
puts result.class   # NilClass

# Type checks
puts 42.is_a?(Integer)   # true
puts "hi".is_a?(String)  # true
puts 3.14.class           # Float`,
        },
        {
          type: 'code',
          language: 'ruby',
          content: `# Type conversion
puts "42".to_i      # 42   (string to integer)
puts "3.14".to_f    # 3.14 (string to float)
puts 42.to_s        # "42" (integer to string)
puts 42.to_f        # 42.0 (integer to float)
puts nil.to_s       # ""   (nil to string — empty)
puts nil.to_a       # []   (nil to array — empty)
puts nil.to_i       # 0    (nil to integer — zero)

# Multiple assignment
a, b, c = 1, 2, 3
first, *rest = [10, 20, 30, 40]
puts first  # 10
puts rest   # [20, 30, 40]

# Swap
a, b = b, a`,
        },
        {
          type: 'tip',
          content: 'Symbols vs Strings: use symbols for identifiers and hash keys (:name, :id, :status), strings for text that will be displayed or manipulated. Symbols are faster for comparison because Ruby stores only one copy of each symbol in memory.',
        },
      ],
    },
    {
      slug: 'control-flow',
      title: 'Control Flow',
      intro: "Ruby's control flow reads like English prose. `unless` is `if not`. `until` is `while not`. You can put conditions at the end of a line. Matz really meant it about the happiness thing.",
      sections: [
        {
          type: 'code',
          language: 'ruby',
          content: `age = 20

if age >= 18
  puts "adult"
elsif age >= 13
  puts "teenager"
else
  puts "child"
end

# unless = if not
unless age < 18
  puts "can vote"
end

# Modifier form — condition at end of statement
puts "adult" if age >= 18
puts "minor" unless age >= 18

# Ternary
label = age >= 18 ? "adult" : "minor"

# case / when (like switch)
grade = "B"
result = case grade
  when "A" then "Excellent"
  when "B" then "Good"
  when "C" then "Average"
  else "Below average"
end
puts result   # Good

# case with ranges
case age
when 0..12  then puts "child"
when 13..17 then puts "teenager"
when 18..64 then puts "adult"
else             puts "senior"
end`,
        },
        {
          type: 'code',
          language: 'ruby',
          content: `# Loops
# times — most common for counted iterations
5.times { puts "hello" }

# upto / downto
1.upto(5)   { |i| print "#{i} " }   # 1 2 3 4 5
5.downto(1) { |i| print "#{i} " }   # 5 4 3 2 1

# loop with break
count = 0
loop do
  count += 1
  break if count >= 5
end

# while
i = 0
while i < 3
  puts i
  i += 1
end

# until (while not)
i = 10
until i <= 0
  i -= 3
end

# next = continue, break = break
(1..10).each do |n|
  next if n.even?
  break if n > 7
  puts n   # 1, 3, 5, 7
end`,
        },
        {
          type: 'tip',
          content: 'Ruby has no `do...while`. The idiom is `loop do ... break if condition end`. Also: `case/when` is more powerful than most switch statements — it can match ranges, regexes, classes (via `===`), and arbitrary conditions.',
        },
      ],
    },
    {
      slug: 'methods',
      title: 'Methods',
      intro: "In Ruby, methods are defined with `def`. They implicitly return the last expression, which either feels elegant or terrifying — but saves a lot of typing.",
      sections: [
        {
          type: 'text',
          content: "Methods in Ruby don't need explicit return statements — the value of the last expression is automatically returned. A trailing ? means the method returns a boolean. A trailing ! means the method is destructive (modifies the receiver in place).",
        },
        {
          type: 'code',
          language: 'ruby',
          content: `# Basic method
def greet(name)
  "Hello, #{name}!"   # implicit return
end

puts greet("Alice")   # Hello, Alice!

# Default parameters
def greet_with_title(name, title: "Dr.")
  "Hello, #{title} #{name}!"
end

puts greet_with_title("Smith")              # Hello, Dr. Smith!
puts greet_with_title("Jones", title: "Prof.")  # Hello, Prof. Jones!

# ? methods return booleans
def adult?(age)
  age >= 18
end

puts adult?(20)  # true
puts adult?(15)  # false

# Splat — variable number of arguments
def sum(*numbers)
  numbers.sum
end

puts sum(1, 2, 3, 4, 5)   # 15

# Keyword arguments with **
def describe(**opts)
  opts.each { |k, v| puts "#{k}: #{v}" }
end

describe(name: "Alice", city: "Paris", age: 30)`,
        },
        {
          type: 'code',
          language: 'ruby',
          content: `# Procs and Lambdas — anonymous functions
# Proc
square = Proc.new { |x| x ** 2 }
puts square.call(5)   # 25
puts square.(5)       # same, shorter syntax

# Lambda — stricter than Proc (checks argument count, different return behavior)
double = lambda { |x| x * 2 }
triple = ->(x) { x * 3 }   # stabby lambda syntax

puts double.call(4)  # 8
puts triple.(4)      # 12

# Method objects — convert a named method to a callable
puts [1, 2, 3].map(&method(:puts))  # prints 1, 2, 3

# yield — call the block passed to a method
def repeat(n)
  n.times { yield }
end

repeat(3) { print "hi " }   # hi hi hi

# block_given? — check if a block was passed
def optionally_fancy(name)
  if block_given?
    yield name
  else
    "Hello, #{name}"
  end
end`,
        },
        {
          type: 'tip',
          content: 'The difference between Proc and Lambda: lambdas check argument count and `return` exits only the lambda. Procs are loose about arguments and `return` exits the enclosing method. In most cases, prefer lambdas (`->`) for anonymous functions you pass around.',
        },
      ],
    },
    {
      slug: 'collections',
      title: 'Arrays, Hashes & Ranges',
      intro: "Ruby's collection classes are loaded with useful methods. You'll rarely need to write a loop — there's almost always a method for what you're trying to do.",
      sections: [
        {
          type: 'code',
          language: 'ruby',
          content: `# Arrays
fruits = ["apple", "banana", "cherry"]
puts fruits[0]      # apple
puts fruits[-1]     # cherry (negative index)
puts fruits[1..2]   # ["banana", "cherry"] (range slice)

# Mutating
fruits.push("date")        # add to end
fruits << "elderberry"     # same, << is the append operator
fruits.unshift("avocado")  # add to start
fruits.pop                 # remove from end
fruits.shift               # remove from start

# Enumerable methods — the real power
nums = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]

puts nums.sort.inspect          # [1, 1, 2, 3, 3, 4, 5, 5, 6, 9]
puts nums.uniq.inspect          # [3, 1, 4, 5, 9, 2, 6]
puts nums.min                   # 1
puts nums.max                   # 9
puts nums.sum                   # 39
puts nums.count                 # 10
puts nums.count(5)              # 2 (how many 5s)

# map / select / reject / reduce
doubled  = nums.map    { |n| n * 2 }
evens    = nums.select { |n| n.even? }
odds     = nums.reject { |n| n.even? }
total    = nums.reduce(:+)        # 39 (shorthand for sum)
product  = nums.reduce(1, :*)    # product of all

# find / all? / any? / none?
puts nums.find   { |n| n > 4 }      # 5 (first match)
puts nums.all?   { |n| n > 0 }      # true
puts nums.any?   { |n| n > 8 }      # true
puts nums.none?  { |n| n > 10 }     # true`,
        },
        {
          type: 'code',
          language: 'ruby',
          content: `# Hashes — key/value pairs
person = {
  name: "Alice",      # symbol keys (common)
  age: 30,
  city: "Paris"
}

puts person[:name]           # Alice
puts person.fetch(:country, "Unknown")   # Unknown (safe default)

# Mutating
person[:email] = "alice@example.com"
person.delete(:city)

# Iterating
person.each do |key, value|
  puts "#{key}: #{value}"
end

# Transformation
person.map { |k, v| [k, v.to_s.upcase] }.to_h
person.select { |k, v| v.is_a?(String) }
person.any?   { |k, v| v == 30 }

# Useful methods
puts person.keys.inspect       # [:name, :age, :email]
puts person.values.inspect     # ["Alice", 30, "alice@..."]
puts person.key?(:name)        # true
puts person.merge(active: true).inspect  # non-destructive merge

# Ranges
r = (1..10)          # inclusive (1 to 10)
r2 = (1...10)        # exclusive (1 to 9)

puts r.include?(5)   # true
puts r.to_a.inspect  # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
puts r.sum           # 55
puts r.min           # 1
puts ('a'..'e').to_a.inspect  # ["a", "b", "c", "d", "e"]`,
        },
        {
          type: 'tip',
          content: '`map` returns a new array. `each` returns the original. `select` keeps matches. `reject` drops matches. `reduce` collapses to a single value. When in doubt: if you need a new array, use `map` or `select`. If you just want a side effect (printing, writing), use `each`.',
        },
      ],
    },
    {
      slug: 'strings',
      title: 'Strings & Regex',
      intro: "Ruby's String class has over 100 methods. This is either brilliant or insane, but either way you won't need to import anything.",
      sections: [
        {
          type: 'code',
          language: 'ruby',
          content: `s = "Hello, World!"

# Case
puts s.upcase    # HELLO, WORLD!
puts s.downcase  # hello, world!
puts s.swapcase  # hELLO, wORLD!
puts s.capitalize  # Hello, world!

# Searching
puts s.include?("World")  # true
puts s.start_with?("Hello")  # true
puts s.end_with?("!")     # true
puts s.index("World")     # 7

# Manipulation
puts s.reverse             # !dlroW ,olleH
puts s.length              # 13
puts s.strip               # removes leading/trailing whitespace
puts "  hi  ".lstrip       # "hi  " (left only)
puts s.chomp               # removes trailing newline
puts s.gsub("l", "r")     # Herro, Worrd!
puts s.sub("l", "r")      # Herlo, World! (first only)
puts s.delete("aeiou")    # Hll, Wrld!
puts s.squeeze("l")        # Helo, World!
puts s.tr("aeiou", "*")   # H*ll*, W*rld!

# Splitting / joining
words = "one two three".split       # ["one", "two", "three"]
csv   = "a,b,c,d".split(",")        # ["a", "b", "c", "d"]
puts words.join(" | ")               # one | two | three

# Check and convert
puts "42".match?(/\d+/)      # true
puts "hello".chars.inspect   # ["h", "e", "l", "l", "o"]
puts "hello".bytes.first     # 104`,
        },
        {
          type: 'code',
          language: 'ruby',
          content: `# String formatting
name = "Alice"
score = 95.5

# String interpolation (preferred)
puts "Name: #{name}, Score: #{score}"

# format / sprintf (C-style)
puts format("%-10s %6.2f", name, score)   # Alice       95.50
puts "Score: %.1f%%" % score              # Score: 95.5%

# Heredoc (multiline string)
text = <<~HEREDOC
  Dear #{name},
  Your score was #{score}.
  Regards, The System
HEREDOC
puts text

# Regex
email = "alice@example.com"
puts email.match?(/\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i)  # true

phone = "Call us at 555-1234 or 555-5678"
phones = phone.scan(/\d{3}-\d{4}/)
puts phones.inspect   # ["555-1234", "555-5678"]

# Named captures
if m = "2024-01-15".match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/)
  puts m[:year]   # 2024
  puts m[:month]  # 01
end`,
        },
        {
          type: 'tip',
          content: 'Prefer single-quoted strings when there\'s no interpolation — `\'hello\'` instead of `"hello"`. Ruby skips processing escape sequences and interpolation for single-quoted strings, which is marginally faster and signals intent clearly. Use double quotes when you need `#{...}` or `\\n`.',
        },
      ],
    },
    {
      slug: 'classes',
      title: 'Classes & OOP',
      intro: "Ruby's OOP is clean and expressive. Everything is an object, inheritance is single (by class), and modules fill in for multiple inheritance. The `attr_accessor` macro writes getters and setters so you don't have to.",
      sections: [
        {
          type: 'code',
          language: 'ruby',
          content: `class Animal
  # attr_accessor generates getter AND setter methods
  # attr_reader = getter only, attr_writer = setter only
  attr_accessor :name, :sound
  attr_reader :species

  # Class variable (shared across all instances)
  @@count = 0

  def initialize(name, sound, species)
    @name    = name
    @sound   = sound
    @species = species
    @@count += 1
  end

  def speak
    "#{@name} says #{@sound}!"
  end

  def to_s
    "#{@species}(#{@name})"
  end

  def self.count   # class method
    @@count
  end
end

dog = Animal.new("Rex", "woof", "Dog")
cat = Animal.new("Whiskers", "meow", "Cat")

puts dog.speak          # Rex says woof!
puts cat.name           # Whiskers
cat.name = "Luna"       # setter
puts Animal.count       # 2
puts dog                # Dog(Rex)  — calls to_s`,
        },
        {
          type: 'code',
          language: 'ruby',
          content: `# Inheritance
class Dog < Animal
  attr_reader :breed, :tricks

  def initialize(name, breed)
    super(name, "woof", "Dog")   # call parent initialize
    @breed  = breed
    @tricks = []
  end

  def learn(trick)
    @tricks << trick
    self   # return self to enable chaining
  end

  def speak
    "#{name} the #{breed} barks!"
  end

  def show_tricks
    @tricks.empty? ? "No tricks yet" : @tricks.join(", ")
  end
end

buddy = Dog.new("Buddy", "Labrador")
buddy.learn("sit").learn("shake").learn("roll over")   # chaining

puts buddy.speak         # Buddy the Labrador barks!
puts buddy.show_tricks   # sit, shake, roll over
puts buddy.is_a?(Dog)    # true
puts buddy.is_a?(Animal) # true — inheritance check
puts buddy.class         # Dog`,
        },
        {
          type: 'code',
          language: 'ruby',
          content: `# Protected and private methods
class BankAccount
  def initialize(balance)
    @balance = balance
  end

  def deposit(amount)
    validate_amount!(amount)
    @balance += amount
  end

  def >(other)
    balance > other.balance
  end

  def to_s
    "Account(#{"$%.2f" % @balance})"
  end

  protected

  def balance   # accessible to other BankAccount instances
    @balance
  end

  private

  def validate_amount!(amount)   # ! = raises exception on bad input
    raise ArgumentError, "Amount must be positive" unless amount > 0
  end
end

acc1 = BankAccount.new(1000)
acc2 = BankAccount.new(500)
acc1.deposit(250)
puts acc1 > acc2   # true`,
        },
        {
          type: 'tip',
          content: 'Use `attr_accessor` for simple data attributes — it generates clean getter/setter methods. Add custom getter/setter methods only when you need validation or computation. Ruby convention: `def name` for getter, `def name=(val)` for setter.',
        },
      ],
    },
    {
      slug: 'modules-mixins',
      title: 'Modules & Mixins',
      intro: "Ruby solves the multiple-inheritance problem with modules. You `include` a module and its methods become instance methods. `extend` makes them class methods. This is called a mixin and it's genuinely elegant.",
      sections: [
        {
          type: 'code',
          language: 'ruby',
          content: `# Modules serve two purposes:
# 1. Namespacing (organizing code)
# 2. Mixins (sharing behavior across classes)

module Greetable
  def greet
    "Hello! I'm #{name}."   # assumes the including class has a name method
  end

  def farewell
    "Goodbye from #{name}!"
  end
end

module Serializable
  def to_json_str
    vars = instance_variables.map do |var|
      "\"#{var.to_s[1..]}\": \"#{instance_variable_get(var)}\""
    end
    "{ #{vars.join(", ")} }"
  end
end

class Person
  include Greetable
  include Serializable

  attr_reader :name, :age

  def initialize(name, age)
    @name = name
    @age  = age
  end
end

alice = Person.new("Alice", 30)
puts alice.greet         # Hello! I'm Alice.
puts alice.farewell      # Goodbye from Alice!
puts alice.to_json_str   # { "name": "Alice", "age": "30" }`,
        },
        {
          type: 'code',
          language: 'ruby',
          content: `# Comparable — include it and define <=> to get all comparison operators free
class Temperature
  include Comparable

  attr_reader :degrees

  def initialize(degrees)
    @degrees = degrees.to_f
  end

  # <=> is the "spaceship operator" — required by Comparable
  def <=>(other)
    degrees <=> other.degrees
  end

  def to_s
    "#{degrees}°"
  end
end

temps = [Temperature.new(100), Temperature.new(0), Temperature.new(37)]
puts temps.min        # 0.0°
puts temps.max        # 100.0°
puts temps.sort.inspect
puts Temperature.new(37) > Temperature.new(20)   # true
puts Temperature.new(37).between?(Temperature.new(36), Temperature.new(38))  # true

# Enumerable — include it and define each() to get map/select/reduce/etc.
class NumberSet
  include Enumerable

  def initialize(*nums)
    @data = nums
  end

  def each(&block)
    @data.each(&block)
  end
end

ns = NumberSet.new(3, 1, 4, 1, 5, 9)
puts ns.sort.inspect    # [1, 1, 3, 4, 5, 9]
puts ns.select(&:odd?).inspect  # [3, 1, 1, 5, 9]
puts ns.min             # 1`,
        },
        {
          type: 'tip',
          content: 'The Comparable and Enumerable modules are two of Ruby\'s most powerful standard mixins. If your class represents ordered values, include Comparable and define `<=>`. If it contains a collection, include Enumerable and define `each`. You instantly get dozens of methods for free.',
        },
      ],
    },
    {
      slug: 'error-handling',
      title: 'Error Handling',
      intro: "Ruby calls exceptions exceptions. `begin/rescue/ensure` is Ruby's try/catch/finally. `raise` throws them. Custom exception classes are just subclasses of StandardError.",
      sections: [
        {
          type: 'code',
          language: 'ruby',
          content: `# Basic rescue
begin
  result = 10 / 0
rescue ZeroDivisionError => e
  puts "Caught: #{e.message}"   # Caught: divided by 0
end

# Multiple rescue clauses
def parse_input(input)
  begin
    Integer(input)      # raises ArgumentError if not a valid integer
  rescue ArgumentError
    puts "Not a valid integer"
    nil
  rescue TypeError
    puts "Wrong type entirely"
    nil
  end
end

# else — runs if no exception raised
# ensure — always runs (like finally)
def read_file(path)
  f = File.open(path)
  content = f.read
rescue Errno::ENOENT => e
  puts "File not found: #{e.message}"
  nil
else
  puts "Read #{content.length} bytes successfully"
  content
ensure
  f&.close   # &. is the safe navigation operator — only calls close if f is not nil
end`,
        },
        {
          type: 'code',
          language: 'ruby',
          content: `# Custom exceptions
class InsufficientFundsError < StandardError
  attr_reader :amount, :balance

  def initialize(amount, balance)
    @amount  = amount
    @balance = balance
    super("Cannot withdraw $#{amount}. Current balance: $#{balance}")
  end
end

class BankAccount
  def initialize(balance)
    @balance = balance
  end

  def withdraw(amount)
    raise ArgumentError, "Amount must be positive" unless amount > 0
    raise InsufficientFundsError.new(amount, @balance) if amount > @balance
    @balance -= amount
    @balance
  end
end

account = BankAccount.new(100)

begin
  account.withdraw(200)
rescue InsufficientFundsError => e
  puts e.message
  puts "Tried to withdraw: $#{e.amount}"
rescue ArgumentError => e
  puts "Bad input: #{e.message}"
end

# retry — re-attempt the begin block
attempts = 0
begin
  attempts += 1
  raise "Temporary error" if attempts < 3
  puts "Succeeded on attempt #{attempts}"
rescue RuntimeError
  retry if attempts < 3
  puts "Failed after 3 attempts"
end`,
        },
        {
          type: 'note',
          content: "Rescue without a class catches StandardError and its descendants — which covers almost all application errors. Never rescue Exception (the base class) — it catches things like SignalException (Ctrl+C) and SystemExit, which should be allowed to propagate.",
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: CLI Password Generator',
      intro: "Let's build a command-line password generator. It'll use modules, classes, string manipulation, and argument parsing — a real taste of Ruby in action.",
      sections: [
        {
          type: 'code',
          language: 'ruby',
          content: `#!/usr/bin/env ruby
# password_gen.rb — usage: ruby password_gen.rb [length] [--no-symbols]

module CharSets
  LOWER   = ('a'..'z').to_a
  UPPER   = ('A'..'Z').to_a
  DIGITS  = ('0'..'9').to_a
  SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?'.chars
  ALL     = LOWER + UPPER + DIGITS + SYMBOLS
  SAFE    = LOWER + UPPER + DIGITS
end

class PasswordGenerator
  DEFAULT_LENGTH = 16

  def initialize(length: DEFAULT_LENGTH, symbols: true)
    @length  = length
    @symbols = symbols
  end

  def generate
    charset = @symbols ? CharSets::ALL : CharSets::SAFE

    # Ensure at least one character from each required set
    required = [
      CharSets::LOWER.sample,
      CharSets::UPPER.sample,
      CharSets::DIGITS.sample,
    ]
    required << CharSets::SYMBOLS.sample if @symbols

    # Fill the rest randomly
    rest = (@length - required.length).times.map { charset.sample }

    # Shuffle so the required chars aren't always at the front
    (required + rest).shuffle.join
  end

  def strength(password)
    score = 0
    score += 1 if password.match?(/[a-z]/)
    score += 1 if password.match?(/[A-Z]/)
    score += 1 if password.match?(/\d/)
    score += 1 if password.match?(/[^a-zA-Z\d]/)
    score += 1 if password.length >= 16

    case score
    when 5    then "Strong 💪"
    when 3..4 then "Moderate 🔶"
    else           "Weak ⚠️"
    end
  end
end

# Parse arguments
length   = ARGV[0]&.to_i || 16
symbols  = !ARGV.include?("--no-symbols")

gen = PasswordGenerator.new(length: length, symbols: symbols)
pw  = gen.generate

puts "Generated password:"
puts pw
puts "Strength: #{gen.strength(pw)}"
puts "Length:   #{pw.length}"`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `ruby password_gen.rb           # 16 chars with symbols
ruby password_gen.rb 24        # 24 chars with symbols
ruby password_gen.rb 20 --no-symbols  # 20 chars, alphanumeric only`,
        },
        {
          type: 'note',
          content: "Next steps: add a `--count 5` flag to generate multiple passwords, use `optparse` from the stdlib for proper argument parsing, or add a clipboard copy feature with the `clipboard` gem.",
        },
      ],
    },
  ],
}
