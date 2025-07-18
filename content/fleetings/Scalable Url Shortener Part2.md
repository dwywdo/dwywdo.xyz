---
title: Scalable Url Shortener Part2
description: 
draft: false
tags:
  - annotation
aliases: 
permalink: 
date: 2025-07-18
---
[Source](https://dev.to/taman9333/scalable-url-shortener-part1-4jc2) 
#### Scalable Url Shortener Part2
---
 
##### Encoding a Long URL to a Short URL
---

###### Option 1: Hash Functions
---


> [!COMMENT]- 해당 방식의 문제점
> 1. 어떤 Hash 함수를 사용하더라도 (Base62 포함) 그 결과 값이 굉장히 길고, 사용성이 떨어짐. 그리고 이 자체로도 충돌 확률이 존재
> 2. 1번 이슈를 해소하기 위해 앞의 7~8자리를 잘라서 사용하게 되면 충돌 확률이 높아짐 (얼마나 높아지나?)

**p.** "The output length of the MD5 hash function is 128 bits, or 16 bytes....taking only the first 7 characters."

**p.** "Unfortunately, this is not a perfect solution as the MD5 algorithm might lead to collisions....The MD5 algorithm can possibly generate the same hash code for different strings (this is very rare)....you could encounter a collision where two different hash codes share the same first 7 characters that we plan to use."

**p.** "We could introduce a unique index to solve this problem....However, using a unique index has its downsides. It would place a lock on our database, which wouldn&#39;t scale well if we receive a lot of writes....if we plan to shard our database to scale writes across different regions, the unique index approach would no longer work effectively."

 
##### Option 2: Counter (Optimal Solution)
---

###### How It Works
---
**p.** "we maintain a global counter that increments with every new URL request."


###### Why It’s Optimal
---
**p.** "Uniqueness: Since the counter increases sequentially, every value is guaranteed to be unique, which eliminates the risk of collisions."



> [!COMMENT]- If we give up the uniqueness, we need to introduce logic to avoid collision such as regeneration of key (a hashed value)

**p.** "Short Length: With Base62 encoding, we can generate short strings that are much smaller than the original counter value, making the URLs compact and easy to share."

**p.** "Scalability: The counter-based approach is scalable and performs well, even with large numbers of URLs, since it&#39;s a simple increment and encoding operation."

**p.** "No Need for a Unique Index: Unlike the hash-based approach, we don’t need to rely on a unique index in the database, as the counter ensures uniqueness on its own."

 
##### The Problem with Counters in Scalable Applications
---
**p.** "If the counter logic is handled by one instance, that instance becomes a single point of failure....Even if each instance manages its own counter, there’s still a challenge."

**p.** "we need a global counter service responsible for managing the counter in a distributed and scalable manner."


###### What is etcd?
---
**p.** "etcd is a distributed, reliable key-value store used for coordinating configuration data across multiple servers or machines."


###### Why Use a 3-Node etcd Cluster?
---
**p.** "we deploy a 3-node etcd cluster to ensure high availability and fault tolerance. With this setup, even if one node goes down, the other nodes will continue to manage the distributed counter, ensuring that the service remains functional....they work together using the Raft consensus algorithm to ensure consistency across all nodes."


###### How etcd Coordinates Between Machines
---
**p.** "Tracking Active Machines: etcd maintains a list of machines (or instances) that are currently active."

**p.** "Assigning Counter Ranges: etcd keeps track of the last counter that was used across all instances."

**p.** "Handling Counter Exhaustion: If an instance exhausts its current counter range, it communicates with etcd again to request the next available counter range."


###### Example: Using a Counter with Base62
---

###### Getting the Next Counter via CounterService
---
**p.** "Counter Initialization at Boot-Up: The counter range is initialized once during the server boot-up in config.ru."

**p.** "Thread Safety with Mutex: To handle concurrent requests, get_next_counter uses a mutex to ensure that only one thread can modify the counter at a time."

**p.** "Counter Range Exhaustion: Once the current counter reaches the end of the allocated range, CounterService will request a new counter range by calling get_counter_range."


