const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
    processFileContent(data);
});
function processFileContent(data) {
    sum = 0;

    data = data.split('\n');

    for(let i = 0; i < data.length; i++) {
        data[i] = data[i].split(' ');
        data[i][0] = data[i][0].slice(0, -1);
        for(let j = 0; j < data[i].length; j++) {
            data[i][j] = parseInt(data[i][j])
        }
    }

    for(let i = 0; i < data.length; i++) {
        let valid = false;
        for(let j = 0; j < Math.pow(2, (data[i].length - 2) * 2); j++) {
            let result = data[i][1];
            for(let k = 0; k < data[i].length - 2; k++) {
                if(((j >> (k*2)) & 0x3) == 1 || ((j >> (k*2)) & 0x3) == 0){
                    result += data[i][k + 2];
                }
                else if(((j >> (k*2)) & 0x3) == 2){
                    result = result * data[i][k + 2];
                }
                else{
                    result = parseInt(result.toString() + data[i][k + 2].toString());
                }
            }
            if(result == data[i][0]){
                valid = true;
                break;
            }
        }
        if(valid){
            sum += data[i][0];
            console.log("validEntry: ",data[i][0]);
        }
    }
    console.log("P2: ", sum);
}