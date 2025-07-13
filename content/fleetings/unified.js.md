---
title: unified.js
description: 
draft: false
tags:
  - tech
aliases: 
permalink: 
date: 2025-07-14
---
`unified.js` is a Javascript's plugin-based parsing framework that enables processing a various types of text (Markdown, HTML, etc.) using [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree).

It provides a flexible way using plugins, to connect each steps for handling texts.
- Parsing
- Transformation
- Conversion (From/To Text)

---
> [!QUOTE]- Note
> I came across a talk about Quartz 4 by its developer Jacky, hosted by Brandon Boswell. As a major difference between Quartz 4 and it's predecessors, `unfied.js` was introduced.
> - https://www.youtube.com/watch?v=v5LGaczJaf0
> 
> Recently I had a discussion with a teammate to discuss the way to parse and inspect the content of [Confluence Wiki](https://www.atlassian.com/software/confluence) (It provides the HTML of a page via API) for a simple automation tool. Although we use python for our main scripting language, I think it's worth trying Javascript and this framework (I didn't even try tutorial yet, though 😅)
---
## Refs.
- https://github.com/unifiedjs/unified
- https://unifiedjs.com/