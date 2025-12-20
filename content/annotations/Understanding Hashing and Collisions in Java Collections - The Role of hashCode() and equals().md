---
title: Understanding Hashing and Collisions in Java Collections - The Role of hashCode() and equals()
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-12-20
---
[Source](https://jackiewicz.hashnode.dev/understanding-hashing-and-collisions-in-java-collections-the-role-of-hashcode-and-equals) 
# Understanding Hashing and Collisions in Java Collections: The Role of hashCode() and equals()
---

<font color="#5EA33E"><strong>p.</strong> "In Java, hash-based collections like HashSet, HashMap, and HashTable use hashing to store objects. These collections rely on the hashCode() and equals() methods to efficiently locate and manage objects."</font>

 
## hashCode() Method
---

**p.** "hash code is used to determine where in the collection (which bucket) the object should reside."


**p.** "The default implementation of hashCode() in Object class is typically based on the memory address of the object, but this can and &lt;b&gt;should&lt;/b&gt; be overridden in custom types"

 
## equals() Method
---

<font color="#EF7DFA"><strong>p.</strong> "It&#39;s crucial for determining if an object already exists in the collection, especially when multiple objects have the same hash code (collision)."</font>

 
## Handling Collisions
---

<font color="#5EA33E"><strong>p.</strong> "A collision occurs when two objects return the same hash code but are not equal (according to the equals() method)."</font>


<font color="#8F65F7"><strong>p.</strong> "If many objects end up in the same bucket because of collisions, the time complexity can degrade from O(1) to O(n) for operations like add, remove, and search."</font>

 
## Custom Types and Best Practices
---

<font color="#5EA33E"><strong>p.</strong> "Override both hashCode() and equals(): When creating custom types that will be used in hash-based collections, it&#39;s crucial to override both methods."</font>


**p.** "hashCode() method should be overridden to return hash codes that are distributed uniformly across the int range."


<font color="#5EA33E"><strong>p.</strong> "Consistency between hashCode() and equals(): If two objects are considered equal by the equals() method, they must return the same hash code."</font>


**p.** "two objects with the same hash code are not required to be equal."


<font color="#5EA33E"><strong>p.</strong> "Generating Good Hash Codes: A good hashCode() implementation produces distinct integers for objects that are not equal, reducing the likelihood of collisions"</font>



> [!QUOTE] 실질적으로 해시 기반의 자료구조에서 해시 충돌이라 함은 hashCode() 값 그 자체가 동일한 경우가 아니라, hashCode()의 값을 기반으로 자료구조 내에서 들어갈 버킷을 정하는 계산식의 결과가 동일한 경우인데...
hashCode()를 잘 정의한다고 해서 해시 기반 자료구조 내에서의 해시 충돌을 유의미하게 낮출 수 있는 것일까?

 
## Example Demonstrating Collisions
---

<font color="#5EA33E"><strong>p.</strong> "The hashCode() method uses Objects.hash(Object...), which takes the fields into account to compute the hash code."</font>


<font color="#49BEFC"><strong>p.</strong> "Prime Number: Using a prime number reduces the likelihood of collisions, where different objects produce the same hash code."</font>


<font color="#49BEFC"><strong>p.</strong> "Computational Efficiency: The choice of 31 specifically also has a performance aspect. Multiplying by 31 can be efficiently implemented by the Java Virtual Machine (JVM) as a shift (left by 5 positions) and subtract operation (value &lt;&lt; 5) - value."</font>


**p.** "While modern hardware has mitigated this advantage through more efficient multiplication operations, the choice of 31 remains a convention from earlier Java versions for consistency and backward compatibility."


<font color="#49BEFC"><strong>p.</strong> "Avoiding Collisions: The use of a non-trivial multiplier in hash code calculation helps in producing a more evenly distributed range of hash codes, especially for similar objects that might only differ in one or a few fields."</font>


<font color="#5EA33E"><strong>p.</strong> "In summary, while Java&#39;s hash collections work seamlessly with standard types, careful attention must be paid when using custom types. Properly overriding the hashCode() and equals() methods in custom classes can greatly reduce the chance of collisions and maintain the performance benefits of hash-based collections."</font>


