const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
    processFileContent(data);
});
function processFileContent(data){
    data = data.split("\n\n");
    for(let i = 0; i < data.length; i++){
        data[i] = data[i].slice(12)
        data[i] = data[i].split("\nPrize: X=")
        data[i][1] = data[i][1].split(", Y=")
        data[i][1][0] = parseInt(data[i][1][0])
        data[i][1][1] = parseInt(data[i][1][1])
        data[i][0] = data[i][0].split("\nButton B: X+")
        data[i][0][1] = data[i][0][1].split(", Y+")
        data[i][0][1][0] = parseInt(data[i][0][1][0])
        data[i][0][1][1] = parseInt(data[i][0][1][1])
        data[i][0][0] = data[i][0][0].split(", Y+")
        data[i][0][0][0] = parseInt(data[i][0][0][0])
        data[i][0][0][1] = parseInt(data[i][0][0][1])
    }
    sum = 0;
    for(let i = 0; i < data.length; i++){
        sum += calcPrice(data[i])
    }
    console.log(sum)
}

function calcPrice(machine){
    for(i = 0;i < 10000 ; i++){
        pos = [machine[0][0][0] * i,machine[0][0][1] * i];
        price = i * 3;
        while(pos[0] < machine[1][0] && pos[1] < machine[1][1]){
            pos[0] += machine[0][1][0];
            pos[1] += machine[0][1][1];
            price += 1;
        }
        if(pos[0] == machine[1][0] && pos[1] == machine[1][1]){
            return price;
        }
    }
    return 0;
}