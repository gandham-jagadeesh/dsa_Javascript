# Minimum Time Threshold to Get at Least K Connected Components

## Problem Overview

Given a graph with weighted edges, the goal is to find the **minimum time threshold `t`** such that **removing all edges with weight \u2264 `t` results in at least `k` connected components**.

---

## Core Insight

At any threshold `t`, you simulate removing all edges with weight \u2264 `t`. The remaining graph (only using edges with weight > `t`) forms connected components.

The higher the threshold:

* The more edges are removed
* The more disconnected the graph becomes
* The more components you get

This property is **monotonic**, meaning:

* If a threshold `t` works (gives \u2265 `k` components), any larger threshold will also work
* If a threshold `t` fails, any smaller threshold will also fail

This allows us to apply **binary search** on the threshold value.

---

## Binary Search Logic

1. **Search Range**: Set initial binary search range from `low = 0` to `high = max edge weight`
2. **Mid Value**: At each step, calculate `mid = (low + high) / 2`
3. **Simulation**:

   * Remove all edges with weight \u2264 `mid`
   * Keep only edges with weight > `mid`
   * Use **DFS** or **Disjoint Set Union (DSU)** to count connected components
4. **Decision**:

   * If `components \u2265 k`, this `mid` works. Try to find a smaller valid threshold (`high = mid - 1`)
   * If `components < k`, not enough disconnection. Increase threshold (`low = mid + 1`)

---

## Optimization Idea

Instead of binary searching from `0` to `1e9`, extract all unique edge weights and sort them. Binary search only over these:

```java
List<Integer> weights = extract all unique weights from edges;
Collections.sort(weights);
Binary search on weights.get(i);
```

This reduces the number of binary search steps significantly (from \~30 to \~log(#edges)).

---

## Why We Move Right When a Threshold Fails

* If `t = 4` fails (too few components), it means we **didn't remove enough edges**
* We increase the threshold (e.g., try `t = 6`) to remove **more** edges
* More removal = more disconnected = more components

---

## Summary Table

| Threshold `t` | Edges Removed (\u2264 `t`) | Graph Becomes     | Components | Action     |
| ------------- | -------------------------- | ----------------- | ---------- | ---------- |
| Too Small     | Few edges removed          | Still connected   | < k        | Move right |
| Valid         | More edges removed         | More disconnected | \u2265 k   | Move left  |

---

## Final Summary

* At each binary search step, remove all edges with weight \u2264 `mid`
* Use DSU or DFS to count connected components in the remaining graph
* If the number of components \u2265 `k`, try smaller `mid`
* If fewer than `k`, increase `mid`

This approach ensures you find the **minimum possible threshold** that satisfies the condition.
