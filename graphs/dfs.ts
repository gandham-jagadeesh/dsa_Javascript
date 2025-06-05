
type Graph = Record<number,number[]>;

const graph:Graph = {
    0:[2,3,1],
    1:[0],
    2:[0,4],
    3:[0],
    4:[2]
}

function bfs(start:number,graph:Graph){
    const visited:boolean[]= new Array(10).fill(false);
    visited[start]=true;
    const queue:number[] = [];
    queue.push(start);
    while(queue.length > 0){
        const currNode = queue.shift()!;
        console.log(currNode);
        for(const neighbor of graph[currNode]){
            if(!visited[neighbor]){
                visited[neighbor]=true;
                queue.push(neighbor);
            }
        }
    }
}


bfs(0,graph);
