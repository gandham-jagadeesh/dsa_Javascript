function findCircleNum_first_submisson(isConnected: number[][]): number {
    const adjlist:Map<number,number[]> = new Map();
    let rowLength = isConnected.length;
    let colLength = isConnected[0].length;
    for(let rindex=0;rindex<rowLength;rindex++){
        let neighbors = new Array<number>();
        for(let colindex=0;colindex<colLength;colindex++){
            if(rindex!== colindex){
                if(isConnected[rindex][colindex] === 1){
                    neighbors.push(colindex+1);
                }
            }
        }
        adjlist.set(rindex+1,neighbors);
    }
        const dfs = (node:number,adjlist:Map<number,number[]>)=>{
        visited.set(node,true);
            adjlist.get(node)?.forEach((item)=>{
            if(!visited.get(item)){
                dfs(item,adjlist);
            }
        })
    }
    const visited = new Map<number,boolean>();
    let total = 0;
        adjlist.forEach((value,key,adjlist)=>{
            if(!visited.get(key)){
                total+=1;
                dfs(key,adjlist);
            }
        });


    return total;
};