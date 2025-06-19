function updateMatrix(mat: number[][]): number[][] {
    let queue:number[][] = new Array();
    let rows = mat.length;
    let cols = mat[0].length;
    let resultMatrix:number[][] =  Array.from({length:rows},()=>Array(cols).fill(Infinity));
    for(let r = 0; r < rows; r++ ){
        for(let c = 0; c < cols; c++ ){
            if(mat[r][c] === 0){
                resultMatrix[r][c]=0;
                queue.push([r,c]);
            }
            else{
                resultMatrix[r][c]=Infinity;
            }
        }
    }  

    while(queue.length){
        const [x,y] = queue.shift()!;
        const value = resultMatrix[x][y];
        const directions = [[1,0],[-1,0],[0,1],[0,-1]]
        for(let dir of directions){
            let nx = x + dir[0];
            let ny = y + dir[1];
            if(nx >=0  && ny >= 0 && nx < rows && ny < cols ){
                if(resultMatrix[nx][ny] === Infinity){
                    resultMatrix[nx][ny] = value+1;
                    queue.push([nx,ny])
                }
            }

        }
    }

    return resultMatrix;
};