# 📘 Understanding Bipartite Graphs

## 🔹 What Is a Bipartite Graph?

A graph is **bipartite** if:

* Its nodes can be split into **two sets**, say **Set A** and **Set B**
* **No edge** connects two nodes in the **same set**
* All edges must go **between** the sets, not within

This is the same as saying: you can color the graph using **2 colors** so that no edge connects two nodes of the same color.

---

## ✅ How to Check if a Graph Is Bipartite

> A graph is bipartite **if and only if** it **contains no odd-length cycles**.

| Graph Type        | Bipartite? |
| ----------------- | ---------- |
| Even-length cycle | ✅ Yes      |
| Odd-length cycle  | ❌ No       |
| Even-length path  | ✅ Yes      |
| Odd-length path   | ✅ Yes      |

---

## 🔺 Why Odd-Length Cycles Fail

### Example: 3-node cycle (triangle)

```
   1
  / \
 2---3
```

**Edges:** (1–2), (2–3), (3–1)

### Set Assignment Attempt:

* 1 → Set A
* 2 → Set B
* 3 → Set A
* But edge (3–1) connects A–A → ❌ violates bipartite rule

### Reason:

In odd-length cycles, the alternating sets will eventually force the first and last nodes of the cycle to be in the **same set**, causing an edge **within** a set.

---

## 🟢 Even-Length Cycle Works Fine

### Example: 4-node cycle

```
1 — 2
|    |
4 — 3
```

### Set Assignment:

* Set A: {1, 3}
* Set B: {2, 4}

### Edges:

* (1,2) → A–B ✅
* (2,3) → B–A ✅
* (3,4) → A–B ✅
* (4,1) → B–A ✅

✅ All edges go between sets → bipartite is valid

---

## 🔴 Odd-Length Cycle Fails Clearly

### Example: 5-node cycle

```
1 — 2
|     \
5       3
 \     /
   4
```

### Set Assignment:

* Set A: {1, 3, 5}
* Set B: {2, 4}

### Edges:

* (1,2) → A–B ✅
* (2,3) → B–A ✅
* (3,4) → A–B ✅
* (4,5) → B–A ✅
* (5,1) → A–A ❌ ❌ ❌

🔴 The edge (5–1) breaks the bipartite rule since both are in Set A.

---

## ✅ Final Key Rule

> To determine if a graph is bipartite:
>
> Just check: **Does it have any odd-length cycle?**
>
> * If **yes** → ❌ Not bipartite
> * If **no** → ✅ Bipartite

---

## 📌 Summary Table

| Cycle Length | Bipartite? | Reason                       |
| ------------ | ---------- | ---------------------------- |
| 3 (odd)      | ❌ No       | Final edge connects same set |
| 4 (even)     | ✅ Yes      | Alternating sets works       |
| 5 (odd)      | ❌ No       | Final edge connects same set |
| 6 (even)     | ✅ Yes      | Alternating sets works       |

---

## 🧪 Simple Example Checks

### Example 1:

**Edges:** 0 → 1 and 2 → 3

This is two separate components with only one edge each → ✅ **Bipartite**

### Example 2:

**Set A:** {1, 4}, **Set B:** {2, 3, 5}
**Connections:** 1–2, 1–5, 4–3

All edges go from Set A to Set B → ✅ **Bipartite**

### Example 3:

**Cycle:** 1–2–3–4–5–1 (5 nodes)
Odd-length cycle → ❌ **Not Bipartite**

### Example 4:

**Cycle:** 1–2–3–4–1 (4 nodes)
Even-length cycle → ✅ **Bipartite**
