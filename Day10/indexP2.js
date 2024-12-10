const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
    processFileContent(data);
});
function processFileContent(data){
    data = data.split("\n");
    numberMap = [];
    trailHeads = [];
    for(let i = 0; i < data.length; i++){
        numberMap.push([]);
        for(let k = 0; k < data.length; k++){
            numberMap[i][k] = parseInt(data[i][k]);
            if(numberMap[i][k] == 0){
                trailHeads.push([i,k]);
            }
        }	
    }

    sum = 0;
    for(let i = 0; i < trailHeads.length; i++){
        foundPlots = [trailHeads[i]];
        for(let k = 1; k <= 9; k++){
            foundPlots = findNext(k,foundPlots,numberMap);
        }
        sum += foundPlots.length;
        if(foundPlots.length > 0){
            console.log(trailHeads[i]);
        }
    }
    console.log(sum);
}

function findNext(nextNumber,input,map){
    let next = [];
    for(let i = 0; i < input.length; i++){
        if(map.length > input[i][0] + 1){
            if(map[input[i][0] + 1][input[i][1]] == nextNumber){
                next.push([input[i][0] +1,input[i][1]]);
            }
        }
        if(input[i][0] - 1 >= 0){
            if(map[input[i][0] - 1][input[i][1]] == nextNumber){
                next.push([input[i][0] -1,input[i][1]]);
            }
        }
        if(map[input[i][0]].length > input[i][1] + 1){
            if(map[input[i][0]][input[i][1] + 1] == nextNumber){
                next.push([input[i][0],input[i][1] + 1]);
            }
        }
        if(input[i][1] - 1 >= 0){
            if(map[input[i][0]][input[i][1] - 1] == nextNumber){
                next.push([input[i][0],input[i][1] - 1]);
            }
        }
    }

    return next;
}