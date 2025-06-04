

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


function isCousins(root: TreeNode | null, x: number, y: number): boolean {
	let xparent;
	let yparent;
	let xlevel;
	let ylevel;

	const recursive = (node:TreeNode,parent:TreeNode,depth:number,x:number,y:number)=>{
		if(node === null){return;}
		if(node.val === x){ xparent=parent;xlevel=depth;}
		if(node.val === y){ yparent=parent;ylevel=depth;}
		recursive(node.left,node,depth+1,x,y);
		recursive(node.right,node,depth+1,x,y);
	}

	recursive(root,null,0,x,y);

	return (xparent !== yparent) && (xlevel === ylevel);
};


/* idea1: for each node vist and check like their children are x and y if then return false that means no parent has same x and y
 * x and y should be having same level
 * first think whether it is dfs or bfs -> first
 * 
 *
 * sol : can do both ways like -> first find x,y and store their parents,levels in 2d array then just check 
*/
