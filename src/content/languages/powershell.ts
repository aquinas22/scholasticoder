import { Language } from '../types'

export const powershell: Language = {
  slug: 'powershell',
  name: 'PowerShell',
  tagline: 'Bash for Windows. Except it\'s also on Linux now. And it\'s object-oriented. Long story.',
  description: 'PowerShell is Microsoft\'s powerful shell and scripting language. Unlike Bash which works with text, PowerShell works with objects. This makes parsing command output dramatically easier. It\'s cross-platform and surprisingly capable.',
  accentColor: '#5391FE',
  textOnAccent: '#fff',
  icon: 'PS',
  difficulty: 'beginner',
  usedFor: ['Windows Administration', 'Azure DevOps', 'CI/CD', 'System Automation', 'Active Directory'],
  notableUsers: ['Microsoft', 'GitHub Actions', 'Azure', 'Every Windows sysadmin'],
  setup: {
    description: 'PowerShell 5.1 is built into Windows. PowerShell 7+ (cross-platform) is recommended for scripting and available everywhere.',
    windows: `# PowerShell 5.1 is built in — press Win+X, select "Terminal"
# For PowerShell 7+ (recommended):
winget install Microsoft.PowerShell

# Or download from:
# github.com/PowerShell/PowerShell/releases

# Check version:
$PSVersionTable.PSVersion

# Set execution policy to allow local scripts:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`,
    mac: `# Install via Homebrew:
brew install --cask powershell

# Or via direct download:
# github.com/PowerShell/PowerShell/releases

# Start PowerShell:
pwsh

# Check version:
$PSVersionTable.PSVersion`,
    linux: `# Ubuntu / Debian:
sudo apt update
sudo apt install -y wget apt-transport-https software-properties-common
source /etc/os-release
wget -q https://packages.microsoft.com/config/ubuntu/$VERSION_ID/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt update && sudo apt install -y powershell

# Start:
pwsh

# Fedora:
sudo dnf install powershell`,
  },
  lessons: [
    {
      slug: 'first-script',
      title: 'Your First Script',
      intro: 'PowerShell scripts have the .ps1 extension. The first thing you need to know: PowerShell works with objects, not just text. This changes everything.',
      sections: [
        {
          type: 'text',
          content: 'PowerShell cmdlets (pronounced "command-lets") follow a Verb-Noun naming convention: Get-Process, Set-Item, Remove-File. They return objects with properties, not raw text. This is PowerShell\'s biggest differentiator from Bash.',
        },
        {
          type: 'code',
          language: 'powershell',
          content: `# Write to the console
Write-Host "Hello, World!"
Write-Output "Hello from Write-Output"

# The difference:
# Write-Host: goes directly to console, can't be captured
# Write-Output: goes to the pipeline, can be captured and redirected

# Variables start with $
$name = "Alice"
$age = 30
Write-Host "Name: $name, Age: $age"

# String interpolation (double quotes only)
Write-Host "Hello, $name!"
Write-Host 'No interpolation: $name'   # single quotes = literal

# Expressions in strings
Write-Host "In 10 years: $($age + 10)"

# Multiple output methods
Write-Host "Normal output"
Write-Warning "This is a warning"
Write-Error "This is an error"
Write-Verbose "This only shows with -Verbose"`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Save as hello.ps1 and run in PowerShell:
# .\hello.ps1

# Or run interactively:
pwsh`,
        },
        {
          type: 'note',
          content: 'PowerShell is case-insensitive. Write-Host, write-host, and WRITE-HOST all work. By convention, use PascalCase for cmdlet names (Write-Host) and camelCase for variables ($myVariable).',
        },
      ],
    },
    {
      slug: 'variables-types',
      title: 'Variables & Types',
      intro: 'PowerShell variables can hold any .NET type. Numbers, strings, arrays, hashtables, or entire objects returned by cmdlets.',
      sections: [
        {
          type: 'code',
          language: 'powershell',
          content: `# Variable types — PowerShell infers the type
$integer  = 42
$float    = 3.14
$string   = "Hello"
$boolean  = $true    # $true and $false (not true/false)
$null     = $null    # null value

# Strongly typed variables
[int]$count     = 10
[string]$name   = "Alice"
[datetime]$now  = Get-Date
[bool]$flag     = $true

# Check type
$x = 42
$x.GetType()              # System.Int32
$x.GetType().Name         # Int32

# Type conversion
$n = [int]"42"            # string to int
$s = [string]42           # int to string
$d = [double]"3.14"       # string to double

# String operations
$str = "Hello, World!"
$str.Length               # 13
$str.ToUpper()            # HELLO, WORLD!
$str.ToLower()            # hello, world!
$str.Contains("World")    # True
$str.Replace("World", "PowerShell")  # Hello, PowerShell!
$str.Split(",")           # @("Hello", " World!")
$str.Trim()               # remove whitespace
$str.Substring(7, 5)      # World

# Multi-line string (here-string)
$multiline = @"
This is line one.
This is line two.
Name: $name
"@
Write-Output $multiline`,
        },
        {
          type: 'code',
          language: 'powershell',
          content: `# Arrays
$fruits = @("apple", "banana", "cherry")
$fruits[0]                    # apple
$fruits[-1]                   # cherry (last element)
$fruits[1..2]                 # slice: banana, cherry
$fruits.Count                 # 3
$fruits += "date"             # add element (creates new array)
$fruits -contains "apple"     # True

# ArrayList — mutable, better for adding/removing
$list = [System.Collections.ArrayList]@(1, 2, 3)
$list.Add(4)
$list.Remove(2)
$list.Count                   # 3

# Hashtable (like a dictionary)
$person = @{
    Name = "Alice"
    Age  = 30
    City = "Paris"
}
$person["Name"]               # Alice
$person.Age                   # 30 (dot notation also works)
$person["Email"] = "alice@example.com"    # add key
$person.Remove("City")        # remove key
$person.Keys                  # Name, Age, Email
$person.Values                # Alice, 30, alice@...
$person.ContainsKey("Name")   # True

# Ordered hashtable (preserves insertion order)
$ordered = [ordered]@{
    First  = 1
    Second = 2
    Third  = 3
}`,
        },
        {
          type: 'note',
          content: 'In PowerShell, $true and $false (not true and false) are the boolean literals. $null (not null or None) is the null value. These are case-insensitive in practice, but lowercase is conventional.',
        },
      ],
    },
    {
      slug: 'control-flow',
      title: 'Control Flow',
      intro: 'PowerShell control flow is standard C-family with a few extras. The switch statement is particularly powerful — it can match regexes and wildcards.',
      sections: [
        {
          type: 'code',
          language: 'powershell',
          content: `# if / elseif / else
$score = 85

if ($score -ge 90) {
    Write-Host "A"
} elseif ($score -ge 80) {
    Write-Host "B"
} elseif ($score -ge 70) {
    Write-Host "C"
} else {
    Write-Host "Below C"
}

# Comparison operators (different from most languages!)
# -eq   equal
# -ne   not equal
# -gt   greater than
# -lt   less than
# -ge   greater than or equal
# -le   less than or equal
# -like wildcard match   ("hello" -like "h*")
# -match regex match     ("hello123" -match "\d+")
# -contains array contains
# -in   value in array

$name = "Alice"
if ($name -like "A*") { Write-Host "Starts with A" }
if ($name -match "^[A-Z]") { Write-Host "Starts with uppercase" }
if ("red" -in @("red", "green", "blue")) { Write-Host "Color found" }

# Ternary (PowerShell 7+)
$result = $score -ge 60 ? "Pass" : "Fail"`,
        },
        {
          type: 'code',
          language: 'powershell',
          content: `# switch — very powerful in PowerShell
$day = "Monday"
switch ($day) {
    "Saturday" { Write-Host "Weekend!"; break }
    "Sunday"   { Write-Host "Weekend!"; break }
    default    { Write-Host "Weekday" }
}

# switch with -Wildcard
switch -Wildcard ("hello123") {
    "hello*"  { Write-Host "Starts with hello" }
    "*123"    { Write-Host "Ends with 123" }
}

# switch with -Regex
switch -Regex ("192.168.1.1") {
    "^\d{1,3}\.\d{1,3}" { Write-Host "Looks like an IP" }
}

# for loop
for ($i = 0; $i -lt 5; $i++) {
    Write-Host "i = $i"
}

# foreach loop — most common
$fruits = @("apple", "banana", "cherry")
foreach ($fruit in $fruits) {
    Write-Host $fruit
}

# ForEach-Object — pipeline version
1..5 | ForEach-Object { Write-Host "Item: $_" }

# Where-Object — filter pipeline
Get-Process | Where-Object { $_.CPU -gt 10 } | Select-Object Name, CPU

# while loop
$n = 10
while ($n -gt 0) {
    Write-Host $n
    $n -= 3
}`,
        },
      ],
    },
    {
      slug: 'functions',
      title: 'Functions & Cmdlets',
      intro: 'PowerShell functions can behave like cmdlets — with parameters, validation, help text, and pipeline support. It\'s the most sophisticated function system in any shell.',
      sections: [
        {
          type: 'code',
          language: 'powershell',
          content: `# Basic function
function Get-Greeting {
    param(
        [string]$Name = "World",
        [string]$Title = "friend"
    )
    return "Hello, $Title $Name!"
}

Get-Greeting                       # Hello, friend World!
Get-Greeting -Name "Alice"         # Hello, friend Alice!
Get-Greeting -Name "Smith" -Title "Dr."  # Hello, Dr. Smith!

# Advanced function with validation and help
function Convert-Temperature {
    <#
    .SYNOPSIS
        Convert temperature between Celsius and Fahrenheit.
    .EXAMPLE
        Convert-Temperature -Value 100 -From Celsius
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory, Position=0)]
        [double]$Value,

        [Parameter(Mandatory)]
        [ValidateSet("Celsius", "Fahrenheit")]
        [string]$From
    )

    if ($From -eq "Celsius") {
        $result = $Value * 9/5 + 32
        Write-Output "$Value°C = $result°F"
    } else {
        $result = ($Value - 32) * 5/9
        Write-Output "$Value°F = $([math]::Round($result, 2))°C"
    }
}

Convert-Temperature -Value 100 -From Celsius     # 100°C = 212°F
Convert-Temperature -Value 212 -From Fahrenheit  # 212°F = 100°C

# Get built-in help
# Get-Help Convert-Temperature`,
        },
        {
          type: 'code',
          language: 'powershell',
          content: `# Pipeline-aware function
function Format-FileSize {
    param(
        [Parameter(ValueFromPipeline)]
        [System.IO.FileInfo]$File
    )

    process {
        $size = $File.Length
        $unit = switch ($size) {
            { $_ -gt 1GB } { "GB"; break }
            { $_ -gt 1MB } { "MB"; break }
            { $_ -gt 1KB } { "KB"; break }
            default { "B" }
        }
        $formatted = switch ($unit) {
            "GB" { "{0:F2} GB" -f ($size / 1GB) }
            "MB" { "{0:F2} MB" -f ($size / 1MB) }
            "KB" { "{0:F2} KB" -f ($size / 1KB) }
            default { "$size B" }
        }
        [PSCustomObject]@{
            Name = $File.Name
            Size = $formatted
            Extension = $File.Extension
        }
    }
}

# Use it in a pipeline
Get-ChildItem -File | Format-FileSize | Sort-Object Name | Format-Table`,
        },
      ],
    },
    {
      slug: 'objects',
      title: 'Working with Objects',
      intro: 'This is what makes PowerShell unique. Everything is an object. You don\'t parse text — you access properties. It\'s revolutionary if you\'re used to Bash.',
      sections: [
        {
          type: 'code',
          language: 'powershell',
          content: `# Get-Process returns Process objects (not text)
$proc = Get-Process -Name "pwsh"
$proc.Name          # pwsh
$proc.Id            # process ID
$proc.CPU           # CPU seconds
$proc.WorkingSet    # memory in bytes
$proc.StartTime     # datetime object

# Pipeline: get, filter, select, sort
Get-Process |
    Where-Object { $_.WorkingSet -gt 50MB } |
    Select-Object Name, Id, @{N="RAM(MB)"; E={[math]::Round($_.WorkingSet/1MB)}} |
    Sort-Object "RAM(MB)" -Descending |
    Format-Table

# Get-ChildItem — like ls/dir but returns FileInfo/DirectoryInfo objects
$files = Get-ChildItem -Path "C:\Users\$env:USERNAME" -Recurse -Filter "*.ps1"
$files | Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-7) }  # modified in last 7 days
$files | Measure-Object -Property Length -Sum  # total size

# Services
Get-Service | Where-Object { $_.Status -eq "Running" } | Measure-Object  # count running services

# Create custom objects
$servers = @(
    [PSCustomObject]@{ Name = "web01";  IP = "10.0.0.1"; CPU = 45 }
    [PSCustomObject]@{ Name = "db01";   IP = "10.0.0.2"; CPU = 72 }
    [PSCustomObject]@{ Name = "cache1"; IP = "10.0.0.3"; CPU = 12 }
)

$servers | Where-Object { $_.CPU -gt 50 } | Select-Object Name, CPU
$servers | Sort-Object CPU | Format-Table -AutoSize`,
        },
        {
          type: 'note',
          content: 'Get-Member is your best friend in PowerShell. Pipe anything to Get-Member to see all its properties and methods: Get-Process | Get-Member. This works on any object and replaces reading documentation for basic exploration.',
        },
      ],
    },
    {
      slug: 'filesystem',
      title: 'Files & the Filesystem',
      intro: 'PowerShell\'s file cmdlets are powerful and consistent. They work with local files, network paths, and even registry keys using the same commands.',
      sections: [
        {
          type: 'code',
          language: 'powershell',
          content: `# Navigation
Set-Location C:\Users\Alice        # cd equivalent
Push-Location C:\Temp              # push to location stack
Pop-Location                       # return to previous location
Get-Location                       # pwd equivalent

# List files
Get-ChildItem                      # ls/dir
Get-ChildItem -File                # files only
Get-ChildItem -Directory           # directories only
Get-ChildItem -Recurse -Filter "*.ps1"  # recursive
Get-ChildItem -Hidden              # show hidden files

# Read/write files
$content = Get-Content "file.txt"              # array of lines
$content = Get-Content "file.txt" -Raw         # single string
Set-Content "file.txt" "Hello, World!"         # write (overwrite)
Add-Content "file.txt" "New line"              # append

# Test file existence
Test-Path "C:\Temp\file.txt"                   # True or False
Test-Path "C:\Temp" -PathType Container        # is it a directory?

# Create, copy, move, delete
New-Item -ItemType File "newfile.txt"
New-Item -ItemType Directory "newdir"
Copy-Item "source.txt" "dest.txt"
Copy-Item "sourcedir" "destdir" -Recurse
Move-Item "old.txt" "new.txt"
Remove-Item "file.txt"
Remove-Item "directory" -Recurse -Force        # force delete (no confirm)

# Read JSON
$config = Get-Content "config.json" | ConvertFrom-Json
$config.name                       # access properties
$config.port                       # typed values

# Write JSON
$data = @{ name = "Alice"; age = 30 }
$data | ConvertTo-Json | Set-Content "output.json"

# CSV
Import-Csv "data.csv"              # returns objects!
$people | Export-Csv "people.csv" -NoTypeInformation`,
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: System Info Script',
      intro: 'Build a script that gathers system information and outputs a clean, formatted report. Something you could actually run on a new machine.',
      sections: [
        {
          type: 'code',
          language: 'powershell',
          content: `#!/usr/bin/env pwsh
# sysinfo.ps1 — System information report

function Get-SizeString {
    param([long]$Bytes)
    switch ($Bytes) {
        { $_ -gt 1GB } { return "{0:F1} GB" -f ($_ / 1GB) }
        { $_ -gt 1MB } { return "{0:F1} MB" -f ($_ / 1MB) }
        { $_ -gt 1KB } { return "{0:F1} KB" -f ($_ / 1KB) }
        default        { return "$_ B" }
    }
}

function Write-Section {
    param([string]$Title)
    Write-Host ""
    Write-Host "═══ $Title " -NoNewline -ForegroundColor Cyan
    Write-Host ("═" * (50 - $Title.Length - 5)) -ForegroundColor Cyan
}

Write-Host ""
Write-Host "  SYSTEM INFORMATION REPORT" -ForegroundColor White
Write-Host "  Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray

# ─── Operating System ───────────────────────────────────────────────────────
Write-Section "Operating System"
$os = Get-CimInstance Win32_OperatingSystem -ErrorAction SilentlyContinue
if ($os) {
    Write-Host "  OS:       $($os.Caption)"
    Write-Host "  Version:  $($os.Version)"
    Write-Host "  Uptime:   $([math]::Round((Get-Date - $os.LastBootUpTime).TotalHours, 1)) hours"
} else {
    # Cross-platform fallback
    Write-Host "  Platform: $([System.Runtime.InteropServices.RuntimeInformation]::OSDescription)"
    Write-Host "  PowerShell: $($PSVersionTable.PSVersion)"
}

# ─── CPU ────────────────────────────────────────────────────────────────────
Write-Section "CPU"
$cpu = Get-CimInstance Win32_Processor -ErrorAction SilentlyContinue
if ($cpu) {
    Write-Host "  Name:    $($cpu.Name.Trim())"
    Write-Host "  Cores:   $($cpu.NumberOfCores) cores / $($cpu.NumberOfLogicalProcessors) threads"
    Write-Host "  Speed:   $($cpu.MaxClockSpeed) MHz"
}

# CPU load (cross-platform)
$loadPct = (Get-Process | Measure-Object -Property CPU -Sum).Sum
Write-Host "  CPU Sum: $([math]::Round($loadPct, 1))s (cumulative)"

# ─── Memory ─────────────────────────────────────────────────────────────────
Write-Section "Memory"
if ($os) {
    $totalRAM = $os.TotalVisibleMemorySize * 1KB
    $freeRAM  = $os.FreePhysicalMemory * 1KB
    $usedRAM  = $totalRAM - $freeRAM
    $pctUsed  = [math]::Round(($usedRAM / $totalRAM) * 100)
    Write-Host "  Total:  $(Get-SizeString $totalRAM)"
    Write-Host "  Used:   $(Get-SizeString $usedRAM) ($pctUsed%)"
    Write-Host "  Free:   $(Get-SizeString $freeRAM)"
}

# ─── Disk ───────────────────────────────────────────────────────────────────
Write-Section "Disks"
Get-PSDrive -PSProvider FileSystem | ForEach-Object {
    if ($_.Used -or $_.Free) {
        $total = $_.Used + $_.Free
        $pct   = if ($total -gt 0) { [math]::Round(($_.Used / $total) * 100) } else { 0 }
        Write-Host ("  {0,-6} {1,8} used / {2,8} total ({3}%)" -f \`
            "$($_.Name):", (Get-SizeString ($_.Used)), (Get-SizeString $total), $pct)
    }
}

# ─── Top Processes ──────────────────────────────────────────────────────────
Write-Section "Top 5 Processes by Memory"
Get-Process |
    Sort-Object WorkingSet -Descending |
    Select-Object -First 5 |
    ForEach-Object {
        Write-Host ("  {0,-20} {1,8}" -f $_.Name, (Get-SizeString $_.WorkingSet))
    }

# ─── Network ────────────────────────────────────────────────────────────────
Write-Section "Network"
$hostname = [System.Net.Dns]::GetHostName()
Write-Host "  Hostname: $hostname"
[System.Net.Dns]::GetHostAddresses($hostname) |
    Where-Object { $_.AddressFamily -eq "InterNetwork" } |
    ForEach-Object { Write-Host "  IP: $($_.IPAddressToString)" }

Write-Host ""`,
        },
        {
          type: 'code',
          language: 'powershell',
          content: `# Run it:
.\sysinfo.ps1

# On Linux/macOS (some sections will be skipped):
pwsh ./sysinfo.ps1`,
        },
      ],
    },
  ],
}
