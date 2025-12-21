---
title: equals() and hashCode() with Hash-based Collections
description:
draft: false
tags:
  - concept
aliases:
permalink:
date: 2025-12-21
---
`equals(Object obj)`: Indicates whether some other object is "equal to" this one.
- Null이 아닌 객체에 대해 논리적 동일성을 판단하기 위해 존재하는 인터페이스
- 이 메서드를 구현할 때에는 지켜야 할 규칙이 있다.
	- 반사성 (Reflexive)
	- 대칭성 (Symmetric)
	- 추이성 (Transitive)
	- 일관성 (Consistent)
	- Null이 아닌 참조 객체가 비교의 대상으로 주어지면 항상 False를 반환해야 한다.
- 위 규칙들을 지키지 않으면 기본적으로 제공되는 다른 자바 구현체들에 의해 오동작할 수 있다.

`hashCode()`: Returns a hash code value for the object.
- Hash 기반의 컬렉션에서 주로 데이터가 들어갈 버킷을 결정하기 위한 Hash 값을 제공하기 위한 인터페이스
- 예를 들어 어떤 특정 사용자 정의 클래스 객체가 HashMap 자료구조의 키에 대한 타입으로 사용된다면, equals() 뿐만 아니라 hashCode() 또한 오버라이딩해야한다.
- hashCode()가 반환하는 해시 값이 32비트 정수 범위 내에서 고루 분포될수록 Hash 기반 컬렉션에서 효율이 좋다.
	- 왜 32비트 정수범위 내인가? -> hashCode()의 반환 타입이 `int`이기 때문에...! 모든 구현이 이를 기준으로 최적화되어 있다.
- equals() 비교에 사용되지 않은 필드는 제외되어야 한다.
- Objects 클래스는 임의의 갯수만큼 객체를 받아 해시코드를 계산해주는 Static 메서드인 `hash`를 제공하지만, 속도가 느려서 성능이 중요하다면 사용하지 않는 것이 좋다.
	- 입력 인수를 담기 위한 배열 + Boxing / Unboxing 과정이 수반되기 때문

HashMap은 특별한 경우가 아니라면 기본적으로 아래의 구조를 갖는다 (특별한 경우? 캐시 충돌이 많이 일어나서 Tree화되어야 하는 경우)

```
HashMap (capacity=16, index 0~15)

[index 0] null
[index 1] ┌─ Node(key="FB", value="1") ──┐
          │ hash=960, equals 확인 후 매치 │ ← get("FB") 경로
          └─ Node(key="Ea", value="2") ──┘
[index 2] null
...
[index 7] ┌─ Node(key="Apple", value="과일") ──┐  ← 충돌 예시
          │ hash=980, equals("Apple") true    │
          └─ Node(key="maple", value="단풍") ──┘  ← hash=980 충돌
... (나머지 null 또는 다른 버킷)

```
- 배열은 기본적으로 16의 크기를 가지며, 필요할 때마다 2배씩 확장된다.
- 버킷은 인덱스에 의해 가리켜진 공간을 의미하며, 주로 hashCode % Length (Capacity)로 계산된다 
- 엔트리(Node)? 버킷 내 연결 리스트의 각 노드
- 기본적으로 충돌이 없어서 모든 버킷에 요소가 각각 하나만 들어가 있다면 O(1)의 읽기 성능이지만, 한 버킷 내에 데이터가 몰리는 경우 O(N)까지도 가능 (연결 리스트를 선형으로 순회해야 하므로)
	- 버킷에 요소가 두 개 이상 담기는 경우를 해시 충돌이라 부를 수 있다.
		- 이 해시 충돌은 hashCode()의 값이 동일한 경우를 뜻하는게 아니라, hashCode()의 값을 이용해서 버킷을 결정할 때 동일한 버킷에 데이터가 배치되는 경우를 말한다.
	- 연결 리스트를 선형으로 순회할 때 요소를 찾아 반환하기 위해서 equals()를 사용해서 찾고자 하는 요소를 찾는다 (Key로 사용된 타입의 equals()를 호출한다는 뜻)

> [!INFO]- equals()와 hashCode()를 오버라이딩하지 않을때의 기본 동작
> - equals(): 완전히 같은 인스턴스인 경우에만 True 반환
> - hashCode(): 메모리 주소를 기반으로 Hash 값 반환. 즉 마찬가지로 다른 객체라면 다른 hashCode() 값을 반환



---
> [!QUOTE] Note
> 

> [!EXAMPLE] References
> - [[Effective Java#아이템 10 equals는 일반 규약을 지켜 재정의하라]]
> - [[Understanding Hashing and Collisions in Java Collections - The Role of hashCode() and equals()]]
