# Quick Start Guide

## Setup the Project

### Prerequisites
- **Git**: used to clone the repository, [download here]
- **Docker** & **Docker Compose: used to define and run the different containers

If you have taken the course IKT101 (or other courses using Git Bash and Docker Desktop), you probably have these tools already.

### Steps
1. Clone the repository to you machine:

```bash
git clone git@github.com:betauia/betauia.net.git
```

2. Navigate to the project directory:

```bash
cd betauia.net
```

3. Copy the environment variables:

```bash
cp .env.example .env
```

4. Build and spin up the Docker containers:

```bash
docker compose up --build
```

Now the frontend can be accessed at [http://localhost:3000/](http://localhost:3000/) and the api on [http://localhost:3000/](http://localhost:8000/).

Check out the [Docker guide](../guides/docker.md) to find out how to do some more fancy tricks.

## Find an Issue
For starting out, it is recommended to pick something labeled `Good First Issue` or `Help Wanted` in [GitHub Issue](https://github.com/betauia/betauia.net/blob/refactor/structure-and-cleaning-of-repo/.env.example). These are simpler tasks that makes you learn how you are supposed to do things in the project.

When you have found an interesting issue, comment that you want to work on it so you can be assigned before starting.

## Make a Branch
Branches needs to follow a naming convention like below and use descriptive prefixes like `fix/`, `feat`, `docs`, `refactor`, etc.

To create a branch, use this command and change the branch name:

```bash
git checkout -b prefix/short-descriptive-name
```

## Code, Commit, Push

Be sure when you make changes, that you solve only one thing per commit. Then stage them to Git and commit it with an emoji:

```bash
git add .  # or `git add file-to-add`
git commit -m "✨ Add new feature"
```

Check [Gitmoji](https://gitmoji.dev/) for what emojies to use.

Then, the commits can be pushed using:

```bash
git push -u origin your-branch-name
```

## Solving the Issue

When you have solved the issue, open a Pull Request on GitHub, and write `Closes #123` in the description where 123 is the issue number. This auto-closes it when it is merged.

Done! 🎉

---

Want a broader understanding of how to contribute? Checkout [`CONTRIBUTING.md`](/CONTRIBUTING.md) for all details.
