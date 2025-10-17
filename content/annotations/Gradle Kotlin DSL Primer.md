---
title: Gradle Kotlin DSL Primer
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-10-17
---
[Source](https://docs.gradle.org/current/userguide/kotlin_dsl.html) 
# Gradle Kotlin DSL Primer
---

<font color="#5EA33E"><strong>p.</strong> "Gradle’s Kotlin DSL offers an alternative to the traditional Groovy DSL, delivering an enhanced editing experience in supported IDEs with features like better content assist, refactoring, and documentation."</font>

## Prerequisites
---

<font color="#49BEFC"><strong>p.</strong> "Using the plugins {} block to declare Gradle plugins is highly recommended as it significantly improves the editing experience."</font>


## IDE support
---

**p.** "The Kotlin DSL is fully supported by IntelliJ IDEA and Android Studio."


<font color="#49BEFC"><strong>p.</strong> "you must [import your project using the Gradle model](https://www.jetbrains.com/help/idea/gradle.html#gradle_import) to enable content assist and refactoring tools for Kotlin DSL scripts in IntelliJ IDEA."</font>


### Automatic build import vs. automatic reloading of script dependencies
---

**p.** "We recommend disabling automatic build import while enabling automatic reloading of script dependencies."

 
## Kotlin DSL scripts
---

**p.** "Use the [Kotlin DSL reference](https://docs.gradle.org/current/kotlin-dsl/) search to explore available members."


**p.** "To activate the Kotlin DSL, use the .gradle.kts extension for your build scripts instead of .gradle. This also applies to the [settings file](https://docs.gradle.org/current/userguide/settings_file_basics.html#sec:settings_file_script) (e.g., settings.gradle.kts) and [initialization scripts](https://docs.gradle.org/current/userguide/init_scripts.html#init_scripts)."


<font color="#49BEFC"><strong>p.</strong> "You can mix Groovy DSL and Kotlin DSL scripts within the same build."</font>


**p.** "Name settings scripts (or any script backed by a Gradle Settings object) using the pattern *.settings.gradle.kts. This includes script plugins applied from settings scripts."


**p.** "Name [initialization scripts](https://docs.gradle.org/current/userguide/init_scripts.html#init_scripts) using the pattern *.init.gradle.kts or simply init.gradle.kts."


**p.** "This helps the IDE identify the object &quot;backing&quot; the script, whether it’s [Project](https://docs.gradle.org/current/dsl/org.gradle.api.Project.html), [Settings](https://docs.gradle.org/current/dsl/org.gradle.api.initialization.Settings.html), or [Gradle](https://docs.gradle.org/current/dsl/org.gradle.api.invocation.Gradle.html)."


### Implicit imports
---

**p.** "The default Gradle API imports"


**p.** "The Kotlin DSL API, which includes types from the following packages:"


### Avoid Using Internal Kotlin DSL APIs
---

**p.** "Using internal Kotlin DSL APIs in plugins and build scripts can break builds when either Gradle or plugins are updated."


**p.** "The [Kotlin DSL API](https://docs.gradle.org/current/kotlin-dsl/) extends the public Gradle API with types listed in the corresponding API docs found in the packages above (but not in their subpackages)."


### Compilation warnings
---

**p.** "Gradle Kotlin DSL scripts are compiled by Gradle during the [configuration phase](https://docs.gradle.org/current/userguide/build_lifecycle_intermediate.html#build_lifecycle) of your build."


**p.** "It is possible to configure your build to fail on any warning emitted during script compilation by setting the org.gradle.kotlin.dsl.allWarningsAsErrors Gradle property to true"



> [!QUOTE] `org.gradle.kotlin.dsl.allWarningsAsErrors=true` in `gradle.properties

 
## Type-safe model accessors
---

**p.** "Groovy DSL allows you to reference many build model elements by name, even if they are defined at runtime, such as named configurations or source sets.

For example, when the `Java` plugin is applied, you can access the `implementation` configuration via `configurations.implementation`."


**p.** "Kotlin DSL replaces this dynamic resolution with type-safe model accessors, which work with model elements contributed by plugins."


### Understanding when type-safe model accessors are available
---

**p.** "Dependency and artifact configurations"



> [!QUOTE] `implementation` and `runtimeOnly` (contributed by the `Java` Plugin)


**p.** "Project extensions and conventions, and extensions on them"



> [!QUOTE] `sourceSets`


**p.** "Extensions on the dependencies and repositories containers, and extensions on them"



> [!QUOTE] `testImplementation` (contributed by the `Java` Plugin), `mavenCentral`


**p.** "Elements in the tasks and configurations containers"



> [!QUOTE] `compileJava` (contributed by the `Java` Plugin), `test`


**p.** "Elements in project-extension containers"



> [!QUOTE] Source sets contributed by the `Java` Plugin that are added to the `sourceSets` container: `sourceSets.main.java { setSrcDirs(listOf("src/main/java")) }`


**p.** "Project extensions and conventions, contributed by `Settings` plugins, and extensions on them"



> [!QUOTE] `pluginManagement`, `dependencyResolutionManagement`


**p.** "The set of type-safe model accessors available is determined right before evaluating the script body, immediately after the plugins {} block."



> [!QUOTE] So adding `plugins { }` block makes possible for IntelliJ to support type-safe model accessors.

If you declare custom configuration such as `configuration.create("customConfiguration"), you can't declare dependency as `customConfiguration("com.google.guava..."). It will create ERROR because there's no type-safe accessor for `customConfiguration`


**p.** "However, this means you can use type-safe accessors for any model elements contributed by plugins that are applied by parent projects."


