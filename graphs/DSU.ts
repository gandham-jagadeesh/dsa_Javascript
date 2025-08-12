
export class DSU{
 
    public  parents:number[] = [];
    public  rank:number[]=[];
    public size:number[]=[];

    constructor(size:number){
        for(let i=1;i<=size;i++){
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
        for(let i=1;i<length;i++){
            if(this.parents[i] === i){
                count+=1;
            }
        }
        return count;
    }

}

let dsu:DSU = new DSU(7);

console.log("before adding");
console.log("parents: ",dsu.parents);
console.log("rank: ",dsu.rank);
dsu.findUnionByRank(1,2);

console.log("after adding 1->2 edge");
console.log("parents: ",dsu.parents);
console.log("rank: ",dsu.rank);
console.log(dsu.getComponents());
dsu.findUnionByRank(2,3);

console.log("after adding 2->3 edge");
console.log("parents: ",dsu.parents);
console.log("rank: ",dsu.rank);
dsu.findUnionByRank(4,5);

console.log("after adding 4->5 edge");
console.log("parents: ",dsu.parents);
console.log("rank: ",dsu.rank);
dsu.findUnionByRank(6,7);

console.log("after adding 6->7 edge");
console.log("parents: ",dsu.parents);
console.log("rank: ",dsu.rank);
dsu.findUnionByRank(5,6);

console.log("after adding 5->6 edge");
console.log("parents: ",dsu.parents);
console.log("rank: ",dsu.rank);

dsu.findUnionByRank(3,7);
console.log("after adding 3->7 edge");
console.log("parents: ",dsu.parents);
console.log("rank: ",dsu.rank);

console.log("final");
console.log("parents:",dsu.parents);
console.log("rank: ",dsu.rank);
console.log(dsu.getComponents())