
# weekly contest 456


- problem 1.  https://leetcode.com/problems/partition-string/description/

```ts
function partitionString(s: string): string[] {
    if(s.length === 0 ){
        return [];
    }
    
    let start = 0;
    let curr  = 1;
    let length = s.length;
    let end = length;
    let visited = new Set<string>()
    while(start < length && curr < length+1){
        let string = s.slice(start,curr);
        if(visited.has(string)){
            curr+=1;
        }
        else{
            visited.add(string);
            start = curr
            curr +=1;
        }
    }

    return Array.from(visited);
};
```

- getting the unique segments : two pointer technique -> getting slice gonna take o(n) operations 
- here taking two pointer like curr and start and find unique strings and add that to set
- time complexity : o(n*k) k can of (curr-start) as k can be n at worst case -> o(n^2)
- space is o(n) as even all of the substring and all of these are from n length string

#Optimized approach

```ts
function partitionString(s: string): string[] {
    let start = 0;
    let end = s.length;
    let currString = "";
    let visited = new Set<string>();

    while(start < end){
        currString += s[start];
        if(!visited.has(currString)){
            visited.add(currString);
            currString="";
        }

        start++;
    }

    return Array.from(visited);
};

```


## String concat is not 0(1) in js
This is the tricky part.

In JavaScript/TypeScript, string concatenation is not O(1).

currString += s[start] can take O(k) time where k is the length of currString so far.



-        problem 1. Basic simulation



-  problem 2. https://leetcode.com/problems/longest-common-prefix-between-adjacent-strings-after-removals/solutions/


```ts
function longestCommonPrefix(words: string[]): number[] {

    const length = words.length;
    let maxValue:number[] = new Array();

    for(let index=0; index < length ; index++){
        let partialStrings:string[] = removeElementAtIndex(index);
        maxValue.push(findMaxAdjacentPrefixes(partialStrings,index));
    }

    function removeElementAtIndex(index):string[]{
        let newResultArray = [...words];
         newResultArray.splice(index,1);
        return newResultArray;
    }

    function findMaxAdjacentPrefixes(strings:string[],index:number):number{
        let length = strings.length;
        let maxLength = 0;
        for(let curr=0;curr < length-1;curr++){
            maxLength = Math.max(maxLength,MaxAdjValue(strings[curr],strings[curr+1]));
        }
        return maxLength;
    }



    function MaxAdjValue(str1:string,str2:string):number{
        let minIndex = Math.min(str1.length,str2.length);
        let prefix = 0;
        for(let curr=0;curr<minIndex;curr++){
            if(str1[curr] === str2[curr]){
                prefix++;
            }
            else{
                break;
            }
        }
        return prefix;
    }

    return maxValue;
};

```

-  tc : o(n * (n * m)) m beging the min length of both strings
-  sc : o(n)


-  Optimized Approach : https://leetcode.com/problems/longest-common-prefix-between-adjacent-strings-after-removals/solutions/6897497/intuitive/


# what i missed to get the problem
- counting again and again after removing the index element from the group
- think interms of prefix and suffix 


🧠 Intuition
You're given a list of words and want to remove one word at a time, then calculate the longest common prefix (LCP) among the remaining words.

Instead of recomputing LCP from scratch each time (which is slow), this solution precomputes LCPs between adjacent pairs and uses those cleverly to deduce the result for each removal case in constant time.

🧩 Approach
Step-by-step:
Handle small cases:

If only one or two words, return {0} or {0, 0} since LCP doesn't exist or is trivially 0.
Pairwise LCPs:

Compute LCP between every adjacent pair of words:
a[i] = LCP(words[i], words[i+1]).
Prefix and Suffix Max Arrays:

pre_max[i]: maximum LCP value in a[0] to a[i]

suf_max[i]: maximum LCP value in a[i] to a[n-2]

Final Answer Calculation:

For each index i (representing word removed):

If first word removed: result is suf_max[1]

If last word removed: result is pre_max[n-3]

If middle word removed:

Consider max of:

LCP of words before and after: LCP(words[i-1], words[i+1])

Left prefix max before i-1

Right suffix max after i

Store result in ans[i]

This way, the solution avoids recalculating LCPs multiple times and achieves constant-time answer per removal.

⏱ 3. Time Complexity
Let n = number of words, and L = average word length.

Computing a[i] using help() takes O(L) time per adjacent pair → O(n * L)

Building pre_max and suf_max arrays → O(n)

Final answer loop over n → each LCP call is O(L), happens for middle removals → O(n * L)

Total Time: O(n * L)

Efficient compared to naïvely recomputing the whole prefix every time (which would be O(n² * L)).

📦 4. Space Complexity
a[], pre_max[], suf_max[], and ans[] → each of size n → O(n)

No extra space used apart from a few strings (reused)

Total Space: O(n)



# Longest Common Prefix After Removing Each Word

## 📌 Problem Statement

Given an array `words` of `n` strings, compute an array `ans` of size `n` where:

* `ans[i]` is the **maximum Longest Common Prefix (LCP)** between any two **adjacent words** in the array if **`words[i]` is removed**.

---

## ✨ Objective

For every index `i` in the array:

* Remove `words[i]`
* Compute the **maximum LCP among all adjacent pairs** in the resulting array
* Store the result in `ans[i]`

---

## ❌ Naive Approach (Brute Force)

For each index `i`:

1. Remove `words[i]`
2. Recalculate LCPs between all adjacent strings
3. Take the maximum

### ❌ Time Complexity:

* Removing one word: `O(n)`
* Recalculate adjacent LCPs: `O(n × m)` (where `m` is max string length)
* Do this for each `i`: `O(n × n × m) = O(n²m)`

---

## ✅ Optimized Approach with Prefix/Suffix Max

### Step 1: Build `lcp[]`

Compute the LCP between all adjacent word pairs:

```
lcp[i] = LCP(words[i], words[i+1])
```

Size of `lcp` = `n - 1`

---

### Step 2: Build `pre_max[]` and `suf_max[]`

* `pre_max[i]`: maximum LCP from `lcp[0]` to `lcp[i]`
* `suf_max[i]`: maximum LCP from `lcp[i]` to `lcp[n-2]`

---

### Step 3: Compute `ans[i]` for each index

```ts
for i = 0 to n-1:
    if i == 0:
        ans[i] = suf_max[1]
    else if i == n - 1:
        ans[i] = pre_max[n - 3]
    else:
        newLCP = LCP(words[i - 1], words[i + 1])
        left = pre_max[i - 2] (if i > 1)
        right = suf_max[i + 1] (if i + 1 < n - 1)
        ans[i] = max(left, newLCP, right)
```

---

## 🧐 Why `LCP(words[i-1], words[i+1])`?

When removing a **middle word**, two old pairs disappear:

* `LCP(words[i-1], words[i])`
* `LCP(words[i], words[i+1])`

A **new pair forms**:

* `LCP(words[i-1], words[i+1])`

We account for this plus any other unaffected pairs using `pre_max` and `suf_max`.

### 🌐 Visualization:

Let the original list be:

```
[w0, w1, w2, w3, ..., wi-1, wi, wi+1, ..., wn-1]
```

If you remove `wi`, the list becomes:

```
[w0, w1, ..., wi-1,     wi+1, ..., wn-1]
```

A new adjacent pair is formed: `(wi-1, wi+1)`

This is why we recompute `LCP(wi-1, wi+1)` and also compare it against the remaining LCPs via `pre_max` and `suf_max`.

---

## 📊 Time and Space Complexity

| Operation                  | Complexity |
| -------------------------- | ---------- |
| Build `lcp[]`              | O(n × m)   |
| Build `pre_max`, `suf_max` | O(n)       |
| Compute each `ans[i]`      | O(m)       |
| **Total Time**             | O(n × m)   |
| **Space Complexity**       | O(n)       |

---

## 🧪 Example and Breakdown

### Input:

```ts
words = ["ab", "abc", "abde", "abcd"]
```

### Step 1: LCPs Between Adjacent Words

```
lcp[0] = LCP("ab", "abc") = 2
lcp[1] = LCP("abc", "abde") = 2
lcp[2] = LCP("abde", "abcd") = 3
```

`lcp = [2, 2, 3]`

### Step 2: Precompute Prefix and Suffix Max

```
pre_max = [2, 2, 3]
suf_max = [3, 3, 3]
```

### Step 3: Compute Final Answers

#### Case 1: Remove index 0

* Only right pairs remain: `suf_max[1] = 3`
* `ans[0] = 3`

#### Case 2: Remove index 1 (middle)

* New pair: `LCP("ab", "abde") = 2`
* Left: none, Right: `suf_max[2] = 3`
* `ans[1] = max(2, 3) = 3`

#### Case 3: Remove index 2 (middle)

* New pair: `LCP("abc", "abcd") = 3`
* Left: `pre_max[0] = 2`, Right: none
* `ans[2] = max(3, 2) = 3`

#### Case 4: Remove index 3

* Only left pairs remain: `pre_max[1] = 2`
* `ans[3] = 2`

### Final Output:

```ts
ans = [3, 3, 3, 2]
```

---

## ✅ Conclusion

This optimized approach allows calculating the required LCP values in **linear time** with efficient prefix/suffix max tracking and recomputing at most one new LCP for middle removals.




# problem 3 https://leetcode.com/problems/partition-array-to-minimize-xor/description/
    - 3599. Partition Array to Minimize XOR
    - DP