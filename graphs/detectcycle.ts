
class Solution {
    isCycle(V:number, adj:number[][]) {
        const dfs = (node:number,parent:number)=>{
         visited.set(node,true);
         for(let neighbors of adj[node]){
            if(!visited.has(neighbors)){
               if(dfs(neighbors,node)){ return true};
            }
            else if (neighbors !== parent){
                return true;
            }

         } 
         return false;
       }

        let visited = new Map();
        for(let vertex=0 ;  vertex < adj.length; vertex++){
            if(!visited.has(vertex)){
                  if(dfs(vertex,-1)){return true};
            }
        }
       
       return false;
    }

    bfs(V:number,adj:number[][]){
        const visited = new Map();
        const bfshelper = (node:number)=>{
            const queue   = new Array();
             visited.set(node,true);
             queue.push([node,-1]);
             while(queue.length > 0){
                const [node,parent] = queue.shift();
                for(let neighbors of adj[node]){
                    if(!visited.has(neighbors)){
                        queue.push([neighbors,node]);
                        visited.set(neighbors,true);
                    }
                    else if(parent != neighbors){
                        return true;
                    }
                }
             }

             return false;
        }

        for(let node=0;node<adj.length;node++){
            if(!visited.has(node)){
                if(bfshelper(node)){
                return true
            }
            }
        }

        return false;

    }
}