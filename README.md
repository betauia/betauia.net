# BetaWEB

## Overview

**Description**: The student organization Beta's website.

**Purpose**: BetaDEV is trying to improve the old website.

## Table of Contents

- [Overview](#overview)
- [Installation and running a fullstack server with docker](#installation-and-running-a-fullstack-server-with-docker)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Usage](#usage)
  - [Running the application](#running-the-application)
  - [Stopping the application](#stopping-the-application)
- [Additional Docker Commands](#additional-docker-commands)
- [Gamejams](#gamejams)
- [Troubleshooting](#troubleshooting)

---

## Installation and running a fullstack server with docker
These are the steps you need to do to run a fullstack development server on your local machine 🧙‍♂️!

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
```bash
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
docker compose up  # Use -d to run detached
```

Access the application at port `3000` (frontend) and `8000` (backend). If `ENV` is set to `production`, the Astro project will be built to `frontend/dist/` and can be hosted via Nginx.

### Stopping the application

- Stop the application:
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

- To remove volumes:
```bash
docker compose down -v
```

- To access the shell of the container (N.B.! intended be used for troubleshooting, e.g. check if something is installed correctly after `compose up`)
```bash
docker exec -it <container_name_or_id> sh
```
<!--
Currently not working, remove quotes when working
## Gamejams

If you want to clone the games from *game jams*, use:
```sh
git clone --recurse-submodules <repo name>
``` 
-->

## Troubleshooting
*this section is for troubleshooting steps that might be relevant*

### Problem with development server
Sometimes a flush of the volumes fixes most of the problems one might encounter in the project. Simply run this command in the terminal:
```bash
docker compose down -v
```

## Troubleshooting
> **Q: I got an error where the docker container can't find a module, and I did not add any modules**

A: This is probably because you built the images before and therefore some residual images for the container is still present. To resolve this run:
```bash
docker compose down -v
```
This ensures all images are removed ensuring you can start the server from scratch starting from [installation step 4](#steps) after a node.js package update