
	export class undirectedGraph<T>{

		private nodes:Map<T,node<T>>;
		private comparator:(a:T,b:T)=>number;

		constructor(comparator:(a:T,b:T)=>number){
			this.nodes=new Map();
			this.comparator=comparator;
		}

		get getNode(){
			return this.nodes;
		}

		public  addEdge(source:T,destination:T):void{
			const sourceNode = this.addNode(source);
			const destinationNode = this.addNode(destination);
			sourceNode.addAdjacent(destinationNode);
			destinationNode.addAdjacent(sourceNode);

		}

		public  removeEdge(source:T,destination:T):void{
			const sourceNode = this.nodes.get(source);
			const destinationNode = this.nodes.get(destination);
			if(sourceNode && destinationNode){
			sourceNode.removeAdjacent(destinationNode.value);
			destinationNode.removeAdjacent(sourceNode.value);
			}

		}

		public addNode(value:T):node<T>{
			let currNode  = this.nodes.get(value);
			if(currNode){
				return currNode;
			}
			const newNode = new node<T>(value,this.comparator);
			this.nodes.set(value,newNode);
			return newNode;
		}

		public removeNode(value:T):node<T>|null{
			const nodeToRemove= this.nodes.get(value);
			if(!nodeToRemove){
				return null;
			}
			this.nodes.forEach((eachNode)=>{
				eachNode.removeAdjacent(nodeToRemove.value);
			});
			this.nodes.delete(value);
			return nodeToRemove;
		}

		public bfs():Array<T>{
			const visited:Map<T,boolean> = new Map();
			const resultArray = new Array<T>();
			this.nodes.forEach((node)=>{
				if(!visited.has(node.value)){
					this.bfsAux(node,visited,resultArray);
				}
			})
			return resultArray;
		}

		private bfsAux(node:node<T>,visited:Map<T,boolean>,resultArray:Array<T>){
			const queue:Array<node<T>> = new Array();
			queue.push(node);
			visited.set(node.value,true);
			while(queue.length > 0){
				const currNode = queue.shift()!;
				resultArray.push(currNode.value);
				currNode.neighbors.forEach((item)=>{
					if(!visited.has(item.value)){
						visited.set(item.value,true);
						queue.push(item);
					}
				});
			}
			
		}

		public dfs(){
			const visited:Map<T,boolean> = new Map();
			const result:Array<T> = new Array();
			this.nodes.forEach(element => {
				if(!visited.has(element.value)){
					this.dfsAux(element,visited,result);
				}
			});
			return result;
		}

		private dfsAux(node:node<T>,visited:Map<T,boolean>,result:Array<T>){
			visited.set(node.value,true);
			result.push(node.value);
			node.neighbors.forEach((item)=>{
				if(!visited.has(item.value)){
					this.dfsAux(item,visited,result);
				}
			})
		}
	}



	export class node<T>{
		
		private data:T;
		private adj:node<T>[];
		private comparator:(a:T,b:T)=>number;

		constructor(data:T,comparator:(a:T,b:T)=>number){
			this.data = data;
			this.adj=[];
			this.comparator=comparator;
		}

		get value(){
			return this.data;
		}

		get neighbors(){
			return [...this.adj];
		}

		private findIndex(data:T){
			return  this.adj.findIndex((eachNode)=>this.comparator(eachNode.data,data)===0);
		}

		private hasAdjacent(data:T){
			return this.findIndex(data) !== -1;
		}


		removeAdjacent(data:T):boolean{
			const index = this.findIndex(data);
			if(index > -1){
				this.adj.splice(index,1);
				return true;
			}
			return false;
		}

		addAdjacent(node:node<T>):void{
			if(!this.hasAdjacent(node.data)){
			this.adj.push(node);
			}
		}
	}


	let comparator = (a:number,b:number)=>{
		if(a > b){
			return 1;
		}
		if(b > a){
			return -1;
		}
		return 0;

	}

	const graph = new undirectedGraph<number>(comparator);

	const adjList = [[2, 3, 1], [0], [0, 4], [0], [2]];

	for (let i = 0; i < adjList.length; i++) {
		for (const neighbor of adjList[i]) {
			graph.addEdge(i, neighbor);
		}
	}

console.log(graph.dfs());
console.log(graph.bfs());