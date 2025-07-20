---
title: "Programmatic :: Spring Shell"
description: 
draft: false
tags:
  - annotation
aliases: 
permalink: 
date: 2025-07-20
---
[Source](https://docs.spring.io/spring-shell/reference/commands/registration/programmatic.html) 
#### Programmatic
---
**p.** "In the programmatic model, `CommandRegistration` can be defined as a @Bean and it will be automatically registered."

**p.** "If all your commands have something in common, an instance of a CommandRegistration.BuilderSupplier is created which can be autowired."



> [!COMMENT]- What does it mean by `Having something in common among all my commands?`
> - It means an instance of `CommandRegistration.BuilderSupplier` interface (It's a functional interface, though.) is provided by default when you use `spring-shell-boot-starter`. You can autowire this default builder and define your commands as beans.
> - This autoconfiguration is in `spring-shell-autoconfigure`'s `CommandCatalogAutoConfiguration.java`
> - If you define your own `CommandRegistration.BuilderSupplier` bean, the auto-configured supplier is ignored so you can re-define the default behavior.

**p.** "Commands registered programmatically automatically add help options mentioned in Help Options."

**p.** "CommandRegistrationCustomizer beans can be defined if you want to centrally modify builder instance given you by supplier mentioned above."



> [!COMMENT]- CommandRegistrationCustomizer
> - Defining `CommandRegistrationCustomizer` as a bean gives you an opportunity to customize the instance of `CommandRegistration.Builder`


