---
title: AbstractInputSuggest in Obsidian Plugin Development
description:
draft: false
tags:
aliases:
permalink:
date: 2025-10-04
---
When you use Obsidian's plugin (Whether it's a community plugin, OR not), it's very often to set values at each plugin's `Setting` tab.

Obsidian supports many types for plugin setting management, and `Search` provides users to find what they want from a list.

If it's their first time to use your plugin, it's better to provide them available options in your `Search` setting.

To do this, you can extend [**AbstractInputSuggest**](https://docs.obsidian.md/Reference/TypeScript+API/AbstractInputSuggest) and implement
1. `protected abstract getSuggestions(query: string): T[] | Promise<T[]>;`
	- Filters and provides the data for suggestions, based on user input (`query`)
	- Triggered every time the user types in the input (`Search`) field
	- e.g. 
		- User types "Dai" → returns folders like "Daily Notes", "Daily Templates"
		- So `getSuggestions("Dai") returns [dailyNoteFolder, dailyTemplatesFolder]`
2. `abstract renderSuggestion(value: T, el: HTMLElement): void;`
	- Controls how each suggestion appear visually in the dropdown
	- Triggered for each item returned by `getSuggestions`
3. `selectSuggestion(value: T, evt: MouseEvent | KeyboardEvent): void;`
	- Handles what happens when user clicks/selects a suggestion
	- Triggered when user clicks on a suggestion or presses Enter on a highlighted one

🔄 The Complete Flow

User focuses input field → getSuggestions("") called → renderSuggestion() called for each folder → User types "Dai" → getSuggestions("Dai") called → renderSuggestion() called again → User clicks on "Daily Notes" suggestion →  selectSuggestion(dailyNotesFolder) called

---
> [!QUOTE] Note
> Blahblah...

> [!EXAMPLE] References
> - [[Obsidian Plugin Develpment - Settings#Search]]
