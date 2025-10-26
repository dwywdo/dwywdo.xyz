---
title: The top of the class hierarchy should be abstract
description:
draft: false
tags:
  - concept
aliases:
permalink:
date: 2025-10-25
---
`The top of the class hierarchy should be abstract` is the second rule to find abstract classes.

This rule emphasizes that when inheritance is used for generalization / code sharing, it implies that we need to a new abstract superclass.

More specifically, if class `B` need to override a method `x`, inherited from **a concrete class `A`**, there may be other inherited methods as well. In this case, it might be better those rest methods to a new abstract class, `C`, and `C` is more likely to be an abstract class.

As a result, `B` can be a subclass of `C`, hence `B` doesn't need to override any methods. Also, instances variables OR methods that was declared in `A`, used by `B`, should be moved to `C`.

Example
- There was a class named `AssetReportA`, and it's a concrete class. Later `AssetReportB` is developed, and it shares a lot of methods from `AssetReportA` by inheritance.
- But `AssetReportB` still need to implement a core method `generate()` from `AssetReportA` in its own way.
```java
public class AssetReportA {
	// Lots of shared methods (ex. loadDate(), formatHeader(), ...)
	public void formatHeader() {
		System.out.println("Report A Header Formatting");
	}
	
	public void generate() {
		System.out.println("Report A Generating Content");
	}
	
	// There may be instance variables in AssetReportA
}

public class AssetReportB extends AssetReportA {
	@Override
	public void generate() {
		System.out.println("Report B Generating Content");
	}
}
```
- The problem is...
	- `AssetReportB` needs to re-define `generate()`, `AssetReportA` doesn't provide a complete generalization to `AssetReportB`.
	- Also, if `AssetReportA` is concrete, dependency to data presentation is delivered to `AssetReportB`, too.

So we could introduce a new abstract superclass, `C`. It includes common methods and let `generate()` be abstract.

```java
public abstract class AbstractAssetReport {
	public void formatHeader() {
		System.out.println("-> [Abstract] Report Header Formatting");
	}
	
	// A and B needs to implement this in their own way, so it should be abstract.
	public abstract void generate();
	
	// A template method to decide run order of shared + non-shared methods.
	public final void runReport() {
		this.formatHeader();
		this.generate();
	}
}
```

Now `A(AssetReportA)` and `B(AssetReportB)` inherits `C(AbstractAssetReport)`, and they both don't need to re-define `formatHeader()`.

```java
public class AssetReportA extends AbstractAssetReport {
    @Override
    public void generate() {
        System.out.println("Report A Generating Content");
    }
}

// Same for AssetReportB
```

This has benefits such as...
- `AssetReportB` doesn't need to override methods, which is inappropriately inherited. `B` now fully accepts `C`'s protocol, only implementing a necessary part (`generate`)
- This provides foundation for other future report types (e.g. `AssetReportC`, ...)

Basically this is a way to find a good abstraction hidden among concrete classes, hence cleaning up a design itself.

---
> [!QUOTE] Note
> Notice that this rule is for the case where we inherits a `CONCRETE` class for generalization, OR code sharing. It's not always applicable.

> [!EXAMPLE] References
> - [[Designing Reusable Classes#5.2 Rules for Finding Abstract Classes]]
