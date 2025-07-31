---
title: The Java Plugin
description: 
draft: false
tags:
  - annotation
aliases: 
permalink: 
date: 2025-07-31
---
[Source](https://docs.gradle.org/current/userguide/java_plugin.html#N11F7B) 
# The Java Plugin
---
**p.** "You can find a comprehensive introduction and overview to the Java Plugin in the [Building Java Projects](https://docs.gradle.org/current/userguide/building_java_projects.html#building_java_projects) chapter."

**p.** "Instead of applying it directly to your project, you should look into the java-library or application plugins or one of the supported alternative JVM language."



> [!QUOTE] Java plugin is a basis for other plugins such as [java-library](https://docs.gradle.org/current/userguide/java_library_plugin.html) and [application](https://docs.gradle.org/current/userguide/application_plugin.html)

 
## Tasks
---


> [!QUOTE] Tasks included in Gradle `java` plugin
> - `compileJava`
> - `processResources`
> - `classes`
> - `compileTestJava`
> - `processTestResources`
> - `testClasses`
> - `jar`
> - `javadoc`
> - `test`
> - `clean`
> - `cleanTaskName`


### SourceSet Tasks
---


> [!QUOTE] SourceSet-Specific Tasks included in Gradle `java` plugin. e.g. If the source is `test`, a task named as `compileTestJava` is configured. You already saw these tasks from above task list.
> - `compileTestJava`
> - `processTestResources`
> - `testClasses`


### Lifecycle Tasks
---


> [!QUOTE] Lifecycle tasks? The tasks defined by [Base Plugin](https://docs.gradle.org/current/userguide/base_plugin.html#sec:base_tasks)
> - `assemble`
> - `check`
> - `build`
> - `buildNeeded`
> - `buildDependents`
> - `buildConfigName`

 
## Project layout
---
**p.** "The Java plugin assumes the project layout shown below."



> [!QUOTE] You can think of `main` and `test` as sourceSet provided by default, while you can define a custom sourceSet on your own. Below is the default layout.
> - `src/main/java`
> - `src/main/resources`
> - `src/test/java`
> - `src/test/resources`
> - `src/sourceSet/java`
> - `src/sourceSet/resources`

 
## Source sets
---

### Source set properties
---


> [!QUOTE] `name`, `output`, `output.classesDirs`, `compileClasspath`, `resources`, `java.srcDirs`, etc.


### Defining new source sets
---
 
## Dependency management
---
**p.** "The Java plugin adds a number of [dependency configurations](https://docs.gradle.org/current/userguide/dependency_configurations.html#sub:what-are-dependency-configurations) to your project, as shown below. Tasks such as compileJava and test then use one or more of those configurations to get the corresponding files and use them, for example by placing them on a compilation or runtime classpath."

**p.** "For information on the default and archives configurations, please consult the [Base Plugin](https://docs.gradle.org/current/userguide/base_plugin.html#sec:base_plugin_configurations) reference documentation."

**p.** "For information on the api or compileOnlyApi configurations, please consult the [Java Library Plugin](https://docs.gradle.org/current/userguide/java_library_plugin.html#sec:java_library_separation) reference documentation and [Dependency Management for Java Projects](https://docs.gradle.org/current/userguide/dependency_management_for_java_projects.html#dependency_management_for_java_projects)."


### Dependency Declaration Configurations
---


> [!QUOTE] `implementation`, `compileOnly`, `runtimeOnly`, `testImplementation`, `annotationProcessor`, etc.


### Resolvable Configurations
---


> [!QUOTE] What does `Resolvable` mean?


