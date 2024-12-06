const fs = require('fs');
const { before } = require('node:test');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

rules = [];
invalid = [];
sum = 0;
movesToSort = 0;

fs.readFile(filePath, 'utf8', (err, data) => {
    processFileContent(data);
});

function processFileContent(data) {
    rawRules = data.split('\n\n')[0];
    updates = data.split('\n\n')[1].split('\n');
    for (let i = 0; i < updates.length; i++) {
        updates[i] = updates[i].split(',');
        for (let j = 0; j < updates[i].length; j++) {
            updates[i][j] = parseInt(updates[i][j]);
        }
    }

    rawRules = rawRules.split('\n');
    for(i = 0; i < rawRules.length; i++){
        rawRules[i] = rawRules[i].split('|');
        rawRules[i][0] = parseInt(rawRules[i][0]);
        rawRules[i][1] = parseInt(rawRules[i][1]);
    }

    for(let i = 0; i <= 100; i++){
        rules.push([[],[]]);
    }

    for(let i = 0; i < rawRules.length; i++){
        rules[rawRules[i][0]][0].push(rawRules[i][1]);
    }

    for(let i = 0; i < rawRules.length; i++){
        rules[rawRules[i][1]][1].push(rawRules[i][0]);
    }

    for(let i = 0; i < updates.length; i++){
        let valid = true;
        for(let j = 0; j < updates[i].length; j++){

            if(updates[i].slice(j+1).some(x => rules[updates[i][j]][1].includes(x))){
                valid = false;
                break;
            }

            if(updates[i].slice(0,0 - (updates[i].length) + j).some(x => rules[updates[i][j]][0].includes(x))){
                valid = false;
                break;
            }
        }
        
        if(valid){
            sum = sum + updates[i].slice((updates[i].length-1)/2,((updates[i].length-1)/2)+1)[0];
        }

        else{
            invalid.push(updates[i]);
        }
    }
    console.log("P1: ",sum);
    updates = invalid;
    sum = 0;

    for(let i = 0; i < updates.length; i++){
        let valid = false;
        while(!valid){
            valid = true;
            for(let j = 0; j < updates[i].length; j++){
                if(updates[i].slice(j+1).some(x => rules[updates[i][j]][1].includes(x))){
                    valid = false;
                    updates[i] = arrayShift(updates[i],j,j+1);
                    movesToSort++;
                }

                if(updates[i].slice(0,0 - (updates[i].length) + j).some(x => rules[updates[i][j]][0].includes(x))){
                    valid = false;
                    updates[i] = arrayShift(updates[i],j,j-1);
                    movesToSort++;
                }
            }
        }
        sum = sum + updates[i].slice((updates[i].length-1)/2,((updates[i].length-1)/2)+1)[0];
    }
    console.log("P2: ",sum);
    console.log("Moves to sort: ",movesToSort);
}

const arrayShift = (array, fromIndex, toIndex) => {
    const element = array[fromIndex];
    const newArray = array.slice();
    newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, element);
    return newArray;
};