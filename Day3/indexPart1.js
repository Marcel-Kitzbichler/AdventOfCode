const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
sum = 0;	

fs.readFile(filePath, 'utf8', (err, data) => {
    processFileContent(data);
});

function processFileContent(content) {
    let mulMatrix = content.split('mul(');
    for(i = 0; i < mulMatrix.length; i++){
        while((mulMatrix[i].length > 0) && ((mulMatrix[i][mulMatrix[i].length - 1] !== ')') || /[^,\d]/.test(mulMatrix[i].slice(0,-1)))){
            mulMatrix[i] = mulMatrix[i].slice(0, -1);
        }
        mulMatrix[i] = mulMatrix[i].slice(0, -1);
    }
    
    mulMatrix = mulMatrix.filter(value => /^[\d,]+$/.test(value));
    for(i = 0; i < mulMatrix.length; i++){
        mulMatrix[i] = mulMatrix[i].split(',');
        mulMatrix[i][0] = parseInt(mulMatrix[i][0]);
        mulMatrix[i][1] = parseInt(mulMatrix[i][1]);
        mulMatrix[i][2] = mulMatrix[i][0] * mulMatrix[i][1];
        sum = sum + mulMatrix[i][2];
    }
    console.log(sum);
}