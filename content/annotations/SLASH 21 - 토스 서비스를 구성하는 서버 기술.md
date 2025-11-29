---
title: SLASH 21 - 토스 서비스를 구성하는 서버 기술
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-10-30
---
[Source](https://www.youtube.com/watch?v=YBXFRSAXScs)

[00:52](https://www.youtube.com/watch?v=YBXFRSAXScs&t=52#t=00:52.20) 토스 서비스를 구성하는 서버 기술들 + 2개의 데이터 센터를 활용한 서비스 운영

[01:21](https://www.youtube.com/watch?v=YBXFRSAXScs&t=82#t=01:21.60) 데이터센터 이중화 / Active-Active 서비스 운영 + AWS의 일부 서비스 이용
- 여러 컴포넌트에서 발생하는 운영 이슈에 대한 대응?
- MSA 구성이 되어 있어 많은 서비스가 뜨게 됨
	- 효율적인 활용을 위해 K8S + Calico CNI / Service Mesh를 위해서는 Istio를 사용 중
	- 민감정보 저장을 위해서는 Ceph > 내부 스토리지 서비스 제공
	- 캐시는? Memcached -> 데이터 보존 문제 + Optimistic Lock 구현 편의성 때문에 -> Redis Cluster
	- 카프카는 로그 데이터 파이프라인으로 사용하는 로그용 클러스터 하나, 서비스에서 메시지 큐를 사용하는 클러스터 하나
		- ELK + Filebeat + Thanos + Grafana
- 송금 외에 많은 서비스?
	- 송금 이후 채팅하는 채팅서비스 / 알림을 받는 등 외부 연동이 많은 서비스 / 홈탭 / 내 소비와 같이 여러 서비스의 데이터를 통합해서 보여주는 서비스 등...
	- 스프링을 기반으로 설계한다.
		- 예전에는 Java -> 최근은 Kotlin
	- AWS는 DNS 설정 / 이미지 검수 / 정적 파일 서빙 등을 위해 사용

[03:23](https://www.youtube.com/watch?v=YBXFRSAXScs&t=204#t=03:23.71) 이중화 구조
- 평상시 트래픽: 50:50이지만, 한 쪽을 100%으로 트래픽을 받도록 하는 경우도 있음
	- 장애가 났을 때 문제 해결을 빠르게 하기 위해, 복구 중심 대응. 장애가 나면 반대편 클러스터로 트래픽 이전
	- 장애 여파를 줄이기 위해 트래픽을 한쪽으로 옮긴 후 설정 변경 후, 1% 원복 (Canary)
		- 문제가 없다면 점진적으로 늘려간다...!
	- 트래픽은 L7과 Route53 두 군데에서 틀 수 있다.
		- L7 > 모든 트래픽이 곧바로 옮겨짐
		- Route53 > 변경사항이 다른 라우터에 전파된 후에 반영되어 시간이 오래 걸림

[05:26](https://www.youtube.com/watch?v=YBXFRSAXScs&t=326#t=05:26.15) DC/OS -> Kubernetes로 이동하게 됨 (19년도)
- 서비스 디스커버리로 쓰던 VAMP의 한계가 있었음
- Istio를 K8S와 함께 도입
	- 서킷브레이커 / 재시도 / Fallback 등을 애플리케이션에서 처리했었음
	- Istio를 도입하면 Istio-proxy가 Sidecar 형태로 붙어서 애플리케이션에서 하는 일에서 대신함
	- 인프라 차원에서 한번에 해결해줌
	- MSA는 외부 > 내부로 오는 요청보다 내부 서비스간의 요청이 많다는 특징이 있다.
- Istio는 Sidecar로 서비스에 붙어 실행되고, Iptable을 통해 모든 트래픽을 제어한다.
- Isto Proxy? Envoy Proxy를 Istio에서 래핑한 것
	- Envoy Proxy는 많은 통계정보를 제공한다.
	- 이를 송/수신측에서 모두 보면 어느 쪽이 문제인지 파악하기 쉬워졌다.
- 서킷브레이커는 호스트별 설정이라 세부 설정이 힘들었음
- 재시도도 API의 트랜잭션 처리 / 응답값에 따라 재시도 여부가 달라질 때가 있다. 이런 세부 설정은 여전히 애플리케이션에서 처리하고 있다.
	- 대신 mTLS 설정을 통해 A->B 호출 / C->B 호출은 안됨 등의 서비스 별 권한을 적용하거나, Envoy Filter로 앱 변경 없이 다이나믹하게 네트워크 기능을 추가할 수 있다는 장점이 있다.
	- 10개중 1개만 나가도 10%나 된다 (카나리가 부담된다.)
	- 인스턴스 관계없이 트래픽 1%만 카나리를 할 수 있다 
[10:22](https://www.youtube.com/watch?v=YBXFRSAXScs&t=623#t=10:22.61) Failure Injection Test / Squeeze Test

[10:55](https://www.youtube.com/watch?v=YBXFRSAXScs&t=656#t=10:55.56) API Gateway
Zuul / Kong / Spring Cloud Gateway 중 Spring Cloud Gateway 선택
- WebFlux를 사용하면서 성능이 검증되었음
- Routing은 정적/동적으로 모두 추가할 수 있지만, 대부분 정적으로 추가함
- Spring의 내부 코드는 Reactor이지만, 유지보수의 편리성을 위해 코루틴을 사용중이다.
- 게이트웨이의 수도 많아졌다.
	- 공통 로직은...? 각 팀의 PR을 받아 Platform 팀에서 승인하는 구조 > 공통로직은 모듈화

[12:44](https://www.youtube.com/watch?v=YBXFRSAXScs&t=764#t=12:44.36) MVC가 많지만 / 홈탭이나 내 소비와 같이 여러 데이터를 모아 보아주는 I/O 중심 프로젝트는 웹플럭스 이용
- Spring에서 Kotlin DSL을 잘 지원 + R2DBC를 많이 사용하면서 웹플럭스가 더 자주 쓰이게 되었다.
- 웹플럭스를 Reactor 기반 / 코루틴 기반 둘 중 선택할 수 있다
	- Reactor를 쓰면 Operator를 써야만 함
		- 러닝 커브가 높음...
	- 코루틴은 Direct Style로 개발을 할 수 있다.


[13:51](https://www.youtube.com/watch?v=YBXFRSAXScs&t=831#t=13:51.14) 모니터링은 오픈소스를 많이 이용
- APM으로는 Pinpoint를 많이 사용
- 5년 이상 장기보관이 필요한 데이터? Kafka > Hadoop으로 저장. 이중화가 되어 있다.
- Metric은 쿠버네티스와 잘 맞는 프로메테우스, HA + 데이터 장기 보관을 위해서 Thanos 사용
- MySQL도 이중화가 되어 있다.

[16:09](https://www.youtube.com/watch?v=YBXFRSAXScs&t=969#t=16:09.26) 알림은 Sentry로 개별 서비스에서 설정 + ES Log를 활용하는 프로젝트를 별도로 만들어 사용
- 특정 로그가 많아지면 Slack으로 알림을 주고 있다.
- Flink를 통해서 서비스 응답을 파싱해서 응답시간이 튀거나 실패율이 높아진 경우에도 알림을 보내고 있다. 

[16:56](https://www.youtube.com/watch?v=YBXFRSAXScs&t=1017#t=16:56.57) 카프카 운영
- 자체적으로 HA 기능이 있으니 하나의 클러스터로 두 개의 데이터 센터를 묶을 것인지, 각각 구성하고 레플리케이션을 걸지...?
	- 후자로 진행하게 됨
- Active Standby인 컨슈머가 다른 데이터 센터로 Active하게 넘어갈 때 오프셋이 달라서 어디서부터 읽을지 모른다...!
- 두 클러스터 간 Sync App이 필요하다: Wakuwaku
- Producer: Active-Active
- Consumer: Active-Standby. 평상시 한쪽 데이터 센터의 카프카 클러스터를 바라보다가, 장애 시 반대편 카프카를 바라보도록 변경하여 장애에 대응한다.
	- 토픽 별 Consumer retry + Dead Letter Queue를 본떠서 Toss에서도 Spring Kafka를 래핑해 구현하였다.
	- Decaton이랑 비슷하네...! Requeue를 언제할지도 중요하다.
	- 그냥 토픽을 재시도 토픽을 별도로 가져간다.
- Producer: Kafka A로 실패할 경우 B로 보내서 재시도
	- 자동으로 Requeue -> 이것도 실패하는 경우 Dead Letter Queue -> 수동 배치로 Requeue
	- 메시지 발행은 DB 처리 후 이벤트 발행 용으로 사용
	- 완벽한 Transaction 처리가 필요한 경우 > Outbox 패턴을 활용해서 동일 트랜잭션 처리 후 + Retry를 통해 전송한다.


[20:19](https://www.youtube.com/watch?v=YBXFRSAXScs&t=1219#t=20:19.49) Redis
- 현재 데이터 센터가 2개밖에 없어서 2 + 1로 구성 / 네트워크가 끊기는 경우 양쪽 다 마스터가 될 수 있다 (Split Brain)
	- 인프라 이중화로 대응 / 세번째 데이터센터도 준비중
- 메모리 증가가 필요한 경우 Slot Rebalance로 대응 / AWS에서는 분산 Lock으로 Redlock을 구현해 이용중
- Redis Client?
	- Redisson / Jedis / Lettuce
	- Webflux + MVC 공통으로 쓸 수 있으면서 스프링에서 잘 지원해주는 Lettuce 사용


---
> [!QUOTE] Keywords
> - Outbox Pattern
> - Redlock
> - Slot Rebalance
> - WebFlux: Reactor vs. Coroutine
> - Isto
> - mTLS
> - ...

> [!EXAMPLE] References
> - 
