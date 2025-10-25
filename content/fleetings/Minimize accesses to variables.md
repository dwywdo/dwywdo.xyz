---
title: Minimize accesses to variables
description:
draft: false
tags:
  - concept
aliases:
permalink:
date: 2025-10-25
---
`Minimize accesses to variables` is the third rule to find abstract classes during development.

This rule focuses on one of differences between abstract and concrete classes, `Data Representation`. Classes can be abstract by removing dependence on data representation. To achieve this, it suggests to access instance variables only via sending messages (Method call).

**Example#1**
```java
class Config {
	protected String configurationData;
	
	public void process() {
		if (this.configurationData == null) {
			System.out.println("NO DATA");
		}
		// ...
	}
}
```
- This class directly access to instance variable, `configurationData` (**this.configurationData**)

To eliminate its dependence on data representation, we could make the data private and restrict all accesses to via messages.

```java
abstract class AbstractConfig {
	private String config;
	
	protected String getConfig() {
		return this.config;
	}
	
	public void process() {
		if (this.getConfig() == null) {
			System.out.println("NO DATA");
		}
	}
}
```

Now `config` is not visible to its subclasses. Only message (method) to load config is exposed for overriding. 

With this approach, subclasses can re-define the way to fetch data OR even change data representation.

```java
class DatabaseConfig extends AbstractConfig {
	@Override
	protected String getConfig () {
		return loadDataFromDatabase();
	}
	
	private String loadDataFromDatabase() {
		// Actual logic to load config from DB
		return "Loaded from DB";
	}
}
```
- `process()` method still can be used by subclasses via inheritance.
- `process()` still uses `getConfig()`, which is specific to subclass's implementation.

We can apply this rule when we want to promote an upper class of hierarchy to abstract class, hence improving reusability. Generally a concrete class is responsible for providing a definition of data representation. However, some subclasses might need a different data representation. With this rule, subclasses can keep inherited methods, while re-defining a message to access data to change data representation

This has benefits such as
- Flexibility of data representation
- Encourage abstraction
- Enhanced reusability

There are many other examples and I'd like to introduce more.

**Example#2**

Let's think about the size calculation of `Collection`. Let's say there's `AbstractCollection` whose subclass collections have to understand `size()`, but it doesn't define an instance variable to store the size of a collection. Instead, it can implement the way to calculate size with `Iterator`
```java
abstract class AbstractCollection {
	public int size() {
		int count = 0;
		Iterator iterator = this.getIterator();
		while (iterator.hasNext()) {
			count++;
			iterator.next();
		}
		return count;
	}
	
	// An abstract method that subclass should implement.
	protected abstract Iterator getIterator();
}
```

This upper class's `size()` method is defined using **a message to retrieve elements of a collection (iterator)**, `getIterator()`. This way eliminates dependence on their data representation and make itself more abstract.

A following concrete class, `FastArrayList`, inherits above abstract class and
- Change the data representation
- Optimize performance

```java
class FastArrayList extends AbstractCollection {
	// 1. Introduce data representation: An instance variable to store the size (currentSize)
	private int currentSize = 0;
	private Object[] elements; // Actual storage
	
	@Override
	protected Iterator getIterator() {
		// ... Actual Iterator Implementation Logic
		return null;
	}
	
	@Override
	public int size() {
		return this.currentSize;
	}
	
	pulbic void add(Object element) {
		// Logic to add a element
		this.currentSize++;
	}
}
```

With this example, we could see the benefits
1. Since `AbstractCollection`'s `size()` doesn't depend on data representation, `FastArrayList` can use other methods without modification and only need to override `size()` (Message) to utilize its own data representation (currentSize)
2. Abstract class behaves like `a template` that requires subclasses to override a specific operation (Here, `size()`).
3. IF `AbstractCollection`'s other methods (`isEmpty()`, `contains()`) are defined using `size()`, `FastArrayList` can efficiently override only `size()` to use other methods without performance degration

**Example#3**

Let's suppose that we design a class hierarchy that processes configuration data from various environment (Local file / Network / Cache, ...)

Top class of hierarchy needs to be abstract and should include only logic to process configuration data. (No data representation)
```java
abstract class ConfigProcessor {
	// Don't define an instance variable (Ideal), OR make it private (Capsulation)
	// private String configurationData
	
	protected abstract String getRawConfigData();
	
	public void validateConfiguration() {
		String data = this.getRawConfigData();
		
		if (data == null || data.isEmpty()) {
			System.out.println("Configuration is missing");
		} else {
			System.out.println("Configuration Validation Complete.)
		}
	}
}
```

A concrete subclass 1 - File-based data representation
```java
class FileConfigProcessor extends ConfigProcessor {
	// Data Representation: An instance variable to store a file path
	private final String filePath = "/etc/app.config";
	
	@Override
	protected String getRawConfigData() {
		// Access to the instance variable 'filePath', OR execute file I/O
		System.out.println(">> FILE Path: " + filePath);
		return "File content..."; // Return data from a file.
	}
}
```

A concrete subclass 2 - Cache-based data representation
```java
class CacheConfigProcessor extends ConfigProcessor {
	// Data Representation: An instance variable for caching
	private String cachedConfig;
	private boolean isLoaded = false;
	
	@Override
	protected String getRawConfigData() {
		if (isLoaded) {
			System.out.println(">> Return cached data");
			return this.cachedConfig;
		} else {
			// Load from DB with complicated logic
			System.out.println(">> Load initial data from DB");
			this.cachedConfig = "Loaded Data for Caching";
			return "DB content...";
		}
	}
}
```

So in this example we isolate the way of data representation for each subclasses. `validateConfiguration()` doesn't need to know how configuration data is represented at all. Also, both subclasses use totally different way to store and load their data, they can re-use `validateConfiguration()` logic without modification.

---
> [!QUOTE] Note

> [!EXAMPLE] References
> - [[Designing Reusable Classes#5.1 Rules for Finding Standard Protocols]]
