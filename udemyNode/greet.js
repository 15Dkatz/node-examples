function greet() {
	console.log("Hello World");
}

greet();

//functions are first-class

function logGreeting(fn) {
	fn();
}

logGreeting(greet)

//function expression

var greetMe = function() {
	console.log('Hi David')
}

//this variable has the function as its value

//still first-class, able to be passed around.

greetMe()

logGreeting(function() {
	console.log('Hi Gandalf.')
})

module.exports = greet;