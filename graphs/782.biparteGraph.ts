function isBipartite(graph: number[][]): boolean {

    const visited = new Map<number,number>();

    for(let i=0;i<graph.length;i++){
        visited.set(i,-1);
    }

    const dfs = (currNode:number,color:number)=>{
        visited.set(currNode,color);
        let inverse = color === 0 ? 1 : 0;
        for(let adj of graph[currNode]){
            if(visited.get(adj) === -1){
                if(dfs(adj,inverse)){
                    return true;
                }
            }
            else if(visited.get(adj) === visited.get(currNode)){
                return true;
            }
        }
        return false;
    }

    let nodes = graph.length;
    for(let node=0; node < nodes; node++){
        if(visited.get(node) === -1){
            if(dfs(node,0)){
                return false;
            }
        }
    }

    return true;
};