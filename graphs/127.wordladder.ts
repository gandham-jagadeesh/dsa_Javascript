function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
        
    let queue = new Array<[string,number]>();
    let visited = new Set<string>();
    let length = beginWord.length;
    visited.add(beginWord);

    for(let word of wordList){
        if(validSequence(word,beginWord)){
            queue.push([word,2]);
        }
    }

    while(queue.length){
        let [item,seq] = queue.shift()!;
        if(item === endWord){
            return seq;
        }
        for(let word of wordList){
            if(!visited.has(word) && validSequence(word,item)){
                queue.push([word,seq+1]);
                visited.add(word);
            }
        }
    }

    function validSequence(str1:string,str2:string){
        let diff = 0;
        for(let curr=0;curr<length;curr++){

            if(str1[curr] !== str2[curr]){
                diff+=1;
            }
            if(diff >= 2){
                break;
            }
        }

        return diff === 1;
    }

    return 0;
};