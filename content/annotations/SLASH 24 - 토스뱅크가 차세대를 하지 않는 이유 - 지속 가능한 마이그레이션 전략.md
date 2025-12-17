---
title: SLASH 24 - 토스뱅크가 차세대를 하지 않는 이유 - 지속 가능한 마이그레이션 전략
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-10-30
---
[Source](https://www.youtube.com/watch?v=LwH9h8dG3PQ&list=PL1DJtS1Hv1PiGXmgruP1_gM2TSvQiOsFL&index=8)

- `차세대 프로젝트`?: 대규모 시스템을 개편하는 큰 프로젝트
	- 기술부채를 해결하는 주요한 수단
	- Waterfall 방법론을 기반으로 하기 때문에 유연성이 부족하고, 리스크가 크다.
- [01:02](https://www.youtube.com/watch?v=LwH9h8dG3PQ&t=63#t=01:02.55) 실제로는 어떻게 진행되는가...?
	- 프로젝트 도중 추가 요구사항 / 테스트 복잡도 증가 / 품질 및 완성도 저하 (중간에 들어온 요구사항은 충분한 시간을 갖고 개발하지 못함)
	- 은행의 신뢰도에 큰 리스크
- [01:41](https://www.youtube.com/watch?v=LwH9h8dG3PQ&t=102#t=01:41.87) 안전하게 어떻게 전환할것인가?
	- Strangler Fig Pattern
		- 점진적으로 새로운 시스템으로 대체하는 전략
		- 현재의 Monolithic 구조
			- Microservice#1 / Microservice#2 등으로 기능들을 하나씩 분리
			- 모든 기능을 Microservicc로 전환하여 MSA로 바꾸는 것이 목표
	- 기존 시스템은
		- 낮은 응집도
		- 높은 결합도
- [02:52](https://www.youtube.com/watch?v=LwH9h8dG3PQ&t=172#t=02:52.41) 기존 시스템의 구현체를 Use Case 단위로 구현하여 유지보수성 / 확장성 개선
- [03:08](https://www.youtube.com/watch?v=LwH9h8dG3PQ&t=188#t=03:08.37) Migration Cycle
	- `대상 선정`
		- 조직의 특성 별로 어떤 것부터 마이그레이션할 것인지 달라질 수 있다 (선택의 문제)
		- 핵심도메인일수록 사이드이펙트가 크기 때문에, 순차적으로 전환하는데 신중을 기해야 한다.
			- 가장 간단한 납입일 변경 Use Case부터...
	- `분석`
		- 연역적 분석
			- 도메인 분석 + 대전제 설정
		- 귀납적 분석
			- 구체적인 사례나 데이터를 통해 원칙 및 이론을 도출
			- 기존 시스템 분석에 사용
		- 정적 분석: 함수 호출 그래프 분석
		- 동적 분석: 카프카를 통해 메서드 별 I/O 데이터 분석
			- 이걸 또 테스트 데이터셋에도 활용 <- 매우 인상적이다.
	- `설계`
		- 분석 결과를 바탕으로 한 설계를 문서화
		- I/O 정의 + 클래스 다이어그램 작성 + 테스트 케이스 및 시나리오 도출
	- `구현`
		- [07:45](https://www.youtube.com/watch?v=LwH9h8dG3PQ&t=466#t=07:45.59) String으로 표현되어 있던 데이터들에 대한 모델을 구현하고 별도로 캡슐화를 적용하여 각 도메인 로직을 독립적으로 관리
	- `테스트 케이스 작성`
	- `단위 테스트 구현`
- [08:13](https://www.youtube.com/watch?v=LwH9h8dG3PQ&t=494#t=08:13.57) 높은 테스트 커버리지를 유지하고 있음 (90% 이상)
- 핵심은? **도메인 문서화**
	- Migration이 1회성 작업이 아니라 지속적으로 관리되고 유지해야 하기 때문이다.
	- 새로운 사람이 빠르게 업무를 파악하고 최적화된 로직을 유지할 수 있도록 돕는 역할
- 문서화는 어떻게 효과적으로 할까?
	- 글 뿐만 아니라, Diagram / 시각적인 표현을 많이 활용하는 것이 좋다.
- 혼자 가면 빨리 가지만, 함께 가면 더 멀리 간다.
	- 다양한 시각이 모일수록 더 창의적이고 효과적인 해결책이 나온다 :)
- [10:31](https://www.youtube.com/watch?v=LwH9h8dG3PQ&t=631#t=10:31.34) 구현/검증/리팩토링 과정
	- "버그가 아니라 기능입니다"
	- 단일 모듈의 버그가 영향을 미칠 수 있는 다른 수많은 모듈들 :( 부수효과가 존재한다. -> 이러면 기능이지 뭐...
	- 기존 로직과 100% 동일한 출력값을 반환해야 부수효과를 막을 수 있다.
	- 연관된 모듈을 모두 분할정복하는 것이 필요하다.
		- [12:14](https://www.youtube.com/watch?v=LwH9h8dG3PQ&t=734#t=12:14.13) Composite Pattern
			- Leaf / Composite 클래스 모두 같은 객체로 취급할 수 있게 만드는 패턴
	- 검증? Redis를 기반으로 각 구현체들에서 병렬실행하고 그 결과들을 비교 -> 이벤트 발행

---
> [!QUOTE] Note
> - 

> [!EXAMPLE] References
> - 
