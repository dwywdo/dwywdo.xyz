---
title: System Design 102 - URL Shorteners
description: 
draft: false
tags:
  - annotation
aliases: 
permalink: 
date: 2025-07-18
---
[Source](https://theawesomenayak.hashnode.dev/system-design-102-url-shorteners) 
# System Design 102 - URL Shorteners
---
 
## What is a URL Shortener?
---
**p.** "These shorter versions are particularly handy in contexts where character count matters, such as Twitter, or when you want a memorable or neat URL."

 
## Hash-Based Shortening
---
**p.** "A hash function like MD5 is used to generate a fixed-length hash of the original URL. This hash is then truncated to create a short URL."

 
## Counter-Based Encoding (Bijective)
---
**p.** "When a URL is submitted, it&#39;s stored in the database, and the unique ID from the database is converted into a unique URL-friendly string."

 
## Character and timestamp Encoding
---
**p.** "This method generates unique short URLs for each long URL, even if requested within short time intervals."


