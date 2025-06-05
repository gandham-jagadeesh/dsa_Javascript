
 

function inorderTraversal(root: TreeNode | null): number[] {
    const res:number[] = [];

    const recursive = (node:TreeNode)=>{
        if(node === null){
            return;
        }
        recursive(node.left!);
        res.push(node.val!);
        recursive(node.right!);
    }
    recursive(root!);
    return res;

};
