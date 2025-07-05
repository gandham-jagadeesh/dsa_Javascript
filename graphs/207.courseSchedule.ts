function canFinish(numCourses: number, prerequisites: number[][]): boolean {


    let visited = new Map<number,boolean>();
    let adjGraph = new Map<number,number[]>();
    let queue = new Array<number>();

    for(let i=0; i<numCourses; i++ ){
        adjGraph.set(i,[]);
    }

    for(let edge of prerequisites){
        adjGraph.get(edge[1]).push(edge[0]);
    }

    
    let inDegreeNodesCount = new Map<number,number>();
    for(let i=0;i<numCourses;i++){
        inDegreeNodesCount.set(i,0);
    }

    for(let i=0;i<numCourses;i++){
        for(let neighbour of adjGraph.get(i)){
            inDegreeNodesCount.set(neighbour,inDegreeNodesCount.get(neighbour)+1);
        }
    }

    for(let key of inDegreeNodesCount.keys()){
        if(inDegreeNodesCount.get(key) === 0){
            queue.push(key);
            visited.set(key,true);
        }
    }

    while(queue.length){
        const currNode = queue.shift()!;
        for(let neighbour of adjGraph.get(currNode)){
            if(!visited.has(neighbour)){
                 inDegreeNodesCount.set(neighbour,inDegreeNodesCount.get(neighbour)-1);
                if(inDegreeNodesCount.get(neighbour) === 0){
                    queue.push(neighbour);
                    visited.set(neighbour,true);
                }
            }
               
            }
        }





     for(let key of inDegreeNodesCount.keys()){
        if(inDegreeNodesCount.get(key) !== 0){
            return false;
        }
    }

    return true;
};