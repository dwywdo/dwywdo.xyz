---
title: "You Cannot Have Exactly-Once Delivery"
description: 
draft: true
tags:
  - annotation
aliases: 
permalink: 
date: '2025-08-25'
---
[Source](https://bravenewgeek.com/you-cannot-have-exactly-once-delivery/) 
# You Cannot Have Exactly-Once Delivery
---
**p.** "As I’ve [described in the past](https://www.slideshare.net/slideshow/from-mainframe-to-microservice-an-introduction-to-distributed-systems-41004778/41004778#23), distributed systems are all about trade-offs."

**p.** "There are essentially three types of delivery semantics: at-most-once, at-least-once, and exactly-once."



> [!QUOTE] `at-most-once` / `at-least-once` are feasible and widely used.

**p.** "you might say at-least-once delivery is also impossible because, technically speaking, network partitions are not strictly time-bound."

**p.** "why is exactly-once delivery impossible? The answer lies in the Two Generals thought experiment or the more generalized Byzantine Generals Problem, which I’ve [looked at extensively](https://bravenewgeek.com/understanding-consensus/)."

**p.** "We must also consider the [FLP result](https://groups.csail.mit.edu/tds/papers/Lynch/jacm85.pdf), which basically says, given the possibility of a faulty process, it’s impossible for a system of processes to agree on a decision."


