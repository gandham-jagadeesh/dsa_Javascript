

class TreeNode<T>{

	val:T;
	left:TreeNode<T> | null;
	right:TreeNode<T> | null;

	constructor(val:T){
		this.val = val;
		this.left = null;
		this.right=null;
	}
}


class BinaryTree<T>{

	root:TreeNode<T>;

	constructor(val:T){
		this.root = new TreeNode<T>(val);
	}


	insertbfs(val:T){
		if(this.root === null){
			this.root = new TreeNode(val);
			return;
		}
		const queue:TreeNode<T>[] = [];
		queue.push(this.root);
		while(queue.length){
			const currNode = queue.shift()!;
			if(!currNode.left){
				currNode.left = new TreeNode(val);
				break;
			}
			else if(!currNode.right){
				currNode.right = new TreeNode(val);
				break;
			}
				
			queue.push(currNode.left);
			queue.push(currNode.right);
		}
	}

	insertdfs(val:T){
		if(this.root === null){
			this.root = new TreeNode(val);
			return;
		}
		const insert = (node:TreeNode<T>)=>{
			if(node.left === null){
				node.left = new TreeNode(val);
				return true;
			}
			if(insert(node.left)){return true;}

			if(node.right === null){
				node.right = new TreeNode(val);
				return true;
			}
			
			return insert(node.right)
			
		}

		insert(this.root);

	}

	inorderTraversal(){

		const inorder = (node:TreeNode<T>|null)=>{
			if(node === null){
				return;
			}
			inorder(node.left);
			console.log(node.val);
			inorder(node.right);
		}

		inorder(this.root);

	}


	preorderTravresal():void{
		const preorder = (node:TreeNode<T>|null)=>{
			if(node === null){
				return;
			}
			console.log(node.val);
			preorder(node.left);
			preorder(node.right);
		}

		preorder(this.root);

	}

	postorderTraversal():void{

		const postorder = (node:TreeNode<T>|null)=>{
			if(node === null){
				return;
			}
			postorder(node.left);
			postorder(node.right);
			console.log(node.val);

		}
		postorder(this.root);
	}

	levelorderTraversal(){
		const queue:TreeNode<T>[] = [];
		if(this.root === null){
			console.log("node is empty");
		        return;
		}
		queue.push(this.root);
		while(queue.length){
			const curr = queue.shift()!;
			console.log(curr.val);
			if(curr.left){ queue.push(curr.left);}
			if(curr.right){ queue.push(curr.right);}

		}
	}


}


const obj:BinaryTree<number> = new BinaryTree<number>(20);
//obj.root.right = new TreeNode<number>(30)!;
//obj.root.left = new TreeNode<number>(40)!;
obj.insertbfs(20);
obj.insertbfs(30);
obj.insertbfs(40);
obj.insertbfs(50);
obj.levelorderTraversal();
console.log(obj.root);

