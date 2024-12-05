const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

searchFor = "MAS";
up = [];
down = [];

sum = 0;
reversedSearchFor = searchFor.split("").reverse().join("");

fs.readFile(filePath, 'utf8', (err, data) => {
    processFileContent(data);
});

function processFileContent(content) {
    let wordSearch = content.split("\n");
    console.table(wordSearch);

    for(i = 0; i <= (wordSearch[1].length - searchFor.length); i++){
        down.push([]);
        for(j = 0; j <= (wordSearch.length - searchFor.length); j++){
            let word = "";
            for(k = 0; k < searchFor.length; k++){
                word = word + wordSearch[j + k][i + k];
            }
            down[i].push(word === searchFor || word === reversedSearchFor);
        }
    }

    for(i = 0; i <= (wordSearch[1].length - searchFor.length); i++){
        up.push([]);
        for(j = searchFor.length - 1; j < (wordSearch.length); j++){
            let word = "";
            for(k = 0; k < searchFor.length; k++){
                word = word + wordSearch[j - k][i + k];
            }
            up[i].push(word === searchFor || word === reversedSearchFor);
        }
    }

    for(i = 0; i < up.length; i++){
        for(j = 0; j < up[i].length; j++){
            if(up[i][j] && down[i][j]){
                sum = sum + 1;
            }
        }
    }

    console.log(up[3].length);
    console.log(down[3].length);
    console.log(sum);
}