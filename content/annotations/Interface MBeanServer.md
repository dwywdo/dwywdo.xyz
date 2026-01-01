---
title: Interface MBeanServer
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2026-01-01
---
[Source](https://docs.oracle.com/en/java/javase/21/docs/api/java.management/javax/management/MBeanServer.html)
<font color="#5EA33E"><strong>p.</strong> "It contains the methods necessary for the creation, registration, and deletion of MBeans as well as the access methods for registered MBeans. This is the core component of the JMX infrastructure."</font>


<font color="#5EA33E"><strong>p.</strong> "Instead, an object that implements this interface is obtained with one of the methods in the MBeanServerFactory class."</font>



> [!QUOTE] ManagementFactory.getPlatformMBeanServer()를 호출하면 MBeanServer 타입의 객체를 받을 수 있고, 이 객체는 JVM 내에서 MBean들을 등록하고 관리할 수 있는 기능을 제공한다.


