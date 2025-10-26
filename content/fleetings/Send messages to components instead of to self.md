---
title: Send messages to components instead of to self
description:
draft: false
tags:
  - concept
aliases:
permalink:
date: 2025-10-27
---
`Send messages to components instead of to self` is one of rules for finding frameworks.

It provides guidance to convert your framework to black-box one.

It says
- Send a message to its component, instead of `self`.
- By replacing overridden methods to message send to components, Inheritance-based framework can be converted to component-based black-box framework.

This way to refactor should happen frequently, to reduce coupling between framework components.

Example

Before this rule, inheritance-based framework has white-box structure. An upper class sends a message to `self` for a specific behavior, and this message executes the overridden method (We call it `Hook method`). This is very typical example of a case where subclass needs to understand the internal conventions of its superclass.

```java
abstract class DataExporter {
	// A template method: Define a whole algorithm
	public final void exportData() {
		// 1. Common logic
		System.out.println("1. Ready for search");
		
		// 2. Core logic: Send a message to self(this) to call subclass's behavior. This method should be overridden.
		formatAndOutput();
		
		// 3. Common logic
		System.out.println("3. Finish...");
	}
	
	protected abstract void formatAndOutput();
}

class PdfDataExporter extends DataExporter {
	@Override
	protected void formatAndOutput() {
		System.out.println("2. (Self Call) Export data to PDF format");
	}
}

class JsonDataExporter extends DataExporter {
	@Override
	protected void formatAndOutput() {
		System.out.println("2. (Self Call) Export data to JSON format");
	}
}
```
- The problem is...
	- `DataExporter`'s algorithm (`exportData()` and `formatAndOutput()`) is bound to class hierarchy
	- To change this behavior, we need to define a new class that inherits `DataExporter`.

After applying this rule, we replace the message to `self` with sending message to a particular component. This component is defined by interface, and original class uses composition to delegate the message.
```java
interface OutputStrategy {
	void output();
}

class PdfOutputStrategy implements OutputStrategy {
	@Override
	public void output() {
		System.out.println("2. (CALL component) Export data to PDF format");
	}
}

class JsonOutputStrategy implements OutputStrategy {
	@Override
	public void output() {
		System.out.println("2. (CALL component) Export data to JSON format");
	}
}
```

```java
class DataExporter {
	private final OutputStrategy strategy;
	
	public DataExporter(OutputStrategy strategy) {
		this.strategy = strategy;
	}
	
	public final void exportData() {
		// 1. Common logic
		System.out.println("1. Ready for search");
		
		// 2. Core logic: Send a messsage to its component now.
		formatAndOutput();
		
		// 3. Common logic
		System.out.println("3. Finish...");
	}
}
```

With this rule we could convert `inheritance-based White-box framework` to `component-based Black-box framework`. In `Black-box framework`, users don't need to know internal implementation (How upper class calls its subclass). All we need to understand is interface (protocol) itself. Also...
- Decreased coupling / Increased flexibility
- Increased cohesion / generality
- Easy to extend without hierarchy modification

---
> [!QUOTE] Note

> [!EXAMPLE] References
> - [[Designing Reusable Classes#5.3 Rules for Finding Frameworks]]
