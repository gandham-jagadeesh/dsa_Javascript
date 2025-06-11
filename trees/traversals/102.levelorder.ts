

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


    function levelOrder(root: TreeNode | null): number[][] {
    if(root === null){
        return []
    }
    const queue:TreeNode[] = [];
    queue.push(root);
    const res:number[][] = [];
    while(queue.length !== 0){
        let level:number[] = [];
        const length = queue.length;
    for(let i=0;i<length;i++){
        const currNode = queue.shift()!;
        level.push(currNode.val);
        if(currNode.left){
            queue.push(currNode.left);
        }
        if(currNode.right){
            queue.push(currNode.right);
        }
    }
    res.push(level);

}
    return res;
};

