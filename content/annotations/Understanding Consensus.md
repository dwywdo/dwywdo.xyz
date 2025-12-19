---
title: Understanding Consensus
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2025-12-19
---
[Source](https://bravenewgeek.com/understanding-consensus/) 
# Understanding Consensus
---

<font color="#5EA33E"><strong>p.</strong> "A classical problem presented within the field of distributed systems is the [Byzantine Generals Problem](https://en.wikipedia.org/wiki/Two_Generals&#39;_Problem)."</font>


**p.** "In order to come to an agreement on when to attack, messengers must be sent through the valley, risking capture by the city’s patrols."


<font color="#EF7DFA"><strong>p.</strong> "In fact, we can’t reliably make a decision. It’s provenly impossible. In the face of a [Byzantine failure](https://en.wikipedia.org/wiki/Byzantine_fault), it becomes even more complicated by the possibility of traitors or forged messages."</font>


<font color="#5EA33E"><strong>p.</strong> "Consensus is the basis of distributed coordination services, locking protocols, and databases."</font>


**p.** "A monolithic system (think a MySQL server) can enforce ACID constraints with consistent reads but exhibits generally poor availability and fault tolerance."


**p.** "There are a number of solutions to distributed consensus, but most of them tend to be pretty characteristic of each other."

 
## Two-Phase Commit
---

<font color="#5EA33E"><strong>p.</strong> "Two-phase commit (2PC) is the simplest multi-phase commit protocol."</font>


**p.** "When the coordinator receives a request, it asks each of its cohorts to vote yes or no. During this phase, each cohort performs the transaction up to the point of committing it."


<font color="#EF7DFA"><strong>p.</strong> "Two-phase commit is a blocking protocol."</font>


**p.** "The coordinator blocks waiting for votes from its cohorts, and cohorts block waiting for a commit/rollback message from the coordinator."


<font color="#EF7DFA"><strong>p.</strong> "&lt;b&gt;A deadlock&lt;/b&gt;, e.g. the coordinator dies while cohorts wait or a cohort dies while the coordinator waits."</font>

 
## Three-Phase Commit
---

<font color="#5EA33E"><strong>p.</strong> "Three-phase commit (3PC) is designed to solve the problems identified in two-phase by implementing a non-blocking protocol with an added “prepare” phase."</font>


**p.** "Unlike 2PC, cohorts do not execute a transaction during the voting phase. Rather, they simply indicate if they are prepared to perform the transaction."



> [!QUOTE] In "Vote" phase, IF cohorts timeout / OR one more "NO" vote, the transaction is ABORTED. If all votes are "YES", the coordinator moves on to the "prepare" phase


<font color="#5EA33E"><strong>p.</strong> "At this point, if the commit message from the coordinator is not received in the third phase, the cohort will go ahead and commit anyway."</font>



> [!QUOTE] Coordinator로부터 Commit Message가 오지 않더라도 Cohorts는 커밋을 수행한다? -> 이로서 데드락 문제를 해결할 수 있다고는 한다 (Non-blocking으로 동작하므로)


<font color="#EF7DFA"><strong>p.</strong> "However, 3PC is still susceptible to network partitions. If a partition occurs, the coordinator will timeout and progress will not be made."</font>

 
## State Replication
---

<font color="#5EA33E"><strong>p.</strong> "Protocols like Raft, Paxos, and Zab are popular and widely used solutions to the problem of distributed consensus."</font>


**p.** "These implement state replication or primary-backup using leaders, quorums, and replicas of operation logs or incremental delta states."


**p.** "These protocols work by electing a leader (coordinator)."


**p.** "Changes occur by appending a log entry, and each node has its own log replica."


<font color="#5EA33E"><strong>p.</strong> "Where multi-phase commit falls down in the face of network partitions, these protocols are able to continue working by relying on a quorum (majority)."</font>


<font color="#5EA33E"><strong>p.</strong> "The use of quorums provide partition tolerance by fencing minority partitions while the majority continues to operate."</font>


**p.** "This is the pessimistic approach to solving split-brain, so it comes with an inherent availability trade-off."



> [!QUOTE] ?


<font color="#49BEFC"><strong>p.</strong> "Google relies on Paxos for its high-replication datastore in App Engine as well as its Chubby lock service."</font>


<font color="#49BEFC"><strong>p.</strong> "The distributed key-value store etcd uses Raft to manage highly available replicated logs."</font>


<font color="#49BEFC"><strong>p.</strong> "Zab, which differentiates itself from the former by implementing a primary-backup protocol, was designed for the ZooKeeper coordination service."</font>


<font color="#5EA33E"><strong>p.</strong> "Distributed consensus is a difficult thing to get right, but it’s important to frame it within the context of CAP."</font>


**p.** "We can ensure stronger consistency at the cost of higher latency and lower availability. On the other hand, we can achieve higher availability with decreased latency while giving up strong consistency."


