
namespace Traversal144{
  class TreeNode {
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
    const result:number[] = new Array<number>();
    const stack = new Array<TreeNode|null>();
    stack.push(root!);
    while(stack.length > 0){
        const currNode = stack.pop();
        if(currNode){
            result.push(currNode.val);
            stack.push(currNode.right,currNode.left);
        }
    }
    return result;
};


function preorderTraversalIterative(root: TreeNode | null): number[] {
    const result:number[] = new Array<number>();
    const stack  = new Array<TreeNode|null>();
    stack.push(root);
    while(stack.length > 0){
        const currNode = stack.pop();
        if(currNode){
            result.push(currNode.val);
            stack.push(currNode.right,currNode.left);
        }
    }
    return result;
};
}
