---
title: Scalable Url Shortener Part1
description: 
draft: false
tags:
  - annotation
aliases: 
permalink: 
date: 2025-07-18
---
[Source](https://dev.to/taman9333/scalable-url-shortener-part1-5f5n) 
#### Scalable Url Shortener Part1
---
 
##### Database Choice
---
**p.** "due to the high volume of read-heavy traffic, our storage solution must be horizontally scalable to handle the load efficiently and maintain low-latency responses as the service grows."

**p.** "employing multiple read replicas, which is essential for scaling, introduces potential concurrency issues. Specifically, we must ensure that once a short URL code is generated, it is not duplicated by another request before the write operation has been propagated to all replicas. Addressing this challenge is critical to maintaining the uniqueness and integrity of our shortened URLs across a distributed system."


