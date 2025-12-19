---
title: You Want Microservices—But Do You Need Them? | Docker
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-12-12
---
[Source](https://www.docker.com/blog/do-you-really-need-microservices/) 
# You Want Microservices, But Do You Really Need Them?
---
 
## Microservices: The Agility-Complexity Trade-Off
---

<font color="#EF7DFA"><strong>p.</strong> "But the catch is that every split creates a seam, and every seam is a potential failure point. Inside a monolith, function calls are instant and predictable."</font>


<font color="#5EA33E"><strong>p.</strong> "Microservices make sense in very specific scenarios where distinct business capabilities need independent scaling and deployment."</font>


**p.** "For example, payment processing (security-critical, rarely updated) differs fundamentally from recommendation engine (memory-intensive, constantly A/B tested). &lt;b&gt;These components have different scaling patterns, deployment cycles, and risk profiles, which justify separate services.&lt;/b&gt;"

 
## The Great Microservices Reversal
---

### Amazon Prime Video: 90% Cost Reduction with a Monolith
---

<font color="#EF7DFA"><strong>p.</strong> "Their “infinitely scalable” system crumbled at just 5% of expected load due to orchestration overhead."</font>


<font color="#5EA33E"><strong>p.</strong> "The fix was embarrassingly simple: collapse everything into a single process. It resulted in 90% lower costs and faster performance."</font>


### Twilio Segment: From 140 Services to One Fast Monolith
---

<font color="#EF7DFA"><strong>p.</strong> "Their system had sprawled into 140+ services, creating operational chaos."</font>


<font color="#5EA33E"><strong>p.</strong> "Their solution was radical but effective: collapse all 140+ services into a single monolith. The impact was immediate."</font>


**p.** "Test suites that once took an hour now finished in milliseconds. Developer productivity soared: they shipped 46 improvements to shared libraries in a year, up from 32 in the microservices era."


### Shopify: Sanity over Hype
---

<font color="#5EA33E"><strong>p.</strong> "Instead of chasing microservices, they deliberately chose a modular monolith: a single codebase with clear component boundaries."</font>

 
## Expert Voices against Microservices Mania
---


> [!QUOTE] If even the pioneers of microservices are retreating, why are we still treating it as gospel?


### Rails Creator: Simplicity over Sophistication
---

**p.** "“The real-world results of all this theory are finally in, and it’s clear that in practice, microservices pose perhaps the biggest siren song for needlessly complicating your system.”"


### Microservices: Mistake of The Decade?
---

<font color="#5EA33E"><strong>p.</strong> "“90% of all companies in the world could probably just be a monolith running against a primary db cluster with db backups, some caches and proxies and be done with it.”"</font>

 
## The Hidden Costs of Microservices
---

### Operational Costs
---

<font color="#5EA33E"><strong>p.</strong> "A monolith is simple: in-process function calls."</font>


<font color="#EF7DFA"><strong>p.</strong> "Microservices replace that with networks."</font>


**p.** "through load balancers, service meshes, and authentication layers, creating more failure points and infrastructure needs."


**p.** "You suddenly need service discovery (how services find each other), distributed tracing (tracking requests across services), centralized logging (aggregating logs from multiple services), and monitoring systems that understand service topology."


<font color="#EF7DFA"><strong>p.</strong> "Duplicated data requires extra storage. Constant service-to-service calls rack up network egress fees."</font>


### Developer Productivity Drain
---

<font color="#5EA33E"><strong>p.</strong> "In microservices, the hard part isn’t writing code; it’s navigating distributed system interactions."</font>


**p.** "Stack Overflow identifies a critical productivity drain: distributed state forces developers to write defensive code that constantly checks for partial failures."


<font color="#EF7DFA"><strong>p.</strong> "one feature might span four or five repos with different dependencies and deploy cycles."</font>


<font color="#EF7DFA"><strong>p.</strong> "Different teams will also typically maintain different microservices using different tech stacks, so there’s a risk that they unintentionally break something as well. Breaking changes that a compiler would catch in a monolith now surface as runtime errors in production."</font>


### Testing and Deployment Complexity
---

<font color="#5EA33E"><strong>p.</strong> "Monolith integration and end-to-end tests are faster because they run locally, in memory."</font>


<font color="#EF7DFA"><strong>p.</strong> "Deployment orchestration adds another layer. Rolling updates across interdependent services require careful sequencing to avoid breaking contracts."</font>


**p.** "Version incompatibility disturbs frequently: Service A works with Service B v2.1 but breaks with v2.2."


### Data Management and Consistency
---

<font color="#5EA33E"><strong>p.</strong> "Monoliths benefit from ACID transactions: operations complete entirely or fail entirely."</font>


### The Compounding Effect
---

<font color="#5EA33E"><strong>p.</strong> "Operational overhead makes debugging harder, which slows testing, which makes deployments riskier, which creates more incidents. Microservices don’t just shift complexity from code to operations; they tax every part of your engineering process."</font>



> [!QUOTE] Operational Overhead -> Hard Debugging -> Slow Testing -> Deployment Risk -> More Incidents...

 
## Beyond Microservices: Smarter Architectural Alternatives
---

### Modular Monoliths: Structure without Distribution
---

<font color="#5EA33E"><strong>p.</strong> "As Kent Beck explains in “[Monolith -&gt; Services: Theory &amp; Practice](https://medium.com/%40kentbeck_7670/monolith-services-theory-practice-617e4546a879)”, modular monoliths manage coupling through organizational discipline rather than distributed networks."</font>


### Service-Oriented Architecture: The Middle Ground
---

<font color="#5EA33E"><strong>p.</strong> "[Service-oriented architecture (SOA)](https://www.geeksforgeeks.org/software-engineering/service-oriented-architecture/) sits between monoliths and microservices, favoring larger, domain-driven services instead of dozens or hundreds of tiny ones."</font>


**p.** "Instead of splitting authentication, user preferences, and notifications into separate microservices, SOA might combine them into a single “User Service”, simplifying coordination while preserving autonomy and targeted scaling."

 
## Choosing Wisely: Fit over Hype
---

<font color="#EF7DFA"><strong>p.</strong> "In all likelihood, you’re not Google (you don’t need Google-level fault tolerance), or Amazon (you don’t need massive write availability), or LinkedIn (you don’t handle billions of events a day). Most applications don’t operate at that scale, demanding fundamentally different solutions than ultra-distributed architectures."</font>

 
## Docker: Built for Any Architecture
---

<font color="#5EA33E"><strong>p.</strong> "Docker isn’t just for microservices—it works great across all kinds of architectures like monoliths, SOA, APIs, and event-driven systems. The real benefit is that Docker gives you consistent performance, easier deployment, and flexibility to scale up your apps no matter what architectural approach you’re using."</font>

 
## Wrapping Up
---

<font color="#5EA33E"><strong>p.</strong> "Will you design for cloud-native hype or for your own business requirements?"</font>


