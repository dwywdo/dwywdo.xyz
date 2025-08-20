---
title: Rabin fingerprint
description: 
draft: false
tags:
  - annotation
aliases: 
permalink: 
date: 2025-08-17
---
[Source](https://en.wikipedia.org/w/index.php?title=Rabin_fingerprint&oldid=1245817171) 
# Rabin fingerprint
---
**p.** "The Rabin fingerprinting scheme (aka Polynomial fingerprinting) is a method for implementing fingerprints using polynomials over a finite field."

 
## Scheme
---
**p.** "Given an n-bit message m0,...,mn-1, we view it as a polynomial of degree n-1 over the finite field GF(2)."



> [!QUOTE] $f(x) = m_0 + m_1x + m_2x^2... + m_(n-1)x^(n-1)$

**p.** "We then pick a random irreducible polynomial `p(x)`⁠ of degree `k` over `GF(2)`, and we define the fingerprint of the message m to be the remainder `r(x)` after division of `f(x)` by `p(x)` over `GF(2)` which can be viewed as a polynomial of degree `k − 1` or as a `k-bit` number."

 
## Applications
---
**p.** "Many implementations of the Rabin–Karp algorithm internally use Rabin fingerprints."

**p.** "The Low Bandwidth Network Filesystem (LBFS) from MIT uses Rabin fingerprints to implement variable size shift-resistant blocks."

**p.** "the idea is to select blocks not based on a specific offset but rather by some property of the block contents. LBFS does this by sliding a 48 byte window over the file and computing the Rabin fingerprint of each window."


