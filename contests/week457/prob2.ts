function processQueries(c: number, connections: number[][], queries: number[][]): number[] {

  const graph   = new Map<number,Set<number>>();
  const group   = new Map<number,Set<number>>();
  const visited = new Map<number,boolean>();
  const parent  = new Map<number,number>(); 
  const result  = new Array<number>();

  for(let i=1;i<=c;i++){
    graph.set(i,new Set<number>());
    group.set(i,new Set<number>());
  }

  for(let edge=0;edge< connections.length;edge++){
    
    let nodeu = connections[edge][0];
    let nodev = connections[edge][1];

    graph.set(nodeu,graph.get(nodeu).add(nodev));
    graph.set(nodev,graph.get(nodev).add(nodeu));

  }

  
  const dfs = (node,parentnode)=>{
    visited.set(node,true);
    group.set(parentnode,group.get(parentnode).add(node));
    parent.set(node,parentnode);
    for(let neighbour of graph.get(node)){
        if(!visited.get(neighbour)){
            dfs(neighbour,parentnode);
        }
    }
  }
  

  for(let i=1;i<=c;i++){
    if(!visited.get(i)){
        group.set(i,new Set<number>());
        dfs(i,i);
        parent.set(i,i);
        
    }
  }

  console.log(group);
  console.log(parent);

  for(let query of queries){
    if(query[0] === 1){
        let station = query[1];
        let setId = parent.get(station);
        let isExists = group.get(setId).has(station);
        if(isExists){
            result.push(station);
        }
        else{
            const minValue = group.get(setId).size > 0 ? Math.min(...group.get(setId)) : -1;
            result.push(minValue)
        }
    }
    if(query[0] === 2){
        let station = query[1];
        let findSet = parent.get(station);
        let isExists = group.get(findSet).has(station);
        if(isExists){
            group.get(findSet).delete(station);
        }
    }

  }


  return result;
};

//tc : o(c) + o(e) + o(n + e) + o(q * c)
//where c beging the nodes
//e being the edges
//gives tle for larger values of q and c

//optimization