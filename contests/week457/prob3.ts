
/* 
 *
 * Find the connected components -> if it contains atleast k components we can send the return with 0
 * 
 * how to find the connected components -> go through bfs -> it gives one connected components add that to one
 * no of bfs -> no of connected components
 * may be like set 0 or set 1 or something like that
 * go for the smallest time consuming in that order to remove the nodes and then we do it again ... and check until no nodes are removed
 * do bruteForce -> again and again to check whether connected components gonna increase or not
*/


class DSU{
 
    public  parents:number[] = [];
    public  rank:number[]=[];
    public size:number[]=[];

    constructor(size:number){
        for(let i=0;i<size;i++){
            this.parents[i]=i;
            this.rank[i]=0;
            this.size[i]=1;
        }
    }

    findParent(node:number):number{

        if(node === this.parents[node]){
            return node;
        }
        this.parents[node] = this.findParent(this.parents[node]);
        return this.parents[node];
    }

    findRank(node:number){
        return this.rank[node];
    }

    findSize(node:number){
        return this.size[node];
    }

    findUnionByRank(nodeu:number,nodev:number){ // rank meaning tree height 

        let pu = this.findParent(nodeu);
        let pv = this.findParent(nodev);

        let puRank = this.findRank(pu);
        let pvRank = this.findRank(pv);

        if(pu === pv){return}

        if(puRank > pvRank){
            this.parents[pv]=pu;
        }
        else if (pvRank > puRank){
            this.parents[pu]=pv;
        }
        else{
            this.parents[pv]=pu;
            this.rank[pu]+=1;
        }
    }

    findUnionBySize(nodeu:number,nodev:number){ //size -> number of elements attach to a parent node
        let pu = this.findParent(nodeu);
        let pv = this.findParent(nodev);
        if(pu === pv){return }

        let puSize = this.findSize(pu);
        let pvSize = this.findSize(pv);

        if(puSize > pvSize){
            this.parents[pv]=pu;
            this.size[pu]+=this.size[pv];
        }
        else if(pvSize > puSize){
            this.parents[pu]=pv;
            this.size[pv]+=this.size[pu];
        }
        else{
            this.parents[pv]=pu;
            this.size[pu]+=this.size[pv];
        }
    }

    getComponents(){
        let length = this.parents.length;
        let count  = 0;
        for(let i=0;i<length;i++){
            if(this.parents[i] === i){
                count+=1;
            }
        }
        return count;
    }

}

// binary search + dsu

function check(n: number,mid: number,edges: string | any[],k: number,bsearch: number[]){
    let dsu = new DSU(n);
    for(let i=0;i<edges.length;i++){
        if(edges[i][2] > bsearch[mid]){
            dsu.findUnionByRank(edges[i][0],edges[i][1]);
        }
    }
    return dsu.getComponents() >= k;

}

function minTime(n: number, edges: number[][], k: number): number {
    let bsearch:number[] = [0];
    for(let i=0;i<edges.length;i++){
        bsearch.push(edges[i][2]);
    }
    bsearch.sort((a,b)=>a-b);
    let low = 0;
    let high = bsearch.length-1;
    while(low <= high){
        let mid = Math.ceil((low + high)/2);
        console.log(mid);
        if(check(n, mid,edges,k,bsearch)){
            high = mid-1;
        }
        else{
            low = mid+1;
        }
    }
    return bsearch[low];

};

// log(e)*e + log(e)*n 

//sorted + dsu -> TLE

export function minTime_(n: number, edges: number[][], k: number): number {
    edges.sort((a,b)=>b[2]-a[2]);
    let dsu = new DSU(n);    
    for(let i=0;i<edges.length;i++){
        dsu.findUnionByRank(edges[i][0],edges[i][1]);
        if(dsu.getComponents() < k){
            return edges[i][2];
        }
    }
    return 0;
};

//Time complexity -> o(e * log(e)) + o(e * (e * n 4alpha but constant)) 
// o(e * log(e)) + o(e^n)
// so (e^n) // as n being the parent node


//sorted + dsu -> optimized

function minTime__(n: number, edges: number[][], k: number): number {
    edges.sort((a,b)=>b[2]-a[2]);
    let dsu = new DSU(n);
    let components = n;    
    for(let i=0;i<edges.length;i++){
        const [u,v,time] = edges[i];
        const pu = dsu.findParent(u);
        const pv = dsu.findParent(v);
        if(pu !== pv){
            dsu.findUnionByRank(u,v);
            components--;
        }
        if(components < k){
            return time;
        }
    }
    return 0;
};

//Time complexity -> o(e * log(n))) + o(e * 4 alhpa) 
//so o(e * log(e)) + o(e * o(1))
//so o(e * log(e))
//space complexity o(1)