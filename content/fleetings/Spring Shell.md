---
title: Spring Shell
description: 
draft: false
tags:
  - tech
aliases: 
permalink: 
date: 2025-07-20
---
[Spring Shell](https://docs.spring.io/spring-shell/reference/index.html), as one of Spring family, is a framework that helps you to create an CLI application with its own infrastructure.

This infrastructure creates a REPL (Read, Eval, Print Loop) app where you can define and implement commands in a way that's idiomatic to Spring.

As of 3.4.0, it provides advanced features such as
- Parsing
- Tab Completion
- UI/UX on CLI (Such as colorization, ASCII-art, ...)

Let's say you want to write an interactive CLI application with Spring Shell. 
Just like other spring projects, you could easily initialize the project for Spring Shell, using [Spring Initializer](https://start.spring.io/).

You can define a class, `Commands` that holds your own commands with a `@ShellComponent` annotation.

```java
@ShellComponent  
public class Commands {  
    @ShellMethod(key = "hello-world")  
    public String helloWorld(@ShellOption(defaultValue = "Spring") String arg) {  
        return "Hello World! " + arg;  
    }  
}
```

Inside the `Commands` class, let's define a method that represents an command, with a `@ShellMethod` annotation. A value for `key` property is used as a selector for this command.

Beside built-in commands, you can see your `hello-world` command and execute it.
```bash
$ 2025-07-20T02:15:53.270+09:00  INFO 56013 --- [spring-shell-test] [           main] .n.b.a.NaverBloggingAssistantApplication : Started SpringShellTestApplication in 1.094 seconds (process running for 1.39)
shell:>help
AVAILABLE COMMANDS

Built-In Commands
       help: Display help about available commands
       stacktrace: Display the full stacktrace of the last error.
       clear: Clear the shell screen.
       quit, exit: Exit the shell.
       history: Display or save the history of previously run commands
       version: Show version info
       script: Read and execute commands from a file.

Commands
       hello-world: 

shell:>hello-world
Hello World! Spring
shell:>hello-world --arg Boot
Hello World! Boot
```

You can also provide an argument for the command with a `--arg` option (value=`Boot`)

---
> [!QUOTE]- Note
> I'm trying to write a program like a bot that automates replying, and visiting followers on a blog platform.
> Before I get caught up in frontend things, I'd like to focus on core business logic and domain models.
> Then I discovered this Spring Shell, and was very tempted to give it a try :)
---

## Refs.
- https://docs.spring.io/spring-shell/reference/index.html