---
title: You Cannot Have Exactly-Once Delivery
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-10-10
---
[Source](https://bravenewgeek.com/you-cannot-have-exactly-once-delivery/) 
# You Cannot Have Exactly-Once Delivery
---
**p.** "As I’ve [described in the past](https://www.slideshare.net/slideshow/from-mainframe-to-microservice-an-introduction-to-distributed-systems-41004778/41004778#23), distributed systems are all about trade-offs."



> [!QUOTE] 분산시스템이 가질 수 밖에 없는 필연적인 Trade-off에 대하여...

**p.** "There are essentially three types of delivery semantics: at-most-once, at-least-once, and exactly-once."



> [!QUOTE] 전달 메커니즘의 대표적인 3가지
> - at-most-once
> - at-least-once
> - exactly-once

**p.** "the first two are feasible and widely used."

**p.** "why is exactly-once delivery impossible? The answer lies in the Two Generals thought experiment or the more generalized Byzantine Generals Problem, which I’ve [looked at extensively](https://bravenewgeek.com/understanding-consensus/)."

**p.** "We must also consider the [FLP result](https://groups.csail.mit.edu/tds/papers/Lynch/jacm85.pdf), which basically says, given the possibility of a faulty process, it’s impossible for a system of processes to agree on a decision."



> [!QUOTE] 정확히 한번만이라는 보장은 비잔틴 장군 문제의 불확실성 / FLP Result에서의 합의의 불가능성에 의해 원천적으로 깨질 수 밖에 없다.

**p.** "In a distributed system, we try to guarantee the delivery of a message by waiting for an acknowledgement that it was received, but all sorts of things can go wrong."

**p.** "This coordination, of course, comes at a cost (latency and availability), while still relying on at-least-once semantics. Zab, the atomic broadcast protocol which lays the foundation for ZooKeeper, enforces idempotent operations."



> [!QUOTE] 메시지가 신뢰성 있게 순서대로 전달되려면 강한 조정(Coordination)이 필요하고, 이를 위해서는 Latency / Availability에서의 비용이 수반된다. 결국에는 최소 한번 전달을 기본으로 하고, 멱등성에 기반하여 여러 번 처리되더라도 이상이 없도록 한다 (Zookeeper의 원자적 브로드캐스트 프로토콜인 Zab이 그 예시)

**p.** "as long as the application order is consistent with the delivery order."



> [!QUOTE] 전달 순서와 처리 순서는 동일하다는 것이 멱등성이 보장될 수 있는 필요조건이라고 해석할 수 있나?

**p.** "if the receiver crashes before or during its processing, that data is lost forever."

**p.** "If there are multiple workers processing tasks or the work queues are replicated, the broker must be strongly consistent (or CP in CAP theorem parlance) so as to ensure a task is not delivered to any other workers once it’s been acked."



> [!QUOTE] At-most-once 구현을 위해서는 더 상황이 복잡한데, 여러 Worker가 동시에 작업을 처리하거나 작업 큐가 복제된 환경이라면, CAP 이론에서의 CP가 강하게 보장되어야 한다. 즉 한 번 Ack가 발생한 작업은 다른 Worker에게 전달되지 않음이 보장되어야 한다.

수신자가 메시지 처리 전에 Ack을 보내면 송신자는 데이터가 안전하게 처리되었다고 믿지만, 실제로 수신자가 그 이후 장애가 나면 메시지가 유실될 수 있다는 점도 짚고 있다.

**p.** "On the other hand, we can acknowledge messages after they are processed. If the process crashes after handling a message but before acking (or the ack isn’t delivered), the sender will redeliver. Hello, at-least-once delivery."



> [!QUOTE] 반면 메시지 처리 후 Ack을 보내는 방식에서 메시지 처리 직후 프로세스가 종료된다면 Ack가 전달되지 않아 송신자는 재전송하게 될 것 > 이것이 At-least-once라고 볼 수 있다.

**p.** "If it claims exactly-once, it’s because they are lying to your face in hopes that you will buy it or they themselves do not understand distributed systems."



> [!QUOTE] 정확히 한 번만 전송한다는 것은 거짓에 가깝다

**p.** "The way we achieve exactly-once delivery in practice is by faking it."



> [!QUOTE] 실제로는 정확히 한 번 전송한다는 것은 불가능하기에, 멱등성이나 중복 제거를 통해 그렇게 보이게 만드는 것이 그나마 현실적이다. 메시지의 순서가 무관하면 더 좋다.

**p.** "it mostly requires a change in the way we think about state. This is best described by revisiting the replicated state machine."



> [!QUOTE] 특정 연산을 노드에 전달해서 상태를 직접 바꾸기보다, 상태를 어떻게 바꿀지가 아닌, 각 시점의 상태 변화(사실)만 분배하여 중복전송에 의한 일관성이 깨지는 것을 방지할 수 있다. 사고방식의 전환 자체가 필요하다 (분산 시스템에서 멱등성과 신뢰성을 확보하기 위해)

**p.** "It’s usually causal ordering that we’re after anyway. People who say otherwise don’t quite realize that there is no now in a distributed system."



> [!QUOTE] 친구에게 경로 안내 메시지를 일일이 보내기보다, 자신이 어디에 있는지를 보내주고 알아서 찾아오게 하는 것...! 대부분의 경우 인과적인 순서가 요구되기에 이것만 만족시키면 된다.

**p.** "no such thing as exactly-once delivery. We must choose between the lesser of two evils, which is at-least-once delivery in most cases."

**p.** "There is asynchrony abound, which means you cannot expect synchronous, guaranteed behavior."



> [!QUOTE] 분산 시스템은 본질적으로 비동기적이며, 실패와 불확실성에 대비한 설계가 필수적이다. "정확히 한 번" 전달은 이론적으로 불가능하므로, 주로 최소 한번 이상 전달을 목표로 하면서 멱등성 / 부작용 제거를 고려해야 한다.


