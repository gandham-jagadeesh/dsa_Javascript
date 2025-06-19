function orangesRotting(grid: number[][]): number {
    let fresh:number=0;
    let rotten:number=0;
    let rows = grid.length;
    let cols = grid[0].length;
    let queue:number[][] = new Array();
    let iteration=0;
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            if(grid[r][c] === 2){
                rotten+=1;
                queue.push([r,c]);
            }
            if(grid[r][c] === 1){
                fresh+=1;
            }
        }
    }
    while(queue.length > 0 && fresh > 0){
        const length = queue.length;
        for(let i=0;i<length;i++){
            const currRotten = queue.shift()!;
            const directions = [[1,0],[-1,0],[0,1],[0,-1]];
            for(let dir of directions){
                let dx = currRotten[0]+dir[0];
                let dy = currRotten[1]+dir[1];
                if(dx >= 0 && dy >=0 && dx < grid.length && dy < grid[0].length){
                    if(grid[dx][dy] === 1){
                    queue.push([dx,dy]);
                    grid[dx][dy]=2;
                    fresh--;
                    }
                }
            }
        }
        iteration+=1;
    }
    return fresh > 0 ? -1:iteration;
};