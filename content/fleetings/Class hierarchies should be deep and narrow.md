---
title: Class hierarchies should be deep and narrow
description:
draft: false
tags:
aliases:
permalink:
date: 2025-10-24
---
`Class hierarchies should be deep and narrow` is the first rule to find abstract classes during design and development.

This rule talks about how class hierarchy should look in object oriented softwares.
- Deepness: Well-designed class hierarchy has several layers
	- Too shallow (e.g. One super class and 30+ subclasses) hierarchy implies that something has to change.
	- This rule suggests the way how to change it, to find a new abstract class and make it re-usable.

How to find a new super class (abstract one)?
1. Find sibling classes to implement same messages, and move the method (message) to common super class.
2. It's more likely that classes provides different methods for the same messages. In this case, split methods into several pieces and re-locate them.

Example
```java
public class Components {
	public void draw() {
		// Common Logic (Draw borders)
		// Each Logic (Draw contents)
		// Common Logic (Post-Process)
	}
}

public class TextView extends Component { /* ... */ }
public class ImageView extends Component { /* ... */ }
public class ButtonView extends Component { /* ... */ }
```
- The problem is...
	- Each subclasses override `draw()` to repeat the same logic, OR it's hard to override it because `draw()` is too big.

So we need to analyze the common method, `draw()`, separate them into two parts
- Shared logic (Such as drawing borders)
- Non-shared logic (Such as drawing contents)

Let's gather all shared logic and create a new super class, `VisualComponent` between `Component` and `TextView`
```java
public abstract class VisualComponent extends Component {
	public final void draw() {
		this.drawBorder();
		this.drawSubviews();
		this.drawContents();
	}
	
	// Shared logic
	private void drawBorder() {
		System.out.println("-> [Visual Component] Drawing borders");
	}
	
	// An abstract method that all subclasses MUST implmenet (Remove dependency on data representation)
	protected abstract void drawContents();
}
```

Then all previous concrete classes inherit from `VisualComponent`, and only implement `drawContents()`.

```java
public class TextView extends VisualComponent {
	@Override
	protected void drawContents() {
		System.out.println("[TextView] Drawing contents (text))");
	}
}

public class ImageView extends VisualComponent {
	@Override
	protected void drawContents() {
		System.out.println("[ImageView] Drawing contents (image))");
	}
}
```

As a result we have
- Deeper hierarchy
	- Component -> Visual Component -> TextView/ImageView
- Enhanced reusability
	- `VisualComponent` prepare like skeleton code (`drawBorder()` and `draw()` algorithm).
- Ease subclassing
	- All concrete subclasses don't need to override `draw()`. It only needs to implement the smallest piece, `drawContents()`.

---
> [!QUOTE] Note
> Blahblah...

> [!EXAMPLE] References
> - [[Designing Reusable Classes#5.1 Rules for Finding Standard Protocols]]
> - [[Reduce the size of methods]]
