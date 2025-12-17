---
title: SLASH 23 - 은행 최초 코어뱅킹 MSA 전환기 (feat. 지금 이자 받기)
description:
draft: true
tags:
  - annotation
aliases:
permalink:
date: 2025-10-30
---
[Source](https://www.youtube.com/watch?v=amTJyIE1wO0)

- Core Banking -> Microservice
- [00:36](https://www.youtube.com/watch?v=amTJyIE1wO0&t=37#t=00:36.80) Typical Banking System
	- Channel System
	- Core Banking System (Revision? System)
- Client -> Channel System (+ MySQL) -> Core Banking System (+ Oracle DB)
	- Request from various system (Mobile + Web + Telephone Banking, ...)
- [01:50](https://www.youtube.com/watch?v=amTJyIE1wO0&t=111#t=01:50.72) Reasons for monolithic software architecture has maintained for decades
	- Working / Well-standardized
- [02:18](https://www.youtube.com/watch?v=amTJyIE1wO0&t=138#t=02:18.31) Current Architecture
	- Channel System is based on MSA
	- However, Core Banking Server is still Monolithic, connected to MCI (Multi Channel Interface) / FEP (Front End Processor) / EAI (Enterprise Architecture Integration)
- Single Server / Single DB
	- Easy to process transaction (+ ACID), thanks to simple network architecture
	- Hard to scale out (All services need to be scaled out together)
	- SPOF
- [03:41](https://www.youtube.com/watch?v=amTJyIE1wO0&t=222#t=03:41.67) Tech Debt (Legacy, ...)
- [04:23](https://www.youtube.com/watch?v=amTJyIE1wO0&t=264#t=04:23.61) 지금 이자 받기 서비스
- [05:48](https://www.youtube.com/watch?v=amTJyIE1wO0&t=349#t=05:48.98) 
- [06:32](https://www.youtube.com/watch?v=amTJyIE1wO0&t=392#t=06:32.28) 
- [08:29](https://www.youtube.com/watch?v=amTJyIE1wO0&t=509#t=08:29.42) 동시성 제어
	- Redis Global Lock <- 트랜잭션 채널이 매우 많기 때문에 까다로움
	- 만약 동시성이 제대로 제어되지 않는다면?
	- Redis Global Lock+ JPA's `@Lock`
	- 주의할 점
		- Lock을 잡아야하는 데이터를 명확히 식별하고 갱신하는 데이터에 대해서만 획득해야 Deadlock + 성능저하를 예방할 수 있다.
		- 이 경우 잔액을 갱신하는 이벤트가 메인 로직이기 때문에, 계좌 단위 현재 잔액 데이터에 대해서만 Lock이 걸리도록 보장함
- [11:03](https://www.youtube.com/watch?v=amTJyIE1wO0&t=663#t=11:03.33) Kafka를 이용한 비동기 트랜잭션 구현
	- 기존 이자 받기 트랜잭션에서 분리가 가능한 테이블은 Kafka를 이용해 트랜잭션으로부터 분리하였다.
	- 분리의 기준?
		- 고객의 잔액과 통장 데이터 관점에서 DB 쓰기 지연이 발생했을 때 통장 데이터가 실시간으로 문제가 발생하는지...?
		- 세금처리와 같이 굳이 묶이지 않아도 되는 데이터 모델의 DML은 분리해냈다.,
- [13:22](https://www.youtube.com/watch?v=amTJyIE1wO0&t=802#t=13:22.45) Redis Usages
- [15:10](https://www.youtube.com/watch?v=amTJyIE1wO0&t=910#t=15:10.14) Migration 과정
---
> [!QUOTE] Note
> Blahblah...

> [!EXAMPLE] References
> - 
