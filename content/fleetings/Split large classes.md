---
title: Split large classes
description:
draft: false
tags:
  - concept
aliases:
permalink:
date: 2025-10-26
---
`Split large classes` is one of rules to find a framework for object-oriented softwares.

> [!TIP] Framework: A set of classes that implement an abstract design for a specific domain / concerns

Let's think about a compiler and its implementation. 

If a single class is responsible for too many stages for compilation with 50 ~ 100 methods, we need to think that there are more than one abstraction are mixed in this class with poor software design.

Example
```java
class MonolithicCompiler {
	// All data representation is internally required.
	private String sourceCode;
	private List<Token> tokens;
	private SyntaxTree parseTree;
	private MachineCode finalCode;
	
	// Let's assume that there are 50+ methods for each compilation stages (Tokenization / Syntax Analysis / Code Generation / Optimization / ...)
	public void runLexicalAnalysis() {
		// ...
	}
	
	public void runSyntaxAnalysis() {
		// ...
	}
	
	public void runCodeGeneration() {
		// ...
	}
	
	public MachineCode compile(String code) {
		this.sourceCode = code;
		runLexicalAnalysis();
		runSyntaxAnalysis();
		runCodeGeneration();
	}
	
	// Other methods... 
}
```

If we apply this rule...
1. Define each compilation steps as interfaces (`Lexer` / `Parser` / `CodeGenerator`)
	- Each steps become a class (component) to represent each abstract concepts
2. Define a new abstract compiler that manages compilation process (as template) and delegate each steps to components at 1
3. For a new language, new `Parser` and `CodeGenerator` can be added in a new architecture and `mix and match` is possible.

```java
interface Parser {
	SyntaxTree parse(TokenStream tokens);
}

interface CodeGenerator {
	MachineCode generate(SyntaxTree tree);
}
// And other interfaces...
```

```java
abstract class AbstractCompiler {
	// References to components
	protected final Lexer lexer;
	protected final Parser parser;
	protected final CodeGenerator generator;
	
	public AbstractCompiler(Lexer lexer, Parser parser, CodeGenerator generator) {
		this.lexer = lexer;
		this.parser = parser;
		this.generator = generator;
	}
	
	// Compile Process (A template method)
	public final MachineCode compile(String sourceCode) {
		TokenStream tokens = lexer.tokenize(sourceCode);
		SyntaxTree tree = parser.parse(tokens);
		SyntaxTree optimizedTree = this.optimize(tree);
		MachineCode code = generator.generate(optimizedTree);
		
		return code;
	}
	
	// Can be specialized by subclasses
	protected SyntaxTree optimize(SyntaxTree tree) {
		return tree;
	}
}
```

With this rule, we have following advantages.
- Clear, and well-defined abstraction
- Enhanced reusability
- Flexibility with `mix and match`
- Easy to learn for new programmers (Newcomer, ...)

---
> [!QUOTE] Note

> [!EXAMPLE] References
> - [[Designing Reusable Classes#5.1 Rules for Finding Standard Protocols]]
