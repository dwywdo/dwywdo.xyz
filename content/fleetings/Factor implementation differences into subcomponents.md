---
title: Factor implementation differences into subcomponents
description:
draft: false
tags:
  - concept
aliases:
permalink:
date: 2025-10-26
---
`Factor implementation differences into subcomponents` is one of rules for finding frameworks.

It says if a subclass implements a method in its way, and another subclass implements the same method in different way, it's highly that the implementation of the method is independent to their superclass.

This implementation difference is less likely critical in subclassing and it's better to be split off as a separate component.

The point of this rule is
- Instead of implementing the behavioral differences using **Inheritance**,
- Extract the behavior as a separate object and delegate to it using **Composition**.

Multiple inheritance can tackle this issue, too. However it's more clearer to capsulate as a separate component.

Without this rule, we can face the issue of White-box framework, which is low reusability because of a specific operation bound to subclass in class hierarchy.

Example
```java
// 상위 클래스: 보고서를 생성하는 기본 로직을 가짐
abstract class ReportGenerator {
    // A shared logic to create report content
    public void generateReport(String data) {
        System.out.println("Processing DATA...");
        // Implementation difference: File saving part
        saveData(data);
    }

    // A method that's implemented differently for each subclasses
    abstract void saveData(String data);
}

// 하위 클래스 1: 파일에 저장하는 방식으로 구현
class FileReportGenerator extends ReportGenerator {
    @Override
    void saveData(String data) {
        // [Implementation#1: Logic to access filesystem]
        System.out.println("-> Save report as a file: " + data);
    }
}

// 하위 클래스 2: 데이터베이스에 저장하는 방식으로 구현
class DatabaseReportGenerator extends ReportGenerator {
    @Override
    void saveData(String data) {
        // [Implementation#2: Logic to connect to DB and save]
        System.out.println("-> Save report in DB: " + data);
    }
}
```

IF we change `File Saving` to `Network Send`, we need to modify existing `ReportGenerator` hierarchy OR create a new subclass
- Currently `saveData()` implementation is bound to class hierarchy for `ReportGenerator`, core feature of which is actually just generating report (Not saving)

To apply this rule, we could take approach of [[Strategy Pattern]], and it helps us to develop our framework to Black-box framework.

```java
// 1. 구현 차이를 캡슐화하는 별도의 컴포넌트 인터페이스 생성
// 이 컴포넌트가 'Strategy' 역할을 함
interface DataSaver {
    void save(String data);
}

// 2. 구현 방식 1: 파일 저장 컴포넌트
class FileSaver implements DataSaver {
    @Override
    public void save(String data) {
        // [Implementation#1: Logic to access filesystem]
        System.out.println("-> (Component) Save report as a file: " + data);
    }
}

// 3. 구현 방식 2: 데이터베이스 저장 컴포넌트
class DatabaseSaver implements DataSaver {
    @Override
    public void save(String data) {
        // [Implementation#2: Logic to connect to DB and save]
        System.out.println("-> (Component) Save report in DB: " + data);
    }
}

// 4. ReportGenerator 클래스 재설계 (더 이상 추상 클래스가 아님)
// 상속 대신 컴포넌트(DataSaver)에 위임(Delegation)을 사용
class ReportGenerator {
    // 구현 차이를 처리하는 컴포넌트를 필드로 가짐 (Composition)
    private DataSaver saver;

    // Dependency Injection
    public ReportGenerator(DataSaver saver) {
        this.saver = saver;
    }

    public void generateReport(String data) {
        System.out.println("데이터 처리 중...");
        // Delegate differences to the component
        saver.save(data); // Send message to the components
    }
}

// 사용 예시:
public class Main {
    public static void main(String[] args) {
        DataSaver fileStrategy = new FileSaver();
        ReportGenerator fileGen = new ReportGenerator(fileStrategy);
        fileGen.generateReport("Sales Data Q1");

        System.out.println("-----");

        DataSaver dbStrategy = new DatabaseSaver();
        ReportGenerator dbGen = new ReportGenerator(dbStrategy);
        dbGen.generateReport("HR Data Q1");
    }
}
```

This rule has benefits such as
- Reusability and Flexibility
	- `ReportGenerator` doesn't depend on a specific saving method. For a new saving method, we just need to create a new `DataSaver` implementation and inject it.
- High Cohesion
	- `ReportGenerator` now focuses on its core feature (Generating report)
- Black-box Framework
	- From White-box framework where the implementation method is exposed via inheritance
	- To Black-box framework where we communicate through interface (protocol) to outside
		- It helps user to replace components, even if they don't know internal implementation.
- Simplification of Class Hierarchy
	- `ReportGenerator` doesn't handle report saving via inheritance, to we can prevent it from being more complicated.


---
> [!QUOTE] Note

> [!EXAMPLE] References
> - [[Designing Reusable Classes#5.3 Rules for Finding Frameworks]]
