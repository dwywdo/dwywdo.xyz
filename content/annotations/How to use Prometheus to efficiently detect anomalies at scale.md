---
title: How to use Prometheus to efficiently detect anomalies at scale
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2026-01-25
---
[Source](https://grafana.com/blog/how-to-use-prometheus-to-efficiently-detect-anomalies-at-scale/) 
# How to use Prometheus to efficiently detect anomalies at scale
---

**p.** "When you investigate an incident, context is everything."


**p.** "time is of the essence in these scenarios, so having that context at your fingertips can be the difference between a quick resolution and a protracted trip down an incident rabbit hole."


<font color="#5EA33E"><strong>p.</strong> "we developed an anomaly detection framework based solely on PromQL."</font>



> [!QUOTE] `Solely on PromQL` <- 강조하고 싶은 대목인듯...

 
## How we approached building an anomaly detection framework
---

<font color="#49BEFC"><strong>p.</strong> "No external systems."</font>



> [!QUOTE] Prometheus와 호환되면서 별도의 다른 외부 도구에 의존하지 않았으면 했음 (Built-in Prometheus Feature로만 구현하고자 함)


<font color="#49BEFC"><strong>p.</strong> "Performant at scale."</font>



> [!QUOTE] Scale이 커지더라도 성능 상 큰 손해가 없어야 함


<font color="#49BEFC"><strong>p.</strong> "No magic."</font>



> [!QUOTE] 쉽게 설명하고 적용 가능하기를 원했음

 
## Establishing baselines: a first attempt
---

**p.** "Baselines = average ± stddev * multiplier"



> [!QUOTE] 평균으로부터 Z Score의 얼마 배수만큼 떨어져 있는가 :)


### Average
---

<font color="#EF7DFA"><strong>p.</strong> "Selecting the time window was the biggest choice we had to make here, since there’s a tradeoff between how much your middle line is lagging behind your metric and the smoothing factor you have to apply."</font>



> [!QUOTE] 얼만큼의 Time Window를 설정할 것인가 -> 길게 반영할수록 급격한 지표 Spike에 대응하는 속도가 늦어진다.


**p.** "We found that one hour was the sweet spot, as the system is tuned for short-term anomaly detection (large deviations in small time frames)"



> [!QUOTE] `avg_over_time(metric[1h])`


### Standard deviation
---

**p.** "we chose a larger time window here so we could incorporate as much information as possible to come up with bands that actually adapt to fluctuations in your metric:"



> [!QUOTE] `stddev_over_time(metric[26h])`


<font color="#5EA33E"><strong>p.</strong> "For example, if you have something that happens every 24 hours, you might get strange patterns where your bands start contracting or expanding."</font>



> [!QUOTE] 24시간마다 발생하는 무언가의 이벤트가 있다면, 예측치 또한 24시간마다 범위가 넓어지거나 줄어지는 패턴이 생겨버리게 될 것. 이에 대한 보정 (Normalization)을 위해 26시간으로 설정한다.


### Multiplier and final formula
---

<font color="#5EA33E"><strong>p.</strong> "here is how we expressed that initial formula as a recording rule:"</font>



> [!QUOTE] `avg_1h + stddev_26h * on() group_left stddev_multiplier`


<font color="#EF7DFA"><strong>p.</strong> "We use group_left to tell Prometheus to ignore labels since we don’t have any on the right side of the equation."</font>



> [!QUOTE] `group_left`: 오른쪽 (상수인 2)의 Label은 무시하고 매치되는 레이블을 찾아 연산하는 Prometheus의 곱셈 특성을 무시하기 위한 것

 
## Overcoming challenges
---

### Extreme outliers
---

<font color="#EF7DFA"><strong>p.</strong> "Because the standard deviation formula squares the differences, it can grow much faster than the average. As a result, extreme spikes can cause your bands to expand rapidly and you stop detecting anomalies, essentially rendering your system useless."</font>



> [!QUOTE] 처음에는 탐지가 가능하지만, 그 결과로 탐지 Band의 허용치 또한 함께 커지기 때문에 그 이후의 더 작은 수준의 Spike (Anomaly)에 대해서는 탐지가 불가능해지게 된다.


<font color="#5EA33E"><strong>p.</strong> "We needed to control the rate at which those bands expanded, so we added a smoothing function to address the trade off between band sensitivity and false positives."</font>



> [!QUOTE] 표준편차가 곱해지는 것에 의해 발생하므로, 표준편차 값을 그대로 사용하는 것이 아니라 Smoothing Function을 적용한다.
> - stddev_1h = `stddev_over_time(metric[1h])`
> - stddev_st = `avg_over_time (stddev_1h[26h])`


### Low sensitivity
---

<font color="#EF7DFA"><strong>p.</strong> "The smoothing function did what we wanted, but it also resulted in a bit of an overcorrection. The bands were too narrow and not sensitive enough, which could lead to lots of false positives since the bands didn’t capture the normal fluctuations."</font>



> [!QUOTE] Smoothing Function은 의도한대로 동작했지만, 허용치를 너무 좁혀서 False Positive의 빈도가 높아지기 시작하는 문제가 있었다.


**p.** "When you have a stable period and a standard deviation close to zero, the bands don’t expand fast enough."



> [!QUOTE] stddev 기반으로 밴드를 만들 때 아주 안정적인 구간(거의 직선인 구간)이 섞여 있으면 stddev가 0에 가깝게 나오고, 그러면 전체적으로 밴드가 너무 좁아져서 민감도가 떨어져버리는 결과가 나온다. 이렇게 “고정적인(변동 거의 없음)” 구간과 “요동치는(변동 큼)” 구간이 한 데이터셋 안에 섞이면, 결과적으로 표준편차 값이 희석(watered down)돼서 진짜로 변동성이 큰 구간을 제대로 반영하지 못함. 그래서 결국은 1시간 단위 표준편차를 구한 뒤, 이 값이 너무 작다 (안정 상태다) 라고 판단되는 구간은 무시하도록 구현함.


<font color="#5EA33E"><strong>p.</strong> "To adapt to the threshold, we used a statistical concept known as coefficient of variation:"</font>



> [!QUOTE] 그럼 ????에는 어떤 값이 들어가야 하는가? 고정값을 쓰게 되면 모든 상황에 사용할 수 없게 된다 (메트릭마다 스케일이 다르기 때문에...) 지표의 절대 수치 (크기)에 관계 없이 적용하기 위해 Coefficient of variation (변동계수)의 개념을 적용했다.
> - stddev_1h:filters = `stddev_over_time(metric[1h]) > avg_1h * on() group_left threshold_by_covar`


### Discontinuities
---

<font color="#EF7DFA"><strong>p.</strong> "The filtering of low variability periods created another challenge"</font>



> [!QUOTE] 필터링을 적용하니까 안정된 구간이 길수록 (서비스에 별 일이 없을수록) 전부 다 필터링되어서 허용치 밴드 값이 아예 사라져버린다...


**p.** "we introduced a new band that complements the one we just defined. It’s based on the average, and its purpose is to define the minimum width we’re willing to accept:"



> [!QUOTE] 그래서 최소 허용치 밴드 폭을 보장하는 Margin 밴드를 정의하고 최종적으로 두 밴드를 합쳐서 사용하게 됨


### Long-term recurrent patterns
---

**p.** "This last scenario we had to accommodate for was seasonality such as cron jobs or any other spike that happens the same time every week."



> [!QUOTE] Cron Job 같은 작업이 있는 경우 Anomaly가 아님에도 (이미 여러번 반복...) 이상치로 간주될 수 있다.


**p.** "This rule looks back at past behavior to predict future behavior and expand the bands before we hit any spike. It’s a simple solution, but we found it works really well in practice."



> [!QUOTE] 그래서 과거 같은 시각에 보였던 패턴을 보고, 그 시간대가 되기 전에 밴드를 넓혀주는 처리가 필요하다.

 
## How you can use the framework for your systems
---

### Where to go from here
---

**p.** "Anomaly detection can provide great context, but anomalies aren’t strong enough signals on their own to indicate something is wrong"


<font color="#5EA33E"><strong>p.</strong> "So the next step in making the data actionable is to tie the framework back to your pre-established, SLO-based alerts as part of your root-cause analysis workflow."</font>


