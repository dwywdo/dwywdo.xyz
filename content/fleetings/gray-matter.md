---
title: gray-matter
description: A library that's used to parse front-matter from a specific file (Especially a markdown file)
draft: false
tags:
  - tech
aliases:
permalink:
date: 2025-10-08
---
[gray-matter](https://www.npmjs.com/package/gray-matter) is a library that support parsing front-matter from a string or file. This is useful when you handle `.md` file for some reasons. By default it parses YAML-formatted-frontmatter, but it can be used for JSON, TOML as well.

In Obsidian, you can parse frontmatter from a specific note, using `gray-matter` like

```typescript
import { App, TFile } from 'obsidian';

const matter = require("gray-matter")

export class Example {
	private app: App;
	
	constructor(app: App) { 
		this.app = app; 
	}
	
	async parseFrontmatter(filePath: string): FrontmatterProperty[] {
		const targetTFile = this.app.vault.getAbsoluteFileByPath(filePath);
		const content = await app.vault.read(targetTFile);
		const parsedContent = matter(content);
		const properties: FrontmatterProperties[] = [];
		
		for (const [key, value] of Object.entries(parsedContent.data)) {
			properties.push({
				key: key,
				defaultValue: String(value),
				enable: true
			})
		}
		
		return properties;
	}
}

export interface FrontmatterProperty {
	key: string,
	defaultValue: string,
	enabled: boolean
}
```


---
> [!QUOTE] Note
> I'm developing a basic plugin for mass-creation of daily-notes with keeping a specific properties (from frontmatter).
> While I'm searching for a way to handle this (cuz native support from Obsidian about parsing frontmatter wasn't enough...), I found this and pretty useful and simple to use.

> [!EXAMPLE] References
> - [gray-matter](https://www.npmjs.com/package/gray-matter)
> - [Parsing and Removing Frontmatter in Obsidian Plugins](https://www.bramadams.dev/202303061543/)
