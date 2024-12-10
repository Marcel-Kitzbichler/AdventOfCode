const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
    processFileContent(data);
});
function processFileContent(data){
    driveMap = [];
    for(let i = 0; i < data.length; i++){
        if(i%2 == 0){
            for(let k = 0; k < parseInt(data[i]); k++){
                driveMap.push(i / 2);
            }
        }
        else{
            for(let k = 0; k < parseInt(data[i]); k++){
                driveMap.push("fals");
            }
        }
    }

    console.log(driveMap)

    while(driveMap.includes("fals")){
        if(driveMap.slice(-1)[0] == "fals"){
            driveMap.pop();
        }
        else{
            for(i = 0; i < driveMap.length; i++){
                if(driveMap[i] == "fals"){
                    driveMap[i] = driveMap.slice(-1)[0];
                    driveMap.pop();
                    break;
                }
            }
        }
    }

    console.log(driveMap);

    checkSum = 0
    for(let i = 0;i < driveMap.length; i++){
        checkSum += i * driveMap[i]
    }
    console.log(checkSum);
}