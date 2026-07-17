import { Language } from '../types'

export const lua: Language = {
  slug: 'lua',
  name: 'Lua',
  tagline: 'Tiny language, giant reach — games, mods, embedded everywhere.',
  description: "Lua is a scripting language so small (the whole interpreter is ~300KB) that apps embed it to make themselves scriptable. Roblox, World of Warcraft addons, Neovim configs, Redis scripts — all Lua. It's one of the friendliest first languages, and the standard path into game scripting.",
  accentColor: '#000080',
  textOnAccent: '#fff',
  icon: 'Lu',
  difficulty: 'beginner',
  usedFor: ['Game Scripting', 'Roblox', 'Mods & Addons', 'Embedded Scripting', 'Neovim Config'],
  notableUsers: ['Roblox', 'World of Warcraft', 'Neovim', 'Redis', 'LÖVE'],
  setup: {
    description: "Install the standalone interpreter to learn the language itself. For games, LÖVE (love2d.org) is the beloved free 2D engine; Roblox Studio has Lua (Luau) built in.",
    windows: `winget install DEVCOM.Lua
# Or scoop install lua

lua -v            # Lua 5.4.x
lua hello.lua     # run a file
lua               # interactive REPL

# For games: download LÖVE from https://love2d.org`,
    mac: `brew install lua

lua -v
lua hello.lua
lua               # REPL

# For games:
brew install --cask love`,
    linux: `sudo apt install lua5.4    # Debian/Ubuntu
sudo dnf install lua       # Fedora

lua -v
lua hello.lua

# For games:
sudo apt install love`,
  },
  lessons: [
    {
      slug: 'hello-lua',
      title: 'Hello, Lua',
      intro: "Lua's entire syntax fits on a postcard. If you've never programmed before, this is one of the gentlest starts there is.",
      sections: [
        {
          type: 'code',
          language: 'lua',
          content: `-- hello.lua  (-- starts a comment)
print("Hello, World!")

local name = "Ada"        -- 'local' declares a variable
local age = 17
print("I'm " .. name)     -- .. joins strings
print(name, age)          -- print takes many values

--[[ This is a
     multi-line comment ]]`,
        },
        {
          type: 'text',
          content: "No semicolons, no braces, no type declarations. Variables are declared with local — and you should always use it. Assigning without local creates a global variable, which is the classic source of Lua bugs.",
        },
        {
          type: 'code',
          language: 'lua',
          content: `-- Lua has exactly 8 types. The ones you'll use daily:
local n = 42              -- number (integers and floats)
local pi = 3.14159        -- also number
local s = "text"          -- string
local ok = true           -- boolean
local nothing = nil       -- nil: the absence of a value

print(type(n))            -- "number"
print(10 / 3)             -- 3.3333... (real division)
print(10 // 3)            -- 3 (floor division)
print(2 ^ 10)             -- 1024 (power)
print(#"hello")           -- 5 (# is length)`,
        },
        {
          type: 'warning',
          content: "Forget 'local' and the variable becomes global — visible and mutable from everywhere, including other files. Make writing 'local' muscle memory now.",
        },
      ],
    },
    {
      slug: 'control-flow',
      title: 'Conditions & Loops',
      intro: "if/then/end, while, and two flavors of for. Lua uses keywords instead of braces — code reads almost like sentences.",
      sections: [
        {
          type: 'code',
          language: 'lua',
          content: `local grade = 87

if grade >= 90 then
  print("A")
elseif grade >= 80 then
  print("B")
else
  print("C")
end

-- Operators: == equal, ~= NOT equal (unusual!), and, or, not
if grade >= 80 and grade < 90 then
  print("solid B")
end`,
        },
        {
          type: 'note',
          content: "Only nil and false are falsy in Lua. The number 0 and the empty string \"\" are TRUTHY — different from Python, JavaScript, and C. 'x = x or default' is the idiomatic default-value trick.",
        },
        {
          type: 'code',
          language: 'lua',
          content: `-- Numeric for: start, end (INCLUSIVE), optional step
for i = 1, 5 do
  print(i)             -- 1 2 3 4 5
end

for i = 10, 2, -2 do
  print(i)             -- 10 8 6 4 2
end

-- while and repeat:
local hp = 3
while hp > 0 do
  hp = hp - 1          -- no hp-- or hp -= 1 in Lua
end

repeat
  hp = hp + 1
until hp == 3          -- body runs at least once

-- break exits a loop; Lua has no 'continue'
-- (use an if, or 'goto continue' in 5.2+)`,
        },
        {
          type: 'tip',
          content: "Lua arrays are 1-indexed, and numeric for is inclusive on both ends — so 'for i = 1, #list' walks a whole list. Fighting years of 0-indexed habit is the main adjustment coming from other languages.",
        },
      ],
    },
    {
      slug: 'tables',
      title: 'Tables — The Only Data Structure',
      intro: "Lua has exactly one data structure: the table. It's an array, a dictionary, an object, and a module all at once. Understand tables and you understand Lua.",
      sections: [
        {
          type: 'code',
          language: 'lua',
          content: `-- As an array (1-indexed!):
local fruits = { "apple", "banana", "cherry" }
print(fruits[1])          -- apple  (NOT fruits[0])
print(#fruits)            -- 3
table.insert(fruits, "date")          -- append
table.insert(fruits, 1, "avocado")    -- insert at front
table.remove(fruits, 2)               -- remove by index
table.sort(fruits)

-- Iterate an array:
for i, fruit in ipairs(fruits) do
  print(i, fruit)
end`,
        },
        {
          type: 'code',
          language: 'lua',
          content: `-- As a dictionary:
local student = {
  name = "Ada",
  age = 17,
  grade = 95,
}
print(student.name)        -- dot access
print(student["name"])     -- same thing
student.email = "ada@example.com"   -- add a key
student.age = nil                   -- delete a key

-- Iterate a dictionary:
for key, value in pairs(student) do
  print(key, value)
end

-- Nesting is free:
local party = {
  members = {
    { name = "Ada",  hp = 100 },
    { name = "Alan", hp = 85 },
  },
  gold = 250,
}
print(party.members[2].name)   -- Alan`,
        },
        {
          type: 'note',
          content: "ipairs walks 1, 2, 3... and stops at the first nil — use it for arrays. pairs visits every key in no guaranteed order — use it for dictionaries. Accessing a missing key returns nil rather than erroring.",
        },
      ],
    },
    {
      slug: 'functions',
      title: 'Functions',
      intro: "Functions in Lua are values — store them in tables, pass them around, return several results at once. This flexibility is why Lua works so well as a scripting layer.",
      sections: [
        {
          type: 'code',
          language: 'lua',
          content: `local function greet(name)
  return "Hello, " .. name .. "!"
end
print(greet("Ada"))

-- Multiple return values — very Lua:
local function divide(a, b)
  if b == 0 then
    return nil, "division by zero"   -- value, error pattern
  end
  return a / b
end

local result, err = divide(10, 0)
if not result then
  print("Error: " .. err)
end

-- Missing arguments are nil; extra ones are dropped:
local function hello(name)
  name = name or "stranger"      -- idiomatic default
  print("Hi, " .. name)
end
hello()          -- Hi, stranger`,
        },
        {
          type: 'code',
          language: 'lua',
          content: `-- Functions are values:
local shout = function (s) return s:upper() .. "!" end

local ops = {
  add = function (a, b) return a + b end,
  mul = function (a, b) return a * b end,
}
print(ops.add(2, 3))     -- 5

-- Closures — functions remember their surroundings:
local function makeCounter()
  local count = 0
  return function ()
    count = count + 1
    return count
  end
end
local next = makeCounter()
print(next(), next(), next())    -- 1  2  3

-- Variadic functions:
local function sum(...)
  local total = 0
  for _, n in ipairs({ ... }) do
    total = total + n
  end
  return total
end
print(sum(1, 2, 3, 4))   -- 10`,
        },
        {
          type: 'tip',
          content: "s:upper() is sugar for string.upper(s) — the colon passes the value as a hidden first argument. You'll meet it again with objects in the OOP lesson.",
        },
      ],
    },
    {
      slug: 'strings-stdlib',
      title: 'Strings & the Standard Library',
      intro: "Lua's standard library is deliberately tiny — string, table, math, io, os. Small enough to actually learn completely.",
      sections: [
        {
          type: 'code',
          language: 'lua',
          content: `local s = "Hello, Lua!"

print(s:upper())            -- HELLO, LUA!
print(s:len())              -- 11  (same as #s)
print(s:sub(1, 5))          -- Hello
print(s:rep(2))             -- Hello, Lua!Hello, Lua!
print(s:find("Lua"))        -- 8 10 (start and end position)
print(s:gsub("Lua", "World"))  -- Hello, World!   1

-- string.format — like printf:
print(string.format("%s scored %.1f%%", "Ada", 95.5))

-- Lua patterns (like lite regex): %d digit, %a letter, + repeat
for word in ("one two three"):gmatch("%a+") do
  print(word)
end`,
        },
        {
          type: 'code',
          language: 'lua',
          content: `-- math:
math.floor(3.7)     -- 3
math.max(1, 5, 3)   -- 5
math.random(1, 6)   -- die roll

-- os and io:
print(os.time())               -- unix timestamp
print(os.date("%Y-%m-%d"))     -- formatted date

-- Read a file:
local f = io.open("data.txt", "r")
if f then
  local content = f:read("a")   -- whole file
  f:close()
  print(content)
end

-- Write a file:
local out = io.open("log.txt", "w")
out:write("saved!\\n")
out:close()`,
        },
        {
          type: 'note',
          content: "Lua patterns are not full regular expressions — simpler, but cover most needs: %d digits, %a letters, %s whitespace, %w alphanumeric, + one-or-more, * zero-or-more, - lazy repeat.",
        },
      ],
    },
    {
      slug: 'oop-metatables',
      title: 'OOP & Metatables',
      intro: "Lua doesn't have classes — it has metatables, hooks that change how tables behave. Every Lua OOP system (including Roblox's) is built from this one mechanism.",
      sections: [
        {
          type: 'text',
          content: "A metatable customizes what happens on events like 'key not found' (__index) or 'table + table' (__add). The classic class pattern: put methods on a prototype table, and point instances' __index at it — missing lookups fall through to the prototype.",
        },
        {
          type: 'code',
          language: 'lua',
          content: `local Player = {}
Player.__index = Player

function Player.new(name, hp)
  local self = setmetatable({}, Player)
  self.name = name
  self.hp = hp
  return self
end

-- Colon DEFINES a method with an implicit 'self' parameter:
function Player:takeDamage(amount)
  self.hp = self.hp - amount
  if self.hp <= 0 then
    print(self.name .. " is down!")
  end
end

function Player:heal(amount)
  self.hp = math.min(100, self.hp + amount)
end

local hero = Player.new("Ada", 100)
hero:takeDamage(30)      -- colon CALLS passing hero as self
print(hero.hp)           -- 70`,
        },
        {
          type: 'code',
          language: 'lua',
          content: `-- Operator overloading via metamethods:
local Vec = {}
Vec.__index = Vec

function Vec.new(x, y)
  return setmetatable({ x = x, y = y }, Vec)
end

Vec.__add = function (a, b)
  return Vec.new(a.x + b.x, a.y + b.y)
end

Vec.__tostring = function (v)
  return "(" .. v.x .. ", " .. v.y .. ")"
end

local pos = Vec.new(1, 2) + Vec.new(3, 4)
print(pos)               -- (4, 6)`,
        },
        {
          type: 'note',
          content: "Roblox's Luau and most game engines use exactly this pattern (or wrap it). When Roblox docs say 'object-oriented programming', this __index trick is what's underneath.",
        },
      ],
    },
    {
      slug: 'love2d-game',
      title: 'Your First Game with LÖVE',
      intro: "LÖVE (love2d) is a free 2D game framework: you write three callback functions — load, update, draw — and it handles the window, graphics, and input. A moving-square 'game' is 20 lines.",
      sections: [
        {
          type: 'code',
          language: 'lua',
          content: `-- main.lua — put in a folder, then run: love that-folder/
local player = { x = 100, y = 100, speed = 200 }

function love.load()
  love.window.setTitle("My First Game")
end

function love.update(dt)
  -- dt = seconds since last frame; multiply for smooth motion
  if love.keyboard.isDown("right") then
    player.x = player.x + player.speed * dt
  end
  if love.keyboard.isDown("left") then
    player.x = player.x - player.speed * dt
  end
  if love.keyboard.isDown("up") then
    player.y = player.y - player.speed * dt
  end
  if love.keyboard.isDown("down") then
    player.y = player.y + player.speed * dt
  end
end

function love.draw()
  love.graphics.setColor(0.2, 0.8, 1)
  love.graphics.rectangle("fill", player.x, player.y, 32, 32)
  love.graphics.setColor(1, 1, 1)
  love.graphics.print("Arrow keys to move", 10, 10)
end`,
        },
        {
          type: 'text',
          content: "That's the whole game loop pattern used by every engine: update() advances the world based on elapsed time, draw() renders it, ~60 times per second. Multiplying movement by dt makes speed identical on a 30 FPS laptop and a 240 Hz gaming rig.",
        },
        {
          type: 'code',
          language: 'lua',
          content: `-- Add gravity and a jump — platformer physics in 15 lines:
local GRAVITY = 800

function love.update(dt)
  player.vy = (player.vy or 0) + GRAVITY * dt
  player.y = player.y + player.vy * dt

  local floor = 400
  if player.y > floor then
    player.y = floor
    player.vy = 0
    player.grounded = true
  end
end

function love.keypressed(key)
  if key == "space" and player.grounded then
    player.vy = -400
    player.grounded = false
  end
end`,
        },
        {
          type: 'tip',
          content: "From here: LÖVE's wiki (love2d.org/wiki) documents every function with examples. For Roblox instead, everything from the OOP lesson applies — Roblox Studio scripts are Luau, a typed Lua dialect.",
        },
      ],
    },
  ],
}
