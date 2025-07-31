---
title: "Annotation :: Spring Shell"
description: 
draft: false
tags:
  - annotation
aliases: 
permalink: 
date: 2025-07-20
---
[Source](https://docs.spring.io/spring-shell/reference/commands/registration/annotation.html) 
# Annotation
---
**p.** "@Command annotation when used on a method marks it as a candidate for command registration"

**p.** "@Command annotation can be placed on a class which either defines defaults or shared settings for @Command methods defined in a same class."

**p.** "Using a @Command will not automatically register command targets, instead it is required to use @EnableCommand and/or @CommandScan annotations."



> [!QUOTE] Where should we put `@EnableCommand` or `@CommandScan` annotations?
> - Both can be located at `@Configuration` class, and mostly at `@SpringBootApplication`.
> - `@EnableCommand` is used with a specified class that's annotated with `@Command`.
> - `@CommandScan` is used with a `basePackages` / `basePackageClasses`, and `value` so it's useful for managing many commands.

**p.** "You can define target classes using @EnableCommand. It will get picked from all Configuration classes."



> [!QUOTE] If you specify the A.class in `@EnableCommand` , It finds the class A's bean with `@Command` annotation from all `@Configuration` classes.

**p.** "Define @CommandScan in Spring Boot App class on a top level and it will automatically scan all command targets from all packages and classes under App."


