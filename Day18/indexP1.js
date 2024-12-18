const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    processFileContent(data);
});

async function processFileContent(data) {
    const grid = Array.from({ length: 71 }, () => Array(71).fill(0));
    data = data.split('\n');
    console.log(grid);
    while(data.length > 1024){
        data.pop();
    }
    for (let i = 0; i < data.length; i++) {
        x = parseInt(data[i].split(',')[0]);
        y = parseInt(data[i].split(',')[1]);
        console.log(x, y);
        grid[x][y] = 1;
    }
    console.table(grid);
    curCor = [[0, 0]];
    steps = 0;
    while(true){
        curCor = findNext(curCor, grid);
        steps++;
        for (let i = 0; i < curCor.length; i++) {
            if(curCor[i][0] === 70 && curCor[i][1] === 70){
                console.log(steps);
                return;
            }
        }
    }
}
function findNext(inCords, grid){
    outCords = [];
    for (let i = 0; i < inCords.length; i++) {
        const [x, y] = inCords[i];
        if (x + 1 < grid.length && grid[x + 1][y] === 0) {
            outCords.push([x + 1, y]);
        }
        if (x - 1 >= 0 && grid[x - 1][y] === 0) {
            outCords.push([x - 1, y]);
        }
        if (y + 1 < grid[0].length && grid[x][y + 1] === 0) {
            outCords.push([x, y + 1]);
        }
        if (y - 1 >= 0 && grid[x][y - 1] === 0) {
            outCords.push([x, y - 1]);
        }
    }
    const uniqueOutCords = new Set(outCords.map(coord => JSON.stringify(coord)));
    outCords = Array.from(uniqueOutCords).map(coord => JSON.parse(coord));
    return outCords;
}