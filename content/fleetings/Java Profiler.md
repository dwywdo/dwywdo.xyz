---
title: Java Profiler
description:
draft: false
tags:
  - tech
aliases:
permalink:
date: 2026-01-09
---
자바 프로파일러는 실행중인 JVM 프로세스를 가로채서 아래의 정보들을 제공한다.
- 대표적인 Java Profiler: [[Visual VM]], [[JProfiler]]

Visual VM의 주요 메뉴
1. **리소스 Usages**
	- Monitor 탭의 CPU - 프로세스와 GC가 사용하고 있는 CPU 리소스의 양 표시
		- **정상적인 프로그램의 경우에도 GC activity가 0.0%로 나올 수 있다. 왜?**
			- CPU Sample 중에서 GC가 차지하는 비율을 계산하는 값인데
				- GC 부하가 너무 낮아서 샘플링에 안 걸리거나
				- 샘플링 간격보다 GC가 짧거나 (기본 1초 샘플링에서 GC가 10ms 라던가...)
				- CPU Bound 앱이라서 비즈니스 로직이 CPU를 많이 먹는 경우
			- 중요한 점은 샘플링을 기준으로 측정하기 때문에 0으로 나올 수 있다는 점!
	- Monitor 탭의 Heap / Metaspace
		- 정상적인 메모리 패턴은 (Heap의 경우) 증가하다가 감소하는 패턴을 반복한다 (GC가 잘 작동하고 있다는 증거)
		- Metaspace도 Dynamic Proxy / 간접 호출에 많이 의존하는 경우 OOM을 발생시킬 수 있다.
		- 메모리가 모자라서 OOM을 발생시킨 에러의 스택트레이스가 반드시 문제를 일으킨 코드의 것은 아님에 유의해야 한다.
	- Monitor 탭의 Threads - 실행 중인 스레드들과 그 상태
2. **코드 실행 관점에서의 스레드 / CPU Usages**
	- Sampler > CPU 클릭
		- 실행 샘플링: 현재 활성화된 스레드들과 그들의 스택 트레이스가 표시된다
			- 스택트레이스에서 어떤 메서드가 시간이 많이 소요되였고, 동시에 사용한 CPU 시간도 보여준다...!
			- 시간은 오래걸렸는데 CPU시간이 0이라면 무언가를 기다리고 있는 경우일 확률이 높다.
			- 아래 세 가지 필수 정보를 제공한다
				1. 실행되는 코드
				2. 각 메서드의 총 실행 시간
				3. 총 CPU 실행 시간
		- Sampler는 일정 간격으로 모든 쓰레드의 스택을 찍어보는 방식이라, 그 시점에 CPU를 쓰고 있었던 위치만 보이게 된다.
			- [?] **실제 요청을 처리하는 동안의 호출 스택은 이 샘플링 타이밍에 잘 안잡혀서, 끝이 take()인 스택만 주로 보이게 되는데 왜일까?**
				- Spring MVC (Tomcat) 환경에서 대부분의 워커 스레드는 `ThreadPoolExecutor.getTask()` 안에서 `LinkedBlockingQueue.take()`을 호출한 상태로 WAITING 상태이기 때문
		- 전체 Call Tree가 보고 싶다면 Profiler를 사용해야 한다. 
	- Profiler - CPU (Instrumentation)
		- 일부 샘플링이 아닌 Class의 패키지를 지정하여 특정 범위 내의 코드 실행을 프로파일링한다. (CPU settings > Profile classes에서 범위 지정)
			- 특정 메서드(코드)의 실행 횟수도 알 수가 있다. (`Invocations`)
		- 전체 실행에 대해 프로파일링하게 되면 성능 문제가 발생할 수 있다.
3. **실제로 실행된 쿼리(SQL) 파악에 도움이 되는 기능**
	- Profiler - JDBC
		- JDBC 드라이버가 쿼리를 DB에 보내기 전에 가로채서 쿼리를 복사한다.
		- 쿼리에 대한 실행 스택 또한 확인할 수 있다.
		- [[JPA]]나 [[jOOQ]]를 사용하는 경우에도 같은 방식으로 쿼리를 확인할 수 있다.
		- [[N+1 Query Problem]]을 식별하는 데에도 도움이 된다.

JProfiler의 주요 메뉴
1. **DB Connection 프로파일링**
	- JProfiler > Instrumentation > JDBC 프로파일링 실행 후
	- Connections / Connection Leaks를 보는 것이 도움이 된다.
	- CPU 프로파일링도 사용하면 커넥션마다 그 커넥션을 생성한 메서드 스택 트레이스 또한 볼 수 있다 > 생성 및 종료 관련 코드를 찾아보는 데에 도움이 된다.
2. **호출 그래프**
	- CPU 프로파일링 > 스택 트레이스 우클릭 > `Show Call Graph`
3. **[[Flame Graph]]**
	- CPU 프로파일링 > `Analyze` > `Show Flame Graph`
	- 세로축은 실행스택 / 가로축은 하위 레벨 대비 실행 소요 시간
	- `Colorize`를 통해 색깔을 커스터마이징하는 것이 가능
4. **NoSQL 쿼리 분석**
	- Database > JDBC 이외에도 MongoDB 등의 선택이 가능하다.

---
> [!QUOTE] Note
> - 만약 Visual VM에서 프로세스에 대한 프로파일링을 수행할 때 `Redefinition failed with error 62`를 만났다면 > JVM Options으로 `-Xverify:none`을 주고 프로세스를 실행해본 뒤 프로파일러를 붙여보자.
>   - Visual VM 프로파일러는 [[JVMTI]] RedefineClasses를 써서 클래스에 계측 코드를 주입한다. 특정 JDK/바이트코트 패턴 조합에서 이 재정의된 클래스가 검증을 통과하지 못하는 경우 발생하는 에러이다.
>   - 위 옵션은 해당 검증 절차를 수행하지 않도록 하는 옵션

> [!EXAMPLE] References
> - [[Troubleshooting Java#프로파일링 기법으로 리소스 사용 문제 파악하기]]
> - [[Troubleshooting Java#프로파일링 기법으로 숨겨진 이슈 찾기]]
> - [[Troubleshooting Java#프로파일링한 데이터에 고급 시각화 도구 적용하기]]
