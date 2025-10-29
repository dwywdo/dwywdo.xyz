---
title: Bloom filter
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-07-18
---
[Source](https://en.wikipedia.org/w/index.php?title=Bloom_filter&oldid=1298038948) 
# Bloom filter
---

<font color="#5EA33E"><strong>p.</strong> "a space-efficient probabilistic data structure, conceived by Burton Howard Bloom in 1970, that is used to test whether an element is a member of a set."</font>


<font color="#5EA33E"><strong>p.</strong> "a query returns either &quot;possibly in set&quot; or &quot;definitely not in set&quot;."</font>


<font color="#5EA33E"><strong>p.</strong> "an impractically large amount of memory if &quot;conventional&quot; error-free hashing techniques were applied."</font>


<font color="#5EA33E"><strong>p.</strong> "fewer than 10 bits per element are required for a 1% false positive probability, independent of the size or number of elements in the set."</font>

 
## Algorithm description
---

<font color="#5EA33E"><strong>p.</strong> "m bits"</font>


<font color="#5EA33E"><strong>p.</strong> "k different hash functions"</font>


<font color="#5EA33E"><strong>p.</strong> "k is a small constant which depends on the desired false error rate ε, while m is proportional to k and the number of elements to be added."</font>



> [!QUOTE] [Ref](https://stackoverflow.com/questions/658439/how-many-hash-functions-does-my-bloom-filter-need/22467497) How much is `M` proportional to `K`?
> - In general, `K` =~ (M/N) * ln2 (=0.693)
> - `N` is the number of elements to be inserted (stored)


<font color="#5EA33E"><strong>p.</strong> "To add an element, feed it to each of the k hash functions to get k array positions. Set the bits at all these positions to 1."</font>



> [!QUOTE] Element > Hash Function > Array Position
> - What kind of hash functions are used? How is the position from the array is decided?
> - Any hash functions can be used because it always results in binary data, which can be interpreted as 32 / 64 bits Integer.


<font color="#5EA33E"><strong>p.</strong> "To test whether an element is in the set, feed it to each of the k hash functions to get k array positions. If any of the bits at these positions is 0, the element is definitely not in the set"</font>


<font color="#5EA33E"><strong>p.</strong> "If all are 1, then either the element is in the set, or the bits have by chance been set to 1 during the insertion of other elements, resulting in a false positive."</font>


<font color="#5EA33E"><strong>p.</strong> "For a good hash function with a wide output, there should be little if any correlation between different bit-fields of such a hash, so this type of hash can be used to generate multiple &quot;different&quot; hash functions by slicing its output into multiple bit fields."</font>



> [!QUOTE] Good Hash Function's 64bits Hash Result: 0x123456789ABCDEF0
> - 1st Hash Function: 16bits (0x1234)
> - 2nd Hash Function 16bits (0x5678)
> - 3rd Hash Function: 16bits (0x9ABC)
> - 4th Hash Function: 16bits (0xDEF0)


<font color="#5EA33E"><strong>p.</strong> "one can pass k different initial values (such as 0, 1, ..., k − 1) to a hash function that takes an initial value; or add (or append) these values to the key."</font>



> [!QUOTE] Use a same hash function, but with different values as seeds.


<font color="#5EA33E"><strong>p.</strong> "Removing an element from this simple Bloom filter is impossible"</font>



> [!QUOTE] Because...
> - There's no way to tell which of the k bits should be cleared.
> - 비트 하나만 지워도 값을 지우는 효과를 낼 수 있지만, 다른 값을 지울 수 있다는 부작용도 함께 존재.

 
## Space and time advantages
---

<font color="#5EA33E"><strong>p.</strong> "a substantial space advantage over other data structures for representing sets, such as self-balancing binary search trees, tries, hash tables, or simple arrays or linked lists of the entries."</font>


<font color="#5EA33E"><strong>p.</strong> "A Bloom filter with a 1% error and an optimal value of k, in contrast, requires only about 9.6 bits per element, regardless of the size of the elements."</font>



> [!QUOTE] 1% Error => 9.6bits / Elements


<font color="#5EA33E"><strong>p.</strong> "Bloom filters also have the unusual property that the time needed either to add items or to check whether an item is in the set is a fixed constant, O(k), completely independent of the number of items already in the set."</font>



> [!QUOTE] This can be boosted with aid of hardware support, since applying each hash functions can be done in parallel


<font color="#5EA33E"><strong>p.</strong> "In a hardware implementation, however, the Bloom filter shines because its k lookups are independent and can be parallelized."</font>


