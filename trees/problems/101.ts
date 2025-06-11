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



function isSymmetric(root: TreeNode | null): boolean {
    if(root === null){  
        return false;
    }

    const recursiveAux = (p:TreeNode|null ,q:TreeNode|null):boolean=>{
        if(p === null && q == null){
            return true
        }
        if(!p || !q || p.val !== q.val){
            return false;
        }
        return recursiveAux(p.left,q.right) && recursiveAux(p.right,q.left);
    }

    return recursiveAux(root.right,root.left);

    const stack = new Array<TreeNode | null>();

    const iterativeAux = ():boolean=>{
        const queue = new Array<[TreeNode|null,TreeNode|null]>(); 
        if(root){
            queue.push([root.left,root.right]);
        }
        while(queue.length){
            const [leftnode,rightnode] = queue.shift()!;
            if(!leftnode && !rightnode){ continue; }
            if(!leftnode || !rightnode){return false;}
            if(leftnode.val !== rightnode.val){return false};
            queue.push([leftnode.right,rightnode.left],[leftnode.left,rightnode.right]);
        }
        return true;
    }

    return iterativeAux();
};