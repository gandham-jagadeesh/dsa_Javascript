
 export      class TreeNode {
      val: number
      left: TreeNode | null
      right: TreeNode | null
      constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
          this.val = (val===undefined ? 0 : val)
          this.left = (left===undefined ? null : left)
          this.right = (right===undefined ? null : right)
      }
  }
 


    function inorderTraversal(root: TreeNode | null): number[] {
    if(root === null){return [];}
    
    const res:number[] = [];
    const recursive = (node:TreeNode)=>{
        if(node === null){
            return;
        }
        recursive(node.left!);
        res.push(node.val!);
        recursive(node.right!);
    }
    recursive(root);
    return res;

};

function inorderTraversalIterative(root: TreeNode | null): number[] {
    if(root === null){return [];}
    const result:number[] = new Array();
    const stack = new Array<TreeNode|null>();
    let  currNode:TreeNode|null = root;
    while(currNode || stack.length > 0){
        while(currNode !== null){
            stack.push(currNode);
            currNode=currNode.left;
        }
        const node:TreeNode = stack.pop()!;
        result.push(node.val);
        currNode=node.right;
    }

    return result;
};


    
 