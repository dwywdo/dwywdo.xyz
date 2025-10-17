---
title: Obsidian Plugin Develpment - Settings
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-10-17
---
[Source](https://docs.obsidian.md/Plugins/User+interface/Settings) 
# Settings
---

<font color="#49BEFC"><strong>p.</strong> "The main reason to add settings to a plugin is to store configuration that persists &lt;b&gt;even after the user quits Obsidian.&lt;/b&gt;"</font>


**p.** "Object.assign() copies the references to any nested property (shallow copy). If your settings object contains nested properties, you need to copy each nested property recursively (deep copy). Otherwise, any changes to a nested property will apply to all objects that were copied using Object.assign()."

 
## Create a settings definition
---

**p.** "you need to define, which settings you want the user to be able to configure."


**p.** "While the plugin is enabled, you can access its settings from the settings member variable"



> [!QUOTE] The name of member variable, `settings`, is not fixed and you could use another name. We'll load this variable with the actual `ExamplePluginSettings` object, using `loadData()` provided by Obsidian API

 
## Save and load the settings object
---

**p.** "loadData() and saveData() provide an easy way to store and retrieve data from disk."


**p.** "`this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());`"

 
## Provide default values
---

**p.** "Object.assign() is a JavaScript function that copies all properties from one object to another. Any properties that are returned by loadData() override the properties in DEFAULT_SETTINGS"


<font color="#49BEFC"><strong>p.</strong> "Partial&lt;Type&gt; is a TypeScript utility that returns a type with all properties of Type set to optional."</font>



> [!QUOTE] With `Settings = {a: string, b: string}`, `Partial<Settings>` becomes `{ a?: string; b?: number; }`

 
## Register a settings tab
---

**p.** "By adding a settings tab you can provide an easy-to-use interface for the user to update their plugin settings:"



> [!QUOTE] `this.addSettingTab(new ExampleSettingTab(this.app, this));`


<font color="#49BEFC"><strong>p.</strong> "display() is where you build the content for the settings tab."</font>


**p.** "new Setting(containerEl) appends a setting to the container element."


**p.** "Update the settings object whenever the value of the text field changes, and then save it to disk:"



> [!QUOTE] .onChange(async (value) => { this.plugin.settings.sampleValue = value; await this.plugin.saveSettings(); })

 
## Available settings types
---

### Headings
---

### Text
---

### Textarea
---

### Search
---

<font color="#49BEFC"><strong>p.</strong> "To provide users with a searchable list of available items you can implement the [AbstractInputSuggest](https://docs.obsidian.md/Reference/TypeScript+API/AbstractInputSuggest) class and hook it up to a search. (but it also works with regular text inputs)"</font>


### Moment format
---

**p.** "Obsidian uses the moment.js library for formatting dates."


### Buttons
---

### Extra button
---

### Toggle
---

### Dropdown
---

### Slider
---

### Progress bar
---

**p.** "While a slider allows for numeric input, a progress bar can show the progress of a task running in the background, but it can also be used to show a quota, for example the disk space used."


### Color picker
---

