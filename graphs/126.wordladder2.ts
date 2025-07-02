
function validNeighbour(a: string, b: string): boolean {
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) diff++;
        if (diff > 1) return false;
    }
    return diff === 1;
}

function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
    const level = new Map<string, number>();
    const adjGraph = new Map<string, string[]>();
    const wordSet = new Set(wordList);
    const result: string[][] = [];

    if (!wordSet.has(endWord)) return [];

    const queue: string[] = [];
    level.set(beginWord, 0);
    queue.push(beginWord);

    while (queue.length) {
        const currNode = queue.shift()!;
        const currLevel = level.get(currNode)!;

        for (const word of wordSet) {
                if(validNeighbour(currNode,word)){
                    if(level.has(word)){
                        if(level.get(word) === currLevel+1){
                            if (!adjGraph.has(currNode)) {
                            adjGraph.set(currNode, []);
                        }
                        adjGraph.get(currNode)!.push(word);
                    }

                    }
                    else{
                        queue.push(word);
                        level.set(word,currLevel+1);
                        
                    if (!adjGraph.has(currNode)) {
                        adjGraph.set(currNode, []);
                    }
                    adjGraph.get(currNode)!.push(word);
                }

                    }
                }

            }

    const path: string[] = [];


    const dfs = (word: string) => {
        path.push(word);
        if (word === endWord) {
            result.push([...path]);
        } else if (adjGraph.has(word)) {
            for (const next of adjGraph.get(word)!) {
                dfs(next);
            }
        }
        path.pop();
    };

    dfs(beginWord);

    return result;
}
