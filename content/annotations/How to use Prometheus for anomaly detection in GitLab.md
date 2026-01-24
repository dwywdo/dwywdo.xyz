---
title: How to use Prometheus for anomaly detection in GitLab
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2026-01-24
---
[Source](https://about.gitlab.com/blog/anomaly-detection-using-prometheus/) 
# How to use Prometheus for anomaly detection in GitLab
---
 
## Why is anomaly detection useful?
---
 
## What level of aggregation is the correct one?
---
 
## Using z-score for anomaly detection
---

<font color="#5EA33E"><strong>p.</strong> "The z-score is measured in the number of standard deviations from the mean. So a z-score of 0 would mean the z-score is identical to the mean in a data set with a normal distribution, while a z-score of 1 is 1.0 σ from the mean, etc."</font>



> [!QUOTE] Z Score는 평균으로부터 표준편차를 기준으로 얼마만큼 떨어져있는가를 판단하는 수치 (1이라면 1 * 표준편차만큼 평균으로부터 특정 데이터가 떨어져 있는 것)


### What if you don’t have a normal distribution?
---
 
## Detecting anomalies using seasonality
---

<font color="#5EA33E"><strong>p.</strong> "Seasonality is a characteristic of a time series metric in which the metric experiences regular and predictable changes that recur every cycle."</font>


**p.** "The seven-day range is referred to as the “offset,” meaning the pattern that will be measured."


<font color="#5EA33E"><strong>p.</strong> "By leveraging the seasonality in our time series data we can create more accurate predictions which will lead to better anomaly detection."</font>


### How do we leverage seasonality?
---

<font color="#5EA33E"><strong>p.</strong> "In the first iteration, we calculate by adding the growth trend we’ve seen over a one-week period to the value from the previous week."</font>



> [!QUOTE] 1주 전의 `Rate[5m]` 값 + 최근 1주간의 `Rate[5m]`에 대한 평균 - 2주 전 ~ 1주 전까지의 1주간의 `Rate[5m]`에 대한 평균
> 1주 전의 `Rate[5m]`을 기준으로 현재 시점의 `Rate[5m]` 값은 얼마나 증가/감소했을지에 대한 값을 기준점 이전 1주간의 평균값의 증감을 사용해서 예측한다.


**p.** "The first iteration is a bit narrow; we’re using a five-minute window from this week and the previous week to derive our predictions."


<font color="#5EA33E"><strong>p.</strong> "In the second iteration, we expand our scope by taking the average of a four-hour period for the previous week and comparing it to the current week."</font>


**p.** "we use the average value for the metric from 6am until 10am for the previous morning."



> [!QUOTE] 정확하게 1주 전의 동일한 시간의 값을 1주 전의 `Rate[5m]` 값으로 삼는 것이 아니라, 1주 전의 해당 시간의 앞-뒤 2시간, 즉 4시간동안의 평균 값을 기준점으로 삼는다.
> - `avg_over_time(job:http_requests:rate5m[4h] offset 166h`


**p.** "We use the 166 hours in the query instead of one week because we want to use a four-hour period based on the current time of day, so we need the offset to be two hours short of a full week."



> [!QUOTE] 왜 오프셋 값이 166시간인가? (24 * 7 = 168 아닌가?)
> 해당 시간을 기준으로 앞 뒤 2시간의 평균 값을 사용하고 싶은 것이기 때문에 2시간을 `덜` 밀어야 한다.


<font color="#EF7DFA"><strong>p.</strong> "However, this method has a flaw."</font>



> [!QUOTE] 보통 휴일이냐 아니냐를 기준으로 트래픽 양도 영향을 받는데, 이런 일시적인 경우에 대해 보정(Normalization)해줄 필요가 있다.


<font color="#5EA33E"><strong>p.</strong> "This can be fixed by making three predictions for three consecutive weeks before Wednesday, May 1"</font>



> [!QUOTE] 3주치에 대해 모두 고려한다.


<font color="#5EA33E"><strong>p.</strong> "we want to calculate the median. Prometheus does not have a median query, but we can use a quantile aggregation in lieu of the median."</font>



> [!QUOTE] 3주치에 대한 값들의 중간값을 얻기 위해 Quantile(0.5)를 걸어서 예측값으로 활용한다


**p.** "To avoid confusion, we create a label called offset and use the label-replace function to add an offset to each of the three weeks."



> [!QUOTE] Quantile Aggregation은 인자로 주어진 시계열 데이터끼리의 레이블 조합이 모두 동일하면 별개의 시계열 데이터로 보지 않고 하나의 시계열 데이터의 시간에 따른 값들이라고 생각하기 때문에 원하는 결과가 나오지 못한다. 그래서 각각 별도의 시계열 데이터로 인식할 수 있도록 트릭을 쓴다.


### How do we know our prediction is truly accurate?
---

<font color="#5EA33E"><strong>p.</strong> "To test the accuracy of our prediction, we can return to the z-score. We can use the z-score to measure the sample&#39;s distance from its prediction in standard deviations."</font>



> [!QUOTE] 샘플의 실제 값과 예측 값 사이의 차이 (거리)를 Z Score를 기준으로 판단하여 얼마나 예측이 정확할 지 판단해볼 수 있다.

 
## How to set up alerting using Prometheus
---

<font color="#5EA33E"><strong>p.</strong> "If you want to set up alerts for anomaly events, you can apply a pretty straightforward rule to Prometheus that checks if the z-score of the metric is between a standard deviation of +2 or -2."</font>



> [!QUOTE] 실제 값과 예측 값의 차이를 표준편차로 나눈 결과가 (X-X')/(표준편차)가 2보다 크거나 -2보다 작은 경우 이상치라고 판단하여 알람을 걸 수 있다.


