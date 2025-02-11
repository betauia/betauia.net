# BetaWEB

## Overview

**Description**: The student organization Beta's website.

**Purpose**: BetaDEV is trying to improve the old website.

## Installation

### Prerequisites

- **Git**: Used to clone the repository, [download here](https://www.git-scm.com/downloads).
- **Docker**: Used to create and run containers, [download here](https://www.docker.com/products/docker-desktop).
- **Docker Compose**: Used to define and run multi-container Docker applications, included in Docker Desktop (or follow the [installation instructions](https://docs.docker.com/compose/install/)).

### Steps
1. Clone the repository:
```bash
git clone https://github.com/betauia/betauia.net
```
2. Navigate to the project directory:
```bash
cd betauia.net
```
3. Copy environment variables and edit them as needed:
```
cp .env.example .env
```
4. Build and start the Docker containers:
```bash
docker compose up --build
```

## Usage

### Running the application

- Start the application:
```bash
docker compose up  # Use -d to run detatched
```

Access the application at port `3000` (frontend) and `8000` (backend). If `ENV` is set to `production`, the astro project will be built to `frontend/dist/` and can be hosted via Nginx.

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
- To build containers:
```bash
docker compose build
```

## Gamejams

If you want to clone the games from *game jams*, use:
```sh
git clone --recurse-submodules <repo name>
```
