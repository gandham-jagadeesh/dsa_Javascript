


# problems

## 🔁 Pattern: String / Word Transformation (Graph Problems)

### Problem Order:

[Minimum Genetic Mutation](https://leetcode.com/problems/minimum-genetic-mutation/)  
⬇️  
[Words Within Two Edits of Dictionary](https://leetcode.com/problems/words-within-two-edits-of-dictionary/)  
⬇️  
[Open the Lock](https://leetcode.com/problems/open-the-lock/)  
⬇️  
[Word Ladder](https://leetcode.com/problems/word-ladder/)


# 547 province problem
 - turn n*n matrix into adjlist and bfs and iterate over the nodes add counter++ if for each pass of nodes
 - for the first node -> if its not visited then counter becomes 1 and then after it traverse through all connected and then second for loop another connected components which are indepent which counter becomes 2 
 - tc: 0(n^2) sc:o(n) -> not best approach as turn matrix to adjaceny list is not good we can directly perform on 2d matrix
 

 # find cycles in a graph
  
  1 -> [2,3]
  2 -> [1,3]
  3 -> [1,2]

dfs -> for(node of nodes){
    dfs(node,null,graph,path);
}

dfs(1,null,graph,[]) -> 1 is added to path -> dfs(2,1,graph,[1->2]) -> dfs(1,2,)
