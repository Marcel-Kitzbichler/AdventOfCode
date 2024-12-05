#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define MAX_LINES 1200
#define MAX_LINE_LENGTH 256
#define MAX_COLUMNS 100

int main() {
    FILE *file;
    char *filename = "input.txt";
    char line[MAX_LINE_LENGTH];
    int numbers[MAX_LINES][MAX_COLUMNS];
    int line_count = 0;
    int validData = 0;
    _Bool valid = true;

    file = fopen(filename, "r");

    while (fgets(line, sizeof(line), file) != NULL && line_count < MAX_LINES) {
        int column_count = 0;
        char *token = strtok(line, " ");
        while (token != NULL && column_count < MAX_COLUMNS) {
            numbers[line_count][column_count] = atoi(token);
            token = strtok(NULL, " ");
            column_count++;
        }
        line_count++;
    }

    fclose(file);

    for (int i = 0; i < line_count; i++) {
        valid = true;
        for (int j = 1; numbers[i][j]!=0 ; j++) {
            if((((numbers[i][j] - numbers[i][j-1] >= 0)||(numbers[i][j] - numbers[i][j-1] < -3)))) {
                valid = false;
            }
        }
        if(valid) {
            validData++;
        }
        valid = true;
        for (int j = 1; numbers[i][j]!=0 ; j++) {
            if((((numbers[i][j]-numbers[i][j-1]) <= 0 )||( (numbers[i][j]-numbers[i][j-1]) > 3))) {
                valid = false;
            }
        }
        if(valid) {
            validData++;
        }
    }
    printf("Valid data: %d\n", validData);
    return EXIT_SUCCESS;
}