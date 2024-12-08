const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
    processFileContent(data);
});
function processFileContent(data) {
    let symbols = [];
    data = data.split("\n");
    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            if(!symbols.includes(data[i][j]) && data[i][j] != "."){
                symbols.push(data[i][j]);
            }
        }
    }
    let stationCords = [];
    for(let i = 0; i < symbols.length; i++) {
        stationCords.push([]);
        for(let j = 0; j < data.length; j++) {
            for(let k = 0; k < data[j].length; k++) {
                if(data[j][k] == symbols[i]){
                    stationCords[i].push([k, j]);
                }
            }
        }
    }

    let antinodeMap = Array.from({ length: data.length }, () => Array(data[0].length).fill(false));
    for(let i = 0; i < stationCords.length; i++) {
        for(let j = 0; j < stationCords[i].length; j++) {
            for(let k = 0; k < stationCords[i].length; k++) {
                if(stationCords[i][j][0] + (stationCords[i][j][0] - stationCords[i][k][0]) < antinodeMap.length && stationCords[i][j][0] + (stationCords[i][j][1] - stationCords[i][k][1]) < antinodeMap[0].length && stationCords[i][j][0] + (stationCords[i][j][0] - stationCords[i][k][0]) >= 0 && stationCords[i][j][0] + (stationCords[i][j][1] - stationCords[i][k][1]) >= 0){
                    antinodeMap[stationCords[i][j][0] + (stationCords[i][j][0] - stationCords[i][k][0])][stationCords[i][j][1] + (stationCords[i][j][1] - stationCords[i][k][1])] = true;
                }
                if(stationCords[i][j][0] - (stationCords[i][j][0] - stationCords[i][k][0]) < antinodeMap.length && stationCords[i][j][0] - (stationCords[i][j][1] - stationCords[i][k][1]) < antinodeMap[0].length && stationCords[i][j][0] - (stationCords[i][j][0] - stationCords[i][k][0]) >= 0 && stationCords[i][j][0] - (stationCords[i][j][1] - stationCords[i][k][1]) >= 0){
                    antinodeMap[stationCords[i][j][0] - (stationCords[i][j][0] - stationCords[i][k][0])][stationCords[i][j][1] - (stationCords[i][j][1] - stationCords[i][k][1])] = true;
                }
            }
        }
    }

    sum = 0;

    for(let i = 0; i < antinodeMap.length; i++) {
        for(let j = 0; j < antinodeMap[i].length; j++) {
            if(antinodeMap[i][j]){
                sum++;
            }
        }
    }
    
    console.log("P1: ", sum);
}