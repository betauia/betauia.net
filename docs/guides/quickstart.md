# Quick Start Guide

## Setup the Project

### Prerequisites

Install these once:

- **Git** and a **GitHub account**: used to fork and clone the repository
- **[Node.js 24](https://nodejs.org/)** and **[pnpm 12](https://pnpm.io/installation)**: runs the frontend
- **[uv](https://docs.astral.sh/uv/getting-started/installation/)**: runs the backend (it installs the right Python version for you)
- **Docker Desktop** (optional): only needed for the database

> Using Nix? Run `nix develop` (or let `direnv` load `.envrc`) to get Node, pnpm and uv.

### Steps

1. Fork the repository: open [betauia/betauia.net](https://github.com/betauia/betauia.net) and click **Fork** in the top right. This gives you your own copy on GitHub that you can push to.

2. Clone your fork (replace `your-username`) and connect it to the main repository, so you can get the latest changes later:

```bash
git clone git@github.com:your-username/betauia.net.git
cd betauia.net
git remote add upstream git@github.com:betauia/betauia.net.git
```

> `origin` is your fork, where you push your work. `upstream` is the main repository, where you get updates from.

3. Copy the environment variables:

```bash
cp .env.example .env
```

4. Start Docker Desktop, then start everything:

```bash
pnpm dev
```

The frontend is now on [http://localhost:3000/](http://localhost:3000/) and the API on [http://localhost:8000/](http://localhost:8000/docs). Stop it with `Ctrl+C`.

> Without Docker, `pnpm dev` still starts the website, but pages that need data (like logging in and job listings) will not work.

That's it! See the [development guide](development.md) for all commands.

## Find an Issue

For starting out, it is recommended to pick something labeled `Good First Issue` or `Help Wanted` in [GitHub Issue](https://github.com/betauia/betauia.net/issues). These are simpler tasks that makes you learn how you are supposed to do things in the project.

When you have found an interesting issue, comment that you want to work on it so you can be assigned before starting.

## Make a Branch

Branches needs to follow a naming convention like below and use descriptive prefixes like `fix/`, `feat`, `docs`, `refactor`, etc.

Always start from the newest version of the main repository. Update your `master`, then create a branch from it and change the branch name:

```bash
git checkout master
git pull upstream master
git checkout -b prefix/short-descriptive-name
```

## Code, Commit, Push

Be sure when you make changes, that you solve only one thing per commit. Before committing, run `pnpm format` and `pnpm check`, the same checks run automatically on your Pull Request.

Then stage them to Git and commit it with an emoji:

```bash
git add my-edited-file  # Or multiple
git commit -m "✨ Add new feature"
```

Check [Gitmoji](https://gitmoji.dev/) for what emojies to use and remember to not add the `.vscode/` folder.

Then, push the commits to your fork:

```bash
git push -u origin prefix/short-descriptive-name
```

## Solving the Issue

When you have solved the issue, go to your fork on GitHub and click **Contribute**, then **Open pull request**. Make sure it goes from your branch into `master` on `betauia/betauia.net`, and write `Closes #123` in the description where 123 is the issue number. This auto-closes it when it is merged.

Done! 🎉

---

Want a broader understanding of how to contribute? Checkout [`CONTRIBUTING.md`](/CONTRIBUTING.md) for all details.
