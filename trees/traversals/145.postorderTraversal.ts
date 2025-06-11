
 export  class TreeNode {
      val: number
      left: TreeNode | null
      right: TreeNode | null
      constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
          this.val = (val===undefined ? 0 : val)
          this.left = (left===undefined ? null : left)
          this.right = (right===undefined ? null : right)
      }
  }
 
function preorderTraversal(root: TreeNode | null): number[] {
    const arr:number[] = new Array();
    const preorderAux = (root:TreeNode| null)=>{
        if(root === null){return null;}
        arr.push(root.val);
        preorderAux(root.left);
        preorderAux(root.right);
    }  
    preorderAux(root);
    return arr;
};


  function postorderTraversalIterative(root: TreeNode | null): number[] {
    const stack = new Array<TreeNode|null>();
    const result:number[] = new Array<number>(); 
    stack.push(root);
    while(stack.length > 0){
        const currNode = stack.pop();
        if(currNode){
            result.push(currNode.val);
            stack.push(currNode.left,currNode.right);
        }
    }
    result.reverse();
    return result;
};

