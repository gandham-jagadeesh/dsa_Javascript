 export    class TreeNode {
      val: number
      left: TreeNode | null
      right: TreeNode | null
      constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
          this.val = (val===undefined ? 0 : val)
          this.left = (left===undefined ? null : left)
          this.right = (right===undefined ? null : right)
      }
  }


function maxDepth(root: TreeNode | null): number {
    if(root === null){
        return 1;
    }
    let maxDepth=0;
    const recursive = (node:TreeNode|null,depth:number)=>{
        if(node === null){
            return 
        }
        maxDepth=Math.max(depth,maxDepth);
        recursive(node.left,depth+1);
        recursive(node.right,depth+1);
    }

    recursive(root,1);
    return maxDepth;
};