---
title: Spring의 HandlerInterceptorAdapter는 왜 deprecated되었을까?
description: 
draft: true
tags:
  - annotation
aliases: 
permalink: 
date: 2025-07-23
---
[Source](https://musimkyung.tistory.com/8) 
#### Spring의 HandlerInterceptorAdapter는 왜 deprecated되었을까?
---
**p.** "HandlerInterceptorAdapter가 존재했던 이유"



> [!COMMENT]- Before Java 8, there was no default methods in `Interface`, e.g. `HandlerInterceptor`.
> - As a result, if you want to implement `preHandle-only interceptor`, you have to implement all other methods with <b>EMPTY body</b>.
> - To avoid this, `HandlerInterceptorAdapter` is introduced and this abstract class already implement all methods from `HandlerInterceptor` interface with empty body, so you choose and customize only methods that you care.

**p.** "내가 사용하고 싶은 건 preHandle()뿐인데, 사용하지 않는 postHandle()까지 작성해야 하는 것이다."

**p.** "Abstract adapter class for the AsyncHandlerInterceptor interface, for simplified implementation of pre-only/post-only interceptors."

**p.** "Java 8 이상에서 HandlerInterceptor의 코드를 살펴보면, 메서드들이 아래와 같이 default 메서드로 지정되어 있음을 확인할 수 있다."


