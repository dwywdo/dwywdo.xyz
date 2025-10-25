---
title: Subclasses should be specializations
description:
draft: false
tags:
  - concept
aliases:
permalink:
date: 2025-10-25
---
`Subclasses should be specializations` is one of rules to find abstract classes during development, and it defines the ideal way to use inheritance.

**Specialization** is the relationship where an element of subclass can be considered as superclass's element. It means the subclass includes all behavior of superclass, OR extend them. Generally, the subclass doesn't override inherited methods. Instead, it adds a new method.

The point of this rule is...
- `Subclass` is an logical extension of `Superclass`.
- Generally rather than overriding superclass's behavior, it adds a new behavior OR only implement abstarct methods from a superclass.
- So subclass should have **a superset of the behavior** of superclass.

Example

Let's suppose that we design a logging system that processes a various types of messages. Superclass defines a general procedure (template) for message processing, and subclasses specialize the way to actually deliver the message.

```java
abstract class AbstractMessageProcessor {

	// A template method for a whole process: Logic for reuse
	public final void processMessage(String message, String recipient) {
		this.logStart(message, recipient);
		
		this.send(message, recipient);
		
		this.logEnd(recipient);
	}
	
	// Common behavior logics for reuse
	private void logStart(String message, String recipient) {
		// ...
	}
	
	// Common behavior logics for reuse
	private void logEnd(String message, String recipient) {
		// ...
	}
	
	// Abstract method: A 'blank' that subclasses need to define.
	// By implementing this, it concretize this abstract class.
	protected abstract void send(String message, String recipient);
}
```

Subclass can specialize this abstract class by overriding `send()`.

```java
class EmailProcessor extends AbstractMessageProcessor {
	@Override
	protected void send(String message, String recipient) {
		System.out.println("[Specialized SEND for EMAIL]: Sending message to recipient");
	}
	
	public void configureEmailServer() {
		System.out.println("Added new behavior: Configuration of E-mail Server");
	}
}
```

You might extend the behavior of `send()` like limiting the length of message if it were for SMS message.

This rule has benefits such as
1. Implementation as Specialization
2. Reuse a template method (`logStart` / `logEnd`)
3. `Superset of Behavior`: All `EmailProcessor` instances can be used anywhere for `AbstractMessageProcessor`

---
> [!QUOTE] Note
> - This rule is core of designing white-box framework, because in white-box framework user needs to understand internal conventions and override (re-define) methods for specialization.
> - You might wonder `IF we override any method, it's not a superset anymore right way, is it?`
> 	- If inherited and overridden methods were `public` (which means it's a protocol). Yes. but here we focus only a protected method and it's an internal implementation. So from perspective of client, to use this `AbstractMessageProcessor`, subclass has a super set of superclass because it doesn't violates the contract. (No protocol is changed).
> 	- So the point is that it's about expose protocols, not all internal implementations and logics.


> [!EXAMPLE] References
> - [[Designing Reusable Classes#5.1 Rules for Finding Standard Protocols]]
