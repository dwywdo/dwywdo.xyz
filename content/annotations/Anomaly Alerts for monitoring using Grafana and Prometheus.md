---
title: Anomaly Alerts for monitoring using Grafana and Prometheus
description:
draft: false
tags:
  - annotation
aliases:
permalink:
date: 2026-01-24
---
[Source](https://dev.to/darnahsan/anomaly-alerts-for-monitoring-using-grafana-and-prometheus-11l8) 
# Anomaly Alerts for monitoring using Grafana and Prometheus
---

**p.** "I started off by setting up threshold alerts and soon the alerts became too noisy as all these nodes are very small ranging from 1-2GB Mem with 1vCPU."


**p.** "Most of the stress was on the node due to its limited capacity and the alerts would be for Load, CPU, Memory and Disk on node level and not the services level."


<font color="#5EA33E"><strong>p.</strong> "&quot;the 3-sigma rule states that approximately all our “normal” data should be within 3 standard deviations of the average value of your data.&quot;"</font>

 
## CPU
---

**p.** "avg_over_time(node_cpu_seconds_total{instance=&quot;mark-00-sin&quot;, job=&quot;node-exporter-mark-00-sin&quot;, mode=&quot;idle&quot;}[$__rate_interval])"


**p.** "- avg_over_time(node_cpu_seconds_total{instance=&quot;mark-00-sin&quot;, job=&quot;node-exporter-mark-00-sin&quot;, mode=&quot;idle&quot;}[1d])"


**p.** "/stddev_over_time(node_cpu_seconds_total{instance=&quot;mark-00-sin&quot;, job=&quot;node-exporter-mark-00-sin&quot;, mode=&quot;idle&quot;}[1d])"

 
## Memory
---

**p.** "avg_over_time(node_memory_MemAvailable_bytes{instance=&quot;mark-00-sin&quot;, job=&quot;node-exporter-mark-00-sin&quot;}[$__rate_interval])"


**p.** "-avg_over_time(node_memory_MemAvailable_bytes{instance=&quot;mark-00-sin&quot;, job=&quot;node-exporter-mark-00-sin&quot;}[1d])"


**p.** "/(stddev_over_time(node_memory_MemAvailable_bytes{instance=&quot;mark-00-sin&quot;, job=&quot;node-exporter-mark-00-sin&quot;}[1d]))"

 
## Load
---

**p.** "avg_over_time(node_load15{instance=&quot;mark-00-sin&quot;, job=&quot;node-exporter-mark-00-sin&quot;}[$__rate_interval])"


**p.** "- avg_over_time(node_load15{instance=&quot;mark-00-sin&quot;, job=&quot;node-exporter-mark-00-sin&quot;}[1d])"


**p.** "/stddev_over_time(node_load15{instance=&quot;mark-00-sin&quot;, job=&quot;node-exporter-mark-00-sin&quot;}[1d])"

 
## Disk
---

**p.** "avg_over_time(node_filesystem_avail_bytes{instance=&quot;mark-00-sin&quot;, job=&quot;node-exporter-mark-00-sin&quot;, device=&quot;/dev/sda&quot;}[$__rate_interval])"


**p.** "- avg_over_time(node_filesystem_avail_bytes{instance=&quot;mark-00-sin&quot;, job=&quot;node-exporter-mark-00-sin&quot;, device=&quot;/dev/sda&quot;}[1d])"


**p.** "/(stddev_over_time(node_filesystem_avail_bytes{instance=&quot;mark-00-sin&quot;, job=&quot;node-exporter-mark-00-sin&quot;, device=&quot;/dev/sda&quot;}[1d]))"


<font color="#5EA33E"><strong>p.</strong> "Thats a lot of PromQL theory but does it work any better than Threshold alerts and brings some sanity to alerting."</font>


<font color="#5EA33E"><strong>p.</strong> "As always, the effectiveness of anomaly detection depends on the quality and consistency of the data being collected, in my case using Prometheus, and you may need to adjust thresholds or use more advanced techniques based on your specific use case and system characteristics."</font>



> [!QUOTE] 단순 Threshold 기반 vs. Z-score 기반의 Anomaly Detection 무엇이 더 우열에 있다고 하기에는 더 정해져야 할 부분이 많다 (지표의 퀄리티 / 샘플의 수 / ...)


