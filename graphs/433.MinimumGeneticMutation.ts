function minMutation(startGene: string, endGene: string, bank: string[]): number {
    let visited = new Map<string,boolean>();
    let queue   = new Array<[string,number]>();

    visited.set(startGene,true);
    for(let mutation of bank){
        if(Validmutate(mutation,startGene)){
            queue.push([mutation,1]);
        }
    }

    while(queue.length){
        const [mutation,value] = queue.shift()!;
        if(mutation === endGene){
            return value;
        }
        for(let nextmutate of bank){
            if(!visited.has(nextmutate) && Validmutate(mutation,nextmutate)){
                queue.push([nextmutate,value+1])
                visited.set(nextmutate,true);
            }
        }
    }
    function Validmutate(str1:string,str2:string){
        let countDiff = 0;
        for(let ind=0;ind<8;ind++){
            if(str1[ind] !== str2[ind]){
                countDiff+=1;
            }
        }
        return countDiff === 1;
    }
    return -1;
};

/*
 Time complexity: o(n^2) where n is the bank node
 reasoning:
 for -> outerloop -> if finding the diff of 1 we are adding that to queue
 for each queue we are item all of the bank items whether they are visited or not
 so o(n^2)

 space complexity: o(n) where n is n items stored in queue
*/