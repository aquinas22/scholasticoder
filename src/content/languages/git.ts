import { Language } from '../types'

export const git: Language = {
  slug: 'git',
  name: 'Git',
  tagline: 'Version control. Undo for your entire project.',
  description: "Git tracks every version of every file in your project, lets you experiment on branches without fear, and makes collaborating with other people possible without emailing zip files. Created by Linus Torvalds in 2005 to manage Linux kernel development, it's now used by essentially every software team on Earth.",
  accentColor: '#F05033',
  textOnAccent: '#fff',
  icon: 'Gt',
  difficulty: 'beginner',
  usedFor: ['Version Control', 'Collaboration', 'Code Review', 'Backups', 'Open Source'],
  notableUsers: ['Linux kernel', 'GitHub', 'GitLab', 'Microsoft', 'Google'],
  setup: {
    description: 'Git is a command-line tool. After installing, tell it your name and email — every change you save is stamped with them.',
    windows: `winget install Git.Git
# Or download from https://git-scm.com

# Then, in a new terminal:
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git --version`,
    mac: `# Git comes with the Xcode command line tools:
xcode-select --install

# Or via Homebrew:
brew install git

git config --global user.name "Your Name"
git config --global user.email "you@example.com"`,
    linux: `sudo apt install git       # Debian/Ubuntu
sudo dnf install git       # Fedora

git config --global user.name "Your Name"
git config --global user.email "you@example.com"`,
  },
  lessons: [
    {
      slug: 'what-git-solves',
      title: 'What Git Actually Solves',
      intro: "final.doc, final_v2.doc, final_FINAL_really.doc — everyone has done this. Git is that instinct, systematized: every saved version kept, named, dated, and recoverable.",
      sections: [
        {
          type: 'text',
          content: "Git is a version control system: it records snapshots of your project over time. Each snapshot (a 'commit') remembers exactly what every file looked like, who saved it, when, and why. You can view any old version, compare versions, or roll back to one — nothing committed is ever lost.",
        },
        {
          type: 'text',
          content: "Three places your files live: the working directory (the actual files you edit), the staging area (files marked to go into the next snapshot), and the repository (the permanent history, stored in a hidden .git folder). The daily loop is: edit files, stage them, commit them.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Turn any folder into a git repository:
cd my-project
git init

# The .git folder now holds all history.
# Delete .git and it's just a normal folder again.

# The single most-used command — what's changed?
git status`,
        },
        {
          type: 'note',
          content: "Git is not GitHub. Git is the tool on your machine; GitHub is a website that hosts git repositories so people can share them. GitLab, Codeberg, and Bitbucket do the same job.",
        },
      ],
    },
    {
      slug: 'add-commit',
      title: 'The Core Loop: add & commit',
      intro: "Edit, stage, commit. You'll run these commands thousands of times. Understand the staging area and everything else in git makes sense.",
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `echo "# My Project" > README.md

git status
# Untracked files: README.md   (git sees it, isn't tracking it)

git add README.md        # stage it
git status
# Changes to be committed: new file: README.md

git commit -m "Add README"
# [main (root-commit) a1b2c3d] Add README

git log --oneline        # view history
# a1b2c3d Add README`,
        },
        {
          type: 'text',
          content: "Why the staging area? It lets you commit some changes but not others. Fixed a bug and also tweaked some styling? Stage and commit the bug fix by itself, then commit the styling separately. Small, focused commits make history readable and problems easy to trace.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `git add file1.js file2.js   # stage specific files
git add .                   # stage everything in current dir

git diff                    # what changed but is NOT staged
git diff --staged           # what IS staged for next commit

git restore file1.js        # discard unstaged edits (careful!)
git restore --staged file1.js  # unstage, keep the edits`,
        },
        {
          type: 'tip',
          content: "Write commit messages that finish the sentence 'This commit will…' — 'Add login form validation', 'Fix crash when cart is empty'. Six months from now, 'stuff' and 'wip' will tell you nothing.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# .gitignore — files git should never track:
# (create this file in the repo root)

node_modules/
*.log
.env
dist/

# Commit .gitignore itself so teammates share the rules.`,
        },
        {
          type: 'warning',
          content: "Never commit secrets — API keys, passwords, .env files. Committed history is forever, and on a public repo bots scrape for leaked keys within minutes. Add secret files to .gitignore before the first commit.",
        },
      ],
    },
    {
      slug: 'branches',
      title: 'Branches',
      intro: "A branch is a parallel timeline for your code. Experiment freely on a branch — if it works, merge it in; if not, delete it and main never knew.",
      sections: [
        {
          type: 'text',
          content: "The default branch is usually called main. Creating a branch is instant and free — git just writes a 43-byte file pointing at a commit. The universal workflow: never work directly on main; make a branch per feature or fix, merge it when done.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `git branch                   # list branches (* = current)
git switch -c add-login      # create branch and switch to it

# ...edit files, add, commit as usual...
git add .
git commit -m "Add login page"

git switch main              # back to main
# Your login changes 'disappear' — they live on the branch.

git switch add-login         # and they're back`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Merge the branch into main:
git switch main
git merge add-login
# Fast-forward or merge commit — either way, main now has the work.

git branch -d add-login      # delete the merged branch

# See the shape of history:
git log --oneline --graph --all`,
        },
        {
          type: 'note',
          content: "Older tutorials use 'git checkout -b name' — it still works, but 'git switch' (for branches) and 'git restore' (for files) split checkout's two jobs into clearly-named commands. Prefer them.",
        },
      ],
    },
    {
      slug: 'merge-conflicts',
      title: 'Merge Conflicts',
      intro: "Two branches edit the same line, then merge. Git can't guess which version you want — so it asks. Conflicts look scary; they're actually a simple text-editing chore.",
      sections: [
        {
          type: 'text',
          content: "When git can't auto-merge, it stops and marks the conflicting region in the file with conflict markers. Your job: open the file, pick (or combine) the versions, delete the markers, stage, commit. That's the whole procedure.",
        },
        {
          type: 'code',
          language: 'text',
          content: `<<<<<<< HEAD
const greeting = "Hello, world!";
=======
const greeting = "Hi there!";
>>>>>>> feature-branch

The part between <<<<<<< and ======= is YOUR side (current branch).
The part between ======= and >>>>>>> is THEIR side (branch being merged).`,
        },
        {
          type: 'code',
          language: 'bash',
          content: `git merge feature-branch
# CONFLICT (content): Merge conflict in greeting.js

# 1. Open greeting.js, edit it to the final version,
#    removing all <<<< ==== >>>> markers.
# 2. Then:
git add greeting.js
git commit               # completes the merge

# Panic button — abandon the merge, back to before:
git merge --abort`,
        },
        {
          type: 'tip',
          content: "VS Code and most editors show conflicts with 'Accept Current / Accept Incoming / Accept Both' buttons — same edit, less typing. Small, frequent merges mean small, rare conflicts.",
        },
      ],
    },
    {
      slug: 'remotes-github',
      title: 'Remotes: push, pull & GitHub',
      intro: "So far everything lived on your machine. A remote is a copy of your repository on a server — backup, publish point, and the way teams share work.",
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `# Connect your repo to an empty GitHub repository:
git remote add origin https://github.com/you/my-project.git

# Upload your commits:
git push -u origin main
# (-u links the branches; afterwards plain 'git push' works)

# Download someone else's repository:
git clone https://github.com/them/cool-project.git

# Get new commits from the remote:
git pull`,
        },
        {
          type: 'text',
          content: "'origin' is just the conventional nickname for the remote you cloned from or first added. push sends your new commits up; pull brings new commits down and merges them into your branch. If you and a teammate both pushed, you must pull (and maybe resolve a conflict) before you can push.",
        },
        {
          type: 'text',
          content: "The collaboration workflow on top of this is the pull request (PR): push your branch to the remote, open a PR proposing it be merged into main, teammates review and comment, then it's merged on the server. PRs are a GitHub/GitLab feature rather than a git one — but they're how virtually all team development works.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Typical team flow:
git switch -c fix-header
# ...edit, add, commit...
git push -u origin fix-header
# Then open a Pull Request on GitHub from 'fix-header' into 'main'.

# After it's merged on GitHub:
git switch main
git pull
git branch -d fix-header`,
        },
      ],
    },
    {
      slug: 'undoing-things',
      title: 'Undoing Things',
      intro: "The whole point of git is that mistakes are recoverable. Here's the undo toolbox — from 'fix my last commit message' to 'where did my work go?'",
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `# Fix the last commit (message or forgotten file):
git commit --amend -m "Better message"
git add forgotten.js && git commit --amend --no-edit

# Undo a commit SAFELY — makes a new commit that reverses it:
git revert a1b2c3d

# Move back in time, keeping your files as they are:
git reset --soft HEAD~1     # undo last commit, keep changes staged

# Throw away the last commit AND its changes:
git reset --hard HEAD~1     # DESTRUCTIVE — changes are gone`,
        },
        {
          type: 'warning',
          content: "Rules of thumb: use revert on commits that were already pushed (it doesn't rewrite history). Use reset only on commits that exist just on your machine. And --hard deletes uncommitted work with no confirmation — check git status first.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `# Stash — shelve uncommitted work temporarily:
git stash            # working directory is clean again
git stash pop        # bring the changes back

# Reflog — git's black box recorder. Every position HEAD
# has been at, even 'deleted' commits:
git reflog
# a1b2c3d HEAD@{0}: reset: moving to HEAD~1
# f4e5d6c HEAD@{1}: commit: the commit you thought you lost

git reset --hard f4e5d6c    # ...and it's back`,
        },
        {
          type: 'tip',
          content: "Almost nothing committed is ever truly lost — reflog keeps entries for ~90 days. If you're mid-panic: stop running commands, run git reflog, breathe, then reset to the entry from before things went wrong.",
        },
      ],
    },
    {
      slug: 'history-inspection',
      title: 'Reading History Like a Detective',
      intro: "Who wrote this line? When did this bug appear? What changed last week? Git answers all of these — history isn't just backup, it's documentation.",
      sections: [
        {
          type: 'code',
          language: 'bash',
          content: `git log --oneline            # compact history
git log -p index.js          # commits + diffs for one file
git log --author="Ada"       # filter by author
git log --since="2 weeks ago"
git log -S "parseConfig"     # commits that added/removed this string

git show a1b2c3d             # everything about one commit

# Who last touched each line of a file, and in which commit:
git blame src/auth.js`,
        },
        {
          type: 'text',
          content: "git bisect deserves special mention: it binary-searches history for the commit that introduced a bug. Mark one good commit and one bad commit, and git checks out the midpoint; you test and say good or bad; repeat. A thousand commits is only ~10 tests.",
        },
        {
          type: 'code',
          language: 'bash',
          content: `git bisect start
git bisect bad               # current version is broken
git bisect good v1.2.0       # this old tag worked

# Git checks out a middle commit. Test your app, then:
git bisect good    # or: git bisect bad
# ...repeat until:
# a1b2c3d is the first bad commit

git bisect reset             # back to where you started`,
        },
        {
          type: 'note',
          content: "This is why small, working commits matter: bisect can only pinpoint a bug to a commit. If that commit is a 2,000-line 'various fixes', you've found the haystack, not the needle.",
        },
      ],
    },
  ],
}
