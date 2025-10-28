---
title: How we got the generics we have
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-10-28
---
[Source](https://cr.openjdk.org/~briangoetz/valhalla/erasure.html) 
# Background: how we got the generics we have
---
 
## Erasure
---

**p.** "Erasure is probably the most broadly and deeply misunderstood concept in Java."


<font color="#5EA33E"><strong>p.</strong> "Erasure is not specific to Java, nor to generics"</font>


**p.** "This is because as we move down the stack from high-level languages to intermediate representations to native code to hardware, the type abstractions offered by the lower level are almost always simpler and weaker than those at the higher level – and rightly so."


<font color="#5EA33E"><strong>p.</strong> "Erasure is the technique of mapping richer types at one level to less rich types at a lower level"</font>


**p.** "For example, the Java bytecode set contains instructions for moving integers values between the stack and local variable set (iload, istore)"


<font color="#EF7DFA"><strong>p.</strong> "But there are no such instructions for bytes, shorts, chars, or booleans – because these types are erased to ints by the compiler, and use the int-movement and arithmetic instructions."</font>


<font color="#49BEFC"><strong>p.</strong> "it reduces the complexity of the instruction set, which in turn can improve the efficiency of the runtime."</font>


**p.** "Similarly, when compiling C to native code, both signed and unsigned ints are erased into general-purpose registers"

 
## Homogeneous vs heterogeneous translations
---

**p.** "There are two common approaches for translating generic types in languages with parameteric polymorphism – homogeneous and heterogeneous translation."


<font color="#5EA33E"><strong>p.</strong> "In a homogeneous translation, a generic class `Foo&lt;T&gt;` is translated into a single artifact, such as Foo.class (and same for generic methods)"</font>


<font color="#5EA33E"><strong>p.</strong> "In a heterogeneous translation, each instantiation of a generic type or method (`Foo&lt;String&gt;`, `Foo&lt;Integer&gt;`) is treated as a separate entity, and generates separate artifacts."</font>


**p.** "The choice between homogeneous and heterogeneous translations involves making the sorts of tradeoffs language designers make all the time."

 
## Erased generics in Java
---

<font color="#5EA33E"><strong>p.</strong> "Java translates generics using a homogeneous translation."</font>


**p.** "a generic type like `List&lt;String&gt;` is erased to `List` when generating bytecode, and type variables such as `&lt;T extends Object&gt;` are erased to the erasure of their bound (in this case, `Object`)."


<font color="#5EA33E"><strong>p.</strong> "type variables are erased to their bounds, generic types are erased to their head (List&lt;String&gt; erases to List) as follows:"</font>


**p.** "At the use site, the same thing happens: references to Box&lt;String&gt; are erased to Box, with a synthetic cast to String inserted at the use site."



> [!QUOTE] When there's `Box<String>box = new Box<>("Hello");`, `String result = box.t();` is supplemented by compiler like `Object temp = box.t(); String result = (String) temp;`. This is called `Synthetic Cast`

 
## Why? What were the alternatives?
---

**p.** "we should also ask: were we to reify that type information, what would we expect to do with it, and what are the costs associated with that?"


<font color="#49BEFC"><strong>p.</strong> "Reflection. For some, “reified generics” merely means that you can ask a List what it is a list of"</font>


<font color="#49BEFC"><strong>p.</strong> "Layout or API specialization. In a language with primitive types or inline classes, it might be nice to flatten the layout of a Pair&lt;int, int&gt; to hold two ints, rather than two references to boxed objects."</font>


<font color="#49BEFC"><strong>p.</strong> "Runtime type checking. When a client attempts to put an Integer in a List&lt;String&gt; (through, say, a raw List reference), which would cause heap pollution, it would be nice to catch this and fail at the point where the heap pollution would be caused, rather than (maybe) detecting it later when it hits a synthetic cast."</font>


<font color="#5EA33E"><strong>p.</strong> "To understand how erasure was the sensible and pragmatic choice here, we also have to understand what the goals, priorities and constraints, and alternatives were at the time."</font>

 
## Goal: Gradual migration compatibility
---

<font color="#5EA33E"><strong>p.</strong> "an ambitious requirement: It must be possible to evolve an existing non-generic class to be generic in a binary-compatible and source-compatible manner."</font>


**p.** "Supporting this meant that clients and subclasses of generified classes could choose to generify immediately, later, or never, and could do so independently of what maintainers of other clients or subclasses chose to do."


<font color="#EF7DFA"><strong>p.</strong> "Without this requirement, generifying a class would require a “flag day” where all clients and subclasses have to be at least recompiled, if not modified – all at once."</font>


**p.** "By making generification a compatible operation, the investment in that code could be retained, rather than invalidated."


<font color="#5EA33E"><strong>p.</strong> "The aversion to “flag days” comes from an essential aspect of Java’s design: Java is separately compiled and dynamically linked."</font>


**p.** "you can compile C against one version of D and run with a different version of D on the class path (as long as you don’t make any binary incompatible changes in D.)."


<font color="#5EA33E"><strong>p.</strong> "The pervasive commitment to dynamic linkage is what allows us to simply drop a new JAR on the class path to update to a new version of a dependency"</font>


**p.** "At the time generics were introduced into Java, there was already a lot of Java code in the world, and their classfiles were full of references to APIs like java.util.ArrayList."


<font color="#5EA33E"><strong>p.</strong> "One consequence of this choice, though, is that it will be an expected occurrence that a generic class will simultaneously have both generic and non-generic clients or subclasses."</font>

 
## Heap pollution
---

<font color="#EF7DFA"><strong>p.</strong> "Erasing in this manner, and supporting interoperability between generic and non-generic clients, creates the possibility of heap pollution – that what is stored in the box has a runtime type that is not compatible with the compile-time type that was expected."</font>


**p.** "Heap pollution can come from when non-generic code uses generic classes, or when we use unchecked casts or raw types to forge a reference to a variable of the wrong generic type."


<font color="#5EA33E"><strong>p.</strong> "The sin in this code is the unchecked cast from `Box&lt;?&gt;` to `Box&lt;Integer&gt;`; we have to take the developer at their word that the specified box really is a `Box&lt;Integer&gt;`."</font>


**p.** "the heap pollution is not caught right away; only when we try to use the String that was in the box as an Integer, do we detect that something went wrong."


<font color="#5EA33E"><strong>p.</strong> "If a program compiles with no unchecked or raw warnings, the synthetic casts inserted by the compiler will never fail."</font>


<font color="#5EA33E"><strong>p.</strong> "heap pollution can only occur when we are interoperating with non-generic code, or when we lie to the compiler."</font>

 
## Context: Ecosystem of JVM implementations and languages
---

<font color="#5EA33E"><strong>p.</strong> "The design choices surrounding generics were also influenced by the structure of the ecosystem of JVM implementations and of languages running on the JVM."</font>


**p.** "in fact the Java Language and the Java Virtual Machine (JVM) are separate entities, each with their own specification."


**p.** "there are over 200 languages that use the JVM as compilation target, some of which have a lot in common with the Java language (e.g., Scala, Kotlin) and others which are very different languages (e.g., JRuby, Jython, Jaskell.)"


<font color="#EF7DFA"><strong>p.</strong> "Reifying generics would mean that not only would we need to enhance the language to support generics, but also the JVM."</font>


**p.** "If, for example, the interpretation of reification included type checking at runtime, would Scala (with its declaration-site generics) be happy to have the JVM enforce Java’s (invariant) generic subtyping rules?"

 
## Erasure was the pragmatic compromise
---

<font color="#49BEFC"><strong>p.</strong> "Runtime costs. A heterogeneous translation entails all sorts of runtime costs: greater static and dynamic footprint, greater class-loading costs, greater JIT costs and code cache pressure, etc."</font>


<font color="#49BEFC"><strong>p.</strong> "Migration compatibility."</font>


<font color="#49BEFC"><strong>p.</strong> "Runtime costs, bonus edition. If reification is interpreted as checking types at runtime (just as stores into Java’s covariant arrays are dynamically checked), this would have a significant runtime impact, as the JVM would have to perform generic subtyping checks at runtime on every field or array element store, using the language’s generic type system."</font>


<font color="#49BEFC"><strong>p.</strong> "JVM ecosystem."</font>


<font color="#49BEFC"><strong>p.</strong> "Delivery pragmatics."</font>


<font color="#49BEFC"><strong>p.</strong> "Language ecosystem."</font>


<font color="#49BEFC"><strong>p.</strong> "Users would have to deal with erasure (and therefore heap pollution) anyway."</font>


<font color="#49BEFC"><strong>p.</strong> "Certain useful idioms would have been inexpressible."</font>


<font color="#5EA33E"><strong>p.</strong> "The common misconception that erasure is “a dirty hack” generally stems from a lack of awareness of what the true costs of the alternative would have been, both in engineering effort, time to market, delivery risk, performance, ecosystem impact, and programmer convenience given the large volume of Java code already written and the diverse ecosystem of both JVM implementations and languages running on the JVM."</font>


