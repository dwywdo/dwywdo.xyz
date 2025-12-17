---
title: SLASH 24 - 보상 트랜잭션으로 분산 환경에서도 안전하게 환전하기
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-10-30
---
[Source](https://www.youtube.com/watch?v=xpwRTu47fqY&list=PL1DJtS1Hv1PiGXmgruP1_gM2TSvQiOsFL&index=10)

- [00:19](https://www.youtube.com/watch?v=xpwRTu47fqY&t=19#t=00:19.17) 토스뱅크 외화통장 기능
	- 양방향 환전수수료 무료 :) -> 살 때 환율 / 팔 때 환율 같은 개념이 없어짐
- 기술적으로도 매우 큰 도전이었음

- [00:56](https://www.youtube.com/watch?v=xpwRTu47fqY&t=56#t=00:56.01) 분산 환경에서 환전을 구현하기
- [01:24](https://www.youtube.com/watch?v=xpwRTu47fqY&t=84#t=01:24.39) 거대한 단일 서버가 단일 데이터베이스를 바라보고 있는 Monolithic 구조
	- 시스템과 개발팀의 규모가 커질수록 배포 및 개발 경험 /  SPOF 등 이슈가 많이 생겨 MSA로의 전환 진행 중
- [?] 외화 계좌는 왜 DB까지 분리했고, 다른 DB를 사용했을까?
- [02:28](https://www.youtube.com/watch?v=xpwRTu47fqY&t=148#t=02:28.02) 환전이란... 원화 -> 외화 받기 / 외화 -> 원화 받기
	- 모바일 앱 내에서 이 과정이 모두 이루어져야 한다.
	- 만약 환전이 같은 DB를 바라보고 있는 단일 서버 위에 구현된다면 매우 간단히 구현될 수 있다
	- 단일 서버에서 트랜잭션으로 처리하면 된다 :)
- [03:09](https://www.youtube.com/watch?v=xpwRTu47fqY&t=189#t=03:09.26) 원화/외화 계좌 서버가 분리되어 있고, 서로 다른 DB를 보고 있다면...?
![[Screenshot 2025-12-08 at 2.19.52 PM.png]]
- 분산 트랜잭션이 구현되어야 함

- [03:36](https://www.youtube.com/watch?v=xpwRTu47fqY&t=217#t=03:36.57) Two Phase Commits vs. SAGA
	- 단 하나의 서비스라도 트랜잭션 커밋 불가능 응답이 오면? 롤백 요청을 보내서 데이터 변경을 돌린다.
	- 가용성과 확장성이 낮다. 일관성은 높다.
- [04:28](https://www.youtube.com/watch?v=xpwRTu47fqY&t=269#t=04:28.75) SAGA 각 서비스들이 작은 로컬 트랜잭션을 진행하다가 특정 단계에서 실패하는 경우 이전에 커밋된 트랜잭션들에게 보상 트랜잭션을 보내 롤백
	- 가용성과 확장성이 높지만, 중간 상태가 노출된다. 그리고 보상 트랜잭션도 직접 구현해야 한다.

- [05:09](https://www.youtube.com/watch?v=xpwRTu47fqY&t=310#t=05:09.69) 환전 서비스는 높은 트래픽을 견뎌야 해서 SAGA 패턴을 선택함
	- 다양한 트랜잭션 참여자가 추가될 수 있기 때문이기도 함
- [05:21](https://www.youtube.com/watch?v=xpwRTu47fqY&t=322#t=05:21.91) Choreography SAGA vs. Orchestration SAGA
	- 전자는 중앙제어가 없어서 SPoF가 없고 느슨한 결합성을 가짐. 추적이나 디버깅은 어려움
	- 단일 장애점이 되지만, 현재 진행중인 상태를 추적하기 쉽다.
	- 후자를 선택하였음. 클라이언트 요청을 받아 시작하는 환전 서버가 있어야 하고, 현재 진행중인 환전의 상태를 관리했어야 했음
		- 환전 한도를 구현하려면 현재 진행중인 환전의 상태도 추적이 필요...!
- [08:25](https://www.youtube.com/watch?v=xpwRTu47fqY&t=506#t=08:25.50) 출금 먼저 해야하는 이유 :)
- [09:06](https://www.youtube.com/watch?v=xpwRTu47fqY&t=547#t=09:06.90) 입출금 요청의 통신방식
	- HTTP
	- **Messaging (Kafka)** 에러 처리를 알아서 Broker가 해줌
	- 하지만, HTTP를 사용했다. 왜!?
		- 입출금 결과를 알고 넘어가야 함 (필연적으로 동기방식으로 진행되어야 함)
	- 유저가 환전이 즉시 완료되기를 기대하기 때문에, Timeout을 명시적으로 구현하는 것이 기능으로서 필요하다.
- [10:29](https://www.youtube.com/watch?v=xpwRTu47fqY&t=629#t=10:29.30) 출금 취소는 메시징 방식
- [11:01](https://www.youtube.com/watch?v=xpwRTu47fqY&t=661#t=11:01.17) 에러 핸들링
	- 정말 실패했는지 입금/출금 결과를 확인해서 맞추어주는 방식을 사용하고 있음
	- 입출금 결과를 확인하는 것 자체가 실패한다면?
		- Kafka Message Scheduler를 이용해 메시지를 지연발행한다
		- 별도의 지연 토픽으로 발행
		- 지연시간만큼 기다린 후, 원래의 토픽에 메시지를 대신 발행하여 컨슈머가 지연시간 뒤에 메시지를 가져가도록 한다.
		- 이 때, 프로듀서와 컨슈머 모두 환전서버가 된다면 특정 작업을 뒤로 미루는 효과가 있다 (오...)
			- 입출금 계좌 서버에 회복할 시간을 줄 수 있다.
		- 즉시 재확인을 시도하는 것이 아니라, 30초 지연 후 재확인
			- 또 실패하면? Backoff를 더 줘서 같은 방식으로 진행
			- 정해진 횟수를 모두 추가하는 경우 개발자가 수동으로 메시지 재발행 가능
		- 환전 지연 이벤트를 발행하지도 못하고 서버가 죽는 경우?
			- 장비 결함 / Container OOM
			- 배치를 통해 재처리한다.
				- 출금이 성공하고 멈춰버린 환전의 경우, 배치가 출금취소 메시지를 발행한 후 환전을 실패처리한다.
- [14:15](https://www.youtube.com/watch?v=xpwRTu47fqY&t=855#t=14:15.38) Eventual Consistency
	- 원화계좌가 출금취소 메시지를 처리하다가 에러가 발생하면?
	- Consumer Dead Letter를 이용해 카프카 메시지의 결과적 정합성을 보장하고 있음
		- 원화계좌 서버가 출금취소를 처리하다가 에러가 발생하면 > CDL 브로커를 통해 Dead Letter Server로 전달
			- 이 DL은 서비스 메시지 브로커로 메시지를 다시 전달하여 원화 계좌에 출금취소를 재시도한다.
			- 계속 재시도에 실패하면 -> 수동으로 발행
- [14:57](https://www.youtube.com/watch?v=xpwRTu47fqY&t=898#t=14:57.90) Transactional Messaging
	- 입금 실패로 인한 환전 실패 처리와 출금 취소 메시지 발행은 항상 같이 이루어져야 한다.
	- 서비스 메시지 브로커 장애로 메시지 발행 자체가 안되면...?
		- Outbox 패턴 등..
		- 토스뱅크에서는 Producer Dead Letter를 이용
			- 환전 서버가 메시지 브로커 장애로 메시지 발행에 실패하면 PDL로 발행 -> DL
			- DL은 일정 시간 후 다시 원래, 서비스 메시지 브로커로 이벤트 전달
- [15:49](https://www.youtube.com/watch?v=xpwRTu47fqY&t=950#t=15:49.91) 모니터링?
	- Orchestration SAGA: State Machine
		- 각 트랜잭션 상태별 명령이 정해져 있기 때문에 State Machine으로 나타낸다.
		- Database에는 환율 / 환전 금액 / 환전 요청 등 Exchange Request라는 테이블에 스냅샷으로 저장된다.
		- 이 환전이 거쳐간 모든 상태를 확인하는 것이 가능하다.
	- 일정 시간이 흐른 후에도 끝나지 않은 환전을 탐지할 수 있다.
	- 계좌 서버들은 입출금의 쌍이 맞는지를 확인할 수 있다.
	- 원화/외화 계좌 데이터베이스에서 ETL을 통해 정보계로 전달 -> 쌍이 맞는지 지속적으로 탐지
- [17:32](https://www.youtube.com/watch?v=xpwRTu47fqY&t=1053#t=17:32.73) 성과
	- 또 다른 SAGA?: 회계 서버가 환전 트랜잭션의 참여자로 추가된다...! 2PC로 구현했다면 회계서버의 투표까지 기다렸어야 했을 것...!
		- 회계서버에 장애가 났을 때 의존성도 존재...!
	- 부족한 돈 자동환전 결제
	- TradeOFF?: 트랜잭션 구현의 복잡도 증가

---
> [!QUOTE] Note
> 

> [!EXAMPLE] References
> - 
