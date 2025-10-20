---
title: Recursion Introduction
description:
draft: false
tags:
  - concept
aliases:
permalink:
date: 2025-10-20
---
`Recursion Introduction` is a first rule to find standard protocols for reusable object-oriented softwares.

This rule focuses on coherency and shared vocabulary when representing interfaces and messages (operations).

For example, in Java, interfaces and operations' name should be same, even when their signature is different due to passed parameters.

```
A#send(arg1, arg2) {
	a#send(arg1, arg2) // Object is in the same class > Recursive
	
	arg3 = ...
	B#send(arg1, arg2, arg3); // Differerent class, but still considered to be recursion introduction
	
	arg4 = ...
	C#send(arg1, arg2, arg4); // Differerent class, but still considered to be recursion introduction
}
```

This rule doesn't force A and B/C to be in the same class (Being recursive it not mandatory)
- The point is that, by using same keywords and name for methods, shared vocabulary for same functionality (protocol) is created.
- Without this rule we'll have too many, but similar names for methods, just like in Pascal's `MatrixPlus`, `ComplexPlus`, `PolynomialPlus`, ...


Example
```java 
public interface Command {  
    void execute();  
}
```

```java
public class CompositeCommand implements Command {  
    private final List<Command> components = new ArrayList<>();  
  
    public void addCommand(Command command) {  
        components.add(command);  
    }  
  
    @Override  
    public void execute() {  
        for (Command command : components) {  
            command.execute();  
        }  
    }  
}
```

```java
public class SaveCommand implements Command {  
    @Override  
    public void execute() {  
        System.out.println("Save");  
    }  
}
```
- We use `execute` (Same keyword as name) for recursion introduction.
- Since `SaveCommand` and `CompositeCommand` are both in `Command`, this is actual recursive introduction.


---
> [!QUOTE] Note
> This was tricky because `recurisve` sounds like we should utilize the recursion to develop in object-oriented way, but it's not what he meant by this paper.

> [!EXAMPLE] References
> - [[Designing Reusable Classes#5.1 Rules for Finding Standard Protocols]]
