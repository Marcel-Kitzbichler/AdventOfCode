const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

searchFor = "XMAS";

sum = 0;
reversedSearchFor = searchFor.split("").reverse().join("");

fs.readFile(filePath, 'utf8', (err, data) => {
    processFileContent(data);
});

function processFileContent(content) {
    let wordSearch = content.split("\n");
    console.table(wordSearch);

    for(i = 0; i < (wordSearch.length); i++){
        for(j = 0; j <= (wordSearch[i].length - searchFor.length); j++){
            if(wordSearch[i].slice(j, j + searchFor.length) == searchFor || wordSearch[i].slice(j, j + reversedSearchFor.length) == reversedSearchFor){
                sum = sum + 1;
            }
        }
    }

    for(i = 0; i <= (wordSearch[1].length); i++){
        for(j = 0; j <= (wordSearch.length - searchFor.length); j++){
            let word = "";
            for(k = 0; k < searchFor.length; k++){
                word = word + wordSearch[j + k][i];
            }
            if(word === searchFor || word === reversedSearchFor){
                sum = sum + 1;
            }
        }
    }

    for(i = 0; i <= (wordSearch[1].length - searchFor.length); i++){
        for(j = 0; j <= (wordSearch.length - searchFor.length); j++){
            let word = "";
            for(k = 0; k < searchFor.length; k++){
                word = word + wordSearch[j + k][i + k];
            }
            if(word === searchFor || word === reversedSearchFor){
                sum = sum + 1;
            }
        }
    }

    for(i = 0; i <= (wordSearch[1].length - searchFor.length); i++){
        for(j = searchFor.length - 1; j < (wordSearch.length); j++){
            let word = "";
            for(k = 0; k < searchFor.length; k++){
                word = word + wordSearch[j - k][i + k];
            }
            if(word === searchFor || word === reversedSearchFor){
                sum = sum + 1;
            }
        }
    }


    console.log(sum);
}