---
title: Reduce the size of methods
description:
draft: false
tags:
  - concept
aliases:
permalink:
date: 2025-10-24
---
`Reduce the size of methods` is one of rules to find standard protocols. 

This rule aims to minimize the size of methods, to maximize the benefits of `Subclassing`.

Well-defined methods are usually small, and generally, methods bigger than 30 lines needs to be broken into pieces. 

The smaller the method is, the easier to subclass, because it becomes enough to re-define a few small methods. Also we don't need to write a whole big method for subclassing.

When subclassing, it's more likely that methods in an upper class is splited.
- When most of a inherited method is correct but needs to change only part of it, instead of re-writing a whole method,
	- Split the method into pieces, and re-define only necessary piece.
	- This change makes the upper class itself easy to subclass.

```java
public class DocumentProcessor {    
    // Let's say this is a very big (>= 30 lines) method.
    public void processDocument(String documentPath) {
        System.out.println("1. Loading... " + documentPath);
        // ... (Complicated loading logic)
        System.out.println("2. Processing...");
        // ... (Logic to handle given document)
        System.out.println("3. Saving result...");
	    // ... (Complicated saving logic)
    }
}
```

What if a subclass `EncryptedDocumentProcessor` wants to add encryption feature in `Processing`(2), while keeping logic for (1) and (3)?
- With above we need to re-define the `processDocument` method itself.

If we apply `Reduce the size of methods` rule,

```java
public class DocumentProcessor {
	// (Template Method) - Doesn't need to be inherited.
	public final void processDocument(String documentPath) {
		this.loadDocument(documentPath);
		this.processData(); // Subclass wants to modify this!
		this.saveResult();
	}
	// Helper method 1: Keep
	protected void loadDocument(String documentPath) {
		System.out.println("1. Loading... " + documentPath);
	}
	// Helper method 2: Intended to be inherited and overriden by a subclass.
	protected void processData() {
		System.out.println("2. Processing...");
	}
	// Helpmer method 3: Keep
	protected void saveResult() {
		System.out.println("3. Saving result...");
	}
}
```

```java
public class EncryptedDocumentProcessor extends DocumentProcessor {
    @Override
    protected void processData() {
        // Reuse upper class's logic OR replace it
        super.processData(); // Can be optional.
        System.out.println("2. Encrypting...");
    }
}
```

This has benefits such as
- Easy subclassing: A subclass can only change the necessary part for customization
- Enhanced Reusability: Because we could use same code for `loadDocument` and `saveResult`.
- Better Maintainability: Even if `loadDocument` sand `saveResult` is modified, `EncryptionDocumentProcessor` only focuses on `processData` so it won't be affected. (Affected scope is restricted, which makes the upper class to subclass -> **It becomes standard protocol, consequently.**)

---
> [!QUOTE] Note

> [!EXAMPLE] References
> - [[Designing Reusable Classes#5.1 Rules for Finding Standard Protocols]]
