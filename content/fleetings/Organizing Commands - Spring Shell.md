---
title: "Organizing Commands :: Spring Shell"
description: 
draft: false
tags:
  - annotation
aliases: 
permalink: 
date: 2025-07-20
---
[Source](https://docs.spring.io/spring-shell/reference/commands/organize.html) 
# Organizing Commands
---
**p.** "Spring Shell provides the ability to group commands together, with reasonable defaults."

**p.** "By default, commands are grouped according to the class they are implemented in, turning the camelCase class name into separate words (so URLRelatedCommands becomes URL Related Commands)."

**p.** "you can override the group for a command in the following ways, in order of priority:"



> [!QUOTE] It's usually compatible with `Legacy Annotations`

**p.** "Specify a group() in the @ShellMethod annotation."

**p.** "Place a @ShellCommandGroup on the class in which the command is defined. This applies the group for all commands defined in that class (unless overridden, as explained earlier)."

**p.** "Place a @ShellCommandGroup on the package (through package-info.java) in which the command is defined. This applies to all the commands defined in the package (unless overridden at the method or class level, as explained earlier)."


