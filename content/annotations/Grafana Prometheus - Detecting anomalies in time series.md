---
title: "Grafana Prometheus: Detecting anomalies in time series"
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2026-01-24
---
[Source](https://blog.davidvassallo.me/2021/10/01/grafana-prometheus-detecting-anomalies-in-time-series/) 
# Grafana Prometheus: Detecting anomalies in time series
---

<font color="#5EA33E"><strong>p.</strong> "the 3-sigma rule states that approximately all our “normal” data should be within 3 standard deviations of the average value of your data."</font>


<font color="#5EA33E"><strong>p.</strong> "The Z-Score Formula"</font>



> [!QUOTE] Z = (x - µ) / σ


<font color="#49BEFC"><strong>p.</strong> "A datapoint to describe a range interval (x)"</font>


<font color="#49BEFC"><strong>p.</strong> "The mean of our data over a longer period of time (μ)"</font>


<font color="#49BEFC"><strong>p.</strong> "The standard deviation over the same (longer) period of time (σ)"</font>


<font color="#5EA33E"><strong>p.</strong> "Another interesting point is that the anomaly query automatically handles two different scenarios as shown below:"</font>



> [!QUOTE] 수는 적지만 큰 폭의 Spike가 존재한다면 Z Score의 크기가 그 지점에서 커지므로 허용 범위도 넓어진다. 반대로, 적은 범위의 Spike이지만 건 수가 많이 발생한 경우에도 Z Score는 증가한다. 후자의 경우 유효한 의미가 있는지는 잘 모르겠다. 적절한 범위만큼의 허용치만을 주는 것이 좋지 않나...?


