
# https://leetcode.com/problems/maximum-k-to-sort-a-permutation/description/
# Bit Manipulation


- given permutation of n from [0...n-1]
- ex: 5 [0...4]
- the array may be sorted or unsorted
- we need to make it sorted by swapping i,j such that nums[i] & nums[j] === k
- ex: n = 4 [0,1,3,2]
- we need to make it sorted -> so we can swap 2 and 3 indicies as nums[i] & nums[j] === k
- so we check 2 and 3 and operation -> 
- 1 0
- 1 1 
------
  1 0 -> so 2 right this is the only that need to be sorted
------
- we need to get max k 


- Idea:

- find the wrong indices put them in an array
- [0,2,3,1]
- so in the above array the wrong ones are wrongIndexArray = [1,2,3]
- so i take like first value as here it meaning 1 in wrongIndexarray find where the right value exists
- and find and of them and return
- 2 & 1 -> 0 so return 0
- why because we need k  right

- why it failed lets take one array
- [0,1,5,3,4,2,7,6,8]
- so here the wrongIndexarray=[2,5,6,7]
- first we find 2,5 we need so swap 2&5
-  1 0 1
-  0 1 0 
--------
- 0 0 0 so first we need 0
--------
- for 6,7
- 1 1 0
- 1 1 1 
--------
  1 1 0  -> 6 
---------

we have 2  values which is not possible for k to be taken
we need some k value that satfies both
if i take k as 0 i can swap these 6,7

- observation
[2,5,6,7,]
2,5 -> swap we get k like 0
6,7 -> swap we get k like 6

- we use some helper index to swap into correct places with same k
array [5,2,7,6]
so no value supports these operations k can be 0
as k can non negative integer

[0,3,2,1,4,7,6,5,8]
misplacedArray=[3,1,7,5]
3&1 -> 1 so we can swap  [1,3,7,5]
1&7 -> 1 so we can swap  [7,3,1,5]
1&5 -> 1 so we can swap  [7,3,5,1]
1&7 -> 1 so  we can swap [1,3,5,7] so k is the answer

we need to take helper functions to switch the makes same value with all the numbers 
so we need such bits for all these bits it need to set 
1&3 should be same as 3&7 

as we can do any number of swaps
so we need to choose swaps as such that in their bits should be same for all other swaps

11
01 we have 1 bit
--

001
111 for all the 3&1,1&7,1&5,1&7  1 bits consists over all of these we need to find such bits
---

so thats we are doing and of all these bits to find such that we can do n number of swap if not find just 0



# [Solution](https://leetcode.com/problems/maximum-k-to-sort-a-permutation/solutions/7063501/detailed-explanation-for-beginner-in-deepening-bitwise-and-the-problem-understanding/)

# [solution](https://leetcode.com/problems/maximum-k-to-sort-a-permutation/solutions/7063035/track-common-bits-of-misplaced-elements-to-determine-k-explained-in-3-point/)

# [Solution](https://leetcode.com/problems/maximum-k-to-sort-a-permutation/solutions/7064449/stellars-clean-code-video-intuition-appr-9y09/)
