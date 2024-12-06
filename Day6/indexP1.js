const fs = require('fs');
const { before } = require('node:test');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');


fs.readFile(filePath, 'utf8', (err, data) => {
    processFileContent(data);
});

function processFileContent(data) {
    map = data.split('\n');
    sum = 0;
    curCords = [0,0];
    curDir = [-1,0];
    let visitMap = Array(map.length).fill().map(() => Array(map[0].length).fill(false));
    for (let i = 0; i < map.length; i++) {
        if (map[i].includes('^')) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] == '^') {
                    curCords = [i, j];
                }
            }
        }
    }

    visitMap[curCords[0]][curCords[1]] = true;
    console.log(curCords);

    while(curCords[0] != 0 && curCords[1] != 0 && curCords[0] != map.length - 1 && curCords[1] != map[0].length - 1) {
        if(map[curCords[0] + curDir[0]][curCords[1] + curDir[1]] != '#') {
            curCords[0] += curDir[0];
            curCords[1] += curDir[1];
            visitMap[curCords[0]][curCords[1]] = true;
            console.log(curCords);
        }
        else if(curDir[0] == -1) {
            curDir = [0,1];
        }
        else if(curDir[1]==1) {
            curDir = [1,0];
        }
        else if(curDir[0]==1) {
            curDir = [0,-1];
        }
        else {
            curDir = [-1,0];
        }
    }

    for(let i = 0; i < visitMap.length; i++) {
        for(let j = 0; j < visitMap[0].length; j++) {
            if(visitMap[i][j]) {
                sum++;
            }
        }
    }

    console.table(map);
    console.log("Exit at: ",curCords);
    console.log("P1: ",sum);
    
}