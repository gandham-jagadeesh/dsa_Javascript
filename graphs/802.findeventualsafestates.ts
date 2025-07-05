function eventualSafeNodes(graph: number[][]): number[] {

    let length = graph.length;
    let indegree:number[] = new Array(length).fill(0);
    let adjGraph = new Map<number,number[]>();
    let result = new Array<number>();
    let visited = new Map<number,boolean>();

    for(let ind=0;ind<length;ind++){
        adjGraph.set(ind,[]);
    }

    for(let ind=0; ind<length; ind++){
        for(let adj of graph[ind]){
                adjGraph.get(adj)?.push(ind);
        }
     
    }

    const queue = new Array<number>();


    for(let ind=0; ind<length; ind++){
        for(let adj of adjGraph.get(ind)!){
            indegree[adj]++;
        }
    }


    for(let ind=length-1; ind >=0 ;ind--){
        if(indegree[ind] === 0){
            queue.push(ind);
            visited.set(ind,true);
        }
    }

    
    while(queue.length){
        const currNode = queue.shift()!;
        result.push(currNode);
        for(let adj of adjGraph.get(currNode)!){
                indegree[adj]-=1;
        }

        for(let i=0;i<length;i++){
            if(indegree[i]===0){
                if(!visited.has(i)){
                queue.push(i);
                visited.set(i,true);
                }
            }
        }
    }

    result.sort((a,b)=>a-b);
    return result;
};

/*

    //build a reverse graph and then make a indegree out of it then store the topological sort order

    [1,2],[2,3],[5],[0],[5],[],[]
    0 -> [1,2]
    1 -> [2,3]
    2 -> [5]
    3 -> [0]
    4 -> [5]
    5 -> []

    reverse the graph ->

    0 -> [3]
    1 -> [0 ]
    2 -> [0,1]
    3 -> [1]
    4 -> []
    5 -> [2,4]
    6 -> []

    dependency graph -> 
    6,5,4,2


    my goal : first turn this graph into reverse order and make an indegree out of it and then do toplogical sort and then return the order in ascending order

     get the index -> 0 -> get the neighbours
      adj[neighbours] -> insert 0
      get the adjacent neighbours of all nodes then insert inthat position of the other

      
    */