림
---
title: Troubleshooting - Could not connect to Ryuk at null
description:
draft: false
tags:
aliases:
permalink:
date: 2025-08-25
---
Since [Docker Desktop](https://docs.docker.com/desktop/) became paid, I've been using [Colima](https://github.com/abiosoft/colima) as its alternative. I use it mainly for integration tests because they require instances of MySQL database based on containerization.

This is usually done by [Testcontainer](https://java.testcontainers.org/)[^2], and to make it work with Colima, I had to specify following environment variables[^1], so that it can connect to Docker on my system.
- DOCKER_HOST
- TESTCONTAINERS_HOST_OVERRIDE
- TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE

However, starting a few days ago I confirmed that Testcontainers do not operate properly with Ryuk[^3]-related failures of the integration tests.

```
java.lang.IllegalStateException: Could not connect to Ryuk at null null:32768
	at org.testcontainers.utility.ResourceReaper.start(ResourceReaper.java:232)
	at org.testcontainers.DockerClientFactory.client(DockerClientFactory.java:219)
	at ...
```

Having used Colima for quite some time, I had forgotten about the above environment variable setting. 
Eventually, I checked the environment variables and found that the configuration value was wrong.

```bash
$ export | grep TESTCONTAINERS_HOST_OVERRIDE
TESTCONTAINERS_HOST_OVERRIDE=192.168.64.2\nnull
```

This value is set by below shell command, then why does it have a trailing `\nnull`...?
- `export TESTCONTAINERS_HOST_OVERRIDE=$(colima ls -j | jq -r '.address')`
	- `colima ls -j` lists up all created instances, with `JSON` format.
	- `jq` command deals with `JSON` format data, to extract a `.address` field.

To check what happens exactly, I ran `colima ls -j` first and found that it returned 2 JSON objects, second of which doesn't have `.address field`

```bash
$ colima ls -j
{"name":"default","status":"Running","arch":"aarch64","cpus":2,"memory":2147483648,"disk":107374182400,"address":"192.168.64.2","runtime":"docker"}
{"name":"m1","status":"Stopped","arch":"aarch64","cpus":4,"memory":8589934592,"disk":107374182400}
```

`jq` command applies filtering for each JSON data, and returns `null` for the second one. 

As a result, `192.168.64.2\nnull` is set as `TESTCONTAINERS_HOST_OVERRIDE` variable.

```bash
$ colima ls -j | jq -r '.address'
192.168.64.2
null
```

After I've modified `~/.zshrc` to load only the right IP address for Docker host, the issue was resolved :)

```bash
export TESTCONTAINERS_HOST_OVERRIDE=$(colima ls -j | jq -r 'select(.address != null) | .address' | head -n 1)
```

---
> [!QUOTE] Note
> During investigation I've realized that I've just copied and pasted from the official documentation, without thinking what I was exactly doing.
> `jq` command is not something that I frequently use but I learned it this time (It looks useful when dealing with JSON formatted text data)
> 
> Checking the environment variable was just a luck, and  I could find the root cause of this earlier if I checked Testcontainers source code and stack trace, because it explicitly reads the environment variable
> - `String hostOverride = System.getenv("TESTCONTAINERS_HOST_OVERRIDE");`
> 
> Instead of relying purely on luck for insights to come to mind, one must become accustomed to logically finding the cause of a problem by directly examining error messages and reviewing the internal implementation
> 
> So let's not be afraid of reading internal implementation for debugging / troubleshooting!

[^1]: [[General Container runtime requirements - Testcontainers for Java]]
[^2]: [[Testcontainers for Java]]
[^3]: https://github.com/testcontainers/moby-ryuk
