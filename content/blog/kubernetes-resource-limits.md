---
title: "Kubernetes Resource Limits: The Right Way to Keep Workloads Stable"
slug: "kubernetes-resource-limits"
date: "2024-12-03"
excerpt: "Missing or misconfigured resource requests and limits are the leading cause of noisy-neighbour problems and OOMKilled containers. Here's how to set them correctly."
tags:
  - Kubernetes
  - DevOps
  - Platform Engineering
  - Reliability
readTime: 8
metaDescription: "A hands-on guide to Kubernetes resource requests, limits, QoS classes, VPA, and LimitRange policies — with real-world recommendations for production clusters."
---

## The Hidden Cost of Not Setting Limits

Every Kubernetes cluster without explicit resource requests and limits eventually ends up with the same symptoms: intermittent `OOMKilled` pods, nodes that mysteriously max out CPU at 3 AM, and HPA that refuses to scale because `metrics-server` can't get meaningful numbers.

Resource configuration isn't optional for production clusters. This guide walks through the concepts and practical patterns I use across client engagements.

---

## Requests vs Limits: The Mental Model

Two separate levers control how Kubernetes allocates resources:

| Field | What it does | When it matters |
|---|---|---|
| `requests` | Minimum guaranteed — scheduling decision | At pod scheduling time |
| `limits` | Hard ceiling — enforced by cgroups | At runtime |

The scheduler places a pod on a node that has **at least** the sum of all containers' `requests` available. The `limits` then cap what each container can actually consume at any point in time.

```yaml
resources:
  requests:
    cpu: "250m"       # 0.25 vCPU guaranteed
    memory: "256Mi"   # 256 MiB guaranteed
  limits:
    cpu: "1000m"      # Max 1 vCPU
    memory: "512Mi"   # Max 512 MiB — exceeding this → OOMKilled
```

---

## QoS Classes and Why They Matter for Eviction

Kubernetes assigns each pod a **Quality of Service (QoS) class** based on its resource configuration. This class determines eviction priority when a node is under memory pressure:

| QoS Class | Condition | Eviction Priority |
|---|---|---|
| `Guaranteed` | requests == limits for all containers | Evicted last |
| `Burstable` | At least one container has requests < limits | Evicted middle |
| `BestEffort` | No requests or limits set | Evicted first |

**Recommendation:** Production workloads should be `Guaranteed` (requests == limits) for memory, and `Burstable` for CPU. Memory is incompressible — when a container exceeds its limit, it's killed. CPU over-limit just means throttling, which is recoverable.

```yaml
# Guaranteed memory, Burstable CPU — common production pattern
resources:
  requests:
    cpu: "500m"
    memory: "512Mi"
  limits:
    cpu: "2000m"      # Allow CPU burst
    memory: "512Mi"   # Lock memory — no surprises
```

---

## Choosing the Right Values

Guessing at limits is dangerous. Set them too low and you get OOMKilled or CPU throttled processes; too high and you waste capacity. The right approach:

### Step 1: Run without limits under load

Deploy to staging without limits and observe actual consumption:

```bash
kubectl top pods -n my-app --containers
```

### Step 2: Review historical metrics

In Prometheus + Grafana:

```promql
# 95th-percentile CPU usage over 7 days
quantile_over_time(0.95, container_cpu_usage_seconds_total{namespace="my-app"}[7d])

# Peak memory usage per container
max_over_time(container_memory_working_set_bytes{namespace="my-app"}[7d])
```

### Step 3: Apply headroom

- **CPU requests:** p50 actual + 20% headroom
- **CPU limits:** 2–4x the request (allow bursty processing)
- **Memory requests:** p95 actual + 25% headroom  
- **Memory limits:** equal to requests (or p99 actual if you're confident in the ceiling)

---

## Cluster-Wide Safety Nets: LimitRange and ResourceQuota

Don't rely on every developer configuring resources correctly. Enforce defaults at the namespace level.

### LimitRange — per-pod defaults

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: my-app
spec:
  limits:
    - type: Container
      default:         # Applied when limits are missing
        cpu: "500m"
        memory: "256Mi"
      defaultRequest:  # Applied when requests are missing
        cpu: "100m"
        memory: "128Mi"
      max:
        cpu: "4"
        memory: "4Gi"
      min:
        cpu: "50m"
        memory: "64Mi"
```

A pod deployed without resource fields will inherit `defaultRequest` and `default`. Any pod that exceeds `max` is rejected at admission.

### ResourceQuota — namespace total cap

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: namespace-quota
  namespace: my-app
spec:
  hard:
    requests.cpu: "10"
    requests.memory: "20Gi"
    limits.cpu: "20"
    limits.memory: "40Gi"
    pods: "50"
```

This prevents a single misconfigured deployment from consuming all cluster capacity.

---

## Vertical Pod Autoscaler (VPA): Let Kubernetes Learn

For workloads with variable resource needs, VPA observes historical usage and recommends — or automatically sets — requests.

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: my-app-vpa
spec:
  targetRef:
    apiVersion: "apps/v1"
    kind: Deployment
    name: my-app
  updatePolicy:
    updateMode: "Off"   # "Off" = recommendations only; "Auto" = live updates
  resourcePolicy:
    containerPolicies:
      - containerName: "*"
        minAllowed:
          cpu: 50m
          memory: 64Mi
        maxAllowed:
          cpu: "2"
          memory: 2Gi
```

Start with `updateMode: "Off"` and review recommendations with:

```bash
kubectl describe vpa my-app-vpa
```

Avoid running VPA in `Auto` mode alongside HPA on CPU/memory — they conflict. Use HPA on custom metrics (e.g., RPS from KEDA) and VPA for request/limit tuning.

---

## Diagnosing OOMKilled

```bash
# Find OOMKilled containers in the last hour
kubectl get events --field-selector=reason=OOMKilling -A --sort-by='.lastTimestamp'

# Check restart count and last termination reason
kubectl describe pod <pod-name> -n <namespace> | grep -A5 "Last State"

# Full container restart history
kubectl get pod <pod-name> -o jsonpath='{.status.containerStatuses[*].restartCount}'
```

When you see OOMKilled:
1. Check if `limits.memory` is too low vs actual working set
2. Check for memory leaks (steady upward trend in `container_memory_working_set_bytes`)
3. Increase limit, fix the leak, or both

---

## Production Checklist

- [ ] All production containers have explicit `requests` and `limits`
- [ ] `LimitRange` enforced in every namespace (reject missing-limit pods)
- [ ] `ResourceQuota` set per namespace to cap blast radius
- [ ] Memory requests == memory limits for stateful or latency-sensitive workloads
- [ ] CPU limits >= 2× CPU requests to accommodate burst
- [ ] VPA installed in `Off` mode; recommendations reviewed monthly
- [ ] Prometheus recording rules for p95/p99 CPU and memory per container
- [ ] Alerting on `OOMKilled` and sustained CPU throttle ratio > 25%

Resource configuration is unglamorous tuning work, but it's the difference between a cluster that "usually works" and one that handles traffic spikes, node failures, and 3 AM incidents with composure.
