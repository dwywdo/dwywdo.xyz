---
title: Visual VM
description:
draft: false
tags:
  - tech
aliases:
permalink:
date: 2026-01-01
---
[Visual VM](https://visualvm.github.io/) is a versatile tool that helps troubleshooting Java, by visualizing what's going on inside JVM such as
- Resource Usages (CPU, Memory)
	- Thread-related Issues (from missing, or misimplemented synchronization)
	- Memory Leak (from leaving unnecessary reference to objects that are not used anymore)
- Code Execution Path (Which code is being executed?) with **Sampling**.
- The resource usages of a specific portion of Java code (Like spent time)

It's considered as one of most popular Java profiler, and it's free :)

IF you're trying to do some profiling on Java application on your local system, you can just check local Java process. However, if you want to check remote Java process, JMX Port should be activated
- e.g. `-Dcom.sun.management.jmxremote.port=9999`

There are many plugins to augment the functionality of Visual VM, and one of them is `VisualVM-MBeans`. It helps you to check registered MBeans at [[Interface MBeanServer|MBean Server]]. If you install the plugin, you can see a new tab `MBeans`

![[Screenshot 2026-01-01 at 10.40.19 PM.png|500]]


---
> [!QUOTE] Background
> Had not much experience with troubleshooting tools, especially for Java profilers because we had a dedicated team for investigations.
> These days I'm reading a book (Troubleshooting Java) and learning how to use Java profiler to understand what's actually happening on your system.

> [!EXAMPLE] References
> - https://github.com/dwywdo/TIL/commit/a47397681fc164764d177ffbf8ef8adb8b913d12
