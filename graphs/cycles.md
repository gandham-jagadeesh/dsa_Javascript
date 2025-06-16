# Graph Cycle Detection Summary

This document captures everything learned about cycle detection in graphs — for both undirected and directed graphs using DFS, BFS, and Kahn's algorithm. It also highlights common misconceptions and implementation observations.

---

## ✅ Techniques for Cycle Detection

### 🔄 **Undirected Graph**

#### DFS (Depth-First Search)

* Use a `visited` set.
* Keep track of the `parent` node.
* A cycle is found if we reach a `visited` node that is **not** the parent.

```ts
function hasCycleUndirectedDFS(graph: Record<number, number[]>): boolean {
  const visited = new Set<number>();

  function dfs(node: number, parent: number | null): boolean {
    visited.add(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, node)) return true;
      } else if (neighbor !== parent) {
        return true; // Cycle detected
      }
    }

    return false;
  }

  for (const node in graph) {
    if (!visited.has(Number(node))) {
      if (dfs(Number(node), null)) return true;
    }
  }
  return false;
}
```

#### BFS

* Track `(node, parent)` in queue.
* If a visited neighbor is **not** the parent → cycle exists.

```ts
function hasCycleUndirectedBFS(graph: Record<number, number[]>): boolean {
  const visited = new Set<number>();

  for (const start in graph) {
    const node = Number(start);
    if (!visited.has(node)) {
      const queue: [number, number | null][] = [[node, null]];
      visited.add(node);

      while (queue.length) {
        const [current, parent] = queue.shift()!;

        for (const neighbor of graph[current]) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push([neighbor, current]);
          } else if (neighbor !== parent) {
            return true; // Cycle detected
          }
        }
      }
    }
  }

  return false;
}
```

---

### 🔁 **Directed Graph**

#### DFS

* Use `visited` and `path` tracking (recursion stack).
* A cycle exists if a node is visited **and also in the current path**.

```ts
function hasCycleDirectedDFS(graph: Record<number, number[]>): boolean {
  const visited: Record<number, boolean> = {};
  const path: Record<number, boolean> = {};

  for (const node in graph) {
    visited[node] = false;
    path[node] = false;
  }

  function dfs(node: number): boolean {
    visited[node] = true;
    path[node] = true;

    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        if (dfs(neighbor)) return true;
      } else if (path[neighbor]) {
        return true; // Back edge → cycle
      }
    }

    path[node] = false; // Backtrack
    return false;
  }

  for (const node in graph) {
    if (!visited[node]) {
      if (dfs(Number(node))) return true;
    }
  }

  return false;
}
```

**🧠 Observations:**

* `path[node] = false` is crucial — it removes the node from current path during backtracking.
* Helps explore alternate branches correctly.

#### BFS → Kahn's Algorithm (Topological Sort)

* Compute in-degrees of all nodes.
* Remove nodes with in-degree 0.
* If all nodes are not removed → cycle exists.

```ts
function hasCycleDirectedKahn(graph: Record<string, string[]>): boolean {
  const inDegree: Record<string, number> = {};
  const queue: string[] = [];
  const topoSorted: string[] = [];

  // Initialize in-degree
  for (const node in graph) {
    inDegree[node] = 0;
  }
  for (const node in graph) {
    for (const neighbor of graph[node]) {
      inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
    }
  }

  // Enqueue nodes with 0 in-degree
  for (const node in inDegree) {
    if (inDegree[node] === 0) queue.push(node);
  }

  while (queue.length) {
    const current = queue.shift()!;
    topoSorted.push(current);

    for (const neighbor of graph[current] || []) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return topoSorted.length !== Object.keys(graph).length; // Cycle if any node is left
}
```

---

## 🔍 Observations and Misconceptions

* ✅ **Undirected DFS** → Must track parent node.
* ✅ **Directed DFS** → Must track recursion path (`path[]`).
* ❌ **BFS in Directed Graph** can't use `(node, parent)` — edges are one-directional.
* ✅ Use **Kahn’s Algorithm** for BFS-based cycle detection in directed graphs.

### ❗ Misconception:

* Thinking visited\[] alone is enough in DFS for directed graphs — you need `path[]` to detect back edges.

---

## 🔙 Backtracking Notes

### 🔹 Undirected Graphs

* Edges are bidirectional.
* No explicit backtracking needed — only check if neighbor is not the parent.

### 🔸 Directed Graphs

* Edges are unidirectional.
* Must remove node from `path[]` after DFS completes — otherwise false cycles can be detected.
* This ensures proper exploration of alternate branches.

---

## 📦 Bonus: Dependency Graph from `package.json`

* Tools like **dependency-cruiser** can analyze and visualize project dependencies.
* It can detect:

  * Circular dependencies
  * Orphans
  * Violations of custom rules

```bash
npm install --save-dev dependency-cruiser
npx depcruise src --output-type dot | dot -T svg > deps.svg
```

This generates a dependency graph you can visualize or inspect.

---

## 📈 Future Ideas

* Visual tool for exploring `package.json` dependencies.
* Graph traversal for large monorepos.
* Real-time detection of circular dependencies during builds.

---

Let me know if you want the `.md` file exported!
