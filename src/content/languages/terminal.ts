import { Language } from '../types'

export const terminal: Language = {
  slug: 'terminal',
  name: 'How the Terminal Works',
  tagline: 'The text interface behind every developer tool.',
  description: "Terminals look ancient because they are — and they've outlived every 'replacement' because text commands compose, automate, and travel over SSH like nothing else. This track explains the machinery: what a shell actually is, how commands are found and run, where the text goes, and why your terminal understands colors. Pairs with the Bash track, which teaches the commands themselves.",
  accentColor: '#00C853',
  textOnAccent: '#1a1a1a',
  icon: '>_',
  difficulty: 'beginner',
  usedFor: ['Development', 'Servers & SSH', 'Automation', 'Debugging', 'Every Dev Tool Ever'],
  notableUsers: ['Every developer', 'Every server', 'macOS Terminal', 'Windows Terminal', 'VS Code'],
  setup: {
    description: "You already have one. This track explains what it is — the Bash track covers commands in depth.",
    windows: `# Windows Terminal (get it from the Microsoft Store)
# runs three different shells:
#   PowerShell  — Windows-native (see PowerShell track)
#   cmd.exe     — the 1980s legacy shell
#   WSL bash    — a real Linux environment

wsl --install     # recommended for this track's examples`,
    mac: `# Terminal.app is built in (Cmd+Space, type "terminal").
# Your shell is zsh — bash-compatible for everything here.

echo $SHELL       # /bin/zsh
# Popular upgrade: iTerm2 (iterm2.com)`,
    linux: `# Any terminal emulator works — GNOME Terminal,
# Konsole, Alacritty, kitty...

echo $SHELL       # probably /bin/bash
tty               # which terminal device you're on`,
  },
  lessons: [
    {
      slug: 'terminal-vs-shell',
      title: 'Terminal vs Shell — Two Different Programs',
      intro: "People say 'the terminal' for the whole experience, but it's two programs: the terminal draws the window, and the shell interprets your commands. Untangling them explains most terminal mysteries.",
      sections: [
        {
          type: 'text',
          content: "The terminal emulator (Windows Terminal, iTerm2, GNOME Terminal) is a graphics program: it draws text, handles fonts and colors, turns your keystrokes into bytes. The shell (bash, zsh, PowerShell) is a text program running inside it: it reads a line like 'ls -l', finds and runs the program, and hands the output bytes back to the terminal to draw. Either can be swapped out independently — same terminal can run bash or zsh; same shell runs in any terminal.",
        },
        {
          type: 'code',
          language: 'text',
          content: `you press 'l', 's', Enter
   |
   v
terminal emulator     "I turn keys into bytes and bytes
   |                   into pixels. I don't know what ls is."
   v
shell (bash/zsh)      "ls? Let me find that program,
   |                   run it, and give you its output."
   v
the ls program        does the actual work, prints results
   |
   v  (bytes flow back up the same path)
pixels on your screen`,
        },
        {
          type: 'text',
          content: "Why 'emulator'? Real terminals were hardware — a VT100 was a screen and keyboard wired to a distant computer, speaking a byte protocol over a serial cable. The hardware died; the byte protocol survived. Modern terminal windows emulate those devices so faithfully that 1978 software still runs — and that same protocol is why SSH-ing to a server feels identical to a local window.",
        },
        {
          type: 'note',
          content: "Naming the layers: console ≈ terminal (historical hardware term), shell = the command interpreter, command line = the interface style, TTY = 'teletype', the kernel's name for a terminal connection — visible in commands like tty and ps.",
        },
      ],
    },
    {
      slug: 'what-happens-when-you-run-a-command',
      title: 'What Happens When You Press Enter',
      intro: "'ls -l' — Enter — output appears. Between those two moments: parsing, an environment-variable treasure hunt, a process being born, and three data streams being wired up. Here's the whole journey.",
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `# The shell splits your line into words:
ls -l /tmp
# word 0: 'ls'      -> the command
# word 1: '-l'      -> argument (programs choose what it means)
# word 2: '/tmp'    -> argument

# Then finds the program by searching PATH, in order:
echo $PATH        # /usr/local/bin:/usr/bin:/bin:...
which ls          # /usr/bin/ls — first match wins

# Not everything is a program on disk:
type ls           # ls is /usr/bin/ls
type cd           # cd is a shell builtin  (must be! it changes
                  # the shell's own directory)
type ll           # ll is an alias for 'ls -alF' (maybe)`,
        },
        {
          type: 'text',
          content: "Before the search, the shell expands your line: $HOME becomes /home/you, *.txt becomes every matching filename, ~ becomes your home directory. The program never sees the wildcard — it receives the already-expanded list. Then the shell asks the OS to fork a child process, exec the program in it with those arguments, and waits for it to exit.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Expansions happen BEFORE the program runs:
echo *.md          # shell replaced *.md with actual filenames
echo "$HOME"       # variable expanded by the shell
echo '$HOME'       # single quotes suppress expansion: $HOME

# Every process exits with a status code:
ls /nonexistent
echo $?            # 2 — nonzero means failure
ls /tmp > /dev/null; echo $?    # 0 — success

# && and || read the exit code:
make && ./run      # run only if make succeeded
cmd || echo "failed"`,
        },
        {
          type: 'tip',
          content: "'Command not found' now debuggable: the shell searched every PATH directory and none contained that name. Installed something and it's not found? Its directory isn't in PATH, or the shell cached an old lookup (hash -r / rehash clears it).",
        },
      ],
    },
    {
      slug: 'stdin-stdout-pipes',
      title: 'stdin, stdout & Pipes',
      intro: "Every program is born holding three data streams: input, output, errors. Redirection and pipes just re-plug those streams — into files, or into other programs. This is the terminal's superpower.",
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `# Three standard streams, by number:
#   0 stdin  — bytes in (default: your keyboard)
#   1 stdout — results out (default: your screen)
#   2 stderr — errors out (default: also your screen)

ls > files.txt        # stdout -> file (overwrite)
ls >> files.txt       # stdout -> file (append)
ls /nope 2> err.txt   # stderr -> file
ls /nope > all.txt 2>&1   # both -> one file
sort < names.txt      # file -> stdin

# stderr is separate ON PURPOSE — errors stay visible
# even when you redirect the results:
myprogram > results.txt     # errors still hit your screen`,
        },
        {
          type: 'text',
          content: "The pipe | connects one program's stdout to the next one's stdin, no temp files involved. Both programs run simultaneously; the kernel shuttles bytes between them and pauses the fast one when the slow one falls behind. Small tools, each doing one job, snapped together like hose segments — the Unix philosophy in one character.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Build analysis pipelines out of small tools:
history | grep git | wc -l       # how many git commands you've run

# Classic shape: extract | filter | transform | count
cat access.log \\
  | grep " 500 "        \\
  | awk '{print $1}'    \\
  | sort | uniq -c      \\
  | sort -rn | head     # top IPs causing server errors

# tee splits a stream: to a file AND onward
long_build 2>&1 | tee build.log | grep -i error`,
        },
        {
          type: 'note',
          content: "Programs adapt to where their output goes: ls prints columns to a terminal but one-name-per-line into a pipe (it checks 'is stdout a TTY?'). Same reason color codes vanish when you redirect to a file — well-behaved tools only emit them for real terminals.",
        },
      ],
    },
    {
      slug: 'environment-and-config',
      title: 'Environment Variables & Shell Startup',
      intro: "Why does PATH exist in every window? What is .bashrc actually for? Environment variables are the shell's inheritance system — settings that flow parent to child, window to program.",
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `# Every process carries a set of KEY=value strings:
env | head             # see yours
echo $HOME             # /home/you
echo $USER $LANG

# Shell variable vs environment variable:
color=blue             # shell-only: children can't see it
export COLOR=blue      # environment: inherited by children

# Prove inheritance:
export MY_FLAG=hello
bash -c 'echo $MY_FLAG'    # hello — child got a COPY
MY_FLAG=changed bash -c 'echo $MY_FLAG'  # one-off override

# Copies, not links — child changes never flow back up.
# This is why 'export PATH=...' in one window
# does nothing for other windows.`,
        },
        {
          type: 'text',
          content: "Programs read the environment for configuration: EDITOR tells git which editor to open, HOME tells everything where your files live, NODE_ENV switches app behavior, API keys arrive in CI this way. It's the universal config channel — no files, no flags, inherited automatically.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Startup files — run automatically, this is where
# your customizations live:
#
#   bash:  ~/.bashrc   (each interactive shell)
#          ~/.bash_profile  (login shells; usually sources .bashrc)
#   zsh:   ~/.zshrc
#
# Typical contents:
export PATH="$HOME/.local/bin:$PATH"   # add your tools dir
export EDITOR=vim
alias gs='git status'
alias ll='ls -alF'

# Apply edits to the CURRENT shell (else: new window):
source ~/.bashrc`,
        },
        {
          type: 'tip',
          content: "Now installer instructions make sense: 'add this line to your .bashrc' means 'make this environment change happen in every future shell'. And when a tool works in one terminal but not another — diff their env output; it's almost always PATH.",
        },
      ],
    },
    {
      slug: 'escape-codes-and-tty',
      title: 'Colors, Cursors & Full-Screen Apps',
      intro: "Terminals only move bytes — so how does text turn green? How does vim own the whole screen? Answer: some bytes are secret commands. Escape codes are the terminal's hidden control language.",
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `# Byte 27 (ESC) starts a command; '[' + codes + 'm' = style:
printf '\\033[32mgreen text\\033[0m normal\\n'
printf '\\033[1;31mbold red\\033[0m\\n'
printf '\\033[7minverted\\033[0m\\n'

# Codes: 0 reset | 1 bold | 31 red | 32 green | 34 blue
#        90-97 bright colors | 38;5;N -> 256 colors

# It's just bytes in the stream — look:
ls --color=always | head -3 | cat -v
# ^[[0m^[[01;34msrc^[[0m ...   <- the 'invisible' codes`,
        },
        {
          type: 'text',
          content: "Beyond colors, escape codes move the cursor to any row and column, clear regions, and switch screens. Progress bars are 'carriage return, redraw the line'. Spinners are 'print, back up, print'. Full-screen apps — vim, htop, top — are programs furiously emitting cursor-movement and redraw codes while reading your keys raw. The terminal is a canvas addressed by text.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# A live progress bar in four lines of shell:
for i in $(seq 1 20); do
  printf '\\r[%-20s] %d%%' "$(printf '#%.0s' $(seq 1 $i))" $((i*5))
  sleep 0.1
done; echo
# \\r returns the cursor to line start — each print overwrites

# Terminal modes: normally the OS buffers a full line and
# handles Backspace before programs see anything ('cooked').
# vim switches to raw mode — every keystroke delivered
# instantly, no Enter needed. 'stty sane' + Enter rescues a
# terminal a crashed program left in a weird state.`,
        },
        {
          type: 'note',
          content: "Ctrl+C isn't 'copy' here for a reason older than clipboards: the TTY layer turns it into a SIGINT signal that interrupts the running program. Ctrl+Z suspends (SIGTSTP; resume with fg), Ctrl+D sends 'end of input'. That's also why terminal copy/paste grew different bindings (Ctrl+Shift+C or Cmd+C).",
        },
      ],
    },
    {
      slug: 'ssh-and-remote',
      title: 'SSH — Your Terminal, Any Machine',
      intro: "The payoff for all this text-protocol archaeology: because a terminal session is just a byte stream, it travels over a network connection perfectly. SSH is how every server on Earth is administered.",
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `ssh user@server.example.com
# Encrypted connection; the server starts a shell for you;
# your keys flow there, its output flows back. Your
# terminal now controls a machine anywhere on Earth.

# Set up key-based login (no passwords, more secure):
ssh-keygen -t ed25519            # once: makes a keypair
ssh-copy-id user@server          # install public key on server
ssh user@server                  # now logs in with the key

# Run one command instead of a session:
ssh user@server 'df -h'

# Copy files over the same protocol:
scp report.pdf user@server:/tmp/
rsync -av ./site/ user@server:/var/www/   # sync, resumable`,
        },
        {
          type: 'text',
          content: "Everything from earlier lessons applies unchanged over SSH — pipes, redirection, environment variables, escape codes, vim. The shell doesn't know it's remote; the terminal doesn't know either. Two machines, one byte protocol. This is why the terminal remains the universal server interface while GUIs come and go: bytes over a wire beat pixels over a wire.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# The one problem: hang up, and your processes die
# (they get SIGHUP when the TTY disappears).

# Solution: terminal multiplexers — tmux (or screen):
tmux                     # start a session on the server
long_running_job.sh      # kick something off
# Ctrl+B then D          # detach — job keeps running
# ...close laptop, fly home, reconnect...
tmux attach              # session exactly as you left it

# tmux also splits panes and windows inside one SSH
# connection — many terminals through one pipe.`,
        },
        {
          type: 'tip',
          content: "Next steps from here: the Bash track for real command-line fluency, and ~/.ssh/config for saving host aliases (ssh myserver instead of ssh -p 2222 admin@203.0.113.9). Once tmux + ssh feel natural, you can work from anything with a keyboard.",
        },
      ],
    },
  ],
}
