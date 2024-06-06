# BetaWEB

## Overview

**Description**: A fork of the student organization Beta's website.

**Purpose**: BetaDEV is trying to improve the old website.

## Installation

### Prerequisites

- **Git**: Used to clone the repository, [download here](https://www.git-scm.com/downloads).
- **Docker**: Used to create and run containers, [download here](https://www.docker.com/products/docker-desktop).
- **Docker Compose**: Used to define and run multi-container Docker applications, included in Docker Desktop (or follow the [installation instructions](https://docs.docker.com/compose/install/)).

### Steps
1. Clone the repository:
```bash
git clone https://github.com/askeladd123/betadev-developed-development.net
```
2. Navigate to the project directory:
```bash
cd betadev-developed-development
```
3. Switch to the dockerizing branch:
```bash
git checkout dockerizing
```
4. Build and start the Docker containers:
```bash
docker compose up --build
```

## Usage

### Running the application

- Start the development application:
```bash
docker compose up
```
- Start the production application:
```bash
docker compose -f compose.yaml -f compose-prod.yaml up
```

- Access the application at [localhost](http://localhost/)

### Stopping the application

- Stop the application
```bash
docker compose down
```

## Additional Docker Commands
- To view running containers:
```bash
docker compose ps
```
- To rebuild containers:
```bash
docker compose up --build
```

<!-- > NOTE: if you want to clone the games from *game jams*, use `git clone --recurse-submodules <repo name>` -->
