const fs = require('fs');
const { before } = require('node:test');
const path = require('path');
const { escape } = require('querystring');
const { start } = require('repl');
const filePath = path.join(__dirname, 'input.txt');


fs.readFile(filePath, 'utf8', (err, data) => {
    processFileContent(data);
});

function processFileContent(data) {
    map = data.split('\n');
    sum = 0;
    curCords = [0,0];
    curDir = [-1,0];
    for (let i = 0; i < map.length; i++) {
        if (map[i].includes('^')) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] == '^') {
                    startCords = [i,j];
                }
            }
        }
    }


    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[i].length; j++) {
            curCords[0] = startCords[0];
            curCords[1] = startCords[1];
            curDir = [-1,0];
            escaped = false;
            if(!(i == startCords[0] && j == startCords[1])) {
                for(let k = 0; k < 300000; k++) {
                    if(curCords[0] != 0 && curCords[1] != 0 && curCords[0] != map.length - 1 && curCords[1] != map[0].length - 1) {
                        if((map[curCords[0] + curDir[0]][curCords[1] + curDir[1]] != '#') && !(curCords[0] + curDir[0] == i && curCords[1] + curDir[1] == j)) {
                            curCords[0] += curDir[0];
                            curCords[1] += curDir[1];
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
                    else {
                        escaped = true;
                        break;
                    }
                }
            }

            else {
                escaped = true;
            }

            if(!escaped) {
                sum++;
            }
        }
    }
    console.log("P2: ",sum);
}