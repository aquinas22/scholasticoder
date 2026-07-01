import { Language } from '../types'

export const bash: Language = {
  slug: 'bash',
  name: 'Bash',
  tagline: 'Your terminal\'s native tongue. Learn it and become one with the shell.',
  description: 'Bash (Bourne Again Shell) is the command interpreter on most Linux systems and macOS. It\'s a programming language that runs directly in your terminal. Automate repetitive tasks, write deployment scripts, glue other programs together — Bash is the universal duct tape of computing.',
  accentColor: '#4EAA25',
  textOnAccent: '#fff',
  icon: 'Sh',
  difficulty: 'beginner',
  usedFor: ['Shell Scripting', 'System Administration', 'CI/CD Pipelines', 'Task Automation', 'DevOps'],
  notableUsers: ['Linux', 'macOS', 'Every CI system ever', 'Every server ever'],
  setup: {
    description: 'Bash is already on your system if you\'re on Linux or macOS. Windows users can get it via WSL2 or Git Bash.',
    windows: `# Option 1: WSL2 (recommended — real Linux environment)
wsl --install          # install WSL2 + Ubuntu
wsl                    # start a Linux shell

# Option 2: Git Bash (lightweight, comes with Git)
# Download Git from git-scm.com — includes Git Bash

# Check which shell:
echo $BASH_VERSION

# Windows Terminal is a great terminal emulator:
winget install Microsoft.WindowsTerminal`,
    mac: `# Bash is pre-installed. Note: macOS defaults to zsh since 10.15.
# Bash scripts still run fine.

# Check your shell:
echo $SHELL   # /bin/zsh or /bin/bash

# Get the latest Bash via Homebrew (macOS has old Bash 3.2 due to GPL):
brew install bash

# Use Bash for a session:
bash`,
    linux: `# Bash is almost certainly already installed.
# Check version:
bash --version

# Run a script:
chmod +x script.sh
./script.sh

# Or run directly:
bash script.sh`,
  },
  lessons: [
    {
      slug: 'first-script',
      title: 'Your First Script',
      intro: 'A Bash script is just a text file with commands in it. The magic is in the shebang line at the top, which tells the system which interpreter to use.',
      sections: [
        {
          type: 'text',
          content: 'The shebang (#!) on line 1 tells the OS what program to use to run the file. #!/bin/bash means "run this with Bash." Make the file executable with chmod +x, then run it with ./filename.sh.',
        },
        {
          type: 'code',
          language: 'bash',
          content: `#!/bin/bash
# This is a comment
# Above is the "shebang" — tells the OS to use bash

echo "Hello, World!"
echo "My name is $(whoami)"    # $() runs a command and inserts its output
echo "Today is $(date +%Y-%m-%d)"
echo "You are in: $PWD"        # $PWD is a built-in variable`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Save as hello.sh, then:
chmod +x hello.sh   # make it executable
./hello.sh          # run it

# Or without chmod:
bash hello.sh

# Useful echo options
echo "No newline" -n           # -n: no trailing newline
echo -e "Tab:\\there"          # -e: interpret escape sequences
echo -e "Line1\\nLine2"        # \\n = newline

# printf — more control than echo
printf "Name: %s, Age: %d\\n" "Alice" 30
printf "Pi: %.4f\\n" 3.14159`,
        },
        {
          type: 'note',
          content: 'Use #!/usr/bin/env bash instead of #!/bin/bash for better portability — it finds Bash wherever it is in PATH, rather than assuming it\'s at /bin/bash.',
        },
      ],
    },
    {
      slug: 'variables',
      title: 'Variables & Input',
      intro: 'Bash variables have no types. Everything is a string. This is either simple or chaos, depending on what you\'re trying to do with numbers.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `#!/bin/bash

# Variable assignment — NO spaces around =
name="Alice"
age=30
greeting="Hello"

# Access with $
echo "$name"
echo "Name: $name, Age: $age"
echo "\${name}'s age is \${age}"  # {} braces for clarity

# Command substitution
current_date=$(date +%Y-%m-%d)
file_count=$(ls | wc -l)
echo "Date: $current_date, Files: $file_count"

# Arithmetic — must use $(( ))
a=10
b=3
echo $((a + b))   # 13
echo $((a - b))   # 7
echo $((a * b))   # 30
echo $((a / b))   # 3 (integer division!)
echo $((a % b))   # 1

# Increment/decrement
count=0
((count++))
((count += 5))
echo $count   # 6

# Special variables
echo "Script name: $0"
echo "First arg: $1"
echo "All args: $@"
echo "Arg count: $#"
echo "Last exit code: $?"
echo "Current PID: $$"`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `#!/bin/bash

# Reading user input
echo -n "Enter your name: "
read name
echo "Hello, $name!"

# Read with a prompt
read -p "Enter your age: " age
echo "In 10 years you'll be $((age + 10))"

# Silent input (for passwords)
read -sp "Enter password: " password
echo ""  # newline after silent input
echo "Password length: \${#password}"

# Read with timeout
if read -t 5 -p "Quick! Type something (5s): " input; then
    echo "You typed: $input"
else
    echo "Too slow!"
fi

# Read into array
read -a words <<< "apple banana cherry"
echo "First: \${words[0]}"
echo "All: \${words[@]}"

# Command-line arguments
if [ $# -lt 2 ]; then
    echo "Usage: $0 <first-name> <last-name>"
    exit 1
fi
echo "Hello, $1 $2!"`,
        },
        {
          type: 'warning',
          content: 'Always quote your variables: use "$name" not $name. Unquoted variables are subject to word splitting and glob expansion, which causes subtle, hard-to-debug bugs when values contain spaces or special characters.',
        },
      ],
    },
    {
      slug: 'control-flow',
      title: 'Control Flow',
      intro: 'Bash conditionals look strange at first. The [ ... ] is actually a command (test). The spaces inside are required. Yes, really.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `#!/bin/bash

# if / elif / else
age=20
if [ "$age" -ge 18 ]; then
    echo "Adult"
elif [ "$age" -ge 13 ]; then
    echo "Teenager"
else
    echo "Child"
fi

# Numeric comparisons (use -eq -ne -lt -le -gt -ge, NOT == < >)
x=10
if [ "$x" -eq 10 ]; then echo "equal to 10"; fi
if [ "$x" -gt 5 ]; then  echo "greater than 5"; fi
if [ "$x" -lt 20 ]; then echo "less than 20"; fi

# String comparisons
name="Alice"
if [ "$name" = "Alice" ]; then echo "It's Alice!"; fi
if [ -z "$name" ]; then echo "Empty string"; fi     # -z: zero length
if [ -n "$name" ]; then echo "Non-empty string"; fi # -n: non-zero length

# File tests
if [ -f "script.sh" ]; then echo "File exists"; fi
if [ -d "/tmp" ]; then echo "Directory exists"; fi
if [ -e "anything" ]; then echo "Path exists"; fi
if [ -r "file.txt" ]; then echo "Readable"; fi
if [ -x "script.sh" ]; then echo "Executable"; fi

# Combine conditions
if [ "$age" -ge 18 ] && [ "$name" = "Alice" ]; then
    echo "Adult Alice"
fi

# [[ ]] is more powerful (bash-specific, but preferred)
if [[ "$name" == Ali* ]]; then   # pattern matching!
    echo "Name starts with Ali"
fi`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `#!/bin/bash

# for loop — over a list
for fruit in apple banana cherry; do
    echo "I like $fruit"
done

# for loop — with range
for i in {1..5}; do
    echo "Count: $i"
done

# for loop — C-style
for ((i=0; i<5; i++)); do
    echo "i = $i"
done

# for loop — over files
for file in *.sh; do
    echo "Shell script: $file"
done

# for loop — over command output
for user in $(cut -d: -f1 /etc/passwd | head -5); do
    echo "User: $user"
done

# while loop
count=0
while [ "$count" -lt 5 ]; do
    echo "count: $count"
    ((count++))
done

# read lines from a file
while IFS= read -r line; do
    echo "Line: $line"
done < "data.txt"

# until loop — opposite of while
n=10
until [ "$n" -le 0 ]; do
    echo "$n"
    ((n -= 3))
done`,
        },
      ],
    },
    {
      slug: 'functions',
      title: 'Functions',
      intro: 'Bash functions are reusable blocks of code. They work differently from functions in other languages — no return values, just exit codes and stdout.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `#!/bin/bash

# Function definition
greet() {
    local name="$1"   # local — scoped to function
    echo "Hello, $name!"
}

# Call it
greet "Alice"
greet "World"

# Arguments work like script arguments: $1, $2, $@
log() {
    local level="$1"
    shift              # shift removes $1, moves $2 to $1, etc.
    echo "[$(date +%H:%M:%S)] [$level] $*"
}

log "INFO" "Server started"
log "ERROR" "Connection refused"

# Return an exit code (0=success, non-zero=failure)
is_even() {
    local n="$1"
    [ $((n % 2)) -eq 0 ]   # the exit code of the last command is returned
}

if is_even 4; then echo "4 is even"; fi
if ! is_even 3; then echo "3 is odd"; fi

# "Return" a value via echo + command substitution
to_uppercase() {
    echo "$1" | tr '[:lower:]' '[:upper:]'
}

result=$(to_uppercase "hello world")
echo "$result"   # HELLO WORLD`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `#!/bin/bash

# Useful pattern: functions that do one thing
check_dependency() {
    if ! command -v "$1" &>/dev/null; then
        echo "ERROR: '$1' is not installed. Please install it first." >&2
        return 1
    fi
}

check_dependencies() {
    local failed=0
    for dep in "$@"; do
        check_dependency "$dep" || ((failed++))
    done
    return $failed
}

# Error handling
die() {
    echo "ERROR: $*" >&2
    exit 1
}

require_file() {
    [ -f "$1" ] || die "Required file not found: $1"
}

# Example usage
check_dependencies git curl jq || die "Missing dependencies"
require_file "config.json"`,
        },
        {
          type: 'note',
          content: 'Use local for all variables inside functions. Without local, Bash variables are global by default — a function setting x=5 would change a global x variable, which is a nasty source of bugs.',
        },
      ],
    },
    {
      slug: 'files',
      title: 'Working with Files',
      intro: 'Bash was born to manipulate files. Half the Unix philosophy is "everything is a file." The other half is "small tools that do one thing well."',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `#!/bin/bash

# Reading files
# cat — print entire file
cat file.txt

# Read line by line (best for processing)
while IFS= read -r line; do
    echo ">> $line"
done < "file.txt"

# head/tail
head -5 file.txt    # first 5 lines
tail -10 file.txt   # last 10 lines
tail -f log.txt     # follow a growing file (Ctrl+C to stop)

# Writing files
echo "Hello" > output.txt    # write (overwrites!)
echo "World" >> output.txt   # append
cat > multi.txt << 'EOF'
Line 1
Line 2
Line 3
EOF

# File operations
cp source.txt dest.txt          # copy
cp -r source_dir/ dest_dir/     # copy directory recursively
mv old_name.txt new_name.txt    # rename or move
rm file.txt                     # remove (no recycle bin!)
rm -rf directory/               # remove directory recursively (CAREFUL)

# Safe remove — always check before deleting
echo "Would remove: file.txt"   # dry run first
rm -i file.txt                  # interactive — asks for confirmation

# Find files
find . -name "*.sh" -type f           # find .sh files
find . -newer reference.txt           # files newer than reference
find . -size +1M                      # files larger than 1MB
find . -name "*.log" -delete          # find and delete`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `#!/bin/bash

# Text processing — the Unix triumvirate
# grep — search for patterns
grep "error" log.txt               # lines containing "error"
grep -i "error" log.txt            # case-insensitive
grep -r "TODO" ./src/              # recursive
grep -n "main" script.sh           # show line numbers
grep -v "debug" log.txt            # invert — lines WITHOUT "debug"
grep -c "error" log.txt            # count matching lines

# sed — stream editor (find and replace)
sed 's/foo/bar/g' file.txt         # replace all foo with bar
sed -i 's/foo/bar/g' file.txt      # replace in-place (modifies file!)
sed -i.bak 's/foo/bar/g' file.txt  # replace in-place, keep backup
sed '/^#/d' file.txt               # delete lines starting with #
sed -n '5,10p' file.txt            # print lines 5-10

# awk — pattern scanning and processing
awk '{print $1}' file.txt          # print first field (space-separated)
awk -F: '{print $1}' /etc/passwd   # use : as delimiter
awk '{sum += $1} END {print sum}' numbers.txt  # sum first column
awk 'NR > 1 {print}' file.txt      # skip header line

# Combining with pipes
grep "ERROR" log.txt | awk '{print $4}' | sort | uniq -c | sort -rn`,
        },
      ],
    },
    {
      slug: 'pipes-redirection',
      title: 'Pipes & Redirection',
      intro: 'Pipes are how Unix tools talk to each other. Each small tool does one thing — pipes connect them into powerful pipelines. This is the Unix superpower.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `#!/bin/bash

# Redirection
command > file.txt     # redirect stdout to file (overwrite)
command >> file.txt    # redirect stdout to file (append)
command 2> error.txt   # redirect stderr to file
command 2>&1           # redirect stderr to stdout
command > all.txt 2>&1 # redirect both to file
command < input.txt    # redirect file to stdin
command &> all.txt     # bash shorthand for both stdout+stderr

# /dev/null — the bit bucket
command > /dev/null         # discard stdout
command > /dev/null 2>&1    # discard everything

# Pipes — connect stdout of one command to stdin of next
ls -la | grep ".sh"            # filter ls output
cat /etc/passwd | cut -d: -f1 | sort    # get and sort usernames
ps aux | grep nginx | grep -v grep      # find nginx processes
du -sh */ | sort -h                      # show dir sizes, sorted
history | awk '{print $2}' | sort | uniq -c | sort -rn | head -10  # top commands

# tee — write to file AND pass through to stdout
command | tee output.txt         # see output AND save it
command | tee -a output.txt      # append instead of overwrite

# xargs — build commands from stdin
find . -name "*.log" | xargs rm          # delete all .log files
find . -name "*.py" | xargs wc -l       # count lines in each file
echo "apple banana cherry" | xargs -n1  # one item per line

# Process substitution (bash-specific)
diff <(ls dir1/) <(ls dir2/)    # compare output of two commands`,
        },
      ],
    },
    {
      slug: 'mini-project',
      title: 'Mini Project: Backup Script',
      intro: 'A practical backup script that compresses directories, keeps the last N backups, and logs everything. Something you might actually use.',
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `#!/usr/bin/env bash
# backup.sh — Simple directory backup script
set -euo pipefail  # exit on error, undefined vars, pipe failures

BACKUP_DIR="\${HOME}/backups"
KEEP_LAST=5
LOG_FILE="\${BACKUP_DIR}/backup.log"

# ─── Helpers ────────────────────────────────────────────────────────────────

log() {
    local msg="[$(date '+%Y-%m-%d %H:%M:%S')] $*"
    echo "$msg"
    echo "$msg" >> "$LOG_FILE"
}

die() {
    log "ERROR: $*"
    exit 1
}

usage() {
    cat << 'USAGE'
Usage: backup.sh <source-directory> [backup-name]
  source-directory  Directory to back up
  backup-name       Optional name (default: directory name)
USAGE
    exit 1
}

# ─── Validation ─────────────────────────────────────────────────────────────

[ $# -ge 1 ] || usage

SOURCE="\${1%/}"    # remove trailing slash
NAME="\${2:-$(basename "$SOURCE")}"    # use basename if name not provided

[ -d "$SOURCE" ] || die "Source directory not found: $SOURCE"
command -v tar &>/dev/null || die "tar is required but not installed"

# ─── Setup ──────────────────────────────────────────────────────────────────

mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date '+%Y%m%d_%H%M%S')
BACKUP_FILE="\${BACKUP_DIR}/\${NAME}_\${TIMESTAMP}.tar.gz"

# ─── Backup ─────────────────────────────────────────────────────────────────

log "Starting backup of '$SOURCE'..."
log "Target: $BACKUP_FILE"

# Calculate source size
SOURCE_SIZE=$(du -sh "$SOURCE" 2>/dev/null | cut -f1)
log "Source size: $SOURCE_SIZE"

# Create compressed archive
if tar -czf "$BACKUP_FILE" -C "$(dirname "$SOURCE")" "$(basename "$SOURCE")"; then
    BACKUP_SIZE=$(du -sh "$BACKUP_FILE" | cut -f1)
    log "Backup created: $BACKUP_FILE ($BACKUP_SIZE)"
else
    die "tar failed"
fi

# ─── Cleanup old backups ────────────────────────────────────────────────────

# Count existing backups for this name
EXISTING=$(find "$BACKUP_DIR" -name "\${NAME}_*.tar.gz" | sort)
COUNT=$(echo "$EXISTING" | grep -c "." 2>/dev/null || true)

if [ "$COUNT" -gt "$KEEP_LAST" ]; then
    DELETE_COUNT=$((COUNT - KEEP_LAST))
    log "Removing $DELETE_COUNT old backup(s) (keeping last $KEEP_LAST)..."
    echo "$EXISTING" | head -n "$DELETE_COUNT" | while IFS= read -r old; do
        log "  Removing: $(basename "$old")"
        rm -f "$old"
    done
fi

log "Backup complete!"
log "Backups for '$NAME':"
find "$BACKUP_DIR" -name "\${NAME}_*.tar.gz" | sort | while IFS= read -r f; do
    log "  $(basename "$f") ($(du -sh "$f" | cut -f1))"
done`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Make it executable
chmod +x backup.sh

# Run it
./backup.sh ~/Documents
./backup.sh ~/projects my-code

# Schedule with cron (run daily at 2am):
crontab -e
# Add: 0 2 * * * /path/to/backup.sh /home/user/Documents`,
        },
        {
          type: 'note',
          content: 'The set -euo pipefail at the top is a safety triple: -e exits on error, -u errors on undefined variables, -o pipefail catches errors in pipelines. Put it at the top of every Bash script you write.',
        },
      ],
    },
  ],
}
