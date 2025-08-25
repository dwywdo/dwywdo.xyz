---
title: General Container runtime requirements - Testcontainers for Java
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-08-25
---
[Source](https://java.testcontainers.org/supported_docker_environment/) 
# General Container runtime requirements
---
 
## Overview
---
**p.** "To run Testcontainers-based tests, you need a Docker-API compatible container runtime"

**p.** "Docker environments are automatically detected and used by Testcontainers without any additional configuration being necessary."

**p.** "It is possible to configure Testcontainers to work with alternative container runtimes."

**p.** "Making use of the free Testcontainers Desktop app will take care of most of the manual configuration."

**p.** "without Testcontainers Desktop, sometimes some manual configuration might be necessary"

 
## Colima
---
**p.** "In order to run testcontainers against colima the env vars below should be set"



> [!QUOTE] Example
> ```bash
> $ colima start --network-address
> $ export TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE=/var/run/docker.sock
> $ export TESTCONTAINERS_HOST_OVERRIDE=$(colima ls -j | jq -r '.address')
> $ export DOCKER_HOST="unix://${HOME}/.colima/default/docker.sock"
> ```


