# 🌍 Number of Provinces — BFS Approach in TypeScript

This project solves the **"Number of Provinces"** problem using **Breadth-First Search (BFS)**.

---

## 📘 Problem Statement

You're given an `n x n` adjacency matrix `isConnected`, where:

- `isConnected[i][j] = 1` means city `i` is directly connected to city `j`.
- A **province** is a group of cities that are directly or indirectly connected.

👉 Your task: Return the **number of provinces**.

---

## ✅ Correct BFS Approach (TypeScript)

```ts
function findCircleNum(isConnected: number[][]): number {
    let province = 0;
    let visited: boolean[] = new Array(isConnected.length).fill(false);

    const bfs = (start: number) => {
        const queue: number[] = [start];
        visited[start] = true;

        while (queue.length) {
            const currNode = queue.shift()!;
            for (let neighbour = 0; neighbour < isConnected.length; neighbour++) {
                if (isConnected[currNode][neighbour] === 1 && !visited[neighbour]) {
                    visited[neighbour] = true; // ✅ Mark as visited when pushing
                    queue.push(neighbour);
                }
            }
        }
    };

    for (let node = 0; node < isConnected.length; node++) {
        if (!visited[node]) {
            province++;
            bfs(node);
        }
    }

    return province;
}


# ❌ Common Mistakes and How to Fix Them

## 🚫 Mistake #1: Marking visited too late

```ts
// ❌ Incorrect
queue.push(neighbour); // No visited flag here
// visited[neighbour] = true only happens later when popping```

Problem:
If multiple cities point to the same neighbor, it may be added to the queue multiple times, causing duplicate processing and inefficiency.


 Fix: Mark as visited when enqueueing

// ✅ Correct
if (isConnected[currNode][neighbour] === 1 && !visited[neighbour]) {
    visited[neighbour] = true; // mark BEFORE pushing
    queue.push(neighbour);
}
🚫 Mistake #2: Hardcoding bfs(0) in the loop


// ❌ Incorrect loop
for (let node = 0; node < n; node++) {
    if (!visited[node]) {
        bfs(0); // always starting from node 0 is WRONG
    }
}
Why wrong:
This will always start BFS from node 0, missing other disconnected components.

✅ Fix: Use the current node
// ✅ Correct
for (let node = 0; node < n; node++) {
    if (!visited[node]) {
        bfs(node); // use the current node to explore new province
    }
}
🧪 Example Input for Practice

const isConnected = [
  [1, 1, 0, 0],
  [1, 1, 0, 0],
  [0, 0, 1, 1],
  [0, 0, 1, 1]
];
// Expected output: 2 provinces
✅ Summary
Mistake	Why it's wrong	Fix
Marking visited on pop	Node may be enqueued multiple times	Mark visited on push (enqueue)
Using bfs(0) in loop	Only explores one component (misses others)	Use bfs(node)
Not checking visited[neighbour]	Infinite loops or incorrect output	Always check before enqueue


🧠 Rule of thumb:
In BFS, mark a node visited immediately when you enqueue it to prevent duplicates and ensure efficient traversal.