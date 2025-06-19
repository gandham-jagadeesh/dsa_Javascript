export function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
    if(image[sr][sc] === color){ return image;}
    const queue:[number,number][] = new Array<[number,number]>();
    const target = image[sr][sc];
    queue.push([sr,sc]);
    image[sr][sc]=color;
    const height = image.length;
    const width = image[0].length;
    const directions = [[1,0],[-1,0],[0,1],[0,-1]];
    while(queue.length > 0){
        const currNode = queue.shift()!;
        for(let dir of directions){
            let nr = currNode[0] + dir[0]
            let ny = currNode[1] + dir[1];
            if( nr >= 0 && ny >= 0 && nr < height && ny < width){
                if(image[nr][ny] === target){
                    queue.push([nr,ny]);
                    image[nr][ny]=color;
                }
            }
        }
    }
    return image;
};