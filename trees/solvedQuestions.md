



# Trees


- 993 Cousins in Binary Tree
- dfs: traverse each node and send parent,level node while traversing and finally you get x and y -> just check if both levels are equal and their parents are not same
- bfs: how to track parents -> traverse each node find whether it is x or y ->
  like for example
  

# traversals

- 94 inorder traversal
  - as iterating is from left,root,right
  - recursive is straight forward
  - iterative -> first go to extreme left of root node and then take the left and check for right of those node too and check until either the node or stack is empty
- recursive and iterative

- 102 level order traversal
  - use normal queue to iterate level by level

- 145 postorder traversal
  - recursive is (left,right,root);
  - iterative -> use stack and push (root.left,root.right) so always entire right subtree gets processed first
  - just reverse when returning the nodes 

- 144 preorder traversal
  - recursive (root,left,right);
  - iterative -> use stack,push(root.right,root.left) so it process entire leftside and goes to right 
  - just return the result


# problem simple


- 100 same problem (check given two trees are same or not)
  - just recursive p.left,q.left,p.right,q.right 
  - if p or q only one exists or they are not equal just check these cases

- 101 symmetric tree problem (check the give leftsubtree is mirror of subtree)
  - recursive : just recursively check  p.left and p.right both exists p.left === p.right 
  - iterative : think interms of stack -> push currleftnode.right,andcurrrightnode.right vice versa and check both are null or either of them exists and do it recursively
