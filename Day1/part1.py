array1 = []
array2 = []
sum = 0;

# Open the file for reading
with open('input1.txt', 'r') as file:
    # Read the file line by line
    for line in file:
        # Split each line into two numbers
        num1, num2 = map(int, line.split())
        # Append the numbers to the respective arrays
        array1.append(num1)
        array2.append(num2)

array1.sort()
array2.sort()

for i in range(len(array1)):
    sum += abs(array1[i] - array2[i])

print(sum)
