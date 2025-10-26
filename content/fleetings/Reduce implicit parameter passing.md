---
title: Reduce implicit parameter passing
description:
draft: false
tags:
  - concept
aliases:
permalink:
date: 2025-10-27
---
`Reduce implicit parameter passing` is one of rules to find frameworks for object-oriented softwares.

This rules discuss how to achieve better reusability by splitting a huge class, especially with avoiding to use instance variables like they're global.

Sometimes it's hard to split a class into two parts, because methods that's supposed to belong to different classes access to the same instance variable. This could happen when the instance variable is actually supposed to be delivered as method arguments, but rather used like global variables.

Example

Let's say `DataProcessor` class is responsible to initialize and calculate `configData`, and those roles are independent to each other.
```java
class DataProcessor {
	private String configData;
	private List<String> rawInput;
	
	public DataProcessor(List<String> input) {
		this.rawInput = input;
	}
	
	// Initialize Mehtod
	public void setupConfiguration(String config) {
		this.configData = config.toUppserCase(); // Implicitly save
		System.out.println("A: Save configData: " + this.configData);
	}
	
	// Calculation Method
	public String calculateResult() {
		if (configData == null) { // Implicit use of parameters like its global
			throw new IllegalStateException("Need configuration");
		}
		System.out.println("B: using " + configData + ", calculating...");
		// Omitted calculation logic
		return "Final Result based on " + configData;
	}
}
```
- Issues
	- IF we hope to split this class into `Initializer` and `Calculator`, we need to think where to put the `configData` variable.
	- `configData` is a field of `DataProcessor`, which makes it hard to split

With this rule, we no longer put `configData` as an instance variable. Instead we convert it to a separate class that capsulates it OR an explicit method parameter.

```java
class Configuration {
	private String data;
	
	public void setData(String data) {
		this.data = data.toUppserCase();
	}
	
	public String getData() {
		return data;
	}
}
```

```java
class Initializer {
	public void setup(String rawConfig, Configuration targetConfig) {
		targetConfig.setData(rawConfig);
		System.out.println("[Intialize] Save configData: " + rawConfig);
	}
}

class Calculator {
	private List<String> rawInput;
	
	public Calculator(List<String> input) {
		this.rawInput = input;
	}
	
	public String calculate(Configuration config) {
		if (config.getData() == null) {
			throw new IllegalStateException("Need configuration");
		}
		System.out.println("[Calculate] using " + configData + ", calculating...");
		// Omitted calculation logic
		return "Final Result based on " + config.getData();
	}
}
```

Original `DataProcessor` now becomes `CoordinatedProcessor`, which is only responsible to delete the process to its components.

```java
class CoordinatedProcessor {
	private Initializer initializer = new Initializer();
	private Calculator calculator;
	
	public CoordinatedProcessor(List<String> input) {
		this.calculator = new Calculator(input);
	}
	
	public String runProcessingFlow(String rawConfig) {
		Configuration sharedConfig = new Configuration(); // Data is created here and shared.
		
		initializer.setup(rawConfig, sharedConfig);
		
		return calculator.calculate(sharedConfig);
	}
}
```

By applying this rule, we could have benefits such as
- Facilitates Splitting: it's easy to separate a class into pieces when their roles are independent.
- Low Modularity and Decoupling
- Data Encapsulation
- Clear interface (API)

---
> [!QUOTE] Note

> [!EXAMPLE] References
> - [[Designing Reusable Classes#5.3 Rules for Finding Frameworks]]
