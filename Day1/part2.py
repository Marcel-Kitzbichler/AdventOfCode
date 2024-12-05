array1 = []
array2 = []
sum = 0

# Open the file for reading
with open('input1.txt', 'r') as file:
    # Read the file line by line
    for line in file:
        # Split each line into two numbers
        num1, num2 = map(int, line.split())
        # Append the numbers to the respective arrays
        array1.append(num1)
        array2.append(num2)

for i in array1:
    matches = 0
    for m in array2:
        if i == m:
            matches+=1
    sum += matches * i

print(sum)