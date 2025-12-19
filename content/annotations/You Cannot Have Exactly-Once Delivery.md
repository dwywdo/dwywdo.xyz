---
title: You Cannot Have Exactly-Once Delivery
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-12-18
---
[Source](https://bravenewgeek.com/you-cannot-have-exactly-once-delivery/) 
# You Cannot Have Exactly-Once Delivery
---

<font color="#5EA33E"><strong>p.</strong> "Within the context of a distributed system, you cannot have exactly-once message delivery."</font>


<font color="#49BEFC"><strong>p.</strong> "As I’ve [described in the past](https://www.slideshare.net/slideshow/from-mainframe-to-microservice-an-introduction-to-distributed-systems-41004778/41004778#23), distributed systems are all about trade-offs."</font>



> [!QUOTE] 분산시스템이 가질 수 밖에 없는 필연적인 Trade-off에 대하여...


<font color="#5EA33E"><strong>p.</strong> "There are essentially three types of delivery semantics: at-most-once, at-least-once, and exactly-once."</font>



> [!QUOTE] 전달 메커니즘의 대표적인 3가지
> - at-most-once (최대 1번 전송)
> - at-least-once (최소 1번 전송)
> - exactly-once (정확히 1번 전송)


**p.** "the first two are feasible and widely used."



> [!QUOTE] 일반적으로 최대 1번 전송 / 최소 1번 전송은 구현 가능하다고 간주되어 널리 쓰이고 있지만...


<font color="#EF7DFA"><strong>p.</strong> "at-least-once delivery is also impossible because, technically speaking, network partitions are not strictly time-bound. If the connection from you to the server is interrupted indefinitely, you can’t deliver anything."</font>



> [!QUOTE] 최소 1번 전송 또한 이론적으로는 불가능하다고 할 수 있다 (항상 네트워크 파티션이 특정 시간 내에 복구된다고 안심하고 가정할 수는 없기 때문에... 종국에는 아예 못 보낼 수도 있다). 하지만 지금은 일단 특정 시간 내에 복구가 가능하다고 하고 최소 1번 전송 또한 구현 가능한 옵션이라고 생각하자.


<font color="#5EA33E"><strong>p.</strong> "The answer lies in the Two Generals thought experiment or the more generalized Byzantine Generals Problem, which I’ve [looked at extensively.](https://bravenewgeek.com/understanding-consensus/)"</font>



> [!QUOTE] 정확히 한번만 전송하는 것은 왜 불가능하다고 하는 것일까? 그 답은 두 장군에 대한 사고실험 혹은 더 일반화된 비잔티움 장군 문제로부터 도출해낼 수 있다.


**p.** "We must also consider the [FLP result](https://groups.csail.mit.edu/tds/papers/Lynch/jacm85.pdf), which basically says, given the possibility of a faulty process, it’s impossible for a system of processes to agree on a decision."


**p.** "In a distributed system, we try to guarantee the delivery of a message by waiting for an acknowledgement that it was received, but all sorts of things can go wrong."



> [!QUOTE] 분산시스템에서 우리는 메시지의 전달 성공 여부를 ACK을 기다림으로서 보장하려고 하지만... 이론적으로 얼마든지 문제가 생길 수 있다. 메시지가 중간에 유실되었는가? ACK이 유실되었는가? 수신자가 다운되었는가? 아니면 그냥 느릴 뿐인가? 네트워크 자체가 느린 상태인가? 내(전송자)가 느린가?...


**p.** "People often bend the meaning of “delivery” in order to make their system fit the semantics of exactly-once, or in other cases, the term is overloaded to mean something entirely different."



> [!QUOTE] 사람들은 `전달`의 의미를 약간 비틀어서 "정확히 한번 전송"한다는 표현을 오용하는 경우가 있습니다.


**p.** "This coordination, of course, comes at a cost (latency and availability), while still relying on at-least-once semantics. Zab, the atomic broadcast protocol which lays the foundation for ZooKeeper, enforces idempotent operations."



> [!QUOTE] 메시지가 신뢰성 있게 순서대로 전달되려면 강한 조정(Coordination)이 필요하고, 이를 위해서는 Latency / Availability에서의 비용이 수반된다. 결국에는 최소 한번 전달을 기본으로 하고, 멱등성에 기반하여 여러 번 처리되더라도 이상이 없도록 한다 (Zookeeper의 원자적 브로드캐스트 프로토콜인 Zab이 그 예시)


**p.** "as long as the application order is consistent with the delivery order."



> [!QUOTE] 전달 순서와 처리 순서는 동일하다는 것이 멱등성이 보장될 수 있는 필요조건이라고 해석할 수 있나? YES


<font color="#5EA33E"><strong>p.</strong> "Consequently, guaranteeing at-least once semantics is sufficient and simplifies the implementation."</font>



> [!QUOTE] 결과적으로 여전히 "최소한 한번 전송" + 멱등성의 조합에 의존하고 있다 > 구현이 단순화되기 때문...!


<font color="#5EA33E"><strong>p.</strong> "When a message is delivered, it’s acknowledged immediately before processing. The sender receives the ack and calls it a day. However, if the receiver crashes before or during its processing, that data is lost forever."</font>



> [!QUOTE] 메시지가 전달되었을 때 그 메시지를 처리하기 전에 ACK을 보낸다면 송신자는 ACK을 받고 끝낼 것이다. 하지만 ACK을 받았다하더라도 그 이후의 데이터 처리에서 문제가 발생했다면 데이터는 영원히 유실된다. 이게 바로 "최대 한번 전송"의 뒷편에서 벌어지는 일이며 상황에 따라서는 더 복잡해질 수도 있다.


**p.** "If there are multiple workers processing tasks or the work queues are replicated, the broker must be strongly consistent (or CP in CAP theorem parlance) so as to ensure a task is not delivered to any other workers once it’s been acked."



> [!QUOTE] 만약 여러 Worker가 동시에 작업을 처리하거나 작업 큐가 복제된 환경이라면, CAP 이론에서의 CP가 강하게 보장되어야 한다. 즉 한 번 Ack가 발생한 작업은 다른 Worker에게 전달되지 않음이 보장되어야 한다.

수신자가 메시지 처리 전에 Ack을 보내면 송신자는 데이터가 안전하게 처리되었다고 믿지만, 실제로 수신자가 그 이후 장애가 나면 메시지가 유실될 수 있다는 점도 짚고 있다.


**p.** "On the other hand, we can acknowledge messages after they are processed. If the process crashes after handling a message but before acking (or the ack isn’t delivered), the sender will redeliver. Hello, at-least-once delivery."



> [!QUOTE] 반면 메시지 처리 후 Ack을 보내는 방식이라면 메시지 처리 직후 프로세스가 종료되는 경우 Ack가 전달되지 않아 송신자는 재전송하게 될 것 > 이것이 At-least-once (최소 한번 전송)라고 볼 수 있다.


<font color="#EF7DFA"><strong>p.</strong> "Every major message queue in existence which provides any guarantees will market itself as at-least-once delivery. If it claims exactly-once, it’s because they are lying to your face in hopes that you will buy it or they themselves do not understand distributed systems. Either way, it’s not a good indicator."</font>



> [!QUOTE] 현존하는 메시지 큐 시스템들은 결국 "최소 한번 전달"을 보장한다는 점을 강조하며, "정확히 한번 전달"을 강조한다면 거짓말일 가능성이 높다.


**p.** "The way we achieve exactly-once delivery in practice is by faking it."



> [!QUOTE] 실제로는 정확히 한 번 전송한다는 것은 불가능하기에, 멱등성이나 중복 제거를 통해 그렇게 보이게 만드는 것이 그나마 현실적이다. 메시지의 순서가 무관하면 더 좋다.


**p.** "it mostly requires a change in the way we think about state. This is best described by revisiting the replicated state machine."



> [!QUOTE] 특정 연산을 노드에 전달해서 상태를 직접 바꾸기보다, 상태를 어떻게 바꿀지가 아닌, 각 시점의 상태 변화(사실)만 분배하여 중복전송에 의한 일관성이 깨지는 것을 방지할 수 있다. 사고방식의 전환 자체가 필요하다 (분산 시스템에서 멱등성과 신뢰성을 확보하기 위해)


<font color="#49BEFC"><strong>p.</strong> "Imagine we want to tell a friend to come pick us up."</font>



> [!QUOTE] 친구에게 데리러 오라고 문자 메시지를 보낸다고 가정해보자. 길 안내가 남긴 문자메시지를 여러개 (단계별로) 보냈는데, 그 중 하나가 두 번 전송되었다고 한다면 (위의 최소 한번 전송에 의해). 친구는 위험한 동네에 도착해서 당황할 수 있다. 이 경우 차라리 내가 어디있는지 알려주고 알아서 찾아오도록 하는 것이 낫다.


**p.** "It’s usually causal ordering that we’re after anyway. People who say otherwise don’t quite realize that there is no now in a distributed system."



> [!QUOTE] 친구에게 경로 안내 메시지를 일일이 보내기보다, 자신이 어디에 있는지를 보내주고 알아서 찾아오게 하는 것...! 대부분의 경우 인과적인 순서가 요구되기에 이것만 만족시키면 된다.


**p.** "no such thing as exactly-once delivery. We must choose between the lesser of two evils, which is at-least-once delivery in most cases."


**p.** "There is asynchrony abound, which means you cannot expect synchronous, guaranteed behavior."



> [!QUOTE] 분산 시스템은 본질적으로 비동기적이며, 실패와 불확실성에 대비한 설계가 필수적이다. "정확히 한 번" 전달은 이론적으로 불가능하므로, 주로 최소 한번 이상 전달을 목표로 하면서 멱등성 / 부작용 제거를 고려해야 한다.


