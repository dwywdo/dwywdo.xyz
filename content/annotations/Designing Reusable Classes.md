---
title: Designing Reusable Classes
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-10-18
---
[Source](https://www.cse.msu.edu/~cse870/Input/SS2002/MiniProject/Sources/DRC.pdf) 
# Designing Reusable Classes
---
 
## 1. Introduction
---

**p.** "object-oriented programming is not a panacea."


**p.** "A framework is a set of classes that embodies an abstract design for solutions to a  family of related problems, and supports reuses at a larger  granularity than classes."


**p.** "As a framework becomes more refined, it leads to &quot;black box&quot; components that can be reused without knowing their implementations."

 
## 2. Object-Oriented Programming
---

**p.** "Too much is made of the similarities of data abstraction languages andobject-oriented languages."


<font color="#5EA33E"><strong>p.2</strong> "There are two features that distinguish an object-oriented language from one based on abstract data types:polymorphism caused by late-binding of procedure calls andinheritance."</font>


### 2.1 Polymorphism
---

**p.2** "theexpression a + b will invoke different methods dependingupon the class of the object in variable a ."


**p.2** "amethod that sums the elements in an array will work correctly whenever all the elements of the array understand the addition message, no matter what classes they are in."


### 2.2 Protocol
---

<font color="#5EA33E"><strong>p.2</strong> "The specification of an object is given by its protocol, i.e. the set of messages that can be sent to it."</font>


<font color="#49BEFC"><strong>p.2</strong> "Objects with identical protocol are interchangeable."</font>


**p.2** "Thus, the interface between objects is defined by the protocols that they expect each other to understand."


**p.2** "Shared protocolscreate a shared vocabulary that programmers can reuse to ease the learning of new classes."


**p.2** "Standard protocols are given their power by polymorphism."


### 2.3 Inheritance
---

<font color="#5EA33E"><strong>p.2</strong> "Class inheritance. Each class has a superclass from which it inherits operations and internal structure."</font>


**p.2** "it promotes code reuse, since code shared by several classes can be placed in their common superclass,"


**p.2** "Class inheritance supports a style of programming called programming-by-difference,"


**p.2** "it encourages the development of the standard protocols that were earlier described as making polymorphism so useful."


**p.3** "it allows extensions to be made to a class while leaving the original code intact."


### 2.4 Abstract Classes
---

<font color="#5EA33E"><strong>p.3</strong> "Standard protocols are often represented by abstract classes `[GR83]`."</font>


**p.3** "they define methods in terms of a fewundefined methods that must be implemented by thesubclasses."


**p.3** "Thus,abstract classes can be used much like program skeletons, where the user fills in certain options and reuses the code inthe skeleton."


<font color="#49BEFC"><strong>p.3</strong> "In general, it is better to inherit from an abstract class than from a concrete class."</font>


**p.3** "Since an abstract class does not have toprovide a data representation, future subclasses can use anyrepresentation without fear of conflicting with the one thatthey inherited."


**p.3** "The top of a large class hierarchy should almost always be an abstract class, so the experienced programmer will then try to reorganize the class hierarchy and find the abstract class hidden in the concrete class. The result will be a new abstract class that can be reused many times in the future."

 
## 3. Toolkits and Frameworks
---

**p.3** "One of the most important kinds of reuse is reuse of designs."


**p.3** "The design of a program is usually described in terms of the program&#39;s components and the way they interact."


<font color="#5EA33E"><strong>p.3</strong> "An object-oriented abstract design, also called a framework, consists of an abstract class for each major component."</font>


**p.3** "The ability of frameworks to allow the extension of existing library components is one of their principal strengths."


**p.3** "A framework, on the other hand, is an abstract design for a particular kind of application, and usually consists of a number of classes."


**p.4** "Frameworks provide a way of reusing code that is resistant to more conventional reuse attempts."


**p.4** "Designing a framework requires a great deal of experience and experimentation, just like designing its component abstract classes."


### 3.1 White-box vs. Black-box Frameworks
---

**p.4** "One important characteristic of a framework is that the methods defined by the user to tailor the framework will often be called from within the framework itself, rather than from the user&#39;s application code."


<font color="#49BEFC"><strong>p.4</strong> "This inversion of control gives frameworks the power to serve as extensible skeletons."</font>


**p.4** "Each method added to a subclass must abide by the internal conventions of its superclasses."


<font color="#5EA33E"><strong>p.4</strong> "We call these white-box frameworks because their implementation must be understood to use them."</font>


**p.4** "MVC Controller class, which  maps user actions into messages to the application."


<font color="#EF7DFA"><strong>p.4</strong> "The major problem with such a framework is that every application requires the creation of many new subclasses."</font>


<font color="#EF7DFA"><strong>p.4</strong> "A second problem is that a white-box framework can be difficult to learn to use, since learning to use it is the same as learning how it is constructed."</font>


**p.4** "Another way to customize a framework is to supply it with a set of components that provide the application specific behavior. Each of these components will be required to understand a particular protocol. All or most of the components might be provided by a component library. The interface between components can be defined by protocol, so the user needs to understand only the external interface of the components."


<font color="#5EA33E"><strong>p.4</strong> "Thus, this kind of a framework is called a blackbox framework."</font>


**p.4** "Black-box frameworks like the pluggable views are easier to learn to use than white-box frameworks, but are less flexible."


**p.4** "A framework becomes more reusable as the relationship between its parts is defined in terms of a protocol, instead of using inheritance."

 
## 4. Lifecycle
---

**p.4** "It is always worth-while to examine a nearly-complete project to...see if new abstract classes and frameworks can be discovered."


**p.5** "Thus, creating abstract classes and frameworks is both a way of scavenging components for later reuse and a way of cleaning up a design."


**p.5** "There are many ways that classes can be reorganized. Big, complex classes can be split into several smaller classes."


**p.5** "An white-box framework can be converted into a black-box framework. All these changes make classes more reusable and maintainable."



> [!QUOTE] Can we implement a framework for repository migration, as a black-box one? Hmm...


**p.5** "Every class hierarchy offers the possibility of becoming a framework."


**p.5** "Ideally, each framework will evolve into a black-box framework."


**p.5** "A useful design strategy is to begin with a white-box approach. White-box frameworks, as a result of their internal informality, are usually relatively easy to design."


**p.5** "Finding new abstractions is difficult. In general, it seems that an abstraction is usually discovered by generalizing from a number of concrete examples."


**p.5** "This is probably unavoidable. Humans think better about concrete examples then about abstractions."


**p.5** "However, new abstractions are very important. A designer should be very happy whenever a good abstraction is found, no matter how it was found."

 
## 5. Design methodology
---

<font color="#5EA33E"><strong>p.5</strong> "The product of an object-oriented design is a list of class definitions."</font>


**p.5** "A design is complete when every object that is referenced has been defined and every operation is defined."


**p.5** "A class should represent a well-defined abstraction, not just a bundle of methods And variable definitions."


<font color="#49BEFC"><strong>p.5</strong> "the following rules will frequently point out the need for a reorganization and suggest how it is to be accomplished."</font>


### 5.1 Rules for Finding Standard Protocols
---

**p.5** "There are a number of rules of thumb that will help develop  standard protocols. A programmer practicing these rules is more likely to keep from giving different names to the same operation in different classes."


<font color="#5EA33E"><strong>p.5</strong> "Rule 1 Recursion introduction: If one class communicates with a number of other classes, its interface to each of them should be the same."</font>


**p.5** "If an operation X is implemented by performing a similar operation on the components of the receiver, then that operation should also be named X."


<font color="#49BEFC"><strong>p.6</strong> "Recursion introduction can help decide the class in which an operation should be a method."</font>


**p.6** "the best design is to implement the generate code message in the parse tree class, since a parse tree will consist of many parse nodes, and a parse node will generate machine code for itself by recursively asking its subtrees to generate code for themselves."


<font color="#5EA33E"><strong>p.6</strong> "Rule 2 Eliminate case analysis.: It is almost always a mistake to explicitly check the class of an object."</font>


<font color="#5EA33E"><strong>p.6</strong> "Rule 3 Reduce the number of arguments: Messages with half a dozen or more arguments are hard to read."</font>


### 5.2 Rules for Finding Abstract Classes
---

