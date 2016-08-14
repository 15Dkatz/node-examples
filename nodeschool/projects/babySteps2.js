//using the process.argv to find sums
var numbersArray = process.argv

var finalSum = 0

for (i = 2; i < numbersArray.length; i++) {
	finalSum += Number(process.argv[i])
}

console.log(finalSum)