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
        for(let j = 0; j < Math.pow(2,data[i].length - 2); j++) {
            let result = data[i][1];
            for(let k = 0; k < data[i].length - 2; k++) {
                if((j >> k) & 0x1){
                    result += data[i][k + 2];
                }
                else{
                    result = result * data[i][k + 2];
                }
            }
            if(result == data[i][0]){
                valid = true;
                break;
            }
        }
        if(valid){
            sum += data[i][0];
        }
    }
    console.table(sum);
}