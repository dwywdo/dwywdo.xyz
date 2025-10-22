---
title: Eliminating Case Analysis
description:
draft: false
tags:
aliases:
permalink:
date: 2025-10-23
---
`Eliminate Case Analysis` is a second rule to find standard protocols for reusable object-oriented softwares.

This rule focuses on utilizing polymorphism as much as possible to improve code's maintainability.

It tries to remove code like... 

```java
if (object instanceof A) {
	A.method();
}
else if (object instanceof B) {
	B.method();
}
```

How? By replacing type check with sending messages (Calling methods) to the target object, and actual type is evaluated there, by dynamic dispatch.

Example
```java
public interface ReportObject {
	// Nothing in common interface
}

public class TextReport implements ReportObject {
	public void renderTextContent() {
		System.out.println("Text Rendering");
	}
}

public class GraphReport implements ReportObject {
	public void renderGraphicalContent() {
		System.out.println("Graph Rendering");
	}
}

public class Renderer {
	public void render(RenderObject report) {
		if (report instanceof TextReport) {
			((TextReport) report).renderTextContent();
		} else if (report instanceof GraphReport) {
			((GraphReport) report).renderGraphicalContent();
		} else {
			System.out.println("Unknown Report Type");
		}
	}
}
```
- If a new report type (e.g. `TableReport`) is added, `Renderer` class's `render` method MUST be modified. (No Good)

To tackle this issue,
1. Introduce standard protocol
```java
public interface ReportObject {
	void render();
}
```
2. Each report classes implement `render()`
```java
public class TextReport implements ReportObject {
    @Override
    public void render() {
		System.out.println("Text Rendering");
    }
}

public class GraphReport implements ReportObject {
    @Override
    public void render() {
		System.out.println("Graph Rendering");
    }
}
```
3. `Renderer` class now doesn't need to check type. It send message to the object instead.
```java
public class Renderer {
    public void render(ReportObject report) {
        report.render(); 
    }
}
```

Now it enhances maintainability of `Renderer`, because now it doesn't need to know all subtypes of `ReportObject`.
- Even with new `ReportObject` subtype, `Renderer` doesn't need to be changed. 
- `report.render()` call, in runtime, choose the method of actual class, utilizing polymorphism of OOP ([[Dynamic Dispatch]])

---
> [!QUOTE] Note
> 

> [!EXAMPLE] References
> - [[Designing Reusable Classes#5.1 Rules for Finding Standard Protocols]]
> - [[토비의 봄 TV 1회 - 재사용성과 다이나믹 디스패치, 더블 디스패치]]
