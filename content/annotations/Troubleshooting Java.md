---
title: Troubleshooting Java
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2026-01-12
---
[Source](https://product.kyobobook.co.kr/detail/S000213029114?utm_source=google&utm_medium=cpc&utm_campaign=googleSearch&gt_network=g&gt_keyword=&gt_target_id=aud-901091942354:dsa-435935280379&gt_campaign_id=9979905549&gt_adgroup_id=132556570510&gad_source=1) 
# 트러블슈팅 기본 테크닉
---
 
## 1.2 일반적인 코드 조사 시나리오
---

### 1.2.1 예상과 다른 아웃풋의 원인을 밝힌다
---

<font color="#49BEFC"><strong>p.29</strong> "시나리오 1: 단순 케이스"</font>


<font color="#5EA33E"><strong>p.29</strong> "디버거 도구를 이용해 코드 실행을 따라가보는 것이 가장 간단한 분석 방법"</font>


<font color="#EF7DFA"><strong>p.29</strong> "실제로 디버거만으로는 퍼즐 조각을 맞춰가며 문제의 원인을 발견하기 어  려운, 더 복잡한 경우가 많다."</font>


<font color="#49BEFC"><strong>p.30</strong> "시나리오 2: 어디서부터 디버깅을 시작해야 할까?"</font>


**p.30** "때로는 어느 부분을 디버깅해야 할지도 몰라 디버거를 사용할 수 없을 때도 있다."


**p.30** "앱의 모든 코드 라인에 브레이크포인트를 추가해서 실 제로 앱이 무슨 코드를 실행하는지 알려주는 기능이 디버거에 있다면 얼마나 좋을까! 흥미로운 발상이지만 설령 그런 기능이 디버거에 있다 해도 해결책이 될 수는 없다."


<font color="#5EA33E"><strong>p.30</strong> "프로파일러로 브레이크포인트를 추가할 만한 코드 라인의 스코프  (scope, 범위)를 좁혀가는 것"</font>


<font color="#5EA33E"><strong>p.31</strong> "프로파일러(profiler)는 앱이 실행되는 동안 어떤 코드가 실행되는지 식별하는 도구"</font>

![[annotations/attachments/TroubleshootingJava/image-31-x92-y369.png|300]]



> [!QUOTE] [[VisualVM]] / [[JProfiler]]


<font color="#49BEFC"><strong>p.31</strong> "시나리오 3: 멀티스레드 앱"</font>


**p.31** "멀티스레드 아키텍처는 간섭(interference)에 민감한 편이어서 디버거를 사용  할 수 없는 경우가 많다."


<font color="#EF7DFA"><strong>p.31</strong> "즉, 디버거를 사용하는 시점마다 앱이 다르게 작동할 수 있다는 말이다."</font>


<font color="#5EA33E"><strong>p.31</strong> "이러한 특성을 하이젠버  그 실행(Heisenberg execution) 또는 줄여서 하이젠버그(Heisenbug)라고 한다"</font>


**p.32** "멀티스레드 아키텍처  는 스레드에 간섭을 일으키는 순간마다 작동 방식이 달라질 수 있다."

![[annotations/attachments/TroubleshootingJava/image-32-x120-y584.png|300]]

![[annotations/attachments/TroubleshootingJava/image-32-x120-y373.png|300]]


<font color="#5EA33E"><strong>p.32</strong> "대안으로는  앱에서 로깅을 사용하는 방법(5장), 디버거로 조사할 수 있게 스레드 수를 1개로 줄이는 방법"</font>


<font color="#49BEFC"><strong>p.32</strong> "시나리오 4: 주어진 서비스에 잘못된 호출 보내기"</font>


<font color="#5EA33E"><strong>p.33</strong> "어떻게 해결하면 좋을까? 먼저, 코드의 어느 부분  이 요청을 보내는지 찾아본다. 이 부분을 이미 알고 있다면 디버거를 사용해서 앱이 어떻게 요청  을 생성하는지 살펴보고 어디가 잘못됐는지 확인한다."</font>

![[annotations/attachments/TroubleshootingJava/image-33-x103-y394.png|300]]


**p.33** "앱이 요청을 주고받는 위치를 특정하기 곤란한 복잡한 경우라면 필자가 자주 사용하는 트릭을 하  나 소개하겠다. 다른 앱(내 앱이 요청을 잘못 보낸 상대방의 앱)을 스텁(stub)으로 바꿔버리는 것이다."


<font color="#49BEFC"><strong>p.33</strong> "예를 들면, 스텁으로 요청을  차단시켜 앱이 응답을 무한 대기하도록 만들면 코드의 어느 부분이 요청을 보내는지 알 수 있다.  그런 다음 프로파일러로 어느 코드가 스텁 때문에 막혀 있는지 찾아보는 것이다."</font>

![[annotations/attachments/TroubleshootingJava/image-34-x74-y511.png|300]]


### 1.2.2 특정 기술을 습득한다
---

<font color="#5EA33E"><strong>p.34</strong> "코드를 분석하는 조사 기법의 또 다른 용도는 특정 기술의 작동 원리를 배우는 것"</font>


<font color="#5EA33E"><strong>p.34</strong> "102 어떤 기술(프레임워크 라이브러리)을 학습하든지, 본인이 작성한 코드를 검토하는 시간을 아낌없이 투자하라. 언 제나 프레임워크를 구현한 코드를 깊이 파헤쳐보고 디버깅하도록 노력하라"</font>


**p.35** "하이버네이트(Hibernate)12 역시 필자가 디버깅을 통해 주로 습득한 기술이다. 하이버네이트는 자  바 세계에서 가장 널리 알려진 JPA 프레임워크로, 모든 자바 개발자가 반드시 익혀야 하는 기술"


**p.35** "결론은 어떤 기술을 배우든지 작성한 코드를 검토하는 시간에 아낌없이 투자하라는 점"


<font color="#5EA33E"><strong>p.35</strong> "항상  프레임워크의 코드를 더 자세히 살펴보고 디버깅하려는 노력을 기울여야 한다. 이 과정을 반복한  다면 훨씬 더 나은 개발자로 성장할 것"</font>


### 속도 저하 이유를 알아낸다
---

<font color="#5EA33E"><strong>p.35</strong> "성능 문제의 원인을 파악하기 위해 다양한 디버깅 기법  의 올바른 사용법을 배울 필요가 있다."</font>


**p.35** "특별한 용도 없이 열린  상태로 실행되면서 성능 및 메모리 이슈를 일으키는 스레드를 좀비 스레드(zombie thread)라고 한  다. 일반적으로 좀비 스레드는 조사하기가 매우 까다롭다."


<font color="#5EA33E"><strong>p.36</strong> "성능 문제의  원인은 보통 프로파일러(6-9장)를 사용하면 쉽게 밝혀낼 수 있다. 프로파일러는 앞서 살펴본 것처  럼 어떤 코드가 실행되는지 알아내는 일 외에도 커맨드별 실행 시간도 함께 표시한다"</font>

![[annotations/attachments/TroubleshootingJava/image-36-x78-y331.png|300]]


### 1.2.4 앱 크래시가 발생하는 이유를 이해한다
---

<font color="#5EA33E"><strong>p.36</strong> "앱 크래시는 특정한 조건에서 발생  하는 경우가 많은데, 로컬 환경에서는 앱 크래시를 재현(reproduction, 문제를 다시 일부러 일으키는  것)하기가 어려워 다른 문제보다 조사하기가 더 까다로운 편"</font>


<font color="#5EA33E"><strong>p.37</strong> "앱이 완전히 멈췄다는 것은 복구 불가능한 에러가 발생했다는 뜻이다. 대부분 메모리 에러 때문  에 일어난다. 자바는 힙 메모리가 가득 차 앱이 더 이상 작동하지 않으면 OOM 에러(OutOfMemory  Error, 메모리 부족 에러)를 낸다."</font>


<font color="#49BEFC"><strong>p.37</strong> "특정 시점에 힙 메모리에 어떤 데이터가 포함되어 있었는지 스냅숏  에 해당하는 힙 덤프(heap dump)를 사용"</font>


**p.37** "OOM 에러 메시지가 표시되고 앱 크래시가 발생할  때마다 이런 스냅숏이 자동 생성되도록 자바 프로세스를 구성할 수 있다."


<font color="#5EA33E"><strong>p.38</strong> "힙 덤프는 힙 메모리의 지도 같은 것이다. 이 지도를 보는 법을 배우면 앱이 내부적으로 데이터를 처리하는 방식에 관하여 귀중한 단서를 얻을 수 있다."</font>


<font color="#49BEFC"><strong>p.38</strong> "앱은 계속 실행되고 있지만 요청을 해도 응답이 없는 경우, 스레드 덤프(thread dump)는 안에서 무  슨 일이 일어나고 있는지 분석하는 최상의 도구다."</font>


**p.39** "스레드 덤프는 덤프를 생성할 당시 실행 중이던 스레드에 관한 세부 정보를 제공한다."


<font color="#5EA33E"><strong>p.40</strong> "학습 효과를 높이는 가장 좋은 방법은 자신이 이해  하고 싶은 기술을 적용한 코드를 직접 디버깅해보는 것"</font>


<font color="#5EA33E"><strong>p.42</strong> "그냥 열심히 연습하고 경험을 쌓으면 된다."</font>


**p.42** "디버거(debugger)는 원하는 코드 라인에서 실행을 잠깐 멈추고 각 커맨드를 수동 실행하며 데이터가 어떻  게 바뀌는지 확인할 수 있는 도구"


<font color="#49BEFC"><strong>p.43</strong> "첫째, 코드는 선형적(linear)이지 않다."</font>


**p.43** "즉, 코드는 한 라인 한 라인 그냥 읽는 대  상이 아니다. 커맨드 사이를 요리조리 왔다 갔다 하며 데이터를 어떻게 처리하는지 로직을 파악해  야 한다."


<font color="#EF7DFA"><strong>p.43</strong> "주의를 기울이지  않으면 길을 잃고 어디서 출발했는지조차 잊어버릴 수 있다."</font>


<font color="#49BEFC"><strong>p.43</strong> "둘째, 시와 달리 코드는 항상 모든 사  람에게 동일한 의미를 지닌다. 이 의미가 바로 코드 조사의 목표다."</font>

![[annotations/attachments/TroubleshootingJava/image-43-x83-y183.png|300]]


<font color="#EF7DFA"><strong>p.44</strong> "메서드명이 언제나 설명력이 충분한 것은 아니므로  여기에만 전적으로 의존해서는 안 된다. 메서드가 실제로 무슨 일을 하는지 더 깊게 살펴볼 필요가 있다."</font>


**p.44** "새로  운 코드 커맨드를 조사할 때마다 새로운 조사 플랜(investigation plan)이 수립되며 인지 복잡성  (cognitive complexity)&#39;은 가중된다(그림 2.2, 2.3). 로직을 더 깊게 파헤쳐 더 많은 플랜이 수립될수  록 프로세스는 걷잡을 수 없을 정도로 복잡해진다."

![[annotations/attachments/TroubleshootingJava/image-45-x109-y148.png|300]]


<font color="#EF7DFA"><strong>p.45</strong> "각각의 플랜마다 어떻게 진행되는지, 다양한 코드 조각이 어떻게 조립되는지  전부 기억하려고 하면 코드를 읽는 것만으로는 코드를 이해하기 매우 어려워진다."</font>


<font color="#5EA33E"><strong>p.46</strong> "새로  오픈하는 플랜이 적을수록 프로세스 복잡도는 감소한다."</font>


**p.46** "조사를 생략해서 전체 프  로세스를 단순하게 가져갈지, 아니면 프로세스가 더 복잡해지더라도 자세히 살펴보고 개별 커맨  드를 확실하게 이해할지 선택해야 한다."


<font color="#EF7DFA"><strong>p.46</strong> "가급적 오픈한 플랜 수를 줄여 읽기 경로를 단축하라."</font>


<font color="#5EA33E"><strong>p.47</strong> "핵심 전제는 &quot;지금 내가 조  사하려는 로직이 무엇인가?&quot;를 아는 것"</font>


**p.47** "실제로 본인이 어떤 로직을 조사해야 할지 미리 콕 집어 알 수 없는 경우가 있다. 그래서 디버깅을  하기 전에 다양한 기법을 동원해서 디버거로 조사하려는 코드 부위를 찾는 작업이 선행돼야 한다"



> [!QUOTE] Profiler 등...

![[annotations/attachments/TroubleshootingJava/image-48-x110-y450.png|300]]


**p.48** "자바 10부터  입문한 개발자라면 var 키워드를 사용해서 로컬 변수를 타입 추론(type inference)할 수도 있다."


<font color="#EF7DFA"><strong>p.48</strong> "특정 코드 블록의 첫 라인부  터 디버깅을 시작하는 모습을 숱하게 목격했다."</font>


<font color="#5EA33E"><strong>p.48</strong> "그러나 디버  거 없이 먼저 코드를 읽고 이해할 수 있는지 확인하는 편이 효과적이다. 그런 다음에 문제가 되는  지점부터 바로 디버깅을 시작하라."</font>


<font color="#5EA33E"><strong>p.49</strong> "이미 잘 알고 있는 커맨드는 실행을 중단하지 말고, 대신 초점을 두어야 할  코드 라인에 브레이크포인트를 찍으라."</font>


<font color="#EF7DFA"><strong>p.50</strong> "디버거를 켜려면 반드시 Debug 옵션으로 앱을 실행해야 한다. Run 옵션을 사용하면 IDE가 실행 프로세스에 디버거를 부착하지 않기 때문에 브레이크포인트는 무시된다."</font>


<font color="#49BEFC"><strong>p.50</strong> "스코프 내 모든 변숫값. 스코프 안에 있는 모든 변수와 그 값을 알면 지금 어떤 데이터를 처리 중인지, 또 프로그램 로직은 이 데이터에 어떤 영향을 미치는지 알 수 있다."</font>


<font color="#49BEFC"><strong>p.50</strong> "실행 스택 트레이스(execution stack trace): 디버거가 실행을 중단시킨 라인에서 앱이 이 코드 라  인을 어떻게 실행하는지를 나타낸다."</font>


### 2.2.1 실행 스택 트레이스란 무엇이고 어떻게 사용해야 할까?
---

<font color="#5EA33E"><strong>p.51</strong> "실행 스택 트레이스는 코드 디버깅을 할 때 매우 유용한 도구"</font>


<font color="#EF7DFA"><strong>p.51</strong> "스프링  (Spring)이나 하이버네이트 같은 프레임워크를 사용하는 앱은 메서드의 실행 체인을 바꾸는 경우  도 드물지 않다."</font>


**p.51** "예를 들어, 스프링 프레임워크에서는 애스펙트(aspect, 자바/자카르타 EE 용어로는 인터셉터(interceptor)  라고 한다)라는 장치로 디커플링된(decoupled, 서로 분리된) 코드를 사용한다"


<font color="#EF7DFA"><strong>p.52</strong> "코드를 읽을 때 호출 체인에서 애스펙트 코드는 볼 수 없기 때문에 이런 로직을 직접 눈으로 관찰  하기는 어렵다."</font>

![[annotations/attachments/TroubleshootingJava/image-52-x58-y114.png|300]]


<font color="#EF7DFA"><strong>p.52</strong> "애스펙트 로직은 코드에서 완전히 디커플링되어 있다. 따라서 코드를 읽을 때 더 실행될 로직이 있다는 사실을 파  악하기 어렵다."</font>

![[annotations/attachments/TroubleshootingJava/image-55-x100-y272.png|300]]



> [!QUOTE] changeProduct at DemoAspect


**p.55** "코드를 읽을 때 예상했던 것보다 실행 스택 트레이스가 훨씬 크다."


**p.56** "애스펙트는 최신 자바 애플리케이션 프레임워크에서 꽤 매력적이고 유용한 기능이지만, 제대로 알 고 사용하지 않을 경우 앱을 이해하고 관리하기가 적잖이 까다로워질 수 있다"


<font color="#8F65F7"><strong>p.56</strong> "애스펙트에 더 관심이 있다면 내가 쓴 다른 책 《Spring Start Here) (Manning, 2021)의 6장을 읽어보길 권한다."</font>


<font color="#5EA33E"><strong>p.56</strong> "디버거로 코드를 탐색하는 세 가지 기본 기술"</font>


<font color="#49BEFC"><strong>p.56</strong> "스텝오버(step over): 동일한 메서드에서 다음 코드 라인으로 계속 실행한다."</font>


<font color="#49BEFC"><strong>p.56</strong> "스텝 인투(step into): 현재 라인에서 호출된 메서드 중 하나의 내부에서 실행을 계속한다."</font>


<font color="#49BEFC"><strong>p.56</strong> "스텝 아웃(step out): 조사하던 메서드를 호출한 메서드로 실행을 되돌린다."</font>


<font color="#5EA33E"><strong>p.59</strong> "코드의 작동 방식을 알고 싶다면 일단 스텝 오버로 시작하는 것이 좋다."</font>


<font color="#EF7DFA"><strong>p.59</strong> "스텝 인투를 할 때마다 조사 플랜이 새로 열리면 전체 프로세스가 점점 복잡해진다"</font>


<font color="#EF7DFA"><strong>p.61</strong> "나는 학생들이 코드를 읽어볼 틈도 없이 곧장 스텝 인투한  메서드를 디버깅하기 위해 달려드는 것을 종종 볼 수 있다."</font>

![[annotations/attachments/TroubleshootingJava/image-62-x82-y677.png|300]]


<font color="#5EA33E"><strong>p.62</strong> "스텝 아웃하면 시간을 아낄 수 있다. 어떤 코드 라인에서 스텝 인투해서 새로운 조사 플랜으로 들어가면 일단  그 코드를 읽어보고 어떤 코드인지 파악이 되면 다시 스텝 아웃하여 원래 위치로 되돌아가라."</font>


**p.62** "현재 실행 플랜이 저절로 닫힐 때까지 커맨드를 일일이 스텝 오버할 필요가 없기 때문에 소중한 시간을 아낄 수 있다."


<font color="#5EA33E"><strong>p.63</strong> "&#39;다음 라인  (nextline)&#39;과&#39;다음 실행 라인(next execution line)&#39;의 차이점을 명확하게 구분해야 한다."</font>



> [!QUOTE] 다음 실행 라인 = 앱이 그 다음에 실행할 라인. 다음 라인 = 말 그대로 코드 상에서의 다음 라인


**p.63** "이처럼 다음 실행 라인이 항상 다음 라인이 아닌 경우가 있음을 유의하라."


<font color="#5EA33E"><strong>p.63</strong> "디버거를 사용할 수 없는 몇 가지 시나리오"</font>


<font color="#49BEFC"><strong>p.64</strong> "코드의 어느 부분이 아웃풋을 내는지 모르는 채 아웃풋 문제를 조사한다."</font>


**p.64** "앱 프로파일링이나 스터빙 등은 디버거로 조사를 시작할  위치를 파악할 때 많이 쓰는 기법"


<font color="#49BEFC"><strong>p.64</strong> "성능 문제(performance problem)는 대부분 디버거로 조사할 수 없는 특수한 종류의 문제"</font>


**p.64** "프로파일링과 로깅 기  법(5-9장)을 적용하면 해결의 실마리를 찾는 데 도움이 된다. 특히, 앱이 완전히 멈춰버리는 경우는  대개 스레드 덤프를 수집해 분석하는 것이 가장 빠른 길"


<font color="#49BEFC"><strong>p.64</strong> "앱에 문제가 생겨 실행이 중단된 경우(앱 크래시)는 디버거를 사용할 수 없다."</font>


**p.64** "감사 로그(audit  log)&#39;를 활용하거나(5장) 스레드 또는 힙 덤프(10, 11장)를 수집하여 조사"


<font color="#49BEFC"><strong>p.64</strong> "멀티스레드 앱 개발(multithreaded implementation)은 많은 개발자가 가장 어렵게 느끼는 영역"</font>


**p.64** "멀티스레드 기반의 구현체는 디버거 같은 도구가 간섭을 일으켜 영향을 받기가 쉽고 하이젠버그  효과(1장)가 일어나면서 디버거를 사용할 때와 사용하지 않을 때의 동작이 달라진다."

 
# 고급 디버깅 기법으로  문제의 근본 원인 찾기
---
 
## 3.1 조건부 브레이크포인트로 조사 시간 최소화
---

<font color="#5EA33E"><strong>p.68</strong> "조건부 브레이크포인트(conditional breakpoint)란 디버거가 어떤 조건이 만족할 경우에만 실행을 중단 하도록 장치한 브레이크포인트"</font>


<font color="#5EA33E"><strong>p.69</strong> "조건부 브레이크포인트를 사용하면 조사하려는 조건에 도달할 때까지 무작정 탐색하는 것보다 더  효율적으로 코드를 탐색할 수 있다."</font>


**p.69** "브레이크포인트에서 마우스 오른쪽 버튼을 클릭하고 해당 브레이크포인트가 적용될 조건  을 입력한다. 조건은 불리언(Boolean) 표현식이어야 한다"


<font color="#EF7DFA"><strong>p.70</strong> "멋지게 코드를 조사하는 조건부 브레이크포인트에도 단점이 있다. 조건부 브레이크포인트는  스코프에 있는 변숫값을 디버거가 지속적으로 가로채서 브레이크포인트 조건을 평가해야 하므로  실행 성능에 상당히 큰 영향을 미친다."</font>


**p.70** "조건부 브레이크포인트는 조금만 사용하라. 실행 속도가 너무 느려지지 않도록 한 번에 하나씩만 찍는 것이 좋다."


<font color="#5EA33E"><strong>p.71</strong> "조건부 브레이크포인트의 또 다른 용도는 여러 가지 표현식 값 또는 특정 조건에 대한 스택 트레  이스 등의 세부 정보를 기록하는 것"</font>

 
## 3.2 실행을 중단시키지 않고도 브레이크포인트를 사용 하는 방법
---

<font color="#5EA33E"><strong>p.72</strong> "브레이크포인트를 사용하면 차후 코드를 조사할 때 유용하게 쓰일 메시지를 남길 수 있다."</font>


<font color="#EF7DFA"><strong>p.72</strong> "조건부 브레이크포인  트를 찍으면 쉽게 해결될 일을 굳이 로그 커맨드를 추가하느라 고생을 하는 개발자가 많다."</font>


**p.72** "디버거는 브레이  크포인트를 찍은 라인에 닿을 때마다 메시지를 기록한다. digits 변숫값과 실행 스택 트레이스를  디버거가 기록할 것"

![[annotations/attachments/TroubleshootingJava/image-73-x64-y456.png|300]]

 
## 3.3 조사 시나리오를 동적으로 변경하기
---

<font color="#5EA33E"><strong>p.75</strong> "디버깅 도중에 스코프 안에 있는 변숫값을 변경하는 식으로 코드 조사를 간편하게 해주는 또 다른  기법을 살펴보자."</font>


<font color="#5EA33E"><strong>p.75</strong> "실행 시간이 긴 프로세스에 브레이크포인트를 찍어 조사하는 것은 바람직하지 않다. 조사하려는 코드에 도달할  때까지 너무 오래 걸릴 때가 많고, 프로세스를 여러 번 재실행해야 하는 경우 많은 시간을 낭비할 공산이 크다."</font>


<font color="#5EA33E"><strong>p.76</strong> "디버거가 실행을 중단시킨 상태에서 스코프에 있는 변수 중 하나의 값을 변경하는 장  면이다."</font>

![[annotations/attachments/TroubleshootingJava/image-76-x211-y277.png|300]]


<font color="#5EA33E"><strong>p.77</strong> "조건부 브레이크포인트와 데이터를 곧바로 변경하는 방식은 어떤 차이점이 있을  까?"</font>


**p.77** "두 방식 모두 어느 코드가 잠재적으로 문제를 일으킬 만한지 파악해야 한다. 그런 다음  다음과 같은 경우에는 조건부 브레이크포인트를 사용"


<font color="#49BEFC"><strong>p.77</strong> "조사하려는 시나리오를 구동시키는 데 필요한 데이터를 갖고 있다."</font>


<font color="#49BEFC"><strong>p.77</strong> "조사 중인 코드의 실행 시간이 그리 길지 않다."</font>


**p.77** "다음과 같은 경우라면 변숫값을 그때그때 변경하는 편이 낫다."


<font color="#49BEFC"><strong>p.78</strong> "조사하려는 시나리오를 구동시키는 데 필요한 데이터가 없다."</font>


<font color="#49BEFC"><strong>p.78</strong> "코드를 실행하는 데 너무 오래 걸린다."</font>


**p.78** "조건부 브레이크포인트를 왜 사용하는 것일까, 하는 의문이 들 것이다. 언뜻 보면  변숫값을 즉석에서 변경하기만 해도 조사에 필요한 모든 환경을 만들어낼 수 있으니 조건부 브레  이크포인트는 사용 가치가 떨어지는 것처럼 보일 수 있다."

 
## 3.4 조사 케이스를 되감기
---

<font color="#5EA33E"><strong>p.78</strong> "디버거로 코드를 조사하  면서 &#39;시간을 되돌리는&#39; 이런 접근 방식을 실행 프레임 드로핑(execution frame dropping) 또는 실행  프레임 퀴팅(execution frame quitting)이라고 한다."</font>


**p.79** "실행 프레임을 드롭한다는 것은, 실행 스택 트레이스에서 한 레이어 뒤로 간다는 뜻이다. 예를 들  어, 어떤 메서드에 스텝 인투했다가 다시 되돌아가고 싶을 때, 실행 프레임을 삭제하면 메서드가  호출됐던 위치로 돌아가는 것"


<font color="#5EA33E"><strong>p.79</strong> "프레임 드롭과 스텝 아웃은 둘 다 겉보기엔 현재 조사 플랜이 닫히고 메서드가 호출된 위치로 실  행이 돌아가기 때문에 혼동하는 개발자가 많다. 하지만 한 가지 큰 차이점이 있다."</font>


**p.79** "메서드에서 스  텝 아웃하면 메서드가 리턴되거나 예외가 발생할 때까지 현재 플랜 내에서 실행이 계속된다. 그러  다가 현재 메서드가 종료되면 그 즉시 디버거는 실행을 중단"


<font color="#5EA33E"><strong>p.80</strong> "현재 실행 프레임을 드롭하려면 실행  스택 트레이스에서 메서드 레이어를 선택하고 마우스 오른쪽 버튼을 클릭한 후 Drop Frame을 선  택한다."</font>

![[annotations/attachments/TroubleshootingJava/image-81-x63-y80.png|300]]


<font color="#EF7DFA"><strong>p.82</strong> "프레임 드롭으로 어떤 커맨드를 반복하는 경우, 이 방법이 도움  이 되기는커녕 혼란을 가중시킬 수도 있다. 그리고 앱의 내부 메모리 밖에서 값을 변경하는 커맨  드를 실행하면, 이를테면 다음과 같은 경우에는 프레임을 드롭해도 해당 변경분은 되돌릴 수 없음  을 유념하기 바란다"</font>

![[annotations/attachments/TroubleshootingJava/image-82-x79-y549.png|300]]


**p.82** "DB 데이터를 수정하는 트랜잭션을 커밋하는 프레임을 드롭할 수는 있다."


<font color="#5EA33E"><strong>p.83</strong> "이 방법을 사용하려고 작정했다면 가능한 한 큰 코드 조각의 반복 실행은 삼가고, 외  부 변경을 일으키는 로직의 포함 여부를 꼼꼼히 확인하는 것이 좋다."</font>

 
# 원격 앱 디버깅
---

**p.85** "일반적으로 이와 같은 성능 이슈는 DB 접속 또는 파일 읽기/쓰기 등의 I/O 인터페이스가 원인으  로 지목되곤 한다."


<font color="#EF7DFA"><strong>p.86</strong> "이런 종류의 문제는 그것이 일어난 환경에 직접 접속해보지 않는 이상 조사하기가 매우 까다롭다."</font>


<font color="#5EA33E"><strong>p.86</strong> "내 컴퓨터에서 문제를 재현할 수 없으면 문제가 일어난 환경에 직접 연결해야 한다."</font>

![[annotations/attachments/TroubleshootingJava/image-86-x109-y221.png|300]]


**p.87** "로컬 PC에서는 문제가 없던 앱이 다른 환경에서 오작동을 일으킨다면?"


<font color="#49BEFC"><strong>p.87</strong> "앱 환경에서 사용되는 데이터가 다르다. 환경마다 다른 DB 인스턴스를 사용하고 설정 파일도  다르다."</font>


<font color="#49BEFC"><strong>p.87</strong> "앱이 설치된 운영체제가 다르다."</font>


<font color="#49BEFC"><strong>p.87</strong> "배포 체계가 다르다. 예를 들어 환경 A에서는 가상머신에 직접 배포하는 반면, 환경 B에서는  쿠버네티스(Kubernetes)&#39; 같은 컨테이너화 솔루션(containerized solution)을 사용하는 경우가 그  렇다."</font>


<font color="#49BEFC"><strong>p.87</strong> "퍼미션 설정(permission setup)이 환경마다 다르다."</font>


<font color="#49BEFC"><strong>p.87</strong> "리소스(메모리 할당이나 CPU 종류)가 환경마다 다르다."</font>


<font color="#EF7DFA"><strong>p.88</strong> "어떤 경우에도 프로덕션 환경에서 원격 디버깅을 사용해서는  안 된다."</font>


<font color="#5EA33E"><strong>p.89</strong> "원격 디버깅을 하려면 앱을 실행할 때 에이전트(agent)라는 소프트웨어를 앱에 부  착해야 한다."</font>

![[annotations/attachments/TroubleshootingJava/image-89-x67-y198.png|300]]


<font color="#5EA33E"><strong>p.91</strong> "원격 디버깅할 앱은 커맨드 라인에서 java로 앱을 시작할 때 -agentlib:jdwp&#39; 매개변수를 추가하  여 디버거 에이전트(debugger agent)를 연결시켜야 한다"</font>

![[annotations/attachments/TroubleshootingJava/image-91-x73-y323.png|300]]



> [!QUOTE] `java -jar "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" app.jar`


<font color="#5EA33E"><strong>p.91</strong> "JDWP(Java Debugging Wire Protocol)는 디버깅 프로세스(디버거)와 디버거(IntelliJ] 같은 IDE)가 서로 주고받는 데이터 포맷을 정  의한 프로토콜"</font>


<font color="#49BEFC"><strong>p.92</strong> "transport=dt_socket: 디버거 도구가 디버거 에이전트와 통신하는 방식"</font>


<font color="#49BEFC"><strong>p.92</strong> "server=y: 앱 실행에 부착한 에이전트를 서버로 사용한다는 의미"</font>


<font color="#49BEFC"><strong>p.92</strong> "suspend=n: 디버거 도구가 접속하길 기다리지 않고 앱을 시작한다는 것이다. suspend=y로 설  정하면 디버거에 접속할 때까지 앱을 실행하지 않는다."</font>


<font color="#49BEFC"><strong>p.92</strong> "address*:5885: 디버거 도구가 에이전트와 5005 포트로 통신하도록 선언"</font>


<font color="#5EA33E"><strong>p.92</strong> "java -"</font>


<font color="#5EA33E"><strong>p.93</strong> "Intelli] 환경에서 원격 앱에 디버거로 접속하는 방법"</font>


<font color="#49BEFC"><strong>p.93</strong> "실행 구성(running configuration)을 새로 추가한다"</font>


<font color="#49BEFC"><strong>p.93</strong> "디버거 에이전트의 원격지 주소(IP 주소 및 포트)를 설정"</font>


<font color="#49BEFC"><strong>p.93</strong> "앱 디버깅을 시작"</font>

![[annotations/attachments/TroubleshootingJava/image-94-x92-y240.png|300]]


**p.94** "예제는 디버거와 동일한 시스템에서 앱을 실  행하므로 localhost로 입력한다. 실제 환경에서는 앱이 실행 중인 다른 시스템의 IP 주소를 입력하  면 된다."


**p.96** "로컬  에서 디버깅을 할 때는 IDE가 앱을 컴파일한 후 새로 컴파일된 코드에 디버거를 부착한다는 사실  을 알고 있다."


<font color="#EF7DFA"><strong>p.96</strong> "그러나 원격 앱에 접속하는 경우, 내가 갖고 있는 소스 코드와 디버거를 접속시킨 원  격 앱의 컴파일된 코드가 일치하지 않을 수도 있다."</font>

 
# 로그를 활용하여  앱 동작 감시하기
---

<font color="#5EA33E"><strong>p.104</strong> "로그 메시지를 보면 앱 실행 중에 무슨 일이 일어났  는지 알 수 있다."</font>


<font color="#5EA33E"><strong>p.104</strong> "모든 IDE에는 로그 콘솔(log console)이 있는데, 이는 소프트웨어 개발자가 가장 먼저 배  우는 것이다."</font>


**p.104** "실제 앱은 나중에 개발자가 특정  시점의 앱 동작을 조사할 수 있도록 로그를 파일로 저장한다."


<font color="#5EA33E"><strong>p.105</strong> "깔끔하고 사용하기 편한 로그를 남기려면 앞으로 이 장에서 설명할 몇  가지 베스트 프랙티스(best practice, 모범 사례)를 따르는 것이 좋다."</font>


**p.105** "예를 들어 로그 메시지에는 설  명 외에도 메시지를 기록한 시점의 타임스탬프(timestamp), 심각도(severity), 앱의 어느 파트에서  메시지를 남겼는지 등의 정보가 포함된다"

![[annotations/attachments/TroubleshootingJava/image-105-x72-y121.png|300]]


<font color="#5EA33E"><strong>p.107</strong> "필 윌킨스(Phil Wilkins)의 《Logging in Action》(Manning, 2022)의 4부"</font>

 
## 5.1 로그를 이용하여 조사하기
---

<font color="#5EA33E"><strong>p.107</strong> "로그 메시지의 가장 큰 장점은 주어진 시간에 특정 코드의 실행을 시각화하는 능력"</font>


**p.107** "하지만 디버거는 실행 이력에 관  한 정보는 자세히 제공하지 않는다. 실행 스택 트레이스를 보며 실행 경로를 파악할 수는 있지만,  그 외의 모든 것은 현재에 집중"


**p.107** "로그는 과거 특정 기간의 앱 실행에 초점을 맞춘다(그림 5.5). 로그 메시지는 시간과 아  주 밀접한 관계가 있다."


<font color="#EF7DFA"><strong>p.108</strong> "로그를 사용할 때에는 항상 앱이 실행되는 시스템의 표준 시간대를 제일 먼저 체크해야 한다."</font>


**p.108** "로그를 보면 다음과 같은 예외 스택 트레이스가 흔히 발견된다."

![[annotations/attachments/TroubleshootingJava/image-108-x79-y407.png|300]]


**p.108** "예외 스택 트레이스가 로그에서 발견되면 앱 기능에 문제가 있다고 볼 수 있다."


<font color="#EF7DFA"><strong>p.109</strong> "예외가 발생한 코드가 문제를 일으킨 원인이 아닐 수도 있음을 늘 명심하라. 예외는 어디서 무엇이 잘못됐다고  알려주지만 예외 자체는 다른 곳에서 발생한 문제의 결과일 뿐, 문제 그 자체가 아닐 가능성이 있다."</font>


### 5.1.2 예외 스택 트레이스로 어디서 메서드를 호출했는지 식별
---

<font color="#5EA33E"><strong>p.109</strong> "유용한 기법을 하나 소개한다. 예외 스택 트레이스를 로  깅하여 특정 메서드를 어디에서 호출했는지 알아내는 것이다."</font>


**p.110** "실행 스택 트레이스는 예외 스택 트레이스(exception stack trace)라고 부르기도  하는데, 사실 두 용어는 결국 동일한 것이다."

![[annotations/attachments/TroubleshootingJava/image-110-x72-y627.png|300]]


**p.110** "이렇게 하면 스택 트레이스만 출력할 뿐 예외는 던지  지 않기 때문에 실행된 로직을 전혀 방해하지 않는다."

![[annotations/attachments/TroubleshootingJava/image-110-x69-y334.png|300]]


### GS 멀티스레드 아키텍처에서 커맨드의 실행 시간 측정
---

**p.111** "어떤 기능의 실행 시간이 너무 길어 성능이 떨어지는 문제를 조  사한다고 하자. 아무래도 DB에서 데이터를 조회하는 쿼리가 의심스럽다. 특정 인숫값이 전달될 때  쿼리가 느려져 앱 성능이 전체적으로 떨어지는 것 같다."


### GI 멀티스레드 아키텍처에서 커맨드 실행 문제 조사
---

**p.112** "스레드를 여러 개 사용하여 기능을 구현하는 멀티스레드 아키텍처 기반의 앱은 외부 간섭에 민감  하게 반응하는 편이다(그림 5.8). 실제로 (앱의 실행에 간섭을 일으키는 도구인) 디버거나 프로파일러를  사용하면 앱 동작이 그때그때 달라질 수 있다"


<font color="#5EA33E"><strong>p.113</strong> "로그 역시 멀티스  레드 앱에서 간섭을 일으킬 수 있지만, 앱의 흐름 자체를 바꿀 정도로 큰 영향을 미치지는 않는다."</font>

 
## 5.2 로깅을 구현하는 방법
---

### 5.2.1 로그 메시지 저장
---

<font color="#5EA33E"><strong>p.114</strong> "로그 메시지를 저장하는 방식은 로그의 유용성과 앱 성능에 영향을 미칠 수 있다. 나는 지금까  지 많은 앱을 작업하면서 다양한 로그 메시지 퍼시스턴스 메커니즘을 적용해볼 기회가 있었다."</font>


<font color="#49BEFC"><strong>p.114</strong> "비관계형 DB에 로그 저장"</font>


<font color="#EF7DFA"><strong>p.114</strong> "NoSQL DB를  사용하면 로그를 좀 더 성능 위주로 저장할 수 있기 때문에 로그 메시지가 소실되거나 앱이 기록  한 순서대로 저장되지 않을 가능성이 있다."</font>


**p.114** "그러나 일반적으로 로그 메시지에는 메시지가 저장된  타임스탬프가 있고 메시지 시작부에 포함되어 있기 때문에 크게 문제되지 않는다."


<font color="#49BEFC"><strong>p.115</strong> "파일에 로그 저장"</font>


**p.115** "예전에는 로그를 파일로 저장했다."


<font color="#49BEFC"><strong>p.115</strong> "관계형 DB에 로그 저장"</font>


<font color="#5EA33E"><strong>p.115</strong> "관계형 DB는 데이터 일관성을 확실히 보장  하므로 로그 메시지가 소실되는 일은 없고, DB에 저장된 로그 메시지는 언제라도 조회할 수 있다."</font>


<font color="#EF7DFA"><strong>p.115</strong> "그러나 이러한 일관성에는 성능 저하라는 비용이 수반"</font>


<font color="#EF7DFA"><strong>p.115</strong> "요즘 각국 정부는 금융 앱, 특히 결제 기능에 관한 로그 메시지에 대하여 엄격한 규제를  가하는 추세다."</font>


### 5.2.2 로깅 레벨을 정의하고 로깅 프레임워크를 사용하는 방법
---

<font color="#49BEFC"><strong>p.116</strong> "Error(에러): 아주 중대한 문제가 발생한 것으로, 이런 이벤트는 반드시 기록해야 한다."</font>


<font color="#49BEFC"><strong>p.116</strong> "Warm(경고): 잠재적으로 에러일 수 있으나 앱이 처리한 이벤트다."</font>


<font color="#49BEFC"><strong>p.116</strong> "Info(정보): &#39;상시(common)&#39; 로그 메시지."</font>


<font color="#49BEFC"><strong>p.116</strong> "Debug(디버그): Info 메시지만으로 불충분한 경우에 한하여 매우 세분화된(fine-grained) 정보  를 남긴다."</font>


**p.117** "Debug 메시지는 보통 비활성화되어 있다. 자세한 정보가 필요한 경  우에만 잠깐씩 활성화하여 사용하는 것이 좋다."


<font color="#5EA33E"><strong>p.118</strong> "Log4j의  설정 파일은 log4j2.xml이라는 XML 파일이다. 앱의 클래스 패스(class path)에 있어야 하므로 이  파일을 메이븐 프로젝트의 resources 폴더에 추가한다."</font>

![[annotations/attachments/TroubleshootingJava/image-118-x69-y183.png|300]]

![[annotations/attachments/TroubleshootingJava/image-119-x74-y547.png|300]]


<font color="#5EA33E"><strong>p.120</strong> "XML 파일에 구성된 세 가지 컴포넌트(로거, 어펜더, 포매터) 사이의 관계는 그림 5.12와  같이 나타낼 수 있다."</font>

![[annotations/attachments/TroubleshootingJava/image-120-x57-y166.png|300]]


**p.121** "status와 level 애트리뷰트가 다소 헷갈릴 수도 있다."


**p.121** "&lt;Configuration&gt; 태그의  status 애트리뷰트는 Log4j 이벤트의 심각도, 즉 이 라이브러리 자체의 문제를 의미한다. 다시 말  해서 status 애트리뷰트는 로깅 라이브러리 자신의 로깅 설정이다."


<font color="#5EA33E"><strong>p.122</strong> "로그 때문에 생길  수 있는 세 가지 문제와 이를 방지하는 방법을 알아보자"</font>


<font color="#49BEFC"><strong>p.122</strong> "보안 및 프라이버시 문제: 로그 메시지에 개인정보가 노출된다."</font>


<font color="#49BEFC"><strong>p.122</strong> "성능 문제: 지나치게 큰 로그 메시지를 과도하게 생성하면 문제가 된다."</font>


<font color="#49BEFC"><strong>p.122</strong> "유지보수 문제: 로그를 남기는 커맨드 때문에 소스 코드의 가독성이 떨어진다."</font>


<font color="#EF7DFA"><strong>p.124</strong> "토큰을 서명할 때 사용하는 패스워  드나 개인키, 그 밖에 주고받은 정보는 어떤 일이 있어도 로그에 기록하면 안 된다."</font>


<font color="#5EA33E"><strong>p.124</strong> "유럽 연합(EU)은 2018년 5월부터 일반 데  이터 보호 규칙(General Data Protection Regulation, GDPR)&#39;을 시행 중인데, EU 회원국에서 사용하  는 앱은 반드시 준수해야 한다."</font>


**p.124** "이 규정에 따르면 사용자는 누구라도 앱이 사용하는 자신의 모든  개인 데이터를 요청할 수 있고 해당 데이터의 즉각적인 삭제(immediate deletion)를 요청할 수 있다."


**p.124** "로그를 쓰려면 세부 정보(일반적으로 스트링)를 I/O 스트림을 통해 앱 외부의 어딘가로 보내야 한다."


<font color="#5EA33E"><strong>p.125</strong> "몇 가지 교훈을 얻었고 같은 실수를 되풀이하지 않겠다고 마음먹었다."</font>


**p.125** "앱에서 메시지를 어떻게 기록하는지 알아야 한다. 동일한 앱이라도 배포를 어떻게 하는지에  따라 구성이 제각각일 수 있다"


**p.125** "메시지를 너무 많이 기록하면 안 된다."


**p.125** "꼭 필요한 메시지만 저장하라."


**p.125** "서비스를 재시작하지 않아도 로깅 메커니즘을 켜고 끌 수 있도록 구현하라."

 
## 5.3 로그와 원격 디버깅
---
![[annotations/attachments/TroubleshootingJava/image-127-x62-y114.png|300]]


<font color="#5EA33E"><strong>p.128</strong> "아무래도 가장 큰 차이점은 각자가 지닌 고유한 철학일 것이다. 디버깅은 현재에 초점을 두고 실행  을 일시 중단시켜 앱의 현재 상태를 관찰한다. 로깅은 과거에 더 초점을 두고 로그 메시지를 수집  하여 타임라인 위주로 실행을 분석한다."</font>

 
# 프로파일링 기법으로  리소스 사용 문제 파악하기
---

<font color="#5EA33E"><strong>p.131</strong> "프로파일러는 실행 중인 JVM 프로  세스를 가로채서 다음과 같이 유용한 세부 정보를 제공"</font>

![[annotations/attachments/TroubleshootingJava/image-131-x69-y73.png|300]]


<font color="#5EA33E"><strong>p.132</strong> "프로파일링 도구가 도움이 되는 상황을 세 가지 정도 꼽아보면"</font>


<font color="#49BEFC"><strong>p.132</strong> "비정상적인 리소스 사용량 식별"</font>


<font color="#49BEFC"><strong>p.132</strong> "코드의 어느 부분이 실행되는지 찾기"</font>


<font color="#49BEFC"><strong>p.132</strong> "앱 실행 속도가 저하되는 문제 파악"</font>


### 6.1.1 비정상적인 리소스 사용량 식별
---

**p.132** "프로파일러는 대개 앱이 CPU와 메모리를 어떻게 소비하는지 파악하는 용도로 쓰인다. 그래서 앱  의 특정한 문제를 이해하는 데 도움을 주며, 그런 문제를 조사하는 첫 단추로 활용"


**p.132** "두 가지 범주의 문제점이 발견"


<font color="#49BEFC"><strong>p.132</strong> "스레드 관련 문제(thread-related issue): 동기화가 결여되어 있거나 제대로 되지 않을 때 발생하  는 동시성 문제"</font>


<font color="#49BEFC"><strong>p.132</strong> "메모리 누수(memory leak): 불필요한 데이터를 메모리에서 비우지 못하여 앱 실행 속도가 느려  지고 결국 완전히 앱이 멈추게 되는 문제"</font>


**p.133** "리소스를 비정상적으로 사용하는 근본 원인은 코딩 에러 때문에 더 이상 필요 없는 객체의 레퍼  런스가 메모리에 고스란히 남아 있기 때문인 경우가 많다"


<font color="#5EA33E"><strong>p.133</strong> "가비지 컬렉터(Garbage Collector, GC)를 제공하지만 불필요한 데이터의  레퍼런스를 삭제하는 일은 여전히 개발자의 몫"</font>


<font color="#EF7DFA"><strong>p.133</strong> "객체 레퍼런스를 붙들고  있도록 코드를 짜면 GC는 그 객체를 더 이상 사용하지 않는다는 사실을 알 도리가 없기 때문에  메모리에서 절대로 수거되지 않는다. 이러한 상황을 메모리 누수라고 한다."</font>


### 6.1.2 실행되는 코드 찾기
---

<font color="#5EA33E"><strong>p.134</strong> "프로파일러가 있으면 코드를 직접 들여다보지 않아도 어느 코드가 백그라운드에서 실행 중인지  쉽게 찾을 수 있다. 이런 기능을 샘플링(sampling)이라고 한다."</font>


### 6.1.3 앱 실행 속도가 느려지는 원인을 파악
---

### 6.2.1 VisualVM 설치 및 구성
---

<font color="#5EA33E"><strong>p.136</strong> "어떤 사유로 인해 로컬 프로세스에 접속하지 못할 수도 있다(그림 6.3). 이럴 때는 먼저 프  로파일링할 앱을 시작할 때 VM 인수로 도메인명을 전달해본다."</font>



> [!QUOTE] `-Djava.rmi.server.hostname=localhost`


<font color="#EF7DFA"><strong>p.136</strong> "VisualVM이 해당 JVM 버전을 지원하지 않는 경우에도 비슷한 문제가 생길 수 있다."</font>


**p.137** "탭 중 하나라도(여기서는 Threads 탭) 빠져 있거나,  &#39;Not supported for this JVM(이 JVM은 지원 불가)&#39;라는  에러 메시지가 표시되면 잘못 구성된 것"


### 6.2.2 CPU와 메모리 사용량 관찰
---

<font color="#5EA33E"><strong>p.137</strong> "앱 실  행이 끝난 뒤에도 계속 실행 상태로 남아 앱의 리소스를 차지한 좀비 스레드는 VisualVM에서 바  로 드러난다."</font>


<font color="#5EA33E"><strong>p.140</strong> "GC가 전체 CPU 사용량에서  차지하는 비중이 없다는 사실이 흥미롭다.  이는 일반적으로 동시성 문제로 발생하는  좀비 스레드를나타내는 이상 징후에 해당한다."</font>


**p.141** "컨슈머/프로듀서 스레드가 제대로 일을 하지 못하고 있지만 계속 실행 상태로 남아 시스템 리소  스를 소모하는 듯하다."


<font color="#EF7DFA"><strong>p.141</strong> "GC가 CPU 리소스를 전혀 사용하지 않는다. 앱이 많은 처리 능력을 소비하면서도 실제  로 아무것도 처리하지 않고 있다는 뜻이므로 이 역시 반가운 신호는 아니다."</font>


**p.141** "일반적  으로 좀비 스레드를 나타내는 징후로서 동시성 문제가 생긴 결과"


<font color="#EF7DFA"><strong>p.141</strong> "앱은 메  모리를 거의 사용하지 않고 있다. 이것도 &#39;앱이 아무 일도 하지 않는다&#39;는 것을 의미하므로 좋은 신호  는 아니다."</font>


<font color="#5EA33E"><strong>p.142</strong> "Threads 탭 화면이다. 이 탭에는 실행 중인 스레드와 그 상태  가 보기 좋게 표시되어 있다."</font>


**p.143** "앱 실행 도중 예외가 발생하면 일부 스레드가 중단될 수 있다.  이처럼 멀티스레드 앱은 동시성 문제로 인해 전혀 예기치 못한 현상이 나타날 수 있다."


<font color="#5EA33E"><strong>p.143</strong> "da-ch-ex2는 da-ch6-ex1의 동시성 문제를 해결한 프로젝트다. 스레드 간의 동시 액세스와 경쟁  상태를 방지하기 위해 동기화(synchronized) 블록을 추가했다."</font>


**p.145** "CPU 위젯을 보면 CPU를 훨씬 덜 사용하며, 메모리 사  용량 위젯에는 앱이 실행 중에 할당된 메모리를 일부 사용하는 것으로 나타났다."


**p.145** "CPU 사용량은 낮은 편이다(그림 6.8).그림 6.9에서  Threads 탭을 보면 한 번에 하나의 스레드만 동기화 블록에 들어가도록 모니터가 스레드를 차단  하는 모습이 잘 담겨 있다."


### CED 메모리 누수 현상 식별
---

<font color="#5EA33E"><strong>p.147</strong> "메모리 누수는 앱이 사용하지 않는 객체 레퍼런스가 메모리에 계속 남아 있는 현상"</font>


<font color="#EF7DFA"><strong>p.147</strong> "앱이 할당받은 메모리에서 불필요한 데이터를 비우는 GC도 이런 레퍼런스가 남아 있기 때  문에 삭제할 수가 없다."</font>


<font color="#5EA33E"><strong>p.147</strong> "OOM 에러는 일종의 시한폭탄이다. 사용하지 않는 객체 레퍼런스가 계속 유지되어 GC가 가비지로 수집하지  못하고 점점 더 많은 객체가 생성되면서 언젠가 메모리는 가득 차게 될 것이다.  결국 힙에 더 이상 객체를 할당할 공간이 없으면 OOM 에러가 나고 앱은 실패한다."</font>


<font color="#5EA33E"><strong>p.148</strong> "메모리 누수가 앱에 영향을 미칠 즈음이면 메모리 사용량이 계속 증가하는 양상을 보일  것"</font>


**p.148** "GC는 사용하지 않는 데이터를 메모리에서 비우려고 애쓰지만 그 양은 턱없이 적다."


<font color="#EF7DFA"><strong>p.148</strong> "여기서 OOM 에러 스택 트레이스가 반드시 문제를 일으킨 코드를 가리키는 것은 아니라는 점  을 기억하라."</font>


**p.148** "앱에 할당된 힙 메모리 공간은 하나뿐이므로 어떤 스레드라도 문제를 일으킬 수 있  다. 실제로 메모리 공간을 마지막으로 차지하려고 시도하다가 에러를 낸, 운이 나쁜 스레드도 있을  것이다."


<font color="#5EA33E"><strong>p.148</strong> "근원을 밝히는 가장 확실한 방법은 11장에서 배울 힙 덤프를 살펴보는 것"</font>


**p.149** "메모리 누수가 없는 정상 앱을 보면 그래프에 피크(peak, 봉우리)와 밸리(valley, 골짜기)가 분  명하다. 앱에 필요한 메모리가 할당되고(피크) GC가 불필요한 데이터를 삭제하는(밸리) 일이 반복  되는 것이다."


<font color="#5EA33E"><strong>p.149</strong> "메모리가 점점 채워지는데도 GC가 메모리를 청소를 하지 않는 모습이면 메모리 누수일 가  능성이 있다."</font>


**p.149** "메모리를 더 많이 할당한다고 메모리 누수 문제가 해결되는 것은 아니지만, 근본 원인을 찾는  시간을 조금 더 벌 수 있는 임시방편은 될 수 있다."

![[annotations/attachments/TroubleshootingJava/image-150-x75-y587.png|300]]

![[annotations/attachments/TroubleshootingJava/image-150-x75-y410.png|300]]


**p.150** "그림 6.12 정상 앱과 메모리 누수로 문제가 생긴 앱의 메모리 사용량을 비교한 그림이다. GC는 정상 앱이 사용 중인 메모리에서 불필요한 데이터를 삭제하여 할당된 공간을 가득 차지 않게 정리한다. 메모리 누수가 발생한 앱은 GC가 충분한 데이터를 삭제할 수 없고 언젠가 메모리가 가득 차면 OOM 에러가 발생한다."


<font color="#5EA33E"><strong>p.150</strong> "힙 공간 외에도 모든 자바 앱은 메타스페이스(metaspace)&#39;를 사용한다."</font>


**p.150** "메타데이터 공간에서 OOM 에러가 발생하는 일은 드물지만 불가능한 것은 아니다."


**p.150** "실제로 최  근에 데이터 퍼시스턴스용 프레임워크를 오용한 앱에서 그런 일이 발생하는 현상을 직접 목격한  바 있다. 자바 리플렉션을 사용하는 프레임워크와 라이브러리는 다이내믹 프록시(dynamic proxy)  와 간접 호출(indirect call)에 많이 의존하기 때문에 잘못 사용하면 이런 문제가 발생할 공산이 크  다."


**p.151** "하이버네이트라는 프레임워크...큰 콘텍스트에 사용하기는 적합하지 않다. 즉, DB에서 한 번에 너무 많은 레코드  를 작업하면 안 된다."

 
# 프로파일링 기법으로  숨겨진 이슈 찾기
---

<font color="#5EA33E"><strong>p.153</strong> "매우 중요한 세 가지 프로파일링 조사 기법"</font>


<font color="#49BEFC"><strong>p.154</strong> "•샘플링을 통해 앱 코드의 어떤 부분이 실행되는지 확인한다."</font>


<font color="#49BEFC"><strong>p.154</strong> "실행을 프로파일링(인스트루멘테이션(instrumentation)이라고도 한다)하여 잘못된 부분을 찾아내  최적화한다."</font>


<font color="#49BEFC"><strong>p.154</strong> "앱을 프로파일링하여 DB와 통신하는 SQL 쿼리를 식별한다(DBMS)."</font>


<font color="#5EA33E"><strong>p.154</strong> "샘플링은 프로파일러로 앱이 실행하는 코드를  찾아내는 방법"</font>


**p.154** "샘플링은 항상 앱 프로파  일링의 첫 단계로 활용하는 것이 좋고, 사실 샘플링만으로도 충분한 경우가 많다."


<font color="#5EA33E"><strong>p.156</strong> "본인이 코드를 잘 모르는 앱의 속도 저하 문제를 조사할 때는 제일 먼저 프로파일러를 떠올리는  것이 좋다."</font>


**p.158** "샘플링은 디버깅을 어느 부분부터 시작해  야 좋을지 모를 때(특히, 이 장 앞부분에서 언급했듯이 앱 코드가 깔끔하게 설계되지 않은 경우) 결정적인  힌트를 줄 수 있다."


<font color="#5EA33E"><strong>p.159</strong> "주목해야 할 부분은 CPU 시간(메서드가 일한 시간)이 0이라는 사실이다. 이 메서드는 실행  하는 데 5초라는 시간을 썼지만, HTTP 호출을 하고 응답을 대기만 했기 때문에 CPU 리소스를 전  혀 사용하지 않았다."</font>


<font color="#5EA33E"><strong>p.160</strong> "디펜던시에 있는 메서드를 들여다보는 일이 왜 중요한 걸까? 다른 방법으로는 어떤 디펜던시에서  무슨 일을 하는지 파악하기가 거의 불가능할 때가 많기 때문이다."</font>


**p.160** "오 늘날 많은 자바 프레임워크에서 디펜던시는 다이내믹 프록시를 사용해서 구현체를 디커플링하기  때문에 발생한다."


<font color="#EF7DFA"><strong>p.161</strong> "프레임  워크의 기능을 빌려 쓰는 것은 쉬워도 문제가 생기면 어디서부터 조사해야 할지 막막해진다."</font>

![[annotations/attachments/TroubleshootingJava/image-161-x96-y329.png|300]]


**p.161** "다이내믹 프록시로 코드를 추상화하고 런타임 구현체를 선택하여 사용할 수 있는  프레임워크를 쓴다면, 코드만 읽는 것만으로는 문제의 원인을 찾기가 매우 어렵다."


<font color="#5EA33E"><strong>p.161</strong> "나는 개인적으로 새로운 프레임워크나 라이브러리를 배울 때 샘플링을 많이 활용한다. 샘플링은 어떤 새로운 기능이 백그라운드에서 무슨 일을 하는지 이해하는 데 도움이 된다."</font>

 
## 7.2 프로파일링으로 메서드의 실행 횟수 파악
---

<font color="#5EA33E"><strong>p.162</strong> "코드 범위를 제한하는 방법이다. Profiler 탭의 우측에서 앱의 어느 부분을 가로챌지 지  정한다. 이 예제는 다음과 같이 지정하겠다."</font>

![[annotations/attachments/TroubleshootingJava/image-162-x80-y249.png|300]]


**p.162** "각 규칙마다 별도의 라인에 작성한다."


**p.162** "싱글 애스터리스크(*)는 패키지를 가리킨다. 예를 들어, com.example.*는 com.example 패키지  의 모든 클래스를 프로파일링 대상으로 지정한다는 뜻이다."


**p.162** "더블 애스터리스크(**)는 패키지와 그 하위 패키지를 모두 가리킨다. 예를 들어 com.example.**  는 com.example 패키지의 모든 클래스와 그 하위 패키지를 의미한다."

 
## 7.3 프로파일러로 앱이 실제로 실행하는 SQL 쿼리 파악
---

<font color="#5EA33E"><strong>p.164</strong> "SQL 쿼리를 실행하는 과정에서  레이턴시가 발생하기도 한다."</font>


**p.164** "최신 퍼시스턴스 프레임워크나 라이브러리는 앱에서 SQL 쿼  리를 동적 생성하여 DB에 전송하는데, 이런 쿼리를 찾아내기란 여간 어려운 게 아니다. 하지만 프  로파일러의 마법을 동원하면 조사 과정을 크게 간소화할 수 있다."


**p.164** "프레임워크 없이 직접 DB에 SQL 쿼리를 보내는 간단한 앱에서 프로파일러로 앱이 실행한 쿼리를  가져오는 방법이다."


<font color="#5EA33E"><strong>p.166</strong> "프로  파일러를 사용하면 앱이 DB에 보낸 모든 SQL 쿼리를 알아낼 수 있다(그림 7.10). CPU 버튼 대신  JDBC 버튼을 클릭하면 SQL 쿼리를 프로파일링할 수 있다."</font>


**p.167** "프로파일러는 쿼리를 보낸 횟수도 알려준다."

![[annotations/attachments/TroubleshootingJava/image-168-x64-y478.png|300]]


**p.169** "요즘 앱은 이렇게 자  바로 직접 쿼리를 만드는 네이티브 코드 대신, 일반적으로 하이버네이트(가장 많이 쓰이는 자바 퍼시  스턴스 API(JPA) 구현체)나 자바 객체 지향 쿼리(jooQ)&#39; 같은 프레임워크를 더 많이 사용한다."


### 7.3.2 프로파일러로 프레임워크에서 생성된 SQL 쿼리 식별
---

<font color="#5EA33E"><strong>p.170</strong> "사용자가 설정한 내용에 따라 백그라운드에서 SQL 쿼리를 생성하는 프레임워크를 사용하  면 실제로 실행된 쿼리가 무엇인지 알기가 어렵다. 하지만 프로파일러를 사용하면 쿼리가 DB로 전  달되기 전에 JDBC 드라이버에서 쿼리를 가져올 수 있다."</font>


<font color="#5EA33E"><strong>p.170</strong> "서비  스 로직이 동일하고 앱이 리포지터리 메서드를 10번 호출했지만 하이버네이트는 두 번째 쿼리를...한 번만 실행함으로써 가능한 한 최적화했다."</font>


**p.171** "메서드는 10번 호출됐지만 쿼리는 한 번만 실행됐다. 퍼시스턴스 프레임워크는 보통 이와 같은 트  릭을 자유자재로 구사하는 반면, 물밑에서 수행하는 작업 때문에 복잡도가 가중될 수 있다. 프레  임워크를 제대로 이해하지 못한 개발자가 문제가 있는 코드를 작성하는 경우도 있을 것이다."


**p.171** "필자의 경험상 퍼시스턴스 프레임워크가 일으키는 대부분의 문제는 다음과 같이 정리할 수 있다."


<font color="#49BEFC"><strong>p.171</strong> ". 레이턴시를 유발하는 느린 쿼리 프로파일러로 실행 시간을 조사하면 쉽게 찾아낼 수 있다."</font>


<font color="#49BEFC"><strong>p.171</strong> "• 프레임워크가 생성한 다수의 불필요한 쿼리"</font>


<font color="#8F65F7"><strong>p.171</strong> "개발자 사이에서는 N+1 쿼리 문제로 더 잘 알려져  있다."</font>


<font color="#49BEFC"><strong>p.171</strong> "잘못된 앱 설계로 발생한 긴 트랜잭션 커밋"</font>


<font color="#EF7DFA"><strong>p.171</strong> "개발자가 프레임워크를 올바르게 사용하지 않을 경우, 초기 쿼리로 데이...터의 일부만 가져온 뒤, 각 레코드를 반복하면서 따로 쿼리를 실행할 가능성이 있다. 따라서 프레  임워크는 하나의 쿼리 대신, 초기 쿼리 · N개의 다른 쿼리(첫 번째 쿼리가 검색한 N개 레코드마다 하  나씩)를 전송한다. 이것을 N+1 쿼리 문제(N1 query problem)라고 하는데, 이렇게 실행하면 많은  쿼리가 실행되므로 상당한 레이턴시가 발생"</font>


<font color="#EF7DFA"><strong>p.172</strong> "이런 종류의 문제를 조사할 때 로그를 사용하면 일단 어떤 쿼리가 문제인지 식별하기가 어렵다는  단점이 있다."</font>


<font color="#5EA33E"><strong>p.172</strong> "da-ch7-ex3 프로젝트의 설정 프로퍼티 파일에 다음 매개변수를 추가하면 하이버네이트에서 생성  된 쿼리를 로그에 출력하도록 구성할 수 있다."</font>

![[annotations/attachments/TroubleshootingJava/image-172-x77-y300.png|300]]


**p.172** "예제 7.5는 로그에 출력된 쿼리다."

![[annotations/attachments/TroubleshootingJava/image-172-x80-y83.png|300]]


<font color="#5EA33E"><strong>p.173</strong> "레이턴시 문제를 조사할 때는 언제나 프로파일러로 시작하는 것이 좋다. 첫 번째 단계는 샘플링이다. SQL 쿼  리 문제가 의심된다면 JDBC에 관한 프로파일링을 수행하라."</font>


### 7.3.3 프로파일러로 프로그램에서 생성된 SQL 쿼리 식별
---

**p.173** "프로그래밍 방식(programmatically)으로 쿼리를 정의하는 앱에서는 프로파일러가 어떻게  도움을 주는지 살펴보자."

![[annotations/attachments/TroubleshootingJava/image-174-x87-y513.png|300]]


<font color="#EF7DFA"><strong>p.174</strong> "제품  테이블과 자기 스스로 셀프 조인(selfjoin)을 하고 있다. 심각한 문제다! 이 예제는 테이블에 레코  드가 달랑 10개뿐이라 별로 대수롭지 않아 보일 수도 있지만, 실제 앱이라면 테이블에 엄청나게 많  은 레코드가 존재할 텐데, 이렇게 크로스 조인을 하면 엄청난 레이턴시는 피할 수 없고 결국 잘못  된 아웃풋(중복된 행)이 표시될 것이다."</font>


<font color="#5EA33E"><strong>p.174</strong> "쿼리 프로  파일링을 개발 프로세스의 일부분으로 습관화하라고 개발자들에게 조언한다."</font>


**p.174** "이슈 찾기(finding issues)보다 감사(auditing)에 더 가깝다."


<font color="#5EA33E"><strong>p.177</strong> "프로파일러는 앱의 실행을 가로채서 각 스레드의 실행 스택 트레이스, 각 메서드의 실행 시간,  특정 메서드의 호출 횟수 등 실행 중인 코드에 관한 필수 세부 정보를 제공"</font>

 
# 프로파일링한 데이터에  고급 시각화 도구 적용하기
---

<font color="#5EA33E"><strong>p.179</strong> "앱의 객체 간 디펜던시를 시각화한 호출 그래프의 간단한 사용법"</font>


<font color="#5EA33E"><strong>p.180</strong> "실행 스택의 또 다른 표현 형태인 플레임 그래프(flame  graph)"</font>


<font color="#5EA33E"><strong>p.180</strong> "관계형 DB를 사용하지 않고 &#39;NoSQL 기술 제품군에 속하는 다른  퍼시스턴스 기술을 사용하는 경우에 퍼시스턴스 레이어가 어떻게 작동되는지 분석하는 기법"</font>

 
## 8.1 JDBC 접속 문제 감지
---

**p.180** "쿼리를 보내려는 앱이 DB에 커넥션을 맺을 때부터 문제가 생기면 어떻게 대처해야 할까?"


<font color="#5EA33E"><strong>p.181</strong> "스프링이 트랜잭션을 관리하는 표준 메서드 실행 모드에서는 스프링이 제일 마지막에 커넥션을  닫는다."</font>


<font color="#EF7DFA"><strong>p.181</strong> "하지만 스프링 배치(Spring Batch)2의 배치 모드에서 프로시저를 취소하는 경우에는 스프  링이 알아서 닫아주지 않기 때문에 개발자가 직접 챙겨야 한다."</font>


<font color="#5EA33E"><strong>p.181</strong> "모든 DB는 클  라이언트(즉, 앱)의 커넥션 수를 제한한다(예: 100개)."</font>


**p.181** "커넥션을 맺은 후 제대로 닫지 않으면  리소스가 고갈되어 더 이상 DB에 접속하지 못하게 된다"


**p.186** "JProfiler는 샘플링을 할 것인지, 아니면 인스트루멘테이션(프로파일링)을 할 것인지 묻는다(그림  8.6). 우리는 프로파일러로 JDBC 커넥션에 관한 세부 정보를 얻고 실행 과정을 심층 분석하려는  의도이므로 인스트루멘테이션을 선택"


<font color="#5EA33E"><strong>p.189</strong> "Connection Leaks 탭을 보니 역시 예상했던 대로다(그림 8.10). 수많은 커넥션이 열렸지만 앱이 응  답한 후에도 닫히지 않은 채 그대로 남아 있다. 명백한 커넥션 리크 현상이다."</font>

![[annotations/attachments/TroubleshootingJava/image-189-x56-y91.png|300]]


<font color="#5EA33E"><strong>p.190</strong> "]Profiler의 CPU 프로파일링 기능을 켜고 다시 앱  을 실행하면 커넥션마다 자신을 생성한 메서드를 추적할 수 있는 스택 트레이스가 표시된다"</font>


<font color="#5EA33E"><strong>p.192</strong> "개발자가 코드를 작  성하거나 버그를 조치하고 10분 정도 시간을 들여 프로파일러로 점검하는 것이 최선"</font>

 
## 8.2 호출 그래프를 보고 앱의 코드 설계 파악
---
![[annotations/attachments/TroubleshootingJava/image-194-x62-y80.png|300]]

 
## 8.3 플레임 그래프를 그려 성능 문제 밝히기
---
![[annotations/attachments/TroubleshootingJava/image-196-x63-y366.png|300]]


<font color="#5EA33E"><strong>p.196</strong> "하나의 메서드는 다른 여러 메서드를 호출할 수 있다. 플레임 그래프에서 호출된 메서드는 동일한 레벨에 표시되는데, 이때 가로축 막대의 길이는 각각 (그 하위 레벨에서) 자신을 호출한 메서드에 대  한 상대적인 소요 시간이다."</font>


<font color="#5EA33E"><strong>p.197</strong> "플레임 그래프는 길을 잃기가 쉬운 모습이다. 그림 8.17과 8.18은 학습을 위해  예로 든 간단한 사례일 뿐, 실제 앱은 플레임이 이보다 훨씬 더 복잡할 것이다. 그래서 JProfiler에  서는 메서드, 클래스 또는 패키지별로 레이어에 색상을 넣으면 조금 더 보기가 편해진다."</font>

 
## 8.4 NOSQL DB에서의 쿼리 분석
---
 
# 멀티스레드 아키텍처의  락 문제 조사하기
---
 
# 스레드 덤프로  데드락 문제 조사하기
---
 
# 앱 실행 중  메모리 관련 이슈 찾기
---
 
# 대규모 시스템에 배포된  앱의 동작 조사하기
---

