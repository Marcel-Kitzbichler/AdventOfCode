const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
    processFileContent(data);
});
function processFileContent(data){
    data = data.split(" ");
    for(let i = 0; i < data.length; i++){
        data[i] = parseInt(data[i]);
    }
    console.log(blink(75, [data[0]]).length);
}

function blink(times, data){
    for(let i = 0; i < times; i++){
        currLength = data.length;
        console.log(data);
        for(let k = 0; k < currLength; k++){
            if(data[k] == 0){
                data[k] = 1
            }
            else if(data[k].toString().length % 2 == 0){
                data.push(parseInt(data[k].toString().slice(0,-(data[k].toString().length)/2)));
                data[k] = parseInt(data[k].toString().slice(data[k].toString().length/2));
            }
            else{
                data[k] = data[k] * 2024;
            }
        }
    }
    return data;
}