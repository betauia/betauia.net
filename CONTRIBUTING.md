# Contribution Guide

Do you want to help make our website? You got any suggestions or good ideas? Well, here you can check out how you can contribute.

---

## What can I do?

There are two main ways to help out:

- The Issue Tracker
- Writing code

And as with everything else, if you got any questions or problems, send a message on our [Discord](https://discord.gg/9X6W6v9RcE).

## Using the Issue Tracker

The [Issue Tracker](https://github.com/betauia/betauia.net/issues) can both be used to look for things to contribute on or add new issues.

If you want to contribute on something, found a bug or a new feature, please mention that you want to take on that effort. Then you can write the actual code.

## Changing the code

### Branch Naming

Branches is needed to be named as `[tag]/[name]`. The name and tag should clearly describe the purpose of the branch. Some of the most common tags are:

- `feature`: For implementing new features.
- `fix`: For implementing fixes on earlier work.
- `docs`: For writing documentation.
- `refactor`: For refactoring, cleaning or restructing code.
- `security`: For providing security updates.

The branches should be named descriptive and with kebab-case (hyphen and lowercase). Here are some examples:

- `feature/register-user`
- `docs/contribution-guide`
- `fix/talking-cows`

### Commit messages

All commits should be prefixed with one [Gitmoji](https://gitmoji.dev/). This makes all commits descriptive, easy to read, and forces each commit to focus on only one specific thing.

If you need to change a commit message, you can do that by:

- Use `git rebase`
  - For example, if you want to change the name of the 4th latest commit, do `git rebase HEAD~4`.
  - This opens your default editor where you have to edit from `pick` to `reword`, save, then quit.
  - That opens a new editor where you can rewrite the commit message.
- After saving that, overwrite the git history with `git push --force`.
