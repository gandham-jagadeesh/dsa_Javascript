export class heap{
    public  heap :number[];
    public  size :number;

    constructor(array:number[]){
        this.heap = array;
        this.size = 0;
    }

    remove(){
    
        if(this.heap.length > 0){
    
        let length = this.heap.length;
        let poppedElement = this.heap[0];
        this.heap[0] = this.heap[length-1];
        this.heap.pop();
        length = this.heap.length;
        let currIndex = 0 
        
        while(currIndex < length){
            
            let leftchild       = 2 * currIndex + 1 ;  
            let rightchild      = 2 * currIndex + 2;
            let currValue       = this.heap[currIndex];
            if(leftchild < length && rightchild < length){

                  let leftChildValue  = this.heap[leftchild];
                  let rightChildValue = this.heap[rightchild];

                  if(leftChildValue < rightChildValue &&  currValue < rightChildValue){
                    this.heap[rightchild] = currValue;
                    this.heap[currIndex]  = rightChildValue;
                    currIndex = rightchild;
                  }

                  else if(rightChildValue < leftChildValue && currValue < leftChildValue){
                    this.heap[leftchild] = currValue 
                    this.heap[currIndex] = leftChildValue;
                    currIndex=leftchild;
                  }
                  else{
                    currIndex=this.heap.length+1;
                  }
            }
            else if(leftchild < length && rightchild+1 === this.heap.length){
                if(this.heap[leftchild] > currValue){
                    this.heap[currIndex]=this.heap[leftchild];
                    this.heap[leftchild]=currValue;
                    currIndex=leftchild;
                }
                else{
                    currIndex = this.heap.length+1;
                }
            }
            else{
                currIndex=this.heap.length+1;
            }

        }
        return poppedElement;
    }        
      

    }

    insert(node:number){
        this.heap.push(node);
        let currElementIndex  = this.heap.length-1;
        console.log(node,currElementIndex);
        while(currElementIndex > 0){
            let parentCurrIndex = Math.floor((currElementIndex-1)/2);
            let currParent = this.heap[parentCurrIndex];
            if(currParent < this.heap[currElementIndex]){
                let temp = this.heap[parentCurrIndex];
                this.heap[parentCurrIndex] = this.heap[currElementIndex];
                this.heap[currElementIndex] = temp;
                currElementIndex = parentCurrIndex;
            }
            else{
                break;
            }
        }
    }

    heapify(){ 
        this.size = this.heap.length;        
        let  currSize = this.size;
        for(let i=currSize-1;i >= 0;i--){
            let index =i;
            while(index < this.size){
            let leftChildIndex  = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            if(leftChildIndex < this.size && rightChildIndex < this.size){
                let currElement = this.heap[index];
                let leftChildElement = this.heap[leftChildIndex];
                let rightChildElement = this.heap[rightChildIndex];

                if(leftChildElement < rightChildElement){

                    if(rightChildElement  >  currElement){
                        this.heap[index] = rightChildElement;
                        this.heap[rightChildIndex] = currElement;
                        index  = rightChildIndex;
                    }
                    else{
                        index = this.size+1;
                    }
                }

                else if(leftChildElement > rightChildElement){
                
                    if(leftChildElement > currElement){
                
                        this.heap[index] = leftChildElement;
                        this.heap[leftChildIndex] = currElement;
                        index  = leftChildIndex;
                    }
                    else{
                        index = this.size+1;
                    }
                }
                else{
                    index = this.size+1;
                }
             }
             else if(leftChildIndex < this.size && rightChildIndex ===  this.size){
                let currElement = this.heap[index];
                let leftParent  = 2*index+1;
                let leftChildElement = this.heap[leftChildIndex];
                if(currElement <  leftChildElement){
                    this.heap[index] = leftChildElement;
                    this.heap[leftParent] = currElement;
                }
                else{
                    index = this.size+1;
                }
            }
             else{
                index = this.size+1;
             }

            }            
        }
    }


}

let heaps = new heap([]);
heaps.insert(2);
heaps.insert(3);
console.log(heaps.heap);
console.log(heaps.remove());
console.log(heaps.heap);
console.log(heaps.remove());
console.log(heaps.heap);